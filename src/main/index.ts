import path from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
  type Dirent,
} from "node:fs";

import {
  app,
  BrowserWindow,
  clipboard,
  ipcMain,
  protocol,
  safeStorage,
  utilityProcess,
} from "electron";

import { ArtifactPathCache } from "./artifact-path-cache";
import { SourcePathCache, type SourcePathResolution } from "./source-path-cache";
import { artifactProtocolMimeForExtension } from "../shared/media-formats";
import type { SyncServerRecord, SyncBindingRecord } from "./sync-records";
import {
  recoverAiProfileTransaction as recoverAiProfileTransactionFromJournal,
  type AiProfileTransactionIo,
} from "./ai-profile-transaction";
import {
  runAiProfileMigrationStartup,
} from "./ai-profile-legacy-config";
import {
  AiProfileStorageError,
  captureAiConnectionSnapshot,
  emptyAiProfileCatalog,
  isAiProfileId,
  legacyAiConnectionProfile,
  migrateAiProfileStorage,
  parseAiProfileCatalog,
  resolveAiCredential,
  summarizeAiProfiles,
  type AiProfileCatalog,
} from "./ai-profile-store";
import { readAtomicJsonFile, writeAtomicJsonFile } from "./atomic-json-file";
import { sweepOrphanExternalLibraryStaging } from "./external-library-archive";
import { OFFSCREEN_THUMBNAIL_FRAME_CHANNEL } from "../shared/protocol/channels";
import {
  createAutomationCommandGateway,
  type AutomationCommandGateway,
} from '../automation/command-gateway';
import { resolveHostMediaBinaries } from './media-binary-env';
import { PluginHostCommandError } from '../shared/plugin-host-command-error';
import {
  APP_ASSET_HOST,
  createAppAssetResponse,
} from './app-assets';
import { AutomationLibraryWorkerAdapter } from './automation-worker-adapter';
import { createDesktopAutomationFilePlanApprovalHandler } from './automation-file-plan-approval';
import {
  AutomationExecutionJournal,
  AutomationLibraryContextError,
  createJsonFileAutomationExecutionStore,
  projectAutomationExecutionStatus,
} from './automation-execution-journal';
import { createJsonFileAutomationIdempotencyStore } from './automation-idempotency-store';
import { PluginRuntimeSupervisor, type PluginRuntimeHostCommandHandler, type PluginRuntimeInputCaptureStartHandler, type PluginRuntimeJobControlHandler, type PluginRuntimeJobEnqueueHandler, type PluginRuntimeJobProgressHandler, type PluginRuntimeStorageHandler } from './plugin-runtime-supervisor';
import { normalizeAutomationAssetSearchInput } from './normalize-automation-asset-search-input';
import { PluginTrustedRuntimeSupervisor } from './plugin-trusted-runtime-supervisor';
import { PluginActivationCoordinator } from './plugin-activation-coordinator';
import { PluginJobScheduler } from './plugin-job-scheduler';
import { PluginProviderScheduler } from './plugin-provider-scheduler';
import { pluginTargetLibraryIdSchema } from '../plugins/plugin-commands';
import { pluginHostCommandRequiresBoundLibrary, resolvePluginHostCommandLibraryId } from '../plugins/plugin-host-command-target';
import { PluginStorageStore, PluginStorageStoreError } from './plugin-storage-store';
import { automationCapabilitiesFromPluginPermissions } from '../plugins/plugin-permission-capabilities';
import { createContributionRegistry } from '../plugins/plugin-contributions';
import { createPluginProviderRegistry } from '../plugins/plugin-providers';
import { pluginJobOwnerCanRetry, pluginJobOwnerMatches } from '../plugins/plugin-jobs';
import { loadOrCreatePluginDeviceId } from './plugin-device-identity';
import { PluginPackageManager } from './plugin-package-manager';
import { PLUGIN_API_VERSION } from '../plugins/plugin-manifest';
import {
  createPluginDomainEvent,
  validatePluginCauseChain,
} from '../plugins/plugin-domain-events';
import type { AutomationExecutionContext } from '../automation/command-gateway';
import {
  automationCapabilityRegistry,
  AUTOMATION_API_VERSION,
  type AutomationCommandId,
} from '../automation/command-registry';
import { toPublicError } from "../shared/protocol/errors";
import {
  type AssetChangeEvent,
  parseAssetChangeEvent,
  type LibraryChangedEvent,
  parseLibraryChangedEvent,
  type ImageSequenceImportOffer,
} from "../shared/protocol/responses";
import { LibraryWorkerClient } from "./worker-client";
import { createHttpApiServer, HTTP_API_DEFAULT_PORT, type HttpApiServer } from "./http-api-server";
import { readOrCreateApiToken } from "./api-token-store";
import { SyncAutoScheduler, type SyncBindingLike } from "./sync-auto-scheduler";
import { AppLogger } from "./app-logger";
import { chooseUniqueSessionLogPath, pruneSessionLogs } from "./session-log";
import {
  clearActiveRecentLibrary,
  recentLibraryAutoOpenEnabled,
  readActiveLibraryPath,
  readRecentLibraryEntries,
  rememberRecentLibrary,
  removeRecentLibrary,
} from "./recent-libraries";
import {
  readPendingCleanupAsidePaths,
  writePendingCleanupAsidePaths,
} from "./pending-cleanup-store";
import { resolvePendingImportFrame } from "./pending-import-frame";
import { createFontSamplePage, resolveFontSampleRequest } from "./font-sample-page";
import {
  readExternalLibraryStagingRoots,
  writeExternalLibraryStagingRoots,
} from "./external-library-staging-store";
import { AiQueueScheduler } from "./ai-queue-scheduler";
import {
  DEFAULT_AI_ANALYSIS_SETTINGS,
  toWireAiAnalysisSettings,
  type AiAnalysisSettings,
} from "../shared/ai-analysis-settings";
import {
  AI_ANALYSIS_QUEUE_BATCH_SIZE,
  DEFAULT_AI_ANALYSIS_CONCURRENCY,
} from "../shared/ai-concurrency";
import {
  DEFAULT_AI_ANALYSIS_IMAGE_EDGE_PX,
} from "../shared/ai-analysis-image";
import {
  DEFAULT_AI_RELIABILITY_SETTINGS,
  type AiReliabilitySettings,
} from "../shared/ai-reliability";
import {
  DEFAULT_AI_API_FORMAT,
  DEFAULT_AI_MODELS,
  type AiApiFormat,
} from "../shared/ai-endpoints";
import {
  normalizeAiAnalysisPreferences,
  type AiAnalysisPreferences,
} from "./ai-analysis-preferences";
import { createArtifactResponse } from "./artifact-response";
import { PreviewCache } from "./preview-cache";
import {
  bindLibraryMediaReadSignal,
  isLibraryMediaReadBlocked,
} from "./library-media-reads";
import {
  createOffscreenThumbnailRenderer,
  packagedRendererOutDir,
  resolveOffscreenPageUrl,
  type OffscreenThumbnailRenderer,
} from "./offscreen-thumbnail-renderer";
import { renderDocumentThumbnail } from "./document-thumbnail-renderer";
import {
  clearModelThumbnailSourceAuthorizations,
  registerModelThumbnailSourceAuthorizations,
  resolveModelThumbnailSourceAuthorization,
} from "./model-thumbnail-source-cache";
import { serpentProtocolSchemes } from "./serpent-protocol-privileges";

// Headless E2E hosts may expose no hardware WebGL implementation. Opt those
// tests into Chromium's explicitly acknowledged software path; production
// keeps the platform's normal GPU selection and never silently downgrades it.
// SERPENT_SOFTWARE_GL=1 is the same explicit opt-in for users on GPU-less
// hosts (Linux VMs / remote desktops without a usable GL driver), so the 3D
// viewer and model thumbnails can render via SwiftShader. Off by default.
if (
  (process.env.SERPENT_E2E === "1" &&
    process.env.SERPENT_E2E_ENABLE_SWIFTSHADER === "1") ||
  process.env.SERPENT_SOFTWARE_GL === "1"
) {
  app.commandLine.appendSwitch("enable-unsafe-swiftshader");
  app.commandLine.appendSwitch("use-angle", "swiftshader");
}

if (process.env.SERPENT_E2E === "1") {
  const explicitUserDataPath = process.env.SERPENT_E2E_USER_DATA_PATH;
  app.setPath(
    "userData",
    explicitUserDataPath && path.isAbsolute(explicitUserDataPath)
      ? explicitUserDataPath
      : path.join(tmpdir(), "serpent-e2e-user-data", String(process.pid)),
  );
  if (process.env.SERPENT_E2E_APP_UPDATE_FIXTURE === "1") {
    for (const [pathName, environmentName] of [
      ["downloads", "SERPENT_E2E_DOWNLOADS_PATH"],
      ["temp", "SERPENT_E2E_TEMP_PATH"],
    ] as const) {
      const configuredPath = process.env[environmentName];
      if (configuredPath && path.isAbsolute(configuredPath)) {
        mkdirSync(configuredPath, { recursive: true });
        app.setPath(pathName, configuredPath);
      }
    }
  }
}

// Dev multi-instance (Serpent-i6xg): isolate userData so SingletonLock / prefs
// do not collide. Prefer `npm run start:multi`. Do not open the same library
// for writes from two GUIs — SQLite write coordination is CLI/desktop lease
// territory (ADR-0021), not dual-GUI.
const allowMultiInstance = process.env.SERPENT_ALLOW_MULTI_INSTANCE === "1";
if (allowMultiInstance && process.env.SERPENT_E2E !== "1") {
  app.setPath(
    "userData",
    path.join(app.getPath("userData"), "dev-instances", `pid-${process.pid}`),
  );
}

// Before app.ready: stream privilege is required for seekable <video>/<audio>
// over serpent:// Range responses (Serpent-jh2).
protocol.registerSchemesAsPrivileged(serpentProtocolSchemes());

// E2E（本地/CI）：虚拟化 runner 的 GPU 不可靠，白屏会让所有交互测试
// 超时（CI mac 上 69 个 E2E 全挂）。禁用硬件加速换取稳定渲染。
if (
  process.env.SERPENT_E2E === "1" &&
  process.env.SERPENT_E2E_ENABLE_SWIFTSHADER !== "1"
) {
  app.disableHardwareAcceleration();
}

app.enableSandbox();

const hasSingleInstanceLock = allowMultiInstance
  ? true
  : app.requestSingleInstanceLock();

const mainProcessSessionId = randomUUID();
let workerClient: LibraryWorkerClient | undefined;
/** Latest worker change sequence per library, echoed on HTTP API responses. */
const libraryChangeSequences = new Map<string, number>();

let syncAutoScheduler: SyncAutoScheduler | undefined;
type ArtifactPathBatchWaiter = {
  artifactId: string;
  generation: number;
  resolve: (absolutePath: string) => void;
  reject: (error: Error) => void;
};
const artifactPathBatches = new Map<string, ArtifactPathBatchWaiter[]>();
const artifactPathCache = new ArtifactPathCache(4_096);

function evictArtifactPathCache(libraryId: string): void {
  artifactPathCache.evictLibrary(libraryId);
}

function resolveArtifactPathBatched(
  libraryId: string,
  artifactId: string,
  usage: "preview" | "proxy",
): Promise<string> {
  const generation = artifactPathCache.generation(libraryId);
  const cached = artifactPathCache.get(libraryId, artifactId, usage, generation);
  if (cached !== undefined) {
    // A lookup hit is also a use: keep hot viewport artifacts at the MRU end
    // of the bounded cache instead of evicting them after unrelated pages.
    return Promise.resolve(cached);
  }
  // Keep requests from different library generations in separate batches. A
  // reopen can happen while the 2ms coalescing window is still pending.
  const key = `${libraryId}\u0000${usage}\u0000${generation}`;
  return new Promise<string>((resolve, reject) => {
    const batch = artifactPathBatches.get(key) ?? [];
    batch.push({ artifactId, generation, resolve, reject });
    artifactPathBatches.set(key, batch);
    if (batch.length > 1) return;
    setTimeout(() => {
      const pending = artifactPathBatches.get(key) ?? [];
      artifactPathBatches.delete(key);
      const client = workerClient;
      if (!client) {
        const error = new Error("Library Worker is unavailable.");
        for (const waiter of pending) waiter.reject(error);
        return;
      }
      void (async () => {
        for (let index = 0; index < pending.length; index += 500) {
          const chunk = pending.slice(index, index + 500);
          const requestGeneration = chunk[0]?.generation ?? generation;
          try {
            const result = await client.request({
              type: "media.get-artifact-paths",
              libraryId,
              artifactIds: chunk.map((waiter) => waiter.artifactId),
              usage,
            });
            if (!result.ok || result.type !== "media.artifact-paths") {
              throw new Error("Artifact path batch lookup failed.");
            }
            const paths = new Map(
              result.entries.map((entry) => [entry.artifactId, entry.absolutePath]),
            );
            for (const waiter of chunk) {
              const absolutePath = paths.get(waiter.artifactId);
              if (
                absolutePath &&
                artifactPathCache.generation(libraryId) === requestGeneration
              ) {
                artifactPathCache.set(
                  libraryId,
                  waiter.artifactId,
                  usage,
                  absolutePath,
                  requestGeneration,
                );
                waiter.resolve(absolutePath);
              } else if (absolutePath) {
                waiter.reject(new Error("Artifact path resolution became stale."));
              } else {
                artifactPathCache.invalidateArtifact(libraryId, waiter.artifactId, usage);
                waiter.reject(new Error("Artifact was absent from path batch."));
              }
            }
          } catch (error) {
            const failure = error instanceof Error ? error : new Error(String(error));
            for (const waiter of chunk) waiter.reject(failure);
          }
        }
      })();
    }, 2);
  });
}
/**
 * Serpent-1e3d4f: Chromium never persists custom-protocol responses on disk,
 * so every session re-reads preview bytes from (possibly remote) origin.
 * Mirror served image previews into userData and serve later sessions from
 * there. Image mimes only — video proxies/posters would thrash the budget
 * with Range-streamed large files.
 */
let previewCache: PreviewCache | undefined;
function initializePreviewCache(): void {
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
      ? (event) => logger?.info("preview-cache", `${event.kind} ${event.libraryId} ${event.artifactId}${event.detail ? ` ${event.detail}` : ""}`)
      : undefined,
  });
  void previewCache.evictToBudget();
}
/** Slice E: shared offscreen window that renders model thumbnails (Serpent-hnmg). */
let offscreenThumbnailRenderer: OffscreenThumbnailRenderer | undefined;
let quitAfterShutdown = false;
let applicationShutdownPromise: Promise<void> | null = null;
let logger: AppLogger | undefined;
const VIEWER_TIMING_LOG = process.env.SERPENT_VIEWER_TIMING_LOG === "1";
let appLogPath: string | undefined;
let automationExecutionJournal: AutomationExecutionJournal | undefined;
let automationCommandGateway: AutomationCommandGateway | undefined;
let pluginRuntimeSupervisor: PluginRuntimeSupervisor | undefined;
let pluginTrustedRuntimeSupervisor: PluginTrustedRuntimeSupervisor | undefined;
let pluginActivationCoordinator: PluginActivationCoordinator | undefined;
let httpApiServer: HttpApiServer | undefined;
let pluginJobScheduler: PluginJobScheduler | undefined;
let pluginProviderScheduler: PluginProviderScheduler | undefined;
let pluginPackageManager: PluginPackageManager | undefined;
const pluginAutomationContexts = new Map<string, AutomationExecutionContext>();

/** Most recently opened libraries, most recent first. Feeds headless auto-open. */
function readRecentLibrariesForAutoOpen(): { path: string; name: string }[] {
  return readRecentLibraryEntries(recentLibraryPath(), (error) => {
    logger?.error("recent-library.read", error);
  }).map((entry) => ({ path: entry.path, name: entry.name }));
}

function recentLibraryPath(): string {
  return path.join(app.getPath("userData"), "recent-library.json");
}

function pendingLibraryCleanupPath(): string {
  return path.join(app.getPath("userData"), "pending-library-cleanup.json");
}

// Serpent-65d837: backoff schedule for asking the Worker to remove `.del-*`
// aside roots left behind by a disk deletion. Windows handles (Defender scan,
// Explorer, lingering `serpent://` streams) usually close within seconds, so a
// few short retries resolve it without user action; anything still remaining
// stays persisted and is retried on the next app launch.
const PENDING_CLEANUP_RETRY_DELAYS_MS = [1_000, 2_000, 4_000, 8_000, 16_000, 30_000];

let pendingCleanupRetry = 0;
let pendingCleanupRetryTimer: NodeJS.Timeout | undefined;

/**
 * Fire-and-forget: tells the Worker to remove every persisted `.del-*` aside
 * root, drops the paths that succeeded from the store, and keeps retrying the
 * remaining ones with a bounded backoff. Callers: after a deletion reported a
 * pending aside, and after the Worker becomes ready at startup.
 */
function retryPendingLibraryCleanups(): void {
  if (pendingCleanupRetryTimer) return;
  void runPendingLibraryCleanups(0);
}

async function runPendingLibraryCleanups(round: number): Promise<void> {
  const pendingPath = pendingLibraryCleanupPath();
  const asidePaths = readPendingCleanupAsidePaths(pendingPath, (error) => {
    logger?.error("pending-library-cleanup.read", error);
  });
  if (asidePaths.length === 0) return;
  if (!workerClient) return;
  let cleanedPaths: string[];
  let remainingPaths: string[];
  try {
    const outcome = await workerClient.request({
      type: "system.cleanup-pending-deletions",
      asidePaths,
    });
    if (outcome.ok && outcome.type === "system.cleanup-pending-deletions") {
      cleanedPaths = outcome.cleanedPaths;
      remainingPaths = outcome.remainingPaths;
    } else {
      cleanedPaths = [];
      remainingPaths = asidePaths;
    }
  } catch (error) {
    cleanedPaths = [];
    remainingPaths = asidePaths;
    logger?.error(
      "pending-library-cleanup.run",
      error instanceof Error ? error : new Error(String(error)),
    );
  }
  const stillPersisted = readPendingCleanupAsidePaths(pendingPath, (error) => {
    logger?.error("pending-library-cleanup.read", error);
  });
  const remainingSet = new Set(remainingPaths);
  const next = stillPersisted.filter((sidePath) => remainingSet.has(sidePath));
  if (next.length === 0) {
    writePendingCleanupAsidePaths(pendingPath, [], (error) => {
      logger?.error("pending-library-cleanup.write", error);
    });
    return;
  }
  writePendingCleanupAsidePaths(pendingPath, next, (error) => {
    logger?.error("pending-library-cleanup.write", error);
  });
  if (cleanedPaths.length > 0) {
    logger?.info("pending-library-cleanup.deferred", "Removed leftover library roots.", {
      cleanedCount: cleanedPaths.length,
    });
  }
  const delay = PENDING_CLEANUP_RETRY_DELAYS_MS[round];
  if (delay === undefined) {
    logger?.info("pending-library-cleanup.still-pending", "Pending cleanup will retry on next launch.", {
      remaining: next.length,
    });
    return;
  }
  pendingCleanupRetry = round + 1;
  pendingCleanupRetryTimer = setTimeout(() => {
    pendingCleanupRetryTimer = undefined;
    void runPendingLibraryCleanups(pendingCleanupRetry);
  }, delay);
}

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

function rememberOpenedLibrary(libraryPath: string, displayName: string, libraryId?: string): void {
  rememberRecentLibrary(
    recentLibraryPath(),
    { path: libraryPath, name: displayName, ...(libraryId === undefined ? {} : { libraryId }) },
    {
      onError: (error) => {
        logger?.error("recent-library.write", error);
      },
    },
  );
}

const aiQueueScheduler = new AiQueueScheduler(processAiQueueBatch, {
  batchSize: AI_ANALYSIS_QUEUE_BATCH_SIZE,
  baseRetryDelayMs: DEFAULT_AI_RELIABILITY_SETTINGS.retryBaseDelayMs,
  maxRetryDelayMs: DEFAULT_AI_RELIABILITY_SETTINGS.retryMaxDelayMs,
  retryJitterRatio: DEFAULT_AI_RELIABILITY_SETTINGS.retryJitterRatio,
});

// Maps BrowserWindow.id to the active library/folder context for extension save.

const sourcePathCache = new SourcePathCache();


// External-library source chosen and validated; Renderer never receives the
// path. For archive sources this is the extracted temporary root. Cleared
// after destination is chosen, on inspect cancel, or when a new inspect starts.

// Archive-backed external libraries are extracted into Main-owned temporary
// directories. The Worker only receives the extracted root; these callbacks
// ensure the archive contents do not remain on disk after the operation.
const externalSourceCleanups = new Map<string, () => Promise<void>>();
const liveExternalLibraryStagingRoots = new Set<string>();

function externalLibraryStagingStorePath(): string {
  return path.join(app.getPath("userData"), "external-library-staging.json");
}

async function cleanupExternalSource(sourceRootPath: string | undefined): Promise<void> {
  if (!sourceRootPath) return;
  const cleanup = externalSourceCleanups.get(sourceRootPath);
  if (!cleanup) return;
  try {
    await cleanup();
    externalSourceCleanups.delete(sourceRootPath);
  } catch (error) {
    logger?.error("external-library.archive-cleanup", error);
  }
}

async function cleanupAllExternalSources(): Promise<void> {
  const sourceRoots = [...externalSourceCleanups.keys()];
  await Promise.all(sourceRoots.map((sourceRootPath) => cleanupExternalSource(sourceRootPath)));
}

async function sweepOrphanExternalLibraryStagingOnStartup(): Promise<void> {
  const storePath = externalLibraryStagingStorePath();
  const registered = readExternalLibraryStagingRoots(storePath, (error) => {
    logger?.error("external-library.staging-store.read", error);
  });
  try {
    const result = await sweepOrphanExternalLibraryStaging({
      registeredRoots: registered,
      searchParents: [tmpdir()],
      liveRoots: liveExternalLibraryStagingRoots,
    });
    writeExternalLibraryStagingRoots(storePath, result.remaining, (error) => {
      logger?.error("external-library.staging-store.write", error);
    });
    if (result.removed.length > 0) {
      logger?.info("external-library.staging-sweep", "Removed leftover extract directories.", {
        removedCount: result.removed.length,
      });
    }
    if (result.failed.length > 0) {
      logger?.error(
        "external-library.staging-sweep",
        new Error("Could not remove leftover extract directories."),
        { failedCount: result.failed.length },
      );
    }
  } catch (error) {
    logger?.error("external-library.staging-sweep", error);
  }
}

type StoredImageSequenceOffer = ImageSequenceImportOffer;

const pendingImageSequenceOffers = new Map<
  string,
  {
    offer: StoredImageSequenceOffer;
    expiresAt: number;
    nextSequenceIndex: number;
  }
>();

// ── AI Config ────────────────────────────────────────────────────────────

interface AiConfig {
  apiFormat: AiApiFormat;
  model: string;
  /** Empty = official default for the selected API format. */
  baseUrl: string;
  descriptionEnabled: boolean;
  tagEnabled: boolean;
  ratingEnabled: boolean;
  analysisSettings: AiAnalysisSettings;
  concurrencyLimit: number;
  /** Longest edge for images uploaded to analysis (default 2048 / 2K). */
  maxAnalysisImageEdgePx: number;
  reliabilitySettings: AiReliabilitySettings;
  languages: Array<"zh-CN" | "en" | "ja" | "ko">;
  autoAnalyzeEnabled: boolean;
  disclaimerAccepted: boolean;
}

type LegacyAiConfig = Partial<AiConfig> & {
  provider?: string;
  language?: string;
  apiFormat?: string;
  languages?: unknown;
};

const DEFAULT_AI_CONFIG: AiConfig = {
  apiFormat: DEFAULT_AI_API_FORMAT,
  model: DEFAULT_AI_MODELS[DEFAULT_AI_API_FORMAT],
  baseUrl: "",
  descriptionEnabled: true,
  tagEnabled: true,
  ratingEnabled: true,
  analysisSettings: { ...DEFAULT_AI_ANALYSIS_SETTINGS },
  concurrencyLimit: DEFAULT_AI_ANALYSIS_CONCURRENCY,
  maxAnalysisImageEdgePx: DEFAULT_AI_ANALYSIS_IMAGE_EDGE_PX,
  reliabilitySettings: { ...DEFAULT_AI_RELIABILITY_SETTINGS },
  languages: ["zh-CN", "en"],
  autoAnalyzeEnabled: false,
  disclaimerAccepted: false,
};

function aiConfigPath(): string {
  return path.join(app.getPath("userData"), "ai-config.json");
}

function aiProfilesPath(): string {
  return path.join(app.getPath("userData"), "ai-profiles.json");
}

function aiAnalysisSettingsPath(): string {
  return path.join(app.getPath("userData"), "ai-analysis-settings.json");
}

function aiProfileMigrationPath(): string {
  return path.join(app.getPath("userData"), "ai-profile-migration.json");
}

function aiProfileTransactionPath(): string {
  return path.join(app.getPath("userData"), "ai-profile-transaction.json");
}

function aiKeyPath(): string {
  return path.join(app.getPath("userData"), "ai-key.enc");
}

function aiProfileKeyPath(id: string): string {
  return path.join(app.getPath("userData"), "ai-profile-keys", `${id}.bin`);
}

// ── Serpent-xffq: 同步服务器（全局）与库绑定持久化 ───────────────────
function syncServersPath(): string {
  return path.join(app.getPath("userData"), "sync-servers.json");
}

function syncBindingsPath(): string {
  return path.join(app.getPath("userData"), "sync-bindings.json");
}

function readSyncServers(): SyncServerRecord[] {
  try {
    const parsed = JSON.parse(readFileSync(syncServersPath(), "utf-8")) as unknown;
    if (Array.isArray(parsed)) return parsed as SyncServerRecord[];
  } catch {
    // 首次运行。
  }
  return [];
}

function readSyncBindings(): Record<string, SyncBindingRecord> {
  try {
    const parsed = JSON.parse(readFileSync(syncBindingsPath(), "utf-8")) as unknown;
    if (parsed && typeof parsed === "object") return parsed as Record<string, SyncBindingRecord>;
  } catch {
    // 首次运行。
  }
  return {};
}

function writeSyncBindings(bindings: Record<string, SyncBindingRecord>): void {
  writeFileSync(syncBindingsPath(), JSON.stringify(bindings, null, 2), "utf-8");
}

function resolveSyncServerCredentials(serverId: string): {
  baseUrl: string;
  username?: string;
  password?: string;
  allowInsecureTls: boolean;
} | null {
  const server = readSyncServers().find((entry) => entry.id === serverId);
  if (!server) return null;
  let password: string | undefined;
  if (server.passwordEncrypted) {
    try {
      password = safeStorage.decryptString(Buffer.from(server.passwordEncrypted, "base64"));
    } catch {
      password = undefined;
    }
  }
  return {
    baseUrl: server.baseUrl,
    username: server.username,
    password,
    allowInsecureTls: server.allowInsecureTls,
  };
}

function normalizeLegacyAiAnalysisPreferences(
  parsed: LegacyAiConfig | null,
): AiAnalysisPreferences {
  return normalizeAiAnalysisPreferences(parsed);
}

function readAiProfileCatalog(required = false): AiProfileCatalog {
  recoverAiProfileTransactionIfPresent();
  const raw = readAtomicJsonFile(aiProfilesPath());
  if (raw === undefined) {
    if (required) throw new Error("AI profile catalog is missing after migration.");
    return emptyAiProfileCatalog();
  }
  return parseAiProfileCatalog(JSON.parse(raw) as unknown);
}

function aiProfileTransactionIo(): AiProfileTransactionIo {
  return {
    readJournal: () => readAtomicJsonFile(aiProfileTransactionPath()) ?? null,
    writeJournal: (contents) => writeAtomicJsonFile(aiProfileTransactionPath(), contents),
    writeCredential: (profileId, encryptedCredentialBase64) => {
      const filename = aiProfileKeyPath(profileId);
      mkdirSync(path.dirname(filename), { recursive: true });
      writeFileSync(filename, Buffer.from(encryptedCredentialBase64, "base64"), {
        mode: 0o600,
        flush: true,
      });
    },
    deleteCredential: (profileId) => deleteAiProfileCredential(profileId),
    writeCatalog: (catalog) => {
      writeAtomicJsonFile(aiProfilesPath(), JSON.stringify(catalog, null, 2));
    },
    deleteJournal: () => rmSync(aiProfileTransactionPath(), { force: true }),
  };
}

function recoverAiProfileTransactionIfPresent(): void {
  recoverAiProfileTransactionFromJournal(aiProfileTransactionIo());
}

function readAiAnalysisPreferences(): AiAnalysisPreferences {
  const raw = readAtomicJsonFile(aiAnalysisSettingsPath());
  if (raw === undefined) return normalizeLegacyAiAnalysisPreferences(null);
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("AI analysis preferences have an invalid structure.");
  }
  return normalizeAiAnalysisPreferences(parsed);
}

function hasAiProfileCredential(profileId: string): boolean {
  return existsSync(aiProfileKeyPath(profileId));
}

function readAiProfileCredential(profileId: string): string {
  try {
    return safeStorage.decryptString(readFileSync(aiProfileKeyPath(profileId)));
  } catch {
    throw new Error("AI API key not configured or could not be decrypted.");
  }
}

function writeAiProfileCredential(profileId: string, apiKey: string): void {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("Secure credential storage is unavailable.");
  }
  const filename = aiProfileKeyPath(profileId);
  mkdirSync(path.dirname(filename), { recursive: true });
  writeFileSync(filename, safeStorage.encryptString(apiKey), { mode: 0o600, flush: true });
}

function deleteAiProfileCredential(profileId: string): void {
  rmSync(aiProfileKeyPath(profileId), { force: true });
}

function cleanupOrphanAiProfileCredentials(catalog: AiProfileCatalog): void {
  const directory = path.join(app.getPath("userData"), "ai-profile-keys");
  if (!existsSync(directory)) return;

  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    logger?.error("ai.profile-keys.orphan-cleanup", error);
    return;
  }

  const knownProfileIds = new Set(catalog.profiles.map((profile) => profile.id));
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".bin")) continue;
    const profileId = entry.name.slice(0, -".bin".length);
    if (!isAiProfileId(profileId) || knownProfileIds.has(profileId)) continue;
    try {
      rmSync(path.join(directory, entry.name), { force: true });
    } catch (error) {
      // Migration is still usable; this runs on every load so failed removals retry.
      logger?.error("ai.profile-keys.orphan-cleanup", error);
    }
  }
}

function ensureAiProfileMigration(): void {
  recoverAiProfileTransactionIfPresent();
  const markerPath = aiProfileMigrationPath();
  const markerContents = readAtomicJsonFile(markerPath);
  let markerVersion: number | null = null;
  if (markerContents !== undefined) {
    const marker: unknown = JSON.parse(markerContents);
    if (!marker || typeof marker !== "object" || Array.isArray(marker)) {
      throw new Error("AI profile migration marker has an invalid structure.");
    }
    const version = (marker as { version?: unknown }).version;
    if (version !== 1) throw new Error("AI profile migration marker has an unsupported version.");
    markerVersion = version;
  }

  runAiProfileMigrationStartup<LegacyAiConfig, void>({
    markerVersion,
    readLegacyConfig: () => readFileSync(aiConfigPath()),
    recoverCompletedMigration: () => {
      const catalog = readAiProfileCatalog(true);
      cleanupOrphanAiProfileCredentials(catalog);
      cleanupLegacyAiConfig();
    },
    migrate: (legacy) => {
      const legacyKeyExists = existsSync(aiKeyPath());
      migrateAiProfileStorage({
        markerExists: () => false,
        readCatalog: () => existsSync(aiProfilesPath()) ? readAiProfileCatalog() : null,
        cleanupOrphanCredentials: cleanupOrphanAiProfileCredentials,
        readPreferences: () => {
          if (!existsSync(aiAnalysisSettingsPath())) return null;
          return JSON.parse(readFileSync(aiAnalysisSettingsPath(), "utf-8")) as unknown;
        },
        legacyProfile: legacy !== null || legacyKeyExists
          ? legacyAiConnectionProfile({
              apiFormat: legacy?.apiFormat,
              provider: legacy?.provider,
              model: legacy?.model,
              baseUrl: legacy?.baseUrl,
            })
          : null,
        readLegacyCredential: () => legacyKeyExists
          ? safeStorage.decryptString(readFileSync(aiKeyPath()))
          : null,
        writeCredential: writeAiProfileCredential,
        verifyCredential: (profileId) => { readAiProfileCredential(profileId); },
        defaultPreferences: normalizeLegacyAiAnalysisPreferences(null),
        normalizeLegacyPreferences: () => legacy
          ? normalizeLegacyAiAnalysisPreferences(legacy)
          : null,
        writeCatalog: (catalog) => {
          writeAtomicJsonFile(aiProfilesPath(), JSON.stringify(catalog, null, 2));
        },
        writePreferences: (preferences) => {
          writeAtomicJsonFile(aiAnalysisSettingsPath(), JSON.stringify(preferences, null, 2));
        },
        writeMarker: () => {
          writeAtomicJsonFile(markerPath, JSON.stringify({ version: 1 }, null, 2));
        },
        cleanupLegacy: cleanupLegacyAiConfig,
      });
    },
  });
}

function cleanupLegacyAiConfig(): void {
  try {
    rmSync(aiConfigPath(), { force: true });
    rmSync(aiKeyPath(), { force: true });
  } catch (error) {
    logger?.error("ai.profile-migration.cleanup", error);
  }
}

function loadAiConfig(): AiConfig & {
  hasKey: boolean;
  activeProfileId: string | null;
  profiles: ReturnType<typeof summarizeAiProfiles>;
} {
  try {
    ensureAiProfileMigration();
    const catalog = readAiProfileCatalog();
    const profile = catalog.profiles.find((item) => item.id === catalog.activeProfileId);
    const preferences = readAiAnalysisPreferences();
    return {
      ...(profile ?? {
        apiFormat: DEFAULT_AI_CONFIG.apiFormat,
        model: DEFAULT_AI_CONFIG.model,
        baseUrl: DEFAULT_AI_CONFIG.baseUrl,
      }),
      ...preferences,
      activeProfileId: profile?.id ?? null,
      profiles: summarizeAiProfiles(catalog, hasAiProfileCredential),
      hasKey: profile ? hasAiProfileCredential(profile.id) : false,
    };
  } catch (error) {
    if (error instanceof AiProfileStorageError) throw error;
    throw new AiProfileStorageError(error);
  }
}
function getDecryptedApiKey(): string {
  const activeProfileId = loadAiConfig().activeProfileId;
  return resolveAiCredential(
    activeProfileId,
    hasCompletedAiProfileMigration(),
    readAiProfileCredential,
    () => {
      // Keep the previous installation usable if migration cannot finish
      // because the new profile files or secure storage are temporarily unavailable.
      try {
        return safeStorage.decryptString(readFileSync(aiKeyPath()));
      } catch {
        throw new Error("AI API key not configured.");
      }
    },
  );
}

function hasCompletedAiProfileMigration(): boolean {
  try {
    const marker = JSON.parse(readFileSync(aiProfileMigrationPath(), "utf-8")) as {
      version?: unknown;
    };
    return marker.version === 1;
  } catch {
    return false;
  }
}

function getDecryptedProfileApiKey(profileId: string): string {
  try {
    if (!readAiProfileCatalog().profiles.some((profile) => profile.id === profileId)) {
      throw new Error("AI profile does not exist.");
    }
    return readAiProfileCredential(profileId);
  } catch (error) {
    if (error instanceof AiProfileStorageError) throw error;
    throw new AiProfileStorageError(error);
  }
}

let loopbackRelease: Promise<void> | undefined;

function releaseLoopbackListeners(): Promise<void> {
  if (loopbackRelease !== undefined) return loopbackRelease;
  const apiClose = httpApiServer?.close() ?? Promise.resolve();
  httpApiServer = undefined;
  loopbackRelease = apiClose.catch((error: unknown) => {
    logger?.error("http-api.close", error);
  });
  return loopbackRelease;
}


function publishProgress(_event: unknown): void {
  // Headless: UI progress push is gone; jobs are observable via job.* commands.
}

function publishAiProgress(_event: unknown): void {
  // Headless: UI progress push is gone; AI results land in worker metadata.
}

function publishAiCompleted(_event: unknown): void {
  // Headless: UI progress push is gone; AI results land in worker metadata.
}

function publishAiCleared(_event: unknown): void {
  // Headless: UI progress push is gone.
}

function publishLifecycle(_event: unknown): void {
  // Headless: lifecycle events have no renderer to notify; the HTTP API and
  // journal carry state instead.
}

function publishAssetChange(event: AssetChangeEvent): void {
  const parsed = parseAssetChangeEvent(event);
  // Asset changes can invalidate a cached source path (delete, relink, move,
  // or replacement). Artifact-only library changes use the separate
  // library.changed channel and do not evict the protocol hot path.
  sourcePathCache.clearLibrary(parsed.libraryId);
  evictArtifactPathCache(parsed.libraryId);
  pluginActivationCoordinator?.fanOutDomainEvent(createPluginDomainEvent({
    kind: 'asset.changed',
    libraryId: parsed.libraryId,
    summary: {
      changedCount: parsed.changedCount,
      missingCount: parsed.missingCount,
      ...(parsed.source === undefined ? {} : { source: parsed.source }),
    },
  }));
}

function publishLibraryChanged(event: LibraryChangedEvent): void {
  const parsed = parseLibraryChangedEvent(event);
  // HTTP API responses echo the latest change sequence (ADR-0031 §2).
  libraryChangeSequences.set(parsed.libraryId, parsed.changeSequence);
  pluginActivationCoordinator?.fanOutDomainEvent(createPluginDomainEvent({
    kind: 'library.changed',
    libraryId: parsed.libraryId,
    summary: {
      changeSequence: parsed.changeSequence,
    },
  }));
}

async function enqueueAutoAnalyzeAfterImport(
  libraryId: string,
  importedAssetIds: string[],
  folderId?: string,
): Promise<void> {
  try {
    const config = loadAiConfig();
    if (!config.autoAnalyzeEnabled || !config.hasKey || !config.apiFormat) return;
    if ((importedAssetIds.length === 0 && !folderId) || !workerClient) return;

    const result = await workerClient.request({
      type: "ai.enqueue-analysis",
      libraryId,
      ...(importedAssetIds.length > 0 ? { assetIds: importedAssetIds } : {}),
      ...(folderId ? { folderId } : {}),
    });
    if (result.ok && result.type === "ai.jobs.enqueued") {
      logger?.info(
        "auto-analyze",
        `Enqueued ${result.enqueued} AI analysis jobs after import.`,
      );
      await processAiQueue(libraryId);
    }
  } catch (error) {
    logger?.error("auto-analyze", error);
    // Non-blocking: import succeeded regardless of AI enqueue failure.
  }
}

async function processAiQueue(libraryId: string): Promise<void> {
  try {
    const config = loadAiConfig();
    aiQueueScheduler.setRetryPolicy(config.reliabilitySettings);
    await aiQueueScheduler.trigger(libraryId);
  } catch (error) {
    logger?.error("ai.queue.config", error, { libraryId });
  }
}

/** Global menu preference: linked-folder assets with a missing source stay listed. */
const showMissingLinkedFiles = true;

/** Shared post-open hook for dialog opens and startup recent-library restore. */
function pluginThumbnailExtensionsFor(libraryId: string): string[] {
  const extensions = new Set<string>();
  for (const provider of pluginActivationCoordinator?.listActiveProviders(libraryId) ?? []) {
    if (provider.kind !== 'thumbnail') continue;
    for (const raw of provider.extensions ?? []) {
      const extension = raw.replace(/^\./u, '').toLowerCase();
      if (/^[a-z0-9][a-z0-9+_-]*$/u.test(extension)) extensions.add(extension);
    }
  }
  return [...extensions];
}

async function syncPluginThumbnailExtensions(): Promise<void> {
  const client = workerClient;
  if (!client) return;
  const listed = await client.request({ type: 'library.list' });
  if (!listed.ok || listed.type !== 'library.list') return;
  for (const library of listed.libraries) {
    client.publishPluginThumbnailExtensions(
      library.libraryId,
      pluginThumbnailExtensionsFor(library.libraryId),
    );
  }
}

async function notifyLibraryOpenedSideEffects(input: {
  libraryId: string;
  libraryDirectory: string;
}): Promise<void> {
  void processAiQueue(input.libraryId);
  try {
    await pluginActivationCoordinator?.onLibraryOpened({
      libraryId: input.libraryId,
      libraryDirectory: input.libraryDirectory,
    });
  } catch (error) {
    logger?.error("plugin.activation.library-opened", error, {
      libraryId: input.libraryId,
    });
  }
  // Global plugin activation uses an internal pseudo-library. Once the real
  // library is open, tick only jobs explicitly enqueued or retried in this
  // application session; interrupted rows are never auto-recovered.
  pluginJobScheduler?.tick(input.libraryId);
  await syncPluginThumbnailExtensions();
  workerClient?.publishShowMissingLinkedFiles(showMissingLinkedFiles);
}

/**
 * Headless startup restore: reopen the most recent library through the same
 * worker path the desktop open flow uses, so MCP/extension clients immediately
 * have an active library. Failures are logged and non-fatal — the backend
 * keeps running with no library open.
 */
async function autoOpenRecentLibrary(): Promise<void> {
  if (!workerClient) return;
  if (!recentLibraryAutoOpenEnabled()) return;
  const activePath = readActiveLibraryPath(recentLibraryPath(), (error) => {
    logger?.error("recent-library.read", error);
  });
  const candidates = activePath
    ? [activePath, ...readRecentLibrariesForAutoOpen().map((entry) => entry.path)]
    : readRecentLibrariesForAutoOpen().map((entry) => entry.path);
  const target = candidates.find((candidate) => typeof candidate === "string" && candidate.length > 0);
  if (!target) {
    logger?.info("library.auto-open", "No recent library to reopen.");
    return;
  }
  try {
    const opened = await workerClient.request({
      type: "library.open",
      selectedLibraryPath: target,
    });
    if (!opened.ok || opened.type !== "library.opened") {
      logger?.error("library.auto-open", new Error("Recent library failed to open."));
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
    logger?.info("library.auto-open", `Reopened library "${opened.library.displayName}".`, {
      libraryId: opened.library.libraryId,
    });
  } catch (error) {
    logger?.error("library.auto-open", error);
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
    logger?.error("ai.queue.config", error, { libraryId });
    return { processed: 0, requeued: 0 };
  }
  const activeProfile = config.profiles.find(
    (profile) => profile.id === config.activeProfileId,
  );
  const legacyFallbackAvailable = !activeProfile
    && !hasCompletedAiProfileMigration()
    && Boolean(config.apiFormat);
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
        logger?.error(
          "ai.queue.process",
          new Error(`Worker rejected AI queue batch: ${result.error.code}`),
        );
        break;
      }
      if (result.type !== "ai.jobs.processed") {
        logger?.error(
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
    logger?.error("ai.queue.process", error);
    return { processed: 0, requeued: 0 };
  }
}

let cachedSyncDeviceId: string | undefined;

/** Serpent-xffq：每台设备的稳定同步身份（userData 持久化，非敏感）。 */
function syncDeviceId(): string {
  if (cachedSyncDeviceId) return cachedSyncDeviceId;
  const file = path.join(app.getPath('userData'), 'sync-device.json');
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf-8')) as { deviceId?: string };
    if (typeof parsed.deviceId === 'string' && parsed.deviceId.length > 0) {
      cachedSyncDeviceId = parsed.deviceId;
      return parsed.deviceId;
    }
  } catch {
    // 首次运行。
  }
  const deviceId = randomUUID();
  try {
    writeFileSync(file, JSON.stringify({ deviceId }), 'utf-8');
  } catch {
    // 写入失败仍返回本次进程内稳定 ID。
  }
  cachedSyncDeviceId = deviceId;
  return deviceId;
}

async function executeApiLibraryContextCommand(input: {
  commandId: 'library.list-open' | 'library.list-recent' | 'library.open' | 'library.show-in-desktop';
  executionId: string;
  context: AutomationExecutionContext;
  commandInput: unknown;
}): Promise<unknown> {
  if (input.commandId === 'library.list-recent') {
    return readRecentLibraryEntries(recentLibraryPath(), (error) => {
      logger?.error('recent-library.read', error);
    }).map((entry) => ({
      libraryId: entry.libraryId ?? null,
      displayName: entry.name,
    }));
  }
  const journal = automationExecutionJournal;
  const client = workerClient;
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
      contextRevision: 0,
    };
  }

  const commandInput = input.commandInput as { libraryId?: string };
  let selected = commandInput.libraryId === undefined
    ? undefined
    : libraries.find((library) => library.libraryId === commandInput.libraryId);
  let needsOpen = false;
  if (input.commandId === 'library.open' && selected === undefined && commandInput.libraryId !== undefined) {
    const recent = readRecentLibraryEntries(recentLibraryPath(), (error) => {
      logger?.error('recent-library.read', error);
    }).find((entry) => entry.libraryId === commandInput.libraryId);
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
      publishLifecycle({ type: 'library.opening', operation: 'open', source: 'http' });
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
      publishLifecycle({
        type: 'library.opened',
        source: 'mcp',
        library: {
          libraryId: selected.libraryId,
          displayName: selected.displayName,
          displayPath: selected.libraryPath,
          ...(selected.readOnly === undefined ? {} : { readOnly: selected.readOnly }),
          ...(selected.networkStorage === undefined ? {} : { networkStorage: selected.networkStorage }),
          ...(selected.libraryVersion === undefined ? {} : { libraryVersion: selected.libraryVersion }),
          ...(selected.supportedSchemaVersion === undefined ? {} : { supportedSchemaVersion: selected.supportedSchemaVersion }),
          ...(selected.migrationStuck === undefined ? {} : { migrationStuck: selected.migrationStuck }),
        },
      });
    }
  }
  if (selected.libraryId === '') {
    throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
  }
  if (input.commandId === 'library.show-in-desktop') {
    publishLifecycle({
      type: 'library.opened',
      source: 'mcp',
      library: {
        libraryId: selected.libraryId,
        displayName: selected.displayName,
        displayPath: selected.libraryPath,
      },
    });
  }
  return {
    libraryId: selected.libraryId,
    displayName: selected.displayName,
    contextRevision: 0,
  };
}

async function normalizeApiCommandInput(input: {
  commandId: AutomationCommandId;
  executionId: string;
  context: AutomationExecutionContext;
  commandInput: unknown;
  signal?: AbortSignal;
}): Promise<unknown | undefined> {
  // MCP always supplies explicit paths. Opening a native picker here would
  // make a supposedly stateless/headless request depend on a human and would
  // recreate the repeated confirmation failure this adapter is designed to
  // eliminate. The Registry MCP schemas validate these fields before this
  // normalizer runs.
  if (input.signal?.aborted) return input.commandInput;
  return input.commandInput;
}

async function startApplication(): Promise<void> {
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
  appLogPath = chooseUniqueSessionLogPath(app.getPath("logs"), new Date());
  logger = new AppLogger(appLogPath);
  void sweepOrphanExternalLibraryStagingOnStartup();
  // Serpent-wgmy: 会话日志最多保留最近 100 份，启动时清理最旧；
  // 清理失败不得阻断启动。
  try {
    pruneSessionLogs(app.getPath("logs"));
  } catch (error) {
    logger?.error("session-log.prune", error);
  }
  workerClient = new LibraryWorkerClient(
    path.join(__dirname, "library_worker.js"),
    logger,
    {
      ...process.env,
      SERPENT_LIBRARY_METADATA_CACHE_PATH: path.join(
        app.getPath('userData'),
        'library-metadata-cache',
      ),
      SERPENT_SEMANTIC_LEGACY_CACHE_ROOT: app.getPath('userData'),
      SERPENT_MAIN_PROCESS_SESSION_ID: mainProcessSessionId,
    },
  );
  await workerClient.start();
  workerClient.publishShowMissingLinkedFiles(showMissingLinkedFiles);
  // Serpent-65d837: remove any `.del-*` aside roots that could not be deleted
  // during a previous session (deferred-cleanup store, backoff loop).
  retryPendingLibraryCleanups();
  const activeWorkerClient = workerClient;
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
          logger?.info("offscreen-thumbnail.console", message, { level, line, sourceId });
        },
      );
      offscreenWindow.webContents.on(
        "did-fail-load",
        (_event: unknown, errorCode: number, errorDescription: string, validatedURL: string, isMainFrame: boolean) => {
          logger?.error(
            "offscreen-thumbnail.page-load-failed",
            new Error(`${errorCode}: ${errorDescription}`),
            { errorCode, validatedURL, isMainFrame },
          );
        },
      );
      offscreenWindow.webContents.on("did-finish-load", () => {
        logger?.info(
          "offscreen-thumbnail.page-finished-load",
          "Offscreen renderer page finished loading.",
        );
        void offscreenWindow.webContents
          .executeJavaScript(
            "({ readyState: document.readyState, body: document.body.innerHTML, hasBridge: Boolean(window.offscreenThumbnail), debug: window.__serpentOffscreenThumbnailDebug })",
          )
          .then((state) => {
            logger?.info(
              "offscreen-thumbnail.page-state",
              "Inspected offscreen renderer page state.",
              { state },
            );
          })
          .catch((error: unknown) => {
            logger?.error("offscreen-thumbnail.page-state", error);
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
      error: (scope, error, context) => logger?.error(scope, error, context),
      info: (scope, message, context) => logger?.info(scope, message, context),
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
    renderDocumentThumbnail(request, logger!),
  );
  automationExecutionJournal = new AutomationExecutionJournal({
    store: createJsonFileAutomationExecutionStore(
      path.join(app.getPath('userData'), 'automation-executions.json'),
    ),
    logger,
  });
  const automationIdempotencyStore = createJsonFileAutomationIdempotencyStore(
    path.join(app.getPath('userData'), 'automation-idempotency.json'),
  );
  const automationWorkerAdapter = new AutomationLibraryWorkerAdapter(workerClient, {
    onAiEnqueued: (libraryId) => processAiQueue(libraryId),
    onAiEnqueueError: (error, libraryId) => {
      logger?.error('automation.ai-queue.trigger-failed', error, { libraryId });
    },
  });
  automationCommandGateway = createAutomationCommandGateway(
    automationWorkerAdapter,
    {
      resolve: (executionId) => {
        const pluginContext = pluginAutomationContexts.get(executionId);
        if (pluginContext !== undefined) return pluginContext;
        return automationExecutionJournal?.resolve(executionId);
      },
    },
    {
      auditSink: automationExecutionJournal,
      auditLogger: logger,
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
          logger?.info('plugin.ui-notify', input.message.trim().slice(0, 500), {
            severity: input.severity,
          });
        },
      },
      filePlanApprovalHandler: createDesktopAutomationFilePlanApprovalHandler({
        workerClient: automationWorkerAdapter,
        audit: { info: (scope, message, context) => logger?.info(scope, message, context) },
        // Headless approval policy: fail closed. Dangerous file plans are
        // rejected and logged; no human confirmation surface exists.
        confirm: async () => false,
        runWillHooks: async ({ commandId, libraryId, commandInput, planSummary }) => {
          if (commandId !== 'asset.trash' || pluginActivationCoordinator === undefined) {
            return { warnings: [] };
          }
          const input = commandInput as { assetIds?: readonly string[] };
          const result = await pluginActivationCoordinator.runWillHooks({
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
          return automationExecutionJournal!.beginCommand(executionId, contextRevision);
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
        logger?.info('automation.import-completed', `Imported ${importedAssetIds.length} asset(s).`, {
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
          automationExecutionJournal?.appendHistoryEntry(executionId, historyEntryId);
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
          pluginActivationCoordinator?.onLibraryClosed(libraryId);
          for (const [executionId, context] of pluginAutomationContexts) {
            if (context.libraryId === libraryId) pluginAutomationContexts.delete(executionId);
          }
          clearActiveRecentLibrary(recentLibraryPath(), (error) => {
            logger?.error('recent-library.clear', error);
          });
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
          pluginActivationCoordinator?.onLibraryClosed(libraryId);
          for (const [executionId, context] of pluginAutomationContexts) {
            if (context.libraryId === libraryId) pluginAutomationContexts.delete(executionId);
          }
          removeRecentLibrary(recentLibraryPath(), libraryPath, (error) => {
            logger?.error('recent-library.remove', error);
          });
          publishLifecycle({
            type: 'library.closed',
            libraryId,
            ...(source === 'http' ? { source } : {}),
          });
          logger?.info('automation.library-deleted', `Deleted library "${displayName}".`, {
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
          logger?.info('automation.library-imported', `Imported library "${displayName}".`, {
            libraryId,
          });
        },
        transitionLibraryContext: async ({ executionId, source, libraryId, displayName, expectedRevision, authorizationSource }) => {
          const libraries = await activeWorkerClient.request({ type: 'library.list' });
          if (!libraries.ok || libraries.type !== 'library.list') {
            throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
          }
          const boundLibrary = libraries.libraries.find((library) => library.libraryId === libraryId);
          if (!boundLibrary) {
            throw new AutomationLibraryContextError('AUTOMATION_LIBRARY_OPEN_FAILED');
          }
          const bound = automationExecutionJournal?.authorizeLibrary(executionId, libraryId);
          const transitioned = automationExecutionJournal?.transitionLibraryContext({
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
          if (!automationExecutionJournal) {
            throw new Error('The automation execution journal is unavailable.');
          }
          const group = automationExecutionJournal.createUndoGroup({ executionId, libraryId });
          return { undoGroupId: group.undoGroupId };
        },
        append: ({ undoGroupId, item }) => {
          if (!automationExecutionJournal) {
            throw new Error('The automation execution journal is unavailable.');
          }
          const group = automationExecutionJournal.appendUndoGroupItems(undoGroupId, [item]);
          if (!group) {
            throw new Error(`Undo group ${undoGroupId} was not found while appending recovery items.`);
          }
        },
        complete: ({ undoGroupId, status, failureReason }) => {
          if (!automationExecutionJournal) {
            throw new Error('The automation execution journal is unavailable.');
          }
          const group = automationExecutionJournal.completeUndoGroup(undoGroupId, { status, failureReason });
          if (!group) {
            throw new Error(`Undo group ${undoGroupId} was not found while completing the group.`);
          }
        },
      },
      executionStatusHandler: {
        getStatus: (executionId) => {
          const record = automationExecutionJournal?.get(executionId);
          if (!record) return undefined;
          return {
            projection: projectAutomationExecutionStatus(record),
            source: record.source,
          };
        },
      },
    },
  );
  const executePluginHostCommand: PluginRuntimeHostCommandHandler = async (commandId, input, context) => {
    const gateway = automationCommandGateway;
    if (gateway === undefined) throw new Error('Automation Gateway is unavailable.');
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
      const libraries = await workerClient?.request({ type: 'library.list' });
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
      logger?.error('plugin.host-command.gateway-failed', new Error(failure.message ?? failure.code), {
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
      logger?.error('plugin.runtime.crash-record', error, crash);
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
    const client = workerClient;
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
    const client = workerClient;
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
    const client = workerClient;
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
    const client = workerClient;
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
    logger,
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
    logger,
  });
  const pluginCompatibility = currentPluginCompatibilityPlatform();
  const nodeAbi = Number(process.versions.modules);
  if (pluginCompatibility === undefined || !Number.isSafeInteger(nodeAbi) || nodeAbi <= 0) {
    logger.error('plugin.platform', new Error('This platform cannot run the plugin package manager.'), {
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
      logger,
      onDeviceStateRecovered: () => {
        logger?.info('plugin.device-state-recovered', 'Plugin trust state was recovered; settings re-authorization may be required.');
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
        const client = workerClient;
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
          logger?.error('plugin.providers.materialize', error, { libraryId });
        });
        void syncPluginThumbnailExtensions().catch((error) => {
          logger?.error('plugin.thumbnail-extensions', error, { libraryId });
        });
      },
      onProvidersChanged: () => {
        void syncPluginThumbnailExtensions().catch((error) => {
          logger?.error('plugin.thumbnail-extensions', error);
        });
      },
      logger,
    });
    pluginJobScheduler = new PluginJobScheduler({
      supervisor: pluginRuntimeSupervisor,
      trustedSupervisor: pluginTrustedRuntimeSupervisor,
      requestWorker: async (command) => {
        const client = workerClient;
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
      logger,
    });
    pluginProviderScheduler = new PluginProviderScheduler({
      coordinator: pluginActivationCoordinator,
      supervisor: pluginRuntimeSupervisor,
      trustedSupervisor: pluginTrustedRuntimeSupervisor,
      requestWorker: async (command) => {
        const client = workerClient;
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
      logger,
    });
    workerClient.onPluginMediaProviderRequest(async (input) => {
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
        logger?.error('plugin.media-provider.request', error, {
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
  if (!automationExecutionJournal || !automationCommandGateway || !workerClient || !logger) {
    throw new Error('HTTP API requires journal, gateway, worker, and logger.');
  }
  // One long-lived operator execution backs every HTTP API call. The bearer
  // token holder is the operator: full capabilities, no interactive approval —
  // the audit journal and idempotency store still record everything.
  let operatorExecution = automationExecutionJournal.create({
    source: 'http',
    libraryId: null,
    declaredCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
    initialGrantedCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
  });
  automationExecutionJournal.start(operatorExecution.executionId);
  // Global user-scoped plugins have an application lifetime and must be set up
  // before recent-library restore, including when no library can be reopened.
  await pluginActivationCoordinator?.refreshGlobal();
  workerClient.onAssetsChanged(publishAssetChange);
  workerClient.onLibraryChanged(publishLibraryChanged);
  workerClient.onProgress(publishProgress);
  workerClient.onAiProgress(publishAiProgress);
  workerClient.onAiAnalysisCompleted(publishAiCompleted);
  workerClient.onAiContentCleared(publishAiCleared);
  // 视频 contact sheet / 模型缩略图就绪 = 自动分析的视觉输入边界；导入时
  // 入队可能与该媒体队列竞争，输入就绪时重入队该资产（worker 去重已排队/
  // 运行中/已分析）。8-09 WIP 恢复：worker 解析事件但此前 main 无消费者。
  workerClient.onAiInputReady((event) => {
    void enqueueAutoAnalyzeAfterImport(event.libraryId, [event.assetId]);
  });

  // Serpent-bfsb 后续：自动同步调度器。打开同步资源库后自动绑定并开启
  // （见 handleLibraryRequest 的 sync.open-remote-library.request 成功分支）；
  // 本地资产变更 5 秒防抖后自动同步；轮询间隔只用于检查云端。
  syncAutoScheduler = new SyncAutoScheduler({
    workerClient,
    deviceId: () => syncDeviceId(),
    readBindings: () => readSyncBindings() as unknown as Record<string, SyncBindingLike>,
    writeBindings: (bindings) => writeSyncBindings(bindings as unknown as Record<string, SyncBindingRecord>),
    resolveCredentials: (serverId) => resolveSyncServerCredentials(serverId),
    logger,
  });
  syncAutoScheduler.start();

  // Serpent-85a9b0：生产启动自动打开上次使用的资源库（记住上次打开的库与
  // 文件夹——库打开后 renderer 的 browser-session 会恢复上次浏览的文件夹）。
  // 打开失败（丢失/断开/不兼容）只记日志、回退 idle，不阻塞用户从切换器
  // 另选库；E2E 隔离重启测试由 recentLibraryAutoOpenEnabled 显式门控。
  const recentPath = recentLibraryAutoOpenEnabled()
    ? readActiveLibraryPath(recentLibraryPath(), (error) => {
        logger?.error("recent-library.read", error);
      })
    : null;
  if (recentPath) {
    const restored = await workerClient.request({
      type: "library.open",
      selectedLibraryPath: recentPath,
    });
    if (!restored.ok || restored.type !== "library.opened") {
      logger.info(
        "recent-library.unavailable",
        "The recent library could not be reopened.",
        {
          code: restored.ok ? "UNEXPECTED_RESULT" : restored.error.code,
          reason: restored.ok ? undefined : restored.error.reason,
        },
      );
    } else {
      // Startup restore bypasses handleLibraryRequest; still must activate plugins.
      // Await so contributions exist before the renderer shell lists menus/settings.
      await notifyLibraryOpenedSideEffects({
        libraryId: restored.library.libraryId,
        libraryDirectory: restored.library.libraryPath,
      });
      logger.info(
        "recent-library.restored",
        "Reopened the recent library and completed plugin activation request.",
        {
          libraryId: restored.library.libraryId,
        },
      );
    }
  }

  // Forward thumbnail events to the renderer
  workerClient.onThumbnailEvent((event) => {
    if (
      event.type === "asset.thumbnail.ready"
      || (event.type === "asset.thumbnail.batch-ready" && event.ready.length > 0)
    ) {
      // Cover-only video semantics skips a clip until its poster exists.
      // A ready cover is the cue to encode that clip; there is no frame-sampling fallback.
    }
    if (
      event.type === "asset.thumbnail.ready" ||
      event.type === "asset.thumbnail.failed"
    ) {
      // Serpent-8ee170（第三轮纠偏）: a ready/failed thumbnail does not change a
      // source path, so it must not re-resolve drag descriptors. Re-priming on
      // every completion produced 304 background `media.get-asset-drag-infos`
      // requests in a pure browse profile; the first screen is warmed by the
      // browse response itself and anything else resolves on demand.
    }
    // Headless: thumbnail completion is persisted by the worker; no live
    // viewer to push the event to.
  });

  // Register serpent:// custom protocol for serving thumbnail/preview artifacts.
  // The renderer uses serpent://preview/<libraryId>/<artifactId> URLs in <img> tags.
  // Main resolves the artifact path via Worker, reads the file, and returns bytes.
  protocol.handle("serpent", async (request) => {
    try {
      const url = new URL(request.url);
      if (url.hostname === APP_ASSET_HOST) {
        // Bundled app assets (e.g. .hdr environment maps) that the packaged
        // renderer cannot fetch via file:// (three r185 loaders use fetch).
        // Whitelist + receipt verification live in src/main/app-assets.ts.
        const response = createAppAssetResponse({
          route: url.pathname,
          appPath: app.getAppPath(),
          isPackaged: app.isPackaged,
        });
        if (!response) {
          logger?.info(
            "serpent-protocol.app-asset-missing",
            "Rejected unknown or unverified app-asset route.",
            { route: url.pathname },
          );
          return new Response("App asset not found", { status: 404 });
        }
        return response;
      }
      if (url.hostname === "folder-cover") {
        const folderLibraryId = decodeURIComponent(url.pathname.replace(/^\/+/, "").split("/")[0] ?? "");
        const folderId = url.searchParams.get("folder") ?? "";
        if (
          !folderLibraryId
          || !folderId
          || folderId.length > 4096
          || folderLibraryId.includes("..")
          || folderId.includes("\0")
        ) {
          return new Response("Invalid folder cover", { status: 400 });
        }
        if (isLibraryMediaReadBlocked(folderLibraryId)) {
          return new Response("Library unavailable", { status: 410 });
        }
        if (!workerClient) return new Response("Worker unavailable", { status: 503 });
        try {
          const resolved = await workerClient.request({
            type: "folder.cover.resolve",
            libraryId: folderLibraryId,
            folderId,
          });
          if (!resolved.ok || resolved.type !== "folder.cover.resolved") {
            return new Response("Folder cover not found", { status: 404 });
          }
          return await createArtifactResponse(
            resolved.absolutePath,
            resolved.mimeType,
            {
              rangeHeader: request.headers.get("range"),
              signal: bindLibraryMediaReadSignal(folderLibraryId, request.signal),
              onStreamError: (error) =>
                logger?.error("serpent-protocol.folder-cover-stream", error, {
                  libraryId: folderLibraryId,
                }),
            },
          );
        } catch (error) {
          logger?.error("serpent-protocol.folder-cover-read", error, {
            libraryId: folderLibraryId,
          });
          return new Response("Folder cover unreadable", { status: 404 });
        }
      }
      if (
        url.hostname !== "preview" &&
        url.hostname !== "proxy" &&
        url.hostname !== "source" &&
        url.hostname !== "import-frame"
      ) {
        logger?.info(
          "serpent-protocol.invalid-host",
          "Rejected unsupported artifact protocol host.",
        );
        return new Response("Invalid serpent:// path", { status: 400 });
      }
      // Serpent-866c20：序列帧确认面板要在导入前预览候选帧。Renderer 只拿到
      // Main 自己发出的不透明 offerId 与帧号，真实路径由这里从候选清单解析——
      // 请求里永远不出现磁盘路径。
      if (url.hostname === "import-frame") {
        const frameParts = url.pathname.replace(/^\/+/, "").split("/");
        if (frameParts.length !== 3) {
          return new Response("Invalid frame path", { status: 400 });
        }
        const [rawOfferId, rawSequenceIndex, rawFrameNumber] = frameParts as [
          string,
          string,
          string,
        ];
        const sequenceIndex = Number(rawSequenceIndex);
        const frameNumber = Number(rawFrameNumber);
        if (
          !/^[A-Za-z0-9-]{1,64}$/.test(rawOfferId) ||
          !Number.isInteger(sequenceIndex) ||
          sequenceIndex < 0 ||
          !Number.isInteger(frameNumber) ||
          frameNumber < 0
        ) {
          return new Response("Invalid frame request", { status: 400 });
        }
        const pending = pendingImageSequenceOffers.get(rawOfferId);
        if (!pending || pending.expiresAt <= Date.now()) {
          return new Response("Import offer expired", { status: 404 });
        }
        const pendingFrame = resolvePendingImportFrame({
          sequences: pending.offer.sequences,
          sequenceIndex,
          frameNumber,
        });
        if (!pendingFrame) {
          return new Response("Frame not found", { status: 404 });
        }
        if (isLibraryMediaReadBlocked(pending.offer.libraryId)) {
          return new Response("Library unavailable", { status: 410 });
        }
        try {
          return await createArtifactResponse(
            pendingFrame.absolutePath,
            pendingFrame.mimeType,
            {
              rangeHeader: request.headers.get("range"),
              signal: request.signal,
              onStreamError: (error) =>
                logger?.error("serpent-protocol.import-frame-stream", error, {
                  sequenceIndex,
                  frameNumber,
                }),
            },
          );
        } catch (error) {
          logger?.error("serpent-protocol.import-frame-read", error, {
            sequenceIndex,
            frameNumber,
          });
          return new Response("Frame unreadable", { status: 404 });
        }
      }
      const parts = url.pathname.replace(/^\/+/, "").split("/");
      if (parts.length !== 2) {
        logger?.info(
          "serpent-protocol.invalid-path",
          "Rejected malformed artifact protocol URL.",
        );
        return new Response("Invalid URL format", { status: 400 });
      }
      const libraryId = parts[0]!;
      const artifactId = parts[1]!;
      if (
        !libraryId ||
        !artifactId ||
        libraryId.includes("..") ||
        artifactId.includes("..")
      ) {
        logger?.info(
          "serpent-protocol.invalid-identifiers",
          "Rejected malformed artifact identifiers.",
        );
        return new Response("Invalid identifiers", { status: 400 });
      }
      if (isLibraryMediaReadBlocked(libraryId)) {
        return new Response("Library unavailable", { status: 410 });
      }

      if (!workerClient) {
        logger?.error(
          "serpent-protocol.worker-unavailable",
          new Error("Library Worker is unavailable."),
        );
        return new Response("Worker unavailable", { status: 503 });
      }

      if (url.hostname === "source") {
        const sourceWorkerClient = workerClient;
        if (!sourceWorkerClient) {
          return new Response("Worker unavailable", { status: 503 });
        }
        logger?.info(
          "serpent-protocol.source-request",
          "Resolving a source asset request.",
          { libraryId, assetId: artifactId },
        );
        // Serpent-485aeb：字体卡片样张页。字体卡片的封面由 Main 的离屏捕获
        // 渲染成 512px 缩略图，因此这里按同一个 source URL + `sample=font`
        // 返回一张生成的 HTML 样张页；页面里的 @font-face 指向去掉该参数的
        // 原始 URL，与页面同源（同 scheme + 同 host），不需要给字体请求放开
        // CORS。样张文字随字体语言切换（`lang`/`family` 由 Worker 解析字体
        // 文件后带上），避免给纯拉丁字体套中文标签渲染成豆腐块。
        if (url.searchParams.get("sample") === "font") {
          const sample = resolveFontSampleRequest(url);
          return new Response(
            createFontSamplePage({
              fontUrl: sample.fontUrl,
              family: sample.family,
              language: sample.language,
            }),
            {
              headers: {
                "cache-control": "no-store",
                "content-type": "text/html; charset=utf-8",
                "x-content-type-options": "nosniff",
              },
            },
          );
        }
        const revisionId = url.searchParams.get("revision");
        if (!revisionId || !/^[A-Za-z0-9_-]{1,255}$/.test(revisionId)) {
          logger?.info(
            "serpent-protocol.invalid-revision",
            "Rejected malformed source revision token.",
          );
          return new Response("Invalid revision", { status: 400 });
        }
        const authorizedSource = resolveModelThumbnailSourceAuthorization({
          libraryId,
          assetId: artifactId,
          revisionId,
        });
        if (authorizedSource) {
          try {
            if (isLibraryMediaReadBlocked(libraryId)) {
              return new Response("Library unavailable", { status: 410 });
            }
            return await createArtifactResponse(
              authorizedSource.absolutePath,
              authorizedSource.mimeType,
              {
                rangeHeader: request.headers.get("range"),
                signal: bindLibraryMediaReadSignal(libraryId, request.signal),
                onStreamError: (error) =>
                  logger?.error("serpent-protocol.model-source-stream", error, {
                    libraryId,
                    assetId: artifactId,
                  }),
              },
            );
          } catch (error) {
            logger?.error("serpent-protocol.model-source-read", error, {
              libraryId,
              assetId: artifactId,
            });
            return new Response("Source file missing", { status: 404 });
          }
        }
        const sourceStartedAt = performance.now();
        const sourceKey: SourcePathResolution = {
          libraryId,
          assetId: artifactId,
          revisionId,
          absolutePath: "",
          mimeType: "",
        };
        const sourceCacheHit = sourcePathCache.has(libraryId, artifactId, revisionId);
        let sourceResult: SourcePathResolution;
        try {
          sourceResult = await sourcePathCache.getOrResolve(sourceKey, async () => {
            const result = await sourceWorkerClient.request({
              type: "media.get-source-path",
              libraryId,
              assetId: artifactId,
              revisionId,
            });
            if (!result.ok || result.type !== "media.source-path") {
              throw new Error("Source not found");
            }
            return {
              libraryId,
              assetId: artifactId,
              revisionId,
              absolutePath: result.absolutePath,
              mimeType: result.mimeType,
            };
          });
        } catch (error) {
          sourcePathCache.delete(libraryId, artifactId, revisionId);
          logger?.info(
            "serpent-protocol.source-stale",
            "Rejected missing or stale source token.",
            { libraryId, assetId: artifactId },
          );
          if (VIEWER_TIMING_LOG) {
            logger?.info("viewer.source-timing", "Source lookup failed.", {
              libraryId,
              assetId: artifactId,
              revisionId,
              cacheHit: sourceCacheHit,
              workerMs: Math.round(performance.now() - sourceStartedAt),
              error: error instanceof Error ? error.message : String(error),
            });
          }
          return new Response("Source not found", { status: 404 });
        }
        if (isLibraryMediaReadBlocked(libraryId)) {
          return new Response("Library unavailable", { status: 410 });
        }
        try {
          const response = await createArtifactResponse(
            sourceResult.absolutePath,
            sourceResult.mimeType,
            {
              rangeHeader: request.headers.get("range"),
              signal: bindLibraryMediaReadSignal(libraryId, request.signal),
              onStreamError: (error) =>
                logger?.error("serpent-protocol.source-stream", error, {
                  libraryId,
                  assetId: artifactId,
                }),
            },
          );
          if (VIEWER_TIMING_LOG) {
            logger?.info("viewer.source-timing", "Source response ready.", {
              libraryId,
              assetId: artifactId,
              revisionId,
              cacheHit: sourceCacheHit,
              workerMs: Math.round(performance.now() - sourceStartedAt),
              status: response.status,
              range: request.headers.get("range") ?? undefined,
            });
          }
          return response;
        } catch (error) {
          sourcePathCache.delete(libraryId, artifactId, revisionId);
          logger?.error("serpent-protocol.source-read", error, {
            libraryId,
            assetId: artifactId,
          });
          return new Response("Source file missing", { status: 404 });
        }
      }

      const absoluteArtifactPath = await resolveArtifactPathBatched(
        libraryId,
        artifactId,
        url.hostname,
      );
      const ext = path.extname(absoluteArtifactPath).toLowerCase();
      const mimeType = artifactProtocolMimeForExtension(ext);

      if (isLibraryMediaReadBlocked(libraryId)) {
        return new Response("Library unavailable", { status: 410 });
      }

      // Serpent-1e3d4f: image previews are mirrored into userData on first
      // serve; later sessions stream from the local mirror instead of the
      // (possibly remote) origin. Video proxies/posters stay uncached — they
      // are large and Range-streamed.
      const isCacheableImageMime = mimeType.startsWith("image/");
      const cachedMirror = isCacheableImageMime
        ? previewCache?.locateSync(libraryId, artifactId, ext)
        : null;
      if (cachedMirror) {
        try {
          return await createArtifactResponse(
            cachedMirror,
            mimeType,
            {
              rangeHeader: request.headers.get("range"),
              signal: bindLibraryMediaReadSignal(libraryId, request.signal),
              onStreamError: (error) =>
                logger?.error("preview-cache.stream", error, {
                  libraryId,
                  artifactId,
                }),
            },
          );
        } catch {
          // Mirror unreadable (evicted mid-stream, permissions): fall through
          // to the origin and let store() refresh the mirror.
        }
      }

      try {
        const response = await createArtifactResponse(
          absoluteArtifactPath,
          mimeType,
          {
            rangeHeader: request.headers.get("range"),
            signal: bindLibraryMediaReadSignal(libraryId, request.signal),
            onStreamError: (error) =>
              logger?.error("serpent-protocol.stream", error, {
                libraryId,
                artifactId,
              }),
          },
        );
        if (isCacheableImageMime && !request.headers.get("range")) {
          void previewCache?.store(libraryId, artifactId, absoluteArtifactPath, ext);
        }
        return response;
      } catch (error) {
        logger?.error("serpent-protocol.read", error, {
          libraryId,
          artifactId,
        });
        // A watcher/library-change event may have invalidated the path after
        // the batch returned. Do not keep serving a stale artifact location
        // after the first failed read; the next request will ask the Worker
        // for the current path.
        artifactPathCache.invalidateArtifact(libraryId, artifactId, url.hostname);
        return new Response("Artifact file missing", { status: 404 });
      }
    } catch (error) {
      logger?.error("serpent-protocol", error, { url: request.url });
      return new Response("Internal error", { status: 500 });
    }
  });


  // 主进程事件循环滞后监控（SERPENT_LAG_LOG=1）：Main 也是单线程。若 Main 被
  // 同步工作堵住，Renderer 的 IPC 会迟迟不返回，表现就是「切换资源库卡住」，
  // 而 Worker 日志里看不到任何异常。
  if (process.env.SERPENT_LAG_LOG === "1") {
    let lagWindowStart = Date.now();
    const lagTimer = setInterval(() => {
      const now = Date.now();
      const driftMs = now - lagWindowStart - 1_000;
      lagWindowStart = now;
      if (driftMs >= 200) {
        logger?.info("main.eventLoop.lag", "Main event loop was blocked.", { driftMs });
      }
    }, 1_000);
    lagTimer.unref?.();
  }
  // Start the HTTP API server (the machine-facing surface).
  try {
    const { token, created, filePath } = readOrCreateApiToken(app.getPath("userData"));
    if (created) {
      // First boot: surface the token in the log once so operators can grab it.
      logger?.info("http-api.token", "Generated a new API bearer token.", { filePath, token });
    } else {
      logger?.info("http-api.token", "API bearer token available.", { filePath });
    }
    const httpHost = process.env.SERPENT_HTTP_HOST === "0.0.0.0" ? "0.0.0.0" : "127.0.0.1";
    const configuredPort = Number(process.env.SERPENT_HTTP_PORT ?? "");
    httpApiServer = await createHttpApiServer({
      port: Number.isSafeInteger(configuredPort) && configuredPort > 0 ? configuredPort : HTTP_API_DEFAULT_PORT,
      host: httpHost,
      token,
      appVersion: app.getVersion(),
      gateway: automationCommandGateway!,
      getExecutionContext: () => {
        const journal = automationExecutionJournal;
        if (journal === undefined) return undefined;
        const active = journal.resolve(operatorExecution.executionId);
        if (active !== undefined) return active;
        // The operator execution hit its wall-clock budget; roll it forward so
        // the API stays live without a service restart.
        try {
          const renewed = journal.create({
            source: 'http',
            libraryId: null,
            declaredCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
            initialGrantedCapabilities: automationCapabilityRegistry.map((capability) => capability.capability),
          });
          journal.start(renewed.executionId);
          operatorExecution = renewed;
          logger?.info('http-api.execution-renewed', 'Renewed the HTTP API operator execution.', {
            executionId: renewed.executionId,
          });
          return journal.resolve(renewed.executionId);
        } catch (error) {
          logger?.error('http-api.execution-renew', error);
          return undefined;
        }
      },
      getLibraryChangeSequence: (libraryId) => libraryChangeSequences.get(libraryId),
      logger: {
        info: (scope, message, context) => logger?.info(scope, message, context),
        error: (scope, error, context) => logger?.error(scope, error, context),
      },
      onError: (err) => logger?.error("http-api", err),
    });
    logger?.info(
      "http-api",
      `HTTP API server started on ${httpHost}:${httpApiServer.port} (docs at /docs).`,
    );
  } catch (error) {
    // API failure is non-fatal for boot, but the backend loses its primary
    // surface — log loudly.
    logger?.error("http-api", error);
  }

  initializePreviewCache();

  // Headless bootstrap: with no UI to drive library opening, restore the most
  // recent library so the HTTP API and script surfaces have an active context
  // immediately after startup.
  await autoOpenRecentLibrary();
}

// Serpent-tluf: must run before app ready.
app.setName("Serpent");

if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app
    .whenReady()
    .then(startApplication)
    .catch((error: unknown) => {
      logger?.error("main.startup", error);
      // Headless: no dialog surface; log loudly and exit non-zero.
      process.stderr.write(`Serpent could not start: ${toPublicError(error).message}\n`);
      app.exit(1);
    });

  app.on("will-quit", () => {
    void cleanupAllExternalSources();
    syncAutoScheduler?.stop();
    syncAutoScheduler = undefined;
  });

  app.on("before-quit", (event) => {
    aiQueueScheduler.clearAll();
    if (quitAfterShutdown || !workerClient) return;
    event.preventDefault();
    if (applicationShutdownPromise) return;

    // Slice E: fail in-flight model thumbnail renders and destroy the window.
    offscreenThumbnailRenderer?.dispose();
    offscreenThumbnailRenderer = undefined;

    pluginActivationCoordinator?.dispose('supervisor-shutdown');

    // Close loopback listeners before the worker drain so a service restart
    // does not keep a port open while the next process starts.
    const apiClose = releaseLoopbackListeners();
    // Stop model processes before app.exit(), which bypasses will-quit.
    applicationShutdownPromise = (async (): Promise<void> => {
      const results = await Promise.allSettled([apiClose]);
      for (const result of results) {
        if (result.status !== "rejected") continue;
        logger?.error("http-api.close", result.reason, { reason: "application-quit" });
      }
      try {
        await workerClient?.shutdown();
      } catch (error) {
        logger?.error("library.worker.shutdown", error, { reason: "application-quit" });
      }
      quitAfterShutdown = true;
      // The first app.quit() is intentionally intercepted above while owned
      // processes and the Worker drain. app.exit() then completes that quit.
      app.exit(0);
    })();
    void applicationShutdownPromise.catch((error: unknown) => {
      logger?.error("application.shutdown", error);
      quitAfterShutdown = true;
      app.exit(0);
    });
  });
}
