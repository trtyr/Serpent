/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { EagleImportedMetadata, ImportSourceEntry, OpenLibrary} from '../library-service-internals';
import { DEFAULT_LINKED_FOLDER_RULES, LibraryServiceError, directoryBirthNs, isDefaultIgnoredAssetEntry, isMissingPathError, requireSharp, runSharpDecoder, sameSourceSnapshot, serviceError, sourceChanged, sourceDeviceHint, sourceSnapshot, unsupportedSourceEntry } from '../library-service-internals';
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
import { LibraryServicePaths } from './LibraryServicePaths';

/** LibraryServiceIngestion: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceIngestion extends LibraryServicePaths {

  /**
   * Probe disk siblings for numbered image runs covering the selection.
   * Frames must share one pixel size (sharp metadata). A candidate is offered
   * only when every frame in the numbered run is readable and has the same
   * dimensions; a mismatched frame rejects the complete candidate.
   */
  override async probeImageSequenceImportOffer(input: {
    libraryId: string;
    targetFolderId?: string;
    targetCollectionId?: string;
    sourcePaths: string[];
  }): Promise<ImageSequenceImportOffer | null> {
    this.requireOpenLibrary(input.libraryId);

    const selectedPaths: string[] = [];
    const selectedPathSet = new Set<string>();
    for (const rawPath of input.sourcePaths) {
      try {
        const selectedPath = normalizeAbsolutePath(rawPath);
        if (selectedPathSet.has(selectedPath)) continue;
        selectedPathSet.add(selectedPath);
        selectedPaths.push(selectedPath);
      } catch {
        // Invalid selection paths are ignored for probing.
      }
    }
    if (selectedPaths.length === 0) return null;

    const sharp = requireSharp();
    const sequencesBySelectedPath = discoverSelectedImageSequenceFrames(selectedPaths);
    const metadataCache = new Map<string, { width: number; height: number } | null>();
    const sequences: ImageSequenceImportOffer['sequences'] = [];
    const seenRunKeys = new Set<string>();

    const readSize = async (
      absolutePath: string,
    ): Promise<{ width: number; height: number } | null> => {
      if (metadataCache.has(absolutePath)) {
        return metadataCache.get(absolutePath) ?? null;
      }
      try {
        const metadata = await runSharpDecoder(
          undefined,
          'background',
          () => sharp(absolutePath).metadata(),
        );
        const width = metadata.width;
        const height = metadata.height;
        if (
          typeof width !== 'number' ||
          typeof height !== 'number' ||
          !Number.isInteger(width) ||
          !Number.isInteger(height) ||
          width <= 0 ||
          height <= 0
        ) {
          metadataCache.set(absolutePath, null);
          return null;
        }
        const size = { width, height };
        metadataCache.set(absolutePath, size);
        return size;
      } catch {
        metadataCache.set(absolutePath, null);
        return null;
      }
    };

    for (const selectedPath of selectedPaths) {
      const candidate = sequencesBySelectedPath.get(selectedPath)?.candidate;
      if (!candidate) continue;
      const runKey = candidate.frames.map((frame) => frame.value).join('\0');
      if (seenRunKeys.has(runKey)) continue;
      seenRunKeys.add(runKey);

      await Promise.all(
        candidate.frames.map(async (frame) => {
          try {
            await readSize(normalizeAbsolutePath(frame.value));
          } catch {
            // Cached as null inside readSize on failure paths.
          }
        }),
      );

      const referenceSize = await readSize(selectedPath);
      if (!referenceSize) continue;

      const matching: ImageSequenceFrameCandidate[] = [];
      let complete = true;
      for (const frame of candidate.frames) {
        let absolutePath: string;
        try {
          absolutePath = normalizeAbsolutePath(frame.value);
        } catch {
          complete = false;
          continue;
        }
        const size = metadataCache.get(absolutePath);
        if (
          !size ||
          size.width !== referenceSize.width ||
          size.height !== referenceSize.height
        ) {
          complete = false;
          continue;
        }
        matching.push({ ...frame, value: absolutePath });
      }
      if (!complete || matching.length !== candidate.frames.length) continue;
      if (!matching.some((frame) => selectedPathSet.has(frame.value))) continue;
      const firstFrame = matching[0]!.frameNumber;
      const lastFrame = matching.at(-1)!.frameNumber;
      sequences.push({
        displayName: formatImageSequenceDisplayName({
          prefix: candidate.prefix,
          firstFrame,
          lastFrame,
          numberStyle: candidate.numberStyle,
          numericWidth: candidate.numericWidth,
        }),
        extension: candidate.extension,
        firstFrame,
        frameCount: matching.length,
        framePaths: matching.map((frame) => frame.value),
        height: referenceSize.height,
        lastFrame,
        numberStyle: candidate.numberStyle,
        numericWidth: candidate.numericWidth,
        prefix: candidate.prefix,
        width: referenceSize.width,
      });
    }

    if (sequences.length === 0) return null;
    return {
      defaultFps: DEFAULT_IMAGE_SEQUENCE_FPS,
      libraryId: input.libraryId,
      selectedPaths,
      sequences,
      ...(input.targetFolderId ? { targetFolderId: input.targetFolderId } : {}),
      ...(input.targetCollectionId
        ? { targetCollectionId: input.targetCollectionId }
        : {}),
    };
  }

  public override enumerateImportSources(input: {
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    targetPrefix: string;
    expandImageSequences?: boolean;
    sourcePageUrl?: string;
  }): { directories: string[]; entries: ImportSourceEntry[]; skipped: SkippedImportSource[] } {
    const directories = new Set<string>();
    const pathsByIdentity = new Map<string, { kind: 'directory' | 'file'; path: string }>();
    const entries: ImportSourceEntry[] = [];
    const skipped: SkippedImportSource[] = [];
    const recordSkippable = (error: unknown, sourcePath: string): void => {
      if (!isSkippableImportSourceFailure(error)) throw error;
      skipped.push(skippedImportSourceFromError(error, sourcePath));
    };
    const assertSupportedSourceSegment = (segment: string): void => {
      if (path.sep === '/' && segment.includes('\\')) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'NAME_NOT_SUPPORTED',
        });
      }
    };
    const registerPortablePath = (
      relativePath: string,
      kind: 'directory' | 'file',
    ): void => {
      const identity = portablePathIdentity(relativePath);
      const existing = pathsByIdentity.get(identity);
      if (
        existing &&
        (existing.kind !== kind || (kind === 'directory' && existing.path !== relativePath))
      ) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'NAME_NOT_SUPPORTED',
        });
      }
      pathsByIdentity.set(identity, { kind, path: relativePath });
    };
    const addFile = (sourcePath: string, relativePath: string): void => {
      if (isDefaultIgnoredAssetEntry(path.basename(sourcePath), 'file')) return;
      let sourceStat: BigIntStats;
      try {
        sourceStat = lstatSync(sourcePath, { bigint: true });
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
      }
      if (sourceStat.isSymbolicLink() || !sourceStat.isFile()) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: sourceStat.isSymbolicLink()
            ? 'SYMBOLIC_LINK_NOT_ALLOWED'
            : 'UNSUPPORTED_FILE_ENTRY',
        });
      }
      let normalized: string;
      try {
        normalized = normalizeRelativeAssetPath(relativePath);
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
      }
      assertSupportedSourceSegment(path.basename(sourcePath));
      registerPortablePath(normalized, 'file');
      const byteSize = Number(sourceStat.size);
      if (!Number.isSafeInteger(byteSize)) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'UNSUPPORTED_FILE_ENTRY',
        });
      }
      entries.push({
        byteSize,
        destinationRelativePath: normalized,
        ...(input.sourcePageUrl === undefined ? {} : { sourcePageUrl: input.sourcePageUrl }),
        sourceSnapshot: sourceSnapshot(sourceStat),
        sourcePath,
      });
    };

    const visitDirectory = (directoryPath: string, relativeDirectory: string): void => {
      let directoryStat: BigIntStats;
      try {
        directoryStat = lstatSync(directoryPath, { bigint: true });
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
      }
      if (directoryStat.isSymbolicLink() || !directoryStat.isDirectory()) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: directoryStat.isSymbolicLink()
            ? 'SYMBOLIC_LINK_NOT_ALLOWED'
            : 'UNSUPPORTED_FILE_ENTRY',
        });
      }
      let normalizedDirectory: string;
      try {
        normalizedDirectory = normalizeRelativeAssetPath(relativeDirectory);
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
      }
      assertSupportedSourceSegment(path.basename(directoryPath));
      registerPortablePath(normalizedDirectory, 'directory');
      directories.add(normalizedDirectory);
      let children;
      try {
        children = readdirSync(directoryPath, { withFileTypes: true }).sort((left, right) =>
          left.name.localeCompare(right.name),
        );
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
      }
      // Node does not expose openat(2)/directory-handle-relative traversal, so a
      // hostile writer can still replace an ancestor between individual calls.
      // Revalidate every directory at access time and every child again before
      // opening it; no imported bytes are accepted from a pathname-only read.
      let directoryAfterRead: BigIntStats;
      try {
        directoryAfterRead = lstatSync(directoryPath, { bigint: true });
      } catch (error) {
        throw sourceChanged(error);
      }
      if (directoryAfterRead.isSymbolicLink()) {
        throw unsupportedSourceEntry('SYMBOLIC_LINK_NOT_ALLOWED');
      }
      if (
        !directoryAfterRead.isDirectory() ||
        !sameSourceSnapshot(sourceSnapshot(directoryStat), sourceSnapshot(directoryAfterRead))
      ) {
        throw sourceChanged();
      }
      for (const child of children) {
        const childKind = child.isDirectory() ? 'directory' : 'file';
        if (isDefaultIgnoredAssetEntry(child.name, childKind)) continue;
        const childSourcePath = path.join(directoryPath, child.name);
        const childRelativePath = path.posix.join(relativeDirectory, child.name);
        try {
          assertSupportedSourceSegment(child.name);
          if (child.isSymbolicLink()) {
            throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
            });
          }
          if (child.isDirectory()) visitDirectory(childSourcePath, childRelativePath);
          else if (child.isFile()) addFile(childSourcePath, childRelativePath);
          else {
            throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'UNSUPPORTED_FILE_ENTRY',
            });
          }
        } catch (error) {
          recordSkippable(error, childSourcePath);
        }
      }
    };

    if (input.sourceKind === 'files') {
      // Native Explorer drops can contain any mix of files and directories.
      // Keep the single-directory path above for the traditional folder
      // import, but treat every multi-source selection as a set of roots here.
      // Sequence expansion is applied only to explicitly selected files;
      // recursively walking a selected directory already discovers its files.
      const selectedFiles: string[] = [];
      const selectedDirectories: string[] = [];
      for (const rawSourcePath of input.sourcePaths) {
        let sourcePath: string;
        try {
          sourcePath = normalizeAbsolutePath(rawSourcePath);
        } catch (error) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
        }
        let sourceStat: BigIntStats;
        try {
          sourceStat = lstatSync(sourcePath, { bigint: true });
        } catch (error) {
          recordSkippable(new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error }), sourcePath);
          continue;
        }
        if (sourceStat.isSymbolicLink()) {
          recordSkippable(new LibraryServiceError('INVALID_IMPORT_SOURCE', {
            reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
          }), sourcePath);
          continue;
        }
        if (sourceStat.isDirectory()) selectedDirectories.push(sourcePath);
        else if (sourceStat.isFile()) selectedFiles.push(sourcePath);
        else {
          recordSkippable(new LibraryServiceError('INVALID_IMPORT_SOURCE', {
            reason: 'UNSUPPORTED_FILE_ENTRY',
          }), sourcePath);
        }
      }
      const filePaths = input.expandImageSequences
        ? this.expandImageSequenceSourcePaths(selectedFiles)
        : selectedFiles;
      for (const sourcePath of filePaths) {
        try {
          addFile(sourcePath, path.posix.join(input.targetPrefix, path.basename(sourcePath)));
        } catch (error) {
          recordSkippable(error, sourcePath);
        }
      }
      for (const sourcePath of selectedDirectories) {
        if (sourcePath === path.parse(sourcePath).root) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
            reason: 'ROOT_NOT_ALLOWED',
          });
        }
        visitDirectory(
          sourcePath,
          path.posix.join(input.targetPrefix, path.basename(sourcePath)),
        );
      }
    } else {
      if (input.sourcePaths.length !== 1) throw new LibraryServiceError('INVALID_IMPORT_SOURCE');
      let sourcePath: string;
      try {
        sourcePath = normalizeAbsolutePath(input.sourcePaths[0]!);
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
      }
      // Serpent-8b5b.3: walking a filesystem root would import the whole disk
      // (the folder branch recurses); reject '/' and 'C:\' explicitly.
      if (sourcePath === path.parse(sourcePath).root) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'ROOT_NOT_ALLOWED',
        });
      }
      visitDirectory(
        sourcePath,
        path.posix.join(input.targetPrefix, path.basename(sourcePath)),
      );
    }

    if (entries.length === 0 && skipped.length > 0) {
      const first = skipped[0]!;
      throw new LibraryServiceError(
        'INVALID_IMPORT_SOURCE',
        first.reason === undefined ? undefined : { reason: first.reason },
      );
    }
    if (entries.length === 0 && directories.size === 0) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE');
    }
    return { directories: [...directories].sort(), entries, skipped };
  }

  public override persistEagleImportedMetadata(
    openLibrary: OpenLibrary,
    assetId: string,
    metadata: EagleImportedMetadata,
    now: string,
    collectionNextPosition?: Map<string, number>,
  ): void {
    openLibrary.connection
      .prepare(
        `INSERT INTO asset_metadata
           (asset_id, description, rating, favorite, palette,
            source_page_url, entity_version, updated_at)
         VALUES (?, ?, ?, 0, NULL, ?, 1, ?)
         ON CONFLICT(asset_id) DO UPDATE SET
           description = excluded.description,
           rating = excluded.rating,
           favorite = excluded.favorite,
           source_page_url = excluded.source_page_url,
           entity_version = asset_metadata.entity_version + 1,
           updated_at = excluded.updated_at`,
      )
      .run(
        assetId,
        metadata.description,
        metadata.rating,
        metadata.sourcePageUrl,
        now,
      );

    const insertTag = openLibrary.connection.prepare(
      'INSERT OR IGNORE INTO human_asset_tags (asset_id, tag_id) VALUES (?, ?)',
    );
    for (const tagId of metadata.tagIds) insertTag.run(assetId, tagId);

    const maxCollectionPosition = openLibrary.connection.prepare(
      'SELECT COALESCE(MAX(position), -1) AS max_position FROM collection_assets WHERE collection_id = ?',
    );
    const insertCollection = openLibrary.connection.prepare(
      'INSERT OR IGNORE INTO collection_assets (collection_id, asset_id, position) VALUES (?, ?, ?)',
    );
    for (const collectionId of metadata.collectionIds) {
      let nextPosition = collectionNextPosition?.get(collectionId);
      if (nextPosition === undefined) {
        const row = maxCollectionPosition.get(collectionId) as { max_position: number };
        nextPosition = row.max_position + 1;
      }
      insertCollection.run(collectionId, assetId, nextPosition);
      collectionNextPosition?.set(collectionId, nextPosition + 1);
    }
    // Search FTS is rebuilt once after the asset row commits; doing it here
    // doubled the GROUP_CONCAT + FTS write on every Eagle/Billfish item.
  }

  override importFolderAsLinked(input: {
    libraryId: string;
    sourceRootPath: string;
    displayName?: string;
    /** Serpent-316493: managed folder to hang the linked root under. */
    parentFolderId?: string | null;
    /**
     * Worker RPC passes false so watcher setup runs after the command returns.
     * In-process tests keep the default and still see watchers immediately.
     */
    reconcileWatchers?: boolean;
  }): LinkedFolderSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    let sourceRoot: string;
    try {
      sourceRoot = normalizeAbsolutePath(input.sourceRootPath);
    } catch (error) {
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }

    // Serpent-316493: the parent must be an active managed folder of this
    // library. Linked ids never match, so "link under a linked folder" is
    // rejected here rather than silently accepted.
    const parentFolderId = input.parentFolderId ?? null;
    if (parentFolderId !== null) {
      // managed_folders has no library_id column: the library is the database
      // file itself.
      const parent = openLibrary.connection
        .prepare('SELECT folder_id FROM managed_folders WHERE folder_id = ?')
        .get(parentFolderId);
      if (!parent) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    let rootStat: BigIntStats;
    try {
      rootStat = lstatSync(sourceRoot, { bigint: true });
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
    }
    if (rootStat.isSymbolicLink()) throw unsupportedSourceEntry('SYMBOLIC_LINK_NOT_ALLOWED');
    if (!rootStat.isDirectory()) throw unsupportedSourceEntry('UNSUPPORTED_FILE_ENTRY');

    const displayName = input.displayName ?? path.basename(sourceRoot);
    let normalizedName: string;
    try {
      normalizedName = normalizeFolderName(displayName);
    } catch (error) {
      throw serviceError(error, 'INVALID_FOLDER_NAME');
    }

    let canonicalRoot: string;
    try {
      canonicalRoot = realpathSync(sourceRoot);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
    }
    // realpath is the linked-folder identity: it canonicalizes case-insensitive
    // equivalents on APFS/NTFS and resolves any trailing-slash variants, which
    // is sufficient to prevent linking the same physical root twice. portable
    // path identity (NFC + casefold per segment) is not used here because the
    // helper rejects absolute paths; the linked root is device-specific anyway.
    const pathIdentity = canonicalRoot;

    // Serpent-316493 rejection rules: the library's own tree is managed by
    // Serpent, and a folder already covered by a linked root would be indexed
    // twice. Both are reported with a specific reason so the UI can explain.
    let canonicalLibraryPath = openLibrary.summary.libraryPath;
    try {
      canonicalLibraryPath = realpathSync(canonicalLibraryPath);
    } catch {
      // Unresolvable library path: fall back to the configured one.
    }
    if (pathIsWithin(canonicalLibraryPath, canonicalRoot)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'LINKED_SOURCE_INSIDE_LIBRARY',
      });
    }
    const linkedRoots = openLibrary.connection
      .prepare('SELECT absolute_root_path FROM linked_folders WHERE library_id = ?')
      .all(input.libraryId) as Array<{ absolute_root_path: string }>;
    for (const linkedRoot of linkedRoots) {
      if (!pathIsWithin(linkedRoot.absolute_root_path, canonicalRoot)) continue;
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason:
          linkedRoot.absolute_root_path === canonicalRoot
            ? 'LINKED_SOURCE_ALREADY_LINKED'
            : 'LINKED_SOURCE_INSIDE_LINKED_FOLDER',
      });
    }

    const existing = openLibrary.connection
      .prepare('SELECT folder_id FROM linked_folders WHERE path_identity = ?')
      .get(pathIdentity);
    if (existing) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'LINKED_SOURCE_ALREADY_LINKED',
      });
    }

    const folderId = randomUUID();
    const importId = randomUUID();
    const defaultRules = DEFAULT_LINKED_FOLDER_RULES.map((rule) => ({ ...rule, ruleId: randomUUID() }));
    let lastProgressAt = 0;
    const emitLinkedProgress = (
      phase: ImportProgressEvent['phase'],
      filesProcessed: number,
      totalFiles: number,
      bytesProcessed: number,
      totalBytes: number,
      force = false,
    ): void => {
      const now = Date.now();
      if (!force && now - lastProgressAt < 200) return;
      lastProgressAt = now;
      this.emitLinkedFolderImportProgress(
        importId,
        phase,
        filesProcessed,
        totalFiles,
        bytesProcessed,
        totalBytes,
      );
    };

    try {
      emitLinkedProgress('validate', 0, 0, 0, 0, true);
      let scannedBytes = 0;
      const entries = this.enumerateLinkedSources(
        canonicalRoot,
        folderId,
        defaultRules,
        (relativePath, pathKind) => this.isExplicitlyIgnored(
          openLibrary,
          'linked',
          folderId,
          relativePath,
          pathKind,
        ),
        (foundCount, entryBytes) => {
          scannedBytes += entryBytes;
          emitLinkedProgress('validate', foundCount, 0, scannedBytes, 0);
        },
      );
      const totalBytes = scannedBytes;
      emitLinkedProgress('copy', 0, entries.length, 0, totalBytes, true);
      const now = new Date().toISOString();
      const sourceDeviceHintValue = sourceDeviceHint(
        rootStat.dev,
        rootStat.ino,
        directoryBirthNs(rootStat),
      );
      const importedAssetIds: string[] = [];

      openLibrary.connection.transaction(() => {
        openLibrary.connection
          .prepare(
            `INSERT INTO linked_folders
             (folder_id, library_id, display_name, absolute_root_path, source_device_hint,
              status, path_identity, parent_folder_id, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, 'available', ?, ?, ?, ?)`,
          )
          .run(
            folderId,
            openLibrary.summary.libraryId,
            normalizedName,
            canonicalRoot,
            sourceDeviceHintValue,
            pathIdentity,
            parentFolderId,
            now,
            now,
          );
        const insertRule = openLibrary.connection.prepare(
          `INSERT INTO linked_folder_rules(rule_id, folder_id, position, action, target, pattern, enabled)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        );
        defaultRules.forEach((rule, position) => insertRule.run(
          rule.ruleId, folderId, position, rule.action, rule.target, rule.pattern, 1,
        ));
        const insertAsset = openLibrary.connection.prepare(
          `INSERT INTO assets
           (asset_id, location_kind, managed_folder_id, linked_folder_id, relative_file_path,
            path_identity, current_revision_id, availability, source_device, source_inode,
            created_at, updated_at)
         VALUES (?, 'linked', NULL, ?, ?, ?, NULL, 'available', ?, ?, ?, ?)`,
        );
        const insertRevision = openLibrary.connection.prepare(
          `INSERT INTO revisions
           (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
            original_filename, origin, accepted_at)
         VALUES (?, ?, NULL, ?, ?, ?, 'import', ?)`,
        );
        const setCurrentRevision = openLibrary.connection.prepare(
          'UPDATE assets SET current_revision_id = ?, updated_at = ? WHERE asset_id = ?',
        );
        let filesProcessed = 0;
        let bytesProcessed = 0;
        for (const entry of entries) {
          const assetId = randomUUID();
          const revisionId = randomUUID();
          const assetPathIdentity = portablePathIdentity(entry.relativePath);
          insertAsset.run(
            assetId,
            folderId,
            entry.relativePath,
            assetPathIdentity,
            entry.sourceDevice,
            entry.sourceInode,
            now,
            now,
          );
          insertRevision.run(
            revisionId,
            assetId,
            entry.byteSize,
            entry.modifiedAt,
            entry.originalFilename,
            now,
          );
          setCurrentRevision.run(revisionId, now, assetId);
          this.syncAssetSearchContent(openLibrary.connection, assetId);
          importedAssetIds.push(assetId);
          filesProcessed += 1;
          bytesProcessed += entry.byteSize;
          emitLinkedProgress(
            'copy',
            filesProcessed,
            entries.length,
            bytesProcessed,
            totalBytes,
            filesProcessed === entries.length,
          );
        }
      })();
      // GitHub #45: emit complete as soon as catalog rows are committed so
      // the renderer can drop “正在导入”. Header probes still run next for
      // masonry, but a late copy event cannot resurrect the overlay.
      emitLinkedProgress(
        'complete',
        entries.length,
        entries.length,
        totalBytes,
        totalBytes,
        true,
      );
      // A linked folder is the disk directory itself. Numbered frames stay as
      // separate files, and content that already exists elsewhere in the
      // library is still listed. Copy import is the path that asks about
      // sequences and content duplicates.
      // Header probes stay on the visible-window / dimension-backfill lanes.
      // Watcher reconcile is optional here so the Worker RPC can return as soon
      // as the catalog is committed (GitHub #45): overlay and later commands
      // do not wait on fs.watch setup.
      if (input.reconcileWatchers !== false) {
        this.reconcileLinkedWatchers(openLibrary);
      }

      return {
        folderId,
        displayName: normalizedName,
        status: 'available',
        assetCount: entries.length,
        absoluteRootPath: canonicalRoot,
        linkedFolderId: folderId,
        relativePath: '',
        // Serpent-316493: echo the requested parent (null = library root).
        parentFolderId,
        createdAt: now,
        // New linked root: default look, matching listLinkedFolders.
        appearance: null,
      };
    } catch (error) {
      emitLinkedProgress('failed', 0, 0, 0, 0, true);
      throw error;
    }
  }

  override relinkMissingFolder(input: {
    libraryId: string;
    folderId: string;
    newRootPath: string;
  }): LinkedFolderSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    // The explicit relink is authoritative for the new root. Fence any
    // in-flight watcher/open snapshot before changing the path it describes.
    this.cancelReconciliationForClientMutation(input.libraryId);
    const folder = openLibrary.connection
      .prepare(
        `SELECT folder_id, display_name, created_at, appearance_glyph_kind,
                appearance_glyph_value, appearance_color_id
           FROM linked_folders WHERE folder_id = ?`,
      )
      .get(input.folderId) as
        | {
            folder_id: string;
            display_name: string;
            created_at: string;
            appearance_glyph_kind?: string | null;
            appearance_glyph_value?: string | null;
            appearance_color_id?: string | null;
          }
        | undefined;
    if (!folder) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    let newRoot: string;
    try {
      newRoot = normalizeAbsolutePath(input.newRootPath);
    } catch (error) {
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }
    let rootStat: BigIntStats;
    try {
      rootStat = lstatSync(newRoot, { bigint: true });
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
    }
    if (rootStat.isSymbolicLink()) throw unsupportedSourceEntry('SYMBOLIC_LINK_NOT_ALLOWED');
    if (!rootStat.isDirectory()) throw unsupportedSourceEntry('UNSUPPORTED_FILE_ENTRY');

    let canonicalNewRoot: string;
    try {
      canonicalNewRoot = realpathSync(newRoot);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
    }
    const newPathIdentity = canonicalNewRoot;
    const conflict = openLibrary.connection
      .prepare(
        'SELECT folder_id FROM linked_folders WHERE path_identity = ? AND folder_id != ?',
      )
      .get(newPathIdentity, input.folderId);
    if (conflict) throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');

    const sourceDeviceHintValue = sourceDeviceHint(
      rootStat.dev,
      rootStat.ino,
      directoryBirthNs(rootStat),
    );
    const now = new Date().toISOString();

    openLibrary.connection.transaction(() => {
      openLibrary.connection
        .prepare(
          `UPDATE linked_folders
              SET absolute_root_path = ?, source_device_hint = ?, status = 'available',
                  path_identity = ?, updated_at = ?
            WHERE folder_id = ?`,
        )
        .run(canonicalNewRoot, sourceDeviceHintValue, newPathIdentity, now, input.folderId);

      const assets = openLibrary.connection
        .prepare(
          'SELECT asset_id, relative_file_path, current_revision_id, availability FROM assets WHERE linked_folder_id = ?',
        )
        .all(input.folderId) as Array<{
          asset_id: string;
          relative_file_path: string;
          current_revision_id: string;
          availability: 'available' | 'missing';
        }>;
      for (const asset of assets) {
        const assetPath = path.join(canonicalNewRoot, ...asset.relative_file_path.split('/'));
        let fileStat;
        try {
          // Route through the same stat seam as refreshManagedAssets so tests
          // can inject non-missing-path faults (EACCES/EIO) deterministically.
          fileStat = this.options.assetLstat
            ? this.options.assetLstat(assetPath)
            : lstatSync(assetPath, { bigint: true });
        } catch (error) {
          if (!isMissingPathError(error)) {
            this.diagnose(
              'linked-folder.relink-skip-asset',
              new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error }),
              { folderId: input.folderId, relativePath: asset.relative_file_path },
            );
          }
          fileStat = undefined;
        }
        if (!fileStat?.isFile() || fileStat.isSymbolicLink()) {
          if (asset.availability === 'available') {
            openLibrary.connection
              .prepare("UPDATE assets SET availability = 'missing', updated_at = ? WHERE asset_id = ?")
              .run(now, asset.asset_id);
          }
          continue;
        }
        const revisionId = randomUUID();
        openLibrary.connection
          .prepare(
            `INSERT INTO revisions
               (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                original_filename, origin, accepted_at)
             VALUES (?, ?, ?, ?, ?, ?, 'external_change', ?)`,
          )
          .run(
            revisionId,
            asset.asset_id,
            asset.current_revision_id,
            Number(fileStat.size),
            fileStat.mtime.toISOString(),
            path.posix.basename(asset.relative_file_path),
            now,
          );
        openLibrary.connection
          .prepare(
            "UPDATE assets SET current_revision_id = ?, availability = 'available', updated_at = ? WHERE asset_id = ?",
          )
          .run(revisionId, now, asset.asset_id);
      }
    })();
    this.reconcileLinkedWatchers(openLibrary);

    const countRow = openLibrary.connection
      .prepare(`SELECT COUNT(*) AS count FROM assets a
                 WHERE a.linked_folder_id = ?
                   AND NOT EXISTS (
                     SELECT 1
                       FROM asset_sequence_frames hidden_sequence_frame
                      WHERE hidden_sequence_frame.asset_id = a.asset_id
                        AND hidden_sequence_frame.position > 0
                   )`)
      .get(input.folderId) as { count: number };
    return {
      folderId: input.folderId,
      displayName: folder.display_name,
      status: 'available',
      assetCount: countRow.count,
      absoluteRootPath: canonicalNewRoot,
      linkedFolderId: input.folderId,
      relativePath: '',
      parentFolderId: null,
      createdAt: folder.created_at,
      // Relinking keeps the custom look the user already chose.
      appearance: sanitizeEntityAppearance({
        glyphKind: folder.appearance_glyph_kind,
        glyphValue: folder.appearance_glyph_value,
        colorId: folder.appearance_color_id,
      }),
    };
  }

}
