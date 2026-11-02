/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { MediaExecutionContext, OpenLibrary, PaletteSharpModule, VideoProxyProfile} from '../library-service-internals';
import { EMBEDDED_IMAGE_METADATA_GENERATOR, FFMPEG_METADATA_GENERATOR, FFMPEG_VERSION, LibraryServiceError, RAW_IMAGE_METADATA_MAX_ATTEMPTS, RAW_IMAGE_METADATA_RETRY_DELAY_MS, SHARP_VERSION, VIDEO_PROXY_SCALE_FILTER, embeddedImageMetadataExtensionMatchSql, escapeFfmpegFilterPath, rawImageExtensionMatchSql, requireSharp, runSharpDecoder, throwIfMediaExecutionAborted, waitForSharedMediaOperation } from '../library-service-internals';
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
import { LibraryServiceVideo } from './LibraryServiceVideo';
import { detectMediaType, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';

/** LibraryServiceOiio: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceOiio extends LibraryServiceVideo {

  // ── Video artifacts (ffprobe + ffmpeg) ─────────────────────────────

  /**
   * Generate a video poster, and (for direct requests) metadata. Queue-owned
   * imports set `includeMetadata` false: durable metadata and contact-sheet
   * jobs then run independently of the browsing poster.
   * Returns the poster artifact ID (the primary visual thumbnail).
   */
  public override async generateVideoArtifacts(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    execution: MediaExecutionContext,
    includeMetadata: boolean,
  ): Promise<{ artifactId: string }> {
    const ffprobePath = resolveFfprobePath();
    const ffmpegPath = resolveFfmpegPath();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });

    let posterArtifactId: string | null = null;
    let durationSec: number | null = null;

    if (includeMetadata) {
      // Direct callers retain the historical all-in-one behavior. The queue
      // deliberately keeps this out of the poster job so AI can proceed
      // without waiting for the card preview.
      try {
        const probed = await this.probeVideoAsset(
          input, openLibrary, assetPath, revisionId, ffprobePath, execution,
        );
        durationSec = probed.durationSec > 0 ? probed.durationSec : null;
      } catch (error) {
        const resourceError = asMediaResourceExhaustedError(error, 'ffprobe');
        if (resourceError) throw resourceError;
        this.diagnose('video-probe', error, { libraryId: input.libraryId, assetId: input.assetId });
        // Continue with the poster even if probing fails.
      }
    }

    // 2. Video poster
    try {
      posterArtifactId = await this.generateVideoPoster(
        input, openLibrary, assetPath, revisionId, ffmpegPath, ffprobePath,
        artifactsDir, execution, durationSec,
      );
    } catch (error) {
      const resourceError = asMediaResourceExhaustedError(error, 'ffmpeg-video-poster');
      if (resourceError) throw resourceError;
      this.diagnose('video-poster', error, { libraryId: input.libraryId, assetId: input.assetId });
      // Continue with remaining artifacts
    }

    if (!posterArtifactId) {
      throw new LibraryServiceError('INTERNAL_ERROR', {
        reason: 'MEDIA_PROCESSING_FAILED',
      });
    }

    return { artifactId: posterArtifactId };
  }

  public override enqueueVideoMetadataJob(
    openLibrary: OpenLibrary,
    assetId: string,
    revisionId: string,
    priority: number,
  ): void {
    const asset = openLibrary.connection
      .prepare(
        `SELECT location_kind, linked_folder_id, relative_file_path,
                current_revision_id, availability
           FROM assets
          WHERE asset_id = ? AND deleted_at IS NULL`,
      )
      .get(assetId) as {
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
      } | undefined;
    if (!asset || this.isExplicitlyIgnored(
      openLibrary,
      asset.location_kind,
      asset.linked_folder_id,
      asset.relative_file_path,
      'asset',
    )) return;
    const terminalArtifact = openLibrary.connection.prepare(
      `SELECT artifact_id, status FROM revision_artifacts WHERE revision_id = ? AND kind = 'extracted_metadata'
        AND status IN ('ready', 'failed') AND invalidated_at IS NULL
        AND generator_version = ? LIMIT 1`,
    ).get(revisionId, FFMPEG_METADATA_GENERATOR) as { artifact_id: string; status: 'ready' | 'failed' } | undefined;
    const active = openLibrary.connection.prepare(
      `SELECT job_id FROM jobs WHERE asset_id = ? AND revision_id = ? AND kind = 'extract_metadata'
        AND status IN ('queued', 'running', 'paused') LIMIT 1`,
    ).get(assetId, revisionId) as { job_id: string } | undefined;
    const admission = admitArtifactJob({
      assetId,
      revisionId,
      currentRevisionId: asset.current_revision_id,
      mediaType: detectMediaType(asset.relative_file_path),
      jobKind: 'extract_metadata',
      availability: asset.availability,
      ignored: false,
      readyArtifact: terminalArtifact?.status === 'ready',
      failedArtifact: terminalArtifact?.status === 'failed',
      activeJob: active !== undefined,
    });
    if (!admission.admitted) return;
    const now = new Date().toISOString();
    openLibrary.connection.prepare(
      `INSERT INTO jobs
         (job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
          attempt_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'extract_metadata', 'queued', ?, 0.0, 0, ?, ?)`,
    ).run(randomUUID(), openLibrary.summary.libraryId, assetId, revisionId, priority, now, now);
  }

  /**
   * Enqueue bounded RAW technical-metadata work without coupling it to the
   * card thumbnail. Header-only artifacts are intentionally not terminal:
   * they provide layout dimensions, but the Inspector still needs the later
   * EXIF/IPTC/XMP projection. A successful no-metadata job is terminal at the
   * job layer so unsupported/metadata-less camera files do not requeue on
   * every browse refresh. The queue also persists a normalized, empty
   * metadata artifact so the terminal state is visible to readers.
   */
  public override requeueRawImageMetadataJobs(
    openLibrary: OpenLibrary,
    options: { assetIds?: readonly string[]; limit: number; extensions?: 'raw' | 'embedded' },
  ): { admitted: number; probed: number } {
    const selectedIds = [...new Set(options.assetIds ?? [])].slice(0, 500);
    const selectedSql = selectedIds.length > 0
      ? `AND a.asset_id IN (${selectedIds.map(() => '?').join(',')})`
      : '';
    const extensionMatch = options.extensions === 'embedded'
      ? embeddedImageMetadataExtensionMatchSql(openLibrary.connection, 'a')
      : rawImageExtensionMatchSql(openLibrary.connection, 'a');
    const limit = Math.max(1, Math.min(500, Math.trunc(options.limit)));
    const retryCutoff = new Date(Date.now() - RAW_IMAGE_METADATA_RETRY_DELAY_MS).toISOString();
    const retryRows = openLibrary.connection
      .prepare(
        `SELECT j.job_id
           FROM jobs j
           JOIN assets a ON a.asset_id = j.asset_id
          WHERE j.library_id = ?
            AND j.kind = 'extract_metadata'
            AND j.status = 'failed'
            AND j.error_code = 'RAW_METADATA_EXTRACTION_FAILED'
            AND j.attempt_count < ?
            AND j.updated_at <= ?
            AND a.deleted_at IS NULL
            AND a.current_revision_id = j.revision_id
            AND a.availability = 'available'
            ${selectedSql}
            AND NOT EXISTS (
              SELECT 1 FROM linked_folders loff
               WHERE loff.folder_id = a.linked_folder_id
                 AND loff.status = 'offline'
            )
            AND ${extensionMatch.sql}
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts complete_metadata
               WHERE complete_metadata.revision_id = a.current_revision_id
                 AND complete_metadata.kind = 'extracted_metadata'
                 AND complete_metadata.status = 'ready'
                 AND complete_metadata.invalidated_at IS NULL
                 AND complete_metadata.generator_version = ?
            )
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts failed_metadata
               WHERE failed_metadata.revision_id = a.current_revision_id
                 AND failed_metadata.kind = 'extracted_metadata'
                 AND failed_metadata.status = 'failed'
                 AND failed_metadata.invalidated_at IS NULL
            )
          ORDER BY j.updated_at, j.job_id
          LIMIT ?`,
      )
      .all(
        openLibrary.summary.libraryId,
        RAW_IMAGE_METADATA_MAX_ATTEMPTS,
        retryCutoff,
        ...selectedIds,
        ...extensionMatch.params,
        EMBEDDED_IMAGE_METADATA_GENERATOR,
        limit,
      ) as Array<{ job_id: string }>;
    if (retryRows.length === 0) return { admitted: 0, probed: 0 };
    const now = new Date().toISOString();
    const requeue = openLibrary.connection.prepare(
      `UPDATE jobs
          SET status = 'queued', progress = 0.0,
              error_code = NULL, error_detail = NULL, updated_at = ?
        WHERE job_id = ? AND status = 'failed'`,
    );
    let admitted = 0;
    openLibrary.connection.transaction(() => {
      for (const row of retryRows) admitted += requeue.run(now, row.job_id).changes;
    })();
    return { admitted, probed: retryRows.length };
  }

  /** Requeue only due RAW failures; this path never probes the catalog cursor. */
  override requeueRawImageMetadataBackfillRetries(libraryId: string, limit = 256): number {
    const openLibrary = this.requireOpenLibrary(libraryId);
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) return 0;
    const pending = Number((openLibrary.connection
      .prepare(
        `SELECT COUNT(*) AS count
           FROM jobs
          WHERE library_id = ?
            AND kind = 'extract_metadata'
            AND status IN ('queued', 'running', 'paused')`,
      )
      .get(libraryId) as { count: number } | undefined)?.count ?? 0);
    const available = Math.max(0, Math.min(500, Math.trunc(limit)) - pending);
    if (available === 0) return 0;
    return this.requeueRawImageMetadataJobs(openLibrary, { limit: available }).admitted;
  }

  /**
   * A ready extracted_metadata row whose width or height is not a positive
   * pixel size was a failed probe (commonly an EXIF stub of 0×0). It must not
   * stay terminal: invalidate it and put the metadata job back on the queue
   * so the container header can replace it.
   */
  public override requeueNonPositiveExtractedImageDimensions(
    openLibrary: OpenLibrary,
    options: {
      assetIds: readonly string[];
      extension: { sql: string; params: readonly string[] };
      limit: number;
    },
  ): void {
    const selectedSql = options.assetIds.length > 0
      ? `AND a.asset_id IN (${options.assetIds.map(() => '?').join(',')})`
      : '';
    const rows = openLibrary.connection
      .prepare(
        `SELECT ra.artifact_id, a.current_revision_id AS revision_id
           FROM assets a
           JOIN revision_artifacts ra ON ra.revision_id = a.current_revision_id
          WHERE a.deleted_at IS NULL
            AND a.current_revision_id IS NOT NULL
            AND a.availability = 'available'
            ${selectedSql}
            AND ${options.extension.sql}
            AND ra.kind = 'extracted_metadata'
            AND ra.status = 'ready'
            AND ra.invalidated_at IS NULL
            AND (
              (ra.width IS NOT NULL AND ra.width <= 0)
              OR (ra.height IS NOT NULL AND ra.height <= 0)
            )
          LIMIT ?`,
      )
      .all(
        ...options.assetIds,
        ...options.extension.params,
        options.limit,
      ) as Array<{ artifact_id: string; revision_id: string }>;
    if (rows.length === 0) return;
    const now = new Date().toISOString();
    const invalidate = openLibrary.connection.prepare(
      `UPDATE revision_artifacts
          SET invalidated_at = ?
        WHERE artifact_id = ?
          AND invalidated_at IS NULL`,
    );
    const requeue = openLibrary.connection.prepare(
      `UPDATE jobs
          SET status = 'queued', progress = 0.0,
              error_code = NULL, error_detail = NULL, updated_at = ?
        WHERE revision_id = ?
          AND kind = 'extract_metadata'
          AND status IN ('succeeded', 'failed', 'cancelled')`,
    );
    openLibrary.connection.transaction(() => {
      for (const row of rows) {
        invalidate.run(now, row.artifact_id);
        requeue.run(now, row.revision_id);
      }
    })();
  }

  public override enqueueRawImageMetadataJobs(
    openLibrary: OpenLibrary,
    options: {
      assetIds?: readonly string[];
      limit?: number;
      /** The same durable job kind serves RAW and common image containers. */
      extensions?: 'raw' | 'embedded';
    } = {},
  ): RawMetadataBackfillProbeOutcome {
    const targeted = options.assetIds !== undefined;
    const isBackfill = options.extensions !== 'embedded' && !targeted;
    const selectedIds = [...new Set(options.assetIds ?? [])].slice(0, 500);
    if (targeted && selectedIds.length === 0) {
      return { admitted: 0, probed: 0, budgetCapped: true };
    }
    const selectedSql = selectedIds.length > 0
      ? `AND a.asset_id IN (${selectedIds.map(() => '?').join(',')})`
      : '';
    const extensionMatch = options.extensions === 'embedded'
      ? embeddedImageMetadataExtensionMatchSql(openLibrary.connection, 'a')
      : rawImageExtensionMatchSql(openLibrary.connection, 'a');
    this.requeueNonPositiveExtractedImageDimensions(openLibrary, {
      assetIds: selectedIds,
      extension: extensionMatch,
      limit: options.limit === undefined
        ? 64
        : Math.max(1, Math.min(64, Math.trunc(options.limit))),
    });
    // Metadata is a secondary Inspector aid. Keep each enqueue call bounded;
    // the regular background scheduler will admit the next batch after the
    // primary thumbnail wave yields.
    const limit = options.limit === undefined
      ? 256
      : Math.max(1, Math.min(500, Math.trunc(options.limit)));
    // Backfill is a secondary maintenance lane. Keep its durable queue bounded
    // so each scheduler turn does not rescan every asset while hundreds of
    // metadata jobs are already waiting. The jobs library/status index makes
    // this count cheap; explicit asset requests bypass the cap so visible or
    // newly-mutated assets still receive immediate derived work.
    const pendingMetadataCount = options.assetIds === undefined
      ? Number((openLibrary.connection
          .prepare(
            `SELECT COUNT(*) AS count
               FROM jobs
              WHERE library_id = ?
                AND kind = 'extract_metadata'
                AND status IN ('queued', 'running', 'paused')`,
          )
          .get(openLibrary.summary.libraryId) as { count: number } | undefined)?.count ?? 0)
      : 0;
    const availableAdmissionLimit = Math.max(0, limit - pendingMetadataCount);
    // 全局上限已满：本轮 0 结果是「排队预算用尽」而不是「候选扫完」，不得据此标记
    // exhausted（Serpent-288cd9）。
    if (availableAdmissionLimit === 0) {
      return { admitted: 0, probed: 0, budgetCapped: true };
    }
    const admissionToken = isBackfill ? this.rawMetadataBackfillToken(openLibrary) : null;
    const persistedAdmission = isBackfill
      ? this.getRawMetadataBackfillAdmissionState(openLibrary.summary.libraryId)
      : null;
    const admissionStateMatches = admissionToken !== null
      && persistedAdmission?.token === admissionToken;
    if (admissionStateMatches && persistedAdmission?.exhausted) {
      return { admitted: 0, probed: 0, budgetCapped: false };
    }
    const cursorAssetId = admissionStateMatches ? persistedAdmission?.cursorAssetId ?? null : null;
    const cursorSql = isBackfill && cursorAssetId !== null
      ? 'AND a.asset_id > ?'
      : '';
    const cursorParams = cursorSql === '' ? [] : [cursorAssetId];
    const retryAdmission = this.requeueRawImageMetadataJobs(openLibrary, {
      ...(targeted ? { assetIds: selectedIds } : {}),
      ...(options.extensions === undefined ? {} : { extensions: options.extensions }),
      limit: availableAdmissionLimit,
    });
    const retryRows = retryAdmission.probed;
    let enqueued = retryAdmission.admitted;
    const now = new Date().toISOString();
    const remainingLimit = Math.max(0, availableAdmissionLimit - enqueued);
    if (remainingLimit === 0) {
      return { admitted: enqueued, probed: retryRows, budgetCapped: true };
    }
    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.current_revision_id
           FROM assets a
          WHERE a.deleted_at IS NULL
            AND a.current_revision_id IS NOT NULL
            AND a.availability = 'available'
            ${selectedSql}
            ${cursorSql}
            AND NOT EXISTS (
              SELECT 1 FROM linked_folders loff
               WHERE loff.folder_id = a.linked_folder_id
                 AND loff.status = 'offline'
            )
            AND ${extensionMatch.sql}
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
            AND NOT EXISTS (
              SELECT 1 FROM jobs active
               WHERE active.library_id = ?
                 AND active.asset_id = a.asset_id
                 AND active.revision_id = a.current_revision_id
                 AND active.kind = 'extract_metadata'
                 AND active.status IN ('queued', 'running', 'paused')
            )
            AND NOT EXISTS (
              SELECT 1 FROM jobs terminal
               WHERE terminal.library_id = ?
                 AND terminal.asset_id = a.asset_id
                 AND terminal.revision_id = a.current_revision_id
                 AND terminal.kind = 'extract_metadata'
                 AND terminal.status = 'succeeded'
            )
            AND NOT EXISTS (
              SELECT 1 FROM jobs failed_retry
               WHERE failed_retry.library_id = ?
                 AND failed_retry.asset_id = a.asset_id
                 AND failed_retry.revision_id = a.current_revision_id
                 AND failed_retry.kind = 'extract_metadata'
                 AND failed_retry.status = 'failed'
                 AND failed_retry.error_code = 'RAW_METADATA_EXTRACTION_FAILED'
            )
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts complete_metadata
               WHERE complete_metadata.revision_id = a.current_revision_id
                 AND complete_metadata.kind = 'extracted_metadata'
                 AND complete_metadata.status = 'ready'
                 AND complete_metadata.invalidated_at IS NULL
                 AND complete_metadata.generator_version = ?
            )
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts failed_metadata
               WHERE failed_metadata.revision_id = a.current_revision_id
                 AND failed_metadata.kind = 'extracted_metadata'
                 AND failed_metadata.status = 'failed'
                 AND failed_metadata.invalidated_at IS NULL
            )
          ${isBackfill ? 'ORDER BY a.asset_id' : 'ORDER BY a.created_at DESC, a.relative_file_path'}
          LIMIT ?`,
      )
      .all(
        ...selectedIds,
        ...cursorParams,
        ...extensionMatch.params,
        openLibrary.summary.libraryId,
        openLibrary.summary.libraryId,
        openLibrary.summary.libraryId,
        EMBEDDED_IMAGE_METADATA_GENERATOR,
        remainingLimit,
      ) as Array<{ asset_id: string; current_revision_id: string }>;
    // A change observed between the token sampled at admission and the end
    // of the candidate read invalidates this page. Do not mark that newer
    // token exhausted or carry a cursor across the concurrent mutation.
    const tokenAfterProbe = isBackfill ? this.rawMetadataBackfillToken(openLibrary) : null;
    if (rows.length === 0) {
      if (isBackfill && admissionToken !== null) {
        // Preserve a cursor only when the token stayed stable during the
        // probe. A concurrent catalog mutation must restart from the keyset
        // boundary on the next token.
        const postToken = this.rawMetadataBackfillToken(openLibrary);
        if (postToken !== null) {
          const probeWasStable = tokenAfterProbe !== null
            && this.rawMetadataBackfillPostTokenMatchesOwnWrites(
              admissionToken,
              tokenAfterProbe,
            )
            && this.rawMetadataBackfillPostTokenMatchesOwnWrites(
              tokenAfterProbe,
              postToken,
            );
          this.persistRawMetadataBackfillAdmissionState(openLibrary, {
            token: postToken,
            cursorAssetId: probeWasStable ? cursorAssetId : null,
            exhausted: probeWasStable,
          });
        }
      }
      return {
        admitted: enqueued,
        probed: retryRows,
        budgetCapped: targeted,
      };
    }

    const insert = openLibrary.connection.prepare(
      `INSERT INTO jobs
         (job_id, library_id, asset_id, revision_id, kind, status, priority,
          progress, attempt_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'extract_metadata', 'queued', -25, 0.0, 0, ?, ?)`,
    );
    openLibrary.connection.transaction(() => {
      for (const row of rows) {
        const admission = admitArtifactJob({
          assetId: row.asset_id,
          revisionId: row.current_revision_id,
          currentRevisionId: row.current_revision_id,
          mediaType: 'image',
          jobKind: 'extract_metadata',
          availability: 'available',
          ignored: false,
          readyArtifact: false,
          failedArtifact: false,
          activeJob: false,
        });
        if (!admission.admitted) continue;
        enqueued += insert.run(
          randomUUID(),
          openLibrary.summary.libraryId,
          row.asset_id,
          row.current_revision_id,
          now,
          now,
        ).changes;
      }
    })();
    const budgetCapped = targeted || rows.length >= remainingLimit;
    if (isBackfill && admissionToken !== null) {
      const postToken = this.rawMetadataBackfillToken(openLibrary);
      if (postToken !== null) {
        const probeWasStable = tokenAfterProbe !== null
          && this.rawMetadataBackfillPostTokenMatchesOwnWrites(
            admissionToken,
            tokenAfterProbe,
          )
          && this.rawMetadataBackfillPostTokenMatchesOwnWrites(
            tokenAfterProbe,
            postToken,
          );
        this.persistRawMetadataBackfillAdmissionState(openLibrary, {
          token: postToken,
          cursorAssetId: probeWasStable
            ? rows.at(-1)?.asset_id ?? cursorAssetId
            : null,
          exhausted: probeWasStable && !budgetCapped,
        });
      }
    }
    return {
      admitted: enqueued,
      probed: retryRows + rows.length,
      // 候选填满预算说明可能还有下一批；定向探测与全局上限一律不参与判定。
      budgetCapped,
    };
  }

  /**
   * Admit the next bounded RAW metadata batch for the idle secondary pump.
   * This is intentionally separate from visible thumbnail admission so a
   * large RAW catalogue is eventually drained without expanding the card
   * queue or putting EXIF work on the first-content path.
   */
  override enqueueRawImageMetadataBackfill(
    libraryId: string,
    limit = 256,
  ): RawMetadataBackfillProbeOutcome {
    const openLibrary = this.requireOpenLibrary(libraryId);
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) {
      return { admitted: 0, probed: 0, budgetCapped: true };
    }
    return this.enqueueRawImageMetadataJobs(openLibrary, { limit });
  }

  /** Return the delay before an eligible transient RAW metadata failure may retry. */
  override rawImageMetadataRetryDelayMs(libraryId: string): number | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Leniently opened pre-status libraries cannot have durable metadata job
    // state. The secondary scheduler must treat them as having no retryable
    // RAW work instead of issuing a schema-incompatible query on every pump.
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) return null;
    const extensionMatch = embeddedImageMetadataExtensionMatchSql(openLibrary.connection, 'a');
    const row = openLibrary.connection
      .prepare(
        `SELECT MIN(j.updated_at) AS updated_at
           FROM jobs j
           JOIN assets a ON a.asset_id = j.asset_id
          WHERE j.library_id = ?
            AND j.kind = 'extract_metadata'
            AND j.status = 'failed'
            AND j.error_code = 'RAW_METADATA_EXTRACTION_FAILED'
            AND j.attempt_count < ?
            AND a.deleted_at IS NULL
            AND a.current_revision_id = j.revision_id
            AND a.availability = 'available'
            AND NOT EXISTS (
              SELECT 1 FROM linked_folders loff
               WHERE loff.folder_id = a.linked_folder_id
                 AND loff.status = 'offline'
            )
            AND ${extensionMatch.sql}
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts complete_metadata
               WHERE complete_metadata.revision_id = a.current_revision_id
                 AND complete_metadata.kind = 'extracted_metadata'
                 AND complete_metadata.status = 'ready'
                 AND complete_metadata.invalidated_at IS NULL
                 AND complete_metadata.generator_version = ?
            )
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts failed_metadata
               WHERE failed_metadata.revision_id = a.current_revision_id
                 AND failed_metadata.kind = 'extracted_metadata'
                 AND failed_metadata.status = 'failed'
                 AND failed_metadata.invalidated_at IS NULL
            )`,
      )
      .get(
        openLibrary.summary.libraryId,
        RAW_IMAGE_METADATA_MAX_ATTEMPTS,
        ...extensionMatch.params,
        EMBEDDED_IMAGE_METADATA_GENERATOR,
      ) as { updated_at: string | null } | undefined;
    if (!row?.updated_at) return null;
    const updatedAt = Date.parse(row.updated_at);
    if (!Number.isFinite(updatedAt)) return null;
    return Math.max(0, updatedAt + RAW_IMAGE_METADATA_RETRY_DELAY_MS - Date.now());
  }

  public override enqueuePaletteJob(
    openLibrary: OpenLibrary,
    assetId: string,
    revisionId: string,
    priority: number,
  ): boolean {
    const artifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
    const sourceDimensionColumns = artifactColumns.has('width') && artifactColumns.has('height')
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
    const asset = openLibrary.connection
      .prepare(
        `SELECT a.location_kind, a.linked_folder_id, a.relative_file_path,
                a.current_revision_id, a.availability,
                source_revision.byte_size AS source_byte_size
                ${sourceDimensionColumns}
           FROM assets a
           LEFT JOIN revisions source_revision
             ON source_revision.revision_id = a.current_revision_id
          WHERE a.asset_id = ? AND a.deleted_at IS NULL`,
      )
    .get(assetId) as {
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
      current_revision_id: string | null;
      availability: 'available' | 'missing';
      source_byte_size: number | null;
      source_width: number | null;
      source_height: number | null;
    } | undefined;
    if (!asset || this.isExplicitlyIgnored(
      openLibrary,
      asset.location_kind,
      asset.linked_folder_id,
      asset.relative_file_path,
      'asset',
    )) return false;
    if (!this.isPaletteEligibleAsset(openLibrary, assetId, revisionId)) {
      return false;
    }
    const source = openLibrary.connection.prepare(
      `SELECT artifact_id FROM revision_artifacts
        WHERE revision_id = ?
          AND kind IN ('thumbnail', 'video_poster')
          AND status = 'ready'
          AND invalidated_at IS NULL
        LIMIT 1`,
    ).get(revisionId);
    const sourceDirect = isSourceDirectPreview({
      fileName: asset.relative_file_path,
      mediaType: toSummaryMediaType(
        detectMediaType(asset.relative_file_path),
      ),
      byteSize: asset.source_byte_size ?? 0,
      width: asset.source_width,
      height: asset.source_height,
    });
    if (!source && !sourceDirect) return false;
    const terminal = openLibrary.connection.prepare(
      `SELECT artifact_id, status FROM revision_artifacts
        WHERE revision_id = ? AND kind = 'extracted_palette'
          AND status IN ('ready', 'failed') AND invalidated_at IS NULL LIMIT 1`,
    ).get(revisionId) as { artifact_id: string; status: 'ready' | 'failed' } | undefined;
    const active = openLibrary.connection.prepare(
      `SELECT job_id FROM jobs WHERE asset_id = ? AND revision_id = ?
        AND kind = 'extract_palette' AND status IN ('queued', 'running', 'paused') LIMIT 1`,
    ).get(assetId, revisionId) as { job_id: string } | undefined;
    const admission = admitArtifactJob({
      assetId,
      revisionId,
      currentRevisionId: asset.current_revision_id,
      mediaType: detectMediaType(asset.relative_file_path),
      jobKind: 'extract_palette',
      availability: asset.availability,
      ignored: false,
      readyArtifact: terminal?.status === 'ready',
      failedArtifact: terminal?.status === 'failed',
      activeJob: active !== undefined,
    });
    if (!admission.admitted) return false;
    const now = new Date().toISOString();
    const result = openLibrary.connection.prepare(
      `INSERT INTO jobs
         (job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
          attempt_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'extract_palette', 'queued', ?, 0.0, 0, ?, ?)`,
    ).run(randomUUID(), openLibrary.summary.libraryId, assetId, revisionId, priority, now, now);
    return result.changes > 0;
  }

  /**
   * Palette extraction is only meaningful for assets with a visual surface.
   * Audio waveform covers are deliberately excluded even though they use the
   * `video_poster` artifact kind for viewer compatibility.
   */
  public override isPaletteEligibleAsset(
    openLibrary: OpenLibrary,
    assetId: string,
    revisionId: string,
  ): boolean {
    const asset = openLibrary.connection.prepare(
      `SELECT relative_file_path, current_revision_id
         FROM assets
        WHERE asset_id = ?`,
    ).get(assetId) as {
      relative_file_path: string;
      current_revision_id: string | null;
    } | undefined;
    return Boolean(
      asset
      && asset.current_revision_id === revisionId
      && mediaTypeSupportsAutoPalette(detectMediaType(asset.relative_file_path)),
    );
  }

  public override async generateQueuedPaletteArtifact(
    libraryId: string,
    assetId: string,
    queuedRevisionId: string,
    execution: MediaExecutionContext,
  ): Promise<boolean> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const artifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
    const sourceDimensionColumns = artifactColumns.has('width') && artifactColumns.has('height')
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
    const asset = openLibrary.connection.prepare(
      `SELECT a.relative_file_path, a.current_revision_id, a.availability,
              a.deleted_at, source_revision.byte_size AS source_byte_size
              ${sourceDimensionColumns}
         FROM assets a
         LEFT JOIN revisions source_revision
           ON source_revision.revision_id = a.current_revision_id
        WHERE a.asset_id = ?`,
    ).get(assetId) as {
      relative_file_path: string;
      current_revision_id: string | null;
      availability: 'available' | 'missing';
      deleted_at: string | null;
      source_byte_size: number | null;
      source_width: number | null;
      source_height: number | null;
    } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.current_revision_id !== queuedRevisionId) return false;
    if (!this.isPaletteEligibleAsset(openLibrary, assetId, queuedRevisionId)) return false;

    const source = openLibrary.connection.prepare(
      `SELECT artifact_id FROM revision_artifacts
        WHERE revision_id = ?
          AND kind IN ('thumbnail', 'video_poster')
          AND status = 'ready'
          AND invalidated_at IS NULL
        ORDER BY CASE kind WHEN 'thumbnail' THEN 0 ELSE 1 END
        LIMIT 1`,
    ).get(queuedRevisionId) as { artifact_id: string } | undefined;
    const sourceDirect = isSourceDirectPreview({
      fileName: asset.relative_file_path,
      mediaType: toSummaryMediaType(
        detectMediaType(asset.relative_file_path),
      ),
      byteSize: asset.source_byte_size ?? 0,
      width: asset.source_width,
      height: asset.source_height,
    });
    if (!source && !sourceDirect) {
      throw new LibraryServiceError('INTERNAL_ERROR', { reason: 'PALETTE_SOURCE_NOT_READY' });
    }
    const sourcePath = source
      ? this.getArtifactAbsolutePath(libraryId, source.artifact_id)
      : this.getCurrentMediaSource(libraryId, assetId, queuedRevisionId).absolutePath;
    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.json`;
    const artifactAbsPath = path.join(this.artifactsDir(openLibrary), artifactRelPath);

    openLibrary.connection.prepare(
      `UPDATE revision_artifacts SET invalidated_at = ?
        WHERE revision_id = ? AND kind = 'extracted_palette' AND invalidated_at IS NULL`,
    ).run(new Date().toISOString(), queuedRevisionId);

    try {
      const palette = await runSharpDecoder(execution.signal, execution.lane, async () => {
        const sharp = this.options.paletteSharpFn
          ?? (requireSharp() as unknown as PaletteSharpModule);
        // No `ensureAlpha()`: the extractor accepts RGB or RGBA and skips only
        // genuinely transparent pixels, so forcing a fourth channel on opaque
        // sources only widened the buffer it has to scan.
        const decoded = await sharp(sourcePath)
          .rotate()
          .toColourspace('srgb')
          .resize({ width: 64, height: 64, fit: 'inside', withoutEnlargement: true })
          .raw()
          .toBuffer({ resolveWithObject: true });
        if (execution.signal?.aborted) {
          throw new DOMException('Media job cancelled after palette decoding.', 'AbortError');
        }
        return extractRepresentativePalette(decoded.data, decoded.info.channels, 6);
      });
      if (palette.length === 0) {
        throw new Error('The decoded preview contains no visible pixels.');
      }
      const dominant = dominantColorMetrics(palette[0]!.hex);
      writeFileSync(artifactAbsPath, JSON.stringify(palette), 'utf-8');
      if (execution.signal?.aborted) {
        throw new DOMException('Media job cancelled after palette serialization.', 'AbortError');
      }
      const outputStat = statSync(artifactAbsPath);
      openLibrary.connection.prepare(
        `INSERT INTO revision_artifacts
           (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
            generator_version, status, generated_at, dominant_hue, dominant_lightness, dominant_saturation)
         VALUES (?, ?, 'extracted_palette', 'application/json', ?, ?, ?, 'ready', ?, ?, ?, ?)`,
      ).run(
        artifactId,
        queuedRevisionId,
        outputStat.size,
        artifactRelPath,
        `serpent-palette@1;sharp@${SHARP_VERSION}`,
        new Date().toISOString(),
        dominant.hue,
        dominant.lightness,
        dominant.saturation,
      );
      return true;
    } catch (error) {
      rmSync(artifactAbsPath, { force: true });
      if (execution.signal?.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
        throw error;
      }
      openLibrary.connection.prepare(
        `INSERT INTO revision_artifacts
           (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
            generator_version, status, error_code, generated_at)
         VALUES (?, ?, 'extracted_palette', 'application/json', 0, ?, ?, 'failed',
                 'PALETTE_EXTRACTION_FAILED', ?)`,
      ).run(
        artifactId,
        queuedRevisionId,
        artifactRelPath,
        `serpent-palette@1;sharp@${SHARP_VERSION}`,
        new Date().toISOString(),
      );
      throw error;
    }
  }

  /**
   * Serpent-4bc4ac: drop asset ids the user explicitly ignored so scheduling
   * and visible-window reporting never touch them (v6m3: ignored = not
   * indexed, not operated on).
   */
  override filterIgnoredAssetIds(libraryId: string, assetIds: readonly string[]): string[] {
    if (assetIds.length === 0) return [];
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Visible-window reports and bounded queue fills call this with many ids.
    // The old per-id asset lookup followed by a per-id ignore-rule lookup made
    // one report perform dozens of SQLite turns, even though the result is a
    // simple membership filter. Keep the original caller order (and duplicate
    // ids) while doing the rule evaluation in one bounded query per chunk.
    const uniqueAssetIds = [...new Set(assetIds)];
    const keptAssetIds = new Set<string>();
    const chunkSize = 500;
    const ignoreSql = this.explicitIgnoreSql(openLibrary.connection, 'a');
    for (let offset = 0; offset < uniqueAssetIds.length; offset += chunkSize) {
      const chunk = uniqueAssetIds.slice(offset, offset + chunkSize);
      const rows = openLibrary.connection
        .prepare(
          `SELECT a.asset_id
             FROM assets a
            WHERE a.asset_id IN (${sqliteInPlaceholders(chunk)})
              AND ${ignoreSql}`,
        )
        .all(...chunk) as Array<{ asset_id: string }>;
      for (const row of rows) keptAssetIds.add(row.asset_id);
    }
    return assetIds.filter((assetId) => keptAssetIds.has(assetId));
  }

  /**
   * Serpent-140fe2: AI contact sheets are generated lazily, only when video
   * analysis actually needs them. Proactive scheduling flooded converted
   * libraries with doomed FFmpeg batches on every open. Returns false when
   * the asset's revision changed mid-flight (caller cancels).
   */
  override async ensureVideoContactSheet(
    libraryId: string,
    assetId: string,
    execution: MediaExecutionContext = { signal: undefined },
  ): Promise<boolean> {
    throwIfMediaExecutionAborted(execution.signal);
    const openLibrary = this.requireOpenLibrary(libraryId);
    const assetRow = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
      .get(assetId) as { current_revision_id: string | null } | undefined;
    const revisionId = assetRow?.current_revision_id ?? null;
    if (!revisionId) return false;
    const existing = openLibrary.connection
      .prepare(
        "SELECT status FROM revision_artifacts WHERE revision_id = ? AND kind = 'contact_sheet' AND invalidated_at IS NULL LIMIT 1",
      )
      .get(revisionId) as { status?: string } | undefined;
    if (existing?.status === 'ready') return true;
    // Serpent-140fe2 review fix: overlapping analysis requests for the same
    // video must share one generation, or the losers hit
    // UNIQUE(revision_id, kind) and mask the real outcome.
    const inFlightKey = `${libraryId}\u0000${revisionId}`;
    const inFlight = this.videoContactSheetInFlight.get(inFlightKey);
    if (inFlight) return await waitForSharedMediaOperation(inFlight, execution.signal);
    if (existing) {
      // Explicit retry: clear the previous terminal row so either outcome —
      // a fresh ready sheet or a renewed failed marker — can register without
      // tripping UNIQUE(revision_id, kind).
      openLibrary.connection
        .prepare(
          "DELETE FROM revision_artifacts WHERE revision_id = ? AND kind = 'contact_sheet' AND invalidated_at IS NULL",
        )
        .run(revisionId);
    }
    const controller = new AbortController();
    const entry: {
      controller: AbortController;
      promise: Promise<boolean>;
      waiters: number;
    } = {
      controller,
      promise: Promise.resolve(false),
      waiters: 0,
    };
    entry.promise = (async () => {
      try {
        return await this.generateQueuedVideoArtifact(
          libraryId,
          assetId,
          revisionId,
          'generate_contact_sheet',
          { ...execution, signal: controller.signal },
        );
      } finally {
        if (this.videoContactSheetInFlight.get(inFlightKey) === entry) {
          this.videoContactSheetInFlight.delete(inFlightKey);
        }
      }
    })();
    this.videoContactSheetInFlight.set(inFlightKey, entry);
    return await waitForSharedMediaOperation(entry, execution.signal);
  }

  public override async generateQueuedVideoArtifact(
    libraryId: string,
    assetId: string,
    queuedRevisionId: string,
    kind: 'generate_contact_sheet' | 'generate_webm_proxy',
    execution: MediaExecutionContext,
  ): Promise<boolean> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const assetPath = this.resolveAssetPath(libraryId, assetId);
    const asset = openLibrary.connection.prepare(
      'SELECT current_revision_id FROM assets WHERE asset_id = ?',
    ).get(assetId) as { current_revision_id: string | null } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.current_revision_id !== queuedRevisionId) return false;
    const revisionId = queuedRevisionId;
    const ffmpegPath = resolveFfmpegPath();
    const ffprobePath = resolveFfprobePath();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    if (kind === 'generate_webm_proxy') {
      await this.generateVideoProxy({ libraryId, assetId }, openLibrary, assetPath, revisionId, ffmpegPath, artifactsDir, execution);
      return true;
    }
    // Serpent-140fe2: Eagle/Billfish conversions can register videos with
    // width/height-only metadata (no ffprobe ever ran), so duration is
    // unknown and contact sheets used to fail forever while every open
    // re-enqueued the whole doomed batch. Self-heal instead: probe on demand
    // and surface the real ffprobe failure.
    try {
      let metadata = this.getCurrentArtifact(libraryId, assetId, 'extracted_metadata');
      const readParsedMetadata = (): { durationMs?: number; width?: number; height?: number } | null => {
        if (metadata?.status !== 'ready') return null;
        try {
          return JSON.parse(
            readFileSync(path.join(artifactsDir, metadata.filePath), 'utf-8'),
          ) as { durationMs?: number; width?: number; height?: number };
        } catch {
          return null;
        }
      };
      let parsed = readParsedMetadata();
      if (!parsed || !Number.isFinite(parsed.durationMs) || (parsed.durationMs ?? 0) <= 0) {
        // Serpent-140fe2: probeVideoAsset now replaces any prior
        // extracted_metadata row transactionally AFTER a successful ffprobe,
        // so a failed probe never destroys conversion-recorded dimensions.
        const probed = await this.generateQueuedVideoMetadata(
          libraryId, assetId, revisionId, execution,
        );
        if (!probed) return false; // stale revision; caller cancels the job
        metadata = this.getCurrentArtifact(libraryId, assetId, 'extracted_metadata');
        parsed = readParsedMetadata();
      }
      const durationSec = (parsed?.durationMs ?? 0) / 1000;
      const width = Number.isFinite(parsed?.width) && (parsed?.width ?? 0) > 0
        ? parsed!.width!
        : 640;
      const height = Number.isFinite(parsed?.height) && (parsed?.height ?? 0) > 0
        ? parsed!.height!
        : 360;
      const dimensions = { width, height };
      if (!(durationSec > 0)) {
        throw new LibraryServiceError('INTERNAL_ERROR', {
          reason: 'MEDIA_PROCESSING_FAILED',
          cause: new Error(`Video has no measurable duration after ffprobe: ${assetPath}`),
        });
      }
      await this.generateContactSheet(
        { libraryId, assetId }, openLibrary, assetPath, revisionId, ffmpegPath, artifactsDir,
        Math.max(durationSec, 0.1), dimensions, ffprobePath, execution,
      );
    } catch (error) {
      if (execution.signal?.aborted) throw error;
      // Serpent-140fe2: persist the terminal failure so the terminal-artifact
      // guard in ensureVideoContactSheet stops regenerating this sheet. The
      // next revision change resets it naturally.
      // Adversarial-review fix: generateContactSheet's own catch already
      // wrote a failed contact_sheet row; a second INSERT would violate the
      // partial UNIQUE(revision_id, kind) index and mask the real ffmpeg
      // error. Only write when no terminal row exists yet.
      const existingTerminal = openLibrary.connection
        .prepare(
          "SELECT 1 FROM revision_artifacts WHERE revision_id = ? AND kind = 'contact_sheet' AND status IN ('ready', 'failed') AND invalidated_at IS NULL LIMIT 1",
        )
        .get(revisionId);
      if (!existingTerminal) {
        this.writeFailedArtifact(
          openLibrary, randomUUID(), revisionId, 'contact_sheet', 'image/jpeg',
          `${randomUUID()}.txt`, `ffmpeg@${FFMPEG_VERSION}`, error,
        );
      }
      throw error;
    }
    return true;
  }

  public override async generateQueuedVideoMetadata(
    libraryId: string,
    assetId: string,
    queuedRevisionId: string,
    execution: MediaExecutionContext,
  ): Promise<boolean> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const asset = openLibrary.connection.prepare(
      'SELECT current_revision_id FROM assets WHERE asset_id = ?',
    ).get(assetId) as { current_revision_id: string | null } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.current_revision_id !== queuedRevisionId) return false;
    await this.probeVideoAsset(
      { libraryId, assetId },
      openLibrary,
      this.resolveAssetPath(libraryId, assetId),
      queuedRevisionId,
      resolveFfprobePath(),
      execution,
    );
    const currentAfterProbe = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
      .get(assetId) as { current_revision_id: string | null } | undefined;
    return currentAfterProbe?.current_revision_id === queuedRevisionId;
  }

  public override async generateQueuedRawImageMetadata(
    libraryId: string,
    assetId: string,
    queuedRevisionId: string,
    execution: MediaExecutionContext,
  ): Promise<boolean> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const asset = openLibrary.connection
      .prepare(
        'SELECT relative_file_path, current_revision_id FROM assets WHERE asset_id = ?',
      )
      .get(assetId) as {
        relative_file_path: string;
        current_revision_id: string | null;
      } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.current_revision_id !== queuedRevisionId) return false;
    if (!isEmbeddedImageMetadataExtension(asset.relative_file_path)) return false;

    const assetPath = this.resolveAssetPath(libraryId, assetId);
    const extraction = await extractRawImageMetadataDetailed(
      assetPath,
      this.options.rawImageMetadataParser,
      execution.signal,
    );
    const current = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
      .get(assetId) as { current_revision_id: string | null } | undefined;
    if (execution.signal?.aborted) {
      throw new DOMException('RAW metadata extraction cancelled.', 'AbortError');
    }
    if (current?.current_revision_id !== queuedRevisionId) return false;
    if (extraction.status === 'failed') {
      throw new Error('RAW image metadata extraction failed.', {
        cause: extraction.error,
      });
    }
    const metadata = extraction.status === 'metadata'
      ? extraction.metadata
      : normalizeRawImageMetadata({
        width: execution.sourceWidth ?? null,
        height: execution.sourceHeight ?? null,
      });
    const persisted = await this.persistRawImageMetadata(
      openLibrary,
      assetId,
      queuedRevisionId,
      assetPath,
      metadata,
      {
        width: execution.sourceWidth,
        height: execution.sourceHeight,
      },
    );
    if (!persisted) {
      throw new Error('RAW image metadata artifact could not be persisted.');
    }
    return true;
  }

  public override async generateQueuedAudioProxy(
    libraryId: string,
    assetId: string,
    queuedRevisionId: string,
    execution: MediaExecutionContext,
  ): Promise<boolean> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const asset = openLibrary.connection.prepare(
      'SELECT current_revision_id FROM assets WHERE asset_id = ?',
    ).get(assetId) as { current_revision_id: string | null } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.current_revision_id !== queuedRevisionId) return false;
    const assetPath = this.resolveAssetPath(libraryId, assetId);
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    await this.generateAudioProxy(
      { libraryId, assetId },
      openLibrary,
      assetPath,
      queuedRevisionId,
      resolveFfmpegPath(),
      artifactsDir,
      execution,
    );
    return true;
  }

  /** Run ffprobe and store extracted_metadata artifact. */
  public override async probeVideoAsset(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    ffprobePath: string,
    execution: MediaExecutionContext,
  ): Promise<{
    durationSec: number;
    width: number | null;
    height: number | null;
    hasAttachedPicture: boolean;
  }> {
    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    const artifactRelPath = `${artifactId}.json`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);

    try {
      const result = await this.runFfmpeg(ffprobePath, [
        '-v', 'quiet',
        '-print_format', 'json',
        '-show_format',
        '-show_streams',
        assetPath,
      ], { signal: execution.signal });

      if (result.exitCode !== 0) {
        throw new Error(`ffprobe exited with code ${result.exitCode}: ${result.stderr.slice(-200)}`);
      }

      const probeJson = JSON.parse(result.stdout.toString('utf-8'));
      const hasAttachedPicture = ffprobeHasAttachedPicture(probeJson);
      const videoStream = probeJson.streams?.find(
        (s: { codec_type: string }) => s.codec_type === 'video',
      );
      const audioStream = probeJson.streams?.find(
        (s: { codec_type: string }) => s.codec_type === 'audio',
      );

      const durationSec = parseFloat(probeJson.format?.duration || '0') || 0;
      const width: number | null = videoStream?.width ?? null;
      const height: number | null = videoStream?.height ?? null;
      const framerate = videoStream?.r_frame_rate || null;

      // Retrieve rotation side_data if present
      let rotation = 0;
      if (videoStream?.side_data_list) {
        for (const sd of videoStream.side_data_list) {
          if (sd.rotation !== undefined) {
            rotation = sd.rotation;
            break;
          }
        }
      }

      // Store structured metadata as extracted_metadata artifact
      const metadata = {
        container: probeJson.format?.format_name || null,
        durationMs: Math.round(durationSec * 1000),
        width: width ?? 0,
        height: height ?? 0,
        framerate,
        rotation: rotation !== 0 ? rotation : undefined,
        videoCodec: videoStream?.codec_name || null,
        videoBitrate: videoStream?.bit_rate || null,
        pixelFormat: videoStream?.pix_fmt || null,
        hasAudio: !!audioStream,
        hasCoverArt: hasAttachedPicture,
        audioCodec: audioStream?.codec_name || null,
        audioBitrate: audioStream?.bit_rate || null,
        sampleRate: audioStream?.sample_rate || null,
        channels: audioStream?.channels || null,
        containerBitrate: probeJson.format?.bit_rate || null,
        ...normalizeProbeEmbeddedMetadata(probeJson),
      };

      throwIfMediaExecutionAborted(execution.signal);
      writeFileSync(artifactAbsPath, JSON.stringify(metadata, null, 2), 'utf-8');
      const outputStat = statSync(artifactAbsPath);
      throwIfMediaExecutionAborted(execution.signal);

      // Serpent-140fe2: replace any prior extracted_metadata row (e.g. a
      // width/height-only row written by an external conversion) in the same
      // transaction as the fresh insert. Probing first and only then
      // touching the old row means a failed ffprobe never destroys the
      // dimensions a conversion already recorded.
      openLibrary.connection.transaction(() => {
        openLibrary.connection
          .prepare(
            `DELETE FROM revision_artifacts
              WHERE revision_id = ? AND kind = 'extracted_metadata'
                AND status IN ('ready', 'failed')`,
          )
          .run(revisionId);
        openLibrary.connection
          .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                width, height, duration_ms, generator_version, status, generated_at)
             VALUES (?, ?, 'extracted_metadata', 'application/json', ?, ?, ?, ?, ?, ?, 'ready', ?)`,
          )
          .run(
            artifactId, revisionId, outputStat.size, artifactRelPath,
            width, height, metadata.durationMs,
            FFMPEG_METADATA_GENERATOR,
            new Date().toISOString(),
          );
      })();
      const currentRevision = openLibrary.connection
        .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
        .get(input.assetId) as { current_revision_id: string | null } | undefined;
      if (currentRevision?.current_revision_id === revisionId) {
        this.syncAssetSearchContent(
          openLibrary.connection,
          input.assetId,
          embeddedMetadataSearchText(metadata),
          revisionId,
        );
      }

      return { durationSec, width, height, hasAttachedPicture };
    } catch (error) {
      if (execution.signal?.aborted) {
        rmSync(artifactAbsPath, { force: true });
        throw error;
      }
      // Write failed artifact
        this.writeFailedArtifact(openLibrary, artifactId, revisionId, 'extracted_metadata',
        'application/json', artifactRelPath, FFMPEG_METADATA_GENERATOR, error);
      throw error;
    }
  }

  public override async probeVideoDurationSeconds(
    ffprobePath: string,
    assetPath: string,
    execution: MediaExecutionContext,
  ): Promise<number | null> {
    try {
      const result = await this.runFfmpeg(ffprobePath, [
        '-v', 'error',
        '-show_entries', 'format=duration:stream=codec_type,duration',
        '-select_streams', 'v:0',
        '-of', 'json',
        assetPath,
      ], { signal: execution.signal });
      if (result.exitCode !== 0) return null;
      return durationSecondsFromProbeStdout(result.stdout.toString('utf-8'));
    } catch (error) {
      const resourceError = asMediaResourceExhaustedError(error, 'ffprobe-video-duration');
      if (resourceError) throw resourceError;
      return null;
    }
  }

  /** Grab one poster frame at 30% of the duration. */
  public override async generateVideoPoster(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    ffmpegPath: string,
    ffprobePath: string,
    artifactsDir: string,
    execution: MediaExecutionContext,
    knownDurationSec: number | null,
  ): Promise<string> {
    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.jpg`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    const durationSec = knownDurationSec ?? await this.probeVideoDurationSeconds(
      ffprobePath,
      assetPath,
      execution,
    );
    const seekSeconds = durationSec === null ? null : videoPosterSeekSeconds(durationSec);

    try {
      const result = await this.runFfmpeg(ffmpegPath, [
        '-y',
        '-hide_banner',
        '-loglevel', 'error',
        '-threads:v', '1',
        '-filter_threads', '1',
        // Input seek jumps to a nearby keyframe. Output seek would decode
        // every frame from the start up to 30% of a long file.
        ...(seekSeconds === null ? [] : ['-ss', seekSeconds.toFixed(3)]),
        '-i', assetPath,
        // Do not let FFmpeg auto-select audio, subtitles, or data streams for
        // a one-frame image output. Those streams are irrelevant to a card
        // poster but can allocate their own codec buffers on large sources.
        '-map', '0:v:0',
        '-an',
        '-sn',
        '-dn',
        // One scaled frame. Do not run thumbnail=N: that filter only ranks
        // the next N frames after the start, which is the opening shot.
        '-vf', 'scale=640:-2:force_original_aspect_ratio=decrease',
        '-frames:v', '1',
        '-q:v', '3',
        artifactAbsPath,
      ], { signal: execution.signal });

      if (result.exitCode !== 0) {
        throw new Error(`ffmpeg poster exited with code ${result.exitCode}: ${result.stderr.slice(-200)}`);
      }

      const outputStat = statSync(artifactAbsPath);
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              generator_version, status, generated_at)
           VALUES (?, ?, 'video_poster', 'image/jpeg', ?, ?, ?, 'ready', ?)`,
        )
        .run(artifactId, revisionId, outputStat.size, artifactRelPath,
          videoPosterGeneratorVersion(FFMPEG_VERSION), new Date().toISOString());

      return artifactId;
    } catch (error) {
      if (execution.signal?.aborted) {
        rmSync(artifactAbsPath, { force: true });
        throw error;
      }
      this.writeFailedArtifact(openLibrary, artifactId, revisionId, 'video_poster',
        'image/jpeg', artifactRelPath, videoPosterGeneratorVersion(FFMPEG_VERSION), error);
      throw error;
    }
  }

  /** Generate a contact sheet (grid of sampled frames). */
  public override async generateContactSheet(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    ffmpegPath: string,
    artifactsDir: string,
    durationSec: number,
    dimensions: { width: number; height: number },
    ffprobePath: string,
    execution: MediaExecutionContext,
  ): Promise<string> {
    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.jpg`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);

    // Serpent-6w40: the AI contact sheet must stay within a 2048 long edge
    // while showing at least 16 frames. Large videos shrink each frame to a
    // ~509 cell (4×4 baseline); small videos keep their native size, which
    // lets the grid grow to more frames.
    const { width, height } = dimensions;
    const TARGET_EDGE = 2048;
    const MARGIN = 2;
    const PADDING = 2;
    const longEdge = Math.max(width, height);
    const baselineCell = Math.floor((TARGET_EDGE - 2 * PADDING - 2 * MARGIN * 4) / 4);
    const frameEdge = Math.min(baselineCell, longEdge);
    const frameW = Math.max(2, Math.round((frameEdge * width / longEdge) / 2) * 2);
    const frameH = Math.max(2, Math.round((frameEdge * height / longEdge) / 2) * 2);
    const columns = Math.max(4, Math.min(20,
      Math.floor((TARGET_EDGE - 2 * PADDING + MARGIN) / (frameW + MARGIN))));
    const rows = Math.max(4, Math.min(20,
      Math.floor((TARGET_EDGE - 2 * PADDING + MARGIN) / (frameH + MARGIN))));
    const frameCount = columns * rows;
    const interval = durationSec / frameCount;

    // drawtext stamps the current frame time (HH:MM:SS.mmm) at the bottom
    // right of every frame. The bundled DejaVu Sans font keeps the LGPL
    // build independent of fontconfig/system fonts.
    const fontPath = resolveBundledFontPath();
    const escapedFontPath = fontPath
      ? escapeFfmpegFilterPath(fontPath)
      : null;
    const fontSize = Math.max(14, Math.round(frameH * 0.12));
    const keyframeCount = await this.countVideoKeyframes(ffprobePath, assetPath, execution);
    const useKeyframeFastPath = keyframeCount !== null && keyframeCount >= 16;
    const filterGraph = [
      `fps=1/${interval}`,
      `scale=${frameW}:${frameH}:flags=lanczos`,
      escapedFontPath
        ? `drawtext=fontfile='${escapedFontPath}':text='%{pts\\:hms}':x=w-tw-8:y=h-th-8:fontsize=${fontSize}:fontcolor=white:box=1:boxcolor=black@0.5`
        : null,
      `tile=${columns}x${rows}:margin=2:padding=2:color=#1a1a1a`,
    ].filter((part): part is string => part !== null).join(',');

    try {
      const result = await this.runFfmpeg(ffmpegPath, [
        '-y',
        ...(useKeyframeFastPath ? ['-skip_frame', 'nokey'] : []),
        '-i', assetPath,
        '-vf', filterGraph,
        '-frames:v', '1',
        '-q:v', '5',
        '-update', '1',
        artifactAbsPath,
      ], { signal: execution.signal });

      if (result.exitCode !== 0) {
        console.error('[CONTACT-SHEET-FFMPEG-ERR]', result.stderr.slice(-800));
        throw new Error(`ffmpeg contact sheet exited with code ${result.exitCode}: ${result.stderr.slice(-200)}`);
      }

      const outputStat = statSync(artifactAbsPath);
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              generator_version, status, generated_at)
           VALUES (?, ?, 'contact_sheet', 'image/jpeg', ?, ?, ?, 'ready', ?)`,
        )
        .run(artifactId, revisionId, outputStat.size, artifactRelPath,
          `ffmpeg@${FFMPEG_VERSION}`, new Date().toISOString());

      return artifactId;
    } catch (error) {
      if (execution.signal?.aborted) {
        rmSync(artifactAbsPath, { force: true });
        throw error;
      }
      this.writeFailedArtifact(openLibrary, artifactId, revisionId, 'contact_sheet',
        'image/jpeg', artifactRelPath, `ffmpeg@${FFMPEG_VERSION}`, error);
      throw error;
    }
  }

  /**
   * Count decoder keyframes cheaply so long-GOP videos can avoid decoding
   * every inter-frame just to build an AI contact sheet. Short clips and
   * unusual streams fall back to the full sequential pass when the probe
   * cannot establish a safe fast path.
   */
  public override async countVideoKeyframes(
    ffprobePath: string,
    assetPath: string,
    execution: MediaExecutionContext,
  ): Promise<number | null> {
    try {
      const result = await this.runFfmpeg(ffprobePath, [
        '-v', 'error',
        '-skip_frame', 'nokey',
        '-count_frames',
        '-select_streams', 'v:0',
        '-show_entries', 'stream=nb_read_frames',
        '-of', 'json',
        assetPath,
      ], { signal: execution.signal });
      if (result.exitCode !== 0) return null;
      const parsed = JSON.parse(result.stdout.toString('utf-8')) as {
        streams?: Array<{ nb_read_frames?: string | number }>;
      };
      const count = Number(parsed.streams?.[0]?.nb_read_frames);
      return Number.isInteger(count) && count >= 0 ? count : null;
    } catch {
      return null;
    }
  }

  public override h264VideoProxyProfile(encoder: string): VideoProxyProfile {
    return {
      codec: 'h264',
      encoder,
      extension: 'mp4',
      mimeType: 'video/mp4',
      args: [
        '-c:v', encoder,
        ...(encoder === 'h264_videotoolbox' ? ['-realtime', 'true'] : []),
        '-threads', '1',
        '-b:v', '1M',
        '-g', '60',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-movflags', '+faststart',
      ],
    };
  }

  /**
   * Listing an encoder in `ffmpeg -encoders` is not a capability proof.
   * Probe a 1-frame lavfi encode and keep the first H.264 encoder that writes
   * a non-empty file. If none works, proxy generation fails without trying VP9.
   */
  public override async probeVideoProxyEncoder(
    ffmpegPath: string,
    execution: MediaExecutionContext,
  ): Promise<string | null> {
    let listed: string[] = [];
    try {
      const result = await this.runFfmpeg(
        ffmpegPath,
        ['-hide_banner', '-encoders'],
        { signal: execution.signal },
      );
      if (result.exitCode === 0) {
        listed = listedH264ProxyEncoders(
          parseFfmpegEncoderTokens(`${result.stdout.toString('utf8')}\n${result.stderr}`),
        );
      }
    } catch (error) {
      this.diagnose('video-proxy.encoder-list', error, { ffmpegPath });
    }

    const probeRoot = mkdtempSync(path.join(tmpdir(), 'serpent-proxy-encoder-'));
    try {
      for (const candidate of listed) {
        const outputPath = path.join(probeRoot, `${candidate}.mp4`);
        let encodeOk = false;
        let probeError: unknown = null;
        try {
          const result = await this.runFfmpeg(
            ffmpegPath,
            ffmpegOneFrameEncodeArgs(candidate, outputPath),
            { signal: execution.signal },
          );
          encodeOk = result.exitCode === 0
            && existsSync(outputPath)
            && statSync(outputPath).size > 0;
          if (!encodeOk) {
            probeError = new Error(
              result.stderr.slice(-200) || `ffmpeg probe exited ${result.exitCode}`,
            );
          }
        } catch (error) {
          probeError = error;
        }
        this.diagnose('video-proxy.encoder-probe-result', probeError, {
          ffmpegPath,
          encoder: candidate,
          encodeOk,
          hardwareNamed: encoderUsesHardwareName(candidate),
        });
        if (encodeOk) return candidate;
      }
    } finally {
      rmSync(probeRoot, { force: true, recursive: true });
    }
    return null;
  }

  public override async resolveVideoProxyProfiles(
    ffmpegPath: string,
    execution: MediaExecutionContext,
  ): Promise<VideoProxyProfile[]> {
    let encoder = this.videoProxyEncoderByFfmpegPath.get(ffmpegPath);
    if (encoder === undefined) {
      encoder = await this.probeVideoProxyEncoder(ffmpegPath, execution);
      this.videoProxyEncoderByFfmpegPath.set(ffmpegPath, encoder);
    }

    return encoder === null ? [] : [this.h264VideoProxyProfile(encoder)];
  }

  /** Generate an H.264/MP4 proxy; VP9 is deliberately never used. */
  public override async generateVideoProxy(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    ffmpegPath: string,
    artifactsDir: string,
    execution: MediaExecutionContext,
  ): Promise<string> {
    const artifactId = randomUUID();
    const profiles = await this.resolveVideoProxyProfiles(ffmpegPath, execution);
    let lastError: unknown = new Error('No H.264 video proxy encoder is available.');
    let failedProfile = profiles[0] ?? this.h264VideoProxyProfile('unavailable');

    for (const profile of profiles) {
      failedProfile = profile;
      const artifactRelPath = `${artifactId}.${profile.extension}`;
      const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
      try {
        const result = await this.runFfmpeg(ffmpegPath, [
          '-y',
          '-i', assetPath,
          ...profile.args,
          '-vf', VIDEO_PROXY_SCALE_FILTER,
          artifactAbsPath,
        ], { signal: execution.signal });

        if (result.exitCode !== 0) {
          throw new Error(
            `ffmpeg ${profile.codec} proxy exited with code ${result.exitCode}: ${result.stderr.slice(-200)}`,
          );
        }

        const outputStat = statSync(artifactAbsPath);
        openLibrary.connection
          .prepare(
            `INSERT INTO revision_artifacts
               (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                generator_version, status, generated_at)
             VALUES (?, ?, 'webm_proxy', ?, ?, ?, ?, 'ready', ?)`,
          )
          .run(
            artifactId,
            revisionId,
            profile.mimeType,
            outputStat.size,
            artifactRelPath,
            `ffmpeg@${FFMPEG_VERSION};proxy=${profile.codec};encoder=${profile.encoder}`,
            new Date().toISOString(),
          );

        return artifactId;
      } catch (error) {
        lastError = error;
        this.diagnose('video-proxy.encode', error, {
          libraryId: input.libraryId,
          assetId: input.assetId,
          codec: profile.codec,
          encoder: profile.encoder,
        });
        rmSync(artifactAbsPath, { force: true });
      }
    }

    const failedArtifactRelPath = `${artifactId}.${failedProfile.extension}`;
    this.writeFailedArtifact(
      openLibrary,
      artifactId,
      revisionId,
      'webm_proxy',
      failedProfile.mimeType,
      failedArtifactRelPath,
      `ffmpeg@${FFMPEG_VERSION};proxy=${failedProfile.codec};encoder=${failedProfile.encoder}`,
      lastError,
    );
    throw lastError;
  }

  /** Generate an Opus/Ogg proxy so audio playback does not rely on source codecs. */
  public override async generateAudioProxy(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    ffmpegPath: string,
    artifactsDir: string,
    execution: MediaExecutionContext,
  ): Promise<string> {
    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.ogg`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);

    try {
      const result = await this.runFfmpeg(ffmpegPath, [
        '-y',
        '-i', assetPath,
        '-map', '0:a:0?',
        '-vn',
        '-c:a', 'libopus',
        '-threads', '1',
        '-b:a', '128k',
        '-f', 'ogg',
        artifactAbsPath,
      ], { signal: execution.signal });
      if (result.exitCode !== 0) {
        throw new Error(`ffmpeg audio proxy exited with code ${result.exitCode}: ${result.stderr.slice(-200)}`);
      }
      const outputStat = statSync(artifactAbsPath);
      openLibrary.connection.prepare(
        `INSERT INTO revision_artifacts
           (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
            generator_version, status, generated_at)
         VALUES (?, ?, 'audio_proxy', 'audio/ogg', ?, ?, ?, 'ready', ?)`,
      ).run(
        artifactId,
        revisionId,
        outputStat.size,
        artifactRelPath,
        `ffmpeg@${FFMPEG_VERSION};opus@128k`,
        new Date().toISOString(),
      );
      return artifactId;
    } catch (error) {
      this.writeFailedArtifact(
        openLibrary,
        artifactId,
        revisionId,
        'audio_proxy',
        'audio/ogg',
        artifactRelPath,
        `ffmpeg@${FFMPEG_VERSION};opus@128k`,
        error,
      );
      throw error;
    }
  }

}
