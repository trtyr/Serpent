/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { AssetMetadataHistorySnapshot, CollectionHistorySnapshot, CollectionMembershipHistorySnapshot, ManagedFolderHistorySnapshot, ManagedFolderRow, OpenLibrary, OperationHistoryGroupStepInput, OperationHistoryRow, OperationHistoryStepRow, OperationHistoryTransitionResult, RecordOperationHistoryInput, SmartCollectionHistorySnapshot, TagHistorySnapshot} from '../library-service-internals';
import { LibraryServiceError, OPERATION_HISTORY_MAX_AUDIT_ENTRIES, OPERATION_HISTORY_MAX_RECIPE_BYTES, OPERATION_HISTORY_STALE_RETENTION_MS, directoryExists, serviceError } from '../library-service-internals';
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
import { LibraryServiceOperationRecovery } from './LibraryServiceOperationRecovery';

/** LibraryServiceHistory: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceHistory extends LibraryServiceOperationRecovery {

  public override operationHistoryEntries(openLibrary: OpenLibrary): HistoryStackEntry[] {
    const rows = openLibrary.connection
      .prepare(
        `SELECT history_entry_id, source, source_reference, label_key,
                label_args_json, policy, state, stale_code, affected_count,
                applied_sequence, redo_sequence, created_at, updated_at
           FROM operation_history
          ORDER BY applied_sequence`,
      )
      .all() as OperationHistoryRow[];
    return rows.map((row) => {
      let labelArgs: Record<string, string | number>;
      try {
        const parsed: unknown = JSON.parse(row.label_args_json);
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          throw new Error('History label arguments must be an object.');
        }
        labelArgs = Object.fromEntries(
          Object.entries(parsed).filter(([, value]) =>
            typeof value === 'string' || typeof value === 'number',
          ),
        ) as Record<string, string | number>;
      } catch (error) {
        throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
      }
      return {
        historyEntryId: row.history_entry_id,
        source: row.source,
        sourceReference: row.source_reference,
        labelKey: row.label_key,
        labelArgs,
        policy: row.policy,
        state: row.state,
        staleCode: row.stale_code,
        affectedCount: row.affected_count,
        appliedSequence: row.applied_sequence,
        redoSequence: row.redo_sequence,
      } satisfies HistoryStackEntry;
    });
  }

  override getOperationHistoryStatus(libraryId: string): HistoryStatus {
    const openLibrary = this.requireOpenLibrary(libraryId);
    return new OperationHistoryStateMachine(this.operationHistoryEntries(openLibrary)).status(libraryId);
  }

  /**
   * Retain the active linear stack, but discard audit rows that are no longer
   * reachable after a newer barrier or have been stale past the retention
   * window.  Current applied/undone entries and in-flight attempts are never
   * eligible; large snapshot operations have a separate admission limit.
   */
  public override pruneOperationHistory(openLibrary: OpenLibrary): void {
    const rows = openLibrary.connection.prepare(
      `SELECT history_entry_id, policy, state, applied_sequence, updated_at
         FROM operation_history
        ORDER BY applied_sequence`,
    ).all() as Array<{
      history_entry_id: string;
      policy: HistoryPolicy;
      state: HistoryEntryState;
      applied_sequence: number;
      updated_at: string;
    }>;
    if (rows.length <= OPERATION_HISTORY_MAX_AUDIT_ENTRIES) {
      const cutoff = Date.now() - OPERATION_HISTORY_STALE_RETENTION_MS;
      if (!rows.some((row) => row.state === 'stale' && Date.parse(row.updated_at) < cutoff)) return;
    }
    const latestBarrierSequence = rows
      .filter((row) => row.policy === 'barrier' && row.state === 'applied')
      .at(-1)?.applied_sequence ?? -Infinity;
    const cutoff = Date.now() - OPERATION_HISTORY_STALE_RETENTION_MS;
    const deletable = rows.filter((row) =>
      (row.policy === 'barrier' && row.applied_sequence < latestBarrierSequence)
      || (row.state === 'stale' && Date.parse(row.updated_at) < cutoff),
    );
    const excess = Math.max(0, rows.length - OPERATION_HISTORY_MAX_AUDIT_ENTRIES);
    const candidates = deletable
      .slice(0, Math.max(excess, deletable.length > 0 ? 1 : 0));
    if (candidates.length === 0) return;
    openLibrary.connection.transaction(() => {
      const remove = openLibrary.connection.prepare(
        'DELETE FROM operation_history WHERE history_entry_id = ?',
      );
      for (const row of candidates) remove.run(row.history_entry_id);
    })();
  }

  /**
   * Persist a semantic mutation as one history group. Callers provide only
   * versioned recipe payloads; arbitrary SQL, filesystem paths and functions
   * are intentionally not accepted by this boundary.
   */
  override recordOperationHistory(input: RecordOperationHistoryInput): HistoryOperationReceipt {
    const source = input.source ?? 'desktop';
    const groupKey = input.sourceReference === null || input.sourceReference === undefined
      ? undefined
      : this.operationHistoryGroupKey(input.libraryId, source, input.sourceReference);
    const historyEntryId = groupKey === undefined ? undefined : this.openOperationHistoryGroups.get(groupKey);
    if (historyEntryId !== undefined) {
      return this.appendOperationHistoryGroupStep({
        historyEntryId,
        input: { ...input, source },
      });
    }
    return this.recordOperationHistoryGroup({
      ...input,
      source,
      steps: [{
        commandId: input.commandId,
        forwardRecipe: input.forwardRecipe,
        inverseRecipe: input.inverseRecipe,
        affectedEntities: input.affectedEntities,
      }],
    });
  }

  public override operationHistoryGroupKey(
    libraryId: string,
    source: HistorySource,
    sourceReference: string,
  ): string {
    return `${libraryId}\u0000${source}\u0000${sourceReference}`;
  }

  /**
   * Begin an automation-owned group before its first mutation is dispatched.
   * The durable row is materialized by appendOperationHistoryGroupStep(), not
   * here. A group that performs no mutation therefore leaves no empty history
   * entry and does not advance the file-operation plan fence.
   */
  override beginOperationHistoryGroup(input: {
    libraryId: string;
    source: HistorySource;
    sourceReference: string;
  }): HistoryOperationReceipt {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const key = this.operationHistoryGroupKey(input.libraryId, input.source, input.sourceReference);
    const existingId = this.openOperationHistoryGroups.get(key);
    if (existingId !== undefined) {
      const existing = openLibrary.connection.prepare(
        "SELECT history_entry_id FROM operation_history WHERE history_entry_id = ? AND state = 'open'",
      ).get(existingId) as { history_entry_id: string } | undefined;
      if (existing !== undefined) {
        return { historyEntryId: existing.history_entry_id, undoable: false, redoable: false, policy: 'reversible' };
      }
      // A freshly-begun group is intentionally not present in the table yet.
      // Reuse that reservation instead of creating a second in-memory group.
      return { historyEntryId: existingId, undoable: false, redoable: false, policy: 'reversible' };
    }
    const historyEntryId = randomUUID();
    this.openOperationHistoryGroups.set(key, historyEntryId);
    return { historyEntryId, undoable: false, redoable: false, policy: 'reversible' };
  }

  public override appendOperationHistoryGroupStep(input: {
    historyEntryId: string;
    input: RecordOperationHistoryInput;
  }): HistoryOperationReceipt {
    const openLibrary = this.requireOpenLibrary(input.input.libraryId);
    const forward = historyRecipeSchema.parse(input.input.forwardRecipe);
    const inverse = historyRecipeSchema.parse(input.input.inverseRecipe);
    try {
      assertRegisteredHistoryRecipePair(forward, inverse);
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
    const updatedAt = new Date().toISOString();
    const affectedEntities = input.input.affectedEntities ?? [];
    openLibrary.connection.transaction(() => {
      const row = openLibrary.connection.prepare(
        "SELECT source, source_reference, state FROM operation_history WHERE history_entry_id = ?",
      ).get(input.historyEntryId) as { source: HistorySource; source_reference: string | null; state: HistoryEntryState } | undefined;
      const expectedSource = input.input.source ?? 'desktop';
      const expectedSourceReference = input.input.sourceReference ?? null;
      if (row !== undefined && (row.state !== 'open'
        || row.source !== expectedSource
        || row.source_reference !== expectedSourceReference)) {
        throw new LibraryServiceError('HISTORY_ENTRY_NOT_FOUND');
      }
      if (row === undefined) {
        // This is the first real step of a reserved execution group. Only now
        // does history metadata become durable and advance the library change
        // sequence; the file plan was checked before this mutation is
        // recorded.
        const appliedSequence = ((openLibrary.connection
          .prepare('SELECT COALESCE(MAX(applied_sequence), 0) AS sequence FROM operation_history')
          .get() as { sequence: number }).sequence) + 1;
        openLibrary.connection.prepare("DELETE FROM operation_history WHERE state = 'undone'").run();
        openLibrary.connection.prepare(
          `INSERT INTO operation_history
             (history_entry_id, source, source_reference, label_key, label_args_json,
              policy, state, applied_sequence, redo_sequence, stale_code,
              affected_count, created_at, updated_at)
           VALUES (?, ?, ?, 'history.automation.script', ?, 'reversible', 'open', ?, 0, NULL, 0, ?, ?)`,
        ).run(
          input.historyEntryId,
          expectedSource,
          expectedSourceReference,
          JSON.stringify({ commands: 0 }),
          appliedSequence,
          updatedAt,
          updatedAt,
        );
      }
      const step = openLibrary.connection.prepare(
        `SELECT COALESCE(MAX(ordinal), -1) AS ordinal
           FROM operation_history_steps
          WHERE history_entry_id = ?`,
      ).get(input.historyEntryId) as { ordinal: number };
      openLibrary.connection.prepare(
        `INSERT INTO operation_history_steps
           (history_step_id, history_entry_id, ordinal, command_id, recipe_kind,
            recipe_version, forward_payload_json, inverse_payload_json,
            affected_entities_json, current_direction)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'forward')`,
      ).run(
        randomUUID(),
        input.historyEntryId,
        step.ordinal + 1,
        input.input.commandId,
        forward.kind,
        forward.version,
        JSON.stringify(forward),
        JSON.stringify(inverse),
        JSON.stringify(affectedEntities),
      );
      openLibrary.connection.prepare(
        `UPDATE operation_history
            SET affected_count = affected_count + ?,
                label_args_json = ?, updated_at = ?
          WHERE history_entry_id = ?`,
      ).run(
        input.input.affectedCount,
        JSON.stringify({ commands: step.ordinal + 2 }),
        updatedAt,
        input.historyEntryId,
      );
    })();
    return {
      historyEntryId: input.historyEntryId,
      undoable: false,
      redoable: false,
      policy: 'reversible',
    };
  }

  /**
   * Persist one user intent with one or more ordered Worker-owned steps.
   * `open` is written before a caller starts an external filesystem phase;
   * callers must complete or discard it after the phase.  A Worker restart
   * marks an unfinished group stale, so an interrupted batch is never exposed
   * as a successful undo target.
   */
  override recordOperationHistoryGroup(input: Omit<RecordOperationHistoryInput, 'forwardRecipe' | 'inverseRecipe'> & {
    commit?: boolean;
    steps: readonly OperationHistoryGroupStepInput[];
  }): HistoryOperationReceipt {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (this.historyReplayDepth > 0) {
      return {
        historyEntryId: input.sourceReference ?? 'history-replay',
        undoable: false,
        redoable: false,
        policy: input.policy ?? 'reversible',
      };
    }
    if (input.steps.length === 0) throw new LibraryServiceError('LIBRARY_CORRUPT');
    if (!Number.isSafeInteger(input.affectedCount) || input.affectedCount < 0) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const steps = input.steps.map((step) => {
      const forward = historyRecipeSchema.parse(step.forwardRecipe);
      const inverse = historyRecipeSchema.parse(step.inverseRecipe);
      try {
        assertRegisteredHistoryRecipePair(forward, inverse);
      } catch (error) {
        throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
      }
      return {
        ...step,
        forward,
        inverse,
        affectedEntities: step.affectedEntities ?? [],
      };
    });
    const historyEntryId = randomUUID();
    const now = new Date().toISOString();
    const appliedSequence = ((openLibrary.connection
      .prepare('SELECT COALESCE(MAX(applied_sequence), 0) AS sequence FROM operation_history')
      .get() as { sequence: number }).sequence) + 1;
    const policy = input.policy ?? 'reversible';
    const source = input.source ?? 'desktop';
    const labelArgs = input.labelArgs ?? {};
    const affectedEntities = input.affectedEntities ?? [];
    const labelArgsJson = JSON.stringify(labelArgs);
    const affectedEntitiesJson = JSON.stringify(affectedEntities);
    const serializedSteps = steps.map((step) => ({
      forwardJson: JSON.stringify(step.forward),
      inverseJson: JSON.stringify(step.inverse),
      affectedEntitiesJson: JSON.stringify(step.affectedEntities),
    }));
    const historyBytes = serializedSteps.reduce((total, step) => total
      + Buffer.byteLength(step.forwardJson, 'utf8')
      + Buffer.byteLength(step.inverseJson, 'utf8')
      + Buffer.byteLength(step.affectedEntitiesJson, 'utf8'), 0);
    if (
      historyBytes > OPERATION_HISTORY_MAX_RECIPE_BYTES
      || Buffer.byteLength(labelArgsJson, 'utf8') + Buffer.byteLength(affectedEntitiesJson, 'utf8') > OPERATION_HISTORY_MAX_RECIPE_BYTES
    ) {
      throw new LibraryServiceError('HISTORY_TOO_LARGE');
    }
    openLibrary.connection.transaction(() => {
      // A new forward mutation starts a new branch after undo. Keeping the
      // branch out of the table also prevents it from being mistaken for a
      // redo target after restart.
      openLibrary.connection.prepare("DELETE FROM operation_history WHERE state = 'undone'").run();
      openLibrary.connection.prepare(
        `INSERT INTO operation_history
           (history_entry_id, source, source_reference, label_key, label_args_json,
            policy, state, applied_sequence, redo_sequence, stale_code,
            affected_count, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, 'open', ?, 0, NULL, ?, ?, ?)`,
      ).run(
        historyEntryId,
        source,
        input.sourceReference ?? null,
        input.labelKey,
        labelArgsJson,
        policy,
        appliedSequence,
        input.affectedCount,
        now,
        now,
      );
      const insertStep = openLibrary.connection.prepare(
        `INSERT INTO operation_history_steps
           (history_step_id, history_entry_id, ordinal, command_id, recipe_kind,
            recipe_version, forward_payload_json, inverse_payload_json,
            affected_entities_json, current_direction)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'forward')`,
      );
      steps.forEach((step, ordinal) => {
        const serialized = serializedSteps[ordinal]!;
        insertStep.run(
          randomUUID(),
          historyEntryId,
          ordinal,
          step.commandId,
          step.forward.kind,
          step.forward.version,
          // Persist the complete versioned recipe, not only its payload. Undo
          // and redo both validate the kind/version against the Worker-owned
          // registry before executing it.
          serialized.forwardJson,
          serialized.inverseJson,
          serialized.affectedEntitiesJson,
        );
      });
    })();
    if (input.commit !== false) this.completeOperationHistoryGroup(input.libraryId, historyEntryId);
    try {
      this.pruneOperationHistory(openLibrary);
    } catch (error) {
      // Retention is best-effort housekeeping; it must not turn a committed
      // user mutation into an apparent failure.
      this.diagnose('operation-history.retention', error, {
        libraryId: input.libraryId,
      });
    }
    const status = this.getOperationHistoryStatus(input.libraryId);
    return {
      historyEntryId,
      undoable: status.undoTop?.historyEntryId === historyEntryId,
      redoable: false,
      policy,
    };
  }

  override completeOperationHistoryGroup(libraryId: string, historyEntryId: string): HistoryOperationReceipt {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const stepCount = (openLibrary.connection.prepare(
      'SELECT COUNT(*) AS count FROM operation_history_steps WHERE history_entry_id = ?',
    ).get(historyEntryId) as { count: number }).count;
    if (stepCount === 0) {
      this.discardOperationHistoryGroup(libraryId, historyEntryId);
      return { historyEntryId, undoable: false, redoable: false, policy: 'reversible' };
    }
    const updatedAt = new Date().toISOString();
    const result = openLibrary.connection.prepare(
      "UPDATE operation_history SET state = 'applied', updated_at = ?, stale_code = NULL WHERE history_entry_id = ? AND state = 'open'",
    ).run(updatedAt, historyEntryId);
    if (result.changes === 0) throw new LibraryServiceError('HISTORY_ENTRY_NOT_FOUND');
    for (const [key, id] of this.openOperationHistoryGroups) {
      if (id === historyEntryId) this.openOperationHistoryGroups.delete(key);
    }
    const status = this.getOperationHistoryStatus(libraryId);
    return {
      historyEntryId,
      undoable: status.undoTop?.historyEntryId === historyEntryId,
      redoable: false,
      policy: 'reversible',
    };
  }

  public override discardOperationHistoryGroup(libraryId: string, historyEntryId: string): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    openLibrary.connection.prepare(
      "DELETE FROM operation_history WHERE history_entry_id = ? AND state = 'open'",
    ).run(historyEntryId);
    for (const [key, id] of this.openOperationHistoryGroups) {
      if (id === historyEntryId) this.openOperationHistoryGroups.delete(key);
    }
  }

  public override markOperationHistoryGroupStale(
    libraryId: string,
    historyEntryId: string,
    staleCode: string,
  ): void {
    const openLibrary = this.requireOpenLibrary(libraryId);
    openLibrary.connection.prepare(
      "UPDATE operation_history SET state = 'stale', stale_code = ?, updated_at = ? WHERE history_entry_id = ? AND state = 'open'",
    ).run(staleCode, new Date().toISOString(), historyEntryId);
  }

  override recordOperationHistoryBarrier(input: {
    affectedCount: number;
    affectedEntities?: readonly string[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    reason: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt {
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: input.commandId,
      labelKey: input.labelKey,
      labelArgs: { count: input.affectedCount },
      affectedCount: input.affectedCount,
      affectedEntities: input.affectedEntities,
      policy: 'barrier',
      forwardRecipe: {
        kind: 'history-barrier',
        version: 1,
        payload: { reason: input.reason },
      },
      inverseRecipe: {
        kind: 'history-barrier',
        version: 1,
        payload: { reason: input.reason },
      },
    });
  }

  public override metadataHistorySnapshot(metadata: AssetMetadataResult): AssetMetadataHistorySnapshot {
    return {
      assetId: metadata.assetId,
      description: metadata.description,
      rating: metadata.rating,
      favorite: metadata.favorite,
      palette: metadata.palette,
      sourcePageUrl: metadata.sourcePageUrl,
      author: metadata.author,
      entityVersion: metadata.entityVersion,
      updatedAt: metadata.updatedAt,
    };
  }

  public override assertMetadataHistorySnapshot(value: unknown): AssetMetadataHistorySnapshot {
    if (typeof value !== 'object' || value === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
    const candidate = value as Partial<AssetMetadataHistorySnapshot>;
    if (
      typeof candidate.assetId !== 'string'
      || (candidate.description !== null && typeof candidate.description !== 'string')
      || typeof candidate.rating !== 'number'
      || typeof candidate.favorite !== 'boolean'
      || (candidate.palette !== null && typeof candidate.palette !== 'string')
      || (candidate.sourcePageUrl !== null && typeof candidate.sourcePageUrl !== 'string')
      || (candidate.author !== null && typeof candidate.author !== 'string')
      || !Number.isInteger(candidate.entityVersion)
      || typeof candidate.updatedAt !== 'string'
    ) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    return candidate as AssetMetadataHistorySnapshot;
  }

  public override metadataHistoryMatches(
    current: AssetMetadataResult,
    expected: AssetMetadataHistorySnapshot,
  ): boolean {
    const snapshot = this.metadataHistorySnapshot(current);
    return snapshot.assetId === expected.assetId
      && snapshot.description === expected.description
      && snapshot.rating === expected.rating
      && snapshot.favorite === expected.favorite
      && snapshot.palette === expected.palette
      && snapshot.sourcePageUrl === expected.sourcePageUrl
      && snapshot.author === expected.author
      && snapshot.entityVersion === expected.entityVersion;
  }

  public override applyAssetMetadataHistorySnapshot(
    openLibrary: OpenLibrary,
    expected: AssetMetadataHistorySnapshot,
    restore: AssetMetadataHistorySnapshot,
  ): void {
    const current = this.getAssetMetadata({
      libraryId: openLibrary.summary.libraryId,
      assetId: expected.assetId,
    });
    if (!this.metadataHistoryMatches(current, expected)) {
      throw new LibraryServiceError('VERSION_CONFLICT', {
        currentEntityVersion: current.entityVersion,
      });
    }
    const now = new Date().toISOString();
    if (restore.entityVersion === 0) {
      openLibrary.connection.prepare('DELETE FROM asset_metadata WHERE asset_id = ?').run(restore.assetId);
    } else {
      openLibrary.connection.prepare(
        `INSERT INTO asset_metadata
           (asset_id, description, rating, favorite, palette,
            source_page_url, author, entity_version, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(asset_id) DO UPDATE SET
           description = excluded.description,
           rating = excluded.rating,
           favorite = excluded.favorite,
           palette = excluded.palette,
           source_page_url = excluded.source_page_url,
           author = excluded.author,
           entity_version = excluded.entity_version,
           updated_at = excluded.updated_at`,
      ).run(
        restore.assetId,
        restore.description,
        restore.rating,
        restore.favorite ? 1 : 0,
        restore.palette,
        restore.sourcePageUrl,
        restore.author,
        restore.entityVersion,
        // The operation itself is the new write; preserve the logical
        // snapshot version but refresh its wall-clock timestamp.
        now,
      );
    }
    this.syncAssetSearchContent(openLibrary.connection, restore.assetId);
  }

  override recordAssetMetadataHistory(input: {
    after: AssetMetadataResult;
    before: AssetMetadataResult;
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt {
    const before = this.metadataHistorySnapshot(input.before);
    const after = this.metadataHistorySnapshot(input.after);
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: 'asset.metadata.set',
      labelKey: 'history.asset.metadata.set',
      labelArgs: { count: 1 },
      affectedCount: 1,
      affectedEntities: [after.assetId],
      forwardRecipe: {
        kind: 'asset-metadata-snapshot',
        version: 1,
        payload: { assetId: after.assetId, expected: before, restore: after },
      },
      inverseRecipe: {
        kind: 'asset-metadata-snapshot',
        version: 1,
        payload: { assetId: after.assetId, expected: after, restore: before },
      },
    });
  }

  override recordAssetMetadataBatchHistory(input: {
    after: AssetMetadataResult[];
    before: AssetMetadataResult[];
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt | null {
    if (input.after.length === 0) return null;
    const before = input.before.map((item) => this.metadataHistorySnapshot(item));
    const after = input.after.map((item) => this.metadataHistorySnapshot(item));
    const recipe = (expected: AssetMetadataHistorySnapshot[], restore: AssetMetadataHistorySnapshot[]): HistoryRecipe => ({
      kind: 'asset-metadata-batch-snapshot',
      version: 1,
      payload: { expected, restore },
    });
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: 'asset.metadata.set-many',
      labelKey: 'history.asset.metadata.set-many',
      labelArgs: { count: after.length },
      affectedCount: after.length,
      affectedEntities: after.map((item) => item.assetId),
      forwardRecipe: recipe(before, after),
      inverseRecipe: recipe(after, before),
    });
  }

  override getHumanTagRelations(input: {
    assetIds: readonly string[];
    libraryId: string;
    tagIds: readonly string[];
  }): Array<{ assetId: string; tagId: string }> {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.assetIds.length === 0 || input.tagIds.length === 0) return [];
    const rows: Array<{ asset_id: string; tag_id: string }> = [];
    // Two IN predicates share one SQLite statement, so split each side below
    // half the single-IN budget instead of multiplying the bind count.
    const relationChunkLimit = Math.floor((SQLITE_IN_BIND_LIMIT - 4) / 2);
    for (const assetChunk of sqliteInChunks([...new Set(input.assetIds)], relationChunkLimit)) {
      for (const tagChunk of sqliteInChunks([...new Set(input.tagIds)], relationChunkLimit)) {
        rows.push(...sqliteAllInChunks<string, { asset_id: string; tag_id: string }>({
          connection: openLibrary.connection,
          values: assetChunk,
          buildSql: (assetPlaceholders) =>
            `SELECT hat.asset_id, hat.tag_id
               FROM human_asset_tags hat
               JOIN tags t ON t.tag_id = hat.tag_id
              WHERE hat.asset_id IN (${assetPlaceholders})
                AND hat.tag_id IN (${sqliteInPlaceholders(tagChunk)})
                AND t.library_id = ?`,
          bind: (chunk) => [...chunk, ...tagChunk, input.libraryId],
        }));
      }
    }
    return rows.map((row) => ({ assetId: row.asset_id, tagId: row.tag_id }));
  }

  public override assertHistoryRelations(value: unknown): Array<{ assetId: string; tagId: string }> {
    if (!Array.isArray(value)) throw new LibraryServiceError('LIBRARY_CORRUPT');
    return value.map((item) => {
      if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
      const relation = item as { assetId?: unknown; tagId?: unknown };
      if (typeof relation.assetId !== 'string' || typeof relation.tagId !== 'string') {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
      return { assetId: relation.assetId, tagId: relation.tagId };
    });
  }

  public override applyTagRelations(
    openLibrary: OpenLibrary,
    relations: readonly { assetId: string; tagId: string }[],
    direction: 'add' | 'remove',
    expectedPresent?: boolean,
  ): void {
    if (expectedPresent !== undefined) {
      const current = this.getHumanTagRelations({
        libraryId: openLibrary.summary.libraryId,
        assetIds: [...new Set(relations.map((relation) => relation.assetId))],
        tagIds: [...new Set(relations.map((relation) => relation.tagId))],
      });
      const currentKeys = new Set(current.map((relation) => `${relation.assetId}\u0000${relation.tagId}`));
      const mismatched = relations.some((relation) =>
        currentKeys.has(`${relation.assetId}\u0000${relation.tagId}`) !== expectedPresent,
      );
      if (mismatched) throw new LibraryServiceError('VERSION_CONFLICT');
    }
    const statement = direction === 'add'
      ? openLibrary.connection.prepare('INSERT OR IGNORE INTO human_asset_tags (asset_id, tag_id) VALUES (?, ?)')
      : openLibrary.connection.prepare('DELETE FROM human_asset_tags WHERE asset_id = ? AND tag_id = ?');
    openLibrary.connection.transaction(() => {
      for (const relation of relations) statement.run(relation.assetId, relation.tagId);
    })();
    for (const assetId of new Set(relations.map((relation) => relation.assetId))) {
      this.syncAssetSearchContent(openLibrary.connection, assetId);
    }
  }

  override recordTagRelationsHistory(input: {
    assetIds: readonly string[];
    changedRelations: readonly { assetId: string; tagId: string }[];
    direction: 'add' | 'remove';
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt | null {
    if (input.changedRelations.length === 0) return null;
    const forwardKind = input.direction === 'add' ? 'tag-relations-add' : 'tag-relations-remove';
    const inverseKind = input.direction === 'add' ? 'tag-relations-remove' : 'tag-relations-add';
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: input.direction === 'add' ? 'tag.assign' : 'tag.remove',
      labelKey: input.direction === 'add' ? 'history.tag.assign' : 'history.tag.remove',
      labelArgs: { count: input.changedRelations.length },
      affectedCount: input.changedRelations.length,
      affectedEntities: input.assetIds,
      forwardRecipe: {
        kind: forwardKind,
        version: 1,
        payload: { relations: input.changedRelations, expectedPresent: input.direction === 'remove' },
      },
      inverseRecipe: {
        kind: inverseKind,
        version: 1,
        payload: { relations: input.changedRelations, expectedPresent: input.direction === 'add' },
      },
    });
  }

  override getCollectionAssetMemberships(input: {
    assetIds: readonly string[];
    collectionId: string;
    libraryId: string;
  }): string[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.assetIds.length === 0) return [];
    const rows = sqliteAllInChunks<string, { asset_id: string }>({
      connection: openLibrary.connection,
      values: input.assetIds,
      buildSql: (placeholders) =>
        `SELECT asset_id FROM collection_assets
          WHERE collection_id = ? AND asset_id IN (${placeholders})`,
      bind: (chunk) => [input.collectionId, ...chunk],
    });
    return rows.map((row) => row.asset_id);
  }

  public override assertCollectionMembershipPrecondition(
    openLibrary: OpenLibrary,
    payload: Record<string, unknown>,
  ): void {
    if (typeof payload.expectedPresent !== 'boolean') return;
    if (typeof payload.collectionId !== 'string' || !Array.isArray(payload.assetIds)) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
    const assetIds = payload.assetIds.filter((assetId): assetId is string => typeof assetId === 'string');
    if (assetIds.length !== payload.assetIds.length) throw new LibraryServiceError('LIBRARY_CORRUPT');
    const current = new Set(this.getCollectionAssetMemberships({
      libraryId: openLibrary.summary.libraryId,
      collectionId: payload.collectionId,
      assetIds,
    }));
    if (assetIds.some((assetId) => current.has(assetId) !== payload.expectedPresent)) {
      throw new LibraryServiceError('VERSION_CONFLICT');
    }
  }

  override recordCollectionMembershipHistory(input: {
    assetIds: readonly string[];
    collectionId: string;
    direction: 'add' | 'remove';
    libraryId: string;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt | null {
    if (input.assetIds.length === 0) return null;
    const forwardKind = input.direction === 'add' ? 'collection-assets-add' : 'collection-assets-remove';
    const inverseKind = input.direction === 'add' ? 'collection-assets-remove' : 'collection-assets-add';
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: input.direction === 'add' ? 'collection.assets.add' : 'collection.assets.remove',
      labelKey: input.direction === 'add' ? 'history.collection.assets.add' : 'history.collection.assets.remove',
      labelArgs: { count: input.assetIds.length },
      affectedCount: input.assetIds.length,
      affectedEntities: input.assetIds,
      forwardRecipe: {
        kind: forwardKind,
        version: 1,
        payload: {
          collectionId: input.collectionId,
          assetIds: input.assetIds,
          expectedPresent: input.direction === 'remove',
        },
      },
      inverseRecipe: {
        kind: inverseKind,
        version: 1,
        payload: {
          collectionId: input.collectionId,
          assetIds: input.assetIds,
          expectedPresent: input.direction === 'add',
        },
      },
    });
  }

  /** Stable folder rows used by create/delete and as preconditions for moves. */
  override getManagedFolderHistorySnapshot(input: {
    folderIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): ManagedFolderHistorySnapshot[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const roots = [...new Set(input.folderIds)];
    if (roots.length === 0) return [];
    const rows = openLibrary.connection
      .prepare(
        `SELECT folder_id, parent_folder_id, name, relative_path, path_identity
           FROM managed_folders
          ORDER BY length(relative_path), relative_path`,
      )
      .all() as ManagedFolderRow[];
    const rootPaths = rows
      .filter((row) => roots.includes(row.folder_id))
      .map((row) => row.relative_path);
    if (rootPaths.length !== roots.length && !input.allowMissing) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    return rows
      .filter((row) => rootPaths.some((root) =>
        row.relative_path === root || row.relative_path.startsWith(`${root}/`)))
      .map((row) => ({
        folderId: row.folder_id,
        parentFolderId: row.parent_folder_id,
        name: row.name,
        relativePath: row.relative_path,
        pathIdentity: row.path_identity,
      }));
  }

  public override assertManagedFolderHistorySnapshots(value: unknown): ManagedFolderHistorySnapshot[] {
    if (!Array.isArray(value)) throw new LibraryServiceError('LIBRARY_CORRUPT');
    return value.map((item) => {
      if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
      const candidate = item as Partial<ManagedFolderHistorySnapshot>;
      if (
        typeof candidate.folderId !== 'string'
        || (candidate.parentFolderId !== null && typeof candidate.parentFolderId !== 'string')
        || typeof candidate.name !== 'string'
        || typeof candidate.relativePath !== 'string'
        || typeof candidate.pathIdentity !== 'string'
      ) throw new LibraryServiceError('LIBRARY_CORRUPT');
      return candidate as ManagedFolderHistorySnapshot;
    });
  }

  public override applyManagedFolderCreateHistorySnapshot(
    openLibrary: OpenLibrary,
    snapshot: ManagedFolderHistorySnapshot,
  ): void {
    const existing = openLibrary.connection
      .prepare('SELECT folder_id, parent_folder_id, name, relative_path, path_identity FROM managed_folders WHERE folder_id = ?')
      .get(snapshot.folderId) as ManagedFolderRow | undefined;
    if (existing) {
      if (
        existing.parent_folder_id !== snapshot.parentFolderId
        || existing.name !== snapshot.name
        || existing.relative_path !== snapshot.relativePath
        || existing.path_identity !== snapshot.pathIdentity
      ) throw new LibraryServiceError('FOLDER_NAME_CONFLICT');
      return;
    }
    if (snapshot.parentFolderId !== null) {
      const parent = openLibrary.connection
        .prepare('SELECT folder_id FROM managed_folders WHERE folder_id = ?')
        .get(snapshot.parentFolderId);
      if (!parent) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    const conflict = openLibrary.connection
      .prepare('SELECT folder_id FROM managed_folders WHERE path_identity = ?')
      .get(snapshot.pathIdentity)
      ?? openLibrary.connection
        .prepare("SELECT asset_id FROM assets WHERE path_identity = ? AND location_kind = 'managed' AND deleted_at IS NULL")
        .get(snapshot.pathIdentity);
    if (conflict || this.portableDiskDestination(openLibrary, snapshot.relativePath)) {
      throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
    }
    const directoryPath = this.folderPath(openLibrary, snapshot.relativePath);
    try {
      mkdirSync(directoryPath);
      openLibrary.connection.prepare(
        `INSERT INTO managed_folders
           (folder_id, parent_folder_id, name, relative_path, path_identity, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(
        snapshot.folderId,
        snapshot.parentFolderId,
        snapshot.name,
        snapshot.relativePath,
        snapshot.pathIdentity,
        new Date().toISOString(),
      );
    } catch (error) {
      try {
        if (directoryExists(directoryPath)) rmdirSync(directoryPath);
      } catch { /* preserve the primary failure */ }
      if (error instanceof LibraryServiceError) throw error;
      throw serviceError(error, 'LIBRARY_NOT_WRITABLE');
    }
  }

  public override applyManagedFolderDeleteHistorySnapshot(
    openLibrary: OpenLibrary,
    snapshots: readonly ManagedFolderHistorySnapshot[],
  ): void {
    if (snapshots.length === 0) return;
    // Create/delete recipes are only emitted for empty folders.  Keep this
    // guard here as a second line of defence against a corrupted recipe.
    const rootIds = snapshots
      .filter((snapshot) => !snapshots.some((candidate) =>
        candidate.folderId !== snapshot.folderId
        && candidate.relativePath.startsWith(`${snapshot.relativePath}/`)))
      .map((snapshot) => snapshot.folderId);
    this.deleteEmptyManagedFolders({
      libraryId: openLibrary.summary.libraryId,
      folderIds: rootIds,
    });
  }

  override recordManagedFolderSnapshotHistory(input: {
    after: readonly ManagedFolderHistorySnapshot[];
    before: readonly ManagedFolderHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt {
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: input.commandId,
      labelKey: input.labelKey,
      labelArgs: { count: input.affectedCount },
      affectedCount: input.affectedCount,
      affectedEntities: input.after.map((item) => item.folderId),
      forwardRecipe: {
        kind: 'managed-folder-snapshot',
        version: 1,
        payload: { expected: input.before, restore: input.after },
      },
      inverseRecipe: {
        kind: 'managed-folder-snapshot',
        version: 1,
        payload: { expected: input.after, restore: input.before },
      },
    });
  }

  override getCollectionHistorySnapshot(input: {
    collectionIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): CollectionHistorySnapshot[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const roots = [...new Set(input.collectionIds)];
    if (roots.length === 0) return [];
    const rows = openLibrary.connection.prepare(
      `SELECT collection_id, library_id, parent_id, name, description,
              cover_asset_id, position
         FROM collections
        WHERE library_id = ?`,
    ).all(input.libraryId) as Array<{
      collection_id: string;
      library_id: string;
      parent_id: string | null;
      name: string;
      description: string | null;
      cover_asset_id: string | null;
      position: number;
    }>;
    const rootSet = new Set(roots);
    const selected = new Set<string>(rows
      .filter((row) => rootSet.has(row.collection_id))
      .map((row) => row.collection_id));
    // The snapshot intentionally includes every descendant of each requested
    // root so undo/redo can restore a whole collection subtree.  Compare the
    // requested roots themselves, not selected.size: a parent with children
    // legitimately has more selected rows than requested roots.
    if (roots.some((rootId) => !selected.has(rootId)) && !input.allowMissing) {
      throw new LibraryServiceError('FOLDER_NOT_FOUND');
    }
    let changed = true;
    while (changed) {
      changed = false;
      for (const row of rows) {
        if (row.parent_id && selected.has(row.parent_id) && !selected.has(row.collection_id)) {
          selected.add(row.collection_id);
          changed = true;
        }
      }
    }
    return rows
      .filter((row) => selected.has(row.collection_id))
      .sort((left, right) => left.position - right.position || left.collection_id.localeCompare(right.collection_id))
      .map((row) => ({
        collectionId: row.collection_id,
        libraryId: row.library_id,
        parentId: row.parent_id,
        name: row.name,
        description: row.description,
        coverAssetId: row.cover_asset_id,
        position: row.position,
      }));
  }

  override getCollectionMembershipHistorySnapshot(input: {
    collectionIds: readonly string[];
    libraryId: string;
  }): CollectionMembershipHistorySnapshot[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const ids = [...new Set(input.collectionIds)];
    if (ids.length === 0) return [];
    return sqliteAllInChunks<string, { collection_id: string; asset_id: string; position: number }>({
      connection: openLibrary.connection,
      values: ids,
      buildSql: (placeholders) =>
        `SELECT collection_id, asset_id, position
           FROM collection_assets
          WHERE collection_id IN (${placeholders})
          ORDER BY collection_id, position, asset_id`,
    }).map((row) => ({
      collectionId: row.collection_id,
      assetId: row.asset_id,
      position: row.position,
    }));
  }

  public override assertCollectionHistorySnapshots(value: unknown): CollectionHistorySnapshot[] {
    if (!Array.isArray(value)) throw new LibraryServiceError('LIBRARY_CORRUPT');
    return value.map((item) => {
      if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
      const candidate = item as Partial<CollectionHistorySnapshot>;
      if (
        typeof candidate.collectionId !== 'string'
        || typeof candidate.libraryId !== 'string'
        || (candidate.parentId !== null && typeof candidate.parentId !== 'string')
        || typeof candidate.name !== 'string'
        || (candidate.description !== null && typeof candidate.description !== 'string')
        || (candidate.coverAssetId !== null && typeof candidate.coverAssetId !== 'string')
        || !Number.isInteger(candidate.position)
      ) throw new LibraryServiceError('LIBRARY_CORRUPT');
      return candidate as CollectionHistorySnapshot;
    });
  }

  public override assertCollectionMembershipHistorySnapshots(value: unknown): CollectionMembershipHistorySnapshot[] {
    if (!Array.isArray(value)) throw new LibraryServiceError('LIBRARY_CORRUPT');
    return value.map((item) => {
      if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
      const candidate = item as Partial<CollectionMembershipHistorySnapshot>;
      if (
        typeof candidate.collectionId !== 'string'
        || typeof candidate.assetId !== 'string'
        || !Number.isInteger(candidate.position)
      ) throw new LibraryServiceError('LIBRARY_CORRUPT');
      return candidate as CollectionMembershipHistorySnapshot;
    });
  }

  public override collectionHistoryRowsEqual(
    left: readonly CollectionHistorySnapshot[],
    right: readonly CollectionHistorySnapshot[],
  ): boolean {
    const normalize = (items: readonly CollectionHistorySnapshot[]) => items
      .map((item) => JSON.stringify(item))
      .sort();
    return JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));
  }

  public override collectionMembershipHistoryRowsEqual(
    left: readonly CollectionMembershipHistorySnapshot[],
    right: readonly CollectionMembershipHistorySnapshot[],
  ): boolean {
    const normalize = (items: readonly CollectionMembershipHistorySnapshot[]) => items
      .map((item) => JSON.stringify(item))
      .sort();
    return JSON.stringify(normalize(left)) === JSON.stringify(normalize(right));
  }

  public override applyCollectionHistorySnapshot(
    openLibrary: OpenLibrary,
    expected: readonly CollectionHistorySnapshot[],
    restore: readonly CollectionHistorySnapshot[],
    expectedMemberships: readonly CollectionMembershipHistorySnapshot[],
    restoreMemberships: readonly CollectionMembershipHistorySnapshot[],
  ): void {
    const affectedIds = [...new Set([...expected, ...restore].map((item) => item.collectionId))];
    const current = affectedIds.length === 0
      ? []
      : this.getCollectionHistorySnapshot({ libraryId: openLibrary.summary.libraryId, collectionIds: affectedIds, allowMissing: true });
    const currentMemberships = this.getCollectionMembershipHistorySnapshot({
      libraryId: openLibrary.summary.libraryId,
      collectionIds: affectedIds,
    });
    if (!this.collectionHistoryRowsEqual(current, expected)
      || !this.collectionMembershipHistoryRowsEqual(currentMemberships, expectedMemberships)) {
      throw new LibraryServiceError('VERSION_CONFLICT');
    }

    const restoreIds = new Set(restore.map((item) => item.collectionId));
    openLibrary.connection.transaction(() => {
      // Delete deepest rows first so foreign keys and ON DELETE CASCADE do not
      // leave a parent snapshot partially restored.
      for (const item of [...current].sort((left, right) => right.collectionId.localeCompare(left.collectionId))) {
        if (!restoreIds.has(item.collectionId)) {
          openLibrary.connection.prepare('DELETE FROM collections WHERE collection_id = ? AND library_id = ?')
            .run(item.collectionId, openLibrary.summary.libraryId);
        }
      }
      const pending = [...restore];
      while (pending.length > 0) {
        const index = pending.findIndex((item) => item.parentId === null || restoreIds.has(item.parentId));
        if (index < 0) throw new LibraryServiceError('FOLDER_NOT_FOUND');
        const [item] = pending.splice(index, 1);
        if (!item) throw new LibraryServiceError('LIBRARY_CORRUPT');
        openLibrary.connection.prepare(
          `INSERT INTO collections
             (collection_id, library_id, parent_id, name, description, cover_asset_id, position, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(collection_id) DO UPDATE SET
             library_id = excluded.library_id,
             parent_id = excluded.parent_id,
             name = excluded.name,
             description = excluded.description,
             cover_asset_id = excluded.cover_asset_id,
             position = excluded.position,
             updated_at = excluded.updated_at`,
        ).run(
          item.collectionId,
          item.libraryId,
          item.parentId,
          item.name,
          item.description,
          item.coverAssetId,
          item.position,
          new Date().toISOString(),
          new Date().toISOString(),
        );
      }
      if (affectedIds.length > 0) {
        sqliteRunInChunks({
          connection: openLibrary.connection,
          values: affectedIds,
          buildSql: (placeholders) =>
            `DELETE FROM collection_assets WHERE collection_id IN (${placeholders})`,
        });
      }
      const insertMembership = openLibrary.connection.prepare(
        'INSERT INTO collection_assets (collection_id, asset_id, position) VALUES (?, ?, ?)',
      );
      for (const item of restoreMemberships) insertMembership.run(item.collectionId, item.assetId, item.position);
    })();
  }

  override recordCollectionSnapshotHistory(input: {
    after: readonly CollectionHistorySnapshot[];
    before: readonly CollectionHistorySnapshot[];
    afterMemberships?: readonly CollectionMembershipHistorySnapshot[];
    beforeMemberships?: readonly CollectionMembershipHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt {
    const afterMemberships = input.afterMemberships ?? [];
    const beforeMemberships = input.beforeMemberships ?? [];
    const recipe = (expected: readonly CollectionHistorySnapshot[], restore: readonly CollectionHistorySnapshot[], expectedMemberships: readonly CollectionMembershipHistorySnapshot[], restoreMemberships: readonly CollectionMembershipHistorySnapshot[]): HistoryRecipe => ({
      kind: 'collection-snapshot',
      version: 1,
      payload: { expected, restore, expectedMemberships, restoreMemberships },
    });
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: input.commandId,
      labelKey: input.labelKey,
      labelArgs: { count: input.affectedCount },
      affectedCount: input.affectedCount,
      affectedEntities: input.after.map((item) => item.collectionId),
      forwardRecipe: recipe(input.before, input.after, beforeMemberships, afterMemberships),
      inverseRecipe: recipe(input.after, input.before, afterMemberships, beforeMemberships),
    });
  }

  override getSmartCollectionHistorySnapshot(input: {
    collectionIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): SmartCollectionHistorySnapshot[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const ids = [...new Set(input.collectionIds)];
    if (ids.length === 0) return [];
    const rows = sqliteAllInChunks<string, {
      collection_id: string;
      library_id: string;
      name: string;
      query_definition_json: string;
      position: number;
    }>({
      connection: openLibrary.connection,
      values: ids,
      buildSql: (placeholders) =>
        `SELECT collection_id, library_id, name, query_definition_json, position
           FROM smart_collections
          WHERE library_id = ? AND collection_id IN (${placeholders})`,
      bind: (chunk) => [input.libraryId, ...chunk],
    });
    if (rows.length !== ids.length && !input.allowMissing) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    return rows.map((row) => ({
      collectionId: row.collection_id,
      libraryId: row.library_id,
      name: row.name,
      queryDefinitionJson: row.query_definition_json,
      position: row.position,
    }));
  }

  public override assertSmartCollectionHistorySnapshots(value: unknown): SmartCollectionHistorySnapshot[] {
    if (!Array.isArray(value)) throw new LibraryServiceError('LIBRARY_CORRUPT');
    return value.map((item) => {
      if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
      const candidate = item as Partial<SmartCollectionHistorySnapshot>;
      if (
        typeof candidate.collectionId !== 'string'
        || typeof candidate.libraryId !== 'string'
        || typeof candidate.name !== 'string'
        || typeof candidate.queryDefinitionJson !== 'string'
        || !Number.isInteger(candidate.position)
      ) throw new LibraryServiceError('LIBRARY_CORRUPT');
      return candidate as SmartCollectionHistorySnapshot;
    });
  }

  public override applySmartCollectionHistorySnapshot(
    openLibrary: OpenLibrary,
    expected: readonly SmartCollectionHistorySnapshot[],
    restore: readonly SmartCollectionHistorySnapshot[],
  ): void {
    const ids = [...new Set([...expected, ...restore].map((item) => item.collectionId))];
    const current = ids.length === 0 ? [] : this.getSmartCollectionHistorySnapshot({
      libraryId: openLibrary.summary.libraryId,
      collectionIds: ids,
      allowMissing: true,
    });
    const normalized = (items: readonly SmartCollectionHistorySnapshot[]) => items
      .map((item) => JSON.stringify(item)).sort();
    if (JSON.stringify(normalized(current)) !== JSON.stringify(normalized(expected))) {
      throw new LibraryServiceError('VERSION_CONFLICT');
    }
    const restoreIds = new Set(restore.map((item) => item.collectionId));
    openLibrary.connection.transaction(() => {
      for (const item of current) {
        if (!restoreIds.has(item.collectionId)) {
          openLibrary.connection.prepare('DELETE FROM smart_collections WHERE collection_id = ? AND library_id = ?')
            .run(item.collectionId, openLibrary.summary.libraryId);
        }
      }
      for (const item of restore) {
        openLibrary.connection.prepare(
          `INSERT INTO smart_collections
             (collection_id, library_id, name, query_definition_json, position, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(collection_id) DO UPDATE SET
             library_id = excluded.library_id,
             name = excluded.name,
             query_definition_json = excluded.query_definition_json,
             position = excluded.position,
             updated_at = excluded.updated_at`,
        ).run(
          item.collectionId,
          item.libraryId,
          item.name,
          item.queryDefinitionJson,
          item.position,
          new Date().toISOString(),
          new Date().toISOString(),
        );
      }
    })();
  }

  override recordSmartCollectionSnapshotHistory(input: {
    after: readonly SmartCollectionHistorySnapshot[];
    before: readonly SmartCollectionHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt {
    const recipe = (expected: readonly SmartCollectionHistorySnapshot[], restore: readonly SmartCollectionHistorySnapshot[]): HistoryRecipe => ({
      kind: 'smart-collection-snapshot',
      version: 1,
      payload: { expected, restore },
    });
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: input.commandId,
      labelKey: input.labelKey,
      labelArgs: { count: input.affectedCount },
      affectedCount: input.affectedCount,
      affectedEntities: input.after.map((item) => item.collectionId),
      forwardRecipe: recipe(input.before, input.after),
      inverseRecipe: recipe(input.after, input.before),
    });
  }

  override getTagHistorySnapshot(input: {
    tagIds: readonly string[];
    libraryId: string;
    allowMissing?: boolean;
  }): TagHistorySnapshot[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const ids = [...new Set(input.tagIds)];
    if (ids.length === 0) return [];
    const rows = sqliteAllInChunks<string, { tag_id: string; library_id: string; name: string }>({
      connection: openLibrary.connection,
      values: ids,
      buildSql: (placeholders) =>
        `SELECT tag_id, library_id, name FROM tags
          WHERE library_id = ? AND tag_id IN (${placeholders})`,
      bind: (chunk) => [input.libraryId, ...chunk],
    });
    if (rows.length !== ids.length && !input.allowMissing) throw new LibraryServiceError('FOLDER_NOT_FOUND');
    const relations = sqliteAllInChunks<string, { asset_id: string; tag_id: string }>({
      connection: openLibrary.connection,
      values: ids,
      buildSql: (placeholders) =>
        `SELECT asset_id, tag_id FROM human_asset_tags
          WHERE tag_id IN (${placeholders})`,
    });
    return rows.map((row) => ({
      tagId: row.tag_id,
      libraryId: row.library_id,
      name: row.name,
      humanRelations: relations
        .filter((relation) => relation.tag_id === row.tag_id)
        .map((relation) => ({ assetId: relation.asset_id, tagId: relation.tag_id })),
    }));
  }

  public override assertTagHistorySnapshots(value: unknown): TagHistorySnapshot[] {
    if (!Array.isArray(value)) throw new LibraryServiceError('LIBRARY_CORRUPT');
    return value.map((item) => {
      if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
      const candidate = item as Partial<TagHistorySnapshot>;
      if (
        typeof candidate.tagId !== 'string'
        || typeof candidate.libraryId !== 'string'
        || typeof candidate.name !== 'string'
        || !Array.isArray(candidate.humanRelations)
      ) throw new LibraryServiceError('LIBRARY_CORRUPT');
      return {
        tagId: candidate.tagId,
        libraryId: candidate.libraryId,
        name: candidate.name,
        humanRelations: this.assertHistoryRelations(candidate.humanRelations),
      };
    });
  }

  public override applyTagHistorySnapshot(
    openLibrary: OpenLibrary,
    expected: readonly TagHistorySnapshot[],
    restore: readonly TagHistorySnapshot[],
  ): void {
    const ids = [...new Set([...expected, ...restore].map((item) => item.tagId))];
    const current = ids.length === 0 ? [] : this.getTagHistorySnapshot({
      libraryId: openLibrary.summary.libraryId,
      tagIds: ids,
      allowMissing: true,
    });
    const normalized = (items: readonly TagHistorySnapshot[]) => items
      .map((item) => JSON.stringify({ ...item, humanRelations: [...item.humanRelations].sort((a, b) => `${a.assetId}:${a.tagId}`.localeCompare(`${b.assetId}:${b.tagId}`)) }))
      .sort();
    if (JSON.stringify(normalized(current)) !== JSON.stringify(normalized(expected))) {
      throw new LibraryServiceError('VERSION_CONFLICT');
    }
    const restoreIds = new Set(restore.map((item) => item.tagId));
    openLibrary.connection.transaction(() => {
      for (const item of current) {
        if (!restoreIds.has(item.tagId)) {
          openLibrary.connection.prepare('DELETE FROM tags WHERE tag_id = ? AND library_id = ?')
            .run(item.tagId, openLibrary.summary.libraryId);
        }
      }
      for (const item of restore) {
        openLibrary.connection.prepare(
          `INSERT INTO tags (tag_id, library_id, name, created_at)
           VALUES (?, ?, ?, ?)
           ON CONFLICT(tag_id) DO UPDATE SET library_id = excluded.library_id, name = excluded.name`,
        ).run(item.tagId, item.libraryId, item.name, new Date().toISOString());
        openLibrary.connection.prepare('DELETE FROM human_asset_tags WHERE tag_id = ?').run(item.tagId);
        const insertRelation = openLibrary.connection.prepare(
          'INSERT INTO human_asset_tags (asset_id, tag_id) VALUES (?, ?)',
        );
        for (const relation of item.humanRelations) insertRelation.run(relation.assetId, relation.tagId);
      }
    })();
    for (const item of [...expected, ...restore]) {
      for (const relation of item.humanRelations) this.syncAssetSearchContent(openLibrary.connection, relation.assetId);
    }
  }

  override recordTagSnapshotHistory(input: {
    after: readonly TagHistorySnapshot[];
    before: readonly TagHistorySnapshot[];
    commandId: string;
    libraryId: string;
    labelKey: string;
    affectedCount: number;
    source?: HistorySource;
    sourceReference?: string | null;
  }): HistoryOperationReceipt {
    const recipe = (expected: readonly TagHistorySnapshot[], restore: readonly TagHistorySnapshot[]): HistoryRecipe => ({
      kind: 'tag-snapshot',
      version: 1,
      payload: { expected, restore },
    });
    return this.recordOperationHistory({
      libraryId: input.libraryId,
      source: input.source,
      sourceReference: input.sourceReference,
      commandId: input.commandId,
      labelKey: input.labelKey,
      labelArgs: { count: input.affectedCount },
      affectedCount: input.affectedCount,
      affectedEntities: input.after.map((item) => item.tagId),
      forwardRecipe: recipe(input.before, input.after),
      inverseRecipe: recipe(input.after, input.before),
    });
  }

  public override historyRecipeFromRow(
    row: OperationHistoryStepRow,
    direction: HistoryDirection,
  ): HistoryRecipe {
    try {
      const parsed: unknown = JSON.parse(
        direction === 'undo' ? row.inverse_payload_json : row.forward_payload_json,
      );
      const recipe = historyRecipeSchema.parse(parsed);
      assertRegisteredHistoryRecipe(recipe);
      return recipe;
    } catch (error) {
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
  }

  public override historyTransitionErrorCode(error: unknown): string | null {
    if (error instanceof LibraryServiceError) {
      return error.code === 'ASSET_MOVE_CONFLICT'
        || error.code === 'FOLDER_NAME_CONFLICT'
        || error.code === 'ASSET_NOT_FOUND'
        || error.code === 'VERSION_CONFLICT'
        ? error.code
        : null;
    }
    return null;
  }

  /**
   * File/folder transitions allocate a fresh durable journal/tombstone id on
   * every replay.  Persist the newly allocated counterpart on the opposite
   * side of the step; otherwise a second undo after redo would point at a
   * consumed operation from the original forward commit.
   */
  public override historyCounterpartRecipe(
    recipe: HistoryRecipe,
    operationId: string,
    direction: HistoryDirection,
  ): HistoryRecipe | null {
    // A fresh file-operation/tombstone identifier is only a counterpart for
    // the direction that just executed.  In particular, undoing an
    // asset-restore runs `asset-trash`; that new trash operation must not
    // replace the original `asset-restore` forward recipe.  The original
    // asset IDs are enough to find the newly-created tombstone on redo.
    if (direction === 'undo') {
      return recipe.kind === 'managed-folder-trash'
        ? { kind: 'managed-folder-restore', version: 1, payload: { tombstoneId: operationId } }
        : null;
    }

    const kind = recipe.kind === 'managed-asset-move' || recipe.kind === 'managed-asset-move-undo'
      ? 'managed-asset-move-undo'
      : recipe.kind === 'managed-asset-copy' || recipe.kind === 'managed-asset-copy-undo'
        ? 'managed-asset-copy-undo'
        : recipe.kind === 'asset-trash' || recipe.kind === 'asset-trash-undo'
          ? 'asset-trash-undo'
          : recipe.kind === 'managed-folder-trash' || recipe.kind === 'managed-folder-restore'
            ? 'managed-folder-restore'
            : null;
    return kind === null
      ? null
      : { kind, version: 1, payload: kind === 'managed-folder-restore'
        ? { tombstoneId: operationId }
        : { operationId } };
  }

  public override withHistoryReplay<T>(operation: () => T): T {
    this.historyReplayDepth += 1;
    try {
      return operation();
    } finally {
      this.historyReplayDepth -= 1;
    }
  }

  public override executeHistoryRecipe(
    openLibrary: OpenLibrary,
    recipe: HistoryRecipe,
  ): { affectedCount: number; operationId?: string } {
    const payload = recipe.payload;
    switch (recipe.kind) {
      case 'managed-asset-move': {
        const result = this.withHistoryReplay(() => this.moveAssets({
          libraryId: openLibrary.summary.libraryId,
          assetIds: payload.assetIds as string[],
          targetFolderId: payload.targetFolderId as string | null,
          conflictStrategy: payload.conflictStrategy as 'keep-both' | 'replace' | 'skip' | undefined,
        }));
        return { affectedCount: result.movedCount, operationId: result.operationId ?? undefined };
      }
      case 'managed-asset-move-undo': {
        const result = this.withHistoryReplay(() => this.undoMoveAssets({
          libraryId: openLibrary.summary.libraryId,
          operationId: payload.operationId as string,
          conflictStrategy: payload.conflictStrategy as 'error' | 'keep-both' | 'replace' | 'skip' | undefined,
        }));
        return { affectedCount: result.undoneCount };
      }
      case 'managed-asset-copy': {
        const result = this.withHistoryReplay(() => this.copyAssets({
          libraryId: openLibrary.summary.libraryId,
          assetIds: payload.assetIds as string[],
          outputAssetIds: Array.isArray(payload.outputAssetIds)
            ? payload.outputAssetIds as Array<{ sourceAssetId: string; newAssetId: string }>
            : undefined,
          targetFolderId: payload.targetFolderId as string | null,
          conflictStrategy: payload.conflictStrategy as 'keep-both' | 'replace' | 'skip' | undefined,
        }));
        return { affectedCount: result.copiedCount, operationId: result.operationId ?? undefined };
      }
      case 'managed-asset-copy-undo': {
        const result = this.withHistoryReplay(() => this.undoCopyAssets({
          libraryId: openLibrary.summary.libraryId,
          operationId: payload.operationId as string,
          conflictStrategy: payload.conflictStrategy as 'error' | 'keep-both' | 'replace' | 'skip' | undefined,
        }));
        return { affectedCount: result.undoneCount };
      }
      case 'asset-trash': {
        const result = this.withHistoryReplay(() => this.trashAssets({
          libraryId: openLibrary.summary.libraryId,
          assetIds: payload.assetIds as string[],
        }));
        return { affectedCount: result.trashedCount, operationId: result.operationId ?? undefined };
      }
      case 'asset-trash-undo': {
        const result = this.withHistoryReplay(() => this.undoTrashAssets({
          libraryId: openLibrary.summary.libraryId,
          operationId: payload.operationId as string,
          requireAll: true,
        }));
        return { affectedCount: result.restoredCount };
      }
      case 'asset-restore': {
        if (!Array.isArray(payload.assetIds) || payload.assetIds.some((assetId) => typeof assetId !== 'string')) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const result = this.withHistoryReplay(() => this.restoreAssets({
          libraryId: openLibrary.summary.libraryId,
          assetIds: payload.assetIds as string[],
          targetFolderId: typeof payload.targetFolderId === 'string' || payload.targetFolderId === null
            ? payload.targetFolderId
            : undefined,
          conflictStrategy: payload.conflictStrategy === 'keep-both'
            || payload.conflictStrategy === 'replace'
            || payload.conflictStrategy === 'skip'
            ? payload.conflictStrategy
            : undefined,
        }));
        return { affectedCount: result.restoredCount, operationId: result.operationId };
      }
      case 'asset-rename': {
        if (Array.isArray(payload.items)) {
          let renamedCount = 0;
          for (const item of payload.items) {
            if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
            const candidate = item as { assetId?: unknown; newBaseName?: unknown };
            if (typeof candidate.assetId !== 'string' || typeof candidate.newBaseName !== 'string') {
              throw new LibraryServiceError('LIBRARY_CORRUPT');
            }
            const assetId = candidate.assetId;
            const newBaseName = candidate.newBaseName;
            if (typeof (item as { expectedBaseName?: unknown }).expectedBaseName === 'string'
              && this.getAssetFileBaseName({
                libraryId: openLibrary.summary.libraryId,
                assetId,
              }) !== (item as { expectedBaseName: string }).expectedBaseName) {
              throw new LibraryServiceError('VERSION_CONFLICT');
            }
            this.withHistoryReplay(() => this.renameAssetFile({
              libraryId: openLibrary.summary.libraryId,
              assetId,
              newBaseName,
            }));
            renamedCount += 1;
          }
          return { affectedCount: renamedCount };
        }
        if (typeof payload.assetId !== 'string'
          || (typeof payload.newBaseName !== 'string'
            && typeof payload.newFileName !== 'string')) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const assetId = payload.assetId;
        const result = typeof payload.newFileName === 'string'
          ? (() => {
            const newFileName = payload.newFileName as string;
            if (typeof payload.expectedFileName === 'string'
              && this.getAssetFileName({
                libraryId: openLibrary.summary.libraryId,
                assetId,
              }) !== payload.expectedFileName) {
              throw new LibraryServiceError('VERSION_CONFLICT');
            }
            return this.withHistoryReplay(() => this.renameAssetFile({
              libraryId: openLibrary.summary.libraryId,
              assetId,
              newFileName,
            }));
          })()
          : (() => {
            const newBaseName = payload.newBaseName as string;
            if (typeof payload.expectedBaseName === 'string'
              && this.getAssetFileBaseName({
                libraryId: openLibrary.summary.libraryId,
                assetId,
              }) !== payload.expectedBaseName) {
              throw new LibraryServiceError('VERSION_CONFLICT');
            }
            return this.withHistoryReplay(() => this.renameAssetFile({
              libraryId: openLibrary.summary.libraryId,
              assetId,
              newBaseName,
            }));
          })();
        return { affectedCount: result.asset ? 1 : 0 };
      }
      case 'asset-metadata-snapshot': {
        const expected = this.assertMetadataHistorySnapshot(payload.expected);
        const restore = this.assertMetadataHistorySnapshot(payload.restore);
        this.applyAssetMetadataHistorySnapshot(openLibrary, expected, restore);
        return { affectedCount: 1 };
      }
      case 'asset-metadata-batch-snapshot': {
        if (!Array.isArray(payload.expected) || !Array.isArray(payload.restore)) {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const expected = payload.expected.map((item) => this.assertMetadataHistorySnapshot(item));
        const restore = payload.restore.map((item) => this.assertMetadataHistorySnapshot(item));
        if (expected.length !== restore.length) throw new LibraryServiceError('LIBRARY_CORRUPT');
        for (let index = 0; index < expected.length; index += 1) {
          this.applyAssetMetadataHistorySnapshot(openLibrary, expected[index]!, restore[index]!);
        }
        return { affectedCount: expected.length };
      }
      case 'tag-assign': {
        const result = this.withHistoryReplay(() => this.assignTags({
          libraryId: openLibrary.summary.libraryId,
          assetIds: payload.assetIds as string[],
          tagIds: payload.tagIds as string[],
        }));
        return { affectedCount: result.assignedCount };
      }
      case 'tag-remove': {
        const result = this.withHistoryReplay(() => this.removeTags({
          libraryId: openLibrary.summary.libraryId,
          assetIds: payload.assetIds as string[],
          tagIds: payload.tagIds as string[],
        }));
        return { affectedCount: result.removedCount };
      }
      case 'tag-relations-add': {
        const relations = this.assertHistoryRelations(payload.relations);
        this.applyTagRelations(openLibrary, relations, 'add', typeof payload.expectedPresent === 'boolean' ? payload.expectedPresent : undefined);
        return { affectedCount: relations.length };
      }
      case 'tag-relations-remove': {
        const relations = this.assertHistoryRelations(payload.relations);
        this.applyTagRelations(openLibrary, relations, 'remove', typeof payload.expectedPresent === 'boolean' ? payload.expectedPresent : undefined);
        return { affectedCount: relations.length };
      }
      case 'collection-assets-add': {
        this.assertCollectionMembershipPrecondition(openLibrary, payload);
        this.withHistoryReplay(() => this.addCollectionAssets({
          libraryId: openLibrary.summary.libraryId,
          collectionId: payload.collectionId as string,
          assetIds: payload.assetIds as string[],
        }));
        return { affectedCount: (payload.assetIds as string[]).length };
      }
      case 'collection-assets-remove': {
        this.assertCollectionMembershipPrecondition(openLibrary, payload);
        this.withHistoryReplay(() => this.removeCollectionAssets({
          libraryId: openLibrary.summary.libraryId,
          collectionId: payload.collectionId as string,
          assetIds: payload.assetIds as string[],
        }));
        return { affectedCount: (payload.assetIds as string[]).length };
      }
      case 'managed-folder-snapshot': {
        const expected = this.assertManagedFolderHistorySnapshots(payload.expected);
        const restore = this.assertManagedFolderHistorySnapshots(payload.restore);
        const current = this.getManagedFolderHistorySnapshot({
          libraryId: openLibrary.summary.libraryId,
          folderIds: [...new Set([...expected, ...restore].map((item) => item.folderId))],
          allowMissing: true,
        });
        const normalize = (items: readonly ManagedFolderHistorySnapshot[]) => items
          .map((item) => JSON.stringify(item)).sort();
        if (JSON.stringify(normalize(current)) !== JSON.stringify(normalize(expected))) {
          throw new LibraryServiceError('VERSION_CONFLICT');
        }
        const expectedIds = new Set(expected.map((item) => item.folderId));
        const restoreIds = new Set(restore.map((item) => item.folderId));
        for (const item of expected
          .filter((candidate) => !restoreIds.has(candidate.folderId))
          .sort((left, right) => right.relativePath.length - left.relativePath.length)) {
          this.applyManagedFolderDeleteHistorySnapshot(openLibrary, [item]);
        }
        for (const item of restore
          .filter((candidate) => !expectedIds.has(candidate.folderId))
          .sort((left, right) => left.relativePath.length - right.relativePath.length)) {
          this.applyManagedFolderCreateHistorySnapshot(openLibrary, item);
        }
        return { affectedCount: restore.length };
      }
      case 'managed-folder-rename': {
        if (typeof payload.folderId !== 'string' || typeof payload.newName !== 'string') {
          throw new LibraryServiceError('LIBRARY_CORRUPT');
        }
        const folderId = payload.folderId;
        const newName = payload.newName;
        if (typeof payload.expectedName === 'string') {
          const current = this.getManagedFolderHistorySnapshot({
            libraryId: openLibrary.summary.libraryId,
            folderIds: [folderId],
          }).find((item) => item.folderId === folderId);
          if (!current || current.name !== payload.expectedName) {
            throw new LibraryServiceError('VERSION_CONFLICT');
          }
        }
        const folder = this.withHistoryReplay(() => this.renameManagedFolder({
          libraryId: openLibrary.summary.libraryId,
          folderId,
          newName,
        }));
        return { affectedCount: folder.folderId ? 1 : 0 };
      }
      case 'managed-folder-move': {
        if (!Array.isArray(payload.moves)) throw new LibraryServiceError('LIBRARY_CORRUPT');
        let movedCount = 0;
        for (const item of payload.moves) {
          if (typeof item !== 'object' || item === null) throw new LibraryServiceError('LIBRARY_CORRUPT');
          const move = item as {
            folderId?: unknown;
            expectedName?: unknown;
            expectedParentFolderId?: unknown;
            targetParentFolderId?: unknown;
            targetName?: unknown;
          };
          if (
            typeof move.folderId !== 'string'
            || (move.targetParentFolderId !== null && typeof move.targetParentFolderId !== 'string')
            || typeof move.targetName !== 'string'
          ) throw new LibraryServiceError('LIBRARY_CORRUPT');
          const folderId = move.folderId;
          const targetName = move.targetName;
          if (typeof move.expectedName === 'string' || move.expectedParentFolderId === null || typeof move.expectedParentFolderId === 'string') {
            const current = this.getManagedFolderHistorySnapshot({
              libraryId: openLibrary.summary.libraryId,
              folderIds: [folderId],
            }).find((item) => item.folderId === folderId);
            if (!current
              || (typeof move.expectedName === 'string' && current.name !== move.expectedName)
              || ((move.expectedParentFolderId === null || typeof move.expectedParentFolderId === 'string')
                && current.parentFolderId !== move.expectedParentFolderId)) {
              throw new LibraryServiceError('VERSION_CONFLICT');
            }
          }
          const result = this.withHistoryReplay(() => this.moveManagedFolders({
            libraryId: openLibrary.summary.libraryId,
            folderIds: [folderId],
            targetParentFolderId: move.targetParentFolderId as string | null,
            conflictStrategy: 'skip',
          }));
          if (result.movedCount === 0) throw new LibraryServiceError('FOLDER_NAME_CONFLICT');
          const moved = result.folders[0];
          if (!moved) throw new LibraryServiceError('FOLDER_NOT_FOUND');
          if (moved.name !== move.targetName) {
            this.withHistoryReplay(() => this.renameManagedFolder({
              libraryId: openLibrary.summary.libraryId,
              folderId,
              newName: targetName,
            }));
          }
          movedCount += 1;
        }
        return { affectedCount: movedCount };
      }
      case 'managed-folder-trash': {
        if (typeof payload.folderId !== 'string') throw new LibraryServiceError('LIBRARY_CORRUPT');
        const folderId = payload.folderId;
        const result = this.withHistoryReplay(() => this.trashManagedFolder({
          libraryId: openLibrary.summary.libraryId,
          folderId,
        }));
        return {
          affectedCount: result.removedFolderCount,
          operationId: result.rootTombstoneId,
        };
      }
      case 'managed-folder-restore': {
        if (typeof payload.tombstoneId !== 'string') throw new LibraryServiceError('LIBRARY_CORRUPT');
        const tombstoneId = payload.tombstoneId;
        const result = this.withHistoryReplay(() => this.restoreTrashedManagedFolder({
          libraryId: openLibrary.summary.libraryId,
          tombstoneId,
        }));
        return { affectedCount: result.restoredFolderCount };
      }
      case 'collection-snapshot': {
        const expected = this.assertCollectionHistorySnapshots(payload.expected);
        const restore = this.assertCollectionHistorySnapshots(payload.restore);
        const expectedMemberships = this.assertCollectionMembershipHistorySnapshots(payload.expectedMemberships);
        const restoreMemberships = this.assertCollectionMembershipHistorySnapshots(payload.restoreMemberships);
        this.applyCollectionHistorySnapshot(
          openLibrary,
          expected,
          restore,
          expectedMemberships,
          restoreMemberships,
        );
        return { affectedCount: restore.length };
      }
      case 'smart-collection-snapshot': {
        const expected = this.assertSmartCollectionHistorySnapshots(payload.expected);
        const restore = this.assertSmartCollectionHistorySnapshots(payload.restore);
        this.applySmartCollectionHistorySnapshot(openLibrary, expected, restore);
        return { affectedCount: restore.length };
      }
      case 'tag-snapshot': {
        const expected = this.assertTagHistorySnapshots(payload.expected);
        const restore = this.assertTagHistorySnapshots(payload.restore);
        this.applyTagHistorySnapshot(openLibrary, expected, restore);
        return { affectedCount: restore.length };
      }
      case 'history-barrier':
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      default:
        throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
  }

  public override transitionOperationHistory(
    libraryId: string,
    direction: HistoryDirection,
    expectedHistoryEntryId: string,
  ): OperationHistoryTransitionResult {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const entries = this.operationHistoryEntries(openLibrary);
    if (entries.some((entry) => entry.state === 'undoing' || entry.state === 'redoing')) {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE');
    }
    const machine = new OperationHistoryStateMachine(entries);
    if (machine.isCompleted(direction, expectedHistoryEntryId)) {
      return {
        historyEntryId: expectedHistoryEntryId,
        direction,
        affectedCount: 0,
        status: this.getOperationHistoryStatus(libraryId),
      };
    }
    const started = machine.begin(direction, expectedHistoryEntryId);
    const now = new Date().toISOString();
    const attemptId = randomUUID();
    const steps = openLibrary.connection.prepare(
      `SELECT history_step_id, history_entry_id, ordinal, command_id, recipe_kind,
              recipe_version, forward_payload_json, inverse_payload_json,
              affected_entities_json, current_direction
         FROM operation_history_steps
        WHERE history_entry_id = ?
        ORDER BY ordinal`,
    ).all(expectedHistoryEntryId) as OperationHistoryStepRow[];
    if (steps.length === 0) throw new LibraryServiceError('LIBRARY_CORRUPT');
    openLibrary.connection.transaction(() => {
      openLibrary.connection.prepare(
        `INSERT INTO operation_history_attempts
           (attempt_id, history_entry_id, direction, status, next_step_ordinal,
            error_code, created_at, updated_at)
         VALUES (?, ?, ?, 'preparing', 0, NULL, ?, ?)`,
      ).run(attemptId, expectedHistoryEntryId, direction, now, now);
      openLibrary.connection.prepare(
        'UPDATE operation_history SET state = ?, updated_at = ? WHERE history_entry_id = ?',
      ).run(started.state, now, expectedHistoryEntryId);
      openLibrary.connection.prepare(
        "UPDATE operation_history_attempts SET status = 'applying', updated_at = ? WHERE attempt_id = ?",
      ).run(now, attemptId);
    })();

    try {
      const orderedSteps = direction === 'undo' ? [...steps].reverse() : steps;
      let affectedCount = 0;
      for (const [index, step] of orderedSteps.entries()) {
        const recipe = this.historyRecipeFromRow(step, direction);
        const executed = this.executeHistoryRecipe(openLibrary, recipe);
        affectedCount += executed.affectedCount;
        const counterpart = executed.operationId
          ? this.historyCounterpartRecipe(recipe, executed.operationId, direction)
          : null;
        const nowForStep = new Date().toISOString();
        openLibrary.connection.transaction(() => {
          if (counterpart) {
            const column = direction === 'undo' ? 'forward_payload_json' : 'inverse_payload_json';
            openLibrary.connection.prepare(
              `UPDATE operation_history_steps
                  SET ${column} = ?, current_direction = ?
                WHERE history_step_id = ?`,
            ).run(
              JSON.stringify(counterpart),
              direction === 'undo' ? 'inverse' : 'forward',
              step.history_step_id,
            );
          } else {
            openLibrary.connection.prepare(
              'UPDATE operation_history_steps SET current_direction = ? WHERE history_step_id = ?',
            ).run(direction === 'undo' ? 'inverse' : 'forward', step.history_step_id);
          }
          openLibrary.connection.prepare(
            'UPDATE operation_history_attempts SET next_step_ordinal = ?, updated_at = ? WHERE attempt_id = ?',
          ).run(index + 1, nowForStep, attemptId);
        })();
      }
      const stableState = direction === 'undo' ? 'undone' : 'applied';
      const updatedAt = new Date().toISOString();
      openLibrary.connection.transaction(() => {
        const redoSequence = direction === 'undo'
          ? ((openLibrary.connection
            .prepare('SELECT COALESCE(MAX(redo_sequence), 0) AS sequence FROM operation_history')
            .get() as { sequence: number }).sequence + 1)
          : 0;
        openLibrary.connection.prepare(
          `UPDATE operation_history
              SET state = ?, redo_sequence = ?, updated_at = ?, stale_code = NULL
            WHERE history_entry_id = ?`,
        ).run(stableState, redoSequence, updatedAt, expectedHistoryEntryId);
        openLibrary.connection.prepare(
          "UPDATE operation_history_attempts SET status = 'committed', next_step_ordinal = ?, updated_at = ? WHERE attempt_id = ?",
        ).run(steps.length, updatedAt, attemptId);
      })();
      return {
          historyEntryId: expectedHistoryEntryId,
          direction,
          affectedCount,
          status: this.getOperationHistoryStatus(libraryId),
        };
    } catch (error) {
      // A recipe can touch both SQLite and the managed file tree.  Without a
      // durable compensation pass we cannot prove that an unexpected error
      // left every step untouched, so never advertise the entry as safely
      // reversible again.  Known precondition conflicts retain their precise
      // code; unknown failures are conservatively surfaced as stale.
      const staleCode = this.historyTransitionErrorCode(error) ?? 'HISTORY_TRANSITION_FAILED';
      const failedState = 'stale';
      const updatedAt = new Date().toISOString();
      try {
          openLibrary.connection.transaction(() => {
            openLibrary.connection.prepare(
              `UPDATE operation_history
                  SET state = ?, redo_sequence = 0, stale_code = ?, updated_at = ?
                WHERE history_entry_id = ?`,
            ).run(failedState, staleCode, updatedAt, expectedHistoryEntryId);
          openLibrary.connection.prepare(
            "UPDATE operation_history_attempts SET status = 'failed', error_code = ?, updated_at = ? WHERE attempt_id = ?",
          ).run(staleCode ?? 'HISTORY_TRANSITION_FAILED', updatedAt, attemptId);
        })();
      } catch (recoveryError) {
        this.diagnose('operation-history.transition-finalize', recoveryError, {
          libraryId,
          historyEntryId: expectedHistoryEntryId,
          direction,
        });
      }
      if (error instanceof HistoryTransitionError) throw error;
      throw new HistoryTransitionError(
        'The history entry became stale while Serpent was applying the transition.',
        'HISTORY_STALE',
      );
    }
  }

  public override async transitionOperationHistoryWithLease(
    input: { libraryId: string; expectedHistoryEntryId: string },
    direction: HistoryDirection,
  ): Promise<OperationHistoryTransitionResult> {
    const lease = await this.acquireWriteLease(input.libraryId);
    try {
      return this.transitionOperationHistory(input.libraryId, direction, input.expectedHistoryEntryId);
    } finally {
      try {
        lease.release();
      } catch (error) {
        this.diagnose('operation-history.lease-release', error, {
          libraryId: input.libraryId,
          direction,
        });
      }
    }
  }

  override undoOperationHistory(input: { libraryId: string; expectedHistoryEntryId: string }): Promise<OperationHistoryTransitionResult> {
    return this.transitionOperationHistoryWithLease(input, 'undo');
  }

  override redoOperationHistory(input: { libraryId: string; expectedHistoryEntryId: string }): Promise<OperationHistoryTransitionResult> {
    return this.transitionOperationHistoryWithLease(input, 'redo');
  }

}
