/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { ManagedFolderRow, OpenLibrary} from '../library-service-internals';
import { LibraryServiceError, navigationCheckpoint, singleDisplayArtifactJoin } from '../library-service-internals';
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
import { LibraryServiceFolderCovers } from './LibraryServiceFolderCovers';

/** LibraryServiceFolderBrowse: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceFolderBrowse extends LibraryServiceFolderCovers {

  public override listFolderNavigationCovers(openLibrary: OpenLibrary): LibraryNavigationSummary['folderCovers'] {
    const covers: NonNullable<LibraryNavigationSummary['folderCovers']> = [];
    for (const [folderId, cover] of this.loadFolderCustomCoverIndex(openLibrary)) {
      if (covers.length >= FOLDER_NAVIGATION_COVER_CAP) break;
      if (cover.assetId) {
        covers.push({
          folderId,
          assetId: cover.assetId,
          ...(cover.artifactId ? { artifactId: cover.artifactId } : {}),
          ...(cover.revisionId ? { revisionId: cover.revisionId } : {}),
        });
        continue;
      }
      if (cover.token.length > 0 && cover.token.length <= 64) {
        covers.push({ folderId, fileToken: cover.token });
      }
    }
    return covers;
  }

  public override withCustomFolderCovers(
    openLibrary: OpenLibrary,
    entries: FolderBrowseEntry[],
  ): FolderBrowseEntry[] {
    if (entries.length === 0) return entries;
    const covers = this.loadFolderCustomCoverIndex(
      openLibrary,
      entries.map((entry) => entry.folderId),
    );
    if (covers.size === 0) return entries;
    return entries.map((entry) => {
      const cover = covers.get(entry.folderId);
      if (!cover) return entry;
      const token = cover.token.length <= 64 ? cover.token : cover.token.slice(0, 64);
      if (cover.assetId) {
        return {
          ...entry,
          hasCustomCover: true,
          customCoverToken: token,
          customCoverAssetId: cover.assetId,
          ...(cover.artifactId ? { customCoverArtifactId: cover.artifactId } : {}),
          ...(cover.revisionId
            ? { customCoverSourcePreview: { assetId: cover.assetId, revisionId: cover.revisionId } }
            : {}),
        };
      }
      return { ...entry, hasCustomCover: true, customCoverToken: token };
    });
  }

  /**
   * Navigation badges only need a count. Keep them on a narrow COUNT query
   * instead of routing through searchAssets, which also builds a first page,
   * joins display metadata, and performs sequence/artifact enrichment. The
   * predicates intentionally mirror searchAssets' default browse/trash scope
   * so the progressive sidebar does not drift from the canvas visibility.
   */
  public override countNavigationAssets(input: {
    libraryId: string;
    scope: 'all' | 'root' | 'trash';
    showIgnored: boolean;
  }): number {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const connection = openLibrary.connection;
    return countCatalogNavigationAssets(connection, {
      scope: input.scope,
      showIgnored: input.showIgnored,
      showMissingLinked: this.showMissingLinkedFiles,
      explicitIgnoreSql: this.explicitIgnoreSql(connection, 'a', input.showIgnored),
      hasLinkedIgnoredAssets: hasTable(connection, 'linked_ignored_assets'),
      hasSequenceFrames: hasTable(connection, 'asset_sequence_frames'),
    });
  }

  /**
   * Build the complete navigation read model in one Worker turn. Individual
   * list methods remain public for mutation dialogs, but the main browse path
   * uses this cached aggregate so it does not enqueue one IPC and one COUNT
   * chain per sidebar section.
   */
  override getLibraryNavigationSummary(input: {
    libraryId: string;
    showIgnored?: boolean;
    includeTrashedFolders?: boolean;
  }): LibraryNavigationSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.scheduleOrphanFolderCoverSweep(openLibrary);
    const showIgnored = input.showIgnored === true;
    const includeTrashedFolders = input.includeTrashedFolders === true;
    const changeSequence = this.getChangeSequence(input.libraryId);
    const browseChangeSequence = this.getBrowseChangeSequence(input.libraryId);
    const key = `${browseChangeSequence}\u0000${showIgnored ? 'ignored' : 'visible'}\u0000${includeTrashedFolders ? 'trash-folders' : 'no-trash-folders'}\u0000${this.showMissingLinkedFiles ? 'missing-linked' : 'hide-missing-linked'}`;
    const cached = openLibrary.navigationSummaryCache;
    if (cached?.key === key) {
      // The summary contents are governed by the narrow browse sequence. Keep
      // the public broad sequence current for automation/write fencing without
      // re-running every sidebar COUNT after a thumbnail/job write.
      return cached.value.changeSequence === changeSequence
        ? cached.value
        : { ...cached.value, changeSequence };
    }

    const summary: LibraryNavigationSummary = {
      libraryId: input.libraryId,
      changeSequence,
      allAssetCount: this.countNavigationAssets({
        libraryId: input.libraryId,
        scope: 'all',
        showIgnored,
      }),
      rootAssetCount: this.countNavigationAssets({
        libraryId: input.libraryId,
        scope: 'root',
        showIgnored,
      }),
      trashedAssetCount: this.countNavigationAssets({
        libraryId: input.libraryId,
        scope: 'trash',
        showIgnored,
      }),
      folders: this.listManagedFolders(input.libraryId, showIgnored),
      linkedFolders: this.listLinkedFolders(input.libraryId),
      tags: this.listTags(input.libraryId),
      collections: this.listCollections(input.libraryId),
      smartCollections: this.listSmartCollections(input.libraryId),
      trashedFolders: includeTrashedFolders
        ? this.listTrashedFolders(input.libraryId)
        : [],
      folderCovers: this.listFolderNavigationCovers(openLibrary),
    };
    if (
      this.getChangeSequence(input.libraryId) === changeSequence
      && this.getBrowseChangeSequence(input.libraryId) === browseChangeSequence
    ) {
      openLibrary.navigationSummaryCache = { key, value: summary };
    }
    return summary;
  }

  /**
   * Progressive counterpart used by the Worker request path. Navigation is a
   * read model, but its cold construction contains several independent COUNT
   * and recursive-list queries. Yield after each pass so the scheduler can
   * run a browse page or visible-media request between them. The synchronous
   * method above remains for in-process callers and tests that need a single
   * coherent turn.
   */
  override async getLibraryNavigationSummaryAsync(input: {
    libraryId: string;
    showIgnored?: boolean;
    includeTrashedFolders?: boolean;
  }): Promise<LibraryNavigationSummary> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.scheduleOrphanFolderCoverSweep(openLibrary);
    const showIgnored = input.showIgnored === true;
    const includeTrashedFolders = input.includeTrashedFolders === true;
    const changeSequence = this.getChangeSequence(input.libraryId);
    const browseChangeSequence = this.getBrowseChangeSequence(input.libraryId);
    const key = `${browseChangeSequence}\u0000${showIgnored ? 'ignored' : 'visible'}\u0000${includeTrashedFolders ? 'trash-folders' : 'no-trash-folders'}\u0000${this.showMissingLinkedFiles ? 'missing-linked' : 'hide-missing-linked'}`;
    const cached = openLibrary.navigationSummaryCache;
    if (cached?.key === key) {
      return cached.value.changeSequence === changeSequence
        ? cached.value
        : { ...cached.value, changeSequence };
    }

    const allAssetCount = this.countNavigationAssets({
      libraryId: input.libraryId,
      scope: 'all',
      showIgnored,
    });
    await navigationCheckpoint();
    const rootAssetCount = this.countNavigationAssets({
      libraryId: input.libraryId,
      scope: 'root',
      showIgnored,
    });
    await navigationCheckpoint();
    const trashedAssetCount = this.countNavigationAssets({
      libraryId: input.libraryId,
      scope: 'trash',
      showIgnored,
    });
    await navigationCheckpoint();
    const folders = this.listManagedFolders(input.libraryId, showIgnored);
    await navigationCheckpoint();
    const linkedFolders = this.listLinkedFolders(input.libraryId);
    await navigationCheckpoint();
    const tags = this.listTags(input.libraryId);
    await navigationCheckpoint();
    const collections = this.listCollections(input.libraryId);
    await navigationCheckpoint();
    const smartCollections = this.listSmartCollections(input.libraryId);
    await navigationCheckpoint();
    const trashedFolders = includeTrashedFolders
      ? this.listTrashedFolders(input.libraryId)
      : [];

    const summary: LibraryNavigationSummary = {
      libraryId: input.libraryId,
      changeSequence,
      allAssetCount,
      rootAssetCount,
      trashedAssetCount,
      folders,
      linkedFolders,
      tags,
      collections,
      smartCollections,
      trashedFolders,
      folderCovers: this.listFolderNavigationCovers(openLibrary),
    };
    if (
      this.getChangeSequence(input.libraryId) === changeSequence
      && this.getBrowseChangeSequence(input.libraryId) === browseChangeSequence
    ) {
      openLibrary.navigationSummaryCache = { key, value: summary };
    }
    return summary;
  }

  /**
   * Indexed byte total for folder inspector details. Sums stored revision
   * sizes for the folder and its descendants. Linked folders use the catalog
   * only — this never walks the source disk.
   */
  override folderIndexedByteSizes(input: {
    libraryId: string;
    refs: Array<{ locationKind: 'managed' | 'linked'; folderId: string }>;
  }): Array<{ folderId: string; byteSize: number }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const refs = input.refs.slice(0, 32);
    const sizes = new Map<string, number>();

    const managedIds = refs
      .filter((ref) => ref.locationKind === 'managed')
      .map((ref) => ref.folderId);
    if (managedIds.length > 0) {
      const rolled = this.managedFolderIndexedByteTotals(openLibrary);
      for (const folderId of managedIds) {
        sizes.set(folderId, rolled.get(folderId) ?? 0);
      }
    }

    const linkedIds = [...new Set(refs
      .filter((ref) => ref.locationKind === 'linked')
      .map((ref) => ref.folderId))];
    if (linkedIds.length > 0) {
      const filesByRoot = new Map<string, Array<{ path: string; byteSize: number }>>();
      for (const folderId of linkedIds) {
        const resolved = this.resolveLinkedFolderScope(openLibrary, folderId);
        if (!resolved) {
          sizes.set(folderId, 0);
          continue;
        }
        let files = filesByRoot.get(resolved.linkedFolderId);
        if (!files) {
          const rows = openLibrary.connection
            .prepare(
              `SELECT a.relative_file_path AS path, COALESCE(r.byte_size, 0) AS byte_size
                 FROM assets a
                 LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
                WHERE a.deleted_at IS NULL
                  AND a.location_kind = 'linked'
                  AND a.linked_folder_id = ?
                  AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', false)}`,
            )
            .all(resolved.linkedFolderId) as Array<{ path: string; byte_size: number }>;
          files = rows.map((file) => ({ path: file.path, byteSize: Number(file.byte_size) || 0 }));
          filesByRoot.set(resolved.linkedFolderId, files);
        }
        const prefix = resolved.relativePath;
        const total = files.reduce((sum, file) => {
          if (prefix === '' || file.path === prefix || file.path.startsWith(`${prefix}/`)) {
            return sum + file.byteSize;
          }
          return sum;
        }, 0);
        sizes.set(folderId, total);
      }
    }

    return refs.map((ref) => ({
      folderId: ref.folderId,
      byteSize: sizes.get(ref.folderId) ?? 0,
    }));
  }

  public override managedFolderIndexedByteTotals(openLibrary: OpenLibrary): Map<string, number> {
    const folders = openLibrary.connection
      .prepare('SELECT folder_id, parent_folder_id FROM managed_folders')
      .all() as Array<{ folder_id: string; parent_folder_id: string | null }>;
    const totals = new Map(folders.map((folder) => [folder.folder_id, 0]));
    const direct = openLibrary.connection
      .prepare(
        `SELECT a.managed_folder_id AS folder_id, COALESCE(SUM(r.byte_size), 0) AS bytes
           FROM assets a
           LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
          WHERE a.deleted_at IS NULL
            AND a.location_kind = 'managed'
            AND a.managed_folder_id IS NOT NULL
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', false)}
          GROUP BY a.managed_folder_id`,
      )
      .all() as Array<{ folder_id: string; bytes: number }>;
    for (const row of direct) {
      if (totals.has(row.folder_id)) totals.set(row.folder_id, Number(row.bytes) || 0);
    }
    const depth = new Map<string, number>();
    const byId = new Map(folders.map((folder) => [folder.folder_id, folder]));
    const depthOf = (folderId: string): number => {
      const cached = depth.get(folderId);
      if (cached !== undefined) return cached;
      const parentId = byId.get(folderId)?.parent_folder_id;
      const value = parentId ? depthOf(parentId) + 1 : 0;
      depth.set(folderId, value);
      return value;
    };
    const deepestFirst = [...folders].sort(
      (left, right) => depthOf(right.folder_id) - depthOf(left.folder_id),
    );
    for (const folder of deepestFirst) {
      if (!folder.parent_folder_id) continue;
      totals.set(
        folder.parent_folder_id,
        (totals.get(folder.parent_folder_id) ?? 0) + (totals.get(folder.folder_id) ?? 0),
      );
    }
    return totals;
  }

  /**
   * Recursive counts for the assets that match the current discovery filters.
   * Folder ids match the sidebar: managed folder ids, linked roots, and
   * linked virtual subdirectory ids. Folders with no matches are omitted.
   */
  override filteredFolderCounts(input: {
    libraryId: string;
    filters?: FilterClause[] | null;
    showIgnored?: boolean;
  }): {
    all: number;
    root: number;
    folders: Array<{ folderId: string; count: number }>;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const connection = openLibrary.connection;
    const filters = input.filters ?? [];
    const showIgnored = input.showIgnored === true;
    const artifactColumns = columnsFor(connection, 'revision_artifacts');
    const hasIgnoreTable = hasTable(connection, 'linked_ignored_assets');
    const hasAiContent = hasTable(connection, 'ai_content');
    const hasAiAssetTags = hasTable(connection, 'ai_asset_tags');
    const hasSequenceFrames = hasTable(connection, 'asset_sequence_frames');
    const filterFields = new Set(filters.map((filter) => filter.field));
    const { sql: filterWhere, params: filterParams } = this.buildFilterWhere(filters, {
      hasAiContent,
      hasAiAssetTags,
    });
    const needsDurationMeta =
      filterFields.has('width') ||
      filterFields.has('height') ||
      filterFields.has('duration_ms') ||
      filterFields.has('long_edge') ||
      filterFields.has('aspect_ratio');
    const needsPaletteMeta = filterFields.has('color');
    const needsTechnicalThumbnail =
      filterFields.has('width') ||
      filterFields.has('height') ||
      filterFields.has('long_edge') ||
      filterFields.has('aspect_ratio');
    const needsMetadata =
      filterFields.has('rating') ||
      filterFields.has('favorite') ||
      filterFields.has('source_url');
    const durationMetaJoin = needsDurationMeta
      ? `LEFT JOIN revision_artifacts duration_meta
           ON duration_meta.revision_id = a.current_revision_id
          AND duration_meta.kind = 'extracted_metadata'
          ${artifactColumns.has('status') ? "AND duration_meta.status = 'ready'" : ''}
          AND duration_meta.invalidated_at IS NULL`
      : '';
    const paletteMetaJoin = needsPaletteMeta
      ? `LEFT JOIN revision_artifacts palette_meta
           ON palette_meta.revision_id = a.current_revision_id
          AND palette_meta.kind = 'extracted_palette'
          ${artifactColumns.has('status') ? "AND palette_meta.status = 'ready'" : ''}
          AND palette_meta.invalidated_at IS NULL`
      : '';
    const technicalThumbnailJoin = needsTechnicalThumbnail
      ? singleDisplayArtifactJoin(
          'technical_thumbnail',
          artifactColumns.has('status') ? "AND chosen.status = 'ready'" : '',
        )
      : '';
    const from = `FROM assets a
         ${needsMetadata ? 'LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id' : ''}
         ${durationMetaJoin}
         ${paletteMetaJoin}
         ${technicalThumbnailJoin}`;
    const whereParts = buildCatalogAssetVisibilityPredicates({
      scopeKind: 'all',
      showIgnored,
      showMissingLinked: this.showMissingLinkedFiles,
      explicitIgnoreSql: this.explicitIgnoreSql(connection, 'a', showIgnored),
      hasLinkedIgnoredAssets: hasIgnoreTable,
      hasSequenceFrames,
    });
    const params: unknown[] = [];
    if (filterWhere.length > 0) {
      whereParts.push(filterWhere);
      params.push(...filterParams);
    }
    const rows = connection.prepare(
      `SELECT a.location_kind AS location_kind,
              a.managed_folder_id AS managed_folder_id,
              a.linked_folder_id AS linked_folder_id,
              a.relative_file_path AS relative_file_path
         ${from}
        WHERE ${whereParts.join(' AND ')}`,
    ).all(...params) as Array<{
      location_kind: 'managed' | 'linked';
      managed_folder_id: string | null;
      linked_folder_id: string | null;
      relative_file_path: string;
    }>;

    const direct = new Map<string, number>();
    const linkedPaths = new Map<string, string[]>();
    let root = 0;
    for (const row of rows) {
      if (row.location_kind === 'linked' && row.linked_folder_id) {
        const paths = linkedPaths.get(row.linked_folder_id) ?? [];
        paths.push(row.relative_file_path);
        linkedPaths.set(row.linked_folder_id, paths);
        continue;
      }
      if (row.managed_folder_id) {
        direct.set(row.managed_folder_id, (direct.get(row.managed_folder_id) ?? 0) + 1);
      } else {
        root += 1;
      }
    }

    const managedFolders = connection.prepare(
      'SELECT folder_id, parent_folder_id FROM managed_folders',
    ).all() as Array<{ folder_id: string; parent_folder_id: string | null }>;
    const rolled = rollupDirectFolderCounts(
      managedFolders.map((folder) => ({
        folderId: folder.folder_id,
        parentFolderId: folder.parent_folder_id,
      })),
      direct,
    );
    const folders: Array<{ folderId: string; count: number }> = [];
    for (const [folderId, count] of rolled) {
      if (count > 0) folders.push({ folderId, count });
    }
    for (const [linkedFolderId, paths] of linkedPaths) {
      const counts = countLinkedDirectoryAssets(paths);
      for (const [relativePath, count] of counts) {
        if (count.recursive <= 0) continue;
        folders.push({
          folderId: relativePath === ''
            ? linkedFolderId
            : encodeLinkedVirtualFolderId(linkedFolderId, relativePath),
          count: count.recursive,
        });
      }
    }
    return { all: rows.length, root, folders };
  }

  /**
   * Direct child folder cards for the browse canvas (REQ-FOLDER-001/002/003).
   * Counts and covers are batched — never N+1 per card.
   */
  override listFolderBrowseEntries(input: {
    libraryId: string;
    parentFolderId: string | null;
    showIgnored?: boolean;
  }): FolderBrowseEntry[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.parentFolderId !== null) {
      const linkedEntries = this.listLinkedFolderBrowseEntries(openLibrary, input);
      if (linkedEntries !== null) return linkedEntries;
      const parent = openLibrary.connection
        .prepare('SELECT folder_id FROM managed_folders WHERE folder_id = ?')
        .get(input.parentFolderId) as { folder_id: string } | undefined;
      if (!parent) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    const children = (
      input.parentFolderId === null
        ? openLibrary.connection
            .prepare(
              `SELECT folder_id, parent_folder_id, name, relative_path, path_identity
                 FROM managed_folders
                WHERE parent_folder_id IS NULL
                ORDER BY name COLLATE NOCASE`,
            )
            .all()
        : openLibrary.connection
            .prepare(
              `SELECT folder_id, parent_folder_id, name, relative_path, path_identity
                 FROM managed_folders
                WHERE parent_folder_id = ?
                ORDER BY name COLLATE NOCASE`,
            )
            .all(input.parentFolderId)
    ) as ManagedFolderRow[];
    const visibleChildren = children.filter((row) =>
      input.showIgnored === true || !this.explicitFolderIgnored(openLibrary, 'managed', null, row.relative_path),
    );
    if (visibleChildren.length === 0) return [];

    const counts = this.managedFolderCountMaps(openLibrary, visibleChildren.map((row) => row.folder_id), input.showIgnored === true);
    const recursiveCounts = this.managedFolderRecursiveAssetCounts(
      openLibrary,
      visibleChildren,
      input.showIgnored === true,
    );
    const coverMap = this.folderCoverArtifactMap(
      openLibrary,
      visibleChildren.map((row) => row.folder_id),
      input.showIgnored === true,
    );
    // Serpent-d0nv: scheduling candidates are the top-3 direct assets by path
    // with NO ready-thumbnail requirement — the cover scene must enqueue the
    // folders that have no covers yet (the user-visible symptom).
    const coverCandidateMap = this.folderCoverCandidateAssetMap(
      openLibrary,
      visibleChildren.map((row) => row.folder_id),
      input.showIgnored === true,
    );

    return this.withSequenceFolderCovers(openLibrary, visibleChildren.map((row) => {
      const directAssetCount = counts.directAssetCounts.get(row.folder_id) ?? 0;
      return {
        folderId: row.folder_id,
        parentFolderId: row.parent_folder_id,
        locationKind: 'managed' as const,
        name: row.name,
        relativePath: row.relative_path,
        status: 'available' as const,
        directAssetCount,
        // Serpent-toh / REQ-FOLDER-003: display all descendant assets.
        recursiveAssetCount: recursiveCounts.get(row.folder_id) ?? directAssetCount,
        childFolderCount: counts.childFolderCounts.get(row.folder_id) ?? 0,
        coverArtifactIds: coverMap.get(row.folder_id) ?? [],
        // Serpent-d0nv: cover candidates as asset ids (cover scene scheduling
        // + progressive refresh on thumbnail.ready). Candidates do NOT require
        // a ready thumbnail — ungenerated assets get enqueued by the cover
        // scene; display covers stay ready-gated in coverArtifactIds.
        coverAssetIds: coverCandidateMap.get(row.folder_id) ?? [],
        linkedFolderId: null,
      };
    }));
  }

  /**
   * Serpent-f74e48: real FolderBrowseEntry (counts + covers) for concrete
   * folder refs matched by text search — so search-result folder cards reuse
   * the exact asset-browser cards (preview images included). Accepts managed
   * ids, linked-root ids and encoded linked virtual subdirectory ids.
   */
  override folderEntriesByRefs(input: {
    libraryId: string;
    refs: Array<{ locationKind: 'managed' | 'linked'; folderId: string }>;
  }): FolderBrowseEntry[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const results: FolderBrowseEntry[] = [];

    const managedIds = input.refs
      .filter((ref) => ref.locationKind === 'managed')
      .map((ref) => ref.folderId);
    if (managedIds.length > 0) {
      const rows = sqliteAllInChunks<string, ManagedFolderRow>({
        connection: openLibrary.connection,
        values: managedIds,
        buildSql: (placeholders) =>
          `SELECT folder_id, parent_folder_id, name, relative_path, path_identity
             FROM managed_folders
            WHERE folder_id IN (${placeholders})`,
      });
      const rowById = new Map(rows.map((row) => [row.folder_id, row]));
      const visibleIds = rows
        .filter(
          (row) =>
            !this.explicitFolderIgnored(
              openLibrary,
              'managed',
              null,
              row.relative_path,
            ),
        )
        .map((row) => row.folder_id);
      const counts = this.managedFolderCountMaps(openLibrary, visibleIds, false);
      const recursiveCounts = this.managedFolderRecursiveAssetCounts(
        openLibrary,
        rows,
        false,
      );
      const coverMap = this.folderCoverArtifactMap(openLibrary, visibleIds, false);
      const coverCandidateMap = this.folderCoverCandidateAssetMap(
        openLibrary,
        visibleIds,
        false,
      );
      for (const folderId of managedIds) {
        const row = rowById.get(folderId);
        if (!row) continue;
        if (
          this.explicitFolderIgnored(
            openLibrary,
            'managed',
            null,
            row.relative_path,
          )
        ) {
          continue;
        }
        const directAssetCount = counts.directAssetCounts.get(folderId) ?? 0;
        results.push({
          folderId: row.folder_id,
          parentFolderId: row.parent_folder_id,
          locationKind: 'managed' as const,
          name: row.name,
          relativePath: row.relative_path,
          status: 'available' as const,
          directAssetCount,
          recursiveAssetCount:
            recursiveCounts.get(folderId) ?? directAssetCount,
          childFolderCount: counts.childFolderCounts.get(folderId) ?? 0,
          coverArtifactIds: coverMap.get(folderId) ?? [],
          coverAssetIds: coverCandidateMap.get(folderId) ?? [],
          linkedFolderId: null,
        });
      }
    }

    const linkedRefs = input.refs.filter(
      (ref) => ref.locationKind === 'linked',
    );
    for (const ref of linkedRefs) {
      const resolved = this.resolveLinkedFolderScope(openLibrary, ref.folderId);
      if (!resolved) continue;
      const paths = this.listLinkedAssetRelativePaths(
        openLibrary,
        resolved.linkedFolderId,
        false,
      );
      const isRoot = resolved.relativePath === '';
      const assetCounts = countLinkedDirectoryAssets(paths);
      const directoryCounts = assetCounts.get(resolved.relativePath);
      const directAssetCount = directoryCounts?.direct ?? 0;
      const recursiveAssetCount = directoryCounts?.recursive ?? 0;
      const prefixes = collectLinkedDirectoryPrefixes(paths);
      const directChildDirs = directChildLinkedDirectories(prefixes, resolved.relativePath);
      const pureChildDirs = directAssetCount === 0 && directChildDirs.length > 0 ? directChildDirs : [];
      const name = isRoot
        ? this.linkedFolderDisplayName(openLibrary, resolved.linkedFolderId)
        : linkedDirectoryName(resolved.relativePath);
      results.push({
        folderId: ref.folderId,
        parentFolderId: null,
        locationKind: 'linked' as const,
        name,
        relativePath: resolved.relativePath,
        status: resolved.status,
        directAssetCount,
        recursiveAssetCount,
        childFolderCount: 0,
        coverArtifactIds: this.linkedDirectoryCoverArtifactIds(
          openLibrary,
          resolved.linkedFolderId,
          resolved.relativePath,
          false,
          pureChildDirs,
        ),
        coverAssetIds: this.linkedDirectoryCoverCandidateAssetIds(
          openLibrary,
          resolved.linkedFolderId,
          resolved.relativePath,
          false,
          pureChildDirs,
        ),
        linkedFolderId: resolved.linkedFolderId,
      });
    }

    return this.withSequenceFolderCovers(openLibrary, results);
  }

  public override linkedFolderDisplayName(
    openLibrary: OpenLibrary,
    linkedFolderId: string,
  ): string {
    const row = openLibrary.connection
      .prepare(
        `SELECT display_name FROM linked_folders WHERE folder_id = ?`,
      )
      .get(linkedFolderId) as { display_name: string } | undefined;
    return row?.display_name ?? 'Linked';
  }

  /**
   * Serpent-a9vh: virtual child folders for a linked root or linked subdir.
   * Returns null when `parentFolderId` is not a linked scope.
   */
  public override listLinkedFolderBrowseEntries(
    openLibrary: OpenLibrary,
    input: { parentFolderId: string | null; showIgnored?: boolean },
  ): FolderBrowseEntry[] | null {
    if (input.parentFolderId === null) return null;
    const resolved = this.resolveLinkedFolderScope(openLibrary, input.parentFolderId);
    if (!resolved) return null;

    const paths = this.listLinkedAssetRelativePaths(
      openLibrary,
      resolved.linkedFolderId,
      input.showIgnored === true,
    );
    const assetCounts = countLinkedDirectoryAssets(paths);
    const assetPrefixes = [...assetCounts.keys()].filter((prefix) => prefix !== '');
    const diskPrefixes = resolved.status === 'available' && !this.linkedRootIsGone(resolved.absoluteRootPath)
      ? this.collectLinkedDirectoryPrefixesFromDisk(
        openLibrary,
        resolved.linkedFolderId,
        resolved.absoluteRootPath,
        this.getLinkedFolderRules({
          libraryId: openLibrary.summary.libraryId,
          folderId: resolved.linkedFolderId,
        }),
      )
      : [];
    const prefixes = [...new Set([...assetPrefixes, ...diskPrefixes])].sort();
    const children = directChildLinkedDirectories(prefixes, resolved.relativePath)
      .filter((relativePath) =>
        input.showIgnored === true
        || !this.explicitFolderIgnored(openLibrary, 'linked', resolved.linkedFolderId, relativePath),
      );
    if (children.length === 0) return [];
    const directoryChildCounts = countLinkedDirectoryChildren(prefixes);

    return this.withSequenceFolderCovers(openLibrary, children.map((relativePath) => {
      const folderId = encodeLinkedVirtualFolderId(resolved.linkedFolderId, relativePath);
      const directoryAssetCounts = assetCounts.get(relativePath);
      const directAssetCount = directoryAssetCounts?.direct ?? 0;
      const recursiveAssetCount = directoryAssetCounts?.recursive ?? 0;
      const childFolderCount = directoryChildCounts.get(relativePath) ?? 0;
      const directChildDirs = childFolderCount === 0
        ? []
        : prefixes.filter((prefix) => parentLinkedRelativePath(prefix) === relativePath);
      const pureChildDirs = directAssetCount === 0 && childFolderCount > 0 ? directChildDirs : [];
      return {
        folderId,
        parentFolderId: input.parentFolderId,
        locationKind: 'linked' as const,
        name: linkedDirectoryName(relativePath),
        relativePath,
        status: resolved.status,
        directAssetCount,
        recursiveAssetCount,
        childFolderCount,
        coverArtifactIds: this.linkedDirectoryCoverArtifactIds(
          openLibrary,
          resolved.linkedFolderId,
          relativePath,
          input.showIgnored === true,
          pureChildDirs,
        ),
        // Serpent-d0nv: cover candidates as asset ids (cover scene scheduling
        // + progressive refresh on thumbnail.ready). Candidates do NOT require
        // a ready thumbnail — ungenerated assets get enqueued by the cover
        // scene; display covers stay ready-gated in coverArtifactIds.
        coverAssetIds: this.linkedDirectoryCoverCandidateAssetIds(
          openLibrary,
          resolved.linkedFolderId,
          relativePath,
          input.showIgnored === true,
          pureChildDirs,
        ),
        linkedFolderId: resolved.linkedFolderId,
      };
    }));
  }

  public override resolveLinkedFolderScope(
    openLibrary: OpenLibrary,
    folderId: string,
  ): {
    linkedFolderId: string;
    relativePath: string;
    status: 'available' | 'offline';
    absoluteRootPath: string;
  } | null {
    const virtual = parseLinkedVirtualFolderId(folderId);
    const linkedFolderId = virtual?.linkedFolderId ?? folderId;
    const row = openLibrary.connection
      .prepare(
        `SELECT folder_id, status, absolute_root_path
           FROM linked_folders
          WHERE folder_id = ? AND library_id = ?`,
      )
      .get(linkedFolderId, openLibrary.summary.libraryId) as
      | {
          folder_id: string;
          status: 'available' | 'offline';
          absolute_root_path: string;
        }
      | undefined;
    if (!row) return null;
    if (virtual && virtual.relativePath === '') return null;
    return {
      linkedFolderId: row.folder_id,
      relativePath: virtual?.relativePath ?? '',
      status: row.status,
      absoluteRootPath: row.absolute_root_path,
    };
  }

  public override listLinkedAssetRelativePaths(
    openLibrary: OpenLibrary,
    linkedFolderId: string,
    showIgnored: boolean,
  ): string[] {
    const connection = openLibrary.connection;
    const hasIgnoreTable = hasTable(connection, 'linked_ignored_assets');
    const hasSequenceFrames = hasTable(connection, 'asset_sequence_frames');
    const rows = connection
      .prepare(
        `SELECT a.relative_file_path
           FROM assets a
          WHERE a.linked_folder_id = ?
            AND a.location_kind = 'linked'
            AND a.deleted_at IS NULL
            ${this.showMissingLinkedFiles ? '' : "AND a.availability <> 'missing'"}
            ${hasIgnoreTable
              ? 'AND NOT EXISTS (SELECT 1 FROM linked_ignored_assets ignored WHERE ignored.asset_id = a.asset_id)'
              : ''}
            AND ${this.explicitIgnoreSql(connection, 'a', showIgnored)}
            ${hasSequenceFrames
              ? `AND NOT EXISTS (
              SELECT 1
                FROM asset_sequence_frames hidden_sequence_frame
               WHERE hidden_sequence_frame.asset_id = a.asset_id
                 AND hidden_sequence_frame.position > 0
            )`
              : ''}`,
      )
      .all(linkedFolderId) as Array<{ relative_file_path: string }>;
    return rows.map((row) => row.relative_file_path);
  }

  public override linkedDirectoryCoverArtifactIds(
    openLibrary: OpenLibrary,
    linkedFolderId: string,
    relativePath: string,
    showIgnored: boolean,
    childDirs: string[] = [],
  ): string[] {
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) {
      return [];
    }
    const prefix = relativePath === '' ? '' : `${relativePath}/`;
    const rows = openLibrary.connection
      .prepare(
        `SELECT ra.artifact_id, a.relative_file_path
           FROM assets a
           JOIN revision_artifacts ra
             ON ra.revision_id = a.current_revision_id
            AND ra.kind IN ('thumbnail', 'video_poster')
            AND ra.status = 'ready'
            AND ra.invalidated_at IS NULL
          WHERE a.linked_folder_id = ?
            AND a.location_kind = 'linked'
            AND a.deleted_at IS NULL
            ${this.showMissingLinkedFiles ? '' : "AND a.availability <> 'missing'"}
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', showIgnored)}
            AND (
              ? = ''
              OR a.relative_file_path = ?
              OR (? != '' AND substr(a.relative_file_path, 1, ?) = ?)
            )
          ORDER BY a.relative_file_path`,
      )
      .all(
        linkedFolderId,
        relativePath,
        relativePath,
        prefix,
        [...prefix].length,
        prefix,
      ) as Array<{ artifact_id: string; relative_file_path: string }>;

    const scopedRows = relativePath === '' && childDirs.length === 0
      ? rows.filter((row) => !row.relative_file_path.includes('/'))
      : rows;

    if (childDirs.length === 0) {
      return scopedRows.slice(0, 3).map((row) => row.artifact_id);
    }

    // Serpent-9021d1: Pure linked folder — round-robin across direct child directories
    const childPrefixes = childDirs.map((d) => (d === '' ? '' : `${d}/`));
    const byChild: string[][] = childDirs.map(() => []);
    for (const row of rows) {
      for (let i = 0; i < childDirs.length; i++) {
        const cPrefix = childPrefixes[i]!;
        if (row.relative_file_path === childDirs[i] || row.relative_file_path.startsWith(cPrefix)) {
          byChild[i]!.push(row.artifact_id);
          break;
        }
      }
    }

    const picked: string[] = [];
    let round = 0;
    while (picked.length < 4) {
      let addedInRound = false;
      for (let c = 0; c < childDirs.length && picked.length < 4; c++) {
        const list = byChild[c];
        if (list && round < list.length) {
          picked.push(list[round]!);
          addedInRound = true;
        }
      }
      if (!addedInRound) break;
      round++;
    }
    return picked;
  }

  /**
   * Serpent-d0nv: linked-directory cover scheduling candidates — the top-4
   * direct linked assets by path, with NO ready-thumbnail requirement (see
   * folderCoverCandidateAssetMap).
   */
  public override linkedDirectoryCoverCandidateAssetIds(
    openLibrary: OpenLibrary,
    linkedFolderId: string,
    relativePath: string,
    showIgnored: boolean,
    childDirs: string[] = [],
  ): string[] {
    const prefix = relativePath === '' ? '' : `${relativePath}/`;
    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.relative_file_path
           FROM assets a
          WHERE a.linked_folder_id = ?
            AND a.location_kind = 'linked'
            AND a.deleted_at IS NULL
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a', showIgnored)}
            AND (
              ? = ''
              OR a.relative_file_path = ?
              OR (? != '' AND substr(a.relative_file_path, 1, ?) = ?)
            )
          ORDER BY a.relative_file_path`,
      )
      .all(
        linkedFolderId,
        relativePath,
        relativePath,
        prefix,
        [...prefix].length,
        prefix,
      ) as Array<{ asset_id: string; relative_file_path: string }>;

    const scopedRows = relativePath === '' && childDirs.length === 0
      ? rows.filter((row) => !row.relative_file_path.includes('/'))
      : rows;

    if (childDirs.length === 0) {
      return scopedRows.slice(0, 3).map((row) => row.asset_id);
    }

    // Serpent-9021d1: Pure linked folder — round-robin across direct child directories
    const childPrefixes = childDirs.map((d) => (d === '' ? '' : `${d}/`));
    const byChild: string[][] = childDirs.map(() => []);
    for (const row of rows) {
      for (let i = 0; i < childDirs.length; i++) {
        const cPrefix = childPrefixes[i]!;
        if (row.relative_file_path === childDirs[i] || row.relative_file_path.startsWith(cPrefix)) {
          byChild[i]!.push(row.asset_id);
          break;
        }
      }
    }

    const picked: string[] = [];
    let round = 0;
    while (picked.length < 4) {
      let addedInRound = false;
      for (let c = 0; c < childDirs.length && picked.length < 4; c++) {
        const list = byChild[c];
        if (list && round < list.length) {
          picked.push(list[round]!);
          addedInRound = true;
        }
      }
      if (!addedInRound) break;
      round++;
    }
    return picked;
  }

}
