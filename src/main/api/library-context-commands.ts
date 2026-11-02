import type { AutomationExecutionContext } from "../../automation/command-gateway";
import type { AutomationCommandId } from "../../automation/command-registry";
import { AutomationLibraryContextError } from "../automation-execution-journal";
import { runtime } from "../runtime/app-runtime";
import {
  readRecentLibrariesForAutoOpen,
  readRecentLibraryById,
  rememberOpenedLibrary,
} from "../library/recent-libraries-service";
import { notifyLibraryOpenedSideEffects } from "../library/library-open-flow";
import type { AutomationExecutionJournal } from "../automation-execution-journal";

/**
 * HTTP API library-context commands (library.list-open / list-recent / open /
 * show-in-desktop). Executed through the Gateway's libraryContextHandler; they
 * own the execution library binding that stateless library-scoped calls target.
 */

let journalRef: AutomationExecutionJournal | undefined;
export function setAutomationJournalRef(journal: AutomationExecutionJournal | undefined): void {
  journalRef = journal;
}
function getAutomationExecutionJournal(): AutomationExecutionJournal | undefined {
  return journalRef;
}

async function executeApiLibraryContextCommand(input: {
  commandId: 'library.list-open' | 'library.list-recent' | 'library.open' | 'library.show-in-desktop';
  executionId: string;
  context: AutomationExecutionContext;
  commandInput: unknown;
}): Promise<unknown> {
  if (input.commandId === 'library.list-recent') {
    return readRecentLibrariesForAutoOpen().map((entry) => ({
      libraryId: entry.libraryId ?? null,
      displayName: entry.name,
    }));
  }
  const journal = getAutomationExecutionJournal();
  const client = runtime.workerClient;
  if (!journal || !client) {
    throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
  }
  const listed = await client.request({ type: 'library.list' });
  if (!listed.ok || listed.type !== 'library.list') {
    throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
  }
  const libraries = listed.libraries;
  if (input.commandId === 'library.list-open') {
    return {
      libraries: libraries.map((library) => ({
        libraryId: library.libraryId,
        displayName: library.displayName,
        active: false,
      })),
      activeLibraryId: null,
      contextRevision: 0, // TODO: wire to automation journal revision for optimistic concurrency
    };
  }

  const commandInput = input.commandInput as { libraryId?: string };
  let selected = commandInput.libraryId === undefined
    ? undefined
    : libraries.find((library) => library.libraryId === commandInput.libraryId);
  let needsOpen = false;
  if (input.commandId === 'library.open' && selected === undefined && commandInput.libraryId !== undefined) {
    const recent = readRecentLibraryById(commandInput.libraryId!);
    if (recent === undefined) {
      throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_NOT_OPEN');
    }
    selected = {
      libraryId: recent.libraryId!,
      displayName: recent.name,
      libraryPath: recent.path,
    };
    needsOpen = true;
  }
  if (input.commandId === 'library.open' && selected === undefined) {
    throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_NOT_OPEN');
  }
  if (selected === undefined) {
    throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_NOT_OPEN');
  }
  if (input.commandId === 'library.open') {
    if (selected.libraryId === '' || needsOpen) {
      
      const opened = await client.request({
        type: 'library.open',
        selectedLibraryPath: selected.libraryPath,
      });
      if (!opened.ok || opened.type !== 'library.opened') {
        throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
      }
      selected = opened.library;
      rememberOpenedLibrary(selected.libraryPath, selected.displayName, selected.libraryId);
      await notifyLibraryOpenedSideEffects({
        libraryId: selected.libraryId,
        libraryDirectory: selected.libraryPath,
      });
      
    }
  }
  if (selected.libraryId === '') {
    throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
  }
  // library.show-in-desktop is a no-op in headless mode
  return {
    libraryId: selected.libraryId,
    displayName: selected.displayName,
    contextRevision: 0, // TODO: wire to automation journal revision for optimistic concurrency
  };
}



async function normalizeApiCommandInput(input: {
  commandId: AutomationCommandId;
  executionId: string;
  context: AutomationExecutionContext;
  commandInput: unknown;
  signal?: AbortSignal;
}): Promise<unknown | undefined> {
  return input.commandInput;
}

export { executeApiLibraryContextCommand, normalizeApiCommandInput };
