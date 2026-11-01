import { recentLibraryAutoOpenEnabled } from "../recent-libraries";
import { runtime } from "../runtime/app-runtime";
import { publishLifecycle } from "../events/worker-events";
import { processAiQueue } from "../ai/ai-queue";
import {
  getPluginActivationCoordinator,
  getPluginJobScheduler,
} from "../plugins/plugin-system";
import { syncPluginThumbnailExtensions } from "../plugins/plugin-thumbnail-extensions";
import {
  readActiveRecentLibraryPath,
  readRecentLibrariesForAutoOpen,
  rememberOpenedLibrary,
} from "./recent-libraries-service";
import { showMissingLinkedFiles } from "./show-missing-linked-files";

/**
 * Shared library-open side effects (AI queue kick, plugin activation, job
 * tick, thumbnail-provider sync) and the headless startup auto-open flow.
 */

async function notifyLibraryOpenedSideEffects(input: {
  libraryId: string;
  libraryDirectory: string;
}): Promise<void> {
  void processAiQueue(input.libraryId);
  try {
    await getPluginActivationCoordinator()?.onLibraryOpened({
      libraryId: input.libraryId,
      libraryDirectory: input.libraryDirectory,
    });
  } catch (error) {
    runtime.logger?.error("plugin.activation.library-opened", error, {
      libraryId: input.libraryId,
    });
  }
  // Global plugin activation uses an internal pseudo-library. Once the real
  // library is open, tick only jobs explicitly enqueued or retried in this
  // application session; interrupted rows are never auto-recovered.
  getPluginJobScheduler()?.tick(input.libraryId);
  await syncPluginThumbnailExtensions();
  runtime.workerClient?.publishShowMissingLinkedFiles(showMissingLinkedFiles);
}


/**
 * Headless startup restore: reopen the most recent library through the same
 * worker path the desktop open flow uses, so MCP/extension clients immediately
 * have an active library. Failures are logged and non-fatal — the backend
 * keeps running with no library open.
 */
async function autoOpenRecentLibrary(): Promise<void> {
  const workerClient = runtime.workerClient;
  if (!workerClient) return;
  if (!recentLibraryAutoOpenEnabled()) return;
  const activePath = readActiveRecentLibraryPath();
  const candidates = activePath
    ? [activePath, ...readRecentLibrariesForAutoOpen().map((entry) => entry.path)]
    : readRecentLibrariesForAutoOpen().map((entry) => entry.path);
  const target = candidates.find((candidate) => typeof candidate === "string" && candidate.length > 0);
  if (!target) {
    runtime.logger?.info("library.auto-open", "No recent library to reopen.");
    return;
  }
  try {
    const opened = await workerClient.request({
      type: "library.open",
      selectedLibraryPath: target,
    });
    if (!opened.ok || opened.type !== "library.opened") {
      runtime.logger?.error("library.auto-open", new Error("Recent library failed to open."));
      return;
    }
    rememberOpenedLibrary(
      opened.library.libraryPath,
      opened.library.displayName,
      opened.library.libraryId,
    );
    await notifyLibraryOpenedSideEffects({
      libraryId: opened.library.libraryId,
      libraryDirectory: opened.library.libraryPath,
    });
    publishLifecycle({
      type: "library.opened",
      source: "startup-restore",
      library: {
        libraryId: opened.library.libraryId,
        displayName: opened.library.displayName,
        displayPath: opened.library.libraryPath,
      },
    });
    runtime.logger?.info("library.auto-open", `Reopened library "${opened.library.displayName}".`, {
      libraryId: opened.library.libraryId,
    });
  } catch (error) {
    runtime.logger?.error("library.auto-open", error);
  }
}

export { notifyLibraryOpenedSideEffects, autoOpenRecentLibrary };
