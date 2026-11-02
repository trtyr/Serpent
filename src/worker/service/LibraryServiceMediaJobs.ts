/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { MediaJobKind, MediaJobStatus, OpenLibrary} from '../library-service-internals';
import { JOB_SUMMARY_CACHE_ENABLED, MEDIA_JOB_KINDS, buildFileName, logMediaJobSummaryEvent } from '../library-service-internals';
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
import { LibraryServiceAi } from './LibraryServiceAi';

/** LibraryServiceMediaJobs: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceMediaJobs extends LibraryServiceAi {

  // ── AI Job Queue Management ──────────────────────────────────────

  /**
   * Pause AI analysis jobs. If no jobIds provided, pauses all
   * queued/running AI jobs for the library.
   */
  override pauseJobs(
    libraryId: string,
    jobIds?: string[],
  ): { pausedCount: number } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const result = this.updateJobStatus(
      openLibrary.connection,
      openLibrary.summary.libraryId,
      ['queued', 'running'],
      'paused',
      jobIds,
    );
    return { pausedCount: result.count };
  }

  /**
   * Resume paused AI jobs.
   */
  override resumeJobs(
    libraryId: string,
    jobIds?: string[],
  ): { resumedCount: number } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const result = this.updateJobStatus(
      openLibrary.connection,
      openLibrary.summary.libraryId,
      ['paused'],
      'queued',
      jobIds,
    );
    return { resumedCount: result.count };
  }

  /**
   * Cancel AI analysis jobs. If no jobIds provided, cancels all
   * queued/paused/running AI jobs for the library.
   */
  override cancelJobs(
    libraryId: string,
    jobIds?: string[],
  ): { cancelledCount: number } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // ADR-0028: a SQLite-readonly handle cannot accept job-status writes.
    // Closing or switching away from a read-only library must still succeed.
    if (openLibrary.readOnly) return { cancelledCount: 0 };
    const result = this.updateJobStatus(
      openLibrary.connection,
      openLibrary.summary.libraryId,
      ['queued', 'paused', 'running'],
      'cancelled',
      jobIds,
    );
    return { cancelledCount: result.count };
  }

  /**
   * Retry failed AI analysis jobs. Resets attempt_count and re-enqueues.
   */
  override retryJobs(
    libraryId: string,
    jobIds: string[],
  ): { retriedCount: number } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const libId = openLibrary.summary.libraryId;

    const retriedCount = sqliteRunInChunks({
      connection: openLibrary.connection,
      values: jobIds,
      buildSql: (placeholders) =>
        `UPDATE jobs
            SET status = 'queued',
                attempt_count = 0,
                error_code = NULL,
                error_detail = NULL,
                updated_at = ?
          WHERE library_id = ?
            AND kind IN ('ai.image.analysis', 'ai.video.analysis')
            AND status = 'failed'
            AND job_id IN (${placeholders})`,
      bind: (chunk) => [new Date().toISOString(), libId, ...chunk],
    });

    return { retriedCount };
  }

  /** List all AI jobs for a library with counts by status. */
  override getAiJobStatus(libraryId: string, jobIds?: string[]): {
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
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const conn = openLibrary.connection;
    const libId = openLibrary.summary.libraryId;

    type AiJobRow = {
      job_id: string;
      asset_id: string;
      asset_name: string | null;
      kind: 'ai.image.analysis' | 'ai.video.analysis';
      status: 'queued' | 'running' | 'paused' | 'succeeded' | 'failed' | 'cancelled';
      error_code: string | null;
      error_detail: string | null;
      updated_at: string;
    };
    const statusMap: Record<string, number> = {};
    let jobs: AiJobRow[];

    if (jobIds && jobIds.length > 0) {
      // SQLite binds only a limited number of values per statement. Chunking
      // keeps large user selections exact instead of silently truncating them.
      const requestedJobIds = [...new Set(jobIds)];
      const rows: AiJobRow[] = [];
      for (let index = 0; index < requestedJobIds.length; index += 900) {
        const chunk = requestedJobIds.slice(index, index + 900);
        rows.push(...conn
          .prepare(
            `SELECT j.job_id, j.asset_id, a.relative_file_path AS asset_name, j.kind, j.status,
                    j.error_code, j.error_detail, j.updated_at
               FROM jobs j
               LEFT JOIN assets a ON a.asset_id = j.asset_id
              WHERE j.library_id = ?
                AND j.kind IN ('ai.image.analysis', 'ai.video.analysis')
                AND j.job_id IN (${sqliteInPlaceholders(chunk)})`,
          )
          .all(libId, ...chunk) as AiJobRow[]);
      }
      jobs = rows;
      for (const job of jobs) statusMap[job.status] = (statusMap[job.status] ?? 0) + 1;
    } else {
      const counts = conn
        .prepare(
          `SELECT status, COUNT(*) as cnt
             FROM jobs j
             LEFT JOIN assets a ON a.asset_id = j.asset_id
            WHERE j.library_id = ?
              AND j.kind IN ('ai.image.analysis', 'ai.video.analysis')
              AND (j.error_code IS NULL OR j.error_code <> 'ASSET_IGNORED')
              AND (j.asset_id IS NULL OR ${this.explicitIgnoreSql(conn, 'a')})
            GROUP BY status`,
        )
        .all(libId) as Array<{ status: string; cnt: number }>;
      for (const count of counts) statusMap[count.status] = count.cnt;
      jobs = conn
        .prepare(
          `SELECT j.job_id, j.asset_id, a.relative_file_path AS asset_name, j.kind, j.status,
                  j.error_code, j.error_detail, j.updated_at
             FROM jobs j
             LEFT JOIN assets a ON a.asset_id = j.asset_id
            WHERE j.library_id = ?
              AND j.kind IN ('ai.image.analysis', 'ai.video.analysis')
              AND (j.error_code IS NULL OR j.error_code <> 'ASSET_IGNORED')
              AND (j.asset_id IS NULL OR ${this.explicitIgnoreSql(conn, 'a')})
            ORDER BY j.created_at DESC
            LIMIT 200`,
        )
        .all(libId) as AiJobRow[];
    }

    return {
      queued: statusMap['queued'] ?? 0,
      running: statusMap['running'] ?? 0,
      succeeded: statusMap['succeeded'] ?? 0,
      failed: statusMap['failed'] ?? 0,
      paused: statusMap['paused'] ?? 0,
      cancelled: statusMap['cancelled'] ?? 0,
      jobs: jobs.map((j) => ({
        jobId: j.job_id,
        assetId: j.asset_id,
        assetName: j.asset_name ? buildFileName(j.asset_name) : null,
        kind: j.kind,
        status: j.status,
        errorCode: j.error_code,
        errorDetail: j.error_detail,
        updatedAt: j.updated_at,
      })),
    };
  }

  private updateJobStatus(
    conn: { prepare(sql: string): { run(...params: unknown[]): { changes: number }; get(...params: unknown[]): unknown; all(...params: unknown[]): unknown[] } },
    libId: string,
    fromStatuses: string[],
    toStatus: string,
    jobIds?: string[],
  ): { count: number } {
    const statusPlaceholders = fromStatuses.map(() => '?').join(',');
    const aiKinds = ['ai.image.analysis', 'ai.video.analysis'];
    const now = new Date().toISOString();

    if (jobIds && jobIds.length > 0) {
      return {
        count: sqliteRunInChunks({
          connection: conn,
          values: jobIds,
          buildSql: (placeholders) =>
            `UPDATE jobs
                SET status = ?, updated_at = ?
              WHERE library_id = ?
                AND kind IN (?, ?)
                AND status IN (${statusPlaceholders})
                AND job_id IN (${placeholders})`,
          bind: (chunk) => [toStatus, now, libId, ...aiKinds, ...fromStatuses, ...chunk],
        }),
      };
    }
    const query = `UPDATE jobs
                 SET status = ?, updated_at = ?
               WHERE library_id = ?
                 AND kind IN (?, ?)
                 AND status IN (${statusPlaceholders})`;
    const params = [toStatus, now, libId, ...aiKinds, ...fromStatuses];
    const result = conn.prepare(query).run(...params);
    return { count: result.changes as number };
  }

  // ── Media Job Queue Management ────────────────────────────────────

  override enqueuePluginJob(input: {
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
  }): PluginJobRecord {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.ownerLibraryId === '__serpent_global_runtime__'
      || input.ownerLibraryId !== openLibrary.summary.libraryId) {
      throw new Error('Plugin job owner library must be the concrete open library.');
    }
    return enqueuePluginJobRecord(openLibrary.connection, {
      libraryId: openLibrary.summary.libraryId,
      ownerPluginId: input.ownerPluginId,
      ownerPackageHash: input.ownerPackageHash,
      ownerPluginInstanceId: input.ownerPluginInstanceId,
      ownerScope: input.ownerScope,
      ownerLibraryId: input.ownerLibraryId,
      applicationSessionId: this.applicationSessionId,
      pluginHandlerId: input.pluginHandlerId,
      payload: input.payload,
      recoveryStrategy: input.recoveryStrategy,
      priority: input.priority,
    });
  }

  override listPluginJobs(libraryId: string): PluginJobRecord[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return listPluginJobRecords(openLibrary.connection, openLibrary.summary.libraryId);
  }

  override claimNextPluginJob(input: {
    libraryId: string;
    ownerPluginId: string;
    ownerPackageHash: string;
    ownerPluginInstanceId: string;
    ownerScope: 'library' | 'global';
    ownerLibraryId: string;
  }): PluginJobRecord | null {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.ownerLibraryId === '__serpent_global_runtime__'
      || input.ownerLibraryId !== openLibrary.summary.libraryId) {
      throw new Error('Plugin job owner library must be the concrete open library.');
    }
    return claimNextPluginJobRecord(openLibrary.connection, {
      libraryId: openLibrary.summary.libraryId,
      ownerPluginId: input.ownerPluginId,
      ownerPackageHash: input.ownerPackageHash,
      ownerPluginInstanceId: input.ownerPluginInstanceId,
      ownerScope: input.ownerScope,
      ownerLibraryId: input.ownerLibraryId,
    });
  }

  override completePluginJob(input: {
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
  }): PluginJobRecord | null {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    return completePluginJobRecord(openLibrary.connection, {
      jobId: input.jobId,
      owner: {
        pluginId: input.ownerPluginId,
        packageHash: input.ownerPackageHash,
        pluginInstanceId: input.ownerPluginInstanceId,
        scope: input.ownerScope,
        libraryId: input.ownerLibraryId,
      },
      status: input.status,
      errorCode: input.errorCode,
      errorDetail: input.errorDetail,
      progress: input.progress,
      completed: input.completed,
      total: input.total,
      phase: input.phase,
      message: input.message,
      itemResults: input.itemResults,
      failedAssetIds: input.failedAssetIds,
      retryInput: input.retryInput,
      checkpoint: input.checkpoint,
    });
  }

  override controlPluginJob(input: {
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
  }): PluginJobRecord | null {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.ownerLibraryId === '__serpent_global_runtime__'
      || input.ownerLibraryId !== openLibrary.summary.libraryId) {
      throw new Error('Plugin job owner library must be the concrete open library.');
    }
    const owner = {
      pluginId: input.ownerPluginId,
      packageHash: input.ownerPackageHash,
      pluginInstanceId: input.ownerPluginInstanceId,
      scope: input.ownerScope,
      libraryId: input.ownerLibraryId,
    } as const;
    switch (input.action) {
      case 'cancel':
        return cancelPluginJobRecord(openLibrary.connection, { jobId: input.jobId, owner, reason: input.reason });
      case 'pause':
        if (input.capabilities === undefined || input.checkpoint === undefined) {
          throw new Error('Pausing a plugin job requires handler capabilities and a checkpoint.');
        }
        return pausePluginJobRecord(openLibrary.connection, {
          jobId: input.jobId,
          owner,
          capabilities: input.capabilities,
          checkpoint: input.checkpoint,
        });
      case 'resume':
        if (input.capabilities === undefined) {
          throw new Error('Resuming a plugin job requires handler capabilities.');
        }
        return resumePluginJobRecord(openLibrary.connection, {
          jobId: input.jobId,
          owner,
          capabilities: input.capabilities,
        });
      case 'retry':
        return retryPluginJobRecord(openLibrary.connection, {
          jobId: input.jobId,
          owner,
          retryInput: input.retryInput,
          applicationSessionId: this.applicationSessionId,
        });
    }
  }

  override reportPluginJobProgress(input: {
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
  }): PluginJobRecord | null {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.ownerLibraryId === '__serpent_global_runtime__'
      || input.ownerLibraryId !== openLibrary.summary.libraryId) {
      throw new Error('Plugin job owner library must be the concrete open library.');
    }
    return reportPluginJobProgress(openLibrary.connection, {
      jobId: input.jobId,
      ownerPluginId: input.ownerPluginId,
      ownerPackageHash: input.ownerPackageHash,
      ownerPluginInstanceId: input.ownerPluginInstanceId,
      ownerScope: input.ownerScope,
      ownerLibraryId: input.ownerLibraryId,
      progress: {
        completed: input.completed,
        total: input.total,
        phase: input.phase,
        message: input.message,
        ...(input.progress === undefined ? {} : { progress: input.progress }),
      },
    });
  }

  override pausePluginJobsForOwners(input: {
    libraryId: string;
    owners: ReadonlyArray<{ pluginId: string; packageHash?: string }>;
    errorCode?: string;
    errorDetail?: string;
  }): number {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    return pausePluginJobRowsForOwners(openLibrary.connection, {
      libraryId: openLibrary.summary.libraryId,
      owners: input.owners,
      errorCode: input.errorCode ?? 'PLUGIN_UNAVAILABLE',
      errorDetail: input.errorDetail
        ?? 'The owning plugin is missing, disabled, or incompatible on this device.',
    });
  }

  override materializePluginDerivedFields(input: {
    libraryId: string;
    pluginId: string;
    packageHash: string;
    fieldId: string;
    fieldType: PluginProviderFieldType;
    values: ReadonlyArray<{ assetId: string; value: string | number | boolean | null }>;
  }): { writtenCount: number; fieldKey: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    return materializePluginDerivedFieldRows(openLibrary.connection, {
      ...input,
      libraryId: openLibrary.summary.libraryId,
    });
  }

  override queryPluginDerivedFields(input: {
    libraryId: string;
    pluginId: string;
    packageHash: string;
    fieldId: string;
    operator: 'equals' | 'contains' | 'gt' | 'gte' | 'lt' | 'lte';
    value: string | number | boolean | null;
    limit?: number;
    offset?: number;
  }): { assetIds: string[]; total: number } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    return queryPluginDerivedFieldRows(openLibrary.connection, {
      ...input,
      libraryId: openLibrary.summary.libraryId,
    });
  }

  /**
   * 摘要内存缓存的有效性 token = 库变更序号 + 忽略规则序号。计数表路径不再做
   * 忽略路径 JOIN，token 仍保留给 GROUP BY 回退路径：忽略规则变化时不得继续
   * 使用带可见性过滤的陈旧 GROUP BY 结果。读路径不抛错。
   */
  public override mediaJobSummaryToken(openLibrary: OpenLibrary): string | null {
    try {
      const libraryRow = openLibrary.connection
        .prepare('SELECT sequence FROM library_change_sequence WHERE library_id = ?')
        .get(openLibrary.summary.libraryId) as { sequence: number } | undefined;
      const ignoreRow = openLibrary.connection
        .prepare('SELECT sequence FROM browse_change_sequence WHERE library_id = ?')
        .get(openLibrary.summary.libraryId) as { sequence: number } | undefined;
      if (
        !libraryRow || !Number.isSafeInteger(libraryRow.sequence)
        || !ignoreRow || !Number.isSafeInteger(ignoreRow.sequence)
      ) {
        return null;
      }
      return `${libraryRow.sequence}:${ignoreRow.sequence}`;
    } catch {
      return null;
    }
  }

  public override hasMediaJobStatusCountsTable(openLibrary: OpenLibrary): boolean {
    return columnsFor(openLibrary.connection, 'media_job_status_counts').has('count');
  }

  public override readMediaJobStatusCountsTable(openLibrary: OpenLibrary): ReturnType<typeof mediaJobCountsFromRows> {
    const rows = openLibrary.connection.prepare(
      'SELECT status, count FROM media_job_status_counts WHERE library_id = ?',
    ).all(openLibrary.summary.libraryId) as Array<{ status: string; count: number }>;
    return mediaJobCountsFromRows(rows);
  }

  override hasQueuedPrimaryPreviewJobs(libraryId: string): boolean {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return openLibrary.connection.prepare(
      `SELECT 1 FROM jobs
        WHERE library_id = ? AND status = 'queued'
          AND kind IN ('generate_thumbnail', 'generate_video_poster')
        LIMIT 1`,
    ).get(libraryId) !== undefined;
  }

  override listMediaJobs(libraryId: string, options: {
    summaryOnly?: boolean;
    cursor?: MediaJobListCursor;
    limit?: number;
  } = {}): {
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
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const kindPlaceholders = MEDIA_JOB_KINDS.map(() => '?').join(',');
    // Ignored assets are outside the user's working set.  Do not surface
    // stale rows that were queued before an ignore rule was added (or that
    // were cancelled by the claim-time guard) in the task panel.  The rows
    // stay in SQLite for diagnostics, but they are not actionable media work.
    const visibleJobFilter = `
          AND (j.error_code IS NULL OR j.error_code NOT IN ('ASSET_IGNORED', 'SEQUENCE_MEMBER'))
          AND (j.asset_id IS NULL OR ${this.explicitIgnoreSql(openLibrary.connection, 'a')})`;
    const summaryToken = this.mediaJobSummaryToken(openLibrary);
    const tableCounts = JOB_SUMMARY_CACHE_ENABLED && this.hasMediaJobStatusCountsTable(openLibrary)
      ? this.readMediaJobStatusCountsTable(openLibrary)
      : null;
    let folded = tableCounts;
    if (folded !== null) {
      logMediaJobSummaryEvent({
        source: 'table',
        totalJobs: mediaJobCountTotal(folded),
        epoch: summaryToken ?? 'unavailable',
      });
    } else {
      const summaryRead = JOB_SUMMARY_CACHE_ENABLED && summaryToken !== null
        ? this.mediaJobSummaryCache.read(openLibrary.summary.libraryId, summaryToken)
        : { counts: null, source: 'miss' as const, ageMs: 0, totalJobs: 0 };
      if (summaryRead.counts === null) {
        const countRows = openLibrary.connection.prepare(
          `SELECT status, COUNT(*) AS count FROM jobs
            LEFT JOIN assets a ON a.asset_id = jobs.asset_id
            WHERE jobs.library_id = ? AND jobs.kind IN (${kindPlaceholders})
              AND (jobs.error_code IS NULL OR jobs.error_code NOT IN ('ASSET_IGNORED', 'SEQUENCE_MEMBER'))
              AND (jobs.asset_id IS NULL OR ${this.explicitIgnoreSql(openLibrary.connection, 'a')})
            GROUP BY status`,
        ).all(openLibrary.summary.libraryId, ...MEDIA_JOB_KINDS) as Array<{
          status: string;
          count: number;
        }>;
        folded = mediaJobCountsFromRows(countRows);
        if (summaryToken !== null) {
          this.mediaJobSummaryCache.store(
            openLibrary.summary.libraryId,
            summaryToken,
            folded,
            mediaJobCountTotal(folded),
          );
        }
        logMediaJobSummaryEvent({
          source: summaryToken === null ? 'rebuild-uncached' : 'rebuild',
          totalJobs: mediaJobCountTotal(folded),
          epoch: summaryToken ?? 'unavailable',
        });
      } else {
        folded = summaryRead.counts;
        logMediaJobSummaryEvent({
          source: summaryRead.source,
          ageMs: Math.round(summaryRead.ageMs),
          totalJobs: summaryRead.totalJobs,
        });
      }
    }
    const pageLimit = clampMediaJobListLimit(options.limit);
    const cursorCreatedAt = options.cursor?.createdAt ?? null;
    const cursorJobId = options.cursor?.jobId ?? null;
    const rawRows = options.summaryOnly
      ? []
      : openLibrary.connection.prepare(
        `SELECT j.job_id, j.asset_id, a.relative_file_path AS asset_name, j.revision_id, j.kind, j.status, j.progress,
                 j.attempt_count, j.error_code, j.error_detail, j.created_at, j.updated_at
            FROM jobs j
            LEFT JOIN assets a ON a.asset_id = j.asset_id
           WHERE j.library_id = ? AND j.kind IN (${kindPlaceholders})
             ${visibleJobFilter}
             AND (? IS NULL OR j.created_at < ? OR (j.created_at = ? AND j.job_id < ?))
           ORDER BY j.created_at DESC, j.job_id DESC
           LIMIT ?`,
      ).all(
        openLibrary.summary.libraryId,
        ...MEDIA_JOB_KINDS,
        cursorCreatedAt,
        cursorCreatedAt,
        cursorCreatedAt,
        cursorJobId,
        pageLimit + 1,
      ) as Array<{
        job_id: string;
        asset_id: string;
        asset_name: string | null;
        revision_id: string | null;
        kind: MediaJobKind;
        status: MediaJobStatus;
        progress: number;
        attempt_count: number;
        error_code: string | null;
        error_detail: string | null;
        created_at: string;
        updated_at: string;
      }>;
    const mapped = rawRows.map((row) => ({
      jobId: row.job_id,
      assetId: row.asset_id,
      assetName: row.asset_name ? buildFileName(row.asset_name) : null,
      revisionId: row.revision_id,
      kind: row.kind,
      status: row.status,
      progress: row.progress,
      attemptCount: row.attempt_count,
      errorCode: row.error_code,
      errorDetail: row.error_detail,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
    const paged = options.summaryOnly
      ? { page: mapped, nextCursor: null, hasMore: false }
      : sliceMediaJobListPage(mapped, pageLimit);
    return {
      ...folded,
      nextCursor: paged.nextCursor,
      hasMore: paged.hasMore,
      jobs: paged.page,
    };
  }

  override pauseMediaJobs(libraryId: string, jobIds?: string[]): { pausedCount: number } {
    const count = this.updateMediaJobStatus(libraryId, ['queued', 'running'], 'paused', jobIds);
    if (count > 0) this.mediaJobSummaryCache.invalidate(libraryId);
    this.abortActiveMediaJobs(libraryId, jobIds);
    return { pausedCount: count };
  }

  override resumeMediaJobs(libraryId: string, jobIds?: string[]): { resumedCount: number } {
    const count = this.updateMediaJobStatus(libraryId, ['paused'], 'queued', jobIds);
    if (count > 0) this.mediaJobSummaryCache.invalidate(libraryId);
    return { resumedCount: count };
  }

  override cancelMediaJobs(libraryId: string, jobIds?: string[]): { cancelledCount: number } {
    const count = this.updateMediaJobStatus(
      libraryId,
      ['queued', 'paused', 'running'],
      'cancelled',
      jobIds,
    );
    if (count > 0) this.mediaJobSummaryCache.invalidate(libraryId);
    this.abortActiveMediaJobs(libraryId, jobIds);
    return { cancelledCount: count };
  }

  override retryMediaJobs(libraryId: string, jobIds: string[]): { retriedCount: number } {
    if (jobIds.length === 0) return { retriedCount: 0 };
    const openLibrary = this.requireOpenLibrary(libraryId);
    const retriedCount = sqliteRunInChunks({
      connection: openLibrary.connection,
      values: jobIds,
      buildSql: (placeholders) =>
        `UPDATE jobs SET status = 'queued', progress = 0.0, attempt_count = 0,
                error_code = CASE
                  WHEN error_code = '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
                  THEN '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
                  ELSE NULL
                END,
                error_detail = NULL, updated_at = ?
          WHERE library_id = ?
            AND kind IN (${MEDIA_JOB_KINDS.map(() => '?').join(',')})
            AND status = 'failed'
            AND job_id IN (${placeholders})`,
      bind: (chunk) => [
        new Date().toISOString(),
        openLibrary.summary.libraryId,
        ...MEDIA_JOB_KINDS,
        ...chunk,
      ],
    });
    if (retriedCount > 0) this.mediaJobSummaryCache.invalidate(libraryId);
    return { retriedCount };
  }

  public override updateMediaJobStatus(
    libraryId: string,
    fromStatuses: string[],
    toStatus: 'paused' | 'queued' | 'cancelled',
    jobIds?: string[],
  ): number {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const selectedIds = jobIds && jobIds.length > 0 ? [...new Set(jobIds)] : undefined;
    if (selectedIds === undefined) {
      return openLibrary.connection.prepare(
        `UPDATE jobs SET status = ?, progress = 0.0, updated_at = ?
          WHERE library_id = ?
            AND kind IN (${MEDIA_JOB_KINDS.map(() => '?').join(',')})
            AND status IN (${fromStatuses.map(() => '?').join(',')})`,
      ).run(
        toStatus,
        new Date().toISOString(),
        openLibrary.summary.libraryId,
        ...MEDIA_JOB_KINDS,
        ...fromStatuses,
      ).changes;
    }
    return sqliteRunInChunks({
      connection: openLibrary.connection,
      values: selectedIds,
      buildSql: (placeholders) =>
        `UPDATE jobs SET status = ?, progress = 0.0, updated_at = ?
          WHERE library_id = ?
            AND kind IN (${MEDIA_JOB_KINDS.map(() => '?').join(',')})
            AND status IN (${fromStatuses.map(() => '?').join(',')})
            AND job_id IN (${placeholders})`,
      bind: (chunk) => [
        toStatus,
        new Date().toISOString(),
        openLibrary.summary.libraryId,
        ...MEDIA_JOB_KINDS,
        ...fromStatuses,
        ...chunk,
      ],
    });
  }

  public override abortActiveMediaJobs(libraryId: string, jobIds?: string[]): void {
    const selected = jobIds ? new Set(jobIds) : undefined;
    for (const [jobId, active] of this.activeMediaJobs) {
      if (active.libraryId !== libraryId || (selected && !selected.has(jobId))) continue;
      active.controller.abort();
    }
  }

  /**
   * Serpent-4bdd26 收编 codex/large-library-performance@15f3325c：新视口使正在为
   * 旧视口或 startup 回填解码的任务过时。把视口外的 running 预览任务重新排队
   * （abort 让 visible 波立即抢到解码器），取消视口外的 queued 任务防止活动泵
   * 在新视口之前认领它们。后台回填会把 cancelled 行视为可调度并重建——不删除
   * 源文件也不删除 ready artifact。
   */
  override interruptThumbnailJobsOutsideViewport(
    libraryId: string,
    assetIds: readonly string[],
  ): { interruptedCount: number } {
    const selectedIds = [...new Set(assetIds)].slice(0, 300);
    if (selectedIds.length === 0) return { interruptedCount: 0 };
    const openLibrary = this.requireOpenLibrary(libraryId);
    const placeholders = selectedIds.map(() => '?').join(',');
    // Serpent-4bdd26 回归修正（用户报告缩略图生成巨慢）：只中断正在解码的
    // running 任务——这是抢占的全部收益。旧版还 cancel 视口外的 queued 任务，
    // 但后台回填会立刻把它们重建（priority 50），滚动期间形成 cancel→重建→
    // 再 cancel 的写循环，Windows 上每次取消都是一次 journal fsync，吞吐暴跌。
    // queued 任务本就被可见波(350)的优先级压住，无需取消。
    const rows = openLibrary.connection
      .prepare(
        `SELECT job_id, status
           FROM jobs
          WHERE library_id = ?
            AND kind IN ('generate_thumbnail', 'generate_video_poster')
            AND status = 'running'
            AND asset_id NOT IN (${placeholders})`,
      )
      .all(libraryId, ...selectedIds) as Array<{ job_id: string; status: 'running' }>;
    if (rows.length === 0) return { interruptedCount: 0 };

    const now = new Date().toISOString();
    const requeue = openLibrary.connection.prepare(
      "UPDATE jobs SET status = 'queued', updated_at = ? WHERE job_id = ? AND status = 'running'",
    );
    let count = 0;
    openLibrary.connection.transaction(() => {
      for (const row of rows) {
        requeue.run(now, row.job_id);
        count += 1;
      }
    })();
    // Running jobs were requeued; abort their controllers so the decoders stop
    // immediately and the visible wave can claim the freed capacity.
    this.abortActiveMediaJobs(libraryId, rows.map((row) => row.job_id));
    return { interruptedCount: count };
  }

  /**
   * Stop thumbnail/proxy work that may still hold a managed source file open.
   * The queue is concurrent, so aborting the controller alone is not enough:
   * wait for each active job's finally block to run before deleting on disk.
   */
  public override async cancelMediaJobsForAssets(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
  ): Promise<void> {
    const selectedAssetIds = [...new Set(assetIds)];
    if (selectedAssetIds.length === 0) return;
    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'asset_id',
      selectedAssetIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT job_id FROM jobs
              WHERE library_id = ?
                AND ${sql}
                AND kind IN (${MEDIA_JOB_KINDS.map(() => '?').join(',')})
                AND status IN ('queued', 'running', 'paused')`,
          )
          .all(
            openLibrary.summary.libraryId,
            ...params,
            ...MEDIA_JOB_KINDS,
          ) as Array<{ job_id: string }>,
    );
    if (rows.length === 0) return;

    const jobIds = rows.map((row) => row.job_id);
    this.updateMediaJobStatus(
      openLibrary.summary.libraryId,
      ['queued', 'running', 'paused'],
      'cancelled',
      jobIds,
    );
    this.abortActiveMediaJobs(openLibrary.summary.libraryId, jobIds);

    const active = jobIds
      .map((jobId) => this.activeMediaJobs.get(jobId))
      .filter(
        (job): job is {
          controller: AbortController;
          libraryId: string;
          assetId: string;
          settled: Promise<void>;
        } => Boolean(job),
      );
    await Promise.all(active.map((job) => job.settled));
  }

  /**
   * Abort thumbnail/ffmpeg/sharp work that still holds files under the library
   * root, then wait until those jobs drop their handles. Required before
   * Windows can delete the library directory (Serpent-dfgg).
   */
  override async drainLibraryMedia(libraryId: string, timeoutMs?: number): Promise<void> {
    this.abortActiveMediaJobs(libraryId);
    const active = [...this.activeMediaJobs.values()].filter(
      (job) => job.libraryId === libraryId,
    );
    if (active.length === 0) return;
    const settled = Promise.allSettled(active.map((job) => job.settled)).then(() => undefined);
    if (timeoutMs === undefined) {
      // Closing SQLite before a media job's finally block releases its lease
      // can make the lease release touch a dead connection. A normal close is
      // therefore an unbounded safety boundary; callers that are deleting a
      // library may still opt into the existing bounded drain and retry path.
      await settled;
      return;
    }
    await Promise.race([
      settled,
      new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
    ]);
  }

  public override mediaJobState(libraryId: string, jobId: string): string | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection.prepare(
      `SELECT status FROM jobs WHERE library_id = ? AND job_id = ?
        AND kind IN (${MEDIA_JOB_KINDS.map(() => '?').join(',')})`,
    ).get(openLibrary.summary.libraryId, jobId, ...MEDIA_JOB_KINDS) as {
      status: string;
    } | undefined;
    return row?.status ?? null;
  }

  public override mediaArtifactSnapshot(openLibrary: OpenLibrary, revisionId: string): Set<string> {
    const rows = openLibrary.connection.prepare(
      'SELECT artifact_id FROM revision_artifacts WHERE revision_id = ?',
    ).all(revisionId) as Array<{ artifact_id: string }>;
    return new Set(rows.map((row) => row.artifact_id));
  }

  public override discardLateMediaArtifacts(
    openLibrary: OpenLibrary,
    revisionId: string,
    previousArtifactIds: Set<string>,
    context: {
      libraryId: string;
      jobId: string;
      assetId: string;
      /** The job may have committed an atomic replacement before cancellation. */
      preserveLateArtifacts?: boolean;
    },
  ): void {
    if (context.preserveLateArtifacts) return;
    const rows = openLibrary.connection.prepare(
      'SELECT artifact_id, file_path FROM revision_artifacts WHERE revision_id = ?',
    ).all(revisionId) as Array<{ artifact_id: string; file_path: string }>;
    const lateRows = rows.filter((row) => !previousArtifactIds.has(row.artifact_id));
    if (lateRows.length === 0) return;
    openLibrary.connection.transaction(() => {
      const remove = openLibrary.connection.prepare(
        'DELETE FROM revision_artifacts WHERE artifact_id = ?',
      );
      for (const row of lateRows) remove.run(row.artifact_id);
    })();
    for (const row of lateRows) {
      try {
        rmSync(path.join(this.artifactsDir(openLibrary), row.file_path), { force: true });
      } catch (error) {
        this.diagnose('media-job.cancel-cleanup', error, {
          ...context,
          artifactId: row.artifact_id,
        });
      }
    }
  }

}
