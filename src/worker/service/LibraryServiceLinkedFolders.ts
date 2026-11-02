/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { ManagedFolderRow, OpenLibrary, OperationManifest} from '../library-service-internals';
import { LibraryServiceError, SimulatedCrashError, copyNameCandidates, realDirectoryExists, realFileExists, serviceError } from '../library-service-internals';
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
import { LibraryServiceFolderBrowse } from './LibraryServiceFolderBrowse';

/** LibraryServiceLinkedFolders: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceLinkedFolders extends LibraryServiceFolderBrowse {

  /**
   * Count assets in each folder's full subtree (self + descendants by
   * relative_path prefix). Serpent-toh / REQ-FOLDER-003.
   */
  public override managedFolderRecursiveAssetCounts(
    openLibrary: OpenLibrary,
    folders: Array<{ folder_id: string; relative_path: string }>,
    showIgnored = false,
  ): Map<string, number> {
    const result = new Map<string, number>();
    if (folders.length === 0) return result;

    // Serpent-4bdd26 / 0032-E.3: serve the recursive totals from the memo
    // until a browse-visible write advances the narrow sequence. Thumbnail,
    // job and artifact progress must not evict this sidebar read model.
    const browseChangeSequence = this.getBrowseChangeSequence(openLibrary.summary.libraryId);
    const cacheKey = `${browseChangeSequence}\u0000${showIgnored ? 'ignored' : 'visible'}`;
    if (openLibrary.folderCountCache?.key === cacheKey) {
      const cached = openLibrary.folderCountCache.counts;
      for (const folder of folders) {
        result.set(folder.folder_id, cached.get(folder.folder_id) ?? 0);
      }
      return result;
    }

    const allFolders = (openLibrary.connection
      .prepare(
        'SELECT folder_id, parent_folder_id, relative_path FROM managed_folders',
      )
      .all() as Array<{
        folder_id: string;
        parent_folder_id: string | null;
        relative_path: string;
      }>).filter((folder) =>
        showIgnored || !this.explicitFolderIgnored(openLibrary, 'managed', null, folder.relative_path),
    );
    const { directAssetCounts } = this.managedFolderCountMaps(
      openLibrary,
      undefined,
      showIgnored,
    );
    const totals = new Map(
      allFolders.map((folder) => [
        folder.folder_id,
        directAssetCounts.get(folder.folder_id) ?? 0,
      ] as const),
    );

    // Aggregate each folder into its parent once, deepest first. The previous
    // implementation compared every folder path with every other path (O(F²))
    // on every sidebar/navigation load; the parent relation makes this O(F log
    // F) for the depth ordering plus O(F) aggregation.
    const deepestFirst = [...allFolders].sort(
      (left, right) =>
        right.relative_path.split('/').length - left.relative_path.split('/').length,
    );
    for (const folder of deepestFirst) {
      if (!folder.parent_folder_id) continue;
      const parentTotal = totals.get(folder.parent_folder_id);
      if (parentTotal === undefined) continue;
      totals.set(
        folder.parent_folder_id,
        parentTotal + (totals.get(folder.folder_id) ?? 0),
      );
    }
    openLibrary.folderCountCache = { key: cacheKey, counts: totals };
    for (const folder of folders) {
      result.set(folder.folder_id, totals.get(folder.folder_id) ?? 0);
    }
    return result;
  }

  public override managedFolderCountMaps(
    openLibrary: OpenLibrary,
    folderIds?: string[],
    showIgnored = false,
  ): {
    directAssetCounts: Map<string, number>;
    childFolderCounts: Map<string, number>;
  } {
    const directAssetCounts = new Map<string, number>();
    const childFolderCounts = new Map<string, number>();

    if (folderIds && folderIds.length === 0) {
      return { directAssetCounts, childFolderCounts };
    }

    if (folderIds) {
      // Serpent-verg review fix: the ignore/sequence-frame subqueries
      // reference tables older libraries do not have; conditions are only
      // added when the tables exist.
      const connection = openLibrary.connection;
      const hasIgnoreTable = hasTable(connection, 'linked_ignored_assets');
      const hasSequenceFrames = hasTable(connection, 'asset_sequence_frames');
      const hasExplicitIgnore = hasTable(connection, 'explicit_ignored_paths');
      const hasGitignore = hasTable(connection, 'gitignore_ignored_paths');
      const assetRows = withSqliteInPredicate(
        openLibrary.connection,
        'managed_folder_id',
        folderIds,
        (sql, params) =>
          openLibrary.connection
            .prepare(
              `SELECT managed_folder_id AS folder_id, COUNT(*) AS count
                 FROM assets
                WHERE ${sql}
                  AND deleted_at IS NULL
                  ${hasIgnoreTable
                    ? 'AND NOT EXISTS (SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = assets.asset_id)'
                    : ''}
                  AND ${this.explicitIgnoreSql(connection, 'assets', showIgnored)}
                  ${hasSequenceFrames
                    ? `AND NOT EXISTS (
                    SELECT 1
                      FROM asset_sequence_frames hidden_sequence_frame
                     WHERE hidden_sequence_frame.asset_id = assets.asset_id
                       AND hidden_sequence_frame.position > 0
                  )`
                    : ''}
                GROUP BY managed_folder_id`,
            )
            .all(...params) as Array<{ folder_id: string; count: number }>,
      );
      for (const row of assetRows) directAssetCounts.set(row.folder_id, row.count);

      const folderIgnoreClauses = [
        hasExplicitIgnore
          ? `NOT EXISTS (
            SELECT 1 FROM explicit_ignored_paths ignored_folder
             WHERE ignored_folder.location_kind = 'managed'
               AND ignored_folder.linked_folder_id = ''
               AND ignored_folder.path_kind = 'folder'
               AND (mf.relative_path = ignored_folder.relative_path
                 OR mf.relative_path LIKE ignored_folder.relative_path || '/%')
          )`
          : null,
        hasGitignore
          ? `NOT EXISTS (
            SELECT 1 FROM gitignore_ignored_paths ignored_git
             WHERE ignored_git.path_kind = 'folder'
               AND (mf.relative_path = ignored_git.relative_path
                 OR mf.relative_path LIKE ignored_git.relative_path || '/%')
          )`
          : null,
      ].filter((sql): sql is string => sql !== null);
      const childRows = withSqliteInPredicate(
        openLibrary.connection,
        'parent_folder_id',
        folderIds,
        (sql, params) =>
          openLibrary.connection
            .prepare(
              `SELECT parent_folder_id AS folder_id, COUNT(*) AS count
                 FROM managed_folders mf
                WHERE ${sql}
                  AND ${
                    showIgnored || folderIgnoreClauses.length === 0
                      ? '1 = 1'
                      : folderIgnoreClauses.join(' AND ')
                  }
                GROUP BY parent_folder_id`,
            )
            .all(...params) as Array<{ folder_id: string; count: number }>,
      );
      for (const row of childRows) childFolderCounts.set(row.folder_id, row.count);
      return { directAssetCounts, childFolderCounts };
    }

    // Serpent-verg review fix: guard the ignore/sequence-frame subqueries
    // (same table-existence rules as the folderIds variant above).
    const connection = openLibrary.connection;
    const hasIgnoreTable = hasTable(connection, 'linked_ignored_assets');
    const hasSequenceFrames = hasTable(connection, 'asset_sequence_frames');
    const hasExplicitIgnore = hasTable(connection, 'explicit_ignored_paths');
    const hasGitignore = hasTable(connection, 'gitignore_ignored_paths');
    const assetRows = openLibrary.connection
      .prepare(
        `SELECT managed_folder_id AS folder_id, COUNT(*) AS count
           FROM assets
          WHERE managed_folder_id IS NOT NULL
            AND deleted_at IS NULL
            ${hasIgnoreTable
              ? 'AND NOT EXISTS (SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = assets.asset_id)'
              : ''}
            AND ${this.explicitIgnoreSql(connection, 'assets', showIgnored)}
            ${hasSequenceFrames
              ? `AND NOT EXISTS (
              SELECT 1
                FROM asset_sequence_frames hidden_sequence_frame
               WHERE hidden_sequence_frame.asset_id = assets.asset_id
                 AND hidden_sequence_frame.position > 0
            )`
              : ''}
          GROUP BY managed_folder_id`,
      )
      .all() as Array<{ folder_id: string; count: number }>;
    for (const row of assetRows) directAssetCounts.set(row.folder_id, row.count);

    const folderIgnoreClauses = [
      hasExplicitIgnore
        ? `NOT EXISTS (
          SELECT 1 FROM explicit_ignored_paths ignored_folder
           WHERE ignored_folder.location_kind = 'managed'
             AND ignored_folder.linked_folder_id = ''
             AND ignored_folder.path_kind = 'folder'
             AND (mf.relative_path = ignored_folder.relative_path
               OR mf.relative_path LIKE ignored_folder.relative_path || '/%')
        )`
        : null,
      hasGitignore
        ? `NOT EXISTS (
          SELECT 1 FROM gitignore_ignored_paths ignored_git
           WHERE ignored_git.path_kind = 'folder'
             AND (mf.relative_path = ignored_git.relative_path
               OR mf.relative_path LIKE ignored_git.relative_path || '/%')
        )`
        : null,
    ].filter((sql): sql is string => sql !== null);
    const childRows = openLibrary.connection
      .prepare(
        `SELECT parent_folder_id AS folder_id, COUNT(*) AS count
           FROM managed_folders mf
          WHERE parent_folder_id IS NOT NULL
            AND ${
              showIgnored || folderIgnoreClauses.length === 0
                ? '1 = 1'
                : folderIgnoreClauses.join(' AND ')
            }
          GROUP BY parent_folder_id`,
      )
      .all() as Array<{ folder_id: string; count: number }>;
    for (const row of childRows) childFolderCounts.set(row.folder_id, row.count);
    return { directAssetCounts, childFolderCounts };
  }

  /**
   * Sequence frames shown from the original file have no thumbnail artifact,
   * so a folder that only contains a sequence would otherwise stay on the
   * default folder glyph. Point the cover at the sequence's first frame.
   */
  public override withSequenceFolderCovers(
    openLibrary: OpenLibrary,
    entries: FolderBrowseEntry[],
  ): FolderBrowseEntry[] {
    if (!hasTable(openLibrary.connection, 'asset_sequence_frames')) {
      return this.withCustomFolderCovers(openLibrary, entries);
    }
    const pending = entries.filter((entry) => entry.coverArtifactIds.length === 0);
    if (pending.length === 0) return this.withCustomFolderCovers(openLibrary, entries);
    const previews = new Map<string, { assetId: string; revisionId: string }>();
    const managedIds = pending
      .filter((entry) => entry.locationKind === 'managed')
      .map((entry) => entry.folderId);
    if (managedIds.length > 0) {
      const rows = sqliteAllInChunks<string, {
        folder_id: string;
        asset_id: string;
        revision_id: string;
      }>({
        connection: openLibrary.connection,
        values: managedIds,
        buildSql: (placeholders) =>
          `SELECT a.managed_folder_id AS folder_id,
                  a.asset_id,
                  a.current_revision_id AS revision_id
             FROM assets a
             JOIN asset_sequence_frames frame
               ON frame.asset_id = a.asset_id
              AND frame.position = 0
            WHERE a.managed_folder_id IN (${placeholders})
              AND a.deleted_at IS NULL
              AND a.current_revision_id IS NOT NULL
            ORDER BY a.relative_file_path`,
      });
      for (const row of rows) {
        if (!previews.has(row.folder_id)) {
          previews.set(row.folder_id, {
            assetId: row.asset_id,
            revisionId: row.revision_id,
          });
        }
      }
    }
    const linkedIds = [...new Set(
      pending
        .filter((entry) => entry.locationKind === 'linked' && entry.linkedFolderId)
        .map((entry) => entry.linkedFolderId!),
    )];
    if (linkedIds.length > 0) {
      const rows = sqliteAllInChunks<string, {
        linked_folder_id: string;
        relative_file_path: string;
        asset_id: string;
        revision_id: string;
      }>({
        connection: openLibrary.connection,
        values: linkedIds,
        buildSql: (placeholders) =>
          `SELECT a.linked_folder_id,
                  a.relative_file_path,
                  a.asset_id,
                  a.current_revision_id AS revision_id
             FROM assets a
             JOIN asset_sequence_frames frame
               ON frame.asset_id = a.asset_id
              AND frame.position = 0
            WHERE a.linked_folder_id IN (${placeholders})
              AND a.deleted_at IS NULL
              AND a.current_revision_id IS NOT NULL
            ORDER BY a.relative_file_path`,
      });
      for (const entry of pending) {
        if (entry.locationKind !== 'linked' || !entry.linkedFolderId) continue;
        const prefix = entry.relativePath === '' ? '' : `${entry.relativePath}/`;
        const match = rows.find((row) => {
          if (row.linked_folder_id !== entry.linkedFolderId) return false;
          const parent = row.relative_file_path.includes('/')
            ? row.relative_file_path.slice(0, row.relative_file_path.lastIndexOf('/'))
            : '';
          return parent === entry.relativePath
            || (prefix !== '' && row.relative_file_path.startsWith(prefix) && parent === entry.relativePath);
        });
        if (match) {
          previews.set(entry.folderId, {
            assetId: match.asset_id,
            revisionId: match.revision_id,
          });
        }
      }
    }
    if (previews.size === 0) return this.withCustomFolderCovers(openLibrary, entries);
    return this.withCustomFolderCovers(openLibrary, entries.map((entry) => {
      const preview = previews.get(entry.folderId);
      if (!preview || entry.coverArtifactIds.length > 0) return entry;
      return { ...entry, coverSourcePreviews: [preview] };
    }));
  }

  public override folderCoverArtifactMap(
    openLibrary: OpenLibrary,
    folderIds: string[],
    showIgnored = false,
  ): Map<string, string[]> {
    const covers = new Map<string, string[]>();
    if (folderIds.length === 0) return covers;
    // Serpent-verg review fix: libraries predating revision_artifacts.status
    // (v9) or linked_ignored_assets have no covers to map.
    if (
      !columnsFor(openLibrary.connection, 'revision_artifacts').has('status') ||
      !hasTable(openLibrary.connection, 'linked_ignored_assets')
    ) {
      return covers;
    }
    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'a.managed_folder_id',
      folderIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT a.managed_folder_id AS folder_id, ra.artifact_id AS artifact_id
               FROM assets a
               JOIN revision_artifacts ra
                 ON ra.revision_id = a.current_revision_id
                AND ra.invalidated_at IS NULL
                AND ra.status = 'ready'
                AND ra.kind = CASE
                  WHEN LOWER(a.relative_file_path) LIKE '%.mp4'
                    OR LOWER(a.relative_file_path) LIKE '%.webm'
                    OR LOWER(a.relative_file_path) LIKE '%.mov'
                    OR LOWER(a.relative_file_path) LIKE '%.avi'
                    OR LOWER(a.relative_file_path) LIKE '%.wmv'
                    OR LOWER(a.relative_file_path) LIKE '%.mkv'
                    OR LOWER(a.relative_file_path) LIKE '%.m4v'
                    OR LOWER(a.relative_file_path) LIKE '%.flv'
                  THEN 'video_poster'
                  ELSE 'thumbnail'
                END
              WHERE ${sql}
                AND a.deleted_at IS NULL
                AND NOT EXISTS (
                  SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id
                )
                AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', showIgnored)}
              ORDER BY a.managed_folder_id, a.relative_file_path`,
          )
          .all(...params) as Array<{ folder_id: string; artifact_id: string }>,
    );

    for (const row of rows) {
      const existing = covers.get(row.folder_id) ?? [];
      if (existing.length >= 3) continue;
      existing.push(row.artifact_id);
      covers.set(row.folder_id, existing);
    }

    // Serpent-9021d1: For pure folders (folders with directAssetCount === 0),
    // pick up to 4 covers from their child folders in round-robin order so
    // the folder card displays a 2x2 collage preview of its subfolder contents.
    const missingFolderIds = folderIds.filter((id) => (covers.get(id)?.length ?? 0) === 0);
    if (missingFolderIds.length > 0) {
      this.populateChildFolderCovers(openLibrary, missingFolderIds, covers, showIgnored);
    }

    return covers;
  }

  /**
   * Serpent-9021d1: For pure folders (folders with directAssetCount === 0),
   * pick up to 4 covers from their child folders in round-robin order so
   * the folder card displays a 2x2 collage preview of its subfolder contents.
   */
  public override populateChildFolderCovers(
    openLibrary: OpenLibrary,
    parentFolderIds: string[],
    covers: Map<string, string[]>,
    showIgnored = false,
  ): void {
    if (parentFolderIds.length === 0) return;

    const allFolders = (
      openLibrary.connection
        .prepare('SELECT folder_id, parent_folder_id, relative_path, name FROM managed_folders')
        .all() as ManagedFolderRow[]
    ).filter(
      (folder) => showIgnored || !this.explicitFolderIgnored(openLibrary, 'managed', null, folder.relative_path),
    );

    const parentToChildren = new Map<string, ManagedFolderRow[]>();
    for (const folder of allFolders) {
      if (folder.parent_folder_id) {
        const list = parentToChildren.get(folder.parent_folder_id) ?? [];
        list.push(folder);
        parentToChildren.set(folder.parent_folder_id, list);
      }
    }
    for (const list of parentToChildren.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    }

    const folderToDirectChild = new Map<string, { parentFolderId: string; childIndex: number }>();
    const allDescendantFolderIds: string[] = [];

    for (const parentId of parentFolderIds) {
      const directChildren = parentToChildren.get(parentId) ?? [];
      for (let i = 0; i < directChildren.length; i++) {
        const child = directChildren[i]!;
        const queue = [child.folder_id];
        while (queue.length > 0) {
          const currId = queue.shift()!;
          if (!folderToDirectChild.has(currId)) {
            folderToDirectChild.set(currId, { parentFolderId: parentId, childIndex: i });
            allDescendantFolderIds.push(currId);
          }
          const subChildren = parentToChildren.get(currId);
          if (subChildren) {
            for (const sub of subChildren) {
              queue.push(sub.folder_id);
            }
          }
        }
      }
    }

    if (allDescendantFolderIds.length === 0) return;

    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'a.managed_folder_id',
      allDescendantFolderIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT a.managed_folder_id AS folder_id, ra.artifact_id AS artifact_id
               FROM assets a
               JOIN revision_artifacts ra
                 ON ra.revision_id = a.current_revision_id
                AND ra.invalidated_at IS NULL
                AND ra.status = 'ready'
                AND ra.kind = CASE
                  WHEN LOWER(a.relative_file_path) LIKE '%.mp4'
                    OR LOWER(a.relative_file_path) LIKE '%.webm'
                    OR LOWER(a.relative_file_path) LIKE '%.mov'
                    OR LOWER(a.relative_file_path) LIKE '%.avi'
                    OR LOWER(a.relative_file_path) LIKE '%.wmv'
                    OR LOWER(a.relative_file_path) LIKE '%.mkv'
                    OR LOWER(a.relative_file_path) LIKE '%.m4v'
                    OR LOWER(a.relative_file_path) LIKE '%.flv'
                  THEN 'video_poster'
                  ELSE 'thumbnail'
                END
              WHERE ${sql}
                AND a.deleted_at IS NULL
                AND NOT EXISTS (
                  SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id
                )
                AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', showIgnored)}
              ORDER BY a.managed_folder_id, a.relative_file_path`,
          )
          .all(...params) as Array<{ folder_id: string; artifact_id: string }>,
    );

    const artifactsByParentAndChild = new Map<string, Map<number, string[]>>();
    for (const row of rows) {
      const match = folderToDirectChild.get(row.folder_id);
      if (!match) continue;
      let childMap = artifactsByParentAndChild.get(match.parentFolderId);
      if (!childMap) {
        childMap = new Map();
        artifactsByParentAndChild.set(match.parentFolderId, childMap);
      }
      const list = childMap.get(match.childIndex) ?? [];
      list.push(row.artifact_id);
      childMap.set(match.childIndex, list);
    }

    for (const parentId of parentFolderIds) {
      const directChildren = parentToChildren.get(parentId) ?? [];
      if (directChildren.length === 0) continue;
      const childMap = artifactsByParentAndChild.get(parentId);
      if (!childMap) continue;

      const picked: string[] = [];
      let round = 0;
      while (picked.length < 4) {
        let addedInRound = false;
        for (let c = 0; c < directChildren.length && picked.length < 4; c++) {
          const list = childMap.get(c);
          if (list && round < list.length) {
            picked.push(list[round]!);
            addedInRound = true;
          }
        }
        if (!addedInRound) break;
        round++;
      }
      if (picked.length > 0) {
        covers.set(parentId, picked);
      }
    }
  }

  /**
   * Serpent-d0nv: cover scheduling candidates — the top-4 direct assets per
   * folder by path, with NO ready-thumbnail requirement. The cover thumbnail
   * scene (priority 400) schedules these asset ids so folders without covers
   * generate their cover before the p50 path-alphabetical backfill; assets
   * that already have a ready artifact are a no-op in enqueueThumbnailJobs.
   */
  public override folderCoverCandidateAssetMap(
    openLibrary: OpenLibrary,
    folderIds: string[],
    showIgnored = false,
  ): Map<string, string[]> {
    const candidates = new Map<string, string[]>();
    if (folderIds.length === 0) return candidates;
    if (!hasTable(openLibrary.connection, 'linked_ignored_assets')) {
      return candidates;
    }
    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'a.managed_folder_id',
      folderIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT a.managed_folder_id AS folder_id, a.asset_id AS asset_id
               FROM assets a
              WHERE ${sql}
                AND a.deleted_at IS NULL
                AND NOT EXISTS (
                  SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id
                )
                AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', showIgnored)}
              ORDER BY a.managed_folder_id, a.relative_file_path`,
          )
          .all(...params) as Array<{ folder_id: string; asset_id: string }>,
    );

    for (const row of rows) {
      const existing = candidates.get(row.folder_id) ?? [];
      if (existing.length >= 3) continue;
      existing.push(row.asset_id);
      candidates.set(row.folder_id, existing);
    }

    // Serpent-9021d1: Candidate assets for pure folders' child folder covers
    // so thumbnail generation at `cover` scene schedules them proactively.
    const missingFolderIds = folderIds.filter((id) => (candidates.get(id)?.length ?? 0) === 0);
    if (missingFolderIds.length > 0) {
      this.populateChildFolderCandidateAssets(openLibrary, missingFolderIds, candidates, showIgnored);
    }

    return candidates;
  }

  /**
   * Serpent-9021d1: For pure folders (folders with directAssetCount === 0),
   * pick up to 4 candidate asset ids from their child folders in round-robin
   * order so the cover thumbnail scene schedules them proactively.
   */
  public override populateChildFolderCandidateAssets(
    openLibrary: OpenLibrary,
    parentFolderIds: string[],
    candidates: Map<string, string[]>,
    showIgnored = false,
  ): void {
    if (parentFolderIds.length === 0) return;

    const allFolders = (
      openLibrary.connection
        .prepare('SELECT folder_id, parent_folder_id, relative_path, name FROM managed_folders')
        .all() as ManagedFolderRow[]
    ).filter(
      (folder) => showIgnored || !this.explicitFolderIgnored(openLibrary, 'managed', null, folder.relative_path),
    );

    const parentToChildren = new Map<string, ManagedFolderRow[]>();
    for (const folder of allFolders) {
      if (folder.parent_folder_id) {
        const list = parentToChildren.get(folder.parent_folder_id) ?? [];
        list.push(folder);
        parentToChildren.set(folder.parent_folder_id, list);
      }
    }
    for (const list of parentToChildren.values()) {
      list.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    }

    const folderToDirectChild = new Map<string, { parentFolderId: string; childIndex: number }>();
    const allDescendantFolderIds: string[] = [];

    for (const parentId of parentFolderIds) {
      const directChildren = parentToChildren.get(parentId) ?? [];
      for (let i = 0; i < directChildren.length; i++) {
        const child = directChildren[i]!;
        const queue = [child.folder_id];
        while (queue.length > 0) {
          const currId = queue.shift()!;
          if (!folderToDirectChild.has(currId)) {
            folderToDirectChild.set(currId, { parentFolderId: parentId, childIndex: i });
            allDescendantFolderIds.push(currId);
          }
          const subChildren = parentToChildren.get(currId);
          if (subChildren) {
            for (const sub of subChildren) {
              queue.push(sub.folder_id);
            }
          }
        }
      }
    }

    if (allDescendantFolderIds.length === 0) return;

    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'a.managed_folder_id',
      allDescendantFolderIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT a.managed_folder_id AS folder_id, a.asset_id AS asset_id
               FROM assets a
              WHERE ${sql}
                AND a.deleted_at IS NULL
                AND NOT EXISTS (
                  SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id
                )
                AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', showIgnored)}
              ORDER BY a.managed_folder_id, a.relative_file_path`,
          )
          .all(...params) as Array<{ folder_id: string; asset_id: string }>,
    );

    const assetsByParentAndChild = new Map<string, Map<number, string[]>>();
    for (const row of rows) {
      const match = folderToDirectChild.get(row.folder_id);
      if (!match) continue;
      let childMap = assetsByParentAndChild.get(match.parentFolderId);
      if (!childMap) {
        childMap = new Map();
        assetsByParentAndChild.set(match.parentFolderId, childMap);
      }
      const list = childMap.get(match.childIndex) ?? [];
      list.push(row.asset_id);
      childMap.set(match.childIndex, list);
    }

    for (const parentId of parentFolderIds) {
      const directChildren = parentToChildren.get(parentId) ?? [];
      if (directChildren.length === 0) continue;
      const childMap = assetsByParentAndChild.get(parentId);
      if (!childMap) continue;

      const picked: string[] = [];
      let round = 0;
      while (picked.length < 4) {
        let addedInRound = false;
        for (let c = 0; c < directChildren.length && picked.length < 4; c++) {
          const list = childMap.get(c);
          if (list && round < list.length) {
            picked.push(list[round]!);
            addedInRound = true;
          }
        }
        if (!addedInRound) break;
        round++;
      }
      if (picked.length > 0) {
        candidates.set(parentId, picked);
      }
    }
  }

  public override summarizeManagedFolderRow(
    openLibrary: OpenLibrary,
    row: ManagedFolderRow,
    counts?: {
      directAssetCounts: Map<string, number>;
      childFolderCounts: Map<string, number>;
    },
  ): ManagedFolderSummary {
    const resolved = counts ?? this.managedFolderCountMaps(openLibrary, [row.folder_id]);
    return {
      folderId: row.folder_id,
      parentFolderId: row.parent_folder_id,
      name: row.name,
      relativePath: row.relative_path,
      directAssetCount: resolved.directAssetCounts.get(row.folder_id) ?? 0,
      childFolderCount: resolved.childFolderCounts.get(row.folder_id) ?? 0,
      createdAt: row.created_at,
      appearance: sanitizeEntityAppearance({
        glyphKind: row.appearance_glyph_kind,
        glyphValue: row.appearance_glyph_value,
        colorId: row.appearance_color_id,
      }),
    };
  }

  /**
   * Serpent-toh: single-row returns (rename no-op / normal) must show the
   * displayed recursive directAssetCount, matching listManagedFolders —
   * otherwise the badge flickers from direct-only to recursive on refresh.
   */
  public override summarizeManagedFolderRowRecursive(
    openLibrary: OpenLibrary,
    row: ManagedFolderRow,
  ): ManagedFolderSummary {
    const summary = this.summarizeManagedFolderRow(openLibrary, row);
    const recursive = this.managedFolderRecursiveAssetCounts(openLibrary, [
      row,
    ]);
    return {
      ...summary,
      directAssetCount:
        recursive.get(row.folder_id) ?? summary.directAssetCount,
    };
  }

  /**
   * Linked subfolders are virtual rows.  Asset-derived prefixes cover normal
   * populated folders, but an empty directory created from Serpent must also
   * remain visible after refresh/reopen, so include real directories from the
   * linked root as well.  Symlinks and ignored directories are never followed.
   */
  public override collectLinkedDirectoryPrefixesFromDisk(
    openLibrary: OpenLibrary,
    linkedFolderId: string,
    rootPath: string,
    rules: LinkedFolderRule[],
    includeGitignoreHidden = false,
  ): string[] {
    const prefixes = new Set<string>();
    const visit = (directoryPath: string, relativeDirectory: string): void => {
      let entries;
      try {
        entries = readdirSync(directoryPath, { withFileTypes: true });
      } catch {
        return;
      }
      for (const entry of entries) {
        if (!entry.isDirectory() || entry.isSymbolicLink()) continue;
        const relativePath = relativeDirectory === ''
          ? entry.name
          : path.posix.join(relativeDirectory, entry.name);
        let normalized: string;
        try {
          normalized = normalizeRelativeAssetPath(relativePath);
        } catch {
          continue;
        }
        // Probe the folder target so folder rules (including default hidden
        // directories) are applied with the same matcher as asset scans.
        if (this.linkedPathIsIgnored(`${normalized}/__serpent_probe__`, rules)) continue;
        if (!includeGitignoreHidden && this.explicitFolderIgnored(openLibrary, 'linked', linkedFolderId, normalized)) continue;
        prefixes.add(normalized);
        visit(path.join(directoryPath, entry.name), normalized);
      }
    };
    visit(rootPath, '');
    return [...prefixes].sort();
  }

  override listLinkedFolders(libraryId: string): LinkedFolderSummary[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const rows = openLibrary.connection
      .prepare(
        `SELECT folder_id, display_name, status, absolute_root_path, parent_folder_id,
                created_at, appearance_glyph_kind, appearance_glyph_value, appearance_color_id
           FROM linked_folders WHERE library_id = ? ORDER BY display_name`,
      )
      .all(libraryId) as Array<{
        folder_id: string;
        display_name: string;
        status: 'available' | 'offline';
        absolute_root_path: string;
        parent_folder_id: string | null;
        created_at: string;
        appearance_glyph_kind?: string | null;
        appearance_glyph_value?: string | null;
        appearance_color_id?: string | null;
      }>;
    return rows
      .filter((row) => !this.explicitFolderIgnored(openLibrary, 'linked', row.folder_id, ''))
      .flatMap((row) => {
        const paths = this.listLinkedAssetRelativePaths(openLibrary, row.folder_id, false);
        const assetCounts = countLinkedDirectoryAssets(paths);
        const assetPrefixes = [...assetCounts.keys()].filter((prefix) => prefix !== '');
        const diskPrefixes = row.status === 'available' && !this.linkedRootIsGone(row.absolute_root_path)
          ? this.collectLinkedDirectoryPrefixesFromDisk(
            openLibrary,
            row.folder_id,
            row.absolute_root_path,
            this.getLinkedFolderRules({ libraryId, folderId: row.folder_id }),
          )
          : [];
        const prefixes = [...new Set([...assetPrefixes, ...diskPrefixes])].sort();
        const root: LinkedFolderSummary = {
          folderId: row.folder_id,
          displayName: row.display_name,
          status: row.status,
          assetCount: paths.length,
          absoluteRootPath: row.absolute_root_path,
          linkedFolderId: row.folder_id,
          relativePath: '',
          // Serpent-316493: a linked root may hang under a managed folder.
          parentFolderId: row.parent_folder_id ?? null,
          createdAt: row.created_at,
          appearance: sanitizeEntityAppearance({
            glyphKind: row.appearance_glyph_kind,
            glyphValue: row.appearance_glyph_value,
            colorId: row.appearance_color_id,
          }),
        };
        const children = prefixes
          .filter((prefix) => !this.explicitFolderIgnored(openLibrary, 'linked', row.folder_id, prefix))
          .map((relativePath) => {
            const parentPath = parentLinkedRelativePath(relativePath);
            return {
              folderId: encodeLinkedVirtualFolderId(row.folder_id, relativePath),
              displayName: linkedDirectoryName(relativePath),
              status: row.status,
              assetCount: assetCounts.get(relativePath)?.recursive ?? 0,
              absoluteRootPath: row.absolute_root_path,
              linkedFolderId: row.folder_id,
              relativePath,
              parentFolderId:
                parentPath === null || parentPath === ''
                  ? row.folder_id
                  : encodeLinkedVirtualFolderId(row.folder_id, parentPath),
            };
          });
        return [root, ...children];
      });
  }

  override getLinkedFolderRules(input: { libraryId: string; folderId: string }): LinkedFolderRule[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const folder = openLibrary.connection
      .prepare('SELECT folder_id FROM linked_folders WHERE folder_id = ? AND library_id = ?')
      .get(input.folderId, input.libraryId);
    if (!folder) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    return (openLibrary.connection.prepare(
      `SELECT rule_id, action, target, pattern, enabled
         FROM linked_folder_rules WHERE folder_id = ? ORDER BY position`,
    ).all(input.folderId) as Array<{
      rule_id: string; action: 'include' | 'exclude'; target: LinkedFolderRule['target']; pattern: string; enabled: number;
    }>).map((row) => ({
      ruleId: row.rule_id,
      action: row.action,
      target: row.target,
      pattern: row.pattern,
      enabled: row.enabled === 1,
    }));
  }

  override setLinkedFolderRules(input: {
    libraryId: string;
    folderId: string;
    rules: LinkedFolderRule[];
  }): { rules: LinkedFolderRule[]; hiddenCount: number; restoredCount: number } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const folder = openLibrary.connection.prepare(
      'SELECT folder_id FROM linked_folders WHERE folder_id = ? AND library_id = ?',
    ).get(input.folderId, input.libraryId);
    if (!folder) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    if (input.rules.length > 200 || new Set(input.rules.map((rule) => rule.ruleId)).size !== input.rules.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const rules = input.rules.map((rule) => this.normalizeLinkedFolderRule(rule));
    let hiddenCount = 0;
    let restoredCount = 0;
    const now = new Date().toISOString();
    openLibrary.connection.transaction(() => {
      openLibrary.connection.prepare('DELETE FROM linked_folder_rules WHERE folder_id = ?').run(input.folderId);
      const insertRule = openLibrary.connection.prepare(
        `INSERT INTO linked_folder_rules(rule_id, folder_id, position, action, target, pattern, enabled)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      );
      rules.forEach((rule, position) => insertRule.run(
        rule.ruleId, input.folderId, position, rule.action, rule.target, rule.pattern, rule.enabled ? 1 : 0,
      ));
      const assets = openLibrary.connection.prepare(
        `SELECT a.asset_id, a.relative_file_path,
                EXISTS(SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id) AS ignored
           FROM assets a WHERE a.linked_folder_id = ?`,
      ).all(input.folderId) as Array<{ asset_id: string; relative_file_path: string; ignored: number }>;
      for (const asset of assets) {
        const ignored = this.linkedPathIsIgnored(asset.relative_file_path, rules)
          || this.isExplicitlyIgnored(
            openLibrary,
            'linked',
            input.folderId,
            asset.relative_file_path,
            'asset',
          );
        if (ignored && asset.ignored === 0) {
          openLibrary.connection.prepare(
            'INSERT OR REPLACE INTO linked_ignored_assets(asset_id, ignored_at) VALUES (?, ?)',
          ).run(asset.asset_id, now);
          hiddenCount += 1;
        } else if (!ignored && asset.ignored === 1) {
          openLibrary.connection.prepare('DELETE FROM linked_ignored_assets WHERE asset_id = ?').run(asset.asset_id);
          restoredCount += 1;
        }
      }
    })();
    this.refreshManagedAssets(input.libraryId);
    return { rules: this.getLinkedFolderRules(input), hiddenCount, restoredCount };
  }

  override copyAssetsToLinkedFolder(input: {
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
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    const folder = openLibrary.connection.prepare(
      `SELECT absolute_root_path, status FROM linked_folders
        WHERE folder_id = ? AND library_id = ?`,
    ).get(input.folderId, input.libraryId) as { absolute_root_path: string; status: string } | undefined;
    if (!folder) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    if (folder.status !== 'available' || !realDirectoryExists(folder.absolute_root_path)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'SOURCE_NOT_FOUND' });
    }
    const target = this.resolveLinkedDirectoryMutationTarget(
      openLibrary,
      input.folderId,
      input.relativePath ?? '',
    );
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
    }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT a.asset_id, a.location_kind, a.linked_folder_id, a.relative_file_path
           FROM assets a
          WHERE a.asset_id IN (${placeholders})
            AND a.deleted_at IS NULL AND a.availability = 'available'`,
    });
    if (rows.length !== input.assetIds.length) throw new LibraryServiceError('ASSET_NOT_FOUND');
    const copiedPaths: string[] = [];
    const copiedSourceAssetIds: string[] = [];
    const backups: Array<{ destination: string; backup: string }> = [];
    const operationId = randomUUID();
    const operationPath = path.join(this.assertSafeOperationsRoot(openLibrary.summary.libraryPath), operationId);
    const backupPath = path.join(operationPath, 'backup');
    let skippedCount = 0;
    try {
      mkdirSync(backupPath, { recursive: true });
      const occupied = new Set<string>();
      for (const [index, row] of rows.entries()) {
        const sourcePath = row.location_kind === 'managed'
          ? this.folderPath(openLibrary, row.relative_file_path)
          : this.linkedAssetPath(
            openLibrary,
            row.linked_folder_id,
            row.relative_file_path,
          );
        const sourceEntry = lstatSync(sourcePath);
        if (!sourceEntry.isFile() || sourceEntry.isSymbolicLink()) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'UNSUPPORTED_FILE_ENTRY' });
        }
        const originalName = path.posix.basename(row.relative_file_path);
        let relativeDestination = target.relativePath === ''
          ? normalizeRelativeAssetPath(originalName)
          : normalizeRelativeAssetPath(path.posix.join(target.relativePath, originalName));
        let destination = path.join(folder.absolute_root_path, ...relativeDestination.split('/'));
        const destinationExists = (): boolean => occupied.has(portablePathIdentity(relativeDestination)) || existsSync(destination);
        if (destinationExists()) {
          if (input.conflictStrategy === 'skip') {
            skippedCount += 1;
            continue;
          }
          if (input.conflictStrategy === 'keep-both') {
            let found = false;
            for (let suffix = 2; suffix < 10_000 && !found; suffix += 1) {
              for (const candidate of copyNameCandidates(originalName, suffix)) {
                relativeDestination = target.relativePath === ''
                  ? normalizeRelativeAssetPath(candidate)
                  : normalizeRelativeAssetPath(path.posix.join(target.relativePath, candidate));
                destination = path.join(folder.absolute_root_path, ...relativeDestination.split('/'));
                if (!destinationExists()) { found = true; break; }
              }
            }
            if (!found) throw new LibraryServiceError('IMPORT_APPLY_FAILED', { reason: 'NAME_NOT_SUPPORTED' });
          } else {
            const destinationEntry = lstatSync(destination);
            if (!destinationEntry.isFile() || destinationEntry.isSymbolicLink()) {
              throw new LibraryServiceError('IMPORT_APPLY_FAILED', { reason: 'UNSUPPORTED_FILE_ENTRY' });
            }
            const backup = path.join(backupPath, String(index));
            renameSync(destination, backup);
            backups.push({ destination, backup });
          }
        }
        copyFileSync(sourcePath, destination, constants.COPYFILE_EXCL);
        copiedPaths.push(relativeDestination);
        copiedSourceAssetIds.push(row.asset_id);
        occupied.add(portablePathIdentity(relativeDestination));
      }
      rmSync(operationPath, { recursive: true, force: true });
    } catch (error) {
      for (const relativePath of copiedPaths.reverse()) {
        rmSync(path.join(folder.absolute_root_path, ...relativePath.split('/')), { force: true });
      }
      for (const backup of backups.reverse()) {
        if (existsSync(backup.backup)) renameSync(backup.backup, backup.destination);
      }
      rmSync(operationPath, { recursive: true, force: true });
      this.diagnose('linked-folder.copy-assets', error, {
        libraryId: input.libraryId, linkedFolderId: input.folderId, requestedCount: input.assetIds.length,
      });
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }
    // 只注册本次复制的文件，避免 refreshManagedAssets 全量枚举导致的复制缓慢。
    this.registerWrittenLinkedAssets(
      openLibrary,
      input.folderId,
      folder.absolute_root_path,
      copiedPaths,
    );
    const copiedIdentities = new Set(copiedPaths.map(portablePathIdentity));
    const assets = this.listAssets({ libraryId: input.libraryId, folderId: input.folderId, recursive: true })
      .filter((asset) => copiedIdentities.has(portablePathIdentity(asset.relativeFilePath)));
    return {
      copiedCount: copiedPaths.length,
      skippedCount,
      assets,
      copiedSourceAssetIds,
    };
  }

  /**
   * Copy assets that live in an external linked folder into the managed
   * library. Linked sources are intentionally copied (never removed from the
   * user's external directory); this is the symmetric counterpart to
   * copyAssetsToLinkedFolder and lets linked assets participate in ordinary
   * folder drag-and-drop.
   */
  override copyLinkedAssetsToManagedFolder(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId: string | null;
  }): { copiedCount: number; skippedCount: number; assets: AssetSummary[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      linked_folder_id: string | null;
      relative_file_path: string;
      availability: 'available' | 'missing';
    }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, linked_folder_id, relative_file_path, availability
           FROM assets
          WHERE asset_id IN (${placeholders})
            AND location_kind = 'linked' AND deleted_at IS NULL`,
    });
    if (rows.length !== input.assetIds.length) {
      throw new LibraryServiceError('ASSET_NOT_FOUND');
    }
    const sourcePaths = rows.map((row) => {
      if (row.availability !== 'available') {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
      const sourcePath = this.linkedAssetPath(
        openLibrary,
        row.linked_folder_id,
        row.relative_file_path,
      );
      if (!realFileExists(sourcePath)) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
      return sourcePath;
    });
    // A linked asset is already indexed in this library. This operation is an
    // explicit copy, so the source's content hash must not be treated as a
    // library duplicate and silently skipped.
    const prepared = this.prepareImport({
      libraryId: input.libraryId,
      targetFolderId: input.targetFolderId ?? undefined,
      sourceKind: 'files',
      sourcePaths,
      skipLibraryDuplicateScan: true,
    });
    const completion = this.finishImportWithoutUserDecision(prepared, {
      suspectedDuplicate: 'skip',
      nameConflict: 'keep-both',
    });
    return {
      copiedCount: completion.importedCount + completion.replacedCount,
      skippedCount: completion.skippedCount,
      assets: completion.assets,
    };
  }

  override convertLinkedFolderToManaged(input: {
    libraryId: string;
    folderId: string;
    targetFolderId?: string;
  }): { managedFolderId: string; convertedCount: number; assets: AssetSummary[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const linked = openLibrary.connection.prepare(
      `SELECT display_name, absolute_root_path, status FROM linked_folders
        WHERE folder_id = ? AND library_id = ?`,
    ).get(input.folderId, input.libraryId) as {
      display_name: string; absolute_root_path: string; status: 'available' | 'offline';
    } | undefined;
    if (!linked) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    if (linked.status !== 'available' || !realDirectoryExists(linked.absolute_root_path)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'SOURCE_NOT_FOUND' });
    }
    const parent = input.targetFolderId
      ? openLibrary.connection.prepare(
          'SELECT folder_id, relative_path FROM managed_folders WHERE folder_id = ?',
        ).get(input.targetFolderId) as { folder_id: string; relative_path: string } | undefined
      : undefined;
    if (input.targetFolderId && !parent) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    let folderName = normalizeFolderName(linked.display_name);
    let targetPrefix = parent ? path.posix.join(parent.relative_path, folderName) : folderName;
    for (let suffix = 2; this.portableDiskDestination(openLibrary, targetPrefix) || openLibrary.connection.prepare(
      'SELECT 1 FROM managed_folders WHERE path_identity = ?',
    ).get(portablePathIdentity(targetPrefix)); suffix += 1) {
      folderName = normalizeFolderName(copyNameCandidates(linked.display_name, suffix)[0]!);
      targetPrefix = parent ? path.posix.join(parent.relative_path, folderName) : folderName;
      if (suffix > 9_999) throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
    }

    const rules = this.getLinkedFolderRules({ libraryId: input.libraryId, folderId: input.folderId });
      const entries = this.enumerateLinkedSources(
        linked.absolute_root_path,
        input.folderId,
        rules,
        (relativePath, pathKind) => this.isExplicitlyIgnored(
          openLibrary,
          'linked',
          input.folderId,
          relativePath,
          pathKind,
        ),
      );
    const linkedAssets = openLibrary.connection.prepare(
      `SELECT a.asset_id, a.relative_file_path,
              EXISTS(SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id) AS ignored
         FROM assets a WHERE a.linked_folder_id = ?`,
    ).all(input.folderId) as Array<{ asset_id: string; relative_file_path: string; ignored: number }>;
    const operationId = randomUUID();
    const operationsRoot = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);
    const operationPath = path.join(operationsRoot, operationId);
    const stagePath = path.join(operationPath, 'stage');
    const directorySet = new Set<string>([targetPrefix]);
    for (const entry of entries) {
      let cursor = path.posix.dirname(path.posix.join(targetPrefix, entry.relativePath));
      while (cursor !== '.' && cursor !== path.posix.dirname(cursor)) {
        directorySet.add(cursor);
        if (cursor === targetPrefix) break;
        cursor = path.posix.dirname(cursor);
      }
    }
    const directories = [...directorySet].sort((a, b) => a.split('/').length - b.split('/').length);
    const manifest: OperationManifest = {
      version: 1,
      phase: 'prepared',
      directories: directories.map((relativePath) => ({ relativePath, existed: false })),
      files: entries.map((entry, index) => ({
        stageName: String(index), backupName: String(index), hadDestination: false,
        destinationRelativePath: path.posix.join(targetPrefix, entry.relativePath),
      })),
    };
    const now = new Date().toISOString();
    try {
      openLibrary.connection.prepare(
        `INSERT INTO file_operations(operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
         VALUES (?, 'import', 'preparing', ?, NULL, ?, ?)`,
      ).run(operationId, JSON.stringify(manifest), now, now);
      mkdirSync(stagePath, { recursive: true });
      entries.forEach((entry, index) => {
        const sourcePath = this.linkedAssetPath(openLibrary, input.folderId, entry.relativePath);
        copyFileSync(sourcePath, path.join(stagePath, String(index)), constants.COPYFILE_EXCL);
      });
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'applying', updated_at = ? WHERE operation_id = ?",
      ).run(new Date().toISOString(), operationId);
      for (const directory of directories) mkdirSync(this.folderPath(openLibrary, directory));
      entries.forEach((entry, index) => {
        renameSync(
          path.join(stagePath, String(index)),
          this.folderPath(openLibrary, path.posix.join(targetPrefix, entry.relativePath)),
        );
      });
      this.failAt('crash-linked-convert-after-filesystem');
      const managedFolderId = randomUUID();
      const convertedAt = new Date().toISOString();
      openLibrary.connection.transaction(() => {
        openLibrary.connection.prepare(
          `INSERT INTO managed_folders(folder_id, parent_folder_id, name, relative_path, path_identity, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
        ).run(
          managedFolderId, parent?.folder_id ?? null, folderName, targetPrefix,
          portablePathIdentity(targetPrefix), convertedAt,
        );
        const updateAsset = openLibrary.connection.prepare(
          `UPDATE assets SET location_kind = 'managed', managed_folder_id = ?, linked_folder_id = NULL,
                  relative_file_path = ?, path_identity = ?, availability = ?, updated_at = ?
            WHERE asset_id = ?`,
        );
        for (const asset of linkedAssets) {
          const managedPath = path.posix.join(targetPrefix, asset.relative_file_path);
          const copied = !asset.ignored && entries.some((entry) =>
            portablePathIdentity(entry.relativePath) === portablePathIdentity(asset.relative_file_path));
          updateAsset.run(
            managedFolderId, managedPath, portablePathIdentity(managedPath), copied ? 'available' : 'missing',
            convertedAt, asset.asset_id,
          );
          openLibrary.connection.prepare('DELETE FROM linked_ignored_assets WHERE asset_id = ?').run(asset.asset_id);
          this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
        }
        openLibrary.connection.prepare("DELETE FROM explicit_ignored_paths WHERE linked_folder_id = ?").run(input.folderId);
        openLibrary.connection.prepare('DELETE FROM linked_folders WHERE folder_id = ?').run(input.folderId);
        openLibrary.connection.prepare(
          "UPDATE file_operations SET status = 'committed', updated_at = ? WHERE operation_id = ?",
        ).run(convertedAt, operationId);
      })();
      this.stopLinkedWatcher(input.libraryId, input.folderId);
      try {
        this.removeOperation(operationPath);
      } catch (cleanupError) {
        // The database and destination bytes committed atomically. A committed
        // operation directory is safe to retain; normal reopen recovery removes it.
        this.diagnose('linked-folder.convert.committed-cleanup', cleanupError, {
          libraryId: input.libraryId, folderId: input.folderId, operationId,
        });
      }
      const assetIds = new Set(linkedAssets.map((asset) => asset.asset_id));
      const assets = this.listAssets({ libraryId: input.libraryId, folderId: managedFolderId, recursive: true })
        .filter((asset) => assetIds.has(asset.assetId));
      return { managedFolderId, convertedCount: entries.length, assets };
    } catch (error) {
      if (error instanceof SimulatedCrashError) {
        throw new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error });
      }
      try {
        for (const entry of [...entries].reverse()) {
          rmSync(this.folderPath(openLibrary, path.posix.join(targetPrefix, entry.relativePath)), { force: true });
        }
        for (const directory of [...directories].reverse()) {
          try { rmdirSync(this.folderPath(openLibrary, directory)); } catch { /* external writer or non-empty */ }
        }
        this.removeOperation(operationPath);
        openLibrary.connection.prepare(
          "UPDATE file_operations SET status = 'rolled_back', error_code = 'IMPORT_APPLY_FAILED', updated_at = ? WHERE operation_id = ?",
        ).run(new Date().toISOString(), operationId);
      } catch (rollbackError) {
        this.diagnose('linked-folder.convert.rollback', rollbackError, { libraryId: input.libraryId, folderId: input.folderId });
      }
      this.diagnose('linked-folder.convert', error, { libraryId: input.libraryId, folderId: input.folderId });
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }
  }
}
