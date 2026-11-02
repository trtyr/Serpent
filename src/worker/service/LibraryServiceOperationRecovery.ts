/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { ContentReplaceBatchOperationManifest, ExistingDestination, ImportSourceEntry, LinkedTrashOperationManifest, ManagedCopyOperationManifest, ManagedFolderTrashOperationManifest, ManagedMoveConflict, ManagedMoveOperationManifest, OpenLibrary, OperationManifest, OperationRow, PendingImport, PersistedOperationManifest, RestoreOperationManifest} from '../library-service-internals';
import { DEFAULT_IMPORT_EXPIRY_CLOCK, FINALIZED_IMPORT_RETENTION_MS, LibraryServiceError, UUID, directoryExists, isMissingPathError, realDirectoryExists, realFileExists, sha256FileAtPath } from '../library-service-internals';
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
import { LibraryServiceWatchers } from './LibraryServiceWatchers';
import type { LibraryServiceAllMethods } from './all-methods';

/** LibraryServiceOperationRecovery: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceOperationRecovery extends LibraryServiceWatchers {

  public override assertSafeOperationsRoot(libraryPath: string): string {
    const serpentPath = path.join(libraryPath, '.serpent');
    if (!realDirectoryExists(serpentPath)) throw new LibraryServiceError('LIBRARY_CORRUPT');
    const operationsPath = path.join(serpentPath, 'operations');
    let operationsEntry;
    try {
      operationsEntry = lstatSync(operationsPath);
    } catch (error) {
      if (isMissingPathError(error)) return operationsPath;
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
    if (!operationsEntry.isDirectory() || operationsEntry.isSymbolicLink()) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const relation = path.relative(realpathSync(serpentPath), realpathSync(operationsPath));
    if (relation !== 'operations') throw new LibraryServiceError('LIBRARY_CORRUPT');
    return operationsPath;
  }

  public override assertSafeOperationPath(operationPath: string): void {
    const operationsPath = this.assertSafeOperationsRoot(
      path.dirname(path.dirname(path.dirname(operationPath))),
    );
    const relation = path.relative(operationsPath, operationPath);
    const basename = path.basename(operationPath);
    const uuidCandidate = basename;
    if (
      !UUID.test(uuidCandidate) ||
      relation !== basename ||
      path.isAbsolute(relation)
    ) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    let operationEntry;
    try {
      operationEntry = lstatSync(operationPath);
    } catch (error) {
      if (isMissingPathError(error)) return;
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
    if (!operationEntry.isDirectory() || operationEntry.isSymbolicLink()) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const realRelation = path.relative(realpathSync(operationsPath), realpathSync(operationPath));
    if (realRelation !== path.basename(operationPath)) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    for (const childName of ['stage', 'backup']) {
      const childPath = path.join(operationPath, childName);
      try {
        const child = lstatSync(childPath);
        if (!child.isDirectory() || child.isSymbolicLink()) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
      } catch (error) {
        if (error instanceof LibraryServiceError) throw error;
        if (!isMissingPathError(error)) {
          throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
        }
      }
    }
  }

  public override removeOperation(operationPath: string): void {
    this.assertSafeOperationPath(operationPath);
    // Windows: a Defender scan of just-moved staged files (or any lingering
    // child handle) makes recursive rm throw EBUSY/EPERM/ENOTEMPTY for a
    // short moment; retry transient locks before reporting failure.
    removePathWithSyncRetry(operationPath);
    try {
      rmdirSync(path.dirname(operationPath));
    } catch {
      // A sibling operation may still exist; removing this operation is sufficient.
    }
  }

  public override cancelImportExpiry(pending: PendingImport): void {
    if (pending.expiryHandle === undefined) return;
    try {
      (this.options.importClock ?? DEFAULT_IMPORT_EXPIRY_CLOCK).cancel(pending.expiryHandle);
    } catch {
      // Token consumption and cleanup remain authoritative if timer cancellation fails.
    }
    pending.expiryHandle = undefined;
  }

  public override pruneFinalizedImportIds(now = Date.now()): void {
    for (const [importId, finalizedAt] of this.finalizedImportIds) {
      if (now - finalizedAt > FINALIZED_IMPORT_RETENTION_MS) {
        this.finalizedImportIds.delete(importId);
      }
    }
  }

  public override rememberFinalizedImport(importId: string): void {
    const now = Date.now();
    this.pruneFinalizedImportIds(now);
    this.finalizedImportIds.set(importId, now);
  }

  public override isFinalizedImport(importId: string): boolean {
    const finalizedAt = this.finalizedImportIds.get(importId);
    if (finalizedAt === undefined) return false;
    if (Date.now() - finalizedAt > FINALIZED_IMPORT_RETENTION_MS) {
      this.finalizedImportIds.delete(importId);
      return false;
    }
    return true;
  }

  public override updateImportOperation(
    pending: PendingImport,
    status: 'failed' | 'rolled_back',
    errorCode: string,
  ): void {
    const openLibrary = this.openById.get(pending.libraryId);
    if (!openLibrary) return;
    try {
      openLibrary.connection
        .prepare('UPDATE file_operations SET status = ?, error_code = ?, updated_at = ? WHERE operation_id = ?')
        .run(status, errorCode, new Date().toISOString(), path.basename(pending.operationPath));
    } catch {
      // Recovery can audit and finish a still-preparing row on the next open.
    }
  }

  public override scheduleImportExpiry(_importId: string, pending: PendingImport): void {
    // §5.5: parked conflict / source-failure / sequence decisions stay until
    // resolve, abandon, or closeLibrary. Do not silently discard staging
    // while the user is still looking at a dialog.
    this.cancelImportExpiry(pending);
  }

  public override parkPendingImportSourceFailure(input: {
    importId: string;
    input: Parameters<LibraryServiceAllMethods['prepareImport']>[0];
    directories: string[];
    stagedEntries: ImportSourceEntry[];
    remainingEntries: ImportSourceEntry[];
    skipped: SkippedImportSource[];
    failed: SkippedImportSource[];
    operationPath: string;
    stagePath: string;
    skipContentHash: boolean;
    destinationIndex?: Map<string, ExistingDestination>;
    preparingManifest?: OperationManifest;
  }): ImportSourceFailurePlan {
    if (input.stagedEntries.length === 0 && input.remainingEntries.length === 0) {
      this.removeOperation(input.operationPath);
      const first = input.failed[0] ?? input.skipped[0];
      throw new LibraryServiceError(
        'INVALID_IMPORT_SOURCE',
        first?.reason === undefined ? undefined : { reason: first.reason },
      );
    }
    const existing = this.pendingImports.get(input.importId);
    if (existing) this.cancelImportExpiry(existing);
    const pending: PendingImport = {
      directories: input.directories,
      entries: input.stagedEntries,
      libraryId: input.input.libraryId,
      operationPath: input.operationPath,
      unstagedEntries: input.remainingEntries,
      skippedSources: input.skipped,
      awaitingSourceFailureDecision: true,
      stagePath: input.stagePath,
      prepareInput: input.input,
      skipContentHash: input.skipContentHash,
      ...(input.destinationIndex ? { destinationIndex: input.destinationIndex } : {}),
      ...(input.input.createImageSequence !== undefined
        ? { createImageSequence: input.input.createImageSequence }
        : {}),
      ...(input.input.imageSequenceFps !== undefined
        ? { imageSequenceFps: input.input.imageSequenceFps }
        : {}),
      ...(input.input.suppressAssetChangeEvents === true
        ? { suppressAssetChangeEvents: true }
        : {}),
      ...(input.input.dedupeSameNameByContent === true
        ? { dedupeSameNameByContent: true }
        : {}),
      ...(input.input.skipLibraryDuplicateScan === true
        ? { skipLibraryDuplicateScan: true }
        : {}),
      ...(input.preparingManifest ? { preparingManifest: input.preparingManifest } : {}),
    };
    this.pendingImports.set(input.importId, pending);
    this.scheduleImportExpiry(input.importId, pending);
    return toImportSourceFailurePlan({
      importId: input.importId,
      failed: input.failed,
      remainingCount: input.remainingEntries.length + input.stagedEntries.length,
    });
  }

  override continueAfterSourceFailure(input: {
    importId: string;
    applyToRest: boolean;
    yieldTransferCheckpoints?: boolean;
  }): ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan {
    const pending = this.pendingImports.get(input.importId);
    if (!pending?.awaitingSourceFailureDecision || !pending.prepareInput || !pending.stagePath) {
      throw new LibraryServiceError('IMPORT_NOT_FOUND');
    }
    pending.awaitingSourceFailureDecision = false;
    if (input.applyToRest) pending.skipRemainingSourceFailures = true;
    const openLibrary = this.requireOpenLibrary(pending.libraryId);
    const remaining = pending.unstagedEntries ?? [];
    const alreadyStaged = pending.entries;
    const skipped = pending.skippedSources ?? [];
    const skipContentHash = pending.skipContentHash === true;
    const trackProgress = this.activeImports.has(input.importId);
    const finishStaged = (newlyStaged: ImportSourceEntry[]): ImportConflictPlan | ImportCompletion => {
      const stagedEntries = [...alreadyStaged, ...newlyStaged];
      pending.entries = stagedEntries;
      pending.unstagedEntries = [];
      pending.skippedSources = skipped;
      const conflictPlan = this.completePreparedImport({
        input: pending.prepareInput!,
        openLibrary,
        importId: input.importId,
        operationPath: pending.operationPath,
        directories: pending.directories,
        stagedEntries,
        skipContentHash,
        destinationIndex: pending.destinationIndex,
        preparingManifest: pending.preparingManifest ?? {
          version: 1,
          files: [],
          directories: pending.directories.map((relativePath) => ({
            existed: false,
            relativePath,
          })),
        },
        skippedSources: skipped,
      });
      if (conflictPlan.suspectedDuplicateCount !== 0 || conflictPlan.nameConflictCount !== 0) {
        return conflictPlan;
      }
      return this.resolveImport({
        importId: input.importId,
        suspectedDuplicate: 'skip',
        nameConflict: 'keep-both',
      });
    };
    const parkPause = (error: ImportSourceFailurePause): ImportSourceFailurePlan => {
      return this.parkPendingImportSourceFailure({
        importId: input.importId,
        input: pending.prepareInput!,
        directories: pending.directories,
        stagedEntries: [...alreadyStaged, ...(error.stagedEntries as ImportSourceEntry[])],
        remainingEntries: error.remainingEntries as ImportSourceEntry[],
        skipped: error.skipped,
        failed: error.failed,
        operationPath: pending.operationPath,
        stagePath: pending.stagePath!,
        skipContentHash,
        destinationIndex: pending.destinationIndex,
        preparingManifest: pending.preparingManifest,
      });
    };
    if (remaining.length === 0) return finishStaged([]);
    try {
      const stagedResult = this.stageImportSourceEntries({
        openLibrary,
        entries: remaining,
        stagePath: pending.stagePath,
        skipContentHash,
        importId: trackProgress ? input.importId : undefined,
        totalFiles: remaining.length + alreadyStaged.length,
        totalBytes:
          remaining.reduce((total, entry) => total + entry.byteSize, 0)
          + alreadyStaged.reduce((total, entry) => total + entry.byteSize, 0),
        cancelState: this.activeImports.get(input.importId),
        yieldCheckpoints: input.yieldTransferCheckpoints === true,
        skipRemainingSourceFailures: pending.skipRemainingSourceFailures === true,
        stageNameOffset: alreadyStaged.length,
        skipped,
      });
      if (typeof (stagedResult as Promise<ImportSourceEntry[]>).then === 'function') {
        return (stagedResult as Promise<ImportSourceEntry[]>).then(
          (resolved) => finishStaged(resolved),
          (error: unknown) => {
            if (error instanceof ImportSourceFailurePause) return parkPause(error);
            this.pendingImports.delete(input.importId);
            this.cancelImportExpiry(pending);
            this.failPreparedImport(error, {
              importId: input.importId,
              operationPath: pending.operationPath,
              openLibrary,
              trackProgress,
            });
          },
        ) as unknown as ImportConflictPlan;
      }
      return finishStaged(stagedResult as ImportSourceEntry[]);
    } catch (error) {
      if (error instanceof ImportSourceFailurePause) return parkPause(error);
      this.pendingImports.delete(input.importId);
      this.cancelImportExpiry(pending);
      this.failPreparedImport(error, {
        importId: input.importId,
        operationPath: pending.operationPath,
        openLibrary,
        trackProgress,
      });
    }
  }

  override async continueAfterSourceFailureCancellable(input: {
    importId: string;
    applyToRest: boolean;
  }): Promise<ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan> {
    if (!this.activeImports.has(input.importId)) {
      this.activeImports.set(input.importId, { cancelled: false });
    }
    try {
      return await Promise.resolve(this.continueAfterSourceFailure({
        ...input,
        yieldTransferCheckpoints: true,
      }));
    } catch (error) {
      this.activeImports.delete(input.importId);
      throw error;
    }
  }

  public override finishImportWithoutUserDecision(
    prepared: ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan,
    decisions: {
      suspectedDuplicate: SuspectedDuplicateDecision;
      nameConflict: NameConflictDecision;
    },
  ): ImportCompletion {
    let current: ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan = prepared;
    if (isImportSourceFailurePlan(current)) {
      current = this.continueAfterSourceFailure({
        importId: current.importId,
        applyToRest: true,
      });
    }
    if (isImportSourceFailurePlan(current)) {
      this.abandonImport(current.importId);
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE');
    }
    if (isImportConflictPlan(current)) {
      return this.resolveImport({
        importId: current.importId,
        suspectedDuplicate: decisions.suspectedDuplicate,
        nameConflict: decisions.nameConflict,
      });
    }
    return current;
  }

  public override parseOperationManifest(serialized: string): PersistedOperationManifest {
    let value: unknown;
    try {
      value = JSON.parse(serialized);
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
    if (
      typeof value !== 'object' ||
      value === null ||
      !('version' in value)
    ) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    if (value.version === 2) {
      const candidate = value as Record<string, unknown>;
      const assetIds = candidate.assetIds;
      const trashedAssetIds = candidate.trashedAssetIds;
      if (
        candidate.kind !== 'linked-trash' ||
        !Array.isArray(assetIds) ||
        !assetIds.every((assetId) => typeof assetId === 'string' && UUID.test(assetId)) ||
        new Set(assetIds).size !== assetIds.length ||
        !Array.isArray(trashedAssetIds) ||
        !trashedAssetIds.every((assetId) => typeof assetId === 'string' && UUID.test(assetId)) ||
        new Set(trashedAssetIds).size !== trashedAssetIds.length ||
        trashedAssetIds.some((assetId) => !assetIds.includes(assetId)) ||
        !('inFlightAssetId' in candidate) ||
        (candidate.inFlightAssetId !== null && (
          typeof candidate.inFlightAssetId !== 'string' ||
          !assetIds.includes(candidate.inFlightAssetId)
        ))
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      return value as unknown as LinkedTrashOperationManifest;
    }
    if (value.version === 3) {
      const candidate = value as Record<string, unknown>;
      if (candidate.kind !== 'restore' || !Array.isArray(candidate.files)) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const assetIds = new Set<string>();
      const backupNames = new Set<string>();
      const destinationIdentities = new Set<string>();
      for (const file of candidate.files) {
        if (typeof file !== 'object' || file === null) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const entry = file as Record<string, unknown>;
        const relativePaths = [entry.destinationRelativePath];
        if (entry.backupDestinationRelativePath !== null) {
          relativePaths.push(entry.backupDestinationRelativePath);
        }
        if (
          typeof entry.assetId !== 'string' || !UUID.test(entry.assetId) ||
          assetIds.has(entry.assetId) ||
          typeof entry.destinationRelativePath !== 'string' ||
          typeof entry.backupName !== 'string' ||
          entry.backupName.length === 0 ||
          backupNames.has(entry.backupName) ||
          path.posix.basename(entry.backupName) !== entry.backupName ||
          path.win32.basename(entry.backupName) !== entry.backupName ||
          typeof entry.trashFilename !== 'string' ||
          entry.trashFilename.length === 0 ||
          path.posix.basename(entry.trashFilename) !== entry.trashFilename ||
          path.win32.basename(entry.trashFilename) !== entry.trashFilename ||
          typeof entry.hadDestination !== 'boolean' ||
          (entry.backupDestinationRelativePath !== null &&
            typeof entry.backupDestinationRelativePath !== 'string') ||
          entry.hadDestination !== (entry.backupDestinationRelativePath !== null) ||
          (entry.conflictingAssetId !== null &&
            (typeof entry.conflictingAssetId !== 'string' || !UUID.test(entry.conflictingAssetId))) ||
          relativePaths.some((relativePath) =>
            typeof relativePath !== 'string' ||
            relativePath.length === 0 ||
            relativePath.includes('\\') ||
            path.posix.isAbsolute(relativePath) ||
            path.posix.normalize(relativePath) !== relativePath ||
            relativePath.split('/').some((segment) => segment === '.' || segment === '..')
          )
        ) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const destinationIdentity = portablePathIdentity(entry.destinationRelativePath);
        if (destinationIdentities.has(destinationIdentity)) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        assetIds.add(entry.assetId);
        backupNames.add(entry.backupName);
        destinationIdentities.add(destinationIdentity);
      }
      return value as unknown as RestoreOperationManifest;
    }
    if (value.version === 5) {
      const candidate = value as Record<string, unknown>;
      if (
        (candidate.kind !== 'managed-copy' && candidate.kind !== 'managed-copy-undo') ||
        !Array.isArray(candidate.files) ||
        (candidate.originalOperationId !== null &&
          (typeof candidate.originalOperationId !== 'string' || !UUID.test(candidate.originalOperationId))) ||
        (candidate.kind === 'managed-copy' && candidate.originalOperationId !== null) ||
        (candidate.kind === 'managed-copy-undo' && candidate.originalOperationId === null)
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const newAssetIds = new Set<string>();
      const destinationIdentities = new Set<string>();
      const validRelativePath = (relativePath: unknown): relativePath is string =>
        typeof relativePath === 'string' && relativePath.length > 0 &&
        !relativePath.includes('\\') && !path.posix.isAbsolute(relativePath) &&
        path.posix.normalize(relativePath) === relativePath &&
        !relativePath.split('/').some((segment) => segment === '.' || segment === '..');
      const validConflict = (conflict: unknown): boolean => {
        if (conflict === null) return true;
        if (typeof conflict !== 'object') return false;
        const entry = conflict as Record<string, unknown>;
        return (entry.kind === 'managed' || entry.kind === 'untracked') &&
          validRelativePath(entry.relativePath) &&
          typeof entry.backupName === 'string' && entry.backupName.length > 0 &&
          path.posix.basename(entry.backupName) === entry.backupName &&
          path.win32.basename(entry.backupName) === entry.backupName &&
          (entry.assetId === null || (typeof entry.assetId === 'string' && UUID.test(entry.assetId))) &&
          (entry.managedFolderId === null || (typeof entry.managedFolderId === 'string' && UUID.test(entry.managedFolderId))) &&
          typeof entry.operationId === 'string' && UUID.test(entry.operationId) &&
          (entry.trashFilename === null || (
            typeof entry.trashFilename === 'string' && entry.trashFilename.length > 0 &&
            path.posix.basename(entry.trashFilename) === entry.trashFilename &&
            path.win32.basename(entry.trashFilename) === entry.trashFilename
          )) &&
          (entry.sourceExists === undefined || typeof entry.sourceExists === 'boolean') &&
          (entry.kind !== 'managed' || (entry.assetId !== null && entry.trashFilename !== null));
      };
      for (const file of candidate.files) {
        if (typeof file !== 'object' || file === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
        const entry = file as Record<string, unknown>;
        if (
          typeof entry.sourceAssetId !== 'string' || !UUID.test(entry.sourceAssetId) ||
          typeof entry.newAssetId !== 'string' || !UUID.test(entry.newAssetId) ||
          newAssetIds.has(entry.newAssetId) ||
          !validRelativePath(entry.sourceRelativePath) || !validRelativePath(entry.destinationRelativePath) ||
          (entry.destinationFolderId !== null &&
            (typeof entry.destinationFolderId !== 'string' || !UUID.test(entry.destinationFolderId))) ||
          !validConflict(entry.destinationConflict)
        ) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const destinationIdentity = portablePathIdentity(entry.destinationRelativePath);
        if (destinationIdentities.has(destinationIdentity)) throw new LibraryServiceError('LIBRARY_CORRUPT');
        newAssetIds.add(entry.newAssetId);
        destinationIdentities.add(destinationIdentity);
      }
      return value as unknown as ManagedCopyOperationManifest;
    }
    if (value.version === 6) {
      const candidate = value as Record<string, unknown>;
      if (
        candidate.kind !== 'content-replace-batch' ||
        !Array.isArray(candidate.files) ||
        candidate.files.length === 0 ||
        candidate.files.length > CONTENT_REPLACE_BATCH_MAX_ITEMS
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const assetIds = new Set<string>();
      const destinationIdentities = new Set<string>();
      const validRelativePath = (relativePath: unknown): relativePath is string =>
        typeof relativePath === 'string' && relativePath.length > 0 &&
        !relativePath.includes('\\') && !path.posix.isAbsolute(relativePath) &&
        path.posix.normalize(relativePath) === relativePath &&
        !relativePath.split('/').some((segment) => segment === '.' || segment === '..');
      for (const file of candidate.files) {
        if (typeof file !== 'object' || file === null) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const entry = file as Record<string, unknown>;
        if (
          typeof entry.assetId !== 'string' || !UUID.test(entry.assetId) || assetIds.has(entry.assetId) ||
          !validRelativePath(entry.destinationRelativePath) ||
          typeof entry.backupName !== 'string' || path.posix.basename(entry.backupName) !== entry.backupName ||
          path.win32.basename(entry.backupName) !== entry.backupName ||
          typeof entry.stageName !== 'string' || path.posix.basename(entry.stageName) !== entry.stageName ||
          path.win32.basename(entry.stageName) !== entry.stageName ||
          typeof entry.newRevisionId !== 'string' || !UUID.test(entry.newRevisionId) ||
          typeof entry.originalModifiedAt !== 'string' || !Number.isFinite(Date.parse(entry.originalModifiedAt)) ||
          typeof entry.originalSha256 !== 'string' || !/^[a-f0-9]{64}$/u.test(entry.originalSha256) ||
          typeof entry.previousRevisionId !== 'string' || !UUID.test(entry.previousRevisionId) ||
          typeof entry.sha256 !== 'string' || !/^[a-f0-9]{64}$/u.test(entry.sha256)
        ) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const destinationIdentity = portablePathIdentity(entry.destinationRelativePath);
        if (destinationIdentities.has(destinationIdentity)) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        assetIds.add(entry.assetId);
        destinationIdentities.add(destinationIdentity);
      }
      return value as unknown as ContentReplaceBatchOperationManifest;
    }
    if (value.version === 7) {
      const candidate = value as Record<string, unknown>;
      const validId = (entry: unknown): entry is string => typeof entry === 'string' && UUID.test(entry);
      const validRelativePath = (entry: unknown): entry is string =>
        typeof entry === 'string'
        && entry.length > 0
        && !entry.includes('\\')
        && !path.posix.isAbsolute(entry)
        && path.posix.normalize(entry) === entry
        && !entry.split('/').some((segment) => segment === '.' || segment === '..');
      const validFolder = (entry: unknown): boolean => {
        if (typeof entry !== 'object' || entry === null) return false;
        const folder = entry as Record<string, unknown>;
        return validId(folder.folderId)
          && typeof folder.name === 'string'
          && (folder.parentFolderId === null || validId(folder.parentFolderId))
          && validRelativePath(folder.relativePath)
          && folder.pathIdentity === portablePathIdentity(folder.relativePath);
      };
      const validTombstone = (entry: unknown): boolean => {
        if (typeof entry !== 'object' || entry === null) return false;
        const tombstone = entry as Record<string, unknown>;
        return validId(tombstone.tombstoneId)
          && validId(tombstone.folderId)
          && validRelativePath(tombstone.relativePath)
          && (tombstone.parentRelativePath === null || validRelativePath(tombstone.parentRelativePath))
          && typeof tombstone.name === 'string'
          && Number.isInteger(tombstone.trashedAssetCount)
          && (tombstone.trashedAssetCount as number) >= 0;
      };
      if (
        candidate.kind !== 'folder-trash'
        || !Array.isArray(candidate.assetIds)
        || !candidate.assetIds.every(validId)
        || new Set(candidate.assetIds).size !== candidate.assetIds.length
        || (candidate.assetOperationId !== null && !validId(candidate.assetOperationId))
        || !validFolder(candidate.folder)
        || !Array.isArray(candidate.descendants)
        || !candidate.descendants.every(validFolder)
        || !Array.isArray(candidate.tombstones)
        || !candidate.tombstones.every(validTombstone)
        || typeof candidate.trashedAt !== 'string'
        || !Number.isFinite(Date.parse(candidate.trashedAt))
        || !['prepared', 'assets-trashed', 'tombstones-written', 'filesystem-staged', 'db-committed'].includes(String(candidate.phase))
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      return value as unknown as ManagedFolderTrashOperationManifest;
    }
    if (value.version === 4) {
      const candidate = value as Record<string, unknown>;
      if (
        (candidate.kind !== 'managed-move' && candidate.kind !== 'managed-move-undo') ||
        !Array.isArray(candidate.files) ||
        (candidate.originalOperationId !== null &&
          (typeof candidate.originalOperationId !== 'string' || !UUID.test(candidate.originalOperationId))) ||
        (candidate.kind === 'managed-move' && candidate.originalOperationId !== null) ||
        (candidate.kind === 'managed-move-undo' && candidate.originalOperationId === null)
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const assetIds = new Set<string>();
      const destinationIdentities = new Set<string>();
      const validRelativePath = (relativePath: unknown): relativePath is string =>
        typeof relativePath === 'string' && relativePath.length > 0 &&
        !relativePath.includes('\\') && !path.posix.isAbsolute(relativePath) &&
        path.posix.normalize(relativePath) === relativePath &&
        !relativePath.split('/').some((segment) => segment === '.' || segment === '..');
      const validConflict = (conflict: unknown): boolean => {
        if (conflict === null) return true;
        if (typeof conflict !== 'object') return false;
        const entry = conflict as Record<string, unknown>;
        return (entry.kind === 'managed' || entry.kind === 'untracked') &&
          validRelativePath(entry.relativePath) &&
          typeof entry.backupName === 'string' && entry.backupName.length > 0 &&
          path.posix.basename(entry.backupName) === entry.backupName &&
          path.win32.basename(entry.backupName) === entry.backupName &&
          (entry.assetId === null || (typeof entry.assetId === 'string' && UUID.test(entry.assetId))) &&
          (entry.managedFolderId === null || (typeof entry.managedFolderId === 'string' && UUID.test(entry.managedFolderId))) &&
          typeof entry.operationId === 'string' && UUID.test(entry.operationId) &&
          (entry.trashFilename === null || (
            typeof entry.trashFilename === 'string' && entry.trashFilename.length > 0 &&
            path.posix.basename(entry.trashFilename) === entry.trashFilename &&
            path.win32.basename(entry.trashFilename) === entry.trashFilename
          )) &&
          (entry.sourceExists === undefined || typeof entry.sourceExists === 'boolean') &&
          (entry.kind !== 'managed' || (entry.assetId !== null && entry.trashFilename !== null));
      };
      for (const file of candidate.files) {
        if (typeof file !== 'object' || file === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
        const entry = file as Record<string, unknown>;
        if (
          typeof entry.assetId !== 'string' || !UUID.test(entry.assetId) || assetIds.has(entry.assetId) ||
          !validRelativePath(entry.sourceRelativePath) || !validRelativePath(entry.destinationRelativePath) ||
          (entry.sourceFolderId !== null && (typeof entry.sourceFolderId !== 'string' || !UUID.test(entry.sourceFolderId))) ||
          (entry.destinationFolderId !== null && (typeof entry.destinationFolderId !== 'string' || !UUID.test(entry.destinationFolderId))) ||
          !validConflict(entry.destinationConflict) || !validConflict(entry.restoreConflict)
        ) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const destinationIdentity = portablePathIdentity(entry.destinationRelativePath);
        if (destinationIdentities.has(destinationIdentity)) throw new LibraryServiceError('LIBRARY_CORRUPT');
        assetIds.add(entry.assetId);
        destinationIdentities.add(destinationIdentity);
      }
      return value as unknown as ManagedMoveOperationManifest;
    }
    if (
      value.version !== 1 ||
      !('files' in value) ||
      !Array.isArray(value.files) ||
      !('directories' in value) ||
      !Array.isArray(value.directories)
    ) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    for (const file of value.files) {
      if (
        typeof file !== 'object' ||
        file === null ||
        !('destinationRelativePath' in file) ||
        typeof file.destinationRelativePath !== 'string' ||
        !('stageName' in file) ||
        typeof file.stageName !== 'string' ||
        path.basename(file.stageName) !== file.stageName ||
        !('backupName' in file) ||
        typeof file.backupName !== 'string' ||
        path.basename(file.backupName) !== file.backupName ||
        !('hadDestination' in file) ||
        typeof file.hadDestination !== 'boolean'
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
    }
    for (const directory of value.directories) {
      if (
        typeof directory !== 'object' ||
        directory === null ||
        !('relativePath' in directory) ||
        typeof directory.relativePath !== 'string' ||
        !('existed' in directory) ||
        typeof directory.existed !== 'boolean'
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
    }
    return value as unknown as OperationManifest;
  }

  public override recoverLinkedTrashOperation(
    openLibrary: OpenLibrary,
    row: OperationRow,
    manifest: LinkedTrashOperationManifest,
  ): void {
    const assetIdsToDelete: string[] = [];
    let recoveryPending = false;
    const explicitlyTrashed = new Set(manifest.trashedAssetIds);
    for (const assetId of manifest.assetIds) {
      const asset = openLibrary.connection
        .prepare(
          `SELECT asset_id, linked_folder_id, relative_file_path
             FROM assets
            WHERE asset_id = ? AND location_kind = 'linked'`,
        )
        .get(assetId) as {
          asset_id: string;
          linked_folder_id: string;
          relative_file_path: string;
        } | undefined;
      if (!asset) continue;
      if (explicitlyTrashed.has(assetId)) {
        assetIdsToDelete.push(assetId);
        continue;
      }
      if (manifest.inFlightAssetId === assetId) {
        const linkedFolder = openLibrary.connection
          .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE folder_id = ?')
          .get(asset.linked_folder_id) as {
            absolute_root_path: string;
            status: 'available' | 'offline';
          } | undefined;
        const linkedRootOnline = linkedFolder?.status === 'available' &&
          !this.linkedRootIsGone(linkedFolder.absolute_root_path);
        if (linkedRootOnline) {
          try {
            const sourcePath = this.linkedAssetPath(
              openLibrary,
              asset.linked_folder_id,
              asset.relative_file_path,
            );
            if (!existsSync(sourcePath)) assetIdsToDelete.push(assetId);
          } catch (error) {
            recoveryPending = true;
            this.diagnose('asset.delete-linked.recovery-inspect-source', error, {
              operationId: row.operation_id,
              libraryId: openLibrary.summary.libraryId,
              assetId,
            });
          }
        } else {
          recoveryPending = true;
        }
      }
    }

    openLibrary.connection.transaction(() => {
      for (const assetId of assetIdsToDelete) {
        openLibrary.connection.prepare('DELETE FROM assets WHERE asset_id = ?').run(assetId);
      }
      openLibrary.connection
        .prepare(
          `UPDATE file_operations
              SET status = ?, error_code = ?, updated_at = ?
            WHERE operation_id = ?`,
        )
        .run(
          recoveryPending ? 'applying' : 'committed',
          recoveryPending ? 'SOURCE_TRASH_RECONCILIATION_REQUIRED' : 'PROCESS_INTERRUPTED_RECOVERED',
          new Date().toISOString(),
          row.operation_id,
        );
    })();

    if (recoveryPending) {
      this.diagnose(
        'asset.delete-linked.recovery-pending',
        new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
          reason: 'SOURCE_TRASH_RECONCILIATION_REQUIRED',
        }),
        {
          operationId: row.operation_id,
          libraryId: openLibrary.summary.libraryId,
          inFlightAssetId: manifest.inFlightAssetId,
        },
      );
    } else if (manifest.assetIds.length > assetIdsToDelete.length) {
      openLibrary.connection
        .prepare('UPDATE file_operations SET error_code = ? WHERE operation_id = ?')
        .run('PROCESS_INTERRUPTED_PARTIAL', row.operation_id);
    }
  }

  public override recoverRestoreOperation(
    openLibrary: OpenLibrary,
    row: OperationRow,
    manifest: RestoreOperationManifest,
    operationPath: string,
  ): void {
    if (row.status === 'preparing') {
      this.removeOperation(operationPath);
      openLibrary.connection
        .prepare(
          "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
        )
        .run(new Date().toISOString(), row.operation_id);
      return;
    }

    const regularFileExists = (filePath: string): boolean => {
      try {
        const entry = lstatSync(filePath);
        if (!entry.isFile() || entry.isSymbolicLink()) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        return true;
      } catch (error) {
        if (error instanceof LibraryServiceError) throw error;
        if (isMissingPathError(error)) return false;
        throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
      }
    };

    for (const file of [...manifest.files].reverse()) {
      const sourcePath = this.trashPath(openLibrary, file.assetId, file.trashFilename);
      const destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
      const backupPath = path.join(operationPath, 'backup', file.backupName);
      const backupDestinationPath = file.backupDestinationRelativePath === null
        ? null
        : this.folderPath(openLibrary, file.backupDestinationRelativePath);
      const sourceExists = regularFileExists(sourcePath);
      const destinationExists = regularFileExists(destinationPath);
      const backupExists = regularFileExists(backupPath);

      if (!sourceExists) {
        if (!destinationExists) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        mkdirSync(path.dirname(sourcePath), { recursive: true });
        renameSync(destinationPath, sourcePath);
      }

      if (backupExists) {
        if (backupDestinationPath === null || regularFileExists(backupDestinationPath)) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        mkdirSync(path.dirname(backupDestinationPath), { recursive: true });
        renameSync(backupPath, backupDestinationPath);
      } else if (file.hadDestination && (!sourceExists || !destinationExists)) {
        // The destination was moved out of the way but its durable backup has
        // disappeared. Do not claim recovery or discard the restored source.
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
    }

    this.removeOperation(operationPath);
    openLibrary.connection
      .prepare(
        "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
      )
      .run(new Date().toISOString(), row.operation_id);
  }

  public override moveConflictHoldingPath(
    openLibrary: OpenLibrary,
    conflict: ManagedMoveConflict,
  ): string {
    if (conflict.kind === 'managed') {
      if (!conflict.assetId || !conflict.trashFilename) throw new LibraryServiceError('LIBRARY_CORRUPT');
      return this.trashPath(openLibrary, conflict.assetId, conflict.trashFilename);
    }
    const operationsRoot = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);
    const operationPath = path.join(operationsRoot, conflict.operationId);
    this.assertSafeOperationPath(operationPath);
    return path.join(operationPath, 'backup', conflict.backupName);
  }

  public override recoverManagedMoveOperation(
    openLibrary: OpenLibrary,
    row: OperationRow,
    manifest: ManagedMoveOperationManifest,
    operationPath: string,
  ): void {
    if (row.status === 'preparing') {
      this.removeOperation(operationPath);
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
      ).run(new Date().toISOString(), row.operation_id);
      return;
    }

    for (const file of [...manifest.files].reverse()) {
      const sourcePath = this.folderPath(openLibrary, file.sourceRelativePath);
      const destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
      const sourceExists = realFileExists(sourcePath);
      const destinationExists = realFileExists(destinationPath);
      const restoreHoldingPath = file.restoreConflict
        ? this.moveConflictHoldingPath(openLibrary, file.restoreConflict)
        : null;
      const restoreHoldingExists = restoreHoldingPath ? realFileExists(restoreHoldingPath) : false;
      const assetWasMoved = destinationExists && (
        !sourceExists || (file.restoreConflict !== null && !restoreHoldingExists)
      );

      // A reverse/undo operation may have restored the asset that the original
      // replace displaced. Put it back in its durable holding location before
      // returning the moved asset to its source.
      if (assetWasMoved && file.restoreConflict) {
        const holdingPath = restoreHoldingPath!;
        if (realFileExists(sourcePath)) {
          if (realFileExists(holdingPath)) throw new LibraryServiceError('LIBRARY_CORRUPT');
          mkdirSync(path.dirname(holdingPath), { recursive: true });
          renameSync(sourcePath, holdingPath);
        }
      }

      if (assetWasMoved) {
        if (realFileExists(sourcePath)) throw new LibraryServiceError('LIBRARY_CORRUPT');
        mkdirSync(path.dirname(sourcePath), { recursive: true });
        renameSync(destinationPath, sourcePath);
      }

      if (file.destinationConflict && file.destinationConflict.sourceExists !== false) {
        const holdingPath = this.moveConflictHoldingPath(openLibrary, file.destinationConflict);
        if (realFileExists(holdingPath)) {
          if (realFileExists(destinationPath)) throw new LibraryServiceError('LIBRARY_CORRUPT');
          mkdirSync(path.dirname(destinationPath), { recursive: true });
          renameSync(holdingPath, destinationPath);
        }
      }
    }

    this.removeOperation(operationPath);
    openLibrary.connection.prepare(
      "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
    ).run(new Date().toISOString(), row.operation_id);
  }

  public override recoverManagedCopyOperation(
    openLibrary: OpenLibrary,
    row: OperationRow,
    manifest: ManagedCopyOperationManifest,
    operationPath: string,
  ): void {
    if (row.status === 'preparing') {
      this.removeOperation(operationPath);
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
      ).run(new Date().toISOString(), row.operation_id);
      return;
    }

    // Incomplete copy: drop any destination files that were written before the
    // DB commit, then restore any replace-held conflict targets.
    for (const file of [...manifest.files].reverse()) {
      const newAsset = openLibrary.connection.prepare(
        'SELECT asset_id FROM assets WHERE asset_id = ?',
      ).get(file.newAssetId) as { asset_id: string } | undefined;
      if (newAsset) {
        openLibrary.connection.prepare('DELETE FROM assets WHERE asset_id = ?').run(file.newAssetId);
      }
      const destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
      if (realFileExists(destinationPath)) {
        rmSync(destinationPath, { force: true });
      }
      if (file.destinationConflict && file.destinationConflict.sourceExists !== false) {
        const holdingPath = this.moveConflictHoldingPath(openLibrary, file.destinationConflict);
        if (realFileExists(holdingPath) && !realFileExists(destinationPath)) {
          mkdirSync(path.dirname(destinationPath), { recursive: true });
          renameSync(holdingPath, destinationPath);
        }
      }
    }

    this.removeOperation(operationPath);
    openLibrary.connection.prepare(
      "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
    ).run(new Date().toISOString(), row.operation_id);
  }

  public override recoverContentReplaceBatchOperation(
    openLibrary: OpenLibrary,
    row: OperationRow,
    manifest: ContentReplaceBatchOperationManifest,
    operationPath: string,
  ): void {
    if (row.status === 'preparing') {
      this.removeOperation(operationPath);
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
      ).run(new Date().toISOString(), row.operation_id);
      return;
    }

    let recoveryPending = false;
    const restoreOriginalModifiedAt = (destinationPath: string, modifiedAt: string): void => {
      const timestamp = Date.parse(modifiedAt);
      if (!Number.isFinite(timestamp)) {
        recoveryPending = true;
        return;
      }
      try {
        const date = new Date(timestamp);
        utimesSync(destinationPath, date, date);
      } catch {
        recoveryPending = true;
      }
    };
    for (const file of [...manifest.files].reverse()) {
      let destinationPath: string;
      try {
        destinationPath = this.resolveAssetPath(openLibrary.summary.libraryId, file.assetId);
      } catch {
        destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
      }
      const backupPath = path.join(operationPath, 'backup', file.backupName);
      if (!realFileExists(backupPath)) continue;
      if (!realFileExists(destinationPath)) {
        mkdirSync(path.dirname(destinationPath), { recursive: true });
        renameSync(backupPath, destinationPath);
        restoreOriginalModifiedAt(destinationPath, file.originalModifiedAt);
        continue;
      }
      let destinationHash: string;
      try {
        destinationHash = sha256FileAtPath(destinationPath);
      } catch {
        recoveryPending = true;
        continue;
      }
      if (destinationHash !== file.sha256) {
        if (destinationHash === file.originalSha256) {
          rmSync(backupPath, { force: true });
          restoreOriginalModifiedAt(destinationPath, file.originalModifiedAt);
          continue;
        }
        // An external writer changed the destination after the interrupted
        // replace. Do not overwrite it during recovery; retain the journal so
        // the conflict is explainable and can be handled explicitly.
        recoveryPending = true;
        continue;
      }
      rmSync(destinationPath, { force: true });
      mkdirSync(path.dirname(destinationPath), { recursive: true });
      renameSync(backupPath, destinationPath);
      restoreOriginalModifiedAt(destinationPath, file.originalModifiedAt);
    }
    if (recoveryPending) {
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'failed', error_code = 'CONTENT_REPLACE_RECOVERY_CONFLICT', updated_at = ? WHERE operation_id = ?",
      ).run(new Date().toISOString(), row.operation_id);
      this.diagnose('asset.content-replace-batch.recovery-pending', new Error(
        'An interrupted batch encountered an external destination change.',
      ), {
        operationId: row.operation_id,
        libraryId: openLibrary.summary.libraryId,
      });
      return;
    }
    this.removeOperation(operationPath);
    openLibrary.connection.prepare(
      "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
    ).run(new Date().toISOString(), row.operation_id);
  }

  public override recoverFileOperations(openLibrary: OpenLibrary): void {
    const rows = openLibrary.connection
      .prepare(
        `SELECT operation_id, kind, status, manifest_json, error_code
           FROM file_operations
          ORDER BY created_at`,
      )
      .all() as OperationRow[];
    const operationsPath = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);

    const retainedOperationIds = new Set<string>();
    for (const row of rows) {
      if (!UUID.test(row.operation_id) || path.basename(row.operation_id) !== row.operation_id) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const operationPath = path.resolve(operationsPath, row.operation_id);
      const operationRelation = path.relative(operationsPath, operationPath);
      if (
        operationRelation === '' ||
        operationRelation.startsWith(`..${path.sep}`) ||
        path.isAbsolute(operationRelation)
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      if (row.status === 'committed') {
        const manifest = this.parseOperationManifest(row.manifest_json);
        if (
          ((manifest.version === 4 && manifest.kind === 'managed-move') ||
            (manifest.version === 5 && manifest.kind === 'managed-copy')) &&
          row.error_code !== 'UNDONE'
        ) {
          // The committed move/copy journal backs one-shot undo. Keep it until
          // an undo consumes it.
          retainedOperationIds.add(row.operation_id);
          continue;
        }
        this.removeOperation(operationPath);
        continue;
      }
      if (row.status === 'rolled_back') {
        this.removeOperation(operationPath);
        continue;
      }
      if (
        row.status === 'failed' &&
        row.error_code !== 'IMPORT_APPLY_FAILED' &&
        row.error_code !== 'RESTORE_APPLY_FAILED' &&
        row.error_code !== 'MOVE_APPLY_FAILED' &&
        row.error_code !== 'COPY_APPLY_FAILED' &&
        row.error_code !== 'CONTENT_REPLACE_APPLY_FAILED' &&
        row.error_code !== 'CONTENT_REPLACE_RECOVERY_CONFLICT' &&
        row.error_code !== 'FOLDER_TRASH_RECOVERY_REQUIRED'
      ) {
        this.removeOperation(operationPath);
        continue;
      }
      // Another Serpent process is still applying under a live Job lease.
      // Do not roll back its filesystem or clear the operation directory.
      const JOB_LEASE_APPLYING_KINDS = new Set([
        'import',
        'managed-move',
        'managed-move-undo',
        'managed-copy',
        'restore',
        'content-replace-batch',
      ]);
      if (
        row.status === 'applying'
        && row.kind !== undefined
        && JOB_LEASE_APPLYING_KINDS.has(row.kind)
        && new LibraryWriteCoordinator(openLibrary.writeConnection, openLibrary.summary.libraryId)
          .hasLiveJobLease(row.operation_id)
      ) {
        retainedOperationIds.add(row.operation_id);
        continue;
      }
      this.assertSafeOperationPath(operationPath);
      const manifest = this.parseOperationManifest(row.manifest_json);
      if (manifest.version === 7) {
        this.recoverManagedFolderTrashOperation(openLibrary, row, manifest, operationPath);
        continue;
      }
      if (manifest.version === 2) {
        this.recoverLinkedTrashOperation(openLibrary, row, manifest);
        continue;
      }
      if (manifest.version === 3) {
        this.recoverRestoreOperation(openLibrary, row, manifest, operationPath);
        continue;
      }
      if (manifest.version === 4) {
        this.recoverManagedMoveOperation(openLibrary, row, manifest, operationPath);
        continue;
      }
      if (manifest.version === 5) {
        this.recoverManagedCopyOperation(openLibrary, row, manifest, operationPath);
        continue;
      }
      if (manifest.version === 6) {
        // A recovery conflict is intentionally retained across reopen. The
        // recovery helper may leave the operation directory in place so an
        // operator can resolve the external destination change explicitly;
        // do not let the generic orphan sweep erase that evidence later in
        // this same pass.
        if (row.status === 'failed' && row.error_code === 'CONTENT_REPLACE_RECOVERY_CONFLICT') {
          retainedOperationIds.add(row.operation_id);
        }
        this.recoverContentReplaceBatchOperation(openLibrary, row, manifest, operationPath);
        continue;
      }
      if (
        row.status === 'preparing' &&
        (manifest.phase === 'staging' || manifest.phase === 'prepared')
      ) {
        // Preparing never owns a destination: only staged copies are safe to remove.
        // A destination may have been created by another process after planning.
        this.removeOperation(operationPath);
        openLibrary.connection
          .prepare(
            "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
          )
          .run(new Date().toISOString(), row.operation_id);
        continue;
      }
      const findAppliedImportAsset =
        row.kind === 'import' && row.status === 'applying' && manifest.version === 1
          ? openLibrary.connection.prepare(
              `SELECT asset_id
                 FROM assets
                WHERE location_kind = 'managed'
                  AND path_identity = ?
                  AND deleted_at IS NULL
                LIMIT 1`,
            )
          : undefined;
      let recoveredAppliedImportAsset = false;
      for (const file of [...manifest.files].reverse()) {
        const destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
        const backupPath = path.join(operationPath, 'backup', file.backupName);
        const stagedPath = path.join(operationPath, 'stage', file.stageName);
        let backupExists = false;
        try {
          const backup = lstatSync(backupPath);
          if (!backup.isFile() || backup.isSymbolicLink()) {
            throw new LibraryServiceError('LIBRARY_CORRUPT');
          }
          backupExists = true;
        } catch (error) {
          if (error instanceof LibraryServiceError) throw error;
          if (!isMissingPathError(error)) {
            throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
          }
        }
        if (backupExists) {
          this.failAt('recovery-restore');
          rmSync(destinationPath, { force: true, recursive: true });
          mkdirSync(path.dirname(destinationPath), { recursive: true });
          renameSync(backupPath, destinationPath);
        } else if (
          findAppliedImportAsset?.get(portablePathIdentity(file.destinationRelativePath))
        ) {
          // The file was already registered before the process stopped. It is
          // durable application state, not an orphan left between rename and
          // INSERT; preserve it and let normal reconciliation repair a source
          // that is still missing on disk.
          recoveredAppliedImportAsset = true;
        } else if (!file.hadDestination && !existsSync(stagedPath) && existsSync(destinationPath)) {
          rmSync(destinationPath, { force: true, recursive: true });
        }
      }
      for (const directory of [...manifest.directories].reverse()) {
        if (directory.existed) continue;
        try {
          rmdirSync(this.folderPath(openLibrary, directory.relativePath));
        } catch {
          // A restored file or an external writer may still use the directory.
        }
      }
      this.removeOperation(operationPath);
      openLibrary.connection
        .prepare(
          `UPDATE file_operations
              SET status = ?, error_code = ?, updated_at = ?
            WHERE operation_id = ?`,
        )
        .run(
          recoveredAppliedImportAsset ? 'committed' : 'rolled_back',
          recoveredAppliedImportAsset
            ? 'PROCESS_INTERRUPTED_RECOVERED'
            : 'PROCESS_INTERRUPTED',
          new Date().toISOString(),
          row.operation_id,
        );
    }

    if (directoryExists(operationsPath)) {
      for (const child of readdirSync(operationsPath)) {
        if (retainedOperationIds.has(child)) continue;
        const orphanPath = path.join(operationsPath, child);
        if (child.startsWith('relink-')) {
          // Validate relink orphan paths separately — they use a relink-<uuid>
          // naming convention and carry a manifest.json, not stage/backup dirs.
          if (!UUID.test(child.slice('relink-'.length))) {
            throw new LibraryServiceError('LIBRARY_CORRUPT');
          }
          // Re-validate that the directory is a real directory (not a symlink)
          // directly under operations/ — same safety check as assertSafeOperationPath.
          try {
            const entry = lstatSync(orphanPath);
            if (!entry.isDirectory() || entry.isSymbolicLink()) {
              throw new LibraryServiceError('LIBRARY_CORRUPT');
            }
          } catch (error) {
            if (isMissingPathError(error)) continue;
            throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
          }
          const realRelation = path.relative(
            realpathSync(operationsPath),
            realpathSync(orphanPath),
          );
          if (realRelation !== path.basename(orphanPath)) {
            throw new LibraryServiceError('LIBRARY_CORRUPT');
          }
          if (this.recoverOrphanRelinkPlacement(openLibrary, orphanPath)) {
            continue;
          }
          rmSync(orphanPath, { force: true, recursive: true });
          continue;
        }
        this.assertSafeOperationPath(orphanPath);
        rmSync(orphanPath, { force: true, recursive: true });
      }
      try {
        rmdirSync(operationsPath);
      } catch {
        // A concurrent prepare may have created a new operation after the scan.
      }
    }
  }

  public override recoverManagedFolderTrashOperation(
    openLibrary: OpenLibrary,
    row: OperationRow,
    manifest: ManagedFolderTrashOperationManifest,
    operationPath: string,
  ): void {
    const now = new Date().toISOString();
    const folderRows = [manifest.folder, ...manifest.descendants];
    const folderIds = folderRows.map((folder) => folder.folderId);

    if (row.status === 'preparing' && manifest.phase === 'prepared') {
      this.removeOperation(operationPath);
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'rolled_back', error_code = 'PROCESS_INTERRUPTED', updated_at = ? WHERE operation_id = ?",
      ).run(now, row.operation_id);
      return;
    }

    if (manifest.assetIds.length > 0 && manifest.assetOperationId) {
      const active = sqliteAllInChunks<string, { asset_id: string }>({
        connection: openLibrary.connection,
        values: manifest.assetIds,
        buildSql: (placeholders) =>
          `SELECT asset_id FROM assets WHERE asset_id IN (${placeholders})
            AND deleted_at IS NULL`,
      });
      if (active.length > 0) {
        this.trashAssets({
          libraryId: openLibrary.summary.libraryId,
          assetIds: active.map((asset) => asset.asset_id),
          allowExplicitlyIgnored: true,
          operationId: manifest.assetOperationId,
        });
      }
    }

    if (manifest.phase === 'prepared') {
      manifest.phase = 'assets-trashed';
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'applying', manifest_json = ?, updated_at = ? WHERE operation_id = ?",
      ).run(JSON.stringify(manifest), now, row.operation_id);
    }

    openLibrary.connection.transaction(() => {
      const insert = openLibrary.connection.prepare(
        `INSERT OR IGNORE INTO trashed_managed_folders
           (tombstone_id, folder_id, relative_path, name, parent_relative_path,
            trashed_at, trashed_asset_count)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      );
      for (const tombstone of manifest.tombstones) {
        insert.run(
          tombstone.tombstoneId,
          tombstone.folderId,
          tombstone.relativePath,
          tombstone.name,
          tombstone.parentRelativePath,
          manifest.trashedAt,
          tombstone.trashedAssetCount,
        );
        openLibrary.connection.prepare(
          `UPDATE assets SET trashed_from_tombstone_id = ?
            WHERE deleted_at IS NOT NULL AND trashed_from_folder_id = ?`,
        ).run(tombstone.tombstoneId, tombstone.folderId);
      }
    })();
    manifest.phase = 'tombstones-written';
    openLibrary.connection.prepare(
      'UPDATE file_operations SET manifest_json = ?, updated_at = ? WHERE operation_id = ?',
    ).run(JSON.stringify(manifest), new Date().toISOString(), row.operation_id);

    const originalPath = this.folderPath(openLibrary, manifest.folder.relativePath);
    const stagedPath = path.join(operationPath, 'folder-tree');
    if (existsSync(originalPath) && existsSync(stagedPath)) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    if (!existsSync(stagedPath) && existsSync(originalPath)) {
      mkdirSync(path.dirname(stagedPath), { recursive: true });
      renameSync(originalPath, stagedPath);
    }
    manifest.phase = 'filesystem-staged';
    openLibrary.connection.prepare(
      'UPDATE file_operations SET manifest_json = ?, updated_at = ? WHERE operation_id = ?',
    ).run(JSON.stringify(manifest), new Date().toISOString(), row.operation_id);

    openLibrary.connection.transaction(() => {
      const remove = openLibrary.connection.prepare('DELETE FROM managed_folders WHERE folder_id = ?');
      for (const folderId of [...folderIds].reverse()) remove.run(folderId);
    })();
    manifest.phase = 'db-committed';
    openLibrary.connection.prepare(
      "UPDATE file_operations SET status = 'committed', manifest_json = ?, updated_at = ? WHERE operation_id = ?",
    ).run(JSON.stringify(manifest), new Date().toISOString(), row.operation_id);
    this.removeOperation(operationPath);
  }

}
