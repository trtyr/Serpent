import {
  AI_ANALYSIS_QUEUE_BATCH_SIZE,
} from "../../shared/ai-concurrency";
import { DEFAULT_AI_RELIABILITY_SETTINGS } from "../../shared/ai-reliability";
import { toWireAiAnalysisSettings } from "../../shared/ai-analysis-settings";
import { AiQueueScheduler } from "../ai-queue-scheduler";
import {
  captureAiConnectionSnapshot,
  legacyAiConnectionProfile,
} from "../ai-profile-store";
import {
  getDecryptedApiKey,
  getDecryptedProfileApiKey,
  hasCompletedAiProfileMigration,
  loadAiConfig,
} from "../config/ai-config-store";
import { runtime } from "../runtime/app-runtime";

/**
 * AI analysis queue: scheduler wiring, batch processing against the Worker
 * and the auto-analyze side effect fired after imports.
 */

const aiQueueScheduler = new AiQueueScheduler(processAiQueueBatch, {
  batchSize: AI_ANALYSIS_QUEUE_BATCH_SIZE,
  baseRetryDelayMs: DEFAULT_AI_RELIABILITY_SETTINGS.retryBaseDelayMs,
  maxRetryDelayMs: DEFAULT_AI_RELIABILITY_SETTINGS.retryMaxDelayMs,
  retryJitterRatio: DEFAULT_AI_RELIABILITY_SETTINGS.retryJitterRatio,
});


async function enqueueAutoAnalyzeAfterImport(
  libraryId: string,
  importedAssetIds: string[],
  folderId?: string,
): Promise<void> {
  try {
    const config = loadAiConfig();
    if (!config.autoAnalyzeEnabled || !config.hasKey || !config.apiFormat) return;
    const workerClient = runtime.workerClient;
    if ((importedAssetIds.length === 0 && !folderId) || !workerClient) return;

    const result = await workerClient.request({
      type: "ai.enqueue-analysis",
      libraryId,
      ...(importedAssetIds.length > 0 ? { assetIds: importedAssetIds } : {}),
      ...(folderId ? { folderId } : {}),
    });
    if (result.ok && result.type === "ai.jobs.enqueued") {
      runtime.logger?.info(
        "auto-analyze",
        `Enqueued ${result.enqueued} AI analysis jobs after import.`,
      );
      await processAiQueue(libraryId);
    }
  } catch (error) {
    runtime.logger?.error("auto-analyze", error);
    // Non-blocking: import succeeded regardless of AI enqueue failure.
  }
}

async function processAiQueue(libraryId: string): Promise<void> {
  try {
    const config = loadAiConfig();
    aiQueueScheduler.setRetryPolicy(config.reliabilitySettings);
    await aiQueueScheduler.trigger(libraryId);
  } catch (error) {
    runtime.logger?.error("ai.queue.config", error, { libraryId });
  }
}

async function processAiQueueBatch(
  libraryId: string,
  maxJobs: number,
): Promise<{ processed: number; requeued: number }> {
  let config: ReturnType<typeof loadAiConfig>;
  try {
    config = loadAiConfig();
  } catch (error) {
    runtime.logger?.error("ai.queue.config", error, { libraryId });
    return { processed: 0, requeued: 0 };
  }
  const activeProfile = config.profiles.find(
    (profile) => profile.id === config.activeProfileId,
  );
  const legacyFallbackAvailable = !activeProfile
    && !hasCompletedAiProfileMigration()
    && Boolean(config.apiFormat);
  const workerClient = runtime.workerClient;
  if (!config.hasKey || !workerClient || (!activeProfile && !legacyFallbackAvailable)) {
    return { processed: 0, requeued: 0 };
  }
  try {
    const profile = activeProfile ?? legacyAiConnectionProfile({
      apiFormat: config.apiFormat,
      model: config.model,
      baseUrl: config.baseUrl,
    });
    const apiKey = activeProfile
      ? getDecryptedProfileApiKey(activeProfile.id)
      : getDecryptedApiKey();
    const connection = captureAiConnectionSnapshot(profile, apiKey);
    // Keep each Worker admission bounded. A 32-job batch with 16 external
    // waits used to be one long scheduler request; slice it into short
    // continuations so claim/commit ownership is reacquired between waves.
    const sliceSize = Math.max(1, Math.min(config.concurrencyLimit, 8));
    let processed = 0;
    let requeued = 0;
    while (processed < maxJobs) {
      const requested = Math.min(sliceSize, maxJobs - processed);
      const result = await workerClient.request({
        type: "ai.process-queue",
        libraryId,
        apiFormat: connection.apiFormat,
        model: connection.model,
        apiKey: connection.apiKey,
        ...(connection.baseUrl.trim() ? { baseUrl: connection.baseUrl.trim() } : {}),
        enabledFields: {
          description: config.descriptionEnabled,
          tags: config.tagEnabled,
          rating: config.ratingEnabled,
        },
        analysisSettings: toWireAiAnalysisSettings(config.analysisSettings),
        languages: config.languages,
        concurrencyLimit: config.concurrencyLimit,
        maxAnalysisImageEdgePx: config.maxAnalysisImageEdgePx,
        requestTimeoutMs: config.reliabilitySettings.requestTimeoutMs,
        maxAttempts: config.reliabilitySettings.maxAttempts,
        maxJobs: requested,
      });
      if (!result.ok) {
        runtime.logger?.error(
          "ai.queue.process",
          new Error(`Worker rejected AI queue batch: ${result.error.code}`),
        );
        break;
      }
      if (result.type !== "ai.jobs.processed") {
        runtime.logger?.error(
          "ai.queue.process",
          new Error(`Unexpected AI queue result: ${result.type}`),
        );
        break;
      }
      processed += result.processed;
      requeued += result.requeued;
      if (result.requeued > 0 || result.processed < requested) break;
      await new Promise<void>((resolve) => setImmediate(resolve));
    }
    return { processed, requeued };
  } catch (error) {
    runtime.logger?.error("ai.queue.process", error);
    return { processed: 0, requeued: 0 };
  }
}

export { clearAiQueue, enqueueAutoAnalyzeAfterImport, processAiQueue, processAiQueueBatch };

function clearAiQueue(): void {
  aiQueueScheduler.clearAll();
}
