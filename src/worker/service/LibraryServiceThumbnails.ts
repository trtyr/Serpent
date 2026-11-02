/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { LibraryServiceOptions, MediaExecutionContext, ModelThumbnailRenderOutcome, ModelThumbnailRenderer, ModelThumbnailRendererInput, OpenLibrary} from '../library-service-internals';
import { LibraryServiceError, THUMBNAIL_VISIBLE_PAGE_SIZE, detectMediaType, directoryExists, isTiffExtension, requireSharp, runSharpDecoder, sha256FileAtPath, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';
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
import { LibraryServiceMediaJobs } from './LibraryServiceMediaJobs';

/** LibraryServiceThumbnails: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceThumbnails extends LibraryServiceMediaJobs {

  // ── Thumbnails & Artifacts ─────────────────────────────────────────

  /**
   * Resolve the absolute filesystem path for an asset (no MIME lookup).
   */
  /**
   * Quarter-turn a bakeable still image's pixels and record a new revision.
   * Sequences, video, and formats we cannot rewrite return `{ baked: false }`.
   */
  override async rotateImageContent(
    libraryId: string,
    assetId: string,
    direction: 'clockwise' | 'counter-clockwise',
  ): Promise<{ baked: true; revisionId: string } | { baked: false }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    this.assertLibraryWritable(openLibrary);
    const asset = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, linked_folder_id, relative_file_path,
                current_revision_id, deleted_at, availability
           FROM assets
          WHERE asset_id = ?`,
      )
      .get(assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string | null;
        deleted_at: string | null;
        availability: 'available' | 'missing';
      } | undefined;
    if (!asset || asset.deleted_at || asset.availability !== 'available' || !asset.current_revision_id) {
      throw new LibraryServiceError('ASSET_NOT_FOUND');
    }
    if (
      detectMediaType(asset.relative_file_path) !== 'image'
      || !isBakeableStillImageFile(asset.relative_file_path)
      || this.assetBelongsToImageSequence(openLibrary, assetId)
    ) {
      return { baked: false };
    }
    const absolutePath = this.resolveAssetPath(libraryId, assetId);
    const now = new Date().toISOString();
    const revisionId = randomUUID();
    const previousRevisionId = asset.current_revision_id;
    const revisionColumns = columnsFor(openLibrary.connection, 'revisions');
    const record = openLibrary.connection.transaction(() => {
      const stat = statSync(absolutePath);
      const fingerprint = revisionColumns.has('content_fingerprint')
        ? sha256FileAtPath(absolutePath)
        : null;
      if (fingerprint === null) {
        openLibrary.connection
          .prepare(
            `INSERT INTO revisions
               (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                original_filename, origin, accepted_at)
             VALUES (?, ?, ?, ?, ?, ?, 'replace', ?)`,
          )
          .run(
            revisionId,
            asset.asset_id,
            previousRevisionId,
            stat.size,
            stat.mtime.toISOString(),
            path.posix.basename(asset.relative_file_path),
            now,
          );
      } else {
        openLibrary.connection
          .prepare(
            `INSERT INTO revisions
               (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                original_filename, origin, accepted_at, content_fingerprint)
             VALUES (?, ?, ?, ?, ?, ?, 'replace', ?, ?)`,
          )
          .run(
            revisionId,
            asset.asset_id,
            previousRevisionId,
            stat.size,
            stat.mtime.toISOString(),
            path.posix.basename(asset.relative_file_path),
            now,
            fingerprint,
          );
      }
      openLibrary.connection
        .prepare(
          `UPDATE assets
              SET current_revision_id = ?, availability = 'available', updated_at = ?
            WHERE asset_id = ?`,
        )
        .run(revisionId, now, asset.asset_id);
      openLibrary.connection
        .prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE revision_id = ? AND invalidated_at IS NULL`,
        )
        .run(now, previousRevisionId);
      const insertJob = openLibrary.connection.prepare(
        `INSERT INTO jobs
           (job_id, library_id, asset_id, revision_id, kind, status, priority,
            progress, attempt_count, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'queued', 300, 0.0, 0, ?, ?)`,
      );
      for (const kind of ['generate_thumbnail', 'extract_metadata'] as const) {
        insertJob.run(randomUUID(), libraryId, asset.asset_id, revisionId, kind, now, now);
      }
    });
    try {
      await rotateStillImageFile(absolutePath, direction, () => {
        record();
      });
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    this.emitClientAssetsChanged(libraryId, 1);
    return { baked: true, revisionId };
  }

  public override assetBelongsToImageSequence(openLibrary: OpenLibrary, assetId: string): boolean {
    if (
      !hasTable(openLibrary.connection, 'asset_sequence_frames')
      || !hasTable(openLibrary.connection, 'asset_sequences')
    ) {
      return false;
    }
    const row = openLibrary.connection
      .prepare(
        `SELECT 1 AS hit FROM asset_sequence_frames WHERE asset_id = ?
         UNION ALL
         SELECT 1 FROM asset_sequences WHERE primary_asset_id = ?
         LIMIT 1`,
      )
      .get(assetId, assetId) as { hit: number } | undefined;
    return row !== undefined;
  }

  override resolveAssetPath(libraryId: string, assetId: string): string {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const asset = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.location_kind, a.linked_folder_id, a.managed_folder_id,
                a.relative_file_path
           FROM assets a WHERE a.asset_id = ?`,
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
    if (asset.location_kind === 'managed') {
      return this.folderPath(openLibrary, asset.relative_file_path);
    }
    return this.linkedAssetPath(openLibrary, asset.linked_folder_id, asset.relative_file_path);
  }

  /**
   * Resolve files from an OS-native drag back to current asset ids. The
   * absolute paths are consumed only in Worker; Renderer receives ids only.
   * Matching both managed and linked roots keeps native drags usable for
   * folder moves, collection membership, and trash drops.
   */
  override resolveAssetIdsByAbsolutePaths(
    libraryId: string,
    sourcePaths: readonly string[],
  ): string[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const rows = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, linked_folder_id, relative_file_path
           FROM assets
          WHERE deleted_at IS NULL`,
      )
      .all() as Array<{
        asset_id: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        relative_file_path: string;
      }>;
    const linkedRoots = new Map(
      (
        openLibrary.connection
          .prepare(
            `SELECT folder_id, absolute_root_path
               FROM linked_folders
              WHERE library_id = ? AND status = 'available'`,
          )
          .all(libraryId) as Array<{
          folder_id: string;
          absolute_root_path: string;
        }>
      ).map((row) => [row.folder_id, row.absolute_root_path] as const),
    );
    const root = path.join(openLibrary.summary.libraryPath, 'Assets');
    const key = (input: string): string => {
      const normalized = normalizeAbsolutePath(input);
      if (process.platform !== 'win32') return normalized;
      return normalized
        .split(path.sep)
        .map((segment) => portablePathSegmentIdentity(segment))
        .join('/');
    };
    const byPath = new Map<string, string>();
    for (const row of rows) {
      const base = row.location_kind === 'managed'
        ? root
        : row.linked_folder_id
          ? linkedRoots.get(row.linked_folder_id)
          : undefined;
      if (!base) continue;
      byPath.set(key(path.join(base, ...row.relative_file_path.split('/'))), row.asset_id);
    }
    const resolved: string[] = [];
    const seen = new Set<string>();
    for (const sourcePath of sourcePaths) {
      let assetId: string | undefined;
      try {
        assetId = byPath.get(key(sourcePath));
      } catch {
        continue;
      }
      if (assetId && !seen.has(assetId)) {
        seen.add(assetId);
        resolved.push(assetId);
      }
    }
    return resolved;
  }

  /**
   * Resolve the absolute path of a directory-tree folder (managed or linked)
   * for Main-process shell/clipboard actions (REQ-MENU-006). The value never
   * crosses to the Renderer (REQ-COMMAND-003).
   *
   * Managed folders resolve to the library Assets root + recorded relative
   * path; linked folders resolve to their (canonicalized) root. A folder that
   * is missing on disk — or a linked root that is offline or gone — fails
   * with a typed FOLDER_NOT_FOUND instead of handing Main a dead path. The
   * renderer disables these actions for offline linked folders, so the check
   * here is the defensive boundary for stale state.
   */
  override resolveFolderPath(libraryId: string, folderId: string): string {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Serpent-316493: the folder panel's blank area is the library root — its
    // context menu resolves to the Assets directory that holds top-level files.
    if (isLibraryRootFolderId(folderId)) {
      const assetsPath = path.join(openLibrary.summary.libraryPath, 'Assets');
      if (!directoryExists(assetsPath)) throw new LibraryServiceError('FOLDER_NOT_FOUND');
      return assetsPath;
    }
    const managed = openLibrary.connection
      .prepare('SELECT relative_path FROM managed_folders WHERE folder_id = ?')
      .get(folderId) as { relative_path: string } | undefined;
    if (managed) {
      if (this.explicitFolderIgnored(openLibrary, 'managed', null, managed.relative_path)) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND');
      }
      const targetPath = this.folderPath(openLibrary, managed.relative_path);
      if (!directoryExists(targetPath)) throw new LibraryServiceError('FOLDER_NOT_FOUND');
      return targetPath;
    }
    const linkedScope = this.resolveLinkedFolderScope(openLibrary, folderId);
    if (!linkedScope) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    if (this.explicitFolderIgnored(
      openLibrary,
      'linked',
      linkedScope.linkedFolderId,
      linkedScope.relativePath,
    )) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    if (linkedScope.status === 'offline' || this.linkedRootIsGone(linkedScope.absoluteRootPath)) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    const targetPath = linkedScope.relativePath === ''
      ? linkedScope.absoluteRootPath
      : path.join(linkedScope.absoluteRootPath, ...linkedScope.relativePath.split('/'));
    try {
      return realpathSync(targetPath);
    } catch (error) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND', { cause: error });
    }
  }

  /**
   * Return the .serpent/artifacts directory for an open library.
   */
  public override artifactsDir(openLibrary: OpenLibrary): string {
    return path.join(openLibrary.summary.libraryPath, '.serpent', 'artifacts');
  }

  /**
   * Detect media type from a file extension.
   * Returns a product media category, not a Chromium capability. Images whose
   * source cannot be safely mounted in Chromium (RAW, EXR, PSD, etc.) still
   * classify as `image` because the Worker owns an OIIO-derived preview path.
   * `model` covers the T1 3D set. FBX/OBJ/glTF/GLB/STL preview and thumbnails
   * are renderer-side (slices C/E). `.blend` classifies as `other`.
   */
  static detectMediaType(filenameOrMime: string): 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other' {
    const lower = filenameOrMime.toLowerCase();
    if (isSupportedImageExtension(lower)) {
      return 'image';
    }
    if (isSupportedVideoExtension(lower)) {
      return 'video';
    }
    if (isSupportedModelExtension(lower)) {
      return 'model';
    }
    if (isAudioFileName(lower)) {
      return 'audio';
    }
    // Serpent-8ca259: PDF and HTML are documents previewed in a browser-like
    // renderer, not plain text. Check before the text whitelist so they
    // classify as `document`.
    if (isSupportedDocumentExtension(lower)) {
      return 'document';
    }
    // Serpent-485aeb: fonts get their own media type (card sample + viewer).
    if (isSupportedFontExtension(lower)) {
      return 'font';
    }
    if (isTextFileName(lower)) {
      return 'text';
    }
    return 'other';
  }

  /**
   * Map detector output onto AssetSummary.mediaType.
   * searchAssets / trash listing previously collapsed audio+text to `other`
   * (Serpent-671), which hid duration badges and Inspector audio tech lines.
   * `model` passes through unchanged since slice A.
   */


  /** Extensions a thumbnail provider claimed for this library, without a leading dot. */
  override setPluginThumbnailExtensions(libraryId: string, extensions: readonly string[]): void {
    const normalized = new Set<string>();
    for (const value of extensions) {
      const extension = value.trim().replace(/^\./u, '').toLowerCase();
      if (/^[a-z0-9][a-z0-9+_-]*$/u.test(extension)) normalized.add(extension);
    }
    this.pluginThumbnailExtensions.set(libraryId, normalized);
  }

  public override claimsPluginThumbnail(libraryId: string, relativePath: string): boolean {
    const extension = path.extname(relativePath).slice(1).toLowerCase();
    return extension.length > 0
      && (this.pluginThumbnailExtensions.get(libraryId)?.has(extension) ?? false);
  }

  public override thumbnailEligible(libraryId: string, relativePath: string): boolean {
    return this.claimsPluginThumbnail(libraryId, relativePath)
      || supportsThumbnail(relativePath);
  }

  static supportsThumbnail(filename: string): boolean {
    return assetSupportsThumbnail({
      mediaType: toSummaryMediaType(
        detectMediaType(filename),
      ),
      displayName: path.basename(filename),
    });
  }

  static toSummaryMediaType(
    detected: 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other',
  ): 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other' {
    return toSummaryMediaType(detected);
  }

  /**
   * Keep the fast visible-thumbnail wave on media that can complete in the
   * Worker. GPU models are rendered through Main's single-flight offscreen
   * window and stay off this wave.
   */
  override filterVisibleThumbnailAssetIds(
    libraryId: string,
    assetIds: readonly string[],
  ): string[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const selectedIds = [...new Set(assetIds)].slice(0, THUMBNAIL_VISIBLE_PAGE_SIZE);
    if (selectedIds.length === 0) return [];
    const rows = openLibrary.connection
      .prepare(
        `SELECT asset_id, relative_file_path
           FROM assets
          WHERE asset_id IN (${selectedIds.map(() => '?').join(',')})`,
      )
      .all(...selectedIds) as Array<{
        asset_id: string;
        relative_file_path: string;
      }>;
    const gpuModelIds = new Set(
      rows
        .filter((row) => detectMediaType(row.relative_file_path) === 'model')
        .map((row) => row.asset_id),
    );
    return selectedIds.filter((assetId) => !gpuModelIds.has(assetId));
  }

  // ── Thumbnail Generation Dispatch ─────────────────────────────────

  /**
   * Generate thumbnails/artifacts for an asset, dispatching by media type.
   * Models return null here: their cards render offscreen in Main (slice E).
   */
  override async generateThumbnail(input: {
    libraryId: string;
    assetId: string;
  }, execution: MediaExecutionContext = {}): Promise<{ artifactId: string } | null> {
    if (execution.signal?.aborted) {
      throw new DOMException('Media job cancelled before thumbnail generation.', 'AbortError');
    }
    if (mediaResourceGuard.isCoolingDown()) {
      throw new MediaResourceExhaustedError(
        'Native media work is temporarily paused after operating-system resource pressure.',
        'thumbnail',
      );
    }
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const assetPath = this.resolveAssetPath(input.libraryId, input.assetId);

    const mediaType = detectMediaType(assetPath);

    // Get the current revision for this asset
    const assetRow = openLibrary.connection
      .prepare(
        `SELECT a.current_revision_id, r.byte_size AS source_byte_size
           FROM assets a
           LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
          WHERE a.asset_id = ?`,
      )
      .get(input.assetId) as {
        current_revision_id: string | null;
        source_byte_size: number | null;
      } | undefined;
    if (!assetRow?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    const revisionId = assetRow.current_revision_id;
    const ext = path.extname(assetPath).toLowerCase();
    const imageDecoder = imageDecoderForExtension(ext);
    const viewerDecoder = imageViewerDecoderForExtension(ext);
    if (mediaType === 'other' || (mediaType === 'image' && !imageDecoder)) {
      throw new LibraryServiceError('UNSUPPORTED_MEDIA_TYPE');
    }

    // Models render offscreen in Main (slice E). The explicit command path
    // stays a benign no-op so the card keeps the generic icon.
    if (mediaType === 'model') {
      return null;
    }

    // Serpent-8ca259: PDF thumbnails render the first page with pdfjs-dist in
    // the Worker (pure JS, no offscreen window). HTML thumbnails render
    // offscreen in Main through the injected documentThumbnailRenderer.
    // Both are enqueued like any other asset — the enqueue gate must list the
    // document extensions (see enqueueThumbnailJobs supportedExtensions).
    if (mediaType === 'document' && (ext === '.pdf' || ext === '.ai')) {
      return this.generatePdfThumbnail(input, openLibrary, assetPath, revisionId, execution);
    }
    if (mediaType === 'document') {
      const renderer = this.options.documentThumbnailRenderer;
      if (!renderer) return null;
      return this.generateHtmlThumbnail(
        input,
        openLibrary,
        assetPath,
        revisionId,
        execution,
        renderer,
      );
    }

    // Serpent-485aeb: font cards show a real sample line. Main serves a small
    // sample sheet for the font (`sample=font`) and the existing offscreen
    // capture turns it into an artifact, so the Renderer never touches paths.
    // The sheet's label follows the script the font actually covers, which the
    // Worker reads from the font's own `name`/`cmap` tables.
    if (mediaType === 'font') {
      const renderer = this.options.documentThumbnailRenderer;
      if (!renderer) return null;
      const fontMetadata = this.readAssetFontMetadata(assetPath);
      return this.generateHtmlThumbnail(
        input,
        openLibrary,
        assetPath,
        revisionId,
        execution,
        renderer,
        {
          sample: 'font',
          generatorVersion: FONT_THUMBNAIL_GENERATOR_VERSION,
          fontMetadata,
        },
      );
    }

    const isGifAsset = assetPath.toLowerCase().endsWith('.gif');
    const artifactKinds = mediaType === 'video'
      ? [
          ...(execution.includeVideoMetadata === false ? [] : ['extracted_metadata']),
          'video_poster',
        ]
      : mediaType === 'audio'
        // thumbnail = 4:3 grid cover; video_poster = wide viewer strip (Serpent-vlx)
        ? ['extracted_metadata', 'thumbnail', 'video_poster']
      : isGifAsset
        ? ['thumbnail', 'extracted_metadata']
        : ['thumbnail'];
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE revision_id = ?
            AND kind IN (${artifactKinds.map(() => '?').join(', ')})
            AND invalidated_at IS NULL`,
      )
      .run(new Date().toISOString(), revisionId, ...artifactKinds);

    const colorSpaceOverride = mediaType === 'image'
      ? this.getColorSpaceOverride(openLibrary.connection, input.assetId)
      : null;
    const hasSourceDimensions = Number.isSafeInteger(execution.sourceWidth)
      && Number.isSafeInteger(execution.sourceHeight)
      && execution.sourceWidth! > 0
      && execution.sourceHeight! > 0;
    // RAW files commonly use a TIFF-compatible header. Probe it once before
    // the card route so layout gets source dimensions without making the
    // embedded-JPEG path read the source a second time. A queued card already
    // carrying header dimensions skips this I/O entirely.
    const tiffHeaderSize = (isTiffExtension(ext) || isRawImageExtension(ext))
      && !hasSourceDimensions
      ? await readImageDimensions(assetPath)
      : null;
    const sourceExecution: MediaExecutionContext = {
      ...execution,
      sourceByteSize: execution.sourceByteSize ?? assetRow.source_byte_size,
      sourceWidth: execution.sourceWidth ?? tiffHeaderSize?.width,
      sourceHeight: execution.sourceHeight ?? tiffHeaderSize?.height,
    };
    if (
      mediaType === 'image' &&
      imageDecoder === 'sharp' &&
      viewerDecoder === 'sharp' &&
      (!colorSpaceOverride || !canOverrideImageColorSpace(ext))
    ) {
      return this.generateImageThumbnail(input, openLibrary, assetPath, revisionId, sourceExecution);
    }

    // OIIO owns containers that Chromium cannot open directly, including TGA
    // and TIFF. Decoder choice is format-based, never a guessed source-size
    // or pixel-size threshold; the native tool decides whether the content is
    // actually readable.
    if (mediaType === 'image' && viewerDecoder === 'oiio') {
      // RAW output is already LibRaw/OIIO's display-ready default sRGB and
      // the embedded-JPEG card path does not consume a source colour-space
      // override. Avoid an otherwise redundant native `--info` probe before
      // the bounded embedded preview can be served.
      const colorSpace = isRawImageExtension(ext)
        ? null
        : await this.getImageColorSpace(revisionId, assetPath, 'oiio');
      return this.generateOiiOThumbnail(
        input,
        openLibrary,
        assetPath,
        revisionId,
        { inputColorSpace: colorSpaceOverride ?? colorSpace?.id },
        sourceExecution,
      );
    }

    if (mediaType === 'image' && imageDecoder === 'sharp' && colorSpaceOverride) {
      return this.generateOiiOThumbnail(
        input,
        openLibrary,
        assetPath,
        revisionId,
        { inputColorSpace: colorSpaceOverride },
        sourceExecution,
      );
    }

    if (mediaType === 'video') {
      return this.generateVideoArtifacts(
        input,
        openLibrary,
        assetPath,
        revisionId,
        sourceExecution,
        sourceExecution.includeVideoMetadata !== false,
      );
    }

    if (mediaType === 'audio') {
      return this.generateAudioArtifacts(input, openLibrary, assetPath, revisionId, sourceExecution);
    }

    throw new LibraryServiceError('INTERNAL_ERROR');
  }

  /**
   * Slice E (Serpent-hnmg): offscreen model thumbnail generation for a queue
   * job. The actual GPU render happens in Main (shared offscreen window); the
   * Worker performs the size guard (spec 3D-14), stores the returned PNG as
   * the standard `thumbnail` artifact, and records typed failures so the
   * queue dedupes and the card keeps the generic 3D icon (never a badge —
   * MODEL_* and FBX_* codes are benign-suppressed in thumbnail-support.ts).
   */
  public override async processModelThumbnailJob(
    openLibrary: OpenLibrary,
    input: {
      libraryId: string;
      assetId: string;
      revisionId: string;
      relativeFilePath: string;
      byteSize: number | null;
    },
    options: { renderer?: ModelThumbnailRenderer; signal: AbortSignal },
  ): Promise<{ artifactId: string } | null> {
    // No renderer wired (direct unit harness / legacy): keep the benign
    // no-op so thumbnailStatus stays null and nothing is written.
    if (!options.renderer) return null;

    const outcome = await options.renderer({
      libraryId: input.libraryId,
      assetId: input.assetId,
      revisionId: input.revisionId,
      relativeFilePath: input.relativeFilePath,
      byteSize: input.byteSize,
      signal: options.signal,
    });
    if (options.signal.aborted) {
      throw new DOMException('Model thumbnail cancelled during render.', 'AbortError');
    }
    if (outcome.status === 'failed') {
      this.writeModelThumbnailFailure(openLibrary, input.revisionId, outcome.errorCode);
      // The typed code lives on the failed artifact (the job's error_code);
      // the throw only routes into the queue's failure path.
      throw new LibraryServiceError('INTERNAL_ERROR', {
        reason: 'MEDIA_PROCESSING_FAILED',
        ...(outcome.reason === undefined ? {} : { cause: new Error(outcome.reason) }),
      });
    }
    if ('frames' in outcome) {
      // Multi-view renders are consumed by the AI analysis path
      // (renderModelViewsSheet); a thumbnail job receiving frames is a bug.
      throw new LibraryServiceError('INTERNAL_ERROR', {
        reason: 'MEDIA_PROCESSING_FAILED',
      });
    }
    return this.writeModelThumbnailArtifact(
      openLibrary,
      input,
      outcome,
      MODEL_THUMBNAIL_GENERATOR_VERSION,
    );
  }

  /**
   * Render the AI four-view sheet for a model asset: four camera views
   * (斜45°/正视/侧视/俯视) rendered offscreen, tiled into a 1×4 strip
   * (≤2048 wide) and returned as PNG bytes. Not persisted — each analysis
   * re-renders so no schema migration is needed for the sheet kind.
   */
  override async renderModelViewsSheet(
    input: { libraryId: string; assetId: string },
    signal: AbortSignal,
    options: {
      modelAiViewsRenderer?: (
        input: ModelThumbnailRendererInput,
      ) => Promise<ModelThumbnailRenderOutcome>;
    } = {},
  ): Promise<{ pngBytes: Uint8Array; mime: string }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const renderer = options.modelAiViewsRenderer ?? this.modelAiViewsRenderer;
    const asset = openLibrary.connection
      .prepare(
        'SELECT relative_file_path, current_revision_id FROM assets WHERE asset_id = ?',
      )
      .get(input.assetId) as {
        relative_file_path: string;
        current_revision_id: string | null;
      } | undefined;
    if (!asset || !renderer) {
      throw new LibraryServiceError('AI_ANALYSIS_FAILED', { reason: 'THUMBNAIL_REQUIRED' });
    }
    const views: ReadonlyArray<readonly [number, number, number]> = [
      [0.6708203932499369, 0.5031153024374527, 0.6708203932499369], // 斜45°
      [0, 0, 1],   // 正视
      [1, 0, 0],   // 侧视
      [0, 1, 0],   // 俯视
    ];
    const outcome = await renderer({
      libraryId: input.libraryId,
      assetId: input.assetId,
      revisionId: asset.current_revision_id ?? '',
      relativeFilePath: asset.relative_file_path,
      byteSize: null,
      signal,
      views,
    });
    if (outcome.status === 'failed' || !('frames' in outcome)) {
      throw new LibraryServiceError('AI_ANALYSIS_FAILED', { reason: 'THUMBNAIL_REQUIRED' });
    }
    const frames = outcome.frames;
    // 1×4 strip, left to right: 斜45°/正视/侧视/俯视 (each frame ≤512 wide).
    const tiledResult = await runSharpDecoder(signal, undefined, async () => {
      const sharp = this.options.sharpFn ?? requireSharp();
      return sharp(
        Buffer.concat(frames.map((frame) => Buffer.from(frame.pngBytes))),
      ).composite(
        frames.map((frame, index) => ({
          input: Buffer.from(frame.pngBytes),
          left: index * frame.width,
          top: 0,
        })),
      ).png!().toBuffer!();
    }, {
      sourceByteSize: frames.reduce((total, frame) => total + frame.pngBytes.byteLength, 0),
      width: frames.reduce((total, frame) => total + frame.width, 0),
      height: 512,
    });
    return { pngBytes: tiledResult as Buffer, mime: 'image/png' };
  }

  /** Persist an offscreen-rendered model thumbnail as the standard artifact. */
  public override writeModelThumbnailArtifact(
    openLibrary: OpenLibrary,
    input: { libraryId: string; assetId: string; revisionId: string },
    frame: { pngBytes: Uint8Array; width: number; height: number },
    generatorVersion: string = MODEL_THUMBNAIL_GENERATOR_VERSION,
  ): { artifactId: string } {
    const bytes = frame.pngBytes;
    if (
      bytes.byteLength < 8
      || !Number.isInteger(frame.width)
      || !Number.isInteger(frame.height)
    ) {
      throw new LibraryServiceError('INTERNAL_ERROR', {
        reason: 'MEDIA_PROCESSING_FAILED',
      });
    }
    const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (let index = 0; index < signature.length; index += 1) {
      if (bytes[index] !== signature[index]) {
        throw new LibraryServiceError('INTERNAL_ERROR', {
          reason: 'MEDIA_PROCESSING_FAILED',
        });
      }
    }

    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.png`;
    const artifactAbsPath = path.join(this.artifactsDir(openLibrary), artifactRelPath);
    mkdirSync(this.artifactsDir(openLibrary), { recursive: true });
    writeFileSync(artifactAbsPath, bytes, { flag: 'wx' });
    const now = new Date().toISOString();
    openLibrary.connection.transaction(() => {
      openLibrary.connection
        .prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE revision_id = ? AND kind = 'thumbnail' AND invalidated_at IS NULL`,
        )
        .run(now, input.revisionId);
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              width, height, generator_version, status, generated_at)
           VALUES (?, ?, 'thumbnail', 'image/png', ?, ?, ?, ?, ?, 'ready', ?)`,
        )
        .run(
          artifactId,
          input.revisionId,
          bytes.byteLength,
          artifactRelPath,
          frame.width,
          frame.height,
          generatorVersion,
          now,
        );
    })();
    return { artifactId };
  }

  /**
   * Terminal failed-artifact row for a model (dedupes re-enqueue and feeds
   * the thumbnailStatus map). No file is written; failed artifacts are never
   * served.
   */
  public override writeModelThumbnailFailure(
    openLibrary: OpenLibrary,
    revisionId: string,
    errorCode: string,
    generatorVersion: string = MODEL_THUMBNAIL_GENERATOR_VERSION,
  ): void {
    const artifactId = randomUUID();
    openLibrary.connection
      .prepare(
        `INSERT INTO revision_artifacts
           (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
            generator_version, status, error_code, generated_at)
         VALUES (?, ?, 'thumbnail', 'image/png', 0, ?, ?, 'failed', ?, ?)`,
      )
      .run(
        artifactId,
        revisionId,
        `${artifactId}.png`,
        generatorVersion,
        errorCode,
        new Date().toISOString(),
      );
  }

  /** Media-type lookup for a single asset (used by the direct thumbnail path). */
  override isModelAsset(libraryId: string, assetId: string): boolean {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare('SELECT relative_file_path FROM assets WHERE asset_id = ?')
      .get(assetId) as { relative_file_path: string } | undefined;
    return (
      row !== undefined
      && detectMediaType(row.relative_file_path) === 'model'
    );
  }

  /**
   * Render the first page of a PDF, or PDF-compatible AI file, to a standard
   * thumbnail artifact with pdfjs-dist + @napi-rs/canvas.
   * The render result is written through the same revision_artifacts pipeline
   * as image thumbnails, so cards/Inspector/hover work unchanged.
   */
  public override async generatePdfThumbnail(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    execution: MediaExecutionContext,
  ): Promise<{ artifactId: string }> {
    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    const artifactRelPath = `${artifactId}.jpg`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);

    try {
      if (
        path.extname(assetPath).toLowerCase() === '.ai'
        && !hasPdfCompatibleIllustratorHeader(assetPath)
      ) {
        throw new Error('Illustrator file has no PDF-compatible representation.');
      }
      const pdfBytes = readFileSync(assetPath);
      if (pdfBytes.length === 0) {
        throw new Error('PDF file is empty.');
      }
      if (execution.signal?.aborted) {
        throw new DOMException('Media job cancelled before PDF load.', 'AbortError');
      }
      // pdfjs-dist 6.x ships an ESM build; load lazily so Worker startup is
      // unaffected when no PDFs are queued. The legacy build runs in Node.
      // Electron's bundled Node predates DOMMatrix (added in Node 24), and
      // pdfjs instantiates `new DOMMatrix` at module scope — importing it
      // without a polyfill crashes the whole Library Worker (Serpent-8ca259).
      // @napi-rs/canvas ships matching geometry classes; install them as
      // globals before pdfjs loads.
      const {
        createCanvas,
        DOMMatrix,
        DOMPoint,
        DOMRect,
        Path2D,
        ImageData,
      } = await import('@napi-rs/canvas');
      const workerGlobal = globalThis as {
        DOMMatrix?: unknown;
        DOMPoint?: unknown;
        DOMRect?: unknown;
        Path2D?: unknown;
        ImageData?: unknown;
      };
      if (workerGlobal.DOMMatrix === undefined) {
        Object.assign(globalThis, { DOMMatrix, DOMPoint, DOMRect });
      }
      if (workerGlobal.Path2D === undefined) {
        Object.assign(globalThis, { Path2D });
      }
      if (workerGlobal.ImageData === undefined) {
        Object.assign(globalThis, { ImageData });
      }
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      // The bundled pdfjs defaults workerSrc to "./pdf.worker.mjs" relative to
      // its chunk, which does not exist in the build directory; the fake
      // worker then fails to load the worker module. Point at the real module
      // shipped next to the package (resolved from the bundle's location).
      const { createRequire } = await import('node:module');
      const { pathToFileURL } = await import('node:url');
      const requireFromBundle = createRequire(__filename);
      pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(
        requireFromBundle.resolve('pdfjs-dist/legacy/build/pdf.worker.mjs'),
      ).href;
      // pdfjs 6.x 把 wasm（jbig2/openjpeg）、cmaps、standard_fonts 放在
      // pdfjs-dist 顶层资源目录，不在 pdf.worker.mjs 同目录；不显式提供
      // wasmUrl 时，含 JBIG2 压缩图片的 PDF（扫描论文常见）无法解码
      // （ERR_MODULE_NOT_FOUND nulljbig2_nowasm_fallback.js），缩略图生成
      // 失败 → 文件夹封面反复失效重试。getDocument 的 URL 需以 / 结尾。
      const pdfjsRoot = path.dirname(requireFromBundle.resolve('pdfjs-dist/package.json'));
      const wasmUrl = pathToFileURL(`${pdfjsRoot}/wasm/`).href;
      const cMapUrl = pathToFileURL(`${pdfjsRoot}/cmaps/`).href;
      const standardFontDataUrl = pathToFileURL(`${pdfjsRoot}/standard_fonts/`).href;
      // Vite bundling breaks pdfjs's own node_utils bootstrap (it calls
      // createRequire(import.meta.url), which is undefined in the CJS
      // bundle), so internal image painting would hit the DOM canvas factory
      // and crash. Provide an explicit @napi-rs/canvas-backed factory class;
      // pdfjs instantiates it with `new CanvasFactory({ ownerDocument,
      // enableHWA })`.
      class NapiCanvasFactory {
        constructor(options: { ownerDocument?: unknown; enableHWA?: boolean } = {}) {
          void options;
        }
        create(width: number, height: number) {
          const canvas = createCanvas(width, height);
          return { canvas, context: canvas.getContext('2d') };
        }
        reset(
          canvasAndContext: { canvas: { width: number; height: number }; context: unknown },
          width: number,
          height: number,
        ) {
          canvasAndContext.canvas.width = width;
          canvasAndContext.canvas.height = height;
        }
        destroy(canvasAndContext: { canvas: { width: number; height: number }; context: unknown }) {
          // @napi-rs/canvas canvases are garbage-collected; no explicit disposal.
          void canvasAndContext;
        }
      }
      const loadingTask = pdfjs.getDocument({
        data: new Uint8Array(pdfBytes),
        CanvasFactory: NapiCanvasFactory,
        wasmUrl,
        cMapUrl,
        standardFontDataUrl,
      });
      const pdfDocument = await loadingTask.promise;
      try {
        const page = await pdfDocument.getPage(1);
        // Render at a fixed 1024px-longest-edge for a crisp 512 card after
        // sharp downscale (pdfjs viewport units are PDF points, 72dpi).
        const baseViewport = page.getViewport({ scale: 1 });
        const longestEdge = Math.max(baseViewport.width, baseViewport.height);
        const scale = longestEdge > 0 ? 1024 / longestEdge : 1;
        const viewport = page.getViewport({ scale });
        const canvas = createCanvas(
          Math.max(1, Math.ceil(viewport.width)),
          Math.max(1, Math.ceil(viewport.height)),
        );
        const context = canvas.getContext('2d');
        await page.render({
          canvas: canvas as never,
          canvasContext: context as never,
          viewport,
        }).promise;
        if (execution.signal?.aborted) {
          throw new DOMException('Media job cancelled after PDF render.', 'AbortError');
        }
        const pngBuffer = canvas.toBuffer('image/png');
        const width = Math.round(viewport.width);
        const height = Math.round(viewport.height);
        await runSharpDecoder(
          execution.signal,
          execution.lane,
          async () => {
            const sharp = this.options.sharpFn ?? requireSharp();
            await sharp(pngBuffer)
              .rotate()
              .toColourspace('srgb')
              .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: 72 })
              .toFile(artifactAbsPath);
          },
          { sourceByteSize: pngBuffer.byteLength, width, height },
        );
        const outputStat = statSync(artifactAbsPath);
        openLibrary.connection
          .prepare(
            `INSERT INTO revision_artifacts
               (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                width, height, generator_version, status, generated_at)
             VALUES (?, ?, 'thumbnail', 'image/jpeg', ?, ?, ?, ?, ?, 'ready', ?)`,
          )
          .run(
            artifactId,
            revisionId,
            outputStat.size,
            artifactRelPath,
            width || null,
            height || null,
            `pdfjs@${pdfjs.version ?? '6'}`,
            new Date().toISOString(),
          );
        return { artifactId };
      } finally {
        await loadingTask.destroy();
      }
    } catch (error) {
      // Failed PDF artifacts must land in revision_artifacts so the card shows
      // the failure badge and repair can re-run, mirroring image failures.
      try {
        openLibrary.connection
          .prepare(
            `INSERT INTO revision_artifacts
               (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                width, height, generator_version, status, error_code, generated_at)
             VALUES (?, ?, 'thumbnail', 'application/pdf', 0, ?, NULL, NULL, ?, 'failed', ?, ?)`,
          )
          .run(
            artifactId,
            revisionId,
            artifactRelPath,
            `pdfjs@failed`,
            'UNSUPPORTED_FORMAT',
            new Date().toISOString(),
          );
      } catch {
        // Preserve the original error if the failure record itself fails.
      }
      throw error;
    }
  }

  /**
   * Serpent-8ca259: HTML thumbnail via the injected Main offscreen capture.
   * The PNG is downscaled with sharp and stored as a standard thumbnail
   * artifact; a null render or a failed record keeps the card on the generic
   * file icon (never `failed` for a benign missing renderer).
   */
  /**
   * Serpent-485aeb: font metadata for an asset path, or null when the file is
   * unreadable/not a font. Never throws: an unparsable font only costs the
   * sample sheet its label.
   */
  public override readAssetFontMetadata(assetPath: string): FontMetadata | null {
    return readFontMetadata(assetPath);
  }

  public override async generateHtmlThumbnail(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    execution: MediaExecutionContext,
    renderer: NonNullable<LibraryServiceOptions['documentThumbnailRenderer']>,
    options?: {
      readonly sample?: 'font';
      readonly generatorVersion?: string;
      readonly fontMetadata?: FontMetadata | null;
    },
  ): Promise<{ artifactId: string } | null> {
    const sampleQuery =
      options?.sample === 'font'
        ? `&sample=font${fontSampleQuerySuffix(options.fontMetadata ?? null)}`
        : '';
    const url = `serpent://source/${encodeURIComponent(input.libraryId)}/${encodeURIComponent(input.assetId)}?revision=${encodeURIComponent(revisionId)}${sampleQuery}`;
    if (execution.signal?.aborted) {
      throw new DOMException('Media job cancelled before HTML render.', 'AbortError');
    }
    const rendered = await renderer({
      libraryId: input.libraryId,
      assetId: input.assetId,
      revisionId,
      url,
      width: DOCUMENT_THUMBNAIL_WIDTH,
      // 字体样张按 16:9 采集（用户反馈：卡片封面不要 4:3）。
      ...(options?.sample === 'font' ? { height: FONT_THUMBNAIL_HEIGHT } : {}),
      signal: execution.signal,
    });
    if (!rendered) return null;
    if (execution.signal?.aborted) {
      throw new DOMException('Media job cancelled after HTML render.', 'AbortError');
    }

    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    const artifactRelPath = `${artifactId}.jpg`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    await runSharpDecoder(
      execution.signal,
      execution.lane,
      async () => {
        const sharp = this.options.sharpFn ?? requireSharp();
        await sharp(Buffer.from(rendered.png))
          .rotate()
          .toColourspace('srgb')
          .resize({ width: 512, height: 512, fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 72 })
          .toFile(artifactAbsPath);
      },
      {
        sourceByteSize: rendered.png.byteLength,
        width: rendered.width,
        height: rendered.height,
      },
    );
    const outputStat = statSync(artifactAbsPath);
    openLibrary.connection
      .prepare(
        `INSERT INTO revision_artifacts
           (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
            width, height, generator_version, status, generated_at)
         VALUES (?, ?, 'thumbnail', 'image/jpeg', ?, ?, ?, ?, ?, 'ready', ?)`,
      )
      .run(
        artifactId,
        revisionId,
        outputStat.size,
        artifactRelPath,
        rendered.width || null,
        rendered.height || null,
        options?.generatorVersion ?? DOCUMENT_THUMBNAIL_GENERATOR_VERSION,
        new Date().toISOString(),
      );
    return { artifactId };
  }

}
