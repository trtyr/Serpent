/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { OpenLibrary } from '../library-service-internals';
import { LibraryServiceError } from '../library-service-internals';
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
import { LibraryServiceFolders } from './LibraryServiceFolders';
import type { LibraryServiceAllMethods } from './all-methods';

/** LibraryServiceFolderCovers: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceFolderCovers extends LibraryServiceFolders {

  /**
   * Store a catalog appearance on a folder/collection row. This is library
   * metadata only — it must not rename or move anything on disk.
   */
  override setEntityAppearance(input: {
    libraryId: string;
    target: EntityAppearanceTarget;
    appearance: {
      glyphKind: 'emoji' | 'icon' | null;
      glyphValue: string | null;
      colorId: string | null;
    } | null;
  }): { target: EntityAppearanceTarget; appearance: EntityAppearance | null } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const parsed = parseWritableAppearance(input.appearance);
    if (!parsed.ok) throw new LibraryServiceError('INVALID_APPEARANCE');
    const appearance = parsed.appearance;
    const glyphKind = appearance?.glyphKind ?? null;
    const glyphValue = appearance?.glyphValue ?? null;
    const colorId = appearance?.colorId ?? null;
    const now = new Date().toISOString();

    let changed = 0;
    switch (input.target.kind) {
      case 'managed-folder':
        changed = openLibrary.connection
          .prepare(
            `UPDATE managed_folders
                SET appearance_glyph_kind = ?, appearance_glyph_value = ?, appearance_color_id = ?
              WHERE folder_id = ?`,
          )
          .run(glyphKind, glyphValue, colorId, input.target.id).changes;
        break;
      case 'linked-folder':
        if (parseLinkedVirtualFolderId(input.target.id)) {
          throw new LibraryServiceError('FOLDER_NOT_FOUND');
        }
        changed = openLibrary.connection
          .prepare(
            `UPDATE linked_folders
                SET appearance_glyph_kind = ?, appearance_glyph_value = ?, appearance_color_id = ?, updated_at = ?
              WHERE folder_id = ? AND library_id = ?`,
          )
          .run(
            glyphKind,
            glyphValue,
            colorId,
            now,
            input.target.id,
            openLibrary.summary.libraryId,
          ).changes;
        break;
      case 'collection':
        changed = openLibrary.connection
          .prepare(
            `UPDATE collections
                SET appearance_glyph_kind = ?, appearance_glyph_value = ?, appearance_color_id = ?, updated_at = ?
              WHERE collection_id = ? AND library_id = ?`,
          )
          .run(
            glyphKind,
            glyphValue,
            colorId,
            now,
            input.target.id,
            openLibrary.summary.libraryId,
          ).changes;
        break;
      case 'smart-collection':
        changed = openLibrary.connection
          .prepare(
            `UPDATE smart_collections
                SET appearance_glyph_kind = ?, appearance_glyph_value = ?, appearance_color_id = ?, updated_at = ?
              WHERE collection_id = ? AND library_id = ?`,
          )
          .run(
            glyphKind,
            glyphValue,
            colorId,
            now,
            input.target.id,
            openLibrary.summary.libraryId,
          ).changes;
        break;
    }

    if (changed === 0) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    return { target: input.target, appearance };
  }

  /**
   * Copy a chosen image into the library and use it as the folder cover.
   * Clearing removes that file and the folder goes back to its automatic cover.
   */
  override setFolderCustomCovers(input: {
    libraryId: string;
    folderIds: readonly string[];
    sourcePath: string;
  }): { folderIds: string[]; hasCustomCover: true } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const folderIds = [...new Set(input.folderIds)];
    if (folderIds.length === 0) throw new LibraryServiceError('INVALID_SELECTION');
    for (const folderId of folderIds) this.assertFolderCoverTarget(openLibrary, folderId);
    const now = new Date().toISOString();
    const libraryPath = openLibrary.summary.libraryPath;
    const previous = openLibrary.connection.prepare(
      `SELECT relative_name FROM folder_custom_covers
        WHERE library_id = ? AND folder_key = ?`,
    );
    const upsert = openLibrary.connection.prepare(
      `INSERT INTO folder_custom_covers
         (library_id, folder_key, relative_name, cover_asset_id, updated_at)
       VALUES (?, ?, ?, NULL, ?)
       ON CONFLICT (library_id, folder_key) DO UPDATE SET
         relative_name = excluded.relative_name,
         cover_asset_id = NULL,
         updated_at = excluded.updated_at`,
    );
    const staged: Array<{ folderId: string; relativeName: string; previous: string | null }> = [];
    let committed = false;
    try {
      for (const folderId of folderIds) {
        const existing = previous.get(openLibrary.summary.libraryId, folderId) as
          | { relative_name: string }
          | undefined;
        let relativeName: string;
        try {
          relativeName = installFolderCoverFile({
            libraryPath,
            folderKey: folderId,
            sourcePath: input.sourcePath,
            previousRelativeName: existing?.relative_name,
          });
        } catch (error) {
          const code = error instanceof Error ? error.message : '';
          if (code === 'FOLDER_COVER_UNSUPPORTED' || code === 'FOLDER_COVER_NO_SPACE') {
            throw new LibraryServiceError(code);
          }
          throw error;
        }
        staged.push({
          folderId,
          relativeName,
          previous: existing?.relative_name ? existing.relative_name : null,
        });
      }
      commitReplacingFolderCoverFiles({
        libraryPath,
        stagedRelativeNames: staged.map((item) => item.relativeName),
        previousRelativeNames: staged.flatMap((item) => item.previous ? [item.previous] : []),
        commit: () => {
          openLibrary.connection.transaction(() => {
            for (const item of staged) {
              upsert.run(openLibrary.summary.libraryId, item.folderId, item.relativeName, now);
            }
          })();
        },
      });
      committed = true;
    } catch (error) {
      if (!committed) {
        for (const item of staged) {
          try {
            removeFolderCoverFile(libraryPath, item.relativeName);
          } catch {
            // The commit already failed. Leave the previous cover in place.
          }
        }
      }
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('LIBRARY_IO_ERROR', { cause: error });
    }
    this.invalidateNavigationSummary(openLibrary);
    this.emitClientAssetsChanged(input.libraryId, folderIds.length);
    return { folderIds, hasCustomCover: true };
  }

  /**
   * Use an image already in the library as the folder cover.
   * The asset id is the durable reference; the file is not copied again.
   */
  override setFolderCustomCoverFromAsset(input: {
    libraryId: string;
    folderIds: readonly string[];
    assetId: string;
  }): { folderIds: string[]; hasCustomCover: true } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const folderIds = [...new Set(input.folderIds)];
    if (folderIds.length === 0) throw new LibraryServiceError('INVALID_SELECTION');
    for (const folderId of folderIds) this.assertFolderCoverTarget(openLibrary, folderId);
    const asset = openLibrary.connection.prepare(
      `SELECT asset_id, relative_file_path, deleted_at
         FROM assets
        WHERE asset_id = ?`,
    ).get(input.assetId) as
      | { asset_id: string; relative_file_path: string; deleted_at: string | null }
      | undefined;
    if (!asset || asset.deleted_at) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (!folderCoverStoredExtension(asset.relative_file_path)) {
      throw new LibraryServiceError('FOLDER_COVER_UNSUPPORTED');
    }
    const now = new Date().toISOString();
    const previous = openLibrary.connection.prepare(
      `SELECT relative_name FROM folder_custom_covers
        WHERE library_id = ? AND folder_key = ?`,
    );
    const upsert = openLibrary.connection.prepare(
      `INSERT INTO folder_custom_covers
         (library_id, folder_key, relative_name, cover_asset_id, updated_at)
       VALUES (?, ?, '', ?, ?)
       ON CONFLICT (library_id, folder_key) DO UPDATE SET
         relative_name = '',
         cover_asset_id = excluded.cover_asset_id,
         updated_at = excluded.updated_at`,
    );
    const libraryPath = openLibrary.summary.libraryPath;
    const previousFiles: string[] = [];
    openLibrary.connection.transaction(() => {
      for (const folderId of folderIds) {
        const existing = previous.get(openLibrary.summary.libraryId, folderId) as
          | { relative_name: string }
          | undefined;
        if (existing?.relative_name) previousFiles.push(existing.relative_name);
        upsert.run(openLibrary.summary.libraryId, folderId, input.assetId, now);
      }
    })();
    for (const relativeName of previousFiles) {
      try {
        removeFolderCoverFile(libraryPath, relativeName);
      } catch {
        // The asset id is already committed. A later sweep can remove the file.
      }
    }
    this.invalidateNavigationSummary(openLibrary);
    this.emitClientAssetsChanged(input.libraryId, folderIds.length);
    return { folderIds, hasCustomCover: true };
  }

  override clearFolderCustomCovers(input: {
    libraryId: string;
    folderIds: readonly string[];
  }): { folderIds: string[]; hasCustomCover: false } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const folderIds = [...new Set(input.folderIds)];
    const select = openLibrary.connection.prepare(
      `SELECT relative_name FROM folder_custom_covers
        WHERE library_id = ? AND folder_key = ?`,
    );
    const remove = openLibrary.connection.prepare(
      `DELETE FROM folder_custom_covers WHERE library_id = ? AND folder_key = ?`,
    );
    const libraryPath = openLibrary.summary.libraryPath;
    const previousFiles: string[] = [];
    openLibrary.connection.transaction(() => {
      for (const folderId of folderIds) {
        const row = select.get(openLibrary.summary.libraryId, folderId) as
          | { relative_name: string }
          | undefined;
        remove.run(openLibrary.summary.libraryId, folderId);
        if (row?.relative_name) previousFiles.push(row.relative_name);
      }
    })();
    for (const relativeName of previousFiles) {
      try {
        removeFolderCoverFile(libraryPath, relativeName);
      } catch {
        // The row is already gone. A later sweep can remove the file.
      }
    }
    this.invalidateNavigationSummary(openLibrary);
    this.emitClientAssetsChanged(input.libraryId, folderIds.length);
    return { folderIds, hasCustomCover: false };
  }

  override resolveFolderCustomCover(input: {
    libraryId: string;
    folderId: string;
  }): { absolutePath: string; mimeType: string } | null {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const row = openLibrary.connection.prepare(
      `SELECT relative_name FROM folder_custom_covers
        WHERE library_id = ? AND folder_key = ?`,
    ).get(openLibrary.summary.libraryId, input.folderId) as
      | { relative_name: string }
      | undefined;
    if (!row?.relative_name) return null;
    return {
      absolutePath: folderCoverAbsolutePath(openLibrary.summary.libraryPath, row.relative_name),
      mimeType: folderCoverMimeType(row.relative_name),
    };
  }

  public folderCoverSweepScheduled = new WeakSet<OpenLibrary>();

  public override assertFolderCoverTarget(openLibrary: OpenLibrary, folderId: string): void {
    const managed = openLibrary.connection
      .prepare('SELECT 1 AS ok FROM managed_folders WHERE folder_id = ?')
      .get(folderId);
    if (managed) return;
    const linked = openLibrary.connection
      .prepare('SELECT 1 AS ok FROM linked_folders WHERE folder_id = ? AND library_id = ?')
      .get(folderId, openLibrary.summary.libraryId);
    if (linked) return;
    const virtual = parseLinkedVirtualFolderId(folderId);
    if (virtual) {
      const root = openLibrary.connection
        .prepare('SELECT 1 AS ok FROM linked_folders WHERE folder_id = ? AND library_id = ?')
        .get(virtual.linkedFolderId, openLibrary.summary.libraryId);
      if (root) return;
    }
    const trashed = openLibrary.connection
      .prepare('SELECT 1 AS ok FROM trashed_managed_folders WHERE folder_id = ?')
      .get(folderId);
    if (trashed) return;
    throw new LibraryServiceError('FOLDER_NOT_FOUND');
  }

  /**
   * Orphan cover rows and unreferenced files are not needed to paint the
   * sidebar. Run them after the navigation summary returns.
   */
  public override scheduleOrphanFolderCoverSweep(openLibrary: OpenLibrary): void {
    if (this.folderCoverSweepScheduled.has(openLibrary)) return;
    this.folderCoverSweepScheduled.add(openLibrary);
    setImmediate(() => {
      try {
        this.sweepOrphanFolderCovers(openLibrary);
      } catch (error) {
        this.diagnose('folder-cover.sweep', error, {
          libraryId: openLibrary.summary.libraryId,
        });
      }
    });
  }

  public override sweepOrphanFolderCovers(openLibrary: OpenLibrary): void {
    if (!hasTable(openLibrary.connection, 'folder_custom_covers')) return;
    const assetColumn = columnsFor(openLibrary.connection, 'folder_custom_covers').has('cover_asset_id');
    const rows = openLibrary.connection.prepare(
      assetColumn
        ? `SELECT folder_key, relative_name, cover_asset_id
             FROM folder_custom_covers WHERE library_id = ?`
        : `SELECT folder_key, relative_name, NULL AS cover_asset_id
             FROM folder_custom_covers WHERE library_id = ?`,
    ).all(openLibrary.summary.libraryId) as Array<{
      folder_key: string;
      relative_name: string;
      cover_asset_id: string | null;
    }>;
    const remove = openLibrary.connection.prepare(
      `DELETE FROM folder_custom_covers WHERE library_id = ? AND folder_key = ?`,
    );
    const assetExists = openLibrary.connection.prepare(
      `SELECT 1 AS ok FROM assets WHERE asset_id = ?`,
    );
    let dropped = false;
    const referenced = new Set<string>();
    for (const row of rows) {
      let drop = false;
      try {
        this.assertFolderCoverTarget(openLibrary, row.folder_key);
      } catch (error) {
        if (!(error instanceof LibraryServiceError) || error.code !== 'FOLDER_NOT_FOUND') throw error;
        drop = true;
      }
      if (!drop && row.cover_asset_id && !assetExists.get(row.cover_asset_id)) drop = true;
      if (drop) {
        remove.run(openLibrary.summary.libraryId, row.folder_key);
        if (row.relative_name) removeFolderCoverFile(openLibrary.summary.libraryPath, row.relative_name);
        dropped = true;
        continue;
      }
      if (row.relative_name) referenced.add(row.relative_name);
    }
    const stale = listStaleFolderCoverFiles(openLibrary.summary.libraryPath, referenced);
    for (const relativeName of stale) {
      removeFolderCoverFile(openLibrary.summary.libraryPath, relativeName);
    }
    if (dropped || stale.length > 0) {
      openLibrary.folderCoverIndexCache = undefined;
      openLibrary.navigationSummaryCache = undefined;
    }
  }

  public override folderCoverIndexCacheKey(openLibrary: OpenLibrary): string {
    const libraryId = openLibrary.summary.libraryId;
    return `${this.getBrowseChangeSequence(libraryId)}\u0000${this.getChangeSequence(libraryId)}`;
  }

  public override folderCustomCoverRows(openLibrary: OpenLibrary, folderIds?: readonly string[]): Array<{
    folder_key: string;
    relative_name: string;
    updated_at: string;
    cover_asset_id: string | null;
    current_revision_id: string | null;
    deleted_at: string | null;
    relative_file_path: string | null;
    artifact_id: string | null;
  }> {
    if (!hasTable(openLibrary.connection, 'folder_custom_covers')) return [];
    const assetColumn = columnsFor(openLibrary.connection, 'folder_custom_covers').has('cover_asset_id');
    const artifactColumns = columnsFor(openLibrary.connection, 'revision_artifacts');
    const artifactIdSelect = hasTable(openLibrary.connection, 'revision_artifacts')
      && ['artifact_id', 'revision_id', 'kind'].every((column) => artifactColumns.has(column))
      ? `(SELECT ra.artifact_id
           FROM revision_artifacts ra
          WHERE ra.revision_id = a.current_revision_id
            ${artifactColumns.has('invalidated_at') ? 'AND ra.invalidated_at IS NULL' : ''}
            ${artifactColumns.has('status') ? "AND ra.status = 'ready'" : ''}
            AND ra.kind = 'thumbnail'
          LIMIT 1)`
      : 'NULL';
    const select = assetColumn
      ? `SELECT c.folder_key AS folder_key,
                c.relative_name AS relative_name,
                c.updated_at AS updated_at,
                c.cover_asset_id AS cover_asset_id,
                a.current_revision_id AS current_revision_id,
                a.deleted_at AS deleted_at,
                a.relative_file_path AS relative_file_path,
                ${artifactIdSelect} AS artifact_id
           FROM folder_custom_covers c
           LEFT JOIN assets a ON a.asset_id = c.cover_asset_id
          WHERE c.library_id = ?`
      : `SELECT c.folder_key AS folder_key,
                c.relative_name AS relative_name,
                c.updated_at AS updated_at,
                NULL AS cover_asset_id,
                NULL AS current_revision_id,
                NULL AS deleted_at,
                NULL AS relative_file_path,
                NULL AS artifact_id
           FROM folder_custom_covers c
          WHERE c.library_id = ?`;
    const mapRow = (row: {
      folder_key: string;
      relative_name: string;
      updated_at: string;
      cover_asset_id: string | null;
      current_revision_id: string | null;
      deleted_at: string | null;
      relative_file_path: string | null;
      artifact_id: string | null;
    }) => row;
    if (!folderIds) {
      return (openLibrary.connection.prepare(
        `${select} ORDER BY c.updated_at DESC`,
      ).all(openLibrary.summary.libraryId) as Array<ReturnType<typeof mapRow>>).map(mapRow);
    }
    const ids = [...new Set(folderIds)];
    if (ids.length === 0) return [];
    return sqliteAllInChunks<string, ReturnType<typeof mapRow>>({
      connection: openLibrary.connection,
      values: ids,
      buildSql: (placeholders) =>
        `${select} AND c.folder_key IN (${placeholders}) ORDER BY c.updated_at DESC`,
      bind: (chunk) => [openLibrary.summary.libraryId, ...chunk],
    });
  }

  public override coverIndexFromRows(rows: ReturnType<LibraryServiceAllMethods['folderCustomCoverRows']>): Map<string, {
    token: string;
    assetId?: string;
    artifactId?: string;
    revisionId?: string;
  }> {
    const index = new Map<string, {
      token: string;
      assetId?: string;
      artifactId?: string;
      revisionId?: string;
    }>();
    for (const row of rows) {
      if (row.cover_asset_id) {
        if (!row.current_revision_id || row.deleted_at) continue;
        if (!row.relative_file_path || !folderCoverStoredExtension(row.relative_file_path)) continue;
        const revisionId = row.current_revision_id;
        index.set(row.folder_key, {
          token: row.updated_at,
          assetId: row.cover_asset_id,
          ...(row.artifact_id ? { artifactId: row.artifact_id } : { revisionId }),
        });
        continue;
      }
      if (!row.relative_name) continue;
      index.set(row.folder_key, { token: row.updated_at });
    }
    return index;
  }

  public override loadFolderCustomCoverIndex(
    openLibrary: OpenLibrary,
    folderIds?: readonly string[],
  ): Map<string, {
    token: string;
    assetId?: string;
    artifactId?: string;
    revisionId?: string;
  }> {
    const cacheKey = this.folderCoverIndexCacheKey(openLibrary);
    const cached = openLibrary.folderCoverIndexCache;
    if (cached?.key === cacheKey) {
      if (!folderIds) return cached.index;
      const scoped = new Map<string, {
        token: string;
        assetId?: string;
        artifactId?: string;
        revisionId?: string;
      }>();
      for (const folderId of folderIds) {
        const cover = cached.index.get(folderId);
        if (cover) scoped.set(folderId, cover);
      }
      return scoped;
    }
    if (folderIds) {
      return this.coverIndexFromRows(this.folderCustomCoverRows(openLibrary, folderIds));
    }
    const index = this.coverIndexFromRows(this.folderCustomCoverRows(openLibrary));
    openLibrary.folderCoverIndexCache = { key: cacheKey, index };
    return index;
  }
}
