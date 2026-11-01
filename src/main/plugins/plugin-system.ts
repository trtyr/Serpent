import path from "node:path";

import { app, utilityProcess } from "electron";

import { automationCapabilitiesFromPluginPermissions } from "../../plugins/plugin-permission-capabilities";
import { validatePluginCauseChain } from "../../plugins/plugin-domain-events";
import { pluginTargetLibraryIdSchema } from "../../plugins/plugin-commands";
import {
  pluginHostCommandRequiresBoundLibrary,
  resolvePluginHostCommandLibraryId,
} from "../../plugins/plugin-host-command-target";
import { PluginHostCommandError } from "../../shared/plugin-host-command-error";
import type { AutomationCommandGateway, AutomationExecutionContext } from "../../automation/command-gateway";
import {
  AUTOMATION_API_VERSION,
} from "../../automation/command-registry";
import { normalizeAutomationAssetSearchInput } from "../normalize-automation-asset-search-input";
import { PluginActivationCoordinator } from "../plugin-activation-coordinator";
import { PluginJobScheduler } from "../plugin-job-scheduler";
import { loadOrCreatePluginDeviceId } from "../plugin-device-identity";
import { PluginPackageManager } from "../plugin-package-manager";
import { PluginProviderScheduler } from "../plugin-provider-scheduler";
import { PluginRuntimeSupervisor, type PluginRuntimeHostCommandHandler, type PluginRuntimeInputCaptureStartHandler, type PluginRuntimeJobControlHandler, type PluginRuntimeJobEnqueueHandler, type PluginRuntimeJobProgressHandler, type PluginRuntimeStorageHandler } from "../plugin-runtime-supervisor";
import { PluginStorageStore, PluginStorageStoreError } from "../plugin-storage-store";
import { PluginTrustedRuntimeSupervisor } from "../plugin-trusted-runtime-supervisor";
import { PLUGIN_API_VERSION } from "../../plugins/plugin-manifest";
import { createContributionRegistry } from "../../plugins/plugin-contributions";
import { createPluginProviderRegistry } from "../../plugins/plugin-providers";
import { pluginJobOwnerCanRetry, pluginJobOwnerMatches } from "../../plugins/plugin-jobs";
import { runtime } from "../runtime/app-runtime";
import { setPluginActivationCoordinatorRef, syncPluginThumbnailExtensions } from "./plugin-thumbnail-extensions";
import { setPluginDomainEventFanOut } from "../events/worker-events";
import { registerPluginAutomationContexts } from "../automation/automation-setup";

/**
 * The plugin backend: runtime supervisors (restricted + trusted), activation
 * coordinator, job/provider schedulers and the package manager, constructed
 * in `setupPluginSystem` during application start.
 */

let pluginRuntimeSupervisor: PluginRuntimeSupervisor | undefined;
let pluginTrustedRuntimeSupervisor: PluginTrustedRuntimeSupervisor | undefined;
let pluginActivationCoordinator: PluginActivationCoordinator | undefined;
let pluginJobScheduler: PluginJobScheduler | undefined;
let pluginProviderScheduler: PluginProviderScheduler | undefined;
let pluginPackageManager: PluginPackageManager | undefined;
const pluginAutomationContexts = new Map<string, AutomationExecutionContext>();

export function getPluginActivationCoordinator(): PluginActivationCoordinator | undefined {
  return pluginActivationCoordinator;
}
export function getPluginJobScheduler(): PluginJobScheduler | undefined {
  return pluginJobScheduler;
}
export function disposePluginSystem(reason: Parameters<PluginActivationCoordinator["dispose"]>[0]): void {
  pluginActivationCoordinator?.dispose(reason);
}
export function getPluginProviderScheduler(): PluginProviderScheduler | undefined {
  return pluginProviderScheduler;
}

export async function setupPluginSystem(gateway: AutomationCommandGateway): Promise<void> {
  registerPluginAutomationContexts(pluginAutomationContexts);
  setPluginDomainEventFanOut((event) => pluginActivationCoordinator?.fanOutDomainEvent(event));

  function currentPluginCompatibilityPlatform():
    | { platform: 'darwin' | 'win32' | 'linux'; arch: 'arm64' | 'x64' | 'ia32' }
    | undefined {
    const platform = process.platform;
    const arch = process.arch;
    if ((platform !== 'darwin' && platform !== 'win32' && platform !== 'linux')
      || (arch !== 'arm64' && arch !== 'x64' && arch !== 'ia32')) {
      return undefined;
    }
    return { platform, arch };
  }


  const executePluginHostCommand: PluginRuntimeHostCommandHandler = async (commandId, input, context) => {
    
      const cause = validatePluginCauseChain(context.causeChain);
    if (!cause.ok) {
      throw new Error(cause.message);
    }
    const resolvedTarget = resolvePluginHostCommandLibraryId({
      commandId,
      libraryId: context.libraryId,
      ...(context.targetLibraryId === undefined ? {} : { targetLibraryId: context.targetLibraryId }),
    });
    if (!resolvedTarget.ok) {
      throw new Error(resolvedTarget.message);
    }
    const activeInstance = pluginActivationCoordinator?.findActiveInstance(context.instanceId);
    if (activeInstance === undefined) {
      throw new Error('The plugin instance is no longer active.');
    }
    let boundLibraryId = resolvedTarget.libraryId;
    if (boundLibraryId !== null) {
      if (activeInstance.instanceScope === 'library'
        && activeInstance.activationLibraryId !== boundLibraryId) {
        throw new Error('A library-scoped plugin cannot target another library.');
      }
      const libraries = await runtime.workerClient?.request({ type: 'library.list' });
      const libraryIsOpen = libraries?.ok === true
        && libraries.type === 'library.list'
        && libraries.libraries.some((library) => library.libraryId === boundLibraryId);
      if (!libraryIsOpen) {
        if (pluginHostCommandRequiresBoundLibrary(commandId)) {
          throw new Error('The plugin command target library is not open.');
        }
        boundLibraryId = null;
      }
    }
    const executionId = context.targetLibraryId === undefined || boundLibraryId === null
      ? context.instanceId
      : `${context.instanceId}:${boundLibraryId}`;
    pluginAutomationContexts.set(executionId, {
      executionId,
      source: 'plugin',
      libraryId: boundLibraryId,
      grantedCapabilities: automationCapabilitiesFromPluginPermissions(context.permissions),
      pluginId: context.pluginId,
      pluginInstanceId: context.instanceId,
    });
    const commandInput = commandId === 'asset.search'
      ? normalizeAutomationAssetSearchInput(input)
      : input;
    if (commandInput === undefined) {
      throw new Error('Invalid search query.');
    }
    const result = await gateway.execute({
      apiVersion: AUTOMATION_API_VERSION,
      commandId,
      executionId,
      input: commandInput,
    });
    if (!result.ok) {
      // Serpent-8b5b.2: plugin host commands are never critical; a challenge
      // outcome is mapped defensively to a gateway failure.
      const failure = 'challenge' in result && result.challenge !== undefined
        ? { code: 'AUTOMATION_CHALLENGE_REQUIRED', message: 'Dangerous operation requires agent confirmation.' }
        : (result as { error: { code: string; message: string } }).error;
      runtime.logger?.error('plugin.host-command.gateway-failed', new Error(failure.message ?? failure.code), {
        instanceId: context.instanceId,
        pluginId: context.pluginId,
        commandId,
        errorCode: failure.code,
      });
      throw new PluginHostCommandError(failure.code, failure.message ?? failure.code);
    }
    return result.result;
  };
  const recordPluginRuntimeCrash = (crash: {
    instanceId: string;
    libraryId: string;
    libraryDirectory: string;
    pluginId: string;
    packageHash: string;
    failureCode: string;
  }): void => {
    void pluginPackageManager?.recordRuntimeCrash({
      libraryId: crash.libraryId,
      libraryDirectory: crash.libraryDirectory,
      pluginId: crash.pluginId,
      packageHash: crash.packageHash,
      failureCode: crash.failureCode,
    }).catch((error) => {
      runtime.logger?.error('plugin.runtime.crash-record', error, crash);
    });
  };
  const pluginStorageStore = new PluginStorageStore(app.getPath('userData'));
  // Note: plugin settings were a renderer-managed store; headless plugins use
  // defaults. The store module stays for a future settings API.
  const executePluginStorage: PluginRuntimeStorageHandler = async (input) => {
    try {
      return await pluginStorageStore.execute({
        operation: input.operation,
        scope: input.scope ?? 'library',
        pluginId: input.context.pluginId,
        libraryId: input.context.libraryId,
        libraryDirectory: input.context.libraryDirectory,
        permissions: input.context.permissions,
        ...(input.key === undefined ? {} : { key: input.key }),
        ...(input.value === undefined ? {} : { value: input.value }),
      });
    } catch (error) {
      if (error instanceof PluginStorageStoreError) throw error;
      throw error;
    }
  };
  const resolvePluginJobTargetLibrary = async (input: {
    instanceId: string;
    requestedTargetLibraryId?: string;
    ambientLibraryId: string;
  }): Promise<{ record: NonNullable<ReturnType<PluginActivationCoordinator['findActiveInstance']>>; libraryId: string }> => {
    const coordinator = pluginActivationCoordinator;
    const client = runtime.workerClient;
    if (coordinator === undefined || client === undefined) {
      throw Object.assign(new Error('Plugin jobs are unavailable in this session.'), { code: 'JOBS_UNAVAILABLE' });
    }
    const record = coordinator.findActiveInstance(input.instanceId);
    if (record === undefined) {
      throw Object.assign(new Error('The plugin instance is no longer active.'), { code: 'INSTANCE_GONE' });
    }
    if (record.instanceScope === 'global' && input.requestedTargetLibraryId === undefined) {
      throw Object.assign(
        new Error('Global plugin jobs require an explicit open target library.'),
        { code: 'JOB_TARGET_REQUIRED' },
      );
    }
    const candidate = input.requestedTargetLibraryId ?? input.ambientLibraryId;
    const parsedTarget = pluginTargetLibraryIdSchema.safeParse(candidate);
    if (!parsedTarget.success) {
      throw Object.assign(new Error('The plugin job target library is invalid.'), { code: 'JOB_TARGET_INVALID' });
    }
    if (record.instanceScope === 'library' && record.activationLibraryId !== parsedTarget.data) {
      throw Object.assign(
        new Error('A library-scoped plugin cannot target another library.'),
        { code: 'JOB_TARGET_SCOPE_VIOLATION' },
      );
    }
    const libraries = await client.request({ type: 'library.list' });
    if (!libraries.ok || libraries.type !== 'library.list'
      || !libraries.libraries.some((library) => library.libraryId === parsedTarget.data)) {
      throw Object.assign(new Error('The plugin job target library is not open.'), { code: 'JOB_TARGET_NOT_OPEN' });
    }
    return { record, libraryId: parsedTarget.data };
  };
  const handlePluginJobEnqueue: PluginRuntimeJobEnqueueHandler = async (input) => {
    const client = runtime.workerClient;
    if (client === undefined) {
      throw Object.assign(new Error('Plugin jobs are unavailable in this session.'), { code: 'JOBS_UNAVAILABLE' });
    }
    const { record, libraryId } = await resolvePluginJobTargetLibrary({
      instanceId: input.instanceId,
      requestedTargetLibraryId: input.targetLibraryId,
      ambientLibraryId: input.context.libraryId,
    });
    const coordinator = pluginActivationCoordinator;
    if (coordinator === undefined) {
      throw Object.assign(new Error('Plugin jobs are unavailable in this session.'), { code: 'JOBS_UNAVAILABLE' });
    }
    const validated = coordinator.validateJobEnqueue({
      instanceId: input.instanceId,
      handlerId: input.handlerId,
      ...(input.recoveryStrategy === undefined ? {} : { recoveryStrategy: input.recoveryStrategy }),
    });
    if (!validated.ok) {
      throw Object.assign(new Error(validated.message), { code: validated.code });
    }
    const result = await client.request({
      type: 'plugin.jobs.enqueue',
      libraryId,
      ownerPluginId: input.context.pluginId,
      ownerPackageHash: input.context.packageHash,
      ownerPluginInstanceId: input.instanceId,
      ownerScope: record.instanceScope,
      ownerLibraryId: libraryId,
      pluginHandlerId: input.handlerId,
      payload: input.payload,
      recoveryStrategy: validated.recoveryStrategy,
    });
    if (!result.ok || result.type !== 'plugin.jobs.enqueued') {
      throw Object.assign(
        new Error(result.ok ? 'Plugin job enqueue returned an unexpected result.' : result.error.reason),
        { code: result.ok ? 'JOB_ENQUEUE_FAILED' : result.error.code },
      );
    }
    pluginJobScheduler?.tick(libraryId);
    return { jobId: result.job.jobId };
  };
  const handlePluginJobProgress: PluginRuntimeJobProgressHandler = async (input) => {
    const client = runtime.workerClient;
    if (client === undefined) {
      throw Object.assign(new Error('Plugin jobs are unavailable in this session.'), { code: 'JOBS_UNAVAILABLE' });
    }
    const { record, libraryId: targetLibraryId } = await resolvePluginJobTargetLibrary({
      instanceId: input.instanceId,
      requestedTargetLibraryId: input.targetLibraryId,
      ambientLibraryId: input.context.libraryId,
    });
    const result = await client.request({
      type: 'plugin.jobs.report-progress',
      libraryId: targetLibraryId,
      jobId: input.jobId,
      ownerPluginId: input.context.pluginId,
      ownerPackageHash: input.context.packageHash,
      ownerPluginInstanceId: input.instanceId,
      ownerScope: record.instanceScope,
      ownerLibraryId: targetLibraryId,
      ...input.progress,
    });
    if (!result.ok || result.type !== 'plugin.jobs.completed') {
      throw Object.assign(
        new Error(result.ok ? 'Plugin job progress returned an unexpected result.' : result.error.reason),
        { code: result.ok ? 'JOB_PROGRESS_FAILED' : result.error.code },
      );
    }
  };
  const handlePluginJobControl: PluginRuntimeJobControlHandler = async (input) => {
    const client = runtime.workerClient;
    const coordinator = pluginActivationCoordinator;
    if (client === undefined || coordinator === undefined) {
      throw Object.assign(new Error('Plugin jobs are unavailable in this session.'), { code: 'JOBS_UNAVAILABLE' });
    }
    const { record, libraryId } = await resolvePluginJobTargetLibrary({
      instanceId: input.instanceId,
      requestedTargetLibraryId: input.targetLibraryId,
      ambientLibraryId: input.context.libraryId,
    });
    const listed = await client.request({ type: 'plugin.jobs.list', libraryId });
    if (!listed.ok || listed.type !== 'plugin.jobs.listed') {
      throw Object.assign(new Error('The plugin job list could not be read.'), { code: 'JOB_LIST_FAILED' });
    }
    const job = listed.jobs.find((candidate) => candidate.jobId === input.jobId);
    const owner = {
      pluginId: record.pluginId,
      packageHash: record.packageHash,
      pluginInstanceId: record.instanceId,
      scope: record.instanceScope,
      libraryId,
    } as const;
    const ownsJob = job !== undefined && (input.action === 'retry'
      ? pluginJobOwnerCanRetry(job, owner)
      : pluginJobOwnerMatches(job, owner));
    if (!ownsJob) {
      throw Object.assign(new Error('The plugin does not own this job.'), { code: 'JOB_OWNERSHIP_MISMATCH' });
    }
    const capabilities = {
      handlerId: job.pluginHandlerId,
      resumable: job.recoveryStrategy === 'checkpoint',
      ...(job.checkpoint?.version === undefined ? { checkpointVersion: 'v1' } : { checkpointVersion: job.checkpoint.version }),
    } as const;
    const requestOwner = {
      ownerPluginId: record.pluginId,
      ownerPackageHash: record.packageHash,
      ownerPluginInstanceId: record.instanceId,
      ownerScope: record.instanceScope,
      ownerLibraryId: libraryId,
    } as const;
    let result: Awaited<ReturnType<typeof client.request>>;
    switch (input.action) {
      case 'cancel':
        result = await client.request({ type: 'plugin.jobs.cancel', libraryId, jobId: input.jobId, ...requestOwner, reason: input.reason });
        break;
      case 'pause':
        if (input.checkpoint === undefined) {
          throw Object.assign(new Error('Pausing a plugin job requires a checkpoint.'), { code: 'CHECKPOINT_REQUIRED' });
        }
        result = await client.request({
          type: 'plugin.jobs.pause', libraryId, jobId: input.jobId, ...requestOwner,
          capabilities,
          checkpoint: input.checkpoint,
        });
        break;
      case 'resume':
        result = await client.request({ type: 'plugin.jobs.resume', libraryId, jobId: input.jobId, ...requestOwner, capabilities });
        break;
      case 'retry':
        result = await client.request({ type: 'plugin.jobs.retry', libraryId, jobId: input.jobId, ...requestOwner, retryInput: input.retryInput });
        break;
    }
    if (!result.ok || !('job' in result)) {
      throw Object.assign(new Error(result.ok ? 'Plugin job control returned an unexpected result.' : result.error.reason), {
        code: result.ok ? 'JOB_CONTROL_FAILED' : result.error.code,
      });
    }
    if ((input.action === 'cancel' || input.action === 'pause') && result.job !== null) {
      if (record.mode === 'restricted') pluginRuntimeSupervisor?.signalJob(record.instanceId, input.jobId, input.action, input.reason);
      else pluginTrustedRuntimeSupervisor?.signalJob(record.instanceId, input.jobId, input.action, input.reason);
    }
    if (input.action === 'resume' || input.action === 'retry') pluginJobScheduler?.tick(libraryId);
    return { job: result.job };
  };
  const onPluginInstanceActivated = (input: { libraryId: string }): void => {
    pluginJobScheduler?.tick(input.libraryId);
  };
  // Headless: OS-level keyboard/pointer capture is a GUI plugin capability
  // and is always rejected; every other plugin capability keeps working.
  const handlePluginInputCaptureStart: PluginRuntimeInputCaptureStartHandler = () => ({
    ok: false,
    code: 'CAPTURE_UNAVAILABLE',
    message: 'Input capture is unavailable in headless Serpent.',
  });
  pluginRuntimeSupervisor = new PluginRuntimeSupervisor({
    modulePath: path.join(__dirname, 'plugin_standard_host.js'),
    fork: (modulePath) => utilityProcess.fork(modulePath, [], {
      serviceName: 'Serpent Plugin Standard Host',
      stdio: 'pipe',
    }),
    executeHostCommand: executePluginHostCommand,
    executeStorage: executePluginStorage,
    handleJobEnqueue: handlePluginJobEnqueue,
    handleJobProgress: handlePluginJobProgress,
    handleJobControl: handlePluginJobControl,
    handleInputCaptureStart: handlePluginInputCaptureStart,
    handleInputCaptureRelease: () => undefined,
    onInstanceDeactivated: () => undefined,
    onInstanceCrashed: ({ instanceId, failureCode }) => {
      pluginActivationCoordinator?.onInstanceCrashed({ instanceId, failureCode });
    },
    onCrash: recordPluginRuntimeCrash,
    onInstanceActivated: onPluginInstanceActivated,
    logger: runtime.logger,
  });
  pluginTrustedRuntimeSupervisor = new PluginTrustedRuntimeSupervisor({
    modulePath: path.join(__dirname, 'plugin_trusted_host.js'),
    fork: (modulePath) => utilityProcess.fork(modulePath, [], {
      serviceName: 'Serpent Plugin Trusted Host',
      stdio: 'pipe',
    }),
    executeHostCommand: executePluginHostCommand,
    executeStorage: executePluginStorage,
    handleJobEnqueue: handlePluginJobEnqueue,
    handleJobProgress: handlePluginJobProgress,
    handleJobControl: handlePluginJobControl,
    handleInputCaptureStart: handlePluginInputCaptureStart,
    handleInputCaptureRelease: () => undefined,
    onInstanceDeactivated: () => undefined,
    onInstanceCrashed: ({ instanceId, failureCode }) => {
      pluginActivationCoordinator?.onInstanceCrashed({ instanceId, failureCode });
    },
    onInstanceActivated: onPluginInstanceActivated,
    onCrash: recordPluginRuntimeCrash,
    logger: runtime.logger,
  });
  const pluginCompatibility = currentPluginCompatibilityPlatform();
  const nodeAbi = Number(process.versions.modules);
  if (pluginCompatibility === undefined || !Number.isSafeInteger(nodeAbi) || nodeAbi <= 0) {
    runtime.logger?.error('plugin.platform', new Error('This platform cannot run the plugin package manager.'), {
      platform: process.platform,
      arch: process.arch,
      nodeAbi: process.versions.modules,
    });
  } else {
    pluginPackageManager = new PluginPackageManager({
      userDataDirectory: app.getPath('userData'),
      deviceId: await loadOrCreatePluginDeviceId(app.getPath('userData')),
      serpentVersion: app.getVersion(),
      pluginApiVersion: PLUGIN_API_VERSION,
      ...pluginCompatibility,
      nodeAbi,
      logger: runtime.logger,
      onDeviceStateRecovered: () => {
        runtime.logger?.info('plugin.device-state-recovered', 'Plugin trust state was recovered; settings re-authorization may be required.');
      },
    });
    pluginActivationCoordinator = new PluginActivationCoordinator({
      packageManager: pluginPackageManager,
      supervisor: pluginRuntimeSupervisor,
      trustedSupervisor: pluginTrustedRuntimeSupervisor,
      globalRuntimeContext: {
        libraryId: '__serpent_global_runtime__',
        libraryDirectory: app.getPath('userData'),
      },
      contributions: createContributionRegistry(),
      providers: createPluginProviderRegistry(),
      compatibility: {
        serpentVersion: app.getVersion(),
        pluginApiVersion: PLUGIN_API_VERSION,
        ...pluginCompatibility,
        nodeAbi,
      },
      pausePluginJobs: async ({ libraryId, owners }) => {
        const client = runtime.workerClient;
        if (client === undefined) return;
        const result = await client.request({
          type: 'plugin.jobs.pause-owners',
          libraryId,
          owners,
          errorCode: 'PLUGIN_INSTANCE_INACTIVE',
          errorDetail: 'The plugin instance is no longer active.',
        });
        if (!result.ok) {
          throw new Error(result.error.reason);
        }
      },
      onInstanceActivated: ({ libraryId }) => {
        pluginJobScheduler?.tick(libraryId);
      },
      onContributionsRegistered: ({ libraryId }) => {
        void pluginProviderScheduler?.materializeLibrary(libraryId).catch((error) => {
          runtime.logger?.error('plugin.providers.materialize', error, { libraryId });
        });
        void syncPluginThumbnailExtensions().catch((error) => {
          runtime.logger?.error('plugin.thumbnail-extensions', error, { libraryId });
        });
      },
      onProvidersChanged: () => {
        void syncPluginThumbnailExtensions().catch((error) => {
          runtime.logger?.error('plugin.thumbnail-extensions', error);
        });
      },
      logger: runtime.logger,
    });
    pluginJobScheduler = new PluginJobScheduler({
      supervisor: pluginRuntimeSupervisor,
      trustedSupervisor: pluginTrustedRuntimeSupervisor,
      requestWorker: async (command) => {
        const client = runtime.workerClient;
        if (client === undefined) return { ok: false };
        const result = await client.request(command);
        if (!result.ok) return { ok: false };
        if (result.type === 'plugin.jobs.claimed') {
          return { ok: true, type: result.type, job: result.job };
        }
        if (result.type === 'plugin.jobs.completed') {
          return { ok: true, type: result.type, job: result.job };
        }
        return { ok: false };
      },
      resolveInstances: (libraryId) => {
        const coordinator = pluginActivationCoordinator;
        if (coordinator === undefined) return [];
        const bindings = coordinator.listActiveInstances(libraryId);
        const standard = pluginRuntimeSupervisor?.listActiveInstances(libraryId) ?? [];
        const trusted = pluginTrustedRuntimeSupervisor?.listActiveInstances(libraryId) ?? [];
        return bindings.map((binding) => {
          const source = binding.mode === 'restricted'
            ? standard.find((item) => item.instanceId === binding.instanceId)
            : trusted.find((item) => item.instanceId === binding.instanceId);
          return {
            ...binding,
            activated: source?.activated ?? false,
          };
        });
      },
      logger: runtime.logger,
    });
    pluginProviderScheduler = new PluginProviderScheduler({
      coordinator: pluginActivationCoordinator,
      supervisor: pluginRuntimeSupervisor,
      trustedSupervisor: pluginTrustedRuntimeSupervisor,
      requestWorker: async (command) => {
        const client = runtime.workerClient;
        if (client === undefined) return { ok: false };
        const result = await client.request(command);
        if (!result.ok) return { ok: false };
        if (result.type === 'asset.list') {
          return { ok: true, type: result.type, assets: result.assets };
        }
        if (result.type === 'plugin.derived-fields.materialized') {
          return {
            ok: true,
            type: result.type,
            writtenCount: result.writtenCount,
            fieldKey: result.fieldKey,
          };
        }
        if (result.type === 'asset.search.result') {
          return {
            ok: true,
            type: result.type,
            items: result.items,
            total: result.total,
            offset: result.offset,
            snippets: result.snippets,
          };
        }
        return { ok: false };
      },
      logger: runtime.logger,
    });
    runtime.workerClient?.onPluginMediaProviderRequest(async (input) => {
      const scheduler = pluginProviderScheduler;
      if (scheduler === undefined) {
        return {
          status: 'native-fallback',
          assetId: input.assetId,
          kind: input.kind,
          errorCode: 'PLUGIN_PROVIDER_UNAVAILABLE',
        };
      }
      try {
        return await scheduler.resolveMediaProvider(input);
      } catch (error) {
        runtime.logger?.error('plugin.media-provider.request', error, {
          libraryId: input.libraryId,
          assetId: input.assetId,
          kind: input.kind,
        });
        return {
          status: 'native-fallback',
          assetId: input.assetId,
          kind: input.kind,
          errorCode: 'PLUGIN_PROVIDER_FAILED',
        };
      }
    });
  }

  // Thumbnail-provider sync reads the coordinator through the bridge.
  setPluginActivationCoordinatorRef(pluginActivationCoordinator);

  // Global user-scoped plugins have an application lifetime and must be set
  // up before recent-library restore, including when no library can reopen.
  await pluginActivationCoordinator?.refreshGlobal();
}
