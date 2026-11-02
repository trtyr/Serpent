/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import { LibraryServiceError, realFileExists } from '../library-service-internals';
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
import { LibraryServiceHistory } from './LibraryServiceHistory';

/** LibraryServiceAutomationFiles: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceAutomationFiles extends LibraryServiceHistory {

  /**
   * Side-effect-free preflight for an Automation Gateway file-operation plan.
   * The result contains only opaque state tokens; source paths and filenames
   * remain inside the Worker. The execution command later validates both the
   * durable change sequence and every token before touching the filesystem.
   */
  override previewAutomationFileOperation(input: {
    libraryId: string;
    operation: 'trash' | 'replace-content' | 'move' | 'rename-file' | 'rename-files' | 'restore-if-original-vacant';
    assetIds: string[];
    newBaseName?: string;
    newFileName?: string;
    renameItems?: Array<{ assetId: string; newBaseName: string }>;
    targetFolderId?: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
  }): {
    libraryId: string;
    operation: 'trash' | 'replace-content' | 'move' | 'rename-file' | 'rename-files' | 'restore-if-original-vacant';
    planHash: string;
    changeSequence: number;
    targetCount: number;
    executableCount: number;
    blockedCount: number;
    conflictCount: number;
    undoSupported: boolean;
    assetStates: Array<{ assetId: string; stateToken: string }>;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.assetIds.length === 0 || new Set(input.assetIds).size !== input.assetIds.length) {
      throw new LibraryServiceError('INVALID_SELECTION');
    }
    if (input.operation === 'move') {
      // Validate target folder exists when moving into a non-root folder.
      if (input.targetFolderId) {
        const folder = openLibrary.connection.prepare(
          'SELECT folder_id FROM managed_folders WHERE folder_id = ?',
        ).get(input.targetFolderId);
        if (!folder) throw new LibraryServiceError('INVALID_SELECTION');
      }
    }
    const rows = sqliteAllInChunks<string, {
      asset_id: string;
      current_revision_id: string;
      relative_file_path: string;
      deleted_at: string | null;
      availability: 'available' | 'missing';
      location_kind: 'managed' | 'linked';
      linked_folder_id: string | null;
    }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id, current_revision_id, relative_file_path, deleted_at,
                availability, location_kind, linked_folder_id
           FROM assets
          WHERE asset_id IN (${placeholders})`,
    });
    const rowById = new Map(rows.map((row) => [row.asset_id, row]));
    const assetStates: Array<{ assetId: string; stateToken: string }> = [];
    const resolutionFacts: Array<{
      assetId: string;
      outcome: 'execute' | 'blocked' | 'no-op';
      destination?: string;
      conflict?: boolean;
    }> = [];
    let executableCount = 0;
    let conflictCount = 0;
    const plannedDestinations = new Set<string>();
    const selectedIds = new Set(input.assetIds);
    const moveStrategy = input.conflictStrategy ?? 'keep-both';
    const renameItems = new Map(
      (input.renameItems ?? []).map((item) => [item.assetId, item.newBaseName]),
    );
    for (const assetId of input.assetIds) {
      const row = rowById.get(assetId);
      if (!row) {
        assetStates.push({
          assetId,
          stateToken: createHash('sha256').update(`missing:${assetId}`, 'utf8').digest('hex'),
        });
        resolutionFacts.push({ assetId, outcome: 'blocked' });
        continue;
      }
      assetStates.push({
        assetId,
        stateToken: this.automationAssetStateToken(row),
      });
      let outcome: 'execute' | 'blocked' | 'no-op' = 'blocked';
      let destination: string | undefined;
      let hasConflict = false;
      if (input.operation === 'trash') {
        if (row.location_kind === 'managed' && row.deleted_at === null) outcome = 'execute';
      } else if (input.operation === 'replace-content') {
        if (
          row.deleted_at === null
          && row.availability === 'available'
        ) {
          if (row.location_kind === 'linked') {
            const linkedFolder = openLibrary.connection
              .prepare('SELECT absolute_root_path, status FROM linked_folders WHERE folder_id = ?')
              .get(row.linked_folder_id) as {
                absolute_root_path: string;
                status: 'available' | 'offline';
              } | undefined;
            if (
              linkedFolder
              && linkedFolder.status === 'available'
              && !this.linkedRootIsGone(linkedFolder.absolute_root_path)
            ) {
              outcome = 'execute';
            }
          } else if (row.location_kind === 'managed') {
            outcome = 'execute';
          }
        }
      } else if (input.operation === 'restore-if-original-vacant') {
        if (row.location_kind === 'managed' && row.deleted_at !== null) outcome = 'execute';
      } else if (input.operation === 'move') {
        const movable = row.location_kind === 'managed'
          && row.deleted_at === null
          && row.availability === 'available';
        if (movable) {
          if (!realFileExists(this.folderPath(openLibrary, row.relative_file_path))) {
            resolutionFacts.push({ assetId, outcome: 'blocked' });
            continue;
          }
          const targetPrefix = input.targetFolderId
            ? (openLibrary.connection.prepare('SELECT relative_path FROM managed_folders WHERE folder_id = ?')
              .get(input.targetFolderId) as { relative_path: string } | undefined)?.relative_path ?? ''
            : '';
          const filename = path.posix.basename(row.relative_file_path);
          destination = targetPrefix ? path.posix.join(targetPrefix, filename) : filename;
          let identity = portablePathIdentity(destination);
          if (identity === portablePathIdentity(row.relative_file_path)) {
            plannedDestinations.add(identity);
            outcome = 'no-op';
          } else {
            const conflict = this.managedMoveConflict(
              openLibrary,
              'automation-plan',
              String(resolutionFacts.length),
              destination,
              assetId,
            );
            const selectedConflict = conflict?.assetId ? selectedIds.has(conflict.assetId) : false;
            const batchConflict = plannedDestinations.has(identity) || selectedConflict;
            if (conflict || batchConflict) {
              hasConflict = true;
              conflictCount += 1;
              if (moveStrategy === 'skip') {
                outcome = 'blocked';
              } else if (moveStrategy === 'keep-both' || batchConflict) {
                destination = this.availableMoveDestination(openLibrary, destination, plannedDestinations);
                identity = portablePathIdentity(destination);
                plannedDestinations.add(identity);
                outcome = 'execute';
              } else {
                plannedDestinations.add(identity);
                outcome = 'execute';
              }
            } else {
              plannedDestinations.add(identity);
              outcome = 'execute';
            }
          }
        }
      } else if (input.operation === 'rename-file' || input.operation === 'rename-files') {
        const requestedBaseName = input.operation === 'rename-file'
          ? input.newBaseName
          : renameItems.get(assetId);
        const requestedFileName = input.operation === 'rename-file'
          ? input.newFileName
          : undefined;
        if (
          row.deleted_at === null
          && row.availability === 'available'
          && (requestedBaseName !== undefined || requestedFileName !== undefined)
        ) {
          try {
            const currentFileName = path.posix.basename(row.relative_file_path);
            const extension = path.posix.extname(currentFileName);
            const newFileName = requestedFileName !== undefined
              ? normalizeAssetFileBaseName(requestedFileName)
              : `${normalizeAssetFileBaseName(requestedBaseName!)}${extension}`;
            const currentDirectory = path.posix.dirname(row.relative_file_path);
            destination = currentDirectory === '.'
              ? newFileName
              : path.posix.join(currentDirectory, newFileName);
            if (Buffer.byteLength(newFileName, 'utf8') > 255) throw new Error('filename too long');
            if (newFileName === currentFileName) {
              outcome = 'no-op';
            } else {
              const newIdentity = portablePathIdentity(destination);
              const dbConflict = row.location_kind === 'managed'
                ? openLibrary.connection.prepare(
                  `SELECT asset_id FROM assets
                    WHERE path_identity = ? AND location_kind = 'managed'
                      AND deleted_at IS NULL AND asset_id != ?`,
                ).get(newIdentity, row.asset_id)
                : openLibrary.connection.prepare(
                  `SELECT asset_id FROM assets
                    WHERE linked_folder_id = ? AND path_identity = ?
                      AND location_kind = 'linked' AND deleted_at IS NULL AND asset_id != ?`,
                ).get(row.linked_folder_id, newIdentity, row.asset_id);
              const sourcePath = row.location_kind === 'managed'
                ? this.folderPath(openLibrary, row.relative_file_path)
                : this.linkedAssetPath(openLibrary, row.linked_folder_id, row.relative_file_path);
              if (!realFileExists(sourcePath)) throw new Error('source missing');
              let diskConflict = false;
              try {
                const entries = readdirSync(path.dirname(sourcePath), { withFileTypes: true });
                const targetSegmentIdentity = portablePathSegmentIdentity(newFileName);
                diskConflict = entries.some((entry) => (
                  entry.name !== currentFileName
                  && portablePathSegmentIdentity(entry.name) === targetSegmentIdentity
                ));
              } catch {
                diskConflict = true;
              }
              hasConflict = Boolean(dbConflict) || diskConflict;
              if (hasConflict) {
                conflictCount += 1;
              } else {
                outcome = 'execute';
              }
            }
          } catch {
            outcome = 'blocked';
          }
        }
      }
      if (outcome === 'execute' || outcome === 'no-op') executableCount += 1;
      resolutionFacts.push({
        assetId,
        outcome,
        ...(destination === undefined ? {} : { destination }),
        ...(hasConflict ? { conflict: true } : {}),
      });
    }
    const changeSequence = this.getChangeSequence(input.libraryId);
    return {
      libraryId: input.libraryId,
      operation: input.operation,
      planHash: createAutomationFilePlanHash({
        operation: input.operation,
        assetIds: input.assetIds,
        ...(input.targetFolderId === undefined ? {} : { targetFolderId: input.targetFolderId }),
        ...(input.newBaseName === undefined ? {} : { newBaseName: input.newBaseName }),
        ...(input.renameItems === undefined ? {} : { renameItems: input.renameItems }),
        ...(input.conflictStrategy === undefined ? {} : { conflictStrategy: input.conflictStrategy }),
        expectedChangeSequence: changeSequence,
        assetStates,
        resolutionFacts,
      }),
      changeSequence,
      targetCount: input.assetIds.length,
      executableCount,
      blockedCount: resolutionFacts.filter((fact) => fact.outcome === 'blocked').length,
      conflictCount,
      undoSupported: input.operation === 'trash' || input.operation === 'move',
      assetStates,
    };
  }

  override validateAutomationFileOperationPlan(input: {
    libraryId: string;
    operation: 'trash' | 'replace-content' | 'move' | 'rename-file' | 'rename-files' | 'restore-if-original-vacant';
    assetIds: string[];
    newBaseName?: string;
    newFileName?: string;
    renameItems?: Array<{ assetId: string; newBaseName: string }>;
    targetFolderId?: string | null;
    conflictStrategy?: 'keep-both' | 'replace' | 'skip';
    expectedChangeSequence: number;
    planHash: string;
    assetStates: Array<{ assetId: string; stateToken: string }>;
  }): void {
    const assetStateIds = input.assetStates.map((state) => state.assetId);
    if (input.assetIds.length === 0
      || input.assetIds.some((assetId) => assetId.length === 0)
      || new Set(input.assetIds).size !== input.assetIds.length
      || input.assetStates.length !== input.assetIds.length
      || new Set(assetStateIds).size !== assetStateIds.length
      || assetStateIds.some((assetId) => !input.assetIds.includes(assetId))) {
      throw new LibraryServiceError('AUTOMATION_FILE_PLAN_INVALID');
    }
    const plan = this.previewAutomationFileOperation({
      libraryId: input.libraryId,
      operation: input.operation,
      assetIds: input.assetIds,
      ...(input.newBaseName === undefined ? {} : { newBaseName: input.newBaseName }),
      ...(input.newFileName === undefined ? {} : { newFileName: input.newFileName }),
      ...(input.renameItems === undefined ? {} : { renameItems: input.renameItems }),
      ...(input.targetFolderId === undefined ? {} : { targetFolderId: input.targetFolderId }),
      ...(input.conflictStrategy === undefined ? {} : { conflictStrategy: input.conflictStrategy }),
    });
    if (plan.changeSequence !== input.expectedChangeSequence
      || plan.planHash !== input.planHash
      || plan.assetStates.some((state, index) => (
        state.assetId !== input.assetStates[index]?.assetId
        || state.stateToken !== input.assetStates[index]?.stateToken
      ))) {
      throw new LibraryServiceError('VERSION_CONFLICT', {
        currentEntityVersion: plan.changeSequence,
      });
    }
  }

  public override automationAssetStateToken(row: {
    asset_id: string;
    current_revision_id: string;
    relative_file_path: string;
    deleted_at: string | null;
    availability: 'available' | 'missing';
    location_kind: 'managed' | 'linked';
  }): string {
    return createHash('sha256').update(JSON.stringify([
      row.asset_id,
      row.current_revision_id,
      row.relative_file_path,
      row.deleted_at,
      row.availability,
      row.location_kind,
    ]), 'utf8').digest('hex');
  }
}
