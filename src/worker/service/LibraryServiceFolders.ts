/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { ManagedFolderRow, ManagedFolderTrashOperationManifest, OpenLibrary, TransferCancelState} from '../library-service-internals';
import { LibraryServiceError, SimulatedCrashError, UUID, createProgressThrottle, directoryExists, isMissingPathError, realDirectoryExists, removePathWithRetry, serviceError, transferCheckpoint } from '../library-service-internals';
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
import { LibraryServiceIngestion } from './LibraryServiceIngestion';
import type { LibraryServiceAllMethods } from './all-methods';

/** LibraryServiceFolders: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceFolders extends LibraryServiceIngestion {

  override createManagedFolder(input: {
    libraryId: string;
    name: string;
    parentFolderId?: string;
  }): ManagedFolderSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    let name: string;
    try {
      name = normalizeFolderName(input.name);
    } catch (error) {
      throw serviceError(error, 'INVALID_FOLDER_NAME');
    }

    let parent: ManagedFolderRow | undefined;
    if (input.parentFolderId) {
      parent = openLibrary.connection
        .prepare(
          // Serpent review: managed_folders lives inside the per-library DB —
          // there is no library_id column (the table is already library-scoped).
          'SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?',
        )
        .get(input.parentFolderId) as ManagedFolderRow | undefined;
      if (!parent) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    const relativePath = parent ? path.posix.join(parent.relative_path, name) : name;
    const pathIdentity = portablePathIdentity(relativePath);
    const targetPath = this.folderPath(openLibrary, relativePath);
    const databaseConflict =
      openLibrary.connection
        .prepare('SELECT folder_id FROM managed_folders WHERE path_identity = ?')
        .get(pathIdentity) ??
      openLibrary.connection
        .prepare('SELECT asset_id FROM assets WHERE path_identity = ?')
        .get(pathIdentity);
    if (databaseConflict || this.portableDiskDestination(openLibrary, relativePath)) {
      throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
    }

    const createdAt = new Date().toISOString();
    const folder: ManagedFolderSummary = {
      folderId: randomUUID(),
      parentFolderId: parent?.folder_id ?? null,
      name,
      relativePath,
      directAssetCount: 0,
      childFolderCount: 0,
      createdAt,
      // Every summary path reports appearance, so a single-row return and
      // listManagedFolders must not disagree (Serpent-df3049 follow-up).
      appearance: null,
    };
    try {
      mkdirSync(targetPath);
      openLibrary.connection
        .prepare(
          `INSERT INTO managed_folders
             (folder_id, parent_folder_id, name, relative_path, path_identity, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
        )
        .run(
          folder.folderId,
          folder.parentFolderId,
          folder.name,
          folder.relativePath,
          pathIdentity,
          createdAt,
        );
      return folder;
    } catch (error) {
      try {
        if (directoryExists(targetPath)) rmdirSync(targetPath);
      } catch {
        // Preserve the primary operation failure; later reconciliation can index an empty directory.
      }
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
  }

  /**
   * Renaming a managed folder renames the real directory and rewrites the
   * recorded path of every row underneath it: the folder row itself, all
   * descendant managed_folders rows, and every managed asset whose recorded
   * path lives in the subtree — including missing and already-trashed rows,
   * whose recorded paths must still follow the real directory so trash
   * restore and reconciliation keep working.
   *
   * Crash-safety convention follows renameAssetFile: rename on disk first,
   * then one DB transaction (path + FTS sync); on DB failure the disk rename
   * is rolled back best-effort. Content is untouched, so no revision row is
   * recorded.
   */
  override renameManagedFolder(input: {
    libraryId: string;
    folderId: string;
    newName: string;
  }): ManagedFolderSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    let name: string;
    try {
      name = normalizeFolderName(input.newName);
    } catch (error) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME', {
        reason: 'NAME_NOT_SUPPORTED',
        cause: error,
      });
    }

    const row = openLibrary.connection
      .prepare(
        'SELECT folder_id, parent_folder_id, name, relative_path, path_identity, created_at, appearance_glyph_kind, appearance_glyph_value, appearance_color_id FROM managed_folders WHERE folder_id = ?',
      )
      .get(input.folderId) as ManagedFolderRow | undefined;
    if (!row) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    // Identical target (same spelling, same case): success no-op, nothing on
    // disk or in the DB is touched.
    if (name === row.name) {
      return this.summarizeManagedFolderRowRecursive(openLibrary, row);
    }

    const oldRelativePath = row.relative_path;
    const parentRelativePath = path.posix.dirname(oldRelativePath);
    const newRelativePath =
      parentRelativePath === '.' ? name : path.posix.join(parentRelativePath, name);
    const newIdentity = portablePathIdentity(newRelativePath);

    const sourcePath = this.folderPath(openLibrary, oldRelativePath);
    if (!realDirectoryExists(sourcePath)) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }

    // Conflicts are judged by portable (case-folded) identity so a case-only
    // match against a DIFFERENT entry is still a conflict on case-insensitive
    // volumes; the source directory's own entry is exempt, which is what
    // makes a pure case-change rename (a -> A) possible.
    const databaseConflict =
      openLibrary.connection
        .prepare('SELECT folder_id FROM managed_folders WHERE path_identity = ? AND folder_id != ?')
        .get(newIdentity, row.folder_id) ??
      openLibrary.connection
        .prepare(
          `SELECT asset_id FROM assets
            WHERE path_identity = ? AND location_kind = 'managed' AND deleted_at IS NULL`,
        )
        .get(newIdentity);
    if (databaseConflict) throw new LibraryServiceError('FOLDER_NAME_CONFLICT');

    const parentDirectoryPath = path.dirname(sourcePath);
    const targetSegmentIdentity = portablePathSegmentIdentity(name);
    let directoryEntries;
    try {
      directoryEntries = readdirSync(parentDirectoryPath, { withFileTypes: true });
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    for (const entry of directoryEntries) {
      if (entry.name === row.name) continue;
      if (portablePathSegmentIdentity(entry.name) === targetSegmentIdentity) {
        throw new LibraryServiceError('FOLDER_NAME_CONFLICT');
      }
    }

    const destinationPath = path.join(parentDirectoryPath, name);
    const now = new Date().toISOString();
    let renamed = false;
    try {
      renameSync(sourcePath, destinationPath);
      renamed = true;
      openLibrary.connection.transaction(() => {
        const changed = openLibrary.connection
          .prepare(
            `UPDATE managed_folders
                SET name = ?, relative_path = ?, path_identity = ?
              WHERE folder_id = ?`,
          )
          .run(name, newRelativePath, newIdentity, row.folder_id);
        if (changed.changes !== 1) {
          throw new LibraryServiceError('FOLDER_NOT_FOUND', { reason: 'SOURCE_CHANGED' });
        }

        // Descendants are matched by an exact path prefix via substr (never
        // LIKE, so folder names containing LIKE wildcards stay literal).
        // SQLite substr counts characters, not UTF-16 code units, hence the
        // spread length rather than String.length.
        const prefixLength = [...oldRelativePath].length + 1;
        const oldPrefix = `${oldRelativePath}/`;
        const descendantFolders = openLibrary.connection
          .prepare(
            `SELECT folder_id, relative_path FROM managed_folders
              WHERE substr(relative_path, 1, ?) = ?`,
          )
          .all(prefixLength, oldPrefix) as Array<{
            folder_id: string;
            relative_path: string;
          }>;
        const updateDescendant = openLibrary.connection.prepare(
          `UPDATE managed_folders
              SET relative_path = ?, path_identity = ?
            WHERE folder_id = ?`,
        );
        for (const descendant of descendantFolders) {
          const rewritten = newRelativePath + descendant.relative_path.slice(oldRelativePath.length);
          updateDescendant.run(rewritten, portablePathIdentity(rewritten), descendant.folder_id);
        }

        // Every managed asset recorded under the subtree follows the real
        // directory, regardless of availability or trash state; only live
        // assets need their search content re-tokenized.
        const subtreeAssets = openLibrary.connection
          .prepare(
            `SELECT asset_id, relative_file_path, deleted_at FROM assets
              WHERE location_kind = 'managed'
                AND substr(relative_file_path, 1, ?) = ?`,
          )
          .all(prefixLength, oldPrefix) as Array<{
            asset_id: string;
            relative_file_path: string;
            deleted_at: string | null;
          }>;
        const updateAsset = openLibrary.connection.prepare(
          `UPDATE assets
              SET relative_file_path = ?, path_identity = ?, updated_at = ?
            WHERE asset_id = ?`,
        );
        for (const asset of subtreeAssets) {
          const rewritten = newRelativePath + asset.relative_file_path.slice(oldRelativePath.length);
          updateAsset.run(rewritten, portablePathIdentity(rewritten), now, asset.asset_id);
          if (asset.deleted_at === null) {
            this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
          }
        }
      })();
    } catch (error) {
      if (renamed) {
        try {
          renameSync(destinationPath, sourcePath);
        } catch (rollbackError) {
          // The DB transaction did not commit; if the filesystem rollback also
          // failed the next refresh reconciles the moved directory back into
          // the library. Never mask the primary failure.
          this.diagnose('folder.rename.rollback', rollbackError, {
            libraryId: input.libraryId,
            folderId: row.folder_id,
          });
        }
      }
      if (isMissingPathError(error)) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND', cause: error });
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    this.emitClientAssetsChanged(input.libraryId, 1);
    return this.summarizeManagedFolderRowRecursive(openLibrary, {
      ...row,
      name,
      relative_path: newRelativePath,
    });
  }

  /**
   * Clone a managed folder as a sibling (REQ-MENU-005 / Serpent-vgp).
   * Creates a new folder tree with fresh folder/asset identities; human
   * metadata + tags are cloned via copyAssets. Linked folders are refused.
   */
  override cloneManagedFolder(input: {
    libraryId: string;
    folderId: string;
  }): {
    folder: ManagedFolderSummary;
    clonedFolderCount: number;
    clonedAssetCount: number;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const { folder, descendantFolders, assetIds } =
      this.collectManagedFolderSubtree(openLibrary, input.folderId);

    const cloneName = this.availableSiblingFolderName(
      openLibrary,
      folder.parent_folder_id,
      folder.name,
    );
    const rootClone = this.createManagedFolder({
      libraryId: input.libraryId,
      name: cloneName,
      parentFolderId: folder.parent_folder_id ?? undefined,
    });

    const idMap = new Map<string, string>([[folder.folder_id, rootClone.folderId]]);
    // Create descendants shallow→deep so parents exist before children.
    const descendantsShallowFirst = [...descendantFolders].sort(
      (left, right) => left.relative_path.length - right.relative_path.length,
    );
    for (const descendant of descendantsShallowFirst) {
      const parentCloneId = descendant.parent_folder_id
        ? idMap.get(descendant.parent_folder_id)
        : undefined;
      if (!parentCloneId) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const created = this.createManagedFolder({
        libraryId: input.libraryId,
        name: descendant.name,
        parentFolderId: parentCloneId,
      });
      idMap.set(descendant.folder_id, created.folderId);
    }

    // Direct assets of each source folder → matching clone folder.
    let clonedAssetCount = 0;
    const foldersToCopy = [folder, ...descendantsShallowFirst];
    for (const sourceFolder of foldersToCopy) {
      const targetFolderId = idMap.get(sourceFolder.folder_id);
      if (!targetFolderId) continue;
      const directAssetIds = openLibrary.connection
        .prepare(
          `SELECT asset_id FROM assets
            WHERE location_kind = 'managed'
              AND deleted_at IS NULL
              AND availability = 'available'
              AND managed_folder_id = ?`,
        )
        .all(sourceFolder.folder_id) as Array<{ asset_id: string }>;
      if (directAssetIds.length === 0) continue;
      const copied = this.copyAssets({
        libraryId: input.libraryId,
        assetIds: directAssetIds.map((row) => row.asset_id),
        targetFolderId,
        conflictStrategy: 'keep-both',
      });
      clonedAssetCount += copied.copiedCount;
    }

    // assetIds was collected for the whole subtree; unused beyond validation.
    void assetIds;

    return {
      folder: this.summarizeManagedFolderRowRecursive(openLibrary, {
        folder_id: rootClone.folderId,
        parent_folder_id: rootClone.parentFolderId,
        name: rootClone.name,
        relative_path: rootClone.relativePath,
        path_identity: portablePathIdentity(rootClone.relativePath),
      }),
      clonedFolderCount: idMap.size,
      clonedAssetCount,
    };
  }

  /**
   * Move managed folders under a new parent (REQ-MENU-005 / Serpent-vgp).
   * Rejects moves into self/descendant. Nested selections are collapsed to
   * outermost folders so a parent move does not double-move a child.
   */
  override moveManagedFolders(input: {
    libraryId: string;
    folderIds: string[];
    targetParentFolderId: string | null;
    conflictStrategy?: 'keep-both' | 'skip';
  }): {
    movedCount: number;
    skippedCount: number;
    folders: ManagedFolderSummary[];
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    if (
      input.folderIds.length === 0 ||
      new Set(input.folderIds).size !== input.folderIds.length
    ) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const strategy = input.conflictStrategy ?? 'keep-both';
    const targetParent =
      input.targetParentFolderId === null
        ? null
        : (openLibrary.connection
            .prepare(
              'SELECT folder_id, relative_path FROM managed_folders WHERE folder_id = ?',
            )
            .get(input.targetParentFolderId) as
            | { folder_id: string; relative_path: string }
            | undefined);
    if (input.targetParentFolderId !== null && !targetParent) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    const rows = sqliteAllInChunks<string, ManagedFolderRow>({
      connection: openLibrary.connection,
      values: input.folderIds,
      buildSql: (placeholders) =>
        `SELECT folder_id, parent_folder_id, name, relative_path, path_identity, created_at
           FROM managed_folders
          WHERE folder_id IN (${placeholders})`,
    });
    if (rows.length !== input.folderIds.length) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    // Drop folders that are descendants of another selected folder.
    const selected = rows.filter(
      (row) =>
        !rows.some(
          (other) =>
            other.folder_id !== row.folder_id &&
            (row.relative_path === other.relative_path ||
              row.relative_path.startsWith(`${other.relative_path}/`)),
        ),
    );

    let movedCount = 0;
    let skippedCount = 0;
    const moved: ManagedFolderSummary[] = [];

    for (const row of selected) {
      // Moving onto the current parent is a no-op skip.
      const currentParent = row.parent_folder_id;
      if (
        (currentParent === null && input.targetParentFolderId === null) ||
        currentParent === input.targetParentFolderId
      ) {
        skippedCount += 1;
        continue;
      }

      // Refuse move into self or descendant.
      if (input.targetParentFolderId !== null) {
        const targetRelative = targetParent!.relative_path;
        if (
          targetRelative === row.relative_path ||
          targetRelative.startsWith(`${row.relative_path}/`)
        ) {
          throw new LibraryServiceError('FOLDER_NAME_CONFLICT');
        }
      }

      const destParentRelative = targetParent?.relative_path ?? '';
      let destName = row.name;
      let destRelative = destParentRelative
        ? path.posix.join(destParentRelative, destName)
        : destName;
      let destIdentity = portablePathIdentity(destRelative);

      const conflict =
        openLibrary.connection
          .prepare(
            'SELECT folder_id FROM managed_folders WHERE path_identity = ? AND folder_id != ?',
          )
          .get(destIdentity, row.folder_id) ??
        openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE path_identity = ? AND location_kind = 'managed' AND deleted_at IS NULL`,
          )
          .get(destIdentity);

      if (conflict) {
        if (strategy === 'skip') {
          skippedCount += 1;
          continue;
        }
        destName = this.availableSiblingFolderName(
          openLibrary,
          input.targetParentFolderId,
          row.name,
        );
        destRelative = destParentRelative
          ? path.posix.join(destParentRelative, destName)
          : destName;
        destIdentity = portablePathIdentity(destRelative);
      }

      const sourcePath = this.folderPath(openLibrary, row.relative_path);
      if (!realDirectoryExists(sourcePath)) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND', {
          reason: 'SOURCE_NOT_FOUND',
        });
      }
      if (this.portableDiskDestination(openLibrary, destRelative)) {
        if (strategy === 'skip') {
          skippedCount += 1;
          continue;
        }
        destName = this.availableSiblingFolderName(
          openLibrary,
          input.targetParentFolderId,
          row.name,
        );
        destRelative = destParentRelative
          ? path.posix.join(destParentRelative, destName)
          : destName;
        destIdentity = portablePathIdentity(destRelative);
      }
      const finalDestination = this.folderPath(openLibrary, destRelative);

      const oldRelativePath = row.relative_path;
      const now = new Date().toISOString();
      let renamed = false;
      try {
        renameSync(sourcePath, finalDestination);
        renamed = true;
        openLibrary.connection.transaction(() => {
          const changed = openLibrary.connection
            .prepare(
              `UPDATE managed_folders
                  SET parent_folder_id = ?, name = ?, relative_path = ?, path_identity = ?
                WHERE folder_id = ?`,
            )
            .run(
              input.targetParentFolderId,
              destName,
              destRelative,
              destIdentity,
              row.folder_id,
            );
          if (changed.changes !== 1) {
            throw new LibraryServiceError('FOLDER_NOT_FOUND', {
              reason: 'SOURCE_CHANGED',
            });
          }

          const prefixLength = [...oldRelativePath].length + 1;
          const oldPrefix = `${oldRelativePath}/`;
          const descendantFolders = openLibrary.connection
            .prepare(
              `SELECT folder_id, relative_path FROM managed_folders
                WHERE substr(relative_path, 1, ?) = ?`,
            )
            .all(prefixLength, oldPrefix) as Array<{
              folder_id: string;
              relative_path: string;
            }>;
          const updateDescendant = openLibrary.connection.prepare(
            `UPDATE managed_folders
                SET relative_path = ?, path_identity = ?
              WHERE folder_id = ?`,
          );
          for (const descendant of descendantFolders) {
            const rewritten =
              destRelative +
              descendant.relative_path.slice(oldRelativePath.length);
            updateDescendant.run(
              rewritten,
              portablePathIdentity(rewritten),
              descendant.folder_id,
            );
          }

          const subtreeAssets = openLibrary.connection
            .prepare(
              `SELECT asset_id, relative_file_path, deleted_at FROM assets
                WHERE location_kind = 'managed'
                  AND substr(relative_file_path, 1, ?) = ?`,
            )
            .all(prefixLength, oldPrefix) as Array<{
              asset_id: string;
              relative_file_path: string;
              deleted_at: string | null;
            }>;
          // Also rewrite assets whose managed_folder_id is the moved root and
          // whose relative path equals the old folder path prefix for files
          // stored directly in the folder (path = folder/file).
          const updateAsset = openLibrary.connection.prepare(
            `UPDATE assets
                SET relative_file_path = ?, path_identity = ?, updated_at = ?
              WHERE asset_id = ?`,
          );
          for (const asset of subtreeAssets) {
            const rewritten =
              destRelative +
              asset.relative_file_path.slice(oldRelativePath.length);
            updateAsset.run(
              rewritten,
              portablePathIdentity(rewritten),
              now,
              asset.asset_id,
            );
            if (asset.deleted_at === null) {
              this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
            }
          }

          // Direct children whose path is exactly under the old folder but
          // matched via managed_folder_id when relative path uses the folder.
          // The substr prefix match already covers `oldRelativePath/` assets;
          // also cover the rare case of the folder path itself never holding
          // an asset file named equal to the folder.
        })();
      } catch (error) {
        if (renamed) {
          try {
            renameSync(finalDestination, sourcePath);
          } catch (rollbackError) {
            this.diagnose('folder.move.rollback', rollbackError, {
              libraryId: input.libraryId,
              folderId: row.folder_id,
            });
          }
        }
        if (isMissingPathError(error)) {
          throw new LibraryServiceError('FOLDER_NOT_FOUND', {
            reason: 'SOURCE_NOT_FOUND',
            cause: error,
          });
        }
        throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
      }

      movedCount += 1;
      moved.push(
        this.summarizeManagedFolderRowRecursive(openLibrary, {
          ...row,
          parent_folder_id: input.targetParentFolderId,
          name: destName,
          relative_path: destRelative,
          path_identity: destIdentity,
        }),
      );
    }

    this.emitClientAssetsChanged(input.libraryId, movedCount);
    return { movedCount, skippedCount, folders: moved };
  }

  /** Sibling folder name that does not collide on disk or in the DB. */
  public override availableSiblingFolderName(
    openLibrary: OpenLibrary,
    parentFolderId: string | null,
    baseName: string,
  ): string {
    const parentRelative =
      parentFolderId === null
        ? ''
        : (
            openLibrary.connection
              .prepare(
                'SELECT relative_path FROM managed_folders WHERE folder_id = ?',
              )
              .get(parentFolderId) as { relative_path: string } | undefined
          )?.relative_path;
    if (parentFolderId !== null && parentRelative === undefined) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    const candidates = [`${baseName} copy`];
    for (let index = 2; index < 10_000; index += 1) {
      candidates.push(`${baseName} copy ${index}`);
    }
    for (const candidate of candidates) {
      let name: string;
      try {
        name = normalizeFolderName(candidate);
      } catch {
        continue;
      }
      const relativePath = parentRelative
        ? path.posix.join(parentRelative, name)
        : name;
      const identity = portablePathIdentity(relativePath);
      const databaseConflict =
        openLibrary.connection
          .prepare(
            'SELECT folder_id FROM managed_folders WHERE path_identity = ?',
          )
          .get(identity) ??
        openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE path_identity = ? AND location_kind = 'managed' AND deleted_at IS NULL`,
          )
          .get(identity);
      if (databaseConflict) continue;
      if (this.portableDiskDestination(openLibrary, relativePath)) continue;
      return name;
    }
    throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
  }

  /**
   * Clarification #7 / Serpent-ekj: trash a managed folder (empty or not).
   * All active managed assets in the subtree move to the app trash; folder
   * rows and the real Assets/ directory tree are then removed. Restoring
   * assets falls back to the library root when the original folder is gone.
   */
  override trashManagedFolder(input: {
    libraryId: string;
    folderId: string;
    /** Batch trash reserves these ids before execution so an open history
     * group has complete inverse recipes even if the Worker is interrupted. */
    operationId?: string;
    tombstoneIds?: readonly string[];
  }): {
    trashedAssetCount: number;
    removedFolderCount: number;
    tombstoneIds: string[];
    rootTombstoneId: string;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const existingTombstones = openLibrary.connection.prepare(
      `SELECT tombstone_id, relative_path FROM trashed_managed_folders
        WHERE folder_id = ? ORDER BY length(relative_path) ASC`,
    ).all(input.folderId) as Array<{ tombstone_id: string; relative_path: string }>;
    if (existingTombstones.length > 0) {
      const root = existingTombstones[0]!;
      return {
        trashedAssetCount: 0,
        removedFolderCount: existingTombstones.length,
        tombstoneIds: existingTombstones.map((row) => row.tombstone_id),
        rootTombstoneId: root.tombstone_id,
      };
    }

    const { folder, descendantFolders, assetIds } = this.collectManagedFolderSubtree(openLibrary, input.folderId);
    const folderOperationId = randomUUID();
    const operationsRoot = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);
    const operationPath = path.join(operationsRoot, folderOperationId);
    const stagedTreePath = path.join(operationPath, 'folder-tree');
    const trashedAt = new Date().toISOString();
    const tombstoneFolders = [...descendantFolders, folder];
    const tombstoneIds = tombstoneFolders.map((row, index) => input.tombstoneIds?.[index] ?? randomUUID());
    if (tombstoneIds.length !== tombstoneFolders.length || tombstoneIds.some((id) => !UUID.test(id))) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const rootTombstoneId = tombstoneIds.at(-1);
    if (!rootTombstoneId) throw new LibraryServiceError('LIBRARY_CORRUPT');
    const assetOperationId = assetIds.length > 0 ? (input.operationId ?? randomUUID()) : null;
    const manifest: ManagedFolderTrashOperationManifest = {
      assetIds: [...assetIds],
      assetOperationId,
      folder: {
        folderId: folder.folder_id,
        name: folder.name,
        parentFolderId: folder.parent_folder_id,
        pathIdentity: portablePathIdentity(folder.relative_path),
        relativePath: folder.relative_path,
      },
      descendants: descendantFolders.map((row) => ({
        folderId: row.folder_id,
        name: row.name,
        parentFolderId: row.parent_folder_id,
        pathIdentity: portablePathIdentity(row.relative_path),
        relativePath: row.relative_path,
      })),
      kind: 'folder-trash',
      phase: 'prepared',
      tombstones: tombstoneFolders.map((row, index) => {
        const parentRelativePath = path.posix.dirname(row.relative_path);
        return {
          folderId: row.folder_id,
          name: row.name,
          parentRelativePath: parentRelativePath === '.' ? null : parentRelativePath,
          relativePath: row.relative_path,
          tombstoneId: tombstoneIds[index]!,
          trashedAssetCount: 0,
        };
      }),
      trashedAt,
      version: 7,
    };

    let tombstonesWritten = false;
    let folderTreeStaged = false;
    let folderRowsRemoved = false;
    try {
      mkdirSync(operationPath, { recursive: true });
      openLibrary.connection.prepare(
        `INSERT INTO file_operations
           (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
         VALUES (?, 'folder-trash', 'preparing', ?, NULL, ?, ?)`,
      ).run(folderOperationId, JSON.stringify(manifest), trashedAt, trashedAt);
      this.failAt('crash-folder-trash-before-assets');

      let trashedAssetCount = 0;
      if (assetIds.length > 0) {
        const result = this.trashAssets({
          libraryId: input.libraryId,
          assetIds,
          allowExplicitlyIgnored: true,
          operationId: assetOperationId!,
        });
        trashedAssetCount = result.trashedCount;
      }
      for (const tombstone of manifest.tombstones) {
        const count = openLibrary.connection.prepare(
          `SELECT COUNT(*) AS count FROM assets
            WHERE deleted_at IS NOT NULL AND trashed_from_folder_id = ?`,
        ).get(tombstone.folderId) as { count: number };
        tombstone.trashedAssetCount = count.count;
      }
      manifest.phase = 'assets-trashed';
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'applying', manifest_json = ?, updated_at = ? WHERE operation_id = ?",
      ).run(JSON.stringify(manifest), new Date().toISOString(), folderOperationId);
      this.failAt('crash-folder-trash-after-assets');

      openLibrary.connection.transaction(() => {
        const insert = openLibrary.connection.prepare(
          `INSERT INTO trashed_managed_folders
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
            trashedAt,
            tombstone.trashedAssetCount,
          );
          // Bind before deleting managed_folders rows (FK would null folder_id).
          openLibrary.connection
            .prepare(
              `UPDATE assets
                  SET trashed_from_tombstone_id = ?
                WHERE deleted_at IS NOT NULL
                  AND trashed_from_folder_id = ?`,
            )
            .run(tombstone.tombstoneId, tombstone.folderId);
        }
      })();
      tombstonesWritten = true;
      manifest.phase = 'tombstones-written';
      openLibrary.connection.prepare(
        'UPDATE file_operations SET manifest_json = ?, updated_at = ? WHERE operation_id = ?',
      ).run(JSON.stringify(manifest), new Date().toISOString(), folderOperationId);
      this.failAt('crash-folder-trash-after-tombstones');

      const directoryPath = this.folderPath(openLibrary, folder.relative_path);
      if (existsSync(directoryPath)) {
        mkdirSync(path.dirname(stagedTreePath), { recursive: true });
        // Windows: the folder rename fails with EPERM/EBUSY while the folder
        // (or a child) is held open — Explorer, Defender scan, a player.
        // Retry transient locks briefly; a persistent lock falls through to
        // the typed error below, surfaced to the user as FILE_BUSY.
        renamePathWithRetry(directoryPath, stagedTreePath);
      }
      folderTreeStaged = true;
      manifest.phase = 'filesystem-staged';
      openLibrary.connection.prepare(
        'UPDATE file_operations SET manifest_json = ?, updated_at = ? WHERE operation_id = ?',
      ).run(JSON.stringify(manifest), new Date().toISOString(), folderOperationId);
      this.failAt('crash-folder-trash-after-filesystem');

      openLibrary.connection.transaction(() => {
        const remove = openLibrary.connection.prepare('DELETE FROM managed_folders WHERE folder_id = ?');
        for (const row of [...descendantFolders, folder]) {
          if (remove.run(row.folder_id).changes !== 1) {
            throw new LibraryServiceError('FOLDER_NOT_FOUND', { reason: 'SOURCE_CHANGED' });
          }
        }
      })();
      folderRowsRemoved = true;
      manifest.phase = 'db-committed';
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'committed', manifest_json = ?, updated_at = ? WHERE operation_id = ?",
      ).run(JSON.stringify(manifest), new Date().toISOString(), folderOperationId);
      try {
        this.removeOperation(operationPath);
      } catch (cleanupError) {
        // The tombstones, asset trash and folder staging all committed — a
        // lingering handle on a staged file (Defender scan, Explorer) must
        // not turn a successful trash into a reported failure. A committed
        // operation directory is safe to retain; reopen recovery sweeps it.
        this.diagnose('folder.trash.committed-cleanup', cleanupError, {
          libraryId: input.libraryId,
          folderId: input.folderId,
          operationId: folderOperationId,
        });
      }
      const removedFolderCount = tombstoneFolders.length;
      return { trashedAssetCount, removedFolderCount, tombstoneIds, rootTombstoneId };
    } catch (error) {
      if (error instanceof SimulatedCrashError) {
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
      }
      if (folderRowsRemoved) {
        // SQLite has already committed the row removal. Do not attempt to
        // recreate asset paths from a missing managed folder; retain the
        // journal so the next open can finish the committed side safely.
        openLibrary.connection.prepare(
          "UPDATE file_operations SET status = 'failed', error_code = 'FOLDER_TRASH_RECOVERY_REQUIRED', updated_at = ? WHERE operation_id = ?",
        ).run(new Date().toISOString(), folderOperationId);
        throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
      }
      let compensationFailed = false;
      try {
        if (folderTreeStaged && !folderRowsRemoved && existsSync(stagedTreePath)) {
          const originalPath = this.folderPath(openLibrary, folder.relative_path);
          if (!existsSync(originalPath)) renameSync(stagedTreePath, originalPath);
        }
        if (tombstonesWritten) {
          openLibrary.connection.transaction(() => {
            sqliteRunInChunks({
              connection: openLibrary.connection,
              values: tombstoneIds,
              buildSql: (placeholders) =>
                `DELETE FROM trashed_managed_folders WHERE tombstone_id IN (${placeholders})`,
            });
          })();
        }
        if (assetOperationId) {
          const operation = openLibrary.connection.prepare(
            'SELECT status, error_code FROM file_operations WHERE operation_id = ?',
          ).get(assetOperationId) as { status: string; error_code: string | null } | undefined;
          if (operation?.status === 'committed' && operation.error_code === null) {
            this.undoTrashAssets({
              libraryId: input.libraryId,
              operationId: assetOperationId,
              requireAll: true,
            });
          }
        }
        openLibrary.connection.prepare(
          "UPDATE file_operations SET status = 'rolled_back', error_code = 'FOLDER_TRASH_APPLY_FAILED', updated_at = ? WHERE operation_id = ?",
        ).run(new Date().toISOString(), folderOperationId);
        this.removeOperation(operationPath);
      } catch (rollbackError) {
        compensationFailed = true;
        this.diagnose('folder.trash.rollback', rollbackError, {
          libraryId: input.libraryId,
          folderId: input.folderId,
          operationId: folderOperationId,
        });
      }
      if (compensationFailed) {
        openLibrary.connection.prepare(
          "UPDATE file_operations SET status = 'failed', error_code = 'FOLDER_TRASH_RECOVERY_REQUIRED', updated_at = ? WHERE operation_id = ?",
        ).run(new Date().toISOString(), folderOperationId);
      }
      /*
       * The journal is the source of truth if compensation itself fails. The
       * caller still receives the original typed error; reopen will retry the
       * folder operation rather than exposing a stale history entry.
       */
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  /**
   * UI/Worker entry point. Folder trash is synchronous for the in-process
   * service tests and history recipe executor, but the real Worker awaits
   * media cancellation so Windows decoder handles are released before rename.
   */
  override async trashManagedFolderAsync(input: Parameters<LibraryServiceAllMethods['trashManagedFolder']>[0]): Promise<ReturnType<LibraryServiceAllMethods['trashManagedFolder']>> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const subtree = this.collectManagedFolderSubtree(openLibrary, input.folderId);
    await this.cancelMediaJobsForAssets(openLibrary, subtree.assetIds);
    return this.trashManagedFolder(input);
  }

  override async trashSelectionAsync(input: Parameters<LibraryServiceAllMethods['trashSelection']>[0]): Promise<ReturnType<LibraryServiceAllMethods['trashSelection']>> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const assetIds = new Set(input.assetIds);
    for (const folderId of input.folderIds) {
      for (const assetId of this.collectManagedFolderSubtree(openLibrary, folderId).assetIds) assetIds.add(assetId);
    }
    await this.cancelMediaJobsForAssets(openLibrary, [...assetIds]);
    return this.trashSelection(input);
  }

  /**
   * Clarification #7 / Serpent-ekj: permanently delete a managed folder and
   * every active managed asset in its subtree from disk. Irreversible.
   */
  override deleteManagedFolderFromDisk(input: {
    libraryId: string;
    folderId: string;
  }): { deletedAssetCount: number; removedFolderCount: number } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const { folder, descendantFolders, assetIds } =
      this.collectManagedFolderSubtree(openLibrary, input.folderId);

    let deletedAssetCount = 0;
    if (assetIds.length > 0) {
      deletedAssetCount = this.deleteActiveManagedAssetsFromDisk(
        openLibrary,
        assetIds,
      );
    }

    const removedFolderCount = this.removeManagedFolderRowsAndDirectory(
      openLibrary,
      folder,
      descendantFolders,
    );
    return { deletedAssetCount, removedFolderCount };
  }

  /**
   * Hard-delete entry point used by the Worker request handler.  Media
   * generators can still have a decoder process reading a managed source
   * while the UI asks for deletion.  Cancel those jobs and wait for their
   * finally blocks before touching the source paths; otherwise Windows can
   * report the transient handle as a misleading permission failure.
   */
  override async deleteManagedFolderFromDiskAsync(input: {
    libraryId: string;
    folderId: string;
  }): Promise<{ deletedAssetCount: number; removedFolderCount: number }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const { folder, descendantFolders, assetIds } =
      this.collectManagedFolderSubtree(openLibrary, input.folderId);
    await this.cancelMediaJobsForAssets(openLibrary, assetIds);
    const deletedAssetCount =
      assetIds.length === 0
        ? 0
        : await this.deleteActiveManagedAssetsFromDiskWithProgress(
            input.libraryId,
            openLibrary,
            assetIds,
          );
    const removedFolderCount = await this.removeManagedFolderRowsAndDirectoryAsync(
      openLibrary,
      folder,
      descendantFolders,
    );
    return { deletedAssetCount, removedFolderCount };
  }

  /**
   * Delete only genuinely empty managed folders.  This intentionally does not
   * recurse and does not enter the application trash: automation callers use
   * it for cleanup after an import, so an asset row, child folder, or even an
   * unmanaged file left on disk makes the whole request fail safely.
   */
  override deleteEmptyManagedFolders(input: {
    libraryId: string;
    folderIds: string[];
  }): { deletedFolderIds: string[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const folderIds = [...new Set(input.folderIds)];
    if (folderIds.length === 0) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const rows = sqliteAllInChunks<string, { folder_id: string; relative_path: string }>({
      connection: openLibrary.connection,
      values: folderIds,
      buildSql: (placeholders) =>
        // Serpent review: managed_folders lives inside the per-library DB —
        // there is no library_id column (the table is already library-scoped).
        `SELECT folder_id, relative_path
           FROM managed_folders
          WHERE folder_id IN (${placeholders})`,
    });
    if (rows.length !== folderIds.length) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const childCount = openLibrary.connection.prepare(
      'SELECT COUNT(*) AS count FROM managed_folders WHERE parent_folder_id = ?',
    );
    const assetCount = openLibrary.connection.prepare(
      `SELECT COUNT(*) AS count FROM assets
         WHERE managed_folder_id = ? AND location_kind = 'managed'`,
    );

    // Phase 1: validate EVERY target (children / assets / directory present
    // and empty) before touching anything — a batch with one non-empty folder
    // is rejected wholesale, nothing is deleted.
    const targetPaths: Array<{ folderId: string; directoryPath: string }> = [];
    for (const row of rows) {
      const children = childCount.get(row.folder_id) as { count: number };
      const assets = assetCount.get(row.folder_id) as { count: number };
      const directoryPath = this.folderPath(openLibrary, row.relative_path);
      if (children.count !== 0 || assets.count !== 0 || !realDirectoryExists(directoryPath)) {
        throw new LibraryServiceError(
          !realDirectoryExists(directoryPath) ? 'FOLDER_NOT_FOUND' : 'FOLDER_NOT_EMPTY',
        );
      }
      targetPaths.push({ folderId: row.folder_id, directoryPath });
    }

    // Phase 2: delete. rmdir (not recursive rm) is the final guard against
    // files created by an external process after validation; each rmdir is
    // paired with its DB row delete so a mid-batch failure leaves removed
    // folders consistent on disk and in the DB (refresh reconciles the rest).
    const removed: Array<{ folderId: string; directoryPath: string }> = [];
    for (const target of targetPaths) {
      try {
        rmdirSync(target.directoryPath);
        removed.push(target);
      } catch (error) {
        for (const done of removed) {
          try {
            mkdirSync(done.directoryPath);
          } catch {
            // Disk restore is best-effort; the DB row is kept below.
          }
        }
        if (isMissingPathError(error)) throw new LibraryServiceError('FOLDER_NOT_FOUND', { cause: error });
        const code = typeof error === 'object' && error !== null && 'code' in error
          ? (error as { code?: unknown }).code
          : undefined;
        if (code === 'ENOTEMPTY' || code === 'EEXIST') {
          throw new LibraryServiceError('FOLDER_NOT_EMPTY', { cause: error });
        }
        throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
      }
    }

    try {
      openLibrary.connection.transaction(() => {
        const remove = openLibrary.connection.prepare(
          'DELETE FROM managed_folders WHERE folder_id = ?',
        );
        for (const folderId of folderIds) {
          if (remove.run(folderId).changes !== 1) {
            throw new LibraryServiceError('FOLDER_NOT_FOUND');
          }
        }
      })();
    } catch (error) {
      // A database failure after rmdir leaves only empty directories absent;
      // refresh can reconcile the index. Preserve the primary typed error.
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
    return { deletedFolderIds: folderIds };
  }

  /**
   * Clarification #7（2026-09-15 修订）：移除链接文件夹 = 只删除链接记录，源文件从不改动。
   * 链接子树删完后需要清掉链接记录时，由调用方传 `progress: 'silent'`，避免在同一个操作里
   * 再发一条空进度流（否则界面会看到一条 0/0 的终态进度）。
   */
  override async removeLinkedFolder(
    input: {
      libraryId: string;
      folderId: string;
    },
    options: { progress?: 'emit' | 'silent' } = {},
  ): Promise<{ removedAssetCount: number }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const linked = openLibrary.connection
      .prepare(
        'SELECT folder_id FROM linked_folders WHERE folder_id = ? AND library_id = ?',
      )
      .get(input.folderId, input.libraryId) as { folder_id: string } | undefined;
    if (!linked) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const assetRows = openLibrary.connection
      .prepare(
        `SELECT asset_id FROM assets
          WHERE linked_folder_id = ? AND location_kind = 'linked' AND deleted_at IS NULL`,
      )
      .all(input.folderId) as Array<{ asset_id: string }>;

    // 2026-09-15：索引行的删除分批进行，批间让出事件循环。旧实现在单个事务里逐行
    // DELETE——1.5 万条记录会长时间独占 mutation 车道，且界面没有任何进度反馈。
    const operationId = randomUUID();
    const totalFiles = assetRows.length;
    const removeThrottle = createProgressThrottle();
    const silent = options.progress === 'silent';
    let processed = 0;
    const emitRun = (force = false): void => {
      if (silent) return;
      if (!removeThrottle.shouldEmit(force || processed === totalFiles)) return;
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'linked-remove',
        phase: 'run',
        filesProcessed: processed,
        totalFiles,
      });
    };
    if (!silent) {
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'linked-remove',
        phase: 'run',
        filesProcessed: 0,
        totalFiles,
      });
    }

    const REMOVE_CHUNK_SIZE = 500;
    const removeAsset = openLibrary.connection.prepare(
      'DELETE FROM assets WHERE asset_id = ?',
    );
    for (let offset = 0; offset < assetRows.length; offset += REMOVE_CHUNK_SIZE) {
      const chunk = assetRows.slice(offset, offset + REMOVE_CHUNK_SIZE);
      openLibrary.connection.transaction(() => {
        for (const row of chunk) removeAsset.run(row.asset_id);
      })();
      processed += chunk.length;
      emitRun();
      await new Promise<void>((resolve) => setImmediate(resolve));
    }

    openLibrary.connection.transaction(() => {
      openLibrary.connection
        .prepare('DELETE FROM explicit_ignored_paths WHERE linked_folder_id = ?')
        .run(input.folderId);
      const removed = openLibrary.connection
        .prepare('DELETE FROM linked_folders WHERE folder_id = ?')
        .run(input.folderId);
      if (removed.changes !== 1) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND');
      }
    })();

    this.stopLinkedWatcher(input.libraryId, input.folderId);
    if (!silent) {
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'linked-remove',
        phase: 'complete',
        filesProcessed: totalFiles,
        totalFiles,
      });
    }
    return { removedAssetCount: assetRows.length };
  }

  /**
   * Delete a linked folder path (2026-09-15 user decision: links never enter the
   * OS recycle bin, and the library trash never owns linked bytes).
   * - `deleteFromDisk: true`: permanently delete the source files of the whole
   *   subtree (one unified progress stream), remove source leftovers that were
   *   never indexed, then drop the index rows.
   * - `deleteFromDisk: false`: remove only the link records; the external source
   *   files are left untouched (same semantics as 「移除链接文件夹」).
   * - `relativePath === ''` targets the linked folder root, which also removes
   *   the `linked_folders` row; a child path keeps the root link in place.
   */
  override async deleteLinkedFolderSubtree(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath: string;
    deleteFromDisk: boolean;
  }): Promise<{ deletedAssetCount: number; failedCount: number }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const isLinkedRoot = input.relativePath === '';
    let relativePath: string;
    if (isLinkedRoot) {
      relativePath = '';
    } else {
      try {
        relativePath = normalizeRelativeAssetPath(input.relativePath);
      } catch (error) {
        throw new LibraryServiceError('INVALID_FOLDER_NAME', { cause: error });
      }
    }

    const linked = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders WHERE folder_id = ? AND library_id = ?`,
      )
      .get(input.linkedFolderId, input.libraryId) as
      | {
          folder_id: string;
          absolute_root_path: string;
          status: 'available' | 'offline';
        }
      | undefined;
    if (!linked) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const prefix = isLinkedRoot ? '' : `${relativePath}/`;
    const assetQuery = isLinkedRoot
      ? openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE linked_folder_id = ?
                AND location_kind = 'linked'
                AND deleted_at IS NULL`,
          )
          .all(input.linkedFolderId)
      : openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE linked_folder_id = ?
                AND location_kind = 'linked'
                AND deleted_at IS NULL
                AND (relative_file_path = ? OR substr(relative_file_path, 1, ?) = ?)`,
          )
          .all(
            input.linkedFolderId,
            relativePath,
            [...prefix].length,
            prefix,
          );
    const assetRows = assetQuery as Array<{ asset_id: string }>;

    const dirPath = isLinkedRoot
      ? linked.absolute_root_path
      : path.join(linked.absolute_root_path, ...relativePath.split('/'));

    if (input.deleteFromDisk) {
      // 2026-09-15 用户决定：链接文件夹的删除动作是「强制从硬盘删除」——永久删除源
      // 文件（不再送系统回收站），并带进度。整棵子树一次交给同一个例程，避免旧实现
      // 「每 20 个一批」造成 750 次独立操作与 750 段碎片进度。
      const ids = assetRows.map((row) => row.asset_id);
      const result = ids.length > 0
        ? await this.deleteLinkedAssetsInBatches({
            libraryId: input.libraryId,
            assetIds: ids,
          })
        : { deletedCount: 0, failedCount: 0 };
      if (linked.status === 'available' && existsSync(dirPath)) {
        try {
          // 未纳入索引的文件（其它类型或已被忽略）同样属于本次删除目标。
          rmSync(dirPath, { force: true, recursive: true });
        } catch (error) {
          throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
        }
      }
      if (isLinkedRoot) {
        // 进度由上面的批量删除统一上报；这里只清链接记录，避免再冒出一条 0/0 的进度。
        await this.removeLinkedFolder(
          {
            libraryId: input.libraryId,
            folderId: input.linkedFolderId,
          },
          { progress: 'silent' },
        );
      }
      return {
        deletedAssetCount: result.deletedCount,
        failedCount: result.failedCount,
      };
    }

    // 只删链接记录：不动源文件（与「移除链接文件夹」同语义）。旧的逐文件系统回收站
    // 分支已按 2026-09-15 用户决定移除——它会为每个文件 spawn 一次系统回收站 helper。
    if (isLinkedRoot) {
      const removed = await this.removeLinkedFolder({
        libraryId: input.libraryId,
        folderId: input.linkedFolderId,
      });
      return { deletedAssetCount: removed.removedAssetCount, failedCount: 0 };
    }
    const childIds = assetRows.map((row) => row.asset_id);
    const removeOperationId = randomUUID();
    const removeTotalFiles = childIds.length;
    const removeThrottle = createProgressThrottle();
    let removeProcessed = 0;
    this.emitDeleteProgress({
      operationId: removeOperationId,
      libraryId: input.libraryId,
      kind: 'linked-remove',
      phase: 'run',
      filesProcessed: 0,
      totalFiles: removeTotalFiles,
    });
    const removeAsset = openLibrary.connection.prepare(
      'DELETE FROM assets WHERE asset_id = ?',
    );
    for (let offset = 0; offset < childIds.length; offset += 500) {
      const chunk = childIds.slice(offset, offset + 500);
      openLibrary.connection.transaction(() => {
        for (const assetId of chunk) removeAsset.run(assetId);
      })();
      removeProcessed += chunk.length;
      if (removeThrottle.shouldEmit(removeProcessed === removeTotalFiles)) {
        this.emitDeleteProgress({
          operationId: removeOperationId,
          libraryId: input.libraryId,
          kind: 'linked-remove',
          phase: 'run',
          filesProcessed: removeProcessed,
          totalFiles: removeTotalFiles,
        });
      }
      await new Promise<void>((resolve) => setImmediate(resolve));
    }
    this.emitDeleteProgress({
      operationId: removeOperationId,
      libraryId: input.libraryId,
      kind: 'linked-remove',
      phase: 'complete',
      filesProcessed: removeTotalFiles,
      totalFiles: removeTotalFiles,
    });
    return { deletedAssetCount: childIds.length, failedCount: 0 };
  }

  /**
   * Resolve a linked root/virtual directory without exposing its filesystem
   * path to the renderer.  The relative path is validated at this boundary so
   * every linked-directory mutation is confined to the imported root.
   */
  public override resolveLinkedDirectoryMutationTarget(
    openLibrary: OpenLibrary,
    linkedFolderId: string,
    relativePath: string,
  ): {
    linkedFolderId: string;
    relativePath: string;
    absoluteRootPath: string;
    absolutePath: string;
    status: 'available' | 'offline';
  } {
    let normalizedPath: string;
    try {
      normalizedPath = relativePath === ''
        ? ''
        : normalizeRelativeAssetPath(relativePath);
    } catch (error) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME', { cause: error });
    }
    const linked = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders
          WHERE folder_id = ? AND library_id = ?`,
      )
      .get(linkedFolderId, openLibrary.summary.libraryId) as
      | {
          folder_id: string;
          absolute_root_path: string;
          status: 'available' | 'offline';
        }
      | undefined;
    if (!linked) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    if (linked.status !== 'available' || this.linkedRootIsGone(linked.absolute_root_path)) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }

    // Use the same component-by-component symlink guard as linkedAssetPath.
    // A probe is intentionally not required to exist; missing final probe
    // components stop validation after all real parent components are checked.
    const probe = normalizedPath === ''
      ? '.serpent-folder-probe'
      : `${normalizedPath}/.serpent-folder-probe`;
    this.linkedAssetPath(openLibrary, linked.folder_id, probe);
    const absolutePath = normalizedPath === ''
      ? linked.absolute_root_path
      : path.join(linked.absolute_root_path, ...normalizedPath.split('/'));
    if (!realDirectoryExists(absolutePath)) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    return {
      linkedFolderId: linked.folder_id,
      relativePath: normalizedPath,
      absoluteRootPath: linked.absolute_root_path,
      absolutePath,
      status: linked.status,
    };
  }

  public override linkedDirectoryMutationSummary(
    input: {
      linkedFolderId: string;
      relativePath: string;
      name: string;
      status: 'available' | 'offline';
    },
  ): LinkedFolderDirectoryMutation {
    const parentRelativePath = parentLinkedRelativePath(input.relativePath);
    return {
      folderId: encodeLinkedVirtualFolderId(input.linkedFolderId, input.relativePath),
      linkedFolderId: input.linkedFolderId,
      parentFolderId: parentRelativePath === null || parentRelativePath === ''
        ? input.relativePath === '' ? null : input.linkedFolderId
        : encodeLinkedVirtualFolderId(input.linkedFolderId, parentRelativePath),
      name: input.name,
      relativePath: input.relativePath,
      status: input.status,
    };
  }

  public override assertLinkedDirectorySiblingAvailable(
    parentPath: string,
    name: string,
    sourceName?: string,
  ): string {
    let entries;
    try {
      entries = readdirSync(parentPath, { withFileTypes: true });
    } catch (error) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND', { cause: error });
    }
    const targetIdentity = portablePathSegmentIdentity(name);
    for (const entry of entries) {
      if (sourceName !== undefined && entry.name === sourceName) continue;
      if (portablePathSegmentIdentity(entry.name) === targetIdentity) {
        throw new LibraryServiceError('FOLDER_NAME_CONFLICT');
      }
    }
    return path.join(parentPath, name);
  }

  /** Create an actual directory inside a linked root or virtual child. */
  override createLinkedFolderDirectory(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath: string;
    name: string;
  }): LinkedFolderDirectoryMutation {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    let name: string;
    try {
      name = normalizeFolderName(input.name);
    } catch (error) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME', { cause: error });
    }
    const parent = this.resolveLinkedDirectoryMutationTarget(
      openLibrary,
      input.linkedFolderId,
      input.relativePath,
    );
    const targetPath = this.assertLinkedDirectorySiblingAvailable(parent.absolutePath, name);
    try {
      mkdirSync(targetPath);
    } catch (error) {
      if (isMissingPathError(error)) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND', { cause: error });
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
    const relativePath = parent.relativePath === ''
      ? name
      : path.posix.join(parent.relativePath, name);
    this.noteClientFilesystemMutation();
    return this.linkedDirectoryMutationSummary({
      linkedFolderId: parent.linkedFolderId,
      relativePath,
      name,
      status: parent.status,
    });
  }

  /** Rename a linked root or a physical virtual-child directory in place. */
  override renameLinkedFolderDirectory(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath: string;
    newName: string;
  }): LinkedFolderDirectoryMutation {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    let name: string;
    try {
      name = normalizeFolderName(input.newName);
    } catch (error) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME', { cause: error });
    }
    const target = this.resolveLinkedDirectoryMutationTarget(
      openLibrary,
      input.linkedFolderId,
      input.relativePath,
    );
    const sourceName = path.basename(target.absolutePath);
    const parentPath = path.dirname(target.absolutePath);
    const destinationPath = this.assertLinkedDirectorySiblingAvailable(
      parentPath,
      name,
      sourceName,
    );
    if (destinationPath === target.absolutePath) {
      return this.linkedDirectoryMutationSummary({
        linkedFolderId: target.linkedFolderId,
        relativePath: target.relativePath,
        name,
        status: target.status,
      });
    }

    let renamed = false;
    try {
      renamePathWithRetry(target.absolutePath, destinationPath);
      renamed = true;
      const now = new Date().toISOString();
      if (target.relativePath === '') {
        let canonicalDestination: string;
        try {
          canonicalDestination = realpathSync(destinationPath);
        } catch (error) {
          throw new LibraryServiceError('FOLDER_NOT_FOUND', { cause: error });
        }
        openLibrary.connection.transaction(() => {
          const changed = openLibrary.connection
            .prepare(
              `UPDATE linked_folders
                  SET display_name = ?, absolute_root_path = ?, path_identity = ?, updated_at = ?
                WHERE folder_id = ? AND library_id = ?`,
            )
            .run(name, canonicalDestination, canonicalDestination, now, target.linkedFolderId, input.libraryId);
          if (changed.changes !== 1) throw new LibraryServiceError('FOLDER_NOT_FOUND');
        })();
        this.stopLinkedWatcher(input.libraryId, target.linkedFolderId);
        this.reconcileLinkedWatchers(openLibrary);
        this.noteClientFilesystemMutation();
        return this.linkedDirectoryMutationSummary({
          linkedFolderId: target.linkedFolderId,
          relativePath: '',
          name,
          status: target.status,
        });
      }

      const oldPrefix = `${target.relativePath}/`;
      const newParent = parentLinkedRelativePath(target.relativePath) ?? '';
      const newRelativePath = newParent === ''
        ? name
        : path.posix.join(newParent, name);
      const prefixLength = [...oldPrefix].length;
      const linkedAssets = openLibrary.connection
        .prepare(
          `SELECT asset_id, relative_file_path
             FROM assets
            WHERE linked_folder_id = ? AND location_kind = 'linked'
              AND (relative_file_path = ? OR substr(relative_file_path, 1, ?) = ?)`,
        )
        .all(target.linkedFolderId, target.relativePath, prefixLength, oldPrefix) as Array<{
          asset_id: string;
          relative_file_path: string;
        }>;
      const ignoredPaths = hasTable(openLibrary.connection, 'explicit_ignored_paths')
        ? openLibrary.connection
          .prepare(
            `SELECT location_kind, linked_folder_id, relative_path, path_kind, ignored_at
               FROM explicit_ignored_paths
              WHERE location_kind = 'linked' AND linked_folder_id = ?
                AND path_kind IN ('asset', 'folder')
                AND (relative_path = ? OR substr(relative_path, 1, ?) = ?)`,
          )
          .all(target.linkedFolderId, target.relativePath, prefixLength, oldPrefix) as Array<{
            location_kind: 'linked';
            linked_folder_id: string;
            relative_path: string;
            path_kind: 'asset' | 'folder';
            ignored_at: string;
          }>
        : [];
      openLibrary.connection.transaction(() => {
        const updateAsset = openLibrary.connection.prepare(
          `UPDATE assets
              SET relative_file_path = ?, path_identity = ?, updated_at = ?
            WHERE asset_id = ?`,
        );
        for (const asset of linkedAssets) {
          const rewritten = asset.relative_file_path === target.relativePath
            ? newRelativePath
            : newRelativePath + asset.relative_file_path.slice(target.relativePath.length);
          updateAsset.run(rewritten, portablePathIdentity(rewritten), now, asset.asset_id);
          this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
        }
        if (ignoredPaths.length > 0) {
          const remove = openLibrary.connection.prepare(
            `DELETE FROM explicit_ignored_paths
              WHERE location_kind = ? AND linked_folder_id = ?
                AND relative_path = ? AND path_kind = ?`,
          );
          const insert = openLibrary.connection.prepare(
            `INSERT OR REPLACE INTO explicit_ignored_paths
              (location_kind, linked_folder_id, relative_path, path_kind, ignored_at)
             VALUES (?, ?, ?, ?, ?)`,
          );
          for (const ignored of ignoredPaths) {
            const rewritten = ignored.relative_path === target.relativePath
              ? newRelativePath
              : newRelativePath + ignored.relative_path.slice(target.relativePath.length);
            remove.run(ignored.location_kind, ignored.linked_folder_id, ignored.relative_path, ignored.path_kind);
            insert.run(ignored.location_kind, ignored.linked_folder_id, rewritten, ignored.path_kind, ignored.ignored_at);
          }
        }
      })();
      this.noteClientFilesystemMutation();
      return this.linkedDirectoryMutationSummary({
        linkedFolderId: target.linkedFolderId,
        relativePath: newRelativePath,
        name,
        status: target.status,
      });
    } catch (error) {
      if (renamed) {
        try {
          renamePathWithRetry(destinationPath, target.absolutePath);
        } catch (rollbackError) {
          this.diagnose('linked-folder.rename.rollback', rollbackError, {
            libraryId: input.libraryId,
            linkedFolderId: input.linkedFolderId,
            relativePath: input.relativePath,
          });
        }
      }
      if (isMissingPathError(error)) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND', { cause: error });
      }
      if (error instanceof LibraryServiceError) throw error;
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  public override collectManagedFolderSubtree(
    openLibrary: OpenLibrary,
    folderId: string,
  ): {
    folder: ManagedFolderRow;
    descendantFolders: ManagedFolderRow[];
    assetIds: string[];
  } {
    const folder = openLibrary.connection
      .prepare(
        'SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?',
      )
      .get(folderId) as ManagedFolderRow | undefined;
    if (!folder) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const descendantFolders = openLibrary.connection
      .prepare(
        `SELECT folder_id, parent_folder_id, name, relative_path, path_identity
           FROM managed_folders
          ORDER BY length(relative_path) DESC`,
      )
      .all()
      .filter((row) => {
        const candidate = row as ManagedFolderRow;
        return candidate.folder_id !== folder.folder_id
          && isPortablePathEqualOrDescendant(candidate.relative_path, folder.relative_path);
      }) as ManagedFolderRow[];

    const folderIds = [folder.folder_id, ...descendantFolders.map((row) => row.folder_id)];
    const assetRows = withSqliteInPredicate(
      openLibrary.connection,
      'managed_folder_id',
      folderIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE location_kind = 'managed'
                AND deleted_at IS NULL
                AND ${sql}`,
          )
          .all(...params) as Array<{ asset_id: string }>,
    );

    return {
      folder,
      descendantFolders,
      assetIds: assetRows.map((row) => row.asset_id),
    };
  }

  public override removeManagedFolderRowsAndDirectory(
    openLibrary: OpenLibrary,
    folder: ManagedFolderRow,
    descendantFolders: ManagedFolderRow[],
  ): number {
    const ordered = [...descendantFolders, folder];
    const directoryPath = this.folderPath(openLibrary, folder.relative_path);
    // Remove the filesystem tree before dropping its index rows. If Windows
    // still has a handle open, the operation must fail without leaving a
    // half-deleted database entry that can no longer be retried from the UI.
    try {
      if (existsSync(directoryPath)) {
        rmSync(directoryPath, {
          force: true,
          recursive: true,
          maxRetries: 5,
          retryDelay: 100,
        });
      }
    } catch (error) {
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    openLibrary.connection.transaction(() => {
      for (const row of ordered) {
        const result = openLibrary.connection
          .prepare('DELETE FROM managed_folders WHERE folder_id = ?')
          .run(row.folder_id);
        if (result.changes !== 1) {
          throw new LibraryServiceError('FOLDER_NOT_FOUND', { reason: 'SOURCE_CHANGED' });
        }
      }
    })();

    return ordered.length;
  }

  public override async removeManagedFolderRowsAndDirectoryAsync(
    openLibrary: OpenLibrary,
    folder: ManagedFolderRow,
    descendantFolders: ManagedFolderRow[],
  ): Promise<number> {
    const ordered = [...descendantFolders, folder];
    const directoryPath = this.folderPath(openLibrary, folder.relative_path);
    try {
      await removePathWithRetry(directoryPath, true);
    } catch (error) {
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    openLibrary.connection.transaction(() => {
      for (const row of ordered) {
        const result = openLibrary.connection
          .prepare('DELETE FROM managed_folders WHERE folder_id = ?')
          .run(row.folder_id);
        if (result.changes !== 1) {
          throw new LibraryServiceError('FOLDER_NOT_FOUND', { reason: 'SOURCE_CHANGED' });
        }
      }
    })();

    return ordered.length;
  }

  public override deleteActiveManagedAssetsFromDisk(
    openLibrary: OpenLibrary,
    assetIds: string[],
    onFileDeleted?: (processed: number, total: number) => void,
  ): number {
    if (assetIds.length === 0) return 0;
    const rows = sqliteAllInChunks<string, { asset_id: string; relative_file_path: string }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, relative_file_path FROM assets
          WHERE asset_id IN (${placeholders})
            AND location_kind = 'managed'
            AND deleted_at IS NULL`,
    });

    if (rows.length !== assetIds.length) {
      throw new LibraryServiceError('INVALID_STATE_TRANSITION');
    }

    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index]!;
      const filePath = this.folderPath(openLibrary, row.relative_file_path);
      try {
        if (existsSync(filePath)) {
          rmSync(filePath, { force: true, maxRetries: 5, retryDelay: 100 });
        }
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code === 'EBUSY' || code === 'EPERM' || code === 'EACCES') {
          throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', {
            reason:
              code === 'EBUSY' ? 'FILE_BUSY' : 'PERMISSION_DENIED',
            cause: error,
          });
        }
        if (!isMissingPathError(error)) {
          throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
        }
      }
      onFileDeleted?.(index + 1, rows.length);
    }

    openLibrary.connection.transaction(() => {
      this.dissolveImageSequencesForAssets(openLibrary, assetIds);
      for (const row of rows) {
        openLibrary.connection
          .prepare('DELETE FROM assets WHERE asset_id = ?')
          .run(row.asset_id);
      }
    })();

    return rows.length;
  }

  public override finalizeDiskDeletedAssetRows(
    openLibrary: OpenLibrary,
    libraryId: string,
    assetIds: string[],
  ): void {
    if (assetIds.length === 0) return;
    openLibrary.connection.transaction(() => {
      this.dissolveImageSequencesForAssets(openLibrary, assetIds);
      for (const assetId of assetIds) {
        openLibrary.connection
          .prepare('DELETE FROM assets WHERE asset_id = ?')
          .run(assetId);
      }
    })();
    this.invalidateArtifactPathCache(libraryId);
    this.options.onAssetsChanged?.({
      type: 'asset.changed',
      libraryId,
      changedCount: assetIds.length,
      missingCount: 0,
      source: 'client',
    });
  }

  public override async deleteActiveManagedAssetsFromDiskAsync(
    openLibrary: OpenLibrary,
    libraryId: string,
    assetIds: string[],
    options?: {
      onFileDeleted?: (processed: number, total: number) => void;
      cancelState?: TransferCancelState;
    },
  ): Promise<number> {
    if (assetIds.length === 0) return 0;
    const rows = sqliteAllInChunks<string, { asset_id: string; relative_file_path: string }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, relative_file_path FROM assets
          WHERE asset_id IN (${placeholders})
            AND location_kind = 'managed'
            AND deleted_at IS NULL`,
    });

    if (rows.length !== assetIds.length) {
      throw new LibraryServiceError('INVALID_STATE_TRANSITION');
    }

    const deletedFromDiskIds: string[] = [];
    for (let index = 0; index < rows.length; index += 1) {
      if (options?.cancelState?.cancelled) {
        this.finalizeDiskDeletedAssetRows(openLibrary, libraryId, deletedFromDiskIds);
        throw new LibraryServiceError('CANCELLED');
      }
      if (options?.cancelState) {
        await transferCheckpoint();
      }
      const row = rows[index]!;
      const filePath = this.folderPath(openLibrary, row.relative_file_path);
      try {
        await removePathWithRetry(filePath, false);
      } catch (error) {
        const code = (error as NodeJS.ErrnoException).code;
        if (code === 'EBUSY' || code === 'EPERM' || code === 'EACCES') {
          throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', {
            reason: code === 'EBUSY' ? 'FILE_BUSY' : 'PERMISSION_DENIED',
            cause: error,
          });
        }
        if (!isMissingPathError(error)) {
          throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
        }
      }
      deletedFromDiskIds.push(row.asset_id);
      options?.onFileDeleted?.(index + 1, rows.length);
    }

    this.finalizeDiskDeletedAssetRows(
      openLibrary,
      libraryId,
      rows.map((row) => row.asset_id),
    );

    return rows.length;
  }

  /** Async hard-delete path used by direct disk-delete commands. */
  override async deleteAssetsFromDiskAsync(input: {
    libraryId: string;
    assetIds: string[];
  }): Promise<{ deletedCount: number }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const logicalCount = this.countLogicalAssetUnits(
      openLibrary,
      input.assetIds,
    );
    const assetIds = this.expandAssetIdsToSequenceMembers(openLibrary, input.assetIds);
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      location_kind: string;
      deleted_at: string | null;
    }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, location_kind, deleted_at
           FROM assets
          WHERE asset_id IN (${placeholders})`,
    });
    if (rows.length !== assetIds.length) {
      for (const id of assetIds) {
        const row = rows.find((candidate) => candidate.asset_id === id);
        if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
        if (row.deleted_at !== null) {
          throw new LibraryServiceError('ASSET_ALREADY_TRASHED');
        }
      }
    }
    if (rows.some((row) => row.deleted_at !== null)) {
      throw new LibraryServiceError('ASSET_ALREADY_TRASHED');
    }
    // 2026-09-15 用户决定：链接资产的唯一删除动作也是「强制从硬盘删除」。托管与链接
    // 在同一个命令里分流，各自的例程负责文件删除、产物/任务清理、索引行与进度。
    const managedAssetIds = rows
      .filter((row) => row.location_kind === 'managed')
      .map((row) => row.asset_id);
    const linkedAssetIds = rows
      .filter((row) => row.location_kind !== 'managed')
      .map((row) => row.asset_id);

    if (managedAssetIds.length > 0) {
      await this.cancelMediaJobsForAssets(openLibrary, managedAssetIds);
      await this.deleteActiveManagedAssetsFromDiskWithProgress(
        input.libraryId,
        openLibrary,
        managedAssetIds,
      );
    }
    if (linkedAssetIds.length > 0) {
      const linkedResult = await this.deleteLinkedAssetsInBatches({
        libraryId: input.libraryId,
        assetIds: linkedAssetIds,
      });
      if (linkedResult.failedCount > 0 && managedAssetIds.length === 0) {
        throw new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
          reason: linkedResult.failures[0]?.reason ?? 'SOURCE_TRASH_FAILED',
        });
      }
    }
    return { deletedCount: logicalCount };
  }

  /**
   * 公开契约 `deleteLinkedAssets` 每批最多 20 个 id；链接文件夹子树与多选删除都可能涉及
   * 上万个文件，因此在这里内部分批，并把所有批次合并成**同一个**进度流——否则界面会出现
   * 数百段碎片进度。批间让出事件循环，避免长时间独占调度器。
   */
  public override async deleteLinkedAssetsInBatches(input: {
    libraryId: string;
    assetIds: string[];
  }): Promise<{
    deletedCount: number;
    failedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  }> {
    const operationId = randomUUID();
    const totalFiles = input.assetIds.length;
    const throttle = createProgressThrottle();
    let processed = 0;
    const emitRun = (force = false): void => {
      if (!throttle.shouldEmit(force || processed === totalFiles)) return;
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'disk',
        phase: 'run',
        cancelable: true,
        filesProcessed: processed,
        totalFiles,
      });
    };
    this.emitDeleteProgress({
      operationId,
      libraryId: input.libraryId,
      kind: 'disk',
      phase: 'run',
      cancelable: true,
      filesProcessed: 0,
      totalFiles,
    });

    const LINKED_DELETE_CHUNK_SIZE = 20;
    let deletedCount = 0;
    let failedCount = 0;
    const failures: Array<{ assetId: string; reason: PublicErrorReason }> = [];
    for (let offset = 0; offset < totalFiles; offset += LINKED_DELETE_CHUNK_SIZE) {
      const chunk = input.assetIds.slice(offset, offset + LINKED_DELETE_CHUNK_SIZE);
      const result = await this.deleteLinkedAssets({
        libraryId: input.libraryId,
        assetIds: chunk,
        deleteSourceFile: true,
        progress: {
          operationId,
          totalFiles,
          processedBefore: processed,
          onProcessed: (next) => {
            processed = next;
          },
        },
      });
      deletedCount += result.deletedCount;
      failedCount += result.failedCount;
      failures.push(...result.failures);
      emitRun();
      await new Promise<void>((resolve) => setImmediate(resolve));
    }
    this.emitDeleteProgress({
      operationId,
      libraryId: input.libraryId,
      kind: 'disk',
      phase: failedCount > 0 ? 'failed' : 'complete',
      filesProcessed: processed,
      totalFiles,
    });
    return { deletedCount, failedCount, failures };
  }

  public override async deleteActiveManagedAssetsFromDiskWithProgress(
    libraryId: string,
    openLibrary: OpenLibrary,
    assetIds: string[],
  ): Promise<number> {
    const operationId = randomUUID();
    const cancelState: TransferCancelState = { cancelled: false };
    this.activeDiskDeletes.set(operationId, cancelState);
    const diskThrottle = createProgressThrottle();
    let filesProcessed = 0;
    const emitRun = (processed: number, totalFiles: number) => {
      if (diskThrottle.shouldEmit(processed === totalFiles)) {
        this.emitDeleteProgress({
          operationId,
          libraryId,
          kind: 'disk',
          phase: 'run',
          cancelable: true,
          filesProcessed: processed,
          totalFiles,
        });
      }
    };
    this.emitDeleteProgress({
      operationId,
      libraryId,
      kind: 'disk',
      phase: 'run',
      cancelable: true,
      filesProcessed: 0,
      totalFiles: assetIds.length,
    });
    try {
      const deletedCount = await this.deleteActiveManagedAssetsFromDiskAsync(
        openLibrary,
        libraryId,
        assetIds,
        {
          cancelState,
          onFileDeleted: (processed, totalFiles) => {
            filesProcessed = processed;
            emitRun(processed, totalFiles);
          },
        },
      );
      this.emitDeleteProgress({
        operationId,
        libraryId,
        kind: 'disk',
        phase: 'complete',
        filesProcessed: assetIds.length,
        totalFiles: assetIds.length,
      });
      return deletedCount;
    } catch (error) {
      if (error instanceof LibraryServiceError && error.code === 'CANCELLED') {
        this.emitDeleteProgress({
          operationId,
          libraryId,
          kind: 'disk',
          phase: 'cancelled',
          filesProcessed,
          totalFiles: assetIds.length,
        });
        throw error;
      }
      this.emitDeleteProgress({
        operationId,
        libraryId,
        kind: 'disk',
        phase: 'failed',
        filesProcessed,
        totalFiles: assetIds.length,
      });
      throw error;
    } finally {
      this.activeDiskDeletes.delete(operationId);
    }
  }


  override listManagedFolders(libraryId: string, showIgnored = false): ManagedFolderSummary[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const rows = (openLibrary.connection
      .prepare(
        'SELECT folder_id, parent_folder_id, name, relative_path, path_identity, created_at, appearance_glyph_kind, appearance_glyph_value, appearance_color_id FROM managed_folders ORDER BY relative_path',
      )
      .all() as ManagedFolderRow[]).filter((row) =>
      showIgnored || !this.explicitFolderIgnored(openLibrary, 'managed', null, row.relative_path),
    );
    const counts = this.managedFolderCountMaps(openLibrary, undefined, showIgnored);
    // Serpent-toh: ManagedFolderSummary.directAssetCount is the displayed
    // badge count = all descendants (schema field name kept for compat).
    const recursive = this.managedFolderRecursiveAssetCounts(openLibrary, rows, showIgnored);
    return rows.map((row) => {
      const summary = this.summarizeManagedFolderRow(openLibrary, row, counts);
      return {
        ...summary,
        directAssetCount: recursive.get(row.folder_id) ?? summary.directAssetCount,
      };
    });
  }

}
