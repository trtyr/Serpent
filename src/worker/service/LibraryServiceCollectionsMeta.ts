/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { OpenLibrary } from '../library-service-internals';
import { LibraryServiceError } from '../library-service-internals';
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
import { LibraryServiceTags } from './LibraryServiceTags';

/** LibraryServiceCollectionsMeta: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceCollectionsMeta extends LibraryServiceTags {

  // ── Collections ────────────────────────────────────────────────────

  override createCollection(input: {
    libraryId: string;
    parentId?: string;
    name: string;
  }): CollectionSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const trimmed = input.name.trim();
    if (trimmed.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');

    if (input.parentId) {
      const parent = openLibrary.connection
        .prepare(
          'SELECT collection_id FROM collections WHERE collection_id = ? AND library_id = ?',
        )
        .get(input.parentId, openLibrary.summary.libraryId);
      if (!parent) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    const maxPosRow = openLibrary.connection
      .prepare(
        input.parentId
          ? 'SELECT COALESCE(MAX(position), -1) AS max_pos FROM collections WHERE parent_id = ? AND library_id = ?'
          : 'SELECT COALESCE(MAX(position), -1) AS max_pos FROM collections WHERE parent_id IS NULL AND library_id = ?',
      )
      .get(
        ...(input.parentId
          ? [input.parentId, openLibrary.summary.libraryId]
          : [openLibrary.summary.libraryId]),
      ) as { max_pos: number };
    const position = maxPosRow.max_pos + 1;

    const collectionId = randomUUID();
    const now = new Date().toISOString();

    openLibrary.connection
      .prepare(
        `INSERT INTO collections
           (collection_id, library_id, parent_id, name, position, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        collectionId,
        openLibrary.summary.libraryId,
        input.parentId ?? null,
        trimmed,
        position,
        now,
        now,
      );

    return {
      collectionId,
      parentId: input.parentId ?? null,
      name: trimmed,
      description: null,
      coverAssetId: null,
      position,
      assetCount: 0,
      childCollectionCount: 0,
      // Single-row return must match listCollections, which always reports it.
      appearance: null,
    };
  }

  override listCollections(libraryId: string): CollectionSummary[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the
    // collections table degrade to an empty list; missing display columns
    // (description/cover_asset_id) fill with null.
    const connection = openLibrary.connection;
    if (!hasTable(connection, 'collections')) return [];
    const collectionColumns = columnsFor(connection, 'collections');
    const selectList = [
      'c.collection_id',
      'c.parent_id',
      'c.name',
      'c.position',
      ...qualify('c', collectionColumns, ['description', 'cover_asset_id', 'appearance_glyph_kind', 'appearance_glyph_value', 'appearance_color_id']),
      `(SELECT COUNT(*) FROM collections ch WHERE ch.parent_id = c.collection_id) AS child_count`,
    ].join(',\n');
    const recursiveAssetCounts = this.collectionRecursiveAssetCounts(openLibrary);
    const rows = connection
      .prepare(
        `SELECT ${selectList}
           FROM collections c
          WHERE c.library_id = ?
          ORDER BY c.position, c.name`,
      )
      .all(openLibrary.summary.libraryId) as Array<{
        collection_id: string;
        parent_id: string | null;
        name: string;
        description: string | null;
        cover_asset_id: string | null;
        position: number;
        child_count: number;
        appearance_glyph_kind?: string | null;
        appearance_glyph_value?: string | null;
        appearance_color_id?: string | null;
      }>;
    return rows.map((row) => ({
      collectionId: row.collection_id,
      parentId: row.parent_id,
      name: row.name,
      description: row.description ?? null,
      coverAssetId: row.cover_asset_id ?? null,
      position: row.position,
      // Recursive collection scope is a set union, not a sum: an asset can
      // be directly assigned to both a parent and one of its descendants.
      assetCount: recursiveAssetCounts.get(row.collection_id) ?? 0,
      childCollectionCount: row.child_count,
      appearance: sanitizeEntityAppearance({
        glyphKind: row.appearance_glyph_kind,
        glyphValue: row.appearance_glyph_value,
        colorId: row.appearance_color_id,
      }),
    }));
  }

  /**
   * Returns the visible asset union for every collection and its descendants.
   * Collections are allowed to overlap, so COUNT(DISTINCT) is required here;
   * the folder count implementation can sum disjoint subtrees instead.
   */
  public override collectionRecursiveAssetCounts(
    openLibrary: OpenLibrary,
  ): Map<string, number> {
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the
    // collection tables have no recursive counts; callers show zero.
    if (
      !hasTable(openLibrary.connection, 'collections') ||
      !hasTable(openLibrary.connection, 'collection_assets')
    ) {
      return new Map();
    }
    // Serpent-4bdd26 / 0032-E.3: the sidebar re-requests collection summaries
    // after every mutation; derived job/artifact writes do not change
    // collection membership, so use the narrow browse sequence as the cache
    // fence rather than the noisy library-wide sequence.
    const browseChangeSequence = this.getBrowseChangeSequence(openLibrary.summary.libraryId);
    if (openLibrary.collectionCountCache?.browseChangeSequence === browseChangeSequence) {
      return openLibrary.collectionCountCache.counts;
    }
    const rows = openLibrary.connection
      .prepare(
        `WITH RECURSIVE collection_tree(root_collection_id, collection_id) AS (
           SELECT c.collection_id, c.collection_id
             FROM collections c
            WHERE c.library_id = ?
           UNION ALL
           SELECT tree.root_collection_id, child.collection_id
             FROM collection_tree tree
             JOIN collections child ON child.parent_id = tree.collection_id
            WHERE child.library_id = ?
         )
         SELECT tree.root_collection_id AS collection_id,
                COUNT(DISTINCT ca.asset_id) AS asset_count
           FROM collection_tree tree
           JOIN collection_assets ca ON ca.collection_id = tree.collection_id
           JOIN assets a ON a.asset_id = ca.asset_id
          WHERE a.deleted_at IS NULL
          GROUP BY tree.root_collection_id`,
      )
      .all(openLibrary.summary.libraryId, openLibrary.summary.libraryId) as Array<{
      collection_id: string;
      asset_count: number;
    }>;
    const counts = new Map(rows.map((row) => [row.collection_id, row.asset_count]));
    openLibrary.collectionCountCache = { browseChangeSequence, counts };
    return counts;
  }

  override updateCollection(input: {
    libraryId: string;
    collectionId: string;
    name?: string;
    parentId?: string | null;
    description?: string | null;
    coverAssetId?: string | null;
    position?: number;
  }): CollectionSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const existing = openLibrary.connection
      .prepare(
        `SELECT collection_id, parent_id, name, description, cover_asset_id, position,
                appearance_glyph_kind, appearance_glyph_value, appearance_color_id
           FROM collections
          WHERE collection_id = ? AND library_id = ?`,
      )
      .get(input.collectionId, openLibrary.summary.libraryId) as {
        collection_id: string;
        parent_id: string | null;
        name: string;
        description: string | null;
        cover_asset_id: string | null;
        position: number;
        appearance_glyph_kind?: string | null;
        appearance_glyph_value?: string | null;
        appearance_color_id?: string | null;
      } | undefined;
    if (!existing) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const now = new Date().toISOString();
    const newName =
      input.name !== undefined ? input.name.trim() : existing.name;
    if (newName.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');
    const newParentId = input.parentId !== undefined ? input.parentId : existing.parent_id;
    if (newParentId !== null) {
      const parent = openLibrary.connection
        .prepare('SELECT parent_id FROM collections WHERE collection_id = ? AND library_id = ?')
        .get(newParentId, openLibrary.summary.libraryId) as { parent_id: string | null } | undefined;
      if (!parent) throw new LibraryServiceError('FOLDER_NOT_FOUND');
      if (newParentId === input.collectionId) throw new LibraryServiceError('FOLDER_NAME_CONFLICT');
      const visited = new Set<string>([input.collectionId]);
      let ancestorId: string | null = newParentId;
      while (ancestorId !== null) {
        if (visited.has(ancestorId)) throw new LibraryServiceError('FOLDER_NAME_CONFLICT');
        visited.add(ancestorId);
        const ancestor = openLibrary.connection
          .prepare('SELECT parent_id FROM collections WHERE collection_id = ? AND library_id = ?')
          .get(ancestorId, openLibrary.summary.libraryId) as { parent_id: string | null } | undefined;
        if (!ancestor) throw new LibraryServiceError('FOLDER_NOT_FOUND');
        ancestorId = ancestor.parent_id;
      }
    }
    const newDescription =
      input.description !== undefined ? input.description : existing.description;
    const newCoverAssetId =
      input.coverAssetId !== undefined ? input.coverAssetId : existing.cover_asset_id;
    const newPosition =
      input.position !== undefined ? input.position : existing.position;

    openLibrary.connection
      .prepare(
        `UPDATE collections
            SET parent_id = ?, name = ?, description = ?, cover_asset_id = ?, position = ?, updated_at = ?
          WHERE collection_id = ?`,
      )
      .run(
        newParentId,
        newName,
        newDescription,
        newCoverAssetId,
        newPosition,
        now,
        input.collectionId,
      );

    const recursiveAssetCounts = this.collectionRecursiveAssetCounts(openLibrary);
    const countRows = openLibrary.connection
      .prepare(
        'SELECT COUNT(*) AS child_count FROM collections WHERE parent_id = ?',
      )
      .get(input.collectionId) as { child_count: number };

    return {
      collectionId: input.collectionId,
      parentId: newParentId,
      name: newName,
      description: newDescription,
      coverAssetId: newCoverAssetId,
      position: newPosition,
      assetCount: recursiveAssetCounts.get(input.collectionId) ?? 0,
      childCollectionCount: countRows.child_count,
      appearance: sanitizeEntityAppearance({
        glyphKind: existing.appearance_glyph_kind,
        glyphValue: existing.appearance_glyph_value,
        colorId: existing.appearance_color_id,
      }),
    };
  }

  override reorderCollections(input: {
    libraryId: string;
    orderedCollectionIds: string[];
  }): string[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const uniqueIds = new Set(input.orderedCollectionIds);
    if (uniqueIds.size !== input.orderedCollectionIds.length) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    const rows = sqliteAllInChunks<string, { collection_id: string; parent_id: string | null }>({
      connection: openLibrary.connection,
      values: input.orderedCollectionIds,
      buildSql: (placeholders) =>
        `SELECT collection_id, parent_id
           FROM collections
          WHERE library_id = ? AND collection_id IN (${placeholders})`,
      bind: (chunk) => [openLibrary.summary.libraryId, ...chunk],
    });
    if (rows.length !== input.orderedCollectionIds.length) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    const parentId = rows[0]!.parent_id;
    if (rows.some((row) => row.parent_id !== parentId)) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    const siblingCount = openLibrary.connection.prepare(
      `SELECT COUNT(*) AS count
         FROM collections
        WHERE library_id = ? AND parent_id IS ?`,
    ).get(openLibrary.summary.libraryId, parentId) as { count: number };
    if (siblingCount.count !== input.orderedCollectionIds.length) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    const now = new Date().toISOString();
    const update = openLibrary.connection.prepare(
      'UPDATE collections SET position = ?, updated_at = ? WHERE collection_id = ? AND library_id = ?',
    );
    openLibrary.connection.transaction(() => {
      input.orderedCollectionIds.forEach((collectionId, position) => {
        const result = update.run(position, now, collectionId, openLibrary.summary.libraryId);
        if (result.changes !== 1) throw new LibraryServiceError('FOLDER_NOT_FOUND');
      });
    })();
    return [...input.orderedCollectionIds];
  }

  override deleteCollection(input: { libraryId: string; collectionId: string }): string {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const existing = openLibrary.connection
      .prepare(
        'SELECT collection_id FROM collections WHERE collection_id = ? AND library_id = ?',
      )
      .get(input.collectionId, openLibrary.summary.libraryId);
    if (!existing) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    openLibrary.connection
      .prepare('DELETE FROM collections WHERE collection_id = ?')
      .run(input.collectionId);
    return input.collectionId;
  }

  override addCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    assetIds: string[];
  }): { collectionId: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const col = openLibrary.connection
      .prepare(
        'SELECT collection_id FROM collections WHERE collection_id = ? AND library_id = ?',
      )
      .get(input.collectionId, openLibrary.summary.libraryId);
    if (!col) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const assetRows = sqliteAllInChunks<string, { asset_id: string }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id FROM assets WHERE asset_id IN (${placeholders})`,
    });
    if (assetRows.length !== input.assetIds.length) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const maxPosRow = openLibrary.connection
      .prepare(
        'SELECT COALESCE(MAX(position), -1) AS max_pos FROM collection_assets WHERE collection_id = ?',
      )
      .get(input.collectionId) as { max_pos: number };
    let nextPosition = maxPosRow.max_pos + 1;

    const insertStmt = openLibrary.connection.prepare(
      'INSERT OR IGNORE INTO collection_assets (collection_id, asset_id, position) VALUES (?, ?, ?)',
    );
    openLibrary.connection.transaction(() => {
      for (const assetId of input.assetIds) {
        insertStmt.run(input.collectionId, assetId, nextPosition);
        nextPosition += 1;
      }
    })();
    return { collectionId: input.collectionId };
  }

  override removeCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    assetIds: string[];
  }): { collectionId: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    sqliteRunInChunks({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `DELETE FROM collection_assets
           WHERE collection_id = ?
             AND asset_id IN (${placeholders})`,
      bind: (chunk) => [input.collectionId, ...chunk],
    });
    return { collectionId: input.collectionId };
  }

  override reorderCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    orderedAssetIds: string[];
  }): { collectionId: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const col = openLibrary.connection
      .prepare(
        'SELECT collection_id FROM collections WHERE collection_id = ? AND library_id = ?',
      )
      .get(input.collectionId, openLibrary.summary.libraryId);
    if (!col) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    openLibrary.connection.transaction(() => {
      openLibrary.connection
        .prepare('DELETE FROM collection_assets WHERE collection_id = ?')
        .run(input.collectionId);
      const insertStmt = openLibrary.connection.prepare(
        'INSERT INTO collection_assets (collection_id, asset_id, position) VALUES (?, ?, ?)',
      );
      for (let index = 0; index < input.orderedAssetIds.length; index += 1) {
        insertStmt.run(input.collectionId, input.orderedAssetIds[index]!, index);
      }
    })();
    return { collectionId: input.collectionId };
  }

  override listCollectionAssets(input: {
    libraryId: string;
    collectionId: string;
    recursive: boolean;
  }): AssetSummary[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const col = openLibrary.connection
      .prepare(
        'SELECT collection_id FROM collections WHERE collection_id = ? AND library_id = ?',
      )
      .get(input.collectionId, openLibrary.summary.libraryId);
    if (!col) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    let collectionIds: string[];
    if (input.recursive) {
      const descendantRows = openLibrary.connection
        .prepare(
          `WITH RECURSIVE descendants AS (
             SELECT collection_id FROM collections WHERE collection_id = ?
             UNION ALL
             SELECT c.collection_id FROM collections c JOIN descendants d ON c.parent_id = d.collection_id
           )
           SELECT collection_id FROM descendants`,
        )
        .all(input.collectionId) as Array<{ collection_id: string }>;
      collectionIds = descendantRows.map((row) => row.collection_id);
    } else {
      collectionIds = [input.collectionId];
    }

    const rows = sqliteAllInChunks<string, {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        availability: 'available' | 'missing';
        byte_size: number;
        current_revision_id: string;
        managed_folder_id: string | null;
        modified_at: string;
        relative_file_path: string;
        rating: number;
        favorite: number;
        deleted_at: string | null;
        trashed_from_relative_path: string | null;
        collection_position: number;
      }>({
        connection: openLibrary.connection,
        values: collectionIds,
        buildSql: (placeholders) =>
          `SELECT DISTINCT a.asset_id, a.location_kind, a.managed_folder_id, a.relative_file_path,
                  a.current_revision_id, a.availability, r.byte_size, r.modified_at,
                  COALESCE(m.rating, 0) AS rating, COALESCE(m.favorite, 0) AS favorite,
                  a.deleted_at, a.trashed_from_relative_path, ca.position AS collection_position
             FROM collection_assets ca
             JOIN assets a ON a.asset_id = ca.asset_id
             JOIN revisions r ON r.revision_id = a.current_revision_id
             LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
            WHERE ca.collection_id IN (${placeholders})
              AND a.deleted_at IS NULL
            ORDER BY ca.position, a.relative_file_path`,
      });
    rows.sort((left, right) =>
      left.collection_position - right.collection_position ||
      left.relative_file_path.localeCompare(right.relative_file_path),
    );
    const uniqueRows = [...new Map(rows.map((row) => [row.asset_id, row])).values()];
    return this.withImageSequenceSummaries(
      openLibrary,
      uniqueRows.map((row) => this.assetSummaryFromRow(row)),
    );
  }

  /**
   * Direct collection memberships for the given assets (CU-B4 menu filtering).
   * Scoped to collections that belong to the open library.
   */
  override listAssetCollectionMemberships(input: {
    libraryId: string;
    assetIds: string[];
  }): Array<{ assetId: string; collectionId: string }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const uniqueIds = [...new Set(input.assetIds)];
    if (uniqueIds.length === 0) return [];

    const rows = sqliteAllInChunks<string, { asset_id: string; collection_id: string }>({
      connection: openLibrary.connection,
      values: uniqueIds,
      buildSql: (placeholders) =>
        `SELECT ca.asset_id, ca.collection_id
           FROM collection_assets ca
           JOIN collections c ON c.collection_id = ca.collection_id
          WHERE ca.asset_id IN (${placeholders})
            AND c.library_id = ?`,
      bind: (chunk) => [...chunk, openLibrary.summary.libraryId],
    });

    return rows.map((row) => ({
      assetId: row.asset_id,
      collectionId: row.collection_id,
    }));
  }

}
