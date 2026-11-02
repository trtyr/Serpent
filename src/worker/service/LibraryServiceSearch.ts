/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { ArtifactDescriptor, DatabaseConnection, ExrPlaneDescriptor, MediaAutoRepairComponent, MediaExecutionContext, MediaJobKind, ModelThumbnailRenderOutcome, ModelThumbnailRenderer, ModelThumbnailRendererInput, NetworkMetadataSourceState, OiioArtifactErrorCode, OpenLibrary, OpenReconciliationTask, SecondaryMediaJobKind} from '../library-service-internals';
import { DEFAULT_DEBOUNCE_SCHEDULER, DISPLAY_PREVIEW_KIND_SQL, EMBEDDED_IMAGE_METADATA_GENERATOR, FFMPEG_VERSION, LibraryServiceError, MEDIA_COMPONENT_PROBE_RETRY_MS, MEDIA_JOB_KINDS, MEDIA_JOB_LEASE_DURATION_MS, MEDIA_RESOURCE_RETRY_DELAY_MS, NETWORK_METADATA_SNAPSHOT_TABLES, OIIO_VERSION, ORPHAN_ARTIFACT_GRACE_MS, OiioInvocationError, RAW_EMBEDDED_THUMBNAIL_GENERATOR, SERPENT_OCIO_CONFIG, SHARP_VERSION, SUPPORTED_SCHEMA_VERSION, buildFileName, buildFolderPath, buildMetadataText, buildSearchDescription, closeIgnoringFailure, databasePath, embeddedMetadataFromSearchText, inspectMediaNativeInput, isMissingPathError, isStaleMediaRevisionError, logMediaQueueEvent, openConfiguredDatabase, parseExrPlaneDescriptors, rawImageExtensionMatchSql, readIcoPageSizesFromPath, readLibraryIdentity, requireSharp, runSharpDecoder, safeMediaJobErrorDetail, schemaVersion, verifyMigrationHistory, yieldBetweenMediaClaims } from '../library-service-internals';
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
import { LibraryServiceSmartCollections } from './LibraryServiceSmartCollections';
import { detectMediaType, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';
import type { LibraryServiceAllMethods } from './all-methods';

/** LibraryServiceSearch: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceSearch extends LibraryServiceSmartCollections {

  // ── Smart Collections ────────────────────────────────────────────────

  // ── FTS5 Search Content Sync ───────────────────────────────────────

  public override syncAssetSearchContent(
    connection: DatabaseConnection,
    assetId: string,
    embeddedMetadataText?: string,
    embeddedMetadataRevisionId?: string,
  ): void {
    const asset = connection
      .prepare(
        `SELECT a.relative_file_path, a.availability, a.current_revision_id, r.byte_size,
                m.description,
                (SELECT GROUP_CONCAT(value, '\n')
                   FROM ai_content
                  WHERE asset_id = a.asset_id
                    AND field_name = 'description') AS ai_description,
                m.source_page_url, m.author
           FROM assets a
           JOIN revisions r ON r.revision_id = a.current_revision_id
           LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
          WHERE a.asset_id = ?`,
      )
      .get(assetId) as {
        relative_file_path: string;
        availability: string;
        current_revision_id: string | null;
        byte_size: number;
        description: string | null;
        ai_description: string | null;
        source_page_url: string | null;
        author: string | null;
      } | undefined;
    if (!asset) return;

    const existingSearchRow = connection
      .prepare('SELECT metadata_text FROM asset_search_index WHERE asset_id = ?')
      .get(assetId) as { metadata_text: string | null } | undefined;
    const effectiveRevisionId = embeddedMetadataRevisionId ?? asset.current_revision_id;
    const retainedEmbeddedMetadata = embeddedMetadataText === undefined
      ? embeddedMetadataFromSearchText(existingSearchRow?.metadata_text, asset.current_revision_id)
      : embeddedMetadataText;

    const tagRow = connection
      .prepare(
        `SELECT GROUP_CONCAT(all_tags.tag_name, ' ') AS tags
           FROM (
             SELECT t.name AS tag_name
               FROM human_asset_tags hat
               JOIN tags t ON t.tag_id = hat.tag_id
              WHERE hat.asset_id = ?
              UNION
             SELECT t.name AS tag_name
               FROM ai_asset_tags aat
               JOIN tags t ON t.tag_id = aat.tag_id
              WHERE aat.asset_id = ?
           ) AS all_tags`,
      )
      .get(assetId, assetId) as { tags: string | null } | undefined;

    connection
      .prepare(
        `INSERT INTO asset_search_index
           (asset_id, filename, tags, description, source_url, author, folder_path, metadata_text)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(asset_id) DO UPDATE SET
           filename = excluded.filename,
           tags = excluded.tags,
           description = excluded.description,
           source_url = excluded.source_url,
           author = excluded.author,
           folder_path = excluded.folder_path,
           metadata_text = excluded.metadata_text`,
      )
      .run(
        assetId,
        normalizeSearchText(buildFileName(asset.relative_file_path)),
        normalizeSearchText(tagRow?.tags ?? ''),
        normalizeSearchText(buildSearchDescription(asset.description, asset.ai_description)),
        normalizeSearchText(asset.source_page_url ?? ''),
        normalizeSearchText(asset.author ?? ''),
        normalizeSearchText(buildFolderPath(asset.relative_file_path)),
        normalizeSearchText(
          buildMetadataText({
          availability: asset.availability,
          byteSize: asset.byte_size,
          relativeFilePath: asset.relative_file_path,
          revisionId: effectiveRevisionId,
          embeddedMetadataText: retainedEmbeddedMetadata,
        }),
        ),
      );
  }


  // ── OIIO thumbnail (EXR/TGA and complex TIFF fallback) ─────────────

  /**
   * Prefer the camera's embedded JPEG for a card thumbnail. This path is
   * intentionally card-only: viewer_image must still use OIIO/LibRaw so the
   * embedded preview never masquerades as a full-resolution RAW decode.
   */
  public override async tryGenerateRawEmbeddedThumbnail(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    execution: MediaExecutionContext,
  ): Promise<{ artifactId: string } | null> {
    const embeddedJpeg = extractRawEmbeddedJpegThumbnail(assetPath);
    if (!embeddedJpeg) return null;

    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    const artifactRelPath = `${artifactId}.jpg`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);

    try {
      const embeddedDimensions = await runSharpDecoder(
        execution.signal,
        execution.lane,
        async () => {
          const sharp = this.options.sharpFn ?? requireSharp();
          const pipeline = sharp(embeddedJpeg, {
            failOn: 'none',
            sequentialRead: true,
            limitInputPixels: false,
          });
          const metadata = await pipeline.metadata();
          const width = metadata.width ?? 0;
          const height = metadata.height ?? 0;
          if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width <= 0 || height <= 0) {
            throw new Error('Embedded RAW JPEG dimensions are invalid.');
          }
          const swapsDimensions = metadata.orientation !== undefined
            && metadata.orientation >= 5
            && metadata.orientation <= 8;
          const orientedWidth = swapsDimensions ? height : width;
          const orientedHeight = swapsDimensions ? width : height;
          await pipeline
            .rotate()
            .toColourspace('srgb')
            .resize({
              width: 512,
              height: 512,
              fit: 'inside',
              withoutEnlargement: true,
            })
            .jpeg({ quality: 72 })
            .toFile(artifactAbsPath);
          return { width: orientedWidth, height: orientedHeight };
        },
      );
      if (execution.signal?.aborted) {
        throw new DOMException('Media job cancelled after embedded RAW thumbnail generation.', 'AbortError');
      }

      const rawMetadata = execution.includeRawMetadata === false
        ? null
        : await extractRawImageMetadata(
          assetPath,
          this.options.rawImageMetadataParser,
        );
      const sourceWidth = rawMetadata?.width
        ?? execution.sourceWidth
        ?? embeddedDimensions.width;
      const sourceHeight = rawMetadata?.height
        ?? execution.sourceHeight
        ?? embeddedDimensions.height;
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
          sourceWidth,
          sourceHeight,
          RAW_EMBEDDED_THUMBNAIL_GENERATOR,
          new Date().toISOString(),
        );
      if (rawMetadata) {
        await this.persistRawImageMetadata(openLibrary, input.assetId, revisionId, assetPath, rawMetadata, {
          width: execution.sourceWidth,
          height: execution.sourceHeight,
        });
      }
      return { artifactId };
    } catch (error) {
      rmSync(artifactAbsPath, { force: true });
      if (error instanceof Error && error.name === 'AbortError') throw error;
      this.diagnose('thumbnail.raw-embedded-fallback', error, {
        libraryId: input.libraryId,
        assetId: input.assetId,
        extension: path.extname(assetPath).toLowerCase(),
      });
      return null;
    }
  }

  public override async generateOiiOThumbnail(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    options: {
      exposureStops?: number;
      inputColorSpace?: string;
      subimage?: number;
      artifactKind?: 'thumbnail' | 'viewer_image';
    } = {},
    execution: MediaExecutionContext = {},
  ): Promise<{ artifactId: string }> {
    const oiiotoolPath = resolveOiiotoolPath();
    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    const artifactRelPath = `${artifactId}.png`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    const artifactKind = options.artifactKind ?? 'thumbnail';
    const isViewerImage = artifactKind === 'viewer_image';
    let subimage = Number.isSafeInteger(options.subimage) && (options.subimage ?? 0) >= 0
      ? options.subimage ?? 0
      : 0;
    const isIcoAsset = path.extname(assetPath).toLowerCase() === '.ico';
    if (isIcoAsset && options.subimage === undefined) {
      // OIIO exposes ICO entries as subimages in directory order.  The first
      // entry is commonly 16px, so explicitly select the largest directory
      // entry instead of letting the decoder upscale a tiny icon.
      try {
        const icoPageSizes = readIcoPageSizesFromPath(assetPath);
        subimage = pickLargestIcoPage(icoPageSizes);
      } catch (error) {
        this.diagnose('oiio.ico-page-directory', error, { assetPath });
      }
    }

    try {
      const exposureStops = Number.isFinite(options.exposureStops)
        ? Math.max(-10, Math.min(10, options.exposureStops ?? 0))
        : 0;
      const exposureMultiplier = 2 ** exposureStops;
      const inputColorSpace = options.inputColorSpace?.trim() || null;
      const exposureValues = [
        exposureMultiplier,
        exposureMultiplier,
        exposureMultiplier,
        1,
      ].join(',');
      const isRawAsset = isRawImageExtension(assetPath);
      // Keep the card artifact inside a 512px square while preserving the
      // source aspect ratio. `--resize 0x512` makes a 2048x1024 source into a
      // 1024x512 card, which is twice as wide as the card contract and caused
      // the real TIFF E2E to expose the wrong raster size. This is an output
      // presentation size, not a source acceptance or processing limit.
      const resizeArgs = isViewerImage ? [] : ['--fit', '512x512'];
      // Chromium <img> does not paint 16-bit PNG. Card and viewer outputs are
      // display files, so force 8-bit before writing the PNG.
      const displayDepthArgs = ['-d', 'uint8'];

      if (isRawAsset && !isViewerImage) {
        const embeddedThumbnail = await this.tryGenerateRawEmbeddedThumbnail(
          input,
          openLibrary,
          assetPath,
          revisionId,
          execution,
        );
        if (embeddedThumbnail) return embeddedThumbnail;
      }

      const nativeInput = await inspectMediaNativeInput(assetPath, execution);

      // LibRaw already converts camera RAW data to its display-ready default
      // output. Running that result through the studio OCIO display transform
      // makes some ARW/RAW files fail with OIIO_COLOR_TRANSFORM_FAILED, so RAW
      // stays on the decoder's default sRGB path. EXR/TGA and other OIIO
      // formats retain the established explicit OCIO route.
      const args: string[] = isRawAsset
        ? [
            '--subimage', String(subimage),
            assetPath,
            ...resizeArgs,
            ...displayDepthArgs,
            '-o', artifactAbsPath,
          ]
        : [
            '--colorconfig', SERPENT_OCIO_CONFIG,
            '--subimage', String(subimage),
            assetPath,
            ...(inputColorSpace ? ['--iscolorspace', inputColorSpace] : []),
            // Preserve alpha while applying exposure to RGB color channels.
            '--mulc', exposureValues,
            // Empty display/view select the OCIO config defaults. Literal "default"
            // would instead request names that the selected config may not define.
            inputColorSpace
              ? `--ociodisplay:from=${inputColorSpace}:unpremult=1`
              : '--ociodisplay:unpremult=1',
            '', '',
            ...resizeArgs,
            ...displayDepthArgs,
            '-o', artifactAbsPath,
          ];

      const result = await this.runOiio(oiiotoolPath, args, {
        signal: execution.signal,
        memory: nativeInput,
      });

      if (result.exitCode !== 0) {
        throw new OiioInvocationError(
          isRawAsset ? 'OIIO_GENERATION_FAILED' : 'OIIO_COLOR_TRANSFORM_FAILED',
          `oiiotool ${isRawAsset ? 'RAW decode' : 'OCIO display transform'} exited with code ${result.exitCode}: ${result.stderr.slice(-8192)}`,
        );
      }

      const outputStat = statSync(artifactAbsPath);
      const rawMetadata = isRawAsset && !isViewerImage && execution.includeRawMetadata !== false
        ? await extractRawImageMetadata(
          assetPath,
          this.options.rawImageMetadataParser,
        )
        : null;
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              generator_version, status, generated_at)
           VALUES (?, ?, ?, 'image/png', ?, ?, ?, 'ready', ?)`,
        )
        .run(artifactId, revisionId, artifactKind, outputStat.size, artifactRelPath,
          isRawAsset
            ? `oiio@${OIIO_VERSION};raw-${isViewerImage ? 'viewer-full' : 'default'}-srgb;subimage=${subimage};display-uint8`
            : isIcoAsset
              ? `oiio@${OIIO_VERSION};ico-largest-v1;subimage=${subimage};display-uint8`
              : `oiio@${OIIO_VERSION};${isViewerImage ? 'viewer-full;' : ''}ocio=studio-v4-aces2;colorspace=${inputColorSpace ?? 'auto'};exposure=${exposureStops};subimage=${subimage};display-uint8`,
          new Date().toISOString());
      if (rawMetadata) {
        await this.persistRawImageMetadata(openLibrary, input.assetId, revisionId, assetPath, rawMetadata, {
          width: execution.sourceWidth,
          height: execution.sourceHeight,
        });
      }

      return { artifactId };
    } catch (error) {
      const resourceError = asMediaResourceExhaustedError(error, 'oiio');
      const errorCode: OiioArtifactErrorCode | typeof MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE = resourceError
        ? MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE
        : isMissingPathError(error)
        ? 'OIIO_REQUIRED'
        : error instanceof OiioInvocationError
          ? error.artifactErrorCode
          : 'OIIO_GENERATION_FAILED';

      this.diagnose('oiio.thumbnail', error, {
        libraryId: input.libraryId,
        assetId: input.assetId,
        extension: path.extname(assetPath).toLowerCase(),
        errorCode,
        ocioConfig: SERPENT_OCIO_CONFIG,
      });

      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              generator_version, status, error_code, generated_at)
           VALUES (?, ?, ?, 'image/png', 0, ?, ?, 'failed', ?, ?)`,
        )
        .run(
          artifactId, revisionId, artifactKind, artifactRelPath,
          isRawImageExtension(assetPath)
            ? `oiio@${OIIO_VERSION};raw-${isViewerImage ? 'viewer-full' : 'default'}-srgb;subimage=${subimage}`
            : isIcoAsset
              ? `oiio@${OIIO_VERSION};ico-largest-v1;subimage=${subimage}`
              : `oiio@${OIIO_VERSION};${isViewerImage ? 'viewer-full;' : ''}ocio=studio-v4-aces2;subimage=${subimage}`,
          errorCode,
          new Date().toISOString(),
        );

      if (resourceError) throw resourceError;
      throw new LibraryServiceError('INTERNAL_ERROR', {
        cause: error,
        reason: errorCode === 'OIIO_REQUIRED' ? 'OIIO_REQUIRED' : 'MEDIA_PROCESSING_FAILED',
      });
    }
  }

  /**
   * Store the small, allow-listed EXIF/IPTC/XMP projection used by the image
   * Inspector. Metadata extraction is deliberately best-effort: a file with
   * no readable embedded metadata must still keep its successful thumbnail.
   */
  public override async persistRawImageMetadata(
    openLibrary: OpenLibrary,
    assetId: string,
    revisionId: string,
    assetPath: string,
    metadata: RawImageMetadata,
    knownDimensions?: { width?: number | null; height?: number | null },
  ): Promise<boolean> {
    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    const artifactRelPath = `${artifactId}.json`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    try {
      const hasKnownDimensions = Number.isSafeInteger(knownDimensions?.width)
        && Number.isSafeInteger(knownDimensions?.height)
        && knownDimensions!.width! > 0
        && knownDimensions!.height! > 0;
      const headerSize = hasKnownDimensions
        ? { width: knownDimensions!.width!, height: knownDimensions!.height! }
        : await readImageDimensions(assetPath);
      const pixelSize = resolvedExtractedPixelSize(metadata, headerSize);
      const stored = { ...metadata, width: pixelSize.width, height: pixelSize.height };
      writeFileSync(artifactAbsPath, JSON.stringify(stored, null, 2), 'utf-8');
      const outputStat = statSync(artifactAbsPath);
      const now = new Date().toISOString();
      openLibrary.connection.transaction(() => {
        openLibrary.connection
          .prepare(
            `UPDATE revision_artifacts
                SET invalidated_at = ?
              WHERE revision_id = ?
                AND kind = 'extracted_metadata'
                AND invalidated_at IS NULL`,
          )
          .run(now, revisionId);
        openLibrary.connection
          .prepare(
            `INSERT INTO revision_artifacts
               (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                width, height, generator_version, status, generated_at)
             VALUES (?, ?, 'extracted_metadata', 'application/json', ?, ?, ?, ?, ?, 'ready', ?)`,
          )
          .run(
            artifactId,
            revisionId,
            outputStat.size,
            artifactRelPath,
            pixelSize.width,
            pixelSize.height,
            EMBEDDED_IMAGE_METADATA_GENERATOR,
            now,
        );
      })();
      const currentRevision = openLibrary.connection
        .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
        .get(assetId) as { current_revision_id: string | null } | undefined;
      if (currentRevision?.current_revision_id === revisionId) {
        this.syncAssetSearchContent(
          openLibrary.connection,
          assetId,
          embeddedMetadataSearchText(metadata),
          revisionId,
        );
      }
      return true;
    } catch (error) {
      rmSync(artifactAbsPath, { force: true });
      this.diagnose('image.raw-metadata', error, {
        revisionId,
        extension: path.extname(assetPath).toLowerCase(),
      });
      return false;
    }
  }

  /** Write a failed revision_artifact row. Used across video and OIIO paths. */
  public override writeFailedArtifact(
    openLibrary: OpenLibrary,
    artifactId: string,
    revisionId: string,
    kind: string,
    mimeType: string,
    filePath: string,
    generatorVersion: string,
    error: unknown,
  ): void {
    let errorCode: string;
    if (isMissingPathError(error) || (typeof error === 'object' && error !== null && 'code' in error && (error as Record<string, unknown>).code === 'ENOENT')) {
      errorCode = kind === 'extracted_metadata' || kind === 'video_poster' || kind === 'contact_sheet' || kind === 'webm_proxy' || kind === 'audio_proxy'
        ? 'FFMPEG_REQUIRED' : 'OIIO_REQUIRED';
    } else if (typeof error === 'object' && error !== null && 'code' in error) {
      errorCode = String((error as Record<string, unknown>).code);
    } else {
      errorCode = `${kind.toUpperCase()}_GENERATION_FAILED`;
    }
    openLibrary.connection
      .prepare(
        `INSERT INTO revision_artifacts
           (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
            generator_version, status, error_code, generated_at)
         VALUES (?, ?, ?, ?, 0, ?, ?, 'failed', ?, ?)`,
      )
      .run(artifactId, revisionId, kind, mimeType, filePath, generatorVersion, errorCode, new Date().toISOString());
  }

  /**
   * Return the current card image artifact for an asset's current revision.
   * Videos use `video_poster`; other card media uses `thumbnail`.
   */
  override getThumbnailArtifact(
    libraryId: string,
    assetId: string,
  ): {
    artifactId: string;
    filePath: string;
    width: number | null;
    height: number | null;
  } | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const assetRow = openLibrary.connection
      .prepare('SELECT current_revision_id, relative_file_path FROM assets WHERE asset_id = ?')
      .get(assetId) as { current_revision_id: string | null; relative_file_path: string } | undefined;
    if (!assetRow?.current_revision_id) return null;

    const row = openLibrary.connection
      .prepare(
        `SELECT artifact_id, file_path, width, height
           FROM revision_artifacts
          WHERE revision_id = ?
            AND kind = CASE
              WHEN LOWER(?) LIKE '%.mp4' OR LOWER(?) LIKE '%.webm' OR LOWER(?) LIKE '%.mov'
                OR LOWER(?) LIKE '%.avi' OR LOWER(?) LIKE '%.wmv' OR LOWER(?) LIKE '%.mkv'
                OR LOWER(?) LIKE '%.m4v' OR LOWER(?) LIKE '%.flv'
              THEN 'video_poster' ELSE 'thumbnail' END
            AND status = 'ready'
            AND invalidated_at IS NULL
          ORDER BY CASE mime_type WHEN 'image/jpeg' THEN 0 WHEN 'image/webp' THEN 1
            WHEN 'image/png' THEN 2 ELSE 3 END, rowid DESC
          LIMIT 1`,
      )
      .get(assetRow.current_revision_id, ...Array(8).fill(assetRow.relative_file_path)) as {
        artifact_id: string;
        file_path: string;
        width: number | null;
        height: number | null;
      } | undefined;

    return row
      ? {
          artifactId: row.artifact_id,
          filePath: row.file_path,
          width: row.width,
          height: row.height,
        }
      : null;
  }

  /**
   * Narrow Worker-only projection for semantic revision checks. It avoids
   * materializing complete AssetSummary objects (metadata, layout and folder
   * adornments) when the vector index only needs source identity.
   */
  override getSemanticAssetSources(libraryId: string, assetIds: readonly string[]): Array<{
    assetId: string;
    currentRevisionId: string;
    relativeFilePath: string;
    displayName: string;
    mediaType: AssetSummary['mediaType'];
    availability: AssetSummary['availability'];
    deletedAt: string | null;
    thumbnailStatus: 'ready' | null;
    thumbnailArtifactId: string | null;
    sequence: boolean;
  }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const ids = [...new Set(assetIds.filter((assetId) => assetId.length > 0))];
    if (ids.length === 0) return [];
    const hasFrames = hasTable(openLibrary.connection, 'asset_sequence_frames');
    const hasSequences = hasTable(openLibrary.connection, 'asset_sequences');
    const sequenceSql = hasFrames && hasSequences
      ? `EXISTS (SELECT 1 FROM asset_sequence_frames sf WHERE sf.asset_id = a.asset_id)
         OR EXISTS (SELECT 1 FROM asset_sequences ss WHERE ss.primary_asset_id = a.asset_id)`
      : '0';
    const rows = withSqliteInPredicate(openLibrary.connection, 'a.asset_id', ids, (predicate, parameters) =>
      openLibrary.connection.prepare(`
        SELECT a.asset_id, a.current_revision_id, a.relative_file_path, a.availability, a.deleted_at,
               (${sequenceSql}) AS is_sequence,
               (SELECT chosen.artifact_id FROM revision_artifacts chosen
                 WHERE chosen.revision_id = a.current_revision_id
                   AND chosen.kind = ${DISPLAY_PREVIEW_KIND_SQL}
                   AND chosen.status = 'ready' AND chosen.invalidated_at IS NULL
                 ORDER BY CASE chosen.mime_type WHEN 'image/jpeg' THEN 0 WHEN 'image/webp' THEN 1
                   WHEN 'image/png' THEN 2 ELSE 3 END, chosen.rowid DESC LIMIT 1) AS thumbnail_artifact_id
          FROM assets a WHERE ${predicate}
      `).all(...parameters) as Array<{
        asset_id: string; current_revision_id: string; relative_file_path: string;
        availability: 'available' | 'missing'; deleted_at: string | null;
        is_sequence: number;
        thumbnail_artifact_id: string | null;
      }>);
    return rows.map((row) => ({
      assetId: row.asset_id,
      currentRevisionId: row.current_revision_id,
      relativeFilePath: row.relative_file_path,
      displayName: path.posix.basename(row.relative_file_path),
      mediaType: toSummaryMediaType(detectMediaType(row.relative_file_path)),
      availability: row.availability,
      deletedAt: row.deleted_at,
      thumbnailStatus: row.thumbnail_artifact_id ? 'ready' : null,
      thumbnailArtifactId: row.thumbnail_artifact_id,
      sequence: row.is_sequence !== 0,
    }));
  }

  /** Persist bounded Main-brokered plugin media as the normal thumbnail artifact. */
  override async writePluginMediaArtifact(input: {
    libraryId: string;
    assetId: string;
    mimeType: string;
    bytesBase64: string;
    providerId?: string;
  }): Promise<{ artifactId: string }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const asset = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ? AND deleted_at IS NULL')
      .get(input.assetId) as { current_revision_id: string | null } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');

    const bytes = Buffer.from(input.bytesBase64, 'base64');
    if (bytes.length === 0 || bytes.length > 256 * 1024) {
      throw new LibraryServiceError('INTERNAL_ERROR');
    }

    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.plugin`;
    const artifactAbsPath = path.join(this.artifactsDir(openLibrary), artifactRelPath);
    let width: number | null = null;
    let height: number | null = null;
    if (input.mimeType.toLowerCase().startsWith('image/')) {
      try {
        const metadata = await runSharpDecoder(
          undefined,
          'background',
          () => (this.options.sharpFn ?? requireSharp())(bytes, {
            failOn: 'none',
            limitInputPixels: false,
          }).metadata(),
          { sourceByteSize: bytes.length },
        );
        const metadataWidth = metadata.width;
        const metadataHeight = metadata.height;
        width = typeof metadataWidth === 'number'
          && Number.isInteger(metadataWidth)
          && metadataWidth > 0
          ? metadataWidth
          : null;
        height = typeof metadataHeight === 'number'
          && Number.isInteger(metadataHeight)
          && metadataHeight > 0
          ? metadataHeight
          : null;
      } catch (error) {
        this.diagnose('plugin-media-artifact.metadata', error, {
          libraryId: input.libraryId,
          assetId: input.assetId,
          mimeType: input.mimeType,
        });
      }
    }
    mkdirSync(this.artifactsDir(openLibrary), { recursive: true });
    try {
      writeFileSync(artifactAbsPath, bytes, { flag: 'wx' });
      const now = new Date().toISOString();
      openLibrary.connection.transaction(() => {
        openLibrary.connection
          .prepare(
            `UPDATE revision_artifacts
                SET invalidated_at = ?
              WHERE revision_id = ? AND kind = 'thumbnail' AND invalidated_at IS NULL`,
          )
          .run(now, asset.current_revision_id);
        openLibrary.connection
          .prepare(
            `INSERT INTO revision_artifacts
               (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                width, height, generator_version, status, generated_at)
             VALUES (?, ?, 'thumbnail', ?, ?, ?, ?, ?, ?, 'ready', ?)`,
          )
          .run(
            artifactId,
            asset.current_revision_id,
            input.mimeType,
            bytes.length,
            artifactRelPath,
            width,
            height,
            `plugin:${input.providerId ?? 'media-provider'}`,
            now,
          );
      })();
      return { artifactId };
    } catch (error) {
      rmSync(artifactAbsPath, { force: true });
      throw error;
    }
  }

  /**
   * Write a derived binary artifact for an asset's current revision.
   *
   * Slice-0030 addition (FBX→GLB pipeline): like writePluginMediaArtifact but
   * the artifact kind and generator version are caller supplied. Local
   * resources have no product-size gate; the artifact is written atomically.
   * Cache semantics stay the same as the other derived pipelines: the
   * artifact is keyed by (revision_id, kind) —
   * a new source revision invalidates the previous artifact — and the
   * `generator_version` column lets consumers detect a stale converter
   * (resolveConvertedGlb in src/worker/fbx/converter.ts).
   */
  override writeDerivedArtifact(input: {
    libraryId: string;
    assetId: string;
    kind: string;
    mimeType: string;
    bytes: Uint8Array;
    generatorVersion: string;
  }): { artifactId: string; filePath: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const asset = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ? AND deleted_at IS NULL')
      .get(input.assetId) as { current_revision_id: string | null } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (input.bytes.length === 0) {
      throw new LibraryServiceError('INTERNAL_ERROR');
    }

    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.${input.kind}`;
    const artifactAbsPath = path.join(this.artifactsDir(openLibrary), artifactRelPath);
    mkdirSync(this.artifactsDir(openLibrary), { recursive: true });
    try {
      writeFileSync(artifactAbsPath, input.bytes, { flag: 'wx' });
      const now = new Date().toISOString();
      openLibrary.connection.transaction(() => {
        openLibrary.connection
          .prepare(
            `UPDATE revision_artifacts
                SET invalidated_at = ?
              WHERE revision_id = ? AND kind = ? AND invalidated_at IS NULL`,
          )
          .run(now, asset.current_revision_id, input.kind);
        openLibrary.connection
          .prepare(
            `INSERT INTO revision_artifacts
               (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                generator_version, status, generated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'ready', ?)`,
          )
          .run(
            artifactId,
            asset.current_revision_id,
            input.kind,
            input.mimeType,
            input.bytes.length,
            artifactRelPath,
            input.generatorVersion,
            now,
          );
      })();
      return { artifactId, filePath: artifactRelPath };
    } catch (error) {
      rmSync(artifactAbsPath, { force: true });
      throw error;
    }
  }

  /**
   * Return the current (invalidated_at IS NULL) artifact of a given kind
   * for an asset's current revision. Returns null if none exists.
   * Unlike getThumbnailArtifact, this also returns the raw status so
   * callers can distinguish ready vs failed artifacts.
   */
  override getCurrentArtifact(
    libraryId: string,
    assetId: string,
    kind: string,
    options: { expectedGeneratorVersion?: string } = {},
  ): ArtifactDescriptor | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const assetRow = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
      .get(assetId) as { current_revision_id: string | null } | undefined;
    if (!assetRow?.current_revision_id) return null;

    const cacheKey = ArtifactDescriptorCache.key(
      libraryId,
      assetId,
      assetRow.current_revision_id,
      kind,
      options.expectedGeneratorVersion,
    );
    const changeSequence = openLibrary.changeSubscription.refresh?.()
      ?? openLibrary.changeSubscription.lastSequence;

    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the
    // artifact table (or the columns needed to address an artifact) have no
    // current artifact; callers already treat null as "no artifact".
    const connection = openLibrary.connection;
    const artifactColumns = columnsFor(connection, 'revision_artifacts');
    if (!artifactColumns.has('artifact_id') || !artifactColumns.has('kind')) {
      return null;
    }
    const cached = this.artifactDescriptorCache.get(cacheKey, changeSequence);
    if (cached !== undefined) return cached;
    const present = selectColumns(connection, 'revision_artifacts', [
      'artifact_id',
      'file_path',
      'mime_type',
      'generator_version',
      'artifact_role',
      'generator_id',
      'settings_hash',
      'artifact_key',
      'status',
      'error_code',
      'width',
      'height',
      'generated_at',
    ]);
    if (present.length === 0) {
      this.artifactDescriptorCache.set(cacheKey, null, changeSequence);
      return null;
    }
    const descriptor = readCatalogArtifactDescriptor(connection, {
      revisionId: assetRow.current_revision_id,
      kind,
      selectedColumns: present,
      hasInvalidatedAt: artifactColumns.has('invalidated_at'),
      expectedGeneratorVersion: options.expectedGeneratorVersion,
    });
    if (!descriptor) {
      this.artifactDescriptorCache.set(cacheKey, null, changeSequence);
      return null;
    }
    this.artifactDescriptorCache.set(cacheKey, descriptor, changeSequence);
    return descriptor;
  }

  /** Diagnostic snapshot for cache-hit/miss/eviction benchmarks. */
  override getArtifactDescriptorCacheMetrics(): ArtifactDescriptorCacheMetrics {
    return this.artifactDescriptorCache.metrics();
  }

  override resetArtifactDescriptorCacheMetrics(): void {
    this.artifactDescriptorCache.resetMetrics();
  }

  /**
   * OIIO-backed cards use a small thumbnail, but the viewer needs a decoded
   * image at the source dimensions. Keep this derivative separate and make
   * the request single-flight; a viewer opening twice must not race two OIIO
   * writers against the same revision_artifacts unique index.
   */
  public override async ensureOiiOViewerImage(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    options: { inputColorSpace?: string; subimage?: number } = {},
  ): Promise<void> {
    const subimage = Number.isSafeInteger(options.subimage) && (options.subimage ?? 0) >= 0
      ? options.subimage ?? 0
      : 0;
    const colorSpace = options.inputColorSpace?.trim() || 'auto';
    const key = `${input.libraryId}:${input.assetId}:${revisionId}:${colorSpace}:${subimage}`;
    const expected = `oiio@${OIIO_VERSION};viewer-full;`;
    const existing = this.getCurrentArtifact(input.libraryId, input.assetId, 'viewer_image');
    if (
      existing?.status === 'ready'
      && existing.generatorVersion.includes(expected)
      && existing.generatorVersion.includes(`colorspace=${colorSpace}`)
      && existing.generatorVersion.includes(`subimage=${subimage}`)
    ) {
      return;
    }
    if (existing) {
      openLibrary.connection
        .prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE artifact_id = ? AND invalidated_at IS NULL`,
        )
        .run(new Date().toISOString(), existing.artifactId);
    }
    const running = this.oiioViewerImageInFlight.get(key);
    if (running) {
      await running;
      return;
    }
    const task = this.generateOiiOThumbnail(
      input,
      openLibrary,
      assetPath,
      revisionId,
      {
        artifactKind: 'viewer_image',
        inputColorSpace: options.inputColorSpace,
        subimage,
      },
    ).then(() => undefined).catch(() => undefined);
    this.oiioViewerImageInFlight.set(key, task);
    try {
      await task;
    } finally {
      this.oiioViewerImageInFlight.delete(key);
    }
  }

  public override async ensureRawViewerImage(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
  ): Promise<void> {
    const key = `${input.libraryId}:${input.assetId}:${revisionId}`;
    const existing = this.getCurrentArtifact(input.libraryId, input.assetId, 'viewer_image');
    const expected = `oiio@${OIIO_VERSION};raw-viewer-full;`;
    // A failed viewer artifact is not a durable verdict about the source.
    // In particular, a library can remain open while its media bundle is
    // repaired or replaced. Retry failed/legacy artifacts once the RAW reader
    // is available instead of returning the stale failure forever.
    if (existing?.status === 'ready' && existing.generatorVersion.includes(expected)) return;
    if (existing) {
      openLibrary.connection
        .prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE artifact_id = ? AND invalidated_at IS NULL`,
        )
        .run(new Date().toISOString(), existing.artifactId);
    }
    const running = this.rawViewerImageInFlight.get(key);
    if (running) {
      await running;
      return;
    }
    const task = this.generateOiiOThumbnail(
      input,
      openLibrary,
      assetPath,
      revisionId,
      { artifactKind: 'viewer_image' },
    ).then(() => undefined).catch(() => undefined);
    this.rawViewerImageInFlight.set(key, task);
    try {
      await task;
    } finally {
      this.rawViewerImageInFlight.delete(key);
    }
  }

  /**
   * ICO files are multi-page containers rather than one fixed raster. Chromium
   * may choose the first/smallest page when the source URL is used directly,
   * so the viewer receives a dedicated PNG generated from the largest page.
   * The implementation shares the OIIO selection path with card thumbnails
   * and is single-flight per revision, just like the RAW viewer artifact.
   */
  public override async generateIcoViewerImage(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
  ): Promise<{ artifactId: string }> {
    // ICO is owned by the bundled OIIO decoder. Reusing the same path as the
    // card thumbnail keeps viewer and grid selection identical and avoids
    // Sharp's platform-dependent/unsupported ICO handling.
    return this.generateOiiOThumbnail(
      input,
      openLibrary,
      assetPath,
      revisionId,
      { artifactKind: 'viewer_image' },
    );
  }

  public override async ensureIcoViewerImage(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
  ): Promise<void> {
    const key = `${input.libraryId}:${input.assetId}:${revisionId}`;
    const existing = this.getCurrentArtifact(input.libraryId, input.assetId, 'viewer_image');
    if (existing?.status === 'ready' && existing.generatorVersion.includes('ico-largest-v1')) return;
    if (existing) {
      openLibrary.connection
        .prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE artifact_id = ? AND invalidated_at IS NULL`,
        )
        .run(new Date().toISOString(), existing.artifactId);
    }
    const running = this.icoViewerImageInFlight.get(key);
    if (running) {
      await running;
      return;
    }
    const task = this.generateIcoViewerImage(
      input,
      openLibrary,
      assetPath,
      revisionId,
    ).then(() => undefined).catch(() => undefined);
    this.icoViewerImageInFlight.set(key, task);
    try {
      await task;
    } finally {
      this.icoViewerImageInFlight.delete(key);
    }
  }

  public override async getImageColorSpace(
    revisionId: string,
    assetPath: string,
    decoder: 'sharp' | 'oiio',
  ): Promise<ImageColorSpaceInfo> {
    const cached = this.imageColorSpaceByRevision.get(revisionId);
    if (cached) return cached;
    const extension = path.extname(assetPath).toLowerCase();
    let detected: ImageColorSpaceInfo | undefined;
    try {
      if (decoder === 'sharp') {
        const metadata = await runSharpDecoder(undefined, 'background', async () =>
          (this.options.sharpFn ?? requireSharp())(assetPath).metadata(),
        );
        const profileName = parseIccProfileDescription(metadata.icc);
        detected = colorSpaceInfoFromName(profileName, 'embedded')
          ?? colorSpaceInfoFromName(metadata.space, metadata.hasProfile ? 'embedded' : 'metadata');
      } else {
        const nativeInput = await inspectMediaNativeInput(assetPath, {});
        const result = await this.runOiio(resolveOiiotoolPath(), [
          '--info', '-v', '-a', assetPath,
        ], { memory: nativeInput });
        if (result.exitCode === 0) {
          detected = parseOiioColorSpaceInfo(result.stdout.toString('utf-8'));
        }
      }
    } catch (error) {
      this.diagnose('image.colorspace-probe', error, { revisionId, decoder });
    }
    const resolved = detected ?? defaultImageColorSpace(extension);
    this.imageColorSpaceByRevision.set(revisionId, resolved);
    return resolved;
  }

  public override getColorSpaceOverride(
    connection: DatabaseConnection,
    assetId: string,
  ): string | null {
    const row = connection
      .prepare('SELECT color_space FROM asset_color_space_overrides WHERE asset_id = ?')
      .get(assetId) as { color_space: string } | undefined;
    return row?.color_space ?? null;
  }

  public override async getExrPlanes(
    revisionId: string,
    assetPath: string,
  ): Promise<ExrPlaneDescriptor[]> {
    const cached = this.exrPlanesByRevision.get(revisionId);
    if (cached) return cached;
    try {
      const nativeInput = await inspectMediaNativeInput(assetPath, {});
      const result = await this.runOiio(resolveOiiotoolPath(), [
        '--info', '-v', '-a', assetPath,
      ], { memory: nativeInput });
      if (result.exitCode !== 0) return [{ index: 0, label: 'Part 0' }];
      const planes = parseExrPlaneDescriptors(result.stdout.toString('utf-8'));
      this.exrPlanesByRevision.set(revisionId, planes);
      return planes;
    } catch (error) {
      this.diagnose('oiio.exr-plane-info', error, { revisionId });
      return [{ index: 0, label: 'Part 0' }];
    }
  }

  /**
   * Async renderer entrypoint. Base preview resolution stays synchronous for
   * cards and worker tests; EXR selection is the only on-demand derivative
   * because each part needs a distinct OIIO decode.
   */
  override async resolvePreviewArtifact(
    libraryId: string,
    assetId: string,
    requestedExrPlane?: number,
    requestedColorSpace?: string,
    intent: 'viewer' | 'hover' | 'proxy-fallback' = 'viewer',
  ): Promise<ReturnType<LibraryServiceAllMethods['getPreviewArtifact']> & {
    exrPlanes?: ExrPlaneDescriptor[];
    selectedExrPlane?: number;
    colorSpace?: ImageColorSpaceInfo & { options: ImageColorSpaceOption[] };
    colorSpacePending?: boolean;
  }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const asset = openLibrary.connection
      .prepare(
        `SELECT relative_file_path, current_revision_id, availability
           FROM assets
          WHERE asset_id = ? AND deleted_at IS NULL`,
      )
      .get(assetId) as {
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
      } | undefined;
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.availability === 'missing') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }

    const basePreview = this.getPreviewArtifact(libraryId, assetId, intent);
    const extension = path.extname(asset.relative_file_path).toLowerCase();
    const decoder = imageDecoderForExtension(extension);
    const viewerDecoder = imageViewerDecoderForExtension(extension);
    const isRawAsset = isRawImageExtension(extension);
    const isIcoAsset = extension === '.ico';
    if (basePreview.mediaType === 'video' && asset.current_revision_id) {
      const override = this.getColorSpaceOverride(openLibrary.connection, assetId);
      const selected = colorSpaceInfoFromName(requestedColorSpace ?? override ?? undefined, 'metadata')
        ?? defaultImageColorSpace(extension);
      return {
        ...basePreview,
        colorSpace: {
          ...selected,
          options: [...COMMON_IMAGE_COLOR_SPACE_OPTIONS],
        },
      };
    }
    if (basePreview.mediaType !== 'image' || !asset.current_revision_id || !decoder || !viewerDecoder) {
      return basePreview;
    }
    if ((isRawAsset || isIcoAsset) && intent === 'viewer') {
      const ensureViewerImage = isRawAsset
        ? this.ensureRawViewerImage.bind(this)
        : this.ensureIcoViewerImage.bind(this);
      await ensureViewerImage(
        { libraryId, assetId },
        openLibrary,
        this.resolveAssetPath(libraryId, assetId),
        asset.current_revision_id,
      );
    }
    const storedOverride = this.getColorSpaceOverride(openLibrary.connection, assetId);
    const cachedColorSpace = this.imageColorSpaceByRevision.get(asset.current_revision_id);
    const canWarmColorSpaceInBackground =
      basePreview.playbackMode === 'source'
      && decoder === 'sharp'
      && viewerDecoder === 'sharp'
      && !isRawAsset
      && requestedColorSpace === undefined
      && storedOverride === null;

    // Native images already have a browser-readable source URL. Do not make
    // the viewer wait for a filesystem probe or Sharp metadata just to decide
    // which label to show beside the image. Return the source with a safe
    // default immediately, then resolve the path and warm the colour-space
    // cache on a detached turn; the next normal preview poll merges the exact
    // embedded profile without replacing the decoded image.
    if (canWarmColorSpaceInBackground) {
      const detectedColorSpace = cachedColorSpace ?? defaultImageColorSpace(extension);
      if (!cachedColorSpace) {
        void Promise.resolve()
          .then(() => this.resolveAssetPath(libraryId, assetId))
        .then((assetPath) => this.getImageColorSpace(
            asset.current_revision_id!,
            assetPath,
            viewerDecoder,
          ))
          .catch(() => undefined);
      }
      return {
        ...basePreview,
        colorSpace: {
          ...detectedColorSpace,
          options: canOverrideImageColorSpace(extension)
            ? [...COMMON_IMAGE_COLOR_SPACE_OPTIONS]
            : [{
              id: detectedColorSpace.id,
              label: detectedColorSpace.label,
              isLinear: detectedColorSpace.isLinear,
            }],
        },
        ...(cachedColorSpace ? {} : { colorSpacePending: true }),
      };
    }

    const assetPath = this.resolveAssetPath(libraryId, assetId);
    let detectedColorSpace: ImageColorSpaceInfo;
    if (cachedColorSpace) {
      detectedColorSpace = cachedColorSpace;
    } else {
      detectedColorSpace = await this.getImageColorSpace(
        asset.current_revision_id,
        assetPath,
        viewerDecoder,
      );
    }
    const selectedColorSpace = colorSpaceInfoFromName(
      requestedColorSpace ?? storedOverride ?? undefined,
      'metadata',
    ) ?? detectedColorSpace;
    const colorSpace = {
      ...selectedColorSpace,
      options: viewerDecoder === 'oiio' || canOverrideImageColorSpace(extension)
        ? [...COMMON_IMAGE_COLOR_SPACE_OPTIONS]
        : [{ id: detectedColorSpace.id, label: detectedColorSpace.label, isLinear: detectedColorSpace.isLinear }],
    };
    let planes: ExrPlaneDescriptor[] | undefined;
    let selected = 0;
    if (extension === '.exr') {
      planes = await this.getExrPlanes(
        asset.current_revision_id,
        this.resolveAssetPath(libraryId, assetId),
      );
      const requested = Number.isSafeInteger(requestedExrPlane) && requestedExrPlane! >= 0
        ? requestedExrPlane!
        : 0;
      selected = planes.some((plane) => plane.index === requested)
        ? requested
        : 0;
    }

    // Chromium cannot render the remaining supported image containers (TIFF,
    // BMP, TGA, PSD and EXR) from their source URL.  Give the viewer a
    // source-resolution OIIO decode instead of reusing the 512px card
    // thumbnail.  The selected colour space and EXR plane are part of the
    // artifact identity so changing either option cannot show stale pixels.
    if (
      intent === 'viewer'
      && viewerDecoder === 'oiio'
      && !isRawAsset
      && !isIcoAsset
    ) {
      await this.ensureOiiOViewerImage(
        { libraryId, assetId },
        openLibrary,
        assetPath,
        asset.current_revision_id,
        {
          inputColorSpace: selectedColorSpace.id,
          ...(extension === '.exr' ? { subimage: selected } : {}),
        },
      );
    }

    // OIIO derivatives must be regenerated when the source profile or the
    // viewer override differs from the artifact that is currently cached. This
    // also repairs older PSD/EXR thumbnails created before color metadata was
    // wired into the generator version.
    const shouldRegenerateWithOiiO =
      !isRawAsset &&
      !isIcoAsset &&
      basePreview.status === 'ready' &&
      (viewerDecoder === 'oiio' || requestedColorSpace !== undefined || storedOverride !== null) &&
      canOverrideImageColorSpace(extension);
    if (shouldRegenerateWithOiiO) {
      const current = openLibrary.connection.prepare(
        `SELECT generator_version
           FROM revision_artifacts
          WHERE revision_id = ?
            AND kind = 'thumbnail'
            AND status = 'ready'
            AND invalidated_at IS NULL
          LIMIT 1`,
      ).get(asset.current_revision_id) as { generator_version: string } | undefined;
      const version = current?.generator_version ?? '';
      const needsColor = !version.includes(`colorspace=${selectedColorSpace.id}`);
      const needsPlane = extension === '.exr' && !version.includes(`subimage=${selected}`);
      if (needsColor || needsPlane) {
        openLibrary.connection.prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE revision_id = ?
              AND kind = 'thumbnail'
              AND invalidated_at IS NULL`,
        ).run(new Date().toISOString(), asset.current_revision_id);
        try {
          await this.generateOiiOThumbnail(
            { libraryId, assetId },
            openLibrary,
            this.resolveAssetPath(libraryId, assetId),
            asset.current_revision_id,
            {
              inputColorSpace: selectedColorSpace.id,
              ...(extension === '.exr' ? { subimage: selected } : {}),
            },
          );
        } catch {
          // The refreshed artifact carries the renderer-safe failure reason.
        }
      }
    }

    return {
      ...this.getPreviewArtifact(libraryId, assetId, intent),
      ...(planes ? { exrPlanes: planes, selectedExrPlane: selected } : {}),
      colorSpace,
    };
  }

  /**
   * Resolve the renderer-safe preview state for an asset. The renderer receives
   * only an opaque artifact id; absolute and library-relative paths stay in the
   * Worker/Main boundary.
   */
  override getPreviewArtifact(
    libraryId: string,
    assetId: string,
    intent: 'viewer' | 'hover' | 'proxy-fallback' = 'viewer',
  ): {
    mediaType: 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other';
    status: 'ready' | 'pending' | 'failed' | 'missing';
    kind: 'thumbnail' | 'webm_proxy' | 'audio_proxy';
    artifactId?: string;
    mimeType: string;
    errorCode?: string;
    posterArtifactId?: string;
    playbackMode?: 'source' | 'proxy';
    sourceRevisionId?: string;
    sourceMimeType?: string;
    sourceContainer?: 'mp4' | 'mov' | 'webm';
    sourceCodecs?: string[];
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const asset = openLibrary.connection
      .prepare(
        `SELECT relative_file_path, current_revision_id, availability
           FROM assets
          WHERE asset_id = ? AND deleted_at IS NULL`,
      )
      .get(assetId) as { relative_file_path: string; current_revision_id: string; availability: 'available' | 'missing' } | undefined;
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.availability === 'missing') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }

    const mediaType = detectMediaType(asset.relative_file_path);
    const kind = mediaType === 'video'
      ? 'webm_proxy'
      : mediaType === 'audio'
        ? 'audio_proxy'
        : 'thumbnail';
    const extension = path.extname(asset.relative_file_path).toLowerCase();
    const viewerImageArtifact = mediaType === 'image'
      && intent === 'viewer'
      && directImageMimeForExtension(extension) === null
      && imageViewerDecoderForExtension(extension) === 'oiio'
      ? this.getCurrentArtifact(libraryId, assetId, 'viewer_image')
      : null;
    const artifact = viewerImageArtifact?.status === 'ready'
      ? viewerImageArtifact
      : this.getCurrentArtifact(libraryId, assetId, kind);
    const mimeType = mediaType === 'video'
      ? artifact?.mimeType ?? 'video/mp4'
      : mediaType === 'audio'
        ? 'audio/ogg'
        : mediaType === 'text'
          ? 'text/plain'
        : 'image/webp';
    if (mediaType === 'other') {
      if (artifact?.status === 'ready' && artifact.generatorVersion.startsWith('plugin:')) {
        return {
          mediaType: 'image',
          status: 'ready',
          kind: 'thumbnail',
          artifactId: artifact.artifactId,
          mimeType: artifact.mimeType,
        };
      }
      return {
        mediaType,
        status: 'missing',
        kind,
        mimeType,
        errorCode: 'UNSUPPORTED_FORMAT',
      };
    }

    // PDF/HTML documents and PDF-compatible AI files open the original source
    // through serpent://source; the renderer previews them with pdfjs / an
    // embedded browser. No thumbnail job is required to open.
    if (mediaType === 'document' && asset.current_revision_id) {
      const extension = path.extname(asset.relative_file_path).toLowerCase();
      if (
        extension === '.ai'
        && !hasPdfCompatibleIllustratorHeader(this.resolveAssetPath(libraryId, assetId))
      ) {
        return {
          mediaType,
          status: 'missing',
          kind,
          mimeType: 'application/octet-stream',
          errorCode: 'UNSUPPORTED_FORMAT',
        };
      }
      const documentMime = extension === '.pdf' || extension === '.ai'
        ? 'application/pdf'
        : extension === '.html' || extension === '.htm'
          ? 'text/html'
          : 'application/octet-stream';
      return {
        mediaType,
        status: 'ready',
        kind,
        mimeType: documentMime,
        playbackMode: 'source',
        sourceRevisionId: asset.current_revision_id,
        sourceMimeType: documentMime,
      };
    }

    // Serpent-485aeb: fonts open from the original source; the renderer loads
    // them with @font-face and renders the sample text itself.
    if (mediaType === 'font' && asset.current_revision_id) {
      const fontMime = fontMimeForExtension(asset.relative_file_path)
        ?? 'application/octet-stream';
      return {
        mediaType,
        status: 'ready',
        kind,
        mimeType: fontMime,
        playbackMode: 'source',
        sourceRevisionId: asset.current_revision_id,
        sourceMimeType: fontMime,
      };
    }

    // Text assets are previewed via capped IPC (asset.text.read), not serpent://.
    // Still mark ready so the viewer can open without a thumbnail job.
    if (mediaType === 'text' && asset.current_revision_id) {
      const extension = path.extname(asset.relative_file_path).toLowerCase();
      const textMime = textMimeForExtension(extension) ?? 'text/plain';
      return {
        mediaType,
        status: 'ready',
        kind,
        mimeType: textMime,
        playbackMode: 'source',
        sourceRevisionId: asset.current_revision_id,
        sourceMimeType: textMime,
      };
    }

    // Models resolve to their original source (serpent://source via
    // playbackMode/sourceRevisionId, same route as direct-play video). The
    // renderer's 3D surface (slice C) loads it with three.js; thumbnail/poster
    // artifacts are not needed for the viewer. Resolution logic lives in
    // model-resolution.ts so slices B/E can extend it without touching this
    // dispatch.
    const modelPreview = resolveModelPreviewResolution(
      asset.relative_file_path,
      asset.current_revision_id,
    );
    if (modelPreview) {
      return modelPreview;
    }

    const nativeMimeTypes: Record<string, string> = {
      '.mp4': 'video/mp4',
      '.mov': 'video/quicktime',
      '.webm': 'video/webm',
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.ogg': 'audio/ogg',
      '.oga': 'audio/ogg',
      '.m4a': 'audio/mp4',
      '.aac': 'audio/aac',
      '.flac': 'audio/flac',
      '.opus': 'audio/ogg',
    };
    const nativeMimeType = directImageMimeForExtension(extension)
      ?? nativeMimeTypes[extension]
      ?? (mediaType === 'video' ? videoMimeForExtension(extension) : null);
    // Audio: viewer uses wide `video_poster` strip; fall back to 4:3 thumbnail
    // until cover6 regeneration lands (Serpent-vlx).
    const poster = mediaType === 'video'
      ? this.getCurrentArtifact(libraryId, assetId, 'video_poster')
      : mediaType === 'audio'
        ? (this.getCurrentArtifact(libraryId, assetId, 'video_poster')
          ?? this.getCurrentArtifact(libraryId, assetId, 'thumbnail'))
      : null;
    const posterArtifactId = poster?.status === 'ready' ? poster.artifactId : undefined;
    const posterErrorCode = poster?.status === 'failed'
      ? poster.errorCode ?? 'MEDIA_PROCESSING_FAILED'
      : undefined;
    // Serpent-43d32f: animated GIFs intentionally stay on the native image
    // path (no WebM proxy). Chromium renders animated GIFs inside <img>, so
    // hover/viewer play the source directly; the azf6 proactive per-GIF FFmpeg
    // transcode was a long-standing Windows failure point, and on-demand
    // semantics have no trigger because <img> GIF decoding never fails.
    if (mediaType === 'video' || mediaType === 'audio') {
      // Serpent-cljb: source playback is the viewer starting point for
      // Chromium-playable containers (mp4/webm/m4v). Other containers
      // (mov/avi/wmv/mkv/flv) are not a playback guarantee; a ready proxy is
      // the viewer URL so generating a proxy actually unblocks preview.
      // Hover (Serpent-c8a1a3): a ready proxy wins for every video so
      // undecodable containers can still preview in-place.
      if (mediaType === 'video' && intent !== 'proxy-fallback' && asset.current_revision_id) {
        const preferReadyProxy = intent === 'hover'
          || !isChromiumDirectPlayVideoExtension(extension);
        if (preferReadyProxy) {
          const readyProxy = this.getCurrentArtifact(libraryId, assetId, 'webm_proxy');
          if (readyProxy?.status === 'ready') {
            return {
              mediaType,
              status: 'ready',
              kind,
              artifactId: readyProxy.artifactId,
              mimeType: readyProxy.mimeType,
              playbackMode: 'proxy',
              ...(posterArtifactId ? { posterArtifactId } : {}),
            };
          }
        }
        const extracted =
          this.getExtractedMetadata({ libraryId, assetId });
        const sourceCodecs =
          extracted?.status === 'ready' && extracted.metadata?.videoCodec
            ? [extracted.metadata.videoCodec]
            : undefined;
        const sourceContainer =
          mediaType === 'video' && extension === '.mp4'
            ? 'mp4'
            : mediaType === 'video' && extension === '.mov'
              ? 'mov'
              : mediaType === 'video' && extension === '.webm'
                ? 'webm'
                : undefined;
        return {
          mediaType,
          status: 'ready',
          kind,
          mimeType: nativeMimeType ?? 'application/octet-stream',
          ...(posterArtifactId ? { posterArtifactId } : {}),
          ...(posterErrorCode ? { errorCode: posterErrorCode } : {}),
          playbackMode: 'source',
          sourceRevisionId: asset.current_revision_id,
          sourceMimeType: nativeMimeType ?? 'application/octet-stream',
          ...(sourceContainer ? { sourceContainer } : {}),
          ...(sourceContainer && sourceCodecs ? { sourceCodecs } : {}),
        };
      }
      // Audio follows the same source-first policy as video for both the
      // viewer and hover card. A ready proxy is only selected after the
      // renderer reports a real source decode failure (`proxy-fallback`).
      if (mediaType === 'audio' && intent !== 'proxy-fallback' && nativeMimeType && asset.current_revision_id) {
        return {
          mediaType,
          status: 'ready',
          kind,
          mimeType: nativeMimeType,
          ...(posterArtifactId ? { posterArtifactId } : {}),
          playbackMode: 'source',
          sourceRevisionId: asset.current_revision_id,
          sourceMimeType: nativeMimeType,
        };
      }
      const status = artifact?.status === 'generating' ? 'pending' : artifact?.status;
      if (status === 'ready' && artifact) {
        return {
          mediaType,
          status,
          kind,
          artifactId: artifact.artifactId,
          mimeType: artifact.mimeType,
          playbackMode: 'proxy',
          ...(posterArtifactId ? { posterArtifactId } : {}),
        };
      }
      if (status === 'failed' && artifact) {
        return {
          mediaType,
          status,
          kind,
          artifactId: artifact.artifactId,
          mimeType: artifact.mimeType,
          errorCode: artifact.errorCode ?? 'MEDIA_PROCESSING_FAILED',
          ...(posterArtifactId ? { posterArtifactId } : {}),
        };
      }
      // Do not enqueue an audio proxy merely because a preview was requested.
      // `retryArtifact(audio_proxy)` is the explicit source-decode failure
      // path, and keeps native formats from producing background conversions.
      return {
        mediaType,
        status: 'pending',
        kind,
        mimeType,
        ...(posterArtifactId ? { posterArtifactId } : {}),
      };
    }
    if (artifact) {
      const status = artifact.status === 'generating' ? 'pending' : artifact.status;
      // Prefer a ready derivative, except native images always use the original
      // (REQ-VIEW-002: uncompressed source in the viewer).
      if (
        status === 'ready' &&
        !(mediaType === 'image' && nativeMimeType && !artifact.generatorVersion.startsWith('plugin:'))
      ) {
        return {
          mediaType,
          status,
          kind,
          artifactId: artifact.artifactId,
          mimeType: artifact.mimeType,
          ...(posterArtifactId ? { posterArtifactId } : {}),
        };
      }
      // Non-native formats have no Chromium-playable source: surface derivative
      // pending/failed. Native formats fall through to source below.
      if (!nativeMimeType) {
        if (status === 'failed') {
          return {
            mediaType,
            status,
            kind,
            artifactId: artifact.artifactId,
            mimeType: artifact.mimeType,
            errorCode: artifact.errorCode ?? 'MEDIA_PROCESSING_FAILED',
            ...(posterArtifactId ? { posterArtifactId } : {}),
          };
        }
        return {
          mediaType,
          status: 'pending',
          kind,
          artifactId: artifact.artifactId,
          mimeType: artifact.mimeType,
          ...(posterArtifactId ? { posterArtifactId } : {}),
        };
      }
    }

    // Browsing native images remains an optimization. Audio and video take the
    // safe proxy branch above because a container extension is not a
    // cross-platform playback guarantee.
    if (nativeMimeType && asset.current_revision_id) {
        return {
          mediaType,
          status: 'ready',
          kind,
          mimeType: nativeMimeType,
          ...(posterArtifactId ? { posterArtifactId } : {}),
          playbackMode: 'source',
          sourceRevisionId: asset.current_revision_id,
          sourceMimeType: nativeMimeType,
        };
    }

    const activeJob = openLibrary.connection
      .prepare(
        `SELECT status
           FROM jobs
          WHERE asset_id = ?
             AND kind IN ('generate_thumbnail', 'generate_webm_proxy', 'generate_audio_proxy')
            AND status IN ('queued', 'running', 'paused')
          ORDER BY updated_at DESC
          LIMIT 1`,
      )
      .get(assetId) as { status: 'queued' | 'running' | 'paused' } | undefined;
    if (activeJob) {
      return {
        mediaType,
        status: 'pending',
        kind,
        mimeType,
        ...(posterArtifactId ? { posterArtifactId } : {}),
      };
    }
    return {
      mediaType,
      status: 'missing',
      kind,
      mimeType,
      ...(posterArtifactId ? { posterArtifactId } : {}),
    };
  }

  /**
   * Companion-texture mapping for a model asset (model.resolve-companions).
   *
   * Returns every library asset inside the model's own directory (recursive),
   * excluding the model itself — the index slice C uses to rewrite OBJ+MTL /
   * FBX external texture references by relative path. Read-only; only
   * relative paths and ids cross the boundary, never absolute paths.
   */
  override resolveModelCompanions(input: {
    libraryId: string;
    assetId: string;
  }): ModelCompanionAsset[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const asset = openLibrary.connection
      .prepare(
        `SELECT relative_file_path, current_revision_id, availability
           FROM assets
          WHERE asset_id = ? AND deleted_at IS NULL`,
      )
      .get(input.assetId) as {
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
      } | undefined;
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.availability === 'missing') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (!isSupportedModelExtension(asset.relative_file_path)) {
      throw new LibraryServiceError('UNSUPPORTED_MEDIA_TYPE');
    }
    return queryModelCompanionAssets(openLibrary.connection, asset.relative_file_path);
  }

  /** Queue an artifact retry and return before any decoder subprocess starts. */
  override enqueueArtifactRetry(input: {
    libraryId: string;
    assetId: string;
    kind: 'thumbnail' | 'webm_proxy' | 'audio_proxy';
  }): string {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const asset = openLibrary.connection
      .prepare(
        `SELECT relative_file_path, location_kind, linked_folder_id,
                current_revision_id, availability
           FROM assets
          WHERE asset_id = ? AND deleted_at IS NULL`,
      )
      .get(input.assetId) as {
        relative_file_path: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
      } | undefined;
    if (!asset?.current_revision_id) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset && this.isExplicitlyIgnored(
      openLibrary,
      asset.location_kind,
      asset.linked_folder_id,
      asset.relative_file_path,
      'asset',
    )) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (asset.availability !== 'available') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    const assetMediaType = detectMediaType(asset.relative_file_path);
    const expectedKind = assetMediaType === 'video'
      ? 'webm_proxy'
      : assetMediaType === 'audio'
        ? 'audio_proxy'
        : 'thumbnail';
    if (input.kind !== expectedKind) {
      throw new LibraryServiceError('UNSUPPORTED_MEDIA_TYPE');
    }
    const jobKind = input.kind === 'webm_proxy'
      ? 'generate_webm_proxy'
      : input.kind === 'audio_proxy'
        ? 'generate_audio_proxy'
        : 'generate_thumbnail';
    const explicitProxyFallback = input.kind === 'webm_proxy' || input.kind === 'audio_proxy';

    // A playback failure can race a proxy that was generated by an earlier
    // session or by another viewer. Keep a valid current proxy intact and
    // let the caller resolve it immediately; retrying must never turn a
    // successful fallback into another full encode (Serpent-cljb).
    if (input.kind === 'webm_proxy' || input.kind === 'audio_proxy') {
      const currentArtifact = this.getCurrentArtifact(
        input.libraryId,
        input.assetId,
        input.kind,
      );
      if (currentArtifact?.status === 'ready') {
        try {
          this.getArtifactAbsolutePath(
            input.libraryId,
            currentArtifact.artifactId,
            'proxy',
          );
          return currentArtifact.artifactId;
        } catch {
          // The DB row is stale or the artifact file is gone. Invalidate it
          // below and create a replacement for this explicit playback error.
        }
      }
    }

    return openLibrary.connection.transaction(() => {
      const active = openLibrary.connection
        .prepare(
          `SELECT job_id
             FROM jobs
            WHERE asset_id = ?
              AND kind = ?
              AND status IN ('queued', 'running', 'paused')
            ORDER BY updated_at DESC
            LIMIT 1`,
        )
        .get(input.assetId, jobKind) as { job_id: string } | undefined;
      if (active) {
        if (explicitProxyFallback) {
          openLibrary.connection.prepare(
            'UPDATE jobs SET priority = MAX(priority, 300), error_code = ?, updated_at = ? WHERE job_id = ?',
          ).run(EXPLICIT_PROXY_FALLBACK_MARKER, new Date().toISOString(), active.job_id);
        } else {
          openLibrary.connection.prepare(
            'UPDATE jobs SET priority = MAX(priority, 300), updated_at = ? WHERE job_id = ?',
          ).run(new Date().toISOString(), active.job_id);
        }
        return active.job_id;
      }

      if (input.kind === 'webm_proxy' || input.kind === 'audio_proxy') {
        openLibrary.connection.prepare(
          `UPDATE revision_artifacts SET invalidated_at = ?
            WHERE revision_id = ? AND kind = ? AND invalidated_at IS NULL`,
        ).run(new Date().toISOString(), asset.current_revision_id, input.kind);
      } else {
        // An explicit thumbnail retry is allowed to replace a ready artifact.
        // Invalidate it before the claim-time admission check so the durable
        // job cannot be mistaken for an automatic duplicate.
        openLibrary.connection.prepare(
          `UPDATE revision_artifacts SET invalidated_at = ?
            WHERE revision_id = ? AND kind = 'thumbnail' AND invalidated_at IS NULL`,
        ).run(new Date().toISOString(), asset.current_revision_id);
      }

      const jobId = randomUUID();
      const now = new Date().toISOString();
      openLibrary.connection
        .prepare(
          `INSERT INTO jobs
             (job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
              attempt_count, error_code, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, 'queued', 300, 0.0, 0, ?, ?, ?)`,
        )
        .run(
          jobId,
          input.libraryId,
          input.assetId,
          asset.current_revision_id,
          jobKind,
          explicitProxyFallback ? EXPLICIT_PROXY_FALLBACK_MARKER : null,
          now,
          now,
        );
      return jobId;
    })();
  }

  /** Get the absolute filesystem path for an artifact. */
  override getArtifactAbsolutePath(
    libraryId: string,
    artifactId: string,
    usage?: 'preview' | 'proxy',
  ): string {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const cacheKey = `${libraryId}\u0000${artifactId}`;
    const currentChangeSequence = openLibrary.changeSubscription.lastSequence;
    const cached = this.artifactPathCache.get(cacheKey);
    if (cached && cached.changeSequence === currentChangeSequence) {
      this.assertArtifactUsage(cached.kind, usage);
      this.validateCachedArtifactPath(openLibrary, cached.absolutePath);
      return cached.absolutePath;
    }
    // The join against the asset's current revision is the serving boundary:
    // permanently deleted assets lose their row and stop resolving here, while
    // trashed assets keep resolving so the trash scope can show a decodable
    // preview (the derived artifact is not moved or invalidated by trashing).
    const row = openLibrary.connection
      .prepare(
        `SELECT ra.artifact_id, ra.file_path, ra.kind
           FROM revision_artifacts ra
           JOIN assets a ON a.current_revision_id = ra.revision_id
          WHERE ra.artifact_id = ?
            AND ra.status = 'ready'
            AND ra.invalidated_at IS NULL`,
      )
      .get(artifactId) as { artifact_id: string; file_path: string; kind: string } | undefined;
    if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    this.assertArtifactUsage(row.kind, usage);
    const absolutePath = this.artifactFilePathFromRow(openLibrary, row.file_path);
    this.artifactPathCache.set(cacheKey, {
      absolutePath,
      kind: row.kind,
      changeSequence: openLibrary.changeSubscription.lastSequence,
    });
    return absolutePath;
  }

  /** Resolve a burst of virtual-card previews with one query/root check. */
  override getArtifactAbsolutePaths(
    libraryId: string,
    artifactIds: readonly string[],
    usage: 'preview' | 'proxy',
  ): Array<{ artifactId: string; absolutePath: string }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const ids = [...new Set(artifactIds)].slice(0, 500);
    if (ids.length === 0) return [];
    const rows = openLibrary.connection.prepare(
      `SELECT ra.artifact_id, ra.file_path, ra.kind
         FROM revision_artifacts ra
         JOIN assets a ON a.current_revision_id = ra.revision_id
        WHERE ra.artifact_id IN (${ids.map(() => '?').join(',')})
          AND ra.status = 'ready'
          AND ra.invalidated_at IS NULL`,
    ).all(...ids) as Array<{ artifact_id: string; file_path: string; kind: string }>;
    const byId = new Map(rows.map((row) => [row.artifact_id, row] as const));
    const artifactsRoot = this.artifactRootPath(openLibrary);
    const changeSequence = openLibrary.changeSubscription.lastSequence;
    const entries: Array<{ artifactId: string; absolutePath: string }> = [];
    for (const artifactId of ids) {
      const row = byId.get(artifactId);
      if (!row) continue;
      try {
        this.assertArtifactUsage(row.kind, usage);
      } catch {
        // Preserve the single-artifact 404 semantics for one stale or
        // incompatible id without discarding valid siblings in the batch.
        continue;
      }
      try {
        const absolutePath = this.artifactFilePathFromRoot(artifactsRoot, row.file_path);
        this.artifactPathCache.set(`${libraryId}\u0000${artifactId}`, {
          absolutePath,
          kind: row.kind,
          changeSequence,
        });
        entries.push({ artifactId, absolutePath });
      } catch (error) {
        if (
          error instanceof LibraryServiceError
          && (error.code === 'ASSET_NOT_FOUND' || error.code === 'INVALID_LIBRARY_PATH')
        ) {
          continue;
        }
        throw error;
      }
    }
    return entries;
  }

  public override assertArtifactUsage(kind: string, usage?: 'preview' | 'proxy'): void {
    if (!usage) return;
    const allowedKinds = usage === 'proxy'
      ? new Set(['webm_proxy', 'audio_proxy'])
      : new Set(['thumbnail', 'viewer_image', 'video_poster', 'model_glb']);
    if (!allowedKinds.has(kind)) throw new LibraryServiceError('ASSET_NOT_FOUND');
  }

  public override validateCachedArtifactPath(openLibrary: OpenLibrary, absolutePath: string): void {
    const artifactsDir = this.artifactsDir(openLibrary);
    try {
      const rootEntry = lstatSync(artifactsDir);
      if (!rootEntry.isDirectory() || rootEntry.isSymbolicLink()) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
      const artifactsRoot = realpathSync(artifactsDir);
      const targetEntry = lstatSync(absolutePath);
      if (!targetEntry.isFile() || targetEntry.isSymbolicLink()) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
      const realTarget = realpathSync(absolutePath);
      const relation = path.relative(artifactsRoot, realTarget);
      if (
        relation === ''
        || relation.startsWith(`..${path.sep}`)
        || path.isAbsolute(relation)
      ) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('ASSET_NOT_FOUND', { cause: error });
    }
  }

  /**
   * Containment-checked absolute path for an artifact row's relative path.
   * The artifacts root itself must be a real directory (no symlink), the
   * resolved target must stay inside it, and the target file must exist as a
   * regular non-symlink file. Callers that already hold the artifact row skip
   * the per-artifact DB lookup (Serpent-v4jf batch drag priming).
   */
  public override artifactFilePathFromRow(
    openLibrary: OpenLibrary,
    relativeFilePath: string,
  ): string {
    return this.artifactFilePathFromRoot(
      this.artifactRootPath(openLibrary),
      relativeFilePath,
    );
  }

  public override artifactRootPath(openLibrary: OpenLibrary): string {
    const artifactsDir = this.artifactsDir(openLibrary);
    try {
      const rootEntry = lstatSync(artifactsDir);
      if (!rootEntry.isDirectory() || rootEntry.isSymbolicLink()) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
      return realpathSync(artifactsDir);
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('INVALID_LIBRARY_PATH', { cause: error });
    }
  }

  public override artifactFilePathFromRoot(
    artifactsRoot: string,
    relativeFilePath: string,
  ): string {
    const targetPath = path.resolve(artifactsRoot, ...relativeFilePath.split('/'));
    const relation = path.relative(artifactsRoot, targetPath);
    if (
      relation === '' ||
      relation.startsWith(`..${path.sep}`) ||
      path.isAbsolute(relation)
    ) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    try {
      const targetEntry = lstatSync(targetPath);
      if (!targetEntry.isFile() || targetEntry.isSymbolicLink()) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
      const realTarget = realpathSync(targetPath);
      const realRelation = path.relative(artifactsRoot, realTarget);
      if (
        realRelation === '' ||
        realRelation.startsWith(`..${path.sep}`) ||
        path.isAbsolute(realRelation)
      ) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
      return realTarget;
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('ASSET_NOT_FOUND', { cause: error });
    }
  }

  /**
   * Batched native-drag priming entries (Serpent-v4jf).
   *
   * The legacy per-asset loop cost 3-4 point queries per asset (resolveAssetPath,
   * getThumbnailArtifact, getArtifactAbsolutePath plus their internal lookups);
   * priming a 50k-item browse result stalled the Worker event loop with ~150k+
   * queries while Main awaited the primer before forwarding the browse response.
   * This resolves the same semantics in 500-id chunks: one assets query per
   * chunk (with the standard explicit-ignore filter), one ready
   * thumbnail/video_poster query per chunk (video_poster preferred, matching
   * getThumbnailArtifact), then per-entry filesystem checks that keep the
   * exact safety boundary of the single-entry resolvers. Missing entries are
   * skipped like the legacy loop; hard failures still throw.
   */
  override resolveAssetDragInfos(
    libraryId: string,
    assetIds: readonly string[],
  ): Array<{
    assetId: string;
    absolutePath: string;
    thumbnailAbsolutePath?: string;
  }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const uniqueIds = [...new Set(assetIds)];
    if (uniqueIds.length === 0) return [];
    const connection = openLibrary.connection;
    const batchSize = 500;

    const assetRows: Array<{
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
      current_revision_id: string | null;
    }> = [];
    for (let i = 0; i < uniqueIds.length; i += batchSize) {
      const batch = uniqueIds.slice(i, i + batchSize);
      const placeholders = sqliteInPlaceholders(batch);
      assetRows.push(
        ...(connection
          .prepare(
            `SELECT a.asset_id, a.location_kind, a.linked_folder_id,
                    a.relative_file_path, a.current_revision_id
               FROM assets a
              WHERE a.asset_id IN (${placeholders})
                AND ${this.explicitIgnoreSql(connection, 'a', false)}`,
          )
          .all(...batch) as typeof assetRows),
      );
    }

    // Lenient read: libraries predating revision_artifacts.status/kind have no
    // served thumbnails to resolve (the single-entry path would fail the same
    // columns); degrade to source-path-only entries instead of throwing.
    const artifactColumns = columnsFor(connection, 'revision_artifacts');
    const canResolveThumbnails =
      artifactColumns.has('status') && artifactColumns.has('kind');
    const thumbnailByRevision = new Map<
      string,
      { filePath: string }
    >();
    if (canResolveThumbnails) {
      const revisionIds = [
        ...new Set(
          assetRows
            .map((row) => row.current_revision_id)
            .filter((id): id is string => id !== null && id.length > 0),
        ),
      ];
      for (let i = 0; i < revisionIds.length; i += batchSize) {
        const batch = revisionIds.slice(i, i + batchSize);
        const placeholders = sqliteInPlaceholders(batch);
        const rows = connection
          .prepare(
            `SELECT revision_id, file_path
               FROM revision_artifacts
              WHERE revision_id IN (${placeholders})
                AND kind IN ('thumbnail', 'video_poster')
                AND status = 'ready'
                AND invalidated_at IS NULL
              ORDER BY revision_id, CASE kind WHEN 'video_poster' THEN 0 ELSE 1 END`,
          )
          .all(...batch) as Array<{ revision_id: string; file_path: string }>;
        for (const row of rows) {
          if (!thumbnailByRevision.has(row.revision_id)) {
            thumbnailByRevision.set(row.revision_id, { filePath: row.file_path });
          }
        }
      }
    }

    const entries: Array<{
      assetId: string;
      absolutePath: string;
      thumbnailAbsolutePath?: string;
    }> = [];
    for (const row of assetRows) {
      let absolutePath: string;
      try {
        absolutePath =
          row.location_kind === 'managed'
            ? this.folderPath(openLibrary, row.relative_file_path)
            : this.linkedAssetPath(
                openLibrary,
                row.linked_folder_id,
                row.relative_file_path,
              );
      } catch (error) {
        if (
          error instanceof LibraryServiceError &&
          error.code === 'ASSET_NOT_FOUND'
        ) {
          continue;
        }
        throw error;
      }
      const thumbnail =
        row.current_revision_id === null
          ? undefined
          : thumbnailByRevision.get(row.current_revision_id);
      let thumbnailAbsolutePath: string | undefined;
      if (thumbnail) {
        try {
          thumbnailAbsolutePath = this.artifactFilePathFromRow(
            openLibrary,
            thumbnail.filePath,
          );
        } catch (error) {
          if (
            !(error instanceof LibraryServiceError) ||
            error.code !== 'ASSET_NOT_FOUND'
          ) {
            throw error;
          }
        }
      }
      entries.push({
        assetId: row.asset_id,
        absolutePath,
        ...(thumbnailAbsolutePath === undefined
          ? {}
          : { thumbnailAbsolutePath }),
      });
    }
    return entries;
  }

  override getCurrentMediaSource(
    libraryId: string,
    assetId: string,
    revisionId: string,
  ): { absolutePath: string; mimeType: string } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const asset = openLibrary.connection.prepare(
      `SELECT relative_file_path, current_revision_id, availability, deleted_at
         FROM assets WHERE asset_id = ?`,
    ).get(assetId) as {
      relative_file_path: string;
      current_revision_id: string | null;
      availability: 'available' | 'missing';
      deleted_at: string | null;
    } | undefined;
    if (!asset || asset.deleted_at || asset.availability !== 'available') {
      throw new LibraryServiceError('ASSET_NOT_FOUND');
    }
    if (asset.current_revision_id !== revisionId) {
      throw new LibraryServiceError('ASSET_NOT_FOUND');
    }
    const extension = path.extname(asset.relative_file_path).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.wav': 'audio/wav',
      '.mp3': 'audio/mpeg',
      '.ogg': 'audio/ogg',
      '.oga': 'audio/ogg',
      '.m4a': 'audio/mp4',
      '.aac': 'audio/aac',
      '.flac': 'audio/flac',
      '.opus': 'audio/ogg',
      // PDF/HTML and PDF-compatible AI source responses need their real MIME
      // so the renderer can present them (pdfjs / iframe) instead of download.
      '.pdf': 'application/pdf',
      '.ai': 'application/pdf',
      '.html': 'text/html; charset=utf-8',
      '.htm': 'text/html; charset=utf-8',
    };
    const mimeType = directImageMimeForExtension(extension)
      ?? videoMimeForExtension(extension)
      ?? mimeTypes[extension]
      ?? audioMimeForExtension(extension)
      ?? modelMimeForExtension(extension)
      // Companion files (MTL, TGA textures, …) have no registered media
      // MIME; serving them as octet-stream through the source route (which
      // still requires a valid revision token) lets 3D loaders fetch them.
      ?? 'application/octet-stream';
    return { absolutePath: this.resolveAssetPath(libraryId, assetId), mimeType };
  }

  /** @deprecated Use getCurrentMediaSource; kept for protocol and test compatibility. */
  override getCurrentVideoSource(
    libraryId: string,
    assetId: string,
    revisionId: string,
  ): { absolutePath: string; mimeType: string } {
    return this.getCurrentMediaSource(libraryId, assetId, revisionId);
  }

  public override enqueueReadyPaletteJobs(
    openLibrary: OpenLibrary,
    options: { assetIds?: string[]; limit?: number; priority?: number },
  ): number {
    const selectedIds = [...new Set(options.assetIds ?? [])].slice(0, 500);
    if (options.assetIds && selectedIds.length === 0) return 0;
    const selectedSql = selectedIds.length > 0
      ? `AND a.asset_id IN (${selectedIds.map(() => '?').join(',')})`
      : '';
    const limit = options.limit === undefined
      ? 500
      : Math.max(0, Math.min(500, Math.trunc(options.limit)));
    if (limit === 0) return 0;
    const paletteExtensions = [
      ...IMAGE_EXTENSIONS,
      ...VIDEO_EXTENSIONS,
      ...MODEL_EXTENSIONS,
      ...DOCUMENT_EXTENSIONS,
    ];
    const hasSourceDimensions = columnsFor(openLibrary.connection, 'revision_artifacts').has('width')
      && columnsFor(openLibrary.connection, 'revision_artifacts').has('height');
    const sourceDirectExtensions = IMAGE_EXTENSIONS.map((extension) => extension.slice(1));
    const sourceDirectSql = hasSourceDimensions
      ? `
             OR (
               source_revision.byte_size <= ${SOURCE_DIRECT_MAX_BYTES}
               AND (${sourceDirectExtensions.map(() => 'LOWER(a.relative_file_path) LIKE ?').join(' OR ')})
               AND EXISTS (
                 SELECT 1 FROM revision_artifacts source_metadata
                  WHERE source_metadata.revision_id = a.current_revision_id
                    AND source_metadata.kind = 'extracted_metadata'
                    AND source_metadata.status = 'ready'
                    AND source_metadata.invalidated_at IS NULL
                    AND source_metadata.width > 0
                    AND source_metadata.height > 0
                    AND source_metadata.width <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                    AND source_metadata.height <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                    AND source_metadata.width * source_metadata.height <= ${SOURCE_DIRECT_MAX_PIXELS}
               )
             )`
      : '';
    const rows = openLibrary.connection.prepare(
      `SELECT a.asset_id, a.current_revision_id, a.relative_file_path,
              source_revision.byte_size AS source_byte_size
              ${hasSourceDimensions ? `,
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
                LIMIT 1) AS source_height` : ', NULL AS source_width, NULL AS source_height'}
         FROM assets a
         JOIN revisions source_revision
           ON source_revision.revision_id = a.current_revision_id
        WHERE a.deleted_at IS NULL
          AND a.availability = 'available'
          AND a.current_revision_id IS NOT NULL
          AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
          ${selectedSql}
          AND (${paletteExtensions.map(() => 'LOWER(a.relative_file_path) LIKE ?').join(' OR ')})
          AND (
            EXISTS (
              SELECT 1 FROM revision_artifacts source
               WHERE source.revision_id = a.current_revision_id
                 AND source.kind IN ('thumbnail', 'video_poster')
                 AND source.status = 'ready'
                 AND source.invalidated_at IS NULL
            )${sourceDirectSql}
          )
          AND NOT EXISTS (
            SELECT 1 FROM revision_artifacts palette
             WHERE palette.revision_id = a.current_revision_id
               AND palette.kind = 'extracted_palette'
               AND palette.status IN ('ready', 'failed')
               AND palette.invalidated_at IS NULL
          )
          AND NOT EXISTS (
            SELECT 1 FROM jobs job
             WHERE job.asset_id = a.asset_id
               AND job.revision_id = a.current_revision_id
               AND job.kind = 'extract_palette'
               AND job.status IN ('queued', 'running', 'paused')
          )
        ORDER BY a.relative_file_path
        LIMIT ?`,
    ).all(
      ...selectedIds,
      ...paletteExtensions.map((extension) => `%.${extension.slice(1)}`),
      ...(hasSourceDimensions
        ? sourceDirectExtensions.map((extension) => `%.${extension}`)
        : []),
      limit,
    ) as Array<{
      asset_id: string;
      current_revision_id: string;
      relative_file_path: string;
      source_byte_size: number;
      source_width: number | null;
      source_height: number | null;
    }>;
    let enqueued = 0;
    for (const row of rows) {
      if (this.enqueuePaletteJob(
        openLibrary,
        row.asset_id,
        row.current_revision_id,
        options.priority ?? -10,
      )) enqueued += 1;
    }
    return enqueued;
  }

  /**
   * Invalidate ready artifacts whose files are missing under `.serpent/artifacts`.
   * Used after import/open when an older export omitted the artifacts tree while
   * the DB still recorded status=ready (Serpent-pxd).
   */
  public override async reconcileMissingArtifactFiles(
    openLibrary: OpenLibrary,
    yieldTurn?: () => Promise<void>,
    onMissingPrimaryArtifacts?: (assetIds: string[]) => void,
  ): Promise<number> {
    // Serpent-verg.2 — lenient open (0031 §1): libraries predating
    // revision_artifacts.status skip this recovery step instead of failing
    // to open.
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) {
      return 0;
    }
    const artifactsDir = this.artifactsDir(openLibrary);
    let artifactsRoot: string;
    try {
      const rootEntry = lstatSync(artifactsDir);
      if (!rootEntry.isDirectory() || rootEntry.isSymbolicLink()) return 0;
      artifactsRoot = realpathSync(artifactsDir);
    } catch {
      return 0;
    }

    const rows = openLibrary.connection
      .prepare(
        `SELECT ra.artifact_id, ra.file_path, ra.kind, a.asset_id
           FROM revision_artifacts ra
           JOIN assets a ON a.current_revision_id = ra.revision_id
          WHERE ra.status = 'ready'
            AND ra.invalidated_at IS NULL
            AND a.deleted_at IS NULL
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}`,
      )
      .all() as Array<{
        artifact_id: string;
        file_path: string;
        kind: string;
        asset_id: string;
      }>;
    if (rows.length === 0) return 0;

    const now = new Date().toISOString();

    // The artifacts directory is flat (artifact_id + extension written by the
    // generators), so one directory listing replaces per-file lstat+realpath.
    // On SMB/NAS each lstat is a network round trip (~10ms measured), which
    // made this sweep cost minutes of pure latency on a 20k-artifact store;
    // a single readdir costs one directory enumeration regardless of how the
    // entries are checked afterwards. A symlinked or subdirectory entry is
    // never treated as present, matching the old containment rules.
    // Serpent-4bdd26 现场教训（用户 NAS 库打开 5 分钟）：21k 条目的 readdirSync
    // 是一次 ~21 秒的同步调用，期间 Worker 事件循环完全停摆——所有并发请求
    // 撞上 15s 超时。改为 opendir 异步流式构建集合，让事件循环持续可响应。
    // Serpent-2cc492 补充实测（真实 NAS 生产库）：即便纯异步，21,508 条目的
    // 目录枚举本身也要 ~16.5s——SMB 目录元数据是海量小往返。因此：
    // ① names-only readdir（Dirent 类型判定在本目录全是常规文件的扁平结构里
    //    没有额外价值；路径逃逸防护仍由 artifactFilePresent 的 containment
    //    检查承担；同名符号链接/子目录被当作存在的代价只是少触发一次重建，
    //    可接受）；
    // ② 枚举循环每 4k 条让步一次事件循环——配合链尾调度 + startup gate，
    //    交互请求到达时永远不需要等待整个枚举完成。
    let presentArtifactPaths: Set<string>;
    try {
      presentArtifactPaths = new Set();
      const dir = await opendirAsync(artifactsRoot);
      try {
        let sinceYield = 0;
        for (;;) {
          const entry = await dir.read();
          if (entry === null) break;
          if (entry.name.startsWith('.')) continue;
          presentArtifactPaths.add(entry.name);
          if (++sinceYield >= 4_096 && yieldTurn) {
            sinceYield = 0;
            await yieldTurn();
          }
        }
      } finally {
        await dir.close();
      }
    } catch {
      return 0;
    }
    const artifactFilePresent = (filePath: string): boolean => {
      // Same containment rules as getArtifactAbsolutePath — escape / symlink → treat missing.
      const targetPath = path.resolve(artifactsRoot, ...filePath.split('/'));
      const relation = path.relative(artifactsRoot, targetPath);
      if (
        relation === '' ||
        relation.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relation)
      ) {
        return false;
      }
      return presentArtifactPaths.has(targetPath.slice(artifactsRoot.length + path.sep.length));
    };

    // Serpent-tumv: sweep in batches and yield between batches so a large
    // artifact store does not stall the Worker event loop for seconds.
    // Serpent-4bdd26: each batch is one multi-row UPDATE instead of a
    // per-row transaction. Network libraries run under a rollback journal,
    // where any open write blocks concurrent reads — collapsing 400
    // statements into one keeps that write window (and the user-visible
    // stall it can cause on SMB) as short as possible.
    const batchSize = 400;
    let invalidated = 0;
    for (let offset = 0; offset < rows.length; offset += batchSize) {
      const missingRows = rows
        .slice(offset, offset + batchSize)
        .filter((row) => !artifactFilePresent(row.file_path));
      const missingIds = missingRows.map((row) => row.artifact_id);
      if (missingIds.length > 0) {
        const changed = openLibrary.connection.prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE artifact_id IN (${sqliteInPlaceholders(missingIds)})
              AND invalidated_at IS NULL`,
        ).run(now, ...missingIds).changes;
        invalidated += changed;
        const missingPrimaryAssetIds = [...new Set(
          missingRows
            .filter((row) => row.kind === 'thumbnail' || row.kind === 'video_poster')
            .map((row) => row.asset_id),
        )];
        if (changed > 0 && missingPrimaryAssetIds.length > 0) {
          try {
            onMissingPrimaryArtifacts?.(missingPrimaryAssetIds);
          } catch (error) {
            this.diagnose('artifact.missing-primary-queue-notify', error, {
              libraryId: openLibrary.summary.libraryId,
              affectedAssetCount: missingPrimaryAssetIds.length,
            });
          }
        }
      }
      if (yieldTurn && offset + batchSize < rows.length) {
        await yieldTurn();
      }
    }
    return invalidated;
  }

  /**
   * Remove old artifact files left behind by a crash after a DB replacement
   * commit but before the best-effort unlink. Only the flat artifacts root is
   * scanned, only paths older than the grace period are eligible, and every
   * non-temporary file still referenced by an active artifact row is retained.
   */
  public override async reconcileOrphanArtifactFiles(
    openLibrary: OpenLibrary,
    yieldTurn?: () => Promise<void>,
  ): Promise<number> {
    let artifactsRoot: string;
    try {
      const artifactsDir = this.artifactsDir(openLibrary);
      const rootEntry = lstatSync(artifactsDir);
      if (!rootEntry.isDirectory() || rootEntry.isSymbolicLink()) return 0;
      artifactsRoot = realpathSync(artifactsDir);
    } catch {
      return 0;
    }

    const referencedPaths = new Set<string>();
    const rows = openLibrary.connection
      .prepare(
        `SELECT file_path
           FROM revision_artifacts
          WHERE file_path IS NOT NULL
            AND invalidated_at IS NULL`,
      )
      .all() as Array<{ file_path: string }>;
    for (const row of rows) {
      const targetPath = path.resolve(artifactsRoot, ...row.file_path.split('/'));
      const relation = path.relative(artifactsRoot, targetPath);
      if (
        relation === ''
        || relation.startsWith(`..${path.sep}`)
        || path.isAbsolute(relation)
      ) continue;
      referencedPaths.add(targetPath);
    }

    let removed = 0;
    let scanned = 0;
    let enumerated = 0;
    let probed = 0;
    let skippedReferenced = 0;
    const scanStartedAt = performance.now();
    const now = Date.now();
    const directory = await opendirAsync(artifactsRoot);
    try {
      for (;;) {
        const entry = await directory.read();
        if (entry === null) break;
        enumerated += 1;
        // Normalization writes `<uuid>.tmp` before its atomic final rename;
        // leave temporary files to the existing job cleanup path.
        if (entry.name.startsWith('.') || entry.name.endsWith('.tmp')) continue;
        const candidatePath = path.join(artifactsRoot, entry.name);
        // Serpent-26f22b: consult the reference set *before* the filesystem.
        // This directory holds tens of thousands of artifacts and nearly every
        // one is still referenced, so probing first spent the whole scan on
        // paths the database already accounted for (measured on a 44k-asset
        // library: 17.2 s of `artifact-orphan-cleanup` per open).
        if (referencedPaths.has(candidatePath)) {
          skippedReferenced += 1;
          continue;
        }
        let entryStat: Awaited<ReturnType<typeof lstatAsync>>;
        try {
          probed += 1;
          entryStat = await lstatAsync(candidatePath);
        } catch {
          continue;
        }
        if (
          !entryStat.isFile()
          || entryStat.isSymbolicLink()
          || now - entryStat.mtimeMs < ORPHAN_ARTIFACT_GRACE_MS
        ) continue;
        try {
          await rmAsync(candidatePath, { force: true });
          removed += 1;
        } catch (error) {
          this.diagnose('artifact.orphan-cleanup', error, {
            libraryId: openLibrary.summary.libraryId,
            fileName: entry.name,
          });
        }
        scanned += 1;
        if (yieldTurn && scanned % 256 === 0) await yieldTurn();
      }
    } finally {
      await directory.close();
    }
    // Stage metrics for the reconciliation perf ticket: enumeration, probes,
    // candidates excluded by reference and actual removals are separate numbers.
    if (process.env.SERPENT_REFRESH_STAGE_LOG === '1') {
      console.error(JSON.stringify({
        scope: 'open.reconciliation.stage',
        libraryId: openLibrary.summary.libraryId,
        stage: 'artifact-orphan-scan',
        enumerated,
        probed,
        skippedReferenced,
        referencedPaths: referencedPaths.size,
        candidates: removed,
        durationMs: Math.round((performance.now() - scanStartedAt) * 100) / 100,
      }));
    }
    return removed;
  }

  public override emitNetworkMetadataCacheEvent(event: NetworkMetadataCacheEvent): void {
    try {
      this.options.onNetworkMetadataCacheEvent?.(event);
    } catch (error) {
      // Diagnostics must never make an otherwise usable network library fail
      // to open or close.
      this.diagnose('network-metadata-cache.event', error, {
        libraryId: event.libraryId,
        eventType: event.type,
      });
    }
  }

  public override networkMetadataBrowseChangeSequence(
    connection: DatabaseConnection,
    libraryId: string,
  ): number {
    const row = connection
      .prepare(
        'SELECT sequence FROM browse_change_sequence WHERE library_id = ?',
      )
      .get(libraryId) as { sequence: number } | undefined;
    if (!row || !Number.isSafeInteger(row.sequence) || row.sequence < 0) {
      throw new Error('The browse change sequence is missing or invalid.');
    }
    return row.sequence;
  }

  public override networkMetadataSourceState(
    connection: DatabaseConnection,
    libraryId: string,
    sourceDatabasePath: string,
  ): NetworkMetadataSourceState | undefined {
    try {
      const testOverride = this.options.networkMetadataSourceStateForTests;
      if (testOverride) return testOverride({ libraryId, sourceDatabasePath });
      const sourceFingerprint = networkMetadataSourceFingerprint(sourceDatabasePath);
      if (!sourceFingerprint) return undefined;
      // The broad library sequence also advances for jobs and artifact status.
      // Those volatile rows are deliberately routed to the remote primary and
      // must not invalidate a catalog snapshot while media work is running.
      return {
        schemaVersion: schemaVersion(connection),
        sourceChangeSequence: this.networkMetadataBrowseChangeSequence(connection, libraryId),
        sourceFingerprint,
      };
    } catch (error) {
      this.diagnose('network-metadata-cache.source-state', error, { libraryId });
      return undefined;
    }
  }

  public override validateNetworkMetadataSnapshot(
    connection: DatabaseConnection,
    libraryId: string,
    expectedSchemaVersion: number,
  ): void {
    if (schemaVersion(connection) !== expectedSchemaVersion) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const library = readLibraryIdentity(connection, { skipQuickCheck: true });
    if (library.library_id !== libraryId) throw new LibraryServiceError('LIBRARY_CORRUPT');
    verifyMigrationHistory(connection, expectedSchemaVersion);
  }

  public override createNetworkMetadataReadThrough(input: {
    connection: DatabaseConnection;
    canonicalPath: string;
    libraryId: string;
    startServices: boolean;
    primarySchemaVersion: number;
    expectedSourceChangeSequence?: number;
  }): {
    connection: DatabaseConnection;
    writeConnection: DatabaseConnection;
    state?: OpenLibrary['networkMetadataCache'];
  } {
    if (!input.startServices) {
      return { connection: input.connection, writeConnection: input.connection };
    }
    const sourceDatabasePath = databasePath(input.canonicalPath);
    const cacheKey = networkMetadataCacheKey(input.canonicalPath);
    if (input.primarySchemaVersion !== SUPPORTED_SCHEMA_VERSION) {
      return { connection: input.connection, writeConnection: input.connection };
    }

    let loaded;
    try {
      // Cache-first: opening and validating the local snapshot must not wait
      // for a remote stat or cursor round trip. The background reconciliation
      // validates the manifest cursor/fingerprint and replaces it if stale.
      const openReadonly = (snapshotPath: string): DatabaseConnection => openConfiguredDatabase(
        snapshotPath,
        this.options.sqliteBusyTimeoutMsForTests,
        { readonly: true },
      );
      const validateConnection = (connection: NetworkMetadataCacheDatabase): void => {
        this.validateNetworkMetadataSnapshot(
          connection as DatabaseConnection,
          input.libraryId,
          input.primarySchemaVersion,
        );
      };
      const validate = (
        connection: NetworkMetadataCacheDatabase,
        manifest: NetworkMetadataCacheManifest,
      ): void => {
        if (
          manifest.libraryId !== input.libraryId
          || manifest.schemaVersion !== input.primarySchemaVersion
        ) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        validateConnection(connection);
      };
      loaded = input.expectedSourceChangeSequence === undefined
        ? this.networkMetadataCache.loadLatest({
            cacheKey,
            openReadonly,
            validate,
          })
        : this.networkMetadataCache.load({
            cacheKey,
            libraryId: input.libraryId,
            schemaVersion: input.primarySchemaVersion,
            sourceChangeSequence: input.expectedSourceChangeSequence,
            openReadonly,
            validate: validateConnection,
          });
    } catch (error) {
      this.diagnose('network-metadata-cache.load', error, { libraryId: input.libraryId });
    }

    const readThrough = createNetworkReadThroughConnection(
      input.connection,
      loaded?.connection,
      { allowedSnapshotTables: NETWORK_METADATA_SNAPSHOT_TABLES },
    ) as NetworkReadThroughConnection;
    const writeThrough = createNetworkReadThroughConnection(
      input.connection,
      undefined,
      {
        allowSnapshotReads: false,
        ownsPrimary: false,
        onPrimaryMutation: () => readThrough.invalidateReadConnection(),
      },
    );
    this.emitNetworkMetadataCacheEvent({
      type: loaded ? 'hit' : 'miss',
      libraryId: input.libraryId,
      sourceChangeSequence: loaded?.manifest.sourceChangeSequence,
      ...(loaded
        ? { reason: 'awaiting-remote-validation' }
        : { reason: 'no-verified-snapshot' }),
    });
    return {
      connection: readThrough as unknown as DatabaseConnection,
      writeConnection: writeThrough as unknown as DatabaseConnection,
      state: {
        cacheKey,
        databasePath: sourceDatabasePath,
        schemaVersion: input.primarySchemaVersion,
        readThrough,
        writeThrough,
        ...(loaded ? { observedSourceFingerprint: loaded.manifest.sourceFingerprint } : {}),
        observedSourceChangeSequence: loaded?.manifest.sourceChangeSequence,
        ...(loaded ? { manifest: loaded.manifest } : {}),
      },
    };
  }

  public override async refreshNetworkMetadataCache(
    openLibrary: OpenLibrary,
    task: OpenReconciliationTask,
    reason: 'open' | 'network',
  ): Promise<void> {
    const state = openLibrary.networkMetadataCache;
    if (!state) return;
    const libraryId = openLibrary.summary.libraryId;
    const sourceState = this.networkMetadataSourceState(
      openLibrary.writeConnection,
      libraryId,
      state.databasePath,
    );
    if (!sourceState) {
      // A transient network failure must not blank the last verified local
      // view. Keep it read-only/stale and let the next low-frequency scan
      // validate the remote truth before replacing it.
      this.emitNetworkMetadataCacheEvent({
        type: 'offline',
        libraryId,
        sourceChangeSequence: state.manifest?.sourceChangeSequence,
        reason: 'remote-source-state-unavailable',
      });
      return;
    }
    if (sourceState.schemaVersion !== state.schemaVersion) {
      state.readThrough.invalidateReadConnection();
      this.emitNetworkMetadataCacheEvent({
        type: 'error',
        libraryId,
        reason: 'remote-source-state-unavailable',
      });
      return;
    }

    const currentManifest = state.manifest;
    const sourceFingerprintChanged = state.observedSourceFingerprint !== undefined
      && !networkMetadataSourceFingerprintEqual(
        state.observedSourceFingerprint,
        sourceState.sourceFingerprint,
      );
    const currentSnapshotIsCurrent = currentManifest !== undefined
      && currentManifest.sourceChangeSequence === sourceState.sourceChangeSequence
      && currentManifest.schemaVersion === sourceState.schemaVersion;
    if (currentSnapshotIsCurrent && !sourceFingerprintChanged && state.readThrough.readCacheActive) return;

    if (state.refreshInFlight) {
      await state.refreshInFlight;
      return;
    }

    const sourceCursorChanged = currentManifest !== undefined
      && currentManifest.sourceChangeSequence !== sourceState.sourceChangeSequence;
    if (sourceCursorChanged || sourceFingerprintChanged) {
      // The source state is now known to be newer/different. Stop serving the
      // old snapshot immediately; a failed/oversized refresh must fall back to
      // the remote primary rather than keep showing known-stale catalog rows.
      state.readThrough.invalidateReadConnection();
      this.emitNetworkMetadataCacheEvent({
        type: 'stale',
        libraryId,
        sourceChangeSequence: sourceState.sourceChangeSequence,
        reason: sourceFingerprintChanged ? 'remote-source-fingerprint' : reason,
      });
    }
    const startedAt = performance.now();
    this.emitNetworkMetadataCacheEvent({
      type: 'refresh-started',
      libraryId,
      sourceChangeSequence: sourceState.sourceChangeSequence,
      reason,
    });
    const refresh = (async (): Promise<void> => {
      let attemptSourceState = sourceState;
      for (let attempt = 0; attempt < 2; attempt += 1) {
        let verifiedSourceState: NetworkMetadataSourceState | undefined;
        try {
          this.assertReconciliationActive(task);
          const loaded = await this.networkMetadataCache.createSnapshot({
            onProgress: this.options.onNetworkMetadataSnapshotProgress,
            cacheKey: state.cacheKey,
            libraryId,
            schemaVersion: attemptSourceState.schemaVersion,
            sourceChangeSequence: attemptSourceState.sourceChangeSequence,
            sourceFingerprint: attemptSourceState.sourceFingerprint,
            sourceConnection: openLibrary.writeConnection,
            signal: task.controller.signal,
            openReadonly: (snapshotPath) => openConfiguredDatabase(
              snapshotPath,
              this.options.sqliteBusyTimeoutMsForTests,
              { readonly: true },
            ),
            validate: (connection) => this.validateNetworkMetadataSnapshot(
              connection as DatabaseConnection,
              libraryId,
              attemptSourceState.schemaVersion,
            ),
            beforePublish: () => {
              const currentSourceState = this.networkMetadataSourceState(
                openLibrary.writeConnection,
                libraryId,
                state.databasePath,
              );
              return currentSourceState !== undefined
                && currentSourceState.sourceChangeSequence === attemptSourceState.sourceChangeSequence
                && networkMetadataSourceFingerprintEqual(
                  currentSourceState.sourceFingerprint,
                  attemptSourceState.sourceFingerprint,
                );
            },
            afterPublish: () => {
              const currentSourceState = this.networkMetadataSourceState(
                openLibrary.writeConnection,
                libraryId,
                state.databasePath,
              );
              if (
                currentSourceState === undefined
                || currentSourceState.sourceChangeSequence !== attemptSourceState.sourceChangeSequence
                || !networkMetadataSourceFingerprintEqual(
                  currentSourceState.sourceFingerprint,
                  attemptSourceState.sourceFingerprint,
                )
              ) return false;
              verifiedSourceState = currentSourceState;
              return true;
            },
          });
          const accepted = await this.networkMetadataCache.acceptSnapshot({
            snapshot: loaded,
            accept: (acceptedSnapshot) => {
              this.assertReconciliationActive(task);
              if (openLibrary.networkMetadataCache !== state) {
                // syncGitignore or another lifecycle boundary replaced this
                // state while the backup was in flight; acceptSnapshot closes
                // the unclaimed connection before the next attempt exits.
                return false;
              }
              state.readThrough.replaceReadConnection(acceptedSnapshot.connection);
              state.manifest = acceptedSnapshot.manifest;
              state.observedSourceFingerprint = verifiedSourceState?.sourceFingerprint
                ?? attemptSourceState.sourceFingerprint;
              state.observedSourceChangeSequence = verifiedSourceState?.sourceChangeSequence
                ?? attemptSourceState.sourceChangeSequence;
              return true;
            },
          });
          if (accepted) {
            this.emitNetworkMetadataCacheEvent({
              type: 'refreshed',
              libraryId,
              sourceChangeSequence: loaded.manifest.sourceChangeSequence,
              durationMs: Math.round(performance.now() - startedAt),
              reason,
            });
            return;
          }

          if (openLibrary.networkMetadataCache !== state) return;
          if (attempt === 0) {
            const retrySourceState = this.networkMetadataSourceState(
              openLibrary.writeConnection,
              libraryId,
              state.databasePath,
            );
            if (retrySourceState && retrySourceState.schemaVersion === state.schemaVersion) {
              attemptSourceState = retrySourceState;
              continue;
            }
          }
          this.emitNetworkMetadataCacheEvent({
            type: 'refresh-skipped',
            libraryId,
            sourceChangeSequence: attemptSourceState.sourceChangeSequence,
            durationMs: Math.round(performance.now() - startedAt),
            reason: 'publication-raced',
          });
          return;
        } catch (error) {
          if (task.controller.signal.aborted || (error instanceof Error && error.name === 'AbortError')) return;
          if (error instanceof NetworkMetadataSnapshotRejectedError) {
            this.emitNetworkMetadataCacheEvent({
              type: 'refresh-skipped',
              libraryId,
              sourceChangeSequence: verifiedSourceState?.sourceChangeSequence ?? attemptSourceState.sourceChangeSequence,
              durationMs: Math.round(performance.now() - startedAt),
              reason: error.reason,
            });
            return;
          }
          this.emitNetworkMetadataCacheEvent({
            type: 'error',
            libraryId,
            durationMs: Math.round(performance.now() - startedAt),
            reason: 'snapshot-failed',
          });
          this.diagnose('network-metadata-cache.refresh', error, { libraryId, reason });
          return;
        }
      }
    })();
    state.refreshInFlight = refresh;
    try {
      await refresh;
    } finally {
      if (state.refreshInFlight === refresh) state.refreshInFlight = undefined;
    }
  }

  public override rebindCurrentNetworkMetadataCache(openLibrary: OpenLibrary): void {
    const state = openLibrary.networkMetadataCache;
    // A cache that has never been created is intentionally built by the
    // cancellable background owner, not synchronously from every first read.
    if (!state || state.manifest === undefined || state.readThrough.readCacheActive) return;
    let primarySchemaVersion: number;
    let expectedSourceChangeSequence: number;
    try {
      primarySchemaVersion = schemaVersion(state.readThrough.primaryConnection as DatabaseConnection);
      expectedSourceChangeSequence = this.networkMetadataBrowseChangeSequence(
        state.readThrough.primaryConnection as DatabaseConnection,
        openLibrary.summary.libraryId,
      );
    } catch {
      return;
    }
    const rebound = this.createNetworkMetadataReadThrough({
      connection: state.readThrough.primaryConnection as DatabaseConnection,
      canonicalPath: openLibrary.summary.libraryPath,
      libraryId: openLibrary.summary.libraryId,
      startServices: true,
      primarySchemaVersion,
      expectedSourceChangeSequence,
    });
    if (rebound.state?.readThrough.readCacheActive) {
      state.readThrough.release();
      state.writeThrough.release();
      openLibrary.connection = rebound.connection;
      openLibrary.writeConnection = rebound.writeConnection;
      openLibrary.networkMetadataCache = rebound.state;
      return;
    }
    // Do not retry the same stale manifest on every metadata read. The next
    // open/network reconciliation will create a fresh snapshot from the
    // current remote source state.
    state.manifest = undefined;
  }

  /**
   * Degraded open for a network library whose mount is currently unavailable.
   * The cache is deliberately exposed as read-only: it can serve catalog
   * metadata, but it must never manufacture a writable remote source or imply
   * that file previews/imports can succeed while the mount is gone.
   */
  public override openCachedNetworkMetadataSnapshot(
    selectedLibraryPath: string,
  ): InternalLibrarySummary | undefined {
    let normalizedPath: string;
    try {
      normalizedPath = normalizeAbsolutePath(selectedLibraryPath);
    } catch {
      return undefined;
    }
    const cacheKey = networkMetadataCacheKey(normalizedPath);
    let loaded;
    try {
      loaded = this.networkMetadataCache.loadLatest({
        cacheKey,
        openReadonly: (snapshotPath) => openConfiguredDatabase(
          snapshotPath,
          this.options.sqliteBusyTimeoutMsForTests,
          { readonly: true },
        ),
        validate: (connection, manifest) => {
          if (manifest.schemaVersion !== SUPPORTED_SCHEMA_VERSION) {
            throw new LibraryServiceError('LIBRARY_CORRUPT');
          }
          this.validateNetworkMetadataSnapshot(
            connection as DatabaseConnection,
            manifest.libraryId,
            manifest.schemaVersion,
          );
        },
      });
    } catch (error) {
      this.diagnose('network-metadata-cache.offline-load', error, { cacheKey });
      return undefined;
    }
    if (!loaded) return undefined;

    try {
      const library = readLibraryIdentity(loaded.connection, { skipQuickCheck: true });
      if (this.openById.has(library.library_id)) {
        loaded.connection.close();
        return this.openById.get(library.library_id)!.summary;
      }
      const summary: InternalLibrarySummary = {
        libraryId: library.library_id,
        displayName: library.display_name,
        libraryPath: normalizedPath,
        readOnly: true,
        networkStorage: true,
        libraryVersion: loaded.manifest.schemaVersion,
        supportedSchemaVersion: SUPPORTED_SCHEMA_VERSION,
      };
      this.openById.set(library.library_id, {
        connection: loaded.connection as DatabaseConnection,
        writeConnection: loaded.connection as DatabaseConnection,
        summary,
        readOnly: true,
        changeSubscription: { lastSequence: 0, stop() {} },
        preservedRelinkPathIdentities: new Set(),
        gitignoreText: '',
        gitignoreMatcher: parseGitignore(''),
        gitignoreMaterialized: false,
      });
      this.openIdByPath.set(normalizedPath, library.library_id);
      this.emitNetworkMetadataCacheEvent({
        type: 'offline',
        libraryId: library.library_id,
        sourceChangeSequence: loaded.manifest.sourceChangeSequence,
        reason: 'cached-snapshot-opened',
      });
      return summary;
    } catch (error) {
      closeIgnoringFailure(loaded.connection as DatabaseConnection);
      this.diagnose('network-metadata-cache.offline-open', error, { cacheKey });
      return undefined;
    }
  }

  /**
   * Serpent-tumv (LIB-018, deferred open maintenance): the disk-heavy post-open
   * reconciliation that used to run inside the synchronous library.open —
   * artifact-file sweep, expired-trash purge, and the whole Assets-directory
   * rescan. The Worker runtime starts this after the library.opened response
   * has been delivered; each step yields the event loop so the user's first
   * browse requests are not starved behind a large-library rescan.
   */
  override async runOpenBackgroundReconciliation(
    libraryId: string,
    options?: {
      admissionYield?: () => Promise<void>;
      /** Queue only primary previews invalidated by the bounded artifact scan. */
      onMissingPrimaryArtifacts?: (assetIds: string[]) => void;
    },
  ): Promise<void> {
    const openLibrary = this.openById.get(libraryId);
    if (!openLibrary || openLibrary.readOnly) return;
    this.cancelDeferredOpenMaintenance(libraryId);
    this.reconciliationOwner.abort(libraryId);
    const task = this.reconciliationOwner.register({
      libraryId,
      openLibrary,
      reason: 'open',
      ...(options?.admissionYield === undefined ? {} : { admissionYield: options.admissionYield }),
    });
    const generation = task.generation;
    const stageLog = process.env.SERPENT_REFRESH_STAGE_LOG === '1';
    const startedAt = performance.now();
    let stageMark = startedAt;
    const markStage = (stage: string): void => {
      if (!stageLog) return;
      const now = performance.now();
      console.error(JSON.stringify({
        scope: 'open.reconciliation.stage',
        libraryId,
        generation,
        stage,
        durationMs: Math.round((now - stageMark) * 100) / 100,
        totalMs: Math.round((now - startedAt) * 100) / 100,
      }));
      stageMark = now;
    };

    task.promise = (async () => {
      try {
        // Establish the pre-reconciliation safety point before any background
        // write. Every subsequent stage is owned by this open generation.
        await this.yieldReconciliation(task);
        this.assertReconciliationActive(task);
        // Schema/identity validation already ran in the synchronous open.
        // Keep this cheap guard here; the full quick_check is deliberately
        // deferred until the end so a 20k-library integrity scan cannot sit in
        // front of the first viewer request.
        await this.refreshNetworkMetadataCache(openLibrary, task, 'open');
        markStage('network-metadata-cache');
        readLibraryIdentity(openLibrary.connection, { skipQuickCheck: true });
        markStage('identity');
        await this.yieldReconciliation(task);

        // The first pass is source reconciliation: it repairs the browse
        // surface before optional maintenance touches old rows. This keeps a
        // large ignored subtree or a stale trash sweep from delaying the first
        // usable browse/viewer response.
        await this.refreshManagedAssetsOnOpen(libraryId, task);
        markStage('asset-reconciliation');
        await this.yieldReconciliation(task);

        this.assertReconciliationActive(task);
        await this.reconcileDefaultIgnoredAssets(openLibrary, task);
        markStage('default-ignore-cleanup');
        await this.yieldReconciliation(task);
        this.assertReconciliationActive(task);
        this.retireLegacyGifProxyJobs(openLibrary);
        markStage('legacy-proxy-cleanup');
        await this.yieldReconciliation(task);
        // The verified backup is important, but its native copy plus the
        // destination quick_check are synchronous enough to produce a visible
        // event-loop spike on a large library. Keep it in the same generation
        // owner, but schedule it after reconciliation returns and the user is
        // idle rather than making it part of the first browse critical path.
        markStage('backup-deferred');
        await this.yieldReconciliation(task);

        try {
          this.assertReconciliationActive(task);
          this.purgeExpiredTrash(libraryId);
          markStage('trash-purge');
        } catch (error) {
          if (task.controller.signal.aborted) throw error;
          this.diagnose('trash.purge-on-open', error, { libraryId });
        }
        await this.yieldReconciliation(task);
        this.assertReconciliationActive(task);
        const current = this.openById.get(libraryId);
        if (current) markStage('post-reconciliation-backup-deferred');
        await this.yieldReconciliation(task);
        this.assertReconciliationActive(task);
        await this.warmBrowseIndexCache(openLibrary, task);
        markStage('index-warm');
        // Artifact-file reconciliation remains last and yields between every
        // directory batch. It repairs derived-file drift without competing
        // with the first browse/viewer requests.
        await this.yieldReconciliation(task);
        this.assertReconciliationActive(task);
        await this.reconcileMissingArtifactFiles(
          openLibrary,
          () => this.yieldReconciliation(task),
          options?.onMissingPrimaryArtifacts,
        );
        markStage('artifact-reconciliation');
        this.assertReconciliationActive(task);
        await this.reconcileOrphanArtifactFiles(openLibrary, () => this.yieldReconciliation(task));
        markStage('artifact-orphan-cleanup');
        this.assertReconciliationActive(task);
        // quick_check(1) is a single synchronous SQLite operation and cannot
        // be time-sliced. Schedule it after this owner returns so the final
        // maintenance scan cannot become the tail latency of a viewer request.
        // The timer rechecks the interaction idle window and is cancelled when
        // the library generation closes or is replaced.
        this.scheduleDeferredOpenMaintenance(openLibrary, generation);
        markStage('open-maintenance-deferred');
      } catch (error) {
        if (task.controller.signal.aborted || (error instanceof Error && error.name === 'AbortError')) return;
        this.diagnose('open.background-reconciliation', error, { libraryId, generation });
      }
    })();

    try {
      await task.promise;
    } finally {
      this.reconciliationOwner.clearIfCurrent(task);
    }
  }

  /** Request the current open-generation owner to stop at its next safe point. */
  override cancelOpenBackgroundReconciliation(libraryId: string): void {
    this.reconciliationOwner.abort(libraryId);
  }

  /**
   * Fence a pending filesystem reconciliation before an explicit source-root
   * mutation. A watcher can have already captured the old root while the user
   * is choosing a replacement; allowing that stale snapshot to commit after
   * relink would immediately mark the restored assets missing again.
   */
  public override cancelReconciliationForClientMutation(libraryId: string): void {
    this.cancelDeferredOpenMaintenance(libraryId);
    this.cancelOpenBackgroundReconciliation(libraryId);
    const state = this.watchRefreshByLibrary.get(libraryId);
    if (!state) return;
    if (state.timer !== undefined) {
      try {
        (this.options.scheduler ?? DEFAULT_DEBOUNCE_SCHEDULER).cancel(state.timer);
      } catch (error) {
        this.diagnose('asset-watcher.cancel-before-mutation', error, { libraryId });
      }
      state.timer = undefined;
    }
    state.dirty = false;
    state.reason = 'watcher';
    state.fullRefreshRequested = false;
    state.linkedFolderIds = undefined;
    state.linkedChanges = undefined;
  }

  /**
   * Serpent-4bdd26: pull the hot browse/sort index pages into the SQLite page
   * cache after open. On SMB/NAS each cold page is a network round trip —
   * without warm-up the user's first sort-by-date or deep pagination pays
   * seconds of latency that a background scan can absorb invisibly.
   * Read-only and yielded between passes; correctness-neutral.
   */
  public override async warmBrowseIndexCache(
    openLibrary: OpenLibrary,
    task: OpenReconciliationTask,
  ): Promise<void> {
    // Ignored linked folders are intentionally outside the browse surface and
    // can contain most of a library. Warming their index pages after open only
    // competes with the first viewer/source requests, especially on SMB.
    const visibleAssetSql = this.explicitIgnoreSql(openLibrary.connection, 'a');
    const queries = [
      `SELECT r.modified_at FROM assets a
         JOIN revisions r ON r.revision_id = a.current_revision_id
        WHERE a.deleted_at IS NULL
          AND ${visibleAssetSql}
        ORDER BY r.modified_at DESC
        LIMIT 512`,
      `SELECT ra.artifact_id FROM assets a
         JOIN revision_artifacts ra ON ra.revision_id = a.current_revision_id
        WHERE a.deleted_at IS NULL
          AND ${visibleAssetSql}
        ORDER BY ra.artifact_id
        LIMIT 512`,
    ];
    for (const sql of queries) {
      try {
        this.assertReconciliationActive(task);
        // Single narrow column: materializing it is cheap, and reading every
        // hot page is enough to make the first sort/view query predictable;
        // scanning every row here was itself a startup regression on NAS.
        openLibrary.connection.prepare(sql).all();
        await this.yieldReconciliation(task);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') throw error;
        // Warm-up is best-effort; any failure just skips the pass.
      }
    }
  }

  /**
   * Find component-related failures that are eligible for one automatic
   * repair wave. Other failures (corrupt input, unsupported codecs, missing
   * source files, and so on) remain terminal until the user explicitly retries.
   */
  public override availableAutoRepairComponents(
    openLibrary: OpenLibrary,
  ): Set<MediaAutoRepairComponent> {
    // Serpent-verg.2 — lenient open: libraries predating the artifact status
    // columns have no component failures to repair.
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) {
      return new Set();
    }
    const rows = openLibrary.connection
      .prepare(
        `SELECT DISTINCT ra.error_code
           FROM revision_artifacts ra
           JOIN assets a ON a.current_revision_id = ra.revision_id
          WHERE a.deleted_at IS NULL
            AND a.availability = 'available'
            AND ra.kind IN ('thumbnail', 'video_poster', 'audio_proxy')
            AND ra.status = 'failed'
            AND ra.invalidated_at IS NULL
            AND ra.error_code IN ('FFMPEG_REQUIRED', 'OIIO_REQUIRED')`,
      )
      .all() as Array<{ error_code: string }>;
    if (rows.length === 0) return new Set();

    const needed = new Set<MediaAutoRepairComponent>();
    for (const row of rows) {
      if (row.error_code === 'FFMPEG_REQUIRED') needed.add('ffmpeg');
      if (row.error_code === 'OIIO_REQUIRED') needed.add('oiio');
    }
    const attempted = this.autoRepairAttemptedByLibrary.get(
      openLibrary.summary.libraryId,
    ) ?? new Set<MediaAutoRepairComponent>();
    const failedProbes = this.autoRepairProbeFailedAtByLibrary.get(
      openLibrary.summary.libraryId,
    ) ?? new Map<MediaAutoRepairComponent, number>();
    const now = Date.now();
    const available = new Set<MediaAutoRepairComponent>();
    for (const component of needed) {
      if (attempted.has(component)) continue;
      const failedAt = failedProbes.get(component);
      if (failedAt !== undefined && now - failedAt < MEDIA_COMPONENT_PROBE_RETRY_MS) {
        continue;
      }
      if (this.mediaComponentAvailable(component)) {
        failedProbes.delete(component);
        available.add(component);
      } else {
        failedProbes.set(component, now);
      }
    }
    if (failedProbes.size > 0) {
      this.autoRepairProbeFailedAtByLibrary.set(
        openLibrary.summary.libraryId,
        failedProbes,
      );
    }
    return available;
  }

  /**
   * Requeue every current preview whose failure was specifically caused by a
   * missing external component. This is separate from the normal bounded
   * startup scan so a library with many old failures can repair them all while
   * normal missing-thumbnail work remains bounded.
   */
  public override enqueueFailedMediaRepairs(
    openLibrary: OpenLibrary,
    components: Set<MediaAutoRepairComponent>,
    priority: number,
  ): number {
    const failureConditions: string[] = [];
    if (components.has('ffmpeg')) failureConditions.push("ra.error_code = 'FFMPEG_REQUIRED'");
    if (components.has('oiio')) failureConditions.push("ra.error_code = 'OIIO_REQUIRED'");
    if (failureConditions.length === 0) return 0;

    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.current_revision_id, ra.kind AS artifact_kind
           FROM assets a
           JOIN revision_artifacts ra ON ra.revision_id = a.current_revision_id
           WHERE a.deleted_at IS NULL
             AND a.availability = 'available'
             AND a.current_revision_id IS NOT NULL
             AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
             AND ra.kind IN ('thumbnail', 'video_poster', 'audio_proxy')
            AND ra.status = 'failed'
            AND ra.invalidated_at IS NULL
            AND (${failureConditions.join(' OR ')})
            AND NOT EXISTS (
              SELECT 1
                FROM jobs active
               WHERE active.asset_id = a.asset_id
                 AND active.revision_id = a.current_revision_id
                 AND active.kind = CASE ra.kind
                   WHEN 'audio_proxy' THEN 'generate_audio_proxy'
                   ELSE 'generate_thumbnail'
                 END
                 AND active.status IN ('queued', 'running', 'paused')
            )
          ORDER BY a.relative_file_path`,
      )
      .all() as Array<{
        asset_id: string;
        current_revision_id: string;
        artifact_kind: 'thumbnail' | 'video_poster' | 'audio_proxy';
      }>;
    if (rows.length === 0) return 0;

    const now = new Date().toISOString();
    const findFailedJob = openLibrary.connection.prepare(
      `SELECT job_id
         FROM jobs
        WHERE asset_id = ?
          AND revision_id = ?
          AND kind = ?
          AND status = 'failed'
        ORDER BY updated_at DESC
        LIMIT 1`,
    );
    const resetFailedJob = openLibrary.connection.prepare(
      `UPDATE jobs
          SET status = 'queued',
              priority = MAX(priority, ?),
              progress = 0.0,
              attempt_count = 0,
              error_code = NULL,
              error_detail = NULL,
              updated_at = ?
        WHERE job_id = ?`,
    );
    const insertJob = openLibrary.connection.prepare(
      `INSERT INTO jobs
         (job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
          attempt_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'queued', ?, 0.0, 0, ?, ?)`,
    );

    const repairJobs = new Map<string, {
      assetId: string;
      revisionId: string;
      kind: 'generate_thumbnail' | 'generate_audio_proxy';
    }>();
    for (const row of rows) {
      const kind = row.artifact_kind === 'audio_proxy'
        ? 'generate_audio_proxy'
        : 'generate_thumbnail';
      repairJobs.set(`${row.asset_id}:${kind}`, {
        assetId: row.asset_id,
        revisionId: row.current_revision_id,
        kind,
      });
    }
    let enqueued = 0;
    openLibrary.connection.transaction(() => {
      for (const row of repairJobs.values()) {
        const failedJob = findFailedJob.get(
          row.assetId,
          row.revisionId,
          row.kind,
        ) as { job_id: string } | undefined;
        if (failedJob) {
          enqueued += resetFailedJob.run(priority, now, failedJob.job_id).changes;
        } else {
          enqueued += insertJob.run(
            randomUUID(),
            openLibrary.summary.libraryId,
            row.assetId,
            row.revisionId,
            row.kind,
            priority,
            now,
            now,
          ).changes;
        }
      }
    })();
    return enqueued;
  }

  /**
   * Return whether a primary artifact was produced by the current generator
   * family. This is intentionally a prefix/family check: settings such as
   * EXR plane and colour space are part of artifact_key and are validated by
   * the viewer path, while this queue gate only needs to retire generators
   * whose implementation version changed.
   */
  public override primaryArtifactGeneratorIsCurrent(
    relativeFilePath: string,
    kind: 'thumbnail' | 'video_poster',
    generatorVersion: string,
  ): boolean {
    if (generatorVersion.startsWith('plugin:')) return true;
    // Imported Eagle/Billfish previews are deliberately kept as the visible
    // fallback while their low-priority normalization job is queued. The
    // queue must not invalidate the only usable card before that job runs.
    if (isImportedThumbnailGenerator(generatorVersion)) return true;
    const mediaType = detectMediaType(relativeFilePath);
    if (kind === 'video_poster') {
      return mediaType === 'audio'
        ? generatorVersion.includes(AUDIO_WAVEFORM_COVER_GENERATOR_TAG)
        : generatorVersion.startsWith(`ffmpeg@${FFMPEG_VERSION}`)
          && generatorVersion.includes(VIDEO_POSTER_GENERATOR_TAG);
    }
    switch (mediaType) {
      case 'image': {
        const extension = path.extname(relativeFilePath).toLowerCase();
        const oiioOwned = isRawImageExtension(extension)
          || extension === '.ico'
          || imageViewerDecoderForExtension(extension) === 'oiio';
        return oiioOwned
          ? generatorVersion.startsWith(`oiio@${OIIO_VERSION}`)
            || generatorVersion.startsWith(RAW_EMBEDDED_THUMBNAIL_GENERATOR)
          : generatorVersion.startsWith(`sharp@${SHARP_VERSION}`)
            || generatorVersion.startsWith(`ffmpeg@${FFMPEG_VERSION};truncated-jpeg-recovery`);
      }
      case 'audio':
        return generatorVersion.includes(AUDIO_WAVEFORM_COVER_GENERATOR_TAG);
      case 'model':
        return generatorVersion === MODEL_THUMBNAIL_GENERATOR_VERSION;
      case 'document':
        // DOCUMENT_THUMBNAIL_GENERATOR_VERSION 对应 offscreen HTML 渲染器；
        // generatePdfThumbnail（pdfjs）写入 `pdfjs@<version>`。若只认 offscreen
        // 版本，pdfjs 生成的 PDF 缩略图每次 enqueue 都被判 stale 而失效，
        // 造成「生成成功→立即失效→重生成」的封面 churn。两者都应视为当前。
        return generatorVersion === DOCUMENT_THUMBNAIL_GENERATOR_VERSION
          || generatorVersion.startsWith('pdfjs@');
      case 'font':
        // Serpent-485aeb：字体样张由 offscreen 样张页生成，版本标签独立。
        return generatorVersion === FONT_THUMBNAIL_GENERATOR_VERSION;
      default:
        return true;
    }
  }

  /** Invalidate only visible stale primary rows; never scan the whole library. */
  public override invalidateStalePrimaryArtifacts(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
  ): number {
    if (assetIds.length === 0) return 0;
    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'a.asset_id',
      assetIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT a.relative_file_path, ra.artifact_id, ra.kind, ra.generator_version,
                    source_revision.byte_size AS source_byte_size,
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
                      LIMIT 1) AS source_height
               FROM assets a
               JOIN revisions source_revision
                 ON source_revision.revision_id = a.current_revision_id
               JOIN revision_artifacts ra ON ra.revision_id = a.current_revision_id
              WHERE ${sql}
                AND a.deleted_at IS NULL
                AND ra.kind IN ('thumbnail', 'video_poster')
                AND ra.status IN ('ready', 'failed')
                AND ra.invalidated_at IS NULL`,
          )
          .all(...params) as Array<{
            relative_file_path: string;
            artifact_id: string;
            kind: 'thumbnail' | 'video_poster';
            generator_version: string;
            source_byte_size: number | null;
            source_width: number | null;
            source_height: number | null;
          }>,
    );
    const stale = rows.filter((row) => !this.primaryArtifactGeneratorIsCurrent(
      row.relative_file_path,
      row.kind,
      row.generator_version,
    ));
    if (stale.length === 0) return 0;
    const invalidate = openLibrary.connection.prepare(
      `UPDATE revision_artifacts
          SET invalidated_at = ?
        WHERE artifact_id = ?
          AND invalidated_at IS NULL`,
    );
    const now = new Date().toISOString();
    let invalidated = 0;
    openLibrary.connection.transaction(() => {
      for (const row of stale) invalidated += invalidate.run(now, row.artifact_id).changes;
    })();
    return invalidated;
  }

  /**
   * Queue one bounded normalization job for a copied Eagle/Billfish preview.
   * The copy is already durable and remains the serving artifact until the
   * replacement transaction commits, so a decode failure never makes an
   * imported asset blank.
   */
  public override enqueueImportedThumbnailNormalizationJob(
    openLibrary: OpenLibrary,
    assetId: string,
    revisionId: string,
  ): number {
    const activeOrFailed = openLibrary.connection
      .prepare(
        `SELECT 1
           FROM jobs
          WHERE library_id = ?
            AND asset_id = ?
            AND revision_id = ?
            AND kind = 'generate_thumbnail'
            AND error_code = ?
            AND status IN ('queued', 'running', 'paused', 'failed')
          LIMIT 1`,
      )
      .get(
        openLibrary.summary.libraryId,
        assetId,
        revisionId,
        IMPORTED_THUMBNAIL_NORMALIZATION_JOB,
      );
    if (activeOrFailed !== undefined) return 0;
    const now = new Date().toISOString();
    return openLibrary.connection
      .prepare(
        `INSERT INTO jobs
           (job_id, library_id, asset_id, revision_id, kind, status, priority,
            progress, attempt_count, error_code, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', -20, 0.0, 0, ?, ?, ?)`,
      )
      .run(
        randomUUID(),
        openLibrary.summary.libraryId,
        assetId,
        revisionId,
        IMPORTED_THUMBNAIL_NORMALIZATION_JOB,
        now,
        now,
      ).changes;
  }

  /**
   * Backfill the same low-priority work for libraries imported by an older
   * Serpent build. This is intentionally bounded and runs only in background
   * scheduling, never in the visible-window fast path.
   */
  public override enqueueImportedThumbnailNormalizationJobs(
    openLibrary: OpenLibrary,
    options: { assetIds?: readonly string[]; limit?: number } = {},
  ): number {
    const assetIds = [...new Set(options.assetIds ?? [])].slice(0, 500);
    if (options.assetIds !== undefined && assetIds.length === 0) return 0;
    const assetClause = assetIds.length === 0
      ? ''
      : `AND a.asset_id IN (${assetIds.map(() => '?').join(',')})`;
    const limit = options.limit === undefined
      ? 256
      : Math.max(1, Math.min(500, Math.trunc(options.limit)));
    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.current_revision_id
           FROM assets a
           JOIN revision_artifacts ra
             ON ra.revision_id = a.current_revision_id
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
          WHERE a.deleted_at IS NULL
            AND a.availability = 'available'
            AND a.current_revision_id IS NOT NULL
            ${assetClause}
            AND ra.status = 'ready'
            AND ra.invalidated_at IS NULL
            AND (
              ra.generator_version LIKE 'eagle-thumbnail@1%'
              OR ra.generator_version LIKE 'billfish-thumbnail@1%'
            )
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
            AND NOT EXISTS (
              SELECT 1
                FROM jobs existing
               WHERE existing.library_id = ?
                 AND existing.asset_id = a.asset_id
                 AND existing.revision_id = a.current_revision_id
                 AND existing.kind = 'generate_thumbnail'
                 AND existing.error_code = ?
                 AND existing.status IN ('queued', 'running', 'paused', 'failed')
            )
          ORDER BY a.created_at DESC, a.relative_file_path
          LIMIT ?`,
      )
      .all(
        ...assetIds,
        openLibrary.summary.libraryId,
        IMPORTED_THUMBNAIL_NORMALIZATION_JOB,
        limit,
      ) as Array<{
        asset_id: string;
        current_revision_id: string;
      }>;
    if (rows.length === 0) return 0;
    let enqueued = 0;
    openLibrary.connection.transaction(() => {
      for (const row of rows) {
        enqueued += this.enqueueImportedThumbnailNormalizationJob(
          openLibrary,
          row.asset_id,
          row.current_revision_id,
        );
      }
    })();
    return enqueued;
  }

  /**
   * Enqueue thumbnail jobs for supported assets whose current revision has no
   * terminal artifact. Callers may pass the currently visible asset ids and a
   * limit so opening a large library never materializes or queues the whole
   * catalogue at once.
   */
  override enqueueThumbnailJobs(
    libraryId: string,
    options: {
      assetIds?: string[];
      limit?: number;
      priority?: number;
      repairFailed?: boolean;
      /** Serpent-5xbg: also re-open retryable failed artifacts (throttled). */
      retryFailed?: boolean;
      /** Background fill waves skip GIF/audio stale-artifact scans. */
      skipStaleRepair?: boolean;
    } = {},
  ): number {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Serpent-verg.2 — lenient open (0031 §1): libraries predating
    // revision_artifacts.status have no artifact state to queue against;
    // thumbnail generation degrades to off instead of failing to open.
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) {
      return 0;
    }
    this.cancelQueuedHiddenSequenceMemberJobs(openLibrary);
    const artifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
    const selectedIds = [...new Set(options.assetIds ?? [])].slice(0, 500);
    const limit = options.limit === undefined
      ? undefined
      : Math.max(0, Math.min(500, Math.trunc(options.limit)));
    if (limit === 0 || (options.assetIds && selectedIds.length === 0)) return 0;
    if (options.retryFailed) {
      // Serpent-5xbg: failures (transient decode errors, killed processes,
      // cancelled imports) must not permanently block regeneration. Invalidate
      // retryable failed artifacts here so the queue SQL below re-enqueues them;
      // permanent failures (missing source, unsupported format, over-limit…)
      // stay marked failed and are never retried.
      requeueRetryableFailedArtifacts(openLibrary.connection, {
        priority: options.priority ?? 0,
        ...(limit === undefined ? {} : { limit }),
      });
    }
    const repairComponents = options.repairFailed
      ? this.availableAutoRepairComponents(openLibrary)
      : new Set<MediaAutoRepairComponent>();
    const repairEnqueued = options.repairFailed
      ? this.enqueueFailedMediaRepairs(
        openLibrary,
        repairComponents,
        options.priority ?? 0,
      )
      : 0;
    if (options.repairFailed && repairComponents.size > 0) {
      this.diagnose(
        'media-auto-repair.enqueued',
        new Error('Automatic media repair wave evaluated.'),
        {
          libraryId,
          components: [...repairComponents],
          enqueuedCount: repairEnqueued,
        },
      );
    }
    if (repairComponents.size > 0) {
      const attempted = this.autoRepairAttemptedByLibrary.get(libraryId)
        ?? new Set<MediaAutoRepairComponent>();
      for (const component of repairComponents) attempted.add(component);
      this.autoRepairAttemptedByLibrary.set(libraryId, attempted);
    }
    // A previous RAW run could have persisted the generic OCIO failure before
    // the RAW-specific default-sRGB route existed, or a generic OIIO failure
    // while the media bundle lacked a RAW reader. Re-open only those
    // RAW-scoped failures; other decode failures remain terminal until an
    // explicit user retry.
    const legacyRawRepairEnqueued = options.retryFailed
      ? this.requeueLegacyRawColorTransformFailures(openLibrary, {
        assetIds: selectedIds,
        limit,
      })
      : 0;
    const importedNormalizationEnqueued = options.skipStaleRepair
      ? 0
      : this.enqueueImportedThumbnailNormalizationJobs(openLibrary, {
        ...(options.assetIds === undefined ? {} : { assetIds: selectedIds }),
        limit,
      });
    let enqueued = repairEnqueued + legacyRawRepairEnqueued + importedNormalizationEnqueued;
    // Model extensions join the queue (slice E, Serpent-hnmg): the offscreen
    // GPU renderer in Main produces model thumbnails, stored as the standard
    // `thumbnail` artifact. The dedupe below (terminal artifact / active job)
    // applies to models exactly like images, so no duplicate renders occur.
    // Documents (PDF first-page render in the Worker, HTML offscreen capture in
    // Main, Serpent-8ca259) must join too — without them the enqueue gate never
    // emits generate_thumbnail rows, so document cards stay on the generic icon
    // even though `assetSupportsThumbnail` declares them thumbnail-capable.
    const supportedExtensions = [
      ...IMAGE_EXTENSIONS.map((extension) => extension.slice(1)),
      ...VIDEO_EXTENSIONS.map((extension) => extension.slice(1)),
      ...AUDIO_EXTENSION_NAMES,
      ...MODEL_EXTENSIONS.map((extension) => extension.slice(1)),
      ...DOCUMENT_EXTENSIONS.map((extension) => extension.slice(1)),
      // Serpent-485aeb: font cards render a real sample line offscreen in Main.
      ...FONT_EXTENSIONS.map((extension) => extension.slice(1)),
    ];
    for (const extension of this.pluginThumbnailExtensions.get(libraryId) ?? []) {
      if (!supportedExtensions.includes(extension)) supportedExtensions.push(extension);
    }
    const videoExtensions = VIDEO_EXTENSIONS.map((extension) => extension.slice(1));
    const nowInvalidate = new Date().toISOString();
    if (options.skipStaleRepair) {
      // Background fill only inserts missing generate_thumbnail rows.
    } else {
    this.invalidateStalePrimaryArtifacts(openLibrary, selectedIds);
    // CU-D7: invalidate pre-gifstill GIF thumbs so page-0 black frames requeue.
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE kind = 'thumbnail'
            AND status = 'ready'
            AND invalidated_at IS NULL
            AND generator_version NOT LIKE '%gifstill%'
            AND generator_version NOT LIKE ?
            AND generator_version NOT LIKE ?
            AND generator_version NOT LIKE ?
            AND revision_id IN (
              SELECT current_revision_id FROM assets
               WHERE deleted_at IS NULL
                 AND current_revision_id IS NOT NULL
                 AND LOWER(relative_file_path) LIKE '%.gif'
            )`,
      )
      .run(
        nowInvalidate,
        'eagle-thumbnail@1%',
        'billfish-thumbnail@1%',
        `${IMPORTED_THUMBNAIL_GENERATOR_PREFIX}%`,
      );
    // Serpent-4dee67: ICO cards created before largest-page selection used
    // the first directory entry (often a 16px icon). Invalidate those rows so
    // the next queue wave regenerates them from the largest ICO page.
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE kind = 'thumbnail'
            AND status = 'ready'
            AND invalidated_at IS NULL
            AND generator_version NOT LIKE '%ico-largest-v1%'
            AND revision_id IN (
              SELECT current_revision_id FROM assets
               WHERE deleted_at IS NULL
                 AND current_revision_id IS NOT NULL
                 AND LOWER(relative_file_path) LIKE '%.ico'
            )`,
      )
      .run(nowInvalidate);
    // Serpent-dxk / vlx: requeue stale audio covers + missing/stale viewer strips.
    const audioExtensionSql = AUDIO_EXTENSION_NAMES
      .map(() => 'LOWER(a.relative_file_path) LIKE ?')
      .join(' OR ');
    const audioExtensionParams = AUDIO_EXTENSION_NAMES.map(
      (extension) => `%.${extension}`,
    );
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE kind IN ('thumbnail', 'video_poster')
            AND status = 'ready'
            AND invalidated_at IS NULL
            AND generator_version NOT LIKE ?
            AND revision_id IN (
              SELECT a.current_revision_id FROM assets a
               WHERE a.deleted_at IS NULL
                 AND a.current_revision_id IS NOT NULL
                 AND (${audioExtensionSql})
            )`,
      )
      .run(
        nowInvalidate,
        `%${AUDIO_WAVEFORM_COVER_GENERATOR_TAG}%`,
        ...audioExtensionParams,
      );
    // Thumbnail ready but no viewer strip yet → invalidate thumb so both regenerate.
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE kind = 'thumbnail'
            AND status = 'ready'
            AND invalidated_at IS NULL
            AND revision_id IN (
              SELECT a.current_revision_id FROM assets a
               WHERE a.deleted_at IS NULL
                 AND a.current_revision_id IS NOT NULL
                 AND (${audioExtensionSql})
                 AND NOT EXISTS (
                   SELECT 1 FROM revision_artifacts poster
                    WHERE poster.revision_id = a.current_revision_id
                      AND poster.kind = 'video_poster'
                      AND poster.status = 'ready'
                      AND poster.invalidated_at IS NULL
                 )
            )`,
      )
      .run(nowInvalidate, ...audioExtensionParams);
    // Serpent-051: viewer strip ready but no 4:3 grid cover → requeue.
    // Do not serve video_poster in the browse grid (wide aspect).
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE kind = 'video_poster'
            AND status = 'ready'
            AND invalidated_at IS NULL
            AND revision_id IN (
              SELECT a.current_revision_id FROM assets a
               WHERE a.deleted_at IS NULL
                 AND a.current_revision_id IS NOT NULL
                 AND (${audioExtensionSql})
                 AND NOT EXISTS (
                   SELECT 1 FROM revision_artifacts thumb
                    WHERE thumb.revision_id = a.current_revision_id
                      AND thumb.kind = 'thumbnail'
                      AND thumb.status = 'ready'
                      AND thumb.invalidated_at IS NULL
                 )
            )`,
      )
      .run(nowInvalidate, ...audioExtensionParams);
    // CU-D8: GIFs with a ready thumb but no duration/frame metadata requeue once.
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE kind = 'thumbnail'
            AND status = 'ready'
            AND invalidated_at IS NULL
            AND revision_id IN (
              SELECT a.current_revision_id
                FROM assets a
               WHERE a.deleted_at IS NULL
                 AND a.current_revision_id IS NOT NULL
                 AND LOWER(a.relative_file_path) LIKE '%.gif'
                 AND NOT EXISTS (
                   SELECT 1 FROM revision_artifacts meta
                    WHERE meta.revision_id = a.current_revision_id
                      AND meta.kind = 'extracted_metadata'
                      AND meta.status = 'ready'
                      AND meta.invalidated_at IS NULL
                 )
                 AND NOT EXISTS (
                   SELECT 1 FROM revision_artifacts preserved
                    WHERE preserved.revision_id = a.current_revision_id
                      AND preserved.kind = 'thumbnail'
                      AND preserved.status = 'ready'
                      AND preserved.invalidated_at IS NULL
                      AND (
                        preserved.generator_version LIKE 'eagle-thumbnail@1%'
                        OR preserved.generator_version LIKE 'billfish-thumbnail@1%'
                        OR preserved.generator_version LIKE '${IMPORTED_THUMBNAIL_GENERATOR_PREFIX}%'
                      )
                 )
            )`,
      )
      .run(nowInvalidate);
    }
    // Serpent-azf6: scenes scheduling with explicit ids (notably the visible
    // browse wave) also BOOST already-queued preview jobs of those assets —
    // the enqueue SQL below skips assets with an active job, so without this
    // the current view would stay behind a mutation flood that queued first.
    // Only raises priority (never lowers); dead/terminal jobs are untouched.
    if (selectedIds.length > 0 && options.priority !== undefined) {
      openLibrary.connection
        .prepare(
          `UPDATE jobs
              SET priority = MAX(priority, ?), updated_at = ?
            WHERE library_id = ?
              AND asset_id IN (${selectedIds.map(() => '?').join(',')})
              AND kind IN ('generate_thumbnail', 'generate_video_poster')
              AND status = 'queued'`,
        )
        .run(options.priority, new Date().toISOString(), libraryId, ...selectedIds);
    }
    const selectedSql = selectedIds.length > 0
      ? `AND a.asset_id IN (${selectedIds.map(() => '?').join(',')})`
      : '';
    // Serpent-2cc492（真实 NAS 生产库事故第二轮归因，2026-08-23）：offline
    // linked 文件夹的源不可达，其资产的缩略图任务必然以 SOURCE_NOT_FOUND
    // 失败——在 SMB 上每个失败还是一次 journal 写事务。7,164 个这样的任务
    // 就是持续数分钟的 Worker 风暴（实测把 startup 突发拖过 15s 超时）。
    // 入队阶段直接跳过；根恢复（offline→available）后下一个场景自动补上。
    const notOfflineLinkedFolderSql = `
            AND NOT EXISTS (
              SELECT 1 FROM linked_folders loff
               WHERE loff.folder_id = a.linked_folder_id
                 AND loff.status = 'offline'
            )`;
    const hiddenSequenceMemberSql = hasTable(openLibrary.connection, 'asset_sequence_frames')
      ? `
            AND NOT EXISTS (
              SELECT 1
                FROM asset_sequence_frames hidden_sequence_frame
               WHERE hidden_sequence_frame.asset_id = a.asset_id
                 AND hidden_sequence_frame.position > 0
            )`
      : '';
    const extensionSql = supportedExtensions
      .map(() => 'LOWER(a.relative_file_path) LIKE ?')
      .join(' OR ');
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
    const sourceDirectExtensionSql = SOURCE_DIRECT_IMAGE_EXTENSIONS
      .map(() => 'LOWER(a.relative_file_path) LIKE ?')
      .join(' OR ');
    const sourceDirectCandidateSql = artifactColumns.has('width') && artifactColumns.has('height')
      ? `
            AND NOT (
              (${sourceDirectExtensionSql})
              AND source_revision.byte_size BETWEEN 1 AND ${SOURCE_DIRECT_MAX_BYTES}
              AND EXISTS (
                SELECT 1 FROM revision_artifacts source_metadata
                 WHERE source_metadata.revision_id = a.current_revision_id
                   AND source_metadata.kind = 'extracted_metadata'
                   AND source_metadata.status = 'ready'
                   AND source_metadata.invalidated_at IS NULL
                   AND source_metadata.width > 0
                   AND source_metadata.height > 0
                   AND source_metadata.width <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                   AND source_metadata.height <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                   AND source_metadata.width * source_metadata.height <= ${SOURCE_DIRECT_MAX_PIXELS}
                 ORDER BY source_metadata.generated_at DESC
                 LIMIT 1
              )
            )`
      : '';
    const queryLimit = limit === undefined ? '' : 'LIMIT ?';
    // Serpent-xoaz: background fill (no assetIds) drains most-recently
    // imported assets first (created_at DESC, path as a deterministic
    // tiebreaker) instead of pure path-alphabetical order — the assets the
    // user just imported surface their thumbnails first, which is what a
    // fresh large import actually wants to see.
    // Serpent-x9xu follow-up: explicit-id waves (visible/mutation/linked)
    // must keep the CALLER's order — the browse list order is what the user
    // sees top-to-bottom, so re-sorting by created_at DESC made the bottom
    // of the viewport finish before the top. The SQL IN result is re-ordered
    // in JS by the caller's id sequence before the insert loop.
    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.current_revision_id, a.relative_file_path,
                source_revision.byte_size AS source_byte_size
                ${sourceDimensionColumns}
           FROM assets a
           JOIN revisions source_revision ON source_revision.revision_id = a.current_revision_id
          WHERE a.deleted_at IS NULL
            AND a.current_revision_id IS NOT NULL
            AND a.availability = 'available'
            ${selectedSql}
            ${notOfflineLinkedFolderSql}
            ${hiddenSequenceMemberSql}
            AND (${extensionSql})
            ${sourceDirectCandidateSql}
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts ra
              WHERE ra.revision_id = a.current_revision_id
                AND ra.kind IN ('thumbnail', 'video_poster')
                AND ra.status IN ('ready', 'failed')
                AND ra.invalidated_at IS NULL
            )
            AND NOT EXISTS (
              SELECT 1 FROM jobs j
              WHERE j.asset_id = a.asset_id
                AND j.kind = 'generate_thumbnail'
                AND j.status IN ('queued', 'running', 'paused')
            )
            AND NOT EXISTS (
              SELECT 1 FROM explicit_ignored_paths ip
               WHERE ip.location_kind = a.location_kind
                 AND ip.linked_folder_id = COALESCE(a.linked_folder_id, '')
                 AND (
                   (ip.path_kind = 'folder'
                     AND (ip.relative_path = ''
                          OR a.relative_file_path = ip.relative_path
                          OR LOWER(a.relative_file_path) LIKE LOWER(ip.relative_path) || '/%'))
                   OR (ip.path_kind = 'asset'
                       AND ip.relative_path = a.relative_file_path)
                   OR (ip.path_kind = 'extension'
                       AND LOWER(a.relative_file_path) LIKE '%.' || LOWER(ip.relative_path))
                 )
            )
            AND NOT EXISTS (
              SELECT 1 FROM gitignore_ignored_paths gi
               WHERE a.location_kind = 'managed'
                 AND gi.path_kind = 'asset'
                 AND gi.relative_path = a.relative_file_path
            )
          ORDER BY a.created_at DESC, a.relative_file_path
          ${queryLimit}`,
      )
      .all(
        ...selectedIds,
        ...supportedExtensions.map((extension) => `%.${extension}`),
        ...(artifactColumns.has('width') && artifactColumns.has('height')
          ? SOURCE_DIRECT_IMAGE_EXTENSIONS.map((extension) => `%${extension}`)
          : []),
        ...(limit === undefined ? [] : [limit]),
      ) as Array<{
        asset_id: string;
        current_revision_id: string;
        relative_file_path: string;
        source_byte_size: number;
        source_width: number | null;
        source_height: number | null;
      }>;
    if (selectedIds.length > 0) {
      // Serpent-x9xu follow-up: keep the caller's id order for explicit
      // waves so the user's top-of-viewport assets enqueue first.
      const order = new Map(selectedIds.map((id, index) => [id, index]));
      rows.sort(
        (left, right) =>
          (order.get(left.asset_id) ?? 0) - (order.get(right.asset_id) ?? 0),
      );
    }

    const now = new Date().toISOString();
    // Serpent-4bc4ac: ignored assets never enter the thumbnail queue.
    const schedulableIds = new Set(this.filterIgnoredAssetIds(
      libraryId,
      rows.map((row) => row.asset_id),
    ));
    const insert = openLibrary.connection.prepare(
      `INSERT OR IGNORE INTO jobs
         (job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
          attempt_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', ?, 0.0, 0, ?, ?)`,
    );

    for (const row of rows) {
      if (!schedulableIds.has(row.asset_id)) continue;
      const detectedMediaType = detectMediaType(row.relative_file_path);
      const mediaType = detectedMediaType === 'other'
        && this.claimsPluginThumbnail(libraryId, row.relative_file_path)
        ? 'image'
        : detectedMediaType;
      const sourceDirect = isSourceDirectPreview({
        fileName: row.relative_file_path,
        mediaType: toSummaryMediaType(mediaType),
        byteSize: row.source_byte_size,
        width: row.source_width,
        height: row.source_height,
      });
      const admission = admitArtifactJob({
        assetId: row.asset_id,
        revisionId: row.current_revision_id,
        currentRevisionId: row.current_revision_id,
        mediaType,
        jobKind: 'generate_thumbnail',
        availability: 'available',
        ignored: false,
        sourceDirect,
        retryFailed: options.retryFailed,
      });
      if (!admission.admitted) continue;
      const inserted = insert.run(
        randomUUID(), libraryId, row.asset_id, row.current_revision_id,
        options.priority ?? 0, now, now,
      );
      enqueued += inserted.changes;
    }

    if (options.skipStaleRepair) {
      // Light visible-window waves are only allowed to claim the primary
      // preview lane. Metadata, palette, proxy, and contact-sheet work is
      // secondary and must not make a scrollbar jump wait behind extra SQL
      // scans or newly queued derivatives.
      // Source-direct images do not create a primary thumbnail job, so queue
      // their bounded palette work here instead of waiting for the absent
      // thumbnail-completed event to fan it out.
      this.enqueueReadyPaletteJobs(openLibrary, {
        ...(options.assetIds === undefined ? {} : { assetIds: selectedIds }),
        ...(limit === undefined ? {} : { limit }),
        priority: options.priority ?? -10,
      });
      return enqueued;
    }

    // Video AI consumes the timestamped contact sheet, not the browsing
    // poster. Probe metadata is therefore its own durable, higher-priority
    // job (Serpent-140fe2: the contact sheet itself is generated lazily at
    // analysis time) while poster and WebM work continue independently.
    const videoMetadataRows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.current_revision_id
           FROM assets a
          WHERE a.deleted_at IS NULL
            AND a.current_revision_id IS NOT NULL
            AND a.availability = 'available'
            ${selectedSql}
            ${notOfflineLinkedFolderSql}
            AND (${videoExtensions.map(() => 'LOWER(a.relative_file_path) LIKE ?').join(' OR ')})
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
          ORDER BY a.created_at DESC, a.relative_file_path
          ${queryLimit}`,
      )
      .all(
        ...selectedIds,
        ...videoExtensions.map((extension) => `%.${extension}`),
        ...(limit === undefined ? [] : [limit]),
      ) as Array<{ asset_id: string; current_revision_id: string }>;
    if (selectedIds.length > 0) {
      const order = new Map(selectedIds.map((id, index) => [id, index]));
      videoMetadataRows.sort(
        (left, right) =>
          (order.get(left.asset_id) ?? 0) - (order.get(right.asset_id) ?? 0),
      );
    }
    for (const row of videoMetadataRows) {
      this.enqueueVideoMetadataJob(
        openLibrary,
        row.asset_id,
        row.current_revision_id,
        (options.priority ?? 0) + 50,
      );
    }

    // RAW card generation is deliberately independent from the EXIF/IPTC/XMP
    // parser. Keep the metadata admission bounded and lower priority so the
    // embedded-JPEG/OIIO card path is the first useful result after open.
    // Do not fold these secondary admissions into the thumbnail enqueue
    // count — callers and tests treat that number as generate_thumbnail rows.
    this.enqueueRawImageMetadataJobs(openLibrary, {
      ...(options.assetIds === undefined ? {} : { assetIds: selectedIds }),
      ...(limit === undefined ? {} : { limit }),
    });
    // JPEG/PNG/TIFF/WebP/AVIF metadata uses the same bounded exifr projection
    // as RAW files, but is admitted separately so the historical RAW backfill
    // cursor and retry policy remain compatible with existing libraries.
    this.enqueueRawImageMetadataJobs(openLibrary, {
      ...(options.assetIds === undefined ? {} : { assetIds: selectedIds }),
      ...(limit === undefined ? {} : { limit }),
      extensions: 'embedded',
    });

    // Native audio is source-first just like native video. Its waveform cover
    // and viewer strip are still generated above, but an Ogg playback proxy is
    // not useful until the browser actually reports a source decode failure.
    // The viewer requests `audio_proxy` explicitly on that failure path.

    // Serpent-140fe2: AI contact sheets are no longer proactively scheduled.
    // Their only consumer is on-demand AI video analysis, which now generates
    // the sheet lazily (ensureVideoContactSheet). Proactively generating them
    // flooded converted libraries with doomed FFmpeg batches on every open.

    // Existing ready thumbnails/posters (for example after reopening a library
    // created by an older build) receive their missing local palettes too.
    this.enqueueReadyPaletteJobs(openLibrary, options);

    return enqueued;
  }

  /** Requeue RAW failures caused by an old transform route or missing reader. */
  public override requeueLegacyRawColorTransformFailures(
    openLibrary: OpenLibrary,
    options: { assetIds: string[]; limit?: number },
  ): number {
    const selectedIds = options.assetIds;
    const selectedSql = selectedIds.length > 0
      ? `AND a.asset_id IN (${selectedIds.map(() => '?').join(',')})`
      : '';
    const extensionMatch = rawImageExtensionMatchSql(openLibrary.connection, 'a');
    const limitSql = options.limit === undefined ? '' : 'LIMIT ?';
    const rows = openLibrary.connection
      .prepare(
        `SELECT ra.artifact_id, a.relative_file_path
           FROM revision_artifacts ra
           JOIN assets a ON a.current_revision_id = ra.revision_id
          WHERE a.deleted_at IS NULL
            AND a.availability = 'available'
            AND ra.kind = 'thumbnail'
            AND ra.status = 'failed'
            AND ra.invalidated_at IS NULL
            AND (
              (
                ra.error_code = 'OIIO_COLOR_TRANSFORM_FAILED'
                AND COALESCE(ra.generator_version, '') NOT LIKE '%raw-default-srgb%'
              )
              OR ra.error_code = 'OIIO_GENERATION_FAILED'
            )
            ${selectedSql}
            AND ${extensionMatch.sql}
            AND NOT EXISTS (
              SELECT 1
                FROM jobs active
               WHERE active.asset_id = a.asset_id
                 AND active.revision_id = a.current_revision_id
                 AND active.kind = 'generate_thumbnail'
                 AND active.status IN ('queued', 'running', 'paused')
            )
          ORDER BY a.relative_file_path
          ${limitSql}`,
      )
      .all(
        ...selectedIds,
        ...extensionMatch.params,
        ...(options.limit === undefined ? [] : [options.limit]),
      ) as Array<{ artifact_id: string; relative_file_path: string }>;
    const rawRows = rows.filter((row) => isRawImageExtension(row.relative_file_path));
    if (rawRows.length === 0) return 0;

    const now = new Date().toISOString();
    const invalidate = openLibrary.connection.prepare(
      `UPDATE revision_artifacts
          SET invalidated_at = ?
        WHERE artifact_id = ?
          AND status = 'failed'
          AND invalidated_at IS NULL`,
    );
    let repaired = 0;
    openLibrary.connection.transaction(() => {
      for (const row of rawRows) {
        repaired += invalidate.run(now, row.artifact_id).changes;
      }
    })();
    return repaired;
  }

  /**
   * Process a bounded wave of media jobs. Returns the number of jobs processed
   * (success + failure + an in-flight pause/cancel).
   */
  override async processThumbnailQueue(
    libraryId: string,
    options: {
      maxJobs?: number;
      /** Restrict a pump to one media lane; omitted preserves full-queue behavior. */
      jobKinds?: readonly MediaJobKind[];
      /** Current viewport image cards may use the bounded interactive lane. */
      interactive?: boolean;
      /**
       * Mutable claim scope updated by the Worker when a newer visible window
       * arrives while this queue is awaiting native media work. Undefined
       * keeps the original queue-wide scope; an array limits future claims.
       */
      claimAssetIdsRef?: { current: readonly string[] | undefined };
      /**
       * Restrict a visible-window pump to the latest viewport asset ids.
       * Background pumps omit this so overlay `IN (...)` can fall back to the
       * persistent queue once those ids have no queued work.
       */
      assetIds?: readonly string[];
      /** Serpent-4bdd26 收编：Stop claiming more jobs when a newer queue scene supersedes this pump. */
      signal?: AbortSignal;
      onResult?: (result: {
        assetId: string;
        artifactId?: string;
        errorCode?: string;
        width?: number;
        height?: number;
        durationMs?: number;
        revisionId?: string;
        previewKind?: 'source' | null;
        previewRevisionId?: string | null;
      }) => void;
      /** Fired once a durable visual input is ready for automatic AI. */
      onAiInputReady?: (event: { assetId: string; artifactId: string }) => void;
      /** Notify the renderer when a secondary artifact changes Inspector data. */
      onDerivedReady?: (event: {
        assetId: string;
        kind: SecondaryMediaJobKind;
        width?: number;
        height?: number;
        durationMs?: number;
        revisionId?: string;
        previewKind?: 'source' | null;
        previewRevisionId?: string | null;
      }) => void;
      pluginMediaProvider?: (input: {
        assetId: string;
        signal: AbortSignal;
        asset?: {
          assetId: string;
          displayName: string;
          relativeFilePath: string;
          currentRevisionId: string;
        };
      }) => Promise<string | null>;
      /** Slice E: offscreen renderer for model assets (null keeps the legacy no-op). */
      modelThumbnailRenderer?: ModelThumbnailRenderer;
      /** Serpent-6w40: renders the AI four-view sheet via the offscreen page. */
      modelAiViewsRenderer?: (
        input: ModelThumbnailRendererInput,
      ) => Promise<ModelThumbnailRenderOutcome>;
    } = {},
  ): Promise<number> {
    if (options.modelAiViewsRenderer) {
      this.modelAiViewsRenderer = options.modelAiViewsRenderer;
    }
    const openLibrary = this.requireOpenLibrary(libraryId);
    this.cancelQueuedHiddenSequenceMemberJobs(openLibrary);
    this.repairUndisplayablePngThumbnails(openLibrary);
    const jobKinds = options.jobKinds ?? MEDIA_JOB_KINDS;
    if (jobKinds.length === 0) return 0;
    if (options.signal?.aborted) return 0;
    const processArtifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
    const claimSourceDimensionColumns = processArtifactColumns.has('width') && processArtifactColumns.has('height')
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
    const pumpAssetIds = options.assetIds === undefined
      ? undefined
      : [...new Set(options.assetIds)].slice(0, 100);
    const buildAssetClause = (assetIds: readonly string[] | undefined): string => assetIds === undefined
      ? ''
      : assetIds.length === 0
        ? 'AND 1 = 0'
        : `AND asset_id IN (${assetIds.map(() => '?').join(',')})`;
    const assetClause = buildAssetClause(pumpAssetIds);
    // Primary previews must not be held behind a secondary FFmpeg derivative
    // for the same revision. This matters even with a single FFmpeg decoder
    // slot: a proxy claimed first can hold that slot while the poster waits
    // forever for a user-visible result (the proxy may be waiting on an
    // encoder or a slow source). Metadata probes are intentionally excluded;
    // ffprobe is short-lived and the metadata lane must remain independent of
    // poster generation. The claim-time guard also covers the second queue
    // worker, which could otherwise see the primary as `running` and still
    // claim the secondary job concurrently. A proxy-only pump keeps its
    // explicit playback request independent of this browse-lane preference.
    const primaryPreviewKinds = new Set<MediaJobKind>([
      'generate_thumbnail',
      'generate_video_poster',
    ]);
    const secondaryFfmpegKinds = [
      'generate_contact_sheet',
      'generate_webm_proxy',
      'generate_audio_proxy',
    ] as const;
    const pendingSecondaryFfmpegJob = openLibrary.connection.prepare(
      `SELECT 1
         FROM jobs
        WHERE library_id = ?
          AND asset_id = ?
          AND revision_id = ?
          AND kind IN (${secondaryFfmpegKinds.map(() => '?').join(',')})
          AND status IN ('queued', 'running', 'paused')
        LIMIT 1`,
    );
    // A primary preview completing during this bounded wave must not
    // immediately unlock a proxy/contact-sheet job and consume the same
    // wave's remaining budget. Besides preserving the wave contract, this
    // keeps a newly visible page from turning one primary result into a
    // secondary FFmpeg chain before the next scheduling boundary. Jobs that
    // were already succeeded before this wave remain eligible; only a primary
    // row whose terminal update happened after the wave began is deferred.
    const waveStartedAtIso = new Date().toISOString();
    const deferSecondaryAfterPrimarySql = options.maxJobs !== undefined
      && jobKinds.some((kind) => primaryPreviewKinds.has(kind))
      ? `
          AND NOT (
            jobs.kind IN (${secondaryFfmpegKinds.map((kind) => `'${kind}'`).join(', ')})
            AND EXISTS (
              SELECT 1
                FROM jobs completed_primary
               WHERE completed_primary.library_id = jobs.library_id
                 AND completed_primary.asset_id = jobs.asset_id
                 AND completed_primary.revision_id = jobs.revision_id
                 AND completed_primary.kind IN ('generate_thumbnail', 'generate_video_poster')
                 AND completed_primary.status = 'succeeded'
                 AND completed_primary.updated_at >= ?
            )
          )`
      : '';
    const primaryPreviewClaimGuard = jobKinds.some((kind) => primaryPreviewKinds.has(kind))
      ? `
          AND (
            jobs.kind IN ('generate_thumbnail', 'generate_video_poster')
            OR jobs.kind NOT IN (${secondaryFfmpegKinds.map((kind) => `'${kind}'`).join(', ')})
            OR NOT EXISTS (
              SELECT 1
                FROM jobs primary_job
               WHERE primary_job.library_id = jobs.library_id
                 AND primary_job.asset_id = jobs.asset_id
                 AND primary_job.revision_id = jobs.revision_id
                 AND primary_job.kind IN ('generate_thumbnail', 'generate_video_poster')
                 AND primary_job.status IN ('queued', 'running', 'paused')
            )
          )`
      : '';

    // Existing libraries can contain durable thumbnail rows created before
    // the source-direct admission policy was introduced. Claim-time guards
    // keep those rows safe. An explicit visible/reconciliation asset scope
    // can additionally prune its queued rows before native work starts; a
    // queue-wide pre-scan is deliberately avoided because LIMIT would not
    // bound the JOIN work over a large history.
    if (jobKinds.some((kind) => primaryPreviewKinds.has(kind))) {
      const now = new Date().toISOString();
      const sourceDirectExtensionSql = SOURCE_DIRECT_IMAGE_EXTENSIONS
        .map((extension) => `LOWER(source_asset.relative_file_path) LIKE '%${extension}'`)
        .join(' OR ');
      if (
        pumpAssetIds !== undefined
        && processArtifactColumns.has('width')
        && processArtifactColumns.has('height')
      ) {
        const sourceDirectRows = pumpAssetIds.length === 0
          ? []
          : openLibrary.connection
          .prepare(
            `SELECT jobs.asset_id, jobs.revision_id, source_metadata.width, source_metadata.height
               FROM jobs
               JOIN assets source_asset
                 ON source_asset.asset_id = jobs.asset_id
                AND source_asset.current_revision_id = jobs.revision_id
               JOIN revisions source_revision
                 ON source_revision.revision_id = jobs.revision_id
               JOIN revision_artifacts source_metadata
                 ON source_metadata.revision_id = jobs.revision_id
                AND source_metadata.kind = 'extracted_metadata'
                AND source_metadata.status = 'ready'
                AND source_metadata.invalidated_at IS NULL
                AND source_metadata.width > 0
                AND source_metadata.height > 0
                AND source_metadata.width <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                AND source_metadata.height <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                AND source_metadata.width * source_metadata.height <= ${SOURCE_DIRECT_MAX_PIXELS}
              WHERE jobs.library_id = ?
                AND jobs.status = 'queued'
                AND jobs.kind = 'generate_thumbnail'
                AND COALESCE(jobs.error_code, '') <> '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
                AND jobs.asset_id IN (${pumpAssetIds.map(() => '?').join(',')})
                AND source_asset.deleted_at IS NULL
                AND source_asset.availability = 'available'
                AND source_revision.byte_size BETWEEN 1 AND ${SOURCE_DIRECT_MAX_BYTES}
                AND (${sourceDirectExtensionSql})`,
          )
          .all(libraryId, ...pumpAssetIds) as Array<{
            asset_id: string;
            revision_id: string;
            width: number;
            height: number;
          }>;
        openLibrary.connection
          .prepare(
            `UPDATE jobs
                SET status = 'cancelled', error_code = 'SOURCE_DIRECT', updated_at = ?
              WHERE library_id = ?
                AND status = 'queued'
                AND kind = 'generate_thumbnail'
                AND COALESCE(error_code, '') <> '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
                ${assetClause}
                AND EXISTS (
                  SELECT 1
                    FROM assets source_asset
                    JOIN revisions source_revision
                      ON source_revision.revision_id = source_asset.current_revision_id
                   WHERE source_asset.asset_id = jobs.asset_id
                     AND source_asset.current_revision_id = jobs.revision_id
                     AND source_asset.deleted_at IS NULL
                     AND source_asset.availability = 'available'
                     AND source_revision.byte_size > 0
                     AND source_revision.byte_size <= ${SOURCE_DIRECT_MAX_BYTES}
                     AND (${sourceDirectExtensionSql})
                     AND EXISTS (
                       SELECT 1
                         FROM revision_artifacts source_metadata
                        WHERE source_metadata.revision_id = jobs.revision_id
                          AND source_metadata.kind = 'extracted_metadata'
                          AND source_metadata.status = 'ready'
                          AND source_metadata.invalidated_at IS NULL
                          AND source_metadata.width > 0
                          AND source_metadata.height > 0
                          AND source_metadata.width <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                          AND source_metadata.height <= ${SOURCE_DIRECT_MAX_LONG_EDGE_PX}
                          AND source_metadata.width * source_metadata.height <= ${SOURCE_DIRECT_MAX_PIXELS}
                     )
                )`,
          )
          .run(now, libraryId, ...(pumpAssetIds ?? []));
        for (const row of sourceDirectRows) {
          options.onResult?.({
            assetId: row.asset_id,
            errorCode: 'SOURCE_DIRECT',
            width: row.width,
            height: row.height,
            revisionId: row.revision_id,
            previewKind: 'source',
            previewRevisionId: row.revision_id,
          });
        }
      }
      // Use the same media-aware policy as claim-time admission for both
      // thumbnail and video-poster jobs. `generate_thumbnail` produces
      // `video_poster` for videos; ready rows also need the current revision,
      // a live artifact row, and a generator family that is still current.
      // Imported normalization jobs, failed rows, and running jobs are left
      // to their existing paths.
      const readyArtifactJobKinds: ArtifactJobKind[] = [
        ...(jobKinds.includes('generate_thumbnail') ? ['generate_thumbnail' as const] : []),
        ...(jobKinds.includes('generate_video_poster') ? ['generate_video_poster' as const] : []),
      ];
      if (readyArtifactJobKinds.length > 0 && pumpAssetIds !== undefined) {
        // Claim pruning is intentionally limited to an explicit asset scope.
        // A queue-wide JOIN over a large history would still scan/sort that
        // history before LIMIT can help. The normal unscoped claim below is
        // already bounded by maxJobs and re-checks the same artifact policy
        // before decoder admission, so it converges ready rows one at a time
        // without a repeated queue-wide prune scan.
        const readyArtifactCandidateLimit = Math.max(
          1,
          Math.min(100, Math.trunc(options.maxJobs ?? workerMediaDecodeWaveSize())),
        );
        const readyArtifactJobs = openLibrary.connection
          .prepare(
            `SELECT jobs.job_id, jobs.kind AS job_kind,
                    ready_asset.relative_file_path, ready_artifact.kind AS artifact_kind,
                    ready_artifact.generator_version,
                    jobs.priority, jobs.created_at
               FROM jobs INDEXED BY jobs_asset_kind_status
               JOIN assets ready_asset
                 ON ready_asset.asset_id = jobs.asset_id
                AND ready_asset.current_revision_id = jobs.revision_id
               JOIN revision_artifacts ready_artifact
                 ON ready_artifact.revision_id = jobs.revision_id
                AND ready_artifact.kind IN ('thumbnail', 'video_poster')
                AND ready_artifact.status = 'ready'
                AND ready_artifact.invalidated_at IS NULL
              WHERE jobs.library_id = ?
                AND jobs.status = 'queued'
                AND jobs.kind IN (${readyArtifactJobKinds.map(() => '?').join(',')})
                AND COALESCE(jobs.error_code, '') <> '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
                ${pumpAssetIds === undefined
                  ? ''
                  : pumpAssetIds.length === 0
                    ? 'AND 1 = 0'
                    : `AND jobs.asset_id IN (${pumpAssetIds.map(() => '?').join(',')})`}
              ORDER BY jobs.priority DESC, jobs.created_at, jobs.job_id
              LIMIT ?`,
          )
          .all(
            libraryId,
            ...readyArtifactJobKinds,
            ...(pumpAssetIds ?? []),
            readyArtifactCandidateLimit,
          ) as Array<{
            job_id: string;
            job_kind: string;
            relative_file_path: string;
            artifact_kind: string;
            generator_version: string;
            priority: number;
            created_at: string;
          }>;
        const readyCurrentJobIds = [...new Set(
          readyArtifactJobs
            .filter((row) => {
              const mediaType = detectMediaType(row.relative_file_path);
              const artifactKind = artifactKindForJob(
                row.job_kind as ArtifactJobKind,
                mediaType,
              );
              return artifactKind === row.artifact_kind
                && (row.artifact_kind === 'thumbnail' || row.artifact_kind === 'video_poster')
                && this.primaryArtifactGeneratorIsCurrent(
                  row.relative_file_path,
                  row.artifact_kind,
                  row.generator_version,
                );
            })
            .map((row) => row.job_id),
        )];
        if (readyCurrentJobIds.length > 0) {
          openLibrary.connection.transaction(() => {
            for (let offset = 0; offset < readyCurrentJobIds.length; offset += 500) {
              const batch = readyCurrentJobIds.slice(offset, offset + 500);
              openLibrary.connection
                .prepare(
                  `UPDATE jobs
                      SET status = 'cancelled', error_code = 'ARTIFACT_READY', updated_at = ?
                    WHERE library_id = ?
                      AND status = 'queued'
                      AND job_id IN (${batch.map(() => '?').join(',')})`,
                )
                .run(now, libraryId, ...batch);
            }
          })();
        }
      }
    }
    // The visible wave is a latency budget, not a general FIFO pump. Video
    // posters share the primary job kind with images, but their FFmpeg path
    // is deliberately single-flight and can take materially longer. If a
    // video happens to be older than an image in the same viewport, claiming
    // it first consumes one of the interactive workers without improving the
    // image-card gate. Keep image jobs ahead of other primary media only for
    // the visible wave; background/import ordering remains unchanged.
    const interactiveImageFirstOrder = options.interactive
      ? `CASE WHEN jobs.kind = 'generate_thumbnail' AND EXISTS (
             SELECT 1
               FROM assets visible_asset
              WHERE visible_asset.asset_id = jobs.asset_id
                AND (${IMAGE_EXTENSIONS
                  .map((extension) => `LOWER(visible_asset.relative_file_path) LIKE '%${extension}'`)
                  .join(' OR ')})
           ) THEN 1 ELSE 0 END DESC, `
      : '';
    // Imported previews are already ready copies. Their low-priority
    // normalization must never consume a visible-wave slot just because the
    // visible asset has no missing primary job; leave it to the background
    // queue after the interaction window yields.
    const interactiveImportedNormalizationGuard = options.interactive
      ? `AND NOT (
          jobs.kind = 'generate_thumbnail'
          AND COALESCE(jobs.error_code, '') = '${IMPORTED_THUMBNAIL_NORMALIZATION_JOB}'
        )`
      : '';
    const hiddenSequenceClaimGuard = hasTable(openLibrary.connection, 'asset_sequence_frames')
      ? `AND NOT EXISTS (
            SELECT 1
              FROM asset_sequence_frames hidden_sequence_frame
             WHERE hidden_sequence_frame.asset_id = jobs.asset_id
               AND hidden_sequence_frame.position > 0
          )`
      : '';
    const nextJobQuery = (claimAssetIds: readonly string[] | undefined) => {
      const rankOrder = viewportClaimRankOrderSql(claimAssetIds);
      return openLibrary.connection.prepare(
      `SELECT job_id, asset_id, revision_id, kind, priority, attempt_count, error_code
         FROM jobs
        WHERE library_id = ?
          AND kind IN (${jobKinds.map(() => '?').join(',')})
          AND status = 'queued'
          ${buildAssetClause(claimAssetIds)}
          ${primaryPreviewClaimGuard}
          ${interactiveImportedNormalizationGuard}
          ${hiddenSequenceClaimGuard}
          ${deferSecondaryAfterPrimarySql}
          AND (
            error_code IS NULL
            OR error_code NOT IN ('JOB_LEASE_LOST', '${MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE}')
            OR updated_at <= ?
          )
        ORDER BY ${interactiveImageFirstOrder}${rankOrder.sql}priority DESC, created_at
        LIMIT 1`,
    );
    };
    const normalizedClaimAssetIds = (assetIds: readonly string[] | undefined): string[] | undefined =>
      assetIds === undefined ? undefined : uniqueAssetIdsInOrder(assetIds, VIEWPORT_CLAIM_ID_LIMIT);
    const claimAssetIdsKey = (assetIds: readonly string[] | undefined): string | undefined =>
      assetIds === undefined ? undefined : [...assetIds].toSorted().join('\u0000');
    let nextJobAssetIds: readonly string[] | undefined = pumpAssetIds;
    let nextJobAssetKey = claimAssetIdsKey(nextJobAssetIds);
    let nextJob = nextJobQuery(nextJobAssetIds);
    const executeClaimQuery = (): unknown => {
      const rankOrder = viewportClaimRankOrderSql(nextJobAssetIds);
      return nextJob.get(
        libraryId,
        ...jobKinds,
        ...(nextJobAssetIds ?? []),
        ...(deferSecondaryAfterPrimarySql === '' ? [] : [waveStartedAtIso]),
        new Date(Date.now() - MEDIA_RESOURCE_RETRY_DELAY_MS).toISOString(),
        ...rankOrder.params,
      );
    };
    const adoptClaimAssetIds = (assetIds: readonly string[] | undefined): void => {
      nextJobAssetIds = assetIds;
      nextJobAssetKey = claimAssetIdsKey(assetIds);
      nextJob = nextJobQuery(nextJobAssetIds);
    };
    const claimNextJob = (): unknown => {
      const requestedAssetIds = options.claimAssetIdsRef?.current ?? pumpAssetIds;
      const currentAssetIds = normalizedClaimAssetIds(requestedAssetIds);
      const currentAssetKey = claimAssetIdsKey(currentAssetIds);
      if (currentAssetKey !== nextJobAssetKey) {
        adoptClaimAssetIds(currentAssetIds);
      }
      const scoped = executeClaimQuery();
      if (
        scoped !== undefined
        || !shouldFallbackViewportClaimToPersistentQueue({
          interactive: options.interactive === true,
          restrictedByAssetIds: options.assetIds !== undefined,
          scopedClaimIds: nextJobAssetIds,
        })
      ) {
        return scoped;
      }
      if (options.claimAssetIdsRef) {
        options.claimAssetIdsRef.current = undefined;
      }
      adoptClaimAssetIds(undefined);
      return executeClaimQuery();
    };

    let processed = 0;
    const decodeConcurrency = options.interactive
      ? workerMediaInteractiveDecodeConcurrency()
      : workerMediaDecodeConcurrency();
    const maxJobs = Math.max(
      1,
      Math.min(100, options.maxJobs ?? workerMediaDecodeWaveSize()),
    );
    // Media jobs run with a small fixed queue worker count. The per-lane
    // Sharp/FFmpeg/OIIO decoder semaphores cap native pressure independently;
    // CPU topology must never expand the memory budget. The claim UPDATE is atomic
    // (WHERE status = 'queued'), so concurrent workers never double-execute a
    // job. `budget` is reserved synchronously at claim time (before any await),
    // so a wave starts at most maxJobs jobs exactly; a lease-busy retry
    // returns its slot.
    const workerCount = Math.min(maxJobs, decodeConcurrency);
    const waveStartedAt = performance.now();
    logMediaQueueEvent('wave-start', {
      libraryId,
      maxJobs,
      workerCount,
      jobKinds,
      assetCount: pumpAssetIds?.length ?? null,
    });
    let budget = maxJobs;
    const claimedJobIds = new Set<string>();
    const pauseClaimedMediaJobs = (): void => {
      const now = new Date().toISOString();
      for (const jobId of claimedJobIds) {
        openLibrary.connection
          .prepare(
            "UPDATE jobs SET status = 'queued', progress = 0.0, updated_at = ? WHERE job_id = ? AND status = 'running'",
          )
          .run(now, jobId);
        this.activeMediaJobs.get(jobId)?.controller.abort();
      }
    };
    options.signal?.addEventListener('abort', pauseClaimedMediaJobs, { once: true });
    const runWorker = async (): Promise<void> => {
      // Serpent-xoaz: the per-job terminal UPDATE is the hottest write in the
      // queue loop (one statement + one WAL commit per job). Batch it: each
      // worker collects the jobs that reached the success path and flushes a
      // single multi-row UPDATE when its wave budget is exhausted. The
      // `status = 'running'` guard is preserved, so a job cancelled/paused or
      // lease-lost between the final check and the flush is left untouched —
      // identical semantics to the old per-job UPDATE, far fewer commits.
      const completedJobIds: string[] = [];
      let consecutiveLeaseBusy = 0;
      let hasAttemptedClaim = false;
      const flushCompletedJobs = (): void => {
        if (completedJobIds.length === 0) return;
        const placeholders = sqliteInPlaceholders(completedJobIds);
        openLibrary.connection
          .prepare(
            `UPDATE jobs
                SET status = 'succeeded', progress = 1.0, error_code = NULL, error_detail = NULL, updated_at = ?
              WHERE job_id IN (${placeholders})
                AND status = 'running'`,
          )
          .run(new Date().toISOString(), ...completedJobIds);
        completedJobIds.length = 0;
      };
      try {
      while (budget > 0) {
      if (hasAttemptedClaim) {
        await yieldBetweenMediaClaims();
        // The sibling queue worker may have consumed the final shared budget
        // while this worker was yielding. Re-check after the await; otherwise
        // both workers can pass the stale `while (budget > 0)` condition and
        // claim one job too many.
        if (budget <= 0) return;
      }
      hasAttemptedClaim = true;
      if (options.signal?.aborted) return;
      if (mediaResourceGuard.isCoolingDown()) return;
      budget -= 1;
      const job = claimNextJob() as {
        job_id: string;
        asset_id: string;
        revision_id: string;
        kind: MediaJobKind;
        priority: number;
        attempt_count: number;
        error_code: string | null;
      } | undefined;
      if (!job) return;
      const now = new Date().toISOString();
      const claimed = openLibrary.connection
        .prepare(
          "UPDATE jobs SET status = 'running', attempt_count = ?, updated_at = ? WHERE job_id = ? AND status = 'queued'",
        )
        .run(job.attempt_count + 1, now, job.job_id);
      if (claimed.changes === 0) continue;
      claimedJobIds.add(job.job_id);
      const jobStartedAt = performance.now();
      logMediaQueueEvent('job-start', {
        libraryId,
        jobId: job.job_id,
        assetId: job.asset_id,
        kind: job.kind,
        priority: job.priority,
        budgetRemaining: budget,
      });
      const isImportedThumbnailNormalization =
        job.kind === 'generate_thumbnail'
        && job.error_code === IMPORTED_THUMBNAIL_NORMALIZATION_JOB;

      // Admission is checked again after the durable claim. Queue insertion
      // and claim are separate SQLite turns, so an ignore rule, delete, source
      // availability change, or revision replacement can happen in between.
      // This prevents stale/unsupported work from reaching Sharp/FFmpeg/OIIO.
      const claimAsset = openLibrary.connection
        .prepare(
          `SELECT location_kind, linked_folder_id, relative_file_path,
                  current_revision_id, availability, deleted_at,
                  source_revision.byte_size AS source_byte_size
                  ${claimSourceDimensionColumns}
             FROM assets a
             LEFT JOIN revisions source_revision
               ON source_revision.revision_id = a.current_revision_id
            WHERE a.asset_id = ?`,
        )
        .get(job.asset_id) as {
          location_kind: 'managed' | 'linked';
          linked_folder_id: string | null;
          relative_file_path: string;
          current_revision_id: string | null;
          availability: 'available' | 'missing';
          deleted_at: string | null;
          source_byte_size: number | null;
          source_width: number | null;
          source_height: number | null;
        } | undefined;
      const detectedClaimMediaType = claimAsset
        ? detectMediaType(claimAsset.relative_file_path)
        : 'other';
      // Plugin-owned formats stay `other` for the viewer and native decoders.
      // Admission still needs an image thumbnail role so the provider can run.
      const claimMediaType = claimAsset
        && detectedClaimMediaType === 'other'
        && this.claimsPluginThumbnail(libraryId, claimAsset.relative_file_path)
        ? 'image'
        : detectedClaimMediaType;
      const claimSourceDirect = claimAsset
        ? isSourceDirectPreview({
            fileName: claimAsset.relative_file_path,
            mediaType: toSummaryMediaType(claimMediaType),
            byteSize: claimAsset.source_byte_size ?? 0,
            width: claimAsset.source_width,
            height: claimAsset.source_height,
          })
        : false;
      const claimIgnored = claimAsset
        ? this.isExplicitlyIgnored(
          openLibrary,
          claimAsset.location_kind,
          claimAsset.linked_folder_id,
          claimAsset.relative_file_path,
          'asset',
        )
        : false;
      const claimArtifactKind = artifactKindForJob(
        job.kind as ArtifactJobKind,
        claimMediaType,
      );
      const currentArtifact = claimAsset?.current_revision_id === job.revision_id
        && claimArtifactKind
          ? openLibrary.connection
            .prepare(
            `SELECT status, generator_version FROM revision_artifacts
               WHERE revision_id = ? AND kind = ? AND invalidated_at IS NULL
               LIMIT 1`,
            )
            .get(job.revision_id, claimArtifactKind) as {
              status: string;
              generator_version: string;
            } | undefined
        : undefined;
      const currentPrimaryArtifactIsCurrent = currentArtifact
        && currentArtifact.status === 'ready'
        && (claimArtifactKind === 'thumbnail' || claimArtifactKind === 'video_poster')
        ? this.primaryArtifactGeneratorIsCurrent(
          claimAsset?.relative_file_path ?? '',
          claimArtifactKind,
          currentArtifact.generator_version,
        )
        : true;
      const headerOnlyImageMetadata = job.kind === 'extract_metadata'
        && claimMediaType === 'image'
        && currentArtifact?.status === 'ready'
        && currentArtifact.generator_version.startsWith('image-header@');
      const siblingJob = openLibrary.connection
        .prepare(
          `SELECT 1 FROM jobs
             WHERE asset_id = ? AND revision_id = ? AND kind = ?
               AND job_id != ? AND status IN ('queued', 'running', 'paused')
             LIMIT 1`,
        )
        .get(job.asset_id, job.revision_id, job.kind, job.job_id);
      const claimAdmission = admitArtifactJob({
        assetId: job.asset_id,
        revisionId: job.revision_id,
        currentRevisionId: claimAsset?.current_revision_id ?? null,
        mediaType: claimMediaType,
        jobKind: job.kind as ArtifactJobKind,
        availability: claimAsset?.availability ?? 'missing',
        deleted: claimAsset === undefined || claimAsset.deleted_at !== null,
        ignored: claimIgnored,
        // A normalization job intentionally runs while the copied artifact is
        // still ready and while the source may qualify for source-direct
        // serving. It owns a replacement transaction, not a new primary row.
        sourceDirect: isImportedThumbnailNormalization ? false : claimSourceDirect,
        // A durable proxy row is created only by the explicit viewer fallback
        // path. Legacy automatic rows are rejected by the policy instead of
        // being allowed to consume another FFmpeg slot.
        explicitRequest: job.error_code === EXPLICIT_PROXY_FALLBACK_MARKER,
        readyArtifact: isImportedThumbnailNormalization
          ? false
          : currentArtifact?.status === 'ready'
            && !headerOnlyImageMetadata
            && currentPrimaryArtifactIsCurrent,
        failedArtifact: currentArtifact?.status === 'failed',
        retryFailed: true,
        activeJob: siblingJob !== undefined,
      });
      if (!claimAdmission.admitted) {
        const errorCode = claimAdmission.reason === 'ignored'
          ? 'ASSET_IGNORED'
          : claimAdmission.reason === 'stale-revision'
            ? 'STALE_REVISION'
            : claimAdmission.reason === 'already-ready'
              ? 'ARTIFACT_READY'
              : claimAdmission.reason === 'source-direct'
                ? 'SOURCE_DIRECT'
                : claimAdmission.reason === 'single-flight'
                  ? 'SINGLE_FLIGHT'
                  : claimAdmission.reason === 'unavailable'
                    ? 'SOURCE_NOT_FOUND'
                    : claimAdmission.reason === 'deleted'
                      ? 'ASSET_DELETED'
                      : 'ARTIFACT_NOT_ADMITTED';
        openLibrary.connection
          .prepare(
            "UPDATE jobs SET status = 'cancelled', error_code = ?, updated_at = ? WHERE job_id = ? AND status = 'running'",
          )
          .run(errorCode, new Date().toISOString(), job.job_id);
        if (
          claimAdmission.reason === 'source-direct'
          && claimAsset?.current_revision_id === job.revision_id
          && claimAsset.source_width != null
          && claimAsset.source_height != null
        ) {
          options.onResult?.({
            assetId: job.asset_id,
            errorCode: 'SOURCE_DIRECT',
            width: claimAsset.source_width,
            height: claimAsset.source_height,
            revisionId: job.revision_id,
            previewKind: 'source',
            previewRevisionId: job.revision_id,
          });
        }
        processed += 1;
        continue;
      }

      let jobLease: LibraryJobLease;
      try {
        // Serpent-308675: media jobs run under full-decoder CPU saturation.
        // A 15s lease expired whenever the event loop stalled, producing
        // lease-lost failures + repair retries that added MORE load. 60s
        // tolerates ~3 missed 20s heartbeats before anyone steals the job.
        jobLease = await this.acquireJobLease(libraryId, job.job_id, {
          timeoutMs: 0,
          leaseDurationMs: MEDIA_JOB_LEASE_DURATION_MS,
        });
        logMediaQueueEvent('job-lease-acquired', {
          libraryId,
          jobId: job.job_id,
          assetId: job.asset_id,
          kind: job.kind,
          elapsedMs: Math.round((performance.now() - jobStartedAt) * 100) / 100,
        });
      } catch (error) {
        if (!(error instanceof LibraryWriteCoordinatorError)) throw error;
        const retryErrorCode = job.kind === 'generate_thumbnail'
          && job.error_code === IMPORTED_THUMBNAIL_NORMALIZATION_JOB
          ? IMPORTED_THUMBNAIL_NORMALIZATION_JOB
          : 'JOB_LEASE_BUSY';
        openLibrary.connection.prepare(
          'UPDATE jobs SET status = \'queued\', error_code = ?, updated_at = ? WHERE job_id = ? AND status = \'running\'',
        ).run(retryErrorCode, new Date().toISOString(), job.job_id);
        budget += 1;
        // Serpent-308675 adversarial-review fix: timeoutMs:0 makes claimJob
        // throw immediately, and the reset-to-queued above means the same
        // top-priority job is re-selected on the next iteration — a hot
        // microtask spin that starves every other Worker command for as long
        // as a foreign lease lives. Yield briefly and cap consecutive spins.
        consecutiveLeaseBusy += 1;
        if (consecutiveLeaseBusy >= 4) {
          await new Promise((resolveResolveTick) => setTimeout(resolveResolveTick, 250));
          consecutiveLeaseBusy = 0;
        }
        continue;
      }
      consecutiveLeaseBusy = 0;
      const jobHeartbeat = jobLease.startHeartbeat({
        leaseDurationMs: MEDIA_JOB_LEASE_DURATION_MS,
      });
      const controller = new AbortController();
      const previousArtifacts = this.mediaArtifactSnapshot(openLibrary, job.revision_id);
      const providerAssetRow = openLibrary.connection
        .prepare(
          `SELECT a.relative_file_path, r.byte_size
             FROM assets a
             JOIN revisions r ON r.revision_id = a.current_revision_id
            WHERE a.asset_id = ?`,
        )
        .get(job.asset_id) as { relative_file_path: string; byte_size: number | null } | undefined;
      let settleActiveJob!: () => void;
      const settled = new Promise<void>((resolve) => {
        settleActiveJob = resolve;
      });
      this.activeMediaJobs.set(job.job_id, {
        controller,
        libraryId,
        assetId: job.asset_id,
        settled,
      });

      try {
        if (job.kind === 'generate_thumbnail' || job.kind === 'generate_video_poster') {
          // A primary job can outlive the source revision that created it
          // (for example, an external change can land while a proxy is
          // waiting). Do not let the primary lane regenerate the *current*
          // revision under a stale job row; cancel it before any decoder
          // starts so secondary jobs can make the same stale-revision
          // decision on this pump.
          const currentRevision = openLibrary.connection
            .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
            .get(job.asset_id) as { current_revision_id: string | null } | undefined;
          if (!currentRevision?.current_revision_id || currentRevision.current_revision_id !== job.revision_id) {
            openLibrary.connection.prepare(
              "UPDATE jobs SET status = 'cancelled', error_code = 'STALE_REVISION', updated_at = ? WHERE job_id = ? AND status = 'running'",
            ).run(new Date().toISOString(), job.job_id);
            processed += 1;
            continue;
          }
          const pluginArtifactId = !isImportedThumbnailNormalization && options.pluginMediaProvider
            ? await options.pluginMediaProvider({
              assetId: job.asset_id,
              signal: controller.signal,
              ...(providerAssetRow === undefined ? {} : {
                asset: {
                  assetId: job.asset_id,
                  displayName: path.basename(providerAssetRow.relative_file_path),
                  relativeFilePath: providerAssetRow.relative_file_path,
                  currentRevisionId: job.revision_id,
                },
              }),
            })
            : null;
          const generated = isImportedThumbnailNormalization
            ? await this.normalizeImportedThumbnailArtifact(
                openLibrary,
                {
                  assetId: job.asset_id,
                  revisionId: job.revision_id,
                },
                { signal: controller.signal },
              )
            : pluginArtifactId
              ? { artifactId: pluginArtifactId }
              : providerAssetRow !== undefined
                  && detectMediaType(providerAssetRow.relative_file_path) === 'model'
                ? await this.processModelThumbnailJob(
                    openLibrary,
                    {
                      libraryId,
                      assetId: job.asset_id,
                      revisionId: job.revision_id,
                      relativeFilePath: providerAssetRow.relative_file_path,
                      byteSize: providerAssetRow.byte_size,
                    },
                    {
                      renderer: options.modelThumbnailRenderer,
                      signal: controller.signal,
                    },
                  )
                : await this.generateThumbnail(
                  { libraryId, assetId: job.asset_id },
                  {
                    signal: controller.signal,
                    includeVideoMetadata: false,
                    includeRawMetadata: false,
                    sourceByteSize: claimAsset?.source_byte_size,
                    sourceWidth: claimAsset?.source_width,
                    sourceHeight: claimAsset?.source_height,
                    // Only image jobs use the interactive image lane. The
                    // lane is selected by user intent, never by source size,
                    // dimensions, or detected machine capacity.
                    lane: options.interactive
                      && claimMediaType === 'image'
                      ? 'interactive'
                      : 'background',
                  },
                );
          logMediaQueueEvent('job-generated', {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            kind: job.kind,
            elapsedMs: Math.round((performance.now() - jobStartedAt) * 100) / 100,
          });
          if (controller.signal.aborted || this.mediaJobState(libraryId, job.job_id) !== 'running') {
            this.discardLateMediaArtifacts(openLibrary, job.revision_id, previousArtifacts, {
              libraryId,
              jobId: job.job_id,
              assetId: job.asset_id,
              preserveLateArtifacts: isImportedThumbnailNormalization,
            });
            processed += 1;
            continue;
          }
          // Native audio stays source-first after its waveform cover is ready.
          // Playback proxies are requested only by the renderer's explicit
          // source-decode failure path (`retryArtifact(audio_proxy)`).
          // Serpent-43d32f: animated GIFs no longer chain a WebM proxy off the
          // still thumbnail; they stay on the native image path everywhere.
          this.enqueuePaletteJob(openLibrary, job.asset_id, job.revision_id, -10);
          // generated stays null when the offscreen renderer failed with a
          // benign outcome (the failed artifact was already written and the
          // job was marked failed by the catch path) or when no renderer is
          // wired (legacy no-op); nothing is published either way.
          if (generated) {
            const mediaInfo = this.thumbnailArtifactMap(libraryId, [job.asset_id]).get(job.asset_id);
            options.onResult?.({
              assetId: job.asset_id,
              artifactId: generated.artifactId,
              ...(mediaInfo?.width ? { width: mediaInfo.width } : {}),
              ...(mediaInfo?.height ? { height: mediaInfo.height } : {}),
              ...(mediaInfo?.durationMs != null ? { durationMs: mediaInfo.durationMs } : {}),
            });
          }
        } else if (job.kind === 'extract_metadata') {
          const current = claimMediaType === 'image'
            ? await this.generateQueuedRawImageMetadata(
              libraryId,
              job.asset_id,
              job.revision_id,
              {
                signal: controller.signal,
                sourceWidth: claimAsset?.source_width,
                sourceHeight: claimAsset?.source_height,
              },
            )
            : await this.generateQueuedVideoMetadata(
              libraryId, job.asset_id, job.revision_id, { signal: controller.signal },
            );
          if (!current) {
            openLibrary.connection.prepare(
              "UPDATE jobs SET status = 'cancelled', error_code = 'STALE_REVISION', updated_at = ? WHERE job_id = ?",
            ).run(new Date().toISOString(), job.job_id);
            processed += 1;
            continue;
          }
          // Serpent-140fe2: contact sheets are generated on demand by AI video
          // analysis (ensureVideoContactSheet), not chained off metadata.
        } else if (job.kind === 'extract_palette') {
          if (!this.isPaletteEligibleAsset(openLibrary, job.asset_id, job.revision_id)) {
            openLibrary.connection.prepare(
              "UPDATE jobs SET status = 'cancelled', error_code = 'PALETTE_NOT_APPLICABLE', updated_at = ? WHERE job_id = ?",
            ).run(new Date().toISOString(), job.job_id);
            processed += 1;
            continue;
          }
          const current = await this.generateQueuedPaletteArtifact(
            libraryId,
            job.asset_id,
            job.revision_id,
            { signal: controller.signal },
          );
          if (!current) {
            openLibrary.connection.prepare(
              "UPDATE jobs SET status = 'cancelled', error_code = 'STALE_REVISION', updated_at = ? WHERE job_id = ?",
            ).run(new Date().toISOString(), job.job_id);
            processed += 1;
            continue;
          }
        } else if (job.kind === 'generate_audio_proxy') {
          const current = await this.generateQueuedAudioProxy(
            libraryId, job.asset_id, job.revision_id, { signal: controller.signal },
          );
          if (!current) {
            openLibrary.connection.prepare(
              "UPDATE jobs SET status = 'cancelled', error_code = 'STALE_REVISION', updated_at = ? WHERE job_id = ?",
            ).run(new Date().toISOString(), job.job_id);
            processed += 1;
            continue;
          }
        } else {
          const current = await this.generateQueuedVideoArtifact(
            libraryId, job.asset_id, job.revision_id, job.kind,
            { signal: controller.signal },
          );
          if (!current) {
            openLibrary.connection.prepare(
              "UPDATE jobs SET status = 'cancelled', error_code = 'STALE_REVISION', updated_at = ? WHERE job_id = ?",
            ).run(new Date().toISOString(), job.job_id);
            processed += 1;
            continue;
          }
        }
        if (controller.signal.aborted || this.mediaJobState(libraryId, job.job_id) !== 'running') {
          this.discardLateMediaArtifacts(openLibrary, job.revision_id, previousArtifacts, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            preserveLateArtifacts: isImportedThumbnailNormalization,
          });
          processed += 1;
          continue;
        }
          jobLease.assertCurrent();
        mediaResourceGuard.recordHealthyCompletion();
        if (!primaryPreviewKinds.has(job.kind)) {
          let derivedWidth: number | undefined;
          let derivedHeight: number | undefined;
          let derivedDurationMs: number | undefined;
          let sourceDirectRoute: {
            previewKind: 'source' | null;
            previewRevisionId: string | null;
          } | undefined;
          if (job.kind === 'extract_metadata' && processArtifactColumns.has('width')) {
            const durationSelect = processArtifactColumns.has('duration_ms')
              ? ', duration_ms'
              : '';
            const extracted = openLibrary.connection
              .prepare(
                `SELECT width, height${durationSelect}
                   FROM revision_artifacts
                  WHERE revision_id = ?
                    AND kind = 'extracted_metadata'
                    AND status = 'ready'
                    ${processArtifactColumns.has('invalidated_at') ? 'AND invalidated_at IS NULL' : ''}
                  ORDER BY generated_at DESC, artifact_id DESC
                  LIMIT 1`,
              )
              .get(job.revision_id) as {
                width: number | null;
                height: number | null;
                duration_ms?: number | null;
              } | undefined;
            if (extracted?.width && extracted.width > 0) derivedWidth = extracted.width;
            if (extracted?.height && extracted.height > 0) derivedHeight = extracted.height;
            if (extracted?.duration_ms != null && extracted.duration_ms >= 0) {
              derivedDurationMs = extracted.duration_ms;
            }
            if (claimAsset) {
              const sourceDirect = isSourceDirectPreview({
                fileName: claimAsset.relative_file_path,
                mediaType: toSummaryMediaType(claimMediaType),
                byteSize: claimAsset.source_byte_size ?? 0,
                width: extracted?.width,
                height: extracted?.height,
              });
              sourceDirectRoute = {
                previewKind: sourceDirect ? 'source' : null,
                previewRevisionId: sourceDirect ? job.revision_id : null,
              };
            }
          }
          options.onDerivedReady?.({
            assetId: job.asset_id,
            kind: job.kind as SecondaryMediaJobKind,
            ...(derivedWidth === undefined ? {} : { width: derivedWidth }),
            ...(derivedHeight === undefined ? {} : { height: derivedHeight }),
            ...(derivedDurationMs === undefined ? {} : { durationMs: derivedDurationMs }),
            ...(job.kind !== 'extract_metadata'
              ? {}
              : {
                revisionId: job.revision_id,
                previewKind: sourceDirectRoute?.previewKind ?? null,
                previewRevisionId: sourceDirectRoute?.previewRevisionId ?? null,
              }),
          });
        }
        // Serpent-xoaz: deferred to the worker's batched flush (see
        // flushCompletedJobs) — one multi-row UPDATE per worker instead of
        // one statement + WAL commit per job.
        completedJobIds.push(job.job_id);
        // A directly requested proxy/contact sheet is allowed to run in a
        // separate bounded lane, but its claim guard must see the poster's
        // terminal state. Flush only for this same-asset dependency; ordinary
        // image batches retain the one-flush-per-worker write behavior.
        if (
          primaryPreviewKinds.has(job.kind)
          && pendingSecondaryFfmpegJob.get(
            libraryId,
            job.asset_id,
            job.revision_id,
            ...secondaryFfmpegKinds,
          ) !== undefined
        ) {
          flushCompletedJobs();
        }
        if (job.kind === 'generate_contact_sheet') {
          const contactSheet = this.getCurrentArtifact(libraryId, job.asset_id, 'contact_sheet');
          if (contactSheet?.status === 'ready' && this.shouldAutoAnalyzeAsset(libraryId, job.asset_id)) {
            options.onAiInputReady?.({
              assetId: job.asset_id,
              artifactId: contactSheet.artifactId,
            });
          }
        } else if (job.kind === 'generate_thumbnail') {
          // Model AI uses a four-view render rather than the browse thumbnail,
          // but a successful model thumbnail proves that the offscreen model
          // renderer is initialized. Re-trigger the import-time AI enqueue at
          // this boundary so a race cannot leave the model job unprocessed.
          const asset = openLibrary.connection
            .prepare('SELECT relative_file_path FROM assets WHERE asset_id = ?')
            .get(job.asset_id) as { relative_file_path: string } | undefined;
          if (asset && detectMediaType(asset.relative_file_path) === 'model') {
            const thumbnail = this.getCurrentArtifact(libraryId, job.asset_id, 'thumbnail');
            if (thumbnail?.status === 'ready' && this.shouldAutoAnalyzeAsset(libraryId, job.asset_id)) {
              options.onAiInputReady?.({
                assetId: job.asset_id,
                artifactId: thumbnail.artifactId,
              });
            }
          }
        }
      } catch (error) {
        if (isStaleMediaRevisionError(error)) {
          this.discardLateMediaArtifacts(openLibrary, job.revision_id, previousArtifacts, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
          });
          openLibrary.connection.prepare(
            `UPDATE jobs
                SET status = 'cancelled', error_code = 'STALE_REVISION',
                    error_detail = ?, updated_at = ?
              WHERE job_id = ? AND status = 'running'`,
          ).run(
            safeMediaJobErrorDetail('STALE_REVISION'),
            new Date().toISOString(),
            job.job_id,
          );
          this.diagnose('media-job.stale-revision', error, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            kind: job.kind,
          });
          processed += 1;
          continue;
        }
        const resourceError = asMediaResourceExhaustedError(error, 'media-job');
        if (resourceError) {
          this.discardLateMediaArtifacts(openLibrary, job.revision_id, previousArtifacts, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            preserveLateArtifacts: isImportedThumbnailNormalization,
          });
          const cooldownMs = mediaResourceGuard.recordFailure();
          const retryErrorCode = isImportedThumbnailNormalization
            ? IMPORTED_THUMBNAIL_NORMALIZATION_JOB
            : (
              (job.kind === 'generate_webm_proxy' || job.kind === 'generate_audio_proxy')
              && job.error_code === EXPLICIT_PROXY_FALLBACK_MARKER
            )
              ? EXPLICIT_PROXY_FALLBACK_MARKER
              : MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE;
          openLibrary.connection.prepare(
            `UPDATE jobs
                SET status = 'queued', error_code = ?,
                    error_detail = ?, updated_at = ?
              WHERE job_id = ? AND status = 'running'`,
          ).run(
            retryErrorCode,
            safeMediaJobErrorDetail(MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE),
            new Date().toISOString(),
            job.job_id,
          );
          this.diagnose('media-job.resource-exhausted', resourceError, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            kind: job.kind,
            cooldownMs,
          });
          processed += 1;
          continue;
        }
        if (jobHeartbeat.error !== undefined || error instanceof LibraryWriteCoordinatorError) {
          this.discardLateMediaArtifacts(openLibrary, job.revision_id, previousArtifacts, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            preserveLateArtifacts: isImportedThumbnailNormalization,
          });
          // Lease loss must not leave the job stuck in `running`; requeue so a
          // later wave (or process restart recovery) can claim it again.
          const retryErrorCode = isImportedThumbnailNormalization
            ? IMPORTED_THUMBNAIL_NORMALIZATION_JOB
            : (
              (job.kind === 'generate_webm_proxy' || job.kind === 'generate_audio_proxy')
              && job.error_code === EXPLICIT_PROXY_FALLBACK_MARKER
            )
              ? EXPLICIT_PROXY_FALLBACK_MARKER
              : 'JOB_LEASE_LOST';
          openLibrary.connection.prepare(
            "UPDATE jobs SET status = 'queued', error_code = ?, updated_at = ? WHERE job_id = ? AND status = 'running'",
          ).run(retryErrorCode, new Date().toISOString(), job.job_id);
          this.diagnose('media-job.lease-lost', error, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            kind: job.kind,
          });
          processed += 1;
          continue;
        }
        const state = this.mediaJobState(libraryId, job.job_id);
        if (controller.signal.aborted || state === 'paused' || state === 'cancelled') {
          this.discardLateMediaArtifacts(openLibrary, job.revision_id, previousArtifacts, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            preserveLateArtifacts: isImportedThumbnailNormalization,
          });
          this.diagnose('media-job.interrupted', error, {
            libraryId,
            jobId: job.job_id,
            assetId: job.asset_id,
            kind: job.kind,
            status: state,
          });
          processed += 1;
          continue;
        }
        const failedKind = job.kind === 'extract_palette'
          ? 'extracted_palette'
          : job.kind === 'extract_metadata'
            ? 'extracted_metadata'
          : job.kind === 'generate_contact_sheet'
            ? 'contact_sheet'
          : job.kind === 'generate_webm_proxy'
            ? 'webm_proxy'
            : job.kind === 'generate_audio_proxy'
              ? 'audio_proxy'
              : null;
        const failedArtifact = openLibrary.connection
          .prepare(
            `SELECT error_code FROM revision_artifacts
              WHERE revision_id = ? AND invalidated_at IS NULL AND status = 'failed'
                AND (? IS NULL OR kind = ?)
              ORDER BY generated_at DESC LIMIT 1`,
          )
          .get(job.revision_id, failedKind, failedKind) as { error_code: string | null } | undefined;
        const errorCode = isImportedThumbnailNormalization
          ? IMPORTED_THUMBNAIL_NORMALIZATION_JOB
          : job.kind === 'extract_metadata' && claimMediaType === 'image'
            ? 'RAW_METADATA_EXTRACTION_FAILED'
            : failedArtifact?.error_code
              ?? (job.kind === 'generate_thumbnail'
                ? 'THUMBNAIL_GENERATION_FAILED'
                : job.kind === 'extract_palette'
                  ? 'PALETTE_EXTRACTION_FAILED'
                  : 'MEDIA_PROCESSING_FAILED');
        openLibrary.connection
          .prepare(
            `UPDATE jobs
                SET status = 'failed', error_code = ?, error_detail = ?, updated_at = ?
              WHERE job_id = ? AND status = 'running'`,
          )
          .run(
            errorCode,
            safeMediaJobErrorDetail(errorCode),
            new Date().toISOString(),
            job.job_id,
          );
        this.diagnose('media-job.failed', error, {
          libraryId,
          jobId: job.job_id,
          assetId: job.asset_id,
          kind: job.kind,
          attemptCount: job.attempt_count + 1,
          errorCode,
        });
        if (job.kind === 'generate_thumbnail' || job.kind === 'generate_video_poster') {
          const mediaInfo = this.thumbnailArtifactMap(libraryId, [job.asset_id]).get(job.asset_id);
          options.onResult?.({
            assetId: job.asset_id,
            errorCode,
            ...(mediaInfo?.width ? { width: mediaInfo.width } : {}),
            ...(mediaInfo?.height ? { height: mediaInfo.height } : {}),
          });
        }
      } finally {
        logMediaQueueEvent('job-finish', {
          libraryId,
          jobId: job.job_id,
          assetId: job.asset_id,
          kind: job.kind,
          elapsedMs: Math.round((performance.now() - jobStartedAt) * 100) / 100,
        });
        jobHeartbeat.stop();
        jobLease.release();
        this.activeMediaJobs.delete(job.job_id);
        claimedJobIds.delete(job.job_id);
        settleActiveJob();
      }
      processed += 1;
      if (processed >= maxJobs) return;
      }
      } finally {
        // Flush this worker's completed jobs before the wave returns so
        // callers/tests observe terminal `succeeded` state immediately.
        flushCompletedJobs();
      }
    };
    try {
      await Promise.all(Array.from({ length: workerCount }, () => runWorker()));
    } finally {
      options.signal?.removeEventListener('abort', pauseClaimedMediaJobs);
    }

    logMediaQueueEvent('wave-finish', {
      libraryId,
      processed,
      elapsedMs: Math.round((performance.now() - waveStartedAt) * 100) / 100,
    });

    return processed;
  }

  /** Return current image-thumbnail or video-poster state for asset summaries. */
  public override thumbnailArtifactMap(
    libraryId: string,
    assetIds: string[],
  ): Map<string, {
    status: 'ready' | 'pending' | 'failed' | null;
    artifactId: string | null;
    width: number | null;
    height: number | null;
    durationMs: number | null;
  }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    if (assetIds.length === 0) return new Map();
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating
    // revision_artifacts.status have no thumbnail artifacts to map.
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) {
      return new Map();
    }
    return readCatalogThumbnailArtifacts(openLibrary.connection, assetIds);
  }

  /** Return only statuses for callers that do not need artifact ids. */
  public override thumbnailStatusMap(
    libraryId: string,
    assetIds: string[],
  ): Map<string, 'ready' | 'pending' | 'failed' | null> {
    return new Map(
      [...this.thumbnailArtifactMap(libraryId, assetIds)]
        .map(([assetId, artifact]) => [assetId, artifact.status]),
    );
  }

}
