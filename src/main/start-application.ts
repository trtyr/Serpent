import path from "node:path";

import { app } from "electron";

import { AppLogger } from "./app-logger";
import { chooseUniqueSessionLogPath, pruneSessionLogs } from "./session-log";
import { LibraryWorkerClient } from "./worker-client";
import { runtime } from "./runtime/app-runtime";
import { sweepOrphanExternalLibraryStagingOnStartup } from "./library/external-library-staging";
import { retryPendingLibraryCleanups } from "./library/pending-library-cleanup";
import { setupOffscreenThumbnailRenderer } from "./media/offscreen-thumbnail-setup";
import { setupAutomation } from "./automation/automation-setup";
import { setupPluginSystem } from "./plugins/plugin-system";
import { registerSerpentProtocol } from "./protocols/serpent-protocol";
import { setupSyncAutoScheduler } from "./sync/sync-setup";
import { initializePreviewCache } from "./media/preview-cache-service";
import { startHttpApiServer } from "./api/http-api-setup";
import { autoOpenRecentLibrary } from "./library/library-open-flow";
import { wireWorkerEvents } from "./events/worker-events";
import { showMissingLinkedFiles } from "./library/show-missing-linked-files";

/**
 * Startup orchestration only — every domain wires itself up in its own
 * module; this sequence preserves the original initialization order.
 */
export async function startApplication(): Promise<void> {
  // Windows: keep the AppUserModelID so any OS-level integration (jump lists,
  // notifications from media jobs) groups under the Serpent identity.
  if (process.platform === "win32") {
    app.setAppUserModelId("com.serpent.app");
  }
  // Isolated E2E runs must not write the log into the real user profile
  // (~/Library/Logs/Serpent); pin it under the temp userData instead.
  if (process.env.SERPENT_E2E === "1" && process.env.SERPENT_E2E_USER_DATA_PATH) {
    app.setAppLogsPath(path.join(process.env.SERPENT_E2E_USER_DATA_PATH, "logs"));
  } else {
    app.setAppLogsPath();
  }
  runtime.appLogPath = chooseUniqueSessionLogPath(app.getPath("logs"), new Date());
  runtime.logger = new AppLogger(runtime.appLogPath);
  const logger = runtime.logger;
  void sweepOrphanExternalLibraryStagingOnStartup();
  // Serpent-wgmy: 会话日志最多保留最近 100 份，启动时清理最旧；
  // 清理失败不得阻断启动。
  try {
    pruneSessionLogs(app.getPath("logs"));
  } catch (error) {
    logger.error("session-log.prune", error);
  }
  const workerClient = new LibraryWorkerClient(
    path.join(__dirname, "library_worker.js"),
    logger,
    {
      ...process.env,
      SERPENT_LIBRARY_METADATA_CACHE_PATH: path.join(
        app.getPath('userData'),
        'library-metadata-cache',
      ),
      SERPENT_SEMANTIC_LEGACY_CACHE_ROOT: app.getPath('userData'),
      SERPENT_MAIN_PROCESS_SESSION_ID: runtime.sessionId,
    },
  );
  runtime.workerClient = workerClient;
  await workerClient.start();
  workerClient.publishShowMissingLinkedFiles(showMissingLinkedFiles);
  // Serpent-65d837: remove any `.del-*` aside roots that could not be deleted
  // during a previous session (deferred-cleanup store, backoff loop).
  retryPendingLibraryCleanups();
  setupOffscreenThumbnailRenderer(workerClient);
  const { gateway } = setupAutomation();
  await setupPluginSystem(gateway);
  registerSerpentProtocol();
  setupSyncAutoScheduler(workerClient, logger);
  wireWorkerEvents(workerClient);

  // Start the HTTP API server (the machine-facing surface).
  await startHttpApiServer();
  initializePreviewCache();

  // Headless bootstrap: restore the most recent library so the HTTP API and
  // script surfaces have an active context immediately after startup.
  await autoOpenRecentLibrary();
}
