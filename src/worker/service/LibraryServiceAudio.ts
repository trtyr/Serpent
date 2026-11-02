/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { MediaExecutionContext, OpenLibrary} from '../library-service-internals';
import { FFMPEG_VERSION, IMPORTED_ANIMATED_THUMBNAIL_GENERATOR, IMPORTED_THUMBNAIL_GENERATOR, LibraryServiceError, SHARP_THUMBNAIL_GENERATOR, SHARP_VERSION, StaleMediaRevisionError, isMissingPathError, realDirectoryExists, requireSharp, runSharpDecoder, serviceError, sha256FileAtPath } from '../library-service-internals';
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
import { LibraryServiceThumbnails } from './LibraryServiceThumbnails';
import { detectMediaType, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';

/** LibraryServiceAudio: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceAudio extends LibraryServiceThumbnails {

  // ── Image thumbnail (sharp) ────────────────────────────────────────

  /**
   * Replace one legacy Eagle/Billfish card preview with a bounded 512px
   * derivative. The old row stays ready throughout decoding and is swapped in
   * one SQLite transaction, so a failed conversion cannot blank the card.
   */
  public override async normalizeImportedThumbnailArtifact(
    openLibrary: OpenLibrary,
    input: { assetId: string; revisionId: string },
    execution: MediaExecutionContext,
  ): Promise<{ artifactId: string } | null> {
    const asset = openLibrary.connection
      .prepare(
        `SELECT relative_file_path, current_revision_id
           FROM assets
          WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        relative_file_path: string;
        current_revision_id: string | null;
      } | undefined;
    if (!asset) {
      throw new StaleMediaRevisionError('Imported thumbnail asset was deleted before normalization.');
    }
    if (asset.current_revision_id !== input.revisionId) {
      throw new StaleMediaRevisionError('Imported thumbnail revision is no longer current.');
    }
    const mediaType = detectMediaType(asset.relative_file_path);
    const artifactKind = mediaType === 'video' ? 'video_poster' : 'thumbnail';
    const legacy = openLibrary.connection
      .prepare(
        `SELECT artifact_id, file_path, mime_type, byte_size, generator_version
           FROM revision_artifacts
          WHERE revision_id = ?
            AND kind = ?
            AND status = 'ready'
            AND invalidated_at IS NULL
          LIMIT 1`,
      )
      .get(input.revisionId, artifactKind) as {
        artifact_id: string;
        file_path: string;
        mime_type: string;
        byte_size: number;
        generator_version: string;
      } | undefined;
    if (!legacy || !isLegacyImportedThumbnailGenerator(legacy.generator_version)) {
      return null;
    }

    const oldArtifactPath = this.artifactFilePathFromRow(openLibrary, legacy.file_path);
    const newArtifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    let temporaryPath: string | undefined;
    let finalPath: string | undefined;
    let replacementCommitted = false;
    const throwIfCancelled = (): void => {
      if (execution.signal?.aborted) {
        throw new DOMException('Imported thumbnail normalization was cancelled.', 'AbortError');
      }
    };
    const assertCurrentRevision = (): void => {
      const current = openLibrary.connection
        .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
        .get(input.assetId) as { current_revision_id: string | null } | undefined;
      if (!current || current.current_revision_id !== input.revisionId) {
        throw new StaleMediaRevisionError('Imported thumbnail revision is no longer current.');
      }
    };
    const markCurrentArtifact = (
      generatorVersion: string,
      previewDimensions: { width: number; height: number },
    ): void => {
      throwIfCancelled();
      const now = new Date().toISOString();
      openLibrary.connection.transaction(() => {
        throwIfCancelled();
        assertCurrentRevision();
        const current = openLibrary.connection
          .prepare(
            `SELECT artifact_id
               FROM revision_artifacts
              WHERE revision_id = ?
                AND kind = ?
                AND status = 'ready'
                AND invalidated_at IS NULL
              LIMIT 1`,
          )
          .get(input.revisionId, artifactKind) as { artifact_id: string } | undefined;
        if (!current || current.artifact_id !== legacy.artifact_id) {
          throw new Error('Imported thumbnail became stale before marking complete.');
        }
        const artifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
        const identity = artifactIdentityForPersistedRow({
          assetId: input.assetId,
          revisionId: input.revisionId,
          kind: artifactKind,
          generatorVersion,
        });
        const hasIdentityColumns = [
          'artifact_role',
          'generator_id',
          'settings_hash',
          'artifact_key',
        ].every((column) => artifactColumns.has(column));
        if (hasIdentityColumns && identity === null) {
          throw new Error('Imported thumbnail has no artifact identity role.');
        }
        const updateColumns = ['generator_version = ?'];
        const updateParameters: unknown[] = [generatorVersion];
        if (artifactColumns.has('width') && artifactColumns.has('height')) {
          updateColumns.push('width = ?', 'height = ?');
          updateParameters.push(previewDimensions.width, previewDimensions.height);
        }
        if (hasIdentityColumns) {
          updateColumns.push(
            'artifact_role = ?',
            'generator_id = ?',
            'settings_hash = ?',
            'artifact_key = ?',
          );
          updateParameters.push(
            identity!.role,
            identity!.generatorId,
            identity!.settingsHash,
            identity!.key,
          );
        }
        updateColumns.push('generated_at = ?');
        updateParameters.push(
          now,
          legacy.artifact_id,
          input.revisionId,
          input.assetId,
          input.revisionId,
        );
        const result = openLibrary.connection
          .prepare(
            `UPDATE revision_artifacts
                SET ${updateColumns.join(', ')}
              WHERE artifact_id = ?
                AND revision_id = ?
                AND invalidated_at IS NULL
                AND EXISTS (
                  SELECT 1 FROM assets
                   WHERE asset_id = ?
                     AND current_revision_id = ?
                )`,
          )
          .run(...updateParameters);
        if (result.changes !== 1) {
          assertCurrentRevision();
          throw new Error('Imported thumbnail became stale before marking complete.');
        }
      })();
    };

    try {
      const output = await runSharpDecoder(
        execution.signal,
        execution.lane,
        async () => {
          const sharp = this.options.sharpFn ?? requireSharp();
          const probe = sharp(oldArtifactPath, {
            failOn: 'error',
            sequentialRead: true,
            // This is a user-provided media artifact. Do not impose a
            // product-side pixel limit; cancellation remains the only caller
            // controlled stop condition.
            limitInputPixels: false,
          });
          const metadata = await probe.metadata();
          throwIfCancelled();
          const inputWidth = metadata.width ?? 0;
          const inputHeight = metadata.height ?? 0;
          const pages = metadata.pages ?? 1;
          if (!Number.isSafeInteger(pages) || pages < 1) {
            throw new Error('Sharp returned invalid page metadata for the imported thumbnail.');
          }
          const extension = path.extname(oldArtifactPath).toLowerCase();
          const format = metadata.format?.toLowerCase();
          const animated = pages > 1
            && (format === 'gif' || format === 'webp' || extension === '.gif' || extension === '.webp');
          const needsNormalization = importedThumbnailNeedsNormalization({
            byteSize: legacy.byte_size,
            height: inputHeight,
            width: inputWidth,
          });
          const verifyDecodedPixels = async (): Promise<void> => {
            // metadata() only reads container headers. Decode each page one at
            // a time so a bounded preview is not marked preserved while its
            // compressed pixel stream is truncated, and never materialize all
            // animation frames in one native buffer.
            for (let page = 0; page < pages; page += 1) {
              throwIfCancelled();
              const pageDecoder = sharp(oldArtifactPath, {
                animated: pages > 1,
                failOn: 'error',
                page,
                pages: 1,
                sequentialRead: true,
                limitInputPixels: false,
              });
              const rawDecoder = pageDecoder.raw?.();
              if (!rawDecoder?.toBuffer) {
                throw new Error('Sharp cannot validate imported thumbnail pixels.');
              }
              await rawDecoder.toBuffer();
              throwIfCancelled();
            }
          };
          // An imported animated preview is already the user's chosen card
          // image. Flattening it into a JPEG/WEBP would silently change its
          // semantics, so leave the copied artifact in place after validating
          // every frame and persist a current-generator marker. Without that
          // marker every subsequent startup backfill would enqueue it again.
          if (animated) {
            await verifyDecodedPixels();
            markCurrentArtifact(IMPORTED_ANIMATED_THUMBNAIL_GENERATOR, {
              height: inputHeight,
              width: inputWidth,
            });
            // Keep the existing artifact publication path unchanged. The
            // durable generator marker above is the completion record; no
            // newly generated artifact needs to be published for an
            // animation that was intentionally preserved in its original
            // format.
            return null;
          }
          // A source asset can be 4K while its external card preview is
          // already bounded. These are the actual preview dimensions, and the
          // pixel stream has now been decoded rather than merely inspected.
          if (!needsNormalization) {
            await verifyDecodedPixels();
            markCurrentArtifact(IMPORTED_THUMBNAIL_PRESERVED_GENERATOR, {
              height: inputHeight,
              width: inputWidth,
            });
            return null;
          }
          const hasAlpha = metadata.hasAlpha === true || metadata.channels === 4;
          const extensionForOutput = hasAlpha ? 'webp' : 'jpg';
          const relativePath = `${newArtifactId}.${extensionForOutput}`;
          const tempRelativePath = `${newArtifactId}.tmp`;
          const outputPath = path.join(artifactsDir, relativePath);
          const tempPath = path.join(artifactsDir, tempRelativePath);
          temporaryPath = tempPath;
          finalPath = outputPath;
          const qualityLevels = hasAlpha ? [80, 60, 40, 25] : [72, 56, 40, 28];
          const outputEdges = [
            IMPORTED_THUMBNAIL_MAX_EDGE,
            448,
            384,
            320,
            256,
          ];
          let outputByteSize = 0;
          for (const outputEdge of outputEdges) {
            throwIfCancelled();
            for (const quality of qualityLevels) {
              throwIfCancelled();
              const pipeline = sharp(oldArtifactPath, {
                failOn: 'error',
                sequentialRead: true,
                limitInputPixels: false,
              })
                .rotate()
                .toColourspace('srgb')
                .resize({
                  width: outputEdge,
                  height: outputEdge,
                  fit: 'inside',
                  withoutEnlargement: true,
                });
              if (hasAlpha) {
                await pipeline.webp({ quality }).toFile(tempPath);
              } else {
                await pipeline.jpeg({ quality }).toFile(tempPath);
              }
              throwIfCancelled();
              outputByteSize = statSync(tempPath).size;
              if (outputByteSize <= IMPORTED_THUMBNAIL_MAX_BYTES) break;
            }
            if (outputByteSize <= IMPORTED_THUMBNAIL_MAX_BYTES) break;
          }
          if (outputByteSize <= 0) throw new Error('Normalized imported thumbnail is empty.');
          if (outputByteSize > IMPORTED_THUMBNAIL_MAX_BYTES) {
            throw new Error('Normalized imported thumbnail exceeded the byte budget.');
          }
          throwIfCancelled();
          const outputMetadata = await sharp(tempPath, {
            failOn: 'none',
            sequentialRead: true,
            limitInputPixels: false,
          }).metadata();
          throwIfCancelled();
          const outputWidth = outputMetadata.width ?? 0;
          const outputHeight = outputMetadata.height ?? 0;
          if (
            !Number.isSafeInteger(outputWidth)
            || !Number.isSafeInteger(outputHeight)
            || outputWidth <= 0
            || outputHeight <= 0
            || outputWidth > IMPORTED_THUMBNAIL_MAX_EDGE
            || outputHeight > IMPORTED_THUMBNAIL_MAX_EDGE
          ) {
            throw new Error('Normalized imported thumbnail exceeded the edge budget.');
          }
          const outputStat = statSync(tempPath);
          if (outputStat.size <= 0 || outputStat.size > IMPORTED_THUMBNAIL_MAX_BYTES) {
            throw new Error('Normalized imported thumbnail exceeded the byte budget.');
          }
          return {
            byteSize: outputStat.size,
            height: outputHeight,
            mimeType: hasAlpha ? 'image/webp' : 'image/jpeg',
            outputHeight,
            outputWidth,
            relativePath,
            width: outputWidth,
          };
        },
      );

      if (output === null) return null;

      if (!temporaryPath || !finalPath) throw new Error('Normalized thumbnail output path is missing.');
      throwIfCancelled();
      renameSync(temporaryPath, finalPath);
      temporaryPath = undefined;

      const now = new Date().toISOString();
      openLibrary.connection.transaction(() => {
        throwIfCancelled();
        assertCurrentRevision();
        const current = openLibrary.connection
          .prepare(
            `SELECT artifact_id
               FROM revision_artifacts
              WHERE revision_id = ?
                AND kind = ?
                AND status = 'ready'
                AND invalidated_at IS NULL
              LIMIT 1`,
          )
          .get(input.revisionId, artifactKind) as {
            artifact_id: string;
          } | undefined;
        if (!current || current.artifact_id !== legacy.artifact_id) {
          throw new Error('Imported thumbnail became stale before replacement.');
        }
        const invalidated = openLibrary.connection
          .prepare(
            `UPDATE revision_artifacts
                SET invalidated_at = ?
              WHERE artifact_id = ?
                AND revision_id = ?
                AND invalidated_at IS NULL`,
          )
          .run(now, legacy.artifact_id, input.revisionId);
        if (invalidated.changes !== 1) {
          throw new Error('Imported thumbnail became stale before replacement.');
        }
        openLibrary.connection
          .prepare(
            `INSERT INTO revision_artifacts
               (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
                width, height, generator_version, status, generated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ready', ?)`,
          )
          .run(
            newArtifactId,
            input.revisionId,
            artifactKind,
            output.mimeType,
            output.byteSize,
            output.relativePath,
            output.width,
            output.height,
            IMPORTED_THUMBNAIL_GENERATOR,
            now,
          );
      })();
      replacementCommitted = true;

      // The old copy is no longer reachable through the current artifact row.
      // Removal is best-effort: the reconciliation pass can clean an orphan
      // after a process crash between the transaction and this unlink.
      try {
        rmSync(oldArtifactPath, { force: true });
      } catch (error) {
        this.diagnose('imported-thumbnail.normalize-cleanup', error, {
          assetId: input.assetId,
          revisionId: input.revisionId,
          artifactId: legacy.artifact_id,
        });
      }
      return { artifactId: newArtifactId };
    } catch (error) {
      if (temporaryPath) rmSync(temporaryPath, { force: true });
      if (finalPath && !replacementCommitted) rmSync(finalPath, { force: true });
      this.diagnose('imported-thumbnail.normalize', error, {
        assetId: input.assetId,
        revisionId: input.revisionId,
        artifactId: legacy.artifact_id,
      });
      throw error;
    }
  }

  public override async generateImageThumbnail(
    input: { libraryId: string; assetId: string },
    openLibrary: OpenLibrary,
    assetPath: string,
    revisionId: string,
    execution: MediaExecutionContext,
  ): Promise<{ artifactId: string }> {
    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    // Serpent-thumb-perf: extension is decided after metadata (jpeg for
    // opaque images, webp only when alpha must be preserved).
    let artifactRelPath = `${artifactId}.webp`;
    let artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    let imageProcessed = false;

    try {
      const headerSize = execution.sourceWidth != null
        && execution.sourceHeight != null
        && execution.sourceWidth > 0
        && execution.sourceHeight > 0
        ? {
            width: execution.sourceWidth,
            height: execution.sourceHeight,
          }
        : await readImageDimensions(assetPath);
      if (headerSize) {
        this.persistExtractedImageDimensions(openLibrary, revisionId, headerSize);
      }
      const { inputWidth, inputHeight, gifMetadata } = await runSharpDecoder(
        execution.signal,
        execution.lane,
        async () => {
          const s = this.options.sharpFn ?? requireSharp();
          // Serpent-thumb-perf: random access enables libvips shrink-on-load
          // for JPEG (a 2400px photo decodes at half/quarter scale before the
          // 512px resize instead of full resolution). GIF keeps sequential
          // reads for animation safety; failOn stays 'none' for truncation
          // tolerance.
          const probe = s(assetPath, {
            failOn: 'none',
            sequentialRead: false,
            limitInputPixels: false,
          });
          const metadata = await probe.metadata();
          const pages = metadata.pages ?? 1;
          const isGif =
            metadata.format === 'gif' || assetPath.toLowerCase().endsWith('.gif');
          const isAnimatedGif = isGif && pages > 1;

          let page = 0;
          if (isAnimatedGif) {
            const scored: Array<{ page: number; score: number }> = [];
            for (const candidate of sampleGifPageIndices(pages)) {
              if (execution.signal?.aborted) {
                throw new DOMException('Media job cancelled during GIF page probe.', 'AbortError');
              }
              try {
                const samplePipeline = s(assetPath, {
                  page: candidate,
                  limitInputPixels: false,
                })
                  .rotate()
                  .toColourspace('srgb')
                  .resize({
                    width: GIF_THUMBNAIL_PROBE_SIZE,
                    height: GIF_THUMBNAIL_PROBE_SIZE,
                    fit: 'inside',
                    withoutEnlargement: true,
                    // Keep the probe bounded to a small frame; the final card
                    // still preserves the existing thumbnail sampling policy.
                  });
                const rawFn = samplePipeline.raw;
                if (!rawFn) {
                  break;
                }
                const rawPipeline = rawFn.call(samplePipeline);
                const toBufferFn = rawPipeline.toBuffer;
                if (!toBufferFn) {
                  break;
                }
                const sample = await toBufferFn.call(rawPipeline, {
                  resolveWithObject: true,
                });
                const score = scoreRawRgbFrame(sample.data, sample.info.channels);
                scored.push({ page: candidate, score });
                // Serpent-azf6: a recognizable frame ends the probe early —
                // bright meme GIFs usually need 1-3 decodes instead of the
                // full sample spread; dark GIFs fall through to the cap.
                if (score >= GIF_GOOD_PAGE_SCORE_THRESHOLD) break;
              } catch (error) {
                this.diagnose('thumbnail.gif-page-probe', error, {
                  assetPath,
                  page: candidate,
                });
              }
            }
            if (scored.length > 0) {
              page = pickBestGifPage(scored, pages);
            }
          }

          const pipeline = isAnimatedGif
            ? s(assetPath, {
                page,
                failOn: 'none',
                sequentialRead: true,
                limitInputPixels: false,
              })
            : s(assetPath, {
                failOn: 'none',
                sequentialRead: false,
                limitInputPixels: false,
              });
          const finalMeta = isAnimatedGif ? await pipeline.metadata() : metadata;
          const swapsDimensions = finalMeta.orientation !== undefined
            && finalMeta.orientation >= 5
            && finalMeta.orientation <= 8;
          const inputWidth = swapsDimensions ? (finalMeta.height ?? 0) : (finalMeta.width ?? 0);
          const inputHeight = swapsDimensions ? (finalMeta.width ?? 0) : (finalMeta.height ?? 0);

          const hasAlpha =
            (finalMeta as { hasAlpha?: boolean }).hasAlpha === true ||
            (finalMeta as { channels?: number }).channels === 4;
          // Serpent-thumb-perf: opaque images encode as JPEG (libjpeg-turbo is
          // several times faster than WebP and the card is a 512px preview);
          // alpha-bearing images keep WebP so transparency survives.
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
              // Card thumbnails stay bounded to 512px; the viewer still
              // resolves the full-fidelity source when opened.
            });
          try {
            if (hasAlpha) {
              await sized.webp({ quality: 80 }).toFile(artifactAbsPath);
            } else {
              await sized.jpeg({ quality: 72 }).toFile(artifactAbsPath);
            }
          } finally {
            // Windows cannot rm/rename the library while libvips still holds
            // the source or artifact. Destroying here is required: files:0
            // only skips the cache, it does not close the current pipeline.
            sized.destroy?.();
            pipeline.destroy?.();
            probe.destroy?.();
          }
          if (execution.signal?.aborted) {
            throw new DOMException('Media job cancelled after image decoding.', 'AbortError');
          }

          const gifMeta: GifExtractedMetadata | null = isGif
            ? buildGifExtractedMetadata({
                width: inputWidth,
                height: inputHeight,
                pages,
                delay: metadata.delay,
              })
            : null;
          return { inputWidth, inputHeight, gifMetadata: gifMeta };
        },
        {
          sourceByteSize: execution.sourceByteSize,
          width: headerSize?.width ?? execution.sourceWidth,
          height: headerSize?.height ?? execution.sourceHeight,
        },
      );

      const outputStat = statSync(artifactAbsPath);
      imageProcessed = true;

      // AssetSummary.width/height describe the source image, not the bounded
      // WebP card artifact. Keeping the source dimensions here is important
      // when a plugin replaces a large image: both the old and new card
      // thumbnails may be capped at 512px, while the actual resolution has
      // changed substantially.
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
          // Serpent-thumb-perf: jpeg for opaque sources, webp for alpha.
          artifactRelPath.endsWith('.jpg') ? 'image/jpeg' : 'image/webp',
          outputStat.size,
          artifactRelPath,
          inputWidth || null,
          inputHeight || null,
          SHARP_THUMBNAIL_GENERATOR,
          new Date().toISOString(),
        );

      if (gifMetadata) {
        this.persistGifExtractedMetadata(
          openLibrary,
          revisionId,
          gifMetadata,
        );
      }

      // This runs inside the thumbnail job while that job is still marked
      // `running`; checking for any running thumbnail here would therefore
      // suppress EXIF author backfill for every queued thumbnail.
      await this.backfillAuthorFromExif(openLibrary, input.assetId, assetPath);

      return { artifactId };
    } catch (error) {
      const extension = path.extname(assetPath).toLowerCase();
      // A visible-window preemption or queue cancellation is not a decode
      // failure. Do not create a failed artifact, run a second header probe,
      // or misreport an AbortError as LIBRARY_NOT_WRITABLE; the queue will
      // leave the durable job queued for the newest viewport.
      if (execution.signal?.aborted || (error instanceof Error && error.name === 'AbortError')) {
        try {
          rmSync(artifactAbsPath, { force: true });
        } catch (cleanupError) {
          this.diagnose('thumbnail.abort-cleanup', cleanupError, {
            libraryId: input.libraryId,
            assetId: input.assetId,
          });
        }
        throw error;
      }
      if (
        !imageProcessed &&
        JPEG_IMAGE_EXTENSIONS.includes(extension as (typeof JPEG_IMAGE_EXTENSIONS)[number]) &&
        !execution.signal?.aborted
      ) {
        // Sharp correctly rejects severe JPEG truncation, while FFmpeg can
        // often still recover the decoded rows that precede the missing tail.
        // Keep this narrowly scoped to JPEGs and only enter it after the
        // normal Sharp path failed, so healthy images retain the faster
        // in-process decoder.
        const recovered = await this.tryGenerateTruncatedJpegThumbnail({
          openLibrary,
          assetPath,
          revisionId,
          artifactId,
          artifactRelPath,
          artifactAbsPath,
          execution,
          input,
        });
        if (recovered) return { artifactId };
      }
      if (!imageProcessed && (extension === '.tif' || extension === '.tiff')) {
        // libvips handles ordinary TIFFs efficiently. Complex/multi-part TIFFs
        // that it cannot decode fall back to the same OIIO + OCIO path as EXR
        // and TGA, without leaving a terminal sharp failure that would conflict
        // with the replacement thumbnail artifact.
        try {
          rmSync(artifactAbsPath, { force: true });
        } catch (cleanupError) {
          this.diagnose('thumbnail.tiff-sharp-cleanup', cleanupError, {
            libraryId: input.libraryId,
            assetId: input.assetId,
          });
        }
        this.diagnose('thumbnail.tiff-sharp-fallback', error, {
          libraryId: input.libraryId,
          assetId: input.assetId,
          extension,
        });
        return this.generateOiiOThumbnail(input, openLibrary, assetPath, revisionId, {}, execution);
      }

      // Write failed status
      const missingInput = isMissingPathError(error) || isDecoderMissingInputError(error);
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              generator_version, status, error_code, generated_at)
           VALUES (?, ?, 'thumbnail', 'image/webp', 0, ?, ?, 'failed', ?, ?)`,
        )
        .run(
          artifactId,
          revisionId,
          artifactRelPath,
          `sharp@${SHARP_VERSION}`,
          missingInput
            ? 'SOURCE_NOT_FOUND'
            : typeof error === 'object' && error !== null && 'code' in error
              ? String(error.code)
              : 'THUMBNAIL_GENERATION_FAILED',
          new Date().toISOString(),
        );
      // GitHub #45: a second header open on a sync-volume placeholder can
      // block the Worker for minutes after Sharp already reported the file
      // missing. Dimensions come back when the source is readable again.
      if (!missingInput) {
        const headerSize = await readImageDimensions(assetPath);
        if (headerSize) {
          this.persistExtractedImageDimensions(openLibrary, revisionId, headerSize);
        }
      }

      throw serviceError(error, missingInput ? 'ASSET_NOT_FOUND' : 'LIBRARY_NOT_WRITABLE');
    }
  }

  public override async tryGenerateTruncatedJpegThumbnail(input: {
    openLibrary: OpenLibrary;
    assetPath: string;
    revisionId: string;
    artifactId: string;
    artifactRelPath: string;
    artifactAbsPath: string;
    execution: MediaExecutionContext;
    input: { libraryId: string; assetId: string };
  }): Promise<boolean> {
    const {
      openLibrary,
      assetPath,
      revisionId,
      artifactId,
      artifactRelPath,
      artifactAbsPath,
      execution,
    } = input;
    try {
      const result = await this.runFfmpeg(
        resolveFfmpegPath(),
        [
          '-y',
          '-hide_banner',
          '-loglevel',
          'error',
          '-err_detect',
          'ignore_err',
          '-i',
          assetPath,
          '-frames:v',
          '1',
          '-vf',
          'scale=512:512:force_original_aspect_ratio=decrease',
          '-c:v',
          'libwebp',
          '-q:v',
          '80',
          artifactAbsPath,
        ],
        { signal: execution.signal },
      );
      const outputStat = existsSync(artifactAbsPath)
        ? statSync(artifactAbsPath)
        : null;
      if (!outputStat || outputStat.size === 0) {
        rmSync(artifactAbsPath, { force: true });
        return false;
      }
      if (result.exitCode !== 0) {
        this.diagnose('thumbnail.jpeg-truncated-recovery-warning', new Error(
          `FFmpeg returned ${result.exitCode} after producing a thumbnail.`,
        ), {
          libraryId: input.input.libraryId,
          assetId: input.input.assetId,
          stderr: result.stderr.slice(-400),
        });
      }
      const headerSize = await readImageDimensions(assetPath);
      openLibrary.connection
        .prepare(
          `INSERT INTO revision_artifacts
             (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
              width, height, generator_version, status, generated_at)
           VALUES (?, ?, 'thumbnail', 'image/webp', ?, ?, ?, ?, ?, 'ready', ?)`,
        )
        .run(
          artifactId,
          revisionId,
          outputStat.size,
          artifactRelPath,
          headerSize?.width ?? null,
          headerSize?.height ?? null,
          `ffmpeg@${FFMPEG_VERSION};truncated-jpeg-recovery`,
          new Date().toISOString(),
        );
      if (headerSize) {
        this.persistExtractedImageDimensions(openLibrary, revisionId, headerSize);
      }
      return true;
    } catch (recoveryError) {
      rmSync(artifactAbsPath, { force: true });
      this.diagnose('thumbnail.jpeg-truncated-recovery', recoveryError, {
        libraryId: input.input.libraryId,
        assetId: input.input.assetId,
      });
      return false;
    }
  }

  override backfillMissingImageDimensions(
    libraryId: string,
    limit = 32,
  ): Array<{
    assetId: string;
    width: number;
    height: number;
    revisionId: string;
    previewKind: 'source' | null;
    previewRevisionId: string | null;
  }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const imageSql = IMAGE_EXTENSIONS
      .map(() => 'LOWER(a.relative_file_path) LIKE ?')
      .join(' OR ');
    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.relative_file_path, a.location_kind, a.linked_folder_id,
                a.current_revision_id, source_revision.byte_size AS source_byte_size
           FROM assets a
           JOIN revisions source_revision
             ON source_revision.revision_id = a.current_revision_id
          WHERE a.deleted_at IS NULL
            AND a.availability = 'available'
            AND a.current_revision_id IS NOT NULL
            AND (${imageSql})
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts ra
               WHERE ra.revision_id = a.current_revision_id
                 AND ra.kind = 'extracted_metadata'
                 AND ra.invalidated_at IS NULL
                 AND ra.width IS NOT NULL
            )
          ORDER BY a.relative_file_path
          LIMIT ?`,
      )
      .all(
        ...IMAGE_EXTENSIONS.map((extension) => `%${extension}`),
        Math.max(1, Math.min(64, Math.trunc(limit))),
      ) as Array<{
        asset_id: string;
        relative_file_path: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        current_revision_id: string | null;
      source_byte_size: number;
      }>;
    const out: Array<{
      assetId: string;
      width: number;
      height: number;
      revisionId: string;
      previewKind: 'source' | null;
      previewRevisionId: string | null;
    }> = [];
    for (const row of rows) {
      if (!row.current_revision_id) continue;
      const size = this.persistSourceImageDimensions(
        openLibrary,
        row.current_revision_id,
        row,
      );
      if (size) {
        const sourceDirect = isSourceDirectPreview({
          fileName: row.relative_file_path,
          mediaType: 'image',
          byteSize: row.source_byte_size,
          width: size.width,
          height: size.height,
        });
        out.push({
          assetId: row.asset_id,
          width: size.width,
          height: size.height,
          revisionId: row.current_revision_id,
          previewKind: sourceDirect ? 'source' : null,
          previewRevisionId: sourceDirect ? row.current_revision_id : null,
        });
      }
    }
    return out;
  }

  /**
   * Serpent-visible-window: header-probe dimensions for the assets the user
   * is currently looking at, so masonry placeholders get correct sizes before
   * their thumbnails finish (no layout reflow glitch), and returns them for
   * asset.dimensions.ready events.
   */
  override persistVisibleWindowImageDimensions(
    libraryId: string,
    assetIds: string[],
  ): Array<{
    assetId: string;
    width: number;
    height: number;
    revisionId: string;
    previewKind: 'source' | null;
    previewRevisionId: string | null;
  }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    if (assetIds.length === 0) return [];
    const capped = assetIds.slice(0, 64);
    const placeholders = capped.map(() => '?').join(',');
    const rows = openLibrary.connection
      .prepare(
        `SELECT assets.asset_id, assets.relative_file_path, assets.location_kind,
                assets.linked_folder_id, assets.current_revision_id,
                source_revision.byte_size AS source_byte_size
           FROM assets
           JOIN revisions source_revision
             ON source_revision.revision_id = assets.current_revision_id
          WHERE assets.asset_id IN (${placeholders})
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts ra
               WHERE ra.revision_id = assets.current_revision_id
                 AND ra.kind = 'extracted_metadata'
                 AND ra.invalidated_at IS NULL
                 AND ra.width IS NOT NULL
            )`,
      )
      .all(...capped) as Array<{
        asset_id: string;
        relative_file_path: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        current_revision_id: string | null;
        source_byte_size: number;
      }>;
    const out: Array<{
      assetId: string;
      width: number;
      height: number;
      revisionId: string;
      previewKind: 'source' | null;
      previewRevisionId: string | null;
    }> = [];
    for (const row of rows) {
      if (!row.current_revision_id) continue;
      const size = this.persistSourceImageDimensions(
        openLibrary,
        row.current_revision_id,
        row,
      );
      if (size) {
        const sourceDirect = isSourceDirectPreview({
          fileName: row.relative_file_path,
          mediaType: 'image',
          byteSize: row.source_byte_size,
          width: size.width,
          height: size.height,
        });
        out.push({
          assetId: row.asset_id,
          width: size.width,
          height: size.height,
          revisionId: row.current_revision_id,
          previewKind: sourceDirect ? 'source' : null,
          previewRevisionId: sourceDirect ? row.current_revision_id : null,
        });
      }
    }
    return out;
  }

  /**
   * Async counterpart for the renderer's visible-window hint. The synchronous
   * method above remains available to bounded worker/import code and tests,
   * but a scroll report must not hold the single Worker event loop while it
   * opens source files on a cold disk or a network-backed linked folder.
   *
   * The query and metadata writes remain owned by this service; only source
   * header I/O is moved to fs/promises. Awaiting each probe lets pending
   * search/preview messages run between files.
   */
  override async persistVisibleWindowImageDimensionsAsync(
    libraryId: string,
    assetIds: string[],
    signal?: AbortSignal,
  ): Promise<Array<{
    assetId: string;
    width: number;
    height: number;
    revisionId: string;
    previewKind: 'source' | null;
    previewRevisionId: string | null;
  }>> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    if (assetIds.length === 0) return [];
    const capped = assetIds.slice(0, 64);
    const placeholders = capped.map(() => '?').join(',');
    const rows = openLibrary.connection
      .prepare(
        `SELECT assets.asset_id, assets.relative_file_path, assets.location_kind,
                assets.linked_folder_id, assets.current_revision_id,
                source_revision.byte_size AS source_byte_size
           FROM assets
           JOIN revisions source_revision
             ON source_revision.revision_id = assets.current_revision_id
          WHERE assets.asset_id IN (${placeholders})
            AND NOT EXISTS (
              SELECT 1 FROM revision_artifacts ra
               WHERE ra.revision_id = assets.current_revision_id
                 AND ra.kind = 'extracted_metadata'
                 AND ra.invalidated_at IS NULL
                 AND ra.width IS NOT NULL
            )`,
      )
      .all(...capped) as Array<{
        asset_id: string;
        relative_file_path: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        current_revision_id: string | null;
        source_byte_size: number;
      }>;
    const out: Array<{
      assetId: string;
      width: number;
      height: number;
      revisionId: string;
      previewKind: 'source' | null;
      previewRevisionId: string | null;
    }> = [];
    for (const row of rows) {
      if (signal?.aborted) {
        throw new DOMException('Visible-window probe aborted.', 'AbortError');
      }
      if (!row.current_revision_id) continue;
      const size = await this.imageDimensionsForAssetAsync(openLibrary, row);
      if (signal?.aborted) {
        throw new DOMException('Visible-window probe aborted.', 'AbortError');
      }
      if (!size) continue;
      this.persistExtractedImageDimensions(openLibrary, row.current_revision_id, size);
      const sourceDirect = isSourceDirectPreview({
        fileName: row.relative_file_path,
        mediaType: 'image',
        byteSize: row.source_byte_size,
        width: size.width,
        height: size.height,
      });
      out.push({
        assetId: row.asset_id,
        width: size.width,
        height: size.height,
        revisionId: row.current_revision_id,
        previewKind: sourceDirect ? 'source' : null,
        previewRevisionId: sourceDirect ? row.current_revision_id : null,
      });
    }
    return out;
  }

  public override persistSourceImageDimensionsForAssets(
    openLibrary: OpenLibrary,
    assetIds: string[],
  ): void {
    if (assetIds.length === 0) return;
    assetIds = assetIds.slice(0, 64);
    const placeholders = assetIds.map(() => '?').join(',');
    const rows = openLibrary.connection
      .prepare(
        `SELECT relative_file_path, location_kind, linked_folder_id, current_revision_id
           FROM assets
          WHERE asset_id IN (${placeholders})`,
      )
      .all(...assetIds) as Array<{
        relative_file_path: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        current_revision_id: string | null;
      }>;
    for (const row of rows) {
      if (!row.current_revision_id) continue;
      this.persistSourceImageDimensions(openLibrary, row.current_revision_id, row);
    }
  }

  // ── 资源库同步（Serpent-xffq）────────────────────────────────────────

  /** 读取/生成资产的跨设备稳定身份（sync_id）。 */
  public override ensureAssetSyncId(openLibrary: OpenLibrary, assetId: string): string {
    const row = openLibrary.connection
      .prepare('SELECT sync_id FROM assets WHERE asset_id = ?')
      .get(assetId) as { sync_id: string | null } | undefined;
    if (row?.sync_id) return row.sync_id;
    const syncId = randomUUID();
    openLibrary.connection
      .prepare('UPDATE assets SET sync_id = ? WHERE asset_id = ?')
      .run(syncId, assetId);
    return syncId;
  }

  public override readAssetSyncId(openLibrary: OpenLibrary, assetId: string): string | null {
    const row = openLibrary.connection
      .prepare('SELECT sync_id FROM assets WHERE asset_id = ?')
      .get(assetId) as { sync_id: string | null } | undefined;
    return row?.sync_id ?? null;
  }

  public override assetRowBySyncId(openLibrary: OpenLibrary, syncId: string) {
    return openLibrary.connection
      .prepare(
        `SELECT asset_id, relative_file_path, location_kind, linked_folder_id, current_revision_id
           FROM assets
          WHERE sync_id = ? AND deleted_at IS NULL`,
      )
      .get(syncId) as
      | {
          asset_id: string;
          relative_file_path: string;
          location_kind: 'managed' | 'linked';
          linked_folder_id: string | null;
          current_revision_id: string | null;
        }
      | undefined;
  }

  /**
   * 计算当前库的同步快照：每个可用资产的 syncId、内容哈希与路径。
   * 磁盘文件缺失但库内行仍在的 syncId 单独列出，供规划器从远端拉回，
   * 而不是当成用户删除去写墓碑。
   * 大库全量哈希耗时由调用方在后台执行；快照是 planSyncActions 的本地输入。
   */
  override syncSnapshot(libraryId: string): {
    library: { libraryId: string; displayName: string };
    assets: Array<{
      syncId: string;
      assetId: string;
      relativePath: string;
      contentHash: string;
      size: number;
      modifiedAt: string;
      metadata?: SyncAssetMetadata;
    }>;
    missingAssets: Array<{ syncId: string; relativePath: string }>;
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const assets = this.listAssets({ libraryId, recursive: true }).filter(
      (asset) => asset.deletedAt === null,
    );
    const out: Array<{
      syncId: string;
      assetId: string;
      relativePath: string;
      contentHash: string;
      size: number;
      modifiedAt: string;
      metadata?: SyncAssetMetadata;
    }> = [];
    const missingAssets: Array<{ syncId: string; relativePath: string }> = [];
    for (const asset of assets) {
      let absolutePath: string | undefined;
      try {
        absolutePath = this.resolveAssetPath(libraryId, asset.assetId);
      } catch {
        const syncId = this.readAssetSyncId(openLibrary, asset.assetId);
        if (syncId) missingAssets.push({ syncId, relativePath: asset.relativeFilePath });
        continue;
      }
      if (asset.availability !== 'available' || !existsSync(absolutePath)) {
        const syncId = this.readAssetSyncId(openLibrary, asset.assetId);
        if (syncId) missingAssets.push({ syncId, relativePath: asset.relativeFilePath });
        continue;
      }
      out.push({
        syncId: this.ensureAssetSyncId(openLibrary, asset.assetId),
        assetId: asset.assetId,
        relativePath: asset.relativeFilePath,
        contentHash: sha256FileAtPath(absolutePath),
        size: asset.byteSize,
        modifiedAt: asset.modifiedAt,
      });
    }
    const metadataByAssetId = this.readSyncAssetMetadataMap(openLibrary, out.map((asset) => asset.assetId));
    for (const asset of out) {
      asset.metadata = metadataByAssetId.get(asset.assetId) ?? emptySyncAssetMetadata();
    }
    return {
      library: { libraryId, displayName: this.libraryDisplayName(libraryId) },
      assets: out,
      missingAssets,
    };
  }

  /**
   * 把同步下载的字节导入为托管资产，并落在交换格式给出的相对路径上。
   * 只按 basename 丢进根目录会让后接入设备看到扁平 assets/（真实 WebDAV 验收已复现）。
   */
  public override importManagedFileForSync(
    openLibrary: OpenLibrary,
    libraryId: string,
    relativePath: string,
    body: Buffer,
  ): string {
    const normalized = path.posix.normalize(relativePath.replaceAll('\\', '/'));
    if (
      normalized.length === 0
      || path.posix.isAbsolute(normalized)
      || normalized.split('/').some((segment) => segment === '.' || segment === '..')
    ) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'SOURCE_NOT_FOUND' });
    }
    const destDir = path.posix.dirname(normalized);
    const basename = path.posix.basename(normalized);
    const targetFolderId = destDir === '.'
      ? undefined
      : this.ensureManagedFolderIdForRelativeDir(openLibrary, libraryId, destDir);
    const existingIds = new Set(
      (
        openLibrary.connection
          .prepare('SELECT asset_id FROM assets WHERE deleted_at IS NULL')
          .all() as Array<{ asset_id: string }>
      ).map((row) => row.asset_id),
    );
    const stageDir = mkdtempSync(path.join(tmpdir(), 'serpent-sync-import-'));
    const stagePath = path.join(stageDir, basename);
    try {
      writeFileSync(stagePath, body);
      const prepared = this.prepareOrExecuteImport({
        libraryId,
        sourceKind: 'files',
        sourcePaths: [stagePath],
        ...(targetFolderId === undefined ? {} : { targetFolderId }),
      });
      this.finishImportWithoutUserDecision(prepared, {
        suspectedDuplicate: 'create-copy',
        nameConflict: 'keep-both',
      });
    } finally {
      rmSync(stageDir, { force: true, recursive: true });
    }
    const created = (
      openLibrary.connection
        .prepare(
          `SELECT asset_id, relative_file_path
             FROM assets
            WHERE deleted_at IS NULL`,
        )
        .all() as Array<{ asset_id: string; relative_file_path: string }>
    ).filter((row) => !existingIds.has(row.asset_id));
    const matched = created.find((row) =>
      portablePathIdentity(row.relative_file_path) === portablePathIdentity(normalized)
    ) ?? created.at(-1);
    if (!matched) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'SOURCE_NOT_FOUND' });
    }
    return matched.asset_id;
  }

  public override bindSyncIdAndRelocate(
    libraryId: string,
    assetId: string,
    syncId: string,
    relativePath: string,
  ): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    openLibrary.connection
      .prepare('UPDATE assets SET sync_id = ? WHERE asset_id = ?')
      .run(syncId, assetId);
    const current = openLibrary.connection
      .prepare('SELECT relative_file_path FROM assets WHERE asset_id = ?')
      .get(assetId) as { relative_file_path: string } | undefined;
    if (
      current
      && portablePathIdentity(current.relative_file_path) !== portablePathIdentity(relativePath)
    ) {
      this.applySyncRelocate(libraryId, syncId, relativePath);
    }
  }

  /**
   * 应用远端下载内容：本地无该 syncId 资产时导入为新资产并绑定 syncId；
   * 已存在时覆盖文件并创建新 revision（external_change 管线，缩略图重建）。
   * 返回本地 assetId。
   */
  override applySyncContentUpdate(
    libraryId: string,
    syncId: string,
    relativePath: string,
    body: Buffer,
  ): { assetId: string; created: boolean } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    this.assertLibraryWritable(openLibrary);
    const existing = this.assetRowBySyncId(openLibrary, syncId);
    if (!existing) {
      return this.withSyncReplay(() => {
        const assetId = this.importManagedFileForSync(openLibrary, libraryId, relativePath, body);
        this.bindSyncIdAndRelocate(libraryId, assetId, syncId, relativePath);
        return { assetId, created: true };
      });
    }

    // 已存在：覆盖文件 + 新 revision。
    return this.withSyncReplay(() => {
      const absolutePath = existing.location_kind === 'linked'
        ? this.linkedAssetPath(openLibrary, existing.linked_folder_id, existing.relative_file_path)
        : this.folderPath(openLibrary, existing.relative_file_path);
      mkdirSync(path.dirname(absolutePath), { recursive: true });
      writeFileSync(absolutePath, body);
      const stat = statSync(absolutePath);
      const now = new Date().toISOString();
      const fingerprint = sha256FileAtPath(absolutePath);
      const revisionId = randomUUID();
      openLibrary.connection
        .prepare(
          `INSERT INTO revisions
             (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
              original_filename, origin, accepted_at, content_fingerprint)
           VALUES (?, ?, ?, ?, ?, ?, 'external_change', ?, ?)`,
        )
        .run(
          revisionId,
          existing.asset_id,
          existing.current_revision_id,
          stat.size,
          stat.mtime.toISOString(),
          path.posix.basename(existing.relative_file_path),
          now,
          fingerprint,
        );
      openLibrary.connection
        .prepare(
          `UPDATE assets
              SET current_revision_id = ?, availability = 'available', updated_at = ?
            WHERE asset_id = ?`,
        )
        .run(revisionId, now, existing.asset_id);
      openLibrary.connection
        .prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE revision_id = ? AND invalidated_at IS NULL`,
        )
        .run(now, existing.current_revision_id);
      if (
        this.thumbnailEligible(libraryId, existing.relative_file_path)
        && !this.isExplicitlyIgnored(
          openLibrary,
          existing.location_kind,
          existing.linked_folder_id,
          existing.relative_file_path,
          'asset',
        )
      ) {
        openLibrary.connection
          .prepare(
            `INSERT OR IGNORE INTO jobs
               (job_id, library_id, asset_id, revision_id, kind, status, priority,
                progress, attempt_count, created_at, updated_at)
             VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', 300, 0.0, 0, ?, ?)`,
          )
          .run(randomUUID(), libraryId, existing.asset_id, revisionId, now, now);
      }
      this.syncAssetSearchContent(openLibrary.connection, existing.asset_id);
      this.emitClientAssetsChanged(libraryId, 1);
      return { assetId: existing.asset_id, created: false };
    });
  }

  /**
   * 远端单侧改路径：按交换格式相对路径搬动托管资产（建缺失文件夹后走既有 managed-move）。
   * 链接资产保持外部目录布局，此处为 no-op。
   */
  override applySyncRelocate(libraryId: string, syncId: string, relativePath: string): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    this.assertLibraryWritable(openLibrary);
    const existing = openLibrary.connection
      .prepare(
        `SELECT asset_id, relative_file_path, location_kind, managed_folder_id, availability
           FROM assets
          WHERE sync_id = ? AND deleted_at IS NULL`,
      )
      .get(syncId) as
      | {
          asset_id: string;
          relative_file_path: string;
          location_kind: 'managed' | 'linked';
          managed_folder_id: string | null;
          availability: 'available' | 'missing';
        }
      | undefined;
    if (!existing) return;
    if (existing.location_kind !== 'managed') return;
    if (existing.availability !== 'available') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (portablePathIdentity(existing.relative_file_path) === portablePathIdentity(relativePath)) return;
    this.withSyncReplay(() => {
      const destDir = path.posix.dirname(relativePath);
      const destinationFolderId = destDir === '.' ? null : this.ensureManagedFolderIdForRelativeDir(
        openLibrary,
        libraryId,
        destDir,
      );
      const operationId = randomUUID();
      if (this.managedMoveConflict(openLibrary, operationId, '0', relativePath, existing.asset_id)) {
        throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
      }
      this.applyManagedMoveOperation(openLibrary, operationId, {
        files: [{
          assetId: existing.asset_id,
          destinationConflict: null,
          destinationFolderId,
          destinationRelativePath: relativePath,
          restoreConflict: null,
          sourceFolderId: existing.managed_folder_id,
          sourceRelativePath: existing.relative_file_path,
        }],
        kind: 'managed-move',
        originalOperationId: null,
        version: 4,
      });
      this.pruneEmptyManagedFoldersAfterSyncRelocate(openLibrary, existing.managed_folder_id);
      this.noteClientFilesystemMutation();
      this.emitClientAssetsChanged(libraryId, 1);
    });
  }

  /**
   * Sync replay only moves files (the exchange format is a file layout). After a
   * relocate the source directory can remain as an empty managed_folders row on
   * the receiving device. Walk the source folder and empty ancestors and remove
   * them: no child folders, no managed assets, and rmdir of an empty disk dir.
   * Folders that still have contents are left in place. Missing disk dirs still
   * drop the index row so the sidebar cannot keep a phantom empty folder.
   */
  public override pruneEmptyManagedFoldersAfterSyncRelocate(
    openLibrary: OpenLibrary,
    folderId: string | null,
  ): void {
    const childCount = openLibrary.connection.prepare(
      'SELECT COUNT(*) AS count FROM managed_folders WHERE parent_folder_id = ?',
    );
    const assetCount = openLibrary.connection.prepare(
      `SELECT COUNT(*) AS count FROM assets
         WHERE managed_folder_id = ? AND location_kind = 'managed'`,
    );
    const loadFolder = openLibrary.connection.prepare(
      'SELECT folder_id, parent_folder_id, relative_path FROM managed_folders WHERE folder_id = ?',
    );
    const remove = openLibrary.connection.prepare(
      'DELETE FROM managed_folders WHERE folder_id = ?',
    );

    let currentId: string | null = folderId;
    while (currentId) {
      const row = loadFolder.get(currentId) as
        | { folder_id: string; parent_folder_id: string | null; relative_path: string }
        | undefined;
      if (!row) break;
      const children = childCount.get(row.folder_id) as { count: number };
      const assets = assetCount.get(row.folder_id) as { count: number };
      if (children.count !== 0 || assets.count !== 0) break;

      const directoryPath = this.folderPath(openLibrary, row.relative_path);
      if (realDirectoryExists(directoryPath)) {
        try {
          rmdirSync(directoryPath);
        } catch (error) {
          if (!isMissingPathError(error)) {
            const code = typeof error === 'object' && error !== null && 'code' in error
              ? (error as { code?: unknown }).code
              : undefined;
            if (code === 'ENOTEMPTY' || code === 'EEXIST') break;
            throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
          }
        }
      }

      const parentId = row.parent_folder_id;
      if (remove.run(row.folder_id).changes !== 1) break;
      currentId = parentId;
    }
  }

  /** 按 posix 相对路径逐级确保托管文件夹存在，返回最内层 folder_id。 */
  public override ensureManagedFolderIdForRelativeDir(
    openLibrary: OpenLibrary,
    libraryId: string,
    relativeDir: string,
  ): string {
    const segments = relativeDir.split('/').filter((part) => part.length > 0);
    let parentId: string | undefined;
    let acc = '';
    for (const segment of segments) {
      acc = acc === '' ? segment : `${acc}/${segment}`;
      const existing = openLibrary.connection
        .prepare(
          'SELECT folder_id FROM managed_folders WHERE path_identity = ?',
        )
        .get(portablePathIdentity(acc)) as { folder_id: string } | undefined;
      if (existing) {
        parentId = existing.folder_id;
        continue;
      }
      try {
        const created = this.createManagedFolder({
          libraryId,
          name: segment,
          ...(parentId === undefined ? {} : { parentFolderId: parentId }),
        });
        parentId = created.folderId;
      } catch (error) {
        if (!(error instanceof LibraryServiceError) || error.code !== 'FOLDER_ALREADY_EXISTS') throw error;
        const raced = openLibrary.connection
          .prepare(
            'SELECT folder_id FROM managed_folders WHERE path_identity = ?',
          )
          .get(portablePathIdentity(acc)) as { folder_id: string } | undefined;
        if (!raced) throw error;
        parentId = raced.folder_id;
      }
    }
    if (!parentId) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    return parentId;
  }

  /** 远端墓碑传播：本地资产进回收站（已回收资产为幂等 no-op）。 */
  override applySyncRecycle(libraryId: string, syncId: string): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = this.assetRowBySyncId(openLibrary, syncId);
    if (!row) return;
    this.withSyncReplay(() => {
      this.trashAssets({ libraryId, assetIds: [row.asset_id] });
    });
  }

  /**
   * 冲突败者副本落本地库：导入为独立资产（新 syncId，随后登记进 manifest，
   * 双端一致后不再产生动作）。返回新 syncId 与内容指纹。
   */
  override applySyncConflictCopy(
    libraryId: string,
    relativePath: string,
    body: Buffer,
    conflictName: string,
  ): { syncId: string; contentHash: string; size: number } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    this.assertLibraryWritable(openLibrary);
    return this.withSyncReplay(() => {
      const assetId = this.importManagedFileForSync(openLibrary, libraryId, conflictName, body);
      const syncId = randomUUID();
      this.bindSyncIdAndRelocate(libraryId, assetId, syncId, conflictName);
      return {
        syncId,
        contentHash: sha256FileAtPath(this.resolveAssetPath(libraryId, assetId)),
        size: body.length,
      };
    });
  }

  override readSyncAssetMetadata(libraryId: string, syncId: string): SyncAssetMetadata {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = this.assetRowBySyncId(openLibrary, syncId);
    if (!row) return emptySyncAssetMetadata();
    return this.readSyncAssetMetadataMap(openLibrary, [row.asset_id]).get(row.asset_id)
      ?? emptySyncAssetMetadata();
  }

  override applySyncAssetMetadata(libraryId: string, syncId: string, metadata: SyncAssetMetadata): void {
    this.withSyncReplay(() => {
      const openLibrary = this.requireOpenLibrary(libraryId);
      this.assertLibraryWritable(openLibrary);
      const row = this.assetRowBySyncId(openLibrary, syncId);
      if (!row) return;
      const current = this.getAssetMetadata({ libraryId, assetId: row.asset_id });
      const currentHuman = current.tags.filter((tag) => tag.source === 'user');
      const desired = new Set(metadata.tags.map((tag) => tag.trim()).filter(Boolean));
      const toRemove = currentHuman.filter((tag) => !desired.has(tag.name));
      if (toRemove.length > 0) {
        this.removeTags({
          libraryId,
          assetIds: [row.asset_id],
          tagIds: toRemove.map((tag) => tag.id),
        });
      }
      for (const name of desired) {
        if (currentHuman.some((tag) => tag.name === name)) continue;
        const tag = this.findOrCreateTagByName(openLibrary, name);
        this.assignTags({ libraryId, assetIds: [row.asset_id], tagIds: [tag.tagId] });
      }
      this.setAssetMetadata({
        libraryId,
        assetId: row.asset_id,
        expectedVersion: current.entityVersion,
        description: metadata.description ?? '',
        rating: metadata.rating,
        favorite: metadata.favorite,
      });
      if (metadata.ai) {
        this.writeAiAnalysisResult({
          libraryId,
          assetId: row.asset_id,
          description: metadata.ai.description ?? undefined,
          tags: metadata.ai.tags,
          rating: metadata.ai.rating,
          modelId: metadata.ai.modelId || 'sync',
          modelVersion: metadata.ai.modelVersion || '1',
          enabledFields: { description: true, tags: true, rating: true },
        });
      }
    });
  }

  public override findOrCreateTagByName(openLibrary: OpenLibrary, name: string): TagSummary {
    const existing = openLibrary.connection
      .prepare('SELECT tag_id, name FROM tags WHERE library_id = ? AND name = ?')
      .get(openLibrary.summary.libraryId, name) as { tag_id: string; name: string } | undefined;
    if (existing) {
      return { tagId: existing.tag_id, name: existing.name, assetCount: 0 };
    }
    try {
      return this.createTag({ libraryId: openLibrary.summary.libraryId, name });
    } catch (error) {
      if (error instanceof LibraryServiceError && error.code === 'FOLDER_ALREADY_EXISTS') {
        const retry = openLibrary.connection
          .prepare('SELECT tag_id, name FROM tags WHERE library_id = ? AND name = ?')
          .get(openLibrary.summary.libraryId, name) as { tag_id: string; name: string } | undefined;
        if (retry) return { tagId: retry.tag_id, name: retry.name, assetCount: 0 };
      }
      throw error;
    }
  }

  public override readSyncAssetMetadataMap(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
  ): Map<string, SyncAssetMetadata> {
    const map = new Map<string, SyncAssetMetadata>();
    if (assetIds.length === 0) return map;
    for (const assetId of assetIds) {
      map.set(assetId, emptySyncAssetMetadata());
    }
    if (hasTable(openLibrary.connection, 'tags') && hasTable(openLibrary.connection, 'human_asset_tags')) {
      const tagRows = sqliteAllInChunks<string, { asset_id: string; name: string }>({
        connection: openLibrary.connection,
        values: assetIds,
        buildSql: (placeholders) =>
          `SELECT hat.asset_id, t.name
             FROM human_asset_tags hat
             JOIN tags t ON t.tag_id = hat.tag_id
            WHERE hat.asset_id IN (${placeholders})`,
      });
      for (const row of tagRows) {
        const current = map.get(row.asset_id) ?? emptySyncAssetMetadata();
        if (!current.tags.includes(row.name)) current.tags.push(row.name);
        map.set(row.asset_id, current);
      }
    }
    if (hasTable(openLibrary.connection, 'asset_metadata')) {
      const metaRows = sqliteAllInChunks<string, {
        asset_id: string;
        description: string | null;
        rating: number;
        favorite: number;
      }>({
        connection: openLibrary.connection,
        values: assetIds,
        buildSql: (placeholders) =>
          `SELECT asset_id, description, rating, favorite
             FROM asset_metadata
            WHERE asset_id IN (${placeholders})`,
      });
      for (const row of metaRows) {
        const current = map.get(row.asset_id) ?? emptySyncAssetMetadata();
        current.description = row.description?.trim() ? row.description.trim() : null;
        current.rating = row.rating;
        current.favorite = row.favorite !== 0;
        map.set(row.asset_id, current);
      }
    }
    this.attachSyncAiLayer(openLibrary, assetIds, map);
    return map;
  }

  public override attachSyncAiLayer(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
    map: Map<string, SyncAssetMetadata>,
  ): void {
    if (assetIds.length === 0) return;
    const aiTagsByAsset = new Map<string, string[]>();
    const modelByAsset = new Map<string, { modelId: string; modelVersion: string }>();
    if (hasTable(openLibrary.connection, 'tags') && hasTable(openLibrary.connection, 'ai_asset_tags')) {
      const aiTagRows = sqliteAllInChunks<string, {
        asset_id: string;
        name: string;
        model_id: string;
        model_version: string;
      }>({
        connection: openLibrary.connection,
        values: assetIds,
        buildSql: (placeholders) =>
          `SELECT aat.asset_id, t.name, aat.model_id, aat.model_version
             FROM ai_asset_tags aat
             JOIN tags t ON t.tag_id = aat.tag_id
            WHERE aat.asset_id IN (${placeholders})`,
      });
      for (const row of aiTagRows) {
        const tags = aiTagsByAsset.get(row.asset_id) ?? [];
        if (!tags.includes(row.name)) tags.push(row.name);
        aiTagsByAsset.set(row.asset_id, tags);
        if (!modelByAsset.has(row.asset_id)) {
          modelByAsset.set(row.asset_id, { modelId: row.model_id, modelVersion: row.model_version });
        }
      }
    }
    const descriptionByAsset = new Map<string, { value: string; generatedAt: string }>();
    const ratingByAsset = new Map<string, { value: number; generatedAt: string }>();
    if (hasTable(openLibrary.connection, 'ai_content')) {
      const contentRows = sqliteAllInChunks<string, {
        asset_id: string;
        field_name: string;
        value: string;
        model_id: string;
        model_version: string;
        generated_at: string;
      }>({
        connection: openLibrary.connection,
        values: assetIds,
        buildSql: (placeholders) =>
          `SELECT asset_id, field_name, value, model_id, model_version, generated_at
             FROM ai_content
            WHERE asset_id IN (${placeholders})
              AND field_name IN ('description', 'rating')`,
      });
      for (const row of contentRows) {
        const generatedAt = row.generated_at ?? '';
        if (row.field_name === 'description') {
          const current = descriptionByAsset.get(row.asset_id);
          if (!current || generatedAt >= current.generatedAt) {
            const trimmed = row.value.trim();
            if (trimmed) descriptionByAsset.set(row.asset_id, { value: trimmed, generatedAt });
          }
        }
        if (row.field_name === 'rating') {
          const score = Number.parseInt(row.value.trim(), 10);
          if (Number.isInteger(score) && score >= 1 && score <= 5) {
            const current = ratingByAsset.get(row.asset_id);
            if (!current || generatedAt >= current.generatedAt) {
              ratingByAsset.set(row.asset_id, { value: score, generatedAt });
            }
          }
        }
        if (row.model_id && !modelByAsset.has(row.asset_id)) {
          modelByAsset.set(row.asset_id, { modelId: row.model_id, modelVersion: row.model_version });
        }
      }
    }
    for (const assetId of assetIds) {
      const ai = {
        tags: [...(aiTagsByAsset.get(assetId) ?? [])].sort((left, right) => left.localeCompare(right)),
        description: descriptionByAsset.get(assetId)?.value ?? null,
        rating: ratingByAsset.get(assetId)?.value ?? null,
        modelId: modelByAsset.get(assetId)?.modelId ?? 'sync',
        modelVersion: modelByAsset.get(assetId)?.modelVersion ?? '1',
      };
      if (!hasSyncAiLayer(ai)) continue;
      const current = map.get(assetId) ?? emptySyncAssetMetadata();
      current.ai = ai;
      map.set(assetId, current);
    }
  }

  /** 按 syncId 读取本地资产内容（同步上传用）。 */
  override readSyncAssetContent(libraryId: string, syncId: string): Buffer | null {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = this.assetRowBySyncId(openLibrary, syncId);
    if (!row) return null;
    return readFileSync(this.resolveAssetPath(libraryId, row.asset_id));
  }

  /** 读取本地 manifest 缓存。 */
  override readSyncManifestCache(libraryId: string): string | null {    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare('SELECT manifest_json FROM sync_manifest_cache WHERE library_id = ?')
      .get(libraryId) as { manifest_json: string } | undefined;
    return row?.manifest_json ?? null;
  }

  /** Serpent-xffq：开始一次同步会话（sync_sessions 记录，供 UI 查询状态）。 */
  override beginSyncSession(libraryId: string): string {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // 内存级互斥：自动同步（Main 调度器）与手动同步不能同时在跑。
    // 内存锁随进程消亡自动释放，崩溃残留不会误锁。
    if (this.activeSyncSessions.has(libraryId)) {
      throw new LibraryServiceError('SYNC_IN_PROGRESS', {
        reason: 'FILE_BUSY',
      });
    }
    const sessionId = randomUUID();
    this.activeSyncSessions.set(libraryId, sessionId);
    openLibrary.connection
      .prepare(
        `INSERT INTO sync_sessions (session_id, library_id, status, phase, progress_total, progress_done, started_at)
         VALUES (?, ?, 'running', 'collect', 0, 0, ?)`,
      )
      .run(sessionId, libraryId, new Date().toISOString());
    return sessionId;
  }

  /** Serpent-xffq：结束同步会话。 */
  override finishSyncSession(libraryId: string, sessionId: string, status: 'done' | 'failed' | 'cancelled', errorMessage?: string): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    if (this.activeSyncSessions.get(libraryId) === sessionId) {
      this.activeSyncSessions.delete(libraryId);
    }
    openLibrary.connection
      .prepare(
        `UPDATE sync_sessions
            SET status = ?, phase = 'idle', finished_at = ?, error_message = ?
          WHERE session_id = ? AND library_id = ?`,
      )
      .run(status, new Date().toISOString(), errorMessage ?? null, sessionId, libraryId);
  }

  /**
   * Visible-card sync badges (Serpent-871f34). Compares path/size/sidecar hash
   * against the last local manifest cache. Does not hash file bytes or call WebDAV.
   * Linked / missing / trashed assets are omitted. Synced assets are omitted.
   */
  override listSyncCardStatuses(
    libraryId: string,
    assetIds: readonly string[],
  ): Array<{ assetId: string; status: 'pending' | 'conflict' }> {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const unique: string[] = [];
    const seen = new Set<string>();
    for (const assetId of assetIds) {
      if (seen.has(assetId) || unique.length >= 300) continue;
      seen.add(assetId);
      unique.push(assetId);
    }
    if (unique.length === 0) return [];
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      sync_id: string | null;
      relative_file_path: string;
      byte_size: number;
      location_kind: 'managed' | 'linked';
      deleted_at: string | null;
      availability: string;
    }>({
      connection: openLibrary.connection,
      values: unique,
      buildSql: (placeholders) =>
        `SELECT a.asset_id, a.sync_id, a.relative_file_path, r.byte_size, a.location_kind,
                a.deleted_at, a.availability
           FROM assets a
           JOIN revisions r ON r.revision_id = a.current_revision_id
          WHERE a.asset_id IN (${placeholders})`,
    });
    let cacheEntries: Record<string, { path: string; size: number; metadataHash?: string }> = {};
    const cachedJson = this.readSyncManifestCache(libraryId);
    if (cachedJson) {
      try {
        cacheEntries = parseManifest(cachedJson).entries;
      } catch {
        cacheEntries = {};
      }
    }
    const managedIds = rows
      .filter((row) => row.location_kind === 'managed' && row.deleted_at === null)
      .map((row) => row.asset_id);
    const metadataByAssetId = this.readSyncAssetMetadataMap(openLibrary, managedIds);
    const emptyHash = metadataContentHash(emptySyncAssetMetadata());
    const out: Array<{ assetId: string; status: 'pending' | 'conflict' }> = [];
    for (const row of rows) {
      const cacheEntry = row.sync_id ? cacheEntries[row.sync_id] : undefined;
      const metadata = metadataByAssetId.get(row.asset_id) ?? emptySyncAssetMetadata();
      const pending = isLocalSyncPending({
        hasCacheEntry: Boolean(cacheEntry),
        localPath: row.relative_file_path,
        ...(cacheEntry === undefined ? {} : { cachePath: cacheEntry.path, cacheSize: cacheEntry.size }),
        localSize: row.byte_size,
        localMetadataHash: metadataContentHash(metadata),
        ...(cacheEntry?.metadataHash === undefined ? {} : { cacheMetadataHash: cacheEntry.metadataHash }),
        emptyMetadataHash: emptyHash,
      });
      const status = deriveSyncCardStatus({
        eligible: row.location_kind === 'managed'
          && row.deleted_at === null
          && row.availability === 'available',
        pending,
        syncing: false,
        conflict: false,
      });
      if (status === 'pending' || status === 'conflict') {
        out.push({ assetId: row.asset_id, status });
      }
    }
    return out;
  }

  /** 写入本地 manifest 缓存（上次同步点）。 */
  override writeSyncManifestCache(libraryId: string, manifestJson: string): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    openLibrary.connection
      .prepare(
        `INSERT INTO sync_manifest_cache (library_id, manifest_json, updated_at)
         VALUES (?, ?, ?)
         ON CONFLICT(library_id) DO UPDATE SET manifest_json = excluded.manifest_json, updated_at = excluded.updated_at`,
      )
      .run(libraryId, manifestJson, new Date().toISOString());
  }

  public override libraryDisplayName(libraryId: string): string {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const row = openLibrary.connection
      .prepare('SELECT display_name FROM library WHERE library_id = ?')
      .get(libraryId) as { display_name: string } | undefined;
    return row?.display_name ?? '';
  }

  public override persistSourceImageDimensions(
    openLibrary: OpenLibrary,
    revisionId: string,
    asset: {
      relative_file_path: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
    },
  ): { width: number; height: number } | null {
    if (detectMediaType(asset.relative_file_path) !== 'image') return null;
    const size = this.imageDimensionsForAsset(openLibrary, asset);
    if (!size) return null;
    this.persistExtractedImageDimensions(openLibrary, revisionId, size);
    return size;
  }

  /**
   * Cheap header-probed width/height so masonry/sort do not wait for thumbnails
   * (Serpent-l1oi). Skips when extracted_metadata already exists.
   */
  public override persistExtractedImageDimensions(
    openLibrary: OpenLibrary,
    revisionId: string,
    size: { width: number; height: number },
  ): void {
    if (
      !Number.isInteger(size.width)
      || !Number.isInteger(size.height)
      || size.width <= 0
      || size.height <= 0
    ) {
      return;
    }
    const existing = openLibrary.connection
      .prepare(
        `SELECT artifact_id
           FROM revision_artifacts
          WHERE revision_id = ?
            AND kind = 'extracted_metadata'
            AND invalidated_at IS NULL`,
      )
      .get(revisionId) as { artifact_id: string } | undefined;
    if (existing) return;
    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    const artifactRelPath = `${artifactId}.json`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    try {
      writeFileSync(
        artifactAbsPath,
        JSON.stringify({ width: size.width, height: size.height }),
        'utf-8',
      );
      const outputStat = statSync(artifactAbsPath);
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
          size.width,
          size.height,
          `image-header@${SHARP_VERSION}`,
          new Date().toISOString(),
        );
    } catch (error) {
      rmSync(artifactAbsPath, { force: true });
      this.diagnose('image.extracted-dimensions', error, { revisionId });
    }
  }

  /** Persist GIF duration / frame count as extracted_metadata (CU-D8). */
  public override persistGifExtractedMetadata(
    openLibrary: OpenLibrary,
    revisionId: string,
    metadata: GifExtractedMetadata,
  ): void {
    const artifactId = randomUUID();
    const artifactsDir = this.artifactsDir(openLibrary);
    mkdirSync(artifactsDir, { recursive: true });
    const artifactRelPath = `${artifactId}.json`;
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    try {
      writeFileSync(artifactAbsPath, JSON.stringify(metadata, null, 2), 'utf-8');
      const outputStat = statSync(artifactAbsPath);
      const now = new Date().toISOString();
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
              width, height, duration_ms, generator_version, status, generated_at)
           VALUES (?, ?, 'extracted_metadata', 'application/json', ?, ?, ?, ?, ?, ?, 'ready', ?)`,
        )
        .run(
          artifactId,
          revisionId,
          outputStat.size,
          artifactRelPath,
          metadata.width || null,
          metadata.height || null,
          metadata.durationMs,
          `sharp-gif-meta@${SHARP_VERSION}`,
          now,
        );
    } catch (error) {
      rmSync(artifactAbsPath, { force: true });
      this.diagnose('gif.extracted-metadata', error, { revisionId });
    }
  }

  /**
   * Remember whether audio cards should prefer cover art, and queue a rebuild
   * for grid thumbnails that would show a different image.
   */
  override setAudioPreviewPrefersCover(libraryId: string, preferCover: boolean): number {
    this.audioPreviewPrefersCover = preferCover;
    const openLibrary = this.requireOpenLibrary(libraryId);
    const audioExtensionSql = AUDIO_EXTENSION_NAMES
      .map(() => 'LOWER(a.relative_file_path) LIKE ?')
      .join(' OR ');
    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.current_revision_id, ra.artifact_id,
                ra.mime_type, ra.width, ra.height, ra.generator_version
           FROM assets a
           JOIN revision_artifacts ra ON ra.revision_id = a.current_revision_id
          WHERE a.deleted_at IS NULL
            AND a.availability = 'available'
            AND a.current_revision_id IS NOT NULL
            AND (${audioExtensionSql})
            AND ra.kind = 'thumbnail'
            AND ra.status = 'ready'
            AND ra.invalidated_at IS NULL`,
      )
      .all(...AUDIO_EXTENSION_NAMES.map((extension) => `%.${extension}`)) as Array<{
        asset_id: string;
        current_revision_id: string;
        artifact_id: string;
        mime_type: string;
        width: number | null;
        height: number | null;
        generator_version: string;
      }>;
    const stale = rows.filter((row) => audioGridThumbnailNeedsRebuild({
      preferCover,
      mimeType: row.mime_type,
      width: row.width,
      height: row.height,
      generatorVersion: row.generator_version,
    }));
    if (stale.length === 0) return 0;
    const now = new Date().toISOString();
    const invalidate = openLibrary.connection.prepare(
      `UPDATE revision_artifacts
          SET invalidated_at = ?
        WHERE artifact_id = ?
          AND invalidated_at IS NULL`,
    );
    const activeJob = openLibrary.connection.prepare(
      `SELECT 1 FROM jobs
        WHERE asset_id = ?
          AND kind = 'generate_thumbnail'
          AND status IN ('queued', 'running', 'paused')
        LIMIT 1`,
    );
    const insert = openLibrary.connection.prepare(
      `INSERT INTO jobs
         (job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
          attempt_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', 200, 0.0, 0, ?, ?)`,
    );
    let enqueued = 0;
    openLibrary.connection.transaction(() => {
      for (const row of stale) {
        invalidate.run(now, row.artifact_id);
        if (activeJob.get(row.asset_id)) continue;
        insert.run(
          randomUUID(),
          libraryId,
          row.asset_id,
          row.current_revision_id,
          now,
          now,
        );
        enqueued += 1;
      }
    })();
    return enqueued;
  }

}
