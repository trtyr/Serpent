/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { OpenLibrary} from '../library-service-internals';
import { LibraryServiceError, buildFileName } from '../library-service-internals';
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
import { LibraryServiceSearch } from './LibraryServiceSearch';

/** LibraryServiceAi: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceAi extends LibraryServiceSearch {

  // ── AI Analysis ────────────────────────────────────────────────────

  /** Return the absolute filesystem path, MIME type, and whether this is a video asset. */
  override resolveAssetFilePath(libraryId: string, assetId: string): {
    filePath: string;
    mime: string;
    isVideo: boolean;
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);

    const asset = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.location_kind, a.linked_folder_id,
                a.managed_folder_id, a.relative_file_path
           FROM assets a
          WHERE a.asset_id = ?`,
      )
      .get(assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        managed_folder_id: string | null;
        relative_file_path: string;
    } | undefined;
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (this.isExplicitlyIgnored(
      openLibrary,
      asset.location_kind,
      asset.linked_folder_id,
      asset.relative_file_path,
      'asset',
    )) {
      throw new LibraryServiceError('ASSET_NOT_FOUND');
    }

    let filePath: string;
    if (asset.location_kind === 'managed') {
      filePath = this.folderPath(openLibrary, asset.relative_file_path);
    } else {
      filePath = this.linkedAssetPath(
        openLibrary,
        asset.linked_folder_id,
        asset.relative_file_path,
      );
    }

    const ext = path.extname(asset.relative_file_path).toLowerCase();
    const mimeMap: Record<string, string> = {
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.ogg': 'audio/ogg',
      '.oga': 'audio/ogg',
      '.m4a': 'audio/mp4',
      '.aac': 'audio/aac',
      '.flac': 'audio/flac',
      '.opus': 'audio/ogg',
    };
    const mime = imageMimeForExtension(ext)
      ?? videoMimeForExtension(ext)
      ?? mimeMap[ext]
      ?? 'application/octet-stream';
    const isVideo = mime.startsWith('video/');

    return { filePath, mime, isVideo };
  }

  /** List all tag names in a library for AI tag-reuse hinting. */
  override listTagNames(libraryId: string): string[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const rows = openLibrary.connection
      .prepare('SELECT name FROM tags WHERE library_id = ? ORDER BY name')
      .all(openLibrary.summary.libraryId) as Array<{ name: string }>;
    return rows.map((r) => r.name);
  }

  /**
   * F8: up to 100 tag names for the analysis prompt.
   * Prefer tags used on assets in `folderId` (that folder only, no children),
   * then tags by library-wide usage count.
   */
  override listTagNamesForAiPrompt(
    libraryId: string,
    folderId: string | null | undefined,
    limit = 100,
  ): string[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const capped = Math.min(100, Math.max(1, limit));
    const conn = openLibrary.connection;
    const libId = openLibrary.summary.libraryId;

    const usageRows = conn
      .prepare(
        `SELECT t.name AS name, COUNT(*) AS usage_count
           FROM tags t
           LEFT JOIN human_asset_tags hat ON hat.tag_id = t.tag_id
           LEFT JOIN ai_asset_tags aat ON aat.tag_id = t.tag_id
          WHERE t.library_id = ?
          GROUP BY t.tag_id
          ORDER BY usage_count DESC, t.name COLLATE NOCASE ASC`,
      )
      .all(libId) as Array<{ name: string; usage_count: number }>;

    if (!folderId) {
      return usageRows.slice(0, capped).map((row) => row.name);
    }

    const folderRows = conn
      .prepare(
        `SELECT t.name AS name, COUNT(*) AS usage_count
           FROM tags t
           INNER JOIN (
             SELECT hat.tag_id AS tag_id FROM human_asset_tags hat
               INNER JOIN assets a ON a.asset_id = hat.asset_id
              WHERE a.managed_folder_id = ?
             UNION ALL
             SELECT aat.tag_id AS tag_id FROM ai_asset_tags aat
               INNER JOIN assets a ON a.asset_id = aat.asset_id
              WHERE a.managed_folder_id = ?
           ) uses ON uses.tag_id = t.tag_id
          WHERE t.library_id = ?
          GROUP BY t.tag_id
          ORDER BY usage_count DESC, t.name COLLATE NOCASE ASC`,
      )
      .all(folderId, folderId, libId) as Array<{ name: string }>;

    const seen = new Set<string>();
    const ordered: string[] = [];
    for (const row of folderRows) {
      if (seen.has(row.name.toLowerCase())) continue;
      seen.add(row.name.toLowerCase());
      ordered.push(row.name);
      if (ordered.length >= capped) return ordered;
    }
    for (const row of usageRows) {
      if (seen.has(row.name.toLowerCase())) continue;
      seen.add(row.name.toLowerCase());
      ordered.push(row.name);
      if (ordered.length >= capped) break;
    }
    return ordered;
  }

  /** True when the asset has a non-empty human description. */
  override hasHumanDescription(libraryId: string, assetId: string): boolean {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT description FROM asset_metadata WHERE asset_id = ?`,
      )
      .get(assetId) as { description: string | null } | undefined;
    return Boolean(row?.description?.trim());
  }

  /** Managed folder id for an asset, if any (for AI tag weighting). */
  override getAssetManagedFolderId(
    libraryId: string,
    assetId: string,
  ): string | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT managed_folder_id FROM assets WHERE asset_id = ?`,
      )
      .get(assetId) as { managed_folder_id: string | null } | undefined;
    return row?.managed_folder_id ?? null;
  }

  /** Display name shown in the UI (basename of the library-relative path). */
  override getAssetDisplayName(libraryId: string, assetId: string): string {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare(`SELECT relative_file_path FROM assets WHERE asset_id = ?`)
      .get(assetId) as { relative_file_path: string } | undefined;
    if (!row?.relative_file_path) return 'asset';
    return path.posix.basename(row.relative_file_path);
  }

  /**
   * Return the small, path-free asset descriptor consumed by a plugin media
   * provider. This is intentionally a point lookup: viewer opens must not
   * materialize the recursive asset list merely to decide whether an opt-in
   * provider can handle one asset.
   */
  override getPluginMediaProviderAsset(
    libraryId: string,
    assetId: string,
  ): Pick<AssetSummary, 'assetId' | 'displayName' | 'relativeFilePath' | 'currentRevisionId'> | undefined {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, linked_folder_id, relative_file_path,
                current_revision_id
           FROM assets
          WHERE asset_id = ?
            AND deleted_at IS NULL
            AND current_revision_id IS NOT NULL`,
      )
      .get(assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string;
      } | undefined;
    const linkedIgnored = row && row.location_kind === 'linked'
      && hasTable(openLibrary.connection, 'linked_ignored_assets')
      && openLibrary.connection
        .prepare('SELECT 1 FROM linked_ignored_assets WHERE asset_id = ?')
        .get(row.asset_id) !== undefined;
    if (!row || linkedIgnored || this.isExplicitlyIgnored(
      openLibrary,
      row.location_kind,
      row.linked_folder_id,
      row.relative_file_path,
      'asset',
    )) {
      return undefined;
    }
    return {
      assetId: row.asset_id,
      displayName: buildFileName(row.relative_file_path),
      relativeFilePath: row.relative_file_path,
      currentRevisionId: row.current_revision_id,
    };
  }

  /**
   * Atomically write AI-generated content for an asset.
   * For tags: find-or-create by NOCASE name, then INSERT OR IGNORE into ai_asset_tags.
   * For description/rating: DELETE old row(s) + INSERT new row in ai_content
   *   (one row per (asset_id, field_name)). Never writes human asset_metadata.rating.
   * After writing, sync the asset's FTS search content.
   */
  override writeAiAnalysisResult(input: {
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
  }): { tagsWritten: string[]; fieldsWritten: string[]; committed: boolean } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const now = new Date().toISOString();
    const tagsWritten: string[] = [];
    const fieldsWritten: string[] = [];

    const revisionRow = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
      .get(input.assetId) as { current_revision_id: string | null } | undefined;
    const revisionId = revisionRow?.current_revision_id ?? null;

    const committed = openLibrary.connection.transaction(() => {
      if (input.guardJobId) {
        const job = openLibrary.connection.prepare(
          "SELECT status FROM jobs WHERE library_id = ? AND job_id = ? AND status = 'running'",
        ).get(openLibrary.summary.libraryId, input.guardJobId);
        if (!job) return false;
      }
      // A successful analysis replaces the complete enabled AI layer. Clear
      // old tags even when the provider returns an empty list so stale model
      // output cannot survive a re-analysis.
      if (input.enabledFields.tags) {
        openLibrary.connection
          .prepare('DELETE FROM ai_asset_tags WHERE asset_id = ?')
          .run(input.assetId);
      }
      if (input.enabledFields.tags && input.tags && input.tags.length > 0) {
        const findTag = openLibrary.connection.prepare(
          'SELECT tag_id, name FROM tags WHERE library_id = ? AND name = ? COLLATE NOCASE',
        );
        const insertTag = openLibrary.connection.prepare(
          'INSERT OR IGNORE INTO tags (tag_id, library_id, name, created_at) VALUES (?, ?, ?, ?)',
        );
        const insertAiTag = openLibrary.connection.prepare(
          `INSERT OR IGNORE INTO ai_asset_tags
             (asset_id, tag_id, revision_id, model_id, model_version)
           VALUES (?, ?, ?, ?, ?)`,
        );

        for (const tagName of input.tags) {
          const trimmed = tagName.trim();
          if (trimmed.length === 0) continue;

          let tag = findTag.get(openLibrary.summary.libraryId, trimmed) as
            | { tag_id: string; name: string }
            | undefined;
          if (!tag) {
            const tagId = randomUUID();
            insertTag.run(tagId, openLibrary.summary.libraryId, trimmed, now);
            tag = { tag_id: tagId, name: trimmed };
          }

          insertAiTag.run(
            input.assetId,
            tag.tag_id,
            revisionId,
            input.modelId,
            input.modelVersion,
          );
          tagsWritten.push(trimmed);
        }
      }

      // Description / rating: DELETE old row(s) + INSERT when enabled.
      const deleteOld = openLibrary.connection.prepare(
        'DELETE FROM ai_content WHERE asset_id = ? AND field_name = ?',
      );
      const insertContent = openLibrary.connection.prepare(
        `INSERT INTO ai_content
           (ai_content_id, asset_id, revision_id, field_name, value,
            model_id, model_version, generated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      );

      const writeField = (fieldName: string, value: string): void => {
        insertContent.run(
          randomUUID(),
          input.assetId,
          revisionId,
          fieldName,
          value,
          input.modelId,
          input.modelVersion,
          now,
        );
        fieldsWritten.push(fieldName);
      };

      if (input.enabledFields.description) {
        deleteOld.run(input.assetId, 'description');
      }
      if (input.enabledFields.rating) {
        deleteOld.run(input.assetId, 'rating');
      }

      if (
        input.enabledFields.description &&
        input.description !== undefined
      ) {
        const cleaned = sanitizeAiDescription(input.description);
        if (cleaned.length > 0) {
          writeField('description', cleaned);
        }
      }

      if (input.enabledFields.rating && input.rating != null) {
        const score =
          typeof input.rating === 'number'
            ? input.rating
            : Number.parseInt(String(input.rating).trim(), 10);
        if (Number.isInteger(score) && score >= 1 && score <= 5) {
          writeField('rating', String(score));
        }
      }
      return true;
    })();

    if (committed) {
      this.syncAssetSearchContent(openLibrary.connection, input.assetId);
      this.emitClientAssetsChanged(input.libraryId, 1);
    }

    return { tagsWritten, fieldsWritten, committed };
  }

  /** Retrieve current AI content rows for an asset. */
  override getAiContent(libraryId: string, assetId: string): Array<{
    fieldName: string;
    value: string;
    modelId: string;
    modelVersion: string;
    generatedAt: string;
  }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating ai_content
    // have no AI content; the whitelisted columns fill with empty strings.
    const connection = openLibrary.connection;
    const present = hasTable(connection, 'ai_content')
      ? selectColumns(connection, 'ai_content', [
          'field_name',
          'value',
          'model_id',
          'model_version',
          'generated_at',
        ])
      : [];
    const rows = present.length === 0
      ? []
      : connection
          .prepare(
            `SELECT ${present.join(', ')}
               FROM ai_content
              WHERE asset_id = ?
              ORDER BY ${present.includes('field_name') ? 'field_name' : 'rowid'}`,
          )
          .all(assetId) as Array<{
            field_name?: string;
            value?: string;
            model_id?: string;
            model_version?: string;
            generated_at?: string;
          }>;
    return rows.map((r) => ({
      fieldName: r.field_name ?? '',
      value: r.value ?? '',
      modelId: r.model_id ?? '',
      modelVersion: r.model_version ?? '',
      generatedAt: r.generated_at ?? '',
    }));
  }

  /** AI-layer tag names for an asset (ordered by name). */
  override listAiTagNames(libraryId: string, assetId: string): string[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const rows = openLibrary.connection
      .prepare(
        `SELECT t.name AS name
           FROM ai_asset_tags aat
           JOIN tags t ON t.tag_id = aat.tag_id
          WHERE aat.asset_id = ?
          ORDER BY t.name COLLATE NOCASE ASC`,
      )
      .all(assetId) as Array<{ name: string }>;
    return rows.map((row) => row.name);
  }

  /** Latest model_version stamped on AI tags for this asset, if any. */
  override getAiTagModelVersion(
    libraryId: string,
    assetId: string,
  ): string | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT model_version
           FROM ai_asset_tags
          WHERE asset_id = ?
          ORDER BY rowid DESC
          LIMIT 1`,
      )
      .get(assetId) as { model_version: string } | undefined;
    return row?.model_version ?? null;
  }

  /**
   * Clear AI content for a scope of assets. Only deletes rows from
   * `ai_content` and `ai_asset_tags`; never touches human content,
   * human_asset_tags, or Tag entities. After clearing, re-syncs FTS.
   */
  override clearAiContent(input: {
    libraryId: string;
    scope: {
      kind: 'asset' | 'selection' | 'folder' | 'library';
      assetIds?: string[];
      folderId?: string;
    };
    confirm: boolean;
    /** Omit to clear every AI layer; otherwise only the listed layers. */
    fields?: Array<'description' | 'rating' | 'tags'>;
  }): { clearedCount: number; affectedAssetIds: string[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    // Batch operations require confirmation.
    if (
      (input.scope.kind === 'library' || input.scope.kind === 'folder') &&
      !input.confirm
    ) {
      throw new LibraryServiceError('CONFIRMATION_REQUIRED');
    }

    const conn = openLibrary.connection;

    // Gather target asset IDs based on scope.
    let targetAssetIds: string[];
    switch (input.scope.kind) {
      case 'asset':
      case 'selection':
        targetAssetIds = input.scope.assetIds ?? [];
        break;
      case 'folder': {
        if (!input.scope.folderId) {
          throw new LibraryServiceError('INVALID_SELECTION');
        }
        // Recursive: get all assets under this folder (assets.managed_folder_id).
        const folderRows = conn
          .prepare(
            `WITH RECURSIVE subfolders AS (
               SELECT folder_id FROM managed_folders WHERE folder_id = ?
               UNION ALL
               SELECT mf.folder_id
                 FROM managed_folders mf
                 JOIN subfolders sf ON mf.parent_folder_id = sf.folder_id
             )
             SELECT a.asset_id
               FROM assets a
              WHERE a.managed_folder_id IN (SELECT folder_id FROM subfolders)`,
          )
          .all(input.scope.folderId) as Array<{ asset_id: string }>;
        targetAssetIds = folderRows.map((r) => r.asset_id);
        break;
      }
      case 'library': {
        const allRows = conn
          .prepare('SELECT asset_id FROM assets')
          .all() as Array<{ asset_id: string }>;
        targetAssetIds = allRows.map((r) => r.asset_id);
        break;
      }
      default:
        throw new LibraryServiceError('INTERNAL_ERROR');
    }

    if (targetAssetIds.length === 0) {
      return { clearedCount: 0, affectedAssetIds: [] };
    }

    const clearAll = !input.fields || input.fields.length === 0;
    const clearDescription = clearAll || input.fields!.includes('description');
    const clearRating = clearAll || input.fields!.includes('rating');
    const clearTags = clearAll || input.fields!.includes('tags');

    const deleteAiField = conn.prepare(
      'DELETE FROM ai_content WHERE asset_id = ? AND field_name = ?',
    );
    const deleteAllAiContent = conn.prepare(
      'DELETE FROM ai_content WHERE asset_id = ?',
    );
    const deleteAiTags = conn.prepare(
      'DELETE FROM ai_asset_tags WHERE asset_id = ?',
    );

    conn.transaction(() => {
      for (const assetId of targetAssetIds) {
        if (clearAll) {
          deleteAllAiContent.run(assetId);
        } else {
          if (clearDescription) deleteAiField.run(assetId, 'description');
          if (clearRating) deleteAiField.run(assetId, 'rating');
        }
        if (clearTags) deleteAiTags.run(assetId);
        this.syncAssetSearchContent(conn, assetId);
      }
    })();

    this.emitClientAssetsChanged(input.libraryId, targetAssetIds.length);
    return { clearedCount: targetAssetIds.length, affectedAssetIds: targetAssetIds };
  }

  /**
   * 返回给定资产里没有任何 AI 生成数据的（ai_content 无记录）——供
   * 「AI分析未分析项」菜单计数与批量跳过（运行时判断，不动数据库字段）。
   */
  override pendingAiAssets(input: {
    libraryId: string;
    assetIds: string[];
  }): string[] {
    const conn = this.requireOpenLibrary(input.libraryId).connection;
    if (input.assetIds.length === 0) return [];
    return withSqliteInPredicate(
      conn,
      'asset_id',
      input.assetIds,
      (sql, params) =>
        conn
          .prepare(
            `SELECT asset_id FROM assets
              WHERE ${sql}
                AND NOT EXISTS (
                  SELECT 1 FROM ai_content
                   WHERE ai_content.asset_id = assets.asset_id
                )`,
          )
          .all(...params) as Array<{ asset_id: string }>,
    ).map((r) => r.asset_id);
  }

  /** Enqueue image jobs and video jobs whose contact sheet is ready. */
  override enqueueAiAnalysisJobs(input: {
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
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const conn = openLibrary.connection;
    const now = new Date().toISOString();
    const libId = openLibrary.summary.libraryId;

    // Determine target asset IDs.
    let targetAssetIds: string[];
    if (input.assetIds && input.assetIds.length > 0) {
      targetAssetIds = input.assetIds;
    } else if (input.folderId) {
      const folderRows = conn
        .prepare(
          `WITH RECURSIVE subfolders AS (
             SELECT folder_id FROM managed_folders WHERE folder_id = ?
             UNION ALL
             SELECT mf.folder_id
               FROM managed_folders mf
               JOIN subfolders sf ON mf.parent_folder_id = sf.folder_id
           )
           SELECT a.asset_id
             FROM assets a
            WHERE a.managed_folder_id IN (SELECT folder_id FROM subfolders)
               OR a.linked_folder_id = ?`,
        )
        .all(input.folderId, input.folderId) as Array<{ asset_id: string }>;
      targetAssetIds = folderRows.map((r) => r.asset_id);
    } else {
      // All library assets (single-library database, so no library_id filter needed).
      const allRows = conn
        .prepare('SELECT asset_id FROM assets')
        .all() as Array<{ asset_id: string }>;
      targetAssetIds = allRows.map((r) => r.asset_id);
    }

    const insertJob = conn.prepare(
      `INSERT INTO jobs
         (job_id, library_id, asset_id, revision_id, kind, status,
          priority, progress, attempt_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'queued', 0, 0.0, 0, ?, ?)`,
    );
    const getRevision = conn.prepare(
      'SELECT current_revision_id FROM assets WHERE asset_id = ?',
    );
    const resumePausedJob = conn.prepare(
      `UPDATE jobs
          SET status = 'queued', updated_at = ?
        WHERE job_id = ? AND status = 'paused'`,
    );

    // Product format registry, shared with thumbnail dispatch. Importing a
    // file is intentionally broader than this set; this gate only decides
    // whether AI can obtain a decoded visual derivative.
    const imageExts = new Set<string>(IMAGE_EXTENSIONS);
    const videoExts = new Set<string>(VIDEO_EXTENSIONS);
    const modelExts = new Set<string>(MODEL_EXTENSIONS);

    let enqueued = 0;
    const jobIds: string[] = [];
    const alreadyPendingJobIds: string[] = [];
    const skippedAssetIds: string[] = [];
    conn.transaction(() => {
      for (const assetId of targetAssetIds) {
        const row = conn
          .prepare(
            `SELECT relative_file_path, location_kind, linked_folder_id FROM assets
             WHERE asset_id = ?`,
          )
          .get(assetId) as {
            relative_file_path: string;
            location_kind: string;
            linked_folder_id: string | null;
          } | undefined;
        if (!row) {
          skippedAssetIds.push(assetId);
          continue;
        }

        // Ignored assets must never appear in the task queue. Keep this gate
        // before format/dedup checks so explicit AI requests cannot briefly
        // expose a queued row that is only cancelled after claim.
        if (this.isExplicitlyIgnored(
          openLibrary,
          row.location_kind as 'managed' | 'linked',
          row.linked_folder_id,
          row.relative_file_path,
          'asset',
        )) {
          skippedAssetIds.push(assetId);
          continue;
        }

        const ext = path.extname(row.relative_file_path).toLowerCase();
        const isImage = imageExts.has(ext);
        const isVideo = videoExts.has(ext);
        const isModel = modelExts.has(ext);
        if (!isImage && !isVideo && !isModel) {
          skippedAssetIds.push(assetId);
          continue;
        }
        // Serpent-140fe2: videos no longer require a pre-existing contact
        // sheet here. The analysis lane materializes it lazily via
        // ensureVideoContactSheet when the job executes, so converted
        // libraries whose sheets never existed can finally be analysed.

        // Check if there's already a pending/running AI job for this asset.
        const existingJob = conn
          .prepare(
            "SELECT job_id, status FROM jobs WHERE asset_id = ? AND kind IN ('ai.image.analysis', 'ai.video.analysis') AND status IN ('queued', 'running', 'paused') LIMIT 1",
          )
          .get(assetId) as { job_id: string; status: 'queued' | 'running' | 'paused' } | undefined;
        if (existingJob) {
          if (existingJob.status === 'paused' && input.resumePaused) {
            resumePausedJob.run(now, existingJob.job_id);
          }
          alreadyPendingJobIds.push(existingJob.job_id);
          continue;
        }

        // Automatic reconciliation and the explicit “unanalysed only” path
        // skip assets that already have AI content. Manual analysis passes
        // forceExisting so a user can deliberately replace an old result.
        if (!input.forceExisting) {
          const hasAiContent = conn
            .prepare('SELECT 1 FROM ai_content WHERE asset_id = ? LIMIT 1')
            .get(assetId);
          if (hasAiContent) {
            skippedAssetIds.push(assetId);
            continue;
          }
        }

        const jobId = randomUUID();
        const revisionRow = getRevision.get(assetId) as
          | { current_revision_id: string | null }
          | undefined;
        const revisionId = revisionRow?.current_revision_id ?? null;

        insertJob.run(
          jobId,
          libId,
          assetId,
          revisionId,
          isVideo ? 'ai.video.analysis' : 'ai.image.analysis',
          now,
          now,
        );
        enqueued++;
        jobIds.push(jobId);
      }
    })();

    return { enqueued, jobIds, alreadyPendingJobIds, skippedAssetIds };
  }

  override claimNextAiJob(libraryId: string, excludedJobIds: string[] = []): {
    jobId: string;
    assetId: string;
    kind: 'ai.image.analysis' | 'ai.video.analysis';
    attemptCount: number;
  } | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const conn = openLibrary.connection;
    const libId = openLibrary.summary.libraryId;
    return conn.transaction(() => {
      const row = excludedJobIds.length === 0
        ? conn.prepare(
          `SELECT job_id, asset_id, kind, attempt_count FROM jobs
            WHERE library_id = ? AND kind IN ('ai.image.analysis', 'ai.video.analysis')
              AND status = 'queued'
            ORDER BY priority DESC, created_at ASC, job_id ASC LIMIT 1`,
        ).get(libId) as { job_id: string; asset_id: string; kind: 'ai.image.analysis' | 'ai.video.analysis'; attempt_count: number } | undefined
        : withSqliteInPredicate(
          conn,
          'job_id',
          excludedJobIds,
          (sql, params) =>
            conn.prepare(
              `SELECT job_id, asset_id, kind, attempt_count FROM jobs
                WHERE library_id = ? AND kind IN ('ai.image.analysis', 'ai.video.analysis')
                  AND status = 'queued'
                  AND NOT (${sql})
                ORDER BY priority DESC, created_at ASC, job_id ASC LIMIT 1`,
            ).get(libId, ...params) as { job_id: string; asset_id: string; kind: 'ai.image.analysis' | 'ai.video.analysis'; attempt_count: number } | undefined,
        );
      if (!row) return null;
      const attemptCount = row.attempt_count + 1;
      const result = conn.prepare(
        `UPDATE jobs SET status = 'running', attempt_count = ?, progress = 0.0,
          error_code = NULL, error_detail = NULL, updated_at = ?
          WHERE job_id = ? AND library_id = ? AND status = 'queued'`,
      ).run(attemptCount, new Date().toISOString(), row.job_id, libId);
      if (result.changes !== 1) return null;
      return { jobId: row.job_id, assetId: row.asset_id, kind: row.kind, attemptCount };
    })();
  }

  override completeAiJob(libraryId: string, jobId: string): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    openLibrary.connection.prepare(
      `UPDATE jobs SET status = 'succeeded', progress = 1.0, error_code = NULL,
        error_detail = NULL, updated_at = ?
        WHERE library_id = ? AND job_id = ? AND status = 'running'
          AND kind IN ('ai.image.analysis', 'ai.video.analysis')`,
    ).run(new Date().toISOString(), openLibrary.summary.libraryId, jobId);
  }

  override getAiJobState(libraryId: string, jobId: string): string | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection.prepare(
      `SELECT status FROM jobs WHERE library_id = ? AND job_id = ?
        AND kind IN ('ai.image.analysis', 'ai.video.analysis')`,
    ).get(openLibrary.summary.libraryId, jobId) as { status: string } | undefined;
    return row?.status ?? null;
  }

  override failAiJob(
    libraryId: string,
    jobId: string,
    failure: {
      errorCode: string;
      retryable: boolean;
      maxAttempts?: number;
      /** Redacted user/developer-facing detail (Serpent-iokf). */
      errorDetail?: string | null;
    },
  ): { status: 'queued' | 'failed' } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const conn = openLibrary.connection;
    const libId = openLibrary.summary.libraryId;
    const row = conn.prepare(
      `SELECT attempt_count FROM jobs WHERE library_id = ? AND job_id = ?
        AND status = 'running' AND kind IN ('ai.image.analysis', 'ai.video.analysis')`,
    ).get(libId, jobId) as { attempt_count: number } | undefined;
    if (!row) return { status: 'failed' };
    const status = failure.retryable && row.attempt_count < (failure.maxAttempts ?? 3) ? 'queued' : 'failed';
    const detail =
      typeof failure.errorDetail === 'string' && failure.errorDetail.trim()
        ? failure.errorDetail.trim().slice(0, 500)
        : null;
    conn.prepare(
      `UPDATE jobs SET status = ?, progress = 0.0, error_code = ?, error_detail = ?,
        updated_at = ? WHERE library_id = ? AND job_id = ? AND status = 'running'`,
    ).run(status, failure.errorCode, detail, new Date().toISOString(), libId, jobId);
    return { status };
  }

  public override recoverInterruptedAiJobs(openLibrary: OpenLibrary): void {
    const nowMs = Date.now();
    openLibrary.connection.prepare(
      `UPDATE jobs SET status = 'queued', progress = 0.0,
        error_code = 'PROCESS_INTERRUPTED', error_detail = NULL, updated_at = ?
        WHERE library_id = ? AND status = 'running'
          AND kind IN ('ai.image.analysis', 'ai.video.analysis')
          AND NOT EXISTS (
            SELECT 1 FROM library_job_leases
             WHERE library_job_leases.library_id = jobs.library_id
               AND library_job_leases.job_id = jobs.job_id
               AND library_job_leases.expires_at_ms > ?
          )`,
    ).run(new Date().toISOString(), openLibrary.summary.libraryId, nowMs);
  }

  public override recoverInterruptedThumbnailJobs(openLibrary: OpenLibrary): void {
    const nowMs = Date.now();
    openLibrary.connection.prepare(
      `UPDATE jobs SET status = 'queued', progress = 0.0,
        error_code = CASE
          WHEN kind = 'generate_thumbnail'
            AND error_code = '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
          THEN '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
          WHEN kind IN ('generate_webm_proxy', 'generate_audio_proxy')
            AND error_code = '${EXPLICIT_PROXY_FALLBACK_MARKER}'
          THEN '${EXPLICIT_PROXY_FALLBACK_MARKER}'
          ELSE 'PROCESS_INTERRUPTED'
        END,
        error_detail = NULL, updated_at = ?
        WHERE library_id = ? AND status = 'running'
          AND kind IN ('generate_thumbnail', 'generate_video_poster',
                       'generate_contact_sheet', 'generate_webm_proxy', 'generate_audio_proxy',
                       'extract_palette')
          AND NOT EXISTS (
            SELECT 1 FROM library_job_leases
             WHERE library_job_leases.library_id = jobs.library_id
               AND library_job_leases.job_id = jobs.job_id
               AND library_job_leases.expires_at_ms > ?
          )`,
    ).run(new Date().toISOString(), openLibrary.summary.libraryId, nowMs);
  }

  /**
   * Serpent-43d32f: cancel queued/paused WebM-proxy jobs for GIF assets that
   * older builds scheduled proactively (Serpent-azf6). Nothing consumes GIF
   * proxies anymore, so draining them after an upgrade would only burn one
   * doomed FFmpeg transcode per GIF. Runs after
   * {@link recoverInterruptedThumbnailJobs} so recovered rows are covered too;
   * jobs still running under a live lease finish on their own.
   */
  public override retireLegacyGifProxyJobs(openLibrary: OpenLibrary): void {
    openLibrary.connection.prepare(
      `UPDATE jobs SET status = 'cancelled', error_code = 'GIF_PROXY_RETIRED', updated_at = ?
        WHERE library_id = ? AND kind = 'generate_webm_proxy'
          AND status IN ('queued', 'paused')
          AND asset_id IN (
            SELECT asset_id FROM assets WHERE lower(relative_file_path) LIKE '%.gif'
          )`,
    ).run(new Date().toISOString(), openLibrary.summary.libraryId);
  }

}
