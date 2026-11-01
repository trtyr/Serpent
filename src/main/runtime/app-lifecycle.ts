import { app } from "electron";

import { toPublicError } from "../../shared/protocol/errors";
import { runtime } from "./app-runtime";
import { startApplication } from "../start-application";
import { cleanupAllExternalSources } from "../library/external-library-staging";
import { stopSyncAutoScheduler } from "../sync/sync-setup";
import { disposeOffscreenThumbnailRenderer } from "../media/offscreen-thumbnail-setup";
import { disposePluginSystem } from "../plugins/plugin-system";
import { stopHttpApiServer } from "../api/http-api-setup";
import { clearAiQueue } from "../ai/ai-queue";

/**
 * Electron application lifecycle: single-instance guard, ready → start,
 * and the ordered shutdown sequence (listeners → worker drain → exit).
 */

const allowMultiInstance = process.env.SERPENT_ALLOW_MULTI_INSTANCE === "1";

export const hasSingleInstanceLock = allowMultiInstance
  ? true
  : app.requestSingleInstanceLock();

export function releaseLoopbackListeners(): Promise<void> {
  if (runtime.loopbackRelease !== undefined) return runtime.loopbackRelease;
  runtime.loopbackRelease = stopHttpApiServer();
  return runtime.loopbackRelease;
}

export function registerAppLifecycle(): void {
  if (!hasSingleInstanceLock) {
    app.quit();
    return;
  }

  app
    .whenReady()
    .then(startApplication)
    .catch((error: unknown) => {
      runtime.logger?.error("main.startup", error);
      // Headless: no dialog surface; log loudly and exit non-zero.
      process.stderr.write(`Serpent could not start: ${toPublicError(error).message}
`);
      app.exit(1);
    });

  app.on("will-quit", () => {
    void cleanupAllExternalSources();
    stopSyncAutoScheduler();
  });

  app.on("before-quit", (event) => {
    runtime.applicationQuitting = true;
    clearAiQueue();
    if (runtime.quitAfterShutdown || !runtime.workerClient) return;
    event.preventDefault();
    if (runtime.applicationShutdownPromise) return;

    // Slice E: fail in-flight model thumbnail renders and destroy the window.
    disposeOffscreenThumbnailRenderer();
    disposePluginSystem('supervisor-shutdown');

    // Close loopback listeners before the worker drain so a service restart
    // does not keep a port open while the next process starts.
    const apiClose = releaseLoopbackListeners();
    // Stop model processes before app.exit(), which bypasses will-quit.
    runtime.applicationShutdownPromise = (async (): Promise<void> => {
      const results = await Promise.allSettled([apiClose]);
      for (const result of results) {
        if (result.status !== "rejected") continue;
        runtime.logger?.error("http-api.close", result.reason, { reason: "application-quit" });
      }
      try {
        await runtime.workerClient?.shutdown();
      } catch (error) {
        runtime.logger?.error("library.worker.shutdown", error, { reason: "application-quit" });
      }
      runtime.quitAfterShutdown = true;
      // The first app.quit() is intentionally intercepted above while owned
      // processes and the Worker drain. app.exit() then completes that quit.
      app.exit(0);
    })();
    void runtime.applicationShutdownPromise.catch((error: unknown) => {
      runtime.logger?.error("application.shutdown", error);
      runtime.quitAfterShutdown = true;
      app.exit(0);
    });
  });
}
