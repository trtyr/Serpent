/* eslint-disable -- generated partial-class file (mechanical extraction from monolith); full import block intentional */
import type { DatabaseConnection, OpenLibrary } from '../library-service-internals';
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
import { LibraryServiceCollectionsMeta } from './LibraryServiceCollectionsMeta';
import { detectMediaType, supportsThumbnail, toSummaryMediaType } from '../library-service-internals';

/** LibraryServiceSmartCollections: extracted verbatim from the former LibraryService monolith. */
export class LibraryServiceSmartCollections extends LibraryServiceCollectionsMeta {

  // ── Asset Metadata ──────────────────────────────────────────────────

  public override resolvedPaletteFields(
    openLibrary: OpenLibrary,
    assetId: string,
  ): Pick<AssetMetadataResult, 'automaticPalette' | 'effectivePalette' | 'paletteSource'> {
    let automaticPalette: RepresentativeColor[] = [];
    // Serpent-verg.2 — lenient read (0031 §1): libraries predating the
    // artifact status column have no palette artifact to resolve.
    if (!columnsFor(openLibrary.connection, 'revision_artifacts').has('status')) {
      return { automaticPalette: [], effectivePalette: [], paletteSource: null };
    }
    const artifact = openLibrary.connection.prepare(
      `SELECT ra.artifact_id
         FROM assets a
         JOIN revision_artifacts ra ON ra.revision_id = a.current_revision_id
        WHERE a.asset_id = ?
          AND ra.kind = 'extracted_palette'
          AND ra.status = 'ready'
          AND ra.invalidated_at IS NULL
        LIMIT 1`,
    ).get(assetId) as { artifact_id: string } | undefined;
    if (artifact) {
      try {
        const parsed = JSON.parse(
          readFileSync(
            this.getArtifactAbsolutePath(openLibrary.summary.libraryId, artifact.artifact_id),
            'utf-8',
          ),
        ) as unknown;
        if (!Array.isArray(parsed)) throw new Error('Palette artifact must contain an array.');
        automaticPalette = parsed.map((entry) => {
          if (
            typeof entry !== 'object' || entry === null ||
            !('hex' in entry) || typeof entry.hex !== 'string' ||
            !/^#[0-9A-F]{6}$/u.test(entry.hex) ||
            !('ratio' in entry) || typeof entry.ratio !== 'number' ||
            !Number.isFinite(entry.ratio) || entry.ratio < 0 || entry.ratio > 1
          ) {
            throw new Error('Palette artifact contains an invalid colour entry.');
          }
          return { hex: entry.hex, ratio: entry.ratio };
        });
      } catch (error) {
        this.diagnose('palette.artifact-read', error, {
          assetId,
          artifactId: artifact.artifact_id,
        });
      }
    }

    // Serpent-7pg: stored manual palette is ignored; effective palette is automatic-only.
    if (automaticPalette.length > 0) {
      return {
        automaticPalette,
        effectivePalette: automaticPalette.map((color) => color.hex),
        paletteSource: 'automatic',
      };
    }
    return { automaticPalette: [], effectivePalette: [], paletteSource: null };
  }

  /**
   * Produce a compact, deterministic palette for assets added during a recent
   * time window. This is intentionally a read-only aggregation over completed
   * `extracted_palette` artifacts: the request never schedules extraction or
   * mutates metadata, so an automation script cannot create hidden background
   * work merely by asking for a colour summary.
   */
  override aggregateRecentAssetPalette(input: {
    libraryId: string;
    days: number;
    limit: number;
  }): {
    days: number;
    assetCount: number;
    paletteAssetCount: number;
    colors: Array<{ hex: string; weight: number; assetCount: number }>;
  } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const days = Math.max(1, Math.min(3_650, Math.floor(input.days)));
    const limit = Math.max(1, Math.min(24, Math.floor(input.limit)));
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const assetCount = (openLibrary.connection.prepare(
      `SELECT COUNT(*) AS count
         FROM assets
        WHERE deleted_at IS NULL AND created_at >= ?`,
    ).get(cutoff) as { count: number }).count;
    const rows = openLibrary.connection.prepare(
      `SELECT a.asset_id, ra.artifact_id
         FROM assets a
         JOIN revision_artifacts ra ON ra.revision_id = a.current_revision_id
        WHERE a.deleted_at IS NULL
          AND a.created_at >= ?
          AND ra.kind = 'extracted_palette'
          AND ra.status = 'ready'
          AND ra.invalidated_at IS NULL
        ORDER BY a.asset_id ASC, ra.artifact_id ASC`,
    ).all(cutoff) as Array<{ asset_id: string; artifact_id: string }>;

    const totals = new Map<string, { weight: number; assetIds: Set<string> }>();
    const paletteAssetIds = new Set<string>();
    for (const row of rows) {
      try {
        const parsed = JSON.parse(readFileSync(
          this.getArtifactAbsolutePath(input.libraryId, row.artifact_id),
          'utf8',
        )) as unknown;
        if (!Array.isArray(parsed)) throw new Error('Palette artifact must contain an array.');
        let validEntries = 0;
        for (const entry of parsed) {
          if (
            typeof entry !== 'object' || entry === null
            || !('hex' in entry) || typeof entry.hex !== 'string'
            || !/^#[0-9A-F]{6}$/u.test(entry.hex)
            || !('ratio' in entry) || typeof entry.ratio !== 'number'
            || !Number.isFinite(entry.ratio) || entry.ratio < 0 || entry.ratio > 1
          ) {
            throw new Error('Palette artifact contains an invalid colour entry.');
          }
          const existing = totals.get(entry.hex) ?? { weight: 0, assetIds: new Set<string>() };
          existing.weight += entry.ratio;
          existing.assetIds.add(row.asset_id);
          totals.set(entry.hex, existing);
          validEntries++;
        }
        if (validEntries > 0) paletteAssetIds.add(row.asset_id);
      } catch (error) {
        this.diagnose('palette.aggregate-recent.artifact-read', error, {
          assetId: row.asset_id,
          artifactId: row.artifact_id,
        });
      }
    }
    const totalWeight = [...totals.values()].reduce((sum, entry) => sum + entry.weight, 0);
    const colors = [...totals.entries()]
      .map(([hex, entry]) => ({
        hex,
        weight: totalWeight === 0 ? 0 : entry.weight / totalWeight,
        assetCount: entry.assetIds.size,
      }))
      .sort((left, right) => right.weight - left.weight || right.assetCount - left.assetCount || left.hex.localeCompare(right.hex))
      .slice(0, limit);
    return { days, assetCount, paletteAssetCount: paletteAssetIds.size, colors };
  }

  override setAssetColorSpaceOverride(input: {
    libraryId: string;
    assetId: string;
    colorSpace: string | null;
  }): { assetId: string; colorSpaceOverride: string | null } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    const asset = openLibrary.connection
      .prepare('SELECT current_revision_id FROM assets WHERE asset_id = ?')
      .get(input.assetId) as { current_revision_id: string | null } | undefined;
    if (!asset) throw new LibraryServiceError('ASSET_NOT_FOUND');

    const normalized = input.colorSpace?.trim() || null;
    if (normalized && !colorSpaceInfoFromName(normalized, 'metadata')) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    const now = new Date().toISOString();
    if (normalized) {
      openLibrary.connection.prepare(
        `INSERT INTO asset_color_space_overrides(asset_id, color_space, updated_at)
         VALUES (?, ?, ?)
         ON CONFLICT(asset_id) DO UPDATE SET color_space = excluded.color_space,
           updated_at = excluded.updated_at`,
      ).run(input.assetId, normalized, now);
    } else {
      openLibrary.connection
        .prepare('DELETE FROM asset_color_space_overrides WHERE asset_id = ?')
        .run(input.assetId);
    }

    const isImage = detectMediaType(this.resolveAssetPath(input.libraryId, input.assetId)) === 'image';
    if (asset.current_revision_id && isImage) {
      openLibrary.connection.prepare(
        `UPDATE revision_artifacts
            SET invalidated_at = ?
          WHERE revision_id = ?
            AND kind = 'thumbnail'
            AND invalidated_at IS NULL`,
      ).run(now, asset.current_revision_id);
      this.imageColorSpaceByRevision.delete(asset.current_revision_id);
    }
    this.options.onAssetsChanged?.({
      type: 'asset.changed',
      libraryId: input.libraryId,
      changedCount: 1,
      missingCount: 0,
      source: 'client',
    });
    return { assetId: input.assetId, colorSpaceOverride: normalized };
  }

  override getAssetMetadata(input: { libraryId: string; assetId: string }): AssetMetadataResult {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    const assetRow = openLibrary.connection
      .prepare('SELECT asset_id FROM assets WHERE asset_id = ?')
      .get(input.assetId) as { asset_id: string } | undefined;
    if (!assetRow) throw new LibraryServiceError('ASSET_NOT_FOUND');

    // Serpent-verg.2 — lenient read (0031 §1): libraries predating
    // asset_metadata (or missing individual metadata columns) degrade to the
    // empty-metadata shape instead of failing.
    const connection = openLibrary.connection;
    const present = hasTable(connection, 'asset_metadata')
      ? selectColumns(connection, 'asset_metadata', [
          'asset_id',
          'description',
          'rating',
          'favorite',
          'palette',
          'source_page_url',
          'author',
          'entity_version',
          'updated_at',
        ])
      : [];
    const row = present.length === 0
      ? undefined
      : connection
          .prepare(
            `SELECT ${present.join(', ')}
               FROM asset_metadata
              WHERE asset_id = ?`,
          )
          .get(input.assetId) as {
            asset_id?: string;
            description?: string | null;
            rating?: number;
            favorite?: number;
            palette?: string | null;
            source_page_url?: string | null;
            author?: string | null;
            entity_version?: number;
            updated_at?: string;
          } | undefined;

    if (!row) {
      return {
        assetId: input.assetId,
        description: null,
        rating: 0,
        favorite: false,
        palette: null,
        ...this.resolvedPaletteFields(openLibrary, input.assetId),
        sourcePageUrl: null,
        author: null,
        tags: this.fetchAssetTags(openLibrary.connection, input.assetId),
        entityVersion: 0,
        updatedAt: new Date(0).toISOString(),
      };
    }

    return {
      assetId: row.asset_id ?? input.assetId,
      description: row.description ?? null,
      rating: row.rating ?? 0,
      favorite: row.favorite !== undefined && row.favorite !== 0,
      palette: row.palette ?? null,
      ...this.resolvedPaletteFields(openLibrary, input.assetId),
      sourcePageUrl: row.source_page_url ?? null,
      author: row.author ?? null,
      entityVersion: row.entity_version ?? 0,
      updatedAt: row.updated_at ?? new Date(0).toISOString(),
      tags: this.fetchAssetTags(openLibrary.connection, input.assetId),
    };
  }

  /**
   * Read the current `extracted_metadata` artifact JSON for an asset.
   * Pending / missing / failed return a safe status with null metadata
   * so Inspector can show an empty tech line without throwing (REQ-VIEW-003).
   */
  override getExtractedMetadata(input: {
    libraryId: string;
    assetId: string;
  }): ExtractedMetadataResult {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    const assetRow = openLibrary.connection
      .prepare('SELECT asset_id FROM assets WHERE asset_id = ?')
      .get(input.assetId) as { asset_id: string } | undefined;
    if (!assetRow) throw new LibraryServiceError('ASSET_NOT_FOUND');

    // Serpent-485aeb: fonts have no `extracted_metadata` artifact — the facts
    // live in the font file's own `name`/`head`/`OS-2`/`maxp` tables, so they
    // are read on demand (a header parse, not a full decode).
    const absolutePath = this.resolveAssetPath(input.libraryId, input.assetId);
    if (detectMediaType(absolutePath) === 'font') {
      const fontMetadata = this.readAssetFontMetadata(absolutePath);
      if (!fontMetadata) {
        return {
          assetId: input.assetId,
          status: 'failed',
          metadata: null,
          metadataCompleteness: 'complete',
          errorCode: 'FONT_METADATA_UNREADABLE',
        };
      }
      // Run the partial font facts through the shared schema so the result has
      // exactly the same shape as every other extracted-metadata payload.
      const parsedFont = extractedVideoMetadataSchema.safeParse(
        fontMetadataToExtractedFields(fontMetadata),
      );
      return {
        assetId: input.assetId,
        status: parsedFont.success ? 'ready' : 'failed',
        metadata: parsedFont.success ? parsedFont.data : null,
        metadataCompleteness: 'complete',
        errorCode: parsedFont.success ? null : 'EXTRACTED_METADATA_INVALID',
      };
    }

    const artifact = this.getCurrentArtifact(
      input.libraryId,
      input.assetId,
      'extracted_metadata',
    );
    if (!artifact) {
      return {
        assetId: input.assetId,
        status: 'missing',
        metadata: null,
        metadataCompleteness: 'complete',
        errorCode: null,
      };
    }

    const status =
      artifact.status === 'ready'
        ? 'ready'
        : artifact.status === 'failed'
          ? 'failed'
          : 'pending';

    if (status !== 'ready') {
      return {
        assetId: input.assetId,
        status,
        metadata: null,
        metadataCompleteness: 'complete',
        errorCode: artifact.errorCode,
      };
    }

    try {
      const absPath = this.getArtifactAbsolutePath(
        input.libraryId,
        artifact.artifactId,
      );
      const raw = JSON.parse(readFileSync(absPath, 'utf-8')) as unknown;
      const parsed = extractedVideoMetadataSchema.safeParse(raw);
      if (!parsed.success) {
        return {
          assetId: input.assetId,
          status: 'failed',
          metadata: null,
          metadataCompleteness: 'complete',
          errorCode: 'EXTRACTED_METADATA_INVALID',
        };
      }
      return {
        assetId: input.assetId,
        status: 'ready',
        metadata: parsed.data as ExtractedVideoMetadata,
        metadataCompleteness: artifact.generatorVersion.startsWith('image-header@')
          ? 'header-only'
          : 'complete',
        errorCode: null,
      };
    } catch {
      return {
        assetId: input.assetId,
        status: 'failed',
        metadata: null,
        metadataCompleteness: 'complete',
        errorCode: 'EXTRACTED_METADATA_UNREADABLE',
      };
    }
  }

  /** Return tags assigned to an asset from both human and AI sources. */
  public override fetchAssetTags(
    connection: DatabaseConnection,
    assetId: string,
  ): Array<{ id: string; name: string; source: 'user' | 'ai' }> {
    const rows = connection
      .prepare(
        `WITH assigned_tags AS (
           SELECT t.tag_id, t.name, 1 AS is_user
             FROM tags t
             JOIN human_asset_tags hat ON hat.tag_id = t.tag_id
            WHERE hat.asset_id = ?
           UNION ALL
           SELECT t.tag_id, t.name, 0 AS is_user
             FROM tags t
             JOIN ai_asset_tags aat ON aat.tag_id = t.tag_id
            WHERE aat.asset_id = ?
         )
         SELECT tag_id, name,
                CASE WHEN MAX(is_user) = 1 THEN 'user' ELSE 'ai' END AS source
           FROM assigned_tags
          GROUP BY tag_id, name
          ORDER BY name COLLATE NOCASE`,
      )
      .all(assetId, assetId) as Array<{
        tag_id: string;
        name: string;
        source: 'user' | 'ai';
      }>;
    return rows.map((r) => ({ id: r.tag_id, name: r.name, source: r.source }));
  }

  override setAssetMetadata(input: {
    libraryId: string;
    assetId: string;
    expectedVersion: number;
    description?: string;
    rating?: number;
    favorite?: boolean;
    palette?: string[];
    sourcePageUrl?: string;
    author?: string;
  }): AssetMetadataResult {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    this.assertAssetsNotExplicitlyIgnored(openLibrary, [input.assetId]);

    // Validate the asset exists.
    const assetRow = openLibrary.connection
      .prepare('SELECT asset_id FROM assets WHERE asset_id = ?')
      .get(input.assetId) as { asset_id: string } | undefined;
    if (!assetRow) throw new LibraryServiceError('ASSET_NOT_FOUND');

    // Renderer validation is not a trust boundary. Direct Worker clients must
    // obey the same metadata contract and receive a metadata-specific error.
    if (
      input.description !== undefined && input.description.length > 10_000 ||
      input.rating !== undefined &&
        (!Number.isInteger(input.rating) || input.rating < 0 || input.rating > 5)
    ) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }

    // Serpent-7pg: ignore palette writes; column retained for older libraries.
    if (input.palette !== undefined) {
      // no-op: manual palette entry removed from product surface
    }

    // Source-page URLs are either the exact empty-string clear operation or a
    // credential-free HTTP(S) URL.
    if (
      input.sourcePageUrl !== undefined &&
      !sourcePageUrlSchema.safeParse(input.sourcePageUrl).success
    ) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }

    // Author mirrors sourcePageUrl's clear-with-empty-string contract, without
    // the URL-shape constraint (Serpent-7x0).
    if (
      input.author !== undefined &&
      !assetAuthorSchema.safeParse(input.author).success
    ) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }

    const now = new Date().toISOString();

    // Read current state.
    const existing = openLibrary.connection
      .prepare(
        'SELECT entity_version, rating, favorite, description, palette, source_page_url, author, updated_at FROM asset_metadata WHERE asset_id = ?',
      )
      .get(input.assetId) as {
        entity_version: number;
        rating: number;
        favorite: number;
        description: string | null;
        palette: string | null;
        source_page_url: string | null;
        author: string | null;
        updated_at: string;
      } | undefined;

    if (existing) {
      // Row exists: optimistic lock update.
      const newDescription =
        input.description !== undefined
          ? (input.description.trim() === '' ? null : input.description.trim())
          : existing.description;
      const newRating = input.rating ?? existing.rating;
      const newFavorite = input.favorite !== undefined ? (input.favorite ? 1 : 0) : existing.favorite;
      const newPalette = existing.palette;
      const newSourcePageUrl =
        input.sourcePageUrl !== undefined
          ? (input.sourcePageUrl.trim() === '' ? null : input.sourcePageUrl.trim())
          : existing.source_page_url;
      const newAuthor =
        input.author !== undefined
          ? (input.author.trim() === '' ? null : input.author.trim())
          : existing.author;

      const unchanged =
        newDescription === existing.description &&
        newRating === existing.rating &&
        newFavorite === existing.favorite &&
        newPalette === existing.palette &&
        newSourcePageUrl === existing.source_page_url &&
        newAuthor === existing.author;
      if (unchanged) {
        // A repeated blur/click of the same inspector fields must not consume
        // another optimistic-lock version. A stale expectedVersion is still a
        // conflict, even when the payload happens to match the current row.
        if (existing.entity_version !== input.expectedVersion) {
          throw new LibraryServiceError('VERSION_CONFLICT', {
            currentEntityVersion: existing.entity_version,
          });
        }
        return {
          assetId: input.assetId,
          description: existing.description,
          rating: existing.rating,
          favorite: existing.favorite !== 0,
          palette: existing.palette,
          ...this.resolvedPaletteFields(openLibrary, input.assetId),
          sourcePageUrl: existing.source_page_url,
          author: existing.author,
          tags: this.fetchAssetTags(openLibrary.connection, input.assetId),
          entityVersion: existing.entity_version,
          updatedAt: existing.updated_at,
        };
      }

      const result = openLibrary.connection
        .prepare(
          `UPDATE asset_metadata
              SET description = ?, rating = ?, favorite = ?,
                  palette = ?, source_page_url = ?, author = ?,
                  entity_version = entity_version + 1, updated_at = ?
            WHERE asset_id = ? AND entity_version = ?`,
        )
        .run(
          newDescription,
          newRating,
          newFavorite,
          newPalette,
          newSourcePageUrl,
          newAuthor,
          now,
          input.assetId,
          input.expectedVersion,
        );

      if (result.changes === 0) {
        // Version mismatch: return conflict with current version.
        const current = openLibrary.connection
          .prepare('SELECT entity_version FROM asset_metadata WHERE asset_id = ?')
          .get(input.assetId) as { entity_version: number };
        throw new LibraryServiceError('VERSION_CONFLICT', {
          currentEntityVersion: current.entity_version,
        });
      }

      // Fetch back the updated row.
      const updated = openLibrary.connection
        .prepare(
          `SELECT asset_id, description, rating, favorite, palette,
                  source_page_url, author, entity_version, updated_at
             FROM asset_metadata WHERE asset_id = ?`,
        )
        .get(input.assetId) as {
          asset_id: string;
          description: string | null;
          rating: number;
          favorite: number;
          palette: string | null;
          source_page_url: string | null;
          author: string | null;
          entity_version: number;
          updated_at: string;
        };

      this.syncAssetSearchContent(openLibrary.connection, input.assetId);

      return {
        assetId: updated.asset_id,
        description: updated.description,
        rating: updated.rating,
        favorite: updated.favorite !== 0,
        palette: updated.palette,
        ...this.resolvedPaletteFields(openLibrary, input.assetId),
        sourcePageUrl: updated.source_page_url,
        author: updated.author,
        tags: this.fetchAssetTags(openLibrary.connection, input.assetId),
        entityVersion: updated.entity_version,
        updatedAt: updated.updated_at,
      };
    }

    // No existing row: INSERT. expectedVersion must be 0 for a fresh row.
    if (input.expectedVersion !== 0) {
      throw new LibraryServiceError('VERSION_CONFLICT', { currentEntityVersion: 0 });
    }

    const newDescription =
      input.description !== undefined
        ? (input.description.trim() === '' ? null : input.description.trim())
        : null;
    const newRating = input.rating ?? 0;
    const newFavorite = input.favorite !== undefined && input.favorite ? 1 : 0;
    const newPalette = null;
    const newSourcePageUrl =
      input.sourcePageUrl !== undefined
        ? (input.sourcePageUrl.trim() === '' ? null : input.sourcePageUrl.trim())
        : null;
    const newAuthor =
      input.author !== undefined
        ? (input.author.trim() === '' ? null : input.author.trim())
        : null;
    const newEntityVersion = 1;

    openLibrary.connection
      .prepare(
        `INSERT INTO asset_metadata
           (asset_id, description, rating, favorite, palette,
            source_page_url, author, entity_version, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .run(
        input.assetId,
        newDescription,
        newRating,
        newFavorite,
        newPalette,
        newSourcePageUrl,
        newAuthor,
        newEntityVersion,
        now,
      );
    this.syncAssetSearchContent(openLibrary.connection, input.assetId);

    this.emitClientAssetsChanged(input.libraryId, 1);
    return {
      assetId: input.assetId,
      description: newDescription,
      rating: newRating,
      favorite: newFavorite !== 0,
      palette: newPalette,
      ...this.resolvedPaletteFields(openLibrary, input.assetId),
      sourcePageUrl: newSourcePageUrl,
      author: newAuthor,
      tags: this.fetchAssetTags(openLibrary.connection, input.assetId),
      entityVersion: newEntityVersion,
      updatedAt: now,
    };
  }

  /**
   * Apply optimistic-lock metadata updates as one bounded write. The whole
   * batch is atomic: a stale entity version or invalid asset rolls back every
   * item, so an agent never has to guess which subset was committed.
   */
  override setAssetsMetadata(input: {
    libraryId: string;
    items: Array<{
      assetId: string;
      expectedVersion: number;
      description?: string;
      rating?: number;
      favorite?: boolean;
      palette?: string[];
      sourcePageUrl?: string;
      author?: string;
    }>;
  }): AssetMetadataResult[] {
    const openLibrary = this.requireOpenLibrary(input.libraryId);
    if (input.items.length === 0 || new Set(input.items.map((item) => item.assetId)).size !== input.items.length) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }
    // Keep the transaction boundary owned by runBoundedWrite. Calling the
    // single-item implementation here reuses all validation and version
    // conflict semantics without introducing a second mutation path.
    return input.items.map((item) => this.setAssetMetadata({
      libraryId: openLibrary.summary.libraryId,
      ...item,
    }));
  }

  override backfillAssetMetadata(libraryId: string): { backfilledCount: number } {
    const openLibrary = this.requireOpenLibrary(libraryId);
    const now = new Date().toISOString();

    const result = openLibrary.connection
      .prepare(
        `INSERT OR IGNORE INTO asset_metadata
           (asset_id, description, rating, favorite, palette,
            source_page_url, author, entity_version, updated_at)
         SELECT asset_id, NULL, 0, 0, NULL, NULL, NULL, 1, ?
           FROM assets a
          WHERE NOT EXISTS (
            SELECT 1 FROM asset_metadata m WHERE m.asset_id = a.asset_id
          )`,
      )
      .run(now);

    return { backfilledCount: result.changes };
  }

  /**
   * Best-effort EXIF/IPTC/XMP author auto-extract (Serpent-7x0). Runs after
   * the first successful thumbnail decode for an image asset. Never
   * overwrites a non-empty author (user edits and prior extractions both
   * win), and — like {@link setAssetsRating} — does not touch entity_version
   * so it never invalidates a Renderer's in-flight optimistic-lock token.
   */
  public override async backfillAuthorFromExif(
    openLibrary: OpenLibrary,
    assetId: string,
    absoluteFilePath: string,
  ): Promise<void> {
    let author: string | null;
    try {
      author = await extractAuthorFromExif(absoluteFilePath);
    } catch (error) {
      this.diagnose('metadata.author-exif-extract', error, { assetId });
      return;
    }
    if (!author) return;

    const now = new Date().toISOString();
    openLibrary.connection
      .prepare(
        `INSERT INTO asset_metadata
           (asset_id, description, rating, favorite, palette,
            source_page_url, author, entity_version, updated_at)
         VALUES (?, NULL, 0, 0, NULL, NULL, ?, 1, ?)
         ON CONFLICT(asset_id) DO UPDATE SET author = excluded.author
           WHERE asset_metadata.author IS NULL OR asset_metadata.author = ''`,
      )
      .run(assetId, author, now);
    this.syncAssetSearchContent(openLibrary.connection, assetId);
  }

  /**
   * Batch rating write (REQ-MENU-007). Rating is last-write-wins: unlike
   * setAssetMetadata there is no optimistic version check, and only the
   * rating column is written — description, favorite, palette, source URL,
   * entity_version, and updated_at of existing rows are left untouched so a
   * batch rating never invalidates a renderer's cached expectedVersion or
   * overwrites concurrent field edits. Assets without a metadata row yet get
   * one with schema defaults plus the requested rating. Unknown asset ids
   * are skipped per-item, mirroring the batch tag operations.
   */
  override setAssetsRating(input: {
    libraryId: string;
    assetIds: string[];
    rating: number;
  }): { updatedCount: number; skipped: TagOperationSkip[] } {
    const openLibrary = this.requireOpenLibrary(input.libraryId);

    // Renderer validation is not a trust boundary. Direct Worker clients must
    // obey the same rating contract and receive a metadata-specific error.
    if (!Number.isInteger(input.rating) || input.rating < 0 || input.rating > 5) {
      throw new LibraryServiceError('INVALID_ASSET_METADATA');
    }

    const { eligibleAssetIds, skipped } = this.partitionKnownAssetIds(
      openLibrary.connection,
      input.assetIds,
    );
    if (eligibleAssetIds.length === 0) return { updatedCount: 0, skipped };

    const now = new Date().toISOString();
    const upsertStmt = openLibrary.connection.prepare(
      `INSERT INTO asset_metadata
         (asset_id, description, rating, favorite, palette,
          source_page_url, author, entity_version, updated_at)
       VALUES (?, NULL, ?, 0, NULL, NULL, NULL, 1, ?)
       ON CONFLICT(asset_id) DO UPDATE SET rating = excluded.rating`,
    );
    openLibrary.connection.transaction(() => {
      for (const assetId of eligibleAssetIds) {
        upsertStmt.run(assetId, input.rating, now);
      }
    })();
    // Rating is not part of the FTS content (see syncAssetSearchContent), so
    // no search-index sync is required here.
    this.emitClientAssetsChanged(input.libraryId, eligibleAssetIds.length);
    return { updatedCount: eligibleAssetIds.length, skipped };
  }

}
