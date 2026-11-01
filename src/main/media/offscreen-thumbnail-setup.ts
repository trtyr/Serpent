import path from "node:path";

import { BrowserWindow, ipcMain } from "electron";

import {
  createOffscreenThumbnailRenderer,
  packagedRendererOutDir,
  resolveOffscreenPageUrl,
  type OffscreenThumbnailRenderer,
} from "../offscreen-thumbnail-renderer";
import { renderDocumentThumbnail } from "../document-thumbnail-renderer";
import {
  clearModelThumbnailSourceAuthorizations,
  registerModelThumbnailSourceAuthorizations,
} from "../model-thumbnail-source-cache";
import { OFFSCREEN_THUMBNAIL_FRAME_CHANNEL } from "../../shared/protocol/channels";
import type { LibraryWorkerClient } from "../worker-client";
import { runtime } from "../runtime/app-runtime";

/**
 * Slice E (Serpent-hnmg): Main owns the shared hidden offscreen window that
 * renders model thumbnails to PNG bytes; the Worker persists the artifact.
 * HTML document thumbnails (Serpent-8ca259) ride the same capture approach.
 */

let offscreenThumbnailRenderer: OffscreenThumbnailRenderer | undefined;

export function setupOffscreenThumbnailRenderer(workerClient: LibraryWorkerClient): void {
// Slice E (Serpent-hnmg): Main owns the shared offscreen window that renders
// model thumbnails. The worker enqueues model jobs and asks Main to render;
// Main replies with PNG bytes (or a typed failure) that the worker persists
// as the standard `thumbnail` artifact.
offscreenThumbnailRenderer = createOffscreenThumbnailRenderer({
  createWindow: (options) => {
    // The hidden offscreen window is media pipeline infrastructure, not UI.
    const offscreenWindow = new BrowserWindow(options);
    offscreenWindow.webContents.on(
      "console-message",
      (_event: unknown, level: number, message: string, line: number, sourceId: string) => {
        runtime.logger?.info("offscreen-thumbnail.console", message, { level, line, sourceId });
      },
    );
    offscreenWindow.webContents.on(
      "did-fail-load",
      (_event: unknown, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean) => {
        runtime.logger?.error(
          "offscreen-thumbnail.page-load-failed",
          new Error(`${errorCode}: ${errorDescription}`),
          { errorCode, validatedURL, isMainFrame },
        );
      },
    );
    offscreenWindow.webContents.on("did-finish-load", () => {
      runtime.logger?.info(
        "offscreen-thumbnail.page-finished-load",
        "Offscreen renderer page finished loading.",
      );
      void offscreenWindow.webContents
        .executeJavaScript(
          "({ readyState: document.readyState, body: document.body.innerHTML, hasBridge: Boolean(window.offscreenThumbnail), debug: window.__serpentOffscreenThumbnailDebug })",
        )
        .then((state) => {
          runtime.logger?.info(
            "offscreen-thumbnail.page-state",
            "Inspected offscreen renderer page state.",
            { state },
          );
        })
        .catch((error: unknown) => {
          runtime.logger?.error("offscreen-thumbnail.page-state", error);
        });
    });
    return offscreenWindow;
  },
  onFrameMessage: (listener) => {
    const onFrameMessage = (_event: Electron.IpcMainEvent, payload: unknown): void => {
      listener(payload);
    };
    ipcMain.on(OFFSCREEN_THUMBNAIL_FRAME_CHANNEL, onFrameMessage);
    return () =>
      ipcMain.removeListener(OFFSCREEN_THUMBNAIL_FRAME_CHANNEL, onFrameMessage);
  },
  logger: {
    error: (scope, error, context) => runtime.logger?.error(scope, error, context),
    info: (scope, message, context) => runtime.logger?.info(scope, message, context),
  },
  pageUrl: resolveOffscreenPageUrl({
    devServerUrl: MAIN_WINDOW_VITE_DEV_SERVER_URL ?? null,
    rendererOutDir: packagedRendererOutDir(),
  }),
  preloadPath: path.join(__dirname, "offscreen.js"),
});
workerClient.onModelThumbnailRenderRequest((request, sourceAuthorizations) => {
  const renderer = offscreenThumbnailRenderer;
  if (!renderer) {
    return Promise.resolve({
      status: "failed" as const,
      errorCode: "MODEL_WINDOW_FAILED",
      reason: "offscreen thumbnail renderer unavailable",
    });
  }
  registerModelThumbnailSourceAuthorizations(sourceAuthorizations);
  return renderer.renderModelThumbnail(request).finally(() => {
    clearModelThumbnailSourceAuthorizations(sourceAuthorizations);
  });
});
workerClient.onModelThumbnailRenderCancel((requestId) => {
  offscreenThumbnailRenderer?.cancelModelThumbnail(requestId);
});
// Serpent-8ca259: HTML document thumbnails capture the source in a fresh
// offscreen window in Main; the Worker persists the artifact bytes.
workerClient.onDocumentThumbnailRenderRequest((request) =>
  renderDocumentThumbnail(request, runtime.logger!),
);
}

export function disposeOffscreenThumbnailRenderer(): void {
  offscreenThumbnailRenderer?.dispose();
  offscreenThumbnailRenderer = undefined;
}
