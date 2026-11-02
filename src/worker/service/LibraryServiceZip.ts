/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import { LibraryService } from '../library-service';
import type { ActiveImportTransfer, DatabaseConnection, ImportSourceEntry, OpenLibrary, TransferCancelState} from '../library-service-internals';
import { LibraryServiceError, REQUIRED_DIRECTORIES, assertTreeContainsNoSymlinks, cleanFilename, closeIgnoringFailure, copyDirRecursiveCancellable, createProgressThrottle, databasePath, directoryExists, existingIgnoreConfigPath, hasErrorCode, measureCopyTree, openConfiguredDatabase, realDirectoryExists, realFileExists, sha256AndContentFingerprintFileAtPath, transferCheckpoint, waitForStreamClose } from '../library-service-internals';
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
import { LibraryServiceExportImport } from './LibraryServiceExportImport';

/** LibraryServiceZip: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceZip extends LibraryServiceExportImport {

  // ── Library Export / Import ────────────────────────────────────────

  public override nextImportProgressSequence(
    importId: string,
    phase: ImportProgressEvent['phase'],
  ): number {
    const sequence = (this.importProgressSequences.get(importId) ?? 0) + 1;
    if (phase === 'complete' || phase === 'cancelled' || phase === 'failed') {
      this.importProgressSequences.delete(importId);
    } else {
      this.importProgressSequences.set(importId, sequence);
    }
    return sequence;
  }

  public override emitProgress(event: ExportProgressEvent | ImportProgressEvent | DeleteProgressEvent): void {
    const stamped =
      event.type === 'import.progress'
        ? {
            ...event,
            sequence: this.nextImportProgressSequence(event.importId, event.phase),
          }
        : event;
    try {
      this.options.onProgress?.(stamped);
    } catch {
      // Progress is best effort and must never throw back into an operation.
    }
  }

  public override emitManagedImportProgress(
    importId: string,
    phase: ImportProgressEvent['phase'],
    filesProcessed: number,
    totalFiles: number,
    bytesProcessed: number,
    totalBytes: number,
  ): void {
    this.emitProgress({
      type: 'import.progress',
      importId,
      phase,
      cancelable: true,
      filesProcessed,
      totalFiles,
      bytesProcessed,
      totalBytes,
    });
  }

  public override emitLinkedFolderImportProgress(
    importId: string,
    phase: ImportProgressEvent['phase'],
    filesProcessed: number,
    totalFiles: number,
    bytesProcessed: number,
    totalBytes: number,
  ): void {
    this.emitProgress({
      type: 'import.progress',
      importId,
      phase,
      cancelable: false,
      copiesFiles: false,
      filesProcessed,
      totalFiles,
      bytesProcessed,
      totalBytes,
    });
  }

  public override emitDeleteProgress(event: Omit<DeleteProgressEvent, 'type'>): void {
    this.emitProgress({ type: 'delete.progress', ...event });
  }

  public override stageOneImportSourceEntry(input: {
    openLibrary: OpenLibrary;
    entry: ImportSourceEntry;
    stagedPath: string;
    skipContentHash: boolean;
  }): ImportSourceEntry {
    const byteSize = this.copySourceSnapshot(
      input.entry,
      input.stagedPath,
      input.skipContentHash ? { bulk: true } : undefined,
    );
    if (input.skipContentHash) {
      const staged: ImportSourceEntry = {
        ...input.entry,
        byteSize,
        sourcePath: input.stagedPath,
      };
      if (input.entry.eagleMetadata?.thumbnailPath) {
        try {
          const copied = this.copyEagleThumbnailFile(
            input.openLibrary,
            input.entry.destinationRelativePath,
            input.entry.eagleMetadata,
          );
          if (copied) staged.copiedThumbnail = copied;
        } catch (error) {
          this.diagnose('eagle-import.thumbnail-skipped', error, {
            reason: 'EAGLE_THUMBNAIL_FAILED',
          });
        }
      }
      return staged;
    }
    const hashes = sha256AndContentFingerprintFileAtPath(input.stagedPath);
    return {
      ...input.entry,
      byteSize,
      sha256: hashes.sha256,
      contentFingerprint: hashes.contentFingerprint,
      sourcePath: input.stagedPath,
    };
  }

  public override stageImportSourceEntries(input: {
    openLibrary: OpenLibrary;
    entries: ImportSourceEntry[];
    stagePath: string;
    skipContentHash: boolean;
    onStagedEntry?: (processedCount: number, bytesProcessed: number) => void;
    importId?: string;
    totalFiles: number;
    totalBytes: number;
    cancelState?: TransferCancelState;
    yieldCheckpoints?: boolean;
    skipRemainingSourceFailures?: boolean;
    stageNameOffset?: number;
    skipped?: SkippedImportSource[];
  }): ImportSourceEntry[] | Promise<ImportSourceEntry[]> {
    const stagedEntries: ImportSourceEntry[] = [];
    const skipped = input.skipped ?? [];
    const throttle = createProgressThrottle();
    let bytesProcessed = 0;
    const stageNameOffset = input.stageNameOffset ?? 0;
    const stageIndex = (index: number): void => {
      if (input.cancelState?.cancelled) {
        if (input.cancelState.mode === 'stop') return;
        if (input.importId) {
          this.emitManagedImportProgress(
            input.importId,
            'cancelled',
            index,
            input.totalFiles,
            bytesProcessed,
            input.totalBytes,
          );
        }
        throw new LibraryServiceError('CANCELLED');
      }
      const entry = input.entries[index]!;
      const stagedPath = path.join(
        input.stagePath,
        String(stageNameOffset + stagedEntries.length),
      );
      try {
        const staged = this.stageOneImportSourceEntry({
          openLibrary: input.openLibrary,
          entry,
          stagedPath,
          skipContentHash: input.skipContentHash,
        });
        stagedEntries.push(staged);
        bytesProcessed += staged.byteSize;
        input.onStagedEntry?.(index + 1, staged.byteSize);
      } catch (error) {
        if (!isSkippableImportSourceFailure(error)) throw error;
        const skippedEntry = skippedImportSourceFromError(error, entry.sourcePath);
        skipped.push(skippedEntry);
        if (!input.skipRemainingSourceFailures) {
          throw new ImportSourceFailurePause(
            [skippedEntry],
            stagedEntries,
            input.entries.slice(index + 1),
            skipped,
          );
        }
      }
      if (index === 0) this.failAt('crash-during-prepare-stage');
      if (
        input.importId
        && throttle.shouldEmit(index === input.entries.length - 1)
      ) {
        this.emitManagedImportProgress(
          input.importId,
          'copy',
          index + 1,
          input.totalFiles,
          bytesProcessed,
          input.totalBytes,
        );
      }
    };
    if (input.yieldCheckpoints) {
      return (async () => {
        if (input.importId) {
          this.emitManagedImportProgress(
            input.importId,
            'copy',
            0,
            input.totalFiles,
            0,
            input.totalBytes,
          );
        }
        for (let index = 0; index < input.entries.length; index += 1) {
          await transferCheckpoint();
          if (input.cancelState?.cancelled && input.cancelState.mode === 'stop') {
            break;
          }
          stageIndex(index);
        }
        if (
          input.cancelState?.cancelled
          && input.cancelState.mode === 'stop'
          && stagedEntries.length === 0
        ) {
          if (input.importId) {
            this.emitManagedImportProgress(
              input.importId,
              'cancelled',
              0,
              input.totalFiles,
              0,
              input.totalBytes,
            );
          }
          throw new LibraryServiceError('CANCELLED');
        }
        return stagedEntries;
      })();
    }
    for (let index = 0; index < input.entries.length; index += 1) {
      if (input.cancelState?.cancelled && input.cancelState.mode === 'stop') {
        break;
      }
      stageIndex(index);
    }
    if (
      input.cancelState?.cancelled
      && input.cancelState.mode === 'stop'
      && stagedEntries.length === 0
    ) {
      if (input.importId) {
        this.emitManagedImportProgress(
          input.importId,
          'cancelled',
          0,
          input.totalFiles,
          0,
          input.totalBytes,
        );
      }
      throw new LibraryServiceError('CANCELLED');
    }
    return stagedEntries;
  }

  public override transferPathKey(candidatePath: string): string {
    let existingAncestor = path.resolve(candidatePath);
    const missingSegments: string[] = [];
    while (true) {
      try {
        existingAncestor = path.join(realpathSync(existingAncestor), ...missingSegments.reverse());
        break;
      } catch {
        const parentPath = path.dirname(existingAncestor);
        if (parentPath === existingAncestor) {
          existingAncestor = path.resolve(candidatePath);
          break;
        }
        missingSegments.push(path.basename(existingAncestor));
        existingAncestor = parentPath;
      }
    }
    const normalized = path.normalize(existingAncestor).normalize('NFC');
    return process.platform === 'win32' ? normalized.toLowerCase() : normalized;
  }

  public override transferInProgress(
    scope: string,
    context: Record<string, unknown>,
  ): never {
    const error = new LibraryServiceError('TRANSFER_IN_PROGRESS', {
      reason: 'TRANSFER_IN_PROGRESS',
    });
    this.diagnose(scope, error, context);
    throw error;
  }

  public override acquireExportTransfer(
    libraryId: string,
    exportId: string,
    cancelState: TransferCancelState,
  ): void {
    const activeExportId = this.activeExportByLibraryId.get(libraryId);
    if (activeExportId) {
      this.transferInProgress('transfer.export.in-progress', {
        libraryId,
        activeExportId,
        requestedExportId: exportId,
      });
    }
    this.activeExportByLibraryId.set(libraryId, exportId);
    this.activeExports.set(exportId, cancelState);
  }

  public override releaseExportTransfer(libraryId: string, exportId: string): void {
    this.activeExports.delete(exportId);
    if (this.activeExportByLibraryId.get(libraryId) === exportId) {
      this.activeExportByLibraryId.delete(libraryId);
    }
  }

  public override acquireImportTransfer(
    importId: string,
    sourcePath: string,
    destinationPath: string,
    cancelState: TransferCancelState,
  ): ActiveImportTransfer {
    const sourceKey = this.transferPathKey(sourcePath);
    const destinationKey = this.transferPathKey(destinationPath);
    const activeSourceImportId = this.activeImportBySource.get(sourceKey);
    const activeDestinationImportId = this.activeImportByDestination.get(destinationKey);
    if (activeSourceImportId || activeDestinationImportId) {
      this.transferInProgress('transfer.import.in-progress', {
        requestedImportId: importId,
        activeImportId: activeSourceImportId ?? activeDestinationImportId,
        sourcePath,
        destinationPath,
        sourceConflict: Boolean(activeSourceImportId),
        destinationConflict: Boolean(activeDestinationImportId),
      });
    }
    this.activeImportBySource.set(sourceKey, importId);
    this.activeImportByDestination.set(destinationKey, importId);
    this.activeImports.set(importId, cancelState);
    return { importId, sourceKey, destinationKey };
  }

  public override releaseImportTransfer(transfer: ActiveImportTransfer): void {
    this.activeImports.delete(transfer.importId);
    if (this.activeImportBySource.get(transfer.sourceKey) === transfer.importId) {
      this.activeImportBySource.delete(transfer.sourceKey);
    }
    if (this.activeImportByDestination.get(transfer.destinationKey) === transfer.importId) {
      this.activeImportByDestination.delete(transfer.destinationKey);
    }
  }

  public override mapZipImportError(error: ZipImportStreamError): LibraryServiceError {
    switch (error.code) {
      case 'CANCELLED':
        return new LibraryServiceError('CANCELLED', { cause: error });
      case 'ZIP_TOO_LARGE':
        return new LibraryServiceError('ZIP_TOO_LARGE', {
          cause: error,
          reason: 'ZIP_TOO_LARGE',
        });
      case 'PATH_ESCAPE':
        return new LibraryServiceError('NOT_A_LIBRARY', {
          cause: error,
          reason: 'PATH_ESCAPE',
        });
      case 'SYMBOLIC_LINK_NOT_ALLOWED':
        return new LibraryServiceError('NOT_A_LIBRARY', {
          cause: error,
          reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
        });
      case 'DESTINATION_EXISTS':
      case 'INVALID_ZIP':
      case 'IO_ERROR':
        return new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
    }
  }

  public override removeOwnedTransferPath(
    scope: string,
    targetPath: string,
    recursive: boolean,
  ): void {
    try {
      rmSync(targetPath, { force: true, recursive });
    } catch (error) {
      this.diagnose(scope, error, { targetPath });
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', {
        reason: publicReasonFromError(error),
        cause: error,
      });
    }
  }

  override async exportLibraryToFolder(input: {
    libraryId: string;
    destinationPath: string;
    includeLinkedContent: boolean;
  }): Promise<{
    exportId: string;
    fileCount: number;
    totalBytes: number;
    excludedPreviewCount: number;
    includedLinkedContent: boolean;
    durationMs: number;
  }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const exportId = randomUUID();

    // The destination is owned by this operation only if it did not exist and
    // this call created it. Never merge into a user-owned directory.
    if (existsSync(input.destinationPath)) {
      throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS');
    }
    let canonicalDest: string;
    let canonicalLib: string;
    try {
      const canonicalParent = realpathSync(path.dirname(input.destinationPath));
      canonicalDest = path.join(canonicalParent, path.basename(input.destinationPath));
      canonicalLib = realpathSync(openLibrary.summary.libraryPath);
    } catch (error) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH', { cause: error });
    }
    if (pathIsWithin(canonicalLib, canonicalDest)) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }

    const cancelState: TransferCancelState = { cancelled: false };
    this.acquireExportTransfer(input.libraryId, exportId, cancelState);
    const startedAt = Date.now();
    let destinationOwned = false;

    try {
      mkdirSync(canonicalDest);
      destinationOwned = true;

      const libPath = openLibrary.summary.libraryPath;

      // Phase 1: snapshot-db
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'snapshot-db', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });
      await transferCheckpoint();
      if (cancelState.cancelled) throw new LibraryServiceError('CANCELLED');

      const tempDbPath = path.join(canonicalDest, `.serpent-export-${exportId}.db`);
      // Online Backup yields between page batches, allowing the live library to
      // continue serving reads and writes while SQLite maintains a consistent
      // snapshot for the exported database.
      await this.createConsistentDatabaseSnapshot(openLibrary.writeConnection, tempDbPath, cancelState);

      let semanticBackupPath: string | null = null;
      if (this.options.backupSemanticIndex) {
        semanticBackupPath = path.join(canonicalDest, '.serpent', 'semantic', 'index.sqlite');
        mkdirSync(path.dirname(semanticBackupPath), { recursive: true });
        const copied = await this.options.backupSemanticIndex({
          libraryId: input.libraryId,
          libraryPath: openLibrary.summary.libraryPath,
          storageKind: openLibrary.summary.storageKind ?? 'unknown',
          destinationPath: semanticBackupPath,
        });
        if (!copied) {
          rmSync(path.join(canonicalDest, '.serpent'), { recursive: true, force: true });
          semanticBackupPath = null;
        }
      }

      // Phase 2: enumerate
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'enumerate', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });

      interface ExportEntry {
        sourcePath: string;
        relativePath: string;
        byteSize: number;
      }
      const entries: ExportEntry[] = [];
      let excludedPreviewCount = 0;
      if (semanticBackupPath) {
        const semanticStat = statSync(semanticBackupPath);
        entries.push({ sourcePath: semanticBackupPath, relativePath: '.serpent/semantic/index.sqlite',
          byteSize: semanticStat.size });
      }

      const walkDir = async (dirPath: string, relPrefix: string): Promise<void> => {
        if (cancelState.cancelled) return;
        let children;
        try {
          children = readdirSync(dirPath, { withFileTypes: true });
        } catch (error) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
        }
        for (const child of children) {
          await transferCheckpoint();
          if (cancelState.cancelled) return;
          const childPath = path.join(dirPath, child.name);
          const childRel = relPrefix ? path.posix.join(relPrefix, child.name) : child.name;

          if (child.isSymbolicLink()) continue; // Never follow symlinks in export.

          if (child.isDirectory()) {
            // Exclude generated sidecar trees; the semantic DB is added from
            // a verified SQLite backup snapshot above, never copied live.
            if (childRel === '.serpent/previews' || childRel === '.serpent/operations'
              || childRel === '.serpent/semantic') {
              if (childRel === '.serpent/previews') {
                // Count preview files for excludedPreviewCount.
                try {
                  excludedPreviewCount = countFilesRecursive(childPath);
                } catch {
                  // Best effort count.
                }
              }
              continue;
            }
            await walkDir(childPath, childRel);
          } else if (child.isFile()) {
            // Exclude AI temp files.
            const lowerName = child.name.toLowerCase();
            if (
              lowerName.endsWith('.tmp') ||
              lowerName.includes('.wave-tmp.') ||
              lowerName.includes('-tmp.') ||
              (lowerName.startsWith('.') && (
                lowerName.includes('temp') || lowerName.includes('cache') ||
                lowerName.startsWith('.ds_store') || lowerName === 'thumbs.db'
              ))
            ) {
              continue;
            }
            // Exclude WAL/SHM files for the temp backup (just in case).
            if (childPath === `${tempDbPath}-wal` || childPath === `${tempDbPath}-shm`) continue;

            const stat = lstatSync(childPath);
            if (stat.isSymbolicLink()) continue;
            entries.push({
              sourcePath: childPath,
              relativePath: childRel,
              byteSize: stat.size,
            });
          }
        }
      };

      function countFilesRecursive(dirPath: string): number {
        let count = 0;
        try {
          for (const child of readdirSync(dirPath, { withFileTypes: true })) {
            if (child.isSymbolicLink()) continue;
            const childPath = path.join(dirPath, child.name);
            if (child.isDirectory()) {
              count += countFilesRecursive(childPath);
            } else if (child.isFile()) {
              count += 1;
            }
          }
        } catch {
          // Best effort.
        }
        return count;
      }

      // Walk Assets/.
      await walkDir(path.join(libPath, 'Assets'), 'Assets');

      // Keep the library-scoped ignore source of truth with folder exports.
      const gitignoreFile = existingIgnoreConfigPath(libPath);
      if (gitignoreFile) {
        const ignoreStat = statSync(gitignoreFile);
        entries.push({ sourcePath: gitignoreFile, relativePath: path.basename(gitignoreFile), byteSize: ignoreStat.size });
      }

      // Walk .serpent/revisions/.
      const revisionsDir = path.join(libPath, '.serpent', 'revisions');
      if (directoryExists(revisionsDir)) {
        await walkDir(revisionsDir, '.serpent/revisions');
      }

      // Walk .serpent/trash/.
      const trashDir = path.join(libPath, '.serpent', 'trash');
      if (directoryExists(trashDir)) {
        await walkDir(trashDir, '.serpent/trash');
      }

      // Serpent-pxd: include ready thumbnails/proxies so import does not show
      // broken images while DB still says status=ready. Legacy `.serpent/previews`
      // remains excluded (regenerable / unused by current protocol).
      const artifactsDir = path.join(libPath, '.serpent', 'artifacts');
      if (directoryExists(artifactsDir)) {
        await walkDir(artifactsDir, '.serpent/artifacts');
      }

      // Include .serpent/library.db (snapshot).
      const snapStat = statSync(tempDbPath);
      entries.push({
        sourcePath: tempDbPath,
        relativePath: '.serpent/library.db',
        byteSize: snapStat.size,
      });

      // Optionally include linked folder source content in the same manifest as
      // managed files so progress, cancellation, and summaries stay accurate.
      // A short stable id suffix prevents two equally named linked roots from
      // being merged in the exported backup.
      let includedLinkedContent = false;
      if (input.includeLinkedContent) {
        const linkedFolders = openLibrary.connection
          .prepare('SELECT folder_id, display_name, absolute_root_path, status FROM linked_folders WHERE library_id = ?')
          .all(openLibrary.summary.libraryId) as Array<{
            folder_id: string;
            display_name: string;
            absolute_root_path: string;
            status: 'available' | 'offline';
          }>;
        if (linkedFolders.length > 0) {
          includedLinkedContent = true;
          for (const lf of linkedFolders) {
            if (cancelState.cancelled) break;
            if (lf.status !== 'available' || !realDirectoryExists(lf.absolute_root_path)) {
              throw new LibraryServiceError('INVALID_IMPORT_SOURCE', {
                reason: 'SOURCE_NOT_FOUND',
              });
            }
            const exportName = `${cleanFilename(lf.display_name)}-${lf.folder_id.slice(0, 8)}`;
            await walkDir(lf.absolute_root_path, `_linked/${exportName}`);
          }
        }
      }

      const managedAssetMtimes = new Map<string, Date>(
        (openLibrary.connection
          .prepare(
            `SELECT a.relative_file_path, r.modified_at
               FROM assets a
               JOIN revisions r ON r.revision_id = a.current_revision_id
              WHERE a.location_kind = 'managed'
                AND a.deleted_at IS NULL`,
          )
          .all() as Array<{ relative_file_path: string; modified_at: string }>)
          .map((row) => [row.relative_file_path, new Date(row.modified_at)]),
      );
      const totalFiles = entries.length;
      let totalBytes = 0;
      for (const entry of entries) {
        totalBytes += entry.byteSize;
      }

      // Phase 3: copy
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'copy', filesProcessed: 0, totalFiles,
        bytesProcessed: 0, totalBytes,
      });

      let filesProcessed = 0;
      let bytesProcessed = 0;
      let lastEmitTime = Date.now();
      const BATCH_SIZE = 50;
      const THROTTLE_MS = 200;

      for (const entry of entries) {
        await transferCheckpoint();
        if (cancelState.cancelled) break;
        const destPath = path.join(canonicalDest, ...entry.relativePath.split('/'));
        mkdirSync(path.dirname(destPath), { recursive: true });
        copyFileSync(entry.sourcePath, destPath);
        // Preserve managed-asset timestamps so reopening an exported library
        // does not mistake the copy for an external revision and invalidate
        // the ready artifact rows from the consistent DB snapshot.
        const sourceStat = statSync(entry.sourcePath);
        const managedRelativePath = entry.relativePath.startsWith('Assets/')
          ? entry.relativePath.slice('Assets/'.length)
          : undefined;
        utimesSync(
          destPath,
          sourceStat.atime,
          (managedRelativePath === undefined
            ? undefined
            : managedAssetMtimes.get(managedRelativePath)) ?? sourceStat.mtime,
        );
        filesProcessed += 1;
        bytesProcessed += entry.byteSize;

        if (
          filesProcessed % BATCH_SIZE === 0 ||
          Date.now() - lastEmitTime >= THROTTLE_MS
        ) {
          this.emitProgress({
            type: 'export.progress', exportId,
            libraryId: input.libraryId,
            phase: 'copy', filesProcessed, totalFiles,
            bytesProcessed, totalBytes,
          });
          lastEmitTime = Date.now();
        }
      }

      // Remove the temp DB snapshot.
      rmSync(tempDbPath, { force: true });

      if (cancelState.cancelled) {
        this.emitProgress({
          type: 'export.progress', exportId,
          libraryId: input.libraryId,
          phase: 'cancelled', filesProcessed, totalFiles,
          bytesProcessed, totalBytes,
        });
        // Clean up the destination.
        this.removeOwnedTransferPath('export.cancel.cleanup-destination', canonicalDest, true);
        throw new LibraryServiceError('CANCELLED');
      }

      // Phase 4: complete
      const durationMs = Date.now() - startedAt;
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'complete', filesProcessed, totalFiles,
        bytesProcessed, totalBytes,
      });

      return {
        exportId,
        fileCount: totalFiles,
        totalBytes,
        excludedPreviewCount,
        includedLinkedContent,
        durationMs,
      };
    } catch (error) {
      if (cancelState.cancelled) {
        this.emitProgress({
          type: 'export.progress', exportId,
          libraryId: input.libraryId,
          phase: 'cancelled', filesProcessed: 0, totalFiles: 0,
          bytesProcessed: 0, totalBytes: 0,
        });
      }
      if (destinationOwned) {
        this.removeOwnedTransferPath('export.failure.cleanup-destination', canonicalDest, true);
      }
      throw error;
    } finally {
      this.releaseExportTransfer(input.libraryId, exportId);
    }
  }

  override cancelExport(exportId: string): void {
    const state = this.activeExports.get(exportId);
    if (!state) throw new LibraryServiceError('IMPORT_NOT_FOUND');
    state.cancelled = true;
    state.onCancel?.();
  }

  override async importLibraryFromFolder(input: {
    sourceFolderPath: string;
    copyToParentPath?: string;
  }): Promise<{
    importId: string;
    libraryId: string;
    displayName: string;
    libraryPath: string;
  }> {
    const importId = randomUUID();
    const cancelState: TransferCancelState = { cancelled: false };
    const importDestinationPath = input.copyToParentPath
      ? path.join(input.copyToParentPath, path.basename(input.sourceFolderPath))
      : input.sourceFolderPath;
    const importTransfer = this.acquireImportTransfer(
      importId,
      input.sourceFolderPath,
      importDestinationPath,
      cancelState,
    );
    let ownedDestinationPath: string | undefined;
    let completed = false;

    try {
      // Phase 1: validate source.
      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'validate', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });
      await transferCheckpoint();
      if (cancelState.cancelled) throw new LibraryServiceError('CANCELLED');

      // Validate sourceFolderPath is a readable directory (not a symlink).
      let sourceStat;
      try {
        sourceStat = lstatSync(input.sourceFolderPath);
      } catch (error) {
        throw new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
      }
      if (sourceStat.isSymbolicLink() || !sourceStat.isDirectory()) {
        throw new LibraryServiceError('NOT_A_LIBRARY');
      }

      // Validate Assets/ exists (real directory, not symlink).
      const assetsPath = path.join(input.sourceFolderPath, 'Assets');
      if (!realDirectoryExists(assetsPath)) {
        throw new LibraryServiceError('NOT_A_LIBRARY');
      }

      // Validate .serpent/library.db exists (real file, not symlink).
      const dbPath = path.join(input.sourceFolderPath, '.serpent', 'library.db');
      if (!realFileExists(dbPath)) {
        throw new LibraryServiceError('NOT_A_LIBRARY');
      }

      assertTreeContainsNoSymlinks(input.sourceFolderPath);

      let libraryPath: string;

      if (input.copyToParentPath) {
        // Phase 2: copy.
        const copyStats = measureCopyTree(input.sourceFolderPath);
        let copiedFiles = 0;
        let copiedBytes = 0;
        const copyProgressThrottle = createProgressThrottle();
        const emitCopyProgress = (force = false): void => {
          if (!copyProgressThrottle.shouldEmit(force)) return;
          this.emitProgress({
            type: 'import.progress', importId,
            phase: 'copy', cancelable: true,
            filesProcessed: copiedFiles, totalFiles: copyStats.fileCount,
            bytesProcessed: copiedBytes, totalBytes: copyStats.totalBytes,
          });
        };
        this.emitProgress({
          type: 'import.progress', importId,
          phase: 'copy', cancelable: true,
          filesProcessed: 0, totalFiles: copyStats.fileCount,
          bytesProcessed: 0, totalBytes: copyStats.totalBytes,
        });

        const baseName = path.basename(input.sourceFolderPath);
        libraryPath = path.join(input.copyToParentPath, baseName);

        if (existsSync(libraryPath)) {
          throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS');
        }
        try {
          mkdirSync(libraryPath);
          ownedDestinationPath = libraryPath;
        } catch (error) {
          if (hasErrorCode(error, 'EEXIST')) {
            throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS', { cause: error });
          }
          throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
        }

        if (cancelState.cancelled) {
          this.emitProgress({ type: 'import.progress', importId, phase: 'cancelled', filesProcessed: 0, totalFiles: 0, bytesProcessed: 0, totalBytes: 0 });
          throw new LibraryServiceError('CANCELLED');
        }

        try {
          await copyDirRecursiveCancellable(
            input.sourceFolderPath,
            libraryPath,
            cancelState,
            (byteSize: number) => {
              copiedFiles += 1;
              copiedBytes += byteSize;
              emitCopyProgress();
            },
          );
          emitCopyProgress(true);
        } catch (error) {
          // Clean up incomplete copy.
          this.removeOwnedTransferPath('import.copy.failure.cleanup', libraryPath, true);
          if (error instanceof LibraryServiceError && error.code === 'CANCELLED') {
            this.emitProgress({
              type: 'import.progress', importId, phase: 'cancelled', cancelable: false,
              filesProcessed: copiedFiles, totalFiles: copyStats.fileCount,
              bytesProcessed: copiedBytes, totalBytes: copyStats.totalBytes,
            });
          }
          throw error;
        }

        if (cancelState.cancelled) {
          this.removeOwnedTransferPath('import.copy.cancel.cleanup', libraryPath, true);
          this.emitProgress({
            type: 'import.progress', importId, phase: 'cancelled', cancelable: false,
            filesProcessed: copiedFiles, totalFiles: copyStats.fileCount,
            bytesProcessed: copiedBytes, totalBytes: copyStats.totalBytes,
          });
          throw new LibraryServiceError('CANCELLED');
        }

      } else {
        // Open in place.
        libraryPath = input.sourceFolderPath;
      }

      // A copied library is a transactional transfer, not an opportunity to
      // rescue a source that changed halfway through the copy. Reject an
      // incomplete destination before openLibrary's general Assets rescue
      // ladder can turn the partial copy into a successful new library.
      if (input.copyToParentPath && !realFileExists(databasePath(libraryPath))) {
        throw new LibraryServiceError('NOT_A_LIBRARY');
      }

      // Phase 3: open.
      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'open', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });

      const summary = this.openLibrary(libraryPath);

      // Phase 4: complete.
      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'complete', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });

      completed = true;
      return {
        importId,
        libraryId: summary.libraryId,
        displayName: summary.displayName,
        libraryPath: summary.libraryPath,
      };
    } catch (error) {
      if (cancelState.cancelled) {
        this.emitProgress({
          type: 'import.progress', importId,
          phase: 'cancelled', filesProcessed: 0, totalFiles: 0,
          bytesProcessed: 0, totalBytes: 0,
        });
      } else {
        this.emitProgress({
          type: 'import.progress', importId,
          phase: 'failed', filesProcessed: 0, totalFiles: 0,
          bytesProcessed: 0, totalBytes: 0,
        });
      }
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
    } finally {
      if (ownedDestinationPath && !completed) {
        this.removeOwnedTransferPath('import.failure.cleanup-destination', ownedDestinationPath, true);
      }
      this.releaseImportTransfer(importTransfer);
    }
  }

  override cancelImport(importId: string, mode: 'abandon' | 'stop' = 'abandon'): void {
    const state = this.activeImports.get(importId);
    if (state) {
      if (state.mode === 'abandon' && mode === 'stop') {
        state.onCancel?.();
        return;
      }
      state.mode = mode;
      state.cancelled = true;
      state.onCancel?.();
      return;
    }
    // After prepare returns a conflict/sequence decision, the import lives in
    // pendingImports. Overlay "取消导入" must abandon rather than throw
    // IMPORT_NOT_FOUND and leave the UI deadlocked (Serpent-224ac8).
    if (this.pendingImports.has(importId)) {
      this.abandonImport(importId);
      this.emitProgress({
        type: 'import.progress',
        importId,
        phase: 'cancelled',
        cancelable: false,
        filesProcessed: 0,
        totalFiles: 0,
        bytesProcessed: 0,
        totalBytes: 0,
      });
      return;
    }
    if (this.isFinalizedImport(importId)) {
      this.emitProgress({
        type: 'import.progress',
        importId,
        phase: 'complete',
        cancelable: false,
        filesProcessed: 0,
        totalFiles: 0,
        bytesProcessed: 0,
        totalBytes: 0,
      });
      return;
    }
    throw new LibraryServiceError('IMPORT_NOT_FOUND');
  }

  override cancelDiskDelete(operationId: string): void {
    const state = this.activeDiskDeletes.get(operationId);
    if (!state) throw new LibraryServiceError('IMPORT_NOT_FOUND');
    state.cancelled = true;
    state.onCancel?.();
  }

  // ── ZIP export ───────────────────────────────────────────────────────────

  /** Maximum total size for a standard (non-ZIP64) ZIP archive: 4 GiB = 4,294,967,296 bytes. */
  public static readonly ZIP_MAX_BYTES = 4 * 1024 * 1024 * 1024;
  /** Maximum entry count for a standard (non-ZIP64) ZIP archive: 65535. */
  public static readonly ZIP_MAX_ENTRIES = 65534;

  override async exportLibraryToZip(input: {
    libraryId: string;
    destinationPath: string;
    includeLinkedContent: boolean;
  }): Promise<{
    exportId: string;
    fileCount: number;
    totalBytes: number;
    excludedPreviewCount: number;
    includedLinkedContent: boolean;
    durationMs: number;
  }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const exportId = randomUUID();

    // Ensure the destination file does not exist yet (prevent accidental overwrite).
    if (existsSync(input.destinationPath)) {
      throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS');
    }

    // Reject destination inside the library.
    const libPath = openLibrary.summary.libraryPath;
    let canonicalLib: string;
    try {
      canonicalLib = realpathSync(libPath);
    } catch {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const destDir = path.dirname(input.destinationPath);
    let canonicalDestDir: string;
    try {
      canonicalDestDir = realpathSync(destDir);
    } catch {
      canonicalDestDir = destDir;
    }
    if (pathIsWithin(canonicalLib, canonicalDestDir)) {
      throw new LibraryServiceError('INVALID_LIBRARY_PATH');
    }

    const cancelState: TransferCancelState = { cancelled: false };
    this.acquireExportTransfer(input.libraryId, exportId, cancelState);
    const startedAt = Date.now();

    const tempDir = path.join(path.dirname(input.destinationPath), `.serpent-zip-export-${exportId}`);
    let tempDbPath: string | undefined;
    let tempDirOwned = false;
    let destinationOwned = false;
    let output: ReturnType<typeof createWriteStream> | undefined;
    let archive: {
      pipe(output: ReturnType<typeof createWriteStream>): void;
      file(path: string, options: { name: string }): void;
      finalize(): void;
      abort(): void;
      on(event: string, listener: (err: Error) => void): void;
    } | undefined;

    function countFilesRecursive(dirPath: string): number {
      let count = 0;
      try {
        for (const child of readdirSync(dirPath, { withFileTypes: true })) {
          if (child.isSymbolicLink()) continue;
          const childPath = path.join(dirPath, child.name);
          if (child.isDirectory()) {
            count += countFilesRecursive(childPath);
          } else if (child.isFile()) {
            count += 1;
          }
        }
      } catch {
        // Best effort.
      }
      return count;
    }

    try {
      mkdirSync(tempDir);
      tempDirOwned = true;

      // Phase 1: snapshot-db
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'snapshot-db', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });
      await transferCheckpoint();
      if (cancelState.cancelled) throw new LibraryServiceError('CANCELLED');

      tempDbPath = path.join(tempDir, `library-${exportId}.db`);
      await this.createConsistentDatabaseSnapshot(openLibrary.writeConnection, tempDbPath, cancelState);

      let semanticBackupPath: string | null = null;
      if (this.options.backupSemanticIndex) {
        semanticBackupPath = path.join(tempDir, '.serpent', 'semantic', 'index.sqlite');
        mkdirSync(path.dirname(semanticBackupPath), { recursive: true });
        const copied = await this.options.backupSemanticIndex({
          libraryId: input.libraryId,
          libraryPath: openLibrary.summary.libraryPath,
          storageKind: openLibrary.summary.storageKind ?? 'unknown',
          destinationPath: semanticBackupPath,
        });
        if (!copied) {
          rmSync(path.join(tempDir, '.serpent'), { recursive: true, force: true });
          semanticBackupPath = null;
        }
      }

      // Phase 2: enumerate
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'enumerate', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });

      interface ZipEntry {
        sourcePath: string;
        relativePath: string;
        byteSize: number;
      }
      const entries: ZipEntry[] = [];
      let excludedPreviewCount = 0;
      if (semanticBackupPath) {
        const semanticStat = statSync(semanticBackupPath);
        entries.push({ sourcePath: semanticBackupPath, relativePath: '.serpent/semantic/index.sqlite',
          byteSize: semanticStat.size });
      }

      const walkDir = async (dirPath: string, relPrefix: string): Promise<void> => {
        if (cancelState.cancelled) return;
        let children;
        try {
          children = readdirSync(dirPath, { withFileTypes: true });
        } catch (error) {
          throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause: error });
        }
        for (const child of children) {
          await transferCheckpoint();
          if (cancelState.cancelled) return;
          const childPath = path.join(dirPath, child.name);
          const childRel = relPrefix ? path.posix.join(relPrefix, child.name) : child.name;

          if (child.isSymbolicLink()) continue;

          if (child.isDirectory()) {
            if (childRel === '.serpent/previews' || childRel === '.serpent/operations'
              || childRel === '.serpent/semantic') {
              if (childRel === '.serpent/previews') {
                try {
                  excludedPreviewCount += countFilesRecursive(childPath);
                } catch {
                  // Best effort.
                }
              }
              continue;
            }
            await walkDir(childPath, childRel);
          } else if (child.isFile()) {
            const lowerName = child.name.toLowerCase();
            if (
              lowerName.endsWith('.tmp') ||
              lowerName.includes('.wave-tmp.') ||
              lowerName.includes('-tmp.') ||
              (lowerName.startsWith('.') && (
                lowerName.includes('temp') || lowerName.includes('cache') ||
                lowerName.startsWith('.ds_store') || lowerName === 'thumbs.db'
              ))
            ) {
              continue;
            }
            const stat = lstatSync(childPath);
            if (stat.isSymbolicLink()) continue;
            entries.push({
              sourcePath: childPath,
              relativePath: childRel,
              byteSize: stat.size,
            });
          }
        }
      };

      // Walk Assets/.
      await walkDir(path.join(libPath, 'Assets'), 'Assets');

      const gitignoreFile = existingIgnoreConfigPath(libPath);
      if (gitignoreFile) {
        const ignoreStat = statSync(gitignoreFile);
        entries.push({ sourcePath: gitignoreFile, relativePath: path.basename(gitignoreFile), byteSize: ignoreStat.size });
      }

      // Walk .serpent/revisions/.
      const revisionsDir = path.join(libPath, '.serpent', 'revisions');
      if (directoryExists(revisionsDir)) {
        await walkDir(revisionsDir, '.serpent/revisions');
      }

      // Walk .serpent/trash/.
      const trashDir = path.join(libPath, '.serpent', 'trash');
      if (directoryExists(trashDir)) {
        await walkDir(trashDir, '.serpent/trash');
      }

      // Serpent-pxd: same artifacts contract as folder export.
      const artifactsDir = path.join(libPath, '.serpent', 'artifacts');
      if (directoryExists(artifactsDir)) {
        await walkDir(artifactsDir, '.serpent/artifacts');
      }

      // Add .serpent/library.db (snapshot).
      const snapStat = statSync(tempDbPath);
      entries.push({
        sourcePath: tempDbPath,
        relativePath: '.serpent/library.db',
        byteSize: snapStat.size,
      });

      // ZIP exports follow the same linked-content contract as folder exports.
      // Linked sources remain supplemental backup material under _linked/; the
      // database retains its original roots so unavailable roots reopen offline.
      let includedLinkedContent = false;
      if (input.includeLinkedContent) {
        const linkedFolders = openLibrary.connection
          .prepare('SELECT folder_id, display_name, absolute_root_path, status FROM linked_folders WHERE library_id = ?')
          .all(openLibrary.summary.libraryId) as Array<{
            folder_id: string;
            display_name: string;
            absolute_root_path: string;
            status: 'available' | 'offline';
          }>;
        if (linkedFolders.length > 0) {
          includedLinkedContent = true;
          for (const linkedFolder of linkedFolders) {
            if (cancelState.cancelled) break;
            if (linkedFolder.status !== 'available' || !realDirectoryExists(linkedFolder.absolute_root_path)) {
              throw new LibraryServiceError('INVALID_IMPORT_SOURCE', { reason: 'SOURCE_NOT_FOUND' });
            }
            const exportName = `${cleanFilename(linkedFolder.display_name)}-${linkedFolder.folder_id.slice(0, 8)}`;
            await walkDir(linkedFolder.absolute_root_path, `_linked/${exportName}`);
          }
        }
      }

      const totalFiles = entries.length;
      let totalBytes = 0;
      for (const entry of entries) {
        totalBytes += entry.byteSize;
      }

      // ZIP pre-check: reject if total size > 4 GiB or entry count > 65534.
      if (totalBytes > LibraryService.ZIP_MAX_BYTES || totalFiles > LibraryService.ZIP_MAX_ENTRIES) {
        throw new LibraryServiceError('ZIP_TOO_LARGE', { reason: 'ZIP_TOO_LARGE' });
      }

      // Phase 3: compress
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'compress', filesProcessed: 0, totalFiles,
        bytesProcessed: 0, totalBytes,
      });

      // Dynamically import archiver (CJS module).
      // archiver v8 exports named classes; ZipArchive is the ZIP-specific one.
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const archiverModule = require('archiver') as {
        ZipArchive: new (options?: Record<string, unknown>) => NonNullable<typeof archive>;
      };

      const destZipPath = input.destinationPath;
      // Ensure parent directory exists.
      mkdirSync(path.dirname(destZipPath), { recursive: true });

      // Reserve the final path atomically. From this point onward cleanup may
      // remove it because this operation demonstrably owns it.
      try {
        const destinationHandle = openSync(destZipPath, 'wx');
        closeSync(destinationHandle);
        destinationOwned = true;
      } catch (error) {
        if (hasErrorCode(error, 'EEXIST')) {
          throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS', { cause: error });
        }
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
      }

      output = createWriteStream(destZipPath);
      archive = new archiverModule.ZipArchive({ zlib: { level: 6 }, forceZip64: false });

      let archiverError: Error | undefined;
      archive.on('error', (err: Error) => {
        archiverError = err;
      });
      archive.on('warning', (err: Error) => {
        // Missing or unreadable source entries make the export incomplete and
        // therefore must fail rather than producing a silently truncated ZIP.
        archiverError = err;
      });

      // Pipe archive data to the destination file.
      archive.pipe(output);

      let filesProcessed = 0;
      let bytesProcessed = 0;
      let lastEmitTime = Date.now();
      const BATCH_SIZE = 50;
      const THROTTLE_MS = 200;

      for (const entry of entries) {
        await transferCheckpoint();
        if (cancelState.cancelled) break;
        if (archiverError) throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: archiverError });

        archive.file(entry.sourcePath, { name: entry.relativePath });

        filesProcessed += 1;
        bytesProcessed += entry.byteSize;

        if (
          filesProcessed % BATCH_SIZE === 0 ||
          Date.now() - lastEmitTime >= THROTTLE_MS
        ) {
          this.emitProgress({
            type: 'export.progress', exportId,
            libraryId: input.libraryId,
            phase: 'compress', filesProcessed, totalFiles,
            bytesProcessed, totalBytes,
          });
          lastEmitTime = Date.now();
        }
      }

      if (cancelState.cancelled) {
        // Destroy streams, then wait for the destination handle to close
        // before deleting the file: the release is asynchronous, and on
        // Windows an immediate rm hits EPERM and masks CANCELLED with
        // LIBRARY_NOT_WRITABLE (POSIX unlinks open files, hiding this).
        const outputClosed = waitForStreamClose(output);
        archive.abort();
        output.destroy();
        await outputClosed;
        // Remove the temp db and temp dir.
        this.removeOwnedTransferPath('export.zip.cancel.cleanup-temp', tempDir, true);
        tempDirOwned = false;
        // Remove the destination file.
        this.removeOwnedTransferPath('export.zip.cancel.cleanup-destination', destZipPath, false);
        destinationOwned = false;
        this.emitProgress({
          type: 'export.progress', exportId,
          libraryId: input.libraryId,
          phase: 'cancelled', filesProcessed, totalFiles,
          bytesProcessed, totalBytes,
        });
        throw new LibraryServiceError('CANCELLED');
      }

      // Finalize the archive (wait for the output stream to finish).
      const finalArchive = archive;
      const finalOutput = output;
      await new Promise<void>((resolve, reject) => {
        let settled = false;
        const settle = (operation: () => void): void => {
          if (settled) return;
          settled = true;
          cancelState.onCancel = undefined;
          operation();
        };
        cancelState.onCancel = () => {
          finalArchive.abort();
          finalOutput.destroy();
        };
        finalOutput.on('close', () => {
          if (cancelState.cancelled) settle(() => reject(new LibraryServiceError('CANCELLED')));
        });
        finalOutput.on('finish', () => {
          if (archiverError) {
            settle(() => reject(new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: archiverError })));
            return;
          }
          settle(resolve);
        });
        finalOutput.on('error', (err: Error) => {
          if (cancelState.cancelled) {
            settle(() => reject(new LibraryServiceError('CANCELLED', { cause: err })));
            return;
          }
          settle(() => reject(new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: err })));
        });
        void finalArchive.finalize();
      });

      // Clean up temp dir.
      this.removeOwnedTransferPath('export.zip.complete.cleanup-temp', tempDir, true);
      tempDirOwned = false;

      // Final progress.
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'compress', filesProcessed, totalFiles,
        bytesProcessed, totalBytes,
      });

      // Phase 4: complete
      const durationMs = Date.now() - startedAt;
      this.emitProgress({
        type: 'export.progress', exportId,
        libraryId: input.libraryId,
        phase: 'complete', filesProcessed, totalFiles,
        bytesProcessed, totalBytes,
      });

      return {
        exportId,
        fileCount: totalFiles,
        totalBytes,
        excludedPreviewCount,
        includedLinkedContent,
        durationMs,
      };
    } catch (error) {
      if (cancelState.cancelled) {
        this.emitProgress({
          type: 'export.progress', exportId,
          libraryId: input.libraryId,
          phase: 'cancelled', filesProcessed: 0, totalFiles: 0,
          bytesProcessed: 0, totalBytes: 0,
        });
      }
      // The compress loop can fail while archiver still holds the destination
      // and the snapshot. Windows will not remove those paths, or their parent,
      // until the handles close.
      if (output) {
        const outputClosed = waitForStreamClose(output);
        try { archive?.abort(); } catch { /* the export is already failing */ }
        output.destroy();
        await outputClosed;
      }
      if (destinationOwned) {
        this.removeOwnedTransferPath('export.zip.failure.cleanup-destination', input.destinationPath, false);
      }
      if (tempDirOwned) {
        this.removeOwnedTransferPath('export.zip.failure.cleanup-temp', tempDir, true);
      }
      throw error;
    } finally {
      this.releaseExportTransfer(input.libraryId, exportId);
    }
  }

  // ── ZIP import ───────────────────────────────────────────────────────────

  override async importLibraryFromZip(input: {
    sourceZipPath: string;
    destinationParentPath: string;
  }): Promise<{
    importId: string;
    libraryId: string;
    displayName: string;
    libraryPath: string;
  }> {
    const importId = randomUUID();
    const cancelState: TransferCancelState = { cancelled: false };
    const baseName = path.basename(input.sourceZipPath, path.extname(input.sourceZipPath));
    const extractPath = path.join(input.destinationParentPath, baseName);
    const importTransfer = this.acquireImportTransfer(
      importId,
      input.sourceZipPath,
      extractPath,
      cancelState,
    );
    let ownedExtractPath: string | undefined;
    let completed = false;
    let totalEntries = 0;
    let totalUncompressedBytes = 0;
    let extractedBytes = 0;
    let manifestValidationError: LibraryServiceError | undefined;

    try {
      if (existsSync(extractPath)) {
        throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS');
      }
      // Phase 1: validate
      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'validate', filesProcessed: 0, totalFiles: 0,
        bytesProcessed: 0, totalBytes: 0,
      });
      await transferCheckpoint();
      if (cancelState.cancelled) throw new LibraryServiceError('CANCELLED');

      // Phase 2: extract
      try {
        mkdirSync(extractPath);
        ownedExtractPath = extractPath;
      } catch (error) {
        if (hasErrorCode(error, 'EEXIST')) {
          throw new LibraryServiceError('LIBRARY_ALREADY_EXISTS', { cause: error });
        }
        throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
      }

      if (cancelState.cancelled) {
        this.emitProgress({ type: 'import.progress', importId, phase: 'cancelled', filesProcessed: 0, totalFiles: 0, bytesProcessed: 0, totalBytes: 0 });
        throw new LibraryServiceError('CANCELLED');
      }

      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'extract', filesProcessed: 0, totalFiles: totalEntries,
        bytesProcessed: 0, totalBytes: 0,
      });

      const abortController = new AbortController();
      cancelState.onCancel = () => abortController.abort();
      try {
        await extractZipStream({
          sourceZipPath: input.sourceZipPath,
          destinationRoot: extractPath,
          signal: abortController.signal,
          limits: zipBombProtectionLimits(),
          validateManifest: (manifest: ZipArchiveManifest) => {
            const hasAssetFiles = manifest.entries.some(
              (entry) => !entry.isDirectory && entry.name.startsWith('Assets/'),
            );
            const hasDatabase = manifest.entries.some(
              (entry) => !entry.isDirectory && entry.name === '.serpent/library.db',
            );
            if (!hasAssetFiles || !hasDatabase) {
              manifestValidationError = new LibraryServiceError('NOT_A_LIBRARY', {
                reason: 'NOT_A_LIBRARY',
              });
              throw new ZipImportStreamError('INVALID_ZIP');
            }
          },
          onProgress: (progress) => {
            totalEntries = progress.totalEntries;
            totalUncompressedBytes = progress.totalBytes;
            extractedBytes = progress.bytesProcessed;
            this.emitProgress({
              type: 'import.progress', importId,
              phase: 'extract', filesProcessed: progress.entriesProcessed,
              totalFiles: progress.totalEntries,
              bytesProcessed: progress.bytesProcessed,
              totalBytes: progress.totalBytes,
            });
          },
        });
      } finally {
        cancelState.onCancel = undefined;
      }

      if (cancelState.cancelled) {
        this.removeOwnedTransferPath('import.zip.cancel.cleanup-destination', extractPath, true);
        this.emitProgress({ type: 'import.progress', importId, phase: 'cancelled', filesProcessed: 0, totalFiles: totalEntries, bytesProcessed: 0, totalBytes: 0 });
        throw new LibraryServiceError('CANCELLED');
      }

      // Phase 3: verify
      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'verify', filesProcessed: 0, totalFiles: totalEntries,
        bytesProcessed: 0, totalBytes: 0,
      });

      // Validate the extracted folder is a valid library.
      // Canonicalize the extract path so symlink checks compare against
      // the real path (important on macOS where /var -> /private/var).
      let canonicalExtractPath: string;
      try {
        canonicalExtractPath = realpathSync(extractPath);
      } catch {
        canonicalExtractPath = extractPath;
      }
      assertTreeContainsNoSymlinks(canonicalExtractPath);
      this.validateImportSource(canonicalExtractPath);

      // ZIP timestamps have no timezone; use the revision timestamps stored in
      // the database instead of trusting the archive metadata. This keeps a
      // macOS export's ready thumbnails valid after a Windows import.
      this.restoreManagedAssetTimestamps(canonicalExtractPath);

      // Phase 4: open
      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'open', filesProcessed: 0, totalFiles: totalEntries,
        bytesProcessed: 0, totalBytes: 0,
      });

      const summary = this.openLibrary(canonicalExtractPath);

      // Phase 5: complete
      this.emitProgress({
        type: 'import.progress', importId,
        phase: 'complete', filesProcessed: totalEntries, totalFiles: totalEntries,
        bytesProcessed: extractedBytes, totalBytes: totalUncompressedBytes,
      });

      completed = true;
      return {
        importId,
        libraryId: summary.libraryId,
        displayName: summary.displayName,
        libraryPath: summary.libraryPath,
      };
    } catch (error) {
      if (cancelState.cancelled) {
        this.emitProgress({
          type: 'import.progress', importId,
          phase: 'cancelled', filesProcessed: 0, totalFiles: 0,
          bytesProcessed: 0, totalBytes: 0,
        });
      }
      if (ownedExtractPath && !completed) {
        this.removeOwnedTransferPath('import.zip.failure.cleanup-destination', ownedExtractPath, true);
      }
      if (error instanceof LibraryServiceError) throw error;
      if (manifestValidationError) throw manifestValidationError;
      if (error instanceof ZipImportStreamError) throw this.mapZipImportError(error);
      throw new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
    } finally {
      cancelState.onCancel = undefined;
      this.releaseImportTransfer(importTransfer);
    }
  }

  override validateImportSource(sourceFolderPath: string): {
    libraryId: string;
    displayName: string;
  } {
    // Validate sourceFolderPath is a readable directory (not a symlink).
    let sourceStat;
    try {
      sourceStat = lstatSync(sourceFolderPath);
    } catch (error) {
      throw new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
    }
    if (sourceStat.isSymbolicLink() || !sourceStat.isDirectory()) {
      throw new LibraryServiceError('NOT_A_LIBRARY');
    }

    // Validate Assets/ exists (real directory, not symlink).
    const assetsPath = path.join(sourceFolderPath, 'Assets');
    if (!realDirectoryExists(assetsPath)) {
      throw new LibraryServiceError('NOT_A_LIBRARY');
    }

    // Validate .serpent/library.db exists (real file, not symlink).
    const dbPath = path.join(sourceFolderPath, '.serpent', 'library.db');
    if (!realFileExists(dbPath)) {
      throw new LibraryServiceError('NOT_A_LIBRARY');
    }

    assertTreeContainsNoSymlinks(sourceFolderPath);

    // Open a read-only connection to read the library identity.
    let connection: DatabaseConnection | undefined;
    try {
      connection = openConfiguredDatabase(dbPath);
      const library = connection
        .prepare('SELECT library_id, display_name FROM library ORDER BY library_id LIMIT 2')
        .all() as Array<{ library_id: string; display_name: string }>;
      if (library.length !== 1 || !library[0]?.library_id || !library[0]?.display_name) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      return {
        libraryId: library[0].library_id,
        displayName: library[0].display_name,
      };
    } finally {
      closeIgnoringFailure(connection);
    }
  }

  /**
   * Ids of the libraries this Worker currently has open.
   *
   * `library.open` needs these to stop the outgoing library's automatic work
   * before opening its replacement: a switch arrives as `library.open` with no
   * preceding `library.close` (library.open-recent.request dispatches open
   * directly), so without this the outgoing library's media churn kept the single
   * Worker busy and the open command starved behind it.
   */
  override listOpenLibraryIds(): string[] {
    return [...this.openById.keys()];
  }

  /**
   * Worker shutdown/close path: finish the first close-time snapshot before
   * releasing SQLite. The synchronous close method remains for legacy unit
   * seams and does not wait on asynchronous backup I/O.
   */
  override async closeLibraryAsync(libraryId: string): Promise<void> {
    const openLibrary = this.openById.get(libraryId);
    if (!openLibrary) throw new LibraryServiceError('LIBRARY_NOT_OPEN');
    const closeStartedAt = performance.now();
    const markPhase = (phase: string, from: number): void => {
      // Closing on a network library blocked a library switch behind the loading
      // overlay for minutes with no log output at all. A close that cannot
      // explain itself is undebuggable, so keep the phase timings behind an
      // explicit switch instead of logging on every close.
      if (process.env.SERPENT_CLOSE_TRACE !== '1') return;
      process.stderr.write(
        `[library.close.phase] ${JSON.stringify({
          libraryId,
          networkStorage: openLibrary.summary.networkStorage === true,
          phase,
          ms: Math.round(performance.now() - from),
          totalMs: Math.round(performance.now() - closeStartedAt),
        })}\n`,
      );
    };
    this.cancelDeferredOpenMaintenance(libraryId);
    const reconciliation = this.reconciliationOwner.current(libraryId);
    this.cancelOpenBackgroundReconciliation(libraryId);
    if (reconciliation) {
      const reconciliationStartedAt = performance.now();
      await reconciliation.promise;
      markPhase('reconciliation', reconciliationStartedAt);
    }
    // Abort and settle every media job before the backup and final SQLite
    // close. The job finally block releases its database lease and may still
    // publish durable state after the decoder has been stopped.
    const drainStartedAt = performance.now();
    await this.drainLibraryMedia(libraryId);
    markPhase('drainMedia', drainStartedAt);
    if (!openLibrary.readOnly) {
      const backupStartedAt = performance.now();
      await this.createDatabaseBackupForOpenLibrary(openLibrary, 'close');
      markPhase('backup', backupStartedAt);
    }
    const closeStartedAtInner = performance.now();
    this.closeLibrary(libraryId);
    markPhase('releaseHandle', closeStartedAtInner);
    markPhase('total', closeStartedAt);
  }

  override closeLibrary(libraryId: string): void {
    const openLibrary = this.openById.get(libraryId);
    if (!openLibrary) throw new LibraryServiceError('LIBRARY_NOT_OPEN');
    this.cancelDeferredOpenMaintenance(libraryId);
    this.cancelOpenBackgroundReconciliation(libraryId);

    const backupTimer = this.databaseBackupTimers.get(libraryId);
    if (backupTimer) {
      clearTimeout(backupTimer);
      this.databaseBackupTimers.delete(libraryId);
    }

    if (openLibrary.readOnly) {
      // Serpent-033e: a read-only (newer-schema) library never queued jobs,
      // started watchers, or held pending imports — every close-time write
      // below would fail with SQLITE_READONLY. Just release the handle.
      openLibrary.changeSubscription.stop();
      openLibrary.connection.close();
      this.openById.delete(libraryId);
      this.openIdByPath.delete(openLibrary.summary.libraryPath);
      this.invalidateArtifactPathCache(libraryId);
      this.artifactDescriptorCache.invalidateLibrary(libraryId);
      this.browseSessionStore.invalidateLibrary(libraryId);
      this.dropPreparedStatementCache(libraryId);
      this.clearTextAssetPreviewCache(libraryId);
      this.autoRepairAttemptedByLibrary.delete(libraryId);
      this.autoRepairProbeFailedAtByLibrary.delete(libraryId);
      this.autoAnalysisSuppressedAssetIds.delete(libraryId);
      this.interactiveIdleUntilByLibrary.delete(libraryId);
      return;
    }

    // A deliberate close is not a crash recovery boundary. Persist queued,
    // paused, and running AI work as cancelled before the connection closes so
    // reopening the library cannot silently resume uploads the user stopped.
    this.cancelJobs(libraryId);
    this.abortActiveMediaJobs(libraryId);
    this.stopAssetWatcher(libraryId);
    this.stopLinkedWatchers(libraryId);
    for (const [importId, pending] of this.pendingImports) {
      if (pending.libraryId === libraryId) {
        this.pendingImports.delete(importId);
        this.cancelImportExpiry(pending);
        this.updateImportOperation(pending, 'rolled_back', 'LIBRARY_CLOSED');
        this.removeOperation(pending.operationPath);
      }
    }
    openLibrary.changeSubscription.stop();
    this.checkpointAndCloseConnection(openLibrary, libraryId);
    this.openById.delete(libraryId);
    this.openIdByPath.delete(openLibrary.summary.libraryPath);
    this.invalidateArtifactPathCache(libraryId);
    this.artifactDescriptorCache.invalidateLibrary(libraryId);
    this.browseSessionStore.invalidateLibrary(libraryId);
    this.dropPreparedStatementCache(libraryId);
    this.clearTextAssetPreviewCache(libraryId);
    for (const [key] of this.openOperationHistoryGroups) {
      if (key.startsWith(`${libraryId}\u0000`)) this.openOperationHistoryGroups.delete(key);
    }
    this.autoRepairAttemptedByLibrary.delete(libraryId);
    this.autoRepairProbeFailedAtByLibrary.delete(libraryId);
    this.autoAnalysisSuppressedAssetIds.delete(libraryId);
    this.interactiveIdleUntilByLibrary.delete(libraryId);
  }

  public override checkpointAndCloseConnection(openLibrary: OpenLibrary, libraryId: string): void {
    try {
      openLibrary.connection.pragma('wal_checkpoint(TRUNCATE)');
    } catch (error) {
      this.diagnose('library.wal-checkpoint', error, { libraryId });
    }
    openLibrary.connection.close();
  }

  /**
   * Serpent-9i8: close the open library, then permanently delete its root
   * directory (Assets / .serpent / managed content). Linked-folder *source*
   * trees live outside the library root and are not touched.
   *
   * Serpent-dfgg: Windows cannot rm a tree while Chromium/ffmpeg/fs.watch still
   * hold children. Callers must drainLibraryMedia first; this method then
   * retries and will rename the root aside if a lingering lock remains.
   */
  override deleteLibraryFromDisk(libraryId: string): {
    libraryId: string;
    displayName: string;
    libraryPath: string;
    pendingAsidePath: string | null;
  } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const { libraryPath, displayName } = openLibrary.summary;

    for (const directoryName of REQUIRED_DIRECTORIES) {
      if (!realDirectoryExists(path.join(libraryPath, directoryName))) {
        throw new LibraryServiceError('NOT_A_LIBRARY');
      }
    }
    if (
      !realDirectoryExists(path.join(libraryPath, '.serpent')) ||
      !realFileExists(databasePath(libraryPath))
    ) {
      throw new LibraryServiceError('NOT_A_LIBRARY');
    }

    this.closeLibrary(libraryId);

    let pendingAsidePath: string | null;
    try {
      pendingAsidePath = removeLibraryRootWithRetry(libraryPath).asidePath;
    } catch (error) {
      this.diagnose('library.delete-from-disk', error, { libraryPath });
      // Serpent-qgm1: the library was closed before rm — if the deletion
      // fails the user must not be left with a half-open state. Reopen so the
      // library stays fully usable and the renderer can keep browsing.
      try {
        this.openLibrary(libraryPath);
      } catch (reopenError) {
        this.diagnose('library.reopen-after-delete-failure', reopenError, {
          libraryPath,
        });
        throw new LibraryServiceError('LIBRARY_NOT_FOUND', {
          cause: error,
        });
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', {
        reason: publicReasonFromError(error),
        cause: error,
      });
    }

    if (existsSync(libraryPath)) {
      try {
        this.openLibrary(libraryPath);
      } catch (reopenError) {
        this.diagnose('library.reopen-after-delete-failure', reopenError, {
          libraryPath,
        });
        throw new LibraryServiceError('LIBRARY_NOT_FOUND', {
          cause: reopenError,
        });
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', {
        reason: 'IO_ERROR',
      });
    }

    return { libraryId, displayName, libraryPath, pendingAsidePath };
  }

  /**
   * Serpent-65d837: remove library roots that were renamed aside (`.del-*`)
   * after a previous deletion could not fully remove them while a Windows
   * handle was still open. Idempotent — missing paths are harmless because
   * `removePathWithSyncRetry` uses `rmSync(..., { force: true })`. Returns the
   * paths that were removed and the ones that still fail (caller re-queues).
   */
  override cleanupPendingDeletions(asidePaths: string[]): {
    cleanedPaths: string[];
    remainingPaths: string[];
  } {
    const cleanedPaths: string[] = [];
    const remainingPaths: string[] = [];
    for (const asidePath of asidePaths) {
      // Only ever touch paths owned by this feature: the suffix is generated
      // by removeLibraryRootWithRetry and must stay inside a library root.
      if (typeof asidePath !== 'string' || !asidePath.includes('.del-')) {
        remainingPaths.push(asidePath);
        continue;
      }
      try {
        removePathWithSyncRetry(asidePath);
        cleanedPaths.push(asidePath);
      } catch (error) {
        this.diagnose('library.cleanup-pending-deletions', error, { asidePath });
        remainingPaths.push(asidePath);
      }
    }
    return { cleanedPaths, remainingPaths };
  }

  override listLibraries(): InternalLibrarySummary[] {
    return [...this.openById.values()].map(({ summary }) => ({ ...summary }));
  }

  /**
   * Drain active media jobs before closing SQLite handles during Worker
   * shutdown. The old synchronous closeAll() could close a connection while
   * an ffmpeg promise was still unwinding, leaving the child detached.
   */
  override async closeAllAsync(timeoutMs = 500): Promise<void> {
    const activeJobs = [...this.activeMediaJobs.values()];
    for (const active of activeJobs) active.controller.abort();
    await Promise.race([
      Promise.allSettled(activeJobs.map((active) => active.settled)).then(() => undefined),
      new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
    ]);
    for (const libraryId of [...this.openById.keys()]) {
      await this.closeLibraryAsync(libraryId);
    }
  }

  override closeAll(): void {
    for (const libraryId of [...this.openById.keys()]) this.closeLibrary(libraryId);
  }

}
