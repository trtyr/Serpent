/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { ArtifactDescriptor, ArtifactPathCacheEntry, DatabaseConnection, ExrPlaneDescriptor, ImportFailurePoint, LibraryServiceOptions, LibraryWatch, LinkedFolderWatch, MediaAutoRepairComponent, NetworkScanState, OpenLibrary, PendingImport, SpawnFunction, SpawnResult, TransferCancelState, WatchRefreshState} from '../library-service-internals';
import { DATABASE_BACKUP_INTERVAL_MS, LibraryServiceError, SimulatedCrashError, closeIgnoringFailure, constrainFfmpegDecoderArgs, databaseBackupPath, databaseBackupTemporaryPath, databasePath, defaultMediaComponentProbe, defaultSpawnFn, hasRawMetadataBackfillStateSchema, oiioDecoderSemaphore, openConfiguredDatabase, readLibraryIdentity, realFileExists, serviceError } from '../library-service-internals';
import { randomUUID, createHash } from 'node:crypto';
import {
  accessSync,
  closeSync,
  constants,
  copyFileSync,
  createWriteStream,
  existsSync,
  mkdtempSync,
  fstatSync,
  fsyncSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  readSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmdirSync,
  rmSync,
  statSync,
  utimesSync,
  watch,
  writeFileSync,
  writeSync,
  type BigIntStats,
  type Dirent,
  type Stats,
} from 'node:fs';
import {
  lstat as lstatAsync,
  open as openFileAsync,
  opendir as opendirAsync,
  realpath as realpathAsync,
  rm as rmAsync,
} from 'node:fs/promises';
import path from 'node:path';
import { removeLibraryRootWithRetry, removePathWithSyncRetry, renamePathWithRetry } from '../windows-fs-retry';
import {
  execFileSync,
  spawn,
  type ChildProcess,
} from 'node:child_process';
import { lookup as dnsLookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { hostname, tmpdir } from 'node:os';

import BetterSqlite3 from 'better-sqlite3';
import {
  resolveBundledFontPath,
  resolveFfmpegPath,
  resolveFfprobePath,
  resolveOiiotoolPath,
} from '../binary-resolver';
import {
  durationSecondsFromProbeStdout,
  VIDEO_POSTER_GENERATOR_TAG,
  videoPosterGeneratorVersion,
  videoPosterSeekSeconds,
} from '../video-poster-seek';
import {
  commitReplacingFolderCoverFiles,
  folderCoverAbsolutePath,
  folderCoverMimeType,
  folderCoverStoredExtension,
  installFolderCoverFile,
  listStaleFolderCoverFiles,
  removeFolderCoverFile,
} from '../folder-custom-cover';
import { hasPdfCompatibleIllustratorHeader } from '../illustrator-ai-format';
import {
  dominantColorMetrics,
  extractRepresentativePalette,
  type RepresentativeColor,
} from '../palette-extractor';
import { pathIsWithin } from '../path-utils';
import {
  workerMediaDecodeConcurrency,
  workerMediaDecodeWaveSize,
  workerMediaInteractiveDecodeConcurrency,
} from '../media-concurrency';
import {
  mediaFfmpegConcurrencyLimit,
  systemAvailablePhysicalMemoryBytes,
} from '../media-memory-concurrency';
import {
  encoderUsesHardwareName,
  ffmpegOneFrameEncodeArgs,
  listedH264ProxyEncoders,
  parseFfmpegEncoderTokens,
} from '../video-proxy-encoder';
import {
  readImageDimensions,
  readImageDimensionsSync,
} from '../image-dimensions';
import {
  MediaJobStatusSummaryCache,
  mediaJobCountTotal,
  mediaJobCountsFromRows,
} from '../media-job-status-summary';
import {
  clampMediaJobListLimit,
  type MediaJobListCursor,
  sliceMediaJobListPage,
} from '../../shared/media-jobs';
import type { RawMetadataBackfillProbeOutcome } from '../raw-metadata-backfill-gate';

export interface RawMetadataBackfillAdmissionState {
  token: string;
  cursorAssetId: string | null;
  exhausted: boolean;
  /** Durable write time, exposed for diagnostics/tests without affecting admission. */
  updatedAt?: string;
}
import {
  countLinkedDirectoryAssets,
  countLinkedDirectoryChildren,
  collectLinkedDirectoryPrefixes,
  directChildLinkedDirectories,
  encodeLinkedVirtualFolderId,
  linkedAssetIsDirectChild,
  linkedAssetIsUnderDirectory,
  linkedDirectoryName,
  parentLinkedRelativePath,
  parseLinkedVirtualFolderId,
} from '../../shared/linked-folder-tree';
import {
  claimNextPluginJobRecord,
  cancelPluginJobRecord,
  completePluginJobRecord,
  enqueuePluginJobRecord,
  listPluginJobRecords,
  pausePluginJobRecord,
  pausePluginJobsForOwners as pausePluginJobRowsForOwners,
  reportPluginJobProgress,
  interruptUnfinishedPluginJobs,
  resumePluginJobRecord,
  retryPluginJobRecord,
} from '../plugin-job-repository';
import {
  materializePluginDerivedFields as materializePluginDerivedFieldRows,
  queryPluginDerivedFields as queryPluginDerivedFieldRows,
} from '../plugin-derived-field-repository';
import {
  LibraryWriteCoordinator,
  LibraryWriteCoordinatorError,
  isSQLiteWriteContention,
  type AcquireLibraryWriteLeaseOptions,
  type LibraryChangeSubscription,
  type LibraryJobLease,
  type LibraryWriteLease,
  type LibraryWriteLeaseHeartbeat,
} from '../library-write-coordinator';
import {
  createNetworkReadThroughConnection,
  defaultNetworkMetadataCacheDirectory,
  NetworkMetadataCache,
  NetworkMetadataSnapshotRejectedError,
  networkMetadataCacheKey,
  networkMetadataSourceFingerprint,
  networkMetadataSourceFingerprintEqual,
  type NetworkMetadataCacheDatabase,
  type NetworkMetadataCacheEvent,
  type NetworkMetadataCacheManifest,
  type NetworkMetadataSourceFingerprint,
  type NetworkReadThroughConnection,
} from '../network-metadata-cache';
import { columnsFor, degradedDefaults, hasTable, invalidateColumnProbe, missingColumns, qualify, selectColumns } from '../lenient-columns';
import { isBakeableStillImageFile } from '../../shared/bakeable-still-image';
import { rotateStillImageFile } from '../rotate-still-image-file';
import {
  asMediaResourceExhaustedError,
  MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE,
  MediaResourceExhaustedError,
  mediaResourceGuard,
  mediaResourceFailureFromSpawnResult,
} from '../media-resource-guard';
import {
  estimateMediaNativeMemoryBytes,
  mediaNativeMemoryBudget,
  type MediaNativeMemoryEstimate,
} from '../media-memory-budget';
import {
  clearMigrationFailure,
  MAX_MIGRATION_ATTEMPTS,
  readMigrationFailure,
  recordMigrationFailure,
} from '../schema-failure';
import {
  gitignoreMatchesPath,
  parseGitignore,
  type GitIgnoreMatcher,
} from '../gitignore';
import { diffGitignoreHits } from '../gitignore-preview';
import {
  gitignorePreviewCandidateKey,
  type GitignorePreviewCandidate,
} from '../../shared/gitignore-preview';
import { sanitizeAiDescription } from '../../shared/ai-analysis-settings';
import {
  CONTENT_REPLACE_BATCH_MAX_ITEMS,
  CONTENT_REPLACE_STAGE_CHUNK_MAX_BYTES,
} from '../../shared/content-replace';
import { smartCollectionQueryDefinitionSchema, extractedVideoMetadataSchema, type AssetMetadataResult, type ExtractedMetadataResult, type ExtractedVideoMetadata, type AssetSummary, type BrowseLayoutEntry, type CollectionSummary, type FilterClause, type FolderBrowseEntry, type GitignorePreview, type IgnoredPath, type LinkedFolderDirectoryMutation, type LinkedFolderRule, type LinkedFolderSummary, type ManagedFolderSummary, type SearchQuery, type SearchScope, type SortDefinition, type SmartCollectionQueryDefinition, type SmartCollectionSummary, type TagCooccurrenceGraph, type TagSummary, type TrashedFolderSummary } from '../../shared/asset-types';
import {
  parseWritableAppearance,
  sanitizeEntityAppearance,
  type EntityAppearance,
  type EntityAppearanceTarget,
} from '../../shared/entity-appearance';
import {
  FOLDER_NAVIGATION_COVER_CAP,
  type LibraryNavigationSummary,
} from '../../shared/library-navigation';
import { isLibraryRootFolderId } from '../../shared/library-root-folder';
import { BROWSE_SCOPE_MAX_ASSETS } from '../../shared/browse-scope';
import {
  VIEWPORT_CLAIM_ID_LIMIT,
  shouldFallbackViewportClaimToPersistentQueue,
  uniqueAssetIdsInOrder,
  viewportClaimRankOrderSql,
} from '../../shared/viewport-priority';
import {
  createAutomationFilePlanHash,
  createAutomationImportPlanHash,
} from '../../shared/automation-file-plan';
import { hasMeaningfulSmartCollectionCondition } from '../../shared/smart-collection-query';
import type {
  LibraryChangedEvent,
  MissingAssetRecoveryProbe,
  TagOperationSkip,
} from '../../shared/protocol/responses';
import type {
  PluginJobCheckpoint,
  PluginJobHandlerCapabilities,
  PluginJobItemResult,
  PluginJobRecord,
  PluginJobRecoveryStrategy,
} from '../../plugins/plugin-jobs';
import type { PluginProviderFieldType } from '../../plugins/plugin-providers';
import {
  HistoryTransitionError,
  OperationHistoryStateMachine,
  historyRecipeSchema,
  type HistoryDirection,
  type HistoryEntryState,
  type HistoryOperationReceipt,
  type HistoryPolicy,
  type HistoryRecipe,
  type HistorySource,
  type HistoryStackEntry,
  type HistoryStatus,
} from '../operation-history';
import { assertRegisteredHistoryRecipePair, assertRegisteredHistoryRecipe } from '../operation-history-recipes';
import {
  EagleLibraryReadError,
  readEagleAssetCandidate,
  readEagleLibraryRoot,
  sumEagleLibrarySourceBytes,
  type EagleAssetCandidate,
  type EagleFolderNode,
} from '../eagle-library';
import {
  BillfishLibraryReadError,
  readBillfishLibrary,
  type BillfishAssetCandidate,
} from '../billfish-library';
import {
  emptySyncAssetMetadata,
  hasSyncAiLayer,
  metadataContentHash,
  type SyncAssetMetadata,
} from '../sync/sync-metadata';
import { parseManifest } from '../sync/manifest';
import { deriveSyncCardStatus, isLocalSyncPending } from '../../shared/sync-card-status';
import type { PublicErrorCode } from '../../shared/protocol/errors';
import { classifyUnknownFailure, isDecoderMissingInputError, isSqliteEngineUnavailableError, publicReasonFromError, type PublicErrorReason } from '../../shared/protocol/errors';
import type {
  NameConflictDecision,
  SuspectedDuplicateDecision,
} from '../../shared/protocol/requests';
import { assetAuthorSchema, sourcePageUrlSchema } from '../../shared/protocol/requests';
import { extractAuthorFromExif } from '../author-from-exif';
import {
  extractRawImageMetadataDetailed,
  extractRawImageMetadata,
  normalizeRawImageMetadata,
  resolvedExtractedPixelSize,
  type RawImageMetadata,
  type RawImageMetadataParser,
} from '../raw-image-metadata';
import {
  embeddedMetadataSearchText,
  normalizeProbeEmbeddedMetadata,
} from '../embedded-metadata';
import { extractRawEmbeddedJpegThumbnail } from '../raw-embedded-thumbnail';
import {
  queryModelCompanionAssets,
  resolveModelPreviewResolution,
} from '../model-resolution';
import type { ModelCompanionAsset } from '../../shared/model-companions';
import type {
  ImportCompletion,
  ImportConflictPlan,
  ImportSourceFailurePlan,
  ImageSequenceImportOffer,
  AutomationImportPlan,
  InternalLibrarySummary,
  ExportProgressEvent,
  EagleImportResult,
  BillfishImportResult,
  ImportProgressEvent,
  DeleteProgressEvent,
} from '../../shared/protocol/responses';
import {
  copyNameForIndex,
  LibraryInputError,
  normalizeAbsolutePath,
  normalizeAssetFileBaseName,
  normalizeFolderName,
  normalizeRelativeAssetPath,
  isPortablePathEqualOrDescendant,
  portablePathIdentity,
  portablePathSegmentIdentity,
  targetLibraryPath,
} from '../library-rules';
import {
  classifyLibraryStorage,
  type LibraryStorageKind,
} from '../network-storage';
import { ImportDestinationDirectoryCache } from '../import-destination-directory-cache';
import {
  LibraryParentError,
  resolveWritableLibraryParent,
} from '../library-parent';
import {
  normalizeSearchText,
  tokenizeForFts,
  type SearchClause,
} from '../search-query';
import {
  buildCatalogAssetVisibilityPredicates,
  buildCatalogCollectionScope,
  buildCatalogContextualSearchWhere,
  buildCatalogExplicitIgnoreSql,
  buildCatalogFilterWhere,
  buildCatalogFolderScopeClause,
  buildCatalogFtsQuery,
  buildCatalogSortOrder,
  catalogAssetSummaryFromRow,
  catalogBrowseLayoutEntryFromRow,
  catalogFtsCanNarrowSearchGroups,
  countCatalogNavigationAssets,
  foldCatalogImageSequenceSummaries,
  hasPositiveCatalogSearchClause,
  isDefaultCatalogBrowseIndexRequest,
  normalizedCatalogSearchGroups,
  readCatalogArtifactDescriptor,
  readCatalogThumbnailArtifacts,
  type CatalogAssetSummaryRow,
  type CatalogSearchGroup as SearchGroup,
} from '../catalog-read';
import { rollupDirectFolderCounts } from '../../shared/filtered-folder-counts';
import {
  GIF_GOOD_PAGE_SCORE_THRESHOLD,
  GIF_THUMBNAIL_PROBE_SIZE,
  pickBestGifPage,
  sampleGifPageIndices,
  scoreRawRgbFrame,
} from '../gif-thumbnail-page';
import { buildGifExtractedMetadata, type GifExtractedMetadata } from '../gif-metadata';
import {
  IMPORTED_THUMBNAIL_GENERATOR_PREFIX,
  IMPORTED_THUMBNAIL_MAX_BYTES,
  IMPORTED_THUMBNAIL_MAX_EDGE,
  IMPORTED_THUMBNAIL_NORMALIZATION_JOB,
  IMPORTED_THUMBNAIL_PRESERVED_GENERATOR,
  importedThumbnailNeedsNormalization,
  isImportedThumbnailGenerator,
  isLegacyImportedThumbnailGenerator,
} from '../imported-thumbnail-policy';
import {
  parseIcoPageSizes,
  pickLargestIcoPage,
  type IcoPageSize,
} from '../ico-page';
import {
  AUDIO_EXTENSION_NAMES,
  AUDIO_FORCED_WAVEFORM_GENERATOR_MARK,
  AUDIO_WAVEFORM_COVER_BACKGROUND,
  AUDIO_WAVEFORM_COVER_GENERATOR_TAG,
  AUDIO_WAVEFORM_COVER_HEIGHT,
  AUDIO_WAVEFORM_COVER_STROKE,
  AUDIO_WAVEFORM_COVER_WIDTH,
  AUDIO_WAVEFORM_VIEWER_HEIGHT,
  AUDIO_WAVEFORM_VIEWER_WIDTH,
  audioGridThumbnailNeedsRebuild,
  audioMimeForExtension,
  ffprobeHasAttachedPicture,
  isAudioFileName,
} from '../../shared/audio-media';
import {
  IMAGE_EXTENSIONS,
  JPEG_IMAGE_EXTENSIONS,
  RAW_IMAGE_EXTENSIONS,
  VIDEO_EXTENSIONS,
  MODEL_EXTENSIONS,
  DOCUMENT_EXTENSIONS,
  FONT_EXTENSIONS,
  directImageMimeForExtension,
  imageDecoderForExtension,
  imageViewerDecoderForExtension,
  imageMimeForExtension,
  isSupportedImageExtension,
  isSupportedModelExtension,
  isSupportedDocumentExtension,
  isSupportedFontExtension,
  fontMimeForExtension,
  isSupportedVideoExtension,
  modelMimeForExtension,
  isRawImageExtension,
  isEmbeddedImageMetadataExtension,
  EMBEDDED_IMAGE_METADATA_EXTENSIONS,
  isChromiumDirectPlayVideoExtension,
  videoMimeForExtension,
} from '../../shared/media-formats';
import {
  isSourceDirectPreview,
  SOURCE_DIRECT_IMAGE_EXTENSIONS,
  SOURCE_DIRECT_MAX_BYTES,
  SOURCE_DIRECT_MAX_LONG_EDGE_PX,
  SOURCE_DIRECT_MAX_PIXELS,
} from '../../shared/preview-policy';
import { mediaTypeSupportsAutoPalette } from '../../shared/palette-visibility';
import {
  admitArtifactJob,
  artifactKindForJob,
  artifactIdentityForPersistedRow,
  EXPLICIT_PROXY_FALLBACK_MARKER,
  type ArtifactJobKind,
} from '../artifact-policy';
import {
  ArtifactDescriptorCache,
  type ArtifactDescriptorCacheMetrics,
} from '../artifact-descriptor-cache';
import {
  BrowseSessionStore,
  browseQueryFingerprint,
  browseSessionIndexComplete,
  browseSessionPageUsesSnapshot,
  type BrowseSessionLookup,
  type BrowseSessionSnapshot,
} from '../browse-session-store';
import {
  LibraryReconciliationOwner,
  type LibraryReconciliationTask,
} from '../reconciliation-owner';
import {
  MODEL_THUMBNAIL_GENERATOR_VERSION,
} from '../../shared/model-thumbnail-protocol';
import { DOCUMENT_THUMBNAIL_GENERATOR_VERSION } from '../../shared/document-thumbnail-protocol';
import {
  DOCUMENT_THUMBNAIL_WIDTH,
  FONT_THUMBNAIL_GENERATOR_VERSION,
  FONT_THUMBNAIL_HEIGHT,
} from '../../shared/document-thumbnail-protocol';
import type { FontMetadata } from '../../shared/font-metadata';
import {
  fontMetadataToExtractedFields,
  fontSampleQuerySuffix,
  readFontMetadata,
} from '../font-file-metadata';
import {
  COMMON_IMAGE_COLOR_SPACE_OPTIONS,
  colorSpaceInfoFromName,
  defaultImageColorSpace,
  parseIccProfileDescription,
  parseOiioColorSpaceInfo,
  type ImageColorSpaceInfo,
  type ImageColorSpaceOption,
} from '../image-color-space';
import {
  countTextLines,
  isTextFileName,
  TEXT_SAVE_MAX_BYTES,
  TEXT_VIEWER_MAX_BYTES,
  textMimeForExtension,
} from '../../shared/text-media';
import { decodeTextBytes } from '../../shared/text-encoding';
import { canOverrideImageColorSpace } from '../../shared/image-color-space';
import { inferRelinkBatchRoot } from '../../shared/infer-relink-batch-root';
import {
  DEFAULT_IMAGE_SEQUENCE_FPS,
  detectImageSequences,
  formatImageSequenceDisplayName,
  type ImageSequenceFrameCandidate,
} from '../../shared/image-sequence';
import { discoverSelectedImageSequenceFrames } from '../image-sequence-import-discovery';
import { isImportConflictPlan, isImportSourceFailurePlan } from '../../shared/import-outcome';
import {
  ImportSourceFailurePause,
  isSkippableImportSourceFailure,
  skippedImportSourceFromError,
  toImportSourceFailurePlan,
  type SkippedImportSource,
} from '../import-source-failure';
import { assetSupportsThumbnail } from '../../shared/thumbnail-support';
import {
  extractZipStream,
  zipBombProtectionLimits,
  ZipImportStreamError,
  type ZipArchiveManifest,
} from '../zip-import-stream';
import { listZipArchiveFiles, readZipArchiveEntry } from '../zip-archive-preview';
import {
  defaultPinnedHttpTransport,
  type DnsLookup,
  type PinnedHttpTransport,
  type ResolvedAddress,
} from '../secure-http-download';
import {
  extensionForRemoteContentType,
  filenameMatchesRemoteContentType,
  normalizeRemoteContentType,
  remoteMediaValidationFailure,
  RemoteMediaMagicProbe,
} from '../remote-media-validation';
import { requeueRetryableFailedArtifacts } from '../derived-artifact-repair';
import {
  SQLITE_IN_BIND_LIMIT,
  sqliteAllInChunks,
  sqliteInChunks,
  sqliteInPlaceholders,
  sqliteRunInChunks,
  withSqliteInPredicate,
} from '../sqlite-in';

/**
 * Core of the split LibraryService: fields, constructor, open-library state,
 * leases/change sequences, backups and media runners. Domain capability
 * classes extend this in a linear chain (partial-class pattern).
 */
export abstract class LibraryServiceCore {
  /** Stable for this Worker process; a new app process gets a new session. */
  public readonly applicationSessionId = randomUUID();
  public reportedMemoryProbeUnavailable = false;
  /** App setting: audio grid thumbnails use cover art when the file has one. */
  public audioPreviewPrefersCover = true;
  public readonly openById = new Map<string, OpenLibrary>();
  public readonly openIdByPath = new Map<string, string>();
  /**
   * Serpent-4bdd26: prepared-statement cache keyed by `libraryId\0sql`.
   * better-sqlite3 re-compiles on every `.prepare()` call; hot per-row paths
   * (isExplicitlyIgnored runs once per enumerated file) measured 410ms of
   * pure compile time per 20k rows vs 54ms with a cached statement.
   */
  public readonly preparedStatementCache = new Map<string, unknown>();
  /**
   * Serpent-29125f: text cards only need a small UTF-8 prefix. Keep the
   * decoded result by revision so remounting cards (or opening the Inspector
   * for the same asset) does not reopen the linked source file in the Worker.
   * The cache is deliberately bounded and includes maxBytes because the text
   * editor requests a larger cap than browse cards.
   */
  public readonly textAssetPreviewCache = new Map<string, {
    value: {
      assetId: string;
      revisionId: string;
      content: string;
      truncated: boolean;
      byteSize: number;
      lineCount: number;
      editable: boolean;
      mimeType: string;
    };
  }>();
  public static readonly TEXT_ASSET_PREVIEW_CACHE_LIMIT = 256;
  /**
   * 进行中的同步会话（libraryId → sessionId）。内存级互斥：自动同步与
   * 手动同步不能同时在跑；进程退出自动释放，崩溃残留不会误锁。
   */
  public readonly activeSyncSessions = new Map<string, string>();
  /** >0 时用户命令边界不广播 asset.changed，避免同步回放再触发自动同步。 */
  public syncReplayDepth = 0;
  public readonly databaseBackupInFlight = new Map<string, Promise<boolean>>();
  public readonly databaseBackupTimers = new Map<string, ReturnType<typeof setTimeout>>();
  public readonly pendingImports = new Map<string, PendingImport>();
  /** Monotonic `import.progress.sequence` per importId. */
  public readonly importProgressSequences = new Map<string, number>();
  /**
   * A resolve can finish the durable commit before a late cancel/abandon RPC
   * arrives. Retain those ids briefly so the already-successful operation is
   * idempotent from the renderer's point of view.
   */
  public readonly finalizedImportIds = new Map<string, number>();
  public readonly watchByLibraryId = new Map<string, LibraryWatch>();
  public readonly linkedWatchByKey = new Map<string, LinkedFolderWatch>();
  /** One coalesced asynchronous filesystem refresh per open library. */
  public readonly watchRefreshByLibrary = new Map<string, WatchRefreshState>();
  /** Network libraries use a low-frequency discovery fingerprint checkpoint. */
  public readonly networkScanByLibrary = new Map<string, NetworkScanState>();
  public readonly activeExports = new Map<string, TransferCancelState>();
  public readonly activeImports = new Map<string, TransferCancelState>();
  public readonly activeDiskDeletes = new Map<string, TransferCancelState>();
  public readonly activeExportByLibraryId = new Map<string, string>();
  public readonly activeImportBySource = new Map<string, string>();
  public readonly activeImportByDestination = new Map<string, string>();
  public readonly activeMediaJobs = new Map<string, {
    controller: AbortController;
    libraryId: string;
    assetId: string;
    settled: Promise<void>;
  }>();
  /**
   * A missing component can be repaired while a library remains open. Once a
   * repair wave has been queued, do not requeue the same component on every
   * visible-range refresh if the replacement fails again. Closing the library
   * starts a new detection wave.
   */
  public readonly autoRepairAttemptedByLibrary = new Map<
    string,
    Set<MediaAutoRepairComponent>
  >();
  /** Eagle imports keep their media previews but never enter auto-AI later. */
  public readonly autoAnalysisSuppressedAssetIds = new Map<string, Set<string>>();
  /** Serpent-140fe2 review fix: coalesce overlapping lazy contact-sheet generations. */
  public readonly videoContactSheetInFlight = new Map<string, {
    controller: AbortController;
    promise: Promise<boolean>;
    waiters: number;
  }>();
  /** Avoid synchronously probing missing tools on every visible-range request. */
  public readonly autoRepairProbeFailedAtByLibrary = new Map<
    string,
    Map<MediaAutoRepairComponent, number>
  >();
  /** Successful OIIO part probes are immutable for a revision. */
  public readonly exrPlanesByRevision = new Map<string, ExrPlaneDescriptor[]>();
  /** Color metadata probes are immutable for a revision. */
  public readonly imageColorSpaceByRevision = new Map<string, ImageColorSpaceInfo>();
  /** Coalesce concurrent RAW viewer decodes and remember a failed attempt per revision. */
  public readonly rawViewerImageInFlight = new Map<string, Promise<void>>();
  /** ICO files can contain several sizes; coalesce the largest-page viewer decode. */
  public readonly icoViewerImageInFlight = new Map<string, Promise<void>>();
  /** Coalesce full-resolution OIIO viewer decodes for TIFF/PSD/EXR/TGA/BMP. */
  public readonly oiioViewerImageInFlight = new Map<string, Promise<void>>();
  /** Cache the first H.264 encoder that actually encodes a 1-frame probe. */
  public readonly videoProxyEncoderByFfmpegPath = new Map<string, string | null>();
  /**
   * Serving a serpent:// preview used to repeat one artifact lookup and four
   * containment filesystem probes for every image request. The cache is
   * scoped by library and invalidated by the durable library change sequence;
   * entries are never shared across libraries or usages.
   */
  public readonly artifactPathCache = new Map<string, ArtifactPathCacheEntry>();
  /**
   * Serpent-e97c00：任务面板/状态栏读的是按状态分组的总数，而该查询要遍历整个媒体
   * 任务历史（真实库中位约 110 ms）。`jobs` 的写入已经由 `library_change_on_jobs_*`
   * 触发器 bump `library_change_sequence`，所以按序号校验 + 有界陈旧即可把它变成
   * O(1) 读，不需要在每个任务写路径挂钩子。
   */
  public readonly mediaJobSummaryCache = new MediaJobStatusSummaryCache();
  /**
   * The descriptor is tiny, but getPreviewArtifact/getExtractedMetadata can
   * ask for the same current row repeatedly while a card remounts. Entries
   * are fenced by the durable library change sequence, so artifact writes
   * invalidate only affected descriptors on the next lookup.
   */
  public readonly artifactDescriptorCache = new ArtifactDescriptorCache<ArtifactDescriptor | null>();
  /** Worker-owned ordered browse snapshots; summaries are fetched per page. */
  public readonly browseSessionStore = new BrowseSessionStore();
  /** Disk-heavy open maintenance yields while the user is actively browsing. */
  public readonly interactiveIdleUntilByLibrary = new Map<string, number>();
  /**
   * Open-time backup and full quick_check are deferred so synchronous SQLite
   * work cannot end the first browse/viewer wave. The timer is still owned by
   * the open generation and is cancelled when that generation closes.
   */
  public readonly deferredOpenMaintenanceByLibrary = new Map<string, ReturnType<typeof setTimeout>>();
  /** One cancellable reconciliation owner per open library generation. */
  public readonly reconciliationOwner = new LibraryReconciliationOwner<OpenLibrary>();
  /**
   * Open automation groups are keyed by their Main-owned execution source.
   * The value is an in-memory reservation until the first real step is
   * recorded. Keeping the reservation out of `operation_history` prevents a
   * history-group handshake from invalidating an approved file-operation plan.
   */
  public readonly openOperationHistoryGroups = new Map<string, string>();
  /** Prevent a replayed history recipe from creating a second history entry. */
  public historyReplayDepth = 0;
  /** User-scoped disposable read snapshots for network libraries. */
  public readonly networkMetadataCache: NetworkMetadataCache;
  /**
   * After in-app filesystem mutations (text save, copy, move, import…), watcher
   * refreshes still update DB but must not surface a "disk synced" toast — that
   * copy is reserved for true external changes.
   */
  public suppressWatcherNotifyUntilMs = 0;
  public artifactsDirReady = new WeakSet<OpenLibrary>();

  /** Global preference: linked-folder assets with a missing source stay listed. */
  protected showMissingLinkedFiles = true;

  /** Thumbnail-provider extension allowlist per library (plugin domain). */
  public readonly pluginThumbnailExtensions = new Map<string, Set<string>>();

  constructor(protected readonly options: LibraryServiceOptions = {}) {
    this.networkMetadataCache = new NetworkMetadataCache(
      options.networkMetadataCacheDirectory ?? defaultNetworkMetadataCacheDirectory(),
    );
  }

  noteInteractiveActivity(libraryId: string, idleMs = 1_000): void {
    this.interactiveIdleUntilByLibrary.set(
      libraryId,
      Math.max(
        this.interactiveIdleUntilByLibrary.get(libraryId) ?? 0,
        Date.now() + idleMs,
      ),
    );
  }

  /**
   * Mark imported assets as preview-only. This is deliberately kept in the
   * Worker rather than sent through Main so a large Eagle import does not
   * materialize thousands of asset ids in the renderer process.
   */
  public suppressAutoAnalysisForAssets(
    libraryId: string,
    assetIds: readonly string[],
  ): void {
    if (assetIds.length === 0) return;
    const openLibrary = this.requireOpenLibrary(libraryId);
    const uniqueAssetIds = [...new Set(assetIds)];
    const now = new Date().toISOString();
    const insert = openLibrary.connection.prepare(
      `INSERT OR IGNORE INTO asset_auto_analysis_suppression
         (asset_id, reason, created_at)
       VALUES (?, 'external-library-import', ?)`,
    );
    openLibrary.connection.transaction(() => {
      for (const assetId of uniqueAssetIds) insert.run(assetId, now);
    })();
    const suppressed = this.autoAnalysisSuppressedAssetIds.get(libraryId) ?? new Set<string>();
    for (const assetId of uniqueAssetIds) suppressed.add(assetId);
    this.autoAnalysisSuppressedAssetIds.set(libraryId, suppressed);
  }

  /** Used by the media queue at the visual-input boundary. */
  shouldAutoAnalyzeAsset(libraryId: string, assetId: string): boolean {
    const cached = this.autoAnalysisSuppressedAssetIds.get(libraryId);
    if (cached?.has(assetId)) return false;
    const openLibrary = this.requireOpenLibrary(libraryId);
    const suppressed = openLibrary.connection
      .prepare('SELECT 1 FROM asset_auto_analysis_suppression WHERE asset_id = ? LIMIT 1')
      .get(assetId);
    if (suppressed !== undefined) {
      const next = cached ?? new Set<string>();
      next.add(assetId);
      this.autoAnalysisSuppressedAssetIds.set(libraryId, next);
      return false;
    }
    return true;
  }

  public async createConsistentDatabaseSnapshot(
    connection: DatabaseConnection,
    destinationPath: string,
    cancelState: TransferCancelState,
  ): Promise<void> {
    try {
      await connection.backup(destinationPath, {
        progress: () => {
          if (cancelState.cancelled) throw new LibraryServiceError('CANCELLED');
          return cancelState.backupPageBatch ?? 100;
        },
      });
    } catch (error) {
      try { rmSync(destinationPath, { force: true }); } catch { /* best effort */ }
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }

    let verifyConnection: DatabaseConnection | undefined;
    try {
      verifyConnection = openConfiguredDatabase(destinationPath);
      const result = verifyConnection.pragma('quick_check(1)', { simple: true });
      if (result !== 'ok') throw new LibraryServiceError('LIBRARY_CORRUPT');
    } catch (error) {
      try { rmSync(destinationPath, { force: true }); } catch { /* best effort */ }
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    } finally {
      closeIgnoringFailure(verifyConnection);
    }
  }

  public databaseBackupNow(): number {
    return this.options.databaseBackupClock?.now() ?? Date.now();
  }

  /**
   * Write one verified online snapshot and rotate it into the two-slot local
   * safety net. The temp file is never considered a backup and is removed on
   * every failure, so a half-written snapshot cannot replace a good slot.
   */
  public async createDatabaseBackupForOpenLibrary(
    openLibrary: OpenLibrary,
    reason: 'open' | 'close' | 'destructive' | 'periodic',
    force = false,
  ): Promise<boolean> {
    if (openLibrary.readOnly) return false;
    const existing = this.databaseBackupInFlight.get(openLibrary.summary.libraryId);
    if (existing) return existing;

    const backup1 = databaseBackupPath(openLibrary.summary.libraryPath, 1);
    if (!force && realFileExists(backup1)) {
      try {
        const age = this.databaseBackupNow() - statSync(backup1).mtimeMs;
        if (age >= 0 && age < DATABASE_BACKUP_INTERVAL_MS) return false;
      } catch {
        // A disappearing or unreadable slot is handled by a fresh snapshot.
      }
    }

    const task = (async () => {
      const backupDirectory = path.dirname(backup1);
      const temporaryPath = databaseBackupTemporaryPath(openLibrary.summary.libraryPath);
      try {
        mkdirSync(backupDirectory, { recursive: true });
        await this.createConsistentDatabaseSnapshot(
          openLibrary.connection,
          temporaryPath,
          {
            cancelled: false,
            // Open/periodic snapshots are maintenance work. Keep each native
            // backup transfer below the event-loop budget; explicit close or
            // export snapshots retain their existing throughput setting.
            ...(reason === 'open' || reason === 'periodic'
              ? { backupPageBatch: 1 }
              : {}),
          },
        );

        const backup2 = databaseBackupPath(openLibrary.summary.libraryPath, 2);
        if (existsSync(backup2)) rmSync(backup2, { force: true });
        if (existsSync(backup1)) renameSync(backup1, backup2);
        renameSync(temporaryPath, backup1);
        return true;
      } catch (error) {
        try { rmSync(temporaryPath, { force: true }); } catch { /* best effort */ }
        this.diagnose('library.backup.failed', error, {
          libraryId: openLibrary.summary.libraryId,
          libraryPath: openLibrary.summary.libraryPath,
          reason,
        });
        return false;
      }
    })();
    this.databaseBackupInFlight.set(openLibrary.summary.libraryId, task);
    try {
      return await task;
    } finally {
      if (this.databaseBackupInFlight.get(openLibrary.summary.libraryId) === task) {
        this.databaseBackupInFlight.delete(openLibrary.summary.libraryId);
      }
    }
  }

  public armDatabaseBackupTimer(openLibrary: OpenLibrary): void {
    const libraryId = openLibrary.summary.libraryId;
    const oldTimer = this.databaseBackupTimers.get(libraryId);
    if (oldTimer) clearTimeout(oldTimer);
    const timer = setTimeout(() => {
      this.databaseBackupTimers.delete(libraryId);
      const current = this.openById.get(libraryId);
      if (!current || current.readOnly) return;
      void this.createDatabaseBackupForOpenLibrary(current, 'periodic', true)
        .finally(() => this.armDatabaseBackupTimer(current));
    }, DATABASE_BACKUP_INTERVAL_MS);
    // A backup timer must never keep a headless Worker alive on its own.
    timer.unref?.();
    this.databaseBackupTimers.set(libraryId, timer);
  }

  /** Explicit test/maintenance hook for a verified backup of an open library. */
  async createDatabaseBackup(libraryId: string): Promise<boolean> {
    const openLibrary = this.openById.get(libraryId);
    if (!openLibrary) throw new LibraryServiceError('LIBRARY_NOT_OPEN');
    return this.createDatabaseBackupForOpenLibrary(openLibrary, 'destructive', true);
  }

  public get spawnFn(): SpawnFunction {
    return this.options.spawnFn ?? defaultSpawnFn;
  }

  public mediaComponentAvailable(component: MediaAutoRepairComponent): boolean {
    try {
      return this.options.mediaComponentProbe?.(component)
        ?? defaultMediaComponentProbe(component);
    } catch (error) {
      this.diagnose('media-component.probe', error, { component });
      return false;
    }
  }

  public runFfmpeg(
    command: string,
    args: string[],
    options: {
      timeoutMs?: number;
      signal?: AbortSignal;
      memory?: Omit<MediaNativeMemoryEstimate, 'decoder'>;
    } = {},
  ): Promise<SpawnResult> {
    const { memory, ...spawnOptions } = options;
    const boundedArgs = constrainFfmpegDecoderArgs(command, args);
    const memoryBytes = estimateMediaNativeMemoryBytes({ decoder: 'ffmpeg', ...memory });
    return mediaNativeMemoryBudget.run(
      spawnOptions.signal,
      memoryBytes,
      async () => {
        try {
          const result = await this.spawnFn(command, boundedArgs, spawnOptions);
          if (mediaResourceFailureFromSpawnResult(result)) {
            throw asMediaResourceExhaustedError(result, 'ffmpeg')
              ?? new Error('FFmpeg reported native resource pressure.');
          }
          return result;
        } catch (error) {
          throw asMediaResourceExhaustedError(error, 'ffmpeg') ?? error;
        }
      },
      {
        key: 'ffmpeg',
        limit: () => mediaFfmpegConcurrencyLimit(this.availablePhysicalMemoryBytes()),
      },
    );
  }

  public runOiio(
    command: string,
    args: string[],
    options: {
      timeoutMs?: number;
      signal?: AbortSignal;
      memory?: Omit<MediaNativeMemoryEstimate, 'decoder'>;
    } = {},
  ): Promise<SpawnResult> {
    const { memory, ...spawnOptions } = options;
    const memoryBytes = estimateMediaNativeMemoryBytes({ decoder: 'oiio', ...memory });
    return mediaNativeMemoryBudget.run(
      spawnOptions.signal,
      memoryBytes,
      () => oiioDecoderSemaphore.run(
        spawnOptions.signal,
        async () => {
          try {
            const result = await this.spawnFn(command, args, spawnOptions);
            if (mediaResourceFailureFromSpawnResult(result)) {
              throw asMediaResourceExhaustedError(result, 'oiio')
                ?? new Error('OpenImageIO reported native resource pressure.');
            }
            return result;
          } catch (error) {
            throw asMediaResourceExhaustedError(error, 'oiio') ?? error;
          }
        },
      ),
    );
  }

  public diagnose(scope: string, error: unknown, context?: Record<string, unknown>): void {
    try {
      this.options.onDiagnostic?.({ scope, error, context });
    } catch {
      // Diagnostics are strictly best effort and must never replace the primary failure.
    }
  }

  public availablePhysicalMemoryBytes(): number | undefined {
    let bytes: number | undefined;
    try {
      bytes = this.options.availablePhysicalMemoryBytesForTests
        ? this.options.availablePhysicalMemoryBytesForTests()
        : systemAvailablePhysicalMemoryBytes();
    } catch {
      bytes = undefined;
    }

    if (Number.isSafeInteger(bytes) && bytes! > 0) {
      this.reportedMemoryProbeUnavailable = false;
      return bytes;
    }

    if (!this.reportedMemoryProbeUnavailable) {
      this.reportedMemoryProbeUnavailable = true;
      this.diagnose(
        'media-memory.probe-unavailable',
        new Error('System physical memory is unavailable; FFmpeg concurrency uses the conservative limit.'),
        { fallback: 'conservative', maxConcurrentFfmpeg: mediaFfmpegConcurrencyLimit(undefined) },
      );
    }
    return undefined;
  }

  reportDiagnostic(scope: string, error: unknown, context?: Record<string, unknown>): void {
    this.diagnose(scope, error, context);
  }

  public failAt(point: ImportFailurePoint): void {
    const configured = this.options.failAt;
    if (configured !== point && (!Array.isArray(configured) || !configured.includes(point))) return;
    if (this.options.terminateProcessAt === point) {
      // The option is only wired from SERPENT_E2E in the UtilityProcess. A
      // synchronous exit is intentional here: the preceding failpoint is
      // placed after the durable manifest and filesystem placement, so the
      // next process must exercise the real recovery path instead of the
      // in-process rollback catch below.
      process.exit(86);
    }
    if (point.startsWith('crash-')) throw new SimulatedCrashError(`Injected crash: ${point}`);
    throw new Error(`Injected import failure: ${point}`);
  }

  /** Cheap liveness check for callers that must not open or mutate state. */
  isLibraryOpen(libraryId: string): boolean {
    try {
      this.requireOpenLibrary(libraryId);
      return true;
    } catch {
      return false;
    }
  }

  /** Serpent-2cc492: open-state probe for the worker-runtime startup gate. */
  hasOpenLibrary(libraryId: string): boolean {
    return this.openById.has(libraryId);
  }

  reconcileLinkedWatchersForLibrary(libraryId: string): void {
    this.reconcileLinkedWatchers(this.requireOpenLibrary(libraryId));
  }

  public requireOpenLibrary(libraryId: string): OpenLibrary {
    const openLibrary = this.openById.get(libraryId);
    if (!openLibrary) throw new LibraryServiceError('LIBRARY_NOT_OPEN');
    if (!this.sqlitePrimaryIsOpen(openLibrary)) {
      this.evictDeadOpenLibrary(libraryId, openLibrary);
      throw new LibraryServiceError('LIBRARY_NOT_OPEN');
    }
    this.syncGitignore(openLibrary);
    return openLibrary;
  }

  /**
   * `openById` membership must mean the better-sqlite3 primary is still open.
   * Network libraries wrap that primary in two adapters; checking the wrapper
   * object's own `open` flag is not enough because the wrapper does not
   * forward it.
   */
  public sqlitePrimaryIsOpen(openLibrary: OpenLibrary): boolean {
    const primary = openLibrary.networkMetadataCache?.readThrough.primaryConnection
      ?? openLibrary.connection;
    return (primary as { open?: boolean }).open !== false;
  }

  public sqliteConnectionIsRegisteredPrimary(connection: DatabaseConnection | undefined): boolean {
    if (!connection) return false;
    for (const openLibrary of this.openById.values()) {
      if (openLibrary.connection === connection || openLibrary.writeConnection === connection) {
        return true;
      }
      const primary = openLibrary.networkMetadataCache?.readThrough.primaryConnection;
      if (primary === connection) return true;
    }
    return false;
  }

  public findLibraryIdOwningSqliteConnection(
    connection: DatabaseConnection | undefined,
  ): string | undefined {
    if (!connection) return undefined;
    for (const [libraryId, openLibrary] of this.openById) {
      if (openLibrary.connection === connection || openLibrary.writeConnection === connection) {
        return libraryId;
      }
      if (openLibrary.networkMetadataCache?.readThrough.primaryConnection === connection) {
        return libraryId;
      }
    }
    return undefined;
  }

  /**
   * Drop a handle whose SQLite primary is already closed. Do not run cancelJobs
   * or checkpoint — those need a live connection and would throw TypeError.
   */
  public evictDeadOpenLibrary(libraryId: string, openLibrary: OpenLibrary): void {
    this.cancelDeferredOpenMaintenance(libraryId);
    this.cancelOpenBackgroundReconciliation(libraryId);
    const backupTimer = this.databaseBackupTimers.get(libraryId);
    if (backupTimer) {
      clearTimeout(backupTimer);
      this.databaseBackupTimers.delete(libraryId);
    }
    try { this.stopAssetWatcher(libraryId); } catch { /* handle is already unusable */ }
    try { this.stopLinkedWatchers(libraryId); } catch { /* handle is already unusable */ }
    try { openLibrary.changeSubscription.stop(); } catch { /* handle is already unusable */ }
    this.openById.delete(libraryId);
    this.openIdByPath.delete(openLibrary.summary.libraryPath);
    this.invalidateArtifactPathCache(libraryId);
    this.artifactDescriptorCache.invalidateLibrary(libraryId);
    this.browseSessionStore.invalidateLibrary(libraryId);
    this.dropPreparedStatementCache(libraryId);
    this.clearTextAssetPreviewCache(libraryId);
    this.autoRepairAttemptedByLibrary.delete(libraryId);
    this.autoRepairProbeFailedAtByLibrary.delete(libraryId);
    this.autoAnalysisSuppressedAssetIds.delete(libraryId);
    this.interactiveIdleUntilByLibrary.delete(libraryId);
    this.diagnose(
      'library.handle.evicted-closed-primary',
      new LibraryServiceError('LIBRARY_NOT_OPEN'),
      { libraryId },
    );
  }

  public probeCatalogIdentity(canonicalPath: string): string | undefined {
    let probe: DatabaseConnection | undefined;
    try {
      probe = openConfiguredDatabase(
        databasePath(canonicalPath),
        this.options.sqliteBusyTimeoutMsForTests,
        { readonly: true },
      );
      return readLibraryIdentity(probe, { skipQuickCheck: true }).library_id;
    } catch {
      return undefined;
    } finally {
      closeIgnoringFailure(probe);
    }
  }

  /**
   * Serpent-4bdd26: prepared statement memoized per (library, SQL text).
   * Statements live as long as the connection; the cache entry is dropped
   * when the library closes. Use only for hot per-row queries — one-off
   * DDL/DML stays on plain `.prepare()`.
   */
  public prepareCached<T>(openLibrary: OpenLibrary, sql: string): T {
    const key = `${openLibrary.summary.libraryId}\u0000${sql}`;
    let statement = this.preparedStatementCache.get(key);
    if (statement === undefined) {
      statement = openLibrary.connection.prepare(sql);
      this.preparedStatementCache.set(key, statement);
    }
    return statement as T;
  }

  public dropPreparedStatementCache(libraryId: string): void {
    const prefix = `${libraryId}\u0000`;
    for (const key of this.preparedStatementCache.keys()) {
      if (key.startsWith(prefix)) this.preparedStatementCache.delete(key);
    }
  }

  /**
   * Reject mutations before they can touch the filesystem. Inspection-only
   * handles (openLibraryReadOnly) still set readOnly; Desktop open paths
   * never do. File operations happen before their metadata transaction, so
   * relying on SQLite to reject the later write could leave disk and DB
   * inconsistent.
   */
  public assertLibraryWritable(openLibrary: OpenLibrary): void {
    if (openLibrary.readOnly) throw new LibraryServiceError('LIBRARY_READ_ONLY');
  }

  /**
   * Acquire the durable, per-library writer lease used by Desktop, scripts and
   * MCP. Callers must release the returned handle in a `finally` block.
   * Read-only operations intentionally do not take this lease.
   */
  acquireWriteLease(
    libraryId: string,
    options?: AcquireLibraryWriteLeaseOptions,
  ): Promise<LibraryWriteLease> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return new LibraryWriteCoordinator(openLibrary.writeConnection, libraryId).acquire(options);
  }

  /**
   * Claim a long-running Job with a durable owner/fencing token. The caller
   * must heartbeat while external work is in progress and assert ownership
   * before every persisted state transition.
   */
  acquireJobLease(
    libraryId: string,
    jobId: string,
    options?: AcquireLibraryWriteLeaseOptions,
  ): Promise<LibraryJobLease> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return new LibraryWriteCoordinator(openLibrary.writeConnection, libraryId).claimJob(jobId, options);
  }

  /**
   * Execute a synchronous, metadata-only command inside a real SQLite
   * `BEGIN IMMEDIATE` transaction and an observable per-library lease.
   *
   * The transaction is the fencing boundary: while it is open no second
   * database connection can replace the lease and then interleave a write if
   * this operation outlives its nominal lease duration. File/network/media
   * work must never use this helper; those paths need their own recoverable
   * job phases.
   */
  async runBoundedWrite<T>(
    libraryId: string,
    operation: () => T,
    options?: AcquireLibraryWriteLeaseOptions,
  ): Promise<T> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const coordinator = new LibraryWriteCoordinator(openLibrary.writeConnection, libraryId);
    const lease = await coordinator.acquire(options);
    try {
      this.options.beforeBoundedWriteTransaction?.(libraryId);
      const transaction = openLibrary.connection.transaction(() => {
        // Acquisition happens before BEGIN IMMEDIATE so the caller can wait
        // until its configurable timeout for a live owner to finish. Renew
        // again inside SQLite's writer mutex to prove this owner is still
        // current and to keep the lease alive for the fenced mutation.
        lease.renew();
        return operation();
      });
      return transaction.immediate();
    } catch (error) {
      if (isSQLiteWriteContention(error)) {
        throw new LibraryWriteCoordinatorError(
          'Another Serpent session is updating this library.',
          'timed-out',
        );
      }
      throw error;
    } finally {
      // Release after COMMIT/ROLLBACK. Releasing inside the transaction would
      // make the persisted lease invisible before the database write lock is
      // released, reopening a small cross-process race at the boundary.
      try {
        lease.release();
      } catch (error) {
        // Never let best-effort cleanup replace the operation's public
        // outcome. If a non-cooperating legacy writer grabbed SQLite between
        // COMMIT/ROLLBACK and this DELETE, the persisted expiry remains the
        // crash-recovery fallback; record the precise cause for diagnostics.
        this.diagnose('write-lease.release', error, { libraryId });
      }
    }
  }

  /** Return the durable mutation sequence for cross-process refresh cursors. */
  getChangeSequence(libraryId: string): number {
    const openLibrary = this.requireOpenLibrary(libraryId);
    try {
      return new LibraryWriteCoordinator(openLibrary.writeConnection, libraryId).currentChangeSequence();
    } catch (error) {
      throw serviceError(error, 'LIBRARY_CORRUPT');
    }
  }

  /**
   * Browse-only invalidation fence. Job progress and artifact commits use the
   * broad library sequence, but they must not make an active BrowseSession
   * stale while the user is scrolling through the same ordered scope.
   */
  getBrowseChangeSequence(libraryId: string): number {
    const openLibrary = this.requireOpenLibrary(libraryId);
    try {
      const row = openLibrary.connection
        .prepare(
          'SELECT sequence FROM browse_change_sequence WHERE library_id = ?',
        )
        .get(libraryId) as { sequence: number } | undefined;
      if (!row || !Number.isSafeInteger(row.sequence) || row.sequence < 0) {
        throw new Error('The browse change sequence is missing or invalid.');
      }
      return row.sequence;
    } catch (error) {
      throw serviceError(error, 'LIBRARY_CORRUPT');
    }
  }

  /**
   * Return the durable RAW metadata admission cursor for Worker restart
   * recovery.  Older/leniently opened libraries simply have no state row and
   * fall back to the bounded probe path.
   */
  getRawMetadataBackfillAdmissionState(
    libraryId: string,
  ): RawMetadataBackfillAdmissionState | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    if (!hasRawMetadataBackfillStateSchema(openLibrary.connection)) {
      return null;
    }
    const row = openLibrary.connection
      .prepare(
        `SELECT token, cursor_asset_id, exhausted, updated_at
           FROM raw_metadata_backfill_state
          WHERE library_id = ?`,
      )
      .get(libraryId) as {
        token: string;
        cursor_asset_id: string | null;
        exhausted: number;
        updated_at: string;
      } | undefined;
    if (!row || row.token.length === 0) return null;
    return {
      token: row.token,
      cursorAssetId: row.cursor_asset_id,
      exhausted: row.exhausted === 1,
      updatedAt: row.updated_at,
    };
  }

  public rawMetadataBackfillToken(openLibrary: OpenLibrary): string | null {
    try {
      const browse = openLibrary.connection
        .prepare('SELECT sequence FROM browse_change_sequence WHERE library_id = ?')
        .get(openLibrary.summary.libraryId) as { sequence: number } | undefined;
      if (
        !browse
        || !Number.isSafeInteger(browse.sequence)
        || browse.sequence < 0
      ) return null;
      return String(browse.sequence);
    } catch {
      return null;
    }
  }

  public rawMetadataBackfillPostTokenMatchesOwnWrites(
    beforeToken: string | null,
    afterToken: string,
  ): boolean {
    // Job status/insert writes do not advance browse_change_sequence. An exact
    // equality check therefore accepts our own queue writes while rejecting a
    // concurrent catalog or ignore-rule mutation.
    return beforeToken !== null && beforeToken === afterToken;
  }

  public persistRawMetadataBackfillAdmissionState(
    openLibrary: OpenLibrary,
    state: RawMetadataBackfillAdmissionState,
  ): void {
    if (!hasRawMetadataBackfillStateSchema(openLibrary.connection)) return;
    openLibrary.connection
      .prepare(
        `INSERT INTO raw_metadata_backfill_state
           (library_id, token, cursor_asset_id, exhausted, updated_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(library_id) DO UPDATE SET
           token = excluded.token,
           cursor_asset_id = excluded.cursor_asset_id,
           exhausted = excluded.exhausted,
           updated_at = excluded.updated_at`,
      )
      .run(
        openLibrary.summary.libraryId,
        state.token,
        state.cursorAssetId,
        state.exhausted ? 1 : 0,
        new Date().toISOString(),
      );
  }

  /**
   * Polls the durable sequence from the open library connection so a Worker
   * can observe commits made by another Serpent process. The subscription
   * owns no write lease and must be stopped when the library closes.
   */
  subscribeToChangeSequence(
    libraryId: string,
    onChange: (sequence: number) => void,
    intervalMs = 250,
  ): LibraryChangeSubscription {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return new LibraryWriteCoordinator(openLibrary.writeConnection, libraryId)
      .subscribeToChangeSequence({ intervalMs, onChange });
  }

}

import type { LibraryServiceAllMethods } from "./all-methods";

 
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging, @typescript-eslint/no-empty-object-type
export interface LibraryServiceCore extends LibraryServiceAllMethods {}
