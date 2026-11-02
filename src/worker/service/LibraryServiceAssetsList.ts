/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { AssetSummaryRow, ManagedFolderRow, OpenLibrary} from '../library-service-internals';
import { LibraryServiceError, singleDisplayArtifactJoin } from '../library-service-internals';
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
import { LibraryServiceImageSequences } from './LibraryServiceImageSequences';
import { detectMediaType, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';

/** LibraryServiceAssetsList: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceAssetsList extends LibraryServiceImageSequences {

  override setImageSequenceFps(input: {
    libraryId: string;
    sequenceId: string;
    fps: number;
  }): { sequenceId: string; fps: number } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (!Number.isFinite(input.fps) || input.fps < 1 || input.fps > 240) {
      throw new LibraryServiceError('INTERNAL_ERROR');
    }
    const result = openLibrary.connection
      .prepare(
        `UPDATE asset_sequences
            SET fps = ?, updated_at = ?
          WHERE sequence_id = ?`,
      )
      .run(input.fps, new Date().toISOString(), input.sequenceId);
    if (result.changes !== 1) {
      throw new LibraryServiceError('ASSET_NOT_FOUND');
    }
    return { sequenceId: input.sequenceId, fps: input.fps };
  }

  override listAssets(input: {
    libraryId: string;
    folderId?: string;
    recursive: boolean;
    showIgnored?: boolean;
    assetIds?: readonly string[];
  }): AssetSummary[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const idList = [...new Set((input.assetIds ?? []).filter((id) => id.length > 0))];
    const byIds = idList.length > 0;
    const managedFolder = input.folderId
      ? openLibrary.connection
          .prepare(
            'SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?',
          )
          .get(input.folderId) as ManagedFolderRow | undefined
      : undefined;
    const linkedScope = input.folderId && !managedFolder
      ? this.resolveLinkedFolderScope(openLibrary, input.folderId)
      : null;
    if (!byIds && input.folderId && !managedFolder && !linkedScope) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    // Serpent-verg.2 — lenient read (0031 §1): display/derived columns added
    // after the earliest supported schema are whitelisted per table; columns
    // missing on an older library are omitted from the query and filled with
    // degraded defaults instead of failing. Core identity columns below are
    // hard-required (every supported schema has them).
    const connection = openLibrary.connection;
    const assetColumns = columnsFor(connection, 'assets');
    const revisionColumns = columnsFor(connection, 'revisions');
    const artifactColumns = columnsFor(connection, 'revision_artifacts');
    const metadataColumns = columnsFor(connection, 'asset_metadata');
    const selectList = [
      'a.asset_id',
      'a.managed_folder_id',
      'a.linked_folder_id',
      'a.location_kind',
      'a.relative_file_path',
      "CASE WHEN r.revision_id IS NULL THEN 'corrupt:' || a.asset_id ELSE a.current_revision_id END AS current_revision_id",
      "CASE WHEN r.revision_id IS NULL THEN 'missing' ELSE a.availability END AS availability",
      'a.deleted_at',
      ...qualify('a', assetColumns, ['trashed_from_relative_path']),
      ...(revisionColumns.has('byte_size') ? ['COALESCE(r.byte_size, 0) AS byte_size'] : []),
      ...(revisionColumns.has('modified_at')
        ? ["COALESCE(r.modified_at, '1970-01-01T00:00:00.000Z') AS modified_at"]
        : []),
      // Rating/favorite fall back to 0 when the metadata row is absent;
      // when the column itself is missing on an older library the row is
      // filled with 0 below instead of failing.
      ...(metadataColumns.has('rating') ? ['COALESCE(m.rating, 0) AS rating'] : []),
      ...(metadataColumns.has('favorite') ? ['COALESCE(m.favorite, 0) AS favorite'] : []),
      ...(artifactColumns.has('status') ? ['ra.status AS thumbnail_status'] : []),
      ...(artifactColumns.has('artifact_id') ? ['ra.artifact_id AS thumbnail_artifact_id'] : []),
      ...(artifactColumns.has('width')
        ? ['COALESCE(ra.width, video_meta.width) AS artifact_width']
        : []),
      ...(artifactColumns.has('height')
        ? ['COALESCE(ra.height, video_meta.height) AS artifact_height']
        : []),
      ...(artifactColumns.has('duration_ms')
        ? ['video_meta.duration_ms AS artifact_duration_ms']
        : []),
    ].join(',\n');
    const listAssetSql = (idPredicateSql: string): string =>
      `SELECT ${selectList}
         FROM assets a
         LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
         LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
         ${singleDisplayArtifactJoin(
            'ra',
            artifactColumns.has('status')
              ? "AND chosen.status IN ('ready', 'pending', 'generating', 'failed')"
              : '',
          )}
         LEFT JOIN revision_artifacts video_meta
           ON video_meta.revision_id = a.current_revision_id
          AND video_meta.kind = 'extracted_metadata'
          ${artifactColumns.has('status') ? "AND video_meta.status = 'ready'" : ''}
          AND video_meta.invalidated_at IS NULL
        WHERE ${hasTable(connection, 'linked_ignored_assets')
          ? 'NOT EXISTS (SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id) AND '
          : ''}${this.explicitIgnoreSql(connection, 'a', input.showIgnored === true)} AND ${idPredicateSql}
        ORDER BY a.relative_file_path`;
    type ListAssetRow = AssetSummaryRow & {
      deleted_at: string | null;
      trashed_from_relative_path: string | null;
      thumbnail_status: 'ready' | 'pending' | 'generating' | 'failed' | null;
      thumbnail_artifact_id: string | null;
      artifact_width: number | null;
      artifact_height: number | null;
      artifact_duration_ms: number | null;
    };
    const rows = byIds
      ? withSqliteInPredicate(connection, 'a.asset_id', idList, (sql, params) =>
        connection.prepare(listAssetSql(sql)).all(...params) as ListAssetRow[])
      : connection.prepare(listAssetSql('1')).all() as ListAssetRow[];

    // Serpent-verg.2 — fill degraded defaults for whitelisted columns that
    // an older library does not have (0031 §1.1): the feature degrades
    // (size/metadata/thumbnail not shown) instead of the query failing.
    // Column-name defaults come from the shared registry; the thumbnail row
    // aliases (thumbnail_status/artifact_*) are keyed by result-field name
    // and stay explicit here.
    const degradedFill: Record<string, unknown> = {
      ...degradedDefaults('assets', missingColumns(connection, 'assets', ['trashed_from_relative_path'])),
      ...degradedDefaults('revisions', missingColumns(connection, 'revisions', ['byte_size', 'modified_at'])),
      ...degradedDefaults('asset_metadata', missingColumns(connection, 'asset_metadata', ['rating', 'favorite'])),
      ...(!artifactColumns.has('status') ? { thumbnail_status: null } : {}),
      ...(!artifactColumns.has('artifact_id') ? { thumbnail_artifact_id: null } : {}),
      ...(!artifactColumns.has('width') ? { artifact_width: null } : {}),
      ...(!artifactColumns.has('height') ? { artifact_height: null } : {}),
      ...(!artifactColumns.has('duration_ms') ? { artifact_duration_ms: null } : {}),
    };

    const assets = rows
      .map((row) => ({ ...degradedFill, ...row }))
      .filter((row) => {
        if (byIds) return true;
        if (managedFolder) {
          if (!input.recursive) return row.managed_folder_id === managedFolder.folder_id;
          return (
            row.relative_file_path.startsWith(`${managedFolder.relative_path}/`) ||
            row.managed_folder_id === managedFolder.folder_id
          );
        }
        if (linkedScope) {
          if (row.linked_folder_id !== linkedScope.linkedFolderId) return false;
          if (!input.recursive) {
            return linkedAssetIsDirectChild(row.relative_file_path, linkedScope.relativePath);
          }
          if (linkedScope.relativePath === '') return true;
          return linkedAssetIsUnderDirectory(row.relative_file_path, linkedScope.relativePath);
        }
        return input.recursive || row.managed_folder_id === null;
      })
      .map((row) => this.assetSummaryFromRow({
        ...row,
        thumbnail_status: row.thumbnail_status === 'ready' ? 'ready'
          : row.thumbnail_status === 'failed' ? 'failed'
          : row.thumbnail_status === 'pending' || row.thumbnail_status === 'generating' ? 'pending'
          : null,
        thumbnail_artifact_id: row.thumbnail_status === 'ready' ? row.thumbnail_artifact_id : null,
        media_type: (() => {
          return toSummaryMediaType(
            detectMediaType(row.relative_file_path),
          );
        })(),
      }));
    return this.withImageSequenceSummaries(openLibrary, assets);
  }

  /**
   * Resolve a large affected-id set through listAssets, which now chunks IN
   * binds instead of silently truncating after 200 IDs.
   */
  public override listAssetSummariesByIds(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
  ): AssetSummary[] {
    const uniqueIds = [...new Set(assetIds.filter((assetId) => assetId.length > 0))];
    if (uniqueIds.length === 0) return [];
    return this.listAssets({
      libraryId: openLibrary.summary.libraryId,
      recursive: true,
      assetIds: uniqueIds,
    }).sort((left, right) =>
      left.relativeFilePath.localeCompare(right.relativeFilePath),
    );
  }
}
