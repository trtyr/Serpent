import {
  createPluginDomainEvent,
} from "../../plugins/plugin-domain-events";
import type {
  AssetChangeEvent,
  LibraryChangedEvent,
} from "../../shared/protocol/responses";
import { parseAssetChangeEvent, parseLibraryChangedEvent } from "../../shared/protocol/responses";
import { evictArtifactPathCache } from "../media/artifact-path-service";
import { sourcePathCache } from "../media/source-path-service";
import { runtime } from "../runtime/app-runtime";
import { enqueueAutoAnalyzeAfterImport } from "../ai/ai-queue";
import type { LibraryWorkerClient } from "../worker-client";
import type { PluginDomainEvent } from "../../plugins/plugin-domain-events";

/**
 * Worker event fan-out. UI progress pushes are gone (headless); what remains
 * is cache invalidation, the plugin domain-event bus, the change-sequence
 * tracker echoed on HTTP API responses, and the AI input-ready hook.
 */

export function publishProgress(_event: unknown): void {
  // Headless: UI progress push is gone; jobs are observable via job.* commands.
}

export function publishAiProgress(_event: unknown): void {
  // Headless: UI progress push is gone; AI results land in worker metadata.
}

export function publishAiCompleted(_event: unknown): void {
  // Headless: UI progress push is gone; AI results land in worker metadata.
}

export function publishAiCleared(_event: unknown): void {
  // Headless: UI progress push is gone.
}

export function publishLifecycle(_event: unknown): void {
  // Headless: lifecycle events have no renderer to notify; the HTTP API and
  // journal carry state instead.
}

let pluginFanOut: ((event: PluginDomainEvent) => void) | undefined;
export function setPluginDomainEventFanOut(fanOut: (event: PluginDomainEvent) => void): void {
  pluginFanOut = fanOut;
}

export function publishAssetChange(event: AssetChangeEvent): void {
  const parsed = parseAssetChangeEvent(event);
  // Asset changes can invalidate a cached source path (delete, relink, move,
  // or replacement). Artifact-only library changes use the separate
  // library.changed channel and do not evict the protocol hot path.
  sourcePathCache.clearLibrary(parsed.libraryId);
  evictArtifactPathCache(parsed.libraryId);
  if (pluginFanOut !== undefined) {
    pluginFanOut(createPluginDomainEvent({
      kind: 'asset.changed',
      libraryId: parsed.libraryId,
      summary: {
        changedCount: parsed.changedCount,
        missingCount: parsed.missingCount,
        ...(parsed.source === undefined ? {} : { source: parsed.source }),
      },
    }));
  }
}

export function publishLibraryChanged(event: LibraryChangedEvent): void {
  const parsed = parseLibraryChangedEvent(event);
  // HTTP API responses echo the latest change sequence (ADR-0031 §2).
  runtime.libraryChangeSequences.set(parsed.libraryId, parsed.changeSequence);
  if (pluginFanOut !== undefined) {
    pluginFanOut(createPluginDomainEvent({
      kind: 'library.changed',
      libraryId: parsed.libraryId,
      summary: {
        changeSequence: parsed.changeSequence,
      },
    }));
  }
}

/** Registers every Worker event consumer. Call once after the worker starts. */
export function wireWorkerEvents(workerClient: LibraryWorkerClient): void {
  workerClient.onAssetsChanged(publishAssetChange);
  workerClient.onLibraryChanged(publishLibraryChanged);
  workerClient.onProgress(publishProgress);
  workerClient.onAiProgress(publishAiProgress);
  workerClient.onAiAnalysisCompleted(publishAiCompleted);
  workerClient.onAiContentCleared(publishAiCleared);
  // 视频 contact sheet / 模型缩略图就绪 = 自动分析的视觉输入边界；导入时
  // 入队可能与该媒体队列竞争，输入就绪时重入队该资产（worker 去重已排队/
  // 运行中/已分析）。
  workerClient.onAiInputReady((event) => {
    void enqueueAutoAnalyzeAfterImport(event.libraryId, [event.assetId]);
  });
  workerClient.onThumbnailEvent((_event) => {
    // Headless: thumbnail completion is persisted by the worker; no live
    // viewer to push the event to.
  });
}
