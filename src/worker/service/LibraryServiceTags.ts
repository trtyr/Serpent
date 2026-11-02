/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { DatabaseConnection} from '../library-service-internals';
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
import { LibraryServiceAssetsList } from './LibraryServiceAssetsList';

/** LibraryServiceTags: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceTags extends LibraryServiceAssetsList {

  // ── Tags ──────────────────────────────────────────────────────────

  override createTag(input: { libraryId: string; name: string }): TagSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const trimmed = input.name.trim();
    if (trimmed.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');

    const tagId = randomUUID();
    const now = new Date().toISOString();
    try {
      openLibrary.connection
        .prepare(
          'INSERT INTO tags (tag_id, library_id, name, created_at) VALUES (?, ?, ?, ?)',
        )
        .run(tagId, openLibrary.summary.libraryId, trimmed, now);
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    return { tagId, name: trimmed, assetCount: 0 };
  }

  override listTags(libraryId: string): TagSummary[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the tag
    // tables degrade to an empty tag list; missing asset-tag join tables
    // just drop that side of the count; a missing created_at sorts by name.
    const connection = openLibrary.connection;
    if (!hasTable(connection, 'tags')) return [];
    const tagColumns = columnsFor(connection, 'tags');
    const hasCreatedAt = tagColumns.has('created_at');
    const tagUseSubqueries = [
      hasTable(connection, 'human_asset_tags')
        ? 'SELECT asset_id, tag_id FROM human_asset_tags'
        : null,
      hasTable(connection, 'ai_asset_tags')
        ? 'SELECT asset_id, tag_id FROM ai_asset_tags'
        : null,
    ].filter((sql): sql is string => sql !== null);
    const usedJoin = tagUseSubqueries.length > 0
      ? `LEFT JOIN (${tagUseSubqueries.join(' UNION ')}) used ON used.tag_id = t.tag_id`
      : '';
    const groupBy = hasCreatedAt
      ? 'GROUP BY t.tag_id, t.name, t.created_at'
      : 'GROUP BY t.tag_id, t.name';
    const orderBy = hasCreatedAt ? 'ORDER BY t.created_at DESC, t.name' : 'ORDER BY t.name';
    const rows = connection
      .prepare(
        `SELECT t.tag_id, t.name,
                COUNT(used.asset_id) AS asset_count
           FROM tags t
           ${usedJoin}
          WHERE t.library_id = ?
          ${groupBy}
          ${orderBy}`,
      )
      .all(openLibrary.summary.libraryId) as Array<{
        tag_id: string;
        name: string;
        asset_count: number;
      }>;
    return rows.map((row) => ({
      tagId: row.tag_id,
      name: row.name,
      assetCount: row.asset_count,
    }));
  }

  override renameTag(input: { libraryId: string; tagId: string; name: string }): TagSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const trimmed = input.name.trim();
    if (trimmed.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');

    const existing = openLibrary.connection
      .prepare('SELECT tag_id FROM tags WHERE tag_id = ? AND library_id = ?')
      .get(input.tagId, openLibrary.summary.libraryId);
    if (!existing) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const affectedAssets = openLibrary.connection
      .prepare(
        `SELECT asset_id FROM human_asset_tags WHERE tag_id = ?
         UNION
         SELECT asset_id FROM ai_asset_tags WHERE tag_id = ?`,
      )
      .all(input.tagId, input.tagId) as Array<{ asset_id: string }>;

    try {
      openLibrary.connection.transaction(() => {
        openLibrary.connection
          .prepare('UPDATE tags SET name = ? WHERE tag_id = ?')
          .run(trimmed, input.tagId);
        for (const { asset_id: assetId } of affectedAssets) {
          this.syncAssetSearchContent(openLibrary.connection, assetId);
        }
      })();
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }

    this.emitClientAssetsChanged(input.libraryId, affectedAssets.length);
    const countRow = openLibrary.connection
      .prepare(
        `SELECT COUNT(*) AS count
           FROM (
             SELECT asset_id FROM human_asset_tags WHERE tag_id = ?
             UNION
             SELECT asset_id FROM ai_asset_tags WHERE tag_id = ?
           )`,
      )
      .get(input.tagId, input.tagId) as { count: number };
    return { tagId: input.tagId, name: trimmed, assetCount: countRow.count };
  }

  override deleteTag(input: { libraryId: string; tagId: string }): string {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const existing = openLibrary.connection
      .prepare('SELECT tag_id FROM tags WHERE tag_id = ? AND library_id = ?')
      .get(input.tagId, openLibrary.summary.libraryId);
    if (!existing) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const affectedAssets = openLibrary.connection
      .prepare(
        `SELECT asset_id FROM human_asset_tags WHERE tag_id = ?
         UNION
         SELECT asset_id FROM ai_asset_tags WHERE tag_id = ?`,
      )
      .all(input.tagId, input.tagId) as Array<{ asset_id: string }>;

    openLibrary.connection.transaction(() => {
      openLibrary.connection
        .prepare('DELETE FROM tags WHERE tag_id = ?')
        .run(input.tagId);
      for (const { asset_id: assetId } of affectedAssets) {
        this.syncAssetSearchContent(openLibrary.connection, assetId);
      }
    })();
    this.emitClientAssetsChanged(input.libraryId, affectedAssets.length);
    return input.tagId;
  }

  override deleteTags(input: {
    libraryId: string;
    tagIds: string[];
  }): { deletedTagIds: string[] } {
    const uniqueTagIds = [...new Set(input.tagIds)];
    if (uniqueTagIds.length === 0) return { deletedTagIds: [] };

    this.requireOpenLibrary(input.libraryId);
    const deletedTagIds: string[] = [];
    for (const tagId of uniqueTagIds) {
      deletedTagIds.push(this.deleteTag({ libraryId: input.libraryId, tagId }));
    }
    return { deletedTagIds };
  }

  /**
   * Merge multiple tags into a newly named tag (REQ-TAG-012b / Serpent-36il.4).
   * All human/AI links from source tags move to the new tag; sources are removed.
   */
  override mergeTags(input: {
    libraryId: string;
    sourceTagIds: string[];
    name: string;
  }): TagSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const trimmed = input.name.trim();
    if (trimmed.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');

    const sourceTagIds = [...new Set(input.sourceTagIds)];
    if (sourceTagIds.length < 2) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME');
    }

    const tagRows = withSqliteInPredicate(
      openLibrary.connection,
      'tag_id',
      sourceTagIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT tag_id FROM tags WHERE ${sql} AND library_id = ?`,
          )
          .all(...params, openLibrary.summary.libraryId) as Array<{
          tag_id: string;
        }>,
    );
    if (tagRows.length !== sourceTagIds.length) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    const newTagId = randomUUID();
    const now = new Date().toISOString();
    const affectedAssets = withSqliteInPredicate(
      openLibrary.connection,
      'tag_id',
      sourceTagIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT DISTINCT asset_id FROM (
               SELECT asset_id FROM human_asset_tags WHERE ${sql}
               UNION
               SELECT asset_id FROM ai_asset_tags WHERE ${sql}
             )`,
          )
          .all(...params, ...params) as Array<{ asset_id: string }>,
    );

    try {
      openLibrary.connection.transaction(() => {
        openLibrary.connection
          .prepare(
            'INSERT INTO tags (tag_id, library_id, name, created_at) VALUES (?, ?, ?, ?)',
          )
          .run(newTagId, openLibrary.summary.libraryId, trimmed, now);

        const insertHuman = openLibrary.connection.prepare(
          'INSERT OR IGNORE INTO human_asset_tags (asset_id, tag_id) VALUES (?, ?)',
        );
        for (const { asset_id: assetId } of affectedAssets) {
          insertHuman.run(assetId, newTagId);
        }

        sqliteRunInChunks({
          connection: openLibrary.connection,
          values: sourceTagIds,
          buildSql: (placeholders) =>
            `DELETE FROM human_asset_tags WHERE tag_id IN (${placeholders})`,
        });
        sqliteRunInChunks({
          connection: openLibrary.connection,
          values: sourceTagIds,
          buildSql: (placeholders) =>
            `DELETE FROM ai_asset_tags WHERE tag_id IN (${placeholders})`,
        });
        sqliteRunInChunks({
          connection: openLibrary.connection,
          values: sourceTagIds,
          buildSql: (placeholders) =>
            `DELETE FROM tags WHERE tag_id IN (${placeholders})`,
        });

        for (const { asset_id: assetId } of affectedAssets) {
          this.syncAssetSearchContent(openLibrary.connection, assetId);
        }
      })();
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }

    this.emitClientAssetsChanged(input.libraryId, affectedAssets.length);
    const countRow = openLibrary.connection
      .prepare(
        `SELECT COUNT(*) AS count
           FROM (
             SELECT asset_id FROM human_asset_tags WHERE tag_id = ?
             UNION
             SELECT asset_id FROM ai_asset_tags WHERE tag_id = ?
           )`,
      )
      .get(newTagId, newTagId) as { count: number };
    return { tagId: newTagId, name: trimmed, assetCount: countRow.count };
  }

  /**
   * Tag co-occurrence graph for the management graph view (Serpent-k6g6.1).
   * Limits node/edge counts for large libraries; edges are undirected (a < b).
   */
  override getTagCooccurrenceGraph(input: {
    libraryId: string;
    minWeight?: number;
    maxNodes?: number;
    maxEdges?: number;
  }): TagCooccurrenceGraph {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const minWeight = Math.max(1, input.minWeight ?? 1);
    const maxNodes = Math.min(Math.max(1, input.maxNodes ?? 200), 500);
    const maxEdges = Math.min(Math.max(1, input.maxEdges ?? 500), 2_000);

    const totalTags = openLibrary.connection
      .prepare('SELECT COUNT(*) AS count FROM tags WHERE library_id = ?')
      .get(openLibrary.summary.libraryId) as { count: number };

    const nodeRows = openLibrary.connection
      .prepare(
        `SELECT t.tag_id, t.name,
                COUNT(DISTINCT used.asset_id) AS asset_count
           FROM tags t
           LEFT JOIN (
             SELECT asset_id, tag_id FROM human_asset_tags
             UNION
             SELECT asset_id, tag_id FROM ai_asset_tags
           ) used ON used.tag_id = t.tag_id
          WHERE t.library_id = ?
          GROUP BY t.tag_id, t.name
          ORDER BY asset_count DESC, t.name COLLATE NOCASE
          LIMIT ?`,
      )
      .all(openLibrary.summary.libraryId, maxNodes) as Array<{
      tag_id: string;
      name: string;
      asset_count: number;
    }>;

    const nodes = nodeRows.map((row) => ({
      tagId: row.tag_id,
      name: row.name,
      assetCount: row.asset_count,
    }));

    if (nodes.length < 2) {
      return { nodes, edges: [], truncated: totalTags.count > nodes.length };
    }

    const nodeIds = nodes.map((node) => node.tagId);
    const useTable = nodeIds.length * 2 > SQLITE_IN_BIND_LIMIT;
    const edgeRows = withSqliteInPredicate(
      openLibrary.connection,
      'u1.tag_id',
      nodeIds,
      (leftSql, leftParams) =>
        withSqliteInPredicate(
          openLibrary.connection,
          'u2.tag_id',
          nodeIds,
          (rightSql, rightParams) =>
            openLibrary.connection
              .prepare(
                `WITH tag_usage AS (
                   SELECT DISTINCT asset_id, tag_id FROM human_asset_tags
                   UNION
                   SELECT DISTINCT asset_id, tag_id FROM ai_asset_tags
                 )
                 SELECT u1.tag_id AS tag_a, u2.tag_id AS tag_b,
                        COUNT(DISTINCT u1.asset_id) AS weight
                   FROM tag_usage u1
                   JOIN tag_usage u2
                     ON u1.asset_id = u2.asset_id
                    AND u1.tag_id < u2.tag_id
                  WHERE ${leftSql}
                    AND ${rightSql}
                  GROUP BY u1.tag_id, u2.tag_id
                 HAVING weight >= ?
                  ORDER BY weight DESC
                  LIMIT ?`,
              )
              .all(...leftParams, ...rightParams, minWeight, maxEdges) as Array<{
              tag_a: string;
              tag_b: string;
              weight: number;
            }>,
          { forceTable: useTable },
        ),
      { forceTable: useTable },
    );

    const edges = edgeRows.map((row) => ({
      sourceTagId: row.tag_a,
      targetTagId: row.tag_b,
      weight: row.weight,
    }));

    const connectedIds = new Set<string>();
    for (const edge of edges) {
      connectedIds.add(edge.sourceTagId);
      connectedIds.add(edge.targetTagId);
    }
    const visibleNodes =
      edges.length === 0
        ? nodes
        : nodes.filter((node) => connectedIds.has(node.tagId));

    return {
      nodes: visibleNodes,
      edges,
      truncated:
        totalTags.count > maxNodes || edgeRows.length >= maxEdges,
    };
  }

  override assignTags(input: {
    libraryId: string;
    assetIds: string[];
    tagIds: string[];
  }): { assignedCount: number; skipped: TagOperationSkip[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);

    const { eligibleAssetIds, skipped } = this.partitionKnownAssetIds(
      openLibrary.connection,
      input.assetIds,
    );

    const tagRows = sqliteAllInChunks<string, { tag_id: string }>({
      connection: openLibrary.connection,
      values: input.tagIds,
      buildSql: (placeholders) =>
        `SELECT tag_id FROM tags WHERE tag_id IN (${placeholders}) AND library_id = ?`,
      bind: (chunk) => [...chunk, openLibrary.summary.libraryId],
    });
    if (tagRows.length !== input.tagIds.length) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    let assignedCount = 0;
    const insertStmt = openLibrary.connection.prepare(
      'INSERT OR IGNORE INTO human_asset_tags (asset_id, tag_id) VALUES (?, ?)',
    );
    openLibrary.connection.transaction(() => {
      for (const assetId of eligibleAssetIds) {
        for (const tagId of input.tagIds) {
          const result = insertStmt.run(assetId, tagId);
          assignedCount += result.changes;
        }
      }
    })();
    for (const assetId of eligibleAssetIds) {
      this.syncAssetSearchContent(openLibrary.connection, assetId);
    }
    this.emitClientAssetsChanged(input.libraryId, assignedCount);
    return { assignedCount, skipped };
  }

  override removeTags(input: {
    libraryId: string;
    assetIds: string[];
    tagIds: string[];
  }): { removedCount: number; skipped: TagOperationSkip[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);

    const { eligibleAssetIds, skipped } = this.partitionKnownAssetIds(
      openLibrary.connection,
      input.assetIds,
    );
    if (eligibleAssetIds.length === 0) return { removedCount: 0, skipped };

    let removedCount = 0;
    const relationChunkLimit = Math.floor((SQLITE_IN_BIND_LIMIT - 4) / 2);
    for (const assetChunk of sqliteInChunks(eligibleAssetIds, relationChunkLimit)) {
      for (const tagChunk of sqliteInChunks(input.tagIds, relationChunkLimit)) {
        const bind = (chunk: readonly string[]) => [
          ...chunk,
          ...tagChunk,
        ];
        // Serpent-h2i2: removing a chip must also clear AI-authored tag links.
        removedCount += sqliteRunInChunks({
          connection: openLibrary.connection,
          values: assetChunk,
          buildSql: (placeholders) =>
            `DELETE FROM human_asset_tags
               WHERE asset_id IN (${placeholders})
                 AND tag_id IN (${sqliteInPlaceholders(tagChunk)})`,
          bind,
        });
        removedCount += sqliteRunInChunks({
          connection: openLibrary.connection,
          values: assetChunk,
          buildSql: (placeholders) =>
            `DELETE FROM ai_asset_tags
               WHERE asset_id IN (${placeholders})
                 AND tag_id IN (${sqliteInPlaceholders(tagChunk)})`,
          bind,
        });
      }
    }
    for (const assetId of eligibleAssetIds) {
      if (removedCount > 0) this.syncAssetSearchContent(openLibrary.connection, assetId);
    }
    this.emitClientAssetsChanged(input.libraryId, removedCount);
    return { removedCount, skipped };
  }

  /**
   * Splits the requested asset ids into the ones that exist in this library
   * and per-id skip entries for the rest, so batch tag operations can apply
   * to the eligible subset instead of failing wholesale (REQ-MENU-007).
   */
  public override partitionKnownAssetIds(
    connection: DatabaseConnection,
    assetIds: string[],
  ): { eligibleAssetIds: string[]; skipped: TagOperationSkip[] } {
    const requestedAssetIds = [...new Set(assetIds)];
    const assetRows = sqliteAllInChunks<string, { asset_id: string }>({
      connection,
      values: requestedAssetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id FROM assets WHERE asset_id IN (${placeholders})`,
    });
    const knownAssetIds = new Set(assetRows.map((row) => row.asset_id));
    const eligibleAssetIds: string[] = [];
    const skipped: TagOperationSkip[] = [];
    for (const assetId of requestedAssetIds) {
      if (knownAssetIds.has(assetId)) {
        eligibleAssetIds.push(assetId);
      } else {
        skipped.push({ assetId, reason: 'asset_not_found' });
      }
    }
    return { eligibleAssetIds, skipped };
  }

}
