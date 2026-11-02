/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import { LibraryService } from '../library-service';
import type { AssetRefreshResult, AssetSummaryRow, BatchRelinkAssetRow, BatchRelinkMatch, ContentReplaceBatchOperationManifest, DatabaseConnection, DiscoveredSourceEntry, EagleCopiedThumbnail, EagleImportedMetadata, ExistingAssetRow, ExistingDestination, ImportAction, ImportSourceEntry, LibraryRow, LinkedTrashOperationManifest, ManagedCopyOperationManifest, ManagedFolderRow, ManagedMoveConflict, ManagedMoveOperationManifest, ManagedRelinkPlacedMarkerV1, ManagedRelinkPlacementIdentity, ManagedRelinkPlacementManifestV3, OpenLibrary, OpenReconciliationTask, OperationHistoryGroupStepInput, OperationManifest, OperationRow, PendingImport, RefreshManagedAssetsDiscovery, RefreshManagedAssetsOptions, RestoreOperationManifest, Statement, TransferCancelState, TrashSelectionResult} from '../library-service-internals';
import { DOWNLOAD_TIMEOUT_MS, Database, LibraryServiceError, MAX_DOWNLOAD_BYTES, MAX_DOWNLOAD_REDIRECTS, REGENERABLE_DIRECTORIES, REQUIRED_DIRECTORIES, SUPPORTED_SCHEMA_VERSION, SimulatedCrashError, UUID, assertNameWithinFsLimit, backfillDominantSaturation, backfillTrashedFromTombstoneIds, cleanFilename, closeIgnoringFailure, copyFileExclusive, copyNameCandidates, countRecoverableAssetFiles, createDirectoryLayout, createProgressThrottle, databaseBackupPath, databasePath, defaultRemoveLinkedSourceFile, directoryExists, extensionForContentType, filenameFromUrl, gitignorePath, hasErrorCode, isAlwaysIgnoredAssetPath, isDefaultIgnoredAssetEntry, isMissingPathError, isUnreadablePathError, migrateDatabase, openConfiguredDatabase, parseContentDispositionFilename, prohibitedIpAddress, readGitignoreText, readLibraryIdentity, realDirectoryExists, realFileExists, sameDestinationSnapshot, sameSourceSnapshot, sanitizedUrlDiagnosticError, sanitizedUrlForDiagnostic, schemaVersion, schemaVersionProbe, serviceError, sha256DescriptorSync, sha256FileAtPath, sourceSnapshot, transferCheckpoint, verifyDatabase, verifyOpenableSchema } from '../library-service-internals';
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
import { LibraryServiceTrashRelink } from './LibraryServiceTrashRelink';
import { detectMediaType, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';
import type { LibraryServiceAllMethods } from './all-methods';

/** LibraryServiceExportImport: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceExportImport extends LibraryServiceTrashRelink {

  // ── Trash & Relink (v7) ───────────────────────────────────────────

  public override knownRecoveryFilePath(
    rootPath: string,
    relativeFilePath: string,
  ): string | undefined {
    let normalized: string;
    try {
      normalized = normalizeRelativeAssetPath(relativeFilePath);
    } catch {
      return undefined;
    }
    const root = path.resolve(rootPath);
    const target = path.resolve(root, ...normalized.split('/'));
    const relation = path.relative(root, target);
    if (relation === '' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
      return undefined;
    }
    let cursor = root;
    const components = relation.split(path.sep).filter(Boolean);
    for (const [index, component] of components.entries()) {
      cursor = path.join(cursor, component);
      try {
        const entry = lstatSync(cursor);
        if (entry.isSymbolicLink()) return undefined;
        if (index === components.length - 1) {
          return entry.isFile() ? cursor : undefined;
        }
        if (!entry.isDirectory()) return undefined;
      } catch {
        return undefined;
      }
    }
    return undefined;
  }

  override probeMissingAssetRecovery(input: {
    libraryId: string;
    assetId: string;
  }): MissingAssetRecoveryProbe {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT a.location_kind, a.linked_folder_id, a.relative_file_path,
                a.current_revision_id, a.availability, a.deleted_at,
                r.revision_id AS revision_row_id, r.byte_size,
                r.content_fingerprint
           FROM assets a
           LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
          WHERE a.asset_id = ?`,
      )
      .get(input.assetId) as {
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
        revision_row_id: string | null;
        byte_size: number | null;
        content_fingerprint: string | null;
      } | undefined;
    if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if ((row.availability !== 'missing' && row.revision_row_id !== null) || row.deleted_at !== null) {
      return {
        status: 'not-missing',
        candidateKind: null,
        contentVerified: false,
        checkedLocations: 0,
      };
    }

    const candidates: Array<{
      kind: 'managed-source' | 'trash' | 'linked-source';
      path: string;
      allowUnverifiedRecovery: boolean;
    }> = [];
    if (row.location_kind === 'managed') {
      try {
        const destination = this.portableDiskDestination(
          openLibrary,
          row.relative_file_path,
        );
        if (destination) {
          const sourcePath = path.join(
            this.assetsPath(openLibrary),
            ...destination.actualRelativePath.split('/'),
          );
          candidates.push({
            kind: 'managed-source',
            path: sourcePath,
            // A dangling revision is repaired from the source on the next
            // refresh; there is no historical fingerprint to compare yet.
            allowUnverifiedRecovery: row.revision_row_id === null,
          });
        }
      } catch {
        // A malformed or ambiguous managed path is not an automatic match.
      }
      candidates.push({
        kind: 'trash',
        path: this.trashPath(
          openLibrary,
          input.assetId,
          path.posix.basename(row.relative_file_path),
        ),
        allowUnverifiedRecovery: false,
      });
    } else if (row.linked_folder_id) {
      const linkedFolder = openLibrary.connection
        .prepare('SELECT absolute_root_path FROM linked_folders WHERE folder_id = ?')
        .get(row.linked_folder_id) as { absolute_root_path: string } | undefined;
      if (linkedFolder && realDirectoryExists(linkedFolder.absolute_root_path)) {
        const sourcePath = this.knownRecoveryFilePath(
          linkedFolder.absolute_root_path,
          row.relative_file_path,
        );
        if (sourcePath) {
          candidates.push({
            kind: 'linked-source',
            path: sourcePath,
            allowUnverifiedRecovery: row.revision_row_id === null,
          });
        }
      }
    }

    let unverifiedCandidateKind: 'managed-source' | 'trash' | 'linked-source' | null = null;
    let checkedLocations = 0;
    for (const candidate of candidates) {
      checkedLocations += 1;
      if (!realFileExists(candidate.path)) continue;
      if (row.content_fingerprint) {
        try {
          if (this.computeContentFingerprint(candidate.path) === row.content_fingerprint) {
            return {
              status: 'recoverable',
              candidateKind: candidate.kind,
              contentVerified: true,
              checkedLocations,
            };
          }
        } catch {
          // Treat an unreadable candidate as unavailable and continue probing.
        }
        continue;
      }
      unverifiedCandidateKind ??= candidate.kind;
      if (candidate.allowUnverifiedRecovery) {
        return {
          status: 'recoverable',
          candidateKind: candidate.kind,
          contentVerified: false,
          checkedLocations,
        };
      }
    }
    return {
      status: 'needs-location',
      candidateKind: unverifiedCandidateKind,
      contentVerified: false,
      checkedLocations,
    };
  }

  public override trashPath(openLibrary: OpenLibrary, assetId: string, filename: string): string {
    return path.join(openLibrary.summary.libraryPath, '.serpent', 'trash', assetId, filename);
  }

  public override assertNotInManagedSpace(
    openLibrary: OpenLibrary,
    absolutePath: string,
  ): void {
    const assetsPath = this.assetsPath(openLibrary);
    const relation = path.relative(assetsPath, absolutePath);
    if (relation === '' || (!relation.startsWith(`..${path.sep}`) && !path.isAbsolute(relation))) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'NAME_NOT_SUPPORTED',
      });
    }
  }

  public override assertNoSymlinkEscape(absolutePath: string): void {
    const filePath = absolutePath;
    try {
      const lstat = lstatSync(filePath);
      if (lstat.isSymbolicLink()) throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
      });
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      if (isMissingPathError(error)) return;
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
    }
    const directory = path.dirname(absolutePath);
    try {
      const resolved = realpathSync(directory);
      const dirName = path.basename(directory);
      let current = resolved;
      for (const component of dirName.split(path.sep).filter(Boolean)) {
        current = path.join(current, component);
        try {
          if (lstatSync(current).isSymbolicLink()) {
            throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
            });
          }
        } catch (error) {
          if (error instanceof LibraryServiceError) throw error;
          if (isMissingPathError(error)) break;
          throw error;
        }
      }
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
    }
  }

  public override placeManagedRelinkFile(
    openLibrary: OpenLibrary,
    sourcePath: string,
    destinationRelativePath: string,
  ): {
    destinationPath: string;
    operationPath: string;
    placedIdentity: ManagedRelinkPlacementIdentity;
    stat: Stats;
  } {
    const destinationPath = this.folderPath(openLibrary, destinationRelativePath);
    if (existsSync(destinationPath)) {
      throw new LibraryServiceError('ASSET_FILE_NAME_CONFLICT');
    }

    let sourceStat: BigIntStats;
    try {
      sourceStat = lstatSync(sourcePath, { bigint: true });
    } catch (error) {
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }
    if (!sourceStat.isFile() || sourceStat.isSymbolicLink()) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: sourceStat.isSymbolicLink()
          ? 'SYMBOLIC_LINK_NOT_ALLOWED'
          : 'UNSUPPORTED_FILE_ENTRY',
      });
    }

    const operationPath = path.join(
      openLibrary.summary.libraryPath,
      '.serpent',
      'operations',
      `relink-${randomUUID()}`,
    );
    const stagedPath = path.join(operationPath, 'replacement');
    let stagedIdentity: ManagedRelinkPlacementIdentity;
    try {
      mkdirSync(operationPath, { recursive: true });
      this.copySourceSnapshot({
        byteSize: Number(sourceStat.size),
        destinationRelativePath,
        sourcePath,
        sourceSnapshot: sourceSnapshot(sourceStat),
      }, stagedPath);
      stagedIdentity = this.managedRelinkPlacementIdentity(stagedPath);
      this.failAt('crash-relink-before-manifest-write');
      this.writeManagedRelinkPlacementManifest(operationPath, {
        version: 3,
        kind: 'managed-relink-placement',
        phase: 'staged',
        destinationRelativePath,
        stagedIdentity,
      });
      this.failAt('crash-relink-after-manifest-before-placement');
    } catch (error) {
      if (error instanceof SimulatedCrashError) throw error;
      rmSync(operationPath, { force: true, recursive: true });
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }

    let placed = false;
    try {
      mkdirSync(path.dirname(destinationPath), { recursive: true });
      // Re-validate after creating a missing original directory hierarchy so a
      // symlink introduced between validation and placement cannot escape Assets/.
      if (this.folderPath(openLibrary, destinationRelativePath) !== destinationPath) {
        throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      }
      if (existsSync(destinationPath)) {
        throw new LibraryServiceError('ASSET_FILE_NAME_CONFLICT');
      }
      renameSync(stagedPath, destinationPath);
      placed = true;
      this.failAt('crash-relink-after-placement-before-manifest-update');
      const placedIdentity = this.managedRelinkPlacementIdentity(destinationPath);
      this.writeDurableRelinkJournalFile(operationPath, 'placed.json', {
        version: 1,
        kind: 'managed-relink-placement-complete',
        placedIdentity,
      } satisfies ManagedRelinkPlacedMarkerV1);
      return {
        destinationPath,
        operationPath,
        placedIdentity,
        stat: statSync(destinationPath),
      };
    } catch (error) {
      if (error instanceof SimulatedCrashError) throw error;
      if (placed) {
        // No durable placed marker means ownership is ambiguous. A concurrent
        // writer may already have replaced or modified the path, so preserve it.
        this.diagnose('asset.relink.placement-marker-failed', error, {
          destinationPath,
        });
      }
      rmSync(operationPath, { force: true, recursive: true });
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  public override managedRelinkPlacementIdentity(filePath: string): ManagedRelinkPlacementIdentity {
    const flags = constants.O_RDONLY | (process.platform === 'win32' ? 0 : constants.O_NOFOLLOW);
    const descriptor = openSync(filePath, flags);
    try {
      const before = fstatSync(descriptor, { bigint: true });
      const pathEntry = lstatSync(filePath, { bigint: true });
      if (
        !before.isFile() || !pathEntry.isFile() || pathEntry.isSymbolicLink() ||
        !sameSourceSnapshot(sourceSnapshot(before), sourceSnapshot(pathEntry))
      ) {
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', {
          reason: pathEntry.isSymbolicLink() ? 'SYMBOLIC_LINK_NOT_ALLOWED' : 'SOURCE_CHANGED',
        });
      }
      const sha256 = sha256DescriptorSync(descriptor);
      const after = fstatSync(descriptor, { bigint: true });
      if (!sameSourceSnapshot(sourceSnapshot(before), sourceSnapshot(after))) {
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { reason: 'SOURCE_CHANGED' });
      }
      return {
        ctimeNs: String(after.ctimeNs),
        dev: String(after.dev),
        ino: String(after.ino),
        mtimeNs: String(after.mtimeNs),
        sha256,
        size: String(after.size),
      };
    } finally {
      closeSync(descriptor);
    }
  }

  public override writeManagedRelinkPlacementManifest(
    operationPath: string,
    manifest: ManagedRelinkPlacementManifestV3,
  ): void {
    this.writeDurableRelinkJournalFile(operationPath, 'manifest.json', manifest);
  }

  public override writeDurableRelinkJournalFile(
    operationPath: string,
    filename: 'manifest.json' | 'placed.json',
    value: ManagedRelinkPlacementManifestV3 | ManagedRelinkPlacedMarkerV1,
  ): void {
    const finalPath = path.join(operationPath, filename);
    const temporaryPath = path.join(operationPath, `${filename}.tmp`);
    const payload = Buffer.from(JSON.stringify(value), 'utf8');
    let descriptor: number | undefined;
    try {
      descriptor = openSync(
        temporaryPath,
        constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL,
        0o600,
      );
      let written = 0;
      while (written < payload.length) {
        written += writeSync(descriptor, payload, written, payload.length - written);
      }
      fsyncSync(descriptor);
      closeSync(descriptor);
      descriptor = undefined;
      // Both journal records are immutable and created exactly once. Renaming
      // onto an absent path avoids platform-specific replace semantics.
      renameSync(temporaryPath, finalPath);

      // Directory fsync makes both the manifest rename and the newly-created
      // relink operation directory durable on filesystems that support it.
      // Windows does not provide a portable directory fsync through Node.
      if (process.platform !== 'win32') {
        for (const directoryPath of [operationPath, path.dirname(operationPath)]) {
          let directoryDescriptor: number | undefined;
          try {
            directoryDescriptor = openSync(directoryPath, constants.O_RDONLY);
            fsyncSync(directoryDescriptor);
          } finally {
            if (directoryDescriptor !== undefined) closeSync(directoryDescriptor);
          }
        }
      }
    } catch (error) {
      if (descriptor !== undefined) closeSync(descriptor);
      rmSync(temporaryPath, { force: true });
      throw error;
    }
  }

  public override cleanupManagedRelinkPlacement(
    placement: {
      destinationPath: string;
      operationPath: string;
      placedIdentity: ManagedRelinkPlacementIdentity;
    },
    removeDestination: boolean,
  ): void {
    let preserveOperation = false;
    if (removeDestination) {
      try {
        const removal = this.quarantineManagedRelinkPlacementForRemoval(
          placement.destinationPath,
          placement.operationPath,
          placement.placedIdentity,
        );
        preserveOperation = removal.preserveOperation;
        if (!removal.owned) {
          this.diagnose(
            'asset.relink.rollback-file-mismatch',
            new LibraryServiceError('LIBRARY_NOT_WRITABLE', { reason: 'SOURCE_CHANGED' }),
            { destinationPath: placement.destinationPath },
          );
        }
      } catch (error) {
        this.diagnose('asset.relink.rollback-file', error, {
          destinationPath: placement.destinationPath,
        });
      }
    }
    if (preserveOperation) return;
    try {
      rmSync(placement.operationPath, { force: true, recursive: true });
    } catch (error) {
      this.diagnose('asset.relink.cleanup-operation', error, {
        operationPath: placement.operationPath,
      });
    }
  }

  public override recoverOrphanRelinkPlacement(openLibrary: OpenLibrary, operationPath: string): boolean {
    const manifestPath = path.join(operationPath, 'manifest.json');
    if (!existsSync(manifestPath)) return false;
    let destinationRelativePath: string;
    let placedIdentity: ManagedRelinkPlacementIdentity | undefined;
    let manifestVersion: 1 | 2 | 3;
    let phase: 'legacy' | 'staged' | 'placed' = 'legacy';
    try {
      const parsed = JSON.parse(readFileSync(manifestPath, 'utf8')) as unknown;
      if (
        typeof parsed !== 'object' || parsed === null ||
        typeof (parsed as { destinationRelativePath?: unknown }).destinationRelativePath !== 'string'
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const version = (parsed as { version?: unknown }).version;
      if (version !== 1 && version !== 2 && version !== 3) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      manifestVersion = version;
      const rawPath = (parsed as { destinationRelativePath: string }).destinationRelativePath;
      destinationRelativePath = normalizeRelativeAssetPath(rawPath);
      if (destinationRelativePath !== rawPath) throw new LibraryServiceError('LIBRARY_CORRUPT');
      if (version === 3) {
        const candidate = parsed as {
          kind?: unknown;
          phase?: unknown;
          stagedIdentity?: unknown;
        };
        if (
          candidate.kind !== 'managed-relink-placement' ||
          candidate.phase !== 'staged' ||
          !this.isManagedRelinkPlacementIdentity(candidate.stagedIdentity)
        ) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        phase = 'staged';
      }
    } catch (error) {
      // A malformed/partially-written relink manifest can never authorize a
      // destination deletion. Preserve all files and discard only the isolated
      // operation directory so one bad journal cannot prevent the library opening.
      this.diagnose('asset.relink.recovery-manifest-invalid', error, {
        libraryId: openLibrary.summary.libraryId,
        operationPath,
      });
      rmSync(operationPath, { force: true, recursive: true });
      return true;
    }

    if (manifestVersion === 3) {
      const placedMarkerPath = path.join(operationPath, 'placed.json');
      if (existsSync(placedMarkerPath)) {
        try {
          const marker = JSON.parse(readFileSync(placedMarkerPath, 'utf8')) as {
            kind?: unknown;
            placedIdentity?: unknown;
            version?: unknown;
          };
          if (
            marker.version !== 1 ||
            marker.kind !== 'managed-relink-placement-complete' ||
            !this.isManagedRelinkPlacementIdentity(marker.placedIdentity)
          ) {
            throw new LibraryServiceError('LIBRARY_CORRUPT');
          }
          placedIdentity = marker.placedIdentity;
          phase = 'placed';
        } catch (error) {
          // A missing or malformed completion marker means the rename cannot be
          // proven. Keep phase=staged so the destination is preserved.
          this.diagnose('asset.relink.recovery-marker-invalid', error, {
            libraryId: openLibrary.summary.libraryId,
            destinationRelativePath,
          });
        }
      }
    }

    const destinationPath = this.folderPath(openLibrary, destinationRelativePath);
    const destinationExists = existsSync(destinationPath);
    let ownsDestination = false;
    if (destinationExists && manifestVersion === 3 && phase === 'placed' && placedIdentity) {
      try {
        ownsDestination = this.matchesManagedRelinkPlacementIdentity(
          destinationPath,
          placedIdentity,
        );
      } catch (error) {
        this.diagnose('asset.relink.recovery-file-mismatch', error, {
          libraryId: openLibrary.summary.libraryId,
          destinationRelativePath,
        });
      }
      if (!ownsDestination) {
        this.diagnose(
          'asset.relink.recovery-file-mismatch',
          new LibraryServiceError('LIBRARY_NOT_WRITABLE', { reason: 'SOURCE_CHANGED' }),
          { libraryId: openLibrary.summary.libraryId, destinationRelativePath },
        );
      }
    } else if (destinationExists) {
      // v1/v2 journals and v3 staged journals do not carry durable post-rename
      // ownership. They may be leftovers from the historical rename->v2 crash
      // window, or another writer may have created the path. Preserve the file.
      this.diagnose(
        'asset.relink.recovery-ownership-unknown',
        new LibraryServiceError('LIBRARY_NOT_WRITABLE', { reason: 'SOURCE_CHANGED' }),
        {
          libraryId: openLibrary.summary.libraryId,
          destinationRelativePath,
          manifestVersion,
          phase,
        },
      );
    }

    const asset = openLibrary.connection
      .prepare(
        `SELECT availability FROM assets
          WHERE location_kind = 'managed' AND path_identity = ? AND deleted_at IS NULL`,
      )
      .get(portablePathIdentity(destinationRelativePath)) as { availability: 'available' | 'missing' } | undefined;
    const databaseCommitted = asset?.availability === 'available';
    let preserveOperation = false;
    if (destinationExists && ownsDestination && !databaseCommitted) {
      const removal = this.quarantineManagedRelinkPlacementForRemoval(
        destinationPath,
        operationPath,
        placedIdentity!,
      );
      ownsDestination = removal.owned;
      preserveOperation = removal.preserveOperation;
    }
    if (!preserveOperation) rmSync(operationPath, { force: true, recursive: true });
    if (destinationExists && !ownsDestination) {
      openLibrary.preservedRelinkPathIdentities.add(
        portablePathIdentity(destinationRelativePath),
      );
    }
    this.diagnose(
      databaseCommitted
        ? 'asset.relink.recovered-committed-placement'
        : ownsDestination
          ? 'asset.relink.recovered-orphan-placement'
          : 'asset.relink.recovered-preserved-placement',
      new LibraryServiceError('LIBRARY_NOT_WRITABLE', { reason: 'IO_ERROR' }),
      { libraryId: openLibrary.summary.libraryId, destinationRelativePath },
    );
    return true;
  }

  public override isManagedRelinkPlacementIdentity(
    value: unknown,
  ): value is ManagedRelinkPlacementIdentity {
    if (typeof value !== 'object' || value === null) return false;
    const identity = value as Partial<Record<keyof ManagedRelinkPlacementIdentity, unknown>>;
    const decimal = /^\d+$/;
    return (
      typeof identity.ctimeNs === 'string' && decimal.test(identity.ctimeNs) &&
      typeof identity.dev === 'string' && decimal.test(identity.dev) &&
      typeof identity.ino === 'string' && decimal.test(identity.ino) &&
      typeof identity.mtimeNs === 'string' && decimal.test(identity.mtimeNs) &&
      typeof identity.size === 'string' && decimal.test(identity.size) &&
      typeof identity.sha256 === 'string' && /^[a-f0-9]{64}$/.test(identity.sha256)
    );
  }

  public override matchesManagedRelinkPlacementIdentity(
    destinationPath: string,
    expected: ManagedRelinkPlacementIdentity,
  ): boolean {
    // Some network/removable filesystems report inode or device as zero. In that
    // case identity is ambiguous, so recovery must preserve rather than delete.
    if (expected.dev === '0' || expected.ino === '0') return false;
    const current = this.managedRelinkPlacementIdentity(destinationPath);
    return (
      current.ctimeNs === expected.ctimeNs &&
      current.dev === expected.dev &&
      current.ino === expected.ino &&
      current.mtimeNs === expected.mtimeNs &&
      current.size === expected.size &&
      current.sha256 === expected.sha256
    );
  }

  public override quarantineManagedRelinkPlacementForRemoval(
    destinationPath: string,
    operationPath: string,
    expected: ManagedRelinkPlacementIdentity,
  ): { owned: boolean; preserveOperation: boolean } {
    if (!this.matchesManagedRelinkPlacementIdentity(destinationPath, expected)) {
      return { owned: false, preserveOperation: false };
    }

    const candidatePath = path.join(operationPath, 'rollback-candidate');
    try {
      renameSync(destinationPath, candidatePath);
    } catch {
      // The path changed after verification or could not be moved. It remains in
      // place, so preserving it and cleaning the journal is safe.
      return { owned: false, preserveOperation: false };
    }

    const candidateOwned = (() => {
      try {
        const candidate = this.managedRelinkPlacementIdentity(candidatePath);
        // Moving into quarantine changes ctime on several filesystems. The stable
        // inode/device plus size, mtime and content hash prove this is the same
        // verified file; any path replacement races produce a different inode.
        return (
          candidate.dev === expected.dev &&
          candidate.ino === expected.ino &&
          candidate.mtimeNs === expected.mtimeNs &&
          candidate.size === expected.size &&
          candidate.sha256 === expected.sha256
        );
      } catch {
        return false;
      }
    })();
    if (candidateOwned) return { owned: true, preserveOperation: false };

    // A writer won the verification->rename race. Restore the moved file when
    // possible. If the original path was claimed again, retain the entire
    // operation under .serpent/recovered so neither file is overwritten.
    if (!existsSync(destinationPath)) {
      try {
        renameSync(candidatePath, destinationPath);
        return { owned: false, preserveOperation: false };
      } catch {
        // Fall through to preserving the operation directory.
      }
    }
    const recoveredRoot = path.join(path.dirname(path.dirname(operationPath)), 'recovered');
    try {
      mkdirSync(recoveredRoot, { recursive: true });
      renameSync(operationPath, path.join(recoveredRoot, path.basename(operationPath)));
    } catch {
      // Leave the operation directory in place. The caller must not remove it.
    }
    return { owned: false, preserveOperation: true };
  }

  public override assetSummaryFromRow(
    row: CatalogAssetSummaryRow,
  ): AssetSummary {
    return catalogAssetSummaryFromRow(row);
  }

  public override managedMoveSummaries(openLibrary: OpenLibrary, assetIds: string[]): AssetSummary[] {
    return assetIds.flatMap((assetId) => {
      const row = openLibrary.connection.prepare(
        `SELECT a.asset_id, a.managed_folder_id, a.linked_folder_id, a.location_kind,
                a.relative_file_path, a.current_revision_id, a.availability,
                r.byte_size, r.modified_at,
                COALESCE(m.rating, 0) AS rating, COALESCE(m.favorite, 0) AS favorite,
                a.deleted_at, a.trashed_from_relative_path
           FROM assets a
           JOIN revisions r ON r.revision_id = a.current_revision_id
           LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
          WHERE a.asset_id = ?`,
      ).get(assetId) as Parameters<LibraryServiceAllMethods['assetSummaryFromRow']>[0] | undefined;
      return row ? [this.assetSummaryFromRow(row)] : [];
    });
  }

  public override applyManagedMoveOperation(
    openLibrary: OpenLibrary,
    operationId: string,
    manifest: ManagedMoveOperationManifest,
  ): void {
    const operationsRoot = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);
    const operationPath = path.join(operationsRoot, operationId);
    mkdirSync(path.join(operationPath, 'backup'), { recursive: true });
    this.assertSafeOperationPath(operationPath);
    const now = new Date().toISOString();
    openLibrary.connection.prepare(
      `INSERT INTO file_operations
         (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
       VALUES (?, ?, 'preparing', ?, NULL, ?, ?)`,
    ).run(operationId, manifest.kind, JSON.stringify(manifest), now, now);

    let jobLease: LibraryJobLease;
    try {
      jobLease = new LibraryWriteCoordinator(openLibrary.writeConnection, openLibrary.summary.libraryId)
        .claimJobOnce(operationId);
    } catch (error) {
      this.removeOperation(operationPath);
      if (error instanceof LibraryWriteCoordinatorError) {
        try {
          openLibrary.connection.prepare(
            `UPDATE file_operations
                SET status = 'failed', error_code = 'JOB_LEASE_BUSY', updated_at = ?
              WHERE operation_id = ? AND status = 'preparing'`,
          ).run(new Date().toISOString(), operationId);
        } catch {
          // Best-effort status update.
        }
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
    const jobHeartbeat: LibraryWriteLeaseHeartbeat = jobLease.startHeartbeat();

    try {
      this.failAt('crash-move-before-filesystem');
      const applying = openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'applying', updated_at = ? WHERE operation_id = ? AND status = 'preparing'",
      ).run(new Date().toISOString(), operationId);
      if (applying.changes !== 1) throw new LibraryServiceError('LIBRARY_CORRUPT');

      for (const file of manifest.files) {
        if (!file.destinationConflict || file.destinationConflict.sourceExists === false) continue;
        const destinationPath = this.folderPath(openLibrary, file.destinationConflict.relativePath);
        const holdingPath = this.moveConflictHoldingPath(openLibrary, file.destinationConflict);
        mkdirSync(path.dirname(holdingPath), { recursive: true });
        renameSync(destinationPath, holdingPath);
      }
      this.failAt('crash-move-after-conflict');

      for (const file of manifest.files) {
        const sourcePath = this.folderPath(openLibrary, file.sourceRelativePath);
        const destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
        mkdirSync(path.dirname(destinationPath), { recursive: true });
        renameSync(sourcePath, destinationPath);
      }
      for (const file of manifest.files) {
        if (!file.restoreConflict || file.restoreConflict.sourceExists === false) continue;
        const holdingPath = this.moveConflictHoldingPath(openLibrary, file.restoreConflict);
        const restorePath = this.folderPath(openLibrary, file.sourceRelativePath);
        mkdirSync(path.dirname(restorePath), { recursive: true });
        renameSync(holdingPath, restorePath);
      }
      this.failAt('crash-move-after-filesystem');

      openLibrary.connection.transaction(() => {
        for (const file of manifest.files) {
          const conflict = file.destinationConflict;
          if (!conflict || conflict.kind !== 'managed' || !conflict.assetId || !conflict.trashFilename) continue;
          const trashRelativePath = `__trash__/${conflict.assetId}/${conflict.trashFilename}`;
          const changed = openLibrary.connection.prepare(
            `UPDATE assets SET relative_file_path = ?, managed_folder_id = NULL, path_identity = ?,
                    deleted_at = ?, trashed_from_relative_path = ?, trashed_from_folder_id = ?, updated_at = ?
              WHERE asset_id = ? AND deleted_at IS NULL`,
          ).run(trashRelativePath, portablePathIdentity(trashRelativePath), now,
            conflict.relativePath, conflict.managedFolderId, now, conflict.assetId);
          if (changed.changes !== 1) throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
          this.syncAssetSearchContent(openLibrary.connection, conflict.assetId);
        }
        for (const file of manifest.files) {
          const changed = openLibrary.connection.prepare(
            `UPDATE assets SET relative_file_path = ?, managed_folder_id = ?, path_identity = ?, updated_at = ?
              WHERE asset_id = ? AND location_kind = 'managed' AND deleted_at IS NULL`,
          ).run(file.destinationRelativePath, file.destinationFolderId,
            portablePathIdentity(file.destinationRelativePath), now, file.assetId);
          if (changed.changes !== 1) throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
          this.syncAssetSearchContent(openLibrary.connection, file.assetId);
        }
        for (const file of manifest.files) {
          const conflict = file.restoreConflict;
          if (!conflict || conflict.kind !== 'managed' || !conflict.assetId) continue;
          const changed = openLibrary.connection.prepare(
            `UPDATE assets SET relative_file_path = ?, managed_folder_id = ?, path_identity = ?,
                    deleted_at = NULL, trashed_from_relative_path = NULL,
                    trashed_from_folder_id = NULL, updated_at = ?
              WHERE asset_id = ? AND deleted_at IS NOT NULL`,
          ).run(conflict.relativePath, conflict.managedFolderId,
            portablePathIdentity(conflict.relativePath), now, conflict.assetId);
          if (changed.changes !== 1) throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
          this.syncAssetSearchContent(openLibrary.connection, conflict.assetId);
        }
        if (manifest.originalOperationId) {
          const consumed = openLibrary.connection.prepare(
            `UPDATE file_operations SET error_code = 'UNDONE', updated_at = ?
              WHERE operation_id = ? AND kind = 'managed-move' AND status = 'committed' AND error_code IS NULL`,
          ).run(now, manifest.originalOperationId);
          if (consumed.changes !== 1) throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
        }
        this.failAt('crash-move-before-db-commit');
        jobLease.assertCurrent();
        openLibrary.connection.prepare(
          "UPDATE file_operations SET status = 'committed', updated_at = ? WHERE operation_id = ?",
        ).run(new Date().toISOString(), operationId);
      })();
      this.failAt('crash-move-after-db-commit');

      if (manifest.kind === 'managed-move-undo') {
        this.removeOperation(operationPath);
        if (manifest.originalOperationId) this.removeOperation(path.join(operationsRoot, manifest.originalOperationId));
      }
    } catch (error) {
      if (error instanceof SimulatedCrashError) throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
      const row = openLibrary.connection.prepare(
        'SELECT status, manifest_json, error_code, operation_id FROM file_operations WHERE operation_id = ?',
      ).get(operationId) as OperationRow | undefined;
      if (row?.status === 'committed') {
        this.diagnose('asset.move.post-commit', error, { operationId, libraryId: openLibrary.summary.libraryId });
        return;
      }
      if (row) {
        try {
          this.recoverManagedMoveOperation(openLibrary, row, manifest, operationPath);
        } catch (recoveryError) {
          openLibrary.connection.prepare(
            "UPDATE file_operations SET status = 'failed', error_code = 'MOVE_APPLY_FAILED', updated_at = ? WHERE operation_id = ?",
          ).run(new Date().toISOString(), operationId);
          this.diagnose('asset.move.rollback', recoveryError, { operationId, libraryId: openLibrary.summary.libraryId });
        }
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    } finally {
      jobHeartbeat.stop();
      try {
        jobLease.release();
      } catch (releaseError) {
        this.diagnose('asset.move.lease-release', releaseError, {
          libraryId: openLibrary.summary.libraryId,
          operationId,
        });
      }
    }
  }

  public override managedMoveConflict(
    openLibrary: OpenLibrary,
    operationId: string,
    backupName: string,
    relativePath: string,
    excludedAssetId: string,
  ): ManagedMoveConflict | null {
    const identity = portablePathIdentity(relativePath);
    const active = openLibrary.connection.prepare(
      `SELECT asset_id, managed_folder_id, relative_file_path FROM assets
        WHERE path_identity = ? AND location_kind = 'managed' AND deleted_at IS NULL AND asset_id != ?`,
    ).get(identity, excludedAssetId) as {
      asset_id: string;
      managed_folder_id: string | null;
      relative_file_path: string;
    } | undefined;
    const disk = this.portableDiskDestination(openLibrary, relativePath);
    if (!active && !disk) return null;
    // Keep a metadata-only conflict when the DB row remains but its file has
    // disappeared. This lets keep-both/skip proceed and lets replace tombstone
    // the stale row without attempting an impossible filesystem rename.
    if (active && !disk) {
      return {
        assetId: active.asset_id,
        backupName,
        kind: 'managed',
        managedFolderId: active.managed_folder_id,
        operationId,
        relativePath,
        sourceExists: false,
        trashFilename: path.posix.basename(active.relative_file_path),
      };
    }
    if (disk && disk.size < 0) throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'UNSUPPORTED_FILE_ENTRY' });
    if (active) {
      return {
        assetId: active.asset_id,
        backupName,
        kind: 'managed',
        managedFolderId: active.managed_folder_id,
        operationId,
        relativePath: disk!.actualRelativePath,
        trashFilename: path.posix.basename(active.relative_file_path),
      };
    }
    return {
      assetId: null,
      backupName,
      kind: 'untracked',
      managedFolderId: null,
      operationId,
      relativePath: disk!.actualRelativePath,
      trashFilename: null,
    };
  }

  public override availableMoveDestination(
    openLibrary: OpenLibrary,
    relativePath: string,
    planned: Set<string>,
  ): string {
    const parent = path.posix.dirname(relativePath) === '.' ? '' : path.posix.dirname(relativePath);
    const filename = path.posix.basename(relativePath);
    const extension = path.posix.extname(filename);
    const base = extension ? filename.slice(0, -extension.length) : filename;
    for (let index = 2; index < Number.MAX_SAFE_INTEGER; index += 1) {
      const name = `${base} (${index})${extension}`;
      const candidate = parent ? path.posix.join(parent, name) : name;
      const identity = portablePathIdentity(candidate);
      if (planned.has(identity)) continue;
      const dbConflict = openLibrary.connection.prepare(
        "SELECT asset_id FROM assets WHERE path_identity = ? AND location_kind = 'managed' AND deleted_at IS NULL",
      ).get(identity);
      if (!dbConflict && !this.portableDiskDestination(openLibrary, candidate)) return candidate;
    }
    throw new LibraryServiceError('LIBRARY_NOT_WRITABLE');
  }

  override moveAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
  }): { movedCount: number; skippedCount: number; operationId: string | null; assets: AssetSummary[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    // 目标是链接文件夹（链接根或其虚拟子目录）：把 managed 资产复制进链接
    // 外部目录并注册为链接资产，再永久删除已复制的 managed 源——对用户而言
    // 等价于「移动到链接文件夹」，链接资产与 managed 资产同为目标（Serpent-f6f779）。
    const linkedTarget = input.targetFolderId === null
      ? null
      : this.linkedFolderRowForImport(openLibrary, input.targetFolderId);
    if (linkedTarget) {
      const managedSourceCount = sqliteAllInChunks<string, { count: number }>({
        connection: openLibrary.connection,
        values: input.assetIds,
        buildSql: (placeholders) =>
          `SELECT COUNT(*) AS count FROM assets
             WHERE asset_id IN (${placeholders})
               AND location_kind = 'managed' AND deleted_at IS NULL`,
      }).reduce((total, row) => total + row.count, 0);
      if (managedSourceCount !== input.assetIds.length) {
        // 链接资产移动到链接文件夹是另一场景，此处仅支持 managed → linked。
        throw new LibraryServiceError('INVALID_SELECTION');
      }
      const strategy = input.conflictStrategy ?? 'keep-both';
      const copy = this.copyAssetsToLinkedFolder({
        libraryId: input.libraryId,
        folderId: linkedTarget.folder_id,
        ...(linkedTarget.relative_path
          ? { relativePath: linkedTarget.relative_path }
          : {}),
        assetIds: input.assetIds,
        conflictStrategy: strategy,
      });
      // 只删除实际复制成功的源（skip 冲突的源保留在原位）。
      if (copy.copiedSourceAssetIds.length > 0) {
        this.deleteAssetsFromDisk({
          libraryId: input.libraryId,
          assetIds: copy.copiedSourceAssetIds,
        });
      }
      return {
        movedCount: copy.copiedCount,
        skippedCount: copy.skippedCount,
        operationId: null,
        assets: copy.assets,
      };
    }
    const targetFolder = input.targetFolderId === null ? undefined : this.targetFolder(openLibrary, input.targetFolderId);
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      relative_file_path: string;
      managed_folder_id: string | null;
      availability: 'available' | 'missing';
    }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, relative_file_path, managed_folder_id, availability FROM assets
          WHERE asset_id IN (${placeholders})
            AND location_kind = 'managed' AND deleted_at IS NULL`,
    });
    const byId = new Map(rows.map((row) => [row.asset_id, row]));
    for (const assetId of input.assetIds) {
      const row = byId.get(assetId);
      if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
      if (row.availability !== 'available') throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }

    const operationId = randomUUID();
    const selectedIds = new Set(input.assetIds);
    const planned = new Set<string>();
    const strategy = input.conflictStrategy ?? 'keep-both';
    const files: ManagedMoveOperationManifest['files'] = [];
    let skippedCount = 0;
    const targetPrefix = targetFolder?.relative_path ?? '';

    for (const assetId of input.assetIds) {
      const row = byId.get(assetId)!;
      if (!realFileExists(this.folderPath(openLibrary, row.relative_file_path))) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
      const filename = path.posix.basename(row.relative_file_path);
      let destinationRelativePath = targetPrefix ? path.posix.join(targetPrefix, filename) : filename;
      let identity = portablePathIdentity(destinationRelativePath);
      if (identity === portablePathIdentity(row.relative_file_path)) {
        skippedCount += 1;
        planned.add(identity);
        continue;
      }
      let conflict = this.managedMoveConflict(openLibrary, operationId, String(files.length), destinationRelativePath, assetId);
      const selectedConflict = conflict?.assetId ? selectedIds.has(conflict.assetId) : false;
      const batchConflict = planned.has(identity) || selectedConflict;
      if (batchConflict || conflict) {
        if (strategy === 'skip') {
          skippedCount += 1;
          continue;
        }
        if (strategy === 'keep-both' || batchConflict) {
          destinationRelativePath = this.availableMoveDestination(openLibrary, destinationRelativePath, planned);
          identity = portablePathIdentity(destinationRelativePath);
          conflict = null;
        }
      }
      planned.add(identity);
      files.push({
        assetId,
        destinationConflict: strategy === 'replace' ? conflict : null,
        destinationFolderId: targetFolder?.folder_id ?? null,
        destinationRelativePath,
        restoreConflict: null,
        sourceFolderId: row.managed_folder_id,
        sourceRelativePath: row.relative_file_path,
      });
    }

    if (files.length === 0) return { movedCount: 0, skippedCount, operationId: null, assets: [] };
    const manifest: ManagedMoveOperationManifest = {
      files,
      kind: 'managed-move',
      originalOperationId: null,
      version: 4,
    };
    this.applyManagedMoveOperation(openLibrary, operationId, manifest);
    this.noteClientFilesystemMutation();
    this.emitClientAssetsChanged(input.libraryId, files.length);
    return { movedCount: files.length, skippedCount, operationId,
      assets: this.managedMoveSummaries(openLibrary, files.map((file) => file.assetId)) };
  }

  override undoMoveAssets(input: {
    libraryId: string;
    operationId: string;
    conflictStrategy?: 'error' | 'keep-both' | 'replace' | 'skip';
  }): { undoneCount: number; skippedCount: number; assets: AssetSummary[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const operation = openLibrary.connection.prepare(
      `SELECT operation_id, status, manifest_json, error_code FROM file_operations
        WHERE operation_id = ? AND kind = 'managed-move'`,
    ).get(input.operationId) as OperationRow | undefined;
    if (!operation || operation.status !== 'committed' || operation.error_code !== null) {
      throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
    }
    const original = this.parseOperationManifest(operation.manifest_json);
    if (original.version !== 4 || original.kind !== 'managed-move') throw new LibraryServiceError('LIBRARY_CORRUPT');
    const undoOperationId = randomUUID();
    const strategy = input.conflictStrategy ?? 'error';
    const planned = new Set<string>();
    const files: ManagedMoveOperationManifest['files'] = [];
    let skippedCount = 0;

    for (const originalFile of original.files) {
      const current = openLibrary.connection.prepare(
        `SELECT relative_file_path, managed_folder_id, availability FROM assets
          WHERE asset_id = ? AND location_kind = 'managed' AND deleted_at IS NULL`,
      ).get(originalFile.assetId) as {
        relative_file_path: string;
        managed_folder_id: string | null;
        availability: 'available' | 'missing';
      } | undefined;
      if (!current || current.availability !== 'available' ||
        portablePathIdentity(current.relative_file_path) !== portablePathIdentity(originalFile.destinationRelativePath) ||
        !realFileExists(this.folderPath(openLibrary, current.relative_file_path))) {
        throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
      }
      if (originalFile.destinationConflict && originalFile.destinationConflict.sourceExists !== false &&
        !realFileExists(this.moveConflictHoldingPath(openLibrary, originalFile.destinationConflict))) {
        throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
      }

      let destinationRelativePath = originalFile.sourceRelativePath;
      let identity = portablePathIdentity(destinationRelativePath);
      let conflict = this.managedMoveConflict(openLibrary, undoOperationId, String(files.length), destinationRelativePath, originalFile.assetId);
      const hasConflict = planned.has(identity) || conflict !== null;
      if (hasConflict && strategy === 'error') throw new LibraryServiceError('ASSET_MOVE_CONFLICT');
      if (hasConflict && strategy === 'skip') {
        skippedCount += 1;
        continue;
      }
      if (hasConflict && strategy === 'keep-both') {
        destinationRelativePath = this.availableMoveDestination(openLibrary, destinationRelativePath, planned);
        identity = portablePathIdentity(destinationRelativePath);
        conflict = null;
      }
      planned.add(identity);
      files.push({
        assetId: originalFile.assetId,
        destinationConflict: strategy === 'replace' ? conflict : null,
        destinationFolderId: originalFile.sourceFolderId,
        destinationRelativePath,
        restoreConflict: originalFile.destinationConflict,
        sourceFolderId: current.managed_folder_id,
        sourceRelativePath: originalFile.destinationRelativePath,
      });
    }

    const manifest: ManagedMoveOperationManifest = {
      files,
      kind: 'managed-move-undo',
      originalOperationId: input.operationId,
      version: 4,
    };
    this.applyManagedMoveOperation(openLibrary, undoOperationId, manifest);
    this.noteClientFilesystemMutation();
    this.emitClientAssetsChanged(input.libraryId, files.length);
    return { undoneCount: files.length, skippedCount,
      assets: this.managedMoveSummaries(openLibrary, files.map((file) => file.assetId)) };
  }

  /**
   * Duplicate managed assets into a target folder (Option/Alt drag copy).
   * Creates new asset identities; clones human metadata + tags; does not clone
   * AI content, collections, or thumbnail binaries (regenerated via jobs).
   */
  override copyAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
    /** Internal history replay mapping; ordinary callers leave this unset. */
    outputAssetIds?: ReadonlyArray<{ sourceAssetId: string; newAssetId: string }>;
  }): {
    copiedCount: number;
    skippedCount: number;
    operationId: string | null;
    assets: AssetSummary[];
    outputAssetIdsBySource: Array<{ sourceAssetId: string; newAssetId: string }>;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    // 目标是链接文件夹（链接根或其虚拟子目录）：与 moveAssets 的链接分支对称，
    // 复制进链接外部目录并注册为链接资产（copyAssetsToLinkedFolder 支持 managed
    // 与 linked 源，Serpent-f6f779）。此分支需先于 linked 源分支判定，否则
    // 链接目标会落到 copyLinkedAssetsToManagedFolder 上。
    const copyLinkedTarget = input.targetFolderId === null
      ? null
      : this.linkedFolderRowForImport(openLibrary, input.targetFolderId);
    if (copyLinkedTarget) {
      const copied = this.copyAssetsToLinkedFolder({
        libraryId: input.libraryId,
        folderId: copyLinkedTarget.folder_id,
        ...(copyLinkedTarget.relative_path
          ? { relativePath: copyLinkedTarget.relative_path }
          : {}),
        assetIds: input.assetIds,
        conflictStrategy: input.conflictStrategy ?? 'keep-both',
      });
      return {
        copiedCount: copied.copiedCount,
        skippedCount: copied.skippedCount,
        operationId: null,
        assets: copied.assets,
        outputAssetIdsBySource: [],
      };
    }
    const locationRows = sqliteAllInChunks<string, { asset_id: string; location_kind: 'managed' | 'linked' }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, location_kind
           FROM assets
          WHERE asset_id IN (${placeholders})
            AND deleted_at IS NULL`,
    });
    if (locationRows.some((row) => row.location_kind === 'linked')) {
      if (
        locationRows.length !== input.assetIds.length ||
        locationRows.some((row) => row.location_kind !== 'linked')
      ) {
        throw new LibraryServiceError('INVALID_SELECTION');
      }
      const linkedCopy = this.copyLinkedAssetsToManagedFolder({
        libraryId: input.libraryId,
        assetIds: input.assetIds,
        targetFolderId: input.targetFolderId,
      });
      return {
        ...linkedCopy,
        operationId: null,
        outputAssetIdsBySource: [],
      };
    }
    const targetFolder = input.targetFolderId === null
      ? undefined
      : this.targetFolder(openLibrary, input.targetFolderId);
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      relative_file_path: string;
      managed_folder_id: string | null;
      availability: 'available' | 'missing';
    }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, relative_file_path, managed_folder_id, availability FROM assets
          WHERE asset_id IN (${placeholders})
            AND location_kind = 'managed' AND deleted_at IS NULL`,
    });
    const byId = new Map(rows.map((row) => [row.asset_id, row]));
    for (const assetId of input.assetIds) {
      const row = byId.get(assetId);
      if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
      if (row.availability !== 'available') {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
    }

    const operationId = randomUUID();
    const selectedIds = new Set(input.assetIds);
    const outputAssetIds = new Map<string, string>();
    for (const mapping of input.outputAssetIds ?? []) {
      if (
        !UUID.test(mapping.sourceAssetId)
        || !UUID.test(mapping.newAssetId)
        || !selectedIds.has(mapping.sourceAssetId)
        || outputAssetIds.has(mapping.sourceAssetId)
        || [...outputAssetIds.values()].includes(mapping.newAssetId)
      ) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      outputAssetIds.set(mapping.sourceAssetId, mapping.newAssetId);
    }
    if (outputAssetIds.size > 0) {
      const outputIds = [...outputAssetIds.values()];
      const existingOutputIds = withSqliteInPredicate(
        openLibrary.connection,
        'asset_id',
        outputIds,
        (sql, params) =>
          openLibrary.connection
            .prepare(
              `SELECT asset_id FROM assets
                 WHERE ${sql}`,
            )
            .all(...params) as Array<{ asset_id: string }>,
      );
      if (existingOutputIds.length > 0) {
        throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
      }
    }
    const planned = new Set<string>();
    const strategy = input.conflictStrategy ?? 'keep-both';
    const files: ManagedCopyOperationManifest['files'] = [];
    let skippedCount = 0;
    const targetPrefix = targetFolder?.relative_path ?? '';

    for (const assetId of input.assetIds) {
      const row = byId.get(assetId)!;
      if (!realFileExists(this.folderPath(openLibrary, row.relative_file_path))) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
      const filename = path.posix.basename(row.relative_file_path);
      let destinationRelativePath = targetPrefix
        ? path.posix.join(targetPrefix, filename)
        : filename;
      let identity = portablePathIdentity(destinationRelativePath);
      // Same-folder / same-path always needs a keep-both style rename.
      const sameAsSource = identity === portablePathIdentity(row.relative_file_path);
      let conflict = sameAsSource
        ? null
        : this.managedMoveConflict(
            openLibrary,
            operationId,
            String(files.length),
            destinationRelativePath,
            assetId,
          );
      const selectedConflict = conflict?.assetId ? selectedIds.has(conflict.assetId) : false;
      const batchConflict = planned.has(identity) || selectedConflict || sameAsSource;
      if (batchConflict || conflict) {
        if (strategy === 'skip' && !sameAsSource) {
          skippedCount += 1;
          continue;
        }
        if (strategy === 'keep-both' || batchConflict || sameAsSource) {
          destinationRelativePath = this.availableMoveDestination(
            openLibrary,
            destinationRelativePath,
            planned,
          );
          identity = portablePathIdentity(destinationRelativePath);
          conflict = null;
        }
      }
      planned.add(identity);
      files.push({
        sourceAssetId: assetId,
        newAssetId: outputAssetIds.get(assetId) ?? randomUUID(),
        destinationConflict: strategy === 'replace' && !sameAsSource ? conflict : null,
        destinationFolderId: targetFolder?.folder_id ?? null,
        destinationRelativePath,
        sourceRelativePath: row.relative_file_path,
      });
    }

    if (files.length === 0) {
      return { copiedCount: 0, skippedCount, operationId: null, assets: [], outputAssetIdsBySource: [] };
    }
    const manifest: ManagedCopyOperationManifest = {
      files,
      kind: 'managed-copy',
      originalOperationId: null,
      version: 5,
    };
    this.applyManagedCopyOperation(openLibrary, operationId, manifest);
    this.noteClientFilesystemMutation();
    return {
      copiedCount: files.length,
      skippedCount,
      operationId,
      assets: this.managedMoveSummaries(
        openLibrary,
        files.map((file) => file.newAssetId),
      ),
      outputAssetIdsBySource: files.map((file) => ({
        sourceAssetId: file.sourceAssetId,
        newAssetId: file.newAssetId,
      })),
    };
  }

  override undoCopyAssets(input: {
    libraryId: string;
    operationId: string;
    conflictStrategy?: 'error' | 'keep-both' | 'replace' | 'skip';
  }): { undoneCount: number; skippedCount: number; assets: AssetSummary[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const operation = openLibrary.connection.prepare(
      `SELECT operation_id, status, manifest_json, error_code FROM file_operations
        WHERE operation_id = ? AND kind = 'managed-copy'`,
    ).get(input.operationId) as OperationRow | undefined;
    if (!operation || operation.status !== 'committed' || operation.error_code !== null) {
      throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
    }
    const original = this.parseOperationManifest(operation.manifest_json);
    if (original.version !== 5 || original.kind !== 'managed-copy') {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const strategy = input.conflictStrategy ?? 'error';
    const toDelete: string[] = [];
    let skippedCount = 0;

    for (const file of original.files) {
      const current = openLibrary.connection.prepare(
        `SELECT relative_file_path, availability FROM assets
          WHERE asset_id = ? AND location_kind = 'managed' AND deleted_at IS NULL`,
      ).get(file.newAssetId) as {
        relative_file_path: string;
        availability: 'available' | 'missing';
      } | undefined;
      const pathMatches = current
        && portablePathIdentity(current.relative_file_path)
          === portablePathIdentity(file.destinationRelativePath);
      if (!current || current.availability !== 'available' || !pathMatches) {
        if (strategy === 'skip') {
          skippedCount += 1;
          continue;
        }
        throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
      }
      if (!realFileExists(this.folderPath(openLibrary, current.relative_file_path))) {
        if (strategy === 'skip') {
          skippedCount += 1;
          continue;
        }
        throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
      }
      toDelete.push(file.newAssetId);
    }

    if (toDelete.length === 0) {
      return { undoneCount: 0, skippedCount, assets: [] };
    }

    const summaries = this.managedMoveSummaries(openLibrary, toDelete);
    this.deleteActiveManagedAssetsFromDisk(openLibrary, toDelete);
    const now = new Date().toISOString();
    const consumed = openLibrary.connection.prepare(
      `UPDATE file_operations SET error_code = 'UNDONE', updated_at = ?
        WHERE operation_id = ? AND kind = 'managed-copy' AND status = 'committed' AND error_code IS NULL`,
    ).run(now, input.operationId);
    if (consumed.changes !== 1) {
      throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
    }
    const operationsRoot = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);
    this.removeOperation(path.join(operationsRoot, input.operationId));
    return { undoneCount: toDelete.length, skippedCount, assets: summaries };
  }

  public override applyManagedCopyOperation(
    openLibrary: OpenLibrary,
    operationId: string,
    manifest: ManagedCopyOperationManifest,
  ): void {
    const operationsRoot = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);
    const operationPath = path.join(operationsRoot, operationId);
    mkdirSync(path.join(operationPath, 'backup'), { recursive: true });
    this.assertSafeOperationPath(operationPath);
    const now = new Date().toISOString();
    openLibrary.connection.prepare(
      `INSERT INTO file_operations
         (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
       VALUES (?, ?, 'preparing', ?, NULL, ?, ?)`,
    ).run(operationId, manifest.kind, JSON.stringify(manifest), now, now);

    let jobLease: LibraryJobLease;
    try {
      jobLease = new LibraryWriteCoordinator(openLibrary.writeConnection, openLibrary.summary.libraryId)
        .claimJobOnce(operationId);
    } catch (error) {
      this.removeOperation(operationPath);
      if (error instanceof LibraryWriteCoordinatorError) {
        try {
          openLibrary.connection.prepare(
            `UPDATE file_operations
                SET status = 'failed', error_code = 'JOB_LEASE_BUSY', updated_at = ?
              WHERE operation_id = ? AND status = 'preparing'`,
          ).run(new Date().toISOString(), operationId);
        } catch {
          // Best-effort status update.
        }
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
    const jobHeartbeat: LibraryWriteLeaseHeartbeat = jobLease.startHeartbeat();

    try {
      this.failAt('crash-copy-before-filesystem');
      const applying = openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'applying', updated_at = ? WHERE operation_id = ? AND status = 'preparing'",
      ).run(new Date().toISOString(), operationId);
      if (applying.changes !== 1) throw new LibraryServiceError('LIBRARY_CORRUPT');

      for (const file of manifest.files) {
        if (!file.destinationConflict || file.destinationConflict.sourceExists === false) continue;
        const destinationPath = this.folderPath(openLibrary, file.destinationConflict.relativePath);
        const holdingPath = this.moveConflictHoldingPath(openLibrary, file.destinationConflict);
        mkdirSync(path.dirname(holdingPath), { recursive: true });
        renameSync(destinationPath, holdingPath);
      }
      this.failAt('crash-copy-after-conflict');

      for (const file of manifest.files) {
        const sourcePath = this.folderPath(openLibrary, file.sourceRelativePath);
        const destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
        mkdirSync(path.dirname(destinationPath), { recursive: true });
        copyFileSync(sourcePath, destinationPath, constants.COPYFILE_EXCL);
      }
      this.failAt('crash-copy-after-filesystem');

      openLibrary.connection.transaction(() => {
        for (const file of manifest.files) {
          const conflict = file.destinationConflict;
          if (!conflict || conflict.kind !== 'managed' || !conflict.assetId || !conflict.trashFilename) {
            continue;
          }
          const trashRelativePath = `__trash__/${conflict.assetId}/${conflict.trashFilename}`;
          const changed = openLibrary.connection.prepare(
            `UPDATE assets SET relative_file_path = ?, managed_folder_id = NULL, path_identity = ?,
                    deleted_at = ?, trashed_from_relative_path = ?, trashed_from_folder_id = ?, updated_at = ?
              WHERE asset_id = ? AND deleted_at IS NULL`,
          ).run(
            trashRelativePath,
            portablePathIdentity(trashRelativePath),
            now,
            conflict.relativePath,
            conflict.managedFolderId,
            now,
            conflict.assetId,
          );
          if (changed.changes !== 1) {
            throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
          }
          this.syncAssetSearchContent(openLibrary.connection, conflict.assetId);
        }

        for (const file of manifest.files) {
          const destinationPath = this.folderPath(openLibrary, file.destinationRelativePath);
          const fileStat = lstatSync(destinationPath, { bigint: true });
          const fileByteSize = Number(fileStat.size);
          if (!Number.isSafeInteger(fileByteSize)) {
            throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', {
              reason: 'UNSUPPORTED_FILE_ENTRY',
            });
          }
          const fileModifiedAt = new Date(Number(fileStat.mtimeMs)).toISOString();
          const revisionId = randomUUID();
          const pathIdentity = portablePathIdentity(file.destinationRelativePath);
          openLibrary.connection.prepare(
            `INSERT INTO assets
               (asset_id, location_kind, managed_folder_id, relative_file_path,
                path_identity, current_revision_id, availability, created_at, updated_at)
             VALUES (?, 'managed', ?, ?, ?, NULL, 'available', ?, ?)`,
          ).run(
            file.newAssetId,
            file.destinationFolderId,
            file.destinationRelativePath,
            pathIdentity,
            now,
            now,
          );
          openLibrary.connection.prepare(
            `INSERT INTO revisions
               (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                original_filename, origin, accepted_at)
             VALUES (?, ?, NULL, ?, ?, ?, 'import', ?)`,
          ).run(
            revisionId,
            file.newAssetId,
            fileByteSize,
            fileModifiedAt,
            path.posix.basename(file.destinationRelativePath),
            now,
          );
          openLibrary.connection.prepare(
            `UPDATE assets SET current_revision_id = ?, updated_at = ? WHERE asset_id = ?`,
          ).run(revisionId, now, file.newAssetId);

          const metadata = openLibrary.connection.prepare(
            `SELECT description, rating, favorite, palette, source_page_url, author
               FROM asset_metadata WHERE asset_id = ?`,
          ).get(file.sourceAssetId) as {
            description: string | null;
            rating: number;
            favorite: number;
            palette: string | null;
            source_page_url: string | null;
            author: string | null;
          } | undefined;
          if (metadata) {
            openLibrary.connection.prepare(
              `INSERT INTO asset_metadata
                 (asset_id, description, rating, favorite, palette,
                  source_page_url, author, entity_version, updated_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)`,
            ).run(
              file.newAssetId,
              metadata.description,
              metadata.rating,
              metadata.favorite,
              metadata.palette,
              metadata.source_page_url,
              metadata.author,
              now,
            );
          }

          const tags = openLibrary.connection.prepare(
            'SELECT tag_id FROM human_asset_tags WHERE asset_id = ?',
          ).all(file.sourceAssetId) as Array<{ tag_id: string }>;
          const insertTag = openLibrary.connection.prepare(
            'INSERT OR IGNORE INTO human_asset_tags (asset_id, tag_id) VALUES (?, ?)',
          );
          for (const tag of tags) {
            insertTag.run(file.newAssetId, tag.tag_id);
          }

          this.syncAssetSearchContent(openLibrary.connection, file.newAssetId);
        }

        this.failAt('crash-copy-before-db-commit');
        jobLease.assertCurrent();
        openLibrary.connection.prepare(
          "UPDATE file_operations SET status = 'committed', updated_at = ? WHERE operation_id = ?",
        ).run(new Date().toISOString(), operationId);
      })();
      this.failAt('crash-copy-after-db-commit');
    } catch (error) {
      if (error instanceof SimulatedCrashError) {
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
      }
      const row = openLibrary.connection.prepare(
        'SELECT status, manifest_json, error_code, operation_id FROM file_operations WHERE operation_id = ?',
      ).get(operationId) as OperationRow | undefined;
      if (row?.status === 'committed') {
        this.diagnose('asset.copy.post-commit', error, {
          operationId,
          libraryId: openLibrary.summary.libraryId,
        });
        return;
      }
      if (row) {
        try {
          this.recoverManagedCopyOperation(openLibrary, row, manifest, operationPath);
        } catch (recoveryError) {
          openLibrary.connection.prepare(
            "UPDATE file_operations SET status = 'failed', error_code = 'COPY_APPLY_FAILED', updated_at = ? WHERE operation_id = ?",
          ).run(new Date().toISOString(), operationId);
          this.diagnose('asset.copy.rollback', recoveryError, {
            operationId,
            libraryId: openLibrary.summary.libraryId,
          });
        }
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    } finally {
      jobHeartbeat.stop();
      try {
        jobLease.release();
      } catch (releaseError) {
        this.diagnose('asset.copy.lease-release', releaseError, {
          libraryId: openLibrary.summary.libraryId,
          operationId,
        });
      }
    }
  }

  /**
   * Read text for a text-classified asset with a hard byte cap (Serpent-sh7).
   * Managed and linked assets are editable. Trashed assets stay read-only.
   */
  public override textAssetPreviewCacheKey(
    libraryId: string,
    assetId: string,
    revisionId: string,
    maxBytes: number,
  ): string {
    return `${libraryId}\0${assetId}\0${revisionId}\0${maxBytes}`;
  }

  public override readCachedTextAssetPreview(
    key: string,
  ): {
    assetId: string;
    revisionId: string;
    content: string;
    truncated: boolean;
    byteSize: number;
    lineCount: number;
    editable: boolean;
    mimeType: string;
  } | undefined {
    const entry = this.textAssetPreviewCache.get(key);
    if (!entry) return undefined;
    // Map insertion order is used as a tiny LRU. Reinsert on a hit so a
    // frequently visible text card does not evict itself during a scroll.
    this.textAssetPreviewCache.delete(key);
    this.textAssetPreviewCache.set(key, entry);
    return entry.value;
  }

  public override cacheTextAssetPreview(
    key: string,
    value: {
      assetId: string;
      revisionId: string;
      content: string;
      truncated: boolean;
      byteSize: number;
      lineCount: number;
      editable: boolean;
      mimeType: string;
    },
  ): void {
    this.textAssetPreviewCache.delete(key);
    this.textAssetPreviewCache.set(key, { value });
    while (
      this.textAssetPreviewCache.size
      > LibraryService.TEXT_ASSET_PREVIEW_CACHE_LIMIT
    ) {
      const oldest = this.textAssetPreviewCache.keys().next().value;
      if (oldest === undefined) break;
      this.textAssetPreviewCache.delete(oldest);
    }
  }

  public override invalidateTextAssetPreviewCache(
    libraryId: string,
    assetId: string,
  ): void {
    const prefix = `${libraryId}\0${assetId}\0`;
    for (const key of this.textAssetPreviewCache.keys()) {
      if (key.startsWith(prefix)) this.textAssetPreviewCache.delete(key);
    }
  }

  public override clearTextAssetPreviewCache(libraryId: string): void {
    const prefix = `${libraryId}\0`;
    for (const key of this.textAssetPreviewCache.keys()) {
      if (key.startsWith(prefix)) this.textAssetPreviewCache.delete(key);
    }
  }

  override zipAssetAbsolutePath(input: { libraryId: string; assetId: string }): {
    absolutePath: string;
    revisionId: string;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT asset_id, relative_file_path, current_revision_id,
                availability, deleted_at
           FROM assets WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        asset_id: string;
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
      } | undefined;
    if (!row?.current_revision_id) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    const isTrashed = row.deleted_at !== null;
    if (!isTrashed && row.availability !== 'available') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (path.extname(row.relative_file_path).toLowerCase() !== '.zip') {
      throw new LibraryServiceError('UNSUPPORTED_MEDIA_TYPE');
    }
    const absolutePath = isTrashed
      ? this.trashPath(
          openLibrary,
          row.asset_id,
          path.posix.basename(row.relative_file_path),
        )
      : this.resolveAssetPath(input.libraryId, input.assetId);
    return { absolutePath, revisionId: row.current_revision_id };
  }

  override async listZipEntries(input: { libraryId: string; assetId: string }): Promise<{
    assetId: string;
    revisionId: string;
    status: 'ready' | 'unreadable';
    truncated: boolean;
    files: Array<{ index: number; name: string; uncompressedSize: number }>;
  }> {
    const located = this.zipAssetAbsolutePath(input);
    try {
      const listing = await listZipArchiveFiles(located.absolutePath);
      return {
        assetId: input.assetId,
        revisionId: located.revisionId,
        status: listing.status,
        truncated: listing.truncated,
        files: listing.files,
      };
    } catch {
      return {
        assetId: input.assetId,
        revisionId: located.revisionId,
        status: 'unreadable',
        truncated: false,
        files: [],
      };
    }
  }

  override async readZipEntry(input: { libraryId: string; assetId: string; index: number }): Promise<{
    assetId: string;
    index: number;
    name: string;
    uncompressedSize: number;
    kind: 'image' | 'text' | 'unavailable';
    mimeType?: string;
    bytesBase64?: string;
    text?: string;
    truncated?: boolean;
  }> {
    const located = this.zipAssetAbsolutePath(input);
    const entry = await readZipArchiveEntry(located.absolutePath, input.index);
    if (!entry) {
      return {
        assetId: input.assetId,
        index: input.index,
        name: 'entry',
        uncompressedSize: 0,
        kind: 'unavailable',
      };
    }
    return { assetId: input.assetId, index: input.index, ...entry };
  }

  override readTextAsset(input: {
    libraryId: string;
    assetId: string;
    maxBytes?: number;
  }): {
    assetId: string;
    revisionId: string;
    content: string;
    truncated: boolean;
    byteSize: number;
    lineCount: number;
    editable: boolean;
    mimeType: string;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, relative_file_path, current_revision_id,
                availability, deleted_at
           FROM assets WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
      } | undefined;
    if (!row) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    const isTrashed = row.deleted_at !== null;
    if (!row.current_revision_id) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (!isTrashed && row.availability !== 'available') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (detectMediaType(row.relative_file_path) !== 'text') {
      throw new LibraryServiceError('UNSUPPORTED_MEDIA_TYPE');
    }

    const absolutePath = isTrashed
      ? this.trashPath(
          openLibrary,
          row.asset_id,
          path.posix.basename(row.relative_file_path),
        )
      : this.resolveAssetPath(input.libraryId, input.assetId);
    const maxBytes = Math.min(
      Math.max(1, input.maxBytes ?? TEXT_VIEWER_MAX_BYTES),
      TEXT_VIEWER_MAX_BYTES,
    );
    const cacheKey = this.textAssetPreviewCacheKey(
      input.libraryId,
      input.assetId,
      row.current_revision_id,
      maxBytes,
    );
    const cached = this.readCachedTextAssetPreview(cacheKey);
    if (cached) return cached;
    let buffer: Buffer;
    try {
      const fd = openSync(absolutePath, 'r');
      try {
        const stat = fstatSync(fd);
        const toRead = Math.min(Number(stat.size), maxBytes + 1);
        buffer = Buffer.alloc(toRead);
        const bytesRead = readSync(fd, buffer, 0, toRead, 0);
        buffer = buffer.subarray(0, bytesRead);
      } finally {
        closeSync(fd);
      }
    } catch (error) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', {
        reason: 'SOURCE_NOT_FOUND',
        cause: error,
      });
    }

    const truncated = buffer.length > maxBytes;
    const slice = truncated ? buffer.subarray(0, maxBytes) : buffer;
    const decoded = decodeTextBytes(slice);
    if (
      decoded.binary
      || (
        slice.includes(0)
        && decoded.encoding !== 'utf-16le'
        && decoded.encoding !== 'utf-16be'
      )
    ) {
      throw new LibraryServiceError('ASSET_CONTENT_INVALID');
    }
    const content = decoded.text;
    const extension = path.extname(row.relative_file_path).toLowerCase();
    const value = {
      assetId: row.asset_id,
      revisionId: row.current_revision_id,
      content,
      truncated,
      byteSize: truncated ? maxBytes : buffer.length,
      lineCount: countTextLines(content),
      editable: !isTrashed,
      mimeType: textMimeForExtension(extension) ?? 'text/plain',
    };
    this.cacheTextAssetPreview(cacheKey, value);
    return value;
  }

  /**
   * Save UTF-8 text back to the asset source. Managed files stay inside the
   * library. Linked files are written to their source path. Trashed assets
   * are rejected.
   */
  override saveTextAsset(input: {
    libraryId: string;
    assetId: string;
    content: string;
    expectedRevisionId?: string;
    createRevision?: boolean;
  }): {
    asset: AssetSummary;
    revisionId: string;
    byteSize: number;
    lineCount: number;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (Buffer.byteLength(input.content, 'utf8') > TEXT_SAVE_MAX_BYTES) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }

    const row = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, relative_file_path, current_revision_id,
                availability, deleted_at
           FROM assets WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
      } | undefined;
    if (!row || row.deleted_at || row.availability !== 'available' || !row.current_revision_id) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (detectMediaType(row.relative_file_path) !== 'text') {
      throw new LibraryServiceError('UNSUPPORTED_MEDIA_TYPE');
    }
    if (
      input.expectedRevisionId &&
      input.expectedRevisionId !== row.current_revision_id
    ) {
      throw new LibraryServiceError('VERSION_CONFLICT');
    }

    const absolutePath = this.resolveAssetPath(input.libraryId, input.assetId);
    const dir = path.dirname(absolutePath);
    const tmpPath = path.join(dir, `.serpent-text-edit-${randomUUID()}.tmp`);
    const payload = Buffer.from(input.content, 'utf8');
    this.noteClientFilesystemMutation();
    try {
      writeFileSync(tmpPath, payload);
      const fd = openSync(tmpPath, 'r+');
      try {
        fsyncSync(fd);
      } finally {
        closeSync(fd);
      }
      renameSync(tmpPath, absolutePath);
    } catch (error) {
      try {
        rmSync(tmpPath, { force: true });
      } catch {
        // Best-effort cleanup.
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }

    // Persist the filesystem mtime/size so a subsequent watcher refresh does not
    // invent an `external_change` revision and break the next expectedRevisionId.
    let fileStat: Stats | BigIntStats;
    try {
      fileStat = this.options.assetLstat
        ? this.options.assetLstat(absolutePath)
        : lstatSync(absolutePath, { bigint: true });
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    const storedByteSize = Number(fileStat.size);
    if (!Number.isSafeInteger(storedByteSize)) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE');
    }
    const modifiedAt = new Date(Number(fileStat.mtimeMs)).toISOString();
    const now = new Date().toISOString();
    const previousRevisionId = row.current_revision_id;
    const createRevision = input.createRevision === true;
    const revisionId = createRevision ? randomUUID() : previousRevisionId;
    openLibrary.connection.transaction(() => {
      if (createRevision) {
        openLibrary.connection
          .prepare(
            `INSERT INTO revisions
               (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                original_filename, origin, accepted_at)
             VALUES (?, ?, ?, ?, ?, ?, 'replace', ?)`,
          )
          .run(
            revisionId,
            input.assetId,
            previousRevisionId,
            storedByteSize,
            modifiedAt,
            path.posix.basename(row.relative_file_path),
            now,
          );
        openLibrary.connection
          .prepare(
            `UPDATE assets
                SET current_revision_id = ?, updated_at = ?
              WHERE asset_id = ?`,
          )
          .run(revisionId, now, input.assetId);
        openLibrary.connection
          .prepare(
            `UPDATE revision_artifacts
                SET invalidated_at = ?
              WHERE revision_id = ?
                AND invalidated_at IS NULL`,
          )
          .run(now, previousRevisionId);
      } else {
        openLibrary.connection
          .prepare(
            `UPDATE revisions
                SET byte_size = ?, modified_at = ?
              WHERE revision_id = ?`,
          )
          .run(storedByteSize, modifiedAt, revisionId);
        openLibrary.connection
          .prepare(`UPDATE assets SET updated_at = ? WHERE asset_id = ?`)
          .run(now, input.assetId);
        openLibrary.connection
          .prepare(
            `UPDATE revision_artifacts
                SET invalidated_at = ?
              WHERE revision_id = ?
                AND invalidated_at IS NULL`,
          )
          .run(now, revisionId);
      }
      this.syncAssetSearchContent(openLibrary.connection, input.assetId);
    })();

    const [asset] = this.managedMoveSummaries(openLibrary, [input.assetId]);
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
    this.invalidateTextAssetPreviewCache(input.libraryId, input.assetId);
    this.options.onAssetsChanged?.({
      type: 'asset.changed',
      libraryId: input.libraryId,
      changedCount: 1,
      missingCount: 0,
      source: 'text-save',
    });
    return {
      asset,
      revisionId,
      byteSize: storedByteSize,
      lineCount: countTextLines(input.content),
    };
  }

  /**
   * Append one bounded chunk to a Worker-owned content staging entry. The
   * token is opaque to callers and never resolves to a filesystem path.
   */
  override stageManagedAssetContent(input: {
    libraryId: string;
    assetId: string;
    stagingToken?: string;
    dataBase64: string;
    complete: boolean;
  }): {
    assetId: string;
    stagingToken: string;
    byteSize: number;
    complete: boolean;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (
      input.dataBase64.length === 0
      || input.dataBase64.length % 4 !== 0
      || !/^[A-Za-z0-9+/]*={0,2}$/u.test(input.dataBase64)
    ) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    const payload = Buffer.from(input.dataBase64, 'base64');
    if (payload.length === 0 || payload.length > CONTENT_REPLACE_STAGE_CHUNK_MAX_BYTES) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    const row = openLibrary.connection
      .prepare(`SELECT asset_id, location_kind, linked_folder_id, availability, deleted_at, current_revision_id
           FROM assets WHERE asset_id = ?`)
      .get(input.assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
        current_revision_id: string | null;
      } | undefined;
    if (
      !row ||
      row.availability !== 'available' ||
      row.deleted_at !== null ||
      row.current_revision_id === null
    ) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (row.location_kind === 'linked') {
      const linkedFolder = openLibrary.connection
        .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE folder_id = ?')
        .get(row.linked_folder_id) as {
          absolute_root_path: string;
          status: 'available' | 'offline';
        } | undefined;
      if (
        !linkedFolder ||
        linkedFolder.status !== 'available' ||
        this.linkedRootIsGone(linkedFolder.absolute_root_path)
      ) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
    }

    const stagingToken = input.stagingToken ?? randomUUID();
    if (!UUID.test(stagingToken)) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    const stagingRoot = path.join(openLibrary.summary.libraryPath, '.serpent', 'content-staging');
    mkdirSync(stagingRoot, { recursive: true });
    const stagedPath = path.join(stagingRoot, `${stagingToken}.bin`);
    const metadataPath = path.join(stagingRoot, `${stagingToken}.json`);
    let metadata: { assetId: string; byteSize: number; complete: boolean } | undefined;
    try {
      const parsed = JSON.parse(readFileSync(metadataPath, 'utf8')) as unknown;
      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        !('assetId' in parsed) ||
        typeof parsed.assetId !== 'string' ||
        !('byteSize' in parsed) ||
        typeof parsed.byteSize !== 'number' ||
        !Number.isSafeInteger(parsed.byteSize) ||
        !('complete' in parsed) ||
        typeof parsed.complete !== 'boolean'
      ) {
        throw new Error('Invalid content staging metadata.');
      }
      metadata = {
        assetId: parsed.assetId,
        byteSize: parsed.byteSize,
        complete: parsed.complete,
      };
    } catch (error) {
      if (!isMissingPathError(error)) {
        throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
      }
    }
    if (metadata !== undefined && metadata.assetId !== input.assetId) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    if (metadata?.complete === true) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    let existingByteSize = metadata?.byteSize ?? 0;
    let stagedByteSize: number | undefined;
    try {
      const entry = lstatSync(stagedPath);
      if (!entry.isFile() || entry.isSymbolicLink()) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      const byteSize = Number(entry.size);
      if (!Number.isSafeInteger(byteSize) || byteSize < 0) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      stagedByteSize = byteSize;
      if (metadata === undefined) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      if (!isMissingPathError(error)) throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
      if (metadata !== undefined) throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    if (metadata !== undefined && stagedByteSize !== metadata.byteSize) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const descriptor = openSync(stagedPath, 'a', 0o600);
    try {
      writeSync(descriptor, payload);
      fsyncSync(descriptor);
    } finally {
      closeSync(descriptor);
    }
    existingByteSize += payload.length;
    const nextMetadata = JSON.stringify({
      assetId: input.assetId,
      byteSize: existingByteSize,
      complete: input.complete,
    });
    const metadataTempPath = `${metadataPath}.tmp-${randomUUID()}`;
    try {
      writeFileSync(metadataTempPath, nextMetadata, { encoding: 'utf8', mode: 0o600 });
      renameSync(metadataTempPath, metadataPath);
    } catch (error) {
      rmSync(metadataTempPath, { force: true });
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    return {
      assetId: input.assetId,
      stagingToken,
      byteSize: existingByteSize,
      complete: input.complete,
    };
  }

  /**
   * Replace the bytes of an available managed asset without changing its
   * asset identity or filename. The previous revision remains only as a
   * database record; its derived artifacts are invalidated and the new
   * revision is always marked as a client replacement.
   */
  override replaceManagedAssetContent(input: {
    libraryId: string;
    assetId: string;
    dataBase64: string;
    expectedRevisionId?: string;
  }): {
    assetId: string;
    revisionId: string;
    byteSize: number;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    if (
      input.dataBase64.length === 0
      || input.dataBase64.length % 4 !== 0
      || !/^[A-Za-z0-9+/]*={0,2}$/u.test(input.dataBase64)
    ) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }

    const payload = Buffer.from(input.dataBase64, 'base64');

    const row = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, linked_folder_id, relative_file_path, current_revision_id,
                availability, deleted_at
           FROM assets WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
      } | undefined;
    if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (row.deleted_at !== null || row.availability !== 'available' || !row.current_revision_id) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (row.location_kind === 'linked') {
      const linkedFolder = openLibrary.connection
        .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE folder_id = ?')
        .get(row.linked_folder_id) as {
          absolute_root_path: string;
          status: 'available' | 'offline';
        } | undefined;
      if (
        !linkedFolder ||
        linkedFolder.status !== 'available' ||
        this.linkedRootIsGone(linkedFolder.absolute_root_path)
      ) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
    }
    if (
      input.expectedRevisionId !== undefined
      && input.expectedRevisionId !== row.current_revision_id
    ) {
      throw new LibraryServiceError('VERSION_CONFLICT');
    }

    const absolutePath = this.resolveAssetPath(input.libraryId, input.assetId);
    const dir = path.dirname(absolutePath);
    const tmpPath = path.join(dir, `.serpent-content-replace-${randomUUID()}.tmp`);
    this.noteClientFilesystemMutation();
    try {
      writeFileSync(tmpPath, payload);
      const fd = openSync(tmpPath, 'r+');
      try {
        fsyncSync(fd);
      } finally {
        closeSync(fd);
      }
      renameSync(tmpPath, absolutePath);
    } catch (error) {
      try {
        rmSync(tmpPath, { force: true });
      } catch {
        // Best-effort cleanup.
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }

    let fileStat: Stats | BigIntStats;
    try {
      fileStat = this.options.assetLstat
        ? this.options.assetLstat(absolutePath)
        : lstatSync(absolutePath, { bigint: true });
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    const storedByteSize = Number(fileStat.size);
    if (!Number.isSafeInteger(storedByteSize)) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE');
    }
    const modifiedAt = new Date(Number(fileStat.mtimeMs)).toISOString();
    const now = new Date().toISOString();
    const revisionId = randomUUID();
    openLibrary.connection.transaction(() => {
      openLibrary.connection
        .prepare(
          `INSERT INTO revisions
             (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
              original_filename, origin, accepted_at)
           VALUES (?, ?, ?, ?, ?, ?, 'replace', ?)`,
        )
        .run(
          revisionId,
          input.assetId,
          row.current_revision_id,
          storedByteSize,
          modifiedAt,
          path.posix.basename(row.relative_file_path),
          now,
        );
      openLibrary.connection
        .prepare(
          `UPDATE assets
              SET current_revision_id = ?, updated_at = ?
            WHERE asset_id = ?`,
        )
        .run(revisionId, now, input.assetId);
      openLibrary.connection
        .prepare(
          `UPDATE revision_artifacts
              SET invalidated_at = ?
            WHERE revision_id = ?
              AND invalidated_at IS NULL`,
        )
        .run(now, row.current_revision_id);
      this.syncAssetSearchContent(openLibrary.connection, input.assetId);
    })();

    if (this.thumbnailEligible(input.libraryId, row.relative_file_path)) {
      this.enqueueThumbnailJobs(input.libraryId, {
        assetIds: [input.assetId],
        priority: 300,
        repairFailed: true,
      });
    }
    this.options.onAssetsChanged?.({
      type: 'asset.changed',
      libraryId: input.libraryId,
      changedCount: 1,
      missingCount: 0,
      source: 'content-replace',
    });
    return {
      assetId: input.assetId,
      revisionId,
      byteSize: storedByteSize,
    };
  }

  /**
   * Replace several managed assets under one change-sequence fence. Every
   * expected revision and every staged source is validated before the first
   * destination is touched. The v6 file_operations manifest is a recovery
   * journal, not a claim of cross-file filesystem atomicity.
   */
  override replaceManagedAssetContentBatch(input: {
    libraryId: string;
    items: Array<{
      assetId: string;
      expectedRevisionId: string;
      dataBase64?: string;
      stagingToken?: string;
    }>;
    automationPlan?: {
      planHash: string;
      expectedChangeSequence: number;
      assetStates: Array<{ assetId: string; stateToken: string }>;
    };
  }): {
    operationId: string;
    items: Array<{ assetId: string; revisionId: string; byteSize: number }>;
  } {
    if (
      input.items.length === 0 ||
      input.items.length > CONTENT_REPLACE_BATCH_MAX_ITEMS ||
      new Set(input.items.map((item) => item.assetId)).size !== input.items.length ||
      input.items.some((item) => (
        (item.dataBase64 === undefined) === (item.stagingToken === undefined)
      ))
    ) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    if (input.automationPlan !== undefined) {
      this.validateAutomationFileOperationPlan({
        libraryId: input.libraryId,
        operation: 'replace-content',
        assetIds: input.items.map((item) => item.assetId),
        planHash: input.automationPlan.planHash,
        expectedChangeSequence: input.automationPlan.expectedChangeSequence,
        assetStates: input.automationPlan.assetStates,
      });
    }
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const itemIds = input.items.map((item) => item.assetId);
    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'assets.asset_id',
      itemIds,
      (sql, params) =>
        openLibrary.connection.prepare(
          `SELECT assets.asset_id, assets.location_kind, assets.linked_folder_id, assets.relative_file_path, assets.current_revision_id,
                  revisions.modified_at AS current_modified_at,
                  availability, deleted_at
             FROM assets
             LEFT JOIN revisions ON revisions.revision_id = assets.current_revision_id
            WHERE ${sql}`,
        ).all(...params) as Array<{
          asset_id: string;
          location_kind: 'managed' | 'linked';
          linked_folder_id: string | null;
          relative_file_path: string;
          current_revision_id: string | null;
          availability: 'available' | 'missing';
          deleted_at: string | null;
          current_modified_at: string | null;
        }>,
    );
    const rowById = new Map(rows.map((row) => [row.asset_id, row]));
    for (const item of input.items) {
      const row = rowById.get(item.assetId);
      if (
        !row ||
        row.deleted_at !== null ||
        row.availability !== 'available' ||
        row.current_revision_id === null
      ) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
      if (row.location_kind === 'linked') {
        const linkedFolder = openLibrary.connection
          .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE folder_id = ?')
          .get(row.linked_folder_id) as {
            absolute_root_path: string;
            status: 'available' | 'offline';
          } | undefined;
        if (
          !linkedFolder ||
          linkedFolder.status !== 'available' ||
          this.linkedRootIsGone(linkedFolder.absolute_root_path)
        ) {
          throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
        }
      }
      if (row.current_revision_id !== item.expectedRevisionId) {
        throw new LibraryServiceError('VERSION_CONFLICT');
      }
    }

    const operationId = randomUUID();
    const operationPath = path.join(
      this.assertSafeOperationsRoot(openLibrary.summary.libraryPath),
      operationId,
    );
    const stagePath = path.join(operationPath, 'stage');
    const backupPath = path.join(operationPath, 'backup');
    const manifest: ContentReplaceBatchOperationManifest = {
      kind: 'content-replace-batch',
      version: 6,
      files: [],
    };
    const resultItems: Array<{ assetId: string; revisionId: string; byteSize: number }> = [];
    mkdirSync(stagePath, { recursive: true });
    mkdirSync(backupPath, { recursive: true });
    try {
      for (const [index, item] of input.items.entries()) {
        const row = rowById.get(item.assetId)!;
        const stageName = `${index}.stage`;
        const stageFilePath = path.join(stagePath, stageName);
        if (item.dataBase64 !== undefined) {
          if (
            item.dataBase64.length === 0 ||
            item.dataBase64.length % 4 !== 0 ||
            !/^[A-Za-z0-9+/]*={0,2}$/u.test(item.dataBase64)
          ) {
            throw new LibraryServiceError('INVALID_ASSET_METADATA');
          }
          const payload = Buffer.from(item.dataBase64, 'base64');
          if (payload.length === 0) {
            throw new LibraryServiceError('INVALID_ASSET_METADATA');
          }
          writeFileSync(stageFilePath, payload, { mode: 0o600 });
        } else {
          const stagingToken = item.stagingToken!;
          if (!UUID.test(stagingToken)) throw new LibraryServiceError('INVALID_ASSET_METADATA');
          const stagingRoot = path.join(openLibrary.summary.libraryPath, '.serpent', 'content-staging');
          const stagedPath = path.join(stagingRoot, `${stagingToken}.bin`);
          const metadataPath = path.join(stagingRoot, `${stagingToken}.json`);
          let metadata: unknown;
          let stagedByteSize: number | undefined;
          try {
            metadata = JSON.parse(readFileSync(metadataPath, 'utf8')) as unknown;
            const entry = lstatSync(stagedPath);
            if (!entry.isFile() || entry.isSymbolicLink()) throw new Error('Invalid staged content.');
            const byteSize = Number(entry.size);
            if (!Number.isSafeInteger(byteSize) || byteSize < 0) {
              throw new Error('Invalid staged content length.');
            }
            stagedByteSize = byteSize;
          } catch (error) {
            throw new LibraryServiceError('INVALID_ASSET_METADATA', { cause: error });
          }
          if (
            typeof metadata !== 'object' ||
            metadata === null ||
            !('assetId' in metadata) ||
            metadata.assetId !== item.assetId ||
            !('byteSize' in metadata) ||
            typeof metadata.byteSize !== 'number' ||
            !Number.isSafeInteger(metadata.byteSize) ||
            metadata.byteSize <= 0 ||
            !('complete' in metadata) ||
            metadata.complete !== true
          ) {
            throw new LibraryServiceError('INVALID_ASSET_METADATA');
          }
          if (stagedByteSize !== metadata.byteSize) {
            throw new LibraryServiceError('INVALID_ASSET_METADATA');
          }
          copyFileSync(stagedPath, stageFilePath);
        }
        const stat = lstatSync(stageFilePath);
        const byteSize = Number(stat.size);
        if (!Number.isSafeInteger(byteSize) || byteSize <= 0) {
          throw new LibraryServiceError('INVALID_ASSET_METADATA');
        }
        const revisionId = randomUUID();
        manifest.files.push({
          assetId: item.assetId,
          backupName: `${index}.backup`,
          destinationRelativePath: row.relative_file_path,
          newRevisionId: revisionId,
          originalModifiedAt: row.current_modified_at ?? (() => {
            throw new LibraryServiceError('LIBRARY_CORRUPT');
          })(),
          originalSha256: sha256FileAtPath(this.resolveAssetPath(input.libraryId, item.assetId)),
          previousRevisionId: row.current_revision_id!,
          sha256: sha256FileAtPath(stageFilePath),
          stageName,
        });
        resultItems.push({ assetId: item.assetId, revisionId, byteSize });
      }

      const now = new Date().toISOString();
      openLibrary.connection.prepare(
        `INSERT INTO file_operations
           (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
         VALUES (?, 'content-replace-batch', 'preparing', ?, NULL, ?, ?)`,
      ).run(operationId, JSON.stringify(manifest), now, now);
      const jobLease = new LibraryWriteCoordinator(openLibrary.writeConnection, input.libraryId)
        .claimJobOnce(operationId);
      const jobHeartbeat = jobLease.startHeartbeat();
      try {
        openLibrary.connection.prepare(
          `UPDATE file_operations SET status = 'applying', updated_at = ? WHERE operation_id = ? AND status = 'preparing'`,
        ).run(new Date().toISOString(), operationId);
        for (const file of manifest.files) {
          const destinationPath = this.resolveAssetPath(input.libraryId, file.assetId);
          this.options.beforeContentReplaceBatchBackup?.({
            assetId: file.assetId,
            libraryId: input.libraryId,
          });
          if (sha256FileAtPath(destinationPath) !== file.originalSha256) {
            throw new LibraryServiceError('VERSION_CONFLICT', { reason: 'SOURCE_CHANGED' });
          }
          copyFileSync(destinationPath, path.join(backupPath, file.backupName));
        }
        this.failAt('crash-content-replace-batch-after-backup');
        for (const file of manifest.files) {
          const destinationPath = this.resolveAssetPath(input.libraryId, file.assetId);
          if (sha256FileAtPath(destinationPath) !== file.originalSha256) {
            throw new LibraryServiceError('VERSION_CONFLICT', { reason: 'SOURCE_CHANGED' });
          }
          const temporaryPath = path.join(
            path.dirname(destinationPath),
            `.serpent-content-replace-batch-${operationId}-${file.assetId}.tmp`,
          );
          copyFileSync(path.join(stagePath, file.stageName), temporaryPath);
          const descriptor = openSync(temporaryPath, 'r+');
          try {
            fsyncSync(descriptor);
          } finally {
            closeSync(descriptor);
          }
          this.noteClientFilesystemMutation();
          renameSync(temporaryPath, destinationPath);
          this.failAt('crash-content-replace-batch-after-first-file');
        }
        this.failAt('crash-content-replace-batch-before-db-commit');
        const committedAt = new Date().toISOString();
        openLibrary.connection.transaction(() => {
          for (const file of manifest.files) {
            const destinationPath = this.resolveAssetPath(input.libraryId, file.assetId);
            const fileStat = lstatSync(destinationPath, { bigint: true });
            const storedByteSize = Number(fileStat.size);
            if (!Number.isSafeInteger(storedByteSize)) {
              throw new LibraryServiceError('LIBRARY_NOT_WRITABLE');
            }
            openLibrary.connection.prepare(
              `INSERT INTO revisions
                 (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                  original_filename, origin, accepted_at)
               VALUES (?, ?, ?, ?, ?, ?, 'replace', ?)`,
            ).run(
              file.newRevisionId,
              file.assetId,
              file.previousRevisionId,
              storedByteSize,
              new Date(Number(fileStat.mtimeMs)).toISOString(),
              path.posix.basename(file.destinationRelativePath),
              committedAt,
            );
            const changed = openLibrary.connection.prepare(
              `UPDATE assets SET current_revision_id = ?, updated_at = ?
                 WHERE asset_id = ? AND current_revision_id = ?`,
            ).run(file.newRevisionId, committedAt, file.assetId, file.previousRevisionId);
            if (changed.changes !== 1) {
              throw new LibraryServiceError('VERSION_CONFLICT');
            }
            openLibrary.connection.prepare(
              `UPDATE revision_artifacts SET invalidated_at = ?
                 WHERE revision_id = ? AND invalidated_at IS NULL`,
            ).run(committedAt, file.previousRevisionId);
            this.syncAssetSearchContent(openLibrary.connection, file.assetId);
          }
          jobLease.assertCurrent();
          openLibrary.connection.prepare(
            `UPDATE file_operations SET status = 'committed', updated_at = ? WHERE operation_id = ?`,
          ).run(committedAt, operationId);
        })();
        this.failAt('crash-content-replace-batch-after-db-commit');
      } catch (error) {
        if (error instanceof SimulatedCrashError) throw error;
        const row = openLibrary.connection.prepare(
          `SELECT status, manifest_json, error_code, operation_id FROM file_operations WHERE operation_id = ?`,
        ).get(operationId) as OperationRow | undefined;
        if (row?.status === 'committed') {
          this.diagnose('asset.content-replace-batch.post-commit', error, {
            operationId,
            libraryId: input.libraryId,
          });
        } else if (row) {
          try {
            this.recoverContentReplaceBatchOperation(openLibrary, row, manifest, operationPath);
          } catch (recoveryError) {
            openLibrary.connection.prepare(
              `UPDATE file_operations SET status = 'failed', error_code = 'CONTENT_REPLACE_APPLY_FAILED', updated_at = ? WHERE operation_id = ?`,
            ).run(new Date().toISOString(), operationId);
            this.diagnose('asset.content-replace-batch.rollback', recoveryError, {
              operationId,
              libraryId: input.libraryId,
            });
          }
        }
        throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
      } finally {
        jobHeartbeat.stop();
        try {
          jobLease.release();
        } catch (releaseError) {
          this.diagnose('asset.content-replace-batch.lease-release', releaseError, {
            operationId,
            libraryId: input.libraryId,
          });
        }
      }
    } catch (error) {
      if (error instanceof SimulatedCrashError) {
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
      }
      const operationRow = openLibrary.connection.prepare(
        'SELECT status, error_code FROM file_operations WHERE operation_id = ?',
      ).get(operationId) as { status: string; error_code: string | null } | undefined;
      // A recovery conflict deliberately retains the journal so the external
      // destination change remains explainable and can be resolved explicitly.
      if (operationRow?.status !== 'failed' || operationRow.error_code !== 'CONTENT_REPLACE_RECOVERY_CONFLICT') {
        this.removeOperation(operationPath);
      }
      throw error;
    }

    this.removeOperation(operationPath);
    const stagingRoot = path.join(openLibrary.summary.libraryPath, '.serpent', 'content-staging');
    for (const item of input.items) {
      if (item.stagingToken === undefined) continue;
      rmSync(path.join(stagingRoot, `${item.stagingToken}.bin`), { force: true });
      rmSync(path.join(stagingRoot, `${item.stagingToken}.json`), { force: true });
    }
    this.enqueueThumbnailJobs(input.libraryId, {
      assetIds: resultItems.map((item) => item.assetId),
      priority: 300,
      repairFailed: true,
    });
    this.options.onAssetsChanged?.({
      type: 'asset.changed',
      libraryId: input.libraryId,
      changedCount: resultItems.length,
      missingCount: 0,
      source: 'content-replace',
    });
    return { operationId, items: resultItems };
  }

  /**
   * Read a bounded prefix of an available managed asset. The absolute source
   * path remains inside the Worker and only opaque revision/content metadata
   * crosses the automation boundary.
   */
  override readManagedAssetContent(input: {
    libraryId: string;
    assetId: string;
    maxBytes?: number;
    offsetBytes?: number;
  }): {
    assetId: string;
    revisionId: string;
    byteSize: number;
    dataBase64: string;
    truncated: boolean;
    mimeType: string | null;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const row = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, relative_file_path, current_revision_id,
                availability, deleted_at
           FROM assets WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
      } | undefined;
    if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (row.deleted_at !== null || row.availability !== 'available' || !row.current_revision_id) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    const offsetBytes = input.offsetBytes ?? 0;
    if (!Number.isSafeInteger(offsetBytes) || offsetBytes < 0) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    const limitBytes = input.maxBytes;
    if (limitBytes !== undefined && (!Number.isSafeInteger(limitBytes) || limitBytes <= 0)) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }

    const absolutePath = this.resolveAssetPath(input.libraryId, input.assetId);
    const extension = path.extname(row.relative_file_path).toLowerCase();
    const mimeType = directImageMimeForExtension(extension)
      ?? videoMimeForExtension(extension)
      ?? audioMimeForExtension(extension)
      ?? textMimeForExtension(extension);
    let descriptor: number | undefined;
    try {
      descriptor = openSync(absolutePath, 'r');
      const stats = fstatSync(descriptor);
      const byteSize = Number(stats.size);
      if (!Number.isSafeInteger(byteSize)) {
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE');
      }
      const readStart = Math.min(offsetBytes, byteSize);
      const bytesToRead = limitBytes === undefined
        ? byteSize - readStart
        : Math.min(limitBytes, byteSize - readStart);
      const buffer = Buffer.allocUnsafe(bytesToRead);
      let filled = 0;
      while (filled < bytesToRead) {
        const count = readSync(descriptor, buffer, filled, bytesToRead - filled, readStart + filled);
        if (count === 0) break;
        filled += count;
      }
      const payload = filled === buffer.length ? buffer : buffer.subarray(0, filled);
      return {
        assetId: row.asset_id,
        revisionId: row.current_revision_id,
        byteSize,
        dataBase64: payload.toString('base64'),
        truncated: readStart + payload.length < byteSize,
        mimeType,
      };
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND', cause: error });
    } finally {
      if (descriptor !== undefined) closeSync(descriptor);
    }
  }

  /**
   * REQ-MENU-002 / REQ-LABEL-002: renaming an asset's display name IS renaming
   * its real file, so this goes through file-operation semantics. The normal
   * automation path still accepts a base name, while the desktop inline editor
   * may provide the complete file name and intentionally change the extension.
   * A changed extension invalidates the old derived media artifacts so the
   * asset is reclassified from its new name.
   *
   * Crash-safety convention follows trashAssets for single-scope file moves:
   * rename on disk first, then one DB transaction (path + FTS sync); on DB
   * failure the disk rename is rolled back best-effort. Content is untouched,
   * so — exactly like moveAssets/trashAssets — no revision row is recorded.
   */
  override renameAssetFile(input: {
    libraryId: string;
    assetId: string;
    newBaseName?: string;
    newFileName?: string;
  }): { asset: AssetSummary } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, [input.assetId]);
    if (
      (input.newBaseName === undefined && input.newFileName === undefined) ||
      (input.newBaseName !== undefined && input.newFileName !== undefined)
    ) {
      throw new LibraryServiceError('INVALID_ASSET_FILE_NAME', {
        reason: 'NAME_NOT_SUPPORTED',
      });
    }
    let requestedName: string;
    try {
      requestedName = normalizeAssetFileBaseName(
        input.newFileName ?? input.newBaseName!,
      );
    } catch (error) {
      throw new LibraryServiceError('INVALID_ASSET_FILE_NAME', {
        reason: 'NAME_NOT_SUPPORTED',
        cause: error,
      });
    }

    const row = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, linked_folder_id, relative_file_path,
                current_revision_id, availability, deleted_at
           FROM assets
          WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        linked_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string;
        availability: 'available' | 'missing';
        deleted_at: string | null;
      } | undefined;
    if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    // Trashed, missing, and otherwise unavailable assets are rejected with the
    // same typed shape moveAssets uses for non-available sources.
    if (row.deleted_at !== null || row.availability !== 'available') {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }
    if (row.location_kind === 'linked') {
      const linkedFolder = openLibrary.connection
        .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE folder_id = ?')
        .get(row.linked_folder_id) as {
          absolute_root_path: string;
          status: 'available' | 'offline';
        } | undefined;
      if (
        !linkedFolder ||
        linkedFolder.status !== 'available' ||
        this.linkedRootIsGone(linkedFolder.absolute_root_path)
      ) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
    }

    const currentFileName = path.posix.basename(row.relative_file_path);
    const extension = path.posix.extname(currentFileName);
    const newFileName = input.newFileName === undefined
      ? `${requestedName}${extension}`
      : requestedName;
    // The filesystem limit applies to the whole component, not just the base.
    if (Buffer.byteLength(newFileName, 'utf8') > 255) {
      throw new LibraryServiceError('INVALID_ASSET_FILE_NAME', {
        reason: 'NAME_NOT_SUPPORTED',
        cause: new LibraryInputError(
          'INVALID_ASSET_FILE_NAME',
          'File name with its extension must not exceed 255 bytes.',
        ),
      });
    }
    const currentDirectory = path.posix.dirname(row.relative_file_path);
    const newRelativePath =
      currentDirectory === '.' ? newFileName : path.posix.join(currentDirectory, newFileName);

    // Identical target (same spelling, same case): success no-op, nothing on
    // disk or in the DB is touched.
    if (newFileName === currentFileName) {
      const [asset] = this.managedMoveSummaries(openLibrary, [row.asset_id]);
      if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
      return { asset };
    }

    const sourcePath = row.location_kind === 'managed'
      ? this.folderPath(openLibrary, row.relative_file_path)
      : this.linkedAssetPath(openLibrary, row.linked_folder_id, row.relative_file_path);
    if (!realFileExists(sourcePath)) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
    }

    // Conflicts are judged by portable (case-folded) identity so a case-only
    // match against a DIFFERENT file is still a conflict on case-insensitive
    // volumes; the source file's own directory entry is exempt, which is what
    // makes a pure case-change rename (a.png -> A.png) possible.
    const newIdentity = portablePathIdentity(newRelativePath);
    const dbConflict = row.location_kind === 'managed'
      ? openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE path_identity = ? AND location_kind = 'managed'
                AND deleted_at IS NULL AND asset_id != ?`,
          )
          .get(newIdentity, row.asset_id)
      : openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE linked_folder_id = ? AND path_identity = ? AND location_kind = 'linked'
                AND deleted_at IS NULL AND asset_id != ?`,
          )
          .get(row.linked_folder_id, newIdentity, row.asset_id);
    if (dbConflict) throw new LibraryServiceError('ASSET_FILE_NAME_CONFLICT');

    const parentDirectoryPath = path.dirname(sourcePath);
    const targetSegmentIdentity = portablePathSegmentIdentity(newFileName);
    let directoryEntries;
    try {
      directoryEntries = readdirSync(parentDirectoryPath, { withFileTypes: true });
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    for (const entry of directoryEntries) {
      if (entry.name === currentFileName) continue;
      if (portablePathSegmentIdentity(entry.name) === targetSegmentIdentity) {
        throw new LibraryServiceError('ASSET_FILE_NAME_CONFLICT');
      }
    }

    const destinationPath = path.join(parentDirectoryPath, newFileName);
    const now = new Date().toISOString();
    let renamed = false;
    this.noteClientFilesystemMutation();
    try {
      renameSync(sourcePath, destinationPath);
      renamed = true;
      openLibrary.connection.transaction(() => {
        const changed = openLibrary.connection
          .prepare(
            `UPDATE assets
                SET relative_file_path = ?, path_identity = ?, updated_at = ?
              WHERE asset_id = ? AND deleted_at IS NULL`,
          )
          .run(newRelativePath, newIdentity, now, row.asset_id);
        if (changed.changes !== 1) {
          throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_CHANGED' });
        }
        this.syncAssetSearchContent(openLibrary.connection, row.asset_id);
        if (path.extname(currentFileName).toLowerCase() !== path.extname(newFileName).toLowerCase()) {
          openLibrary.connection
            .prepare(
              `UPDATE revision_artifacts
                  SET invalidated_at = ?
                WHERE revision_id = ? AND invalidated_at IS NULL`,
            )
            .run(now, row.current_revision_id);
        }
      })();
    } catch (error) {
      if (renamed) {
        try {
          renameSync(destinationPath, sourcePath);
        } catch (rollbackError) {
          // The DB transaction did not commit; if the filesystem rollback also
          // failed the asset reconciles to 'missing' on the next refresh and
          // can be relinked. Never mask the primary failure.
          this.diagnose('asset.rename-file.rollback', rollbackError, {
            libraryId: input.libraryId,
            assetId: row.asset_id,
          });
        }
      }
      if (isMissingPathError(error)) {
        throw new LibraryServiceError('ASSET_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND', cause: error });
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    const [asset] = this.managedMoveSummaries(openLibrary, [row.asset_id]);
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');
    this.options.onAssetsChanged?.({
      type: 'asset.changed',
      libraryId: input.libraryId,
      changedCount: 1,
      missingCount: 0,
      source: 'client',
    });
    return { asset };
  }

  /** Worker-only precondition value for the reversible file-name recipe. */
  override getAssetFileBaseName(input: { libraryId: string; assetId: string }): string {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const row = openLibrary.connection.prepare(
      'SELECT relative_file_path FROM assets WHERE asset_id = ?',
    ).get(input.assetId) as { relative_file_path: string } | undefined;
    if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    const fileName = path.posix.basename(row.relative_file_path);
    const extension = path.posix.extname(fileName);
    return extension.length === 0 ? fileName : fileName.slice(0, -extension.length);
  }

  /** Worker-only precondition value for complete-file-name rename history. */
  override getAssetFileName(input: { libraryId: string; assetId: string }): string {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const row = openLibrary.connection.prepare(
      'SELECT relative_file_path FROM assets WHERE asset_id = ?',
    ).get(input.assetId) as { relative_file_path: string } | undefined;
    if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    return path.posix.basename(row.relative_file_path);
  }

  /**
   * Batch convenience over the crash-safe single-file rename primitive.
   * Every successful item has the same disk-first / DB-rollback protection as
   * `renameAssetFile`; failures that are local to one item are returned for
   * the script to inspect, while an infrastructure failure stops the batch so
   * it cannot be mistaken for a normal name conflict.
   */
  override renameAssetFiles(input: {
    libraryId: string;
    items: Array<{ assetId: string; newBaseName: string }>;
  }): {
    renamedCount: number;
    skipped: Array<{
      assetId: string;
      reason: 'asset_not_found' | 'asset_unavailable' | 'name_conflict' | 'invalid_name';
    }>;
    assets: AssetSummary[];
  } {
    if (input.items.length === 0 || new Set(input.items.map((item) => item.assetId)).size !== input.items.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const assets: AssetSummary[] = [];
    const skipped: Array<{
      assetId: string;
      reason: 'asset_not_found' | 'asset_unavailable' | 'name_conflict' | 'invalid_name';
    }> = [];
    for (const item of input.items) {
      try {
        assets.push(this.renameAssetFile({
          libraryId: input.libraryId,
          assetId: item.assetId,
          newBaseName: item.newBaseName,
        }).asset);
      } catch (error) {
        if (!(error instanceof LibraryServiceError)) throw error;
        if (error.code === 'ASSET_FILE_NAME_CONFLICT') {
          skipped.push({ assetId: item.assetId, reason: 'name_conflict' });
          continue;
        }
        if (error.code === 'INVALID_ASSET_FILE_NAME') {
          skipped.push({ assetId: item.assetId, reason: 'invalid_name' });
          continue;
        }
        if (error.code === 'ASSET_NOT_FOUND') {
          skipped.push({
            assetId: item.assetId,
            reason: error.reason === 'SOURCE_NOT_FOUND' ? 'asset_unavailable' : 'asset_not_found',
          });
          continue;
        }
        throw error;
      }
    }
    return { renamedCount: assets.length, skipped, assets };
  }

  public override expandAssetIdsToSequenceMembers(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
  ): string[] {
    const uniqueIds = [...new Set(assetIds)];
    if (uniqueIds.length === 0) return [];
    const sequenceRows = sqliteAllInChunks<string, { sequence_id: string }>({
      connection: openLibrary.connection,
      values: uniqueIds,
      buildSql: (placeholders) =>
        `SELECT DISTINCT sequence_id
           FROM asset_sequence_frames
          WHERE asset_id IN (${placeholders})`,
    });
    if (sequenceRows.length === 0) return uniqueIds;
    const memberRows = sqliteAllInChunks<string, { asset_id: string }>({
      connection: openLibrary.connection,
      values: sequenceRows.map((row) => row.sequence_id),
      buildSql: (placeholders) =>
        `SELECT DISTINCT asset_id
           FROM asset_sequence_frames
          WHERE sequence_id IN (${placeholders})`,
    });
    return [...new Set([...uniqueIds, ...memberRows.map((row) => row.asset_id)])];
  }

  /**
   * Visible unit count for toasts/badges: one sequence group counts as 1,
   * regardless of how many member frames were expanded for the mutation.
   */
  public override countLogicalAssetUnits(
    openLibrary: OpenLibrary,
    assetIds: readonly string[],
  ): number {
    const uniqueIds = [...new Set(assetIds)];
    if (uniqueIds.length === 0) return 0;
    const memberships = sqliteAllInChunks<
      string,
      { asset_id: string; sequence_id: string }
    >({
      connection: openLibrary.connection,
      values: uniqueIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, sequence_id
           FROM asset_sequence_frames
          WHERE asset_id IN (${placeholders})`,
    });
    const inSequence = new Set(memberships.map((row) => row.asset_id));
    const sequences = new Set(memberships.map((row) => row.sequence_id));
    const standalone = uniqueIds.filter((id) => !inSequence.has(id)).length;
    return sequences.size + standalone;
  }

  override trashAssets(input: {
    libraryId: string;
    assetIds: string[];
    /** Folder deletion intentionally includes assets hidden by ignore rules. */
    allowExplicitlyIgnored?: boolean;
    operationId?: string;
  }): { trashedCount: number; operationId: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    if (!input.allowExplicitlyIgnored) {
      this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    }
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const logicalCount = this.countLogicalAssetUnits(
      openLibrary,
      input.assetIds,
    );
    const assetIds = this.expandAssetIdsToSequenceMembers(
      openLibrary,
      input.assetIds,
    );
    if (assetIds.length === 0 || new Set(assetIds).size !== assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }

    // Validate all assets are managed, active, and exist.
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      relative_file_path: string;
      managed_folder_id: string | null;
    }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT a.asset_id, a.relative_file_path, a.managed_folder_id
           FROM assets a
          WHERE a.asset_id IN (${placeholders})
            AND a.location_kind = 'managed'
            AND a.deleted_at IS NULL`,
    });

    const foundIds = new Set(rows.map((r) => r.asset_id));
    for (const id of assetIds) {
      if (!foundIds.has(id)) {
        const exists = openLibrary.connection
          .prepare('SELECT location_kind, deleted_at FROM assets WHERE asset_id = ?')
          .get(id) as { location_kind: string; deleted_at: string | null } | undefined;
        if (!exists) throw new LibraryServiceError('ASSET_NOT_FOUND');
        if (exists.location_kind !== 'managed') throw new LibraryServiceError('ASSET_NOT_MANAGED');
        if (exists.deleted_at !== null) throw new LibraryServiceError('ASSET_ALREADY_TRASHED');
      }
    }

    const movedEntries: Array<{
      assetId: string;
      originalPath: string;
      trashName: string;
    }> = [];
    const operationId = input.operationId ?? randomUUID();
    const totalDeleteFiles = rows.length;
    let deletedFilesProcessed = 0;
    const deleteThrottle = createProgressThrottle();
    this.emitDeleteProgress({
      operationId,
      libraryId: input.libraryId,
      kind: 'trash',
      phase: 'run',
      filesProcessed: 0,
      totalFiles: totalDeleteFiles,
    });

    try {
      // Phase 1: move files to trash when the source still exists on disk.
      // Already-missing managed assets are metadata-only trash rows.
      for (const row of rows) {
        const filename = path.posix.basename(row.relative_file_path);
        const sourcePath = this.folderPath(openLibrary, row.relative_file_path);
        let sourceExists = false;
        try {
          const sourceStat = lstatSync(sourcePath, { bigint: true });
          sourceExists = sourceStat.isFile() && !sourceStat.isSymbolicLink();
        } catch (error) {
          if (!isUnreadablePathError(error)) {
            throw new LibraryServiceError('LIBRARY_IO_ERROR', { reason: 'IO_ERROR', cause: error });
          }
        }
        if (!sourceExists) {
          deletedFilesProcessed += 1;
          continue;
        }

        const trashDir = path.join(openLibrary.summary.libraryPath, '.serpent', 'trash', row.asset_id);
        mkdirSync(trashDir, { recursive: true });
        const trashFilePath = path.join(trashDir, filename);
        renameSync(sourcePath, trashFilePath);
        movedEntries.push({
          assetId: row.asset_id,
          originalPath: sourcePath,
          trashName: filename,
        });
        deletedFilesProcessed += 1;
        if (deleteThrottle.shouldEmit(deletedFilesProcessed === totalDeleteFiles)) {
          this.emitDeleteProgress({
            operationId,
            libraryId: input.libraryId,
            kind: 'trash',
            phase: 'run',
            filesProcessed: deletedFilesProcessed,
            totalFiles: totalDeleteFiles,
          });
        }
      }

      // Phase 2: write file_operations + update DB in a single transaction
      const now = new Date().toISOString();
      const trashRelativePrefix = '__trash__';

      openLibrary.connection.transaction(() => {
        // Keep sequence membership so trash lists one sequence card and restore
        // can bring the whole run back intact (Serpent-vijg).
        const manifest: OperationManifest = {
          version: 1,
          files: rows.map((row) => ({
            backupName: row.asset_id,
            destinationRelativePath: `${trashRelativePrefix}/${row.asset_id}/${path.posix.basename(row.relative_file_path)}`,
            hadDestination: false,
            stageName: row.asset_id,
          })),
          directories: [],
        };

        openLibrary.connection
          .prepare(
            `INSERT INTO file_operations
               (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
             VALUES (?, 'trash', 'committed', ?, NULL, ?, ?)`,
          )
          .run(operationId, JSON.stringify(manifest), now, now);

        for (const row of rows) {
          const filename = path.posix.basename(row.relative_file_path);
          const trashRelativePath = `${trashRelativePrefix}/${row.asset_id}/${filename}`;
          const trashPathIdentity = portablePathIdentity(trashRelativePath);

          openLibrary.connection
            .prepare(
              `UPDATE assets
                  SET relative_file_path = ?, managed_folder_id = NULL,
                      path_identity = ?, deleted_at = ?,
                      trashed_from_relative_path = ?, trashed_from_folder_id = ?,
                      updated_at = ?
                WHERE asset_id = ?`,
            )
            .run(
              trashRelativePath,
              trashPathIdentity,
              now,
              row.relative_file_path,
              row.managed_folder_id,
              now,
              row.asset_id,
            );
          this.syncAssetSearchContent(openLibrary.connection, row.asset_id);
        }
      })();

      // Soft-delete is a library mutation, not only a local UI action. Emit
      // after the filesystem move and DB transaction both succeed so other
      // renderer windows, plugins, and automation refresh their trash count.
      this.emitClientAssetsChanged(input.libraryId, assetIds.length);

      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'trash',
        phase: 'complete',
        filesProcessed: totalDeleteFiles,
        totalFiles: totalDeleteFiles,
      });
      return { trashedCount: logicalCount, operationId };
    } catch (error) {
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'trash',
        phase: 'failed',
        filesProcessed: deletedFilesProcessed,
        totalFiles: totalDeleteFiles,
      });
      // Rollback filesystem: move trashed files back
      for (const entry of [...movedEntries].reverse()) {
        try {
          const trashDir = path.join(openLibrary.summary.libraryPath, '.serpent', 'trash', entry.assetId);
          const trashFilePath = path.join(trashDir, entry.trashName);
          if (existsSync(trashFilePath)) {
            mkdirSync(path.dirname(entry.originalPath), { recursive: true });
            renameSync(trashFilePath, entry.originalPath);
          }
        } catch {
          // Best-effort rollback; the DB transaction was not committed.
        }
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  /**
   * Desktop-only mixed trash batch. The Worker owns the selection snapshot,
   * parent/child collapse, forward execution, compensation and one history
   * entry; the Renderer never loops individual trash commands.
   */
  override trashSelection(input: {
    libraryId: string;
    assetIds: readonly string[];
    folderIds: readonly string[];
    source?: HistorySource;
    sourceReference?: string | null;
  }): TrashSelectionResult {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const assetIds = [...input.assetIds];
    const folderIds = [...input.folderIds];
    if (assetIds.length === 0 && folderIds.length === 0) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    if (
      new Set(assetIds).size !== assetIds.length
      || new Set(folderIds).size !== folderIds.length
      || assetIds.length > 10_000
      || folderIds.length > 10_000
    ) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }

    // Resolve and collapse folders before touching either the filesystem or
    // the history table. Selecting a parent and child is one logical target.
    const folderRows = folderIds.map((folderId) => {
      const row = openLibrary.connection.prepare(
        'SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?',
      ).get(folderId) as ManagedFolderRow | undefined;
      if (!row) throw new LibraryServiceError('FOLDER_NOT_FOUND');
      if (!realDirectoryExists(this.folderPath(openLibrary, row.relative_path))) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND', { reason: 'SOURCE_NOT_FOUND' });
      }
      return row;
    });
    const roots = folderRows.filter((row) => !folderRows.some((other) => (
      other.folder_id !== row.folder_id
      && isPortablePathEqualOrDescendant(row.relative_path, other.relative_path)
      && portablePathIdentity(row.relative_path) !== portablePathIdentity(other.relative_path)
    )));

    const subtreeAssetIds = new Set<string>();
    const folderPlans = roots.map((root) => {
      const subtree = this.collectManagedFolderSubtree(openLibrary, root.folder_id);
      for (const assetId of subtree.assetIds) subtreeAssetIds.add(assetId);
      const tombstoneFolders = [...subtree.descendantFolders, subtree.folder];
      const tombstoneIds = tombstoneFolders.map(() => randomUUID());
      const rootTombstoneId = tombstoneIds[tombstoneFolders.length - 1];
      if (!rootTombstoneId) throw new LibraryServiceError('LIBRARY_CORRUPT');
      return {
        folderId: root.folder_id,
        operationId: randomUUID(),
        tombstoneIds,
        rootTombstoneId,
      };
    });

    // An explicit asset inside a selected folder is already covered by that
    // folder step. Assets outside selected subtrees retain normal single-asset
    // trash validation, including ignore rules.
    const independentAssetIds = assetIds.filter((assetId) => !subtreeAssetIds.has(assetId));
    if (independentAssetIds.length > 0) {
      this.assertAssetsNotExplicitlyIgnored(openLibrary, independentAssetIds);
      const rows = withSqliteInPredicate(
        openLibrary.connection,
        'asset_id',
        independentAssetIds,
        (sql, params) =>
          openLibrary.connection.prepare(
            `SELECT asset_id, location_kind, deleted_at
               FROM assets
              WHERE ${sql}`,
          ).all(...params) as Array<{
            asset_id: string;
            location_kind: string;
            deleted_at: string | null;
          }>,
      );
      const rowById = new Map(rows.map((row) => [row.asset_id, row]));
      for (const assetId of independentAssetIds) {
        const row = rowById.get(assetId);
        if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
        if (row.location_kind !== 'managed') {
          throw new LibraryServiceError('ASSET_NOT_MANAGED');
        }
        if (row.deleted_at !== null) {
          throw new LibraryServiceError('ASSET_ALREADY_TRASHED');
        }
      }
    }

    type AssetPlan = { assetIds: string[]; operationId: string };
    type FolderPlan = (typeof folderPlans)[number];
    const assetPlans: AssetPlan[] = independentAssetIds.length === 0
      ? []
      : [{ assetIds: independentAssetIds, operationId: randomUUID() }];
    const historySteps: OperationHistoryGroupStepInput[] = [
      ...assetPlans.map((plan) => ({
        commandId: 'asset.trash',
        affectedEntities: plan.assetIds,
        forwardRecipe: {
          kind: 'asset-trash',
          version: 1,
          payload: { assetIds: plan.assetIds },
        } satisfies HistoryRecipe,
        inverseRecipe: {
          kind: 'asset-trash-undo',
          version: 1,
          payload: { operationId: plan.operationId },
        } satisfies HistoryRecipe,
      })),
      ...folderPlans.map((plan: FolderPlan) => ({
        commandId: 'folder.trash',
        affectedEntities: [plan.folderId],
        forwardRecipe: {
          kind: 'managed-folder-trash',
          version: 1,
          payload: { folderId: plan.folderId },
        } satisfies HistoryRecipe,
        inverseRecipe: {
          kind: 'managed-folder-restore',
          version: 1,
          payload: { tombstoneId: plan.rootTombstoneId },
        } satisfies HistoryRecipe,
      })),
    ];
    const affectedEntities = [...independentAssetIds, ...roots.map((row) => row.folder_id)];
    const history = this.recordOperationHistoryGroup({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: 'selection.trash',
      labelKey: 'history.selection.trash',
      labelArgs: { assets: 0, folders: roots.length },
      affectedCount: roots.length + independentAssetIds.length,
      affectedEntities,
      steps: historySteps,
      commit: false,
    });
    const completed: Array<
      | { kind: 'asset'; operationId: string }
      | { kind: 'folder'; tombstoneId: string }
    > = [];
    let trashedAssetCount = 0;
    let removedFolderCount = 0;
    try {
      for (const plan of assetPlans) {
        const result = this.trashAssets({
          libraryId: input.libraryId,
          assetIds: plan.assetIds,
          operationId: plan.operationId,
        });
        trashedAssetCount += result.trashedCount;
        completed.push({ kind: 'asset', operationId: result.operationId });
      }
      for (const plan of folderPlans) {
        const result = this.trashManagedFolder({
          libraryId: input.libraryId,
          folderId: plan.folderId,
          operationId: plan.operationId,
          tombstoneIds: plan.tombstoneIds,
        });
        trashedAssetCount += result.trashedAssetCount;
        removedFolderCount += result.removedFolderCount;
        completed.push({ kind: 'folder', tombstoneId: result.rootTombstoneId });
      }
      // Update the label only after the real logical counts are known. This is
      // a display projection; the recipes and entity set remain unchanged.
      openLibrary.connection.prepare(
        'UPDATE operation_history SET label_args_json = ?, affected_count = ?, updated_at = ? WHERE history_entry_id = ?',
      ).run(
        JSON.stringify({ assets: trashedAssetCount, folders: roots.length }),
        roots.length + trashedAssetCount,
        new Date().toISOString(),
        history.historyEntryId,
      );
      this.completeOperationHistoryGroup(input.libraryId, history.historyEntryId);
      return {
        historyEntryId: history.historyEntryId,
        removedFolderCount,
        trashedAssetCount,
        trashedFolderCount: roots.length,
      };
    } catch (error) {
      let compensationFailed = false;
      for (const step of [...completed].reverse()) {
        try {
          if (step.kind === 'asset') {
            this.undoTrashAssets({
              libraryId: input.libraryId,
              operationId: step.operationId,
              requireAll: true,
            });
          } else {
            this.restoreTrashedManagedFolder({
              libraryId: input.libraryId,
              tombstoneId: step.tombstoneId,
            });
          }
        } catch (rollbackError) {
          compensationFailed = true;
          this.diagnose('selection.trash.rollback', rollbackError, {
            libraryId: input.libraryId,
            historyEntryId: history.historyEntryId,
            stepKind: step.kind,
          });
        }
      }
      if (compensationFailed) {
        this.markOperationHistoryGroupStale(
          input.libraryId,
          history.historyEntryId,
          'BATCH_COMPENSATION_FAILED',
        );
      } else {
        this.discardOperationHistoryGroup(input.libraryId, history.historyEntryId);
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  override previewRestoreAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId?: string | null;
  }): { hasNameConflicts: boolean } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const assetIds = input.assetIds;
    if (assetIds.length === 0 || new Set(assetIds).size !== assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }

    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      relative_file_path: string;
      deleted_at: string;
      trashed_from_relative_path: string;
      trashed_from_folder_id: string | null;
    }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT a.asset_id, a.relative_file_path, a.deleted_at,
                a.trashed_from_relative_path, a.trashed_from_folder_id
           FROM assets a
          WHERE a.asset_id IN (${placeholders})
            AND a.deleted_at IS NOT NULL`,
    });

    const foundIds = new Set(rows.map((r) => r.asset_id));
    for (const id of assetIds) {
      if (!foundIds.has(id)) {
        const exists = openLibrary.connection
          .prepare('SELECT asset_id FROM assets WHERE asset_id = ?')
          .get(id);
        if (!exists) throw new LibraryServiceError('ASSET_NOT_FOUND');
        throw new LibraryServiceError('ASSET_NOT_TRASHED');
      }
    }

    const rowById = new Map(rows.map((row) => [row.asset_id, row]));
    const orderedRows = assetIds.map((assetId) => rowById.get(assetId)!);

    const hasExplicitTarget = input.targetFolderId !== undefined;
    let targetFolder: ManagedFolderRow | undefined;
    if (typeof input.targetFolderId === 'string') {
      targetFolder = this.targetFolder(openLibrary, input.targetFolderId);
    }

    for (const row of orderedRows) {
      const filename = path.posix.basename(row.trashed_from_relative_path);

      let targetFolderPath = '';
      if (targetFolder) {
        targetFolderPath = targetFolder.relative_path;
      } else if (!hasExplicitTarget && row.trashed_from_folder_id) {
        const origFolder = openLibrary.connection
          .prepare('SELECT folder_id, relative_path FROM managed_folders WHERE folder_id = ?')
          .get(row.trashed_from_folder_id) as { folder_id: string; relative_path: string } | undefined;
        if (origFolder) {
          targetFolderPath = origFolder.relative_path;
        }
      }

      const destRelativePath = targetFolderPath
        ? path.posix.join(targetFolderPath, filename)
        : filename;
      const destIdentity = portablePathIdentity(destRelativePath);
      const activeConflict = openLibrary.connection
        .prepare(
          `SELECT asset_id FROM assets
              WHERE path_identity = ? AND location_kind = 'managed'
                AND deleted_at IS NULL AND asset_id != ?`,
        )
        .get(destIdentity, row.asset_id);
      const diskConflict = this.portableDiskDestination(openLibrary, destRelativePath);
      if (activeConflict || diskConflict) {
        return { hasNameConflicts: true };
      }
    }

    return { hasNameConflicts: false };
  }

  override restoreAssets(input: {
    libraryId: string;
    assetIds: string[];
    targetFolderId?: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
  }): { restoredCount: number; assets: AssetSummary[]; operationId: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const assetIds = this.expandAssetIdsToSequenceMembers(
      openLibrary,
      input.assetIds,
    );
    if (assetIds.length === 0 || new Set(assetIds).size !== assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }

    // Validate all assets are trashed (deleted_at IS NOT NULL).
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      relative_file_path: string;
      deleted_at: string;
      trashed_from_relative_path: string;
      trashed_from_folder_id: string | null;
      trashed_from_tombstone_id: string | null;
      current_revision_id: string;
      byte_size: number;
      modified_at: string;
    }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT a.asset_id, a.relative_file_path, a.deleted_at,
                a.trashed_from_relative_path, a.trashed_from_folder_id,
                a.trashed_from_tombstone_id, a.current_revision_id,
                r.byte_size, r.modified_at
           FROM assets a
           JOIN revisions r ON r.revision_id = a.current_revision_id
          WHERE a.asset_id IN (${placeholders})
            AND a.deleted_at IS NOT NULL`,
    });

    const foundIds = new Set(rows.map((r) => r.asset_id));
    for (const id of assetIds) {
      if (!foundIds.has(id)) {
        const exists = openLibrary.connection
          .prepare('SELECT asset_id FROM assets WHERE asset_id = ?')
          .get(id);
        if (!exists) throw new LibraryServiceError('ASSET_NOT_FOUND');
        throw new LibraryServiceError('ASSET_NOT_TRASHED');
      }
    }

    const rowById = new Map(rows.map((row) => [row.asset_id, row]));
    const orderedRows = assetIds.map((assetId) => rowById.get(assetId)!);

    // Resolve target folder
    const hasExplicitTarget = input.targetFolderId !== undefined;
    let targetFolder: ManagedFolderRow | undefined;
    if (typeof input.targetFolderId === 'string') {
      targetFolder = this.targetFolder(openLibrary, input.targetFolderId);
    }
    const conflictStrategy = input.conflictStrategy ?? 'keep-both';

    type RestorePlan = {
      assetId: string;
      backupDestinationRelativePath: string | null;
      backupName: string;
      conflictingAssetId: string | null;
      destinationRelativePath: string;
      managedFolderId: string | null;
      trashFilename: string;
      trashFileMissing: boolean;
    };
    const plans: RestorePlan[] = [];
    const plannedDestinations = new Set<string>();

    try {
      // Planning is side-effect free. The complete plan is persisted before the
      // first source or conflicting destination is moved.
      for (const row of orderedRows) {
        const filename = path.posix.basename(row.trashed_from_relative_path);
        const trashFilePath = this.trashPath(openLibrary, row.asset_id, filename);
        let trashFileMissing = false;
        try {
          const trashEntry = lstatSync(trashFilePath);
          if (!trashEntry.isFile() || trashEntry.isSymbolicLink()) {
            throw new LibraryServiceError('LIBRARY_CORRUPT');
          }
        } catch (error) {
          if (isMissingPathError(error)) {
            trashFileMissing = true;
          } else {
            throw error;
          }
        }

        // Determine target folder path
        let targetFolderPath = '';
        let resolvedFolderId: string | null = null;
        if (targetFolder) {
          targetFolderPath = targetFolder.relative_path;
          resolvedFolderId = targetFolder.folder_id;
        } else if (!hasExplicitTarget) {
          if (row.trashed_from_folder_id) {
            const origFolder = openLibrary.connection
              .prepare('SELECT folder_id, relative_path FROM managed_folders WHERE folder_id = ?')
              .get(row.trashed_from_folder_id) as { folder_id: string; relative_path: string } | undefined;
            if (origFolder) {
              targetFolderPath = origFolder.relative_path;
              resolvedFolderId = origFolder.folder_id;
            }
          }
          if (resolvedFolderId === null && row.trashed_from_tombstone_id) {
            // Deleting a managed folder intentionally removes its row, so the
            // `trashed_from_folder_id` FK may be nulled.  The tombstone binding
            // is the durable identity chain for a folder-trash restore; use it
            // only after the folder rows have been recreated and verify the
            // target still exists before assigning the asset.
            const tombstoneFolder = openLibrary.connection
              .prepare(
                `SELECT f.folder_id, f.relative_path
                   FROM trashed_managed_folders t
                   JOIN managed_folders f ON f.folder_id = t.folder_id
                  WHERE t.tombstone_id = ?`,
              )
              .get(row.trashed_from_tombstone_id) as { folder_id: string; relative_path: string } | undefined;
            if (tombstoneFolder) {
              targetFolderPath = tombstoneFolder.relative_path;
              resolvedFolderId = tombstoneFolder.folder_id;
            }
          }
        }

        let destRelativePath = targetFolderPath
          ? path.posix.join(targetFolderPath, filename)
          : filename;

        // Handle name conflicts
        const destIdentity = portablePathIdentity(destRelativePath);
        let activeConflict = openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE path_identity = ? AND location_kind = 'managed'
                AND deleted_at IS NULL AND asset_id != ?`,
          )
          .get(destIdentity, row.asset_id) as { asset_id: string } | undefined;

        let diskConflict = this.portableDiskDestination(openLibrary, destRelativePath);
        const conflictsWithRestoreBatch = plannedDestinations.has(destIdentity);
        if ((activeConflict || diskConflict || conflictsWithRestoreBatch) && conflictStrategy === 'skip') {
          continue;
        }

        let backupDestinationRelativePath: string | null = null;
        let conflictingAssetId: string | null = null;
        if (
          (activeConflict || diskConflict)
          && !conflictsWithRestoreBatch
          && conflictStrategy === 'replace'
          && (!diskConflict || diskConflict.size >= 0)
        ) {
          const actualRelativePath = diskConflict?.actualRelativePath ?? destRelativePath;
          if (diskConflict) {
            backupDestinationRelativePath = actualRelativePath;
          }
          conflictingAssetId = activeConflict?.asset_id ?? null;
          activeConflict = undefined;
          diskConflict = undefined;
        }

        if (activeConflict || diskConflict || conflictsWithRestoreBatch) {
          // Keep both is the default. A duplicate destination inside the same
          // restore batch also receives a suffix so the batch remains atomic.
          const extension = path.posix.extname(filename);
          const baseName = extension.length === 0 ? filename : filename.slice(0, -extension.length);
          for (let index = 2; index < Number.MAX_SAFE_INTEGER; index += 1) {
            const candidateName = `${baseName} (${index})${extension}`;
            destRelativePath = targetFolderPath
              ? path.posix.join(targetFolderPath, candidateName)
              : candidateName;
            const candidateIdentity = portablePathIdentity(destRelativePath);
            const candidateConflict = openLibrary.connection
              .prepare(
                `SELECT asset_id FROM assets
                  WHERE path_identity = ? AND location_kind = 'managed'
                    AND deleted_at IS NULL AND asset_id != ?`,
              )
              .get(candidateIdentity, row.asset_id);
            if (
              !candidateConflict &&
              !plannedDestinations.has(candidateIdentity) &&
              this.portableDiskDestination(openLibrary, destRelativePath) === undefined
            ) {
              break;
            }
          }
        }

        plannedDestinations.add(portablePathIdentity(destRelativePath));
        plans.push({
          assetId: row.asset_id,
          backupDestinationRelativePath,
          backupName: String(plans.length),
          conflictingAssetId,
          destinationRelativePath: destRelativePath,
          managedFolderId: resolvedFolderId,
          trashFilename: filename,
          trashFileMissing,
        });
      }

      const operationId = randomUUID();
      const operationsPath = this.assertSafeOperationsRoot(openLibrary.summary.libraryPath);
      const operationPath = path.join(operationsPath, operationId);
      const backupPath = path.join(operationPath, 'backup');
      const manifest: RestoreOperationManifest = {
        version: 3,
        kind: 'restore',
        files: plans.map((plan) => ({
          assetId: plan.assetId,
          backupDestinationRelativePath: plan.backupDestinationRelativePath,
          backupName: plan.backupName,
          conflictingAssetId: plan.conflictingAssetId,
          destinationRelativePath: plan.destinationRelativePath,
          hadDestination: plan.backupDestinationRelativePath !== null,
          trashFilename: plan.trashFilename,
        })),
      };

      mkdirSync(backupPath, { recursive: true });
      this.assertSafeOperationPath(operationPath);
      const now = new Date().toISOString();
      openLibrary.connection
        .prepare(
          `INSERT INTO file_operations
             (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
           VALUES (?, 'restore', 'preparing', ?, NULL, ?, ?)`,
        )
        .run(operationId, JSON.stringify(manifest), now, now);

      let jobLease: LibraryJobLease;
      try {
        jobLease = new LibraryWriteCoordinator(openLibrary.writeConnection, openLibrary.summary.libraryId)
          .claimJobOnce(operationId);
      } catch (error) {
        this.removeOperation(operationPath);
        if (error instanceof LibraryWriteCoordinatorError) {
          try {
            openLibrary.connection.prepare(
              `UPDATE file_operations
                  SET status = 'failed', error_code = 'JOB_LEASE_BUSY', updated_at = ?
                WHERE operation_id = ? AND status = 'preparing'`,
            ).run(new Date().toISOString(), operationId);
          } catch {
            // Best-effort status update.
          }
        }
        throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
      }
      const jobHeartbeat: LibraryWriteLeaseHeartbeat = jobLease.startHeartbeat();

      try {
        this.failAt('crash-restore-before-filesystem');
        const applying = openLibrary.connection
          .prepare(
            "UPDATE file_operations SET status = 'applying', updated_at = ? WHERE operation_id = ? AND status = 'preparing'",
          )
          .run(new Date().toISOString(), operationId);
        if (applying.changes !== 1) throw new Error('Restore operation is not preparing.');

        for (const plan of plans) {
          if (plan.backupDestinationRelativePath === null) continue;
          const destinationPath = this.folderPath(openLibrary, plan.backupDestinationRelativePath);
          renameSync(destinationPath, path.join(backupPath, plan.backupName));
        }
        this.failAt('crash-restore-after-backup');

        for (const plan of plans) {
          if (plan.trashFileMissing) continue;
          const sourcePath = this.trashPath(openLibrary, plan.assetId, plan.trashFilename);
          const destinationPath = this.folderPath(openLibrary, plan.destinationRelativePath);
          mkdirSync(path.dirname(destinationPath), { recursive: true });
          renameSync(sourcePath, destinationPath);
        }
        this.failAt('crash-restore-after-filesystem');

        // The database mutation and committed marker share one SQLite commit.
        // Startup recovery therefore never has to guess whether DB state won.
        openLibrary.connection.transaction(() => {
          for (const plan of plans) {
            if (plan.conflictingAssetId) {
              openLibrary.connection.prepare('DELETE FROM assets WHERE asset_id = ?').run(plan.conflictingAssetId);
            }
          }
          for (const plan of plans) {
            const pathIdentity = portablePathIdentity(plan.destinationRelativePath);
            openLibrary.connection
              .prepare(
                `UPDATE assets
                    SET relative_file_path = ?, managed_folder_id = ?,
                        path_identity = ?, deleted_at = NULL,
                        trashed_from_relative_path = NULL, trashed_from_folder_id = NULL,
                        trashed_from_tombstone_id = NULL,
                        availability = ?, updated_at = ?
                  WHERE asset_id = ?`,
              )
              .run(
                plan.destinationRelativePath,
                plan.managedFolderId,
                pathIdentity,
                plan.trashFileMissing ? 'missing' : 'available',
                now,
                plan.assetId,
              );
            this.syncAssetSearchContent(openLibrary.connection, plan.assetId);
          }
          this.failAt('crash-restore-before-db-commit');
          jobLease.assertCurrent();
          openLibrary.connection
            .prepare("UPDATE file_operations SET status = 'committed', updated_at = ? WHERE operation_id = ?")
            .run(new Date().toISOString(), operationId);
        })();
        this.failAt('crash-restore-after-db-commit');

        try {
          this.removeOperation(operationPath);
        } catch (error) {
          // The committed row makes cleanup retryable on the next open.
          this.diagnose('asset.restore.cleanup-operation', error, {
            libraryId: input.libraryId,
            operationId,
          });
        }
      } catch (error) {
        if (error instanceof SimulatedCrashError) {
          throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
        }

        const operation = openLibrary.connection
          .prepare('SELECT status, manifest_json, error_code, operation_id FROM file_operations WHERE operation_id = ?')
          .get(operationId) as OperationRow | undefined;
        if (operation?.status === 'committed') {
          this.diagnose('asset.restore.post-commit', error, { libraryId: input.libraryId, operationId });
        } else if (operation) {
          try {
            this.recoverRestoreOperation(openLibrary, operation, manifest, operationPath);
          } catch (recoveryError) {
            openLibrary.connection
              .prepare(
                "UPDATE file_operations SET status = 'failed', error_code = 'RESTORE_APPLY_FAILED', updated_at = ? WHERE operation_id = ?",
              )
              .run(new Date().toISOString(), operationId);
            this.diagnose('asset.restore.rollback', recoveryError, {
              libraryId: input.libraryId,
              operationId,
            });
          }
          throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
        } else {
          throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
        }
      } finally {
        jobHeartbeat.stop();
        try {
          jobLease.release();
        } catch (releaseError) {
          this.diagnose('asset.restore.lease-release', releaseError, {
            libraryId: input.libraryId,
            operationId,
          });
        }
      }

      const restoredAssets: AssetSummary[] = [];
      for (const plan of plans) {
        const assetRow = openLibrary.connection
          .prepare(
            `SELECT a.asset_id, a.managed_folder_id, a.linked_folder_id, a.location_kind, a.relative_file_path,
                    a.current_revision_id, a.availability, r.byte_size, r.modified_at,
                    COALESCE(m.rating, 0) AS rating, COALESCE(m.favorite, 0) AS favorite,
                    a.deleted_at, a.trashed_from_relative_path
               FROM assets a
               JOIN revisions r ON r.revision_id = a.current_revision_id
               LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
              WHERE a.asset_id = ?`,
          )
          .get(plan.assetId) as AssetSummaryRow & {
            deleted_at: string | null;
            trashed_from_relative_path: string | null;
          } | undefined;
        if (assetRow) restoredAssets.push(this.assetSummaryFromRow(assetRow));
      }

      // Restore changes the library-wide Trash count even when the caller is
      // browsing another scope. Sequence membership is already on the restored
      // rows; disk reconcile must not invent a new sequence.
      if (restoredAssets.length > 0) {
        this.options.onAssetsChanged?.({
          type: 'asset.changed',
          libraryId: input.libraryId,
          changedCount: restoredAssets.length,
          missingCount: 0,
          source: 'client',
        });
      }

      return {
        // `skip` can remove every planned file (or only a subset of a
        // sequence). Report the logical units actually restored, never the
        // originally requested count.
        restoredCount: this.countLogicalAssetUnits(openLibrary, plans.map((plan) => plan.assetId)),
        assets: this.withImageSequenceSummaries(openLibrary, restoredAssets),
        operationId,
      };
    } catch (error) {
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  override undoTrashAssets(input: {
    libraryId: string;
    operationId: string;
    /** History replay must never acknowledge a partially restored batch. */
    requireAll?: boolean;
  }): {
    restoredCount: number;
    skippedCount: number;
    assets: AssetSummary[];
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const operation = openLibrary.connection.prepare(
      `SELECT operation_id, status, manifest_json, error_code FROM file_operations
        WHERE operation_id = ? AND kind = 'trash'`,
    ).get(input.operationId) as OperationRow | undefined;
    if (!operation || operation.status !== 'committed' || operation.error_code !== null) {
      throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
    }
    let manifest: unknown;
    try {
      manifest = JSON.parse(operation.manifest_json);
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
    if (
      typeof manifest !== 'object'
      || manifest === null
      || !Array.isArray((manifest as { files?: unknown }).files)
    ) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const assetIds = (manifest as { files: unknown[] }).files.map((file) => (
      typeof file === 'object' && file !== null && typeof (file as { backupName?: unknown }).backupName === 'string'
        ? (file as { backupName: string }).backupName
        : null
    ));
    if (assetIds.some((assetId) => assetId === null) || assetIds.length === 0) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const restored = this.restoreAssetsIfOriginalVacant({
      libraryId: input.libraryId,
      assetIds: assetIds as string[],
      requireAll: input.requireAll === true,
    });
    if (restored.skippedCount === 0) {
      openLibrary.connection.prepare(
        "UPDATE file_operations SET status = 'rolled_back', updated_at = ? WHERE operation_id = ?",
      ).run(new Date().toISOString(), input.operationId);
    }
    return {
      restoredCount: restored.restoredCount,
      skippedCount: restored.skippedCount,
      assets: restored.assets,
    };
  }

  /**
   * Conservative recovery helper for Automation. Unlike the normal Restore
   * UI, it never falls back to another folder, adds a suffix, or replaces a
   * collision. Each selected asset must still have its original managed
   * folder and its exact original path must be vacant at execution time.
   */
  override restoreAssetsIfOriginalVacant(input: {
    libraryId: string;
    assetIds: string[];
    /** Reject before mutation when any requested asset cannot be restored. */
    requireAll?: boolean;
  }): {
    restoredCount: number;
    skippedCount: number;
    skipped: Array<{
      assetId: string;
      reason: 'original_folder_missing' | 'name_conflict' | 'trash_file_missing';
    }>;
    assets: AssetSummary[];
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const assetIds = this.expandAssetIdsToSequenceMembers(openLibrary, input.assetIds);
    if (assetIds.length === 0 || new Set(assetIds).size !== assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      relative_file_path: string;
      deleted_at: string;
      trashed_from_relative_path: string;
      trashed_from_folder_id: string | null;
    }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, relative_file_path, deleted_at,
                trashed_from_relative_path, trashed_from_folder_id
           FROM assets
          WHERE asset_id IN (${placeholders})
            AND deleted_at IS NOT NULL`,
    });
    const rowById = new Map(rows.map((row) => [row.asset_id, row]));
    for (const assetId of assetIds) {
      if (rowById.has(assetId)) continue;
      const existing = openLibrary.connection.prepare('SELECT asset_id FROM assets WHERE asset_id = ?').get(assetId);
      if (!existing) throw new LibraryServiceError('ASSET_NOT_FOUND');
      throw new LibraryServiceError('ASSET_NOT_TRASHED');
    }

    const accepted: string[] = [];
    const skipped: Array<{
      assetId: string;
      reason: 'original_folder_missing' | 'name_conflict' | 'trash_file_missing';
    }> = [];
    const plannedDestinations = new Set<string>();
    for (const assetId of assetIds) {
      const row = rowById.get(assetId)!;
      const originalDirectory = path.posix.dirname(row.trashed_from_relative_path);
      if (row.trashed_from_folder_id !== null) {
        const originalFolder = openLibrary.connection.prepare(
          'SELECT relative_path FROM managed_folders WHERE folder_id = ?',
        ).get(row.trashed_from_folder_id) as { relative_path: string } | undefined;
        if (!originalFolder || portablePathIdentity(originalFolder.relative_path) !== portablePathIdentity(originalDirectory)) {
          skipped.push({ assetId, reason: 'original_folder_missing' });
          continue;
        }
      } else if (originalDirectory !== '.') {
        // A non-root file with no surviving managed-folder mapping cannot be
        // restored to its actual original location safely.
        skipped.push({ assetId, reason: 'original_folder_missing' });
        continue;
      }

      const trashFilename = path.posix.basename(row.relative_file_path);
      const trashFilePath = this.trashPath(openLibrary, assetId, trashFilename);
      if (!realFileExists(trashFilePath)) {
        skipped.push({ assetId, reason: 'trash_file_missing' });
        continue;
      }

      const destinationIdentity = portablePathIdentity(row.trashed_from_relative_path);
      const activeConflict = openLibrary.connection.prepare(
        `SELECT asset_id FROM assets
          WHERE path_identity = ? AND location_kind = 'managed'
            AND deleted_at IS NULL AND asset_id != ?`,
      ).get(destinationIdentity, assetId);
      if (
        activeConflict
        || plannedDestinations.has(destinationIdentity)
        || this.portableDiskDestination(openLibrary, row.trashed_from_relative_path) !== undefined
      ) {
        skipped.push({ assetId, reason: 'name_conflict' });
        continue;
      }
      plannedDestinations.add(destinationIdentity);
      accepted.push(assetId);
    }

    if (accepted.length === 0) {
      if (input.requireAll && skipped.length > 0) {
        throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
      }
      return { restoredCount: 0, skippedCount: skipped.length, skipped, assets: [] };
    }
    if (input.requireAll && skipped.length > 0) {
      throw new LibraryServiceError('ASSET_MOVE_CONFLICT', { reason: 'SOURCE_CHANGED' });
    }
    const restored = this.restoreAssets({
      libraryId: input.libraryId,
      assetIds: accepted,
      conflictStrategy: 'skip',
    });
    return {
      restoredCount: restored.restoredCount,
      skippedCount: skipped.length,
      skipped,
      assets: restored.assets,
    };
  }

  /**
   * Clarification #7 / Serpent-9zc: permanently delete active managed assets
   * from disk (not via app trash). Irreversible; shares confirm preference
   * with folder disk-delete.
   */
  override deleteAssetsFromDisk(input: {
    libraryId: string;
    assetIds: string[];
  }): { deletedCount: number } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const logicalCount = this.countLogicalAssetUnits(
      openLibrary,
      input.assetIds,
    );
    const assetIds = this.expandAssetIdsToSequenceMembers(
      openLibrary,
      input.assetIds,
    );

    const rows = sqliteAllInChunks<string, { asset_id: string; relative_file_path: string }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, relative_file_path
           FROM assets
          WHERE asset_id IN (${placeholders})
            AND location_kind = 'managed'
            AND deleted_at IS NULL`,
    });

    if (rows.length !== assetIds.length) {
      for (const id of assetIds) {
        const exists = openLibrary.connection
          .prepare(
            'SELECT asset_id, location_kind, deleted_at FROM assets WHERE asset_id = ?',
          )
          .get(id) as
          | { asset_id: string; location_kind: string; deleted_at: string | null }
          | undefined;
        if (!exists) throw new LibraryServiceError('ASSET_NOT_FOUND');
        if (exists.location_kind !== 'managed') {
          throw new LibraryServiceError('ASSET_NOT_MANAGED');
        }
        if (exists.deleted_at !== null) {
          throw new LibraryServiceError('ASSET_ALREADY_TRASHED');
        }
      }
    }

    const operationId = randomUUID();
    const diskThrottle = createProgressThrottle();
    let filesProcessed = 0;
    this.emitDeleteProgress({
      operationId,
      libraryId: input.libraryId,
      kind: 'disk',
      phase: 'run',
      filesProcessed: 0,
      totalFiles: assetIds.length,
    });
    try {
      this.deleteActiveManagedAssetsFromDisk(
        openLibrary,
        assetIds,
        (processed, totalFiles) => {
          filesProcessed = processed;
          if (diskThrottle.shouldEmit(processed === totalFiles)) {
            this.emitDeleteProgress({
              operationId,
              libraryId: input.libraryId,
              kind: 'disk',
              phase: 'run',
              filesProcessed: processed,
              totalFiles,
            });
          }
        },
      );
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'disk',
        phase: 'complete',
        filesProcessed: assetIds.length,
        totalFiles: assetIds.length,
      });
      return { deletedCount: logicalCount };
    } catch (error) {
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'disk',
        phase: 'failed',
        filesProcessed,
        totalFiles: assetIds.length,
      });
      throw error;
    }
  }

  override deleteAssetsPermanent(input: {
    libraryId: string;
    assetIds: string[];
  }): { deletedCount: number; skippedCount: number; skippedReasons: Array<{ assetId: string; reason: PublicErrorReason }> } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    const logicalInputCount = this.countLogicalAssetUnits(
      openLibrary,
      input.assetIds,
    );
    const assetIds = this.expandAssetIdsToSequenceMembers(
      openLibrary,
      input.assetIds,
    );

    const rows = sqliteAllInChunks<string, { asset_id: string; relative_file_path: string }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, relative_file_path
           FROM assets
          WHERE asset_id IN (${placeholders})
            AND deleted_at IS NOT NULL`,
    });

    if (rows.length !== assetIds.length) {
      // Validate the complete batch before touching the filesystem. A mixed
      // active/trashed or unknown batch must never partially delete the valid
      // subset while silently ignoring the rest.
      for (const id of assetIds) {
        const exists = openLibrary.connection
          .prepare('SELECT asset_id, deleted_at FROM assets WHERE asset_id = ?')
          .get(id) as { asset_id: string; deleted_at: string | null } | undefined;
        if (!exists) throw new LibraryServiceError('ASSET_NOT_FOUND');
        if (exists.deleted_at === null) {
          throw new LibraryServiceError('ASSET_NOT_TRASHED', { reason: 'PERMANENT_DELETE_NEEDS_TRASH' });
        }
      }
    }

    let deletedCount = 0;
    const skippedReasons: Array<{ assetId: string; reason: PublicErrorReason }> = [];
    const deletedAssetIds: string[] = [];
    const operationId = randomUUID();
    const permanentThrottle = createProgressThrottle();
    const emitPermanent = input.assetIds.length >= 2;
    if (emitPermanent) {
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'permanent',
        phase: 'run',
        filesProcessed: 0,
        totalFiles: rows.length,
      });
    }

    for (const row of rows) {
      // Remove trash directory
      const trashDir = path.join(openLibrary.summary.libraryPath, '.serpent', 'trash', row.asset_id);
      let skipReason: PublicErrorReason | undefined;
      try {
        (this.options.removeTrashPath ?? ((trashPath: string) => {
          rmSync(trashPath, { force: true, recursive: true });
        }))(trashDir);
      } catch (error) {
        if (isMissingPathError(error)) {
          // Already gone, proceed with DB delete
        } else {
          const code = (error as NodeJS.ErrnoException).code;
          if (code === 'EBUSY') {
            skipReason = 'FILE_BUSY';
          } else if (code === 'EPERM' || code === 'EACCES') {
            skipReason = 'PERMISSION_DENIED';
          } else {
            throw error;
          }
        }
      }

      if (skipReason) {
        skippedReasons.push({ assetId: row.asset_id, reason: skipReason });
        this.diagnose(
          'asset.delete-permanent.skip',
          new LibraryServiceError('LIBRARY_NOT_WRITABLE', { reason: skipReason }),
          { libraryId: input.libraryId, assetId: row.asset_id },
        );
      } else {
        deletedAssetIds.push(row.asset_id);
      }
      if (emitPermanent && permanentThrottle.shouldEmit(deletedAssetIds.length + skippedReasons.length === rows.length)) {
        this.emitDeleteProgress({
          operationId,
          libraryId: input.libraryId,
          kind: 'permanent',
          phase: 'run',
          filesProcessed: deletedAssetIds.length + skippedReasons.length,
          totalFiles: rows.length,
        });
      }
    }

    // Delete DB rows (cascades to revisions, metadata, tags, collections)
    const logicalDeletedCount =
      deletedAssetIds.length === 0
        ? 0
        : this.countLogicalAssetUnits(openLibrary, deletedAssetIds);
    if (deletedAssetIds.length > 0) {
      openLibrary.connection.transaction(() => {
        this.dissolveImageSequencesForAssets(openLibrary, deletedAssetIds);
        for (const assetId of deletedAssetIds) {
          openLibrary.connection
            .prepare('DELETE FROM assets WHERE asset_id = ?')
            .run(assetId);
        }
      })();
      deletedCount = logicalDeletedCount;
    }

    this.syncTrashedFolderTombstones(openLibrary);

    if (deletedAssetIds.length > 0) {
      // The cross-process change subscription is polled, but a local
      // permanent delete must stop serving the deleted asset immediately.
      this.invalidateArtifactPathCache(input.libraryId);
      this.options.onAssetsChanged?.({
        type: 'asset.changed',
        libraryId: input.libraryId,
        changedCount: deletedAssetIds.length,
        missingCount: 0,
        source: 'client',
      });
    }

    if (emitPermanent) {
      this.emitDeleteProgress({
        operationId,
        libraryId: input.libraryId,
        kind: 'permanent',
        phase: 'complete',
        filesProcessed: rows.length,
        totalFiles: rows.length,
      });
    }

    return {
      deletedCount,
      skippedCount: Math.max(0, logicalInputCount - deletedCount),
      skippedReasons,
    };
  }

  public override syncTrashedFolderTombstones(openLibrary: OpenLibrary): void {
    openLibrary.connection.transaction(() => {
      // Prefer tombstone bind (Serpent-whvm). Path prefix only when that
      // relative_path is unique among tombstones — otherwise same-name
      // folders would inflate each other's counts.
      openLibrary.connection
        .prepare(
          `UPDATE trashed_managed_folders
              SET trashed_asset_count = (
                SELECT COUNT(*)
                  FROM assets
                 WHERE deleted_at IS NOT NULL
                   AND (
                     trashed_from_tombstone_id = trashed_managed_folders.tombstone_id
                     OR (
                       trashed_from_tombstone_id IS NULL
                       AND trashed_from_folder_id = trashed_managed_folders.folder_id
                     )
                     OR (
                       trashed_from_tombstone_id IS NULL
                       AND trashed_from_folder_id IS NULL
                       AND (
                         SELECT COUNT(*)
                           FROM trashed_managed_folders AS peers
                          WHERE peers.relative_path =
                                trashed_managed_folders.relative_path
                       ) = 1
                       AND (
                         trashed_from_relative_path =
                           trashed_managed_folders.relative_path
                         OR trashed_from_relative_path LIKE
                              (trashed_managed_folders.relative_path || '/%')
                       )
                     )
                   )
                   AND NOT EXISTS (
                     SELECT 1
                       FROM asset_sequence_frames hidden_sequence_frame
                      WHERE hidden_sequence_frame.asset_id = assets.asset_id
                        AND hidden_sequence_frame.position > 0
                   )
              )`,
        )
        .run();
      openLibrary.connection
        .prepare(
          `DELETE FROM trashed_managed_folders WHERE trashed_asset_count = 0`,
        )
        .run();
    })();
  }

  /**
   * Recreate managed folder rows (and disk paths) from trash tombstones, then
   * restore trashed assets that belonged to the subtree (Serpent-qufh).
   */
  override restoreTrashedManagedFolder(input: {
    libraryId: string;
    tombstoneId: string;
  }): {
    restoredFolderCount: number;
    restoredAssetCount: number;
    folders: ManagedFolderSummary[];
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const root = openLibrary.connection
      .prepare(
        `SELECT tombstone_id, folder_id, relative_path, name, parent_relative_path,
                trashed_at, trashed_asset_count
           FROM trashed_managed_folders
          WHERE tombstone_id = ?`,
      )
      .get(input.tombstoneId) as
      | {
          tombstone_id: string;
          folder_id: string;
          relative_path: string;
          name: string;
          parent_relative_path: string | null;
          trashed_at: string;
          trashed_asset_count: number;
        }
      | undefined;
    if (!root) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const tombstones = openLibrary.connection
      .prepare(
        `SELECT tombstone_id, folder_id, relative_path, name, parent_relative_path,
                trashed_at, trashed_asset_count
           FROM trashed_managed_folders
          WHERE trashed_at = ?
          ORDER BY length(relative_path) ASC`,
      )
      .all(root.trashed_at)
      .filter((row) => isPortablePathEqualOrDescendant(
        (row as { relative_path: string }).relative_path,
        root.relative_path,
      )) as Array<{
        tombstone_id: string;
        folder_id: string;
        relative_path: string;
        name: string;
        parent_relative_path: string | null;
        trashed_at: string;
        trashed_asset_count: number;
      }>;

    const folderIds = tombstones.map((row) => row.folder_id);
    const tombstoneIds = tombstones.map((row) => row.tombstone_id);

    // Serpent-gz4y / whvm: bind by tombstone id first so same-path tombstones
    // never steal each other's assets. folder_id is a secondary match for
    // rows that still retain the FK; path is a last-resort legacy fallback
    // only when that relative_path has a single competing tombstone.
    const restoreAssetIds: string[] = [];
    const seenRestoreAssetIds = new Set<string>();
    const rememberRestoreAssetId = (assetId: string) => {
      if (seenRestoreAssetIds.has(assetId)) return;
      seenRestoreAssetIds.add(assetId);
      restoreAssetIds.push(assetId);
    };

    if (tombstoneIds.length > 0) {
      const byTombstone = sqliteAllInChunks<string, { asset_id: string }>({
        connection: openLibrary.connection,
        values: tombstoneIds,
        buildSql: (placeholders) =>
          `SELECT asset_id FROM assets
            WHERE deleted_at IS NOT NULL
              AND trashed_from_tombstone_id IN (${placeholders})`,
      });
      for (const row of byTombstone) rememberRestoreAssetId(row.asset_id);
    }

    if (folderIds.length > 0) {
      const byFolderId = sqliteAllInChunks<string, { asset_id: string }>({
        connection: openLibrary.connection,
        values: folderIds,
        buildSql: (placeholders) =>
          `SELECT asset_id FROM assets
            WHERE deleted_at IS NOT NULL
              AND trashed_from_tombstone_id IS NULL
              AND trashed_from_folder_id IN (${placeholders})`,
      });
      for (const row of byFolderId) rememberRestoreAssetId(row.asset_id);
    }

    const ambiguousPaths = new Set<string>();
    const pathCounts = openLibrary.connection
      .prepare(
        `SELECT relative_path AS relative_path, COUNT(*) AS count
           FROM trashed_managed_folders
          GROUP BY relative_path
         HAVING COUNT(*) > 1`,
      )
      .all() as Array<{ relative_path: string; count: number }>;
    for (const row of pathCounts) ambiguousPaths.add(portablePathIdentity(row.relative_path));

    const tombstoneRelativePaths = tombstones.map((row) => row.relative_path);
    const trashedAssetRows = openLibrary.connection
      .prepare(
        `SELECT asset_id, trashed_from_relative_path, trashed_from_folder_id,
                trashed_from_tombstone_id
           FROM assets
          WHERE deleted_at IS NOT NULL
            AND trashed_from_tombstone_id IS NULL
            AND trashed_from_folder_id IS NULL`,
      )
      .all() as Array<{
        asset_id: string;
        trashed_from_relative_path: string | null;
        trashed_from_folder_id: string | null;
        trashed_from_tombstone_id: string | null;
      }>;
    for (const row of trashedAssetRows) {
      if (!row.trashed_from_relative_path) continue;
      const parentPath = path.posix.dirname(row.trashed_from_relative_path);
      const matchesSubtree = tombstoneRelativePaths.some((folderPath) => {
        if (ambiguousPaths.has(portablePathIdentity(folderPath))) return false;
        return isPortablePathEqualOrDescendant(parentPath, folderPath)
          || isPortablePathEqualOrDescendant(row.trashed_from_relative_path!, folderPath);
      });
      if (matchesSubtree) rememberRestoreAssetId(row.asset_id);
    }

    const expectedAssetCount = tombstones.reduce(
      (sum, row) => sum + row.trashed_asset_count,
      0,
    );
    if (expectedAssetCount > 0 && restoreAssetIds.length === 0) {
      throw new LibraryServiceError('ASSET_NOT_FOUND', {
        reason: 'SOURCE_CHANGED',
      });
    }

    const restoredFolders: ManagedFolderSummary[] = [];
    const createdFolderRows: Array<{ folderId: string; relativePath: string }> = [];
    const now = new Date().toISOString();

    // Recreating the folder skeleton and restoring its assets are two separate
    // durable operations: restoreAssets owns the file-operation journal for
    // the asset bytes, while this method owns the tombstone-bound folder rows.
    // If the second phase fails, do not leave an apparently restored folder
    // containing assets that are still in Trash.  Only rows created by this
    // invocation may be compensated; pre-existing folders are never removed.
    const compensateCreatedFolderRows = (reason: unknown): void => {
      if (createdFolderRows.length === 0) return;

      const createdFolderIds = createdFolderRows.map((row) => row.folderId);
      const activeAssets = withSqliteInPredicate(
        openLibrary.connection,
        'managed_folder_id',
        createdFolderIds,
        (sql, params) =>
          openLibrary.connection
            .prepare(
              `SELECT asset_id FROM assets
                 WHERE deleted_at IS NULL
                   AND ${sql}`,
            )
            .all(...params) as Array<{ asset_id: string }>,
      );
      if (activeAssets.length > 0) {
        // A partially successful asset restore owns live bytes.  Preserving
        // the folder rows is safer than deleting their parents out from under
        // those assets; the tombstone remains available for a later retry.
        this.diagnose('folder.restore.compensation-preserved', reason, {
          libraryId: input.libraryId,
          tombstoneId: input.tombstoneId,
          activeAssetIds: activeAssets.map((row) => row.asset_id),
        });
        return;
      }

      try {
        openLibrary.connection.transaction(() => {
          for (const row of [...createdFolderRows].sort(
            (left, right) => right.relativePath.length - left.relativePath.length,
          )) {
            openLibrary.connection
              .prepare('DELETE FROM managed_folders WHERE folder_id = ?')
              .run(row.folderId);
          }
        })();
      } catch (error) {
        this.diagnose('folder.restore.compensation-db', error, {
          libraryId: input.libraryId,
          tombstoneId: input.tombstoneId,
          createdFolderIds,
        });
        return;
      }

      for (const row of [...createdFolderRows].sort(
        (left, right) => right.relativePath.length - left.relativePath.length,
      )) {
        try {
          rmdirSync(this.folderPath(openLibrary, row.relativePath));
        } catch (error) {
          // Never recursively remove a directory here: an external writer may
          // have placed unrelated files in it while the restore was running.
          this.diagnose('folder.restore.compensation-filesystem', error, {
            libraryId: input.libraryId,
            tombstoneId: input.tombstoneId,
            relativePath: row.relativePath,
          });
        }
      }
    };

    try {
      openLibrary.connection.transaction(() => {
        for (const row of tombstones) {
          const existing = openLibrary.connection
            .prepare(
              'SELECT folder_id FROM managed_folders WHERE folder_id = ?',
            )
            .get(row.folder_id) as { folder_id: string } | undefined;
          if (existing) {
            const inserted = openLibrary.connection
              .prepare(
                'SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?',
              )
              .get(row.folder_id) as ManagedFolderRow;
            restoredFolders.push(
              this.summarizeManagedFolderRow(
                openLibrary,
                inserted,
                this.managedFolderCountMaps(openLibrary, [row.folder_id]),
              ),
            );
            continue;
          }

          let parentFolderId: string | null = null;
          if (row.parent_relative_path) {
            const parent = openLibrary.connection
              .prepare(
                'SELECT folder_id FROM managed_folders WHERE path_identity = ?',
              )
              .get(portablePathIdentity(row.parent_relative_path)) as { folder_id: string } | undefined;
            if (!parent) {
              throw new LibraryServiceError('FOLDER_NOT_FOUND', {
                reason: 'SOURCE_CHANGED',
              });
            }
            parentFolderId = parent.folder_id;
          }

          const targetPath = this.folderPath(openLibrary, row.relative_path);
          const pathIdentity = portablePathIdentity(row.relative_path);
          const conflict =
            openLibrary.connection
              .prepare('SELECT folder_id FROM managed_folders WHERE path_identity = ?')
              .get(pathIdentity) ??
            openLibrary.connection
              .prepare(
                'SELECT asset_id FROM assets WHERE path_identity = ? AND deleted_at IS NULL',
              )
              .get(pathIdentity) ??
            this.portableDiskDestination(openLibrary, row.relative_path);
          if (conflict) {
            throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
          }

          mkdirSync(targetPath, { recursive: true });
          openLibrary.connection
            .prepare(
              `INSERT INTO managed_folders
                 (folder_id, parent_folder_id, name, relative_path, path_identity, created_at)
               VALUES (?, ?, ?, ?, ?, ?)`,
            )
            .run(
              row.folder_id,
              parentFolderId,
              row.name,
              row.relative_path,
              pathIdentity,
              now,
            );
          createdFolderRows.push({
            folderId: row.folder_id,
            relativePath: row.relative_path,
          });
          const inserted = openLibrary.connection
            .prepare(
              'SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?',
            )
            .get(row.folder_id) as ManagedFolderRow;
          restoredFolders.push(
            this.summarizeManagedFolderRow(
              openLibrary,
              inserted,
              this.managedFolderCountMaps(openLibrary, [row.folder_id]),
            ),
          );
        }
      })();
    } catch (error) {
      compensateCreatedFolderRows(error);
      if (error instanceof LibraryServiceError) throw error;
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    let restoredAssetCount = 0;
    try {
      if (restoreAssetIds.length > 0) {
        const result = this.restoreAssets({
          libraryId: input.libraryId,
          assetIds: restoreAssetIds,
        });
        restoredAssetCount = result.restoredCount;
      }
    } catch (error) {
      // Keep tombstones so the user can retry.  Newly-created folder rows are
      // compensated unless a partial asset restore left live bytes that need
      // their metadata preserved.
      compensateCreatedFolderRows(error);
      throw error instanceof LibraryServiceError
        ? error
        : serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    if (tombstones.length > 0) {
      sqliteRunInChunks({
        connection: openLibrary.connection,
        values: tombstones.map((row) => row.tombstone_id),
        buildSql: (placeholders) =>
          `DELETE FROM trashed_managed_folders
            WHERE tombstone_id IN (${placeholders})`,
      });
    }

    return {
      restoredFolderCount: tombstones.length,
      restoredAssetCount,
      folders: restoredFolders,
    };
  }

  /** Permanently delete trashed assets by id; shared by emptyTrash and purgeExpiredTrash. */
  public override purgeTrashedAssetsById(
    libraryId: string,
    assetIds: string[],
    onPurged?: (processed: number, total: number) => void,
  ): {
    purgedCount: number;
    skippedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  } {
    let purgedCount = 0;
    let skippedCount = 0;
    const failures: Array<{ assetId: string; reason: PublicErrorReason }> = [];

    for (let index = 0; index < assetIds.length; index += 1) {
      const result = this.deleteAssetsPermanent({ libraryId, assetIds: [assetIds[index]!] });
      purgedCount += result.deletedCount;
      skippedCount += result.skippedCount;
      failures.push(...result.skippedReasons);
      onPurged?.(index + 1, assetIds.length);
    }

    return { purgedCount, skippedCount, failures };
  }

  /** Permanently delete every item currently in Trash (user-initiated empty). */
  override emptyTrash(libraryId: string): {
    purgedCount: number;
    skippedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);

    const rows = openLibrary.connection
      .prepare(`SELECT asset_id FROM assets WHERE deleted_at IS NOT NULL`)
      .all() as Array<{ asset_id: string }>;

    const operationId = randomUUID();
    const emptyThrottle = createProgressThrottle();
    if (rows.length > 0) {
      this.emitDeleteProgress({
        operationId,
        libraryId,
        kind: 'permanent',
        phase: 'run',
        filesProcessed: 0,
        totalFiles: rows.length,
      });
    }

    let result: {
      purgedCount: number;
      skippedCount: number;
      failures: Array<{ assetId: string; reason: PublicErrorReason }>;
    };
    try {
      result = this.purgeTrashedAssetsById(
        libraryId,
        rows.map((row) => row.asset_id),
        (filesProcessed, totalFiles) => {
          if (emptyThrottle.shouldEmit(filesProcessed === totalFiles)) {
            this.emitDeleteProgress({
              operationId,
              libraryId,
              kind: 'permanent',
              phase: 'run',
              filesProcessed,
              totalFiles,
            });
          }
        },
      );
    } catch (error) {
      if (rows.length > 0) {
        this.emitDeleteProgress({
          operationId,
          libraryId,
          kind: 'permanent',
          phase: 'failed',
          filesProcessed: 0,
          totalFiles: rows.length,
        });
      }
      throw error;
    }

    if (rows.length > 0) {
      this.emitDeleteProgress({
        operationId,
        libraryId,
        kind: 'permanent',
        phase: 'complete',
        filesProcessed: rows.length,
        totalFiles: rows.length,
      });
    }

    // Serpent-b3kf: never wipe all tombstones when some assets remain in trash.
    if (result.skippedCount === 0) {
      openLibrary.connection.prepare('DELETE FROM trashed_managed_folders').run();
    } else {
      this.syncTrashedFolderTombstones(openLibrary);
    }

    return result;
  }

  override purgeExpiredTrash(libraryId: string): {
    purgedCount: number;
    skippedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);

    const expiryDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const rows = openLibrary.connection
      .prepare(
        `SELECT asset_id FROM assets WHERE deleted_at IS NOT NULL AND deleted_at < ?`,
      )
      .all(expiryDate) as Array<{ asset_id: string }>;

    if (rows.length === 0) return { purgedCount: 0, skippedCount: 0, failures: [] };

    const result = this.purgeTrashedAssetsById(
      libraryId,
      rows.map((row) => row.asset_id),
    );

    // Expiry cleanup is an irreversible mutation even though it is not
    // initiated from a visible command.  Add a barrier so an older user
    // operation cannot later be replayed across assets that no longer exist.
    if (result.purgedCount > 0) {
      this.recordOperationHistoryBarrier({
        libraryId,
        source: 'desktop',
        sourceReference: 'trash-expiration',
        commandId: 'trash.purge-expired',
        labelKey: 'history.trash.purge-expired',
        reason: 'expired-trash-purge',
        affectedCount: result.purgedCount,
        affectedEntities: rows.map((row) => row.asset_id),
      });
    }

    openLibrary.connection
      .prepare('DELETE FROM trashed_managed_folders WHERE trashed_at < ?')
      .run(expiryDate);

    return result;
  }

  override listTrashedFolders(libraryId: string): TrashedFolderSummary[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const rows = openLibrary.connection
      .prepare(
        `SELECT tombstone_id, folder_id, relative_path, name, parent_relative_path,
                trashed_at, trashed_asset_count
           FROM trashed_managed_folders
          ORDER BY trashed_at DESC, relative_path COLLATE NOCASE`,
      )
      .all() as Array<{
        tombstone_id: string;
        folder_id: string;
        relative_path: string;
        name: string;
        parent_relative_path: string | null;
        trashed_at: string;
        trashed_asset_count: number;
      }>;

    const coverMap = this.trashedFolderCoverArtifactMap(
      openLibrary,
      rows.map((row) => row.tombstone_id),
    );

    return rows.map((row) => ({
      tombstoneId: row.tombstone_id,
      folderId: row.folder_id,
      relativePath: row.relative_path,
      name: row.name,
      parentRelativePath: row.parent_relative_path,
      trashedAt: row.trashed_at,
      assetCount: row.trashed_asset_count,
      coverArtifactIds: coverMap.get(row.tombstone_id) ?? [],
    }));
  }

  /**
   * Covers for trash folder cards keyed by tombstone id (Serpent-jcur / whvm).
   */
  public override trashedFolderCoverArtifactMap(
    openLibrary: OpenLibrary,
    tombstoneIds: string[],
  ): Map<string, string[]> {
    const covers = new Map<string, string[]>();
    if (tombstoneIds.length === 0) return covers;
    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'a.trashed_from_tombstone_id',
      tombstoneIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT a.trashed_from_tombstone_id AS tombstone_id,
                    ra.artifact_id AS artifact_id
               FROM assets a
               JOIN revision_artifacts ra
                 ON ra.revision_id = a.current_revision_id
                AND ra.invalidated_at IS NULL
                AND ra.status = 'ready'
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
              WHERE a.deleted_at IS NOT NULL
                AND ${sql}
              ORDER BY a.trashed_from_tombstone_id, a.relative_file_path`,
          )
          .all(...params) as Array<{ tombstone_id: string; artifact_id: string }>,
    );

    for (const row of rows) {
      const existing = covers.get(row.tombstone_id) ?? [];
      if (existing.length >= 3) continue;
      existing.push(row.artifact_id);
      covers.set(row.tombstone_id, existing);
    }
    return covers;
  }

  override listTrash(libraryId: string): AssetSummary[] {
    const openLibrary = this.requireOpenLibrary(libraryId);

    const rows = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.managed_folder_id, a.linked_folder_id, a.location_kind, a.relative_file_path,
                a.current_revision_id, a.availability, r.byte_size, r.modified_at,
                COALESCE(m.rating, 0) AS rating, COALESCE(m.favorite, 0) AS favorite,
                a.deleted_at, a.trashed_from_relative_path, a.trashed_from_tombstone_id
           FROM assets a
           JOIN revisions r ON r.revision_id = a.current_revision_id
           LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
          WHERE a.deleted_at IS NOT NULL
          ORDER BY a.deleted_at DESC`,
      )
      .all() as Array<AssetSummaryRow & {
        deleted_at: string | null;
        trashed_from_relative_path: string | null;
        trashed_from_tombstone_id: string | null;
      }>;

    // Expose the same thumbnail state as the trash search scope so every
    // trash listing path can render a preview for a trashed asset.
    const artifactMap = this.thumbnailArtifactMap(
      libraryId,
      rows.map((row) => row.asset_id),
    );
    const summaries = rows.map((row) => {
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
    });
    return this.withImageSequenceSummaries(openLibrary, summaries);
  }

  override async deleteLinkedAssets(input: {
    libraryId: string;
    assetIds: string[];
    deleteSourceFile: boolean;
    /**
     * 内部调用（文件夹子树、从磁盘删除的链接项）：把多批删除合并到同一个进度流。
     * 公开契约仍是「每批最多 20 个 id」，由调用方分批并传入累计进度。
     */
    progress?: {
      operationId: string;
      totalFiles: number;
      /** 本批开始前已处理的文件数。 */
      processedBefore: number;
      /** 本批结束时回调累计处理数（用于统一进度与最终 complete 事件）。 */
      onProcessed: (processed: number) => void;
    };
  }): Promise<{
    deletedCount: number;
    failedCount: number;
    failures: Array<{ assetId: string; reason: PublicErrorReason }>;
  }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, input.assetIds);
    if (input.assetIds.length === 0 || input.assetIds.length > 20) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    if (new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }

    const rows = withSqliteInPredicate(
      openLibrary.connection,
      'a.asset_id',
      input.assetIds,
      (sql, params) =>
        openLibrary.connection
          .prepare(
            `SELECT a.asset_id, a.linked_folder_id, a.relative_file_path
               FROM assets a
              WHERE ${sql}
                AND a.location_kind = 'linked'
                AND a.deleted_at IS NULL`,
          )
          .all(...params) as Array<{
            asset_id: string;
            linked_folder_id: string;
            relative_file_path: string;
          }>,
    );

    const foundIds = new Set(rows.map((r) => r.asset_id));
    for (const id of input.assetIds) {
      if (!foundIds.has(id)) {
        const exists = openLibrary.connection
          .prepare('SELECT location_kind, deleted_at FROM assets WHERE asset_id = ?')
          .get(id) as { location_kind: string; deleted_at: string | null } | undefined;
        if (!exists) throw new LibraryServiceError('ASSET_NOT_FOUND');
        if (exists.deleted_at !== null) {
          throw new LibraryServiceError('ASSET_ALREADY_TRASHED');
        }
        // A managed asset cannot be handled by the linked-asset delete path.
        throw new LibraryServiceError('INVALID_SELECTION');
      }
    }

    const rowById = new Map(rows.map((row) => [row.asset_id, row]));
    const orderedRows = input.assetIds.map((assetId) => rowById.get(assetId)!);

    if (!input.deleteSourceFile) {
      openLibrary.connection.transaction(() => {
        this.dissolveImageSequencesForAssets(openLibrary, input.assetIds);
        for (const row of orderedRows) {
          openLibrary.connection
            .prepare('DELETE FROM assets WHERE asset_id = ?')
            .run(row.asset_id);
        }
      })();
      return { deletedCount: orderedRows.length, failedCount: 0, failures: [] };
    }

    // 2026-09-15 用户决定：链接资产只有「强制从硬盘删除」——永久删除源文件，不再送
    // 系统回收站。旧实现对每个文件 spawn 一次系统回收站 helper（实测 126 ms/文件，
    // 1.5 万文件约 31 分钟），并在这段期间独占调度器。
    const removeSourceFile =
      this.options.removeLinkedSourceFile ?? defaultRemoveLinkedSourceFile;
    // 恢复日志（file_operations）每批一行、id 唯一；进度流可以由调用方跨批合并，
    // 两者必须解耦，否则第二批插入同一 operation_id 会撞主键。
    const journalOperationId = randomUUID();
    const progressOperationId = input.progress?.operationId ?? journalOperationId;
    const now = new Date().toISOString();
    const manifest: LinkedTrashOperationManifest = {
      version: 2,
      kind: 'linked-trash',
      assetIds: orderedRows.map((row) => row.asset_id),
      inFlightAssetId: null,
      trashedAssetIds: [],
    };
    const trashedRows: typeof orderedRows = [];
    const failures: Array<{ assetId: string; reason: PublicErrorReason }> = [];
    const totalFiles = input.progress?.totalFiles ?? orderedRows.length;
    const deleteThrottle = createProgressThrottle();
    let filesProcessed = input.progress?.processedBefore ?? 0;
    const emitRun = (force = false): void => {
      if (!deleteThrottle.shouldEmit(force || filesProcessed === totalFiles)) return;
      this.emitDeleteProgress({
        operationId: progressOperationId,
        libraryId: input.libraryId,
        kind: 'disk',
        phase: 'run',
        cancelable: true,
        filesProcessed,
        totalFiles,
      });
    };
    if (input.progress === undefined) {
      this.emitDeleteProgress({
        operationId: progressOperationId,
        libraryId: input.libraryId,
        kind: 'disk',
        phase: 'run',
        cancelable: true,
        filesProcessed: 0,
        totalFiles,
      });
    }

    openLibrary.connection
      .prepare(
        `INSERT INTO file_operations
           (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
         VALUES (?, 'delete-linked-source', 'applying', ?, NULL, ?, ?)`,
      )
      .run(journalOperationId, JSON.stringify(manifest), now, now);

    // 恢复日志按批落盘：旧实现每个文件写两次 manifest_json（1.5 万文件 ≈ 3 万次
    // SQLite 写）。删除本身是原子的（文件要么在、要么不在），所以最多 25 个文件的
    // 进度滞后不会破坏恢复语义——重放时已消失的文件按「已删除」处理即可。
    const JOURNAL_CHECKPOINT_EVERY = 25;
    const writeJournal = (force = false): void => {
      if (!force && filesProcessed % JOURNAL_CHECKPOINT_EVERY !== 0) return;
      openLibrary.connection
        .prepare('UPDATE file_operations SET manifest_json = ?, updated_at = ? WHERE operation_id = ?')
        .run(JSON.stringify(manifest), new Date().toISOString(), journalOperationId);
    };

    for (const row of orderedRows) {
      let sourcePath: string | undefined;
      let deleteAttempted = false;
      try {
        manifest.inFlightAssetId = row.asset_id;
        sourcePath = this.linkedAssetPath(
          openLibrary,
          row.linked_folder_id,
          row.relative_file_path,
        );
        const sourceEntry = lstatSync(sourcePath);
        if (sourceEntry.isSymbolicLink() || !sourceEntry.isFile()) {
          throw new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
            reason: 'UNSUPPORTED_FILE_ENTRY',
          });
        }
        deleteAttempted = true;
        await removeSourceFile(sourcePath);
        if (existsSync(sourcePath)) {
          throw new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
            reason: 'SOURCE_TRASH_FAILED',
          });
        }
        manifest.trashedAssetIds.push(row.asset_id);
        manifest.inFlightAssetId = null;
        filesProcessed += 1;
        writeJournal();
        emitRun();
      } catch (error) {
        const linkedFolder = openLibrary.connection
          .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE folder_id = ?')
          .get(row.linked_folder_id) as {
            absolute_root_path: string;
            status: 'available' | 'offline';
          } | undefined;
        const linkedRootOnline = linkedFolder?.status === 'available' &&
          !this.linkedRootIsGone(linkedFolder.absolute_root_path);
        const sourceMissing = sourcePath !== undefined && isMissingPathError(error);
        if (sourceMissing && linkedRootOnline) {
          // A missing linked source has already been removed outside Serpent;
          // there is nothing left to send to the system trash. The index row
          // is still safe to remove because the linked root itself is online,
          // so this is not an offline/uncertain-source case.
          manifest.trashedAssetIds.push(row.asset_id);
          manifest.inFlightAssetId = null;
          filesProcessed += 1;
          writeJournal(true);
          emitRun();
          trashedRows.push(row);
          continue;
        }
        const sourceGoneAfterDelete = deleteAttempted && sourcePath !== undefined && !existsSync(sourcePath);
        const sourceWasDeleted = manifest.trashedAssetIds.includes(row.asset_id) ||
          (sourceGoneAfterDelete && linkedRootOnline);
        const sourceStateUncertain = sourceGoneAfterDelete && !linkedRootOnline;
        if (sourceWasDeleted && !manifest.trashedAssetIds.includes(row.asset_id)) {
          manifest.trashedAssetIds.push(row.asset_id);
        }
        manifest.inFlightAssetId = sourceStateUncertain ? row.asset_id : null;
        filesProcessed += 1;
        try {
          writeJournal(true);
        } catch {
          // The applying journal remains authoritative. Recovery only infers a
          // deleted in-flight item while its linked root is confirmed online.
        }
        emitRun();
        if (sourceWasDeleted || sourceStateUncertain) {
          const failure = new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
            cause: error,
            reason: 'SOURCE_TRASH_RECONCILIATION_REQUIRED',
          });
          this.diagnose('asset.delete-linked.persist-delete-progress', failure, {
            operationId: progressOperationId,
            libraryId: input.libraryId,
            assetId: row.asset_id,
          });
          throw failure;
        }
        const failure = error instanceof LibraryServiceError
          && error.code === 'ASSET_SOURCE_TRASH_FAILED'
          ? error
          : new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
              cause: error,
              reason: publicReasonFromError(error) ?? 'SOURCE_TRASH_FAILED',
            });
        const reason = failure.reason ?? 'SOURCE_TRASH_FAILED';
        failures.push({ assetId: row.asset_id, reason });
        this.diagnose('asset.delete-linked.delete-source', failure, {
          operationId: progressOperationId,
          libraryId: input.libraryId,
          assetId: row.asset_id,
        });
        continue;
      }
      trashedRows.push(row);
    }

    writeJournal(true);
    emitRun(true);

    try {
      openLibrary.connection.transaction(() => {
        this.dissolveImageSequencesForAssets(
          openLibrary,
          trashedRows.map((row) => row.asset_id),
        );
        for (const row of trashedRows) {
          openLibrary.connection
            .prepare('DELETE FROM assets WHERE asset_id = ?')
            .run(row.asset_id);
        }
        openLibrary.connection
          .prepare(
            `UPDATE file_operations
                SET status = 'committed', manifest_json = ?, error_code = NULL, updated_at = ?
              WHERE operation_id = ?`,
          )
          .run(JSON.stringify(manifest), new Date().toISOString(), journalOperationId);
      })();
    } catch (error) {
      const failure = new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
        cause: error,
        reason: 'SOURCE_TRASH_RECONCILIATION_REQUIRED',
      });
      this.diagnose('asset.delete-linked.delete-records', failure, {
        operationId: journalOperationId,
        libraryId: input.libraryId,
        sourceTrashedAssetIds: trashedRows.map((row) => row.asset_id),
      });
      throw failure;
    }

    const deletedAssetIds = trashedRows.map((row) => row.asset_id);

    if (input.progress !== undefined) {
      // 分批调用时由调用方负责最终 complete/failed 事件。
      input.progress.onProcessed(filesProcessed);
    } else {
      this.emitDeleteProgress({
        operationId: progressOperationId,
        libraryId: input.libraryId,
        kind: 'disk',
        phase: failures.length > 0 ? 'failed' : 'complete',
        filesProcessed: deletedAssetIds.length,
        totalFiles,
      });
    }

    if (failures.length > 0) {
      this.diagnose(
        'asset.delete-linked.partial-failure',
        new LibraryServiceError('ASSET_SOURCE_TRASH_FAILED', {
          reason: failures[0]!.reason,
        }),
        {
          operationId: journalOperationId,
          libraryId: input.libraryId,
          succeededAssetIds: deletedAssetIds,
          failedAssetIds: failures.map(({ assetId }) => assetId),
        },
      );
    }

    return {
      deletedCount: deletedAssetIds.length,
      failedCount: failures.length,
      failures,
    };
  }

  override relinkAsset(input: {
    libraryId: string;
    assetId: string;
    newAbsolutePath: string;
  }): { asset: AssetSummary; batchFollowUpRoot: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    // Validate asset is missing and not trashed
    const assetRow = openLibrary.connection
      .prepare(
        `SELECT asset_id, location_kind, managed_folder_id, linked_folder_id,
                relative_file_path, current_revision_id, availability, deleted_at
           FROM assets WHERE asset_id = ?`,
      )
      .get(input.assetId) as {
        asset_id: string;
        location_kind: 'managed' | 'linked';
        managed_folder_id: string | null;
        linked_folder_id: string | null;
        relative_file_path: string;
        current_revision_id: string | null;
        availability: 'available' | 'missing';
        deleted_at: string | null;
      } | undefined;
    if (!assetRow) throw new LibraryServiceError('ASSET_NOT_FOUND');
    if (assetRow.deleted_at !== null) throw new LibraryServiceError('ASSET_ALREADY_TRASHED');
    if (assetRow.availability !== 'missing') throw new LibraryServiceError('INVALID_STATE_TRANSITION');

    const batchFollowUpRoot = inferRelinkBatchRoot(
      assetRow.relative_file_path,
      input.newAbsolutePath,
    );

    // Validate new file
    let newPath: string;
    try {
      newPath = normalizeAbsolutePath(input.newAbsolutePath);
    } catch (error) {
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }

    if (!realFileExists(newPath)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'UNSUPPORTED_FILE_ENTRY',
      });
    }

    // Reject if in managed space
    this.assertNotInManagedSpace(openLibrary, newPath);
    this.assertNoSymlinkEscape(newPath);

    let managedPlacement:
      | {
          destinationPath: string;
          operationPath: string;
          placedIdentity: ManagedRelinkPlacementIdentity;
          stat: Stats;
        }
      | undefined;
    let fileStat: Stats;
    try {
      fileStat = assetRow.location_kind === 'managed'
        ? (managedPlacement = this.placeManagedRelinkFile(
            openLibrary,
            newPath,
            assetRow.relative_file_path,
          )).stat
        : statSync(newPath);
    } catch (error) {
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    const now = new Date().toISOString();
    let resolvedRelativePath = assetRow.relative_file_path;

    // For linked assets, verify the file is within the linked root
    if (assetRow.location_kind === 'linked') {
      if (!assetRow.linked_folder_id) throw new LibraryServiceError('LIBRARY_CORRUPT');
      const linkedFolder = openLibrary.connection
        .prepare('SELECT absolute_root_path FROM linked_folders WHERE folder_id = ?')
        .get(assetRow.linked_folder_id) as { absolute_root_path: string } | undefined;
      if (!linkedFolder) throw new LibraryServiceError('LIBRARY_CORRUPT');
      let canonicalRoot: string;
      let canonicalNew: string;
      try {
        canonicalRoot = realpathSync(linkedFolder.absolute_root_path);
        canonicalNew = realpathSync(newPath);
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          cause: error,
          reason: 'SOURCE_NOT_FOUND',
        });
      }
      const relation = path.relative(canonicalRoot, canonicalNew);
      if (relation === '' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'NAME_NOT_SUPPORTED',
        });
      }
      resolvedRelativePath = normalizeRelativeAssetPath(relation.split(path.sep).join('/'));
    }
    const originalFilename = path.posix.basename(resolvedRelativePath);
    let contentFingerprint: string;
    try {
      contentFingerprint = this.computeContentFingerprint(
        managedPlacement?.destinationPath ?? newPath,
      );
    } catch (error) {
      if (managedPlacement) this.cleanupManagedRelinkPlacement(managedPlacement, true);
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }

    try {
      openLibrary.connection.transaction(() => {
        this.failAt('crash-relink-after-filesystem');
        const revisionId = randomUUID();
        openLibrary.connection
          .prepare(
            `INSERT INTO revisions
               (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                original_filename, origin, accepted_at, content_fingerprint)
             VALUES (?, ?, ?, ?, ?, ?, 'relink', ?, ?)`,
          )
          .run(
            revisionId,
            input.assetId,
            assetRow.current_revision_id ?? null,
            fileStat.size,
            fileStat.mtime.toISOString(),
            originalFilename,
            now,
            contentFingerprint,
          );

        openLibrary.connection
          .prepare(
            `UPDATE assets
                SET current_revision_id = ?, availability = 'available',
                    relative_file_path = ?, path_identity = ?, source_device = ?,
                    source_inode = ?, updated_at = ?
              WHERE asset_id = ?`,
          )
          .run(
            revisionId,
            resolvedRelativePath,
            portablePathIdentity(resolvedRelativePath),
            assetRow.location_kind === 'linked' ? String(fileStat.dev) : null,
            assetRow.location_kind === 'linked' ? String(fileStat.ino) : null,
            now,
            input.assetId,
          );

        if (assetRow.current_revision_id) {
          openLibrary.connection
            .prepare(
              `UPDATE revision_artifacts
                  SET invalidated_at = ?
                WHERE revision_id = ? AND invalidated_at IS NULL`,
            )
            .run(now, assetRow.current_revision_id);
        }
        if (!this.isExplicitlyIgnored(
          openLibrary,
          assetRow.location_kind,
          assetRow.linked_folder_id,
          resolvedRelativePath,
          'asset',
        )) openLibrary.connection
          .prepare(
            `INSERT OR IGNORE INTO jobs
               (job_id, library_id, asset_id, revision_id, kind, status, priority,
                progress, attempt_count, created_at, updated_at)
             VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', 0, 0.0, 0, ?, ?)`,
          )
          .run(randomUUID(), input.libraryId, input.assetId, revisionId, now, now);

        this.syncAssetSearchContent(openLibrary.connection, input.assetId);
        this.failAt('crash-relink-before-db-commit');
      })();
      this.failAt('crash-relink-after-db-commit');
    } catch (error) {
      if (managedPlacement && !(error instanceof SimulatedCrashError)) {
        this.cleanupManagedRelinkPlacement(managedPlacement, true);
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
    if (managedPlacement) this.cleanupManagedRelinkPlacement(managedPlacement, false);

    // Fetch the updated asset
    const updated = openLibrary.connection
      .prepare(
        `SELECT a.asset_id, a.managed_folder_id, a.linked_folder_id, a.location_kind, a.relative_file_path,
                a.current_revision_id, a.availability, r.byte_size, r.modified_at,
                COALESCE(m.rating, 0) AS rating, COALESCE(m.favorite, 0) AS favorite,
                a.deleted_at, a.trashed_from_relative_path
           FROM assets a
           JOIN revisions r ON r.revision_id = a.current_revision_id
           LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
          WHERE a.asset_id = ?`,
      )
      .get(input.assetId) as AssetSummaryRow & {
        deleted_at: string | null;
        trashed_from_relative_path: string | null;
      } | undefined;
    if (!updated) throw new LibraryServiceError('ASSET_NOT_FOUND');

    return { asset: this.assetSummaryFromRow(updated), batchFollowUpRoot };
  }

  public override batchRelinkRows(openLibrary: OpenLibrary): BatchRelinkAssetRow[] {
    return openLibrary.connection
      .prepare(
        `SELECT assets.asset_id, assets.location_kind, assets.linked_folder_id,
                assets.managed_folder_id, assets.relative_file_path,
                assets.current_revision_id, r.content_fingerprint
           FROM assets
           LEFT JOIN revisions r ON r.revision_id = assets.current_revision_id
          WHERE assets.availability = 'missing' AND assets.deleted_at IS NULL
          ORDER BY assets.relative_file_path`,
      )
      .all() as BatchRelinkAssetRow[];
  }

  /**
   * Index a user-selected recovery root by basename. This is deliberately
   * built only for an explicit relink preview, never during library refresh,
   * so a large library does not pay a recursive scan on open/import.
   * Symlinked files and directories are ignored: recovery must not escape the
   * selected root or bind one physical file through an alias.
   */
  public override indexRelinkCandidates(newRoot: string): Map<string, string[]> {
    const candidates = new Map<string, string[]>();
    const visit = (directory: string): void => {
      let entries;
      try {
        entries = readdirSync(directory, { withFileTypes: true });
      } catch {
        return;
      }
      for (const entry of entries) {
        const candidatePath = path.join(directory, entry.name);
        if (entry.isSymbolicLink()) continue;
        if (entry.isDirectory()) {
          visit(candidatePath);
          continue;
        }
        if (!entry.isFile()) continue;
        try {
          const stat = lstatSync(candidatePath);
          if (!stat.isFile() || stat.isSymbolicLink()) continue;
          const canonicalPath = realpathSync(candidatePath);
          const name = path.basename(candidatePath).normalize('NFC');
          const existing = candidates.get(name) ?? [];
          if (!existing.includes(canonicalPath)) existing.push(canonicalPath);
          candidates.set(name, existing);
        } catch {
          // A file can disappear or become unreadable while the chooser is
          // open; leave it unmatched and let the next preview retry.
        }
      }
    };
    visit(newRoot);
    return candidates;
  }

  public override batchRelinkMatches(
    openLibrary: OpenLibrary,
    newRoot: string,
    rows: BatchRelinkAssetRow[],
  ): Map<string, BatchRelinkMatch> {
    const proposed = new Map<string, BatchRelinkMatch & { candidateIdentity: string }>();
    const candidateUseCount = new Map<string, number>();
    let indexedCandidates: Map<string, string[]> | undefined;
    const fingerprintCache = new Map<string, string | null>();
    const fingerprintFor = (candidatePath: string): string | null => {
      if (fingerprintCache.has(candidatePath)) return fingerprintCache.get(candidatePath) ?? null;
      try {
        const fingerprint = this.computeContentFingerprint(candidatePath);
        fingerprintCache.set(candidatePath, fingerprint);
        return fingerprint;
      } catch {
        fingerprintCache.set(candidatePath, null);
        return null;
      }
    };

    for (const asset of rows) {
      const segments = asset.relative_file_path.split('/');
      let matchedPath: string | undefined;
      for (let n = Math.min(segments.length, 5); n >= 1; n -= 1) {
        const candidatePath = path.join(newRoot, ...segments.slice(-n));
        try {
          const entry = lstatSync(candidatePath);
          if (entry.isFile() && !entry.isSymbolicLink()) {
            matchedPath = realpathSync(candidatePath);
            break;
          }
        } catch {
          // Continue trying a shorter suffix.
        }
      }
      if (!matchedPath) {
        indexedCandidates ??= this.indexRelinkCandidates(newRoot);
        const basename = path.posix.basename(asset.relative_file_path).normalize('NFC');
        const sameNameCandidates = indexedCandidates.get(basename) ?? [];
        if (sameNameCandidates.length === 1) {
          // A unique same-name candidate is recoverable even when the folder
          // hierarchy changed. If there are several, use the stored content
          // fingerprint as the tie-breaker instead of guessing.
          matchedPath = sameNameCandidates[0];
        } else if (sameNameCandidates.length > 1 && asset.content_fingerprint) {
          const fingerprintMatches = sameNameCandidates.filter(
            (candidate) => fingerprintFor(candidate) === asset.content_fingerprint,
          );
          if (fingerprintMatches.length === 1) matchedPath = fingerprintMatches[0];
        }
      }
      if (!matchedPath) continue;

      let resolvedRelativePath = asset.relative_file_path;
      if (asset.location_kind === 'linked') {
        if (!asset.linked_folder_id) continue;
        const linkedFolder = openLibrary.connection
          .prepare('SELECT absolute_root_path FROM linked_folders WHERE folder_id = ?')
          .get(asset.linked_folder_id) as { absolute_root_path: string } | undefined;
        if (!linkedFolder) continue;
        try {
          const canonicalRoot = realpathSync(linkedFolder.absolute_root_path);
          const relation = path.relative(canonicalRoot, matchedPath);
          if (relation === '' || relation.startsWith(`..${path.sep}`) || path.isAbsolute(relation)) {
            continue;
          }
          resolvedRelativePath = normalizeRelativeAssetPath(relation.split(path.sep).join('/'));
        } catch {
          continue;
        }
        const identityConflict = openLibrary.connection
          .prepare(
            `SELECT asset_id FROM assets
              WHERE linked_folder_id = ? AND path_identity = ?
                AND deleted_at IS NULL AND asset_id != ?`,
          )
          .get(
            asset.linked_folder_id,
            portablePathIdentity(resolvedRelativePath),
            asset.asset_id,
          );
        if (identityConflict) continue;
      }

      const candidateIdentity = matchedPath.normalize('NFC');
      proposed.set(asset.asset_id, { matchedPath, resolvedRelativePath, candidateIdentity });
      candidateUseCount.set(candidateIdentity, (candidateUseCount.get(candidateIdentity) ?? 0) + 1);
    }

    const matches = new Map<string, BatchRelinkMatch>();
    for (const [assetId, match] of proposed) {
      // One physical candidate must never be rebound to multiple asset
      // identities merely because their final basenames are equal.
      if (candidateUseCount.get(match.candidateIdentity) !== 1) continue;
      matches.set(assetId, {
        matchedPath: match.matchedPath,
        resolvedRelativePath: match.resolvedRelativePath,
      });
    }
    return matches;
  }

  override relinkBatchPreview(input: {
    libraryId: string;
    newRootPath: string;
  }): { matchedCount: number; unmatchedCount: number; totalCount: number; examples: Array<{ relativeFilePath: string; matched: boolean }> } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    let newRoot: string;
    try {
      newRoot = normalizeAbsolutePath(input.newRootPath);
    } catch (error) {
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }

    if (!realDirectoryExists(newRoot)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE');
    }
    this.assertNoSymlinkEscape(newRoot);

    const rows = this.batchRelinkRows(openLibrary);
    const matches = this.batchRelinkMatches(openLibrary, newRoot, rows);

    let matchedCount = 0;
    let unmatchedCount = 0;
    const examples: Array<{ relativeFilePath: string; matched: boolean }> = [];

    for (const row of rows) {
      const matched = matches.has(row.asset_id);

      if (matched) matchedCount += 1;
      else unmatchedCount += 1;

      if (examples.length < 8) {
        // Use only relative fragment (not absolute)
        const displaySegments = row.relative_file_path.split('/');
        const fragment = displaySegments.slice(-2).join('/');
        examples.push({ relativeFilePath: fragment, matched });
      }
    }

    return {
      matchedCount,
      unmatchedCount,
      totalCount: rows.length,
      examples,
    };
  }

  override relinkBatchApply(input: {
    libraryId: string;
    newRootPath: string;
    keepMetadata: boolean;
  }): { restoredCount: number; unchangedMissingCount: number; assets: AssetSummary[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    let newRoot: string;
    try {
      newRoot = normalizeAbsolutePath(input.newRootPath);
    } catch (error) {
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }

    if (!realDirectoryExists(newRoot)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE');
    }
    this.assertNoSymlinkEscape(newRoot);

    const rows = this.batchRelinkRows(openLibrary);
    const matches = this.batchRelinkMatches(openLibrary, newRoot, rows);

    const now = new Date().toISOString();
    const operationId = randomUUID();
    let restoredCount = 0;
    const restoredAssets: AssetSummary[] = [];
    const managedPlacements: Array<{
      destinationPath: string;
      operationPath: string;
      placedIdentity: ManagedRelinkPlacementIdentity;
      stat: Stats;
    }> = [];

    try {
      openLibrary.connection.transaction(() => {
        const manifest: OperationManifest = {
          version: 1,
          files: [],
          directories: [],
        };
        openLibrary.connection
          .prepare(
            `INSERT INTO file_operations
               (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
             VALUES (?, 'relink-batch', 'committed', ?, NULL, ?, ?)`,
          )
          .run(operationId, JSON.stringify(manifest), now, now);

        for (const asset of rows) {
          const match = matches.get(asset.asset_id);
          if (!match) continue;
          const { matchedPath, resolvedRelativePath } = match;

          let fileStat: Stats;
          let placedPath = matchedPath;
          if (asset.location_kind === 'managed') {
            const placement = this.placeManagedRelinkFile(
              openLibrary,
              matchedPath,
              asset.relative_file_path,
            );
            managedPlacements.push(placement);
            fileStat = placement.stat;
            placedPath = placement.destinationPath;
          } else {
            fileStat = statSync(matchedPath);
          }
          const contentFingerprint = this.computeContentFingerprint(placedPath);
          if (restoredCount === 0) this.failAt('crash-relink-batch-after-first-place');
          const revisionId = randomUUID();
          openLibrary.connection
            .prepare(
              `INSERT INTO revisions
                 (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                  original_filename, origin, accepted_at, content_fingerprint)
               VALUES (?, ?, ?, ?, ?, ?, 'relink', ?, ?)`,
            )
            .run(
              revisionId,
              asset.asset_id,
              asset.current_revision_id ?? null,
              fileStat.size,
              fileStat.mtime.toISOString(),
              path.posix.basename(resolvedRelativePath),
              now,
              contentFingerprint,
            );

          openLibrary.connection
            .prepare(
              `UPDATE assets
                  SET current_revision_id = ?, availability = 'available',
                      relative_file_path = ?, path_identity = ?, updated_at = ?
                WHERE asset_id = ?`,
            )
            .run(
              revisionId,
              resolvedRelativePath,
              portablePathIdentity(resolvedRelativePath),
              now,
              asset.asset_id,
            );

          if (asset.current_revision_id) {
            openLibrary.connection
              .prepare(
                `UPDATE revision_artifacts
                    SET invalidated_at = ?
                  WHERE revision_id = ? AND invalidated_at IS NULL`,
              )
              .run(now, asset.current_revision_id);
          }
          if (!this.isExplicitlyIgnored(
            openLibrary,
            asset.location_kind,
            asset.linked_folder_id,
            resolvedRelativePath,
            'asset',
          )) openLibrary.connection
            .prepare(
              `INSERT OR IGNORE INTO jobs
                 (job_id, library_id, asset_id, revision_id, kind, status, priority,
                  progress, attempt_count, created_at, updated_at)
               VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', 0, 0.0, 0, ?, ?)`,
            )
            .run(randomUUID(), input.libraryId, asset.asset_id, revisionId, now, now);

          if (!input.keepMetadata) {
            // Clear human metadata
            openLibrary.connection
              .prepare(
                `UPDATE asset_metadata
                    SET description = NULL, rating = 0, favorite = 0,
                        palette = NULL, source_page_url = NULL, author = NULL,
                        entity_version = entity_version + 1, updated_at = ?
                  WHERE asset_id = ?`,
              )
              .run(now, asset.asset_id);
            openLibrary.connection
              .prepare('DELETE FROM human_asset_tags WHERE asset_id = ?')
              .run(asset.asset_id);
            openLibrary.connection
              .prepare('DELETE FROM collection_assets WHERE asset_id = ?')
              .run(asset.asset_id);
            openLibrary.connection
              .prepare('DELETE FROM ai_asset_tags WHERE asset_id = ?')
              .run(asset.asset_id);
            openLibrary.connection
              .prepare('DELETE FROM ai_content WHERE asset_id = ?')
              .run(asset.asset_id);
          }

          this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
          restoredCount += 1;
        }
        this.failAt('crash-relink-before-db-commit');
      })();
      this.failAt('crash-relink-after-db-commit');
    } catch (error) {
      if (!(error instanceof SimulatedCrashError)) {
        for (const placement of managedPlacements) {
          this.cleanupManagedRelinkPlacement(placement, true);
        }
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
    for (const placement of managedPlacements) {
      this.cleanupManagedRelinkPlacement(placement, false);
    }

    // Fetch restored assets
    if (restoredCount > 0) {
      const restoredAssetIds = rows
        .filter((r) => {
          // Re-check which ones succeeded (transaction committed)
          const updated = openLibrary.connection
            .prepare(
              "SELECT asset_id FROM assets WHERE asset_id = ? AND availability = 'available'",
            )
            .get(r.asset_id);
          return !!updated;
        })
        .map((r) => r.asset_id);

      for (const assetId of restoredAssetIds) {
        const updated = openLibrary.connection
          .prepare(
            `SELECT a.asset_id, a.managed_folder_id, a.linked_folder_id, a.location_kind, a.relative_file_path,
                    a.current_revision_id, a.availability, r.byte_size, r.modified_at,
                    COALESCE(m.rating, 0) AS rating, COALESCE(m.favorite, 0) AS favorite,
                    a.deleted_at, a.trashed_from_relative_path
               FROM assets a
               JOIN revisions r ON r.revision_id = a.current_revision_id
               LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
              WHERE a.asset_id = ?`,
          )
          .get(assetId) as AssetSummaryRow & {
            deleted_at: string | null;
            trashed_from_relative_path: string | null;
          } | undefined;
        if (updated) {
          restoredAssets.push(this.assetSummaryFromRow(updated));
        }
      }
    }

    const unchangedMissingCount =
      rows.filter((r) => {
        const still = openLibrary.connection
          .prepare(
            "SELECT asset_id FROM assets WHERE asset_id = ? AND availability = 'missing'",
          )
          .get(r.asset_id);
        return !!still;
      }).length;

    if (restoredCount > 0) {
      const refreshed = this.refreshManagedAssets(input.libraryId, { includeAssets: true });
      const restoredIds = new Set(
        rows.filter((row) => matches.has(row.asset_id)).map((row) => row.asset_id),
      );
      restoredAssets.length = 0;
      for (const asset of refreshed.assets ?? []) {
        if (restoredIds.has(asset.assetId)) {
          restoredAssets.push(asset);
        }
      }
    }

    return { restoredCount, unchangedMissingCount, assets: restoredAssets };
  }

  public override normalizeLinkedFolderRule(rule: LinkedFolderRule): LinkedFolderRule {
    const pattern = rule.pattern.trim().normalize('NFC');
    if (pattern.length === 0 || pattern.length > 512 || pattern.includes('\0')) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME');
    }
    if (rule.target === 'path') {
      try {
        return { ...rule, pattern: normalizeRelativeAssetPath(pattern) };
      } catch (error) {
        throw new LibraryServiceError('INVALID_FOLDER_NAME', { cause: error });
      }
    }
    if (pattern.includes('/') || pattern.includes('\\') || pattern === '.' || pattern === '..') {
      throw new LibraryServiceError('INVALID_FOLDER_NAME');
    }
    const normalizedPattern = rule.target === 'extension'
      ? pattern.replace(/^\.+/u, '').toLowerCase()
      : pattern;
    if (normalizedPattern.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');
    return { ...rule, pattern: normalizedPattern };
  }

  public override normalizeExplicitIgnorePath(relativePath: string, allowRoot = false): string {
    const trimmed = relativePath.trim().normalize('NFC').replaceAll('\\', '/');
    if (allowRoot && trimmed === '') return '';
    try {
      return normalizeRelativeAssetPath(trimmed);
    } catch (error) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME', { cause: error });
    }
  }

  public override explicitIgnoreSql(
    connection: DatabaseConnection,
    alias = 'a',
    showIgnored = false,
  ): string {
    if (showIgnored) {
      return buildCatalogExplicitIgnoreSql({
        alias,
        showIgnored,
        hasExplicitIgnorePaths: false,
        hasGitignoreIgnoredPaths: false,
      });
    }
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the
    // ignore-rule tables have no ignored paths to exclude; skip the
    // subqueries instead of failing on the missing tables.
    return buildCatalogExplicitIgnoreSql({
      alias,
      showIgnored,
      hasExplicitIgnorePaths: hasTable(connection, 'explicit_ignored_paths'),
      hasGitignoreIgnoredPaths: hasTable(connection, 'gitignore_ignored_paths'),
    });
  }

  public override explicitFolderIgnored(
    openLibrary: OpenLibrary,
    locationKind: 'managed' | 'linked',
    linkedFolderId: string | null,
    relativePath: string,
  ): boolean {
    if (gitignoreMatchesPath(openLibrary.gitignoreMatcher, relativePath, 'folder', locationKind)) {
      return true;
    }
    // Serpent-verg review fix: libraries predating the ignore-rule table
    // have no explicit ignores.
    if (!hasTable(openLibrary.connection, 'explicit_ignored_paths')) return false;
    const normalized = this.normalizeExplicitIgnorePath(relativePath, locationKind === 'linked');
    const row = openLibrary.connection.prepare(
      `SELECT 1 FROM explicit_ignored_paths
        WHERE location_kind = ?
          AND linked_folder_id = ?
          AND path_kind = 'folder'
          AND (
            relative_path = ''
            OR ? = relative_path
            OR ? LIKE relative_path || '/%'
          )
       UNION ALL
       SELECT 1 FROM gitignore_ignored_paths
        WHERE ? = 'managed'
          AND path_kind = 'folder'
          AND (
            relative_path = ?
            OR ? LIKE relative_path || '/%'
          )
        LIMIT 1`,
    ).get(locationKind, linkedFolderId ?? '', normalized, normalized, locationKind, normalized, normalized);
    return row !== undefined;
  }

  public override isExplicitlyIgnored(
    openLibrary: OpenLibrary,
    locationKind: 'managed' | 'linked',
    linkedFolderId: string | null,
    relativePath: string,
    pathKind: 'asset' | 'folder',
  ): boolean {
    if (pathKind === 'folder') {
      return this.explicitFolderIgnored(openLibrary, locationKind, linkedFolderId, relativePath);
    }
    if (gitignoreMatchesPath(openLibrary.gitignoreMatcher, relativePath, 'asset', locationKind)) {
      return true;
    }
    const normalized = this.normalizeExplicitIgnorePath(
      relativePath,
      false,
    );
    // Serpent-4bdd26: this runs once per enumerated file on every refresh;
    // a per-call .prepare() recompiled the 4-way UNION each time (measured
    // ~410ms of pure compile time per 20k files vs 54ms cached).
    const row = this.prepareCached<{ get(...parameters: unknown[]): unknown }>(
      openLibrary,
      `SELECT 1 FROM explicit_ignored_paths
        WHERE location_kind = ?
          AND linked_folder_id = ?
          AND path_kind = 'folder'
          AND (
            relative_path = ''
            OR ? = relative_path
            OR ? LIKE relative_path || '/%'
          )
        UNION ALL
       SELECT 1 FROM explicit_ignored_paths
        WHERE location_kind = ?
          AND linked_folder_id = ?
          AND path_kind = 'asset'
          AND relative_path = ?
        UNION ALL
       SELECT 1 FROM explicit_ignored_paths
        WHERE location_kind = ?
          AND linked_folder_id = ?
          AND path_kind = 'extension'
          AND LOWER(?) LIKE '%.' || LOWER(relative_path)
       UNION ALL
       SELECT 1 FROM gitignore_ignored_paths
        WHERE ? = 'managed'
          AND path_kind = 'asset'
          AND relative_path = ?
        LIMIT 1`,
    ).get(
      locationKind,
      linkedFolderId ?? '',
      normalized,
      normalized,
      locationKind,
      linkedFolderId ?? '',
      normalized,
      locationKind,
      linkedFolderId ?? '',
      normalized,
      locationKind,
      normalized,
    );
    if (!row) return false;
    return true;
  }

  public override assertAssetsNotExplicitlyIgnored(
    openLibrary: OpenLibrary,
    assetIds: string[],
  ): void {
    if (assetIds.length === 0) return;
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
    }>({
      connection: openLibrary.connection,
      values: assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, location_kind, linked_folder_id, relative_file_path
           FROM assets
          WHERE asset_id IN (${placeholders})
            AND deleted_at IS NULL`,
    });
    for (const row of rows) {
      if (this.isExplicitlyIgnored(openLibrary, row.location_kind, row.linked_folder_id, row.relative_file_path, 'asset')) {
        throw new LibraryServiceError('ASSET_NOT_FOUND');
      }
    }
  }

  override getGitignore(libraryId: string): { content: string } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return { content: openLibrary.gitignoreText };
  }

  override setGitignore(input: { libraryId: string; content: string }): { content: string } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (openLibrary.readOnly || input.content.length > 1_000_000 || input.content.includes('\0')) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE');
    }
    try {
      writeFileSync(gitignorePath(openLibrary.summary.libraryPath), input.content, 'utf8');
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    this.noteClientFilesystemMutation();
    this.syncGitignore(openLibrary, input.content);
    return { content: input.content };
  }

  public override updateGitignoreRule(
    openLibrary: OpenLibrary,
    positive: string,
    ignored: boolean,
  ): void {
    if (positive.length === 0) return;
    const negative = `!${positive}`;
    const lines = openLibrary.gitignoreText.split(/\r?\n/u);
    const filtered = lines.filter((line) => {
      // Keep comments and blank separators intact.  Only remove the exact
      // generated positive/negative rule (plus harmless trailing spaces), so
      // repeated context-menu actions never accumulate duplicates or erase
      // the user's formatting.
      const comparable = line.trimEnd();
      return comparable !== positive && comparable !== negative;
    });
    while (filtered.at(-1) === '') filtered.pop();
    filtered.push(ignored ? positive : negative);
    const next = `${filtered.join('\n')}\n`;
    if (next === openLibrary.gitignoreText) return;
    try {
      writeFileSync(gitignorePath(openLibrary.summary.libraryPath), next, 'utf8');
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    this.noteClientFilesystemMutation();
    this.syncGitignore(openLibrary, next);
  }

  public override ignoreGitignoreRule(
    locationKind: 'managed' | 'linked',
    relativePath: string,
    pathKind: 'asset' | 'folder' | 'extension',
  ): string | undefined {
    const normalized = pathKind === 'extension'
      ? relativePath.trim().replace(/^\.+/u, '').toLowerCase()
      : this.normalizeExplicitIgnorePath(relativePath, false);
    if (!normalized) return undefined;
    if (pathKind === 'extension') return `*.${normalized}`;
    const suffix = pathKind === 'folder' ? '/' : '';
    return locationKind === 'managed'
      ? `Assets/${normalized}${suffix}`
      : `${normalized}${suffix}`;
  }

  public override managedGitignoreRule(
    relativePath: string,
    pathKind: 'asset' | 'folder' | 'extension',
  ): string | undefined {
    return this.ignoreGitignoreRule('managed', relativePath, pathKind);
  }

  override listIgnoredPaths(libraryId: string): IgnoredPath[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const rows = openLibrary.connection.prepare(
      `SELECT e.location_kind, NULLIF(e.linked_folder_id, '') AS linked_folder_id,
              e.relative_path, e.path_kind, e.ignored_at,
              CASE
                WHEN e.relative_path = '' THEN COALESCE(l.display_name, 'Assets')
                ELSE e.relative_path
              END AS display_name
         FROM explicit_ignored_paths e
         LEFT JOIN linked_folders l ON l.folder_id = e.linked_folder_id
        ORDER BY e.location_kind, e.relative_path, e.path_kind`,
    ).all() as Array<{
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_path: string;
      path_kind: 'asset' | 'folder' | 'extension';
      ignored_at: string;
      display_name: string;
    }>;
    // Managed rules are stored in .serpentignore. The materialized table is
    // used by browse/search hot paths, but can lag behind a newly discovered
    // file; evaluate the current matcher here so Settings always shows the
    // actual files and folders currently affected by the rules.
    const ignoredAt = new Date().toISOString();
    if (hasTable(openLibrary.connection, 'managed_folders')) {
      const managedFolders = openLibrary.connection.prepare(
        `SELECT relative_path FROM managed_folders ORDER BY relative_path`,
      ).all() as Array<{ relative_path: string }>;
      for (const folder of managedFolders) {
        if (!gitignoreMatchesPath(openLibrary.gitignoreMatcher, folder.relative_path, 'folder')) {
          continue;
        }
        rows.push({
          location_kind: 'managed',
          linked_folder_id: null,
          relative_path: folder.relative_path,
          path_kind: 'folder',
          ignored_at: ignoredAt,
          display_name: folder.relative_path,
        });
      }
    }
    if (hasTable(openLibrary.connection, 'assets')) {
      const managedAssets = openLibrary.connection.prepare(
        `SELECT relative_file_path AS relative_path
           FROM assets
          WHERE location_kind = 'managed' AND deleted_at IS NULL
          ORDER BY relative_file_path`,
      ).all() as Array<{ relative_path: string }>;
      for (const asset of managedAssets) {
        if (!gitignoreMatchesPath(openLibrary.gitignoreMatcher, asset.relative_path, 'asset')) {
          continue;
        }
        rows.push({
          location_kind: 'managed',
          linked_folder_id: null,
          relative_path: asset.relative_path,
          path_kind: 'asset',
          ignored_at: ignoredAt,
          display_name: asset.relative_path,
        });
      }
      const linkedAssets = openLibrary.connection.prepare(
        `SELECT linked_folder_id, relative_file_path AS relative_path
           FROM assets
          WHERE location_kind = 'linked' AND deleted_at IS NULL AND linked_folder_id IS NOT NULL
          ORDER BY linked_folder_id, relative_file_path`,
      ).all() as Array<{ linked_folder_id: string; relative_path: string }>;
      const linkedPathsByFolder = new Map<string, string[]>();
      for (const asset of linkedAssets) {
        const paths = linkedPathsByFolder.get(asset.linked_folder_id);
        if (paths) paths.push(asset.relative_path);
        else linkedPathsByFolder.set(asset.linked_folder_id, [asset.relative_path]);
        if (gitignoreMatchesPath(openLibrary.gitignoreMatcher, asset.relative_path, 'asset', 'linked')) {
          rows.push({
            location_kind: 'linked',
            linked_folder_id: asset.linked_folder_id,
            relative_path: asset.relative_path,
            path_kind: 'asset',
            ignored_at: ignoredAt,
            display_name: asset.relative_path,
          });
        }
      }
      for (const [linkedFolderId, paths] of linkedPathsByFolder) {
        for (const prefix of collectLinkedDirectoryPrefixes(paths)) {
          if (!gitignoreMatchesPath(openLibrary.gitignoreMatcher, prefix, 'folder', 'linked')) {
            continue;
          }
          rows.push({
            location_kind: 'linked',
            linked_folder_id: linkedFolderId,
            relative_path: prefix,
            path_kind: 'folder',
            ignored_at: ignoredAt,
            display_name: prefix,
          });
        }
      }
    }
    return rows
      .sort((a, b) =>
        a.location_kind.localeCompare(b.location_kind) ||
        a.relative_path.localeCompare(b.relative_path) ||
        a.path_kind.localeCompare(b.path_kind),
      )
      .map((row) => ({
        locationKind: row.location_kind,
        linkedFolderId: row.linked_folder_id,
        relativePath: row.relative_path,
        pathKind: row.path_kind,
        displayName: row.display_name,
        ignoredAt: row.ignored_at,
      }));
  }

  override previewGitignore(libraryId: string, content: string): GitignorePreview {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return diffGitignoreHits(
      this.collectGitignorePreviewCandidates(openLibrary),
      openLibrary.gitignoreMatcher,
      parseGitignore(content),
    );
  }

  public override collectGitignorePreviewCandidates(openLibrary: OpenLibrary): GitignorePreviewCandidate[] {
    const byKey = new Map<string, GitignorePreviewCandidate>();
    const add = (candidate: GitignorePreviewCandidate) => {
      if (candidate.relativePath.length === 0) return;
      byKey.set(gitignorePreviewCandidateKey(candidate), candidate);
    };
    const linkedFolders = hasTable(openLibrary.connection, 'linked_folders')
      ? openLibrary.connection.prepare(
        `SELECT folder_id, display_name, status, absolute_root_path
           FROM linked_folders`,
      ).all() as Array<{
        folder_id: string;
        display_name: string;
        status: 'available' | 'offline';
        absolute_root_path: string;
      }>
      : [];
    const linkedNames = new Map(linkedFolders.map((folder) => [folder.folder_id, folder.display_name]));
    const linkedDisplayName = (linkedFolderId: string, relativePath: string): string => {
      const rootName = linkedNames.get(linkedFolderId);
      return rootName === undefined ? relativePath : `${rootName}/${relativePath}`;
    };

    if (hasTable(openLibrary.connection, 'managed_folders')) {
      const managedFolders = openLibrary.connection.prepare(
        `SELECT relative_path FROM managed_folders ORDER BY relative_path`,
      ).all() as Array<{ relative_path: string }>;
      for (const folder of managedFolders) {
        add({
          locationKind: 'managed',
          linkedFolderId: null,
          relativePath: folder.relative_path,
          pathKind: 'folder',
          displayName: folder.relative_path,
        });
      }
    }

    if (hasTable(openLibrary.connection, 'assets')) {
      const managedAssets = openLibrary.connection.prepare(
        `SELECT relative_file_path AS relative_path
           FROM assets
          WHERE location_kind = 'managed' AND deleted_at IS NULL
          ORDER BY relative_file_path`,
      ).all() as Array<{ relative_path: string }>;
      for (const asset of managedAssets) {
        add({
          locationKind: 'managed',
          linkedFolderId: null,
          relativePath: asset.relative_path,
          pathKind: 'asset',
          displayName: asset.relative_path,
        });
      }

      const linkedAssets = openLibrary.connection.prepare(
        `SELECT linked_folder_id, relative_file_path AS relative_path
           FROM assets
          WHERE location_kind = 'linked' AND deleted_at IS NULL AND linked_folder_id IS NOT NULL
          ORDER BY linked_folder_id, relative_file_path`,
      ).all() as Array<{ linked_folder_id: string; relative_path: string }>;
      const linkedPathsByFolder = new Map<string, string[]>();
      for (const asset of linkedAssets) {
        const paths = linkedPathsByFolder.get(asset.linked_folder_id);
        if (paths) paths.push(asset.relative_path);
        else linkedPathsByFolder.set(asset.linked_folder_id, [asset.relative_path]);
        add({
          locationKind: 'linked',
          linkedFolderId: asset.linked_folder_id,
          relativePath: asset.relative_path,
          pathKind: 'asset',
          displayName: linkedDisplayName(asset.linked_folder_id, asset.relative_path),
        });
      }
      for (const [linkedFolderId, paths] of linkedPathsByFolder) {
        for (const prefix of collectLinkedDirectoryPrefixes(paths)) {
          add({
            locationKind: 'linked',
            linkedFolderId,
            relativePath: prefix,
            pathKind: 'folder',
            displayName: linkedDisplayName(linkedFolderId, prefix),
          });
        }
      }
    }

    const libraryId = openLibrary.summary.libraryId;
    for (const folder of linkedFolders) {
      if (folder.status !== 'available' || this.linkedRootIsGone(folder.absolute_root_path)) continue;
      const prefixes = this.collectLinkedDirectoryPrefixesFromDisk(
        openLibrary,
        folder.folder_id,
        folder.absolute_root_path,
        this.getLinkedFolderRules({ libraryId, folderId: folder.folder_id }),
        true,
      );
      for (const prefix of prefixes) {
        add({
          locationKind: 'linked',
          linkedFolderId: folder.folder_id,
          relativePath: prefix,
          pathKind: 'folder',
          displayName: linkedDisplayName(folder.folder_id, prefix),
        });
      }
    }

    return [...byKey.values()];
  }

  override setIgnore(input: {
    libraryId: string;
    locationKind: 'managed' | 'linked';
    linkedFolderId?: string | null;
    relativePath: string;
    pathKind: 'asset' | 'folder' | 'extension';
    ignored: boolean;
  }): { ignored: boolean; path: IgnoredPath } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const linkedFolderId = input.locationKind === 'linked' ? input.linkedFolderId ?? null : null;
    const relativePath = input.pathKind === 'extension'
      ? input.relativePath.trim().replace(/^\.+/u, '').toLowerCase()
      : this.normalizeExplicitIgnorePath(
        input.relativePath,
        input.locationKind === 'linked' && input.pathKind === 'folder',
      );
    if (input.pathKind === 'extension' && (relativePath.length === 0 || relativePath.includes('/') || relativePath.includes('\\'))) {
      throw new LibraryServiceError('INVALID_FOLDER_NAME');
    }
    if (input.locationKind === 'linked' && !linkedFolderId) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    if (input.pathKind === 'asset') {
      const row = openLibrary.connection.prepare(
        `SELECT asset_id FROM assets
          WHERE location_kind = ?
            AND linked_folder_id IS ?
            AND relative_file_path = ?
            AND deleted_at IS NULL`,
      ).get(input.locationKind, linkedFolderId, relativePath);
      if (!row) throw new LibraryServiceError('ASSET_NOT_FOUND');
    } else if (input.pathKind === 'extension') {
      if (input.locationKind === 'linked' && !linkedFolderId) {
        throw new LibraryServiceError('FOLDER_NOT_FOUND');
      }
    } else if (input.locationKind === 'managed') {
      const row = openLibrary.connection.prepare(
        'SELECT folder_id FROM managed_folders WHERE relative_path = ?',
      ).get(relativePath);
      if (!row) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    } else {
      const row = openLibrary.connection.prepare(
        'SELECT folder_id FROM linked_folders WHERE folder_id = ? AND library_id = ?',
      ).get(linkedFolderId, input.libraryId);
      if (!row) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    if (input.locationKind === 'managed' || !(input.pathKind === 'folder' && relativePath === '')) {
      // File-backed ignore: one .serpentignore for managed and linked trees.
      // An empty linked-root path still uses explicit_ignored_paths because
      // there is no relative path to write into the ignore file.
      const rule = this.ignoreGitignoreRule(input.locationKind, relativePath, input.pathKind);
      if (rule !== undefined) this.updateGitignoreRule(openLibrary, rule, input.ignored);
      if (input.locationKind === 'linked' && !input.ignored) {
        openLibrary.connection.prepare(
          `DELETE FROM explicit_ignored_paths
            WHERE location_kind = ? AND linked_folder_id = ? AND relative_path = ? AND path_kind = ?`,
        ).run(input.locationKind, linkedFolderId ?? '', relativePath, input.pathKind);
      }
      return {
        ignored: input.ignored,
        path: {
          locationKind: input.locationKind,
          linkedFolderId: input.locationKind === 'linked' ? linkedFolderId : null,
          relativePath,
          pathKind: input.pathKind,
          displayName: relativePath || 'Assets',
          ignoredAt: new Date().toISOString(),
        },
      };
    }
    const sourceFolderId = linkedFolderId ?? '';
    const write = openLibrary.connection.prepare(
      `INSERT OR REPLACE INTO explicit_ignored_paths
        (location_kind, linked_folder_id, relative_path, path_kind, ignored_at)
       VALUES (?, ?, ?, ?, ?)`,
    );
    const remove = openLibrary.connection.prepare(
      `DELETE FROM explicit_ignored_paths
        WHERE location_kind = ? AND linked_folder_id = ? AND relative_path = ? AND path_kind = ?`,
    );
    if (input.ignored) {
      write.run(input.locationKind, sourceFolderId, relativePath, input.pathKind, new Date().toISOString());
    } else {
      remove.run(input.locationKind, sourceFolderId, relativePath, input.pathKind);
    }
    const pathRow = openLibrary.connection.prepare(
      `SELECT e.location_kind, NULLIF(e.linked_folder_id, '') AS linked_folder_id,
              e.relative_path, e.path_kind, e.ignored_at,
              CASE WHEN e.relative_path = '' THEN COALESCE(l.display_name, 'Assets')
                   ELSE e.relative_path END AS display_name
         FROM explicit_ignored_paths e
         LEFT JOIN linked_folders l ON l.folder_id = e.linked_folder_id
        WHERE e.location_kind = ? AND e.linked_folder_id = ?
          AND e.relative_path = ? AND e.path_kind = ?`,
    ).get(input.locationKind, sourceFolderId, relativePath, input.pathKind) as {
      location_kind: 'managed' | 'linked'; linked_folder_id: string | null;
      relative_path: string; path_kind: 'asset' | 'folder' | 'extension'; ignored_at: string; display_name: string;
    } | undefined;
    return {
      ignored: input.ignored,
      path: pathRow ? {
        locationKind: pathRow.location_kind,
        linkedFolderId: pathRow.linked_folder_id,
        relativePath: pathRow.relative_path,
        pathKind: pathRow.path_kind,
        displayName: pathRow.display_name,
        ignoredAt: pathRow.ignored_at,
      } : {
        locationKind: input.locationKind,
        linkedFolderId,
        relativePath,
        pathKind: input.pathKind,
        displayName: relativePath || 'Assets',
        ignoredAt: new Date().toISOString(),
      },
    };
  }

  public override linkedPathIsIgnored(relativePath: string, rules: LinkedFolderRule[]): boolean {
    const normalizedPath = normalizeRelativeAssetPath(relativePath);
    if (isAlwaysIgnoredAssetPath(normalizedPath)) return true;
    const segments = normalizedPath.split('/');
    const filename = segments.at(-1)!;
    const folders = segments.slice(0, -1);
    const extension = path.posix.extname(filename).replace(/^\./u, '');
    const fold = (value: string): string => value.normalize('NFC').toLocaleLowerCase('en-US');
    let ignored = false;
    for (const rawRule of rules) {
      if (!rawRule.enabled) continue;
      const rule = this.normalizeLinkedFolderRule(rawRule);
      const pattern = fold(rule.pattern);
      const matches = rule.target === 'path'
        ? fold(normalizedPath) === pattern || fold(normalizedPath).startsWith(`${pattern}/`)
        : rule.target === 'filename'
          ? fold(filename) === pattern
          : rule.target === 'extension'
            ? fold(extension) === pattern
            : folders.some((folder) => fold(folder) === pattern);
      if (matches) ignored = rule.action === 'exclude';
    }
    return ignored;
  }

  public override enumerateLinkedSources(
    rootPath: string,
    linkedFolderId?: string,
    suppliedRules?: LinkedFolderRule[],
    explicitlyIgnored?: (relativePath: string, pathKind: 'asset' | 'folder') => boolean,
    onDiscovered?: (foundCount: number, entryBytes: number) => void,
  ): Array<{
    relativePath: string;
    byteSize: number;
    modifiedAt: string;
    originalFilename: string;
    sourceDevice: string;
    sourceInode: string;
  }> {
    const entries: Array<{
      relativePath: string;
      byteSize: number;
      modifiedAt: string;
      originalFilename: string;
      sourceDevice: string;
      sourceInode: string;
    }> = [];
    const rules = suppliedRules ?? (linkedFolderId
      ? this.getLinkedFolderRules({
          libraryId: [...this.openById.values()].find((open) => open.connection.prepare(
            'SELECT folder_id FROM linked_folders WHERE folder_id = ?',
          ).get(linkedFolderId))?.summary.libraryId ?? '',
          folderId: linkedFolderId,
        })
      : []);
    const visit = (directoryPath: string, relativeDirectory: string): void => {
      let children;
      try {
        children = readdirSync(directoryPath, { withFileTypes: true }).sort((left, right) =>
          left.name.localeCompare(right.name),
        );
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
      }
      for (const child of children) {
        const childRelative =
          relativeDirectory === ''
            ? child.name
            : path.posix.join(relativeDirectory, child.name);
        // Symlinks are neither followed nor registered; this prevents a linked
        // root from pulling in bytes outside itself via a hostile link.
        if (child.isSymbolicLink()) {
          this.diagnose(
            'linked-folder.symlink-skipped',
            new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
            }),
            { linkedFolderId, rootPath, relativePath: childRelative },
          );
          continue;
        }
        if (child.isDirectory()) {
          if (explicitlyIgnored?.(childRelative, 'folder')) continue;
          const canPrune = !rules.some((rule) => rule.enabled && rule.action === 'include')
            && this.linkedPathIsIgnored(path.posix.join(childRelative, '__serpent_probe__'), rules);
          if (canPrune) continue;
          visit(path.join(directoryPath, child.name), childRelative);
          continue;
        }
        if (!child.isFile()) continue;
        const childPath = path.join(directoryPath, child.name);
        let stat: BigIntStats | Stats;
        try {
          // Serpent-4bdd26: honor the assetLstat test seam so injected stat
          // failures surface during enumeration, before the comparison loop
          // can shortcut via the snapshot.
          stat = this.options.assetLstat
            ? this.options.assetLstat(childPath)
            : lstatSync(childPath, { bigint: true });
        } catch (error) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
        }
        if (stat.isSymbolicLink()) {
          this.diagnose(
            'linked-folder.symlink-skipped',
            new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
            }),
            { linkedFolderId, rootPath, relativePath: childRelative },
          );
          continue;
        }
        if (!stat.isFile()) continue;
        let normalized: string;
        try {
          normalized = normalizeRelativeAssetPath(childRelative);
        } catch (error) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
        }
        if (this.linkedPathIsIgnored(normalized, rules) || explicitlyIgnored?.(normalized, 'asset')) continue;
        const byteSize = Number(stat.size);
        if (!Number.isSafeInteger(byteSize)) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
            reason: 'UNSUPPORTED_FILE_ENTRY',
          });
        }
        entries.push({
          relativePath: normalized,
          byteSize,
          modifiedAt: stat.mtime.toISOString(),
          originalFilename: child.name,
          sourceDevice: String(stat.dev),
          sourceInode: String(stat.ino),
        });
        onDiscovered?.(entries.length, byteSize);
      }
    };
    visit(rootPath, '');
    return entries;
  }

  public override enumerateManagedSources(
    assetsRootPath: string,
    explicitlyIgnored?: (relativePath: string, pathKind: 'asset' | 'folder') => boolean,
  ): Array<{
    relativePath: string;
    byteSize: number;
    modifiedAt: string;
    originalFilename: string;
    sourceDevice: string;
    sourceInode: string;
  }> {
    const entries: Array<{
      relativePath: string;
      byteSize: number;
      modifiedAt: string;
      originalFilename: string;
      sourceDevice: string;
      sourceInode: string;
    }> = [];
    const visit = (directoryPath: string, relativeDirectory: string): void => {
      let children;
      try {
        children = readdirSync(directoryPath, { withFileTypes: true }).sort((left, right) =>
          left.name.localeCompare(right.name),
        );
      } catch (error) {
        throw new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error });
      }
      for (const child of children) {
        const childRelative =
          relativeDirectory === ''
            ? child.name
            : path.posix.join(relativeDirectory, child.name);
        if (child.isSymbolicLink()) {
          this.diagnose(
            'managed-asset.symlink-skipped',
            new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
            }),
            { assetsRootPath, relativePath: childRelative },
          );
          continue;
        }
        if (child.isDirectory()) {
          if (isDefaultIgnoredAssetEntry(child.name, 'directory')) continue;
          if (explicitlyIgnored?.(childRelative, 'folder')) continue;
          visit(path.join(directoryPath, child.name), childRelative);
          continue;
        }
        if (!child.isFile()) continue;
        const childPath = path.join(directoryPath, child.name);
        let stat: BigIntStats | Stats;
        try {
          // Serpent-4bdd26: honor the assetLstat test seam so injected stat
          // failures surface during enumeration, before the comparison loop
          // can shortcut via the snapshot.
          stat = this.options.assetLstat
            ? this.options.assetLstat(childPath)
            : lstatSync(childPath, { bigint: true });
        } catch (error) {
          // ENOENT/ENOTDIR mean the entry vanished between readdir and stat;
          // skip it here so the comparison loop records it as missing instead
          // of aborting the whole refresh (same classification as the loop's
          // own fallback stat). EACCES/EIO and friends still propagate.
          if (isUnreadablePathError(error)) continue;
          throw new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error });
        }
        if (stat.isSymbolicLink()) {
          this.diagnose(
            'managed-asset.symlink-skipped',
            new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
            }),
            { assetsRootPath, relativePath: childRelative },
          );
          continue;
        }
        if (!stat.isFile()) continue;
        if (isDefaultIgnoredAssetEntry(child.name, 'file')) continue;
        let normalized: string;
        try {
          normalized = normalizeRelativeAssetPath(childRelative);
        } catch (error) {
          throw new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error });
        }
        const byteSize = Number(stat.size);
        if (!Number.isSafeInteger(byteSize)) {
          throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
            reason: 'UNSUPPORTED_FILE_ENTRY',
          });
        }
        if (explicitlyIgnored?.(normalized, 'asset')) continue;
        entries.push({
          relativePath: normalized,
          byteSize,
          modifiedAt: new Date(Number(stat.mtimeMs)).toISOString(),
          originalFilename: child.name,
          sourceDevice: String(stat.dev),
          sourceInode: String(stat.ino),
        });
      }
    };
    visit(assetsRootPath, '');
    return entries;
  }

  /**
   * Copy external paths into a linked folder root and register via refresh
   * (Serpent-d3h / LINK-005). Returns an ImportCompletion-shaped result when
   * called from prepareOrExecuteImport; prepareImport routes linked targets
   * here via a zero-conflict plan + immediate resolve is not used — instead
   * prepareOrExecuteImport short-circuits.
   */
  override importPathsIntoLinkedFolder(input: {
    libraryId: string;
    linkedFolderId: string;
    relativePath?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
  }): ImportCompletion {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const folder = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders
          WHERE folder_id = ? AND library_id = ?`,
      )
      .get(input.linkedFolderId, input.libraryId) as
      | { folder_id: string; absolute_root_path: string; status: string }
      | undefined;
    if (!folder) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    if (folder.status !== 'available' || !realDirectoryExists(folder.absolute_root_path)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'SOURCE_NOT_FOUND',
      });
    }

    let targetPrefix = '';
    if (input.relativePath !== undefined && input.relativePath !== '') {
      const target = this.resolveLinkedDirectoryMutationTarget(
        openLibrary,
        input.linkedFolderId,
        input.relativePath,
      );
      targetPrefix = target.relativePath;
    }

    const { entries } = this.enumerateImportSources({
      sourceKind: input.sourceKind,
      sourcePaths: input.sourcePaths,
      targetPrefix,
      expandImageSequences: input.expandImageSequences === true,
    });
    if (entries.length === 0) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE');
    }

    const occupied = new Set<string>();
    const written: string[] = [];
    try {
      for (const entry of entries) {
        const originalRelative = normalizeRelativeAssetPath(
          entry.destinationRelativePath,
        );
        const originalName = path.posix.basename(originalRelative);
        const parentRelative = path.posix.dirname(originalRelative);
        let relativeDestination = originalRelative;
        let destination = path.join(
          folder.absolute_root_path,
          ...relativeDestination.split('/'),
        );
        const destinationExists = (): boolean =>
          occupied.has(portablePathIdentity(relativeDestination)) ||
          existsSync(destination);
        if (destinationExists()) {
          let found = false;
          for (let suffix = 2; suffix < 10_000 && !found; suffix += 1) {
            for (const candidate of copyNameCandidates(originalName, suffix)) {
              relativeDestination = normalizeRelativeAssetPath(
                parentRelative === '.'
                  ? candidate
                  : path.posix.join(parentRelative, candidate),
              );
              destination = path.join(
                folder.absolute_root_path,
                ...relativeDestination.split('/'),
              );
              if (!destinationExists()) {
                found = true;
                break;
              }
            }
          }
          if (!found) {
            throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
              reason: 'NAME_NOT_SUPPORTED',
            });
          }
        }
        mkdirSync(path.dirname(destination), { recursive: true });
        copyFileSync(entry.sourcePath, destination, constants.COPYFILE_EXCL);
        written.push(relativeDestination);
        occupied.add(portablePathIdentity(relativeDestination));
      }
    } catch (error) {
      for (const relativePath of written.reverse()) {
        rmSync(
          path.join(folder.absolute_root_path, ...relativePath.split('/')),
          { force: true },
        );
      }
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }

    // 只注册本次写入的文件，避免 refreshManagedAssets 全量枚举所有链接文件夹
    // 导致的导入缓慢（Serpent-f6f779）。
    this.registerWrittenLinkedAssets(
      openLibrary,
      input.linkedFolderId,
      folder.absolute_root_path,
      written,
    );
    const identities = new Set(written.map(portablePathIdentity));
    const assets = this.listAssets({
      libraryId: input.libraryId,
      folderId: input.linkedFolderId,
      recursive: true,
    }).filter((asset) =>
      identities.has(portablePathIdentity(asset.relativeFilePath)),
    );
    return {
      importedCount: assets.length,
      fileCount: assets.length,
      assetCount: assets.length,
      skippedCount: Math.max(0, entries.length - assets.length),
      replacedCount: 0,
      assets,
    };
  }

  /**
   * 直接把新写入链接目录的文件注册为链接资产，替代全库 refreshManagedAssets。
   * 写入路径（importPathsIntoLinkedFolder / copyAssetsToLinkedFolder）原先调用
   * refreshManagedAssets(libraryId) 全量枚举所有链接文件夹来注册新增文件——链接
   * 文件夹大时导入明显变慢。这里按 importFolderAsLinked 的注册模式（INSERT
   * assets + revisions）只登记本次写入的文件；content_fingerprint 留待后续
   * 自然 reconciliation 计算，与 importFolderAsLinked 初始索引行为一致。
   */
  public override registerWrittenLinkedAssets(
    openLibrary: OpenLibrary,
    linkedFolderId: string,
    absoluteRootPath: string,
    writtenRelativePaths: readonly string[],
  ): void {
    if (writtenRelativePaths.length === 0) return;
    const now = new Date().toISOString();
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
    // transaction() 返回可调用包装，必须立即调用（与 importFolderAsLinked 一致）。
    openLibrary.connection.transaction(() => {
      for (const relativePath of writtenRelativePaths) {
        const absolute = path.join(absoluteRootPath, ...relativePath.split('/'));
        let stat: Stats;
        try {
          stat = lstatSync(absolute);
        } catch {
          continue; // 文件已消失，留给后续 reconciliation 处理
        }
        if (!stat.isFile() || stat.isSymbolicLink()) continue;
        const assetId = randomUUID();
        const revisionId = randomUUID();
        const pathIdentity = portablePathIdentity(relativePath);
        insertAsset.run(
          assetId,
          linkedFolderId,
          relativePath,
          pathIdentity,
          String(stat.dev),
          String(stat.ino),
          now,
          now,
        );
        insertRevision.run(
          revisionId,
          assetId,
          stat.size,
          stat.mtime.toISOString(),
          path.posix.basename(relativePath),
          now,
        );
        setCurrentRevision.run(revisionId, now, assetId);
        this.syncAssetSearchContent(openLibrary.connection, assetId);
      }
    })();
  }

  public override linkedFolderRowForImport(
    openLibrary: OpenLibrary,
    folderId: string | undefined,
  ): { folder_id: string; absolute_root_path: string; status: string; relative_path: string } | null {
    if (!folderId) return null;
    const virtual = parseLinkedVirtualFolderId(folderId);
    const rootId = virtual?.linkedFolderId ?? folderId;
    const row = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders
          WHERE folder_id = ? AND library_id = ?`,
      )
      .get(rootId, openLibrary.summary.libraryId) as
      | { folder_id: string; absolute_root_path: string; status: string }
      | undefined;
    return row ? { ...row, relative_path: virtual?.relativePath ?? '' } : null;
  }

  public override findActiveManagedAssetByContent(
    openLibrary: OpenLibrary,
    byteSize: number,
    sha256: string,
    contentHashCache: Map<string, string>,
    contentFingerprint?: string,
  ): {
    assetId: string;
    displayName: string;
    thumbnailArtifactId: string | null;
  } | null {
    const selectSameSize = `
      SELECT a.asset_id, a.relative_file_path,
             ra.artifact_id AS thumbnail_artifact_id,
             ra.status AS thumbnail_status
        FROM revisions AS r INDEXED BY revisions_size_fingerprint_idx
        JOIN assets a
          ON a.asset_id = r.asset_id
         AND a.current_revision_id = r.revision_id
       LEFT JOIN revision_artifacts ra
          ON ra.revision_id = r.revision_id
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
         AND ra.invalidated_at IS NULL
       WHERE a.deleted_at IS NULL
         AND a.location_kind = 'managed'
         AND r.byte_size = ?`;
    type MatchedAssetRow = {
      asset_id: string;
      relative_file_path: string;
      thumbnail_artifact_id: string | null;
      thumbnail_status: string | null;
    };
    const toMatch = (row: MatchedAssetRow) => ({
      assetId: row.asset_id,
      displayName: path.posix.basename(row.relative_file_path),
      thumbnailArtifactId:
        row.thumbnail_status === 'ready' ? row.thumbnail_artifact_id : null,
    });

    // Revisions already store a SHA-1 of file bytes. Matching that avoids
    // hashing every same-size library file for each imported item.
    if (contentFingerprint) {
      const fingerprinted = this.prepareCached<Statement>(
        openLibrary,
        `${selectSameSize} AND r.content_fingerprint = ?`,
      )
        .get(byteSize, contentFingerprint) as MatchedAssetRow | undefined;
      if (fingerprinted) return toMatch(fingerprinted);
    }

    const rows = this.prepareCached<Statement>(
      openLibrary,
      contentFingerprint
        ? `${selectSameSize} AND r.content_fingerprint IS NULL`
        : selectSameSize,
    )
      .all(byteSize) as MatchedAssetRow[];

    for (const row of rows) {
      const absolutePath = this.folderPath(openLibrary, row.relative_file_path);
      let fileHash = contentHashCache.get(absolutePath);
      if (fileHash === undefined) {
        try {
          fileHash = sha256FileAtPath(absolutePath);
          contentHashCache.set(absolutePath, fileHash);
        } catch {
          continue;
        }
      }
      if (fileHash === sha256) return toMatch(row);
    }
    return null;
  }

  /**
   * Serpent-793k: find the managed asset occupying a destination path (a
   * name-conflict collision target) so the conflict UI can show its real
   * display name and thumbnail. Path matching is case-insensitive (Windows).
   */
  public override findActiveManagedAssetAtPath(
    openLibrary: OpenLibrary,
    relativeFilePath: string,
  ): {
    assetId: string;
    displayName: string;
    thumbnailArtifactId: string | null;
  } | null {
    const row = this.prepareCached<Statement>(
      openLibrary,
      `SELECT a.asset_id, a.relative_file_path,
                ra.artifact_id AS thumbnail_artifact_id,
                ra.status AS thumbnail_status
           FROM assets a
           LEFT JOIN revision_artifacts ra
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
            AND ra.invalidated_at IS NULL
          WHERE a.deleted_at IS NULL
            AND a.location_kind = 'managed'
            AND a.current_revision_id IS NOT NULL
            AND a.path_identity = ?`,
    ).get(portablePathIdentity(relativeFilePath)) as {
      asset_id: string;
      relative_file_path: string;
      thumbnail_artifact_id: string | null;
      thumbnail_status: string | null;
    } | undefined;
    if (!row) return null;
    return {
      assetId: row.asset_id,
      displayName: path.posix.basename(row.relative_file_path),
      thumbnailArtifactId:
        row.thumbnail_status === 'ready' ? row.thumbnail_artifact_id : null,
    };
  }

  public override findActiveManagedAssetIdByContent(
    openLibrary: OpenLibrary,
    byteSize: number,
    sha256: string,
    contentHashCache: Map<string, string>,
    contentFingerprint?: string,
  ): string | null {
    return (
      this.findActiveManagedAssetByContent(
        openLibrary,
        byteSize,
        sha256,
        contentHashCache,
        contentFingerprint,
      )?.assetId ?? null
    );
  }

  public override classifyImportEntryConflict(input: {
    openLibrary: OpenLibrary;
    entry: ImportSourceEntry;
    entrySha256: string;
    existingSize: number | undefined;
    existingAbsolutePath: string | undefined;
    contentHashCache: Map<string, string>;
    seenContentHashes: Set<string>;
    ignoreBatchContentHash?: boolean;
    skipLibraryDuplicateScan?: boolean;
  }): 'none' | 'suspected-duplicate' | 'name-conflict' {
    const {
      openLibrary,
      entry,
      entrySha256,
      existingSize,
      contentHashCache,
      seenContentHashes,
      ignoreBatchContentHash = false,
      skipLibraryDuplicateScan = false,
    } = input;

    // Path collision always wins (IMPORT-007 / Serpent-12ae): same destination
    // basename is a name conflict even when the bytes also match. Content
    // duplicate is reserved for free destination names with matching content.
    if (existingSize !== undefined) {
      return 'name-conflict';
    }

    if (!ignoreBatchContentHash && seenContentHashes.has(entrySha256)) {
      return 'suspected-duplicate';
    }

    if (
      !skipLibraryDuplicateScan &&
      !ignoreBatchContentHash &&
      this.findActiveManagedAssetIdByContent(
        openLibrary,
        entry.byteSize,
        entrySha256,
        contentHashCache,
        entry.contentFingerprint,
      ) !== null
    ) {
      return 'suspected-duplicate';
    }

    return 'none';
  }

  override previewAutomationImport(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
  }): AutomationImportPlan {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (this.linkedFolderRowForImport(openLibrary, input.targetFolderId)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'SOURCE_NOT_FOUND',
      });
    }
    const targetFolder = this.targetFolder(openLibrary, input.targetFolderId);
    const { entries } = this.enumerateImportSources({
      sourceKind: input.sourceKind,
      sourcePaths: input.sourcePaths,
      targetPrefix: targetFolder?.relative_path ?? '',
      expandImageSequences: input.expandImageSequences === true,
    });
    const seenDestinations = new Map<string, number>();
    const destinationDirectoryCache = new ImportDestinationDirectoryCache();
    const contentHashCache = new Map<string, string>();
    const seenContentHashes = new Set<string>();
    const sequenceBatchPaths = new Set<string>();
    for (const candidate of detectImageSequences(
      entries.map((entry) => entry.destinationRelativePath),
    )) {
      for (const frame of candidate.frames) sequenceBatchPaths.add(frame.value);
    }
    const sourceStates: AutomationImportPlan['sourceStates'] = [];
    let suspectedDuplicateCount = 0;
    let libraryDuplicateCount = 0;
    let nameConflictCount = 0;
    let totalBytes = 0;

    for (const entry of entries) {
      const entrySha256 = sha256FileAtPath(entry.sourcePath);
      contentHashCache.set(entry.sourcePath, entrySha256);
      sourceStates.push({
        sourcePath: entry.sourcePath,
        stateToken: createHash('sha256')
          .update(`${entry.sourcePath}\0${entry.byteSize}\0${entrySha256}`, 'utf8')
          .digest('hex'),
      });
      totalBytes += entry.byteSize;
      const identity = portablePathIdentity(entry.destinationRelativePath);
      let existingSize = seenDestinations.get(identity);
      let existingAbsolutePath: string | undefined;
      if (existingSize === undefined) {
        const destination = this.portableDiskDestination(
          openLibrary,
          entry.destinationRelativePath,
          destinationDirectoryCache,
        );
        existingSize = destination?.size;
        if (destination && destination.size !== -1) {
          existingAbsolutePath = this.folderPath(openLibrary, destination.actualRelativePath);
        }
      }
      const conflictKind = this.classifyImportEntryConflict({
        openLibrary,
        entry,
        entrySha256,
        existingSize,
        existingAbsolutePath,
        contentHashCache,
        seenContentHashes,
        ignoreBatchContentHash: sequenceBatchPaths.has(entry.destinationRelativePath),
      });
      if (conflictKind === 'suspected-duplicate') {
        suspectedDuplicateCount += 1;
        if (existingSize === undefined) libraryDuplicateCount += 1;
      } else if (conflictKind === 'name-conflict') {
        nameConflictCount += 1;
      } else {
        seenContentHashes.add(entrySha256);
        seenDestinations.set(identity, entry.byteSize);
      }
    }
    const changeSequence = this.getChangeSequence(input.libraryId);
    return {
      libraryId: input.libraryId,
      planHash: createAutomationImportPlanHash({
        sourceKind: input.sourceKind,
        sourcePaths: input.sourcePaths,
        ...(input.targetFolderId === undefined ? {} : { targetFolderId: input.targetFolderId }),
        ...(input.imageSequenceFps === undefined ? {} : { imageSequenceFps: input.imageSequenceFps }),
        ...(input.expandImageSequences === undefined ? {} : { expandImageSequences: input.expandImageSequences }),
        expectedChangeSequence: changeSequence,
        sourceStates,
      }),
      changeSequence,
      fileCount: entries.length,
      totalBytes,
      suspectedDuplicateCount,
      libraryDuplicateCount,
      nameConflictCount,
      sourceStates,
    };
  }

  override validateAutomationImportPlan(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
    automationPlan?: {
      planHash: string;
      expectedChangeSequence: number;
      sourceStates: Array<{ sourcePath: string; stateToken: string }>;
    };
  }): void {
    if (input.automationPlan === undefined) return;
    const plan = this.previewAutomationImport(input);
    if (
      plan.changeSequence !== input.automationPlan.expectedChangeSequence
      || plan.planHash !== input.automationPlan.planHash
    ) {
      throw new LibraryServiceError('VERSION_CONFLICT', {
        currentEntityVersion: plan.changeSequence,
      });
    }
    const expected = new Map(input.automationPlan.sourceStates.map((state) => [
      state.sourcePath,
      state.stateToken,
    ]));
    if (
      expected.size !== plan.sourceStates.length
      || plan.sourceStates.some((state) => expected.get(state.sourcePath) !== state.stateToken)
    ) {
      throw new LibraryServiceError('VERSION_CONFLICT', {
        currentEntityVersion: plan.changeSequence,
      });
    }
  }

  override prepareImport(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
    createImageSequence?: boolean;
    sourcePageUrl?: string;
    /** Internal adapter for importers whose logical path differs from disk. */
    sourceEntries?: ImportSourceEntry[];
    sourceDirectories?: string[];
    dedupeSameNameByContent?: boolean;
    /** Avoid hashing every existing same-size asset for external bulk imports. */
    skipLibraryDuplicateScan?: boolean;
    /** Skip SHA-256/fingerprint of staged bytes; used for Eagle/Billfish conversion. */
    skipContentHash?: boolean;
    /** Optional progress callback for a caller-owned bulk import. */
    onStagedEntry?: (processedCount: number, bytesProcessed: number) => void;
    suppressAssetChangeEvents?: boolean;
    /** Shared destination identity map for multi-batch Eagle/Billfish conversion. */
    destinationIndex?: Map<string, ExistingDestination>;
    /** When set, emit import.progress and honor cancelImport(importId). */
    transferCancel?: TransferCancelState;
    /** Yield so a cancel command can run while files are staged. */
    yieldTransferCheckpoints?: boolean;
  }): ImportConflictPlan | ImportSourceFailurePlan {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (this.linkedFolderRowForImport(openLibrary, input.targetFolderId)) {
      // Linked imports skip the managed staging pipeline; callers should use
      // prepareOrExecuteImport. Surface a clear error if prepareImport is used alone.
      throw new LibraryServiceError('AUTOMATION_FILE_PLAN_INVALID');
    }
    const targetFolder = this.targetFolder(openLibrary, input.targetFolderId);
    const enumerated = input.sourceEntries
      ? {
          directories: input.sourceDirectories ?? [],
          entries: input.sourceEntries,
          skipped: [] as SkippedImportSource[],
        }
      : this.enumerateImportSources({
          sourceKind: input.sourceKind,
          sourcePaths: input.sourcePaths,
          targetPrefix: targetFolder?.relative_path ?? '',
          expandImageSequences: input.expandImageSequences === true,
          ...(input.sourcePageUrl === undefined ? {} : { sourcePageUrl: input.sourcePageUrl }),
        });
    const { directories, entries } = enumerated;
    const importId = randomUUID();
    const operationPath = path.join(
      openLibrary.summary.libraryPath,
      '.serpent',
      'operations',
      importId,
    );
    const stagePath = path.join(operationPath, 'stage');
    const skipContentHash = input.skipContentHash === true;
    const destinationIndex = skipContentHash
      ? (input.destinationIndex ?? this.managedDestinationIndex(openLibrary))
      : undefined;
    const manifestDirectoryCache = new ImportDestinationDirectoryCache();
    let preparingManifest: OperationManifest;
    try {
      preparingManifest = {
        version: 1,
        phase: 'staging',
        files: entries.map((entry, index) => ({
          backupName: String(index),
          destinationRelativePath: entry.destinationRelativePath,
          hadDestination:
            this.lookupImportDestination(
              openLibrary,
              entry.destinationRelativePath,
              destinationIndex,
              manifestDirectoryCache,
              { validateMissingSegments: !skipContentHash },
            ) !== undefined,
          stageName: String(index),
        })),
        directories: directories.map((relativePath) => ({
          existed: skipContentHash
            ? existsSync(this.folderPath(openLibrary, relativePath))
            : this.portableDiskDestination(openLibrary, relativePath, manifestDirectoryCache) !== undefined,
          relativePath,
        })),
      };
    } catch (error) {
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }
    try {
      const now = new Date().toISOString();
      openLibrary.connection
        .prepare(
          `INSERT INTO file_operations
             (operation_id, kind, status, manifest_json, error_code, created_at, updated_at)
           VALUES (?, 'import', 'preparing', ?, NULL, ?, ?)`,
        )
        .run(importId, JSON.stringify(preparingManifest), now, now);
    } catch (error) {
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }
    const cancelState = input.transferCancel;
    if (cancelState) {
      this.activeImports.set(importId, cancelState);
    }
    const trackProgress = cancelState !== undefined && input.onStagedEntry === undefined;
    const totalImportFiles = entries.length;
    const totalImportBytes = entries.reduce((total, entry) => total + entry.byteSize, 0);
    if (trackProgress) {
      this.emitManagedImportProgress(importId, 'validate', 0, totalImportFiles, 0, totalImportBytes);
    }
    let stagedEntries: ImportSourceEntry[];
    try {
      mkdirSync(stagePath, { recursive: true });
      if (enumerated.skipped.length > 0 && skipContentHash !== true) {
        return this.parkPendingImportSourceFailure({
          importId,
          input,
          directories,
          stagedEntries: [],
          remainingEntries: entries,
          skipped: enumerated.skipped,
          failed: enumerated.skipped,
          operationPath,
          stagePath,
          skipContentHash,
          destinationIndex,
          preparingManifest,
        });
      }
      const stagedResult = this.stageImportSourceEntries({
        openLibrary,
        entries,
        stagePath,
        skipContentHash,
        onStagedEntry: input.onStagedEntry,
        importId: trackProgress ? importId : undefined,
        totalFiles: totalImportFiles,
        totalBytes: totalImportBytes,
        cancelState,
        yieldCheckpoints: input.yieldTransferCheckpoints === true,
        skipRemainingSourceFailures: skipContentHash,
        skipped: [...enumerated.skipped],
      });
      if (typeof (stagedResult as Promise<ImportSourceEntry[]>).then === 'function') {
        return (stagedResult as Promise<ImportSourceEntry[]>).then((resolved) => {
          return this.completePreparedImport({
            input,
            openLibrary,
            importId,
            operationPath,
            directories,
            stagedEntries: resolved,
            skipContentHash,
            destinationIndex,
            preparingManifest,
          });
        }).catch((error: unknown) => {
          if (error instanceof ImportSourceFailurePause) {
            return this.parkPendingImportSourceFailure({
              importId,
              input,
              directories,
              stagedEntries: error.stagedEntries as ImportSourceEntry[],
              remainingEntries: error.remainingEntries as ImportSourceEntry[],
              skipped: error.skipped,
              failed: error.failed,
              operationPath,
              stagePath,
              skipContentHash,
              destinationIndex,
              preparingManifest,
            });
          }
          this.failPreparedImport(error, {
            importId,
            operationPath,
            openLibrary,
            trackProgress,
          });
        }) as unknown as ImportConflictPlan;
      }
      stagedEntries = stagedResult as ImportSourceEntry[];
    } catch (error) {
      if (error instanceof ImportSourceFailurePause) {
        return this.parkPendingImportSourceFailure({
          importId,
          input,
          directories,
          stagedEntries: error.stagedEntries as ImportSourceEntry[],
          remainingEntries: error.remainingEntries as ImportSourceEntry[],
          skipped: error.skipped,
          failed: error.failed,
          operationPath,
          stagePath,
          skipContentHash,
          destinationIndex,
          preparingManifest,
        });
      }
      this.failPreparedImport(error, {
        importId,
        operationPath,
        openLibrary,
        trackProgress,
      });
    }
    return this.completePreparedImport({
      input,
      openLibrary,
      importId,
      operationPath,
      directories,
      stagedEntries,
      skipContentHash,
      destinationIndex,
      preparingManifest,
    });
  }

  public override failPreparedImport(
    error: unknown,
    context: {
      importId: string;
      operationPath: string;
      openLibrary: OpenLibrary;
      trackProgress: boolean;
    },
  ): never {
    if (error instanceof LibraryServiceError && error.code === 'CANCELLED') {
      this.removeOperation(context.operationPath);
      try {
        context.openLibrary.connection
          .prepare("UPDATE file_operations SET status = 'failed', error_code = 'CANCELLED', updated_at = ? WHERE operation_id = ?")
          .run(new Date().toISOString(), context.importId);
      } catch {
        // Best-effort bookkeeping; the cancelled error is the one callers see.
      }
      this.activeImports.delete(context.importId);
      if (context.trackProgress) {
        this.emitManagedImportProgress(context.importId, 'cancelled', 0, 0, 0, 0);
      }
      throw error;
    }
    if (error instanceof SimulatedCrashError) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
    }
    this.removeOperation(context.operationPath);
    try {
      context.openLibrary.connection
        .prepare("UPDATE file_operations SET status = 'failed', error_code = 'PREPARE_FAILED', updated_at = ? WHERE operation_id = ?")
        .run(new Date().toISOString(), context.importId);
    } catch {
      // Best-effort bookkeeping.
    }
    this.activeImports.delete(context.importId);
    if (context.trackProgress) {
      this.emitManagedImportProgress(context.importId, 'failed', 0, 0, 0, 0);
    }
    throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
  }

  public override completePreparedImport(context: {
    input: Parameters<LibraryServiceAllMethods['prepareImport']>[0];
    openLibrary: OpenLibrary;
    importId: string;
    operationPath: string;
    directories: string[];
    stagedEntries: ImportSourceEntry[];
    skipContentHash: boolean;
    destinationIndex: Map<string, ExistingDestination> | undefined;
    preparingManifest: OperationManifest;
    skippedSources?: SkippedImportSource[];
  }): ImportConflictPlan {
    const {
      input,
      openLibrary,
      importId,
      operationPath,
      directories,
      stagedEntries,
      skipContentHash,
      destinationIndex,
      preparingManifest,
    } = context;
    const seenDestinations = new Map<string, number>();
    // Staging may take a long time. Do not reuse the initial manifest's disk
    // view; this snapshot belongs only to post-stage classification.
    const destinationDirectoryCache = new ImportDestinationDirectoryCache();
    const contentHashCache = new Map<string, string>();
    const seenContentHashes = new Set<string>();
    // Intra-batch identical bytes are common in particle/VFX sequences (clear frames).
    // Treat those as distinct assets when destination basenames form a numbered run.
    const sequenceBatchPaths = new Set<string>();
    if (!skipContentHash) {
      for (const candidate of detectImageSequences(
        stagedEntries.map((entry) => entry.destinationRelativePath),
      )) {
        for (const frame of candidate.frames) sequenceBatchPaths.add(frame.value);
      }
    }
    let suspectedDuplicateCount = 0;
    let libraryDuplicateCount = 0;
    let nameConflictCount = 0;
    const examples: ImportConflictPlan['examples'] = [];

    try {
      for (const entry of stagedEntries) {
        const entrySha256 = skipContentHash
          ? `bulk:${portablePathIdentity(entry.destinationRelativePath)}`
          : (entry.sha256 ?? sha256FileAtPath(entry.sourcePath));
        const identity = portablePathIdentity(entry.destinationRelativePath);
        let existingSize = seenDestinations.get(identity);
        let existingAbsolutePath: string | undefined;
        if (existingSize === undefined) {
          const destination = this.lookupImportDestination(
            openLibrary,
            entry.destinationRelativePath,
            destinationIndex,
            destinationDirectoryCache,
            { validateMissingSegments: !skipContentHash },
          );
          existingSize = destination?.size;
          if (destination && destination.size !== -1) {
            existingAbsolutePath = this.folderPath(openLibrary, destination.actualRelativePath);
          }
        }
        const conflictKind = this.classifyImportEntryConflict({
          openLibrary,
          entry,
          entrySha256,
          existingSize,
          existingAbsolutePath,
          contentHashCache,
          seenContentHashes,
          ignoreBatchContentHash: sequenceBatchPaths.has(entry.destinationRelativePath),
          skipLibraryDuplicateScan: input.skipLibraryDuplicateScan,
        });

        if (conflictKind === 'suspected-duplicate') {
          suspectedDuplicateCount += 1;
          const isLibraryScope = existingSize === undefined;
          if (isLibraryScope) libraryDuplicateCount += 1;
          if (examples.length < 8) {
            const matched = input.skipLibraryDuplicateScan
              ? null
              : this.findActiveManagedAssetByContent(
                  openLibrary,
                  entry.byteSize,
                  entrySha256,
                  contentHashCache,
                  entry.contentFingerprint,
                );
            examples.push({
              displayName: path.posix.basename(entry.destinationRelativePath),
              kind: isLibraryScope ? 'library-duplicate' : 'suspected-duplicate',
              ...(matched
                ? {
                    existingDisplayName: matched.displayName,
                    existingAssetId: matched.assetId,
                    ...(matched.thumbnailArtifactId
                      ? {
                          existingThumbnailArtifactId:
                            matched.thumbnailArtifactId,
                        }
                      : {}),
                  }
                : {}),
            });
          }
          continue;
        }
        if (conflictKind === 'name-conflict') {
          nameConflictCount += 1;
          if (examples.length < 8) {
            // Serpent-793k: surface the colliding (already-existing) asset's
            // display name + thumbnail in the name-conflict dialog, matching
            // what content duplicates already show.
            const destination = this.lookupImportDestination(
              openLibrary,
              entry.destinationRelativePath,
              destinationIndex,
              destinationDirectoryCache,
              { validateMissingSegments: !skipContentHash },
            );
            const existing =
              destination && destination.size !== -1
                ? this.findActiveManagedAssetAtPath(
                    openLibrary,
                    destination.actualRelativePath,
                  )
                : null;
            examples.push({
              displayName: path.posix.basename(entry.destinationRelativePath),
              kind: 'name-conflict',
              ...(existing
                ? {
                    existingDisplayName: existing.displayName,
                    existingAssetId: existing.assetId,
                    ...(existing.thumbnailArtifactId
                      ? {
                          existingThumbnailArtifactId:
                            existing.thumbnailArtifactId,
                        }
                      : {}),
                  }
                : {}),
            });
          }
          continue;
        }

        seenContentHashes.add(entrySha256);
        seenDestinations.set(identity, entry.byteSize);
      }
    } catch (error) {
      this.removeOperation(operationPath);
      openLibrary.connection
        .prepare("UPDATE file_operations SET status = 'failed', error_code = 'PREPARE_FAILED', updated_at = ? WHERE operation_id = ?")
        .run(new Date().toISOString(), importId);
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    }

    const preparedManifest: OperationManifest = {
      version: 1,
      phase: 'prepared',
      files: stagedEntries.map((entry, index) => ({
        backupName: String(index),
        destinationRelativePath: entry.destinationRelativePath,
        hadDestination:
          this.lookupImportDestination(
            openLibrary,
            entry.destinationRelativePath,
            destinationIndex,
            destinationDirectoryCache,
            { validateMissingSegments: !skipContentHash },
          ) !== undefined,
        stageName: String(index),
      })),
      directories: preparingManifest.directories,
    };
    openLibrary.connection
      .prepare('UPDATE file_operations SET manifest_json = ?, updated_at = ? WHERE operation_id = ?')
      .run(JSON.stringify(preparedManifest), new Date().toISOString(), importId);
    const pending: PendingImport = {
      directories,
      entries: stagedEntries,
      libraryId: input.libraryId,
      operationPath,
      ...(context.skippedSources && context.skippedSources.length > 0
        ? { skippedSources: context.skippedSources }
        : {}),
      ...(input.createImageSequence !== undefined
        ? { createImageSequence: input.createImageSequence }
        : {}),
      ...(input.imageSequenceFps !== undefined
        ? { imageSequenceFps: input.imageSequenceFps }
        : {}),
      ...(input.suppressAssetChangeEvents === true
        ? { suppressAssetChangeEvents: true }
        : {}),
      ...(input.dedupeSameNameByContent === true
        ? { dedupeSameNameByContent: true }
        : {}),
      ...(input.skipLibraryDuplicateScan === true
        ? { skipLibraryDuplicateScan: true }
        : {}),
      ...(skipContentHash ? { skipContentHash: true } : {}),
      ...(destinationIndex ? { destinationIndex } : {}),
      contentHashCache,
    };
    this.pendingImports.set(importId, pending);
    this.scheduleImportExpiry(importId, pending);
    const plan: ImportConflictPlan = {
      importId,
      fileCount: stagedEntries.length,
      totalBytes: stagedEntries.reduce((total, entry) => total + entry.byteSize, 0),
      suspectedDuplicateCount,
      libraryDuplicateCount,
      nameConflictCount,
      examples,
    };
    return plan;
  }

  override prepareOrExecuteImport(input: {
    libraryId: string;
    targetFolderId?: string;
    sourceKind: 'files' | 'folder';
    sourcePaths: string[];
    expandImageSequences?: boolean;
    imageSequenceFps?: number;
    createImageSequence?: boolean;
    sourcePageUrl?: string;
    automationPlan?: {
      planHash: string;
      expectedChangeSequence: number;
      sourceStates: Array<{ sourcePath: string; stateToken: string }>;
    };
  }): ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan {
    if (input.automationPlan !== undefined) {
      this.validateAutomationImportPlan(input);
    }
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const linked = this.linkedFolderRowForImport(
      openLibrary,
      input.targetFolderId,
    );
    if (linked) {
      return this.importPathsIntoLinkedFolder({
        libraryId: input.libraryId,
        linkedFolderId: linked.folder_id,
        relativePath: linked.relative_path,
        sourceKind: input.sourceKind,
        sourcePaths: input.sourcePaths,
        expandImageSequences: input.expandImageSequences === true,
        imageSequenceFps: input.imageSequenceFps,
      });
    }
    const plan = this.prepareImport(input);
    if (isImportSourceFailurePlan(plan)) return plan;
    // An MCP/Desktop automation plan has already been shown to the user and
    // fenced against the readonly preview above.  Resolve the staged batch
    // with the same safe defaults as the normal no-conflict path so a
    // confirmed import cannot stop at an unreachable conflict token:
    // content duplicates are skipped and name collisions keep both files.
    if (input.automationPlan !== undefined) {
      return this.resolveImport({
        importId: plan.importId,
        suspectedDuplicate: 'skip',
        nameConflict: 'keep-both',
      });
    }
    if (plan.suspectedDuplicateCount !== 0 || plan.nameConflictCount !== 0) return plan;
    return this.resolveImport({
      importId: plan.importId,
      suspectedDuplicate: 'skip',
      nameConflict: 'keep-both',
    });
  }

  override async prepareOrExecuteImportCancellable(
    input: Parameters<LibraryServiceAllMethods['prepareOrExecuteImport']>[0],
  ): Promise<ImportConflictPlan | ImportCompletion | ImportSourceFailurePlan> {
    if (input.automationPlan !== undefined) {
      this.validateAutomationImportPlan(input);
    }
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const linked = this.linkedFolderRowForImport(
      openLibrary,
      input.targetFolderId,
    );
    if (linked) {
      return this.importPathsIntoLinkedFolder({
        libraryId: input.libraryId,
        linkedFolderId: linked.folder_id,
        relativePath: linked.relative_path,
        sourceKind: input.sourceKind,
        sourcePaths: input.sourcePaths,
        expandImageSequences: input.expandImageSequences === true,
        imageSequenceFps: input.imageSequenceFps,
      });
    }
    const cancelState: TransferCancelState = { cancelled: false };
    const plan = await Promise.resolve(
      this.prepareImport({
        ...input,
        transferCancel: cancelState,
        yieldTransferCheckpoints: true,
      }),
    );
    if (isImportSourceFailurePlan(plan)) return plan;
    if (cancelState.mode === 'stop') {
      cancelState.cancelled = false;
    }
    const finish = (completion: ImportCompletion): ImportCompletion => {
      this.emitManagedImportProgress(
        plan.importId,
        'complete',
        plan.fileCount,
        plan.fileCount,
        plan.totalBytes,
        plan.totalBytes,
      );
      this.activeImports.delete(plan.importId);
      return completion;
    };
    try {
      if (input.automationPlan !== undefined) {
        return finish(this.resolveImport({
          importId: plan.importId,
          suspectedDuplicate: 'skip',
          nameConflict: 'keep-both',
        }));
      }
      if (plan.suspectedDuplicateCount !== 0 || plan.nameConflictCount !== 0) {
        return plan;
      }
      return finish(this.resolveImport({
        importId: plan.importId,
        suspectedDuplicate: 'skip',
        nameConflict: 'keep-both',
      }));
    } catch (error) {
      this.activeImports.delete(plan.importId);
      throw error;
    }
  }

  override async resolveImportCancellable(
    input: Parameters<LibraryServiceAllMethods['resolveImport']>[0],
  ): Promise<ImportCompletion> {
    if (!this.activeImports.has(input.importId)) {
      this.activeImports.set(input.importId, { cancelled: false });
    }
    try {
      const completion = this.resolveImport(input);
      this.emitManagedImportProgress(
        input.importId,
        'complete',
        completion.importedCount + completion.replacedCount + completion.skippedCount,
        completion.importedCount + completion.replacedCount + completion.skippedCount,
        0,
        0,
      );
      return completion;
    } catch (error) {
      this.activeImports.delete(input.importId);
      throw error;
    } finally {
      this.activeImports.delete(input.importId);
    }
  }

  public override ensureEagleCollections(
    openLibrary: OpenLibrary,
    folders: readonly EagleFolderNode[],
  ): Map<string, string> {
    const collectionIdsByFolder = new Map<string, string>();
    const now = new Date().toISOString();
    openLibrary.connection.transaction(() => {
      for (const folder of folders) {
        const parentId = folder.parentFolderId === null
          ? null
          : (collectionIdsByFolder.get(folder.parentFolderId) ?? null);
        const existing = parentId === null
          ? openLibrary.connection
              .prepare(
                `SELECT collection_id FROM collections
                   WHERE library_id = ? AND parent_id IS NULL
                     AND name = ? COLLATE NOCASE
                   ORDER BY position, collection_id
                   LIMIT 1`,
              )
              .get(openLibrary.summary.libraryId, folder.name) as { collection_id: string } | undefined
          : openLibrary.connection
              .prepare(
                `SELECT collection_id FROM collections
                   WHERE library_id = ? AND parent_id = ?
                     AND name = ? COLLATE NOCASE
                   ORDER BY position, collection_id
                   LIMIT 1`,
              )
              .get(openLibrary.summary.libraryId, parentId, folder.name) as { collection_id: string } | undefined;
        if (existing) {
          collectionIdsByFolder.set(folder.folderId, existing.collection_id);
          continue;
        }

        const maxPosition = parentId === null
          ? openLibrary.connection
              .prepare(
                'SELECT COALESCE(MAX(position), -1) AS max_position FROM collections WHERE library_id = ? AND parent_id IS NULL',
              )
              .get(openLibrary.summary.libraryId) as { max_position: number }
          : openLibrary.connection
              .prepare(
                'SELECT COALESCE(MAX(position), -1) AS max_position FROM collections WHERE library_id = ? AND parent_id = ?',
              )
              .get(openLibrary.summary.libraryId, parentId) as { max_position: number };
        const collectionId = randomUUID();
        openLibrary.connection
          .prepare(
            `INSERT INTO collections
               (collection_id, library_id, parent_id, name, description, cover_asset_id,
                position, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?)`,
          )
          .run(
            collectionId,
            openLibrary.summary.libraryId,
            parentId,
            folder.name,
            folder.description,
            maxPosition.max_position + 1,
            now,
            now,
          );
        collectionIdsByFolder.set(folder.folderId, collectionId);
      }
    })();
    return collectionIdsByFolder;
  }

  public override ensureEagleTags(
    openLibrary: OpenLibrary,
    items: readonly EagleAssetCandidate[],
    tagIdsByName: Map<string, string>,
  ): void {
    const names = new Set(items.flatMap((item) => item.tags));
    const now = new Date().toISOString();
    openLibrary.connection.transaction(() => {
      for (const name of names) {
        if (tagIdsByName.has(name)) continue;
        const existing = openLibrary.connection
          .prepare(
            'SELECT tag_id FROM tags WHERE library_id = ? AND name = ? COLLATE NOCASE LIMIT 1',
          )
          .get(openLibrary.summary.libraryId, name) as { tag_id: string } | undefined;
        if (existing) {
          tagIdsByName.set(name, existing.tag_id);
          continue;
        }
        const tagId = randomUUID();
        openLibrary.connection
          .prepare(
            'INSERT OR IGNORE INTO tags (tag_id, library_id, name, created_at) VALUES (?, ?, ?, ?)',
          )
          .run(tagId, openLibrary.summary.libraryId, name, now);
        const inserted = openLibrary.connection
          .prepare(
            'SELECT tag_id FROM tags WHERE library_id = ? AND name = ? COLLATE NOCASE LIMIT 1',
          )
          .get(openLibrary.summary.libraryId, name) as { tag_id: string } | undefined;
        if (inserted) tagIdsByName.set(name, inserted.tag_id);
      }
    })();
  }

  public override eagleImportEntry(
    sourceRootPath: string,
    item: EagleAssetCandidate,
    collectionIdsByFolder: ReadonlyMap<string, string>,
    tagIdsByName: ReadonlyMap<string, string>,
  ): ImportSourceEntry | null {
    try {
      const resolvedSourcePath = path.resolve(item.sourcePath);
      if (!pathIsWithin(sourceRootPath, resolvedSourcePath)) {
        throw new EagleLibraryReadError('Eagle source escaped its library root.');
      }
      const sourceStat = lstatSync(resolvedSourcePath, { bigint: true });
      if (
        sourceStat.isSymbolicLink()
        || !sourceStat.isFile()
        || sourceStat.size > BigInt(Number.MAX_SAFE_INTEGER)
      ) {
        throw new EagleLibraryReadError('Eagle source is no longer a regular file.');
      }
      const fileName = normalizeAssetFileBaseName(path.basename(item.sourcePath));
      const destinationRelativePath = normalizeRelativeAssetPath(fileName);
      const tagIds = [...new Set(
        item.tags
          .map((tag) => tagIdsByName.get(tag))
          .filter((tagId): tagId is string => tagId !== undefined),
      )];
      const collectionIds = [...new Set(
        item.folderIds
          .map((folderId) => collectionIdsByFolder.get(folderId))
          .filter((collectionId): collectionId is string => collectionId !== undefined),
      )];
      return {
        byteSize: Number(sourceStat.size),
        destinationRelativePath,
        eagleMetadata: {
          collectionIds,
          description: item.description,
          rating: item.rating,
          sourceModifiedAtMs: item.sourceModifiedAtMs,
          sourcePageUrl: item.sourcePageUrl,
          sourceRootPath,
          tagIds,
          thumbnailPath: item.thumbnailPath ? path.resolve(item.thumbnailPath) : null,
          ...(item.width && item.height
            ? { width: item.width, height: item.height }
            : {}),
        },
        sourceSnapshot: sourceSnapshot(sourceStat),
        sourcePath: resolvedSourcePath,
      };
    } catch (error) {
      this.diagnose('eagle-import.item-skipped', error, { itemId: item.itemId });
      return null;
    }
  }

  public override ensureBillfishTags(
    openLibrary: OpenLibrary,
    items: readonly BillfishAssetCandidate[],
    tagIdsByName: Map<string, string>,
  ): void {
    const names = new Set(items.flatMap((item) => item.metadata?.tags ?? []));
    const now = new Date().toISOString();
    openLibrary.connection.transaction(() => {
      for (const name of names) {
        if (tagIdsByName.has(name)) continue;
        const existing = openLibrary.connection
          .prepare(
            'SELECT tag_id FROM tags WHERE library_id = ? AND name = ? COLLATE NOCASE LIMIT 1',
          )
          .get(openLibrary.summary.libraryId, name) as { tag_id: string } | undefined;
        if (existing) {
          tagIdsByName.set(name, existing.tag_id);
          continue;
        }
        const tagId = randomUUID();
        openLibrary.connection
          .prepare(
            'INSERT OR IGNORE INTO tags (tag_id, library_id, name, created_at) VALUES (?, ?, ?, ?)',
          )
          .run(tagId, openLibrary.summary.libraryId, name, now);
        const inserted = openLibrary.connection
          .prepare(
            'SELECT tag_id FROM tags WHERE library_id = ? AND name = ? COLLATE NOCASE LIMIT 1',
          )
          .get(openLibrary.summary.libraryId, name) as { tag_id: string } | undefined;
        if (inserted) tagIdsByName.set(name, inserted.tag_id);
      }
    })();
  }

  public override billfishImportEntry(
    sourceRootPath: string,
    item: BillfishAssetCandidate,
    tagIdsByName: ReadonlyMap<string, string>,
  ): ImportSourceEntry | null {
    try {
      const resolvedSourcePath = path.resolve(item.sourcePath);
      if (!pathIsWithin(sourceRootPath, resolvedSourcePath)) {
        throw new BillfishLibraryReadError('Billfish source escaped its library root.');
      }
      const sourceStat = lstatSync(resolvedSourcePath, { bigint: true });
      if (
        sourceStat.isSymbolicLink()
        || !sourceStat.isFile()
        || sourceStat.size > BigInt(Number.MAX_SAFE_INTEGER)
      ) {
        throw new BillfishLibraryReadError('Billfish source is no longer a regular file.');
      }
      const destinationRelativePath = normalizeRelativeAssetPath(item.relativePath);
      const metadata = item.metadata;
      const tagIds = [...new Set(
        (metadata?.tags ?? [])
          .map((tag) => tagIdsByName.get(tag))
          .filter((tagId): tagId is string => tagId !== undefined),
      )];
      return {
        byteSize: Number(sourceStat.size),
        destinationRelativePath,
        eagleMetadata: metadata
          ? {
              collectionIds: [],
              description: metadata.description,
              rating: metadata.rating,
              sourceModifiedAtMs: item.sourceModifiedAtMs,
              sourcePageUrl: metadata.sourcePageUrl,
              sourceRootPath,
              tagIds,
              thumbnailPath: metadata.thumbnailPath ? path.resolve(metadata.thumbnailPath) : null,
              thumbnailGeneratorVersion: 'billfish-thumbnail@1',
            }
          : undefined,
        sourceSnapshot: sourceSnapshot(sourceStat),
        sourcePath: resolvedSourcePath,
      };
    } catch (error) {
      this.diagnose('billfish-import.item-skipped', error, {
        relativePath: item.relativePath,
      });
      return null;
    }
  }

  public override wrapEagleImportStageError(
    error: unknown,
    reason: 'IMPORT_COPY_FAILED' | 'IMPORT_REGISTER_FAILED',
  ): LibraryServiceError {
    if (error instanceof LibraryServiceError && error.code === 'CANCELLED') {
      return error;
    }
    if (error instanceof LibraryServiceError && error.reason) {
      return new LibraryServiceError('IMPORT_APPLY_FAILED', {
        cause: error,
        reason: error.reason,
      });
    }
    return new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error, reason });
  }

  /**
   * Eagle already stores a bounded still preview beside every normal item.
   * Keep that preview as Serpent's ready card artifact; importing a video
   * must not decode the full source merely to make the first screen visible.
   */
  public override copyEagleThumbnailFile(
    openLibrary: OpenLibrary,
    destinationRelativePath: string,
    metadata: EagleImportedMetadata,
  ): EagleCopiedThumbnail | undefined {
    if (!metadata.thumbnailPath) return undefined;
    const canonicalRoot = path.resolve(metadata.sourceRootPath);
    const resolvedThumbnailPath = path.resolve(metadata.thumbnailPath);
    if (!pathIsWithin(canonicalRoot, resolvedThumbnailPath)) {
      throw new EagleLibraryReadError('Eagle thumbnail escaped its library root.');
    }
    const thumbnailStat = lstatSync(resolvedThumbnailPath, { bigint: true });
    if (
      thumbnailStat.isSymbolicLink()
      || !thumbnailStat.isFile()
      || thumbnailStat.size <= 0n
      || thumbnailStat.size > BigInt(Number.MAX_SAFE_INTEGER)
    ) {
      throw new EagleLibraryReadError('Eagle thumbnail is not a supported regular file.');
    }
    const extension = path.extname(resolvedThumbnailPath).toLowerCase();
    const mimeType = directImageMimeForExtension(extension);
    if (!mimeType || !mimeType.startsWith('image/')) {
      throw new EagleLibraryReadError('Eagle thumbnail format is not supported.');
    }
    const artifactId = randomUUID();
    const artifactRelPath = `${artifactId}${extension || '.png'}`;
    const artifactsDir = this.artifactsDir(openLibrary);
    const artifactAbsPath = path.join(artifactsDir, artifactRelPath);
    if (!this.artifactsDirReady.has(openLibrary)) {
      mkdirSync(artifactsDir, { recursive: true });
      this.artifactsDirReady.add(openLibrary);
    }
    copyFileExclusive(resolvedThumbnailPath, artifactAbsPath);
    // Do not decode or trust the source metadata here. Copy-first must publish
    // the card without blocking the import, while the low-priority job below
    // performs a bounded pixel validation before it can retire this legacy
    // generator marker. This also keeps a truncated file from becoming a
    // permanently "verified" artifact merely because its header was readable.
    return {
      artifactAbsPath,
      artifactId,
      artifactKind: detectMediaType(destinationRelativePath) === 'video'
        ? 'video_poster'
        : 'thumbnail',
      artifactRelPath,
      byteSize: Number(thumbnailStat.size),
      generatorVersion: metadata.thumbnailGeneratorVersion ?? 'eagle-thumbnail@1',
      height: metadata.height ?? null,
      mimeType,
      width: metadata.width ?? null,
    };
  }

  public override insertCopiedEagleThumbnail(
    openLibrary: OpenLibrary,
    assetId: string,
    revisionId: string,
    copied: EagleCopiedThumbnail,
  ): void {
    const now = new Date().toISOString();
    openLibrary.connection
      .prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE revision_id = ? AND kind = ? AND invalidated_at IS NULL`,
      )
      .run(now, revisionId, copied.artifactKind);
    openLibrary.connection
      .prepare(
        `INSERT INTO revision_artifacts
           (artifact_id, revision_id, kind, mime_type, byte_size, file_path,
            width, height, generator_version, status, generated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'ready', ?)`,
      )
      .run(
        copied.artifactId,
        revisionId,
        copied.artifactKind,
        copied.mimeType,
        copied.byteSize,
        copied.artifactRelPath,
        copied.width,
        copied.height,
        copied.generatorVersion,
        now,
      );
    // Every copied preview is verified in the background, including a small
    // one. Header dimensions and metadata are not sufficient to prove that
    // the compressed pixel stream is readable.
    this.enqueueImportedThumbnailNormalizationJob(openLibrary, assetId, revisionId);
  }

  public override persistEagleThumbnailArtifact(
    openLibrary: OpenLibrary,
    assetId: string,
    revisionId: string,
    destinationRelativePath: string,
    metadata: EagleImportedMetadata,
  ): void {
    let artifactAbsPath: string | undefined;
    try {
      const copied = this.copyEagleThumbnailFile(
        openLibrary,
        destinationRelativePath,
        metadata,
      );
      if (!copied) return;
      artifactAbsPath = copied.artifactAbsPath;
      openLibrary.connection.transaction(() => {
        this.insertCopiedEagleThumbnail(openLibrary, assetId, revisionId, copied);
      })();
    } catch (error) {
      if (artifactAbsPath) rmSync(artifactAbsPath, { force: true });
      this.diagnose('eagle-import.thumbnail-skipped', error, {
        assetId,
        reason: 'EAGLE_THUMBNAIL_FAILED',
      });
    }
  }

  override async importEagleLibrary(input: {
    libraryId: string;
    sourceRootPath: string;
  }): Promise<EagleImportResult> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const importId = randomUUID();
    const cancelState: TransferCancelState = { cancelled: false };
    this.activeImports.set(importId, cancelState);
    let totalFiles = 0;
    let totalBytes = 0;
    let filesProcessed = 0;
    let bytesProcessed = 0;
    const emitEagleProgress = (
      phase: ImportProgressEvent['phase'],
      processedFiles = filesProcessed,
      processedBytes = bytesProcessed,
    ): void => {
      this.emitProgress({
        type: 'import.progress',
        importId,
        phase,
        cancelable: true,
        filesProcessed: processedFiles,
        totalFiles,
        bytesProcessed: processedBytes,
        totalBytes,
      });
    };
    const throwIfCancelled = (): void => {
      if (!cancelState.cancelled) return;
      emitEagleProgress('cancelled');
      throw new LibraryServiceError('CANCELLED');
    };

    emitEagleProgress('validate', 0, 0);
    let root: ReturnType<typeof readEagleLibraryRoot>;
    try {
      root = readEagleLibraryRoot(input.sourceRootPath);
    } catch (error) {
      emitEagleProgress('failed');
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        cause: error,
        reason: 'EAGLE_METADATA_UNREADABLE',
      });
    }

    totalFiles = root.infoDirectoryNames.length;
    emitEagleProgress('validate', 0, 0);
    try {
      throwIfCancelled();
      const collectionIdsByFolder = this.ensureEagleCollections(openLibrary, root.folders);
      emitEagleProgress('validate', 0, 0);
      await transferCheckpoint();
      throwIfCancelled();
      const imagesPath = root.imagesPath;
      if (!imagesPath || root.infoDirectoryNames.length === 0) {
        emitEagleProgress('complete', 0, 0);
        return {
          sourceDisplayName: root.displayName,
          fileCount: 0,
          importedCount: 0,
          assetCount: 0,
          skippedCount: 0,
          replacedCount: 0,
          collectionCount: collectionIdsByFolder.size,
          tagCount: 0,
          invalidItemCount: 0,
          assets: [],
        };
      }
      const sizeScanBatch = 256;
      for (let offset = 0; offset < root.infoDirectoryNames.length; offset += sizeScanBatch) {
        throwIfCancelled();
        const slice = root.infoDirectoryNames.slice(offset, offset + sizeScanBatch);
        totalBytes += sumEagleLibrarySourceBytes(imagesPath, slice);
        emitEagleProgress('validate', Math.min(totalFiles, offset + slice.length), 0);
        await transferCheckpoint();
      }
      emitEagleProgress('validate', 0, 0);
      let importedCount = 0;
      let skippedCount = 0;
      let replacedCount = 0;
      let invalidItemCount = 0;
      const sampleAssets: AssetSummary[] = [];
      const tagIdsByName = new Map<string, string>();
      const batchSize = 128;
      const destinationIndex = this.managedDestinationIndex(openLibrary);
      let lastCopyProgressAt = 0;
      const emitCopyProgress = (force = false): void => {
        const now = Date.now();
        if (!force && now - lastCopyProgressAt < 250) return;
        lastCopyProgressAt = now;
        emitEagleProgress('copy');
      };

      for (let offset = 0; offset < root.infoDirectoryNames.length; offset += batchSize) {
        throwIfCancelled();
        const infoNames = root.infoDirectoryNames.slice(offset, offset + batchSize);
        emitEagleProgress('validate', offset, bytesProcessed);
        const items: EagleAssetCandidate[] = [];
        for (const infoDirectoryName of infoNames) {
          const result = readEagleAssetCandidate(imagesPath, infoDirectoryName);
          if ('item' in result) {
            items.push(result.item);
            continue;
          }
          skippedCount += 1;
          if (result.invalid) invalidItemCount += 1;
        }
        this.ensureEagleTags(openLibrary, items, tagIdsByName);
        const batch: ImportSourceEntry[] = [];
        for (const item of items) {
          const entry = this.eagleImportEntry(
            root.sourceRootPath,
            item,
            collectionIdsByFolder,
            tagIdsByName,
          );
          if (entry) batch.push(entry);
          else {
            skippedCount += 1;
            invalidItemCount += 1;
          }
        }
        const batchBytesBefore = bytesProcessed;
        let batchBytesCopied = 0;
        if (batch.length > 0) {
          let plan;
          try {
            plan = this.prepareImport({
              libraryId: input.libraryId,
              sourceKind: 'files',
              sourcePaths: batch.map((entry) => entry.sourcePath),
              sourceEntries: batch,
              sourceDirectories: [],
              createImageSequence: false,
              dedupeSameNameByContent: true,
              skipLibraryDuplicateScan: true,
              skipContentHash: true,
              destinationIndex,
              onStagedEntry: (batchProcessed, stagedBytes) => {
                throwIfCancelled();
                batchBytesCopied += stagedBytes;
                filesProcessed = offset + batchProcessed;
                bytesProcessed = batchBytesBefore + batchBytesCopied;
                emitCopyProgress();
              },
              suppressAssetChangeEvents: true,
            });
          } catch (error) {
            throw this.wrapEagleImportStageError(error, 'IMPORT_COPY_FAILED');
          }
          let completion;
          try {
            completion = this.resolveImport({
              importId: plan.importId,
              suspectedDuplicate: 'skip',
              nameConflict: 'keep-both',
            });
          } catch (error) {
            throw this.wrapEagleImportStageError(error, 'IMPORT_REGISTER_FAILED');
          }
          importedCount += completion.importedCount;
          skippedCount += completion.skippedCount;
          replacedCount += completion.replacedCount;
          this.suppressAutoAnalysisForAssets(
            input.libraryId,
            completion.assets.map((asset) => asset.assetId),
          );
          if (sampleAssets.length < 300) {
            sampleAssets.push(...completion.assets.slice(0, 300 - sampleAssets.length));
          }
          if (completion.importedCount + completion.replacedCount > 0) {
            this.options.onAssetsChanged?.({
              type: 'asset.changed',
              libraryId: input.libraryId,
              changedCount: completion.importedCount + completion.replacedCount,
              missingCount: 0,
              source: 'client',
            });
          }
        }
        filesProcessed = Math.min(totalFiles, offset + infoNames.length);
        bytesProcessed = Math.min(totalBytes, batchBytesBefore + items.reduce((total, item) => total + item.byteSize, 0));
        emitCopyProgress(true);
        await transferCheckpoint();
        throwIfCancelled();
      }
      emitEagleProgress('complete', totalFiles, totalBytes);
      return {
        sourceDisplayName: root.displayName,
        fileCount: root.infoDirectoryNames.length,
        importedCount,
        assetCount: importedCount,
        skippedCount,
        replacedCount,
        collectionCount: collectionIdsByFolder.size,
        tagCount: tagIdsByName.size,
        invalidItemCount,
        assets: sampleAssets,
      };
    } catch (error) {
      if (error instanceof LibraryServiceError && error.code === 'CANCELLED') throw error;
      emitEagleProgress('failed');
      throw error;
    } finally {
      this.activeImports.delete(importId);
    }
  }

  /**
   * Read Eagle root metadata and return the default Serpent display name.
   * Main keeps the source path; Renderer only receives this name for the
   * rename panel that precedes choosing a save location.
   */
  override inspectEagleLibrary(sourceRootPath: string): { displayName: string } {
    let root: ReturnType<typeof readEagleLibraryRoot>;
    try {
      root = readEagleLibraryRoot(sourceRootPath);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        cause: error,
        reason: 'EAGLE_METADATA_UNREADABLE',
      });
    }
    const displayName = root.displayName.trim() || path.basename(root.sourceRootPath);
    return { displayName };
  }

  /**
   * Convert an Eagle library into a new Serpent library at a user-chosen
   * parent directory and open the converted result. The Eagle directory is
   * never modified; this is the implementation behind the library-name
   * menu's "Open Eagle library" action. Main inspects the source, the user
   * confirms a display name, then Main collects the Serpent save location
   * before this command runs. After that destination is chosen, Main closes
   * any previously open library before conversion starts.
   */
  override async openEagleLibrary(input: {
    sourceRootPath: string;
    selectedParentPath: string;
    displayName: string;
  }): Promise<InternalLibrarySummary> {
    let root: ReturnType<typeof readEagleLibraryRoot>;
    try {
      root = readEagleLibraryRoot(input.sourceRootPath);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        cause: error,
        reason: 'EAGLE_METADATA_UNREADABLE',
      });
    }

    let sourceRoot: string;
    let parentPath: string;
    try {
      sourceRoot = realpathSync(normalizeAbsolutePath(input.sourceRootPath));
      parentPath = resolveWritableLibraryParent({
        selectedParentPath: input.selectedParentPath,
        sourceRootPath: sourceRoot,
        createIfMissing: true,
      });
    } catch (error) {
      if (error instanceof LibraryParentError) {
        throw new LibraryServiceError(error.code, { reason: error.reason, cause: error });
      }
      throw serviceError(error, 'INVALID_LIBRARY_PATH');
    }

    const displayName = input.displayName.trim() || root.displayName.trim() || path.basename(sourceRoot);
    let created: InternalLibrarySummary | undefined;
    try {
      created = this.createLibrary({
        displayName,
        selectedParentPath: parentPath,
      });
      await this.importEagleLibrary({
        libraryId: created.libraryId,
        sourceRootPath: sourceRoot,
      });
      return created;
    } catch (error) {
      if (created) {
        try {
          this.closeLibrary(created.libraryId);
        } catch {
          // Best-effort close before removing a conversion that did not finish.
        }
        try {
          rmSync(created.libraryPath, { force: true, recursive: true });
        } catch (cleanupError) {
          this.diagnose('eagle-open.cleanup', cleanupError, {
            libraryPath: created.libraryPath,
          });
        }
      }
      throw error;
    }
  }

  override async importBillfishLibrary(input: {
    libraryId: string;
    sourceRootPath: string;
  }): Promise<BillfishImportResult> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertLibraryWritable(openLibrary);
    const importId = randomUUID();
    const cancelState: TransferCancelState = { cancelled: false };
    this.activeImports.set(importId, cancelState);
    let totalFiles = 0;
    let totalBytes = 0;
    let filesProcessed = 0;
    let bytesProcessed = 0;
    const emitBillfishProgress = (
      phase: ImportProgressEvent['phase'],
      processedFiles = filesProcessed,
      processedBytes = bytesProcessed,
    ): void => {
      this.emitProgress({
        type: 'import.progress',
        importId,
        phase,
        cancelable: true,
        filesProcessed: processedFiles,
        totalFiles,
        bytesProcessed: processedBytes,
        totalBytes,
      });
    };
    const throwIfCancelled = (): void => {
      if (!cancelState.cancelled) return;
      emitBillfishProgress('cancelled');
      throw new LibraryServiceError('CANCELLED');
    };

    emitBillfishProgress('validate', 0, 0);
    let root: ReturnType<typeof readBillfishLibrary>;
    try {
      root = readBillfishLibrary(input.sourceRootPath);
    } catch (error) {
      emitBillfishProgress('failed');
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        cause: error,
        reason: 'BILLFISH_METADATA_UNREADABLE',
      });
    }

    totalFiles = root.items.length;
    totalBytes = root.items.reduce((total, item) => total + item.byteSize, 0);
    const tagIdsByName = new Map<string, string>();
    let importedCount = 0;
    let skippedCount = root.skippedCount;
    let replacedCount = 0;
    let invalidItemCount = root.skippedCount;
    let metadataCount = 0;
    const sampleAssets: AssetSummary[] = [];
    const batchSize = 128;
    const destinationIndex = this.managedDestinationIndex(openLibrary);
    let lastCopyProgressAt = 0;
    const emitCopyProgress = (force = false): void => {
      const now = Date.now();
      if (!force && now - lastCopyProgressAt < 250) return;
      lastCopyProgressAt = now;
      emitBillfishProgress('copy');
    };

    try {
      for (let offset = 0; offset < root.items.length; offset += batchSize) {
        throwIfCancelled();
        const items = root.items.slice(offset, offset + batchSize);
        emitBillfishProgress('validate', offset, bytesProcessed);
        this.ensureBillfishTags(openLibrary, items, tagIdsByName);
        const batch: ImportSourceEntry[] = [];
        for (const item of items) {
          const entry = this.billfishImportEntry(root.sourceRootPath, item, tagIdsByName);
          if (entry) {
            batch.push(entry);
            if (item.metadata) metadataCount += 1;
          } else {
            skippedCount += 1;
            invalidItemCount += 1;
          }
        }
        const batchBytesBefore = bytesProcessed;
        let batchBytesCopied = 0;
        if (batch.length > 0) {
          let plan: ImportConflictPlan;
          try {
            const prepared = this.prepareImport({
              libraryId: input.libraryId,
              sourceKind: 'files',
              sourcePaths: batch.map((entry) => entry.sourcePath),
              sourceEntries: batch,
              sourceDirectories: root.directories,
              createImageSequence: false,
              dedupeSameNameByContent: true,
              skipLibraryDuplicateScan: true,
              skipContentHash: true,
              destinationIndex,
              onStagedEntry: (batchProcessed, stagedBytes) => {
                throwIfCancelled();
                batchBytesCopied += stagedBytes;
                filesProcessed = offset + batchProcessed;
                bytesProcessed = batchBytesBefore + batchBytesCopied;
                emitCopyProgress();
              },
              suppressAssetChangeEvents: true,
            });
            if (isImportSourceFailurePlan(prepared)) {
              throw new LibraryServiceError('INVALID_IMPORT_SOURCE');
            }
            plan = prepared;
          } catch (error) {
            throw this.wrapEagleImportStageError(error, 'IMPORT_COPY_FAILED');
          }
          let completion: ImportCompletion;
          try {
            completion = this.resolveImport({
              importId: plan.importId,
              suspectedDuplicate: 'skip',
              nameConflict: 'keep-both',
            });
          } catch (error) {
            throw this.wrapEagleImportStageError(error, 'IMPORT_REGISTER_FAILED');
          }
          importedCount += completion.importedCount;
          skippedCount += completion.skippedCount;
          replacedCount += completion.replacedCount;
          this.suppressAutoAnalysisForAssets(
            input.libraryId,
            completion.assets.map((asset) => asset.assetId),
          );
          if (sampleAssets.length < 300) {
            sampleAssets.push(...completion.assets.slice(0, 300 - sampleAssets.length));
          }
          if (completion.importedCount + completion.replacedCount > 0) {
            this.options.onAssetsChanged?.({
              type: 'asset.changed',
              libraryId: input.libraryId,
              changedCount: completion.importedCount + completion.replacedCount,
              missingCount: 0,
              source: 'client',
            });
          }
        }
        filesProcessed = Math.min(totalFiles, offset + items.length);
        bytesProcessed = Math.min(
          totalBytes,
          batchBytesBefore + items.reduce((total, item) => total + item.byteSize, 0),
        );
        emitCopyProgress(true);
        await transferCheckpoint();
        throwIfCancelled();
      }
      emitBillfishProgress('complete', totalFiles, totalBytes);
      return {
        sourceDisplayName: root.displayName,
        fileCount: root.items.length,
        importedCount,
        assetCount: importedCount,
        skippedCount,
        replacedCount,
        collectionCount: 0,
        tagCount: tagIdsByName.size,
        invalidItemCount,
        metadataCount,
        assets: sampleAssets,
      };
    } catch (error) {
      if (error instanceof LibraryServiceError && error.code === 'CANCELLED') throw error;
      emitBillfishProgress('failed');
      throw error;
    } finally {
      this.activeImports.delete(importId);
    }
  }

  override inspectBillfishLibrary(
    sourceRootPath: string,
    sourceDisplayName?: string,
  ): { displayName: string } {
    let root: ReturnType<typeof readBillfishLibrary>;
    try {
      root = readBillfishLibrary(sourceRootPath);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        cause: error,
        reason: 'BILLFISH_METADATA_UNREADABLE',
      });
    }
    const rootDisplayName = root.displayName.trim();
    const extractedRootName = path.basename(root.sourceRootPath).trim();
    // `readBillfishLibrary` falls back to the extracted directory name when
    // the pack has no displayName metadata. That name is generated by Main
    // (`serpent-external-library-*`) and must never leak into the new-library
    // form; use the original .BillfishPack stem in that case.
    const displayName =
      sourceDisplayName?.trim() && rootDisplayName === extractedRootName
        ? sourceDisplayName.trim()
        : rootDisplayName || sourceDisplayName?.trim() || extractedRootName;
    return { displayName };
  }

  override async openBillfishLibrary(input: {
    sourceRootPath: string;
    selectedParentPath: string;
    displayName: string;
  }): Promise<InternalLibrarySummary> {
    let root: ReturnType<typeof readBillfishLibrary>;
    try {
      root = readBillfishLibrary(input.sourceRootPath);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        cause: error,
        reason: 'BILLFISH_METADATA_UNREADABLE',
      });
    }

    let sourceRoot: string;
    let parentPath: string;
    try {
      sourceRoot = realpathSync(normalizeAbsolutePath(input.sourceRootPath));
      parentPath = resolveWritableLibraryParent({
        selectedParentPath: input.selectedParentPath,
        sourceRootPath: sourceRoot,
        createIfMissing: true,
      });
    } catch (error) {
      if (error instanceof LibraryParentError) {
        throw new LibraryServiceError(error.code, { reason: error.reason, cause: error });
      }
      throw serviceError(error, 'INVALID_LIBRARY_PATH');
    }

    const displayName = input.displayName.trim() || root.displayName.trim() || path.basename(sourceRoot);
    let created: InternalLibrarySummary | undefined;
    try {
      created = this.createLibrary({
        displayName,
        selectedParentPath: parentPath,
      });
      await this.importBillfishLibrary({
        libraryId: created.libraryId,
        sourceRootPath: sourceRoot,
      });
      return created;
    } catch (error) {
      if (created) {
        try {
          this.closeLibrary(created.libraryId);
        } catch {
          // Best-effort close before removing a conversion that did not finish.
        }
        try {
          rmSync(created.libraryPath, { force: true, recursive: true });
        } catch (cleanupError) {
          this.diagnose('billfish-open.cleanup', cleanupError, {
            libraryPath: created.libraryPath,
          });
        }
      }
      throw error;
    }
  }

  override abandonImport(importId: string): string {
    const pending = this.pendingImports.get(importId);
    if (!pending) {
      if (this.isFinalizedImport(importId)) return importId;
      throw new LibraryServiceError('IMPORT_NOT_FOUND');
    }
    this.pendingImports.delete(importId);
    this.cancelImportExpiry(pending);
    this.updateImportOperation(pending, 'rolled_back', 'IMPORT_ABANDONED');
    this.removeOperation(pending.operationPath);
    return importId;
  }

  override resolveImport(input: {
    importId: string;
    suspectedDuplicate: SuspectedDuplicateDecision;
    nameConflict: NameConflictDecision;
  }): ImportCompletion {
    const pending = this.pendingImports.get(input.importId);
    if (!pending) throw new LibraryServiceError('IMPORT_NOT_FOUND');
    if (pending.awaitingSourceFailureDecision) {
      throw new LibraryServiceError('IMPORT_AWAITING_DECISION');
    }
    this.pendingImports.delete(input.importId);
    this.cancelImportExpiry(pending);
    if (
      !['skip', 'merge', 'create-copy'].includes(input.suspectedDuplicate) ||
      !['keep-both', 'replace', 'skip'].includes(input.nameConflict)
    ) {
      this.updateImportOperation(pending, 'rolled_back', 'INVALID_IMPORT_DECISION');
      this.removeOperation(pending.operationPath);
      throw new LibraryServiceError('INVALID_IMPORT_DECISION');
    }

    const openLibrary = this.requireOpenLibrary(pending.libraryId);
    const destinationDirectoryCache = new ImportDestinationDirectoryCache();
    const directoryByIdentity = new Map<string, string>();
    let resolvedDirectories: string[];
    try {
      resolvedDirectories = [...pending.directories]
        .sort((left, right) => left.split('/').length - right.split('/').length)
        .map((relativeDirectory) => {
        const parent = path.posix.dirname(relativeDirectory);
        const resolvedParent =
          parent === '.' ? '.' : (directoryByIdentity.get(portablePathIdentity(parent)) ?? parent);
        const candidate =
          resolvedParent === '.'
            ? path.posix.basename(relativeDirectory)
            : path.posix.join(resolvedParent, path.posix.basename(relativeDirectory));
        const existing = this.portableDiskDestination(
          openLibrary,
          candidate,
          destinationDirectoryCache,
        );
        if (existing && existing.size !== -1) {
          throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
            reason: 'NAME_NOT_SUPPORTED',
          });
        }
        const resolved = existing?.actualRelativePath ?? candidate;
        directoryByIdentity.set(portablePathIdentity(relativeDirectory), resolved);
          return resolved;
        });
    } catch (error) {
      this.removeOperation(pending.operationPath);
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }
    const occupied = new Map<string, ExistingDestination>();
    const actionIndexByIdentity = new Map<string, number>();
    const actions: ImportAction[] = [];
    const mergedAssetIds = new Set<string>();
    let skippedCount = 0;

    const destination = (relativePath: string): ExistingDestination | undefined => {
      const identity = portablePathIdentity(relativePath);
      return occupied.get(identity)
        ?? this.lookupImportDestination(
          openLibrary,
          relativePath,
          pending.destinationIndex,
          destinationDirectoryCache,
          { validateMissingSegments: !pending.skipContentHash },
        );
    };
    const copyPath = (relativePath: string): string => {
      const directory = path.posix.dirname(relativePath);
      const fileName = path.posix.basename(relativePath);
      for (let index = 2; index < Number.MAX_SAFE_INTEGER; index += 1) {
        let allCandidatesExceededNameLimit = true;
        let finalNameLimitError: unknown;
        for (const candidateName of copyNameCandidates(fileName, index)) {
          const candidate =
            directory === '.' ? candidateName : path.posix.join(directory, candidateName);
          try {
            const existing = destination(candidate);
            allCandidatesExceededNameLimit = false;
            if (existing === undefined) return candidate;
            break;
          } catch (error) {
            if (hasErrorCode(error, 'ENAMETOOLONG')) {
              finalNameLimitError = error;
              continue;
            }
            throw error;
          }
        }
        if (allCandidatesExceededNameLimit) throw finalNameLimitError;
      }
      throw new LibraryServiceError('IMPORT_APPLY_FAILED');
    };

    try {
      const contentHashCache = pending.contentHashCache ?? new Map<string, string>();
      const seenContentHashes = new Set<string>();
      const occupiedContentHashes = new Map<string, string>();
      const sequenceBatchPaths = new Set<string>();
      if (!pending.skipContentHash) {
        for (const candidate of detectImageSequences(
          pending.entries.map((entry) => entry.destinationRelativePath),
        )) {
          for (const frame of candidate.frames) sequenceBatchPaths.add(frame.value);
        }
      }
      for (const entry of pending.entries) {
        const entrySha256 = pending.skipContentHash
          ? `bulk:${portablePathIdentity(entry.destinationRelativePath)}`
          : (entry.sha256 ?? sha256FileAtPath(entry.sourcePath));
        const requestedDirectory = path.posix.dirname(entry.destinationRelativePath);
        const resolvedDirectory =
          requestedDirectory === '.'
            ? '.'
            : (directoryByIdentity.get(portablePathIdentity(requestedDirectory)) ??
              requestedDirectory);
        const requestedDestination =
          resolvedDirectory === '.'
            ? path.posix.basename(entry.destinationRelativePath)
            : path.posix.join(resolvedDirectory, path.posix.basename(entry.destinationRelativePath));
        const existingDestination = destination(requestedDestination);
        const existingSize = existingDestination?.size;
        const existingAbsolutePath =
          existingDestination && existingDestination.size !== -1
            ? this.folderPath(openLibrary, existingDestination.actualRelativePath)
            : undefined;
        let classified = this.classifyImportEntryConflict({
          openLibrary,
          entry,
          entrySha256,
          existingSize,
          existingAbsolutePath,
          contentHashCache,
          seenContentHashes,
          ignoreBatchContentHash: sequenceBatchPaths.has(entry.destinationRelativePath),
          skipLibraryDuplicateScan: pending.skipLibraryDuplicateScan,
        });
        if (
          !pending.skipContentHash
          && pending.dedupeSameNameByContent
          && classified === 'name-conflict'
          && existingAbsolutePath !== undefined
        ) {
          const occupiedHash = occupiedContentHashes.get(
            portablePathIdentity(existingDestination?.actualRelativePath ?? requestedDestination),
          );
          let existingHash = occupiedHash ?? contentHashCache.get(existingAbsolutePath);
          if (existingHash === undefined) {
            try {
              existingHash = sha256FileAtPath(existingAbsolutePath);
              contentHashCache.set(existingAbsolutePath, existingHash);
            } catch {
              existingHash = undefined;
            }
          }
          if (existingHash === entrySha256) classified = 'suspected-duplicate';
        }
        const conflictKind =
          classified === 'none' ? undefined : classified;
        let destinationRelativePath =
          existingDestination?.actualRelativePath ?? requestedDestination;
        let isReplacement = false;
        if (conflictKind === 'suspected-duplicate') {
          if (input.suspectedDuplicate === 'skip') {
            skippedCount += 1;
            continue;
          }
          if (input.suspectedDuplicate === 'create-copy') {
            // Path-level duplicate: destination occupied → auto-number.
            // Library-level duplicate with a free destination basename: keep the
            // requested name (Serpent-hy1n); only renumber when the path is taken.
            const requestedIdentity = portablePathIdentity(requestedDestination);
            const destinationFree =
              existingDestination === undefined &&
              !occupied.has(requestedIdentity);
            destinationRelativePath = destinationFree
              ? requestedDestination
              : copyPath(requestedDestination);
          } else {
            const retainedAssetId = existingDestination
              ? (
                  this.prepareCached<Statement>(
                    openLibrary,
                    `SELECT asset_id FROM assets
                      WHERE path_identity = ?
                        AND location_kind = 'managed'
                        AND deleted_at IS NULL`,
                  ).get(portablePathIdentity(destinationRelativePath)) as
                    | { asset_id: string }
                    | undefined
                )?.asset_id
              : this.findActiveManagedAssetIdByContent(
                  openLibrary,
                  entry.byteSize,
                  entrySha256,
                  contentHashCache,
                  entry.contentFingerprint,
                );
            if (retainedAssetId) mergedAssetIds.add(retainedAssetId);
            else skippedCount += 1;
            continue;
          }
        } else if (conflictKind === 'name-conflict') {
          if (input.nameConflict === 'skip') {
            skippedCount += 1;
            continue;
          }
          if (input.nameConflict === 'keep-both') {
            destinationRelativePath = copyPath(requestedDestination);
          } else {
            if (existingSize === -1) {
              throw new LibraryServiceError('IMPORT_APPLY_FAILED');
            }
            isReplacement = true;
            const identity = portablePathIdentity(destinationRelativePath);
            const earlierActionIndex = actionIndexByIdentity.get(identity);
            if (earlierActionIndex !== undefined) {
              const earlierAction = actions[earlierActionIndex]!;
              actions[earlierActionIndex] = { ...earlierAction, entry };
              occupied.set(identity, {
                actualRelativePath: destinationRelativePath,
                size: entry.byteSize,
              });
              continue;
            }
          }
        }

        const pathIdentity = portablePathIdentity(destinationRelativePath);
        const existingAsset = this.prepareCached<Statement>(
          openLibrary,
          `SELECT asset_id, current_revision_id
             FROM assets
            WHERE path_identity = ?
              AND location_kind = 'managed'
              AND deleted_at IS NULL`,
        ).get(pathIdentity) as ExistingAssetRow | undefined;
        const expectedDestination = pending.skipContentHash
          ? undefined
          : this.portableDiskDestination(
              openLibrary,
              destinationRelativePath,
              destinationDirectoryCache,
            );
        occupied.set(pathIdentity, {
          actualRelativePath: destinationRelativePath,
          size: entry.byteSize,
        });
        pending.destinationIndex?.set(pathIdentity, {
          actualRelativePath: destinationRelativePath,
          size: entry.byteSize,
        });
        actionIndexByIdentity.set(pathIdentity, actions.length);
        actions.push({
          destinationRelativePath,
          entry,
          existingAsset,
          expectedDestination,
          isReplacement,
        });
        occupiedContentHashes.set(pathIdentity, entrySha256);
        seenContentHashes.add(entrySha256);
      }
    } catch (error) {
      this.removeOperation(pending.operationPath);
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }

    const operationId = input.importId;
    const operationPath = pending.operationPath;
    const backupPath = path.join(operationPath, 'backup');
    const stagedPaths = actions.map((action) => action.entry.sourcePath);
    const placedPaths: string[] = [];
    const backups: Array<{ backupPath: string; destinationPath: string }> = [];
    const createdDirectories: string[] = [];
    const directoryPaths = new Set(resolvedDirectories);
    for (const action of actions) {
      const directory = path.posix.dirname(action.destinationRelativePath);
      if (directory !== '.') directoryPaths.add(directory);
    }
    for (const directory of [...directoryPaths]) {
      let current = directory;
      while (current !== '.') {
        directoryPaths.add(current);
        current = path.posix.dirname(current);
      }
    }
    const sortedDirectories = [...directoryPaths].sort(
      (left, right) => left.split('/').length - right.split('/').length || left.localeCompare(right),
    );
    // Fail fast on over-limit names before any filesystem side effects (see
    // assertNameWithinFsLimit for why this cannot rely on OS error codes).
    for (const action of actions) {
      assertNameWithinFsLimit(action.destinationRelativePath);
    }
    const manifest: OperationManifest = {
      version: 1,
      files: actions.map((action, index) => ({
        backupName: String(index),
        destinationRelativePath: action.destinationRelativePath,
        hadDestination: pending.skipContentHash
          ? false
          : existsSync(this.folderPath(openLibrary, action.destinationRelativePath)),
        stageName: path.basename(action.entry.sourcePath),
      })),
      directories: sortedDirectories.map((relativePath) => ({
        existed: pending.skipContentHash
          ? false
          : existsSync(this.folderPath(openLibrary, relativePath)),
        relativePath,
      })),
    };

    let jobLease: LibraryJobLease;
    try {
      jobLease = new LibraryWriteCoordinator(openLibrary.writeConnection, pending.libraryId)
        .claimJobOnce(operationId);
    } catch (error) {
      this.removeOperation(operationPath);
      if (error instanceof LibraryWriteCoordinatorError) {
        try {
          openLibrary.connection
            .prepare(
              `UPDATE file_operations
                  SET status = 'failed', error_code = 'JOB_LEASE_BUSY', updated_at = ?
                WHERE operation_id = ? AND status = 'preparing'`,
            )
            .run(new Date().toISOString(), operationId);
        } catch {
          // Best-effort status update; the caller still receives IMPORT_APPLY_FAILED.
        }
      }
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }
    const jobHeartbeat: LibraryWriteLeaseHeartbeat = jobLease.startHeartbeat();

    try {
      const now = new Date().toISOString();
      const updated = openLibrary.connection
        .prepare(
          `UPDATE file_operations
              SET status = 'applying', manifest_json = ?, error_code = NULL, updated_at = ?
            WHERE operation_id = ? AND status = 'preparing'`,
        )
        .run(JSON.stringify(manifest), now, operationId);
      if (updated.changes !== 1) throw new Error('Pending operation is not preparing.');
    } catch (error) {
      jobHeartbeat.stop();
      try {
        jobLease.release();
      } catch (releaseError) {
        this.diagnose('import-apply.lease-release', releaseError, {
          libraryId: pending.libraryId,
          operationId,
        });
      }
      this.removeOperation(operationPath);
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    }

    const rollbackFiles = (): boolean => {
      let succeeded = true;
      for (const destinationPath of [...placedPaths].reverse()) {
        try {
          rmSync(destinationPath, { force: true, recursive: true });
        } catch {
          succeeded = false;
        }
      }
      for (const backup of [...backups].reverse()) {
        try {
          if (existsSync(backup.backupPath)) {
            this.failAt('rollback-restore');
            renameSync(backup.backupPath, backup.destinationPath);
          }
        } catch {
          succeeded = false;
        }
      }
      for (const directoryPath of [...createdDirectories].reverse()) {
        try {
          rmdirSync(directoryPath);
        } catch {
          succeeded = false;
        }
      }
      if (succeeded) this.removeOperation(operationPath);
      return succeeded;
    };

    const affectedAssetIds: string[] = [];
    let importedCount = 0;
    let replacedCount = 0;
    let committed = false;
    let destinationGuardFailed = false;

    const completeCommittedImport = (): ImportCompletion => {
      const affected = [...new Set([...affectedAssetIds, ...mergedAssetIds])];
      let assetCount = new Set(affectedAssetIds).size;
      try {
        assetCount = this.countLogicalAssetUnits(openLibrary, affectedAssetIds);
      } catch (error) {
        this.diagnose('import-apply.post-commit-count', error, {
          libraryId: pending.libraryId,
          operationId,
          affectedCount: affectedAssetIds.length,
        });
      }

      let assets: AssetSummary[] = [];
      try {
        this.failAt('committed-result-list');
        if (pending.skipContentHash) {
          this.suppressAutoAnalysisForAssets(pending.libraryId, affectedAssetIds);
        } else {
          assets = this.listAssetSummariesByIds(openLibrary, affected);
        }
      } catch (error) {
        this.diagnose('import-apply.post-commit-result', error, {
          libraryId: pending.libraryId,
          operationId,
          affectedCount: affected.length,
        });
      }

      return {
        importedCount,
        fileCount: importedCount,
        assetCount,
        skippedCount,
        replacedCount,
        assets,
      };
    };

    try {
      mkdirSync(backupPath, { recursive: true });
      this.failAt('after-stage');

      for (const relativeDirectory of sortedDirectories) {
        const directoryPath = this.folderPath(openLibrary, relativeDirectory);
        if (!existsSync(directoryPath)) {
          mkdirSync(directoryPath);
          createdDirectories.push(directoryPath);
        } else if (!lstatSync(directoryPath).isDirectory()) {
          throw new Error('An imported directory conflicts with a file.');
        }
      }

      // Directory creation and durable operation bookkeeping happen after
      // classification. Take one final filesystem snapshot immediately
      // before touching destinations so a file created while the user was
      // deciding cannot be silently overwritten.
      try {
        this.options.beforeImportDestinationApply?.();
        const applicationDirectoryCache = new ImportDestinationDirectoryCache();
        for (const action of actions) {
          const currentDestination = this.portableDiskDestination(
            openLibrary,
            action.destinationRelativePath,
            applicationDirectoryCache,
            pending.skipContentHash
              ? { validateMissingSegments: false, snapshotFile: false }
              : undefined,
          );
          if (pending.skipContentHash) {
            // Bulk import actions are always keep-both placements; any physical
            // occupant absent from the identity index is an unapproved target.
            if (currentDestination !== undefined) {
              throw new LibraryServiceError('IMPORT_APPLY_FAILED');
            }
            continue;
          }
          if (
            !sameDestinationSnapshot(action.expectedDestination, currentDestination)
            || (currentDestination !== undefined && !action.isReplacement)
          ) {
            throw new LibraryServiceError('IMPORT_APPLY_FAILED');
          }
        }
      } catch (error) {
        destinationGuardFailed = true;
        throw error;
      }

      actions.forEach((action, index) => {
        if (pending.skipContentHash) return;
        const destinationPath = this.folderPath(openLibrary, action.destinationRelativePath);
        if (existsSync(destinationPath)) {
          const existingBackupPath = path.join(backupPath, String(index));
          renameSync(destinationPath, existingBackupPath);
          backups.push({ backupPath: existingBackupPath, destinationPath });
        }
      });
      this.failAt('after-backup');
      this.failAt('crash-after-backup');
      actions.forEach((action, index) => {
        const destinationPath = this.folderPath(openLibrary, action.destinationRelativePath);
        renameSync(stagedPaths[index]!, destinationPath);
        const sourceModifiedAtMs = action.entry.eagleMetadata?.sourceModifiedAtMs;
        if (sourceModifiedAtMs !== undefined && Number.isFinite(sourceModifiedAtMs)) {
          try {
            const timestamp = new Date(sourceModifiedAtMs);
            if (Number.isFinite(timestamp.getTime())) utimesSync(destinationPath, timestamp, timestamp);
          } catch (error) {
            // Eagle's timestamp is advisory. A filesystem that cannot restore
            // it must not turn an otherwise valid byte import into a rollback.
            this.diagnose('eagle-import.restore-mtime', error, {
              relativeFilePath: action.destinationRelativePath,
            });
          }
        }
        placedPaths.push(destinationPath);
        if (index === 0) this.failAt('after-first-place');
      });
      this.failAt('after-place');
      this.failAt('crash-after-place');

      // Serpent-yqrl: commit folders first, then each asset in its own
      // transaction so the canvas can refresh as items become durable.
      // failAt('before-db-commit') still fires before the first asset commit
      // (import-planning rollback tests). After ≥1 asset commits, later
      // failures keep those assets and return a partial completion.
      const now = new Date().toISOString();
      const folderRows = openLibrary.connection
        .prepare(
          'SELECT folder_id, parent_folder_id, name, relative_path, path_identity, created_at, appearance_glyph_kind, appearance_glyph_value, appearance_color_id FROM managed_folders ORDER BY relative_path',
        )
        .all() as ManagedFolderRow[];
      const foldersByPath = new Map(folderRows.map((folder) => [folder.path_identity, folder]));
      openLibrary.connection.transaction(() => {
        for (const relativeDirectory of sortedDirectories) {
          const directoryIdentity = portablePathIdentity(relativeDirectory);
          if (foldersByPath.has(directoryIdentity)) continue;
          const parentPath = path.posix.dirname(relativeDirectory);
          const parentIdentity = parentPath === '.' ? undefined : portablePathIdentity(parentPath);
          const folder: ManagedFolderRow = {
            folder_id: randomUUID(),
            parent_folder_id:
              parentIdentity === undefined
                ? null
                : (foldersByPath.get(parentIdentity)?.folder_id ?? null),
            name: path.posix.basename(relativeDirectory),
            relative_path: relativeDirectory,
            path_identity: directoryIdentity,
          };
          if (parentPath !== '.' && folder.parent_folder_id === null) {
            throw new Error('Imported folder parent is missing.');
          }
          openLibrary.connection
            .prepare(
              `INSERT INTO managed_folders
                 (folder_id, parent_folder_id, name, relative_path, path_identity, created_at)
               VALUES (?, ?, ?, ?, ?, ?)`,
            )
            .run(
              folder.folder_id,
              folder.parent_folder_id,
              folder.name,
              folder.relative_path,
              folder.path_identity,
              now,
            );
          foldersByPath.set(directoryIdentity, folder);
        }
      })();

      const deferredThumbnails: Array<{
        assetId: string;
        copied?: EagleCopiedThumbnail;
        destinationRelativePath: string;
        metadata: EagleImportedMetadata;
        revisionId: string;
      }> = [];
      const bulkCommit = pending.skipContentHash === true;
      const collectionNextPosition = bulkCommit ? new Map<string, number>() : undefined;
      const commitImportedAssets = (): void => {
      for (const action of actions) {
        this.failAt('before-db-commit');
        let committedAssetId: string | null = null;
        let committedRevisionId: string | null = null;
        openLibrary.connection.transaction(() => {
          const destinationPath = this.folderPath(openLibrary, action.destinationRelativePath);
          let fileByteSize: number;
          let fileModifiedAt: string;
          if (bulkCommit) {
            fileByteSize = action.entry.byteSize;
            if (!Number.isSafeInteger(fileByteSize) || fileByteSize < 0) {
              throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
                reason: 'UNSUPPORTED_FILE_ENTRY',
              });
            }
            const sourceModifiedAtMs = action.entry.eagleMetadata?.sourceModifiedAtMs;
            fileModifiedAt =
              sourceModifiedAtMs !== undefined && Number.isFinite(sourceModifiedAtMs)
                ? new Date(sourceModifiedAtMs).toISOString()
                : now;
          } else {
            // Persist the exact same millisecond representation used by watcher
            // refreshes. Mixing Stats.mtime (Date) with BigIntStats.mtimeMs can
            // manufacture a phantom external revision for freshly imported files
            // on filesystems that retain sub-millisecond timestamps.
            const fileStat = lstatSync(destinationPath, { bigint: true });
            fileByteSize = Number(fileStat.size);
            if (!Number.isSafeInteger(fileByteSize)) {
              throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
                reason: 'UNSUPPORTED_FILE_ENTRY',
              });
            }
            fileModifiedAt = new Date(Number(fileStat.mtimeMs)).toISOString();
          }
          const directory = path.posix.dirname(action.destinationRelativePath);
          const managedFolderId =
            directory === '.'
              ? null
              : (foldersByPath.get(portablePathIdentity(directory))?.folder_id ?? null);
          const assetId = action.existingAsset?.asset_id ?? randomUUID();
          const revisionId = randomUUID();
          const pathIdentity = portablePathIdentity(action.destinationRelativePath);
          if (!action.existingAsset) {
            openLibrary.connection
              .prepare(
                `INSERT INTO assets
                 (asset_id, location_kind, managed_folder_id, relative_file_path,
                    path_identity, current_revision_id, availability, created_at, updated_at)
                 VALUES (?, 'managed', ?, ?, ?, NULL, 'available', ?, ?)`,
              )
              .run(
                assetId,
                managedFolderId,
                action.destinationRelativePath,
                pathIdentity,
                now,
                now,
              );
            importedCount += 1;
            if (action.isReplacement) replacedCount += 1;
          } else {
            replacedCount += 1;
          }
          openLibrary.connection
            .prepare(
              `INSERT INTO revisions
                 (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                  original_filename, origin, accepted_at, content_fingerprint)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            )
            .run(
              revisionId,
              assetId,
              action.existingAsset?.current_revision_id ?? null,
              fileByteSize,
              fileModifiedAt,
              path.posix.basename(action.entry.destinationRelativePath),
              action.existingAsset ? 'replace' : 'import',
              now,
              action.entry.contentFingerprint
                ?? (pending.skipContentHash
                  ? null
                  : this.computeContentFingerprint(destinationPath)),
            );
          openLibrary.connection
            .prepare(
              `UPDATE assets
                  SET managed_folder_id = ?, relative_file_path = ?, path_identity = ?,
                      current_revision_id = ?, availability = 'available', updated_at = ?
                WHERE asset_id = ?`,
            )
            .run(
              managedFolderId,
              action.destinationRelativePath,
              pathIdentity,
              revisionId,
              now,
              assetId,
            );
          const eagleSize =
            action.entry.eagleMetadata?.width && action.entry.eagleMetadata.height
              ? {
                  width: action.entry.eagleMetadata.width,
                  height: action.entry.eagleMetadata.height,
                }
              : null;
          if (eagleSize) {
            this.persistExtractedImageDimensions(openLibrary, revisionId, eagleSize);
          } else if (!pending.skipContentHash) {
            this.persistSourceImageDimensions(openLibrary, revisionId, {
              relative_file_path: action.destinationRelativePath,
              location_kind: 'managed',
              linked_folder_id: null,
            });
          }
          if (action.entry.eagleMetadata) {
            this.persistEagleImportedMetadata(
              openLibrary,
              assetId,
              action.entry.eagleMetadata,
              now,
              collectionNextPosition,
            );
          }
          if (action.entry.sourcePageUrl !== undefined) {
            const sourcePageUrl = action.entry.sourcePageUrl.trim();
            if (sourcePageUrl === '') {
              throw new LibraryServiceError('IMPORT_APPLY_FAILED');
            }
            openLibrary.connection
              .prepare(
                `INSERT INTO asset_metadata
                   (asset_id, description, rating, favorite, palette,
                    source_page_url, entity_version, updated_at)
                 VALUES (?, NULL, 0, 0, NULL, ?, 1, ?)
                 ON CONFLICT(asset_id) DO UPDATE SET
                   source_page_url = excluded.source_page_url,
                   entity_version = asset_metadata.entity_version + 1,
                   updated_at = excluded.updated_at`,
              )
              .run(assetId, sourcePageUrl, now);
            this.failAt('after-import-metadata');
          }
          this.syncAssetSearchContent(openLibrary.connection, assetId);
          committedAssetId = assetId;
          committedRevisionId = revisionId;
        })();
        if (committedAssetId) {
          affectedAssetIds.push(committedAssetId);
          if (action.entry.eagleMetadata && committedRevisionId) {
            if (bulkCommit) {
              deferredThumbnails.push({
                assetId: committedAssetId,
                copied: action.entry.copiedThumbnail,
                destinationRelativePath: action.destinationRelativePath,
                metadata: action.entry.eagleMetadata,
                revisionId: committedRevisionId,
              });
            } else {
              this.persistEagleThumbnailArtifact(
                openLibrary,
                committedAssetId,
                committedRevisionId,
                action.destinationRelativePath,
                action.entry.eagleMetadata,
              );
            }
          }
          if (!bulkCommit) this.noteClientFilesystemMutation();
          if (!pending.suppressAssetChangeEvents) {
            this.emitClientAssetsChanged(pending.libraryId, 1);
          }
        }
      }
      };

      if (bulkCommit) {
        openLibrary.connection.transaction(commitImportedAssets)();
        this.noteClientFilesystemMutation();
        const copiedThumbs: Array<{
          assetId: string;
          copied: EagleCopiedThumbnail;
          revisionId: string;
        }> = [];
        for (const item of deferredThumbnails) {
          try {
            const copied = item.copied ?? this.copyEagleThumbnailFile(
              openLibrary,
              item.destinationRelativePath,
              item.metadata,
            );
            if (copied) copiedThumbs.push({
              assetId: item.assetId,
              copied,
              revisionId: item.revisionId,
            });
          } catch (error) {
            this.diagnose('eagle-import.thumbnail-skipped', error, {
              assetId: item.assetId,
              reason: 'EAGLE_THUMBNAIL_FAILED',
            });
          }
        }
        if (copiedThumbs.length > 0) {
          try {
            openLibrary.connection.transaction(() => {
              for (const item of copiedThumbs) {
                this.insertCopiedEagleThumbnail(
                  openLibrary,
                  item.assetId,
                  item.revisionId,
                  item.copied,
                );
              }
            })();
          } catch (error) {
            for (const item of copiedThumbs) {
              rmSync(item.copied.artifactAbsPath, { force: true });
            }
            this.diagnose('eagle-import.thumbnail-skipped', error, {
              reason: 'EAGLE_THUMBNAIL_BATCH_FAILED',
              count: copiedThumbs.length,
            });
          }
        }
      } else {
        commitImportedAssets();
      }

      jobLease.assertCurrent();
      openLibrary.connection
        .prepare("UPDATE file_operations SET status = 'committed', updated_at = ? WHERE operation_id = ?")
        .run(new Date().toISOString(), operationId);
      committed = true;
      this.rememberFinalizedImport(input.importId);
      if (pending.createImageSequence !== false) {
        try {
          this.createDetectedImageSequences(
            openLibrary,
            affectedAssetIds,
            pending.imageSequenceFps ?? DEFAULT_IMAGE_SEQUENCE_FPS,
          );
        } catch (error) {
          this.diagnose('import-apply.post-commit-sequences', error, {
            libraryId: pending.libraryId,
            operationId,
            affectedCount: affectedAssetIds.length,
          });
        }
      }

      // The SQLite commit is the point of no return. Cleanup is recoverable from the
      // committed operation row and must never enter the pre-commit rollback path.
      try {
        this.failAt('committed-cleanup');
        this.removeOperation(operationPath);
      } catch {
        // recoverFileOperations removes committed operation data on the next open.
      }
      return completeCommittedImport();
    } catch (error) {
      if (committed) {
        return completeCommittedImport();
      }
      if (affectedAssetIds.length > 0) {
        // Partial durable import: keep committed rows/files and finish the op.
        try {
          openLibrary.connection
            .prepare("UPDATE file_operations SET status = 'committed', updated_at = ? WHERE operation_id = ?")
            .run(new Date().toISOString(), operationId);
          this.removeOperation(operationPath);
        } catch {
          // Recovery can finalize a stale applying row on the next open.
        }
        this.rememberFinalizedImport(input.importId);
        if (pending.createImageSequence !== false) {
          try {
            this.createDetectedImageSequences(
              openLibrary,
              affectedAssetIds,
              pending.imageSequenceFps ?? DEFAULT_IMAGE_SEQUENCE_FPS,
            );
          } catch (postCommitError) {
            this.diagnose('import-apply.partial-post-commit-sequences', postCommitError, {
              libraryId: pending.libraryId,
              operationId,
              affectedCount: affectedAssetIds.length,
            });
          }
        }
        return completeCommittedImport();
      }
      if (error instanceof SimulatedCrashError) {
        throw new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error });
      }
      const untouchedGuardFailure = destinationGuardFailed
        && backups.length === 0
        && placedPaths.length === 0;
      const rolledBack = untouchedGuardFailure
        ? (() => {
            let succeeded = true;
            for (const directoryPath of [...createdDirectories].reverse()) {
              try {
                rmdirSync(directoryPath);
              } catch (cleanupError) {
                if (
                  isMissingPathError(cleanupError)
                  || hasErrorCode(cleanupError, 'ENOTEMPTY')
                  || hasErrorCode(cleanupError, 'EEXIST')
                ) {
                  // The guard may have found a newly-created external file in
                  // this directory. Preserve that occupied directory.
                  continue;
                }
                succeeded = false;
                this.diagnose('import-apply.preflight-directory-cleanup', cleanupError, {
                  libraryId: pending.libraryId,
                  operationId,
                });
              }
            }
            try {
              this.removeOperation(operationPath);
            } catch (cleanupError) {
              succeeded = false;
              this.diagnose('import-apply.preflight-operation-cleanup', cleanupError, {
                libraryId: pending.libraryId,
                operationId,
              });
            }
            return succeeded;
          })()
        : rollbackFiles();
      try {
        openLibrary.connection
          .prepare(
            `UPDATE file_operations
                SET status = ?, error_code = 'IMPORT_APPLY_FAILED', updated_at = ?
              WHERE operation_id = ?`,
          )
          .run(rolledBack ? 'rolled_back' : 'failed', new Date().toISOString(), operationId);
      } catch {
        // The filesystem rollback is authoritative; recovery can retry a stale applying row.
      }
      throw serviceError(error, 'IMPORT_APPLY_FAILED');
    } finally {
      jobHeartbeat.stop();
      try {
        jobLease.release();
      } catch (releaseError) {
        this.diagnose('import-apply.lease-release', releaseError, {
          libraryId: pending.libraryId,
          operationId,
        });
      }
    }
  }

  /** Reconcile linked folder statuses: a folder whose root is gone flips to
   * offline; a folder whose root came back (e.g. a remounted volume) flips
   * to available. Must run before file-operation recovery so linked-trash
   * recovery can inspect in-flight sources against the current root state. */
  public override reconcileLinkedFolderStatuses(
    openLibrary: OpenLibrary,
    linkedFolderIds?: ReadonlySet<string>,
  ): void {
    const scopedIds = linkedFolderIds?.size ? [...linkedFolderIds] : undefined;
    const linkedFolders = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders
          ${scopedIds === undefined
            ? ''
            : `WHERE folder_id IN (${scopedIds.map(() => '?').join(',')})`}`,
      )
      .all(...(scopedIds ?? [])) as Array<{
        folder_id: string;
        absolute_root_path: string;
        status: 'available' | 'offline';
      }>;
    const folderNow = new Date().toISOString();
    for (const folder of linkedFolders) {
      const rootGone = this.linkedRootIsGone(folder.absolute_root_path);
      if (rootGone && folder.status === 'available') {
        openLibrary.connection
          .prepare("UPDATE linked_folders SET status = 'offline', updated_at = ? WHERE folder_id = ?")
          .run(folderNow, folder.folder_id);
        this.diagnose('linked-folder.sync.status-changed', 'Linked folder went offline (root path unavailable)', {
          libraryId: openLibrary.summary.libraryId,
          folderId: folder.folder_id,
          rootPath: folder.absolute_root_path,
          previousStatus: 'available',
          newStatus: 'offline',
        });
      } else if (!rootGone && folder.status === 'offline') {
        openLibrary.connection
          .prepare("UPDATE linked_folders SET status = 'available', updated_at = ? WHERE folder_id = ?")
          .run(folderNow, folder.folder_id);
        this.diagnose('linked-folder.sync.status-changed', 'Linked folder restored (root path available again)', {
          libraryId: openLibrary.summary.libraryId,
          folderId: folder.folder_id,
          rootPath: folder.absolute_root_path,
          previousStatus: 'offline',
          newStatus: 'available',
        });
      }
    }
  }

  /**
   * Content fingerprint of a file (SHA-1 of the full bytes). Used by
   * refreshManagedAssets to tell a real edit from a portable-library copy
   * (zip extraction rewrites every mtime but not the bytes). Sync by design:
   * it only runs when an mtime mismatch is already detected, so normal
   * refreshes never pay for it.
   */
  public override computeContentFingerprint(filePath: string): string {
    const hash = createHash('sha1');
    const descriptor = openSync(filePath, 'r');
    try {
      const buffer = Buffer.allocUnsafe(1 << 20);
      let bytesRead = 0;
      while ((bytesRead = readSync(descriptor, buffer, 0, buffer.length, null)) > 0) {
        hash.update(buffer.subarray(0, bytesRead));
      }
    } finally {
      closeSync(descriptor);
    }
    return hash.digest('hex');
  }

  /**
   * Compute a reconciliation fingerprint without retaining the source in
   * memory. The async iterator also gives the Worker event loop a scheduling
   * boundary between read chunks; callers must invoke this before entering
   * the short SQLite commit transaction.
   */
  public override async computeContentFingerprintAsync(
    filePath: string,
    signal?: AbortSignal,
    buffer?: Buffer,
    yieldTurn?: () => Promise<void>,
  ): Promise<string> {
    if (signal?.aborted) throw this.reconciliationAbortError();
    if (this.options.contentFingerprintAsync) {
      const fingerprint = await this.options.contentFingerprintAsync(filePath, signal);
      if (signal?.aborted) throw this.reconciliationAbortError();
      return fingerprint;
    }

    const hash = createHash('sha1');
    const file = await openFileAsync(filePath, 'r');
    const readBuffer = buffer ?? Buffer.allocUnsafe(1 << 20);
    let position = 0;
    let sliceStartedAt = performance.now();
    try {
      while (true) {
        if (signal?.aborted) throw this.reconciliationAbortError();
        const result = await file.read(readBuffer, 0, readBuffer.length, position);
        if (result.bytesRead === 0) break;
        hash.update(readBuffer.subarray(0, result.bytesRead));
        position += result.bytesRead;
        if (yieldTurn && performance.now() - sliceStartedAt >= 6) {
          // FileHandle reads can resolve from the OS cache in a tight chain of
          // microtasks. Yield inside a large file as well as between files, so
          // one 8K/RAW source cannot monopolize the Worker past the maintenance
          // slice budget.
          await yieldTurn();
          sliceStartedAt = performance.now();
        }
      }
    } finally {
      await file.close();
    }
    if (signal?.aborted) throw this.reconciliationAbortError();
    return hash.digest('hex');
  }

  public override watcherStableFileWindowMs(): number {
    const configured = this.options.watcherStableFileWindowMs;
    if (configured === undefined) return 200;
    if (!Number.isFinite(configured)) return 200;
    return Math.max(0, Math.min(5_000, Math.trunc(configured)));
  }

  /**
   * Build the network checkpoint from directory discovery metadata only. It
   * deliberately excludes content hashes and database ids: a remote scan
   * should detect name/size/mtime changes without reading file contents or
   * being invalidated by an unrelated local job/artifact write.
   */
  public override networkDiscoveryFingerprint(
    discovery: RefreshManagedAssetsDiscovery,
  ): string {
    const hash = createHash('sha1');
    const updateEntries = (
      scope: string,
      entries: readonly DiscoveredSourceEntry[],
    ): void => {
      hash.update(scope);
      hash.update('\u0000');
      for (const entry of [...entries].sort((left, right) => (
        portablePathIdentity(left.relativePath).localeCompare(
          portablePathIdentity(right.relativePath),
        )
      ))) {
        hash.update(portablePathIdentity(entry.relativePath));
        hash.update('\u0000');
        hash.update(String(entry.byteSize));
        hash.update('\u0000');
        hash.update(entry.modifiedAt);
        hash.update('\u0000');
      }
    };
    for (const [folderId, entries] of [...discovery.linkedEntriesByFolder].sort(
      ([left], [right]) => left.localeCompare(right),
    )) {
      updateEntries(`linked:${folderId}`, entries);
    }
    updateEntries('managed', discovery.managedEntries);
    return hash.digest('hex');
  }

  public override async waitForWatcherStabilityWindow(
    task: OpenReconciliationTask,
    delayMs: number,
  ): Promise<void> {
    this.assertReconciliationActive(task);
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        task.controller.signal.removeEventListener('abort', abort);
        resolve();
      }, delayMs);
      timer.unref?.();
      const abort = (): void => {
        clearTimeout(timer);
        task.controller.signal.removeEventListener('abort', abort);
        reject(this.reconciliationAbortError());
      };
      task.controller.signal.addEventListener('abort', abort, { once: true });
    });
    this.assertReconciliationActive(task);
  }

  /**
   * Native watchers report the first write/rename edge, not a completed copy.
   * Only changed/new entries pay the extra stat samples; a quiet large library
   * therefore does not turn every watcher pass into a second full stat sweep.
   * Entries that keep changing are left out of this pass and will be retried
   * by the trailing coalesced event, never committed as partial revisions.
   */
  public override async waitForStableWatcherDiscovery(
    task: OpenReconciliationTask,
    discovery: RefreshManagedAssetsDiscovery,
    existingAssets: ReadonlyArray<{
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
      byte_size: number | null;
      modified_at: string | null;
    }>,
  ): Promise<void> {
    const stableWindowMs = this.watcherStableFileWindowMs();
    if (stableWindowMs <= 0) return;

    const existingByKey = new Map(
      existingAssets.map((asset) => [
        `${asset.location_kind}\u0000${asset.linked_folder_id ?? ''}\u0000${portablePathIdentity(asset.relative_file_path)}`,
        asset,
      ]),
    );
    type Candidate = {
      entry: DiscoveredSourceEntry;
      absolutePath: string;
      byteSize: number;
      modifiedAt: string;
    };
    const candidates: Candidate[] = [];
    const addCandidates = (
      entries: DiscoveredSourceEntry[],
      locationKind: 'managed' | 'linked',
      linkedFolderId: string | null,
    ): void => {
      for (const entry of entries) {
        const key = `${locationKind}\u0000${linkedFolderId ?? ''}\u0000${portablePathIdentity(entry.relativePath)}`;
        const existing = existingByKey.get(key);
        const unchanged = existing !== undefined
          && existing.byte_size === entry.byteSize
          && Math.abs(Date.parse(existing.modified_at ?? '') - Date.parse(entry.modifiedAt)) <= 1;
        if (unchanged) continue;
        candidates.push({
          entry,
          absolutePath: locationKind === 'linked'
            ? this.linkedAssetPath(task.openLibrary, linkedFolderId, entry.relativePath)
            : this.folderPath(task.openLibrary, entry.relativePath),
          byteSize: entry.byteSize,
          modifiedAt: entry.modifiedAt,
        });
      }
    };
    for (const [folderId, entries] of discovery.linkedEntriesByFolder) {
      addCandidates(entries, 'linked', folderId);
    }
    addCandidates(discovery.managedEntries, 'managed', null);
    if (candidates.length === 0) return;

    let pending = candidates;
    const dropped = new Set<DiscoveredSourceEntry>();
    for (let attempt = 0; attempt < 3 && pending.length > 0; attempt += 1) {
      await this.waitForWatcherStabilityWindow(task, stableWindowMs);
      const unstable: Candidate[] = [];
      for (let offset = 0; offset < pending.length; offset += 128) {
        this.assertReconciliationActive(task);
        const batch = pending.slice(offset, offset + 128);
        const samples = await Promise.all(batch.map(async (candidate) => {
          try {
            const stat = await lstatAsync(candidate.absolutePath);
            if (stat.isSymbolicLink() || !stat.isFile()) {
              return { candidate, byteSize: null, modifiedAt: null };
            }
            return {
              candidate,
              byteSize: stat.size,
              modifiedAt: stat.mtime.toISOString(),
            };
          } catch {
            return { candidate, byteSize: null, modifiedAt: null };
          }
        }));
        for (const sample of samples) {
          if (!sample || sample.byteSize === null || sample.modifiedAt === null) {
            if (sample) dropped.add(sample.candidate.entry);
            continue;
          }
          const { candidate, byteSize, modifiedAt } = sample;
          if (byteSize !== candidate.byteSize || modifiedAt !== candidate.modifiedAt) {
            candidate.byteSize = byteSize;
            candidate.modifiedAt = modifiedAt;
            candidate.entry.byteSize = byteSize;
            candidate.entry.modifiedAt = modifiedAt;
            unstable.push(candidate);
          }
        }
        await this.yieldReconciliation(task);
      }
      pending = unstable;
    }
    for (const candidate of pending) dropped.add(candidate.entry);
    if (dropped.size === 0) return;

    discovery.managedEntries = discovery.managedEntries.filter((entry) => !dropped.has(entry));
    for (const [folderId, entries] of discovery.linkedEntriesByFolder) {
      discovery.linkedEntriesByFolder.set(
        folderId,
        entries.filter((entry) => !dropped.has(entry)),
      );
    }
    this.diagnose('asset-watcher.unstable-file', new Error('Watcher file did not reach a stable size window.'), {
      libraryId: task.libraryId,
      droppedCount: dropped.size,
    });
  }

  /**
   * Prepare fingerprints for the open-generation snapshot before any
   * `refreshManagedAssets` transaction starts. In particular, portable-copy
   * mtime changes must not make the transaction read and hash every source
   * file while holding SQLite's writer lock (0032 §7).
   */
  public override async prepareOpenReconciliationFingerprints(
    task: OpenReconciliationTask,
    discovery: RefreshManagedAssetsDiscovery,
    existingAssets: ReadonlyArray<{
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
      byte_size: number | null;
      modified_at: string | null;
    }>,
  ): Promise<void> {
    const openLibrary = task.openLibrary;
    const existingById = new Map(existingAssets.map((asset) => [asset.asset_id, asset]));
    const entries = [
      ...[...discovery.linkedEntriesByFolder.values()].flat(),
      ...discovery.managedEntries,
    ];
    const readBuffer = Buffer.allocUnsafe(1 << 20);
    let sliceStartedAt = performance.now();

    for (const entry of entries) {
      this.assertReconciliationActive(task);
      const asset = entry.assetId === undefined ? undefined : existingById.get(entry.assetId);
      if (!asset) continue;

      const timestampEquivalent = Math.abs(
        Date.parse(entry.modifiedAt) - Date.parse(asset.modified_at ?? ''),
      ) <= 1;
      const byteChanged = entry.byteSize !== (asset.byte_size ?? -1);
      const mtimeChanged = entry.modifiedAt !== (asset.modified_at ?? '') && !timestampEquivalent;
      if (!byteChanged && !mtimeChanged) continue;

      const sourcePath = asset.location_kind === 'linked'
        ? this.linkedAssetPath(openLibrary, asset.linked_folder_id, entry.relativePath)
        : this.folderPath(openLibrary, entry.relativePath);
      // This is deliberately awaited before refreshManagedAssets enters its
      // transaction. The bounded stream prevents a large source from causing
      // the memory spike that a readFile/hash implementation would create.
      entry.contentFingerprint = await this.computeContentFingerprintAsync(
        sourcePath,
        task.controller.signal,
        readBuffer,
        () => this.yieldReconciliation(task),
      );

      if (performance.now() - sliceStartedAt >= 6) {
        await this.yieldReconciliation(task);
        sliceStartedAt = performance.now();
      }
    }
  }

  public override collectManagedAssetDiscovery(openLibrary: OpenLibrary): RefreshManagedAssetsDiscovery {
    this.reconcileLinkedFolderStatuses(openLibrary);
    const libraryId = openLibrary.summary.libraryId;
    const linkedEntriesByFolder = new Map<string, DiscoveredSourceEntry[]>();
    const linkedFolderRows = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders
          WHERE library_id = ?`,
      )
      .all(libraryId) as Array<{
        folder_id: string;
        absolute_root_path: string;
        status: 'available' | 'offline';
      }>;

    for (const folder of linkedFolderRows) {
      if (this.linkedRootIsGone(folder.absolute_root_path)) continue;
      const rules = this.getLinkedFolderRules({
        libraryId,
        folderId: folder.folder_id,
      });
      linkedEntriesByFolder.set(
        folder.folder_id,
        this.enumerateLinkedSources(
          folder.absolute_root_path,
          folder.folder_id,
          rules,
          (relativePath, pathKind) => this.isExplicitlyIgnored(
            openLibrary,
            'linked',
            folder.folder_id,
            relativePath,
            pathKind,
          ),
        ),
      );
    }

    return {
      linkedEntriesByFolder,
      managedEntries: this.enumerateManagedSources(
        this.assetsPath(openLibrary),
        (relativePath, pathKind) => this.isExplicitlyIgnored(
          openLibrary,
          'managed',
          null,
          relativePath,
          pathKind,
        ),
      ),
    };
  }

  public override reconciliationAbortError(): Error {
    return this.reconciliationOwner.abortError();
  }

  public override assertReconciliationActive(task: OpenReconciliationTask): void {
    if (
      task.controller.signal.aborted
      || !this.reconciliationOwner.isCurrent(task)
      || this.openById.get(task.libraryId) !== task.openLibrary
      || !this.sqlitePrimaryIsOpen(task.openLibrary)
    ) {
      throw this.reconciliationAbortError();
    }
  }

  public override async yieldReconciliation(task: OpenReconciliationTask): Promise<void> {
    this.assertReconciliationActive(task);
    await new Promise<void>((resolve) => setImmediate(resolve));
    this.assertReconciliationActive(task);
    // Serpent-be29a9: hand the background admission back before parking. The
    // scheduler admits a queued interactive request or mutation immediately
    // instead of waiting for this pass to finish (measured: 28.3 s of
    // navigation wait behind one open reconciliation that ran up to 25.8 s as a
    // single admitted task). No-op when nothing is waiting.
    await task.admissionYield?.();
    this.assertReconciliationActive(task);
    // A single 100ms sleep is not an idle window: it merely delays the next
    // synchronous stage while the user is still interacting. The old code
    // then entered identity/source reconciliation with up to ~2s of active
    // viewer/browse traffic remaining, which reproduced as a 300–500ms page
    // queue on the first scrollbar jump. Stay parked in bounded timer slices
    // until the latest interaction deadline really expires.
    while (true) {
      const remainingMs = (this.interactiveIdleUntilByLibrary.get(task.libraryId) ?? 0) - Date.now();
      if (remainingMs <= 0) return;
      await new Promise<void>((resolve) => setTimeout(resolve, Math.min(remainingMs, 100)));
      this.assertReconciliationActive(task);
    }
  }

  public override scheduleDeferredOpenMaintenance(
    openLibrary: OpenLibrary,
    generation: number,
  ): void {
    const libraryId = openLibrary.summary.libraryId;
    const previous = this.deferredOpenMaintenanceByLibrary.get(libraryId);
    if (previous) clearTimeout(previous);

    const run = (): void => {
      this.deferredOpenMaintenanceByLibrary.delete(libraryId);
      if (
        this.openById.get(libraryId) !== openLibrary
        || this.reconciliationOwner.generation(libraryId) !== generation
      ) return;
      const remainingMs = (this.interactiveIdleUntilByLibrary.get(libraryId) ?? 0) - Date.now();
      if (remainingMs > 0) {
        const timer = setTimeout(run, Math.min(Math.max(remainingMs, 250), 1_000));
        timer.unref?.();
        this.deferredOpenMaintenanceByLibrary.set(libraryId, timer);
        return;
      }
      void (async () => {
        try {
          // Both operations are intentionally outside the open-reconciliation
          // promise. They remain owned by this Worker/library handle, but the
          // native backup transfer and its unavoidable synchronous quick_check
          // cannot delay the first viewer completion.
          await this.createDatabaseBackupForOpenLibrary(openLibrary, 'open');
          if (
            this.openById.get(libraryId) !== openLibrary
            || this.reconciliationOwner.generation(libraryId) !== generation
          ) return;
          readLibraryIdentity(openLibrary.connection);
        } catch (error) {
          this.diagnose('open.background-integrity-check', error, { libraryId, generation });
        }
      })();
    };

    const timer = setTimeout(run, 1_000);
    timer.unref?.();
    this.deferredOpenMaintenanceByLibrary.set(libraryId, timer);
  }

  public override cancelDeferredOpenMaintenance(libraryId: string): void {
    const timer = this.deferredOpenMaintenanceByLibrary.get(libraryId);
    if (timer) clearTimeout(timer);
    this.deferredOpenMaintenanceByLibrary.delete(libraryId);
  }

  public override async enumerateSourcesAsync(input: {
    errorCode: 'IMPORT_APPLY_FAILED' | 'INVALID_IMPORT_SOURCE';
    explicitlyIgnored: (relativePath: string, pathKind: 'asset' | 'folder') => boolean;
    isDirectoryIgnored?: (relativePath: string) => boolean;
    libraryId: string;
    linkedFolderId?: string;
    locationKind: 'managed' | 'linked';
    rootPath: string;
    task: OpenReconciliationTask;
  }): Promise<DiscoveredSourceEntry[]> {
    const entries: DiscoveredSourceEntry[] = [];
    const pendingDirectories: Array<{ absolutePath: string; relativePath: string }> = [
      { absolutePath: input.rootPath, relativePath: '' },
    ];
    let sliceStartedAt = performance.now();

    while (pendingDirectories.length > 0) {
      this.assertReconciliationActive(input.task);
      const directory = pendingDirectories.pop()!;
      let handle;
      try {
        handle = await opendirAsync(directory.absolutePath);
      } catch (error) {
        throw new LibraryServiceError(input.errorCode, { cause: error });
      }

      try {
        let entriesRead = 0;
        for (;;) {
          const child = await handle.read();
          if (child === null) break;
          entriesRead += 1;
          this.assertReconciliationActive(input.task);
          const relativePath = directory.relativePath === ''
            ? child.name
            : path.posix.join(directory.relativePath, child.name);
          const absolutePath = path.join(directory.absolutePath, child.name);
          if (child.isSymbolicLink()) {
            this.diagnose(
              input.locationKind === 'managed'
                ? 'managed-asset.symlink-skipped'
                : 'linked-folder.symlink-skipped',
              new LibraryServiceError('INVALID_IMPORT_SOURCE', {
                reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
              }),
              {
                libraryId: input.libraryId,
                ...(input.linkedFolderId ? { linkedFolderId: input.linkedFolderId } : {}),
                relativePath,
              },
            );
          } else if (child.isDirectory()) {
            if (
              !(input.locationKind === 'managed' && isDefaultIgnoredAssetEntry(child.name, 'directory'))
              && !input.isDirectoryIgnored?.(relativePath)
              && !input.explicitlyIgnored(relativePath, 'folder')
            ) {
              pendingDirectories.push({ absolutePath, relativePath });
            }
          } else if (child.isFile()) {
            let stat: Stats | BigIntStats;
            try {
              // Keep the existing synchronous stat seam for deterministic tests;
              // production uses the promise API so a slow volume cannot block the
              // Worker event loop during open reconciliation.
              stat = this.options.assetLstat
                ? this.options.assetLstat(absolutePath)
                : await lstatAsync(absolutePath, { bigint: true });
            } catch (error) {
              if (isUnreadablePathError(error)) continue;
              throw new LibraryServiceError(input.errorCode, { cause: error });
            }
            if (!stat.isSymbolicLink() && stat.isFile()) {
              let normalized: string;
              try {
                normalized = normalizeRelativeAssetPath(relativePath);
              } catch (error) {
                throw new LibraryServiceError(input.errorCode, { cause: error });
              }
              if (
                !(input.locationKind === 'managed'
                  && isDefaultIgnoredAssetEntry(child.name, 'file'))
                && !input.explicitlyIgnored(normalized, 'asset')
              ) {
                const byteSize = Number(stat.size);
                if (!Number.isSafeInteger(byteSize)) {
                  throw new LibraryServiceError(input.errorCode, {
                    reason: 'UNSUPPORTED_FILE_ENTRY',
                  });
                }
                entries.push({
                  relativePath: normalized,
                  byteSize,
                  modifiedAt: stat.mtime.toISOString(),
                  originalFilename: child.name,
                  sourceDevice: String(stat.dev),
                  sourceInode: String(stat.ino),
                });
              }
            }
          }

          if (entriesRead % 64 === 0 || performance.now() - sliceStartedAt >= 6) {
            await this.yieldReconciliation(input.task);
            sliceStartedAt = performance.now();
          }
        }
      } finally {
        await handle.close();
      }
    }
    return entries;
  }

  public override async collectManagedAssetDiscoveryAsync(
    task: OpenReconciliationTask,
    options?: { linkedFolderIds?: readonly string[] },
  ): Promise<RefreshManagedAssetsDiscovery> {
    const openLibrary = this.openById.get(task.libraryId);
    if (!openLibrary) throw this.reconciliationAbortError();
    this.assertReconciliationActive(task);
    const linkedFolderIds = options?.linkedFolderIds === undefined
      ? undefined
      : [...new Set(options.linkedFolderIds)];
    const scopedLinkedFolderIds = linkedFolderIds?.length
      ? new Set(linkedFolderIds)
      : undefined;
    this.reconcileLinkedFolderStatuses(openLibrary, scopedLinkedFolderIds);
    const linkedEntriesByFolder = new Map<string, DiscoveredSourceEntry[]>();
    const existingLinkedAssetIdsByFolder = new Map<string, Map<string, string>>();
    const existingManagedAssetIdsByIdentity = new Map<string, string>();
    if (scopedLinkedFolderIds === undefined) {
      for (const row of openLibrary.connection
        .prepare("SELECT asset_id, path_identity FROM assets WHERE location_kind = 'managed'")
        .all() as Array<{ asset_id: string; path_identity: string }>) {
        existingManagedAssetIdsByIdentity.set(row.path_identity, row.asset_id);
      }
    }
    const scopedIds = scopedLinkedFolderIds === undefined
      ? undefined
      : [...scopedLinkedFolderIds];
    const linkedFolderRows = openLibrary.connection
      .prepare(
        `SELECT folder_id, absolute_root_path, status
           FROM linked_folders
          WHERE library_id = ?
            ${scopedIds === undefined
              ? ''
              : `AND folder_id IN (${scopedIds.map(() => '?').join(',')})`}`,
      )
      .all(task.libraryId, ...(scopedIds ?? [])) as Array<{
        folder_id: string;
        absolute_root_path: string;
        status: 'available' | 'offline';
      }>;

    for (const [linkedRootIndex, folder] of linkedFolderRows.entries()) {
      this.assertReconciliationActive(task);
      if (this.linkedRootIsGone(folder.absolute_root_path)) continue;
      const rules = this.getLinkedFolderRules({
        libraryId: task.libraryId,
        folderId: folder.folder_id,
      });
      const existingAssetIdsByIdentity = new Map<string, string>();
      for (const row of openLibrary.connection
        .prepare('SELECT asset_id, path_identity FROM assets WHERE linked_folder_id = ?')
        .all(folder.folder_id) as Array<{ asset_id: string; path_identity: string }>) {
        existingAssetIdsByIdentity.set(row.path_identity, row.asset_id);
      }
      existingLinkedAssetIdsByFolder.set(folder.folder_id, existingAssetIdsByIdentity);
      const linkedScanStartedAt = performance.now();
      const entries = await this.enumerateSourcesAsync({
        errorCode: 'INVALID_IMPORT_SOURCE',
        explicitlyIgnored: (relativePath, pathKind) => this.isExplicitlyIgnored(
          openLibrary,
          'linked',
          folder.folder_id,
          relativePath,
          pathKind,
        ) || (
          pathKind === 'asset'
          && this.linkedPathIsIgnored(relativePath, rules)
        ),
        isDirectoryIgnored: (relativePath) => (
          !rules.some((rule) => rule.enabled && rule.action === 'include')
          && this.linkedPathIsIgnored(
            path.posix.join(relativePath, '__serpent_probe__'),
            rules,
          )
        ),
        libraryId: task.libraryId,
        linkedFolderId: folder.folder_id,
        locationKind: 'linked',
        rootPath: folder.absolute_root_path,
        task,
      });
      if (process.env.SERPENT_REFRESH_STAGE_LOG === '1') {
        this.options.onDiagnostic?.({
          scope: 'open.refresh-managed-assets.source-scan',
          error: null,
          context: {
            libraryId: task.libraryId,
            generation: task.generation,
            reason: task.reason,
            locationKind: 'linked',
            linkedRootIndex,
            linkedRootCount: linkedFolderRows.length,
            scoped: scopedLinkedFolderIds !== undefined,
            entryCount: entries.length,
            durationMs: Math.round((performance.now() - linkedScanStartedAt) * 100) / 100,
          },
        });
      }
      for (const entry of entries) {
        entry.assetId = existingAssetIdsByIdentity.get(portablePathIdentity(entry.relativePath));
      }
      linkedEntriesByFolder.set(folder.folder_id, entries);
      await this.yieldReconciliation(task);
    }

    const managedScanStartedAt = performance.now();
    const managedEntries = scopedLinkedFolderIds === undefined
      ? await this.enumerateSourcesAsync({
          errorCode: 'IMPORT_APPLY_FAILED',
          explicitlyIgnored: (relativePath, pathKind) => this.isExplicitlyIgnored(
            openLibrary,
            'managed',
            null,
            relativePath,
            pathKind,
          ),
          libraryId: task.libraryId,
          locationKind: 'managed',
          rootPath: this.assetsPath(openLibrary),
          task,
        })
      : [];
    if (scopedLinkedFolderIds === undefined && process.env.SERPENT_REFRESH_STAGE_LOG === '1') {
      this.options.onDiagnostic?.({
        scope: 'open.refresh-managed-assets.source-scan',
        error: null,
        context: {
          libraryId: task.libraryId,
          generation: task.generation,
          reason: task.reason,
          locationKind: 'managed',
          scoped: false,
          entryCount: managedEntries.length,
          durationMs: Math.round((performance.now() - managedScanStartedAt) * 100) / 100,
        },
      });
    }
    for (const entry of managedEntries) {
      entry.assetId = existingManagedAssetIdsByIdentity.get(portablePathIdentity(entry.relativePath));
    }
    return {
      linkedEntriesByFolder,
      managedEntries,
      ...(scopedLinkedFolderIds === undefined ? {} : { scopedLinkedFolderIds }),
      existingLinkedAssetIdsByFolder,
      existingManagedAssetIdsByIdentity,
    };
  }

  public override async applyDiscoveredAssetsInBatches(
    task: OpenReconciliationTask,
    discovery: RefreshManagedAssetsDiscovery,
  ): Promise<AssetRefreshResult> {
    const batchSize = this.openById.get(task.libraryId)?.summary.networkStorage ? 16 : 64;
    let changedCount = 0;
    let missingCount = 0;
    const apply = async (entries: DiscoveredSourceEntry[], linkedFolderId?: string): Promise<void> => {
      for (let offset = 0; offset < entries.length; offset += batchSize) {
        this.assertReconciliationActive(task);
        const batch = entries.slice(offset, offset + batchSize);
        const batchDiscovery: RefreshManagedAssetsDiscovery = {
          linkedEntriesByFolder: linkedFolderId === undefined
            ? new Map()
            : new Map([[linkedFolderId, batch]]),
          managedEntries: linkedFolderId === undefined ? batch : [],
          existingLinkedAssetIdsByFolder: discovery.existingLinkedAssetIdsByFolder,
          existingManagedAssetIdsByIdentity: discovery.existingManagedAssetIdsByIdentity,
          movedLinkedAssetsReconciled: true,
        };
        const result = this.refreshManagedAssets(task.libraryId, {
          assetIds: batch.flatMap((entry) => entry.assetId ?? []),
          discovery: batchDiscovery,
        });
        changedCount += result.changedCount;
        missingCount += result.missingCount;
        await this.yieldReconciliation(task);
      }
    };
    for (const [folderId, entries] of discovery.linkedEntriesByFolder) {
      await apply(entries, folderId);
    }
    await apply(discovery.managedEntries);
    return { changedCount, missingCount };
  }

  override refreshManagedAssets(libraryId: string, options: { includeAssets: true } & RefreshManagedAssetsOptions): AssetRefreshResult & { assets: AssetSummary[] };
  override refreshManagedAssets(libraryId: string, options?: RefreshManagedAssetsOptions): AssetRefreshResult;
  override refreshManagedAssets(
    libraryId: string,
    options?: RefreshManagedAssetsOptions,
  ): AssetRefreshResult {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Serpent-4bdd26 收编 codex/large-library-performance@15f3325c：
    // assetIds 限定已有资产的 stat/revision 对账范围；空列表仍表示“只发现
    // 新文件”，而带 discovery 的非空列表还可以复用同一批异步文件快照来
    // 对账已有资产。discoverSources=false 跳过文件系统枚举（仅缺失资产
    // 批次走 fallback lstat）。
    const assetIds = options?.assetIds;
    type RefreshAssetRow = {
      asset_id: string;
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
      relative_file_path: string;
      current_revision_id: string;
      revision_row_id: string | null;
      availability: 'available' | 'missing';
      byte_size: number | null;
      modified_at: string | null;
      content_fingerprint: string | null;
      source_device: string | null;
      source_inode: string | null;
    };
    const queryBefore = (placeholders?: string): string =>
      `SELECT a.asset_id, a.location_kind, a.linked_folder_id, a.relative_file_path,
              a.current_revision_id, r.revision_id AS revision_row_id,
              a.availability, r.byte_size, r.modified_at,
              r.content_fingerprint, a.source_device, a.source_inode
        FROM assets a
         LEFT JOIN revisions r ON r.revision_id = a.current_revision_id
        WHERE a.deleted_at IS NULL${placeholders === undefined
          ? ''
          : placeholders === ''
            ? ' AND 1 = 0'
            : ` AND a.asset_id IN (${placeholders})`}
        ORDER BY a.relative_file_path`;
    const discoverSources = options?.discoverSources ?? true;
    const discovery = discoverSources
      ? options?.discovery ?? this.collectManagedAssetDiscovery(openLibrary)
      : undefined;
    if (discovery) this.reconcileMovedLinkedAssets(openLibrary, discovery);
    // Serpent-onch 风格分阶段计时：SERPENT_REFRESH_STAGE_LOG=1 时输出各阶段耗时，
    // 用于大库全量对账的归因（Serpent-4bdd26）。生产默认关闭。
    const stageLog = process.env.SERPENT_REFRESH_STAGE_LOG === '1';
    const stageStartedAt = stageLog ? performance.now() : 0;
    let stageMark = stageStartedAt;
    const markStage = (label: string): void => {
      if (!stageLog) return;
      const now = performance.now();
      console.error(JSON.stringify({
        scope: 'refresh.managed-assets.stage',
        libraryId,
        stage: label,
        durationMs: Math.round((now - stageMark) * 100) / 100,
      }));
      stageMark = now;
    };
    const requestedAssetIds = assetIds === undefined ? undefined : [...new Set(assetIds)];
    const before = requestedAssetIds === undefined
      ? openLibrary.connection.prepare(queryBefore()).all() as RefreshAssetRow[]
      : sqliteAllInChunks<string, RefreshAssetRow>({
          connection: openLibrary.connection,
          values: requestedAssetIds,
          buildSql: queryBefore,
        });
    markStage('before-query');

    // A refresh can also be triggered by a watcher or an explicit client
    // command, not only by the async open owner. Prepare any needed content
    // identity before the transaction for those callers too. The open path
    // already carries an async fingerprint on each discovery entry; ordinary
    // refreshes use a synchronous preflight. If a source appears in the small
    // race after that preflight, the commit below is deliberately conservative
    // and stores a null fingerprint rather than reading the file under the
    // SQLite writer lock (0032 §7/§14).
    const managedPreflightByIdentity = new Map(
      (discovery?.managedEntries ?? []).map((entry) => [
        portablePathIdentity(entry.relativePath),
        entry,
      ]),
    );
    const linkedPreflightByKey = new Map<string, DiscoveredSourceEntry>();
    const linkedPreflightByAssetId = new Map<string, DiscoveredSourceEntry>();
    for (const [folderId, entries] of discovery?.linkedEntriesByFolder ?? []) {
      for (const entry of entries) {
        linkedPreflightByKey.set(
          `${folderId}\u0000${portablePathIdentity(entry.relativePath)}`,
          entry,
        );
        if (entry.assetId !== undefined) linkedPreflightByAssetId.set(entry.assetId, entry);
      }
    }
    const preflightSourceByAssetId = new Map<string, {
      byteSize: number;
      modifiedAt: string;
      fingerprint?: string;
    }>();
    const preflightFingerprintFor = (
      asset: (typeof before)[number],
      entry: DiscoveredSourceEntry | undefined,
    ): void => {
      let byteSize: number;
      let modifiedAt: string;
      let sourcePath: string | undefined;
      if (entry) {
        byteSize = entry.byteSize;
        modifiedAt = entry.modifiedAt;
      } else if (options?.discoverSources === false) {
        sourcePath = asset.location_kind === 'linked'
          ? this.linkedAssetPath(openLibrary, asset.linked_folder_id, asset.relative_file_path)
          : this.folderPath(openLibrary, asset.relative_file_path);
        let fileStat: BigIntStats | Stats;
        try {
          fileStat = this.options.assetLstat
            ? this.options.assetLstat(sourcePath)
            : lstatSync(sourcePath, { bigint: true });
        } catch (error) {
          if (isUnreadablePathError(error)) return;
          throw new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error });
        }
        if (fileStat.isSymbolicLink() || !fileStat.isFile()) return;
        byteSize = Number(fileStat.size);
        modifiedAt = new Date(Number(fileStat.mtimeMs)).toISOString();
      } else {
        return;
      }
      if (!Number.isSafeInteger(byteSize)) {
        throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
          reason: 'UNSUPPORTED_FILE_ENTRY',
        });
      }

      const previousModifiedAt = asset.modified_at ?? '';
      const previousByteSize = asset.byte_size ?? -1;
      const timestampEquivalent = Math.abs(Date.parse(modifiedAt) - Date.parse(previousModifiedAt)) <= 1;
      const byteChanged = byteSize !== previousByteSize;
      const mtimeChanged = modifiedAt !== previousModifiedAt && !timestampEquivalent;
      const sourceChanged = byteChanged || mtimeChanged || !asset.revision_row_id;
      let fingerprint: string | undefined;
      if (sourceChanged) {
        // Discovery already stat'ed and validated every unchanged entry.
        // Resolve/validate the path again only when this row is about to read
        // or replace source identity; doing it for every stable asset repeated
        // root + ancestor lstat/realpath calls on network libraries.
        sourcePath ??= asset.location_kind === 'linked'
          ? this.linkedAssetPath(
            openLibrary,
            asset.linked_folder_id,
            entry?.relativePath ?? asset.relative_file_path,
          )
          : this.folderPath(
            openLibrary,
            entry?.relativePath ?? asset.relative_file_path,
          );
        fingerprint = entry?.contentFingerprint ?? this.computeContentFingerprint(sourcePath);
      }
      preflightSourceByAssetId.set(asset.asset_id, {
        byteSize,
        modifiedAt,
        ...(fingerprint === undefined ? {} : { fingerprint }),
      });
    };
    for (const asset of before) {
      const entry = asset.location_kind === 'linked'
        ? linkedPreflightByKey.get(
          `${asset.linked_folder_id ?? ''}\u0000${portablePathIdentity(asset.relative_file_path)}`,
        ) ?? linkedPreflightByAssetId.get(asset.asset_id)
        : managedPreflightByIdentity.get(portablePathIdentity(asset.relative_file_path));
      preflightFingerprintFor(asset, entry);
    }
    markStage('precompute-fingerprints');

    let changedCount = 0;
    let missingCount = 0;
    const discoveredAssetIds: string[] = [];
    // Serpent-4bdd26: per-file stats gathered once by the enumerations below
    // and consumed by the comparison loop, so a full refresh costs one lstat
    // per file instead of two (measured ~10ms per round trip on SMB).
    const linkedSnapshot = new Map<string, DiscoveredSourceEntry>();

    openLibrary.connection.transaction(() => {
      if (!discovery) this.reconcileLinkedFolderStatuses(openLibrary);
      const folderNow = new Date().toISOString();
      // Each discovery batch carries one bounded filesystem snapshot. Reuse
      // the caller's identity maps so this loop does not rescan all 20k asset
      // identities for every 64-file transaction.
      const linkedFolderIds = discovery === undefined
        ? []
        : [...discovery.linkedEntriesByFolder.keys()];
      const linkedFolderRows = linkedFolderIds.length === 0
        ? []
        : withSqliteInPredicate(
          openLibrary.connection,
          'folder_id',
          linkedFolderIds,
          (sql, params) =>
            openLibrary.connection
              .prepare(
                `SELECT folder_id, absolute_root_path, status
                   FROM linked_folders
                  WHERE ${sql}`,
              )
              .all(...params) as Array<{
                folder_id: string;
                absolute_root_path: string;
                status: 'available' | 'offline';
              }>,
        );
      for (const folder of linkedFolderRows) {
        if (this.linkedRootIsGone(folder.absolute_root_path)) continue;

        const existingIdentities = discovery?.existingLinkedAssetIdsByFolder?.get(folder.folder_id)
          ?? new Map(
            (openLibrary.connection
              .prepare('SELECT asset_id, path_identity FROM assets WHERE linked_folder_id = ?')
              .all(folder.folder_id) as Array<{ asset_id: string; path_identity: string }>)
              .map((row) => [row.path_identity, row.asset_id] as const),
          );
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
           VALUES (?, ?, NULL, ?, ?, ?, 'external_change', ?)`,
        );
        const setCurrentRevision = openLibrary.connection.prepare(
          'UPDATE assets SET current_revision_id = ?, updated_at = ? WHERE asset_id = ?',
        );
        for (const entry of discovery?.linkedEntriesByFolder.get(folder.folder_id) ?? []) {
          // Serpent-4bdd26: the enumeration already lstat'ed every file; keep
          // its size/mtime so the comparison loop below reuses one stat per
          // file instead of issuing a second network round trip per asset.
          linkedSnapshot.set(
            `${folder.folder_id}\u0000${portablePathIdentity(entry.relativePath)}`,
            entry,
          );
          const pathIdentity = portablePathIdentity(entry.relativePath);
          if (existingIdentities.has(pathIdentity)) continue;
          const assetId = randomUUID();
          const revisionId = randomUUID();
          insertAsset.run(
            assetId,
            folder.folder_id,
            entry.relativePath,
            pathIdentity,
            entry.sourceDevice ?? null,
            entry.sourceInode ?? null,
            folderNow,
            folderNow,
          );
          insertRevision.run(
            revisionId,
            assetId,
            entry.byteSize,
            entry.modifiedAt,
            entry.originalFilename,
            folderNow,
          );
          setCurrentRevision.run(revisionId, folderNow, assetId);
          existingIdentities.set(pathIdentity, assetId);
          this.syncAssetSearchContent(openLibrary.connection, assetId);
          discoveredAssetIds.push(assetId);
          changedCount += 1;
        }
      }

      const folderRows = openLibrary.connection
        .prepare(
          'SELECT folder_id, parent_folder_id, name, relative_path, path_identity, created_at, appearance_glyph_kind, appearance_glyph_value, appearance_color_id FROM managed_folders ORDER BY relative_path',
        )
        .all() as ManagedFolderRow[];
      const foldersByPath = new Map(folderRows.map((folder) => [folder.path_identity, folder]));
      const existingManagedIdentities = discovery?.existingManagedAssetIdsByIdentity
        ?? new Map(
          (openLibrary.connection
            .prepare("SELECT asset_id, path_identity FROM assets WHERE location_kind = 'managed'")
            .all() as Array<{ asset_id: string; path_identity: string }>)
            .map((row) => [row.path_identity, row.asset_id] as const),
        );
      const managedEntries = discovery?.managedEntries ?? [];
      markStage('enumerate-managed');
      // Serpent-4bdd26: reuse the enumeration stats for the comparison loop —
      // one lstat per file instead of two on the whole-library refresh.
      const managedSnapshot = new Map(
        managedEntries.map((entry) => [
          portablePathIdentity(entry.relativePath),
          entry,
        ]),
      );
      markStage('managed-snapshot');
      const directoriesNeeded = new Set<string>();
      for (const entry of managedEntries) {
        let directory = path.posix.dirname(entry.relativePath);
        while (directory !== '.') {
          directoriesNeeded.add(directory);
          directory = path.posix.dirname(directory);
        }
      }
      for (const relativeDirectory of [...directoriesNeeded].sort()) {
        const directoryIdentity = portablePathIdentity(relativeDirectory);
        if (foldersByPath.has(directoryIdentity)) continue;
        const parentPath = path.posix.dirname(relativeDirectory);
        const parentIdentity = parentPath === '.' ? undefined : portablePathIdentity(parentPath);
        const folder: ManagedFolderRow = {
          folder_id: randomUUID(),
          parent_folder_id:
            parentIdentity === undefined
              ? null
              : (foldersByPath.get(parentIdentity)?.folder_id ?? null),
          name: path.posix.basename(relativeDirectory),
          relative_path: relativeDirectory,
          path_identity: directoryIdentity,
        };
        if (parentPath !== '.' && folder.parent_folder_id === null) continue;
        openLibrary.connection
          .prepare(
            `INSERT INTO managed_folders
               (folder_id, parent_folder_id, name, relative_path, path_identity, created_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
          )
          .run(
            folder.folder_id,
            folder.parent_folder_id,
            folder.name,
            folder.relative_path,
            folder.path_identity,
            folderNow,
          );
        foldersByPath.set(directoryIdentity, folder);
      }
      const insertManagedAsset = openLibrary.connection.prepare(
        `INSERT INTO assets
           (asset_id, location_kind, managed_folder_id, linked_folder_id, relative_file_path,
            path_identity, current_revision_id, availability, created_at, updated_at)
         VALUES (?, 'managed', ?, NULL, ?, ?, NULL, 'available', ?, ?)`,
      );
      const insertManagedRevision = openLibrary.connection.prepare(
        `INSERT INTO revisions
           (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
            original_filename, origin, accepted_at)
         VALUES (?, ?, NULL, ?, ?, ?, 'external_change', ?)`,
      );
      const setManagedCurrentRevision = openLibrary.connection.prepare(
        'UPDATE assets SET current_revision_id = ?, updated_at = ? WHERE asset_id = ?',
      );
      for (const entry of managedEntries) {
        const pathIdentity = portablePathIdentity(entry.relativePath);
        if (existingManagedIdentities.has(pathIdentity)) continue;
        const directory = path.posix.dirname(entry.relativePath);
        const managedFolderId =
          directory === '.'
            ? null
            : (foldersByPath.get(portablePathIdentity(directory))?.folder_id ?? null);
        if (directory !== '.' && managedFolderId === null) continue;
        const assetId = randomUUID();
        const revisionId = randomUUID();
        insertManagedAsset.run(
          assetId,
          managedFolderId,
          entry.relativePath,
          pathIdentity,
          folderNow,
          folderNow,
        );
        insertManagedRevision.run(
          revisionId,
          assetId,
          entry.byteSize,
          entry.modifiedAt,
          entry.originalFilename,
          folderNow,
        );
        setManagedCurrentRevision.run(revisionId, folderNow, assetId);
        existingManagedIdentities.set(pathIdentity, assetId);
        this.syncAssetSearchContent(openLibrary.connection, assetId);
        discoveredAssetIds.push(assetId);
        if (this.thumbnailEligible(openLibrary.summary.libraryId, entry.relativePath)) {
          openLibrary.connection
            .prepare(
              `INSERT OR IGNORE INTO jobs
                 (job_id, library_id, asset_id, revision_id, kind, status, priority,
                  progress, attempt_count, created_at, updated_at)
               VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', 0, 0.0, 0, ?, ?)`,
            )
            .run(randomUUID(), libraryId, assetId, revisionId, folderNow, folderNow);
        }
        changedCount += 1;
      }

      // 离线链接根（root 目录不可用）已由 reconcileLinkedFolderStatuses 置为
      // offline；其资产的缺失属于「目录整体离线」，status-changed 日志已覆盖，
      // 不做逐资产 asset-missing 刷屏（Serpent-c2d052）。
      const offlineLinkedFolderIds = new Set(
        (openLibrary.connection
          .prepare("SELECT folder_id FROM linked_folders WHERE status = 'offline'")
          .all() as Array<{ folder_id: string }>).map((row) => row.folder_id),
      );
      for (const asset of before) {
        if (
          asset.location_kind === 'managed' &&
          openLibrary.preservedRelinkPathIdentities.has(
            portablePathIdentity(asset.relative_file_path),
          )
        ) {
          continue;
        }
        // Serpent-4bdd26: the enumerations above already lstat'ed every
        // source file; consult that snapshot first and only fall back to a
        // direct lstat for rows it cannot cover (e.g. an offline linked root
        // skipped by its enumeration, or ignore-rule edge cases).
        const snapshotKey = asset.location_kind === 'linked'
          ? `${asset.linked_folder_id ?? ''}\u0000${portablePathIdentity(asset.relative_file_path)}`
          : portablePathIdentity(asset.relative_file_path);
        const snapshotEntry = asset.location_kind === 'linked'
          ? linkedPreflightByAssetId.get(asset.asset_id)
            ?? linkedSnapshot.get(snapshotKey)
          : managedSnapshot.get(snapshotKey);
        const pathChanged = asset.location_kind === 'linked'
          && snapshotEntry !== undefined
          && portablePathIdentity(asset.relative_file_path)
            !== portablePathIdentity(snapshotEntry.relativePath);
        const preflightSource = preflightSourceByAssetId.get(asset.asset_id);
        let snapshotByteSize: number | null = null;
        let snapshotModifiedAt: string | null = null;
        // Serpent-4bdd26: only the fallback path needs a fully validated
        // absolute path. folderPath()/linkedAssetPath() lstat every path
        // component (symlink-escape guard) — ~290ms per 20k rows — which is
        // pure waste when the enumeration just walked that exact tree with
        // its own symlink checks. Content fingerprints resolve lazily below.
        const resolveAssetPath = (): string =>
          asset.location_kind === 'linked'
            ? this.linkedAssetPath(openLibrary, asset.linked_folder_id, asset.relative_file_path)
            : this.folderPath(openLibrary, asset.relative_file_path);
        let fileStat: BigIntStats | Stats | undefined;
        if (snapshotEntry) {
          snapshotByteSize = Number.isSafeInteger(snapshotEntry.byteSize)
            ? snapshotEntry.byteSize
            : null;
          snapshotModifiedAt = snapshotEntry.modifiedAt;
        } else {
          try {
            fileStat = this.options.assetLstat
              ? this.options.assetLstat(resolveAssetPath())
              : lstatSync(resolveAssetPath(), { bigint: true });
          } catch (error) {
            if (isUnreadablePathError(error)) {
              fileStat = undefined;
            } else {
              throw new LibraryServiceError('IMPORT_APPLY_FAILED', { cause: error });
            }
          }
        }
        const sourceDevice = asset.location_kind === 'linked'
          ? snapshotEntry?.sourceDevice
            ?? (fileStat === undefined ? null : String(fileStat.dev))
          : null;
        const sourceInode = asset.location_kind === 'linked'
          ? snapshotEntry?.sourceInode
            ?? (fileStat === undefined ? null : String(fileStat.ino))
          : null;
        const statIsFile = snapshotEntry
          ? true
          : Boolean(fileStat?.isFile() && !fileStat.isSymbolicLink());
        if (!snapshotEntry && (!fileStat || !statIsFile)) {
          if (asset.availability === 'available') {
            openLibrary.connection
              .prepare("UPDATE assets SET availability = 'missing', updated_at = ? WHERE asset_id = ?")
              .run(new Date().toISOString(), asset.asset_id);
            changedCount += 1;
            missingCount += 1;
            // 仅对「链接资产 + 文件夹未离线」的逐文件缺失打日志：managed 资产
            // 不属链接磁盘同步；文件夹整体离线由 status-changed 覆盖，避免
            // 整目录 N 条刷屏（Serpent-c2d052）。
            if (
              asset.location_kind === 'linked'
              && !offlineLinkedFolderIds.has(asset.linked_folder_id ?? '')
            ) {
              this.diagnose('linked-folder.sync.asset-missing', 'External file disappeared from disk; asset marked missing', {
                libraryId: openLibrary.summary.libraryId,
                assetId: asset.asset_id,
                locationKind: asset.location_kind,
                linkedFolderId: asset.linked_folder_id,
                relativeFilePath: asset.relative_file_path,
              });
            }
          }
          continue;
        }

        const byteSize = snapshotEntry
          ? snapshotByteSize!
          : Number(fileStat!.size);
        if (!Number.isSafeInteger(byteSize)) {
          throw new LibraryServiceError('IMPORT_APPLY_FAILED', {
            reason: 'UNSUPPORTED_FILE_ENTRY',
          });
        }
        // BigIntStats exposes integer mtimeMs while Stats may retain a fractional
        // value whose prebuilt Date rounds differently. Normalize both to the
        // filesystem millisecond used when linked/import revisions are created.
        const modifiedAt = snapshotModifiedAt
          ?? new Date(Number(fileStat!.mtimeMs)).toISOString();
        const currentRelativePath = snapshotEntry?.relativePath ?? asset.relative_file_path;
        if (!asset.revision_row_id) {
          // A dangling current_revision_id (or a NULL revision after a partial
          // write) must stay visible until this source-backed repair completes.
          // Rebuild the durable revision from the file instead of dropping the
          // asset from browse results through an inner join.
          const revisionId = randomUUID();
          const now = new Date().toISOString();
          openLibrary.connection
            .prepare(
              `INSERT INTO revisions
                 (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
                  original_filename, origin, accepted_at, content_fingerprint)
               VALUES (?, ?, NULL, ?, ?, ?, 'external_change', ?, ?)`,
            )
            .run(
              revisionId,
              asset.asset_id,
              byteSize,
              modifiedAt,
              path.posix.basename(currentRelativePath),
              now,
              snapshotEntry?.contentFingerprint
                ?? preflightSource?.fingerprint
                ?? null,
            );
          openLibrary.connection
            .prepare(
              `UPDATE assets
                  SET current_revision_id = ?, availability = 'available',
                      relative_file_path = ?, path_identity = ?, source_device = ?,
                      source_inode = ?, updated_at = ?
                WHERE asset_id = ?`,
            )
            .run(
              revisionId,
              currentRelativePath,
              portablePathIdentity(currentRelativePath),
              sourceDevice,
              sourceInode,
              now,
              asset.asset_id,
            );
          if (
            this.thumbnailEligible(openLibrary.summary.libraryId, currentRelativePath)
            && !this.isExplicitlyIgnored(
              openLibrary,
              asset.location_kind,
              asset.linked_folder_id,
              currentRelativePath,
              'asset',
            )
          ) {
            openLibrary.connection
              .prepare(
                `INSERT OR IGNORE INTO jobs
                   (job_id, library_id, asset_id, revision_id, kind, status, priority,
                    progress, attempt_count, created_at, updated_at)
                 VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', 0, 0.0, 0, ?, ?)`,
              )
              .run(randomUUID(), libraryId, asset.asset_id, revisionId, now, now);
          }
          this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
          discoveredAssetIds.push(asset.asset_id);
          changedCount += 1;
          continue;
        }
        // On APFS, fs.utimes() can restore an ISO millisecond as one microsecond
        // less (for example .178000 -> .177999), which crosses the Date floor and
        // used to create a phantom revision when a missing file reappeared. Only
        // tolerate that one-millisecond representation edge while restoring a
        // missing asset; available-file refreshes retain exact change detection.
        // Files copied from an exported library can round an ISO millisecond
        // timestamp by one millisecond on APFS/NTFS. Treat that representation
        // edge as equivalent for both available and reappearing assets; a
        // genuine source edit is still represented by a larger timestamp or
        // byte-size change.
        const previousModifiedAt = asset.modified_at ?? '';
        const previousByteSize = asset.byte_size ?? -1;
        const timestampEquivalent = Math.abs(Date.parse(modifiedAt) - Date.parse(previousModifiedAt)) <= 1;
        const byteChanged = byteSize !== previousByteSize;
        const mtimeChanged = modifiedAt !== previousModifiedAt && !timestampEquivalent;
        // Serpent-1tio: a library copied to another platform (zip export →
        // extraction) rewrites every file mtime while the bytes stay identical.
        // mtime alone would re-import the whole library and orphan the exported
        // artifacts. When only the mtime moved and the size matches, verify the
        // content fingerprint: a match keeps the revision (and its artifacts);
        // a NULL stored fingerprint means the revision was never verified —
        // backfill it from the file and treat the copy as unchanged.
        let statChanged = byteChanged || mtimeChanged;
        let fingerprint: string | null = null;
        if (statChanged) {
          // Open reconciliation precomputes this asynchronously before the
          // transaction. Non-open refresh callers retain the synchronous
          // preflight. A race that is not covered by either snapshot is
          // treated conservatively; it must never cause file I/O while the
          // bounded SQLite transaction is open.
          fingerprint = snapshotEntry?.contentFingerprint
            ?? preflightSource?.fingerprint
            ?? null;
          if (!byteChanged && mtimeChanged && fingerprint !== null) {
            const stored = asset.content_fingerprint;
            if (stored === null) {
              // Backfill also adopts the file's mtime: otherwise every later
              // refresh would re-hash the file (mtime still differs) while
              // the content is known identical.
              openLibrary.connection
                .prepare(
                  'UPDATE revisions SET content_fingerprint = ?, modified_at = ? WHERE revision_id = ?',
                )
                .run(fingerprint, modifiedAt, asset.current_revision_id);
              statChanged = false;
            } else if (fingerprint === stored) {
              statChanged = false;
            }
          }
        }
        const now = new Date().toISOString();
        if (statChanged) {
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
              asset.asset_id,
              asset.current_revision_id,
              byteSize,
              modifiedAt,
              path.posix.basename(currentRelativePath),
              now,
              fingerprint,
            );
          openLibrary.connection
            .prepare(
              `UPDATE assets
                  SET current_revision_id = ?, availability = 'available',
                      relative_file_path = ?, path_identity = ?, source_device = ?,
                      source_inode = ?, updated_at = ?
                WHERE asset_id = ?`,
            )
            .run(
              revisionId,
              currentRelativePath,
              portablePathIdentity(currentRelativePath),
              sourceDevice,
              sourceInode,
              now,
              asset.asset_id,
            );
          // Invalidate old revision artifacts
          openLibrary.connection
            .prepare(
              `UPDATE revision_artifacts
                  SET invalidated_at = ?
                WHERE revision_id = ?
                  AND invalidated_at IS NULL`,
            )
            .run(now, asset.current_revision_id);
          // Enqueue only decodable media; unsupported assets keep their normal
          // file icon and never churn through a permanently failing queue.
          if (
            this.thumbnailEligible(openLibrary.summary.libraryId, currentRelativePath)
            && !this.isExplicitlyIgnored(
              openLibrary,
              asset.location_kind,
              asset.linked_folder_id,
              currentRelativePath,
              'asset',
            )
          ) {
            openLibrary.connection
              .prepare(
                `INSERT OR IGNORE INTO jobs
                   (job_id, library_id, asset_id, revision_id, kind, status, priority,
                    progress, attempt_count, created_at, updated_at)
                 VALUES (?, ?, ?, ?, 'generate_thumbnail', 'queued', 0, 0.0, 0, ?, ?)`,
              )
              .run(randomUUID(), libraryId, asset.asset_id, revisionId, now, now);
          }
          changedCount += 1;
          this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
        } else if (
          pathChanged
          || (asset.location_kind === 'linked'
            && (sourceDevice !== asset.source_device || sourceInode !== asset.source_inode))
          || asset.availability === 'missing'
        ) {
          openLibrary.connection
            .prepare(
              `UPDATE assets
                  SET relative_file_path = ?, path_identity = ?, source_device = ?,
                      source_inode = ?, availability = 'available', updated_at = ?
                WHERE asset_id = ?`,
            )
            .run(
              currentRelativePath,
              portablePathIdentity(currentRelativePath),
              sourceDevice,
              sourceInode,
              now,
              asset.asset_id,
            );
          if (pathChanged || asset.availability === 'missing') changedCount += 1;
          if (pathChanged || asset.availability === 'missing') {
            this.syncAssetSearchContent(openLibrary.connection, asset.asset_id);
          }
        }
      }
      markStage('compare-loop');
    })();
    markStage('transaction');
    this.persistSourceImageDimensionsForAssets(openLibrary, discoveredAssetIds);
    this.reconcileLinkedWatchers(openLibrary);
    markStage('post-phases');

    const result = {
      changedCount,
      missingCount,
      ...(options?.includeAssets
        ? { assets: this.listAssets({ libraryId, recursive: true }) }
        : {}),
    };
    markStage(options?.includeAssets ? 'list-assets' : 'return');
    if (changedCount > 0 || missingCount > 0) {
      // refreshManagedAssets 同时对账 managed 与 linked，摘要用中性 scope，
      // 避免纯 managed 变更被误标为链接磁盘同步（Serpent-c2d052）。
      this.diagnose('assets.sync.reconciled', 'Disk reconciliation applied changes', {
        libraryId,
        changedCount,
        missingCount,
      });
    }
    return result;
  }

  override createLibrary(input: {
    displayName: string;
    selectedParentPath: string;
    /** 内部用于「从同步远端恢复库身份」：默认随机生成。 */
    libraryId?: string;
  }): InternalLibrarySummary {
    let finalPath: string;
    try {
      finalPath = targetLibraryPath(input.selectedParentPath, input.displayName);
    } catch (error) {
      throw serviceError(error, 'INVALID_LIBRARY_PATH');
    }

    const displayName = path.basename(finalPath);
    const parentPath = path.dirname(finalPath);
    try {
      if (!directoryExists(parentPath)) throw new LibraryServiceError('INVALID_LIBRARY_PATH');
      accessSync(parentPath, constants.W_OK);
    } catch (error) {
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
    if (existsSync(finalPath)) throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS');

    const partialPath = path.join(parentPath, `.serpent-create-${randomUUID()}.partial`);
    let connection: DatabaseConnection | undefined;
    let renamed = false;

    try {
      mkdirSync(partialPath);
      createDirectoryLayout(partialPath);
      connection = openConfiguredDatabase(
        databasePath(partialPath),
        this.options.sqliteBusyTimeoutMsForTests,
      );
      migrateDatabase(connection, true, this.options);
      connection
        .prepare('INSERT INTO library (library_id, display_name, created_at) VALUES (?, ?, ?)')
        .run(input.libraryId ?? randomUUID(), displayName, new Date().toISOString());
      verifyDatabase(connection);
      connection.close();
      connection = undefined;

      const verificationConnection = openConfiguredDatabase(
        databasePath(partialPath),
        this.options.sqliteBusyTimeoutMsForTests,
      );
      try {
        verifyDatabase(verificationConnection);
      } finally {
        verificationConnection.close();
      }

      renamePathWithRetry(partialPath, finalPath);
      renamed = true;
      return this.openLibrary(finalPath);
    } catch (error) {
      closeIgnoringFailure(connection);
      const cleanupPath = renamed ? finalPath : partialPath;
      try {
        if (existsSync(cleanupPath)) {
          if (renamed) renamePathWithRetry(finalPath, partialPath);
          removePathWithSyncRetry(partialPath);
        }
      } catch (cleanupError) {
        throw new LibraryServiceError('LIBRARY_CLEANUP_FAILED', { cause: cleanupError });
      }
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  public override async reconcileDefaultIgnoredAssets(
    openLibrary: OpenLibrary,
    task: OpenReconciliationTask,
  ): Promise<void> {
    // Keep this cleanup bounded twice: the SQL predicate narrows the scan to
    // the exact default-junk filename shapes, and the cursor limits each
    // result/transaction to a short page. The previous implementation loaded
    // every visible asset before filtering in JS, which made a harmless
    // `.DS_Store` cleanup compete with viewer requests on NAS libraries.
    const defaultIgnoredSql = `(
      LOWER(a.relative_file_path) LIKE '%.ds_store'
      OR LOWER(a.relative_file_path) IN ('desktop.ini', 'thumbs.db')
      OR LOWER(a.relative_file_path) LIKE '%/desktop.ini'
      OR LOWER(a.relative_file_path) LIKE '%/thumbs.db'
      OR LOWER(a.relative_file_path) LIKE '._%'
      OR LOWER(a.relative_file_path) LIKE '%/._%'
    )`;
    let lastAssetId = '';
    for (;;) {
      this.assertReconciliationActive(task);
      const rows = openLibrary.connection.prepare(
        `SELECT a.asset_id, a.relative_file_path
           FROM assets a
          WHERE a.deleted_at IS NULL
            AND a.asset_id > ?
            AND ${defaultIgnoredSql}
            AND ${this.explicitIgnoreSql(openLibrary.connection, 'a')}
          ORDER BY a.asset_id
          LIMIT 128`,
      ).all(lastAssetId) as Array<{ asset_id: string; relative_file_path: string }>;
      if (rows.length === 0) return;
      lastAssetId = rows.at(-1)!.asset_id;
      const ignoredIds = rows
        .filter((row) => isAlwaysIgnoredAssetPath(row.relative_file_path))
        .map((row) => row.asset_id);
      if (ignoredIds.length > 0) {
        openLibrary.connection.transaction(() => {
          const remove = openLibrary.connection.prepare('DELETE FROM assets WHERE asset_id = ?');
          for (const assetId of ignoredIds) remove.run(assetId);
        })();
      }
      await this.yieldReconciliation(task);
    }
  }

  /**
   * A Worker can disappear after a recipe changed the filesystem but before
   * the history attempt was finalized. The file-operation recovery pass owns
   * those byte-level journals; this pass keeps the user-facing history honest
   * by making an unfinished transition explicitly stale until a future
   * conflict-resolution flow can inspect it.
   */
  public override recoverOperationHistoryTransitions(openLibrary: OpenLibrary): void {
    const unfinished = openLibrary.connection.prepare(
      `SELECT attempt_id, history_entry_id
         FROM operation_history_attempts
        WHERE status IN ('preparing', 'applying')`,
    ).all() as Array<{ attempt_id: string; history_entry_id: string }>;
    const unfinishedGroups = openLibrary.connection.prepare(
      `SELECT history_entry_id
         FROM operation_history
        WHERE state = 'open'`,
    ).all() as Array<{ history_entry_id: string }>;
    if (unfinished.length === 0 && unfinishedGroups.length === 0) return;
    const now = new Date().toISOString();
    openLibrary.connection.transaction(() => {
      const markEntry = openLibrary.connection.prepare(
        `UPDATE operation_history
            SET state = 'stale', stale_code = 'WORKER_RESTART_DURING_TRANSITION', updated_at = ?
          WHERE history_entry_id = ? AND state IN ('undoing', 'redoing')`,
      );
      const markAttempt = openLibrary.connection.prepare(
        `UPDATE operation_history_attempts
            SET status = 'failed', error_code = 'WORKER_RESTART_DURING_TRANSITION', updated_at = ?
          WHERE attempt_id = ?`,
      );
      for (const attempt of unfinished) {
        markEntry.run(now, attempt.history_entry_id);
        markAttempt.run(now, attempt.attempt_id);
      }
      const markGroup = openLibrary.connection.prepare(
        `UPDATE operation_history
            SET state = 'stale', stale_code = 'WORKER_RESTART_DURING_GROUP', updated_at = ?
          WHERE history_entry_id = ? AND state = 'open'`,
      );
      for (const group of unfinishedGroups) markGroup.run(now, group.history_entry_id);
    })();
    this.diagnose('operation-history.recovered-stale-transition', new Error(
      'An unfinished history transition was marked stale after Worker restart.',
    ), {
      libraryId: openLibrary.summary.libraryId,
      attemptCount: unfinished.length,
      groupCount: unfinishedGroups.length,
    });
  }

  /**
   * Open a library through the corruption recovery ladder. The normal path is
   * intentionally kept separate so a failed recovery attempt cannot recurse
   * through this method and accidentally consume another backup slot.
   */
  override openLibrary(
    selectedLibraryPath: string,
    options?: { replaceExisting?: boolean },
  ): InternalLibrarySummary {
    let canonicalPath: string | undefined;
    let normalizedPath: string | undefined;
    try {
      const selectedPath = normalizeAbsolutePath(selectedLibraryPath);
      normalizedPath = selectedPath;
      if (existsSync(selectedPath) && directoryExists(selectedPath)) {
        canonicalPath = realpathSync(selectedPath);
      }
    } catch {
      // The primary open path below owns the public validation error.
    }

    // A network mount can disappear between sessions. If the selected path or
    // its primary DB is unavailable, prefer the last verified local snapshot
    // over returning a misleading generic NOT_A_LIBRARY error. The helper only
    // reads this user-scoped derived cache and returns a read-only summary.
    if (
      normalizedPath !== undefined
      && (!existsSync(normalizedPath) || !realFileExists(databasePath(normalizedPath)))
    ) {
      const cached = this.openCachedNetworkMetadataSnapshot(normalizedPath);
      if (cached) return cached;
    }

    try {
      return this.openLibraryPrimary(selectedLibraryPath, options);
    } catch (error) {
      if (
        normalizedPath !== undefined
        && (!existsSync(normalizedPath) || !realFileExists(databasePath(normalizedPath)))
      ) {
        const cached = this.openCachedNetworkMetadataSnapshot(normalizedPath);
        if (cached) return cached;
      }
      if (!canonicalPath || !this.isDatabaseRecoveryFailure(error)) throw error;
      if (!this.canAttemptDatabaseRecovery(canonicalPath)) throw error;
      // Do not turn a valid database's journal/migration/operation error into
      // a destructive rescue. The ladder is only for a failed SQLite file
      // (or a missing primary with a usable backup).
      if (!this.primaryDatabaseIsDamaged(canonicalPath)) throw error;

      const primaryFailure = error;
      for (const slot of [1, 2] as const) {
        const backupPath = databaseBackupPath(canonicalPath, slot);
        if (!this.validateDatabaseBackup(backupPath, canonicalPath, slot)) continue;
        try {
          this.restoreDatabaseBackup(canonicalPath, backupPath);
          const summary = this.openLibraryPrimary(canonicalPath);
          return this.attachRecoveryNotice(summary, {
            mode: slot === 1 ? 'backup-1' : 'backup-2',
          });
        } catch (recoveryError) {
          this.diagnose('library.recovery.backup-open', recoveryError, {
            libraryPath: canonicalPath,
            backupPath,
            slot,
          });
        }
      }

      try {
        const rescue = this.rescueLibraryFromAssets(canonicalPath, primaryFailure);
        const summary = this.openLibraryPrimary(canonicalPath);
        return this.attachRecoveryNotice(summary, {
          mode: 'rescue',
          ...(rescue.reportPath ? { reportPath: rescue.reportPath } : {}),
          recoveredAssetCount: rescue.recoveredAssetCount,
          metadataRecovered: false,
          metadataLosses: ['collections', 'tags', 'ratings', 'descriptions', 'source-links'],
        });
      } catch (rescueError) {
        this.diagnose('library.recovery.rescue', rescueError, {
          libraryPath: canonicalPath,
        });
        throw primaryFailure;
      }
    }
  }

  public override isDatabaseRecoveryFailure(error: unknown): boolean {
    return error instanceof LibraryServiceError &&
      (error.code === 'LIBRARY_CORRUPT' || error.code === 'NOT_A_LIBRARY');
  }

  public override canAttemptDatabaseRecovery(libraryPath: string): boolean {
    const serpentPath = path.join(libraryPath, '.serpent');
    const primaryPath = databasePath(libraryPath);
    // A symlink in the metadata boundary is a path-integrity violation, not
    // ordinary SQLite damage. Never rename or rescue through it; preserve the
    // existing NOT_A_LIBRARY rejection and avoid touching a victim target.
    try {
      if (lstatSync(serpentPath).isSymbolicLink() || lstatSync(primaryPath).isSymbolicLink()) {
        return false;
      }
    } catch {
      // Missing metadata is recoverable when Assets and .serpent are present;
      // the ladder will decide whether a backup or Assets rescue is possible.
    }
    return realDirectoryExists(path.join(libraryPath, 'Assets')) &&
      realDirectoryExists(serpentPath);
  }

  public override primaryDatabaseIsDamaged(libraryPath: string): boolean {
    const filename = databasePath(libraryPath);
    if (!realFileExists(filename)) return true;
    let connection: DatabaseConnection | undefined;
    try {
      connection = openConfiguredDatabase(
        filename,
        this.options.sqliteBusyTimeoutMsForTests,
        { readonly: true },
      );
      if (connection.pragma('quick_check(1)', { simple: true }) !== 'ok') return true;
      try {
        // Accept older, current, and newer-than-supported schemas. Exact
        // current-schema matching belongs to migrate/verifyDatabase, not the
        // destructive restore ladder. A newer library with a canonical prefix
        // is openable writable; treating it as damage caused Assets rescue to
        // replace a healthy too-new primary after backups were also rejected
        // as LIBRARY_VERSION_TOO_NEW.
        verifyOpenableSchema(connection);
        return false;
      } catch {
        // A structurally readable but incomplete database is still a damaged
        // primary for the recovery ladder. Valid operation/migration failures
        // are excluded before this probe reaches here.
        return true;
      }
    } catch (error) {
      // A missing/broken SQLite native module is an app install failure.
      // It must not quarantine the user's primary or walk the rescue ladder.
      if (isSqliteEngineUnavailableError(error)) return false;
      return true;
    } finally {
      closeIgnoringFailure(connection);
    }
  }

  public override validateDatabaseBackup(
    backupPath: string,
    libraryPath: string,
    slot: 1 | 2,
  ): boolean {
    if (!realFileExists(backupPath)) return false;
    let connection: DatabaseConnection | undefined;
    try {
      connection = openConfiguredDatabase(
        backupPath,
        this.options.sqliteBusyTimeoutMsForTests,
        { readonly: true },
      );
      // Too-new backups are still usable Serpent databases. Rejecting them as
      // invalid used to skip both slots and fall through to empty Assets rescue.
      verifyOpenableSchema(connection);
      return true;
    } catch (error) {
      this.diagnose('library.recovery.backup-invalid', error, {
        libraryPath,
        backupPath,
        slot,
      });
      return false;
    } finally {
      closeIgnoringFailure(connection);
    }
  }

  public override restoreDatabaseBackup(libraryPath: string, backupPath: string): void {
    const serpentPath = path.join(libraryPath, '.serpent');
    const quarantinePath = path.join(
      serpentPath,
      'corrupt-backup',
      `library.db.primary-${Date.now()}-${randomUUID()}.db`,
    );
    const primaryPath = databasePath(libraryPath);
    const restoreStagePath = path.join(
      serpentPath,
      `.library.db.restore-${randomUUID()}.tmp`,
    );
    mkdirSync(path.dirname(quarantinePath), { recursive: true });
    try {
      if (existsSync(primaryPath)) {
        renameSync(primaryPath, quarantinePath);
      }
      rmSync(`${primaryPath}-wal`, { force: true });
      rmSync(`${primaryPath}-shm`, { force: true });
      copyFileSync(backupPath, restoreStagePath);
      renameSync(restoreStagePath, primaryPath);
    } catch (error) {
      try { rmSync(restoreStagePath, { force: true }); } catch { /* best effort */ }
      if (!existsSync(primaryPath) && existsSync(quarantinePath)) {
        try { renameSync(quarantinePath, primaryPath); } catch { /* best effort */ }
      }
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
  }

  public override rescueLibraryFromAssets(
    libraryPath: string,
    primaryFailure: unknown,
  ): { reportPath?: string; recoveredAssetCount: number } {
    const serpentPath = path.join(libraryPath, '.serpent');
    const primaryPath = databasePath(libraryPath);
    const quarantineDirectory = path.join(serpentPath, 'corrupt-backup');
    const quarantinePath = path.join(
      quarantineDirectory,
      `library.db.primary-${Date.now()}-${randomUUID()}.db`,
    );
    mkdirSync(quarantineDirectory, { recursive: true });
    const primaryExisted = existsSync(primaryPath);
    if (primaryExisted) renameSync(primaryPath, quarantinePath);
    rmSync(`${primaryPath}-wal`, { force: true });
    rmSync(`${primaryPath}-shm`, { force: true });

    let connection: DatabaseConnection | undefined;
    try {
      this.options.beforeLibraryRescueForTests?.();
      connection = openConfiguredDatabase(
        primaryPath,
        this.options.sqliteBusyTimeoutMsForTests,
      );
      migrateDatabase(connection, true, this.options);
      connection
        .prepare('INSERT INTO library (library_id, display_name, created_at) VALUES (?, ?, ?)')
        .run(
          randomUUID(),
          path.basename(libraryPath).slice(0, 255) || 'Recovered Library',
          new Date().toISOString(),
        );
      verifyDatabase(connection);
      connection.close();
      connection = undefined;
    } catch (error) {
      closeIgnoringFailure(connection);
      try { rmSync(primaryPath, { force: true }); } catch { /* best effort */ }
      try { rmSync(`${primaryPath}-wal`, { force: true }); } catch { /* best effort */ }
      try { rmSync(`${primaryPath}-shm`, { force: true }); } catch { /* best effort */ }
      if (primaryExisted && existsSync(quarantinePath) && !existsSync(primaryPath)) {
        try { renameSync(quarantinePath, primaryPath); } catch { /* best effort */ }
      }
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }

    const reportPath = path.join(
      quarantineDirectory,
      `recovery-report-${Date.now()}-${randomUUID()}.json`,
    );
    const recoveredAssetCount = countRecoverableAssetFiles(path.join(libraryPath, 'Assets'));
    try {
      writeFileSync(reportPath, JSON.stringify({
        version: 1,
        mode: 'rescue',
        libraryPath,
        recoveredFrom: 'Assets',
        recoveredAssetCount,
        metadataRecovered: false,
        metadataLosses: ['collections', 'tags', 'ratings', 'descriptions', 'source-links'],
        primaryFailure: primaryFailure instanceof Error ? primaryFailure.message : String(primaryFailure),
        createdAt: new Date().toISOString(),
      }, null, 2));
      return { reportPath, recoveredAssetCount };
    } catch (error) {
      this.diagnose('library.recovery.report', error, { libraryPath });
      return { recoveredAssetCount };
    }
  }

  public override attachRecoveryNotice(
    summary: InternalLibrarySummary,
    recovery: NonNullable<InternalLibrarySummary['recovery']>,
  ): InternalLibrarySummary {
    const openLibrary = this.openById.get(summary.libraryId);
    if (!openLibrary) return { ...summary, recovery };
    openLibrary.summary = { ...openLibrary.summary, recovery };
    return openLibrary.summary;
  }

  /**
   * Resolve the most recent recovery report for Main's shell action. The
   * absolute path stays on the Worker→Main side; Renderer receives only the
   * acknowledgement after Main reveals the report in the file manager.
   */
  override getRecoveryReportPath(libraryId: string): string {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const attachedPath = openLibrary.summary.recovery?.reportPath;
    if (attachedPath && realFileExists(attachedPath)) return attachedPath;

    const reportDirectory = path.join(
      openLibrary.summary.libraryPath,
      '.serpent',
      'corrupt-backup',
    );
    const candidates = (() => {
      try {
        return readdirSync(reportDirectory)
          .filter((name) => /^recovery-report-[^/]+\.json$/u.test(name))
          .map((name) => path.join(reportDirectory, name))
          .filter((candidate) => realFileExists(candidate));
      } catch {
        return [];
      }
    })();
    const latest = candidates
      .map((candidate) => {
        try {
          return { candidate, modifiedAt: lstatSync(candidate).mtimeMs };
        } catch {
          return undefined;
        }
      })
      .filter((entry): entry is { candidate: string; modifiedAt: number } => entry !== undefined)
      .sort((left, right) => right.modifiedAt - left.modifiedAt)[0];
    if (!latest) throw new LibraryServiceError('LIBRARY_NOT_FOUND');
    return latest.candidate;
  }

  /**
   * Same catalog identity can appear under more than one filesystem path.
   * That is not damage. Same canonical path stays a silent reuse; a different
   * path must prompt, unless the user confirmed replacing the current handle.
   */
  public override reuseOrRejectDuplicateCatalog(input: {
    libraryId: string;
    canonicalPath: string;
    connection: DatabaseConnection;
    replaceExisting?: boolean;
  }): InternalLibrarySummary | undefined {
    const existingOpen = this.openById.get(input.libraryId);
    if (!existingOpen) return undefined;
    if (existingOpen.summary.libraryPath === input.canonicalPath) {
      if (!this.sqliteConnectionIsRegisteredPrimary(input.connection)) {
        closeIgnoringFailure(input.connection);
      }
      this.openIdByPath.set(input.canonicalPath, existingOpen.summary.libraryId);
      return existingOpen.summary;
    }
    if (input.replaceExisting !== true) {
      if (!this.sqliteConnectionIsRegisteredPrimary(input.connection)) {
        closeIgnoringFailure(input.connection);
      }
      throw new LibraryServiceError('LIBRARY_ALREADY_OPEN');
    }
    // Keep the already-opened connection for the chosen path. Release the
    // current handle first so this catalog is not registered twice.
    this.closeLibrary(input.libraryId);
    return undefined;
  }

  /**
   * Register a writable open handle. Desktop never offers a read-only library:
   * too-new schemas stay writable, stuck migrations stay writable at the last
   * good version, and physical damage goes through backup/rescue instead.
   */
  public override adoptWritableOpenLibrary(input: {
    connection: DatabaseConnection;
    library: LibraryRow;
    canonicalPath: string;
    serpentPath: string;
    networkStorage?: boolean;
    storageKind?: LibraryStorageKind;
    libraryVersion?: number;
    supportedSchemaVersion?: number;
    migrationStuck?: boolean;
    startServices: boolean;
    replaceExisting?: boolean;
  }): InternalLibrarySummary {
    const existingSummary = this.reuseOrRejectDuplicateCatalog({
      libraryId: input.library.library_id,
      canonicalPath: input.canonicalPath,
      connection: input.connection,
      replaceExisting: input.replaceExisting,
    });
    if (existingSummary) return existingSummary;
    try {
      for (const directoryName of REGENERABLE_DIRECTORIES) {
        mkdirSync(path.join(input.serpentPath, directoryName), { recursive: true });
      }
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    // A NAS library can be moved between computers, but an absolute linked
    // folder path cannot. Do not silently open a catalog whose linked source
    // points at computer A while this process is running on computer B; the
    // resulting empty/offline view looks like data loss and is hard to recover
    // from. Local libraries retain their existing offline/relink semantics.
    this.assertNetworkLinkedFoldersAvailable(
      input.connection,
      input.networkStorage === true,
    );
    backfillDominantSaturation(
      input.connection,
      path.join(input.canonicalPath, '.serpent', 'artifacts'),
    );

    const networkReadThrough = input.networkStorage
      ? this.createNetworkMetadataReadThrough({
          connection: input.connection,
          canonicalPath: input.canonicalPath,
          libraryId: input.library.library_id,
          startServices: input.startServices,
          primarySchemaVersion: input.libraryVersion ?? SUPPORTED_SCHEMA_VERSION,
        })
      : { connection: input.connection, writeConnection: input.connection };
    const exposedConnection = networkReadThrough.connection;
    const writeConnection = networkReadThrough.writeConnection;
    const activeNetworkMetadataCache = networkReadThrough.state;
    const registeredOpenLibrary: { value?: OpenLibrary } = {};
    const initialGitignoreText = input.startServices
      ? (() => {
          try {
            // Prime the in-memory value so the first requireOpenLibrary does
            // not rewrite identical ignore rows and advance browse cursor.
            return readGitignoreText(input.canonicalPath);
          } catch {
            // Preserve the old retry-on-first-use behavior for a transient
            // filesystem read failure without blocking the open response.
            return '\u0000';
          }
        })()
      : '';

    const summary: InternalLibrarySummary = {
      libraryId: input.library.library_id,
      displayName: input.library.display_name,
      libraryPath: input.canonicalPath,
      readOnly: false,
      ...(input.networkStorage ? { networkStorage: true } : {}),
      storageKind: input.storageKind ?? 'unknown',
      ...(input.libraryVersion === undefined ? {} : { libraryVersion: input.libraryVersion }),
      ...(input.supportedSchemaVersion === undefined
        ? {}
        : { supportedSchemaVersion: input.supportedSchemaVersion }),
      ...(input.migrationStuck ? { migrationStuck: true } : {}),
    };
    const changeSubscription = input.startServices
      ? new LibraryWriteCoordinator(input.connection, summary.libraryId)
        .subscribeToChangeSequence({
          onChange: (changeSequence) => {
            const currentOpenLibrary = registeredOpenLibrary.value;
            const networkCache = currentOpenLibrary?.networkMetadataCache;
            let browseSequenceChanged = false;
            if (networkCache) {
              try {
                const browseSequence = this.networkMetadataBrowseChangeSequence(
                  input.connection,
                  summary.libraryId,
                );
                browseSequenceChanged = browseSequence !== networkCache.observedSourceChangeSequence;
                if (browseSequenceChanged) {
                  networkCache.observedSourceChangeSequence = browseSequence;
                  networkCache.readThrough.invalidateReadConnection();
                }
              } catch (error) {
                // The broad subscription is still useful for ordinary library
                // change notifications. A temporary read failure must not
                // blank a verified catalog snapshot; the background validator
                // owns the offline/degraded decision.
                this.diagnose('network-metadata-cache.browse-sequence', error, {
                  libraryId: summary.libraryId,
                });
              }
            }
            if (browseSequenceChanged && networkCache?.manifest) {
              this.emitNetworkMetadataCacheEvent({
                type: 'invalidated',
                libraryId: summary.libraryId,
                sourceChangeSequence: changeSequence,
                reason: 'remote-change-sequence',
              });
            }
            this.invalidateArtifactPathCache(summary.libraryId);
            this.options.onLibraryChanged?.({
              type: 'library.changed',
              libraryId: summary.libraryId,
              changeSequence,
            });
          },
        })
      : { lastSequence: 0, stop: () => {} };
    const openLibrary: OpenLibrary = {
      connection: exposedConnection,
      writeConnection,
      summary,
      readOnly: false,
      changeSubscription,
      preservedRelinkPathIdentities: new Set(),
      gitignoreText: initialGitignoreText,
      gitignoreMatcher: parseGitignore(initialGitignoreText === '\u0000' ? '' : initialGitignoreText),
      gitignoreMaterialized: false,
      ...(activeNetworkMetadataCache ? { networkMetadataCache: activeNetworkMetadataCache } : {}),
    };
    registeredOpenLibrary.value = openLibrary;
    this.openById.set(summary.libraryId, openLibrary);
    this.openIdByPath.set(input.canonicalPath, summary.libraryId);
    if (!input.startServices) return summary;
    const adoptStageLog = process.env.SERPENT_OPEN_STAGE_LOG === '1';
    let adoptMark = adoptStageLog ? performance.now() : 0;
    const markAdoptStage = (label: string): void => {
      if (!adoptStageLog) return;
      const now = performance.now();
      console.error(JSON.stringify({
        scope: 'open.stage',
        stage: label,
        durationMs: Math.round((now - adoptMark) * 100) / 100,
      }));
      adoptMark = now;
    };

    this.armDatabaseBackupTimer(openLibrary);
    this.reconcileLinkedFolderStatuses(openLibrary);
    markAdoptStage('linked-statuses');
    this.recoverFileOperations(openLibrary);
    markAdoptStage('recover-file-ops');
    this.recoverOperationHistoryTransitions(openLibrary);
    markAdoptStage('recover-history');
    this.recoverInterruptedAiJobs(openLibrary);
    markAdoptStage('recover-ai');
    this.recoverInterruptedThumbnailJobs(openLibrary);
    // Serpent-4bdd26: retireLegacyGifProxyJobs moved to the background
    // reconciliation — its GIF LIKE subquery scans all assets (~180ms on SMB)
    // and only cancels doomed legacy transcodes, which can wait seconds.
    interruptUnfinishedPluginJobs(
      openLibrary.writeConnection,
      openLibrary.summary.libraryId,
      this.applicationSessionId,
    );
    markAdoptStage('recovery-jobs');
    // Serpent-4bdd26: reconcileDefaultIgnoredAssets moved to the background
    // reconciliation — its full active-asset scan costs ~2.8s on SMB even
    // through the covering index (one round trip per index page), and the
    // rows it removes are always-ignored junk files whose delayed cleanup is
    // invisible to the user.
    this.startAssetWatcher(openLibrary);
    markAdoptStage('asset-watcher');
    this.reconcileLinkedWatchers(openLibrary);
    markAdoptStage('watchers');
    // Startup recovery contains a few idempotent metadata transactions. They
    // intentionally run against the remote truth, so rebind the verified
    // snapshot after that synchronous phase if the semantic change sequence
    // is still unchanged. This preserves immediate second-open cache hits
    // without allowing a startup write to serve stale rows.
    if (activeNetworkMetadataCache && !activeNetworkMetadataCache.readThrough.readCacheActive) {
      let expectedSourceChangeSequence: number | undefined;
      try {
        expectedSourceChangeSequence = this.networkMetadataBrowseChangeSequence(
          input.connection,
          summary.libraryId,
        );
      } catch {
        // The background validator will keep the primary path authoritative if
        // the remote cursor cannot be read during this lifecycle boundary.
      }
      if (expectedSourceChangeSequence !== undefined) {
        const rebound = this.createNetworkMetadataReadThrough({
          connection: input.connection,
          canonicalPath: input.canonicalPath,
          libraryId: summary.libraryId,
          startServices: true,
          primarySchemaVersion: input.libraryVersion ?? SUPPORTED_SCHEMA_VERSION,
          expectedSourceChangeSequence,
        });
        if (rebound.state?.readThrough.readCacheActive) {
          activeNetworkMetadataCache.readThrough.release();
          activeNetworkMetadataCache.writeThrough.release();
          openLibrary.connection = rebound.connection;
          openLibrary.writeConnection = rebound.writeConnection;
          openLibrary.networkMetadataCache = rebound.state;
        }
      }
    }
    // Serpent-tumv (LIB-018, deferred open maintenance): the disk-heavy reconciliation
    // steps moved out of the synchronous open path and run in the background
    // (runOpenBackgroundReconciliation). Opening a large library used to
    // block on a full artifact-file lstat sweep + expired-trash purge + a
    // whole Assets-directory rescan before the first frame rendered.
    // Serpent-4bdd26：startup 缩略图入队（limit:50 + repairFailed + retryFailed，
    // 实测 ~230ms 全库扫描）已由 Worker 的 deferStartupThumbnailScene 在
    // 首个真实视口后以相同参数调度——同步路径重复执行只拖慢 library.open 响应，
    // 不改变最终队列状态。
    return summary;
  }

  public override assertNetworkLinkedFoldersAvailable(
    connection: DatabaseConnection,
    networkStorage: boolean,
  ): void {
    if (!networkStorage) return;
    const linkedFolders = connection
      .prepare('SELECT absolute_root_path, source_device_hint FROM linked_folders')
      .all() as Array<{ absolute_root_path: string; source_device_hint: string | null }>;
    for (const folder of linkedFolders) {
      const availability = this.linkedRootAvailability(folder.absolute_root_path);
      if (!availability.available) {
        throw new LibraryServiceError('LINKED_FOLDER_UNAVAILABLE', {
          reason: availability.reason,
        });
      }
      // `source_device_hint` is not the catalog identity key. It is a safety
      // signal for the case where another computer has a different volume at
      // the same path used by the original computer.
      // A missing hint is deliberately fail-closed. Older libraries may not
      // have recorded the originating host/volume, and accepting the current
      // path in that case could silently scan another computer's local folder.
      const storedDeviceHint = folder.source_device_hint?.trim();
      if (!storedDeviceHint) {
        throw new LibraryServiceError('LINKED_FOLDER_UNAVAILABLE');
      }
      // v3 hints include directory birth time, so an inode reused by
      // rm+mkdir on ext4/tmpfs no longer matches. Older v2 / numeric hints
      // stay accepted for the same device and inode.
      const hintMatches = storedDeviceHint.startsWith('v3:')
        ? storedDeviceHint === availability.deviceHint
        : storedDeviceHint === availability.deviceHint
          || storedDeviceHint === availability.legacyInodeHint
          || storedDeviceHint === availability.legacyHostDeviceHint
          || storedDeviceHint === availability.legacyDeviceHint;
      if (!hintMatches) {
        throw new LibraryServiceError('LINKED_FOLDER_UNAVAILABLE', {
          reason: 'LINKED_FOLDER_FOREIGN_DEVICE',
        });
      }
    }
  }

  public override openLibraryPrimary(
    selectedLibraryPath: string,
    options?: { replaceExisting?: boolean },
  ): InternalLibrarySummary {
    // Serpent-4bdd26：开库阶段计时（SERPENT_OPEN_STAGE_LOG=1），用于大库打开
    // 的归因。生产默认关闭。
    const openStageLog = process.env.SERPENT_OPEN_STAGE_LOG === '1';
    let stageMark = openStageLog ? performance.now() : 0;
    const markStage = (label: string): void => {
      if (!openStageLog) return;
      const now = performance.now();
      console.error(JSON.stringify({
        scope: 'open.stage',
        stage: label,
        durationMs: Math.round((now - stageMark) * 100) / 100,
      }));
      stageMark = now;
    };
    let selectedPath: string;
    try {
      selectedPath = normalizeAbsolutePath(selectedLibraryPath);
    } catch (error) {
      throw serviceError(error, 'INVALID_LIBRARY_PATH');
    }

    if (!existsSync(selectedPath)) throw new LibraryServiceError('LIBRARY_NOT_FOUND');
    if (!directoryExists(selectedPath)) throw new LibraryServiceError('NOT_A_LIBRARY');

    let canonicalPath: string;
    try {
      canonicalPath = realpathSync(selectedPath);
    } catch (error) {
      throw serviceError(error, 'LIBRARY_NOT_FOUND');
    }
    markStage('path-resolution');
    const alreadyOpenId = this.openIdByPath.get(canonicalPath);
    if (alreadyOpenId) {
      const existing = this.openById.get(alreadyOpenId);
      if (existing && this.sqlitePrimaryIsOpen(existing)) return existing.summary;
      if (existing) this.evictDeadOpenLibrary(alreadyOpenId, existing);
    }

    for (const directoryName of REQUIRED_DIRECTORIES) {
      if (!realDirectoryExists(path.join(canonicalPath, directoryName))) {
        throw new LibraryServiceError('NOT_A_LIBRARY');
      }
    }
    const serpentPath = path.join(canonicalPath, '.serpent');
    if (!realDirectoryExists(serpentPath) || !realFileExists(databasePath(canonicalPath))) {
      throw new LibraryServiceError('NOT_A_LIBRARY');
    }
    const storageKind = this.options.storageKindOverrideForTests
      ?? classifyLibraryStorage(canonicalPath);
    const networkStorage = storageKind === 'network';
    markStage('storage-classification');

    // Identity check before a second writable SQLite connection. Opening and
    // migrating a catalog that this Worker already holds is undefined on
    // rollback-journal NAS volumes and is how a live primary can be closed
    // while openById still points at the wrapper.
    if (this.openById.size > 0) {
      const probedCatalogId = this.probeCatalogIdentity(canonicalPath);
      if (probedCatalogId) {
        const existing = this.openById.get(probedCatalogId);
        if (existing && this.sqlitePrimaryIsOpen(existing)) {
          if (existing.summary.libraryPath === canonicalPath) return existing.summary;
          if (options?.replaceExisting !== true) {
            throw new LibraryServiceError('LIBRARY_ALREADY_OPEN');
          }
          this.closeLibrary(existing.summary.libraryId);
        } else if (existing) {
          this.evictDeadOpenLibrary(probedCatalogId, existing);
        }
      }
    }

    let connection: DatabaseConnection | undefined;
    let migrationAttempted = false;
    try {
      // Too-new schemas and stuck migrations stay writable. Schema bumps must
      // never lock a user out; a failed migration must not turn the library
      // into a read-only trap. Physical damage is repaired by the open ladder
      // (backup, then Assets rescue) instead of a read-only connection.
      const probedVersion = schemaVersionProbe(databasePath(canonicalPath));
      const migrationFailure = probedVersion === null
        ? null
        : readMigrationFailure(canonicalPath);
      // The stuck latch only holds while the failure was recorded by this
      // build's supported schema version. After an upgrade the migration is
      // retried, so a newer build can recover a library the old build could
      // not migrate (0031 §2.2 失败可恢复).
      const migrationStuck = probedVersion !== null &&
        migrationFailure !== null &&
        migrationFailure.fromVersion === probedVersion &&
        migrationFailure.attempts >= MAX_MIGRATION_ATTEMPTS &&
        (migrationFailure.supportedSchemaVersion ?? SUPPORTED_SCHEMA_VERSION) ===
          SUPPORTED_SCHEMA_VERSION;
      if (probedVersion !== null &&
        (probedVersion > SUPPORTED_SCHEMA_VERSION || migrationStuck)) {
        if (migrationStuck) {
          this.diagnose('library.migration-stuck', new Error(migrationFailure.error), {
            libraryPath: canonicalPath,
            fromVersion: migrationFailure.fromVersion,
            attempts: migrationFailure.attempts,
          });
        }
        connection = openConfiguredDatabase(
          databasePath(canonicalPath),
          this.options.sqliteBusyTimeoutMsForTests,
          {
            storageKind,
            ...(this.options.onDbStatement === undefined ? {} : { trace: this.options.onDbStatement }),
          },
        );
        const library = verifyOpenableSchema(connection);
        return this.adoptWritableOpenLibrary({
          connection,
          library,
          canonicalPath,
          serpentPath,
          networkStorage,
          libraryVersion: probedVersion,
          supportedSchemaVersion: SUPPORTED_SCHEMA_VERSION,
          migrationStuck,
          // A stuck library is still on an older schema; skip current-schema
          // watchers/jobs. A newer schema already contains today's tables.
          startServices: !migrationStuck,
          replaceExisting: options?.replaceExisting,
        });
      }
      connection = openConfiguredDatabase(
        databasePath(canonicalPath),
        this.options.sqliteBusyTimeoutMsForTests,
        {
          storageKind,
          ...(this.options.onDbStatement === undefined ? {} : { trace: this.options.onDbStatement }),
        },
      );
      migrationAttempted = true;
      migrateDatabase(connection, false, this.options);
      markStage('migrate');
      // A successful migration clears the failure record so the retry
      // counter never leaks into later sessions.
      clearMigrationFailure(canonicalPath);
      markStage('clear-failure');
      backfillTrashedFromTombstoneIds(connection);
      markStage('tombstone-backfill');
      // Serpent-4bdd26: the full quick_check moved to the background
      // reconciliation — it scans every B-tree and dominated this path.
      const library = verifyDatabase(connection, { skipQuickCheck: true });
      markStage('verify');
      const summary = this.adoptWritableOpenLibrary({
        connection,
        library,
        canonicalPath,
        serpentPath,
        networkStorage,
        storageKind,
        startServices: true,
        replaceExisting: options?.replaceExisting,
      });
      markStage('adopt-services');
      return summary;
    } catch (error) {
      // A rolled-back migration failure is recorded so the next open retries
      // (up to MAX_MIGRATION_ATTEMPTS) and then opens writable at the last
      // good version instead of failing forever. verifyMigrationHistory
      // failures stay LIBRARY_CORRUPT and are never recorded (damaged
      // history is not retryable; the recovery ladder repairs it).
      if (
        migrationAttempted &&
        !(error instanceof LibraryServiceError &&
          (error.code === 'LIBRARY_CORRUPT'
            || error.code === 'LINKED_FOLDER_UNAVAILABLE'
            || error.code === 'LIBRARY_ALREADY_OPEN'))
      ) {
        try {
          recordMigrationFailure(
            canonicalPath,
            schemaVersion(connection!),
            // The migration target is always the current build's supported
            // schema (0031 §2.2 records fromVersion/toVersion).
            SUPPORTED_SCHEMA_VERSION,
            error instanceof LibraryServiceError ? error.code : 'LIBRARY_MIGRATION_FAILED',
            undefined,
            SUPPORTED_SCHEMA_VERSION,
          );
        } catch {
          // The primary failure remains more useful than a record failure.
        }
      }
      const registeredId = this.findLibraryIdOwningSqliteConnection(connection);
      if (registeredId) {
        const registered = this.openById.get(registeredId);
        try {
          this.closeLibrary(registeredId);
        } catch {
          if (registered) this.evictDeadOpenLibrary(registeredId, registered);
        }
      } else {
        closeIgnoringFailure(connection);
      }
      throw serviceError(error, 'LIBRARY_CORRUPT');
    }
  }

  /**
   * Opens a current-schema library without migrations, recovery, filesystem
   * reconciliation, watchers, or background job scheduling. Inspection and
   * CLI clients may use this; Desktop never presents a read-only library.
   */
  override openLibraryReadOnly(selectedLibraryPath: string): InternalLibrarySummary {
    let selectedPath: string;
    try {
      selectedPath = normalizeAbsolutePath(selectedLibraryPath);
    } catch (error) {
      throw serviceError(error, 'INVALID_LIBRARY_PATH');
    }

    if (!existsSync(selectedPath)) throw new LibraryServiceError('LIBRARY_NOT_FOUND');
    if (!directoryExists(selectedPath)) throw new LibraryServiceError('NOT_A_LIBRARY');

    let canonicalPath: string;
    try {
      canonicalPath = realpathSync(selectedPath);
    } catch (error) {
      throw serviceError(error, 'LIBRARY_NOT_FOUND');
    }
    const alreadyOpenId = this.openIdByPath.get(canonicalPath);
    if (alreadyOpenId) return this.openById.get(alreadyOpenId)!.summary;

    for (const directoryName of REQUIRED_DIRECTORIES) {
      if (!realDirectoryExists(path.join(canonicalPath, directoryName))) {
        throw new LibraryServiceError('NOT_A_LIBRARY');
      }
    }
    const serpentPath = path.join(canonicalPath, '.serpent');
    const filename = databasePath(canonicalPath);
    if (!realDirectoryExists(serpentPath) || !realFileExists(filename)) {
      throw new LibraryServiceError('NOT_A_LIBRARY');
    }
    const networkStorage = (
      this.options.storageKindOverrideForTests
      ?? classifyLibraryStorage(canonicalPath)
    ) === 'network';

    let connection: DatabaseConnection | undefined;
    try {
      connection = new Database(filename, { readonly: true, fileMustExist: true });
      connection.pragma('foreign_keys = ON');
      connection.pragma('trusted_schema = ON');
      connection.pragma('query_only = ON');
      const library = verifyDatabase(connection);
      const existingSummary = this.reuseOrRejectDuplicateCatalog({
        libraryId: library.library_id,
        canonicalPath,
        connection,
      });
      if (existingSummary) return existingSummary;

      const summary: InternalLibrarySummary = {
        libraryId: library.library_id,
        displayName: library.display_name,
        libraryPath: canonicalPath,
        ...(networkStorage ? { networkStorage: true } : {}),
      };
      this.openById.set(summary.libraryId, {
        connection,
        writeConnection: connection,
        summary,
        readOnly: true,
        changeSubscription: { lastSequence: 0, stop() {} },
        preservedRelinkPathIdentities: new Set(),
        gitignoreText: '',
        gitignoreMatcher: parseGitignore(''),
        gitignoreMaterialized: false,
      });
      this.openIdByPath.set(canonicalPath, summary.libraryId);
      return summary;
    } catch (error) {
      closeIgnoringFailure(connection);
      if (error instanceof LibraryServiceError) throw error;
      throw error;
    }
  }

  override renameLibrary(input: { libraryId: string; displayName: string }): InternalLibrarySummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const displayName = input.displayName.trim().normalize('NFC');
    if (!displayName || displayName.length > 255 || displayName.includes('/') || displayName.includes('\\')) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }
    openLibrary.connection.prepare('UPDATE library SET display_name = ? WHERE library_id = ?')
      .run(displayName, input.libraryId);
    openLibrary.summary = { ...openLibrary.summary, displayName };
    return { ...openLibrary.summary };
  }

  public override async resolvePublicDownloadTarget(url: URL): Promise<ResolvedAddress> {
    const hostname = url.hostname.replace(/^\[|\]$/g, '');
    let addresses: Array<{ address: string; family: number }>;
    if (isIP(hostname) !== 0) {
      addresses = [{ address: hostname, family: isIP(hostname) }];
    } else {
      const resolver = this.options.dnsLookup ?? (async (name: string) =>
        dnsLookup(name, { all: true, verbatim: true }));
      try {
        addresses = await resolver(hostname);
      } catch (error) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR', cause: error });
      }
    }
    if (addresses.length === 0 || addresses.some(({ address, family }) =>
      prohibitedIpAddress(address) || isIP(address) !== family)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'PERMISSION_DENIED' });
    }
    return addresses[0]!;
  }

  override async saveAssetFromUrl(input: {
    libraryId: string;
    targetFolderId?: string;
    sourcePageUrl?: string;
    mediaUrl: string;
    mediaType?: string;
  }): Promise<{ asset: AssetSummary }> {
    // Validate HTTP scheme on mediaUrl (already Zod-validated but defense in depth).
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(input.mediaUrl);
    } catch {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR' });
    }
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR' });
    }
    if (parsedUrl.username || parsedUrl.password) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'PERMISSION_DENIED' });
    }

    const downloadDirectory = path.join(
      tmpdir(),
      `serpent-extension-download-${randomUUID()}`,
    );
    const downloadedFilePath = path.join(downloadDirectory, 'download');
    let downloadTimer: ReturnType<typeof setTimeout> | undefined;
    let response: Awaited<ReturnType<PinnedHttpTransport>> | undefined;
    let importDelegated = false;
    try {
      mkdirSync(downloadDirectory, { recursive: true });

      // Download the media URL. The deadline covers DNS, redirects, headers,
      // and the complete response body rather than only the initial fetch.
      const controller = new AbortController();
      downloadTimer = setTimeout(() => controller.abort(new Error('Download timed out.')), DOWNLOAD_TIMEOUT_MS);

      let finalUrl = parsedUrl;
      try {
        for (let redirectCount = 0; ; redirectCount += 1) {
          const resolvedAddress = await this.resolvePublicDownloadTarget(finalUrl);
          response = await (this.options.pinnedHttpTransport ?? defaultPinnedHttpTransport)({
            address: resolvedAddress.address,
            family: resolvedAddress.family,
            url: finalUrl,
            signal: controller.signal,
            headers: { 'User-Agent': 'Serpent/1.0' },
          });
          if (![301, 302, 303, 307, 308].includes(response.status)) break;
          response.cancel();
          if (redirectCount >= MAX_DOWNLOAD_REDIRECTS) {
            throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR' });
          }
          const location = response.headers.get('location');
          if (!location) {
            throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR' });
          }
          finalUrl = new URL(location, finalUrl);
          if ((finalUrl.protocol !== 'http:' && finalUrl.protocol !== 'https:') ||
              finalUrl.username || finalUrl.password) {
            throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'PERMISSION_DENIED' });
          }
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR' });
        }
        if (error instanceof LibraryServiceError) throw error;
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR', cause: error });
      }

      if (!response) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR' });
      }

      // Validate HTTP status.
      if (response.status < 200 || response.status >= 300) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'IO_ERROR',
          cause: new Error(`HTTP ${response.status}`),
        });
      }

      // Validate Content-Type.
      const contentType = normalizeRemoteContentType(response.headers.get('content-type'));
      const contentTypeFailure = remoteMediaValidationFailure(contentType);
      if (contentTypeFailure) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: contentTypeFailure,
          cause: new Error(contentTypeFailure === 'MIME_TYPE_MISSING'
            ? 'The response did not declare Content-Type.'
            : `Unsupported Content-Type: ${contentType}`),
        });
      }

      const declaredLengthText = response.headers.get('content-length');
      if (declaredLengthText !== null) {
        const declaredLength = Number(declaredLengthText);
        if (!Number.isSafeInteger(declaredLength) || declaredLength < 0 || declaredLength > MAX_DOWNLOAD_BYTES) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
            reason: 'UNSUPPORTED_FILE_ENTRY',
            cause: new Error('Invalid or oversized Content-Length.'),
          });
        }
      }

      // Determine filename.
      let filename: string;
      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition) {
        const cdFilename = parseContentDispositionFilename(contentDisposition);
        if (cdFilename) {
          filename = cleanFilename(cdFilename);
        } else {
          filename = filenameFromUrl(finalUrl.href, contentType);
        }
      } else {
        filename = filenameFromUrl(finalUrl.href, contentType);
      }

      // Ensure filename has a reasonable extension that matches content-type.
      const fileExt = path.posix.extname(filename).toLowerCase();
      if (fileExt === '' || fileExt === '.') {
        const ctExt = extensionForContentType(contentType);
        if (ctExt) filename = `${filename}${ctExt}`;
      } else if (!filenameMatchesRemoteContentType(filename, contentType)) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'MIME_EXTENSION_MISMATCH',
          cause: new Error(`Filename extension ${fileExt} does not match ${contentType}.`),
        });
      }

      // Stream directly to the stage file with a running size limit.
      const stageFilePath = downloadedFilePath;
      if (!response.body) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR' });
      }
      const writer = createWriteStream(stageFilePath, { flags: 'wx' });
      let writerFailure: Error | undefined;
      writer.on('error', (error) => { writerFailure = error; });
      const waitForWriter = (event: 'drain' | 'finish'): Promise<void> =>
        new Promise((resolve, reject) => {
          const onReady = () => { cleanup(); resolve(); };
          const onError = (error: Error) => { cleanup(); reject(error); };
          const cleanup = () => {
            writer.removeListener(event, onReady);
            writer.removeListener('error', onError);
          };
          writer.once(event, onReady);
          writer.once('error', onError);
        });
      let totalBytes = 0;
      const magicProbe = new RemoteMediaMagicProbe();
      let magicValidated = false;
      try {
        for await (const value of response.body) {
          if (writerFailure) throw writerFailure;
          totalBytes += value.byteLength;
          if (totalBytes > MAX_DOWNLOAD_BYTES) {
            response.cancel();
            throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
              reason: 'UNSUPPORTED_FILE_ENTRY',
              cause: new Error('File exceeds 500 MB limit.'),
            });
          }
          magicProbe.add(value);
          if (!magicValidated && magicProbe.canValidate(contentType)) {
            if (!magicProbe.matches(contentType)) {
              response.cancel();
              throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
                reason: 'MAGIC_BYTES_MISMATCH',
                cause: new Error(`File signature does not match ${contentType}.`),
              });
            }
            magicValidated = true;
          }
          if (!writer.write(Buffer.from(value))) {
            await waitForWriter('drain');
          }
        }
        if (!magicValidated && !magicProbe.matches(contentType)) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
            reason: 'MAGIC_BYTES_MISMATCH',
            cause: new Error(`File signature does not match ${contentType}.`),
          });
        }
        writer.end();
        if (writerFailure) throw writerFailure;
        await waitForWriter('finish');
        if (writerFailure) throw writerFailure;
      } finally {
        try { response.cancel(); } catch { /* Already released. */ }
        if (!writer.closed) writer.destroy();
        if (downloadTimer) clearTimeout(downloadTimer);
        downloadTimer = undefined;
      }
      // The network-specific trust boundary ends here. The downloaded bytes
      // now enter the exact same extension/import kernel as browser uploads and
      // ordinary file imports, including staging, conflict planning, journaling,
      // metadata, leases, rollback and recovery.
      importDelegated = true;
      return await this.saveAssetFromFile({
        libraryId: input.libraryId,
        ...(input.targetFolderId === undefined ? {} : { targetFolderId: input.targetFolderId }),
        ...(input.sourcePageUrl === undefined ? {} : { sourcePageUrl: input.sourcePageUrl }),
        mediaUrl: input.mediaUrl,
        stagedFilePath: stageFilePath,
        contentType,
        filename,
      });
    } catch (error) {
      if (downloadTimer) clearTimeout(downloadTimer);
      try { response?.cancel(); } catch { /* Best effort socket cleanup. */ }
      if (!importDelegated) {
        this.diagnose('extension-save.failed', sanitizedUrlDiagnosticError(error), {
          libraryId: input.libraryId,
          targetHost: parsedUrl.hostname,
          ...(input.sourcePageUrl
            ? { sourcePageUrl: sanitizedUrlForDiagnostic(input.sourcePageUrl) }
            : {}),
          mediaUrl: sanitizedUrlForDiagnostic(input.mediaUrl),
        });
      }
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    } finally {
      rmSync(downloadDirectory, { recursive: true, force: true });
    }
  }

  /**
   * Import media already fetched by the browser extension (Serpent-1jyi).
   * Main stages the bytes under a temp directory; Worker copies into the
   * library operation stage and reuses the URL-import commit path.
   */
  override async saveAssetFromFile(input: {
    libraryId: string;
    targetFolderId?: string;
    sourcePageUrl?: string;
    mediaUrl?: string;
    stagedFilePath: string;
    contentType: string;
    filename: string;
  }): Promise<{ asset: AssetSummary }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    let stagedAbsolute: string;
    try {
      stagedAbsolute = realpathSync(input.stagedFilePath);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR', cause: error });
    }
    let stagedStat: Stats;
    try {
      stagedStat = lstatSync(stagedAbsolute);
    } catch (error) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'IO_ERROR', cause: error });
    }
    if (!stagedStat.isFile() || stagedStat.isSymbolicLink()) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'UNSUPPORTED_FILE_ENTRY' });
    }
    if (stagedStat.size <= 0 || stagedStat.size > MAX_DOWNLOAD_BYTES) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'UNSUPPORTED_FILE_ENTRY',
        cause: new Error('Invalid or oversized staged file.'),
      });
    }

    const contentType = normalizeRemoteContentType(input.contentType);
    const contentTypeFailure = remoteMediaValidationFailure(contentType);
    if (contentTypeFailure) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: contentTypeFailure,
        cause: new Error(
          contentTypeFailure === 'MIME_TYPE_MISSING'
            ? 'The upload did not declare Content-Type.'
            : `Unsupported Content-Type: ${contentType}`,
        ),
      });
    }

    let filename = cleanFilename(input.filename);
    const fileExt = path.posix.extname(filename).toLowerCase();
    if (fileExt === '' || fileExt === '.') {
      const ctExt = extensionForContentType(contentType);
      if (ctExt) filename = `${filename}${ctExt}`;
    } else if (!filenameMatchesRemoteContentType(filename, contentType)) {
      const ctExt = extensionForContentType(contentType);
      if (!ctExt) {
        throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
          reason: 'MIME_EXTENSION_MISMATCH',
          cause: new Error(`Filename extension ${fileExt} does not match ${contentType}.`),
        });
      }
      // Browser uploads often carry CDN URL extensions that disagree with the
      // declared Content-Type; magic-byte validation below is authoritative.
      filename = `${path.posix.basename(filename, fileExt)}${ctExt}`;
    }

    const magicProbe = new RemoteMediaMagicProbe();
    const probeFd = openSync(stagedAbsolute, 'r');
    try {
      const probeBuf = Buffer.alloc(32);
      const bytesRead = readSync(probeFd, probeBuf, 0, 32, 0);
      magicProbe.add(probeBuf.subarray(0, bytesRead));
    } finally {
      closeSync(probeFd);
    }
    if (!magicProbe.matches(contentType)) {
      throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
        reason: 'MAGIC_BYTES_MISMATCH',
        cause: new Error(`File signature does not match ${contentType}.`),
      });
    }

    // The browser upload has already passed the extension-specific trust
    // boundary above. From this point on, give it the same source shape as a
    // normal file import so destination naming, duplicate decisions, the
    // operation journal, leases, rollback and metadata all share one kernel.
    // Remote filenames are the only input that can exceed the filesystem
    // component limit (local sources are already bounded by the filesystem
    // itself); assert before copying so both platforms surface the same
    // PATH_LIMIT_EXCEEDED instead of an OS error misread as a missing source.
    assertNameWithinFsLimit(filename);
    const sourceDirectory = path.join(tmpdir(), `serpent-extension-import-${randomUUID()}`);
    const sourcePath = path.join(sourceDirectory, filename);
    try {
      mkdirSync(sourceDirectory, { recursive: true });
      copyFileSync(stagedAbsolute, sourcePath);

      const prepared = this.prepareOrExecuteImport({
        libraryId: input.libraryId,
        ...(input.targetFolderId === undefined ? {} : { targetFolderId: input.targetFolderId }),
        sourceKind: 'files',
        sourcePaths: [sourcePath],
        ...(input.sourcePageUrl === undefined ? {} : { sourcePageUrl: input.sourcePageUrl }),
      });
      const completion = this.finishImportWithoutUserDecision(prepared, {
        suspectedDuplicate: 'skip',
        nameConflict: 'keep-both',
      });
      const asset = completion.assets[0];
      if (asset !== undefined) return { asset };

      // A library-level duplicate is intentionally skipped by the extension,
      // matching the ordinary import default. Return the retained asset just
      // as the old extension path did, without creating a second record.
      const existingAssetId = this.findActiveManagedAssetIdByContent(
        openLibrary,
        stagedStat.size,
        sha256FileAtPath(sourcePath),
        new Map(),
      );
      if (existingAssetId !== null) {
        const existing = this.listAssets({
          libraryId: input.libraryId,
          recursive: true,
        }).find((candidate) => candidate.assetId === existingAssetId);
        if (existing !== undefined) return { asset: existing };
      }
      throw new LibraryServiceError('IMPORT_APPLY_FAILED');
    } catch (error) {
      this.diagnose('extension-save-file.failed', sanitizedUrlDiagnosticError(error), {
        libraryId: input.libraryId,
        ...(input.sourcePageUrl
          ? { sourcePageUrl: sanitizedUrlForDiagnostic(input.sourcePageUrl) }
          : {}),
        ...(input.mediaUrl ? { mediaUrl: sanitizedUrlForDiagnostic(input.mediaUrl) } : {}),
        contentType,
      });
      throw serviceError(error, 'INVALID_IMPORT_SOURCE');
    } finally {
      rmSync(sourceDirectory, { recursive: true, force: true });
    }
  }

}
