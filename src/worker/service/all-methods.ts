/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { LibraryService } from '../library-service';
import type { ActiveImportTransfer, ArtifactDescriptor, AssetMetadataHistorySnapshot, AssetObserverEvent, AssetRefreshResult, AssetsChangedEvent, BatchRelinkAssetRow, BatchRelinkMatch, CollectionHistorySnapshot, CollectionMembershipHistorySnapshot, ContentReplaceBatchOperationManifest, DatabaseConnection, DiscoveredSourceEntry, EagleCopiedThumbnail, EagleImportedMetadata, ExistingDestination, ExrPlaneDescriptor, ImportFailurePoint, ImportSourceEntry, LibraryRow, LibraryServiceError, LibraryServiceOptions, LinkedTrashOperationManifest, LinkedWatcherChanges, ManagedCopyOperationManifest, ManagedFolderHistorySnapshot, ManagedFolderRow, ManagedFolderTrashOperationManifest, ManagedMoveConflict, ManagedMoveOperationManifest, ManagedRelinkPlacedMarkerV1, ManagedRelinkPlacementIdentity, ManagedRelinkPlacementManifestV3, MediaAutoRepairComponent, MediaExecutionContext, MediaJobKind, MediaJobStatus, ModelThumbnailRenderOutcome, ModelThumbnailRenderer, ModelThumbnailRendererInput, NetworkMetadataSourceState, OpenLibrary, OpenReconciliationTask, OperationHistoryGroupStepInput, OperationHistoryStepRow, OperationHistoryTransitionResult, OperationManifest, OperationRow, PendingImport, PersistedOperationManifest, RecordOperationHistoryInput, RefreshManagedAssetsDiscovery, RefreshManagedAssetsOptions, RestoreOperationManifest, SecondaryMediaJobKind, SmartCollectionHistorySnapshot, SpawnResult, TagHistorySnapshot, TransferCancelState, TrashSelectionResult, VideoProxyProfile, WatchRefreshState } from '../library-service-internals';
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
import type {
  mediaJobCountsFromRows} from '../media-job-status-summary';
import {
  MediaJobStatusSummaryCache,
  mediaJobCountTotal
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
import type {
  parseGitignore} from '../gitignore';
import {
  gitignoreMatchesPath,
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
import type { ImportDestinationDirectoryCache } from '../import-destination-directory-cache';
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
import type {
  ZipImportStreamError} from '../zip-import-stream';
import {
  extractZipStream,
  zipBombProtectionLimits,
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
 * Aggregated method surface of the (split) LibraryService, extracted from
 * the original monolith via the TypeScript AST. Merged into
 * LibraryServiceCore so every domain partial class sees the full `this`
 * surface across the chain.
 */
export interface LibraryServiceAllMethods {
  noteInteractiveActivity(libraryId: string, idleMs?: any): void;
  suppressAutoAnalysisForAssets(libraryId: string, assetIds: readonly string[]): void;
  shouldAutoAnalyzeAsset(libraryId: string, assetId: string): boolean;
  invalidateArtifactPathCache(libraryId: string): void;
  withSyncReplay<T>(fn: () => T): T;
  emitClientAssetsChanged(libraryId: string, changedCount: number): void;
  emitAssetsChanged(libraryId: string, changedCount: number, source: NonNullable<AssetsChangedEvent['source']>): void;
  noteClientFilesystemMutation(): void;
  shouldEmitWatcherAssetChange(): boolean;
  refreshManagedAssetsOnOpen(libraryId: string, task: OpenReconciliationTask, diagnosticScope?: any): Promise<void>;
  refreshLinkedWatcherFileChanges(task: OpenReconciliationTask, pathsByFolder: Map<string, Set<string>>): Promise<{
    changedCount: number;
    inspectedPathCount: number;
    missingCount: number;
  } | null>;
  reconcileMovedLinkedAssets(openLibrary: OpenLibrary, discovery: RefreshManagedAssetsDiscovery, linkedFolderIds?: any): void;
  restoreManagedAssetTimestamps(libraryPath: string): void;
  watchNotifyNow(): number;
  createConsistentDatabaseSnapshot(connection: DatabaseConnection, destinationPath: string, cancelState: TransferCancelState): Promise<void>;
  databaseBackupNow(): number;
  createDatabaseBackupForOpenLibrary(openLibrary: OpenLibrary, reason: 'open' | 'close' | 'destructive' | 'periodic', force?: any): Promise<boolean>;
  armDatabaseBackupTimer(openLibrary: OpenLibrary): void;
  createDatabaseBackup(libraryId: string): Promise<boolean>;
  mediaComponentAvailable(component: MediaAutoRepairComponent): boolean;
  runFfmpeg(command: string, args: string[], options?: {
      timeoutMs?: number;
      signal?: AbortSignal;
      memory?: Omit<MediaNativeMemoryEstimate, 'decoder'>;
    }): Promise<SpawnResult>;
  runOiio(command: string, args: string[], options?: {
      timeoutMs?: number;
      signal?: AbortSignal;
      memory?: Omit<MediaNativeMemoryEstimate, 'decoder'>;
    }): Promise<SpawnResult>;
  diagnose(scope: string, error: unknown, context?: Record<string, unknown>): void;
  availablePhysicalMemoryBytes(): number | undefined;
  reportDiagnostic(scope: string, error: unknown, context?: Record<string, unknown>): void;
  failAt(point: ImportFailurePoint): void;
  startAssetWatcher(openLibrary: OpenLibrary): void;
  networkScanIntervalMs(): number;
  startNetworkScan(libraryId: string): void;
  scheduleNetworkScan(libraryId: string, delayMs: number): void;
  scheduleAssetRefresh(libraryId: string): void;
  scheduleWatcherRefresh(libraryId: string, diagnosticContext: Record<string, unknown>, reason?: 'watcher' | 'network', linkedChanges?: LinkedWatcherChanges): void;
  finishWatcherRefresh(libraryId: string, state: WatchRefreshState): void;
  runWatcherReconciliation(libraryId: string, reason?: 'watcher' | 'network', triggerScope?: string, linkedFolderIds?: string[], linkedFilePathsByFolder?: Map<string, Set<string>>): Promise<void>;
  stopAssetWatcher(libraryId: string): void;
  linkedWatchKey(libraryId: string, folderId: string): string;
  startLinkedWatcher(openLibrary: OpenLibrary, folder: { folder_id: string; absolute_root_path: string }): void;
  scheduleLinkedRefresh(libraryId: string, folderId: string, event?: AssetObserverEvent): void;
  stopLinkedWatcher(libraryId: string, folderId: string): void;
  reconcileLinkedWatchers(openLibrary: OpenLibrary): void;
  stopLinkedWatchers(libraryId: string): void;
  assertSafeOperationsRoot(libraryPath: string): string;
  assertSafeOperationPath(operationPath: string): void;
  removeOperation(operationPath: string): void;
  cancelImportExpiry(pending: PendingImport): void;
  pruneFinalizedImportIds(now?: any): void;
  rememberFinalizedImport(importId: string): void;
  isFinalizedImport(importId: string): boolean;
  updateImportOperation(pending: PendingImport, status: 'failed' | 'rolled_back', errorCode: string): void;
  scheduleImportExpiry(_importId: string, pending: PendingImport): void;
  parkPendingImportSourceFailure(input: {
    importId: string;
    input: Parameters<LibraryService['prepareImport']>[0];
    directories: string[];
    stagedEntries: ImportSourceEntry[];
    remainingEntries: ImportSourceEntry[];
    skipped: SkippedImportSource[];
    failed: SkippedImportSource[];
    operationPath: string;
    stagePath: string;
    skipContentHash: boolean;
    destinationIndex?: Map<string, ExistingDestination>;
    preparingManifest?: OperationManifest;
  }): ImportSourceFailurePlan;
  continueAfterSourceFailure(input: {
    importId: string;
    applyToRest: boolean;
    yieldTransferCheckpoints?: boolean;
  }): ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan;
  continueAfterSourceFailureCancellable(input: {
    importId: string;
    applyToRest: boolean;
  }): Promise<ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan>;
  finishImportWithoutUserDecision(prepared: ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan, decisions: {
      suspectedDuplicate: SuspectedDuplicateDecision;
      nameConflict: NameConflictDecision;
    }): ImportCompletion;
  parseOperationManifest(serialized: string): PersistedOperationManifest;
  recoverLinkedTrashOperation(openLibrary: OpenLibrary, row: OperationRow, manifest: LinkedTrashOperationManifest): void;
  recoverRestoreOperation(openLibrary: OpenLibrary, row: OperationRow, manifest: RestoreOperationManifest, operationPath: string): void;
  moveConflictHoldingPath(openLibrary: OpenLibrary, conflict: ManagedMoveConflict): string;
  recoverManagedMoveOperation(openLibrary: OpenLibrary, row: OperationRow, manifest: ManagedMoveOperationManifest, operationPath: string): void;
  recoverManagedCopyOperation(openLibrary: OpenLibrary, row: OperationRow, manifest: ManagedCopyOperationManifest, operationPath: string): void;
  recoverContentReplaceBatchOperation(openLibrary: OpenLibrary, row: OperationRow, manifest: ContentReplaceBatchOperationManifest, operationPath: string): void;
  recoverFileOperations(openLibrary: OpenLibrary): void;
  recoverManagedFolderTrashOperation(openLibrary: OpenLibrary, row: OperationRow, manifest: ManagedFolderTrashOperationManifest, operationPath: string): void;
  gitignoreMaterializationHasWork(openLibrary: OpenLibrary, rules: ReturnType<typeof parseGitignore>): boolean;
  syncGitignore(openLibrary: OpenLibrary, text?: any): void;
  invalidateNavigationSummary(openLibrary: OpenLibrary): void;
  syncLinkedGitignoreHiddenAssets(openLibrary: OpenLibrary): void;
  migrateLegacyManagedIgnoreRules(openLibrary: OpenLibrary, text: string): string;
  isLibraryOpen(libraryId: string): boolean;
  hasOpenLibrary(libraryId: string): boolean;
  reconcileLinkedWatchersForLibrary(libraryId: string): void;
  requireOpenLibrary(libraryId: string): OpenLibrary;
  sqlitePrimaryIsOpen(openLibrary: OpenLibrary): boolean;
  sqliteConnectionIsRegisteredPrimary(connection: DatabaseConnection | undefined): boolean;
  findLibraryIdOwningSqliteConnection(connection: DatabaseConnection | undefined): string | undefined;
  evictDeadOpenLibrary(libraryId: string, openLibrary: OpenLibrary): void;
  probeCatalogIdentity(canonicalPath: string): string | undefined;
  prepareCached<T>(openLibrary: OpenLibrary, sql: string): T;
  dropPreparedStatementCache(libraryId: string): void;
  assertLibraryWritable(openLibrary: OpenLibrary): void;
  acquireWriteLease(libraryId: string, options?: AcquireLibraryWriteLeaseOptions): Promise<LibraryWriteLease>;
  acquireJobLease(libraryId: string, jobId: string, options?: AcquireLibraryWriteLeaseOptions): Promise<LibraryJobLease>;
  runBoundedWrite<T>(libraryId: string, operation: () => T, options?: AcquireLibraryWriteLeaseOptions): Promise<T>;
  getChangeSequence(libraryId: string): number;
  getBrowseChangeSequence(libraryId: string): number;
  getRawMetadataBackfillAdmissionState(libraryId: string): RawMetadataBackfillAdmissionState | null;
  rawMetadataBackfillToken(openLibrary: OpenLibrary): string | null;
  rawMetadataBackfillPostTokenMatchesOwnWrites(beforeToken: string | null, afterToken: string): boolean;
  persistRawMetadataBackfillAdmissionState(openLibrary: OpenLibrary, state: RawMetadataBackfillAdmissionState): void;
  operationHistoryEntries(openLibrary: OpenLibrary): HistoryStackEntry[];
  getOperationHistoryStatus(libraryId: string): HistoryStatus;
  pruneOperationHistory(openLibrary: OpenLibrary): void;
  recordOperationHistory(input: RecordOperationHistoryInput): HistoryOperationReceipt;
  operationHistoryGroupKey(libraryId: string, source: HistorySource, sourceReference: string): string;
  beginOperationHistoryGroup(input: {
    libraryId: string;
    source: HistorySource;
    sourceReference: string;
  }): HistoryOperationReceipt;
  appendOperationHistoryGroupStep(input: {
    historyEntryId: string;
    input: RecordOperationHistoryInput;
  }): HistoryOperationReceipt;
  recordOperationHistoryGroup(input: Omit<RecordOperationHistoryInput, 'forwardRecipe' | 'inverseRecipe'> & {
    commit?: boolean;
    steps: readonly OperationHistoryGroupStepInput[];
  }): HistoryOperationReceipt;
  completeOperationHistoryGroup(libraryId: string, historyEntryId: string): HistoryOperationReceipt;
  discardOperationHistoryGroup(libraryId: string, historyEntryId: string): void;
  markOperationHistoryGroupStale(libraryId: string, historyEntryId: string, staleCode: string): void;
  recordOperationHistoryBarrier(input: {
    affectedCount: number;
    affectedEntities?: readonly string[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    reason: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt;
  metadataHistorySnapshot(metadata: AssetMetadataResult): AssetMetadataHistorySnapshot;
  assertMetadataHistorySnapshot(value: unknown): AssetMetadataHistorySnapshot;
  metadataHistoryMatches(current: AssetMetadataResult, expected: AssetMetadataHistorySnapshot): boolean;
  applyAssetMetadataHistorySnapshot(openLibrary: OpenLibrary, expected: AssetMetadataHistorySnapshot, restore: AssetMetadataHistorySnapshot): void;
  recordAssetMetadataHistory(input: {
    after: AssetMetadataResult;
    before: AssetMetadataResult;
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt;
  recordAssetMetadataBatchHistory(input: {
    after: AssetMetadataResult[];
    before: AssetMetadataResult[];
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt | null;
  getHumanTagRelations(input: {
    assetIds: readonly string[];
    libraryId: string;
    tagIds: readonly string[];
  }): Array<{ assetId: string; tagId: string }>;
  assertHistoryRelations(value: unknown): Array<{ assetId: string; tagId: string }>;
  applyTagRelations(openLibrary: OpenLibrary, relations: readonly { assetId: string; tagId: string }[], direction: 'add' | 'remove', expectedPresent?: boolean): void;
  recordTagRelationsHistory(input: {
    assetIds: readonly string[];
    changedRelations: readonly { assetId: string; tagId: string }[];
    direction: 'add' | 'remove';
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt | null;
  getCollectionAssetMemberships(input: {
    assetIds: readonly string[];
    collectionId: string;
    libraryId: string;
  }): string[];
  assertCollectionMembershipPrecondition(openLibrary: OpenLibrary, payload: Record<string, unknown>): void;
  recordCollectionMembershipHistory(input: {
    assetIds: readonly string[];
    collectionId: string;
    direction: 'add' | 'remove';
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt | null;
  getManagedFolderHistorySnapshot(input: {
    folderIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): ManagedFolderHistorySnapshot[];
  assertManagedFolderHistorySnapshots(value: unknown): ManagedFolderHistorySnapshot[];
  applyManagedFolderCreateHistorySnapshot(openLibrary: OpenLibrary, snapshot: ManagedFolderHistorySnapshot): void;
  applyManagedFolderDeleteHistorySnapshot(openLibrary: OpenLibrary, snapshots: readonly ManagedFolderHistorySnapshot[]): void;
  recordManagedFolderSnapshotHistory(input: {
    after: readonly ManagedFolderHistorySnapshot[];
    before: readonly ManagedFolderHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt;
  getCollectionHistorySnapshot(input: {
    collectionIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): CollectionHistorySnapshot[];
  getCollectionMembershipHistorySnapshot(input: {
    collectionIds: readonly string[];
    libraryId: string;
  }): CollectionMembershipHistorySnapshot[];
  assertCollectionHistorySnapshots(value: unknown): CollectionHistorySnapshot[];
  assertCollectionMembershipHistorySnapshots(value: unknown): CollectionMembershipHistorySnapshot[];
  collectionHistoryRowsEqual(left: readonly CollectionHistorySnapshot[], right: readonly CollectionHistorySnapshot[]): boolean;
  collectionMembershipHistoryRowsEqual(left: readonly CollectionMembershipHistorySnapshot[], right: readonly CollectionMembershipHistorySnapshot[]): boolean;
  applyCollectionHistorySnapshot(openLibrary: OpenLibrary, expected: readonly CollectionHistorySnapshot[], restore: readonly CollectionHistorySnapshot[], expectedMemberships: readonly CollectionMembershipHistorySnapshot[], restoreMemberships: readonly CollectionMembershipHistorySnapshot[]): void;
  recordCollectionSnapshotHistory(input: {
    after: readonly CollectionHistorySnapshot[];
    before: readonly CollectionHistorySnapshot[];
    afterMemberships?: readonly CollectionMembershipHistorySnapshot[];
    beforeMemberships?: readonly CollectionMembershipHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt;
  getSmartCollectionHistorySnapshot(input: {
    collectionIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): SmartCollectionHistorySnapshot[];
  assertSmartCollectionHistorySnapshots(value: unknown): SmartCollectionHistorySnapshot[];
  applySmartCollectionHistorySnapshot(openLibrary: OpenLibrary, expected: readonly SmartCollectionHistorySnapshot[], restore: readonly SmartCollectionHistorySnapshot[]): void;
  recordSmartCollectionSnapshotHistory(input: {
    after: readonly SmartCollectionHistorySnapshot[];
    before: readonly SmartCollectionHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt;
  getTagHistorySnapshot(input: {
    tagIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): TagHistorySnapshot[];
  assertTagHistorySnapshots(value: unknown): TagHistorySnapshot[];
  applyTagHistorySnapshot(openLibrary: OpenLibrary, expected: readonly TagHistorySnapshot[], restore: readonly TagHistorySnapshot[]): void;
  recordTagSnapshotHistory(input: {
    after: readonly TagHistorySnapshot[];
    before: readonly TagHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt;
  historyRecipeFromRow(row: OperationHistoryStepRow, direction: HistoryDirection): HistoryRecipe;
  historyTransitionErrorCode(error: unknown): string | null;
  historyCounterpartRecipe(recipe: HistoryRecipe, operationId: string, direction: HistoryDirection): HistoryRecipe | null;
  withHistoryReplay<T>(operation: () => T): T;
  executeHistoryRecipe(openLibrary: OpenLibrary, recipe: HistoryRecipe): { affectedCount: number; operationId?: string };
  transitionOperationHistory(libraryId: string, direction: HistoryDirection, expectedHistoryEntryId: string): OperationHistoryTransitionResult;
  transitionOperationHistoryWithLease(input: { libraryId: string; expectedHistoryEntryId: string }, direction: HistoryDirection): Promise<OperationHistoryTransitionResult>;
  undoOperationHistory(input: { libraryId: string; expectedHistoryEntryId: string }): Promise<OperationHistoryTransitionResult>;
  redoOperationHistory(input: { libraryId: string; expectedHistoryEntryId: string }): Promise<OperationHistoryTransitionResult>;
  subscribeToChangeSequence(libraryId: string, onChange: (sequence: number) => void, intervalMs?: any): LibraryChangeSubscription;
  previewAutomationFileOperation(input: {
    libraryId: string;
    operation: 'trash' | 'replace-content' | 'move' | 'rename-file' | 'rename-files' | 'restore-if-original-vacant';
    assetIds: string[];
    newBaseName?: string;
    newFileName?: string;
    renameItems?: Array<{ assetId: string; newBaseName: string }>;
    targetFolderId?: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
  }): {
    libraryId: string;
    operation: 'trash' | 'replace-content' | 'move' | 'rename-file' | 'rename-files' | 'restore-if-original-vacant';
    planHash: string;
    changeSequence: number;
    targetCount: number;
    executableCount: number;
    blockedCount: number;
    conflictCount: number;
    undoSupported: boolean;
    assetStates: Array<{ assetId: string; stateToken: string }>;
  };
  validateAutomationFileOperationPlan(input: {
    libraryId: string;
    operation: 'trash' | 'replace-content' | 'move' | 'rename-file' | 'rename-files' | 'restore-if-original-vacant';
    assetIds: string[];
    newBaseName?: string;
    newFileName?: string;
    renameItems?: Array<{ assetId: string; newBaseName: string }>;
    targetFolderId?: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
    expectedChangeSequence: number;
    planHash: string;
    assetStates: Array<{ assetId: string; stateToken: string }>;
  }): void;
  automationAssetStateToken(row: {
    asset_id: string;
    current_revision_id: string;
    relative_file_path: string;
    deleted_at: string | null;
    availability: 'available' | 'missing';
    location_kind: 'managed' | 'linked';
  }): string;
  folderPath(openLibrary: OpenLibrary, relativePath: string): string;
  linkedRootAvailability(absoluteRootPath: string): | {
        available: true;
        deviceHint: string;
        legacyInodeHint: string;
        legacyHostDeviceHint?: string;
        legacyDeviceHint?: string;
      }
    | { available: false; reason: PublicErrorReason };
  linkedRootIsGone(absoluteRootPath: string): boolean;
  linkedAssetPath(openLibrary: OpenLibrary, linkedFolderId: string | null, relativeFilePath: string): string;
  folderPathAsync(openLibrary: OpenLibrary, relativePath: string): Promise<string>;
  linkedAssetPathAsync(openLibrary: OpenLibrary, linkedFolderId: string | null, relativeFilePath: string): Promise<string>;
  portableDiskDestination(openLibrary: OpenLibrary, relativePath: string, directoryCache?: ImportDestinationDirectoryCache, options?: { validateMissingSegments?: boolean; snapshotFile?: boolean }): ExistingDestination | undefined;
  managedDestinationIndex(openLibrary: OpenLibrary): Map<string, ExistingDestination>;
  lookupImportDestination(openLibrary: OpenLibrary, relativePath: string, index: Map<string, ExistingDestination> | undefined, directoryCache?: ImportDestinationDirectoryCache, options?: { validateMissingSegments?: boolean }): ExistingDestination | undefined;
  assetsPath(openLibrary: OpenLibrary): string;
  targetFolder(openLibrary: OpenLibrary, folderId?: string): ManagedFolderRow | undefined;
  copySourceSnapshot(entry: ImportSourceEntry, stagedPath: string, options?: { bulk?: boolean }): number;
  expandImageSequenceSourcePaths(sourcePaths: readonly string[]): string[];
  probeImageSequenceImportOffer(input: {
    libraryId: string;
    targetFolderId?: string;
    targetCollectionId?: string;
    sourcePaths: string[];
  }): Promise<ImageSequenceImportOffer | null>;
  enumerateImportSources(input: {
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    targetPrefix: string;
    expandImageSequences?: boolean;
    sourcePageUrl?: string;
  }): { directories: string[]; entries: ImportSourceEntry[]; skipped: SkippedImportSource[] };
  persistEagleImportedMetadata(openLibrary: OpenLibrary, assetId: string, metadata: EagleImportedMetadata, now: string, collectionNextPosition?: Map<string, number>): void;
  createManagedFolder(input: {
    libraryId: string;
    name: string;
    parentFolderId?: string;
  }): ManagedFolderSummary;
  renameManagedFolder(input: {
    libraryId: string;
    folderId: string;
    newName: string;
  }): ManagedFolderSummary;
  cloneManagedFolder(input: {
    libraryId: string;
    folderId: string;
  }): {
    folder: ManagedFolderSummary;
    clonedFolderCount: number;
    clonedAssetCount: number;
  };
  moveManagedFolders(input: {
    libraryId: string;
    folderIds: string[];
    targetParentFolderId: string | null;
    conflictStrategy?: 'keep-both' | 'skip';
  }): {
    movedCount: number;
    skippedCount: number;
    folders: ManagedFolderSummary[];
  };
  availableSiblingFolderName(openLibrary: OpenLibrary, parentFolderId: string | null, baseName: string): string;
  trashManagedFolder(input: {
    libraryId: string;
    folderId: string;
    /** Batch trash reserves these ids before execution so an open history
     * group has complete inverse recipes even if the Worker is interrupted. */
    operationId?: string;
    tombstoneIds?: readonly string[];
  }): {
    trashedAssetCount: number;
    removedFolderCount: number;
    tombstoneIds: string[];
    rootTombstoneId: string;
  };
  trashManagedFolderAsync(input: Parameters<LibraryService['trashManagedFolder']>[0]): Promise<ReturnType<LibraryService['trashManagedFolder']>>;
  trashSelectionAsync(input: Parameters<LibraryService['trashSelection']>[0]): Promise<ReturnType<LibraryService['trashSelection']>>;
  deleteManagedFolderFromDisk(input: {
    libraryId: string;
    folderId: string;
  }): { deletedAssetCount: number; removedFolderCount: number };
  deleteManagedFolderFromDiskAsync(input: {
    libraryId: string;
    folderId: string;
  }): Promise<{ deletedAssetCount: number; removedFolderCount: number }>;
  deleteEmptyManagedFolders(input: {
    libraryId: string;
    folderIds: string[];
  }): { deletedFolderIds: string[] };
  removeLinkedFolder(input: {
      libraryId: string;
      folderId: string;
    }, options?: { progress?: 'emit' | 'silent' }): Promise<{ removedAssetCount: number }>;
  deleteLinkedFolderSubtree(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath: string;
    deleteFromDisk: boolean;
  }): Promise<{ deletedAssetCount: number; failedCount: number }>;
  resolveLinkedDirectoryMutationTarget(openLibrary: OpenLibrary, linkedFolderId: string, relativePath: string): {
    linkedFolderId: string;
    relativePath: string;
    absoluteRootPath: string;
    absolutePath: string;
    status: 'available' | 'offline';
  };
  linkedDirectoryMutationSummary(input: {
      linkedFolderId: string;
      relativePath: string;
      name: string;
      status: 'available' | 'offline';
    }): LinkedFolderDirectoryMutation;
  assertLinkedDirectorySiblingAvailable(parentPath: string, name: string, sourceName?: string): string;
  createLinkedFolderDirectory(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath: string;
    name: string;
  }): LinkedFolderDirectoryMutation;
  renameLinkedFolderDirectory(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath: string;
    newName: string;
  }): LinkedFolderDirectoryMutation;
  collectManagedFolderSubtree(openLibrary: OpenLibrary, folderId: string): {
    folder: ManagedFolderRow;
    descendantFolders: ManagedFolderRow[];
    assetIds: string[];
  };
  removeManagedFolderRowsAndDirectory(openLibrary: OpenLibrary, folder: ManagedFolderRow, descendantFolders: ManagedFolderRow[]): number;
  removeManagedFolderRowsAndDirectoryAsync(openLibrary: OpenLibrary, folder: ManagedFolderRow, descendantFolders: ManagedFolderRow[]): Promise<number>;
  deleteActiveManagedAssetsFromDisk(openLibrary: OpenLibrary, assetIds: string[], onFileDeleted?: (processed: number, total: number) => void): number;
  finalizeDiskDeletedAssetRows(openLibrary: OpenLibrary, libraryId: string, assetIds: string[]): void;
  deleteActiveManagedAssetsFromDiskAsync(openLibrary: OpenLibrary, libraryId: string, assetIds: string[], options?: {
      onFileDeleted?: (processed: number, total: number) => void;
      cancelState?: TransferCancelState;
    }): Promise<number>;
  deleteAssetsFromDiskAsync(input: {
    libraryId: string;
    assetIds: string[];
  }): Promise<{ deletedCount: number }>;
  deleteLinkedAssetsInBatches(input: {
    libraryId: string;
    assetIds: string[];
  }): Promise<{
    deletedCount: number;
    failedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  }>;
  deleteActiveManagedAssetsFromDiskWithProgress(libraryId: string, openLibrary: OpenLibrary, assetIds: string[]): Promise<number>;
  listManagedFolders(libraryId: string, showIgnored?: any): ManagedFolderSummary[];
  setEntityAppearance(input: {
    libraryId: string;
    target: EntityAppearanceTarget;
    appearance: {
      glyphKind: 'emoji' | 'icon' | null;
      glyphValue: string | null;
      colorId: string | null;
    } | null;
  }): { target: EntityAppearanceTarget; appearance: EntityAppearance | null };
  setFolderCustomCovers(input: {
    libraryId: string;
    folderIds: readonly string[];
    sourcePath: string;
  }): { folderIds: string[]; hasCustomCover: true };
  setFolderCustomCoverFromAsset(input: {
    libraryId: string;
    folderIds: readonly string[];
    assetId: string;
  }): { folderIds: string[]; hasCustomCover: true };
  clearFolderCustomCovers(input: {
    libraryId: string;
    folderIds: readonly string[];
  }): { folderIds: string[]; hasCustomCover: false };
  resolveFolderCustomCover(input: {
    libraryId: string;
    folderId: string;
  }): { absolutePath: string; mimeType: string } | null;
  assertFolderCoverTarget(openLibrary: OpenLibrary, folderId: string): void;
  scheduleOrphanFolderCoverSweep(openLibrary: OpenLibrary): void;
  sweepOrphanFolderCovers(openLibrary: OpenLibrary): void;
  folderCoverIndexCacheKey(openLibrary: OpenLibrary): string;
  folderCustomCoverRows(openLibrary: OpenLibrary, folderIds?: readonly string[]): Array<{
    folder_key: string;
    relative_name: string;
    updated_at: string;
    cover_asset_id: string | null;
    current_revision_id: string | null;
    deleted_at: string | null;
    relative_file_path: string | null;
    artifact_id: string | null;
  }>;
  coverIndexFromRows(rows: ReturnType<LibraryService['folderCustomCoverRows']>): Map<string, {
    token: string;
    assetId?: string;
    artifactId?: string;
    revisionId?: string;
  }>;
  loadFolderCustomCoverIndex(openLibrary: OpenLibrary, folderIds?: readonly string[]): Map<string, {
    token: string;
    assetId?: string;
    artifactId?: string;
    revisionId?: string;
  }>;
  listFolderNavigationCovers(openLibrary: OpenLibrary): LibraryNavigationSummary['folderCovers'];
  withCustomFolderCovers(openLibrary: OpenLibrary, entries: FolderBrowseEntry[]): FolderBrowseEntry[];
  countNavigationAssets(input: {
    libraryId: string;
    scope: 'all' | 'root' | 'trash';
    showIgnored: boolean;
  }): number;
  getLibraryNavigationSummary(input: {
    libraryId: string;
    showIgnored?: boolean;
    includeTrashedFolders?: boolean;
  }): LibraryNavigationSummary;
  getLibraryNavigationSummaryAsync(input: {
    libraryId: string;
    showIgnored?: boolean;
    includeTrashedFolders?: boolean;
  }): Promise<LibraryNavigationSummary>;
  folderIndexedByteSizes(input: {
    libraryId: string;
    refs: Array<{ locationKind: 'managed' | 'linked'; folderId: string }>;
  }): Array<{ folderId: string; byteSize: number }>;
  managedFolderIndexedByteTotals(openLibrary: OpenLibrary): Map<string, number>;
  filteredFolderCounts(input: {
    libraryId: string;
    filters?: FilterClause[] | null;
    showIgnored?: boolean;
  }): {
    all: number;
    root: number;
    folders: Array<{ folderId: string; count: number }>;
  };
  listFolderBrowseEntries(input: {
    libraryId: string;
    parentFolderId: string | null;
    showIgnored?: boolean;
  }): FolderBrowseEntry[];
  folderEntriesByRefs(input: {
    libraryId: string;
    refs: Array<{ locationKind: 'managed' | 'linked'; folderId: string }>;
  }): FolderBrowseEntry[];
  linkedFolderDisplayName(openLibrary: OpenLibrary, linkedFolderId: string): string;
  listLinkedFolderBrowseEntries(openLibrary: OpenLibrary, input: { parentFolderId: string | null; showIgnored?: boolean }): FolderBrowseEntry[] | null;
  resolveLinkedFolderScope(openLibrary: OpenLibrary, folderId: string): {
    linkedFolderId: string;
    relativePath: string;
    status: 'available' | 'offline';
    absoluteRootPath: string;
  } | null;
  listLinkedAssetRelativePaths(openLibrary: OpenLibrary, linkedFolderId: string, showIgnored: boolean): string[];
  linkedDirectoryCoverArtifactIds(openLibrary: OpenLibrary, linkedFolderId: string, relativePath: string, showIgnored: boolean, childDirs?: string[]): string[];
  linkedDirectoryCoverCandidateAssetIds(openLibrary: OpenLibrary, linkedFolderId: string, relativePath: string, showIgnored: boolean, childDirs?: string[]): string[];
  managedFolderRecursiveAssetCounts(openLibrary: OpenLibrary, folders: Array<{ folder_id: string; relative_path: string }>, showIgnored?: any): Map<string, number>;
  managedFolderCountMaps(openLibrary: OpenLibrary, folderIds?: string[], showIgnored?: any): {
    directAssetCounts: Map<string, number>;
    childFolderCounts: Map<string, number>;
  };
  withSequenceFolderCovers(openLibrary: OpenLibrary, entries: FolderBrowseEntry[]): FolderBrowseEntry[];
  folderCoverArtifactMap(openLibrary: OpenLibrary, folderIds: string[], showIgnored?: any): Map<string, string[]>;
  populateChildFolderCovers(openLibrary: OpenLibrary, parentFolderIds: string[], covers: Map<string, string[]>, showIgnored?: any): void;
  folderCoverCandidateAssetMap(openLibrary: OpenLibrary, folderIds: string[], showIgnored?: any): Map<string, string[]>;
  populateChildFolderCandidateAssets(openLibrary: OpenLibrary, parentFolderIds: string[], candidates: Map<string, string[]>, showIgnored?: any): void;
  summarizeManagedFolderRow(openLibrary: OpenLibrary, row: ManagedFolderRow, counts?: {
      directAssetCounts: Map<string, number>;
      childFolderCounts: Map<string, number>;
    }): ManagedFolderSummary;
  summarizeManagedFolderRowRecursive(openLibrary: OpenLibrary, row: ManagedFolderRow): ManagedFolderSummary;
  collectLinkedDirectoryPrefixesFromDisk(openLibrary: OpenLibrary, linkedFolderId: string, rootPath: string, rules: LinkedFolderRule[], includeGitignoreHidden?: any): string[];
  listLinkedFolders(libraryId: string): LinkedFolderSummary[];
  getLinkedFolderRules(input: { libraryId: string; folderId: string }): LinkedFolderRule[];
  setLinkedFolderRules(input: {
    libraryId: string;
    folderId: string;
    rules: LinkedFolderRule[];
  }): { rules: LinkedFolderRule[]; hiddenCount: number; restoredCount: number };
  copyAssetsToLinkedFolder(input: {
    libraryId: string;
    folderId: string;
    relativePath?: string;
    assetIds: string[];
    conflictStrategy: 'keep-both' | 'replace' | 'skip';
  }): {
    copiedCount: number;
    skippedCount: number;
    assets: AssetSummary[];
    /** 本次实际复制成功的源资产 id（skip 冲突时不包含被跳过的），供 moveAssets 移动后清理源。 */
    copiedSourceAssetIds: string[];
  };
  copyLinkedAssetsToManagedFolder(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId: string | null;
  }): { copiedCount: number; skippedCount: number; assets: AssetSummary[] };
  convertLinkedFolderToManaged(input: {
    libraryId: string;
    folderId: string;
    targetFolderId?: string;
  }): { managedFolderId: string; convertedCount: number; assets: AssetSummary[] };
  insertImageSequence(openLibrary: OpenLibrary, frames: readonly { assetId: string; frameNumber: number }[], fps: number): string;
  cancelHiddenSequenceMemberMediaJobs(openLibrary: OpenLibrary, hiddenAssetIds: readonly string[]): void;
  repairUndisplayablePngThumbnails(openLibrary: OpenLibrary): void;
  cancelQueuedHiddenSequenceMemberJobs(openLibrary: OpenLibrary): void;
  dissolveImageSequencesForAssets(openLibrary: OpenLibrary, assetIds: readonly string[]): void;
  createDetectedImageSequences(openLibrary: OpenLibrary, assetIds: readonly string[], fps?: any): string[];
  imageDimensionsForAsset(openLibrary: OpenLibrary, asset: {
      relative_file_path: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
    }): { width: number; height: number } | null;
  imageDimensionsForAssetAsync(openLibrary: OpenLibrary, asset: {
      relative_file_path: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
    }): Promise<{ width: number; height: number } | null>;
  withImageSequenceSummaries(openLibrary: OpenLibrary, assets: readonly AssetSummary[]): AssetSummary[];
  createImageSequence(input: {
    libraryId: string;
    assetIds: string[];
    fps: number;
  }): AssetSummary;
  dissolveImageSequence(input: {
    libraryId: string;
    sequenceId: string;
  }): string;
  dissolveImageSequences(input: {
    libraryId: string;
    sequenceIds: string[];
  }): { sequenceIds: string[] };
  setImageSequenceFps(input: {
    libraryId: string;
    sequenceId: string;
    fps: number;
  }): { sequenceId: string; fps: number };
  listAssets(input: {
    libraryId: string;
    folderId?: string;
    recursive: boolean;
    showIgnored?: boolean;
    assetIds?: readonly string[];
  }): AssetSummary[];
  listAssetSummariesByIds(openLibrary: OpenLibrary, assetIds: readonly string[]): AssetSummary[];
  importFolderAsLinked(input: {
    libraryId: string;
    sourceRootPath: string;
    displayName?: string;
    /** Serpent-316493: managed folder to hang the linked root under. */
    parentFolderId?: string | null;
    /**
     * Worker RPC passes false so watcher setup runs after the command returns.
     * In-process tests keep the default and still see watchers immediately.
     */
    reconcileWatchers?: boolean;
  }): LinkedFolderSummary;
  relinkMissingFolder(input: {
    libraryId: string;
    folderId: string;
    newRootPath: string;
  }): LinkedFolderSummary;
  createTag(input: { libraryId: string; name: string }): TagSummary;
  listTags(libraryId: string): TagSummary[];
  renameTag(input: { libraryId: string; tagId: string; name: string }): TagSummary;
  deleteTag(input: { libraryId: string; tagId: string }): string;
  deleteTags(input: {
    libraryId: string;
    tagIds: string[];
  }): { deletedTagIds: string[] };
  mergeTags(input: {
    libraryId: string;
    sourceTagIds: string[];
    name: string;
  }): TagSummary;
  getTagCooccurrenceGraph(input: {
    libraryId: string;
    minWeight?: number;
    maxNodes?: number;
    maxEdges?: number;
  }): TagCooccurrenceGraph;
  assignTags(input: {
    libraryId: string;
    assetIds: string[];
    tagIds: string[];
  }): { assignedCount: number; skipped: TagOperationSkip[] };
  removeTags(input: {
    libraryId: string;
    assetIds: string[];
    tagIds: string[];
  }): { removedCount: number; skipped: TagOperationSkip[] };
  partitionKnownAssetIds(connection: DatabaseConnection, assetIds: string[]): { eligibleAssetIds: string[]; skipped: TagOperationSkip[] };
  createCollection(input: {
    libraryId: string;
    parentId?: string;
    name: string;
  }): CollectionSummary;
  listCollections(libraryId: string): CollectionSummary[];
  collectionRecursiveAssetCounts(openLibrary: OpenLibrary): Map<string, number>;
  updateCollection(input: {
    libraryId: string;
    collectionId: string;
    name?: string;
    parentId?: string | null;
    description?: string | null;
    coverAssetId?: string | null;
    position?: number;
  }): CollectionSummary;
  reorderCollections(input: {
    libraryId: string;
    orderedCollectionIds: string[];
  }): string[];
  deleteCollection(input: { libraryId: string; collectionId: string }): string;
  addCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    assetIds: string[];
  }): { collectionId: string };
  removeCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    assetIds: string[];
  }): { collectionId: string };
  reorderCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    orderedAssetIds: string[];
  }): { collectionId: string };
  listCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    recursive: boolean;
  }): AssetSummary[];
  listAssetCollectionMemberships(input: {
    libraryId: string;
    assetIds: string[];
  }): Array<{ assetId: string; collectionId: string }>;
  resolvedPaletteFields(openLibrary: OpenLibrary, assetId: string): Pick<AssetMetadataResult, 'automaticPalette' | 'effectivePalette' | 'paletteSource'>;
  aggregateRecentAssetPalette(input: {
    libraryId: string;
    days: number;
    limit: number;
  }): {
    days: number;
    assetCount: number;
    paletteAssetCount: number;
    colors: Array<{ hex: string; weight: number; assetCount: number }>;
  };
  setAssetColorSpaceOverride(input: {
    libraryId: string;
    assetId: string;
    colorSpace: string | null;
  }): { assetId: string; colorSpaceOverride: string | null };
  getAssetMetadata(input: { libraryId: string; assetId: string }): AssetMetadataResult;
  getExtractedMetadata(input: {
    libraryId: string;
    assetId: string;
  }): ExtractedMetadataResult;
  fetchAssetTags(connection: DatabaseConnection, assetId: string): Array<{ id: string; name: string; source: 'user' | 'ai' }>;
  setAssetMetadata(input: {
    libraryId: string;
    assetId: string;
    expectedVersion: number;
    description?: string;
    rating?: number;
    favorite?: boolean;
    palette?: string[];
    sourcePageUrl?: string;
    author?: string;
  }): AssetMetadataResult;
  setAssetsMetadata(input: {
    libraryId: string;
    items: Array<{
      assetId: string;
      expectedVersion: number;
      description?: string;
      rating?: number;
      favorite?: boolean;
      palette?: string[];
      sourcePageUrl?: string;
      author?: string;
    }>;
  }): AssetMetadataResult[];
  backfillAssetMetadata(libraryId: string): { backfilledCount: number };
  backfillAuthorFromExif(openLibrary: OpenLibrary, assetId: string, absoluteFilePath: string): Promise<void>;
  setAssetsRating(input: {
    libraryId: string;
    assetIds: string[];
    rating: number;
  }): { updatedCount: number; skipped: TagOperationSkip[] };
  syncAssetSearchContent(connection: DatabaseConnection, assetId: string, embeddedMetadataText?: string, embeddedMetadataRevisionId?: string): void;
  resolveAssetFilePath(libraryId: string, assetId: string): {
    filePath: string;
    mime: string;
    isVideo: boolean;
  };
  listTagNames(libraryId: string): string[];
  listTagNamesForAiPrompt(libraryId: string, folderId: string | null | undefined, limit?: any): string[];
  hasHumanDescription(libraryId: string, assetId: string): boolean;
  getAssetManagedFolderId(libraryId: string, assetId: string): string | null;
  getAssetDisplayName(libraryId: string, assetId: string): string;
  getPluginMediaProviderAsset(libraryId: string, assetId: string): Pick<AssetSummary, 'assetId' | 'displayName' | 'relativeFilePath' | 'currentRevisionId'> | undefined;
  writeAiAnalysisResult(input: {
    libraryId: string;
    assetId: string;
    description?: string;
    tags?: string[];
    /** Aesthetic score 1–5 as string or number; AI layer only. */
    rating?: number | string | null;
    modelId: string;
    modelVersion: string;
    guardJobId?: string;
    enabledFields: {
      description: boolean;
      tags: boolean;
      rating: boolean;
    };
  }): { tagsWritten: string[]; fieldsWritten: string[]; committed: boolean };
  getAiContent(libraryId: string, assetId: string): Array<{
    fieldName: string;
    value: string;
    modelId: string;
    modelVersion: string;
    generatedAt: string;
  }>;
  listAiTagNames(libraryId: string, assetId: string): string[];
  getAiTagModelVersion(libraryId: string, assetId: string): string | null;
  clearAiContent(input: {
    libraryId: string;
    scope: {
      kind: 'asset' | 'selection' | 'folder' | 'library';
      assetIds?: string[];
      folderId?: string;
    };
    confirm: boolean;
    /** Omit to clear every AI layer; otherwise only the listed layers. */
    fields?: Array<'description' | 'rating' | 'tags'>;
  }): { clearedCount: number; affectedAssetIds: string[] };
  pendingAiAssets(input: {
    libraryId: string;
    assetIds: string[];
  }): string[];
  enqueueAiAnalysisJobs(input: {
    libraryId: string;
    assetIds?: string[];
    folderId?: string;
    resumePaused?: boolean;
    forceExisting?: boolean;
  }): {
    enqueued: number;
    jobIds: string[];
    alreadyPendingJobIds: string[];
    skippedAssetIds: string[];
  };
  claimNextAiJob(libraryId: string, excludedJobIds?: string[]): {
    jobId: string;
    assetId: string;
    kind: 'ai.image.analysis' | 'ai.video.analysis';
    attemptCount: number;
  } | null;
  completeAiJob(libraryId: string, jobId: string): void;
  getAiJobState(libraryId: string, jobId: string): string | null;
  failAiJob(libraryId: string, jobId: string, failure: {
      errorCode: string;
      retryable: boolean;
      maxAttempts?: number;
      /** Redacted user/developer-facing detail (Serpent-iokf). */
      errorDetail?: string | null;
    }): { status: 'queued' | 'failed' };
  recoverInterruptedAiJobs(openLibrary: OpenLibrary): void;
  recoverInterruptedThumbnailJobs(openLibrary: OpenLibrary): void;
  retireLegacyGifProxyJobs(openLibrary: OpenLibrary): void;
  pauseJobs(libraryId: string, jobIds?: string[]): { pausedCount: number };
  resumeJobs(libraryId: string, jobIds?: string[]): { resumedCount: number };
  cancelJobs(libraryId: string, jobIds?: string[]): { cancelledCount: number };
  retryJobs(libraryId: string, jobIds: string[]): { retriedCount: number };
  getAiJobStatus(libraryId: string, jobIds?: string[]): {
    queued: number;
    running: number;
    succeeded: number;
    failed: number;
    paused: number;
    cancelled: number;
    jobs: Array<{
      jobId: string;
      assetId: string;
      assetName: string | null;
      kind: 'ai.image.analysis' | 'ai.video.analysis';
      status: 'queued' | 'running' | 'paused' | 'succeeded' | 'failed' | 'cancelled';
      errorCode: string | null;
      errorDetail: string | null;
      updatedAt: string;
    }>;
  };
  enqueuePluginJob(input: {
    libraryId: string;
    ownerPluginId: string;
    ownerPackageHash: string;
    ownerPluginInstanceId: string;
    ownerScope: 'library' | 'global';
    ownerLibraryId: string;
    pluginHandlerId: string;
    payload?: Record<string, unknown>;
    recoveryStrategy: PluginJobRecoveryStrategy;
    priority?: number;
  }): PluginJobRecord;
  listPluginJobs(libraryId: string): PluginJobRecord[];
  claimNextPluginJob(input: {
    libraryId: string;
    ownerPluginId: string;
    ownerPackageHash: string;
    ownerPluginInstanceId: string;
    ownerScope: 'library' | 'global';
    ownerLibraryId: string;
  }): PluginJobRecord | null;
  completePluginJob(input: {
    libraryId: string;
    jobId: string;
    ownerPluginId: string;
    ownerPackageHash: string;
    ownerPluginInstanceId: string;
    ownerScope: 'library' | 'global';
    ownerLibraryId: string;
    status: 'succeeded' | 'failed' | 'cancelled';
    errorCode?: string;
    errorDetail?: string;
    progress?: number;
    completed?: number;
    total?: number;
    phase?: string;
    message?: string;
    itemResults?: PluginJobItemResult[];
    failedAssetIds?: string[];
    retryInput?: Record<string, unknown>;
    checkpoint?: PluginJobCheckpoint;
  }): PluginJobRecord | null;
  controlPluginJob(input: {
    libraryId: string;
    jobId: string;
    action: 'cancel' | 'pause' | 'resume' | 'retry';
    ownerPluginId: string;
    ownerPackageHash: string;
    ownerPluginInstanceId: string;
    ownerScope: 'library' | 'global';
    ownerLibraryId: string;
    reason?: string;
    retryInput?: Record<string, unknown>;
    capabilities?: PluginJobHandlerCapabilities;
    checkpoint?: PluginJobCheckpoint;
  }): PluginJobRecord | null;
  reportPluginJobProgress(input: {
    libraryId: string;
    jobId: string;
    ownerPluginId: string;
    ownerPackageHash: string;
    ownerPluginInstanceId: string;
    ownerScope: 'library' | 'global';
    ownerLibraryId: string;
    completed: number;
    total: number;
    phase: string;
    message: string;
    progress?: number;
  }): PluginJobRecord | null;
  pausePluginJobsForOwners(input: {
    libraryId: string;
    owners: ReadonlyArray<{ pluginId: string; packageHash?: string }>;
    errorCode?: string;
    errorDetail?: string;
  }): number;
  materializePluginDerivedFields(input: {
    libraryId: string;
    pluginId: string;
    packageHash: string;
    fieldId: string;
    fieldType: PluginProviderFieldType;
    values: ReadonlyArray<{ assetId: string; value: string | number | boolean | null }>;
  }): { writtenCount: number; fieldKey: string };
  queryPluginDerivedFields(input: {
    libraryId: string;
    pluginId: string;
    packageHash: string;
    fieldId: string;
    operator: 'equals' | 'contains' | 'gt' | 'gte' | 'lt' | 'lte';
    value: string | number | boolean | null;
    limit?: number;
    offset?: number;
  }): { assetIds: string[]; total: number };
  mediaJobSummaryToken(openLibrary: OpenLibrary): string | null;
  hasMediaJobStatusCountsTable(openLibrary: OpenLibrary): boolean;
  readMediaJobStatusCountsTable(openLibrary: OpenLibrary): ReturnType<typeof mediaJobCountsFromRows>;
  hasQueuedPrimaryPreviewJobs(libraryId: string): boolean;
  listMediaJobs(libraryId: string, options?: {
    summaryOnly?: boolean;
    cursor?: MediaJobListCursor;
    limit?: number;
  }): {
    queued: number;
    running: number;
    succeeded: number;
    failed: number;
    paused: number;
    cancelled: number;
    nextCursor: MediaJobListCursor | null;
    hasMore: boolean;
    jobs: Array<{
      jobId: string;
      assetId: string;
      assetName: string | null;
      revisionId: string | null;
      kind: MediaJobKind;
      status: MediaJobStatus;
      progress: number;
      attemptCount: number;
      errorCode: string | null;
      errorDetail: string | null;
      createdAt: string;
      updatedAt: string;
    }>;
  };
  pauseMediaJobs(libraryId: string, jobIds?: string[]): { pausedCount: number };
  resumeMediaJobs(libraryId: string, jobIds?: string[]): { resumedCount: number };
  cancelMediaJobs(libraryId: string, jobIds?: string[]): { cancelledCount: number };
  retryMediaJobs(libraryId: string, jobIds: string[]): { retriedCount: number };
  updateMediaJobStatus(libraryId: string, fromStatuses: string[], toStatus: 'paused' | 'queued' | 'cancelled', jobIds?: string[]): number;
  abortActiveMediaJobs(libraryId: string, jobIds?: string[]): void;
  interruptThumbnailJobsOutsideViewport(libraryId: string, assetIds: readonly string[]): { interruptedCount: number };
  cancelMediaJobsForAssets(openLibrary: OpenLibrary, assetIds: readonly string[]): Promise<void>;
  drainLibraryMedia(libraryId: string, timeoutMs?: number): Promise<void>;
  mediaJobState(libraryId: string, jobId: string): string | null;
  mediaArtifactSnapshot(openLibrary: OpenLibrary, revisionId: string): Set<string>;
  discardLateMediaArtifacts(openLibrary: OpenLibrary, revisionId: string, previousArtifactIds: Set<string>, context: {
      libraryId: string;
      jobId: string;
      assetId: string;
      /** The job may have committed an atomic replacement before cancellation. */
      preserveLateArtifacts?: boolean;
    }): void;
  rotateImageContent(libraryId: string, assetId: string, direction: 'clockwise' | 'counter-clockwise'): Promise<{ baked: true; revisionId: string } | { baked: false }>;
  assetBelongsToImageSequence(openLibrary: OpenLibrary, assetId: string): boolean;
  resolveAssetPath(libraryId: string, assetId: string): string;
  resolveAssetIdsByAbsolutePaths(libraryId: string, sourcePaths: readonly string[]): string[];
  resolveFolderPath(libraryId: string, folderId: string): string;
  artifactsDir(openLibrary: OpenLibrary): string;
  detectMediaType(filenameOrMime: string): 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other';
  toSummaryMediaType(detected: ReturnType<typeof LibraryService.detectMediaType>): 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other';
  setPluginThumbnailExtensions(libraryId: string, extensions: readonly string[]): void;
  claimsPluginThumbnail(libraryId: string, relativePath: string): boolean;
  thumbnailEligible(libraryId: string, relativePath: string): boolean;
  supportsThumbnail(filename: string): boolean;
  filterVisibleThumbnailAssetIds(libraryId: string, assetIds: readonly string[]): string[];
  generateThumbnail(input: {
    libraryId: string;
    assetId: string;
  }, execution?: MediaExecutionContext): Promise<{ artifactId: string } | null>;
  processModelThumbnailJob(openLibrary: OpenLibrary, input: {
      libraryId: string;
      assetId: string;
      revisionId: string;
      relativeFilePath: string;
      byteSize: number | null;
    }, options: { renderer?: ModelThumbnailRenderer; signal: AbortSignal }): Promise<{ artifactId: string } | null>;
  renderModelViewsSheet(input: { libraryId: string; assetId: string }, signal: AbortSignal, options?: {
      modelAiViewsRenderer?: (
        input: ModelThumbnailRendererInput,
      ) => Promise<ModelThumbnailRenderOutcome>;
    }): Promise<{ pngBytes: Uint8Array; mime: string }>;
  writeModelThumbnailArtifact(openLibrary: OpenLibrary, input: { libraryId: string; assetId: string; revisionId: string }, frame: { pngBytes: Uint8Array; width: number; height: number }, generatorVersion?: string): { artifactId: string };
  writeModelThumbnailFailure(openLibrary: OpenLibrary, revisionId: string, errorCode: string, generatorVersion?: string): void;
  isModelAsset(libraryId: string, assetId: string): boolean;
  generatePdfThumbnail(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, execution: MediaExecutionContext): Promise<{ artifactId: string }>;
  readAssetFontMetadata(assetPath: string): FontMetadata | null;
  generateHtmlThumbnail(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, execution: MediaExecutionContext, renderer: NonNullable<LibraryServiceOptions['documentThumbnailRenderer']>, options?: {
      readonly sample?: 'font';
      readonly generatorVersion?: string;
      readonly fontMetadata?: FontMetadata | null;
    }): Promise<{ artifactId: string } | null>;
  normalizeImportedThumbnailArtifact(openLibrary: OpenLibrary, input: { assetId: string; revisionId: string }, execution: MediaExecutionContext): Promise<{ artifactId: string } | null>;
  generateImageThumbnail(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, execution: MediaExecutionContext): Promise<{ artifactId: string }>;
  tryGenerateTruncatedJpegThumbnail(input: {
    openLibrary: OpenLibrary;
    assetPath: string;
    revisionId: string;
    artifactId: string;
    artifactRelPath: string;
    artifactAbsPath: string;
    execution: MediaExecutionContext;
    input: { libraryId: string; assetId: string };
  }): Promise<boolean>;
  backfillMissingImageDimensions(libraryId: string, limit?: any): Array<{
    assetId: string;
    width: number;
    height: number;
    revisionId: string;
    previewKind: 'source' | null;
    previewRevisionId: string | null;
  }>;
  persistVisibleWindowImageDimensions(libraryId: string, assetIds: string[]): Array<{
    assetId: string;
    width: number;
    height: number;
    revisionId: string;
    previewKind: 'source' | null;
    previewRevisionId: string | null;
  }>;
  persistVisibleWindowImageDimensionsAsync(libraryId: string, assetIds: string[], signal?: AbortSignal): Promise<Array<{
    assetId: string;
    width: number;
    height: number;
    revisionId: string;
    previewKind: 'source' | null;
    previewRevisionId: string | null;
  }>>;
  persistSourceImageDimensionsForAssets(openLibrary: OpenLibrary, assetIds: string[]): void;
  ensureAssetSyncId(openLibrary: OpenLibrary, assetId: string): string;
  readAssetSyncId(openLibrary: OpenLibrary, assetId: string): string | null;
  assetRowBySyncId(openLibrary: OpenLibrary, syncId: string): any;
  syncSnapshot(libraryId: string): {
    library: { libraryId: string; displayName: string };
    assets: Array<{
      syncId: string;
      assetId: string;
      relativePath: string;
      contentHash: string;
      size: number;
      modifiedAt: string;
      metadata?: SyncAssetMetadata;
    }>;
    missingAssets: Array<{ syncId: string; relativePath: string }>;
  };
  importManagedFileForSync(openLibrary: OpenLibrary, libraryId: string, relativePath: string, body: Buffer): string;
  bindSyncIdAndRelocate(libraryId: string, assetId: string, syncId: string, relativePath: string): void;
  applySyncContentUpdate(libraryId: string, syncId: string, relativePath: string, body: Buffer): { assetId: string; created: boolean };
  applySyncRelocate(libraryId: string, syncId: string, relativePath: string): void;
  pruneEmptyManagedFoldersAfterSyncRelocate(openLibrary: OpenLibrary, folderId: string | null): void;
  ensureManagedFolderIdForRelativeDir(openLibrary: OpenLibrary, libraryId: string, relativeDir: string): string;
  applySyncRecycle(libraryId: string, syncId: string): void;
  applySyncConflictCopy(libraryId: string, relativePath: string, body: Buffer, conflictName: string): { syncId: string; contentHash: string; size: number };
  readSyncAssetMetadata(libraryId: string, syncId: string): SyncAssetMetadata;
  applySyncAssetMetadata(libraryId: string, syncId: string, metadata: SyncAssetMetadata): void;
  findOrCreateTagByName(openLibrary: OpenLibrary, name: string): TagSummary;
  readSyncAssetMetadataMap(openLibrary: OpenLibrary, assetIds: readonly string[]): Map<string, SyncAssetMetadata>;
  attachSyncAiLayer(openLibrary: OpenLibrary, assetIds: readonly string[], map: Map<string, SyncAssetMetadata>): void;
  readSyncAssetContent(libraryId: string, syncId: string): Buffer | null;
  readSyncManifestCache(libraryId: string): string | null;
  beginSyncSession(libraryId: string): string;
  finishSyncSession(libraryId: string, sessionId: string, status: 'done' | 'failed' | 'cancelled', errorMessage?: string): void;
  listSyncCardStatuses(libraryId: string, assetIds: readonly string[]): Array<{ assetId: string; status: 'pending' | 'conflict' }>;
  writeSyncManifestCache(libraryId: string, manifestJson: string): void;
  libraryDisplayName(libraryId: string): string;
  persistSourceImageDimensions(openLibrary: OpenLibrary, revisionId: string, asset: {
      relative_file_path: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
    }): { width: number; height: number } | null;
  persistExtractedImageDimensions(openLibrary: OpenLibrary, revisionId: string, size: { width: number; height: number }): void;
  persistGifExtractedMetadata(openLibrary: OpenLibrary, revisionId: string, metadata: GifExtractedMetadata): void;
  setAudioPreviewPrefersCover(libraryId: string, preferCover: boolean): number;
  generateAudioArtifacts(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, execution: MediaExecutionContext): Promise<{ artifactId: string }>;
  generateAudioAlbumCoverThumbnail(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, ffmpegPath: string, artifactsDir: string, execution: MediaExecutionContext): Promise<string | null>;
  generateAudioWaveformPng(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, ffmpegPath: string, artifactsDir: string, execution: MediaExecutionContext, options: {
      kind: 'thumbnail' | 'video_poster';
      width: number;
      height: number;
      flattenBackground: { r: number; g: number; b: number };
      forcedWaveform?: boolean;
    }): Promise<string>;
  generateVideoArtifacts(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, execution: MediaExecutionContext, includeMetadata: boolean): Promise<{ artifactId: string }>;
  enqueueVideoMetadataJob(openLibrary: OpenLibrary, assetId: string, revisionId: string, priority: number): void;
  requeueRawImageMetadataJobs(openLibrary: OpenLibrary, options: { assetIds?: readonly string[]; limit: number; extensions?: 'raw' | 'embedded' }): { admitted: number; probed: number };
  requeueRawImageMetadataBackfillRetries(libraryId: string, limit?: any): number;
  requeueNonPositiveExtractedImageDimensions(openLibrary: OpenLibrary, options: {
      assetIds: readonly string[];
      extension: { sql: string; params: readonly string[] };
      limit: number;
    }): void;
  enqueueRawImageMetadataJobs(openLibrary: OpenLibrary, options?: {
      assetIds?: readonly string[];
      limit?: number;
      /** The same durable job kind serves RAW and common image containers. */
      extensions?: 'raw' | 'embedded';
    }): RawMetadataBackfillProbeOutcome;
  enqueueRawImageMetadataBackfill(libraryId: string, limit?: any): RawMetadataBackfillProbeOutcome;
  rawImageMetadataRetryDelayMs(libraryId: string): number | null;
  enqueuePaletteJob(openLibrary: OpenLibrary, assetId: string, revisionId: string, priority: number): boolean;
  isPaletteEligibleAsset(openLibrary: OpenLibrary, assetId: string, revisionId: string): boolean;
  generateQueuedPaletteArtifact(libraryId: string, assetId: string, queuedRevisionId: string, execution: MediaExecutionContext): Promise<boolean>;
  filterIgnoredAssetIds(libraryId: string, assetIds: readonly string[]): string[];
  ensureVideoContactSheet(libraryId: string, assetId: string, execution?: MediaExecutionContext): Promise<boolean>;
  generateQueuedVideoArtifact(libraryId: string, assetId: string, queuedRevisionId: string, kind: 'generate_contact_sheet' | 'generate_webm_proxy', execution: MediaExecutionContext): Promise<boolean>;
  generateQueuedVideoMetadata(libraryId: string, assetId: string, queuedRevisionId: string, execution: MediaExecutionContext): Promise<boolean>;
  generateQueuedRawImageMetadata(libraryId: string, assetId: string, queuedRevisionId: string, execution: MediaExecutionContext): Promise<boolean>;
  generateQueuedAudioProxy(libraryId: string, assetId: string, queuedRevisionId: string, execution: MediaExecutionContext): Promise<boolean>;
  probeVideoAsset(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, ffprobePath: string, execution: MediaExecutionContext): Promise<{
    durationSec: number;
    width: number | null;
    height: number | null;
    hasAttachedPicture: boolean;
  }>;
  probeVideoDurationSeconds(ffprobePath: string, assetPath: string, execution: MediaExecutionContext): Promise<number | null>;
  generateVideoPoster(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, ffmpegPath: string, ffprobePath: string, artifactsDir: string, execution: MediaExecutionContext, knownDurationSec: number | null): Promise<string>;
  generateContactSheet(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, ffmpegPath: string, artifactsDir: string, durationSec: number, dimensions: { width: number; height: number }, ffprobePath: string, execution: MediaExecutionContext): Promise<string>;
  countVideoKeyframes(ffprobePath: string, assetPath: string, execution: MediaExecutionContext): Promise<number | null>;
  h264VideoProxyProfile(encoder: string): VideoProxyProfile;
  probeVideoProxyEncoder(ffmpegPath: string, execution: MediaExecutionContext): Promise<string | null>;
  resolveVideoProxyProfiles(ffmpegPath: string, execution: MediaExecutionContext): Promise<VideoProxyProfile[]>;
  generateVideoProxy(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, ffmpegPath: string, artifactsDir: string, execution: MediaExecutionContext): Promise<string>;
  generateAudioProxy(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, ffmpegPath: string, artifactsDir: string, execution: MediaExecutionContext): Promise<string>;
  tryGenerateRawEmbeddedThumbnail(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, execution: MediaExecutionContext): Promise<{ artifactId: string } | null>;
  generateOiiOThumbnail(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, options?: {
      exposureStops?: number;
      inputColorSpace?: string;
      subimage?: number;
      artifactKind?: 'thumbnail' | 'viewer_image';
    }, execution?: MediaExecutionContext): Promise<{ artifactId: string }>;
  persistRawImageMetadata(openLibrary: OpenLibrary, assetId: string, revisionId: string, assetPath: string, metadata: RawImageMetadata, knownDimensions?: { width?: number | null; height?: number | null }): Promise<boolean>;
  writeFailedArtifact(openLibrary: OpenLibrary, artifactId: string, revisionId: string, kind: string, mimeType: string, filePath: string, generatorVersion: string, error: unknown): void;
  getThumbnailArtifact(libraryId: string, assetId: string): {
    artifactId: string;
    filePath: string;
    width: number | null;
    height: number | null;
  } | null;
  getSemanticAssetSources(libraryId: string, assetIds: readonly string[]): Array<{
    assetId: string;
    currentRevisionId: string;
    relativeFilePath: string;
    displayName: string;
    mediaType: AssetSummary['mediaType'];
    availability: AssetSummary['availability'];
    deletedAt: string | null;
    thumbnailStatus: 'ready' | null;
    thumbnailArtifactId: string | null;
    sequence: boolean;
  }>;
  writePluginMediaArtifact(input: {
    libraryId: string;
    assetId: string;
    mimeType: string;
    bytesBase64: string;
    providerId?: string;
  }): Promise<{ artifactId: string }>;
  writeDerivedArtifact(input: {
    libraryId: string;
    assetId: string;
    kind: string;
    mimeType: string;
    bytes: Uint8Array;
    generatorVersion: string;
  }): { artifactId: string; filePath: string };
  getCurrentArtifact(libraryId: string, assetId: string, kind: string, options?: { expectedGeneratorVersion?: string }): ArtifactDescriptor | null;
  getArtifactDescriptorCacheMetrics(): ArtifactDescriptorCacheMetrics;
  resetArtifactDescriptorCacheMetrics(): void;
  ensureOiiOViewerImage(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string, options?: { inputColorSpace?: string; subimage?: number }): Promise<void>;
  ensureRawViewerImage(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string): Promise<void>;
  generateIcoViewerImage(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string): Promise<{ artifactId: string }>;
  ensureIcoViewerImage(input: { libraryId: string; assetId: string }, openLibrary: OpenLibrary, assetPath: string, revisionId: string): Promise<void>;
  getImageColorSpace(revisionId: string, assetPath: string, decoder: 'sharp' | 'oiio'): Promise<ImageColorSpaceInfo>;
  getColorSpaceOverride(connection: DatabaseConnection, assetId: string): string | null;
  getExrPlanes(revisionId: string, assetPath: string): Promise<ExrPlaneDescriptor[]>;
  resolvePreviewArtifact(libraryId: string, assetId: string, requestedExrPlane?: number, requestedColorSpace?: string, intent?: 'viewer' | 'hover' | 'proxy-fallback'): Promise<ReturnType<LibraryService['getPreviewArtifact']> & {
    exrPlanes?: ExrPlaneDescriptor[];
    selectedExrPlane?: number;
    colorSpace?: ImageColorSpaceInfo & { options: ImageColorSpaceOption[] };
    colorSpacePending?: boolean;
  }>;
  getPreviewArtifact(libraryId: string, assetId: string, intent?: 'viewer' | 'hover' | 'proxy-fallback'): {
    mediaType: 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other';
    status: 'ready' | 'pending' | 'failed' | 'missing';
    kind: 'thumbnail' | 'webm_proxy' | 'audio_proxy';
    artifactId?: string;
    mimeType: string;
    errorCode?: string;
    posterArtifactId?: string;
    playbackMode?: 'source' | 'proxy';
    sourceRevisionId?: string;
    sourceMimeType?: string;
    sourceContainer?: 'mp4' | 'mov' | 'webm';
    sourceCodecs?: string[];
  };
  resolveModelCompanions(input: {
    libraryId: string;
    assetId: string;
  }): ModelCompanionAsset[];
  enqueueArtifactRetry(input: {
    libraryId: string;
    assetId: string;
    kind: 'thumbnail' | 'webm_proxy' | 'audio_proxy';
  }): string;
  getArtifactAbsolutePath(libraryId: string, artifactId: string, usage?: 'preview' | 'proxy'): string;
  getArtifactAbsolutePaths(libraryId: string, artifactIds: readonly string[], usage: 'preview' | 'proxy'): Array<{ artifactId: string; absolutePath: string }>;
  assertArtifactUsage(kind: string, usage?: 'preview' | 'proxy'): void;
  validateCachedArtifactPath(openLibrary: OpenLibrary, absolutePath: string): void;
  artifactFilePathFromRow(openLibrary: OpenLibrary, relativeFilePath: string): string;
  artifactRootPath(openLibrary: OpenLibrary): string;
  artifactFilePathFromRoot(artifactsRoot: string, relativeFilePath: string): string;
  resolveAssetDragInfos(libraryId: string, assetIds: readonly string[]): Array<{
    assetId: string;
    absolutePath: string;
    thumbnailAbsolutePath?: string;
  }>;
  getCurrentMediaSource(libraryId: string, assetId: string, revisionId: string): { absolutePath: string; mimeType: string };
  getCurrentVideoSource(libraryId: string, assetId: string, revisionId: string): { absolutePath: string; mimeType: string };
  enqueueReadyPaletteJobs(openLibrary: OpenLibrary, options: { assetIds?: string[]; limit?: number; priority?: number }): number;
  reconcileMissingArtifactFiles(openLibrary: OpenLibrary, yieldTurn?: () => Promise<void>, onMissingPrimaryArtifacts?: (assetIds: string[]) => void): Promise<number>;
  reconcileOrphanArtifactFiles(openLibrary: OpenLibrary, yieldTurn?: () => Promise<void>): Promise<number>;
  emitNetworkMetadataCacheEvent(event: NetworkMetadataCacheEvent): void;
  networkMetadataBrowseChangeSequence(connection: DatabaseConnection, libraryId: string): number;
  networkMetadataSourceState(connection: DatabaseConnection, libraryId: string, sourceDatabasePath: string): NetworkMetadataSourceState | undefined;
  validateNetworkMetadataSnapshot(connection: DatabaseConnection, libraryId: string, expectedSchemaVersion: number): void;
  createNetworkMetadataReadThrough(input: {
    connection: DatabaseConnection;
    canonicalPath: string;
    libraryId: string;
    startServices: boolean;
    primarySchemaVersion: number;
    expectedSourceChangeSequence?: number;
  }): {
    connection: DatabaseConnection;
    writeConnection: DatabaseConnection;
    state?: OpenLibrary['networkMetadataCache'];
  };
  refreshNetworkMetadataCache(openLibrary: OpenLibrary, task: OpenReconciliationTask, reason: 'open' | 'network'): Promise<void>;
  rebindCurrentNetworkMetadataCache(openLibrary: OpenLibrary): void;
  openCachedNetworkMetadataSnapshot(selectedLibraryPath: string): InternalLibrarySummary | undefined;
  runOpenBackgroundReconciliation(libraryId: string, options?: {
      admissionYield?: () => Promise<void>;
      /** Queue only primary previews invalidated by the bounded artifact scan. */
      onMissingPrimaryArtifacts?: (assetIds: string[]) => void;
    }): Promise<void>;
  cancelOpenBackgroundReconciliation(libraryId: string): void;
  cancelReconciliationForClientMutation(libraryId: string): void;
  warmBrowseIndexCache(openLibrary: OpenLibrary, task: OpenReconciliationTask): Promise<void>;
  availableAutoRepairComponents(openLibrary: OpenLibrary): Set<MediaAutoRepairComponent>;
  enqueueFailedMediaRepairs(openLibrary: OpenLibrary, components: Set<MediaAutoRepairComponent>, priority: number): number;
  primaryArtifactGeneratorIsCurrent(relativeFilePath: string, kind: 'thumbnail' | 'video_poster', generatorVersion: string): boolean;
  invalidateStalePrimaryArtifacts(openLibrary: OpenLibrary, assetIds: readonly string[]): number;
  enqueueImportedThumbnailNormalizationJob(openLibrary: OpenLibrary, assetId: string, revisionId: string): number;
  enqueueImportedThumbnailNormalizationJobs(openLibrary: OpenLibrary, options?: { assetIds?: readonly string[]; limit?: number }): number;
  enqueueThumbnailJobs(libraryId: string, options?: {
      assetIds?: string[];
      limit?: number;
      priority?: number;
      repairFailed?: boolean;
      /** Serpent-5xbg: also re-open retryable failed artifacts (throttled). */
      retryFailed?: boolean;
      /** Background fill waves skip GIF/audio stale-artifact scans. */
      skipStaleRepair?: boolean;
    }): number;
  requeueLegacyRawColorTransformFailures(openLibrary: OpenLibrary, options: { assetIds: string[]; limit?: number }): number;
  processThumbnailQueue(libraryId: string, options?: {
      maxJobs?: number;
      /** Restrict a pump to one media lane; omitted preserves full-queue behavior. */
      jobKinds?: readonly MediaJobKind[];
      /** Current viewport image cards may use the bounded interactive lane. */
      interactive?: boolean;
      /**
       * Mutable claim scope updated by the Worker when a newer visible window
       * arrives while this queue is awaiting native media work. Undefined
       * keeps the original queue-wide scope; an array limits future claims.
       */
      claimAssetIdsRef?: { current: readonly string[] | undefined };
      /**
       * Restrict a visible-window pump to the latest viewport asset ids.
       * Background pumps omit this so overlay `IN (...)` can fall back to the
       * persistent queue once those ids have no queued work.
       */
      assetIds?: readonly string[];
      /** Serpent-4bdd26 收编：Stop claiming more jobs when a newer queue scene supersedes this pump. */
      signal?: AbortSignal;
      onResult?: (result: {
        assetId: string;
        artifactId?: string;
        errorCode?: string;
        width?: number;
        height?: number;
        durationMs?: number;
        revisionId?: string;
        previewKind?: 'source' | null;
        previewRevisionId?: string | null;
      }) => void;
      /** Fired once a durable visual input is ready for automatic AI. */
      onAiInputReady?: (event: { assetId: string; artifactId: string }) => void;
      /** Notify the renderer when a secondary artifact changes Inspector data. */
      onDerivedReady?: (event: {
        assetId: string;
        kind: SecondaryMediaJobKind;
        width?: number;
        height?: number;
        durationMs?: number;
        revisionId?: string;
        previewKind?: 'source' | null;
        previewRevisionId?: string | null;
      }) => void;
      pluginMediaProvider?: (input: {
        assetId: string;
        signal: AbortSignal;
        asset?: {
          assetId: string;
          displayName: string;
          relativeFilePath: string;
          currentRevisionId: string;
        };
      }) => Promise<string | null>;
      /** Slice E: offscreen renderer for model assets (null keeps the legacy no-op). */
      modelThumbnailRenderer?: ModelThumbnailRenderer;
      /** Serpent-6w40: renders the AI four-view sheet via the offscreen page. */
      modelAiViewsRenderer?: (
        input: ModelThumbnailRendererInput,
      ) => Promise<ModelThumbnailRenderOutcome>;
    }): Promise<number>;
  thumbnailArtifactMap(libraryId: string, assetIds: string[]): Map<string, {
    status: 'ready' | 'pending' | 'failed' | null;
    artifactId: string | null;
    width: number | null;
    height: number | null;
    durationMs: number | null;
  }>;
  thumbnailStatusMap(libraryId: string, assetIds: string[]): Map<string, 'ready' | 'pending' | 'failed' | null>;
  setShowMissingLinkedFiles(show: boolean): void;
  isDefaultBrowseIndexRequest(input: {
    query?: { clauses: SearchClause[]; groups?: SearchGroup[] } | null;
    filters?: FilterClause[] | null;
    scope?: SearchScope | null;
    sort?: SortDefinition | null;
    scopeMode?: boolean | null;
    idsOnly?: boolean | null;
    showIgnored?: boolean;
  }): boolean;
  buildFilterWhere(filters: FilterClause[], options?: { hasAiContent: boolean; hasAiAssetTags: boolean }): { sql: string; params: unknown[] };
  createBrowseSession(input: {
    libraryId: string;
    libraryGeneration: number;
    query: SearchQuery | null;
    filters?: FilterClause[] | null;
    scope?: SearchScope | null;
    sort?: SortDefinition | null;
    smartCollectionId?: string | null;
    limit?: number | null;
    showIgnored?: boolean;
  }): {
    session: BrowseSessionSnapshot;
    items: AssetSummary[];
    total: number;
    offset: number;
    snippets?: Array<{ assetId: string; text: string }>;
  };
  readBrowseSessionPage(input: {
    libraryId: string;
    libraryGeneration: number;
    sessionId: string;
    limit?: number | null;
    offset?: number | null;
  }): | ({ status: 'ready'; session: BrowseSessionSnapshot }
      & Pick<ReturnType<LibraryService['searchAssets']>, 'items' | 'total' | 'offset' | 'snippets'>)
    | Extract<BrowseSessionLookup, { status: 'missing' | 'stale' }>;
  readBrowseSessionGeometry(input: {
    libraryId: string;
    libraryGeneration: number;
    sessionId: string;
    startIndex?: number | null;
    limit?: number | null;
  }): | {
        status: 'ready';
        session: BrowseSessionSnapshot;
        startIndex: number;
        entries: Array<{
          index: number;
          assetId: string;
          width: number | null;
          height: number | null;
          previewArtifactId?: string | null;
        }>;
      }
    | Extract<BrowseSessionLookup, { status: 'missing' | 'stale' }>;
  readBrowseSessionAssetIds(input: {
    libraryId: string;
    libraryGeneration: number;
    sessionId: string;
  }): | { status: 'ready'; session: BrowseSessionSnapshot; assetIds: string[] }
    | Extract<BrowseSessionLookup, { status: 'missing' | 'stale' }>;
  closeBrowseSession(input: { libraryId: string; sessionId: string }): void;
  searchAssets(input: {
    libraryId: string;
    query?: { clauses: SearchClause[]; groups?: SearchGroup[] } | null;
    filters?: FilterClause[] | null;
    scope?: SearchScope | null;
    sort?: SortDefinition | null;
    limit?: number | null;
    offset?: number | null;
    /** Serpent-6w7n: fetch entire browse scope (lightweight rows, capped). */
    scopeMode?: boolean | null;
    /**
     * Serpent-ws4k: fetch only asset ids for the whole scope (select-all /
     * invert). Skips the thumbnail/sequence enrichment and returns `items: []`
     * plus `assetIds` (capped at the browse-scope cap like scopeMode).
     */
    idsOnly?: boolean | null;
    /** Worker-internal bounded page mode; ordinary idsOnly remains full-scope. */
    idsPage?: boolean | null;
    /** Compact full-scope real-asset geometry for virtualized layout. */
    layoutOnly?: boolean | null;
    /** Worker-internal ordered snapshot source for BrowseSession pages. */
    sessionAssetIds?: readonly string[];
    showIgnored?: boolean;
  }): {
    items: AssetSummary[];
    total: number;
    offset: number;
    snippets?: Array<{ assetId: string; text: string }>;
    assetIds?: string[];
    layout?: BrowseLayoutEntry[];
  };
  createSmartCollection(input: {
    libraryId: string;
    name: string;
    queryDefinitionJson: string;
  }): SmartCollectionSummary;
  listSmartCollections(libraryId: string): SmartCollectionSummary[];
  updateSmartCollection(input: {
    libraryId: string;
    collectionId: string;
    name?: string;
    queryDefinitionJson?: string;
    position?: number;
  }): SmartCollectionSummary;
  deleteSmartCollection(input: {
    libraryId: string;
    collectionId: string;
  }): string;
  executeSmartCollection(input: {
    libraryId: string;
    collectionId: string;
    limit?: number;
    offset?: number;
    scopeMode?: boolean | null;
    idsOnly?: boolean | null;
    layoutOnly?: boolean | null;
  }): { items: AssetSummary[]; total: number; offset: number; assetIds?: string[]; layout?: BrowseLayoutEntry[] };
  parseSmartCollectionDefinition(value: string, errorCode: 'INVALID_SMART_COLLECTION_QUERY' | 'LIBRARY_CORRUPT'): SmartCollectionQueryDefinition;
  assertMeaningfulSmartCollectionDefinition(definition: SmartCollectionQueryDefinition): void;
  countSmartCollectionMatches(libraryId: string, definition: SmartCollectionQueryDefinition): number;
  knownRecoveryFilePath(rootPath: string, relativeFilePath: string): string | undefined;
  probeMissingAssetRecovery(input: {
    libraryId: string;
    assetId: string;
  }): MissingAssetRecoveryProbe;
  trashPath(openLibrary: OpenLibrary, assetId: string, filename: string): string;
  assertNotInManagedSpace(openLibrary: OpenLibrary, absolutePath: string): void;
  assertNoSymlinkEscape(absolutePath: string): void;
  placeManagedRelinkFile(openLibrary: OpenLibrary, sourcePath: string, destinationRelativePath: string): {
    destinationPath: string;
    operationPath: string;
    placedIdentity: ManagedRelinkPlacementIdentity;
    stat: Stats;
  };
  managedRelinkPlacementIdentity(filePath: string): ManagedRelinkPlacementIdentity;
  writeManagedRelinkPlacementManifest(operationPath: string, manifest: ManagedRelinkPlacementManifestV3): void;
  writeDurableRelinkJournalFile(operationPath: string, filename: 'manifest.json' | 'placed.json', value: ManagedRelinkPlacementManifestV3 | ManagedRelinkPlacedMarkerV1): void;
  cleanupManagedRelinkPlacement(placement: {
      destinationPath: string;
      operationPath: string;
      placedIdentity: ManagedRelinkPlacementIdentity;
    }, removeDestination: boolean): void;
  recoverOrphanRelinkPlacement(openLibrary: OpenLibrary, operationPath: string): boolean;
  isManagedRelinkPlacementIdentity(value: unknown): value is ManagedRelinkPlacementIdentity;
  matchesManagedRelinkPlacementIdentity(destinationPath: string, expected: ManagedRelinkPlacementIdentity): boolean;
  quarantineManagedRelinkPlacementForRemoval(destinationPath: string, operationPath: string, expected: ManagedRelinkPlacementIdentity): { owned: boolean; preserveOperation: boolean };
  assetSummaryFromRow(row: CatalogAssetSummaryRow): AssetSummary;
  managedMoveSummaries(openLibrary: OpenLibrary, assetIds: string[]): AssetSummary[];
  applyManagedMoveOperation(openLibrary: OpenLibrary, operationId: string, manifest: ManagedMoveOperationManifest): void;
  managedMoveConflict(openLibrary: OpenLibrary, operationId: string, backupName: string, relativePath: string, excludedAssetId: string): ManagedMoveConflict | null;
  availableMoveDestination(openLibrary: OpenLibrary, relativePath: string, planned: Set<string>): string;
  moveAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
  }): { movedCount: number; skippedCount: number; operationId: string | null; assets: AssetSummary[] };
  undoMoveAssets(input: {
    libraryId: string;
    operationId: string;
    conflictStrategy?: 'error' | 'keep-both' | 'replace' | 'skip';
  }): { undoneCount: number; skippedCount: number; assets: AssetSummary[] };
  copyAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
    /** Internal history replay mapping; ordinary callers leave this unset. */
    outputAssetIds?: ReadonlyArray<{ sourceAssetId: string; newAssetId: string }>;
  }): {
    copiedCount: number;
    skippedCount: number;
    operationId: string | null;
    assets: AssetSummary[];
    outputAssetIdsBySource: Array<{ sourceAssetId: string; newAssetId: string }>;
  };
  undoCopyAssets(input: {
    libraryId: string;
    operationId: string;
    conflictStrategy?: 'error' | 'keep-both' | 'replace' | 'skip';
  }): { undoneCount: number; skippedCount: number; assets: AssetSummary[] };
  applyManagedCopyOperation(openLibrary: OpenLibrary, operationId: string, manifest: ManagedCopyOperationManifest): void;
  textAssetPreviewCacheKey(libraryId: string, assetId: string, revisionId: string, maxBytes: number): string;
  readCachedTextAssetPreview(key: string): {
    assetId: string;
    revisionId: string;
    content: string;
    truncated: boolean;
    byteSize: number;
    lineCount: number;
    editable: boolean;
    mimeType: string;
  } | undefined;
  cacheTextAssetPreview(key: string, value: {
      assetId: string;
      revisionId: string;
      content: string;
      truncated: boolean;
      byteSize: number;
      lineCount: number;
      editable: boolean;
      mimeType: string;
    }): void;
  invalidateTextAssetPreviewCache(libraryId: string, assetId: string): void;
  clearTextAssetPreviewCache(libraryId: string): void;
  zipAssetAbsolutePath(input: { libraryId: string; assetId: string }): {
    absolutePath: string;
    revisionId: string;
  };
  listZipEntries(input: { libraryId: string; assetId: string }): Promise<{
    assetId: string;
    revisionId: string;
    status: 'ready' | 'unreadable';
    truncated: boolean;
    files: Array<{ index: number; name: string; uncompressedSize: number }>;
  }>;
  readZipEntry(input: { libraryId: string; assetId: string; index: number }): Promise<{
    assetId: string;
    index: number;
    name: string;
    uncompressedSize: number;
    kind: 'image' | 'text' | 'unavailable';
    mimeType?: string;
    bytesBase64?: string;
    text?: string;
    truncated?: boolean;
  }>;
  readTextAsset(input: {
    libraryId: string;
    assetId: string;
    maxBytes?: number;
  }): {
    assetId: string;
    revisionId: string;
    content: string;
    truncated: boolean;
    byteSize: number;
    lineCount: number;
    editable: boolean;
    mimeType: string;
  };
  saveTextAsset(input: {
    libraryId: string;
    assetId: string;
    content: string;
    expectedRevisionId?: string;
    createRevision?: boolean;
  }): {
    asset: AssetSummary;
    revisionId: string;
    byteSize: number;
    lineCount: number;
  };
  stageManagedAssetContent(input: {
    libraryId: string;
    assetId: string;
    stagingToken?: string;
    dataBase64: string;
    complete: boolean;
  }): {
    assetId: string;
    stagingToken: string;
    byteSize: number;
    complete: boolean;
  };
  replaceManagedAssetContent(input: {
    libraryId: string;
    assetId: string;
    dataBase64: string;
    expectedRevisionId?: string;
  }): {
    assetId: string;
    revisionId: string;
    byteSize: number;
  };
  replaceManagedAssetContentBatch(input: {
    libraryId: string;
    items: Array<{
      assetId: string;
      expectedRevisionId: string;
      dataBase64?: string;
      stagingToken?: string;
    }>;
    automationPlan?: {
      planHash: string;
      expectedChangeSequence: number;
      assetStates: Array<{ assetId: string; stateToken: string }>;
    };
  }): {
    operationId: string;
    items: Array<{ assetId: string; revisionId: string; byteSize: number }>;
  };
  readManagedAssetContent(input: {
    libraryId: string;
    assetId: string;
    maxBytes?: number;
    offsetBytes?: number;
  }): {
    assetId: string;
    revisionId: string;
    byteSize: number;
    dataBase64: string;
    truncated: boolean;
    mimeType: string | null;
  };
  renameAssetFile(input: {
    libraryId: string;
    assetId: string;
    newBaseName?: string;
    newFileName?: string;
  }): { asset: AssetSummary };
  getAssetFileBaseName(input: { libraryId: string; assetId: string }): string;
  getAssetFileName(input: { libraryId: string; assetId: string }): string;
  renameAssetFiles(input: {
    libraryId: string;
    items: Array<{ assetId: string; newBaseName: string }>;
  }): {
    renamedCount: number;
    skipped: Array<{
      assetId: string;
      reason: 'asset_not_found' | 'asset_unavailable' | 'name_conflict' | 'invalid_name';
    }>;
    assets: AssetSummary[];
  };
  expandAssetIdsToSequenceMembers(openLibrary: OpenLibrary, assetIds: readonly string[]): string[];
  countLogicalAssetUnits(openLibrary: OpenLibrary, assetIds: readonly string[]): number;
  trashAssets(input: {
    libraryId: string;
    assetIds: string[];
    /** Folder deletion intentionally includes assets hidden by ignore rules. */
    allowExplicitlyIgnored?: boolean;
    operationId?: string;
  }): { trashedCount: number; operationId: string };
  trashSelection(input: {
    libraryId: string;
    assetIds: readonly string[];
    folderIds: readonly string[];
    source?: HistorySource;
    sourceReference?: string | null;
  }): TrashSelectionResult;
  previewRestoreAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId?: string | null;
  }): { hasNameConflicts: boolean };
  restoreAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId?: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
  }): { restoredCount: number; assets: AssetSummary[]; operationId: string };
  undoTrashAssets(input: {
    libraryId: string;
    operationId: string;
    /** History replay must never acknowledge a partially restored batch. */
    requireAll?: boolean;
  }): {
    restoredCount: number;
    skippedCount: number;
    assets: AssetSummary[];
  };
  restoreAssetsIfOriginalVacant(input: {
    libraryId: string;
    assetIds: string[];
    /** Reject before mutation when any requested asset cannot be restored. */
    requireAll?: boolean;
  }): {
    restoredCount: number;
    skippedCount: number;
    skipped: Array<{
      assetId: string;
      reason: 'original_folder_missing' | 'name_conflict' | 'trash_file_missing';
    }>;
    assets: AssetSummary[];
  };
  deleteAssetsFromDisk(input: {
    libraryId: string;
    assetIds: string[];
  }): { deletedCount: number };
  deleteAssetsPermanent(input: {
    libraryId: string;
    assetIds: string[];
  }): { deletedCount: number; skippedCount: number; skippedReasons: Array<{ assetId: string; reason: PublicErrorReason }> };
  syncTrashedFolderTombstones(openLibrary: OpenLibrary): void;
  restoreTrashedManagedFolder(input: {
    libraryId: string;
    tombstoneId: string;
  }): {
    restoredFolderCount: number;
    restoredAssetCount: number;
    folders: ManagedFolderSummary[];
  };
  purgeTrashedAssetsById(libraryId: string, assetIds: string[], onPurged?: (processed: number, total: number) => void): {
    purgedCount: number;
    skippedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  };
  emptyTrash(libraryId: string): {
    purgedCount: number;
    skippedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  };
  purgeExpiredTrash(libraryId: string): {
    purgedCount: number;
    skippedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  };
  listTrashedFolders(libraryId: string): TrashedFolderSummary[];
  trashedFolderCoverArtifactMap(openLibrary: OpenLibrary, tombstoneIds: string[]): Map<string, string[]>;
  listTrash(libraryId: string): AssetSummary[];
  deleteLinkedAssets(input: {
    libraryId: string;
    assetIds: string[];
    deleteSourceFile: boolean;
    /**
     * 内部调用（文件夹子树、从磁盘删除的链接项）：把多批删除合并到同一个进度流。
     * 公开契约仍是「每批最多 20 个 id」，由调用方分批并传入累计进度。
     */
    progress?: {
      operationId: string;
      totalFiles: number;
      /** 本批开始前已处理的文件数。 */
      processedBefore: number;
      /** 本批结束时回调累计处理数（用于统一进度与最终 complete 事件）。 */
      onProcessed: (processed: number) => void;
    };
  }): Promise<{
    deletedCount: number;
    failedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  }>;
  relinkAsset(input: {
    libraryId: string;
    assetId: string;
    newAbsolutePath: string;
  }): { asset: AssetSummary; batchFollowUpRoot: string };
  batchRelinkRows(openLibrary: OpenLibrary): BatchRelinkAssetRow[];
  indexRelinkCandidates(newRoot: string): Map<string, string[]>;
  batchRelinkMatches(openLibrary: OpenLibrary, newRoot: string, rows: BatchRelinkAssetRow[]): Map<string, BatchRelinkMatch>;
  relinkBatchPreview(input: {
    libraryId: string;
    newRootPath: string;
  }): { matchedCount: number; unmatchedCount: number; totalCount: number; examples: Array<{ relativeFilePath: string; matched: boolean }> };
  relinkBatchApply(input: {
    libraryId: string;
    newRootPath: string;
    keepMetadata: boolean;
  }): { restoredCount: number; unchangedMissingCount: number; assets: AssetSummary[] };
  normalizeLinkedFolderRule(rule: LinkedFolderRule): LinkedFolderRule;
  normalizeExplicitIgnorePath(relativePath: string, allowRoot?: any): string;
  explicitIgnoreSql(connection: DatabaseConnection, alias?: any, showIgnored?: any): string;
  explicitFolderIgnored(openLibrary: OpenLibrary, locationKind: 'managed' | 'linked', linkedFolderId: string | null, relativePath: string): boolean;
  isExplicitlyIgnored(openLibrary: OpenLibrary, locationKind: 'managed' | 'linked', linkedFolderId: string | null, relativePath: string, pathKind: 'asset' | 'folder'): boolean;
  assertAssetsNotExplicitlyIgnored(openLibrary: OpenLibrary, assetIds: string[]): void;
  getGitignore(libraryId: string): { content: string };
  setGitignore(input: { libraryId: string; content: string }): { content: string };
  updateGitignoreRule(openLibrary: OpenLibrary, positive: string, ignored: boolean): void;
  ignoreGitignoreRule(locationKind: 'managed' | 'linked', relativePath: string, pathKind: 'asset' | 'folder' | 'extension'): string | undefined;
  managedGitignoreRule(relativePath: string, pathKind: 'asset' | 'folder' | 'extension'): string | undefined;
  listIgnoredPaths(libraryId: string): IgnoredPath[];
  previewGitignore(libraryId: string, content: string): GitignorePreview;
  collectGitignorePreviewCandidates(openLibrary: OpenLibrary): GitignorePreviewCandidate[];
  setIgnore(input: {
    libraryId: string;
    locationKind: 'managed' | 'linked';
    linkedFolderId?: string | null;
    relativePath: string;
    pathKind: 'asset' | 'folder' | 'extension';
    ignored: boolean;
  }): { ignored: boolean; path: IgnoredPath };
  linkedPathIsIgnored(relativePath: string, rules: LinkedFolderRule[]): boolean;
  enumerateLinkedSources(rootPath: string, linkedFolderId?: string, suppliedRules?: LinkedFolderRule[], explicitlyIgnored?: (relativePath: string, pathKind: 'asset' | 'folder') => boolean, onDiscovered?: (foundCount: number, entryBytes: number) => void): Array<{
    relativePath: string;
    byteSize: number;
    modifiedAt: string;
    originalFilename: string;
    sourceDevice: string;
    sourceInode: string;
  }>;
  enumerateManagedSources(assetsRootPath: string, explicitlyIgnored?: (relativePath: string, pathKind: 'asset' | 'folder') => boolean): Array<{
    relativePath: string;
    byteSize: number;
    modifiedAt: string;
    originalFilename: string;
    sourceDevice: string;
    sourceInode: string;
  }>;
  importPathsIntoLinkedFolder(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
  }): ImportCompletion;
  registerWrittenLinkedAssets(openLibrary: OpenLibrary, linkedFolderId: string, absoluteRootPath: string, writtenRelativePaths: readonly string[]): void;
  linkedFolderRowForImport(openLibrary: OpenLibrary, folderId: string | undefined): { folder_id: string; absolute_root_path: string; status: string; relative_path: string } | null;
  findActiveManagedAssetByContent(openLibrary: OpenLibrary, byteSize: number, sha256: string, contentHashCache: Map<string, string>, contentFingerprint?: string): {
    assetId: string;
    displayName: string;
    thumbnailArtifactId: string | null;
  } | null;
  findActiveManagedAssetAtPath(openLibrary: OpenLibrary, relativeFilePath: string): {
    assetId: string;
    displayName: string;
    thumbnailArtifactId: string | null;
  } | null;
  findActiveManagedAssetIdByContent(openLibrary: OpenLibrary, byteSize: number, sha256: string, contentHashCache: Map<string, string>, contentFingerprint?: string): string | null;
  classifyImportEntryConflict(input: {
    openLibrary: OpenLibrary;
    entry: ImportSourceEntry;
    entrySha256: string;
    existingSize: number | undefined;
    existingAbsolutePath: string | undefined;
    contentHashCache: Map<string, string>;
    seenContentHashes: Set<string>;
    ignoreBatchContentHash?: boolean;
    skipLibraryDuplicateScan?: boolean;
  }): 'none' | 'suspected-duplicate' | 'name-conflict';
  previewAutomationImport(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
  }): AutomationImportPlan;
  validateAutomationImportPlan(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
    automationPlan?: {
      planHash: string;
      expectedChangeSequence: number;
      sourceStates: Array<{ sourcePath: string; stateToken: string }>;
    };
  }): void;
  prepareImport(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
    createImageSequence?: boolean;
    sourcePageUrl?: string;
    /** Internal adapter for importers whose logical path differs from disk. */
    sourceEntries?: ImportSourceEntry[];
    sourceDirectories?: string[];
    dedupeSameNameByContent?: boolean;
    /** Avoid hashing every existing same-size asset for external bulk imports. */
    skipLibraryDuplicateScan?: boolean;
    /** Skip SHA-256/fingerprint of staged bytes; used for Eagle/Billfish conversion. */
    skipContentHash?: boolean;
    /** Optional progress callback for a caller-owned bulk import. */
    onStagedEntry?: (processedCount: number, bytesProcessed: number) => void;
    suppressAssetChangeEvents?: boolean;
    /** Shared destination identity map for multi-batch Eagle/Billfish conversion. */
    destinationIndex?: Map<string, ExistingDestination>;
    /** When set, emit import.progress and honor cancelImport(importId). */
    transferCancel?: TransferCancelState;
    /** Yield so a cancel command can run while files are staged. */
    yieldTransferCheckpoints?: boolean;
  }): ImportConflictPlan | ImportSourceFailurePlan;
  failPreparedImport(error: unknown, context: {
      importId: string;
      operationPath: string;
      openLibrary: OpenLibrary;
      trackProgress: boolean;
    }): never;
  completePreparedImport(context: {
    input: Parameters<LibraryService['prepareImport']>[0];
    openLibrary: OpenLibrary;
    importId: string;
    operationPath: string;
    directories: string[];
    stagedEntries: ImportSourceEntry[];
    skipContentHash: boolean;
    destinationIndex: Map<string, ExistingDestination> | undefined;
    preparingManifest: OperationManifest;
    skippedSources?: SkippedImportSource[];
  }): ImportConflictPlan;
  prepareOrExecuteImport(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
    createImageSequence?: boolean;
    sourcePageUrl?: string;
    automationPlan?: {
      planHash: string;
      expectedChangeSequence: number;
      sourceStates: Array<{ sourcePath: string; stateToken: string }>;
    };
  }): ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan;
  prepareOrExecuteImportCancellable(input: Parameters<LibraryService['prepareOrExecuteImport']>[0]): Promise<ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan>;
  resolveImportCancellable(input: Parameters<LibraryService['resolveImport']>[0]): Promise<ImportCompletion>;
  ensureEagleCollections(openLibrary: OpenLibrary, folders: readonly EagleFolderNode[]): Map<string, string>;
  ensureEagleTags(openLibrary: OpenLibrary, items: readonly EagleAssetCandidate[], tagIdsByName: Map<string, string>): void;
  eagleImportEntry(sourceRootPath: string, item: EagleAssetCandidate, collectionIdsByFolder: ReadonlyMap<string, string>, tagIdsByName: ReadonlyMap<string, string>): ImportSourceEntry | null;
  ensureBillfishTags(openLibrary: OpenLibrary, items: readonly BillfishAssetCandidate[], tagIdsByName: Map<string, string>): void;
  billfishImportEntry(sourceRootPath: string, item: BillfishAssetCandidate, tagIdsByName: ReadonlyMap<string, string>): ImportSourceEntry | null;
  wrapEagleImportStageError(error: unknown, reason: 'IMPORT_COPY_FAILED' | 'IMPORT_REGISTER_FAILED'): LibraryServiceError;
  copyEagleThumbnailFile(openLibrary: OpenLibrary, destinationRelativePath: string, metadata: EagleImportedMetadata): EagleCopiedThumbnail | undefined;
  insertCopiedEagleThumbnail(openLibrary: OpenLibrary, assetId: string, revisionId: string, copied: EagleCopiedThumbnail): void;
  persistEagleThumbnailArtifact(openLibrary: OpenLibrary, assetId: string, revisionId: string, destinationRelativePath: string, metadata: EagleImportedMetadata): void;
  importEagleLibrary(input: {
    libraryId: string;
    sourceRootPath: string;
  }): Promise<EagleImportResult>;
  inspectEagleLibrary(sourceRootPath: string): { displayName: string };
  openEagleLibrary(input: {
    sourceRootPath: string;
    selectedParentPath: string;
    displayName: string;
  }): Promise<InternalLibrarySummary>;
  importBillfishLibrary(input: {
    libraryId: string;
    sourceRootPath: string;
  }): Promise<BillfishImportResult>;
  inspectBillfishLibrary(sourceRootPath: string, sourceDisplayName?: string): { displayName: string };
  openBillfishLibrary(input: {
    sourceRootPath: string;
    selectedParentPath: string;
    displayName: string;
  }): Promise<InternalLibrarySummary>;
  abandonImport(importId: string): string;
  resolveImport(input: {
    importId: string;
    suspectedDuplicate: SuspectedDuplicateDecision;
    nameConflict: NameConflictDecision;
  }): ImportCompletion;
  reconcileLinkedFolderStatuses(openLibrary: OpenLibrary, linkedFolderIds?: ReadonlySet<string>): void;
  computeContentFingerprint(filePath: string): string;
  computeContentFingerprintAsync(filePath: string, signal?: AbortSignal, buffer?: Buffer, yieldTurn?: () => Promise<void>): Promise<string>;
  watcherStableFileWindowMs(): number;
  networkDiscoveryFingerprint(discovery: RefreshManagedAssetsDiscovery): string;
  waitForWatcherStabilityWindow(task: OpenReconciliationTask, delayMs: number): Promise<void>;
  waitForStableWatcherDiscovery(task: OpenReconciliationTask, discovery: RefreshManagedAssetsDiscovery, existingAssets: ReadonlyArray<{
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
      byte_size: number | null;
      modified_at: string | null;
    }>): Promise<void>;
  prepareOpenReconciliationFingerprints(task: OpenReconciliationTask, discovery: RefreshManagedAssetsDiscovery, existingAssets: ReadonlyArray<{
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
      byte_size: number | null;
      modified_at: string | null;
    }>): Promise<void>;
  collectManagedAssetDiscovery(openLibrary: OpenLibrary): RefreshManagedAssetsDiscovery;
  reconciliationAbortError(): Error;
  assertReconciliationActive(task: OpenReconciliationTask): void;
  yieldReconciliation(task: OpenReconciliationTask): Promise<void>;
  scheduleDeferredOpenMaintenance(openLibrary: OpenLibrary, generation: number): void;
  cancelDeferredOpenMaintenance(libraryId: string): void;
  enumerateSourcesAsync(input: {
    errorCode: 'IMPORT_APPLY_FAILED' | 'INVALID_IMPORT_SOURCE';
    explicitlyIgnored: (relativePath: string, pathKind: 'asset' | 'folder') => boolean;
    isDirectoryIgnored?: (relativePath: string) => boolean;
    libraryId: string;
    linkedFolderId?: string;
    locationKind: 'managed' | 'linked';
    rootPath: string;
    task: OpenReconciliationTask;
  }): Promise<DiscoveredSourceEntry[]>;
  collectManagedAssetDiscoveryAsync(task: OpenReconciliationTask, options?: { linkedFolderIds?: readonly string[] }): Promise<RefreshManagedAssetsDiscovery>;
  applyDiscoveredAssetsInBatches(task: OpenReconciliationTask, discovery: RefreshManagedAssetsDiscovery): Promise<AssetRefreshResult>;
  refreshManagedAssets(libraryId: string, options?: RefreshManagedAssetsOptions): AssetRefreshResult;
  createLibrary(input: {
    displayName: string;
    selectedParentPath: string;
    /** 内部用于「从同步远端恢复库身份」：默认随机生成。 */
    libraryId?: string;
  }): InternalLibrarySummary;
  reconcileDefaultIgnoredAssets(openLibrary: OpenLibrary, task: OpenReconciliationTask): Promise<void>;
  recoverOperationHistoryTransitions(openLibrary: OpenLibrary): void;
  openLibrary(selectedLibraryPath: string, options?: { replaceExisting?: boolean }): InternalLibrarySummary;
  isDatabaseRecoveryFailure(error: unknown): boolean;
  canAttemptDatabaseRecovery(libraryPath: string): boolean;
  primaryDatabaseIsDamaged(libraryPath: string): boolean;
  validateDatabaseBackup(backupPath: string, libraryPath: string, slot: 1 | 2): boolean;
  restoreDatabaseBackup(libraryPath: string, backupPath: string): void;
  rescueLibraryFromAssets(libraryPath: string, primaryFailure: unknown): { reportPath?: string; recoveredAssetCount: number };
  attachRecoveryNotice(summary: InternalLibrarySummary, recovery: NonNullable<InternalLibrarySummary['recovery']>): InternalLibrarySummary;
  getRecoveryReportPath(libraryId: string): string;
  reuseOrRejectDuplicateCatalog(input: {
    libraryId: string;
    canonicalPath: string;
    connection: DatabaseConnection;
    replaceExisting?: boolean;
  }): InternalLibrarySummary | undefined;
  adoptWritableOpenLibrary(input: {
    connection: DatabaseConnection;
    library: LibraryRow;
    canonicalPath: string;
    serpentPath: string;
    networkStorage?: boolean;
    storageKind?: LibraryStorageKind;
    libraryVersion?: number;
    supportedSchemaVersion?: number;
    migrationStuck?: boolean;
    startServices: boolean;
    replaceExisting?: boolean;
  }): InternalLibrarySummary;
  assertNetworkLinkedFoldersAvailable(connection: DatabaseConnection, networkStorage: boolean): void;
  openLibraryPrimary(selectedLibraryPath: string, options?: { replaceExisting?: boolean }): InternalLibrarySummary;
  openLibraryReadOnly(selectedLibraryPath: string): InternalLibrarySummary;
  renameLibrary(input: { libraryId: string; displayName: string }): InternalLibrarySummary;
  resolvePublicDownloadTarget(url: URL): Promise<ResolvedAddress>;
  saveAssetFromUrl(input: {
    libraryId: string;
    targetFolderId?: string;
    sourcePageUrl?: string;
    mediaUrl: string;
    mediaType?: string;
  }): Promise<{ asset: AssetSummary }>;
  saveAssetFromFile(input: {
    libraryId: string;
    targetFolderId?: string;
    sourcePageUrl?: string;
    mediaUrl?: string;
    stagedFilePath: string;
    contentType: string;
    filename: string;
  }): Promise<{ asset: AssetSummary }>;
  nextImportProgressSequence(importId: string, phase: ImportProgressEvent['phase']): number;
  emitProgress(event: ExportProgressEvent | ImportProgressEvent | DeleteProgressEvent): void;
  emitManagedImportProgress(importId: string, phase: ImportProgressEvent['phase'], filesProcessed: number, totalFiles: number, bytesProcessed: number, totalBytes: number): void;
  emitLinkedFolderImportProgress(importId: string, phase: ImportProgressEvent['phase'], filesProcessed: number, totalFiles: number, bytesProcessed: number, totalBytes: number): void;
  emitDeleteProgress(event: Omit<DeleteProgressEvent, 'type'>): void;
  stageOneImportSourceEntry(input: {
    openLibrary: OpenLibrary;
    entry: ImportSourceEntry;
    stagedPath: string;
    skipContentHash: boolean;
  }): ImportSourceEntry;
  stageImportSourceEntries(input: {
    openLibrary: OpenLibrary;
    entries: ImportSourceEntry[];
    stagePath: string;
    skipContentHash: boolean;
    onStagedEntry?: (processedCount: number, bytesProcessed: number) => void;
    importId?: string;
    totalFiles: number;
    totalBytes: number;
    cancelState?: TransferCancelState;
    yieldCheckpoints?: boolean;
    skipRemainingSourceFailures?: boolean;
    stageNameOffset?: number;
    skipped?: SkippedImportSource[];
  }): ImportSourceEntry[] | Promise<ImportSourceEntry[]>;
  transferPathKey(candidatePath: string): string;
  transferInProgress(scope: string, context: Record<string, unknown>): never;
  acquireExportTransfer(libraryId: string, exportId: string, cancelState: TransferCancelState): void;
  releaseExportTransfer(libraryId: string, exportId: string): void;
  acquireImportTransfer(importId: string, sourcePath: string, destinationPath: string, cancelState: TransferCancelState): ActiveImportTransfer;
  releaseImportTransfer(transfer: ActiveImportTransfer): void;
  mapZipImportError(error: ZipImportStreamError): LibraryServiceError;
  removeOwnedTransferPath(scope: string, targetPath: string, recursive: boolean): void;
  exportLibraryToFolder(input: {
    libraryId: string;
    destinationPath: string;
    includeLinkedContent: boolean;
  }): Promise<{
    exportId: string;
    fileCount: number;
    totalBytes: number;
    excludedPreviewCount: number;
    includedLinkedContent: boolean;
    durationMs: number;
  }>;
  cancelExport(exportId: string): void;
  importLibraryFromFolder(input: {
    sourceFolderPath: string;
    copyToParentPath?: string;
  }): Promise<{
    importId: string;
    libraryId: string;
    displayName: string;
    libraryPath: string;
  }>;
  cancelImport(importId: string, mode?: 'abandon' | 'stop'): void;
  cancelDiskDelete(operationId: string): void;
  exportLibraryToZip(input: {
    libraryId: string;
    destinationPath: string;
    includeLinkedContent: boolean;
  }): Promise<{
    exportId: string;
    fileCount: number;
    totalBytes: number;
    excludedPreviewCount: number;
    includedLinkedContent: boolean;
    durationMs: number;
  }>;
  importLibraryFromZip(input: {
    sourceZipPath: string;
    destinationParentPath: string;
  }): Promise<{
    importId: string;
    libraryId: string;
    displayName: string;
    libraryPath: string;
  }>;
  validateImportSource(sourceFolderPath: string): {
    libraryId: string;
    displayName: string;
  };
  listOpenLibraryIds(): string[];
  closeLibraryAsync(libraryId: string): Promise<void>;
  closeLibrary(libraryId: string): void;
  checkpointAndCloseConnection(openLibrary: OpenLibrary, libraryId: string): void;
  deleteLibraryFromDisk(libraryId: string): {
    libraryId: string;
    displayName: string;
    libraryPath: string;
    pendingAsidePath: string | null;
  };
  cleanupPendingDeletions(asidePaths: string[]): {
    cleanedPaths: string[];
    remainingPaths: string[];
  };
  listLibraries(): InternalLibrarySummary[];
  closeAllAsync(timeoutMs?: any): Promise<void>;
  closeAll(): void;
}
