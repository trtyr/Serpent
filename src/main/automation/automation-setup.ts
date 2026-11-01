import path from "node:path";

import { app, clipboard } from "electron";

import {
  createAutomationCommandGateway,
  type AutomationCommandGateway,
} from "../../automation/command-gateway";
import {
  AutomationExecutionJournal,
  AutomationLibraryContextError,
  createJsonFileAutomationExecutionStore,
  projectAutomationExecutionStatus,
} from "../automation-execution-journal";
import { createJsonFileAutomationIdempotencyStore } from "../automation-idempotency-store";
import { AutomationLibraryWorkerAdapter } from "../automation-worker-adapter";
import { automationCapabilityRegistry } from "../../automation/command-registry";
import { createDesktopAutomationFilePlanApprovalHandler } from "../automation-file-plan-approval";
import { resolveHostMediaBinaries } from "../media-binary-env";
import type { AutomationExecutionContext } from "../../automation/command-gateway";
import { runtime } from "../runtime/app-runtime";
import { getPluginActivationCoordinator } from "../plugins/plugin-system";
import { enqueueAutoAnalyzeAfterImport, processAiQueue } from "../ai/ai-queue";
import { publishLifecycle } from "../events/worker-events";
import {
  executeApiLibraryContextCommand,
  normalizeApiCommandInput,
  setAutomationJournalRef,
} from "../api/library-context-commands";
import {
  clearActiveRecentLibraryPath,
  forgetRecentLibrary,
  rememberOpenedLibrary,
} from "../library/recent-libraries-service";
import { notifyLibraryOpenedSideEffects } from "../library/library-open-flow";

/**
 * Automation backbone: the execution journal, idempotency store, Worker
 * adapter and the command Gateway with every Main-owned handler. Also owns
 * the long-lived HTTP operator execution with automatic wall-clock renewal.
 */

let journalInstance: AutomationExecutionJournal | undefined;
let gatewayInstance: AutomationCommandGateway | undefined;
let operatorExecution: { executionId: string } | undefined;
let pluginAutomationContexts: Map<string, AutomationExecutionContext> = new Map();
export function registerPluginAutomationContexts(map: Map<string, AutomationExecutionContext>): void {
  pluginAutomationContexts = map;
}

export function getAutomationCommandGateway(): AutomationCommandGateway | undefined {
  return gatewayInstance;
}
export function getAutomationExecutionJournal(): AutomationExecutionJournal | undefined {
  return journalInstance;
}
export function setupAutomation(): { journal: AutomationExecutionJournal; gateway: AutomationCommandGateway } {


const journal = new AutomationExecutionJournal({
  store: createJsonFileAutomationExecutionStore(
    path.join(app.getPath('userData'), 'automation-executions.json'),
  ),
  logger: runtime.logger!,
});
const automationIdempotencyStore = createJsonFileAutomationIdempotencyStore(
  path.join(app.getPath('userData'), 'automation-idempotency.json'),
);
const adapter = new AutomationLibraryWorkerAdapter(runtime.workerClient!, {
  onAiEnqueued: (libraryId) => processAiQueue(libraryId),
  onAiEnqueueError: (error, libraryId) => {
    runtime.logger?.error('automation.ai-queue.trigger-failed', error, { libraryId });
  },
});
const gateway = createAutomationCommandGateway(
  adapter,
  {
    resolve: (executionId) => {
      const pluginContext = pluginAutomationContexts.get(executionId);
      if (pluginContext !== undefined) return pluginContext;
      return journal.resolve(executionId);
    },
  },
  {
    auditSink: journal,
    auditLogger: runtime.logger!,
    idempotencyStore: automationIdempotencyStore,
    externalEffectHandler: {
      apply: ({ commandId, workerResult }) => {
        // The only current external automation effect is intentionally
        // consumed in Main: scripts receive the copied count, never an
        // absolute asset path or an Electron clipboard handle.
        if (commandId !== 'asset.paths.copy'
          || !workerResult.ok
          || workerResult.type !== 'media.asset-paths') {
          throw new Error(`Unexpected automation external effect: ${commandId}`);
        }
        clipboard.writeText(workerResult.absolutePaths.join('\n'));
      },
    },
    mediaBinariesHandler: {
      get: () => {
        const binaries = resolveHostMediaBinaries();
        if (binaries === undefined) {
          throw new Error('MEDIA_BINARIES_NOT_FOUND');
        }
        return binaries;
      },
    },
    // Headless: plugin UI dialogs and toasts have no surface; plugin
    // backend contributions (jobs, hooks, providers, MCP tools) keep working.
    uiDialogHandler: {
      open: () => Promise.reject(new Error('DIALOG_WINDOW_UNAVAILABLE')),
      patch: () => {
        throw new Error('DIALOG_SESSION_NOT_FOUND');
      },
    },
    uiNotifyHandler: {
      notify: (input) => {
        runtime.logger?.info('plugin.ui-notify', input.message.trim().slice(0, 500), {
          severity: input.severity,
        });
      },
    },
    filePlanApprovalHandler: createDesktopAutomationFilePlanApprovalHandler({
      workerClient: adapter,
      audit: { info: (scope: string, message: string, context?: Record<string, unknown>) => runtime.logger?.info(scope, message, context) },
      // Headless approval policy: fail closed. Dangerous file plans are
      // rejected and logged; no human confirmation surface exists.
      confirm: async () => false,
      runWillHooks: async ({ commandId, libraryId, commandInput, planSummary }) => {
        if (commandId !== 'asset.trash' || getPluginActivationCoordinator() === undefined) {
          return { warnings: [] };
        }
        const input = commandInput as { assetIds?: readonly string[] };
        const result = await getPluginActivationCoordinator()!.runWillHooks({
          event: 'asset.trash',
          libraryId,
          summary: {
            operation: planSummary.operation,
            targetCount: planSummary.targetCount,
            executableCount: planSummary.executableCount,
            blockedCount: planSummary.blockedCount,
            assetIds: Array.isArray(input.assetIds) ? [...input.assetIds] : [],
          },
        });
        return { warnings: result.warnings };
      },
    }),
    // Plugin executions are library-scoped Host calls, not Automation
    // Executions owned by the journal. They still use the Gateway for
    // domain access, but must not enter the journal's active-context CAS;
    // doing so rejects every plugin command because no journal record exists
    // for the plugin instance execution id.
    contextBarrier: {
      beginCommand: (executionId, contextRevision) => {
        if (pluginAutomationContexts.has(executionId)) {
          return { release: () => undefined };
        }
        return journal.beginCommand(executionId, contextRevision);
      },
    },
    libraryContextHandler: {
      execute: executeApiLibraryContextCommand,
    },
    // Serpent-ihpx: automation imports (MCP/scripts) are no different from
    // human imports — the same automatic AI analysis side effect fires here,
    // converging on the exact function the desktop import IPC uses.
    onImportCompleted: ({ libraryId, importedAssetIds }) => {
      if (importedAssetIds.length === 0) return;
      runtime.logger?.info('automation.import-completed', `Imported ${importedAssetIds.length} asset(s).`, {
        libraryId,
      });
      void enqueueAutoAnalyzeAfterImport(libraryId, importedAssetIds);
    },
    historyEntryHandler: {
      onCommitted: ({ executionId, historyEntryId }) => {
        // The Worker owns the executable history.  Main keeps only the
        // path-free receipt so the script compatibility route can undo all
        // mutations made by one execution without maintaining a second
        // inverse-operation journal.
        journal.appendHistoryEntry(executionId, historyEntryId);
      },
    },
    apiInputNormalizer: normalizeApiCommandInput,
    libraryBindingHandler: {
      onLibraryCreated: async ({ source, library }) => {
        rememberOpenedLibrary(library.libraryPath, library.displayName, library.libraryId);
        await notifyLibraryOpenedSideEffects({
          libraryId: library.libraryId,
          libraryDirectory: library.libraryPath,
        });
        publishLifecycle({
          type: 'library.opened',
          ...(source === 'http' ? { source } : {}),
          library: {
            libraryId: library.libraryId,
            displayName: library.displayName,
            displayPath: library.libraryPath,
          },
        });
      },
      onLibraryClosed: async ({ source, libraryId }) => {
        getPluginActivationCoordinator()?.onLibraryClosed(libraryId);
        for (const [executionId, context] of pluginAutomationContexts) {
          if (context.libraryId === libraryId) pluginAutomationContexts.delete(executionId);
        }
        clearActiveRecentLibraryPath();
        publishLifecycle({
          type: 'library.closed',
          libraryId,
          ...(source === 'http' ? { source } : {}),
        });
      },
      onLibraryRenamed: async ({ source, library }) => {
        rememberOpenedLibrary(library.libraryPath, library.displayName, library.libraryId);
        publishLifecycle({
          type: 'library.opened',
          ...(source === 'http' ? { source } : {}),
          library: {
            libraryId: library.libraryId,
            displayName: library.displayName,
            displayPath: library.libraryPath,
          },
        });
      },
      onLibraryDeleted: async ({ source, libraryId, displayName, libraryPath }) => {
        getPluginActivationCoordinator()?.onLibraryClosed(libraryId);
        for (const [executionId, context] of pluginAutomationContexts) {
          if (context.libraryId === libraryId) pluginAutomationContexts.delete(executionId);
        }
        forgetRecentLibrary(libraryPath);
        publishLifecycle({
          type: 'library.closed',
          libraryId,
          ...(source === 'http' ? { source } : {}),
        });
        runtime.logger?.info('automation.library-deleted', `Deleted library "${displayName}".`, {
          libraryId,
        });
      },
      onLibraryImported: async ({ source, libraryId, displayName, libraryPath }) => {
        rememberOpenedLibrary(libraryPath, displayName, libraryId);
        await notifyLibraryOpenedSideEffects({
          libraryId,
          libraryDirectory: libraryPath,
        });
        publishLifecycle({
          type: 'library.opened',
          ...(source === 'http' ? { source } : {}),
          library: {
            libraryId,
            displayName,
            displayPath: libraryPath,
          },
        });
        runtime.logger?.info('automation.library-imported', `Imported library "${displayName}".`, {
          libraryId,
        });
      },
      transitionLibraryContext: async ({ executionId, source, libraryId, displayName, expectedRevision, authorizationSource }) => {
        const libraries = await runtime.workerClient!.request({ type: 'library.list' });
        if (!libraries.ok || libraries.type !== 'library.list') {
          throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
        }
        const boundLibrary = libraries.libraries.find((library) => library.libraryId === libraryId);
        if (!boundLibrary) {
          throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
        }
        const bound = journal.authorizeLibrary(executionId, libraryId);
        const transitioned = journal.transitionLibraryContext({
          executionId,
          libraryId,
          ...(displayName === undefined ? {} : { displayName }),
          expectedRevision,
          authorizationSource,
        });
        if (transitioned === undefined || transitioned.libraryId !== libraryId) {
          throw new Error('The automation execution could not bind the created library.');
        }
        if (bound === undefined) {
          throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_CONTEXT_CONFLICT');
        }
        rememberOpenedLibrary(boundLibrary.libraryPath, boundLibrary.displayName, boundLibrary.libraryId);
        await notifyLibraryOpenedSideEffects({
          libraryId: boundLibrary.libraryId,
          libraryDirectory: boundLibrary.libraryPath,
        });
        publishLifecycle({
          type: 'library.opened',
          ...(source === 'http' ? { source } : {}),
          library: {
            libraryId: boundLibrary.libraryId,
            displayName: boundLibrary.displayName,
            displayPath: boundLibrary.libraryPath,
          },
        });
      },
    },
    undoGroupHandler: {
      create: ({ executionId, libraryId }) => {
        if (!journal) {
          throw new Error('The automation execution journal is unavailable.');
        }
        const group = journal.createUndoGroup({ executionId, libraryId });
        return { undoGroupId: group.undoGroupId };
      },
      append: ({ undoGroupId, item }) => {
        if (!journal) {
          throw new Error('The automation execution journal is unavailable.');
        }
        const group = journal.appendUndoGroupItems(undoGroupId, [item]);
        if (!group) {
          throw new Error(`Undo group ${undoGroupId} was not found while appending recovery items.`);
        }
      },
      complete: ({ undoGroupId, status, failureReason }) => {
        if (!journal) {
          throw new Error('The automation execution journal is unavailable.');
        }
        const group = journal.completeUndoGroup(undoGroupId, { status, failureReason });
        if (!group) {
          throw new Error(`Undo group ${undoGroupId} was not found while completing the group.`);
        }
      },
    },
    executionStatusHandler: {
      getStatus: (executionId) => {
        const record = journal.get(executionId);
        if (!record) return undefined;
        return {
          projection: projectAutomationExecutionStatus(record),
          source: record.source,
        };
      },
    },
  },
);

  if (!runtime.workerClient || !runtime.logger) {
    throw new Error('HTTP API requires journal, gateway, worker, and logger.');
  }
  // One long-lived operator execution backs every HTTP API call. The bearer
  // token holder is the operator: full capabilities, no interactive approval —
  // the audit journal and idempotency store still record everything.
  operatorExecution = journal.create({
    source: 'http',
    libraryId: null,
    declaredCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
    initialGrantedCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
  });
  setAutomationJournalRef(journal);
  journalInstance = journal;
  gatewayInstance = gateway;
  journal.start(operatorExecution.executionId);
  return { journal, gateway };
}

/** Executes one command envelope against the Gateway (HTTP API surface). */
export async function executeAutomationCommand(envelope: unknown): Promise<unknown> {
  return gatewayInstance!.execute(envelope);
}

/**
 * Resolves the operator execution for the HTTP API, rolling it forward when
 * its wall-clock budget expires so the API stays live without a restart.
 */
export function resolveOperatorExecutionContext(): AutomationExecutionContext | undefined {
  const journal = journalInstance;
  if (journal === undefined || operatorExecution === undefined) return undefined;
  const active = journal.resolve(operatorExecution.executionId);
  if (active !== undefined) return active;
  try {
    const renewed = journal.create({
      source: 'http',
      libraryId: null,
      declaredCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
      initialGrantedCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
    });
    journal.start(renewed.executionId);
    operatorExecution = renewed;
    runtime.logger?.info('http-api.execution-renewed', 'Renewed the HTTP API operator execution.', {
      executionId: renewed.executionId,
    });
    return journal.resolve(renewed.executionId);
  } catch (error) {
    runtime.logger?.error('http-api.execution-renew', error);
    return undefined;
  }
}
