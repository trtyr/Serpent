/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { AssetObserverEvent, AssetsChangedEvent, DatabaseConnection, DiscoveredSourceEntry, LinkedWatcherChanges, ModelThumbnailRenderOutcome, ModelThumbnailRendererInput, OpenLibrary, OpenReconciliationTask, RefreshManagedAssetsDiscovery, WatchRefreshState} from '../library-service-internals';
import { DEFAULT_ASSET_OBSERVER_FACTORY, DEFAULT_DEBOUNCE_SCHEDULER, LibraryServiceError, MAX_LINKED_WATCHER_CHANGED_FILES, closeIgnoringFailure, databasePath, gitignorePath, isMissingPathError, normalizeWatcherRelativePath, openConfiguredDatabase, readGitignoreText, sourceIdentityKey } from '../library-service-internals';
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
import { LibraryServiceCore } from './LibraryServiceCore';

/** LibraryServiceWatchers: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceWatchers extends LibraryServiceCore {

  public override invalidateArtifactPathCache(libraryId: string): void {
    const prefix = `${libraryId}\u0000`;
    for (const key of this.artifactPathCache.keys()) {
      if (key.startsWith(prefix)) this.artifactPathCache.delete(key);
    }
  }

  public modelAiViewsRenderer?: (
    input: ModelThumbnailRendererInput,
  ) => Promise<ModelThumbnailRenderOutcome>;

  public override withSyncReplay<T>(fn: () => T): T {
    this.syncReplayDepth += 1;
    try {
      return fn();
    } finally {
      this.syncReplayDepth -= 1;
    }
  }

  public override emitClientAssetsChanged(libraryId: string, changedCount: number): void {
    this.emitAssetsChanged(libraryId, changedCount, 'client');
  }

  /**
   * 用户手势发 `client`；同步回放中的 `client` 改成 `sync`，让 Renderer
   * 刷新文件夹树/画布，同时让自动同步调度器忽略，避免回放死循环。
   */
  public override emitAssetsChanged(
    libraryId: string,
    changedCount: number,
    source: NonNullable<AssetsChangedEvent['source']>,
  ): void {
    if (changedCount <= 0) return;
    this.options.onAssetsChanged?.({
      type: 'asset.changed',
      libraryId,
      changedCount,
      missingCount: 0,
      source: this.syncReplayDepth > 0 && source === 'client' ? 'sync' : source,
    });
  }

  public override noteClientFilesystemMutation(): void {
    const debounceMs = this.options.debounceMs ?? 250;
    this.suppressWatcherNotifyUntilMs = Math.max(
      this.suppressWatcherNotifyUntilMs,
      this.watchNotifyNow() + debounceMs * 6,
    );
  }

  public override shouldEmitWatcherAssetChange(): boolean {
    return this.watchNotifyNow() >= this.suppressWatcherNotifyUntilMs;
  }

  /**
   * Reconcile disk changes that happened while the app was closed. Existing
   * assets are processed in small transactions so a large NAS/library scan
   * cannot monopolize the Worker event loop. Discovery of new files remains a
   * final pass, preserving normal refresh semantics without holding the
   * connection in one long transaction.
   * Serpent-4bdd26 收编 codex/large-library-performance@15f3325c。
   */
  public override async refreshManagedAssetsOnOpen(
    libraryId: string,
    task: OpenReconciliationTask,
    diagnosticScope = 'open.refresh-managed-assets',
  ): Promise<void> {
    // 分阶段计时（SERPENT_REFRESH_STAGE_LOG=1）：打开路径里整段对账会堵住 Worker
    // 事件循环数秒（SMB 库实测 7.3 s），必须能区分是「枚举」「指纹」还是「应用批次」。
    const stageLog = process.env.SERPENT_REFRESH_STAGE_LOG === '1';
    let stageMarkAt = performance.now();
    const markRefreshStage = (stage: string, details?: Record<string, unknown>): void => {
      if (!stageLog) return;
      const now = performance.now();
      console.error(JSON.stringify({
        scope: 'open.refresh-managed-assets.stage',
        libraryId,
        generation: task.generation,
        reason: task.reason,
        triggerScope: task.triggerScope ?? diagnosticScope,
        diagnosticScope,
        stage,
        durationMs: Math.round((now - stageMarkAt) * 100) / 100,
        ...details,
      }));
      stageMarkAt = now;
    };
    try {
      this.assertReconciliationActive(task);
      const openLibrary = this.openById.get(libraryId);
      if (!openLibrary || openLibrary.readOnly) return;
      const linkedFolderIds = task.reason === 'watcher' && task.linkedFolderIds?.length
        ? [...new Set(task.linkedFolderIds)]
        : undefined;
      const linkedFolderIdScope = linkedFolderIds === undefined
        ? undefined
        : new Set(linkedFolderIds);
      if (task.reason === 'watcher' && task.linkedFilePathsByFolder !== undefined) {
        const pathCount = [...task.linkedFilePathsByFolder.values()]
          .reduce((total, paths) => total + paths.size, 0);
        const changedPathRefresh = await this.refreshLinkedWatcherFileChanges(
          task,
          task.linkedFilePathsByFolder,
        );
        if (changedPathRefresh !== null) {
          markRefreshStage('linked-file-changes', {
            requestedLinkedFolderCount: task.linkedFilePathsByFolder.size,
            changedPathCount: pathCount,
            inspectedPathCount: changedPathRefresh.inspectedPathCount,
            changedCount: changedPathRefresh.changedCount,
            missingCount: changedPathRefresh.missingCount,
          });
          if (changedPathRefresh.changedCount > 0 && this.shouldEmitWatcherAssetChange()) {
            this.options.onAssetsChanged?.({
              type: 'asset.changed',
              libraryId,
              changedCount: changedPathRefresh.changedCount,
              missingCount: changedPathRefresh.missingCount,
              source: 'watcher',
            });
          }
          return;
        }
        markRefreshStage('linked-file-fallback', {
          requestedLinkedFolderCount: task.linkedFilePathsByFolder.size,
          changedPathCount: pathCount,
        });
      }
      const linkedFolderFilter = linkedFolderIds === undefined
        ? ''
        : ` AND a.linked_folder_id IN (${linkedFolderIds.map(() => '?').join(',')})`;
      const existingAssets = (openLibrary.connection
        .prepare(
          `SELECT a.asset_id, a.location_kind, a.linked_folder_id, a.relative_file_path,
                  r.byte_size, r.modified_at
             FROM assets a
             LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
            WHERE a.deleted_at IS NULL
              AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
              ${linkedFolderFilter}
            ORDER BY a.relative_file_path`,
        )
        .all(...(linkedFolderIds ?? [])) as Array<{
          asset_id: string;
          location_kind: 'managed' | 'linked';
          linked_folder_id: string | null;
          relative_file_path: string;
          byte_size: number | null;
          modified_at: string | null;
        }>);

      // One async filesystem walk supplies both the existing-asset snapshot
      // and the new-file discovery set. The old implementation first lstat'ed
      // every existing row, then walked the same tree again to find new files;
      // on a 20k library that doubled NAS metadata traffic and forced hundreds
      // of synchronous DB batches.
      this.assertReconciliationActive(task);
      markRefreshStage('existing-snapshot');
      const discovery = await this.collectManagedAssetDiscoveryAsync(
        task,
        linkedFolderIds === undefined ? undefined : { linkedFolderIds },
      );
      this.assertReconciliationActive(task);
      const linkedEntryCount = [...discovery.linkedEntriesByFolder.values()]
        .reduce((total, entries) => total + entries.length, 0);
      markRefreshStage('discovery-walk', {
        requestedLinkedFolderCount: linkedFolderIdScope?.size ?? null,
        scannedLinkedFolderCount: discovery.linkedEntriesByFolder.size,
        linkedEntryCount,
        managedEntryCount: discovery.managedEntries.length,
      });
      if (task.reason === 'watcher' || task.reason === 'network') {
        await this.waitForStableWatcherDiscovery(task, discovery, existingAssets);
        this.assertReconciliationActive(task);
      }
      this.reconcileMovedLinkedAssets(openLibrary, discovery, linkedFolderIdScope);
      const networkFingerprint = task.reason === 'network' && openLibrary.summary.networkStorage
        ? this.networkDiscoveryFingerprint(discovery)
        : undefined;
      const networkScan = this.networkScanByLibrary.get(libraryId);
      if (
        task.reason === 'network'
        && networkFingerprint !== undefined
        && networkScan?.fingerprint === networkFingerprint
      ) {
        // The remote tree is unchanged since the last completed checkpoint.
        // Do not repeat SQLite comparison, revision hashing, or artifact
        // admission merely because the low-frequency timer fired.
        return;
      }
      await this.prepareOpenReconciliationFingerprints(task, discovery, existingAssets);
      this.assertReconciliationActive(task);
      markRefreshStage('prepare-fingerprints');
      const discoveredManagedPaths = new Set(
        discovery.managedEntries.map((entry) => portablePathIdentity(entry.relativePath)),
      );
      const discoveredLinkedPaths = new Map(
        [...discovery.linkedEntriesByFolder].map(([folderId, entries]) => [
          folderId,
          new Set(entries.map((entry) => portablePathIdentity(entry.relativePath))),
        ]),
      );
      const discoveredLinkedAssetIds = new Set(
        [...discovery.linkedEntriesByFolder.values()]
          .flat()
          .flatMap((entry) => entry.assetId === undefined ? [] : [entry.assetId]),
      );
      const staleExistingAssetIds = existingAssets
        .filter((asset) => {
          if (asset.location_kind === 'linked' && discoveredLinkedAssetIds.has(asset.asset_id)) {
            return false;
          }
          if (asset.location_kind === 'managed') {
            return !discoveredManagedPaths.has(portablePathIdentity(asset.relative_file_path));
          }
          const linkedPaths = discoveredLinkedPaths.get(asset.linked_folder_id ?? '');
          // An offline linked root is not scanned and must not be converted to
          // missing merely because the NAS is temporarily unavailable.
          return linkedPaths !== undefined
            && !linkedPaths.has(portablePathIdentity(asset.relative_file_path));
        })
        .map((asset) => asset.asset_id);
      let changedCount = 0;
      let missingCount = 0;
      // Missing rows are the only remaining fallback-lstat path. It is usually
      // a tiny set; keep it small on network libraries because a missing NAS
      // entry can still spend a full timeout in the OS path resolver.
      const missingBatchSize = openLibrary.summary.networkStorage ? 1 : 32;
      for (let offset = 0; offset < staleExistingAssetIds.length; offset += missingBatchSize) {
        this.assertReconciliationActive(task);
        const refresh = this.refreshManagedAssets(libraryId, {
          assetIds: staleExistingAssetIds.slice(offset, offset + missingBatchSize),
          discoverSources: false,
        });
        changedCount += refresh.changedCount;
        missingCount += refresh.missingCount;
        await this.yieldReconciliation(task);
      }

      // Discovery is separate from SQLite writes. The async scanner yielded as
      // it walked the tree; now commit its entries in short transactions while
      // reusing the same existing-identity maps for every batch.
      this.assertReconciliationActive(task);
      markRefreshStage('stale-missing-batches');
      const discovered = await this.applyDiscoveredAssetsInBatches(task, discovery);
      changedCount += discovered.changedCount;
      missingCount += discovered.missingCount;
      markRefreshStage('apply-discovered-batches');
      if (changedCount > 0 && this.shouldEmitWatcherAssetChange()) {
        this.options.onAssetsChanged?.({
          type: 'asset.changed',
          libraryId,
          changedCount,
          missingCount,
          source: 'watcher',
        });
      }
      if (networkFingerprint !== undefined && networkScan) {
        networkScan.fingerprint = networkFingerprint;
      }
    } catch (error) {
      if (task.controller.signal.aborted || (error instanceof Error && error.name === 'AbortError')) return;
      this.diagnose(
        task.reason === 'network' ? 'network-scan.offline' : diagnosticScope,
        error,
        { libraryId },
      );
    }
  }

  public override async refreshLinkedWatcherFileChanges(
    task: OpenReconciliationTask,
    pathsByFolder: Map<string, Set<string>>,
  ): Promise<{
    changedCount: number;
    inspectedPathCount: number;
    missingCount: number;
  } | null> {
    const openLibrary = task.openLibrary;
    const linkedEntriesByFolder = new Map<string, DiscoveredSourceEntry[]>();
    const existingLinkedAssetIdsByFolder = new Map<string, Map<string, string>>();
    const existingAssets: Array<{
      asset_id: string;
      location_kind: 'linked';
      linked_folder_id: string;
      relative_file_path: string;
      byte_size: number | null;
      modified_at: string | null;
    }> = [];
    const missingAssetIds: string[] = [];
    let inspectedPathCount = 0;

    if (pathsByFolder.size === 0) return null;
    for (const [folderId, relativePaths] of pathsByFolder) {
      this.assertReconciliationActive(task);
      this.reconcileLinkedFolderStatuses(openLibrary, new Set([folderId]));
      const folder = openLibrary.connection
        .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE library_id = ? AND folder_id = ?')
        .get(task.libraryId, folderId) as {
          absolute_root_path: string;
          status: 'available' | 'offline';
        } | undefined;
      if (!folder || folder.status !== 'available' || this.linkedRootIsGone(folder.absolute_root_path)) {
        return null;
      }
      const rules = this.getLinkedFolderRules({ libraryId: task.libraryId, folderId });
      const entries: DiscoveredSourceEntry[] = [];
      const existingByIdentity = new Map<string, string>();

      for (const relativePath of relativePaths) {
        this.assertReconciliationActive(task);
        let normalizedPath: string;
        try {
          normalizedPath = normalizeRelativeAssetPath(relativePath);
        } catch {
          return null;
        }
        const absolutePath = path.resolve(folder.absolute_root_path, ...normalizedPath.split('/'));
        if (!pathIsWithin(folder.absolute_root_path, absolutePath)) return null;
        const pathIdentity = portablePathIdentity(normalizedPath);
        const existing = openLibrary.connection
          .prepare(
            `SELECT a.asset_id, a.relative_file_path, r.byte_size, r.modified_at
               FROM assets a
               LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
              WHERE a.deleted_at IS NULL
                AND a.location_kind = 'linked'
                AND a.linked_folder_id = ?
                AND a.path_identity = ?
              LIMIT 1`,
          )
          .get(folderId, pathIdentity) as {
            asset_id: string;
            relative_file_path: string;
            byte_size: number | null;
            modified_at: string | null;
          } | undefined;

        let stat: Stats | BigIntStats;
        try {
          stat = await lstatAsync(absolutePath, { bigint: true });
        } catch (error) {
          if (!isMissingPathError(error)) return null;
          if (existing) missingAssetIds.push(existing.asset_id);
          inspectedPathCount += 1;
          continue;
        }
        if (stat.isSymbolicLink() || !stat.isFile() || !existing) return null;
        if (
          this.isExplicitlyIgnored(openLibrary, 'linked', folderId, normalizedPath, 'asset')
          || this.linkedPathIsIgnored(normalizedPath, rules)
        ) {
          // Ignore-rule changes and newly ignored sources need the ordinary
          // snapshot path so availability is reconciled with the same rules as
          // a complete linked-root pass.
          return null;
        }

        const byteSize = Number(stat.size);
        if (!Number.isSafeInteger(byteSize)) return null;
        const entry: DiscoveredSourceEntry = {
          relativePath: normalizedPath,
          byteSize,
          modifiedAt: new Date(Number(stat.mtimeMs)).toISOString(),
          originalFilename: path.posix.basename(normalizedPath),
          sourceDevice: String(stat.dev),
          sourceInode: String(stat.ino),
          assetId: existing.asset_id,
        };
        entries.push(entry);
        existingByIdentity.set(pathIdentity, existing.asset_id);
        existingAssets.push({
          asset_id: existing.asset_id,
          location_kind: 'linked',
          linked_folder_id: folderId,
          relative_file_path: existing.relative_file_path,
          byte_size: existing.byte_size,
          modified_at: existing.modified_at,
        });
        inspectedPathCount += 1;
      }

      if (entries.length > 0) linkedEntriesByFolder.set(folderId, entries);
      if (existingByIdentity.size > 0) {
        existingLinkedAssetIdsByFolder.set(folderId, existingByIdentity);
      }
      await this.yieldReconciliation(task);
    }

    let changedCount = 0;
    let missingCount = 0;
    const missingBatchSize = openLibrary.summary.networkStorage ? 16 : 64;
    for (let offset = 0; offset < missingAssetIds.length; offset += missingBatchSize) {
      this.assertReconciliationActive(task);
      const result = this.refreshManagedAssets(task.libraryId, {
        assetIds: missingAssetIds.slice(offset, offset + missingBatchSize),
        discoverSources: false,
      });
      changedCount += result.changedCount;
      missingCount += result.missingCount;
      await this.yieldReconciliation(task);
    }

    if (linkedEntriesByFolder.size > 0) {
      const discovery: RefreshManagedAssetsDiscovery = {
        linkedEntriesByFolder,
        managedEntries: [],
        scopedLinkedFolderIds: new Set(pathsByFolder.keys()),
        existingLinkedAssetIdsByFolder,
        existingManagedAssetIdsByIdentity: new Map(),
        movedLinkedAssetsReconciled: true,
      };
      await this.waitForStableWatcherDiscovery(task, discovery, existingAssets);
      await this.prepareOpenReconciliationFingerprints(task, discovery, existingAssets);
      const result = await this.applyDiscoveredAssetsInBatches(task, discovery);
      changedCount += result.changedCount;
      missingCount += result.missingCount;
    }

    return { changedCount, inspectedPathCount, missingCount };
  }

  /**
   * Relative paths identify catalog locations, not linked source files. A
   * same-volume move keeps the source device/inode, so claim an unclaimed new
   * path for the old asset before stale rows are marked missing. Ambiguous or
   * unavailable identities are deliberately left as missing + new: guessing
   * would silently attach the wrong file to the user's metadata.
   */
  public override reconcileMovedLinkedAssets(
    openLibrary: OpenLibrary,
    discovery: RefreshManagedAssetsDiscovery,
    linkedFolderIds = discovery.scopedLinkedFolderIds,
  ): void {
    if (discovery.movedLinkedAssetsReconciled) return;
    const scopedLinkedFolderIds = linkedFolderIds?.size
      ? [...linkedFolderIds]
      : undefined;
    const rows = openLibrary.connection
      .prepare(
        `SELECT asset_id, linked_folder_id, source_device, source_inode
           FROM assets
          WHERE location_kind = 'linked' AND deleted_at IS NULL
            ${scopedLinkedFolderIds === undefined
              ? ''
              : `AND linked_folder_id IN (${scopedLinkedFolderIds.map(() => '?').join(',')})`}`,
      )
      .all(...(scopedLinkedFolderIds ?? [])) as Array<{
        asset_id: string;
        linked_folder_id: string;
        source_device: string | null;
        source_inode: string | null;
      }>;
    const sourceAssetByIdentity = new Map<string, string | null>();
    for (const row of rows) {
      const sourceIdentity = sourceIdentityKey(row.source_device, row.source_inode);
      const identity = sourceIdentity === undefined
        ? undefined
        : `${row.linked_folder_id}\u0000${sourceIdentity}`;
      if (!identity) continue;
      if (!sourceAssetByIdentity.has(identity)) {
        sourceAssetByIdentity.set(identity, row.asset_id);
      } else {
        // Duplicate identities are not safe to reconcile automatically. This
        // can happen on filesystems that report a zero/unstable inode; keep
        // the key explicitly ambiguous instead of letting insertion order win.
        sourceAssetByIdentity.set(identity, null);
      }
    }

    for (const [folderId, entries] of discovery.linkedEntriesByFolder) {
      const existingByPath = discovery.existingLinkedAssetIdsByFolder?.get(folderId)
        ?? new Map(
          (openLibrary.connection
            .prepare('SELECT asset_id, path_identity FROM assets WHERE linked_folder_id = ?')
            .all(folderId) as Array<{ asset_id: string; path_identity: string }>)
            .map((row) => [row.path_identity, row.asset_id] as const),
        );
      discovery.existingLinkedAssetIdsByFolder ??= new Map();
      discovery.existingLinkedAssetIdsByFolder.set(folderId, existingByPath);
      const claimedAssetIds = new Set(
        entries.flatMap((entry) => entry.assetId === undefined ? [] : [entry.assetId]),
      );
      for (const entry of entries) {
        if (entry.assetId !== undefined) continue;
        const sourceIdentity = sourceIdentityKey(entry.sourceDevice, entry.sourceInode);
        const identity = sourceIdentity === undefined
          ? undefined
          : `${folderId}\u0000${sourceIdentity}`;
        if (!identity) continue;
        const assetId = sourceAssetByIdentity.get(identity);
        if (assetId === undefined || assetId === null || claimedAssetIds.has(assetId)) continue;
        const pathIdentity = portablePathIdentity(entry.relativePath);
        if (existingByPath.has(pathIdentity)) continue;
        entry.assetId = assetId;
        existingByPath.set(pathIdentity, assetId);
        claimedAssetIds.add(assetId);
        this.diagnose('linked-folder.sync.asset-moved', 'External file moved within the linked root; asset reconciled to new path', {
          libraryId: openLibrary.summary.libraryId,
          assetId,
          linkedFolderId: folderId,
          newRelativePath: entry.relativePath,
        });
      }
    }
    discovery.movedLinkedAssetsReconciled = true;
  }

  /**
   * Restore the source timestamps recorded by an exported library before it is
   * opened on another platform. ZIP entries do not carry a timezone and the
   * streaming extractor intentionally writes new files without trusting the
   * archive timestamp. If we leave those files with the extraction time,
   * `refreshManagedAssetsOnOpen` treats every asset as externally edited,
   * invalidates its ready derived artifacts, and queues a new decode wave.
   * That is especially visible when a macOS library is imported on Windows.
   * Only same-size, non-symlink managed files are adjusted; a content mismatch
   * remains an external change and is handled by the normal refresh path.
   */
  public override restoreManagedAssetTimestamps(libraryPath: string): void {
    const dbPath = databasePath(libraryPath);
    let connection: DatabaseConnection | undefined;
    try {
      connection = openConfiguredDatabase(
        dbPath,
        this.options.sqliteBusyTimeoutMsForTests,
        { readonly: true },
      );
      const rows = connection
        .prepare(
          `SELECT a.relative_file_path, r.byte_size, r.modified_at
             FROM assets a
             JOIN revisions r ON r.revision_id = a.current_revision_id
            WHERE a.location_kind = 'managed'
              AND a.deleted_at IS NULL`,
        )
        .all() as Array<{
          relative_file_path: string;
          byte_size: number;
          modified_at: string;
        }>;
      const assetsRoot = path.join(libraryPath, 'Assets');
      for (const row of rows) {
        const targetPath = path.resolve(assetsRoot, ...row.relative_file_path.split('/'));
        if (!pathIsWithin(assetsRoot, targetPath)) continue;
        try {
          const stat = lstatSync(targetPath);
          const modifiedAt = Date.parse(row.modified_at);
          if (
            !stat.isFile()
            || stat.isSymbolicLink()
            || stat.size !== row.byte_size
            || !Number.isFinite(modifiedAt)
          ) {
            continue;
          }
          const timestamp = new Date(modifiedAt);
          utimesSync(targetPath, timestamp, timestamp);
        } catch (error) {
          // A single unreadable asset must not make an otherwise valid import
          // fail; refreshManagedAssetsOnOpen will report it as missing.
          this.diagnose('import.restore-asset-timestamp', error, {
            libraryPath,
            relativeFilePath: row.relative_file_path,
          });
        }
      }
    } catch (error) {
      // Timestamp restoration is a compatibility aid, not a validity gate.
      // The normal open/reconcile path remains authoritative if this fails.
      this.diagnose('import.restore-asset-timestamps', error, { libraryPath });
    } finally {
      closeIgnoringFailure(connection);
    }
  }

  /**
   * Clock used to arm/check the client-mutation suppression window. Injectable
   * so watcher tests that drive the debounce scheduler manually can advance
   * time past the suppression instead of relying on wall-clock sleeps.
   */
  public override watchNotifyNow(): number {
    return this.options.watchNotifyClock?.now() ?? Date.now();
  }

  public override startAssetWatcher(openLibrary: OpenLibrary): void {
    const libraryId = openLibrary.summary.libraryId;
    if (!this.watchRefreshByLibrary.has(libraryId)) {
      this.watchRefreshByLibrary.set(libraryId, { dirty: false, reason: 'watcher' });
    }
    if (openLibrary.summary.networkStorage) {
      // fs.watch is not a trustworthy cross-machine change source on SMB/NFS.
      // Keep the managed root on the low-frequency, fingerprinted scanner;
      // linked roots may still have their own local observer below.
      this.startNetworkScan(libraryId);
      return;
    }
    const observerFactory = this.options.observerFactory ?? DEFAULT_ASSET_OBSERVER_FACTORY;
    try {
      const assetsPath = this.assetsPath(openLibrary);
      const observer = observerFactory(
        assetsPath,
        () => this.scheduleAssetRefresh(libraryId),
        (error) => this.diagnose('asset-watcher.error', error, { libraryId, assetsPath }),
      );
      this.watchByLibraryId.set(libraryId, { observer });
    } catch (error) {
      this.diagnose('asset-watcher.start', error, {
        libraryId,
        assetsPath: this.assetsPath(openLibrary),
      });
      // Watching is opportunistic; library open and explicit refresh must still work.
    }
  }

  public override networkScanIntervalMs(): number {
    const configured = this.options.networkScanIntervalMs;
    if (configured === undefined || !Number.isFinite(configured)) return 30_000;
    return Math.max(0, Math.min(86_400_000, Math.trunc(configured)));
  }

  public override startNetworkScan(libraryId: string): void {
    if (this.networkScanIntervalMs() <= 0) return;
    if (!this.networkScanByLibrary.has(libraryId)) {
      this.networkScanByLibrary.set(libraryId, {});
    }
    this.scheduleNetworkScan(libraryId, this.networkScanIntervalMs());
  }

  public override scheduleNetworkScan(libraryId: string, delayMs: number): void {
    const state = this.networkScanByLibrary.get(libraryId);
    const openLibrary = this.openById.get(libraryId);
    if (
      !state
      || state.timer !== undefined
      || !openLibrary
      || openLibrary.readOnly
      || !openLibrary.summary.networkStorage
    ) return;
    const scheduler = this.options.scheduler ?? DEFAULT_DEBOUNCE_SCHEDULER;
    try {
      state.timer = scheduler.schedule(() => {
        state.timer = undefined;
        const current = this.openById.get(libraryId);
        if (!current || current.readOnly || !current.summary.networkStorage) return;
        this.scheduleWatcherRefresh(
          libraryId,
          { scope: 'network-watcher.schedule', libraryId },
          'network',
        );
      }, Math.max(0, Math.trunc(delayMs)));
    } catch (error) {
      state.timer = undefined;
      this.diagnose('network-watcher.schedule', error, { libraryId });
    }
  }

  public override scheduleAssetRefresh(libraryId: string): void {
    const libraryWatch = this.watchByLibraryId.get(libraryId);
    if (!libraryWatch || !this.openById.has(libraryId)) return;
    this.scheduleWatcherRefresh(libraryId, { scope: 'asset-watcher.schedule', libraryId });
  }

  /**
   * Coalesce native watcher noise at the library boundary. Managed and linked
   * roots share this state, so a bulk copy touching both trees creates one
   * asynchronous reconciliation rather than one full scan per observer.
   */
  public override scheduleWatcherRefresh(
    libraryId: string,
    diagnosticContext: Record<string, unknown>,
    reason: 'watcher' | 'network' = 'watcher',
    linkedChanges?: LinkedWatcherChanges,
  ): void {
    const state = this.watchRefreshByLibrary.get(libraryId);
    if (!state || !this.openById.has(libraryId)) return;
    const wasDirty = state.dirty;
    state.dirty = true;
    state.triggerScope = String(
      diagnosticContext.scope ?? state.triggerScope ?? 'asset-watcher.schedule',
    );
    const requestedLinkedFolderIds = [
      ...(typeof diagnosticContext.linkedFolderId === 'string'
        ? [diagnosticContext.linkedFolderId]
        : []),
      ...(Array.isArray(diagnosticContext.linkedFolderIds)
        ? diagnosticContext.linkedFolderIds.filter((value): value is string => typeof value === 'string')
        : []),
    ];
    if (
      reason === 'network'
      || diagnosticContext.fullRefresh === true
      || requestedLinkedFolderIds.length === 0
    ) {
      state.fullRefreshRequested = true;
      state.linkedFolderIds?.clear();
      state.linkedChanges = undefined;
    } else if (state.fullRefreshRequested !== true) {
      state.linkedFolderIds ??= new Set<string>();
      for (const folderId of requestedLinkedFolderIds) state.linkedFolderIds.add(folderId);
      if (state.linkedChanges?.kind === 'scope' || linkedChanges?.kind === 'scope' || linkedChanges === undefined) {
        state.linkedChanges = { kind: 'scope' };
      } else {
        const pathsByFolder = new Map<string, Set<string>>(
          [...(state.linkedChanges?.pathsByFolder ?? new Map())]
            .map(([folderId, paths]) => [folderId, new Set(paths)]),
        );
        for (const [folderId, paths] of linkedChanges.pathsByFolder) {
          const mergedPaths = pathsByFolder.get(folderId) ?? new Set<string>();
          for (const relativePath of paths) mergedPaths.add(relativePath);
          pathsByFolder.set(folderId, mergedPaths);
        }
        const changedPathCount = [...pathsByFolder.values()]
          .reduce((total, paths) => total + paths.size, 0);
        state.linkedChanges = changedPathCount > MAX_LINKED_WATCHER_CHANGED_FILES
          ? { kind: 'scope' }
          : { kind: 'files', pathsByFolder };
      }
    }
    // A native event is more specific than the periodic checkpoint. If both
    // arrive in one debounce window, retain the watcher reason so a changed
    // file is reconciled immediately instead of being fingerprint-only.
    if (reason === 'watcher' || !wasDirty) state.reason = reason;
    else if (state.reason !== 'watcher') state.reason = reason;
    // A refresh already owns the filesystem snapshot. The completion handler
    // schedules one trailing pass if another event arrived while it ran.
    if (state.promise) return;
    const scheduler = this.options.scheduler ?? DEFAULT_DEBOUNCE_SCHEDULER;
    try {
      if (state.timer !== undefined) scheduler.cancel(state.timer);
      state.timer = scheduler.schedule(() => {
        state.timer = undefined;
        if (!state.dirty || !this.openById.has(libraryId)) return;
        state.dirty = false;
        const refreshReason = state.reason;
        const triggerScope = state.triggerScope;
        const fullRefresh = state.fullRefreshRequested === true || refreshReason === 'network';
        const linkedFolderIds = fullRefresh
          ? undefined
          : [...(state.linkedFolderIds ?? [])];
        const linkedChanges = fullRefresh ? undefined : state.linkedChanges;
        state.reason = 'watcher';
        state.triggerScope = undefined;
        state.fullRefreshRequested = false;
        state.linkedFolderIds = undefined;
        state.linkedChanges = undefined;
        const refresh = this.runWatcherReconciliation(
          libraryId,
          refreshReason,
          triggerScope,
          linkedFolderIds?.length ? linkedFolderIds : undefined,
          linkedChanges?.kind === 'files' ? linkedChanges.pathsByFolder : undefined,
        );
        state.promise = refresh;
        return refresh.then(
          () => this.finishWatcherRefresh(libraryId, state),
          (error) => {
            if (!(error instanceof Error && error.name === 'AbortError')) {
              this.diagnose('asset-watcher.refresh', error, { libraryId });
            }
            this.finishWatcherRefresh(libraryId, state);
          },
        );
      }, this.options.debounceMs ?? 250);
    } catch (error) {
      state.timer = undefined;
      this.diagnose(String(diagnosticContext.scope ?? 'asset-watcher.schedule'), error, diagnosticContext);
      if (state.reason === 'network') {
        this.scheduleNetworkScan(libraryId, this.networkScanIntervalMs());
      }
      // Scheduler failures leave explicit/manual refresh available and must
      // never escape the native observer callback.
    }
  }

  public override finishWatcherRefresh(libraryId: string, state: WatchRefreshState): void {
    if (this.watchRefreshByLibrary.get(libraryId) !== state) return;
    state.promise = undefined;
    if (state.dirty && this.openById.has(libraryId)) {
      const fullRefresh = state.fullRefreshRequested === true || state.reason === 'network';
      const linkedFolderIds = fullRefresh ? undefined : [...(state.linkedFolderIds ?? [])];
      const linkedChanges = fullRefresh ? undefined : state.linkedChanges;
      this.scheduleWatcherRefresh(
        libraryId,
        {
          scope: state.triggerScope ?? 'asset-watcher.schedule',
          libraryId,
          ...(fullRefresh
            ? { fullRefresh: true }
            : linkedFolderIds?.length
              ? { linkedFolderIds }
              : {}),
        },
        state.reason,
        linkedChanges,
      );
      return;
    }
    if (this.openById.get(libraryId)?.summary.networkStorage) {
      this.scheduleNetworkScan(libraryId, this.networkScanIntervalMs());
    }
  }

  /**
   * Run the watcher pass through the same cancellable async discovery owner as
   * open reconciliation. A watcher never performs the old synchronous full
   * `refreshManagedAssets` call on the Worker event loop.
   */
  public override async runWatcherReconciliation(
    libraryId: string,
    reason: 'watcher' | 'network' = 'watcher',
    triggerScope?: string,
    linkedFolderIds?: string[],
    linkedFilePathsByFolder?: Map<string, Set<string>>,
  ): Promise<void> {
    const initialLibrary = this.openById.get(libraryId);
    if (!initialLibrary || initialLibrary.readOnly) return;
    const previous = this.reconciliationOwner.current(libraryId);
    if (previous) {
      try {
        await previous.promise;
      } catch (error) {
        if (!(error instanceof Error && error.name === 'AbortError')) {
          this.diagnose('asset-watcher.wait-for-reconciliation', error, { libraryId });
        }
      }
    }
    const openLibrary = this.openById.get(libraryId);
    if (!openLibrary || openLibrary !== initialLibrary || openLibrary.readOnly) return;

    const task = this.reconciliationOwner.register({
      libraryId,
      openLibrary,
      reason,
      ...(triggerScope === undefined ? {} : { triggerScope }),
      ...(linkedFolderIds === undefined ? {} : { linkedFolderIds }),
      ...(linkedFilePathsByFolder === undefined ? {} : { linkedFilePathsByFolder }),
    });
    task.promise = (async () => {
      try {
        await this.yieldReconciliation(task);
        if (reason === 'network') {
          await this.refreshNetworkMetadataCache(openLibrary, task, 'network');
        }
        await this.refreshManagedAssetsOnOpen(
          libraryId,
          task,
          reason === 'network' ? 'network-scan.refresh' : 'asset-watcher.refresh',
        );
      } catch (error) {
        // Closing a library deliberately aborts a watcher reconciliation before
        // awaiting it. Treat that cancellation as a settled task so close does
        // not leak an expected AbortError through the Worker IPC boundary.
        if (error instanceof Error && error.name === 'AbortError') return;
        throw error;
      }
    })();
    try {
      await task.promise;
    } finally {
      this.reconciliationOwner.clearIfCurrent(task);
    }
  }

  public override stopAssetWatcher(libraryId: string): void {
    const libraryWatch = this.watchByLibraryId.get(libraryId);
    this.watchByLibraryId.delete(libraryId);
    const state = this.watchRefreshByLibrary.get(libraryId);
    this.watchRefreshByLibrary.delete(libraryId);
    if (state?.timer !== undefined) {
      try {
        (this.options.scheduler ?? DEFAULT_DEBOUNCE_SCHEDULER).cancel(state.timer);
      } catch (error) {
        this.diagnose('asset-watcher.cancel', error, { libraryId });
        // Continue closing the observer and database.
      }
    }
    const networkScan = this.networkScanByLibrary.get(libraryId);
    this.networkScanByLibrary.delete(libraryId);
    if (networkScan?.timer !== undefined) {
      try {
        (this.options.scheduler ?? DEFAULT_DEBOUNCE_SCHEDULER).cancel(networkScan.timer);
      } catch (error) {
        this.diagnose('network-watcher.cancel', error, { libraryId });
      }
    }
    if (!libraryWatch) return;
    try {
      libraryWatch.observer.close();
    } catch (error) {
      this.diagnose('asset-watcher.close', error, { libraryId });
      // Closing the database is still required even if the native observer already failed.
    }
  }

  public override linkedWatchKey(libraryId: string, folderId: string): string {
    return `${libraryId}:${folderId}`;
  }

  public override startLinkedWatcher(
    openLibrary: OpenLibrary,
    folder: { folder_id: string; absolute_root_path: string },
  ): void {
    const libraryId = openLibrary.summary.libraryId;
    if (!this.watchRefreshByLibrary.has(libraryId)) {
      this.watchRefreshByLibrary.set(libraryId, { dirty: false, reason: 'watcher' });
    }
    const key = this.linkedWatchKey(libraryId, folder.folder_id);
    const existing = this.linkedWatchByKey.get(key);
    if (existing?.rootPath === folder.absolute_root_path) return;
    if (existing) this.stopLinkedWatcher(libraryId, folder.folder_id);
    if (this.linkedRootIsGone(folder.absolute_root_path)) return;

    const observerFactory = this.options.observerFactory ?? DEFAULT_ASSET_OBSERVER_FACTORY;
    try {
      const observer = observerFactory(
        folder.absolute_root_path,
        (event) => this.scheduleLinkedRefresh(libraryId, folder.folder_id, event),
        (error) => this.diagnose('linked-watcher.error', error, {
          libraryId,
          linkedFolderId: folder.folder_id,
          rootPath: folder.absolute_root_path,
        }),
      );
      this.linkedWatchByKey.set(key, {
        folderId: folder.folder_id,
        libraryId,
        observer,
        rootPath: folder.absolute_root_path,
      });
    } catch (error) {
      this.diagnose('linked-watcher.start', error, {
        libraryId,
        linkedFolderId: folder.folder_id,
        rootPath: folder.absolute_root_path,
      });
    }
  }

  public override scheduleLinkedRefresh(
    libraryId: string,
    folderId: string,
    event?: AssetObserverEvent,
  ): void {
    const key = this.linkedWatchKey(libraryId, folderId);
    const linkedWatch = this.linkedWatchByKey.get(key);
    if (!linkedWatch || !this.openById.has(libraryId)) return;
    const relativePath = event?.eventType === 'change'
      ? normalizeWatcherRelativePath(event.filename ?? null)
      : undefined;
    const linkedChanges: LinkedWatcherChanges = relativePath === undefined
      ? { kind: 'scope' }
      : {
          kind: 'files',
          pathsByFolder: new Map([[folderId, new Set([relativePath])]]),
        };
    this.scheduleWatcherRefresh(libraryId, {
      scope: 'linked-watcher.schedule',
      libraryId,
      linkedFolderId: folderId,
    }, 'watcher', linkedChanges);
  }

  public override stopLinkedWatcher(libraryId: string, folderId: string): void {
    const key = this.linkedWatchKey(libraryId, folderId);
    const linkedWatch = this.linkedWatchByKey.get(key);
    if (!linkedWatch) return;
    this.linkedWatchByKey.delete(key);
    try {
      linkedWatch.observer.close();
    } catch (error) {
      this.diagnose('linked-watcher.close', error, { libraryId, linkedFolderId: folderId });
    }
  }

  public override reconcileLinkedWatchers(openLibrary: OpenLibrary): void {
    const libraryId = openLibrary.summary.libraryId;
    const folders = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders
          WHERE library_id = ?`,
      )
      .all(libraryId) as Array<{
        folder_id: string;
        absolute_root_path: string;
        status: 'available' | 'offline';
      }>;
    const desired = new Map(
      folders
        .filter((folder) => folder.status === 'available' && !this.linkedRootIsGone(folder.absolute_root_path))
        .map((folder) => [this.linkedWatchKey(libraryId, folder.folder_id), folder]),
    );

    for (const [key, linkedWatch] of this.linkedWatchByKey) {
      if (linkedWatch.libraryId !== libraryId) continue;
      const folder = desired.get(key);
      if (!folder || folder.absolute_root_path !== linkedWatch.rootPath) {
        this.stopLinkedWatcher(libraryId, linkedWatch.folderId);
      }
    }
    for (const folder of desired.values()) this.startLinkedWatcher(openLibrary, folder);
  }

  public override stopLinkedWatchers(libraryId: string): void {
    for (const linkedWatch of [...this.linkedWatchByKey.values()]) {
      if (linkedWatch.libraryId === libraryId) {
        this.stopLinkedWatcher(libraryId, linkedWatch.folderId);
      }
    }
  }

  /**
   * True when materializing .serpentignore would delete or insert a row.
   * Reads only: a no-op write transaction drops the network metadata snapshot
   * and advances browse_change_sequence.
   */
  public override gitignoreMaterializationHasWork(
    openLibrary: OpenLibrary,
    rules: ReturnType<typeof parseGitignore>,
  ): boolean {
    const managedExplicitCount = Number((openLibrary.connection.prepare(
      "SELECT COUNT(*) AS count FROM explicit_ignored_paths WHERE location_kind = 'managed'",
    ).get() as { count: number } | undefined)?.count ?? 0);
    const gitignoreCount = Number((openLibrary.connection.prepare(
      'SELECT COUNT(*) AS count FROM gitignore_ignored_paths',
    ).get() as { count: number } | undefined)?.count ?? 0);
    const linkedFolderCount = hasTable(openLibrary.connection, 'linked_folders')
      ? Number((openLibrary.connection.prepare(
          'SELECT COUNT(*) AS count FROM linked_folders WHERE library_id = ?',
        ).get(openLibrary.summary.libraryId) as { count: number } | undefined)?.count ?? 0)
      : 0;
    if (managedExplicitCount > 0 || gitignoreCount > 0 || linkedFolderCount > 0) return true;
    const folders = openLibrary.connection.prepare(
      'SELECT relative_path FROM managed_folders',
    ).all() as Array<{ relative_path: string }>;
    const assets = openLibrary.connection.prepare(
      "SELECT relative_file_path FROM assets WHERE location_kind = 'managed' AND deleted_at IS NULL",
    ).all() as Array<{ relative_file_path: string }>;
    return folders.some((folder) => gitignoreMatchesPath(rules, folder.relative_path, 'folder'))
      || assets.some((asset) => gitignoreMatchesPath(rules, asset.relative_file_path, 'asset'));
  }

  public override syncGitignore(openLibrary: OpenLibrary, text = readGitignoreText(openLibrary.summary.libraryPath)): void {
    if (openLibrary.readOnly || (text === openLibrary.gitignoreText && openLibrary.gitignoreMaterialized)) return;
    // Libraries created before ignore actions became file-backed may still
    // have managed rows in explicit_ignored_paths.  Convert those rows before
    // clearing the legacy mirror so opening an old library never silently
    // reveals assets the user had hidden.
    const migratedText = !openLibrary.gitignoreMaterialized
      ? this.migrateLegacyManagedIgnoreRules(openLibrary, text)
      : text;
    if (migratedText !== text) {
      try {
        writeFileSync(gitignorePath(openLibrary.summary.libraryPath), migratedText, 'utf8');
      } catch (error) {
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
      }
      this.noteClientFilesystemMutation();
    }
    const rules = parseGitignore(migratedText);
    // Keep discovery and the materialized table on the same rule snapshot.
    // Discovery can see a file before it has a database row, so it must not
    // rely on gitignore_ignored_paths alone.
    openLibrary.gitignoreMatcher = rules;
    // Serpent-verg review fix: libraries predating the ignore-rule tables
    // have no gitignore state to sync.
    if (
      !hasTable(openLibrary.connection, 'explicit_ignored_paths') ||
      !hasTable(openLibrary.connection, 'gitignore_ignored_paths')
    ) {
      return;
    }
    // An empty materialization still opens a write transaction. That
    // invalidates a network metadata snapshot and bumps browse_change_sequence
    // even when no ignore row changes, so skip it when there is nothing to write.
    if (!this.gitignoreMaterializationHasWork(openLibrary, rules)) {
      openLibrary.gitignoreText = migratedText;
      openLibrary.gitignoreMaterialized = true;
      return;
    }
    const transaction = openLibrary.connection.transaction(() => {
      // Managed ignore state is file-backed. Older versions also mirrored
      // managed rules into explicit_ignored_paths; clear those stale rows
      // before materializing the current .serpentignore contents so removing
      // a rule immediately restores the affected assets.
      openLibrary.connection
        .prepare("DELETE FROM explicit_ignored_paths WHERE location_kind = 'managed'")
        .run();
      openLibrary.connection.prepare('DELETE FROM gitignore_ignored_paths').run();
      const insert = openLibrary.connection.prepare(
        'INSERT OR IGNORE INTO gitignore_ignored_paths(relative_path, path_kind) VALUES (?, ?)',
      );
      const folders = openLibrary.connection
        .prepare('SELECT relative_path FROM managed_folders')
        .all() as Array<{ relative_path: string }>;
      const assets = openLibrary.connection
        .prepare("SELECT relative_file_path FROM assets WHERE location_kind = 'managed' AND deleted_at IS NULL")
        .all() as Array<{ relative_file_path: string }>;
      for (const folder of folders) {
        if (gitignoreMatchesPath(rules, folder.relative_path, 'folder')) {
          insert.run(folder.relative_path, 'folder');
        }
      }
      for (const asset of assets) {
        if (gitignoreMatchesPath(rules, asset.relative_file_path, 'asset')) {
          insert.run(asset.relative_file_path, 'asset');
        }
      }
      this.syncLinkedGitignoreHiddenAssets(openLibrary);
    });
    transaction();
    openLibrary.gitignoreText = migratedText;
    openLibrary.gitignoreMaterialized = true;
    // Empty linked directories (for example `1Test/.111`) have no managed_folders
    // row and no asset to write into linked_ignored_assets. Without this, the
    // navigation summary cache keeps showing those folders after `.*/` or a
    // right-click ignore (Serpent-c6d907).
    this.invalidateNavigationSummary(openLibrary);
    this.rebindCurrentNetworkMetadataCache(openLibrary);
  }

  public override invalidateNavigationSummary(openLibrary: OpenLibrary): void {
    openLibrary.navigationSummaryCache = undefined;
    openLibrary.folderCoverIndexCache = undefined;
    if (!hasTable(openLibrary.connection, 'browse_change_sequence')) return;
    openLibrary.connection.prepare(
      'UPDATE browse_change_sequence SET sequence = sequence + 1 WHERE library_id = ?',
    ).run(openLibrary.summary.libraryId);
  }

  /**
   * Serpent-c6d907: `.serpentignore` is the single ignore file. Linked assets
   * that match it are folded into `linked_ignored_assets` so browse/search SQL
   * hides them the same way linked-folder default rules already do. Default
   * `.git` / `node_modules` rules stay in `linked_folder_rules` and still win
   * here; removing a gitignore rule must not un-hide those.
   */
  public override syncLinkedGitignoreHiddenAssets(openLibrary: OpenLibrary): void {
    if (
      !hasTable(openLibrary.connection, 'linked_ignored_assets') ||
      !hasTable(openLibrary.connection, 'linked_folders')
    ) {
      return;
    }
    const now = new Date().toISOString();
    const hide = openLibrary.connection.prepare(
      'INSERT OR REPLACE INTO linked_ignored_assets(asset_id, ignored_at) VALUES (?, ?)',
    );
    const reveal = openLibrary.connection.prepare(
      'DELETE FROM linked_ignored_assets WHERE asset_id = ?',
    );
    const folders = openLibrary.connection
      .prepare('SELECT folder_id FROM linked_folders WHERE library_id = ?')
      .all(openLibrary.summary.libraryId) as Array<{ folder_id: string }>;
    const hasLinkedRules = hasTable(openLibrary.connection, 'linked_folder_rules');
    const loadRules = hasLinkedRules
      ? openLibrary.connection.prepare(
        `SELECT rule_id, action, target, pattern, enabled
           FROM linked_folder_rules WHERE folder_id = ? ORDER BY position`,
      )
      : null;
    for (const folder of folders) {
      const rules = loadRules
        ? (loadRules.all(folder.folder_id) as Array<{
          rule_id: string;
          action: 'include' | 'exclude';
          target: LinkedFolderRule['target'];
          pattern: string;
          enabled: number;
        }>).map((row) => ({
          ruleId: row.rule_id,
          action: row.action,
          target: row.target,
          pattern: row.pattern,
          enabled: row.enabled === 1,
        }))
        : [];
      const assets = openLibrary.connection.prepare(
        `SELECT a.asset_id, a.relative_file_path,
                EXISTS(SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id) AS ignored
           FROM assets a
          WHERE a.linked_folder_id = ? AND a.location_kind = 'linked' AND a.deleted_at IS NULL`,
      ).all(folder.folder_id) as Array<{
        asset_id: string;
        relative_file_path: string;
        ignored: number;
      }>;
      for (const asset of assets) {
        const ignored = this.linkedPathIsIgnored(asset.relative_file_path, rules)
          || this.isExplicitlyIgnored(
            openLibrary,
            'linked',
            folder.folder_id,
            asset.relative_file_path,
            'asset',
          );
        if (ignored && asset.ignored === 0) hide.run(asset.asset_id, now);
        else if (!ignored && asset.ignored === 1) reveal.run(asset.asset_id);
      }
    }
  }

  public override migrateLegacyManagedIgnoreRules(openLibrary: OpenLibrary, text: string): string {
    if (!hasTable(openLibrary.connection, 'explicit_ignored_paths')) return text;
    const legacyRows = openLibrary.connection
      .prepare(
        `SELECT relative_path, path_kind
           FROM explicit_ignored_paths
          WHERE location_kind = 'managed' AND linked_folder_id = ''
            AND path_kind IN ('asset', 'folder', 'extension')
          ORDER BY ignored_at, relative_path, path_kind`,
      )
      .all() as Array<{
        relative_path: string;
        path_kind: 'asset' | 'folder' | 'extension';
      }>;
    if (legacyRows.length === 0) return text;

    const lines = text.split(/\r?\n/u);
    const existing = new Set(lines.map((line) => line.trimEnd()));
    let changed = false;
    for (const row of legacyRows) {
      let rule: string | undefined;
      try {
        rule = this.managedGitignoreRule(row.relative_path, row.path_kind);
      } catch {
        // A malformed legacy row must not prevent the rest of the library
        // from opening; valid rows are still promoted to the config file.
        continue;
      }
      if (rule === undefined || existing.has(rule)) continue;
      while (lines.at(-1) === '') lines.pop();
      lines.push(rule);
      existing.add(rule);
      changed = true;
    }
    return changed ? `${lines.join('\n')}\n` : text;
  }


  override reconcileLinkedWatchersForLibrary(libraryId: string): void {
    this.reconcileLinkedWatchers(this.requireOpenLibrary(libraryId));
  }
}
