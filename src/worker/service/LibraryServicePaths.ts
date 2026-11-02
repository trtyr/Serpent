/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { ExistingDestination, ImportSourceEntry, ManagedFolderRow, OpenLibrary} from '../library-service-internals';
import { LibraryServiceError, copyFileExclusive, directoryBirthNs, hasErrorCode, isMissingPathError, isUnreadablePathError, sameSourceSnapshot, sourceChanged, sourceDeviceHint, sourceHostDeviceHint, sourceSnapshot, unsupportedSourceEntry } from '../library-service-internals';
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
import type { ImportDestinationDirectoryCache } from '../import-destination-directory-cache';
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
import { LibraryServiceAutomationFiles } from './LibraryServiceAutomationFiles';

/** LibraryServicePaths: extracted verbatim from the former LibraryService monolith. */
export class LibraryServicePaths extends LibraryServiceAutomationFiles {

  public override folderPath(openLibrary: OpenLibrary, relativePath: string): string {
    const assetsPath = path.join(openLibrary.summary.libraryPath, 'Assets');
    const assetsStat = lstatSync(assetsPath);
    if (!assetsStat.isDirectory() || assetsStat.isSymbolicLink()) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    const targetPath = path.resolve(assetsPath, ...relativePath.split('/'));
    const relation = path.relative(assetsPath, targetPath);
    if (relation === '' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    let cursor = assetsPath;
    for (const component of relation.split(path.sep)) {
      cursor = path.join(cursor, component);
      try {
        if (lstatSync(cursor).isSymbolicLink()) {
          throw new LibraryServiceError('INVALID_LIBRARY_PATH');
        }
      } catch (error) {
        if (error instanceof LibraryServiceError) throw error;
        if (isUnreadablePathError(error)) break;
        throw new LibraryServiceError('INVALID_LIBRARY_PATH', { cause: error });
      }
    }
    return targetPath;
  }

  public override linkedRootAvailability(
    absoluteRootPath: string,
  ):
    | {
        available: true;
        deviceHint: string;
        legacyInodeHint: string;
        legacyHostDeviceHint?: string;
        legacyDeviceHint?: string;
      }
    | { available: false; reason: PublicErrorReason } {
    const lstat = this.options.linkedRootLstat
      ?? ((rootPath: string) => lstatSync(rootPath, { bigint: true }));
    const access = this.options.linkedRootAccess ?? ((rootPath: string) => {
      accessSync(rootPath, constants.R_OK | constants.X_OK);
    });
    try {
      const entry = lstat(absoluteRootPath);
      if (entry.isSymbolicLink()) {
        return { available: false, reason: 'SYMBOLIC_LINK_NOT_ALLOWED' };
      }
      if (!entry.isDirectory()) {
        return { available: false, reason: 'UNSUPPORTED_FILE_ENTRY' };
      }
      // Windows delete-pending: a just-removed tree can leave a directory
      // entry that lstat still sees but that rejects every access with EPERM
      // until the last open handle closes. POSIX reports ENOENT at the lstat
      // above, so only Windows needs this second check — without it the
      // refresh falls through to enumeration and crashes on the EPERM.
      access(absoluteRootPath);
      const device =
        typeof entry.dev === 'number' || typeof entry.dev === 'bigint'
          ? entry.dev
          : 'unknown';
      const inode =
        typeof entry.ino === 'number' || typeof entry.ino === 'bigint'
          ? entry.ino
          : 'unknown';
      const birthNs = directoryBirthNs(entry);
      return {
        available: true,
        deviceHint: sourceDeviceHint(device, inode, birthNs),
        legacyInodeHint: sourceDeviceHint(device, inode),
        ...(device === 'unknown'
          ? {}
          : { legacyHostDeviceHint: sourceHostDeviceHint(device) }),
        ...(device === 'unknown' ? {} : { legacyDeviceHint: String(device) }),
      };
    } catch (error) {
      const code =
        typeof error === 'object' && error !== null && 'code' in error &&
        typeof error.code === 'string'
          ? error.code
          : undefined;
      if (code === 'ENOENT' || code === 'ENOTDIR') {
        return { available: false, reason: 'LINKED_FOLDER_NOT_FOUND' };
      }
      if (code === 'EIO') {
        return { available: false, reason: 'IO_ERROR' };
      }
      if (
        code === 'ENODEV' || code === 'ESTALE' || code === 'ECONNRESET' ||
        code === 'ENETUNREACH' || code === 'EHOSTUNREACH'
      ) {
        return {
          available: false,
          reason: 'LINKED_FOLDER_NETWORK_DISCONNECTED',
        };
      }
      return {
        available: false,
        reason: publicReasonFromError(error) ?? 'IO_ERROR',
      };
    }
  }

  public override linkedRootIsGone(absoluteRootPath: string): boolean {
    return !this.linkedRootAvailability(absoluteRootPath).available;
  }

  public override linkedAssetPath(
    openLibrary: OpenLibrary,
    linkedFolderId: string | null,
    relativeFilePath: string,
  ): string {
    if (!linkedFolderId) throw new LibraryServiceError('LIBRARY_CORRUPT');
    const folder = openLibrary.connection
      .prepare('SELECT absolute_root_path FROM linked_folders WHERE folder_id = ?')
      .get(linkedFolderId) as { absolute_root_path: string } | undefined;
    if (!folder) throw new LibraryServiceError('LIBRARY_CORRUPT');
    // If the root is gone, replaced, or replaced by a symlink, return a path that
    // will stat as missing so the asset reconciles to 'missing' rather than
    // aborting the refresh. A later slice flips the whole folder to 'offline'.
    let rootPath: string;
    try {
      const rootEntry = lstatSync(folder.absolute_root_path);
      if (rootEntry.isSymbolicLink() || !rootEntry.isDirectory()) {
        return path.join(folder.absolute_root_path, ...relativeFilePath.split('/'));
      }
      rootPath = realpathSync(folder.absolute_root_path);
    } catch {
      return path.join(folder.absolute_root_path, ...relativeFilePath.split('/'));
    }
    const targetPath = path.resolve(rootPath, ...relativeFilePath.split('/'));
    const relation = path.relative(rootPath, targetPath);
    if (relation === '' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    let cursor = rootPath;
    for (const component of relation.split(path.sep)) {
      cursor = path.join(cursor, component);
      try {
        if (lstatSync(cursor).isSymbolicLink()) {
          throw new LibraryServiceError('INVALID_LIBRARY_PATH');
        }
      } catch (error) {
        if (error instanceof LibraryServiceError) throw error;
        if (isUnreadablePathError(error)) break;
        throw new LibraryServiceError('INVALID_LIBRARY_PATH', { cause: error });
      }
    }
    return targetPath;
  }

  public override async folderPathAsync(
    openLibrary: OpenLibrary,
    relativePath: string,
  ): Promise<string> {
    const assetsPath = path.join(openLibrary.summary.libraryPath, 'Assets');
    const assetsStat = await lstatAsync(assetsPath);
    if (!assetsStat.isDirectory() || assetsStat.isSymbolicLink()) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    const targetPath = path.resolve(assetsPath, ...relativePath.split('/'));
    const relation = path.relative(assetsPath, targetPath);
    if (relation === '' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    let cursor = assetsPath;
    for (const component of relation.split(path.sep)) {
      cursor = path.join(cursor, component);
      try {
        if ((await lstatAsync(cursor)).isSymbolicLink()) {
          throw new LibraryServiceError('INVALID_LIBRARY_PATH');
        }
      } catch (error) {
        if (error instanceof LibraryServiceError) throw error;
        if (isUnreadablePathError(error)) break;
        throw new LibraryServiceError('INVALID_LIBRARY_PATH', { cause: error });
      }
    }
    return targetPath;
  }

  public override async linkedAssetPathAsync(
    openLibrary: OpenLibrary,
    linkedFolderId: string | null,
    relativeFilePath: string,
  ): Promise<string> {
    if (!linkedFolderId) throw new LibraryServiceError('LIBRARY_CORRUPT');
    const folder = openLibrary.connection
      .prepare('SELECT absolute_root_path FROM linked_folders WHERE folder_id = ?')
      .get(linkedFolderId) as { absolute_root_path: string } | undefined;
    if (!folder) throw new LibraryServiceError('LIBRARY_CORRUPT');

    let rootPath: string;
    try {
      const rootEntry = await lstatAsync(folder.absolute_root_path);
      if (rootEntry.isSymbolicLink() || !rootEntry.isDirectory()) {
        return path.join(folder.absolute_root_path, ...relativeFilePath.split('/'));
      }
      rootPath = await realpathAsync(folder.absolute_root_path);
    } catch {
      return path.join(folder.absolute_root_path, ...relativeFilePath.split('/'));
    }
    const targetPath = path.resolve(rootPath, ...relativeFilePath.split('/'));
    const relation = path.relative(rootPath, targetPath);
    if (relation === '' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    let cursor = rootPath;
    for (const component of relation.split(path.sep)) {
      cursor = path.join(cursor, component);
      try {
        if ((await lstatAsync(cursor)).isSymbolicLink()) {
          throw new LibraryServiceError('INVALID_LIBRARY_PATH');
        }
      } catch (error) {
        if (error instanceof LibraryServiceError) throw error;
        if (isUnreadablePathError(error)) break;
        throw new LibraryServiceError('INVALID_LIBRARY_PATH', { cause: error });
      }
    }
    return targetPath;
  }

  public override portableDiskDestination(
    openLibrary: OpenLibrary,
    relativePath: string,
    directoryCache?: ImportDestinationDirectoryCache,
    options: { validateMissingSegments?: boolean; snapshotFile?: boolean } = {},
  ): ExistingDestination | undefined {
    const normalized = normalizeRelativeAssetPath(relativePath);
    const segments = normalized.split('/');
    let cursor = this.assetsPath(openLibrary);
    const actualSegments: string[] = [];

    for (const [index, segment] of segments.entries()) {
      const segmentIdentity = portablePathSegmentIdentity(segment);
      let matches;
      try {
        matches = directoryCache
          ? directoryCache.matches(cursor, segmentIdentity)
          : readdirSync(cursor, { withFileTypes: true }).filter(
              (entry) => portablePathSegmentIdentity(entry.name) === segmentIdentity,
            );
      } catch (error) {
        if (isMissingPathError(error)) return undefined;
        throw error;
      }
      if (matches.length > 1) {
        throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
          reason: 'NAME_NOT_SUPPORTED',
        });
      }
      const match = matches[0];
      if (!match) {
        if (options.validateMissingSegments === false) return undefined;
        // Let the target filesystem, rather than a guessed constant, decide
        // whether this absent component is a valid candidate name.
        const candidatePath = path.join(cursor, segment);
        try {
          (this.options.destinationLstat ?? lstatSync)(candidatePath);
        } catch (error) {
          if (isMissingPathError(error)) return undefined;
          throw error;
        }
        throw new LibraryServiceError('IMPORT_APPLY_FAILED');
      }
      if (match.isSymbolicLink()) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
      actualSegments.push(match.name);
      if (index < segments.length - 1) {
        if (!match.isDirectory()) {
          throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
            reason: 'NAME_NOT_SUPPORTED',
          });
        }
        cursor = path.join(cursor, match.name);
        continue;
      }
      let size = -1;
      let fileVersion: ExistingDestination['fileVersion'];
      if (match.isFile() && options.snapshotFile !== false) {
        const stat = lstatSync(path.join(cursor, match.name));
        size = stat.size;
        fileVersion = {
          ctimeMs: stat.ctimeMs,
          dev: stat.dev,
          ino: stat.ino,
          mtimeMs: stat.mtimeMs,
        };
      }
      return {
        actualRelativePath: actualSegments.join('/'),
        size,
        ...(fileVersion ? { fileVersion } : {}),
      };
    }
    return undefined;
  }

  /**
   * SQLite path_identity lookup for bulk Eagle/Billfish conversion.
   * `portableDiskDestination` readdirs Assets for every file; that becomes
   * the dominant cost long before payload copy on a 20k-item library.
   */
  public override managedDestinationIndex(openLibrary: OpenLibrary): Map<string, ExistingDestination> {
    const assetColumns = columnsFor(openLibrary.connection, 'assets');
    const filters = ["a.location_kind = 'managed'"];
    if (assetColumns.has('deleted_at')) filters.push('a.deleted_at IS NULL');
    const rows = openLibrary.connection
      .prepare(
        `SELECT a.path_identity AS path_identity,
                a.relative_file_path AS relative_file_path,
                r.byte_size AS byte_size
           FROM assets a
           LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
          WHERE ${filters.join(' AND ')}`,
      )
      .all() as Array<{
        path_identity: string;
        relative_file_path: string;
        byte_size: number | null;
      }>;
    const index = new Map<string, ExistingDestination>();
    for (const row of rows) {
      index.set(row.path_identity, {
        actualRelativePath: row.relative_file_path,
        size: row.byte_size ?? -1,
      });
    }
    return index;
  }

  public override lookupImportDestination(
    openLibrary: OpenLibrary,
    relativePath: string,
    index: Map<string, ExistingDestination> | undefined,
    directoryCache?: ImportDestinationDirectoryCache,
    options: { validateMissingSegments?: boolean } = {},
  ): ExistingDestination | undefined {
    if (index) {
      const indexedDestination = index.get(portablePathIdentity(relativePath));
      if (indexedDestination !== undefined) return indexedDestination;
    }
    return this.portableDiskDestination(
      openLibrary,
      relativePath,
      directoryCache,
      options,
    );
  }

  public override assetsPath(openLibrary: OpenLibrary): string {
    return path.join(openLibrary.summary.libraryPath, 'Assets');
  }

  public override targetFolder(openLibrary: OpenLibrary, folderId?: string): ManagedFolderRow | undefined {
    if (!folderId) return undefined;
    const folder = openLibrary.connection
      .prepare(
        'SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?',
      )
      .get(folderId) as ManagedFolderRow | undefined;
    if (!folder) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    return folder;
  }

  public override copySourceSnapshot(
    entry: ImportSourceEntry,
    stagedPath: string,
    options?: { bulk?: boolean },
  ): number {
    this.options.beforeSourceSnapshotOpen?.(entry.sourcePath);
    if (options?.bulk === true) {
      // Eagle/Billfish conversion already lstat'd the source when building the
      // entry. A second lstat+snapshot compare before every copyFile is 20k
      // extra metadata ops on the 2w baseline; copyFileExclusive fails if the
      // path disappeared or is not a regular file.
      copyFileExclusive(entry.sourcePath, stagedPath);
      const byteSize = entry.byteSize;
      if (!Number.isSafeInteger(byteSize) || byteSize < 0) {
        throw sourceChanged();
      }
      return byteSize;
    }
    const sourceFlags =
      constants.O_RDONLY | (process.platform === 'win32' ? 0 : constants.O_NOFOLLOW);
    let sourceFd: number | undefined;
    let stageFd: number | undefined;
    try {
      try {
        sourceFd = openSync(entry.sourcePath, sourceFlags);
      } catch (error) {
        if (hasErrorCode(error, 'ELOOP')) {
          throw unsupportedSourceEntry('SYMBOLIC_LINK_NOT_ALLOWED', error);
        }
        throw error;
      }

      const openedStat = fstatSync(sourceFd, { bigint: true });
      let pathStat: BigIntStats;
      try {
        pathStat = lstatSync(entry.sourcePath, { bigint: true });
      } catch (error) {
        throw sourceChanged(error);
      }
      if (pathStat.isSymbolicLink()) {
        throw unsupportedSourceEntry('SYMBOLIC_LINK_NOT_ALLOWED');
      }
      if (!pathStat.isFile() || !openedStat.isFile()) {
        throw unsupportedSourceEntry('UNSUPPORTED_FILE_ENTRY');
      }
      const openedSnapshot = sourceSnapshot(openedStat);
      if (
        !sameSourceSnapshot(entry.sourceSnapshot, openedSnapshot) ||
        !sameSourceSnapshot(sourceSnapshot(pathStat), openedSnapshot)
      ) {
        throw sourceChanged();
      }

      stageFd = openSync(
        stagedPath,
        constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL,
        Number(openedStat.mode & 0o777n),
      );
      const buffer = Buffer.allocUnsafe(1024 * 1024);
      for (;;) {
        const bytesRead = readSync(sourceFd, buffer, 0, buffer.length, null);
        if (bytesRead === 0) break;
        let written = 0;
        while (written < bytesRead) {
          written += writeSync(stageFd, buffer, written, bytesRead - written);
        }
      }
      fsyncSync(stageFd);
      this.options.afterSourceSnapshotCopy?.(entry.sourcePath);

      const finalSourceStat = fstatSync(sourceFd, { bigint: true });
      if (!sameSourceSnapshot(openedSnapshot, sourceSnapshot(finalSourceStat))) {
        throw sourceChanged();
      }
      const stagedStat = fstatSync(stageFd, { bigint: true });
      if (stagedStat.size !== openedSnapshot.size) throw sourceChanged();
      const byteSize = Number(stagedStat.size);
      if (!Number.isSafeInteger(byteSize)) {
        throw unsupportedSourceEntry('UNSUPPORTED_FILE_ENTRY');
      }
      return byteSize;
    } finally {
      if (stageFd !== undefined) closeSync(stageFd);
      if (sourceFd !== undefined) closeSync(sourceFd);
    }
  }

  public override expandImageSequenceSourcePaths(sourcePaths: readonly string[]): string[] {
    const expanded = new Map<string, string>();
    const selectedPaths: string[] = [];
    const selectedPathSet = new Set<string>();
    for (const rawPath of sourcePaths) {
      let selectedPath: string;
      try {
        selectedPath = normalizeAbsolutePath(rawPath);
      } catch {
        expanded.set(rawPath, rawPath);
        continue;
      }
      expanded.set(selectedPath, selectedPath);
      if (!selectedPathSet.has(selectedPath)) {
        selectedPathSet.add(selectedPath);
        selectedPaths.push(selectedPath);
      }
    }

    const sequencesBySelectedPath = discoverSelectedImageSequenceFrames(selectedPaths);
    for (const selectedPath of selectedPaths) {
      const sequence = sequencesBySelectedPath.get(selectedPath)?.candidate;
      if (!sequence) continue;
      for (const frame of sequence.frames) {
        expanded.set(frame.value, frame.value);
      }
    }
    return [...expanded.values()];
  }

}
