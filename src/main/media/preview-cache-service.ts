import path from "node:path";

import { app } from "electron";

import { PreviewCache } from "../preview-cache";
import { runtime } from "../runtime/app-runtime";

/**
 * Serpent-1e3d4f: Chromium never persists custom-protocol responses on disk,
 * so every session re-reads preview bytes from (possibly remote) origin.
 * Mirror served image previews into userData and serve later sessions from
 * there. Image mimes only — video proxies/posters would thrash the budget
 * with Range-streamed large files.
 */
let previewCache: PreviewCache | undefined;

export function getPreviewCache(): PreviewCache | undefined {
  return previewCache;
}

export function initializePreviewCache(): void {
  if (process.env.SERPENT_PREVIEW_CACHE_DISABLED === "1") return;
  // E2E suites manipulate artifact files and rows directly; a mirror would
  // serve phantom bytes. Probes that verify the cache opt in explicitly.
  if (process.env.SERPENT_E2E === "1" && process.env.SERPENT_PREVIEW_CACHE_FORCE !== "1") {
    return;
  }
  const budgetBytes = Number(process.env.SERPENT_PREVIEW_CACHE_BUDGET_BYTES ?? "");
  const cacheLogEnabled = process.env.SERPENT_PREVIEW_CACHE_LOG === "1";
  previewCache = new PreviewCache({
    rootDir: path.join(app.getPath("userData"), "preview-cache"),
    budgetBytes: Number.isFinite(budgetBytes) && budgetBytes > 0 ? budgetBytes : 2 * 1024 * 1024 * 1024,
    onEvent: cacheLogEnabled
      ? (event) => runtime.logger?.info("preview-cache", `${event.kind} ${event.libraryId} ${event.artifactId}${event.detail ? ` ${event.detail}` : ""}`)
      : undefined,
  });
  void previewCache.evictToBudget();
}
