/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { MediaExecutionContext, OpenLibrary} from '../library-service-internals';
import { AUDIO_WAVEFORM_GENERATOR, LibraryServiceError, requireSharp, runSharpDecoder } from '../library-service-internals';
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
import { LibraryServiceAudio } from './LibraryServiceAudio';

/** LibraryServiceVideo: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceVideo extends LibraryServiceAudio {

  // ── Audio artifacts (ffprobe + waveform thumbnail) ─────────────────

  /**
   * Audio path (Serpent-0x5 / Serpent-690060): extract metadata, then store a
   * grid `thumbnail` from embedded album art when present, otherwise a
   * waveform PNG. Viewer strip stays a wide waveform (`video_poster`).
   * Playback uses the native source via `serpent://source` — no proxy needed.
   */
  public override async generateAudioArtifacts(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    execution: MediaExecutionContext,
  ): Promise<{ artifactId: string }> {
    const ffprobePath = resolveFfprobePath();
    const ffmpegPath = resolveFfmpegPath();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });

    let hasAttachedPicture = false;
    try {
      const probe = await this.probeVideoAsset(
        input, openLibrary, assetPath, revisionId, ffprobePath, execution,
      );
      hasAttachedPicture = probe.hasAttachedPicture;
    } catch (error) {
      const resourceError = asMediaResourceExhaustedError(error, 'ffmpeg-audio');
      if (resourceError) throw resourceError;
      this.diagnose('audio-probe', error, { libraryId: input.libraryId, assetId: input.assetId });
    }

    const preferCover = this.audioPreviewPrefersCover;
    let thumbnailArtifactId: string | null = null;
    if (preferCover && hasAttachedPicture) {
      try {
        thumbnailArtifactId = await this.generateAudioAlbumCoverThumbnail(
          input,
          openLibrary,
          assetPath,
          revisionId,
          ffmpegPath,
          artifactsDir,
          execution,
        );
      } catch (error) {
        const resourceError = asMediaResourceExhaustedError(error, 'ffmpeg-audio-cover');
        if (resourceError) throw resourceError;
        this.diagnose('audio-album-cover', error, {
          libraryId: input.libraryId,
          assetId: input.assetId,
        });
      }
    }

    if (!thumbnailArtifactId) {
      try {
        thumbnailArtifactId = await this.generateAudioWaveformPng(
          input,
          openLibrary,
          assetPath,
          revisionId,
          ffmpegPath,
          artifactsDir,
          execution,
          {
            kind: 'thumbnail',
            width: AUDIO_WAVEFORM_COVER_WIDTH,
            height: AUDIO_WAVEFORM_COVER_HEIGHT,
            flattenBackground: { ...AUDIO_WAVEFORM_COVER_BACKGROUND },
            forcedWaveform: hasAttachedPicture && !preferCover,
          },
        );
      } catch (error) {
        const resourceError = asMediaResourceExhaustedError(error, 'ffmpeg-audio-waveform');
        if (resourceError) throw resourceError;
        this.diagnose('audio-waveform', error, { libraryId: input.libraryId, assetId: input.assetId });
      }
    }

    try {
      await this.generateAudioWaveformPng(
        input,
        openLibrary,
        assetPath,
        revisionId,
        ffmpegPath,
        artifactsDir,
        execution,
        {
          kind: 'video_poster',
          width: AUDIO_WAVEFORM_VIEWER_WIDTH,
          height: AUDIO_WAVEFORM_VIEWER_HEIGHT,
          // Viewer shell paints theme --pane; flatten to near-black so fill
          // stretch does not flash a light letterbox fringe.
          flattenBackground: { r: 0x1a, g: 0x1c, b: 0x1f },
        },
      );
    } catch (error) {
      const resourceError = asMediaResourceExhaustedError(error, 'ffmpeg-audio-viewer-waveform');
      if (resourceError) throw resourceError;
      this.diagnose('audio-waveform-viewer', error, {
        libraryId: input.libraryId,
        assetId: input.assetId,
      });
    }

    if (!thumbnailArtifactId) {
      throw new LibraryServiceError('INTERNAL_ERROR', {
        reason: 'MEDIA_PROCESSING_FAILED',
      });
    }

    return { artifactId: thumbnailArtifactId };
  }

  /**
   * Extract the attached picture stream and store it as the grid `thumbnail`
   * (Serpent-690060). Uses the same 512px-inside encode as image cards so
   * album art keeps its aspect instead of being flattened onto the 4:3
   * waveform stage.
   */
  public override async generateAudioAlbumCoverThumbnail(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    ffmpegPath: string,
    artifactsDir: string,
    execution: MediaExecutionContext,
  ): Promise<string | null> {
    const artifactId = randomUUID();
    let artifactRelPath = `${artifactId}.jpg`;
    let artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    const tempAbsPath = path.join(artifactsDir, `${artifactId}.cover-tmp.png`);

    try {
      const result = await this.runFfmpeg(ffmpegPath, [
        '-y',
        '-i', assetPath,
        '-an',
        '-map', '0:v:0',
        '-frames:v', '1',
        '-update', '1',
        tempAbsPath,
      ], { signal: execution.signal });

      if (result.exitCode !== 0) {
        throw new Error(
          `ffmpeg album-cover extract exited with code ${result.exitCode}: ${result.stderr.slice(-200)}`,
        );
      }

      const { inputWidth, inputHeight, mimeType } = await runSharpDecoder(
        execution.signal,
        execution.lane,
        async () => {
          const sharp = this.options.sharpFn ?? requireSharp();
          const pipeline = sharp(tempAbsPath, {
            failOn: 'none',
            sequentialRead: false,
            limitInputPixels: false,
          });
          const metadata = await pipeline.metadata();
          const swapsDimensions = metadata.orientation !== undefined
            && metadata.orientation >= 5
            && metadata.orientation <= 8;
          const inputWidth = swapsDimensions ? (metadata.height ?? 0) : (metadata.width ?? 0);
          const inputHeight = swapsDimensions ? (metadata.width ?? 0) : (metadata.height ?? 0);
          if (inputWidth <= 0 || inputHeight <= 0) {
            throw new Error('Attached picture has no usable pixel size.');
          }
          const hasAlpha =
            (metadata as { hasAlpha?: boolean }).hasAlpha === true ||
            (metadata as { channels?: number }).channels === 4;
          artifactRelPath = hasAlpha ? `${artifactId}.webp` : `${artifactId}.jpg`;
          artifactAbsPath = path.join(artifactsDir, artifactRelPath);
          const sized = pipeline
            .rotate()
            .toColourspace('srgb')
            .resize({
              width: 512,
              height: 512,
              fit: 'inside',
              withoutEnlargement: true,
            });
          try {
            if (hasAlpha) {
              await sized.webp({ quality: 80 }).toFile(artifactAbsPath);
            } else {
              await sized.jpeg({ quality: 72 }).toFile(artifactAbsPath);
            }
          } finally {
            sized.destroy?.();
            pipeline.destroy?.();
          }
          return {
            inputWidth,
            inputHeight,
            mimeType: hasAlpha ? 'image/webp' : 'image/jpeg',
          };
        },
        {
          width: 512,
          height: 512,
        },
      );

      rmSync(tempAbsPath, { force: true });

      const outputStat = statSync(artifactAbsPath);
      if (!this.audioPreviewPrefersCover) {
        rmSync(artifactAbsPath, { force: true });
        return null;
      }
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              width, height, generator_version, status, generated_at)
           VALUES (?, ?, 'thumbnail', ?, ?, ?, ?, ?, ?, 'ready', ?)`,
        )
        .run(
          artifactId,
          revisionId,
          mimeType,
          outputStat.size,
          artifactRelPath,
          inputWidth || null,
          inputHeight || null,
          AUDIO_WAVEFORM_GENERATOR,
          new Date().toISOString(),
        );

      return artifactId;
    } catch (error) {
      rmSync(tempAbsPath, { force: true });
      rmSync(artifactAbsPath, { force: true });
      throw error;
    }
  }

  /**
   * Render a mono waveform PNG for grid cover (`thumbnail`) or viewer strip
   * (`video_poster` for audio — Serpent-vlx).
   */
  public override async generateAudioWaveformPng(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    ffmpegPath: string,
    artifactsDir: string,
    execution: MediaExecutionContext,
    options: {
      kind: 'thumbnail' | 'video_poster';
      width: number;
      height: number;
      flattenBackground: { r: number; g: number; b: number };
      forcedWaveform?: boolean;
    },
  ): Promise<string> {
    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}.png`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    const tempAbsPath = path.join(artifactsDir, `${artifactId}.wave-tmp.png`);

    try {
      const result = await this.runFfmpeg(ffmpegPath, [
        '-y',
        '-i', assetPath,
        '-filter_complex',
        `aformat=channel_layouts=mono,compand,showwavespic=s=${options.width}x${options.height}:colors=${AUDIO_WAVEFORM_COVER_STROKE}:scale=sqrt`,
        '-frames:v', '1',
        '-update', '1',
        tempAbsPath,
      ], { signal: execution.signal });

      if (result.exitCode !== 0) {
        throw new Error(
          `ffmpeg waveform exited with code ${result.exitCode}: ${result.stderr.slice(-200)}`,
        );
      }

      await runSharpDecoder(execution.signal, execution.lane, async () => {
        const sharp = this.options.sharpFn ?? requireSharp();
        const flatten = sharp(tempAbsPath).flatten?.({
          background: { ...options.flattenBackground },
        });
        if (!flatten?.png || !flatten.toFile) {
          throw new Error('Sharp flatten/png API unavailable for waveform covers.');
        }
        await flatten.png().toFile(artifactAbsPath);
      }, {
        width: options.width,
        height: options.height,
      });
      rmSync(tempAbsPath, { force: true });

      const outputStat = statSync(artifactAbsPath);
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              width, height, generator_version, status, generated_at)
           VALUES (?, ?, ?, 'image/png', ?, ?, ?, ?, ?, 'ready', ?)`,
        )
        .run(
          artifactId,
          revisionId,
          options.kind,
          outputStat.size,
          artifactRelPath,
          options.width,
          options.height,
          options.forcedWaveform
            ? `${AUDIO_WAVEFORM_GENERATOR}+${AUDIO_FORCED_WAVEFORM_GENERATOR_MARK}`
            : AUDIO_WAVEFORM_GENERATOR,
          new Date().toISOString(),
        );

      return artifactId;
    } catch (error) {
      rmSync(tempAbsPath, { force: true });
      rmSync(artifactAbsPath, { force: true });
      this.writeFailedArtifact(
        openLibrary,
        artifactId,
        revisionId,
        options.kind,
        'image/png',
        artifactRelPath,
        AUDIO_WAVEFORM_GENERATOR,
        error,
      );
      throw error;
    }
  }

}
