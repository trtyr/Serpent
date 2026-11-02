/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import { LibraryServiceError, buildContextualSearchWhere, ftsCanNarrowSearchGroups, hasPositiveSearchClause, normalizedSearchGroups, singleDisplayArtifactJoin } from '../library-service-internals';
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
import { LibraryServiceOiio } from './LibraryServiceOiio';
import { detectMediaType, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';
import type { LibraryServiceAllMethods } from './all-methods';

/** LibraryServiceSmartCollectionsV6: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceSmartCollectionsV6 extends LibraryServiceOiio {

  // ── Search ──────────────────────────────────────────────────────────

  /**
   * The compact layout query and the ordinary all-assets browse share the
   * same stable order. Keep this narrow: filters, folders, collections and
   * explicit sorts each have their own semantics and must use the SQL path.
   */
  /** Linked assets with availability `missing` stay in browse until this is false. */
  override setShowMissingLinkedFiles(show: boolean): void {
    this.showMissingLinkedFiles = show;
  }

  public override isDefaultBrowseIndexRequest(input: {
    query?: { clauses: SearchClause[]; groups?: SearchGroup[] } | null;
    filters?: FilterClause[] | null;
    scope?: SearchScope | null;
    sort?: SortDefinition | null;
    scopeMode?: boolean | null;
    idsOnly?: boolean | null;
    showIgnored?: boolean;
  }): boolean {
    return this.showMissingLinkedFiles && isDefaultCatalogBrowseIndexRequest(input);
  }

  public override buildFilterWhere(
    filters: FilterClause[],
    options: { hasAiContent: boolean; hasAiAssetTags: boolean } = {
      hasAiContent: true,
      hasAiAssetTags: true,
    },
  ): { sql: string; params: unknown[] } {
    return buildCatalogFilterWhere(filters, options);
  }

  override createBrowseSession(input: {
    libraryId: string;
    libraryGeneration: number;
    query: SearchQuery | null;
    filters?: FilterClause[] | null;
    scope?: SearchScope | null;
    sort?: SortDefinition | null;
    smartCollectionId?: string | null;
    limit?: number | null;
    showIgnored?: boolean;
  }): {
    session: BrowseSessionSnapshot;
    items: AssetSummary[];
    total: number;
    offset: number;
    snippets?: Array<{ assetId: string; text: string }>;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    let query = input.query;
    let filters = input.filters ?? null;
    let sort = input.sort ?? null;
    if (input.smartCollectionId) {
      const row = openLibrary.connection
        .prepare(
          'SELECT query_definition_json FROM smart_collections WHERE collection_id = ? AND library_id = ?',
        )
        .get(input.smartCollectionId, input.libraryId) as {
          query_definition_json: string;
        } | undefined;
      if (!row) throw new LibraryServiceError('FOLDER_NOT_FOUND');
      const smartCollection = this.parseSmartCollectionDefinition(
        row.query_definition_json,
        'LIBRARY_CORRUPT',
      );
      query = smartCollection.search ?? null;
      filters = smartCollection.filters ?? null;
      sort = smartCollection.sort ?? null;
    }
    const definition = {
      smartCollectionId: input.smartCollectionId ?? null,
      query,
      filters,
      scope: input.scope ?? null,
      sort,
      showIgnored: input.showIgnored === true,
      showMissingLinked: this.showMissingLinkedFiles,
    };
    // PERF2-04 / Serpent-52eed4: paint the bounded first window before enumerating
    // every id. Full-scope idsOnly on a network library occupied the only
    // interactive slot for seconds, so folder clicks looked dead until it finished.
    const page = this.searchAssets({
      libraryId: input.libraryId,
      query: definition.query,
      filters: definition.filters,
      scope: definition.scope,
      sort: definition.sort,
      showIgnored: definition.showIgnored,
      limit: input.limit ?? 100,
      offset: 0,
    });
    const changeSequence = this.getBrowseChangeSequence(input.libraryId);
    const cachedBrowse = openLibrary.browseIndexCache;
    const firstPageIds = page.items.map((item) => item.assetId);
    const cachedIds = cachedBrowse !== undefined
      && cachedBrowse.browseChangeSequence === changeSequence
      && this.isDefaultBrowseIndexRequest({
        query: definition.query,
        filters: definition.filters,
        scope: definition.scope,
        sort: definition.sort,
        showIgnored: definition.showIgnored,
      })
      && cachedBrowse.assetIds.length === page.total
      ? cachedBrowse.assetIds
      : undefined;
    const session = this.browseSessionStore.create({
      libraryId: input.libraryId,
      libraryGeneration: input.libraryGeneration,
      changeSequence,
      queryFingerprint: browseQueryFingerprint(definition),
      query: definition.query,
      filters: definition.filters,
      scope: definition.scope,
      sort: definition.sort,
      showIgnored: definition.showIgnored,
      declaredTotal: page.total,
      assetIds: cachedIds ?? firstPageIds,
    });
    return {
      session,
      items: page.items,
      total: page.total,
      offset: 0,
      ...(page.snippets ? { snippets: page.snippets } : {}),
    };
  }

  override readBrowseSessionPage(input: {
    libraryId: string;
    libraryGeneration: number;
    sessionId: string;
    limit?: number | null;
    offset?: number | null;
  }):
    | ({ status: 'ready'; session: BrowseSessionSnapshot }
      & Pick<ReturnType<LibraryServiceAllMethods['searchAssets']>, 'items' | 'total' | 'offset' | 'snippets'>)
    | Extract<BrowseSessionLookup, { status: 'missing' | 'stale' }> {
    const lookup = this.browseSessionStore.lookup({
      libraryId: input.libraryId,
      sessionId: input.sessionId,
      libraryGeneration: input.libraryGeneration,
      changeSequence: this.getBrowseChangeSequence(input.libraryId),
    });
    if (lookup.status !== 'ready') return lookup;
    const offset = Math.max(0, input.offset ?? 0);
    const limit = Math.min(500, Math.max(1, input.limit ?? 100));
    const session = lookup.session;
    const useSnapshot = browseSessionPageUsesSnapshot(session, offset, limit);
    const page = this.searchAssets({
      libraryId: input.libraryId,
      query: session.query,
      ...(useSnapshot
        ? { sessionAssetIds: session.assetIds }
        : {
            filters: session.filters ? [...session.filters] : null,
            scope: session.scope,
          }),
      sort: session.sort,
      showIgnored: session.showIgnored,
      limit,
      offset,
    });
    return {
      status: 'ready',
      session,
      items: page.items,
      total: session.declaredTotal,
      offset,
      ...(page.snippets ? { snippets: page.snippets } : {}),
    };
  }

  /**
   * Bounded geometry-block read for one BrowseSession window.
   *
   * CANVAS-038: the Renderer no longer requests geometry blocks — a scope now
   * commits its complete compact index once (`asset.search` with `layoutOnly`),
   * because streaming 128-row blocks rewrote heights and identities mid-scroll.
   * The `browse.session.geometry` protocol message, its schemas and the Main /
   * preload forwarding were deleted with it, so **nothing in production reaches
   * this method**.
   *
   * It is retained deliberately as the measurement seam for the 20k worker
   * baseline (`browseSessionGeometryMs` in `tests/worker/large-library-performance.test.ts`,
   * recorded in the CANVAS-038 design log) rather than deleted together with the
   * baseline it produces. Do not re-wire it into a render path without also
   * restoring the identity guarantees that the one-shot index provides.
   */
  override readBrowseSessionGeometry(input: {
    libraryId: string;
    libraryGeneration: number;
    sessionId: string;
    startIndex?: number | null;
    limit?: number | null;
  }):
    | {
        status: 'ready';
        session: BrowseSessionSnapshot;
        startIndex: number;
        entries: Array<{
          index: number;
          assetId: string;
          width: number | null;
          height: number | null;
          previewArtifactId?: string | null;
        }>;
      }
    | Extract<BrowseSessionLookup, { status: 'missing' | 'stale' }> {
    const lookup = this.browseSessionStore.lookup({
      libraryId: input.libraryId,
      sessionId: input.sessionId,
      libraryGeneration: input.libraryGeneration,
      changeSequence: this.getBrowseChangeSequence(input.libraryId),
    });
    if (lookup.status !== 'ready') return lookup;

    const session = lookup.session;
    const startIndex = Math.min(
      session.declaredTotal,
      Math.max(0, input.startIndex ?? 0),
    );
    const limit = Math.min(500, Math.max(1, input.limit ?? 128));
    const useSnapshot = browseSessionPageUsesSnapshot(session, startIndex, limit);
    if (!useSnapshot) {
      const page = this.searchAssets({
        libraryId: input.libraryId,
        query: session.query,
        filters: session.filters ? [...session.filters] : null,
        scope: session.scope,
        sort: session.sort,
        showIgnored: session.showIgnored,
        limit,
        offset: startIndex,
      });
      return {
        status: 'ready',
        session,
        startIndex,
        entries: page.items.map((item, index) => ({
          index: startIndex + index,
          assetId: item.assetId,
          width: item.width,
          height: item.height,
          ...(item.thumbnailArtifactId !== undefined
            ? { previewArtifactId: item.thumbnailArtifactId }
            : {}),
        })),
      };
    }
    const page = this.searchAssets({
      libraryId: input.libraryId,
      query: null,
      sessionAssetIds: session.assetIds,
      layoutOnly: true,
      limit,
      offset: startIndex,
    });
    const entries = (page.layout ?? []).map((entry, index) => ({
      index: startIndex + index,
      assetId: entry.assetId,
      width: entry.width,
      height: entry.height,
      ...(entry.previewArtifactId !== undefined
        ? { previewArtifactId: entry.previewArtifactId }
        : {}),
      ...(entry.previewKind !== undefined
        ? { previewKind: entry.previewKind }
        : {}),
      ...(entry.previewRevisionId !== undefined
        ? { previewRevisionId: entry.previewRevisionId }
        : {}),
    }));
    return {
      status: 'ready',
      session,
      startIndex,
      entries,
    };
  }

  override readBrowseSessionAssetIds(input: {
    libraryId: string;
    libraryGeneration: number;
    sessionId: string;
  }):
    | { status: 'ready'; session: BrowseSessionSnapshot; assetIds: string[] }
    | Extract<BrowseSessionLookup, { status: 'missing' | 'stale' }> {
    const lookup = this.browseSessionStore.lookup({
      libraryId: input.libraryId,
      sessionId: input.sessionId,
      libraryGeneration: input.libraryGeneration,
      changeSequence: this.getBrowseChangeSequence(input.libraryId),
    });
    if (lookup.status !== 'ready') return lookup;
    if (browseSessionIndexComplete(lookup.session)) {
      return {
        status: 'ready',
        session: lookup.session,
        assetIds: [...lookup.session.assetIds],
      };
    }
    const completed = this.searchAssets({
      libraryId: input.libraryId,
      query: lookup.session.query,
      filters: lookup.session.filters ? [...lookup.session.filters] : null,
      scope: lookup.session.scope,
      sort: lookup.session.sort,
      showIgnored: lookup.session.showIgnored,
      idsOnly: true,
      limit: null,
      offset: 0,
    });
    const session = this.browseSessionStore.replaceAssetIds(
      input.libraryId,
      input.sessionId,
      completed.assetIds ?? [],
    ) ?? lookup.session;
    return {
      status: 'ready',
      session,
      assetIds: [...session.assetIds],
    };
  }

  override closeBrowseSession(input: { libraryId: string; sessionId: string }): void {
    this.requireOpenLibrary(input.libraryId);
    this.browseSessionStore.close(input.libraryId, input.sessionId);
  }

  override searchAssets(input: {
    libraryId: string;
    query?: { clauses: SearchClause[]; groups?: SearchGroup[] } | null;
    filters?: FilterClause[] | null;
    scope?: SearchScope | null;
    sort?: SortDefinition | null;
    limit?: number | null;
    offset?: number | null;
    /** Serpent-6w7n: fetch entire browse scope (lightweight rows, capped). */
    scopeMode?: boolean | null;
    /**
     * Serpent-ws4k: fetch only asset ids for the whole scope (select-all /
     * invert). Skips the thumbnail/sequence enrichment and returns `items: []`
     * plus `assetIds` (capped at the browse-scope cap like scopeMode).
     */
    idsOnly?: boolean | null;
    /** Worker-internal bounded page mode; ordinary idsOnly remains full-scope. */
    idsPage?: boolean | null;
    /** Compact full-scope real-asset geometry for virtualized layout. */
    layoutOnly?: boolean | null;
    /** Worker-internal ordered snapshot source for BrowseSession pages. */
    sessionAssetIds?: readonly string[];
    showIgnored?: boolean;
  }): {
    items: AssetSummary[];
    total: number;
    offset: number;
    snippets?: Array<{ assetId: string; text: string }>;
    assetIds?: string[];
    layout?: BrowseLayoutEntry[];
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const connection = openLibrary.connection;
    // Serpent-verg.2 — lenient read (0031 §1): display/derived columns and
    // auxiliary tables added after the earliest supported schema are
    // whitelisted; missing ones degrade the query instead of failing.
    const assetColumns = columnsFor(connection, 'assets');
    const revisionColumns = columnsFor(connection, 'revisions');
    const metadataColumns = columnsFor(connection, 'asset_metadata');
    const artifactColumns = columnsFor(connection, 'revision_artifacts');
    const hasIgnoreTable = hasTable(connection, 'linked_ignored_assets');
    const hasAiContent = hasTable(connection, 'ai_content');
    const hasAiAssetTags = hasTable(connection, 'ai_asset_tags');
    const hasSequenceFrames = hasTable(connection, 'asset_sequence_frames');
    const hasSearchIndex = hasTable(connection, 'asset_search_index');
    const hasSearchFts = hasTable(connection, 'asset_search');
    const scopeMode = input.scopeMode === true;
    const idsOnly = input.idsOnly === true;
    const idsPage = idsOnly && input.idsPage === true;
    const layoutOnly = input.layoutOnly === true;
    const sessionAssetIds = input.sessionAssetIds === undefined
      ? undefined
      : [...new Set(input.sessionAssetIds)];
    const sessionMode = sessionAssetIds !== undefined;
    const defaultBrowseIndexRequest = !sessionMode && this.isDefaultBrowseIndexRequest(input);
    const browseIndexSequenceBefore = defaultBrowseIndexRequest
      ? this.getBrowseChangeSequence(input.libraryId)
      : undefined;
    const browseIndexCache = openLibrary.browseIndexCache;
    let cachedBrowseAssetIds: string[] | undefined;
    if (
      !layoutOnly
      && defaultBrowseIndexRequest
      && browseIndexCache !== undefined
      && browseIndexCache.browseChangeSequence === browseIndexSequenceBefore
    ) {
      cachedBrowseAssetIds = browseIndexCache.assetIds;
    }
    const limit = sessionMode
      ? Math.min(500, Math.max(1, input.limit ?? 100))
      : idsPage
        ? Math.min(BROWSE_SCOPE_MAX_ASSETS, Math.max(1, input.limit ?? BROWSE_SCOPE_MAX_ASSETS))
        : scopeMode || idsOnly || layoutOnly
          ? BROWSE_SCOPE_MAX_ASSETS
          : (input.limit ?? 50);
    const offset = sessionMode
      ? Math.max(0, input.offset ?? 0)
      : idsPage
        ? Math.max(0, input.offset ?? 0)
        : scopeMode || idsOnly || layoutOnly ? 0 : (input.offset ?? 0);

    const searchGroups = input.query ? normalizedSearchGroups(input.query) : [];
    const hasQuery = searchGroups.length > 0;
    const hasPositiveQuery = hasPositiveSearchClause(searchGroups);
    // Serpent-verg.2 — lenient read: the trigram FTS path requires the FTS
    // tables to exist; older libraries fall back to the contextual substring
    // search instead of referencing a missing MATCH table.
    const useTrigramIndex = hasQuery && hasSearchIndex && hasSearchFts && ftsCanNarrowSearchGroups(searchGroups);
    const fts5Query = useTrigramIndex
      ? buildCatalogFtsQuery(searchGroups)
      : null;
    const { sql: contextualSearchWhere, params: contextualSearchParams } = hasQuery
      ? buildContextualSearchWhere(searchGroups, !hasSearchIndex)
      : { sql: '', params: [] };
    const { sql: filterWhere, params: filterParams } = this.buildFilterWhere(
      input.filters ?? [],
      { hasAiContent, hasAiAssetTags },
    );

    // A collection browse is a relational scope, not an asset-id list. Build
    // that scope once per SQL statement so the recursive tree walk and the
    // collection-position lookup are shared by COUNT, first-page, ids-only,
    // and layout queries. The old shape repeated the recursive CTE inside a
    // correlated ORDER BY subquery for every candidate asset, which made a
    // recursive collection disproportionately slower than an equivalent
    // folder browse on large libraries.
    const collectionScopeResult = input.scope?.kind === 'collection'
      ? buildCatalogCollectionScope(connection, {
          libraryId: openLibrary.summary.libraryId,
          collectionId: input.scope.collectionId,
          recursive: input.scope.recursive,
        })
      : null;
    if (collectionScopeResult?.status === 'missing') {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    const collectionScope = collectionScopeResult?.status === 'ready'
      ? collectionScopeResult.scope
      : null;

    // Collection CTE bindings precede WHERE bindings; relevance bindings are
    // appended after them in the data query.
    const { sql: orderBy, params: orderParams } = buildCatalogSortOrder({
      hasPositiveQuery,
      searchGroups,
      hasSearchIndex,
      sort: input.sort,
      revisionColumns,
      metadataColumns,
      artifactColumns,
      hasAiContent,
      sessionMode,
      collectionScoped: collectionScope !== null,
      trashScope: input.scope?.kind === 'trash',
    });

    // Keep the ordinary browse/count path narrow. These artifact joins used
    // to run for every browse and search request even though they are only
    // needed by technical filters or technical sorts. On a large library the
    // COUNT query and the data query therefore both scanned the artifact
    // table before the renderer even asked for thumbnail rows.
    const filterFields = new Set((input.filters ?? []).map((filter) => filter.field));
    const needsDurationMeta =
      filterFields.has('width') ||
      filterFields.has('height') ||
      filterFields.has('duration_ms') ||
      filterFields.has('long_edge') ||
      filterFields.has('aspect_ratio') ||
      input.sort?.field === 'duration' ||
      input.sort?.field === 'long_edge';
    const needsPaletteMeta =
      filterFields.has('color') || input.sort?.field === 'color';
    const needsTechnicalThumbnail =
      filterFields.has('width') ||
      filterFields.has('height') ||
      filterFields.has('long_edge') ||
      filterFields.has('aspect_ratio') ||
      input.sort?.field === 'long_edge';
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
    const searchJoins = hasQuery && hasSearchIndex
      ? `JOIN asset_search_index sc ON a.asset_id = sc.asset_id
         ${useTrigramIndex && hasSearchFts ? 'JOIN asset_search s ON sc.rowid = s.rowid' : ''}`
      : '';
    const hasLayoutDimensions =
      artifactColumns.has('width') && artifactColumns.has('height');
    const layoutArtifactJoins = layoutOnly && hasLayoutDimensions
      ? `LEFT JOIN revision_artifacts layout_metadata
           ON layout_metadata.revision_id = a.current_revision_id
          AND layout_metadata.kind = 'extracted_metadata'
          ${artifactColumns.has('status') ? "AND layout_metadata.status = 'ready'" : ''}
          AND layout_metadata.invalidated_at IS NULL
         ${singleDisplayArtifactJoin(
            'layout_preview',
            artifactColumns.has('status') ? "AND chosen.status = 'ready'" : '',
          )}`
      : '';
    const collectionScopeJoin = collectionScope?.join ?? '';
    const dataFrom = `FROM assets a
         ${collectionScopeJoin}
         LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
         LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
         ${durationMetaJoin}
         ${paletteMetaJoin}
         ${technicalThumbnailJoin}
         ${layoutArtifactJoins}
         ${searchJoins}`;
    // COUNT only retains joins referenced by the WHERE clause. Revisions are
    // display-only, while metadata is needed only for rating/favourite/URL
    // filters; this makes the sidebar count materially cheaper than the data
    // page without changing the result set.
    const needsMetadataForFilter =
      filterFields.has('rating') ||
      filterFields.has('favorite') ||
      filterFields.has('source_url');
    const countFrom = `FROM assets a
         ${collectionScopeJoin}
         ${needsMetadataForFilter ? 'LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id' : ''}
         ${durationMetaJoin}
         ${paletteMetaJoin}
         ${technicalThumbnailJoin}
         ${searchJoins}`;

    // WHERE clause.
    const whereParts: string[] = [];
    const allParams: unknown[] = [];

    if (hasQuery) {
      if (useTrigramIndex) {
        whereParts.push('asset_search MATCH ?');
        allParams.push(fts5Query!);
      }
      whereParts.push(contextualSearchWhere);
      allParams.push(...contextualSearchParams);
    }

    if (sessionMode) {
      const pageAssetIds = sessionAssetIds.slice(offset, offset + limit);
      whereParts.push(
        pageAssetIds.length === 0
          ? '1 = 0'
          : `a.asset_id IN (${pageAssetIds.map(() => '?').join(',')})`,
      );
      allParams.push(...pageAssetIds);
    } else {
      whereParts.push(...buildCatalogAssetVisibilityPredicates({
        scopeKind: input.scope?.kind === 'trash' ? 'trash' : 'all',
        showIgnored: input.showIgnored === true,
        showMissingLinked: this.showMissingLinkedFiles,
        explicitIgnoreSql: this.explicitIgnoreSql(connection, 'a', input.showIgnored === true),
        hasLinkedIgnoredAssets: hasIgnoreTable,
        hasSequenceFrames,
      }));

      if (filterWhere.length > 0) {
        whereParts.push(filterWhere);
        allParams.push(...filterParams);
      }

    if (input.scope?.kind === 'folder') {
      const folderScope = buildCatalogFolderScopeClause(connection, {
        libraryId: openLibrary.summary.libraryId,
        scope: input.scope,
      });
      if (folderScope.status === 'missing') {
        throw new LibraryServiceError('FOLDER_NOT_FOUND');
      }
      whereParts.push(folderScope.sql);
      allParams.push(...folderScope.params);
    }
    }

    const whereClause =
      whereParts.length > 0 ? `WHERE ${whereParts.join(' AND ')}` : '';

    // Columns for data query. Display/derived columns are whitelisted per
    // table (Serpent-verg.2): missing columns on older libraries are omitted
    // here and filled with degraded defaults on the result rows.
    const dataColumns = [
      'a.asset_id',
      'a.location_kind',
      'a.managed_folder_id',
      'a.linked_folder_id',
      'a.relative_file_path',
      "CASE WHEN r.revision_id IS NULL THEN 'corrupt:' || a.asset_id ELSE a.current_revision_id END AS current_revision_id",
      "CASE WHEN r.revision_id IS NULL THEN 'missing' ELSE a.availability END AS availability",
      'a.deleted_at',
      ...(revisionColumns.has('byte_size')
        ? ['COALESCE(r.byte_size, 0) AS byte_size']
        : ['0 AS byte_size']),
      ...(revisionColumns.has('modified_at')
        ? ["COALESCE(r.modified_at, '1970-01-01T00:00:00.000Z') AS modified_at"]
        : ["'1970-01-01T00:00:00.000Z' AS modified_at"]),
      ...(metadataColumns.has('rating') ? ['COALESCE(m.rating, 0) AS rating'] : []),
      ...(metadataColumns.has('favorite') ? ['COALESCE(m.favorite, 0) AS favorite'] : []),
      ...qualify('a', assetColumns, ['trashed_from_relative_path', 'trashed_from_tombstone_id']),
      ...(useTrigramIndex && hasSearchFts
        ? ["snippet(asset_search, -1, '<b>', '</b>', '...', 32) AS snippet_text"]
        : []),
    ].join(',\n');

    // Total count query.
    const total = sessionMode
      ? sessionAssetIds.length
      : cachedBrowseAssetIds !== undefined
      ? cachedBrowseAssetIds.length
      : (() => {
          const countSql = `${collectionScope?.queryPrefix ?? ''}SELECT COUNT(*) AS total ${countFrom} ${whereClause}`;
          const countRow = connection
            .prepare(countSql)
            .get(...(collectionScope?.params ?? []), ...allParams) as {
            total: number;
          };
          return countRow.total;
        })();

    // Data query. ids-only mode (Serpent-ws4k) fetches just the stable id
    // column so select-all/invert can cover the whole scope without shipping
    // AssetSummary rows over three process hops.
    const layoutColumns = hasLayoutDimensions
      ? `a.asset_id,
         a.current_revision_id AS layout_revision_id,
         a.availability AS layout_availability,
         a.deleted_at AS layout_deleted_at,
         a.relative_file_path,
         r.byte_size AS layout_byte_size,
         r.modified_at AS layout_modified_at,
         m.rating AS layout_rating,
         CASE
           WHEN layout_metadata.width > 0 AND layout_metadata.height > 0 THEN layout_metadata.width
           ELSE layout_preview.width
         END AS layout_width,
         CASE
           WHEN layout_metadata.width > 0 AND layout_metadata.height > 0 THEN layout_metadata.height
           ELSE layout_preview.height
         END AS layout_height,
         layout_preview.artifact_id AS layout_preview_artifact_id`
      : `a.asset_id, a.current_revision_id AS layout_revision_id, a.availability AS layout_availability, a.deleted_at AS layout_deleted_at, a.relative_file_path, r.byte_size AS layout_byte_size, r.modified_at AS layout_modified_at, m.rating AS layout_rating, NULL AS layout_width, NULL AS layout_height, NULL AS layout_preview_artifact_id`;
    const dataColumnsForFetch = idsOnly
      ? 'a.asset_id'
      : layoutOnly
        ? layoutColumns
        : dataColumns;
    const cachedPageAssetIds = sessionMode
      ? undefined
      : cachedBrowseAssetIds?.slice(offset, offset + limit);
    const cachedPageWhereClause = cachedPageAssetIds === undefined
      ? whereClause
      : cachedPageAssetIds.length === 0
        ? ''
        : `${whereClause}${whereClause.length > 0 ? ' AND ' : 'WHERE '}a.asset_id IN (${cachedPageAssetIds.map(() => '?').join(',')})`;
    const dataSql = cachedPageAssetIds === undefined
      ? `${collectionScope?.queryPrefix ?? ''}SELECT ${dataColumnsForFetch} ${dataFrom} ${whereClause} ORDER BY ${orderBy} LIMIT ? OFFSET ?`
      : cachedPageAssetIds.length === 0
        ? ''
        : `${collectionScope?.queryPrefix ?? ''}SELECT ${dataColumnsForFetch} ${dataFrom} ${cachedPageWhereClause}`;
    let rows = dataSql === ''
      ? []
      : connection
        .prepare(dataSql)
        .all(
          ...(collectionScope?.params ?? []),
          ...allParams,
          ...(cachedPageAssetIds ?? []),
          ...(cachedPageAssetIds === undefined
            ? [
                ...orderParams,
                sessionMode ? Math.min(limit, Math.max(0, sessionAssetIds.length - offset)) : limit,
                sessionMode ? 0 : offset,
              ]
            : []),
        ) as Array<{
      asset_id: string;
      location_kind: 'managed' | 'linked';
        managed_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string;
        availability: 'available' | 'missing';
        byte_size: number;
        modified_at: string;
        rating: number;
        favorite: number;
        deleted_at?: string | null;
        trashed_from_relative_path?: string | null;
        trashed_from_tombstone_id?: string | null;
        snippet_text?: string;
        layout_width?: number | null;
        layout_height?: number | null;
        layout_preview_artifact_id?: string | null;
        layout_revision_id?: string | null;
        layout_byte_size?: number | null;
        layout_availability?: 'available' | 'missing' | null;
        layout_deleted_at?: string | null;
      layout_modified_at?: string | null;
      layout_rating?: number | null;
      }>;

    const orderedPageAssetIds = sessionMode
      ? sessionAssetIds.slice(offset, offset + limit)
      : cachedPageAssetIds;
    if (orderedPageAssetIds !== undefined && rows.length > 1) {
      const rowById = new Map(rows.map((row) => [row.asset_id, row] as const));
      rows = orderedPageAssetIds.flatMap((assetId) => {
        const row = rowById.get(assetId);
        return row === undefined ? [] : [row];
      });
    }

    if (idsOnly) {
      return {
        items: [],
        total,
        offset,
        assetIds: rows.map((row) => row.asset_id),
      };
    }

    if (layoutOnly) {
      // Serpent-4bdd26: per-row conditional spreads allocate a throwaway
      // object each; direct assignment measured ~2x faster over 20k rows.
      const layout = new Array<object>(rows.length);
      for (let index = 0; index < rows.length; index++) {
        const row = rows[index]!;
        const mediaType = toSummaryMediaType(
          detectMediaType(row.relative_file_path),
        );
        layout[index] = catalogBrowseLayoutEntryFromRow(row, mediaType);
      }
      if (defaultBrowseIndexRequest) {
        const browseIndexSequenceAfter = this.getBrowseChangeSequence(input.libraryId);
        // layoutOnly is capped at BROWSE_SCOPE_MAX_ASSETS. Only memoize it as
        // a reusable ordered index when it covers the complete visible scope;
        // otherwise a library above the cap would report the truncated length
        // as its total and deep pages beyond the cap would disappear.
        if (browseIndexSequenceAfter === browseIndexSequenceBefore && rows.length === total) {
          openLibrary.browseIndexCache = {
            browseChangeSequence: browseIndexSequenceAfter,
            assetIds: rows.map((row) => row.asset_id),
          };
        } else {
          // A concurrent writer changed the scope while the full layout was
          // being read. Do not turn a mixed snapshot into a reusable index.
          openLibrary.browseIndexCache = undefined;
        }
      }
      return {
        items: [],
        total,
        offset: 0,
        layout: layout as BrowseLayoutEntry[],
      };
    }

    // Serpent-verg.2 — fill degraded defaults for whitelisted columns that
    // an older library does not have (0031 §1.1); defaults come from the
    // shared registry.
    const degradedFill: Record<string, unknown> = {
      ...degradedDefaults('assets', missingColumns(connection, 'assets', ['trashed_from_relative_path', 'trashed_from_tombstone_id'])),
      ...degradedDefaults('revisions', missingColumns(connection, 'revisions', ['byte_size', 'modified_at'])),
      ...degradedDefaults('asset_metadata', missingColumns(connection, 'asset_metadata', ['rating', 'favorite'])),
    };

    const artifactMap = this.thumbnailArtifactMap(
      input.libraryId,
      rows.map((row) => row.asset_id),
    );
    const items = this.withImageSequenceSummaries(
      openLibrary,
      rows
        .map((row) => ({ ...degradedFill, ...row }) as typeof row)
        .map((row) => {
      const artifact = artifactMap.get(row.asset_id);
      const detectedMediaType = detectMediaType(row.relative_file_path);
      return this.assetSummaryFromRow({
        ...row,
        thumbnail_status: artifact?.status ?? null,
        thumbnail_artifact_id: artifact?.artifactId ?? null,
        artifact_width: artifact?.width ?? null,
        artifact_height: artifact?.height ?? null,
        artifact_duration_ms: artifact?.durationMs ?? null,
        media_type: toSummaryMediaType(detectedMediaType),
      });
    }));

    const snippets: Array<{ assetId: string; text: string }> | undefined =
      useTrigramIndex
        ? rows
            .filter((r) => r.snippet_text && r.snippet_text.length > 0)
            .map((r) => ({ assetId: r.asset_id, text: r.snippet_text! }))
        : undefined;

    return { items, total, offset, snippets };
  }

}
