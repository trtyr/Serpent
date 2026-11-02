/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
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
import { LibraryServiceSmartCollectionsV6 } from './LibraryServiceSmartCollectionsV6';

/** LibraryServiceTrashRelink: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceTrashRelink extends LibraryServiceSmartCollectionsV6 {

  // ── Smart Collections (v6) ──────────────────────────────────────────

  override createSmartCollection(input: {
    libraryId: string;
    name: string;
    queryDefinitionJson: string;
  }): SmartCollectionSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const trimmed = input.name.trim();
    if (trimmed.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');

    // Serpent-era: create may start as a draft with empty `{}` query; the
    // settings dialog attaches a meaningful condition afterwards. Updates that
    // change the query still assert via updateSmartCollection.
    const definition = this.parseSmartCollectionDefinition(
      input.queryDefinitionJson,
      'INVALID_SMART_COLLECTION_QUERY',
    );

    const collectionId = randomUUID();
    const now = new Date().toISOString();

    try {
      openLibrary.connection
        .prepare(
          `INSERT INTO smart_collections
             (collection_id, library_id, name, query_definition_json, position, created_at, updated_at)
           VALUES (?, ?, ?, ?, 0, ?, ?)`,
        )
        .run(
          collectionId,
          openLibrary.summary.libraryId,
          trimmed,
          input.queryDefinitionJson,
          now,
          now,
        );
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }

    return {
      collectionId,
      name: trimmed,
      queryDefinition: input.queryDefinitionJson,
      position: 0,
      assetCount: this.countSmartCollectionMatches(input.libraryId, definition),
      // Single-row return must match listSmartCollections.
      appearance: null,
    };
  }

  override listSmartCollections(libraryId: string): SmartCollectionSummary[] {
    const openLibrary = this.requireOpenLibrary(libraryId);
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the
    // smart_collections table degrade to an empty list; whitelisted columns
    // fill with defaults.
    const connection = openLibrary.connection;
    if (!hasTable(connection, 'smart_collections')) return [];
    const present = selectColumns(connection, 'smart_collections', [
      'collection_id',
      'name',
      'query_definition_json',
      'position',
      'appearance_glyph_kind',
      'appearance_glyph_value',
      'appearance_color_id',
    ]);
    if (present.length === 0) return [];
    const orderBy = present.includes('position') && present.includes('name')
      ? 'ORDER BY position, name'
      : present.includes('name')
        ? 'ORDER BY name'
        : '';
    const rows = connection
      .prepare(
        `SELECT ${present.join(', ')}
           FROM smart_collections
          WHERE library_id = ?
          ${orderBy}`,
      )
      .all(openLibrary.summary.libraryId) as Array<{
        collection_id?: string;
        name?: string;
        query_definition_json?: string;
        position?: number;
        appearance_glyph_kind?: string | null;
        appearance_glyph_value?: string | null;
        appearance_color_id?: string | null;
      }>;
    // Batch counts inside one list call so the renderer avoids N+1 execute RPCs (CU-M6).
    return rows.map((row) => {
      let assetCount: number;
      try {
        const definition = this.parseSmartCollectionDefinition(
          row.query_definition_json ?? '{}',
          'LIBRARY_CORRUPT',
        );
        assetCount = this.countSmartCollectionMatches(libraryId, definition);
      } catch {
        assetCount = 0;
      }
      return {
        collectionId: row.collection_id ?? '',
        name: row.name ?? '',
        queryDefinition: row.query_definition_json ?? '',
        position: row.position ?? 0,
        assetCount,
        appearance: sanitizeEntityAppearance({
          glyphKind: row.appearance_glyph_kind,
          glyphValue: row.appearance_glyph_value,
          colorId: row.appearance_color_id,
        }),
      };
    });
  }

  override updateSmartCollection(input: {
    libraryId: string;
    collectionId: string;
    name?: string;
    queryDefinitionJson?: string;
    position?: number;
  }): SmartCollectionSummary {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const existing = openLibrary.connection
      .prepare(
        'SELECT collection_id, name, query_definition_json, position, appearance_glyph_kind, appearance_glyph_value, appearance_color_id FROM smart_collections WHERE collection_id = ? AND library_id = ?',
      )
      .get(input.collectionId, openLibrary.summary.libraryId) as {
        collection_id: string;
        name: string;
        query_definition_json: string;
        position: number;
        appearance_glyph_kind?: string | null;
        appearance_glyph_value?: string | null;
        appearance_color_id?: string | null;
      } | undefined;
    if (!existing) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const now = new Date().toISOString();
    const newName =
      input.name !== undefined ? input.name.trim() : existing.name;
    if (newName.length === 0) throw new LibraryServiceError('INVALID_FOLDER_NAME');
    const newQueryDefinitionJson =
      input.queryDefinitionJson ?? existing.query_definition_json;
    const newPosition = input.position ?? existing.position;

    // Validate queryDefinitionJson if provided (CU-M5: require search/filter).
    let definition: SmartCollectionQueryDefinition | null = null;
    if (input.queryDefinitionJson !== undefined) {
      definition = this.parseSmartCollectionDefinition(
        input.queryDefinitionJson,
        'INVALID_SMART_COLLECTION_QUERY',
      );
      this.assertMeaningfulSmartCollectionDefinition(definition);
    }

    try {
      openLibrary.connection
        .prepare(
          `UPDATE smart_collections
              SET name = ?, query_definition_json = ?, position = ?, updated_at = ?
            WHERE collection_id = ?`,
        )
        .run(newName, newQueryDefinitionJson, newPosition, now, input.collectionId);
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'SQLITE_CONSTRAINT_UNIQUE'
      ) {
        throw new LibraryServiceError('FOLDER_ALREADY_EXISTS');
      }
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }

    let assetCount: number;
    try {
      const counted =
        definition ??
        this.parseSmartCollectionDefinition(
          newQueryDefinitionJson,
          'LIBRARY_CORRUPT',
        );
      assetCount = this.countSmartCollectionMatches(input.libraryId, counted);
    } catch {
      assetCount = 0;
    }

    return {
      collectionId: input.collectionId,
      name: newName,
      queryDefinition: newQueryDefinitionJson,
      position: newPosition,
      assetCount,
      appearance: sanitizeEntityAppearance({
        glyphKind: existing.appearance_glyph_kind,
        glyphValue: existing.appearance_glyph_value,
        colorId: existing.appearance_color_id,
      }),
    };
  }

  override deleteSmartCollection(input: {
    libraryId: string;
    collectionId: string;
  }): string {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const existing = openLibrary.connection
      .prepare(
        'SELECT collection_id FROM smart_collections WHERE collection_id = ? AND library_id = ?',
      )
      .get(input.collectionId, openLibrary.summary.libraryId);
    if (!existing) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    openLibrary.connection
      .prepare('DELETE FROM smart_collections WHERE collection_id = ?')
      .run(input.collectionId);
    return input.collectionId;
  }

  override executeSmartCollection(input: {
    libraryId: string;
    collectionId: string;
    limit?: number;
    offset?: number;
    scopeMode?: boolean | null;
    idsOnly?: boolean | null;
    layoutOnly?: boolean | null;
  }): { items: AssetSummary[]; total: number; offset: number; assetIds?: string[]; layout?: BrowseLayoutEntry[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const sc = openLibrary.connection
      .prepare(
        'SELECT collection_id, query_definition_json FROM smart_collections WHERE collection_id = ? AND library_id = ?',
      )
      .get(input.collectionId, openLibrary.summary.libraryId) as {
        collection_id: string;
        query_definition_json: string;
      } | undefined;
    if (!sc) throw new LibraryServiceError('FOLDER_NOT_FOUND');

    const definition = this.parseSmartCollectionDefinition(sc.query_definition_json, 'LIBRARY_CORRUPT');

    return this.searchAssets({
      libraryId: input.libraryId,
      query: definition.search ?? null,
      filters: definition.filters ?? null,
      sort: definition.sort ?? null,
      scopeMode: input.scopeMode ?? false,
      idsOnly: input.idsOnly ?? false,
      layoutOnly: input.layoutOnly ?? false,
      limit: input.scopeMode ? null : (input.limit ?? 50),
      offset: input.scopeMode ? 0 : (input.offset ?? 0),
    });
  }

  public override parseSmartCollectionDefinition(
    value: string,
    errorCode: 'INVALID_SMART_COLLECTION_QUERY' | 'LIBRARY_CORRUPT',
  ): SmartCollectionQueryDefinition {
    if (value.length > 65_536) throw new LibraryServiceError(errorCode);
    try {
      return smartCollectionQueryDefinitionSchema.parse(JSON.parse(value));
    } catch {
      throw new LibraryServiceError(errorCode);
    }
  }

  public override assertMeaningfulSmartCollectionDefinition(
    definition: SmartCollectionQueryDefinition,
  ): void {
    if (!hasMeaningfulSmartCollectionCondition(definition)) {
      throw new LibraryServiceError('INVALID_SMART_COLLECTION_QUERY');
    }
  }

  /** Count-only search (limit 0) for sidebar badges without fetching rows. */
  public override countSmartCollectionMatches(
    libraryId: string,
    definition: SmartCollectionQueryDefinition,
  ): number {
    return this.searchAssets({
      libraryId,
      query: definition.search ?? null,
      filters: definition.filters ?? null,
      sort: null,
      limit: 0,
      offset: 0,
    }).total;
  }

}
