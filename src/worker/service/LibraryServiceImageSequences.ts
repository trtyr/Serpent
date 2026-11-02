/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { OpenLibrary} from '../library-service-internals';
import { LibraryServiceError, pngBitDepth } from '../library-service-internals';
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
import { LibraryServiceLinkedFolders } from './LibraryServiceLinkedFolders';

/** LibraryServiceImageSequences: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceImageSequences extends LibraryServiceLinkedFolders {

  public override insertImageSequence(
    openLibrary: OpenLibrary,
    frames: readonly { assetId: string; frameNumber: number }[],
    fps: number,
  ): string {
    const sequenceId = randomUUID();
    const now = new Date().toISOString();
    openLibrary.connection.prepare(
      `INSERT INTO asset_sequences
         (sequence_id, primary_asset_id, fps, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`,
    ).run(sequenceId, frames[0]!.assetId, fps, now, now);
    const insertFrame = openLibrary.connection.prepare(
      `INSERT INTO asset_sequence_frames
         (sequence_id, asset_id, frame_number, position)
       VALUES (?, ?, ?, ?)`,
    );
    frames.forEach((frame, position) => {
      insertFrame.run(sequenceId, frame.assetId, frame.frameNumber, position);
    });
    this.cancelHiddenSequenceMemberMediaJobs(
      openLibrary,
      frames.slice(1).map((frame) => frame.assetId),
    );
    return sequenceId;
  }

  /**
   * Hidden sequence frames are not browse cards. Cancel leftover primary and
   * palette jobs so they cannot occupy the background queue.
   */
  public override cancelHiddenSequenceMemberMediaJobs(
    openLibrary: OpenLibrary,
    hiddenAssetIds: readonly string[],
  ): void {
    const uniqueIds = [...new Set(hiddenAssetIds.filter(Boolean))];
    if (uniqueIds.length === 0) return;
    const jobIds = sqliteAllInChunks<string, { job_id: string }>({
      connection: openLibrary.connection,
      values: uniqueIds,
      buildSql: (placeholders) =>
        `SELECT job_id
           FROM jobs
          WHERE library_id = ?
            AND kind IN ('generate_thumbnail', 'extract_palette')
            AND status IN ('queued', 'paused', 'running')
            AND asset_id IN (${placeholders})`,
      bind: (chunk) => [openLibrary.summary.libraryId, ...chunk],
    }).map((row) => row.job_id);
    if (jobIds.length === 0) return;
    const now = new Date().toISOString();
    sqliteRunInChunks({
      connection: openLibrary.connection,
      values: jobIds,
      buildSql: (placeholders) =>
        `UPDATE jobs
            SET status = 'cancelled', error_code = 'SEQUENCE_MEMBER', updated_at = ?
          WHERE library_id = ?
            AND status IN ('queued', 'paused', 'running')
            AND job_id IN (${placeholders})`,
      bind: (chunk) => [now, openLibrary.summary.libraryId, ...chunk],
    });
    this.abortActiveMediaJobs(openLibrary.summary.libraryId, jobIds);
    this.mediaJobSummaryCache.invalidate(openLibrary.summary.libraryId);
  }

  /**
   * Chromium cannot paint a 16-bit PNG card. Stamp 8-bit OIIO thumbnails so
   * they are not scanned again, and replace 16-bit ones with a new 8-bit job.
   */
  public override repairUndisplayablePngThumbnails(openLibrary: OpenLibrary): void {
    const artifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
    if (!artifactColumns.has('status') || !artifactColumns.has('generator_version')) return;
    const rows = openLibrary.connection.prepare(
      `SELECT ra.artifact_id, ra.file_path, a.asset_id
         FROM revision_artifacts ra
         JOIN assets a ON a.current_revision_id = ra.revision_id
        WHERE ra.kind = 'thumbnail'
          AND ra.status = 'ready'
          AND ra.mime_type = 'image/png'
          AND ra.invalidated_at IS NULL
          AND ra.generator_version LIKE 'oiio@%'
          AND ra.generator_version NOT LIKE '%display-uint8%'
        LIMIT 24`,
    ).all() as Array<{ artifact_id: string; file_path: string; asset_id: string }>;
    if (rows.length === 0) return;
    const artifactsDir = this.artifactsDir(openLibrary);
    const eightBitIds: string[] = [];
    const rebuildArtifactIds: string[] = [];
    const rebuildAssetIds: string[] = [];
    for (const row of rows) {
      const depth = pngBitDepth(path.join(artifactsDir, row.file_path));
      if (depth === 8) eightBitIds.push(row.artifact_id);
      else if (depth === 16) {
        rebuildArtifactIds.push(row.artifact_id);
        rebuildAssetIds.push(row.asset_id);
      }
    }
    if (eightBitIds.length > 0) {
      sqliteRunInChunks({
        connection: openLibrary.connection,
        values: eightBitIds,
        buildSql: (placeholders) =>
          `UPDATE revision_artifacts
              SET generator_version = generator_version || ';display-uint8'
            WHERE artifact_id IN (${placeholders})
              AND generator_version NOT LIKE '%display-uint8%'`,
      });
    }
    if (rebuildArtifactIds.length === 0) return;
    const now = new Date().toISOString();
    sqliteRunInChunks({
      connection: openLibrary.connection,
      values: rebuildArtifactIds,
      buildSql: (placeholders) =>
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE artifact_id IN (${placeholders})
            AND invalidated_at IS NULL`,
      bind: (chunk) => [now, ...chunk],
    });
    this.enqueueThumbnailJobs(openLibrary.summary.libraryId, {
      assetIds: [...new Set(rebuildAssetIds)],
      priority: 200,
    });
  }

  public override cancelQueuedHiddenSequenceMemberJobs(openLibrary: OpenLibrary): void {
    if (!hasTable(openLibrary.connection, 'asset_sequence_frames')) return;
    const now = new Date().toISOString();
    const result = openLibrary.connection
      .prepare(
        `UPDATE jobs
            SET status = 'cancelled', error_code = 'SEQUENCE_MEMBER', updated_at = ?
          WHERE library_id = ?
            AND kind IN ('generate_thumbnail', 'extract_palette', 'extract_metadata')
            AND status IN ('queued', 'paused')
            AND EXISTS (
              SELECT 1
                FROM asset_sequence_frames hidden_sequence_frame
               WHERE hidden_sequence_frame.asset_id = jobs.asset_id
                 AND hidden_sequence_frame.position > 0
            )`,
      )
      .run(now, openLibrary.summary.libraryId);
    if (result.changes > 0) {
      this.mediaJobSummaryCache.invalidate(openLibrary.summary.libraryId);
    }
  }

  public override dissolveImageSequencesForAssets(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
  ): void {
    const uniqueIds = [...new Set(assetIds)];
    if (uniqueIds.length === 0) return;
    sqliteRunInChunks({
      connection: openLibrary.connection,
      values: uniqueIds,
      buildSql: (placeholders) =>
        `DELETE FROM asset_sequences
          WHERE sequence_id IN (
            SELECT sequence_id
              FROM asset_sequence_frames
             WHERE asset_id IN (${placeholders})
          )`,
    });
  }

  public override createDetectedImageSequences(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
    fps = 30,
  ): string[] {
    const uniqueIds = [...new Set(assetIds)];
    if (uniqueIds.length === 0) return [];
    const triggerRows = sqliteAllInChunks<string, { relative_file_path: string }>({
      connection: openLibrary.connection,
      values: uniqueIds,
      buildSql: (placeholders) =>
        `SELECT a.relative_file_path
           FROM assets a
          WHERE a.asset_id IN (${placeholders})
            AND a.deleted_at IS NULL`,
    });
    const directories = new Set(
      triggerRows.map((row) => path.posix.dirname(row.relative_file_path)),
    );
    const rowsByDirectory = new Map<
      string,
      Array<{
        asset_id: string;
        relative_file_path: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
      }>
    >();
    for (const directory of directories) {
      const directoryRows = (
        directory === "."
          ? openLibrary.connection.prepare(
              `SELECT a.asset_id, a.relative_file_path, a.location_kind, a.linked_folder_id
                 FROM assets a
                WHERE a.deleted_at IS NULL
                  AND instr(a.relative_file_path, '/') = 0
                  AND NOT EXISTS (
                    SELECT 1
                      FROM asset_sequence_frames sf
                     WHERE sf.asset_id = a.asset_id
                  )`,
            ).all()
          : openLibrary.connection.prepare(
              `SELECT a.asset_id, a.relative_file_path, a.location_kind, a.linked_folder_id
                 FROM assets a
                WHERE a.deleted_at IS NULL
                  AND a.relative_file_path LIKE ? ESCAPE '\\'
                  AND NOT EXISTS (
                    SELECT 1
                      FROM asset_sequence_frames sf
                     WHERE sf.asset_id = a.asset_id
                  )`,
            ).all(
              `${directory.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_")}/%`,
            )
      ) as Array<{
        asset_id: string;
        relative_file_path: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
      }>;
      rowsByDirectory.set(
        directory,
        directoryRows.filter(
          (row) => path.posix.dirname(row.relative_file_path) === directory,
        ),
      );
    }
    const created: string[] = [];
    openLibrary.connection.transaction(() => {
      for (const rows of rowsByDirectory.values()) {
        const rowsByPath = new Map(
          rows.map((row) => [row.relative_file_path, row]),
        );
        for (const candidate of detectImageSequences(
          rows.map((row) => row.relative_file_path),
        )) {
          const candidateRows = candidate.frames.map((frame) => rowsByPath.get(frame.value));
          if (candidateRows.some((row) => row === undefined)) continue;
          const reference = this.imageDimensionsForAsset(openLibrary, candidateRows[0]!);
          if (!reference) continue;
          const dimensionsMatch = candidateRows.every((row) => {
            const size = this.imageDimensionsForAsset(openLibrary, row!);
            return size?.width === reference.width && size.height === reference.height;
          });
          if (!dimensionsMatch) continue;
          const frames = candidate.frames.map((frame, index) => ({
            assetId: candidateRows[index]!.asset_id,
            frameNumber: frame.frameNumber,
          }));
          created.push(this.insertImageSequence(openLibrary, frames, fps));
        }
      }
    })();
    return created;
  }

  public override imageDimensionsForAsset(
    openLibrary: OpenLibrary,
    asset: {
      relative_file_path: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
    },
  ): { width: number; height: number } | null {
    const filePath = asset.location_kind === 'linked'
      ? this.linkedAssetPath(openLibrary, asset.linked_folder_id, asset.relative_file_path)
      : this.folderPath(openLibrary, asset.relative_file_path);
    return readImageDimensionsSync(filePath);
  }

  public override async imageDimensionsForAssetAsync(
    openLibrary: OpenLibrary,
    asset: {
      relative_file_path: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
    },
  ): Promise<{ width: number; height: number } | null> {
    const filePath = asset.location_kind === 'linked'
      ? await this.linkedAssetPathAsync(openLibrary, asset.linked_folder_id, asset.relative_file_path)
      : await this.folderPathAsync(openLibrary, asset.relative_file_path);
    return readImageDimensions(filePath);
  }

  public override withImageSequenceSummaries(
    openLibrary: OpenLibrary,
    assets: readonly AssetSummary[],
  ): AssetSummary[] {
    if (assets.length === 0) return [];
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the
    // sequence tables have no memberships; return assets unchanged.
    if (
      !hasTable(openLibrary.connection, 'asset_sequence_frames') ||
      !hasTable(openLibrary.connection, 'asset_sequences')
    ) {
      return assets.map((asset) => ({ ...asset, sequence: null }));
    }
    const assetIds = [...new Set(assets.map((asset) => asset.assetId))];
    const memberships = sqliteAllInChunks<
      string,
      { asset_id: string; position: number; sequence_id: string }
    >({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT sf.asset_id, sf.position, sf.sequence_id
           FROM asset_sequence_frames sf
          WHERE sf.asset_id IN (${placeholders})`,
    });
    const hiddenIds = new Set(
      memberships
        .filter((membership) => membership.position > 0)
        .map((membership) => membership.asset_id),
    );
    const primaryMembershipIds = new Set(
      memberships
        .filter((membership) => membership.position === 0)
        .map((membership) => membership.asset_id),
    );
    const visible = assets.filter((asset) => !hiddenIds.has(asset.assetId));
    const primaryIds = visible
      .filter((asset) => primaryMembershipIds.has(asset.assetId))
      .map((asset) => asset.assetId);
    if (primaryIds.length === 0) {
      return foldCatalogImageSequenceSummaries({
        assets,
        memberships,
        frameRows: [],
        artifacts: new Map(),
      });
    }
    const sequenceArtifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
    const sequenceSourceDimensionColumns = sequenceArtifactColumns.has('width') && sequenceArtifactColumns.has('height')
      ? `,
              (SELECT source_metadata.width
                 FROM revision_artifacts source_metadata
                WHERE source_metadata.revision_id = a.current_revision_id
                  AND source_metadata.kind = 'extracted_metadata'
                  AND source_metadata.status = 'ready'
                  AND source_metadata.invalidated_at IS NULL
                ORDER BY source_metadata.generated_at DESC
                LIMIT 1) AS source_width,
              (SELECT source_metadata.height
                 FROM revision_artifacts source_metadata
                WHERE source_metadata.revision_id = a.current_revision_id
                  AND source_metadata.kind = 'extracted_metadata'
                  AND source_metadata.status = 'ready'
                  AND source_metadata.invalidated_at IS NULL
                ORDER BY source_metadata.generated_at DESC
                LIMIT 1) AS source_height`
      : ', NULL AS source_width, NULL AS source_height';
    const frameRows = sqliteAllInChunks<string, {
      sequence_id: string;
      primary_asset_id: string;
      fps: number;
      asset_id: string;
      frame_number: number;
      position: number;
      relative_file_path: string;
      current_revision_id: string;
      availability: 'available' | 'missing';
      deleted_at: string | null;
      byte_size: number;
      source_width: number | null;
      source_height: number | null;
    }>({
      connection: openLibrary.connection,
      values: primaryIds,
      buildSql: (placeholders) =>
        `SELECT s.sequence_id, s.primary_asset_id, s.fps,
                sf.asset_id, sf.frame_number, sf.position,
                a.relative_file_path, a.current_revision_id, a.availability, a.deleted_at,
                r.byte_size
                ${sequenceSourceDimensionColumns}
           FROM asset_sequences s
           JOIN asset_sequence_frames sf ON sf.sequence_id = s.sequence_id
           JOIN assets a ON a.asset_id = sf.asset_id
           JOIN revisions r ON r.revision_id = a.current_revision_id
          WHERE s.primary_asset_id IN (${placeholders})
          ORDER BY s.sequence_id, sf.position`,
    });
    const artifacts = this.thumbnailArtifactMap(
      openLibrary.summary.libraryId,
      frameRows.map((row) => row.asset_id),
    );
    return foldCatalogImageSequenceSummaries({
      assets,
      memberships,
      frameRows,
      artifacts,
    });
  }

  override createImageSequence(input: {
    libraryId: string;
    assetIds: string[];
    fps: number;
  }): AssetSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (!Number.isFinite(input.fps) || input.fps < 1 || input.fps > 240) {
      throw new LibraryServiceError('INTERNAL_ERROR');
    }
    const uniqueIds = [...new Set(input.assetIds)];
    if (uniqueIds.length < 3 || uniqueIds.length !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const rows = sqliteAllInChunks<string, { asset_id: string; relative_file_path: string }>({
      connection: openLibrary.connection,
      values: uniqueIds,
      buildSql: (placeholders) =>
        `SELECT a.asset_id, a.relative_file_path
           FROM assets a
          WHERE a.asset_id IN (${placeholders})
            AND a.deleted_at IS NULL
            AND a.availability = 'available'
            AND NOT EXISTS (
              SELECT 1 FROM asset_sequence_frames sf WHERE sf.asset_id = a.asset_id
            )`,
    });
    if (rows.length !== uniqueIds.length) {
      throw new LibraryServiceError('ASSET_STATE_CONFLICT');
    }
    const directories = new Set(rows.map((row) => path.posix.dirname(row.relative_file_path)));
    if (directories.size !== 1) throw new LibraryServiceError('INVALID_SELECTION', { reason: 'IMAGE_SEQUENCE_SELECTION' });
    const candidate = detectImageSequences(rows.map((row) => row.relative_file_path))
      .find((item) => item.frames.length === rows.length);
    if (!candidate) throw new LibraryServiceError('INVALID_SELECTION', { reason: 'IMAGE_SEQUENCE_SELECTION' });
    const byPath = new Map(rows.map((row) => [row.relative_file_path, row.asset_id]));
    const frames = candidate.frames.map((frame) => ({
      assetId: byPath.get(frame.value)!,
      frameNumber: frame.frameNumber,
    }));
    openLibrary.connection.transaction(() => {
      this.insertImageSequence(openLibrary, frames, input.fps);
    })();
    const asset = this.listAssets({ libraryId: input.libraryId, recursive: true })
      .find((item) => item.assetId === frames[0]!.assetId);
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
    return asset;
  }

  override dissolveImageSequence(input: {
    libraryId: string;
    sequenceId: string;
  }): string {
    const result = this.dissolveImageSequences({
      libraryId: input.libraryId,
      sequenceIds: [input.sequenceId],
    });
    return result.sequenceIds[0]!;
  }

  override dissolveImageSequences(input: {
    libraryId: string;
    sequenceIds: string[];
  }): { sequenceIds: string[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const sequenceIds = [...new Set(input.sequenceIds)];
    if (sequenceIds.length === 0) throw new LibraryServiceError('ASSET_NOT_FOUND');
    const existing = withSqliteInPredicate(
      openLibrary.connection,
      'sequence_id',
      sequenceIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(`SELECT sequence_id FROM asset_sequences WHERE ${sql}`)
          .all(...params) as Array<{ sequence_id: string }>,
    );
    if (existing.length !== sequenceIds.length) {
      throw new LibraryServiceError('ASSET_NOT_FOUND');
    }
    sqliteRunInChunks({
      connection: openLibrary.connection,
      values: sequenceIds,
      buildSql: (placeholders) =>
        `DELETE FROM asset_sequences WHERE sequence_id IN (${placeholders})`,
    });
    return { sequenceIds };
  }
}
