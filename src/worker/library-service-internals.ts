/* eslint-disable @typescript-eslint/no-unused-vars -- re-exported implicitly via 'export *' consumers */
import type { LibraryService } from './library-service';
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
import { removeLibraryRootWithRetry, removePathWithSyncRetry, renamePathWithRetry } from './windows-fs-retry';
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
} from './binary-resolver';
import {
  durationSecondsFromProbeStdout,
  VIDEO_POSTER_GENERATOR_TAG,
  videoPosterGeneratorVersion,
  videoPosterSeekSeconds,
} from './video-poster-seek';
import {
  commitReplacingFolderCoverFiles,
  folderCoverAbsolutePath,
  folderCoverMimeType,
  folderCoverStoredExtension,
  installFolderCoverFile,
  listStaleFolderCoverFiles,
  removeFolderCoverFile,
} from './folder-custom-cover';
import { hasPdfCompatibleIllustratorHeader } from './illustrator-ai-format';
import {
  dominantColorMetrics,
  extractRepresentativePalette,
  type RepresentativeColor,
} from './palette-extractor';
import { pathIsWithin } from './path-utils';
import {
  workerMediaDecodeConcurrency,
  workerMediaDecodeWaveSize,
  workerMediaInteractiveDecodeConcurrency,
} from './media-concurrency';
import {
  mediaFfmpegConcurrencyLimit,
  systemAvailablePhysicalMemoryBytes,
} from './media-memory-concurrency';
import {
  encoderUsesHardwareName,
  ffmpegOneFrameEncodeArgs,
  listedH264ProxyEncoders,
  parseFfmpegEncoderTokens,
} from './video-proxy-encoder';
import {
  readImageDimensions,
  readImageDimensionsSync,
} from './image-dimensions';
import {
  MediaJobStatusSummaryCache,
  mediaJobCountTotal,
  mediaJobCountsFromRows,
} from './media-job-status-summary';
import {
  clampMediaJobListLimit,
  type MediaJobListCursor,
  sliceMediaJobListPage,
} from '../shared/media-jobs';
import type { RawMetadataBackfillProbeOutcome } from './raw-metadata-backfill-gate';

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
} from '../shared/linked-folder-tree';
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
} from './plugin-job-repository';
import {
  materializePluginDerivedFields as materializePluginDerivedFieldRows,
  queryPluginDerivedFields as queryPluginDerivedFieldRows,
} from './plugin-derived-field-repository';
import {
  LibraryWriteCoordinator,
  LibraryWriteCoordinatorError,
  isSQLiteWriteContention,
  type AcquireLibraryWriteLeaseOptions,
  type LibraryChangeSubscription,
  type LibraryJobLease,
  type LibraryWriteLease,
  type LibraryWriteLeaseHeartbeat,
} from './library-write-coordinator';
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
} from './network-metadata-cache';

import { columnsFor, degradedDefaults, hasTable, invalidateColumnProbe, missingColumns, qualify, selectColumns } from './lenient-columns';
import { isBakeableStillImageFile } from '../shared/bakeable-still-image';
import { rotateStillImageFile } from './rotate-still-image-file';
import {
  asMediaResourceExhaustedError,
  MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE,
  MediaResourceExhaustedError,
  mediaResourceGuard,
  mediaResourceFailureFromSpawnResult,
} from './media-resource-guard';
import {
  estimateMediaNativeMemoryBytes,
  mediaNativeMemoryBudget,
  type MediaNativeMemoryEstimate,
} from './media-memory-budget';
import {
  clearMigrationFailure,
  MAX_MIGRATION_ATTEMPTS,
  readMigrationFailure,
  recordMigrationFailure,
} from './schema-failure';
import {
  gitignoreMatchesPath,
  parseGitignore,
  type GitIgnoreMatcher,
} from './gitignore';
import { diffGitignoreHits } from './gitignore-preview';
import {
  gitignorePreviewCandidateKey,
  type GitignorePreviewCandidate,
} from '../shared/gitignore-preview';
import { sanitizeAiDescription } from '../shared/ai-analysis-settings';
import {
  CONTENT_REPLACE_BATCH_MAX_ITEMS,
  CONTENT_REPLACE_STAGE_CHUNK_MAX_BYTES,
} from '../shared/content-replace';
import { smartCollectionQueryDefinitionSchema, extractedVideoMetadataSchema, type AssetMetadataResult, type ExtractedMetadataResult, type ExtractedVideoMetadata, type AssetSummary, type BrowseLayoutEntry, type CollectionSummary, type FilterClause, type FolderBrowseEntry, type GitignorePreview, type IgnoredPath, type LinkedFolderDirectoryMutation, type LinkedFolderRule, type LinkedFolderSummary, type ManagedFolderSummary, type SearchQuery, type SearchScope, type SortDefinition, type SmartCollectionQueryDefinition, type SmartCollectionSummary, type TagCooccurrenceGraph, type TagSummary, type TrashedFolderSummary } from '../shared/asset-types';
import {
  parseWritableAppearance,
  sanitizeEntityAppearance,
  type EntityAppearance,
  type EntityAppearanceTarget,
} from '../shared/entity-appearance';
import {
  FOLDER_NAVIGATION_COVER_CAP,
  type LibraryNavigationSummary,
} from '../shared/library-navigation';
import { isLibraryRootFolderId } from '../shared/library-root-folder';
import { BROWSE_SCOPE_MAX_ASSETS } from '../shared/browse-scope';
import {
  VIEWPORT_CLAIM_ID_LIMIT,
  shouldFallbackViewportClaimToPersistentQueue,
  uniqueAssetIdsInOrder,
  viewportClaimRankOrderSql,
} from '../shared/viewport-priority';
import {
  createAutomationFilePlanHash,
  createAutomationImportPlanHash,
} from '../shared/automation-file-plan';
import { hasMeaningfulSmartCollectionCondition } from '../shared/smart-collection-query';
import type {
  LibraryChangedEvent,
  MissingAssetRecoveryProbe,
  TagOperationSkip,
} from '../shared/protocol/responses';
import type {
  PluginJobCheckpoint,
  PluginJobHandlerCapabilities,
  PluginJobItemResult,
  PluginJobRecord,
  PluginJobRecoveryStrategy,
} from '../plugins/plugin-jobs';
import type { PluginProviderFieldType } from '../plugins/plugin-providers';
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
} from './operation-history';
import { assertRegisteredHistoryRecipePair, assertRegisteredHistoryRecipe } from './operation-history-recipes';
import {
  EagleLibraryReadError,
  readEagleAssetCandidate,
  readEagleLibraryRoot,
  sumEagleLibrarySourceBytes,
  type EagleAssetCandidate,
  type EagleFolderNode,
} from './eagle-library';
import {
  BillfishLibraryReadError,
  readBillfishLibrary,
  type BillfishAssetCandidate,
} from './billfish-library';
import {
  emptySyncAssetMetadata,
  hasSyncAiLayer,
  metadataContentHash,
  type SyncAssetMetadata,
} from './sync/sync-metadata';
import { parseManifest } from './sync/manifest';
import { deriveSyncCardStatus, isLocalSyncPending } from '../shared/sync-card-status';

// sharp is an optional N-API dependency (no rebuild needed for Electron).
// The Worker loads it lazily so it can still start if sharp is missing.
export interface SharpModule {
  (input: string | Buffer, options?: {
    animated?: boolean;
    page?: number;
    pages?: number;
    failOn?: 'warning' | 'error' | 'none';
    sequentialRead?: boolean;
    limitInputPixels?: number | false;
  }): SharpInstance;
  cache?(options: boolean | { files?: number; memory?: number; items?: number }): unknown;
  concurrency?(threads?: number): number;
}
export interface SharpInstance {
  metadata(): Promise<{
    width?: number;
    height?: number;
    format?: string;
    orientation?: number;
    channels?: number;
    hasAlpha?: boolean;
    pages?: number;
    delay?: number[];
    loop?: number;
    space?: string;
    hasProfile?: boolean;
    icc?: Buffer;
  }>;
  rotate(): SharpInstance;
  toColourspace(colourspace: 'srgb'): SharpInstance;
  resize(options: {
    width?: number;
    height?: number;
    fit?: 'inside' | 'cover' | 'fill' | 'outside';
    withoutEnlargement?: boolean;
  }): SharpInstance;
  composite(inputs: ReadonlyArray<{
    input: Buffer | string;
    left?: number;
    top?: number;
  }>): SharpInstance;
  jpeg(options?: { quality?: number }): SharpInstance;
  /** Replace transparent pixels with a solid background (audio waveform covers). */
  flatten?(options: {
    background: { r: number; g: number; b: number };
  }): SharpInstance;
  png?(options?: { quality?: number }): SharpInstance;
  raw?(): SharpInstance;
  toBuffer?(options?: { resolveWithObject?: false }): Promise<Buffer>;
  toBuffer?(options?: { resolveWithObject: true }): Promise<{
    data: Uint8Array;
    info: { channels: number };
  }>;
  webp(options: { quality?: number }): SharpInstance;
  toFile(output: string): Promise<unknown>;
  /** Drop native libvips handles immediately; GC is too late on Windows. */
  destroy?(): void;
}

export interface PaletteSharpInstance {
  rotate(): PaletteSharpInstance;
  toColourspace(colourspace: 'srgb'): PaletteSharpInstance;
  resize(options: {
    width?: number;
    height?: number;
    fit?: 'inside' | 'cover' | 'fill' | 'outside';
    withoutEnlargement?: boolean;
  }): PaletteSharpInstance;
  ensureAlpha(): PaletteSharpInstance;
  raw(): PaletteSharpInstance;
  toBuffer(options: { resolveWithObject: true }): Promise<{
    data: Uint8Array;
    info: { channels: number };
  }>;
}

export interface PaletteSharpModule {
  (input: string): PaletteSharpInstance;
}

export let sharpModule: SharpModule | undefined;
export function requireSharp(): SharpModule {
  if (!sharpModule) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      sharpModule = require('sharp') as SharpModule;
      // libvips keeps recently used input files open in its file cache. On
      // Windows an open handle blocks delete/rename, which breaks asset
      // trash/move/rename right after a thumbnail or palette was generated
      // (POSIX unlinks open files, so this never surfaced on macOS). Keep the
      // decoded-operation cache but never hold source files open. Keep the
      // memory cache bounded as well: this Worker is the owner of all open
      // libraries and must not let libvips retain a large batch after a wave.
      sharpModule.cache?.({ files: 0, memory: 32, items: 128 });
      // Two queue jobs are allowed, but each libvips operation gets one native
      // worker. Without this, Sharp's default is roughly one thread per CPU
      // core per image and queue-level bounds still oversubscribe the machine.
      sharpModule.concurrency?.(1);
    } catch (error) {
      throw new LibraryServiceError('INTERNAL_ERROR', {
        reason: 'SHARP_UNAVAILABLE',
        cause: error,
      });
    }
  }
  return sharpModule;
}

export const SHARP_VERSION = '0.35.3';
/** Bumped when GIF still-page selection changes so stale black page-0 thumbs requeue. */
export const SHARP_THUMBNAIL_GENERATOR = `sharp@${SHARP_VERSION}-gifstill1`;
/** RAW cards may use a bounded embedded JPEG instead of demosaicing the sensor frame. */
export const RAW_EMBEDDED_THUMBNAIL_GENERATOR = `raw-embedded-jpeg@1;sharp@${SHARP_VERSION};max=512`;
/** Eagle/Billfish imports publish a copy immediately, then normalize in the background. */
export const IMPORTED_THUMBNAIL_GENERATOR = `${IMPORTED_THUMBNAIL_GENERATOR_PREFIX};sharp@${SHARP_VERSION};max=512;still1`;
/** Animated imported previews stay byte-for-byte intact but still need a durable completion marker. */
export const IMPORTED_ANIMATED_THUMBNAIL_GENERATOR = `${IMPORTED_THUMBNAIL_GENERATOR_PREFIX};preserved-animated@1`;

export function isTiffExtension(extensionOrFileName: string): boolean {
  const extension = extensionOrFileName.startsWith('.')
    ? extensionOrFileName.toLowerCase()
    : path.extname(extensionOrFileName).toLowerCase();
  return extension === '.tif' || extension === '.tiff';
}

export type MediaNativeMemoryEstimateInput = Omit<MediaNativeMemoryEstimate, 'decoder'>;

export async function inspectMediaNativeInput(
  assetPath: string,
  execution: MediaExecutionContext,
): Promise<MediaNativeMemoryEstimateInput> {
  let sourceByteSize = execution.sourceByteSize;
  if (!Number.isSafeInteger(sourceByteSize) || sourceByteSize! <= 0) {
    try {
      sourceByteSize = Number((await lstatAsync(assetPath)).size);
    } catch {
      sourceByteSize = null;
    }
  }

  let sourceWidth = execution.sourceWidth;
  let sourceHeight = execution.sourceHeight;
  if (
    !Number.isSafeInteger(sourceWidth)
    || !Number.isSafeInteger(sourceHeight)
    || sourceWidth! <= 0
    || sourceHeight! <= 0
  ) {
    const dimensions = await readImageDimensions(assetPath);
    sourceWidth = dimensions?.width ?? null;
    sourceHeight = dimensions?.height ?? null;
  }

  return { sourceByteSize, width: sourceWidth, height: sourceHeight };
}

// A generator writes the final artifact before committing its DB row. Keep
// recently-created unreferenced files out of the open-time sweep so a live
// media job cannot be mistaken for a crash orphan; the next reconciliation
// will remove it if it never becomes referenced.
export const ORPHAN_ARTIFACT_GRACE_MS = 5 * 60_000;
/**
 * Serpent-x9xu / Serpent-87pd: the current browse/search page size
 * (BROWSE_PAGE_SIZE = 100). The `visible` thumbnail wave must cover the
 * window the user is looking at so a freshly imported library shows the
 * current page first while the import flood (mutation 300) fills in behind.
 * Bounded: a page is never more than this many assets, so the visible wave
 * cannot starve the rest of the catalogue.
 */
export const THUMBNAIL_VISIBLE_PAGE_SIZE = 100;
export const OIIO_VERSION = '3.1.12.0';
export const FFMPEG_VERSION = '8.1';
/**
 * Serpent-308675: media jobs run under full-decoder CPU saturation, where the
 * single Worker thread can stall well past a 15s lease between heartbeat
 * ticks. Media-job leases use their own longer window (heartbeat = 1/3 of it)
 * so transient stalls don't fail-and-requeue live work. Scoped to media jobs
 * on purpose: the writer lease keeps its short window for fast crash
 * reclaim.
 */
export const MEDIA_JOB_LEASE_DURATION_MS = 60_000;
export const MEDIA_RESOURCE_RETRY_DELAY_MS = 30_000;
export const RAW_IMAGE_METADATA_RETRY_DELAY_MS = 30_000;
export const RAW_IMAGE_METADATA_MAX_ATTEMPTS = 3;
export const EMBEDDED_IMAGE_METADATA_GENERATOR = 'exifr@7.1.3;embedded-image-metadata-v2';
export const FFMPEG_METADATA_GENERATOR = `ffprobe@${FFMPEG_VERSION};embedded-metadata-v1`;
/** Opaque ≈4:3 light-stage covers (Serpent-dxk); stale strip/dark covers requeue. */
export const AUDIO_WAVEFORM_GENERATOR = `ffmpeg@${FFMPEG_VERSION}+${AUDIO_WAVEFORM_COVER_GENERATOR_TAG}`;
export const VIDEO_PROXY_SCALE_FILTER =
  'scale=w=min(720\\,iw):h=min(720\\,ih):force_original_aspect_ratio=decrease:force_divisible_by=2';
export type VideoProxyProfile = {
  codec: 'h264';
  encoder: string;
  extension: 'mp4' | 'webm';
  mimeType: 'video/mp4' | 'video/webm';
  args: string[];
};
export const SERPENT_OCIO_CONFIG = 'ocio://studio-config-v4.0.0_aces-v2.0_ocio-v2.5';

/**
 * Escape a local path before embedding it in an FFmpeg filtergraph option.
 *
 * FFmpeg parses filter options after the process has already received the
 * argument, so passing a Windows path as a normal argv value is not enough:
 * the drive-letter colon is treated as an option separator and backslashes
 * are interpreted as filter escapes. Normalising separators and escaping the
 * remaining filter metacharacters keeps bundled font paths valid on both
 * Windows and POSIX.
 */
export const DISPLAY_PREVIEW_KIND_SQL = `CASE
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
          END`;

/** One browser-paintable preview per asset. JPEG wins over a 16-bit PNG sibling. */
export function pngBitDepth(filePath: string): number | null {
  let fd: number | undefined;
  try {
    fd = openSync(filePath, 'r');
    const header = Buffer.alloc(26);
    if (readSync(fd, header, 0, header.length, 0) < header.length) return null;
    if (header.subarray(0, 8).toString('latin1') !== '\x89PNG\r\n\x1a\n') return null;
    if (header.subarray(12, 16).toString('latin1') !== 'IHDR') return null;
    return header[24] ?? null;
  } catch {
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

export function singleDisplayArtifactJoin(alias: string, statusSql: string): string {
  // Prefer a ready display artifact over a later failed/pending row so a
  // terminal model-thumbnail failure stays visible without hiding a good card.
  const statusRank = statusSql.includes('chosen.status')
    ? `CASE chosen.status
                WHEN 'ready' THEN 0
                WHEN 'pending' THEN 1
                WHEN 'generating' THEN 1
                WHEN 'failed' THEN 2
                ELSE 3
              END,`
    : '';
  return `LEFT JOIN revision_artifacts ${alias}
           ON ${alias}.artifact_id = (
             SELECT chosen.artifact_id
               FROM revision_artifacts chosen
              WHERE chosen.revision_id = a.current_revision_id
                AND chosen.kind = ${DISPLAY_PREVIEW_KIND_SQL}
                ${statusSql}
                AND chosen.invalidated_at IS NULL
              ORDER BY ${statusRank}
              CASE chosen.mime_type
                WHEN 'image/jpeg' THEN 0
                WHEN 'image/webp' THEN 1
                WHEN 'image/png' THEN 2
                ELSE 3
              END,
              chosen.rowid DESC
              LIMIT 1
           )`;
}

export function escapeFfmpegFilterPath(filePath: string): string {
  return filePath
    .replaceAll('\\', '/')
    .replaceAll(':', '\\:')
    .replaceAll("'", "\\'");
}

/**
 * Keep decoder and filter threads bounded for every bundled FFmpeg invocation.
 * Encoder-specific `-threads` settings remain untouched; this only adds the
 * input decoder and filter limits before the first `-i`. ffprobe is excluded
 * because it does not decode a video frame in these call sites.
 */
export function constrainFfmpegDecoderArgs(command: string, args: string[]): string[] {
  const executable = path.basename(command).toLowerCase();
  if (executable.includes('ffprobe')) return args;
  const inputIndex = args.indexOf('-i');
  if (inputIndex < 0) return args;
  const hasDecoderThreads = args.some((arg, index) => arg === '-threads:v' && index + 1 < args.length);
  const hasFilterThreads = args.some((arg, index) => arg === '-filter_threads' && index + 1 < args.length);
  const hasComplexFilterThreads = args.some((arg, index) => arg === '-filter_complex_threads' && index + 1 < args.length);
  const limits: string[] = [];
  if (!hasDecoderThreads) limits.push('-threads:v', '1');
  if (!hasFilterThreads) limits.push('-filter_threads', '1');
  if (!hasComplexFilterThreads) limits.push('-filter_complex_threads', '1');
  return limits.length === 0
    ? args
    : [...args.slice(0, inputIndex), ...limits, ...args.slice(inputIndex)];
}

export const MEDIA_JOB_KINDS = [
  'generate_thumbnail',
  'generate_video_poster',
  'extract_metadata',
  'generate_contact_sheet',
  'generate_webm_proxy',
  'generate_audio_proxy',
  'extract_palette',
] as const;
export type MediaJobKind = (typeof MEDIA_JOB_KINDS)[number];
export type SecondaryMediaJobKind = Exclude<MediaJobKind, 'generate_thumbnail' | 'generate_video_poster'>;
export type MediaJobStatus = 'queued' | 'running' | 'paused' | 'succeeded' | 'failed' | 'cancelled';

export function safeMediaJobErrorDetail(errorCode: string): string {
  switch (errorCode) {
    case MEDIA_RESOURCE_EXHAUSTED_ERROR_CODE:
      return 'The system is under memory pressure. Media previews will retry after the load settles.';
    case 'FFMPEG_REQUIRED':
      return 'The media component needed for video thumbnails is unavailable. Reinstall or repair Serpent.';
    case 'OIIO_REQUIRED':
      return 'The OpenImageIO component is unavailable. Reinstall or repair Serpent.';
    case 'STALE_REVISION':
      return 'The source changed before media processing finished. Retry the current revision.';
    case 'RAW_METADATA_EXTRACTION_FAILED':
      return 'Camera metadata extraction failed; the job will retry after a backoff.';
    case 'PALETTE_SOURCE_NOT_READY':
      return 'The current preview image is not ready. Regenerate the thumbnail or video poster first.';
    case 'PALETTE_EXTRACTION_FAILED':
      return 'Local palette extraction failed. See the local Serpent log for diagnostic details.';
    case IMPORTED_THUMBNAIL_NORMALIZATION_JOB:
      return 'The imported preview could not be normalized. The original imported preview remains available.';
    default:
      return 'Media processing failed. See the local Serpent log for diagnostic details.';
  }
}

export type OiioArtifactErrorCode =
  | 'OIIO_REQUIRED'
  | 'OIIO_COLOR_TRANSFORM_FAILED'
  | 'OIIO_GENERATION_FAILED';

export type ExrPlaneDescriptor = {
  index: number;
  label: string;
};

/**
 * `oiiotool --info -v -a` reports each EXR part as `subimage N`. Depending on
 * the OIIO version and EXR writer, the name is either on that header in
 * parentheses or in a following `name:`/`oiio:subimagename:` metadata line.
 * Keep the parser deliberately conservative: an unfamiliar OIIO build still
 * gets a usable Part 0 preview rather than a guessed channel name.
 */
export function parseExrPlaneDescriptors(output: string): ExrPlaneDescriptor[] {
  const planes = new Map<number, { index: number; name?: string }>();
  let currentIndex: number | null = null;
  for (const line of output.split(/\r?\n/u)) {
    const header = /^\s*subimage\s+(\d+)(?:\s*\(([^)]+)\))?\s*:?/iu.exec(line);
    if (header) {
      const index = Number(header[1]);
      if (!Number.isSafeInteger(index) || index < 0) {
        currentIndex = null;
        continue;
      }
      const name = header[2]?.trim();
      planes.set(index, { index, ...(name ? { name } : {}) });
      currentIndex = index;
      continue;
    }

    if (currentIndex === null) continue;
    const metadataName = /^\s*(?:name|oiio:subimagename):\s*"([^"]+)"\s*$/iu.exec(line);
    const name = metadataName?.[1]?.trim();
    if (name) planes.set(currentIndex, { index: currentIndex, name });
  }
  return planes.size > 0
    ? [...planes.values()]
      .sort((left, right) => left.index - right.index)
      .map(({ index, name }) => ({
        index,
        label: name ? `Part ${index}: ${name}` : `Part ${index}`,
      }))
    : [{ index: 0, label: 'Part 0' }];
}

export function readIcoPageSizesFromPath(assetPath: string): IcoPageSize[] {
  const handle = openSync(assetPath, 'r');
  try {
    const header = Buffer.alloc(6);
    if (readSync(handle, header, 0, header.length, 0) !== header.length) return [];
    const count = header.readUInt16LE(4);
    // An ICO directory is tiny. Guard the allocation if a malformed file
    // contains an unreasonable entry count.
    if (count === 0 || count > 1024) return [];
    const directory = Buffer.alloc(6 + count * 16);
    header.copy(directory, 0);
    if (readSync(handle, directory, 6, count * 16, 6) !== count * 16) return [];
    return parseIcoPageSizes(directory);
  } finally {
    closeSync(handle);
  }
}

export class OiioInvocationError extends Error {
  constructor(
    readonly artifactErrorCode: OiioArtifactErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'OiioInvocationError';
  }
}
import type { PublicErrorCode } from '../shared/protocol/errors';
import { classifyUnknownFailure, isDecoderMissingInputError, isSqliteEngineUnavailableError, publicReasonFromError, type PublicErrorReason } from '../shared/protocol/errors';
import type {
  NameConflictDecision,
  SuspectedDuplicateDecision,
} from '../shared/protocol/requests';
import { assetAuthorSchema, sourcePageUrlSchema } from '../shared/protocol/requests';
import { extractAuthorFromExif } from './author-from-exif';
import {
  extractRawImageMetadataDetailed,
  extractRawImageMetadata,
  normalizeRawImageMetadata,
  resolvedExtractedPixelSize,
  type RawImageMetadata,
  type RawImageMetadataParser,
} from './raw-image-metadata';
import {
  embeddedMetadataSearchText,
  normalizeProbeEmbeddedMetadata,
} from './embedded-metadata';
import { extractRawEmbeddedJpegThumbnail } from './raw-embedded-thumbnail';
import {
  queryModelCompanionAssets,
  resolveModelPreviewResolution,
} from './model-resolution';
import type { ModelCompanionAsset } from '../shared/model-companions';
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
} from '../shared/protocol/responses';
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
} from './library-rules';
import {
  classifyLibraryStorage,
  type LibraryStorageKind,
} from './network-storage';
import { ImportDestinationDirectoryCache } from './import-destination-directory-cache';
import {
  LibraryParentError,
  resolveWritableLibraryParent,
} from './library-parent';
import {
  normalizeSearchText,
  tokenizeForFts,
  type SearchClause,
} from './search-query';
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
} from './catalog-read';
import { rollupDirectFolderCounts } from '../shared/filtered-folder-counts';
import {
  GIF_GOOD_PAGE_SCORE_THRESHOLD,
  GIF_THUMBNAIL_PROBE_SIZE,
  pickBestGifPage,
  sampleGifPageIndices,
  scoreRawRgbFrame,
} from './gif-thumbnail-page';
import { buildGifExtractedMetadata, type GifExtractedMetadata } from './gif-metadata';
import {
  IMPORTED_THUMBNAIL_GENERATOR_PREFIX,
  IMPORTED_THUMBNAIL_MAX_BYTES,
  IMPORTED_THUMBNAIL_MAX_EDGE,
  IMPORTED_THUMBNAIL_NORMALIZATION_JOB,
  IMPORTED_THUMBNAIL_PRESERVED_GENERATOR,
  importedThumbnailNeedsNormalization,
  isImportedThumbnailGenerator,
  isLegacyImportedThumbnailGenerator,
} from './imported-thumbnail-policy';
import {
  parseIcoPageSizes,
  pickLargestIcoPage,
  type IcoPageSize,
} from './ico-page';
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
} from '../shared/audio-media';
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
} from '../shared/media-formats';
import {
  isSourceDirectPreview,
  SOURCE_DIRECT_IMAGE_EXTENSIONS,
  SOURCE_DIRECT_MAX_BYTES,
  SOURCE_DIRECT_MAX_LONG_EDGE_PX,
  SOURCE_DIRECT_MAX_PIXELS,
} from '../shared/preview-policy';
import { mediaTypeSupportsAutoPalette } from '../shared/palette-visibility';
import {
  admitArtifactJob,
  artifactKindForJob,
  artifactIdentityForPersistedRow,
  EXPLICIT_PROXY_FALLBACK_MARKER,
  type ArtifactJobKind,
} from './artifact-policy';
import {
  ArtifactDescriptorCache,
  type ArtifactDescriptorCacheMetrics,
} from './artifact-descriptor-cache';
import {
  BrowseSessionStore,
  browseQueryFingerprint,
  browseSessionIndexComplete,
  browseSessionPageUsesSnapshot,
  type BrowseSessionLookup,
  type BrowseSessionSnapshot,
} from './browse-session-store';
import {
  LibraryReconciliationOwner,
  type LibraryReconciliationTask,
} from './reconciliation-owner';
import {
  MODEL_THUMBNAIL_GENERATOR_VERSION,
} from '../shared/model-thumbnail-protocol';
import { DOCUMENT_THUMBNAIL_GENERATOR_VERSION } from '../shared/document-thumbnail-protocol';
import {
  DOCUMENT_THUMBNAIL_WIDTH,
  FONT_THUMBNAIL_GENERATOR_VERSION,
  FONT_THUMBNAIL_HEIGHT,
} from '../shared/document-thumbnail-protocol';
import type { FontMetadata } from '../shared/font-metadata';
import {
  fontMetadataToExtractedFields,
  fontSampleQuerySuffix,
  readFontMetadata,
} from './font-file-metadata';
import {
  COMMON_IMAGE_COLOR_SPACE_OPTIONS,
  colorSpaceInfoFromName,
  defaultImageColorSpace,
  parseIccProfileDescription,
  parseOiioColorSpaceInfo,
  type ImageColorSpaceInfo,
  type ImageColorSpaceOption,
} from './image-color-space';
import {
  countTextLines,
  isTextFileName,
  TEXT_SAVE_MAX_BYTES,
  TEXT_VIEWER_MAX_BYTES,
  textMimeForExtension,
} from '../shared/text-media';
import { decodeTextBytes } from '../shared/text-encoding';
import { canOverrideImageColorSpace } from '../shared/image-color-space';
import { inferRelinkBatchRoot } from '../shared/infer-relink-batch-root';
import {
  DEFAULT_IMAGE_SEQUENCE_FPS,
  detectImageSequences,
  formatImageSequenceDisplayName,
  type ImageSequenceFrameCandidate,
} from '../shared/image-sequence';
import { discoverSelectedImageSequenceFrames } from './image-sequence-import-discovery';
import { isImportConflictPlan, isImportSourceFailurePlan } from '../shared/import-outcome';
import {
  ImportSourceFailurePause,
  isSkippableImportSourceFailure,
  skippedImportSourceFromError,
  toImportSourceFailurePlan,
  type SkippedImportSource,
} from './import-source-failure';
import { assetSupportsThumbnail } from '../shared/thumbnail-support';
import {
  extractZipStream,
  zipBombProtectionLimits,
  ZipImportStreamError,
  type ZipArchiveManifest,
} from './zip-import-stream';
import { listZipArchiveFiles, readZipArchiveEntry } from './zip-archive-preview';
import {
  defaultPinnedHttpTransport,
  type DnsLookup,
  type PinnedHttpTransport,
  type ResolvedAddress,
} from './secure-http-download';
import {
  extensionForRemoteContentType,
  filenameMatchesRemoteContentType,
  normalizeRemoteContentType,
  remoteMediaValidationFailure,
  RemoteMediaMagicProbe,
} from './remote-media-validation';
import { requeueRetryableFailedArtifacts } from './derived-artifact-repair';
import {
  SQLITE_IN_BIND_LIMIT,
  sqliteAllInChunks,
  sqliteInChunks,
  sqliteInPlaceholders,
  sqliteRunInChunks,
  withSqliteInPredicate,
} from './sqlite-in';

export interface RunResult {
  changes: number;
}

export interface Statement {
  all(...parameters: unknown[]): unknown[];
  get(...parameters: unknown[]): unknown;
  run(...parameters: unknown[]): RunResult;
}

export interface DatabaseConnection {
  backup(filename: string, options?: {
    progress?: (progress: { remainingPages: number; totalPages: number }) => number | void;
  }): Promise<{ remainingPages: number; totalPages: number }>;
  close(): void;
  exec(sql: string): void;
  pragma(source: string, options?: { simple?: boolean }): unknown;
  prepare(sql: string): Statement;
  transaction<T>(operation: () => T): DatabaseTransaction<T>;
}

export interface DatabaseTransaction<T> {
  (): T;
  immediate(): T;
}

export interface DatabaseConstructor {
  new (filename: string, options?: {
    readonly?: boolean;
    fileMustExist?: boolean;
    /** better-sqlite3 statement trace; used only by the test trace seam. */
    verbose?: (sql: string) => void;
  }): DatabaseConnection;
}

export const Database = BetterSqlite3 as DatabaseConstructor;
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export const REQUIRED_DIRECTORIES = ['Assets'] as const;
export const REGENERABLE_DIRECTORIES = ['previews', 'revisions', 'trash', 'artifacts'] as const;
export const DATABASE_BACKUP_DIRECTORY = 'backups';
export const DATABASE_BACKUP_INTERVAL_MS = 24 * 60 * 60 * 1_000;
export const FINALIZED_IMPORT_RETENTION_MS = 10 * 60_000;

export const MAX_DOWNLOAD_BYTES = 500 * 1024 * 1024;
export const DOWNLOAD_TIMEOUT_MS = 30_000;
export const MAX_DOWNLOAD_REDIRECTS = 30;

export function extensionForContentType(contentType: string): string | undefined {
  return extensionForRemoteContentType(contentType.toLowerCase());
}

export function cleanFilename(name: string): string {
  // eslint-disable-next-line no-control-regex
  return name.replace(/[\x00-\x1f<>:"/\\|?*\x7f]+/g, '_')
    .replace(/^\.+/, '')
    .replace(/\.+$/, '')
    .trim() || 'download';
}

export function prohibitedIpv4(address: string): boolean {
  const parts = address.split('.').map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b, c] = parts as [number, number, number, number];
  return a === 0 || a === 10 || a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && (c === 0 || c === 2)) ||
    (a === 192 && b === 88 && c === 99) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224;
}

export function prohibitedIpAddress(rawAddress: string): boolean {
  const address = rawAddress.toLowerCase().replace(/^\[|\]$/g, '').split('%')[0]!;
  const family = isIP(address);
  if (family === 4) return prohibitedIpv4(address);
  if (family !== 6) return true;

  let normalized = address;
  const dottedTail = normalized.match(/(\d+\.\d+\.\d+\.\d+)$/u)?.[1];
  if (dottedTail) {
    const octets = dottedTail.split('.').map(Number);
    normalized = normalized.slice(0, -dottedTail.length) +
      `${((octets[0]! << 8) | octets[1]!).toString(16)}:${((octets[2]! << 8) | octets[3]!).toString(16)}`;
  }
  const [leftText, rightText = ''] = normalized.split('::');
  const left = leftText ? leftText.split(':') : [];
  const right = rightText ? rightText.split(':') : [];
  const missing = 8 - left.length - right.length;
  const groups = [...left, ...Array(Math.max(0, missing)).fill('0'), ...right]
    .map((group) => Number.parseInt(group || '0', 16));
  if (groups.length !== 8 || groups.some((group) => !Number.isInteger(group))) return true;
  if (groups.every((group) => group === 0)) return true;
  if (groups.slice(0, 7).every((group) => group === 0) && groups[7] === 1) return true;
  const first = groups[0]!;
  if ((first & 0xfe00) === 0xfc00 ||
      (first & 0xffc0) === 0xfe80 ||
      (first & 0xffc0) === 0xfec0 ||
      (first & 0xff00) === 0xff00 ||
      (first === 0x2001 && groups[1] === 0x0db8)) return true;
  const embeddedV4 = groups.slice(0, 5).every((group) => group === 0) &&
    (groups[5] === 0 || groups[5] === 0xffff);
  if (embeddedV4) {
    const ipv4 = `${groups[6]! >> 8}.${groups[6]! & 0xff}.${groups[7]! >> 8}.${groups[7]! & 0xff}`;
    return prohibitedIpv4(ipv4);
  }
  return false;
}

export function parseContentDispositionFilename(header: string): string | undefined {
  const utf8Match = header.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
  if (utf8Match?.[1]) {
    return decodeURIComponent(utf8Match[1].trim());
  }
  const match = header.match(/filename="?([^";\n]+)"?/i);
  if (match?.[1]) {
    return match[1].trim();
  }
  return undefined;
}

export function filenameFromUrl(urlString: string, contentType?: string): string {
  try {
    const url = new URL(urlString);
    const name = path.posix.basename(url.pathname);
    if (name && name !== '/') return cleanFilename(name);
  } catch {
    // Invalid URL; fall through to default.
  }
  const ext = contentType ? (extensionForContentType(contentType) ?? '') : '';
  return `download${ext}`;
}

export function sanitizedUrlForDiagnostic(urlString: string): string {
  try {
    const url = new URL(urlString);
    return `${url.origin}${url.pathname}`;
  } catch {
    return '[invalid-url]';
  }
}

export function sanitizedUrlDiagnosticText(value: string): string {
  return value.replace(/https?:\/\/[^\s"'<>]+/giu, (candidate) =>
    sanitizedUrlForDiagnostic(candidate));
}

export function sanitizedUrlDiagnosticError(error: unknown, depth = 0): Error {
  if (depth > 5) return new Error('URL import error chain truncated.');
  if (!(error instanceof Error)) {
    return new Error(sanitizedUrlDiagnosticText(String(error)));
  }
  const sanitized = new Error(sanitizedUrlDiagnosticText(error.message));
  sanitized.name = error.name;
  if (error.stack) sanitized.stack = sanitizedUrlDiagnosticText(error.stack);
  const original = error as Error & { code?: unknown; reason?: unknown };
  const copy = sanitized as Error & { code?: string; reason?: string; cause?: unknown };
  if (typeof original.code === 'string') copy.code = original.code;
  if (typeof original.reason === 'string') copy.reason = original.reason;
  if (error.cause !== undefined) {
    copy.cause = sanitizedUrlDiagnosticError(error.cause, depth + 1);
  }
  return sanitized;
}

export const DEFAULT_LINKED_FOLDER_RULES: ReadonlyArray<Omit<LinkedFolderRule, 'ruleId'>> = [
  ...['.git', 'node_modules', '.svn', '.hg', '__pycache__'].map((pattern) => ({
    action: 'exclude' as const, target: 'folder' as const, pattern, enabled: true,
  })),
  ...['.DS_Store', 'Thumbs.db', 'desktop.ini'].map((pattern) => ({
    action: 'exclude' as const, target: 'filename' as const, pattern, enabled: true,
  })),
];

export const DEFAULT_IGNORED_ASSET_DIRECTORIES = new Set([
  '.git',
  '.hg',
  '.svn',
  '__pycache__',
  'node_modules',
]);
export const DEFAULT_IGNORED_ASSET_FILES = new Set([
  '.ds_store',
  'desktop.ini',
  'thumbs.db',
]);
export const ALWAYS_IGNORED_ASSET_FILES = new Set([
  '.ds_store',
  'desktop.ini',
  'thumbs.db',
]);

export function isDefaultIgnoredAssetEntry(name: string, kind: 'directory' | 'file'): boolean {
  const normalized = name.toLocaleLowerCase('en-US');
  if (kind === 'directory') return DEFAULT_IGNORED_ASSET_DIRECTORIES.has(normalized);
  if (normalized.startsWith('.serpent-text-edit-') && normalized.endsWith('.tmp')) {
    return true;
  }
  return DEFAULT_IGNORED_ASSET_FILES.has(normalized) || normalized.startsWith('._');
}

export function isAlwaysIgnoredAssetPath(relativePath: string): boolean {
  const filename = relativePath.replaceAll('\\', '/').split('/').filter(Boolean).at(-1);
  if (!filename) return false;
  const normalized = filename.toLocaleLowerCase('en-US');
  return ALWAYS_IGNORED_ASSET_FILES.has(normalized) || normalized.startsWith('._');
}

/**
 * Rescue happens only after the normal database and verified backups failed,
 * so counting the physical source files here is both useful for the report
 * and outside the large-library open/import hot path. Symlinks and Serpent's
 * filesystem noise are excluded to match the managed-source reconciler.
 */
export function countRecoverableAssetFiles(assetsRoot: string): number {
  let count = 0;
  const visit = (directory: string, relativeDirectory: string): void => {
    let entries;
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory() && isDefaultIgnoredAssetEntry(entry.name, 'directory')) continue;
      const relativePath = relativeDirectory === ''
        ? entry.name
        : `${relativeDirectory}/${entry.name}`;
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(absolutePath, relativePath);
      } else if (entry.isFile() && !isAlwaysIgnoredAssetPath(relativePath)) {
        count += 1;
      }
    }
  };
  visit(assetsRoot, '');
  return count;
}

export const INITIAL_SCHEMA_SQL = `
  CREATE TABLE schema_migrations (
    version INTEGER PRIMARY KEY,
    checksum TEXT NOT NULL,
    applied_at TEXT NOT NULL
  );

  CREATE TABLE library (
    library_id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`;
export const INITIAL_SCHEMA_CHECKSUM = createHash('sha256').update(INITIAL_SCHEMA_SQL).digest('hex');

export const ASSET_SCHEMA_SQL = `
  CREATE TABLE managed_folders (
    folder_id TEXT PRIMARY KEY,
    parent_folder_id TEXT REFERENCES managed_folders(folder_id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    relative_path TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
  );

  CREATE TABLE assets (
    asset_id TEXT PRIMARY KEY,
    location_kind TEXT NOT NULL CHECK (location_kind = 'managed'),
    managed_folder_id TEXT REFERENCES managed_folders(folder_id) ON DELETE RESTRICT,
    relative_file_path TEXT NOT NULL UNIQUE,
    current_revision_id TEXT,
    availability TEXT NOT NULL CHECK (availability IN ('available', 'missing')),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE revisions (
    revision_id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    parent_revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
    modified_at TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    origin TEXT NOT NULL CHECK (origin IN ('import', 'external_change', 'replace')),
    accepted_at TEXT NOT NULL
  );

  CREATE TABLE file_operations (
    operation_id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    status TEXT NOT NULL CHECK (
      status IN ('preparing', 'applying', 'committed', 'rolled_back', 'failed')
    ),
    manifest_json TEXT NOT NULL,
    error_code TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX assets_folder_path_idx
    ON assets(managed_folder_id, relative_file_path);
  CREATE INDEX revisions_asset_accepted_idx
    ON revisions(asset_id, accepted_at);
`;
export const ASSET_SCHEMA_CHECKSUM = createHash('sha256').update(ASSET_SCHEMA_SQL).digest('hex');

export const PORTABLE_PATH_SCHEMA_BEFORE_BACKFILL_SQL = `
  ALTER TABLE managed_folders ADD COLUMN path_identity TEXT;
  ALTER TABLE assets ADD COLUMN path_identity TEXT;
`;
export const PORTABLE_PATH_SCHEMA_AFTER_BACKFILL_SQL = `
  CREATE UNIQUE INDEX managed_folders_path_identity_unique
    ON managed_folders(path_identity);
  CREATE UNIQUE INDEX assets_path_identity_unique
    ON assets(path_identity);
  CREATE TRIGGER managed_folders_path_identity_required_insert
    BEFORE INSERT ON managed_folders
    WHEN NEW.path_identity IS NULL
    BEGIN SELECT RAISE(ABORT, 'managed folder path identity is required'); END;
  CREATE TRIGGER managed_folders_path_identity_required_update
    BEFORE UPDATE OF path_identity ON managed_folders
    WHEN NEW.path_identity IS NULL
    BEGIN SELECT RAISE(ABORT, 'managed folder path identity is required'); END;
  CREATE TRIGGER assets_path_identity_required_insert
    BEFORE INSERT ON assets
    WHEN NEW.path_identity IS NULL
    BEGIN SELECT RAISE(ABORT, 'asset path identity is required'); END;
  CREATE TRIGGER assets_path_identity_required_update
    BEFORE UPDATE OF path_identity ON assets
    WHEN NEW.path_identity IS NULL
    BEGIN SELECT RAISE(ABORT, 'asset path identity is required'); END;
`;
export const PORTABLE_PATH_BACKFILL_AUDIT_ID =
  'portable-path-identity:nfc-per-segment:ecmascript-upper-lower-casefold:v1';
export const PORTABLE_PATH_SCHEMA_CHECKSUM = createHash('sha256')
  .update(PORTABLE_PATH_SCHEMA_BEFORE_BACKFILL_SQL)
  .update(PORTABLE_PATH_BACKFILL_AUDIT_ID)
  .update(PORTABLE_PATH_SCHEMA_AFTER_BACKFILL_SQL)
  .digest('hex');

export const LINKED_FOLDERS_SCHEMA_SQL = `
  CREATE TABLE linked_folders (
    folder_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL REFERENCES library(library_id),
    display_name TEXT NOT NULL,
    absolute_root_path TEXT NOT NULL,
    source_device_hint TEXT,
    status TEXT NOT NULL CHECK (status IN ('available', 'offline')),
    path_identity TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  -- SQLite cannot ALTER a CHECK constraint, so the assets table is rebuilt to
  -- relax location_kind to 'managed' | 'linked', add linked_folder_id, and
  -- replace the global UNIQUE on relative_file_path / path_identity with
  -- location-scoped partial unique indexes: a linked asset's relative path is
  -- relative to its linked root, not globally unique across the library.
  CREATE TABLE assets_v4 (
    asset_id TEXT PRIMARY KEY,
    location_kind TEXT NOT NULL CHECK (location_kind IN ('managed', 'linked')),
    managed_folder_id TEXT REFERENCES managed_folders(folder_id) ON DELETE RESTRICT,
    linked_folder_id TEXT REFERENCES linked_folders(folder_id) ON DELETE RESTRICT,
    relative_file_path TEXT NOT NULL,
    current_revision_id TEXT,
    availability TEXT NOT NULL CHECK (availability IN ('available', 'missing')),
    path_identity TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    CHECK (
      (location_kind = 'managed' AND linked_folder_id IS NULL) OR
      (location_kind = 'linked' AND managed_folder_id IS NULL AND linked_folder_id IS NOT NULL)
    )
  );

  INSERT INTO assets_v4 (
    asset_id, location_kind, managed_folder_id, linked_folder_id,
    relative_file_path, current_revision_id, availability, path_identity,
    created_at, updated_at
  )
  SELECT
    asset_id, location_kind, managed_folder_id, NULL,
    relative_file_path, current_revision_id, availability, path_identity,
    created_at, updated_at
  FROM assets;

  DROP INDEX IF EXISTS assets_folder_path_idx;
  DROP INDEX IF EXISTS assets_path_identity_unique;
  DROP TRIGGER IF EXISTS assets_path_identity_required_insert;
  DROP TRIGGER IF EXISTS assets_path_identity_required_update;
  DROP TABLE assets;
  ALTER TABLE assets_v4 RENAME TO assets;

  CREATE INDEX assets_folder_path_idx
    ON assets(managed_folder_id, relative_file_path);
  CREATE INDEX assets_linked_folder_path_idx
    ON assets(linked_folder_id, relative_file_path);
  CREATE UNIQUE INDEX assets_managed_relative_unique
    ON assets(relative_file_path) WHERE location_kind = 'managed';
  CREATE UNIQUE INDEX assets_managed_path_identity_unique
    ON assets(path_identity) WHERE location_kind = 'managed';
  CREATE UNIQUE INDEX assets_linked_relative_unique
    ON assets(linked_folder_id, relative_file_path) WHERE location_kind = 'linked';
  CREATE UNIQUE INDEX assets_linked_path_identity_unique
    ON assets(linked_folder_id, path_identity) WHERE location_kind = 'linked';
  CREATE TRIGGER assets_path_identity_required_insert
    BEFORE INSERT ON assets WHEN NEW.path_identity IS NULL
    BEGIN SELECT RAISE(ABORT, 'asset path identity is required'); END;
  CREATE TRIGGER assets_path_identity_required_update
    BEFORE UPDATE OF path_identity ON assets WHEN NEW.path_identity IS NULL
    BEGIN SELECT RAISE(ABORT, 'asset path identity is required'); END;
`;
export const LINKED_FOLDERS_SCHEMA_CHECKSUM = createHash('sha256')
  .update(LINKED_FOLDERS_SCHEMA_SQL)
  .digest('hex');

export const ORGANIZATION_SCHEMA_SQL = `
  CREATE TABLE tags (
    tag_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL REFERENCES library(library_id),
    name TEXT NOT NULL COLLATE NOCASE,
    created_at TEXT NOT NULL,
    UNIQUE (library_id, name COLLATE NOCASE)
  );

  CREATE TABLE human_asset_tags (
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    tag_id TEXT NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (asset_id, tag_id)
  );

  -- AI tag relationships are structurally ready but not written until slice 0009.
  CREATE TABLE ai_asset_tags (
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    tag_id TEXT NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    model_id TEXT NOT NULL,
    model_version TEXT NOT NULL,
    PRIMARY KEY (asset_id, tag_id)
  );

  CREATE TABLE asset_metadata (
    asset_id TEXT PRIMARY KEY REFERENCES assets(asset_id) ON DELETE CASCADE,
    label TEXT,
    description TEXT,
    rating INTEGER NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    favorite INTEGER NOT NULL DEFAULT 0 CHECK (favorite IN (0, 1)),
    palette TEXT,
    source_page_url TEXT,
    entity_version INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE collections (
    collection_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL REFERENCES library(library_id),
    parent_id TEXT REFERENCES collections(collection_id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    cover_asset_id TEXT REFERENCES assets(asset_id) ON DELETE SET NULL,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE collection_assets (
    collection_id TEXT NOT NULL REFERENCES collections(collection_id) ON DELETE CASCADE,
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    position INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (collection_id, asset_id)
  );

  CREATE TABLE smart_collections (
    smart_collection_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL REFERENCES library(library_id),
    name TEXT NOT NULL,
    query_definition TEXT NOT NULL,
    sort_definition TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX tags_library_idx ON tags(library_id);
  CREATE INDEX human_asset_tags_tag_idx ON human_asset_tags(tag_id);
  CREATE INDEX ai_asset_tags_tag_idx ON ai_asset_tags(tag_id);
  CREATE INDEX collections_library_parent_idx ON collections(library_id, parent_id);
  CREATE INDEX collection_assets_asset_idx ON collection_assets(asset_id);
  CREATE INDEX smart_collections_library_idx ON smart_collections(library_id);
`;
export const ORGANIZATION_SCHEMA_CHECKSUM = createHash('sha256')
  .update(ORGANIZATION_SCHEMA_SQL)
  .digest('hex');

export const SEARCH_SCHEMA_SQL = `
  CREATE TABLE asset_search_index (
    asset_id TEXT UNIQUE NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    label TEXT NOT NULL DEFAULT '',
    filename TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    source_url TEXT NOT NULL DEFAULT '',
    folder_path TEXT NOT NULL DEFAULT '',
    metadata_text TEXT NOT NULL DEFAULT ''
  );

  CREATE VIRTUAL TABLE asset_search USING fts5(
    label,
    filename,
    tags,
    description,
    source_url,
    folder_path,
    metadata_text,
    content='asset_search_index'
  );

  CREATE TRIGGER asset_search_index_ai AFTER INSERT ON asset_search_index BEGIN
    INSERT INTO asset_search(rowid, label, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES (new.rowid, new.label, new.filename, new.tags, new.description,
            new.source_url, new.folder_path, new.metadata_text);
  END;

  CREATE TRIGGER asset_search_index_ad AFTER DELETE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, label, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.label, old.filename, old.tags, old.description,
            old.source_url, old.folder_path, old.metadata_text);
  END;

  CREATE TRIGGER asset_search_index_au AFTER UPDATE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, label, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.label, old.filename, old.tags, old.description,
            old.source_url, old.folder_path, old.metadata_text);
    INSERT INTO asset_search(rowid, label, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES (new.rowid, new.label, new.filename, new.tags, new.description,
            new.source_url, new.folder_path, new.metadata_text);
  END;

  -- Rebuild smart_collections for v6 shape (collection_id pk, query_definition_json,
  -- position, UNIQUE(library_id, name)). Requires FK disable as DROP TABLE cascades.
  CREATE TABLE smart_collections_v6 (
    collection_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL REFERENCES library(library_id),
    name TEXT NOT NULL,
    query_definition_json TEXT NOT NULL,
    position INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  INSERT INTO smart_collections_v6 (collection_id, library_id, name, query_definition_json, position, created_at, updated_at)
  SELECT
    smart_collection_id,
    library_id,
    name,
    '{"query":' || json_quote(query_definition) || ',"sort":' || json_quote(sort_definition) || '}',
    0,
    created_at,
    updated_at
  FROM smart_collections;

  DROP TABLE smart_collections;
  ALTER TABLE smart_collections_v6 RENAME TO smart_collections;

  CREATE UNIQUE INDEX smart_collections_library_name_unique
    ON smart_collections(library_id, name);
`;
export const SEARCH_SCHEMA_CHECKSUM = createHash('sha256')
  .update(SEARCH_SCHEMA_SQL)
  .digest('hex');

export const TRASH_SCHEMA_SQL = `
  ALTER TABLE assets ADD COLUMN deleted_at TEXT;
  ALTER TABLE assets ADD COLUMN trashed_from_relative_path TEXT;
  ALTER TABLE assets ADD COLUMN trashed_from_folder_id TEXT
    REFERENCES managed_folders(folder_id) ON DELETE SET NULL;

  CREATE INDEX assets_deleted_at_idx ON assets(deleted_at) WHERE deleted_at IS NOT NULL;
  CREATE INDEX assets_deleted_folder_idx ON assets(trashed_from_folder_id) WHERE deleted_at IS NOT NULL;

  -- The v7 migration is additive on assets but must relax the revisions.origin
  -- CHECK constraint to include 'relink'. SQLite cannot ALTER a CHECK constraint,
  -- so the revisions table is rebuilt. FK relationships (asset_id REFERENCES
  -- assets, parent_revision_id REFERENCES revisions) must be preserved.
  -- PRAGMA foreign_keys is OFF during this migration to prevent DROP TABLE from
  -- cascading through child FKs; assets rows are NOT touched by this rebuild.
  CREATE TABLE revisions_v7 (
    revision_id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    parent_revision_id TEXT REFERENCES revisions_v7(revision_id) ON DELETE SET NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
    modified_at TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    origin TEXT NOT NULL CHECK (origin IN ('import', 'external_change', 'replace', 'relink')),
    accepted_at TEXT NOT NULL
  );

  INSERT INTO revisions_v7
    (revision_id, asset_id, parent_revision_id, byte_size, modified_at,
     original_filename, origin, accepted_at)
  SELECT revision_id, asset_id, parent_revision_id, byte_size, modified_at,
         original_filename, origin, accepted_at
    FROM revisions;

  DROP TABLE revisions;
  ALTER TABLE revisions_v7 RENAME TO revisions;

  DROP INDEX IF EXISTS revisions_asset_accepted_idx;
  CREATE INDEX revisions_asset_accepted_idx
    ON revisions(asset_id, accepted_at);
`;
export const TRASH_SCHEMA_CHECKSUM = createHash('sha256')
  .update(TRASH_SCHEMA_SQL)
  .digest('hex');

export const AI_CONTENT_SCHEMA_SQL = `
  CREATE TABLE ai_content (
    ai_content_id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    field_name TEXT NOT NULL CHECK (field_name IN ('label', 'description', 'structured_metadata')),
    value TEXT NOT NULL,
    model_id TEXT NOT NULL,
    model_version TEXT NOT NULL,
    generated_at TEXT NOT NULL
  );

  CREATE INDEX ai_content_asset_field ON ai_content(asset_id, field_name);
`;
export const AI_CONTENT_SCHEMA_CHECKSUM = createHash('sha256')
  .update(AI_CONTENT_SCHEMA_SQL)
  .digest('hex');

export const THUMBNAIL_SCHEMA_SQL = `
  CREATE TABLE revision_artifacts (
    artifact_id TEXT PRIMARY KEY,
    revision_id TEXT NOT NULL REFERENCES revisions(revision_id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (
      kind IN ('thumbnail', 'video_poster', 'contact_sheet', 'webm_proxy',
               'extracted_metadata', 'extracted_palette')
    ),
    mime_type TEXT NOT NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
    file_path TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    generator_version TEXT NOT NULL,
    status TEXT NOT NULL CHECK (
      status IN ('pending', 'generating', 'ready', 'failed')
    ),
    error_code TEXT,
    generated_at TEXT,
    invalidated_at TEXT
  );

  CREATE UNIQUE INDEX revision_artifacts_current
    ON revision_artifacts(revision_id, kind)
    WHERE invalidated_at IS NULL;

  CREATE TABLE jobs (
    job_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL,
    asset_id TEXT REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    kind TEXT NOT NULL CHECK (
      kind IN ('generate_thumbnail', 'generate_video_poster',
               'generate_contact_sheet', 'generate_webm_proxy',
               'extract_metadata', 'extract_palette')
    ),
    status TEXT NOT NULL CHECK (
      status IN ('queued', 'running', 'paused', 'succeeded', 'failed', 'cancelled')
    ),
    priority INTEGER NOT NULL DEFAULT 0,
    progress REAL DEFAULT 0.0,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    error_code TEXT,
    error_detail TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX jobs_library_status_priority
    ON jobs(library_id, status, priority DESC, created_at);
`;
export const THUMBNAIL_SCHEMA_CHECKSUM = createHash('sha256')
  .update(THUMBNAIL_SCHEMA_SQL)
  .digest('hex');

// Migration v10: add AI analysis job kinds to the jobs table CHECK constraint.
// SQLite cannot ALTER a CHECK constraint; we recreate the table in-place.
export const AI_JOBS_SCHEMA_SQL = `
  CREATE TABLE jobs_new (
    job_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL,
    asset_id TEXT REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    kind TEXT NOT NULL CHECK (
      kind IN ('generate_thumbnail', 'generate_video_poster',
               'generate_contact_sheet', 'generate_webm_proxy',
               'extract_metadata', 'extract_palette',
               'ai.image.analysis', 'ai.video.analysis')
    ),
    status TEXT NOT NULL CHECK (
      status IN ('queued', 'running', 'paused', 'succeeded', 'failed', 'cancelled')
    ),
    priority INTEGER NOT NULL DEFAULT 0,
    progress REAL DEFAULT 0.0,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    error_code TEXT,
    error_detail TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  INSERT INTO jobs_new SELECT * FROM jobs;
  DROP TABLE jobs;
  ALTER TABLE jobs_new RENAME TO jobs;

  CREATE INDEX jobs_library_status_priority
    ON jobs(library_id, status, priority DESC, created_at);
`;
export const AI_JOBS_SCHEMA_CHECKSUM = createHash('sha256')
  .update(AI_JOBS_SCHEMA_SQL)
  .digest('hex');

export const MEDIA_DURATION_SCHEMA_SQL = `
  ALTER TABLE revision_artifacts ADD COLUMN duration_ms INTEGER
    CHECK (duration_ms IS NULL OR duration_ms >= 0);
  CREATE INDEX revision_artifacts_duration_idx
    ON revision_artifacts(duration_ms)
    WHERE kind = 'extracted_metadata' AND status = 'ready' AND invalidated_at IS NULL;
`;
export const MEDIA_DURATION_SCHEMA_CHECKSUM = createHash('sha256')
  .update(MEDIA_DURATION_SCHEMA_SQL)
  .digest('hex');

export const PALETTE_SORT_SCHEMA_SQL = `
  ALTER TABLE revision_artifacts ADD COLUMN dominant_hue REAL
    CHECK (dominant_hue IS NULL OR (dominant_hue >= 0 AND dominant_hue < 360));
  ALTER TABLE revision_artifacts ADD COLUMN dominant_lightness REAL
    CHECK (dominant_lightness IS NULL OR (dominant_lightness >= 0 AND dominant_lightness <= 1));
  CREATE INDEX revision_artifacts_palette_sort_idx
    ON revision_artifacts(dominant_hue, dominant_lightness)
    WHERE kind = 'extracted_palette' AND status = 'ready' AND invalidated_at IS NULL;
`;
export const PALETTE_SORT_SCHEMA_CHECKSUM = createHash('sha256')
  .update(PALETTE_SORT_SCHEMA_SQL)
  .digest('hex');

export const LINKED_FOLDER_RULES_SCHEMA_SQL = `
  CREATE TABLE linked_folder_rules (
    rule_id TEXT PRIMARY KEY,
    folder_id TEXT NOT NULL REFERENCES linked_folders(folder_id) ON DELETE CASCADE,
    position INTEGER NOT NULL CHECK (position >= 0),
    action TEXT NOT NULL CHECK (action IN ('include', 'exclude')),
    target TEXT NOT NULL CHECK (target IN ('path', 'filename', 'extension', 'folder')),
    pattern TEXT NOT NULL,
    enabled INTEGER NOT NULL CHECK (enabled IN (0, 1)),
    UNIQUE(folder_id, position)
  );
  CREATE INDEX linked_folder_rules_folder ON linked_folder_rules(folder_id, position);

  CREATE TABLE linked_ignored_assets (
    asset_id TEXT PRIMARY KEY REFERENCES assets(asset_id) ON DELETE CASCADE,
    ignored_at TEXT NOT NULL
  );

  INSERT INTO linked_folder_rules(rule_id, folder_id, position, action, target, pattern, enabled)
    SELECT folder_id || ':default:0', folder_id, 0, 'exclude', 'folder', '.git', 1 FROM linked_folders;
  INSERT INTO linked_folder_rules SELECT folder_id || ':default:1', folder_id, 1, 'exclude', 'folder', 'node_modules', 1 FROM linked_folders;
  INSERT INTO linked_folder_rules SELECT folder_id || ':default:2', folder_id, 2, 'exclude', 'folder', '.svn', 1 FROM linked_folders;
  INSERT INTO linked_folder_rules SELECT folder_id || ':default:3', folder_id, 3, 'exclude', 'folder', '.hg', 1 FROM linked_folders;
  INSERT INTO linked_folder_rules SELECT folder_id || ':default:4', folder_id, 4, 'exclude', 'folder', '__pycache__', 1 FROM linked_folders;
  INSERT INTO linked_folder_rules SELECT folder_id || ':default:5', folder_id, 5, 'exclude', 'filename', '.DS_Store', 1 FROM linked_folders;
  INSERT INTO linked_folder_rules SELECT folder_id || ':default:6', folder_id, 6, 'exclude', 'filename', 'Thumbs.db', 1 FROM linked_folders;
  INSERT INTO linked_folder_rules SELECT folder_id || ':default:7', folder_id, 7, 'exclude', 'filename', 'desktop.ini', 1 FROM linked_folders;
`;
export const LINKED_FOLDER_RULES_SCHEMA_CHECKSUM = createHash('sha256')
  .update(LINKED_FOLDER_RULES_SCHEMA_SQL)
  .digest('hex');

// Migration v14: retire the pre-release asset Label concept. Real filenames,
// descriptions, ratings, favorites, palettes, source URLs, and tag relations
// remain intact. Label values are intentionally discarded rather than mapped
// to filenames or tags because neither mapping preserves their semantics.
export const RETIRE_ASSET_LABEL_SCHEMA_SQL = `
  -- A saved query that explicitly depended on Label cannot be translated to
  -- filename, tags, or description without changing user intent. Delete these
  -- pre-release smart collections instead of leaving a silently empty result.
  DELETE FROM smart_collections
   WHERE json_valid(query_definition_json)
     AND EXISTS (
       SELECT 1
         FROM json_tree(smart_collections.query_definition_json)
        WHERE json_tree.key = 'field' AND json_tree.value = 'label'
     );

  CREATE TABLE asset_metadata_v14 (
    asset_id TEXT PRIMARY KEY REFERENCES assets(asset_id) ON DELETE CASCADE,
    description TEXT,
    rating INTEGER NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    favorite INTEGER NOT NULL DEFAULT 0 CHECK (favorite IN (0, 1)),
    palette TEXT,
    source_page_url TEXT,
    entity_version INTEGER NOT NULL DEFAULT 1,
    updated_at TEXT NOT NULL
  );
  INSERT INTO asset_metadata_v14
    (asset_id, description, rating, favorite, palette, source_page_url,
     entity_version, updated_at)
  SELECT asset_id, description, rating, favorite, palette, source_page_url,
         entity_version, updated_at
    FROM asset_metadata;
  DROP TABLE asset_metadata;
  ALTER TABLE asset_metadata_v14 RENAME TO asset_metadata;

  CREATE TABLE ai_content_v14 (
    ai_content_id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    field_name TEXT NOT NULL CHECK (field_name IN ('description', 'structured_metadata')),
    value TEXT NOT NULL,
    model_id TEXT NOT NULL,
    model_version TEXT NOT NULL,
    generated_at TEXT NOT NULL
  );
  INSERT INTO ai_content_v14
    (ai_content_id, asset_id, revision_id, field_name, value,
     model_id, model_version, generated_at)
  SELECT ai_content_id, asset_id, revision_id, field_name, value,
         model_id, model_version, generated_at
    FROM ai_content
   WHERE field_name <> 'label';
  DROP TABLE ai_content;
  ALTER TABLE ai_content_v14 RENAME TO ai_content;
  CREATE INDEX ai_content_asset_field ON ai_content(asset_id, field_name);

  DROP TRIGGER IF EXISTS asset_search_index_ai;
  DROP TRIGGER IF EXISTS asset_search_index_ad;
  DROP TRIGGER IF EXISTS asset_search_index_au;
  DROP TABLE asset_search;

  CREATE TABLE asset_search_index_v14 (
    asset_id TEXT UNIQUE NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    filename TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    source_url TEXT NOT NULL DEFAULT '',
    folder_path TEXT NOT NULL DEFAULT '',
    metadata_text TEXT NOT NULL DEFAULT ''
  );
  INSERT INTO asset_search_index_v14
    (asset_id, filename, tags, description, source_url, folder_path, metadata_text)
  SELECT asset_id, filename, tags, description, source_url, folder_path, metadata_text
    FROM asset_search_index;
  DROP TABLE asset_search_index;
  ALTER TABLE asset_search_index_v14 RENAME TO asset_search_index;

  CREATE VIRTUAL TABLE asset_search USING fts5(
    filename,
    tags,
    description,
    source_url,
    folder_path,
    metadata_text,
    content='asset_search_index'
  );
  CREATE TRIGGER asset_search_index_ai AFTER INSERT ON asset_search_index BEGIN
    INSERT INTO asset_search(rowid, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES (new.rowid, new.filename, new.tags, new.description,
            new.source_url, new.folder_path, new.metadata_text);
  END;
  CREATE TRIGGER asset_search_index_ad AFTER DELETE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.filename, old.tags, old.description,
            old.source_url, old.folder_path, old.metadata_text);
  END;
  CREATE TRIGGER asset_search_index_au AFTER UPDATE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.filename, old.tags, old.description,
            old.source_url, old.folder_path, old.metadata_text);
    INSERT INTO asset_search(rowid, filename, tags, description, source_url, folder_path, metadata_text)
    VALUES (new.rowid, new.filename, new.tags, new.description,
            new.source_url, new.folder_path, new.metadata_text);
  END;
  INSERT INTO asset_search(asset_search) VALUES('rebuild');
`;
export const RETIRE_ASSET_LABEL_SCHEMA_CHECKSUM = createHash('sha256')
  .update(RETIRE_ASSET_LABEL_SCHEMA_SQL)
  .digest('hex');

// Migration v15 (Serpent-7x0): add an author/creator metadata field, editable
// by users and auto-populated from EXIF/IPTC/XMP on first thumbnail
// generation. FTS5 content tables cannot have a column appended in place, so
// the search index and its triggers are rebuilt with an `author` column
// alongside the existing `source_url` column, mirroring the v14 rebuild.
export const AUTHOR_METADATA_SCHEMA_SQL = `
  ALTER TABLE asset_metadata ADD COLUMN author TEXT;

  DROP TRIGGER IF EXISTS asset_search_index_ai;
  DROP TRIGGER IF EXISTS asset_search_index_ad;
  DROP TRIGGER IF EXISTS asset_search_index_au;
  DROP TABLE asset_search;

  ALTER TABLE asset_search_index ADD COLUMN author TEXT NOT NULL DEFAULT '';

  CREATE VIRTUAL TABLE asset_search USING fts5(
    filename,
    tags,
    description,
    source_url,
    author,
    folder_path,
    metadata_text,
    content='asset_search_index'
  );
  CREATE TRIGGER asset_search_index_ai AFTER INSERT ON asset_search_index BEGIN
    INSERT INTO asset_search(rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES (new.rowid, new.filename, new.tags, new.description,
            new.source_url, new.author, new.folder_path, new.metadata_text);
  END;
  CREATE TRIGGER asset_search_index_ad AFTER DELETE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.filename, old.tags, old.description,
            old.source_url, old.author, old.folder_path, old.metadata_text);
  END;
  CREATE TRIGGER asset_search_index_au AFTER UPDATE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.filename, old.tags, old.description,
            old.source_url, old.author, old.folder_path, old.metadata_text);
    INSERT INTO asset_search(rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES (new.rowid, new.filename, new.tags, new.description,
            new.source_url, new.author, new.folder_path, new.metadata_text);
  END;
  INSERT INTO asset_search(asset_search) VALUES('rebuild');
`;
export const AUTHOR_METADATA_SCHEMA_CHECKSUM = createHash('sha256')
  .update(AUTHOR_METADATA_SCHEMA_SQL)
  .digest('hex');

// Migration v16 (F8 / Serpent-1us6): AI aesthetic rating in ai_content;
// retire structured_metadata bag.
export const AI_RATING_CONTENT_SCHEMA_SQL = `
  DELETE FROM ai_content WHERE field_name = 'structured_metadata';

  CREATE TABLE ai_content_v16 (
    ai_content_id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    field_name TEXT NOT NULL CHECK (field_name IN ('description', 'rating')),
    value TEXT NOT NULL,
    model_id TEXT NOT NULL,
    model_version TEXT NOT NULL,
    generated_at TEXT NOT NULL
  );
  INSERT INTO ai_content_v16
    (ai_content_id, asset_id, revision_id, field_name, value,
     model_id, model_version, generated_at)
  SELECT ai_content_id, asset_id, revision_id, field_name, value,
         model_id, model_version, generated_at
    FROM ai_content
   WHERE field_name IN ('description', 'rating');
  DROP TABLE ai_content;
  ALTER TABLE ai_content_v16 RENAME TO ai_content;
  CREATE INDEX ai_content_asset_field ON ai_content(asset_id, field_name);
`;
export const AI_RATING_CONTENT_SCHEMA_CHECKSUM = createHash('sha256')
  .update(AI_RATING_CONTENT_SCHEMA_SQL)
  .digest('hex');

export const TRASHED_MANAGED_FOLDERS_SCHEMA_SQL = `
  CREATE TABLE trashed_managed_folders (
    tombstone_id TEXT PRIMARY KEY,
    folder_id TEXT NOT NULL,
    relative_path TEXT NOT NULL,
    name TEXT NOT NULL,
    parent_relative_path TEXT,
    trashed_at TEXT NOT NULL,
    trashed_asset_count INTEGER NOT NULL CHECK (trashed_asset_count >= 0)
  );

  CREATE INDEX trashed_managed_folders_trashed_at_idx
    ON trashed_managed_folders(trashed_at DESC);
`;
export const TRASHED_MANAGED_FOLDERS_SCHEMA_CHECKSUM = createHash('sha256')
  .update(TRASHED_MANAGED_FOLDERS_SCHEMA_SQL)
  .digest('hex');

// Migration v18 (Serpent-wcnk): replace exact-token FTS with a raw,
// normalized trigram index. FTS5's trigram tokenizer accelerates arbitrary
// contains matching for terms of three or more characters; the Worker applies
// the same exact predicate for shorter terms so one-character search remains
// correct instead of silently returning no results.
export const CONTEXTUAL_SUBSTRING_SEARCH_SCHEMA_SQL = `
  DROP TRIGGER IF EXISTS asset_search_index_ai;
  DROP TRIGGER IF EXISTS asset_search_index_ad;
  DROP TRIGGER IF EXISTS asset_search_index_au;
  DROP TABLE asset_search;
  DELETE FROM asset_search_index;

  CREATE VIRTUAL TABLE asset_search USING fts5(
    filename,
    tags,
    description,
    source_url,
    author,
    folder_path,
    metadata_text,
    content='asset_search_index',
    tokenize='trigram case_sensitive 0'
  );
  CREATE TRIGGER asset_search_index_ai AFTER INSERT ON asset_search_index BEGIN
    INSERT INTO asset_search(rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES (new.rowid, new.filename, new.tags, new.description,
            new.source_url, new.author, new.folder_path, new.metadata_text);
  END;
  CREATE TRIGGER asset_search_index_ad AFTER DELETE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.filename, old.tags, old.description,
            old.source_url, old.author, old.folder_path, old.metadata_text);
  END;
  CREATE TRIGGER asset_search_index_au AFTER UPDATE ON asset_search_index BEGIN
    INSERT INTO asset_search(asset_search, rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES ('delete', old.rowid, old.filename, old.tags, old.description,
            old.source_url, old.author, old.folder_path, old.metadata_text);
    INSERT INTO asset_search(rowid, filename, tags, description, source_url, author, folder_path, metadata_text)
    VALUES (new.rowid, new.filename, new.tags, new.description,
            new.source_url, new.author, new.folder_path, new.metadata_text);
  END;
`;
export const CONTEXTUAL_SUBSTRING_SEARCH_SCHEMA_CHECKSUM = createHash('sha256')
  .update(CONTEXTUAL_SUBSTRING_SEARCH_SCHEMA_SQL)
  .digest('hex');

// Migration v19 (Serpent-3cz9): AI descriptions are stored separately from
// human metadata. Rebuild the canonical search index so existing AI analysis
// results are searchable without requiring a new analysis run.
export const AI_DESCRIPTION_SEARCH_BACKFILL_SCHEMA_SQL = `
  DELETE FROM asset_search_index;
`;
export const AI_DESCRIPTION_SEARCH_BACKFILL_SCHEMA_CHECKSUM = createHash('sha256')
  .update(AI_DESCRIPTION_SEARCH_BACKFILL_SCHEMA_SQL)
  .digest('hex');

// Migration v20 (Serpent-whvm / jcur): durable trash-folder binding so
// same-name tombstones do not share assets/covers after managed_folders rows
// are deleted (trashed_from_folder_id is FK ON DELETE SET NULL).
export const TRASH_TOMBSTONE_ASSET_BIND_SCHEMA_SQL = `
  ALTER TABLE assets ADD COLUMN trashed_from_tombstone_id TEXT;
  CREATE INDEX assets_trashed_tombstone_idx
    ON assets(trashed_from_tombstone_id)
    WHERE deleted_at IS NOT NULL AND trashed_from_tombstone_id IS NOT NULL;
`;
export const TRASH_TOMBSTONE_ASSET_BIND_SCHEMA_CHECKSUM = createHash('sha256')
  .update(TRASH_TOMBSTONE_ASSET_BIND_SCHEMA_SQL)
  .digest('hex');

// Migration v21 (Serpent-aav1): audio must not depend on Chromium's variable
// container/codec support. Add a distinct Opus/Ogg playback proxy and job kind
// without changing the established video WebM artifact contract.
export const MEDIA_PROXY_SCHEMA_SQL = `
  CREATE TABLE revision_artifacts_v21 (
    artifact_id TEXT PRIMARY KEY,
    revision_id TEXT NOT NULL REFERENCES revisions(revision_id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (
      kind IN ('thumbnail', 'video_poster', 'contact_sheet', 'webm_proxy', 'audio_proxy',
               'extracted_metadata', 'extracted_palette')
    ),
    mime_type TEXT NOT NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
    file_path TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    generator_version TEXT NOT NULL,
    status TEXT NOT NULL CHECK (
      status IN ('pending', 'generating', 'ready', 'failed')
    ),
    error_code TEXT,
    generated_at TEXT,
    invalidated_at TEXT,
    duration_ms INTEGER CHECK (duration_ms IS NULL OR duration_ms >= 0),
    dominant_hue REAL CHECK (dominant_hue IS NULL OR (dominant_hue >= 0 AND dominant_hue < 360)),
    dominant_lightness REAL CHECK (dominant_lightness IS NULL OR (dominant_lightness >= 0 AND dominant_lightness <= 1))
  );
  INSERT INTO revision_artifacts_v21
    (artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
     generator_version, status, error_code, generated_at, invalidated_at, duration_ms,
     dominant_hue, dominant_lightness)
    SELECT artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
           generator_version, status, error_code, generated_at, invalidated_at, duration_ms,
           dominant_hue, dominant_lightness
      FROM revision_artifacts;
  DROP TABLE revision_artifacts;
  ALTER TABLE revision_artifacts_v21 RENAME TO revision_artifacts;
  CREATE UNIQUE INDEX revision_artifacts_current
    ON revision_artifacts(revision_id, kind)
    WHERE invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_duration_idx
    ON revision_artifacts(duration_ms)
    WHERE kind = 'extracted_metadata' AND status = 'ready' AND invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_palette_sort_idx
    ON revision_artifacts(dominant_hue, dominant_lightness)
    WHERE kind = 'extracted_palette' AND status = 'ready' AND invalidated_at IS NULL;

  CREATE TABLE jobs_v21 (
    job_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL,
    asset_id TEXT REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    kind TEXT NOT NULL CHECK (
      kind IN ('generate_thumbnail', 'generate_video_poster',
               'generate_contact_sheet', 'generate_webm_proxy', 'generate_audio_proxy',
               'extract_metadata', 'extract_palette',
               'ai.image.analysis', 'ai.video.analysis')
    ),
    status TEXT NOT NULL CHECK (
      status IN ('queued', 'running', 'paused', 'succeeded', 'failed', 'cancelled')
    ),
    priority INTEGER NOT NULL DEFAULT 0,
    progress REAL DEFAULT 0.0,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    error_code TEXT,
    error_detail TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  INSERT INTO jobs_v21 SELECT * FROM jobs;
  DROP TABLE jobs;
  ALTER TABLE jobs_v21 RENAME TO jobs;
  CREATE INDEX jobs_library_status_priority
    ON jobs(library_id, status, priority DESC, created_at);
`;
export const MEDIA_PROXY_SCHEMA_CHECKSUM = createHash('sha256')
  .update(MEDIA_PROXY_SCHEMA_SQL)
  .digest('hex');

// Migration v22 (Serpent-aoj0): keep a user-selected input color space
// separate from file metadata so the source remains untouched and clearing the
// override restores automatic detection.
export const COLOR_SPACE_OVERRIDE_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS asset_color_space_overrides (
    asset_id TEXT PRIMARY KEY REFERENCES assets(asset_id) ON DELETE CASCADE,
    color_space TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`;
export const COLOR_SPACE_OVERRIDE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(COLOR_SPACE_OVERRIDE_SCHEMA_SQL)
  .digest('hex');

export const IMAGE_SEQUENCE_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS asset_sequences (
    sequence_id TEXT PRIMARY KEY,
    primary_asset_id TEXT NOT NULL UNIQUE REFERENCES assets(asset_id) ON DELETE CASCADE,
    fps REAL NOT NULL CHECK(fps >= 1 AND fps <= 240),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS asset_sequence_frames (
    sequence_id TEXT NOT NULL REFERENCES asset_sequences(sequence_id) ON DELETE CASCADE,
    asset_id TEXT NOT NULL UNIQUE REFERENCES assets(asset_id) ON DELETE CASCADE,
    frame_number INTEGER NOT NULL CHECK(frame_number >= 0),
    position INTEGER NOT NULL CHECK(position >= 0),
    PRIMARY KEY(sequence_id, position),
    UNIQUE(sequence_id, frame_number)
  );
  CREATE INDEX IF NOT EXISTS idx_asset_sequence_frames_asset
    ON asset_sequence_frames(asset_id);
`;
export const IMAGE_SEQUENCE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(IMAGE_SEQUENCE_SCHEMA_SQL)
  .digest('hex');

/**
 * Cross-process writers coordinate through these two durable tables.  The
 * sequence is maintained by SQLite triggers, so it commits or rolls back with
 * the mutation that caused it; it is never a best-effort notification emitted
 * after the fact.  Every library database contains exactly one library row,
 * which keeps the trigger body independent from the mutated table's shape.
 */
export const WRITE_COORDINATION_SCHEMA_SQL = `
  CREATE TABLE library_write_leases (
    library_id TEXT PRIMARY KEY REFERENCES library(library_id) ON DELETE CASCADE,
    owner_id TEXT NOT NULL,
    acquired_at_ms INTEGER NOT NULL CHECK(acquired_at_ms >= 0),
    expires_at_ms INTEGER NOT NULL CHECK(expires_at_ms > acquired_at_ms)
  );

  CREATE TABLE library_change_sequence (
    library_id TEXT PRIMARY KEY REFERENCES library(library_id) ON DELETE CASCADE,
    sequence INTEGER NOT NULL DEFAULT 0 CHECK(sequence >= 0)
  );

  INSERT INTO library_change_sequence (library_id, sequence)
    SELECT library_id, 0 FROM library;

  -- Fresh libraries insert their single library row after all migrations have
  -- run, so seed that row as well as pre-existing libraries migrated to v24.
  CREATE TRIGGER library_change_sequence_seed AFTER INSERT ON library BEGIN
    INSERT OR IGNORE INTO library_change_sequence (library_id, sequence)
      VALUES (NEW.library_id, 0);
  END;

  CREATE TRIGGER library_change_on_assets_insert AFTER INSERT ON assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_assets_update AFTER UPDATE ON assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_assets_delete AFTER DELETE ON assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revisions_insert AFTER INSERT ON revisions BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revisions_update AFTER UPDATE ON revisions BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revisions_delete AFTER DELETE ON revisions BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_managed_folders_insert AFTER INSERT ON managed_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_managed_folders_update AFTER UPDATE ON managed_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_managed_folders_delete AFTER DELETE ON managed_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_folders_insert AFTER INSERT ON linked_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_folders_update AFTER UPDATE ON linked_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_folders_delete AFTER DELETE ON linked_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_ignored_assets_insert AFTER INSERT ON linked_ignored_assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_ignored_assets_update AFTER UPDATE ON linked_ignored_assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_ignored_assets_delete AFTER DELETE ON linked_ignored_assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_folder_rules_insert AFTER INSERT ON linked_folder_rules BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_folder_rules_update AFTER UPDATE ON linked_folder_rules BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_linked_folder_rules_delete AFTER DELETE ON linked_folder_rules BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_metadata_insert AFTER INSERT ON asset_metadata BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_metadata_update AFTER UPDATE ON asset_metadata BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_metadata_delete AFTER DELETE ON asset_metadata BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_color_space_overrides_insert AFTER INSERT ON asset_color_space_overrides BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_color_space_overrides_update AFTER UPDATE ON asset_color_space_overrides BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_color_space_overrides_delete AFTER DELETE ON asset_color_space_overrides BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_tags_insert AFTER INSERT ON tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_tags_update AFTER UPDATE ON tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_tags_delete AFTER DELETE ON tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_human_asset_tags_insert AFTER INSERT ON human_asset_tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_human_asset_tags_update AFTER UPDATE ON human_asset_tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_human_asset_tags_delete AFTER DELETE ON human_asset_tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_ai_asset_tags_insert AFTER INSERT ON ai_asset_tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_ai_asset_tags_update AFTER UPDATE ON ai_asset_tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_ai_asset_tags_delete AFTER DELETE ON ai_asset_tags BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_collections_insert AFTER INSERT ON collections BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_collections_update AFTER UPDATE ON collections BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_collections_delete AFTER DELETE ON collections BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_collection_assets_insert AFTER INSERT ON collection_assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_collection_assets_update AFTER UPDATE ON collection_assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_collection_assets_delete AFTER DELETE ON collection_assets BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_smart_collections_insert AFTER INSERT ON smart_collections BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_smart_collections_update AFTER UPDATE ON smart_collections BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_smart_collections_delete AFTER DELETE ON smart_collections BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_ai_content_insert AFTER INSERT ON ai_content BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_ai_content_update AFTER UPDATE ON ai_content BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_ai_content_delete AFTER DELETE ON ai_content BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_insert AFTER INSERT ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_update AFTER UPDATE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_delete AFTER DELETE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_jobs_insert AFTER INSERT ON jobs BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_jobs_update AFTER UPDATE ON jobs BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_jobs_delete AFTER DELETE ON jobs BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_file_operations_insert AFTER INSERT ON file_operations BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_file_operations_update AFTER UPDATE ON file_operations BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_file_operations_delete AFTER DELETE ON file_operations BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_trashed_managed_folders_insert AFTER INSERT ON trashed_managed_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_trashed_managed_folders_update AFTER UPDATE ON trashed_managed_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_trashed_managed_folders_delete AFTER DELETE ON trashed_managed_folders BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_sequences_insert AFTER INSERT ON asset_sequences BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_sequences_update AFTER UPDATE ON asset_sequences BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_sequences_delete AFTER DELETE ON asset_sequences BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_sequence_frames_insert AFTER INSERT ON asset_sequence_frames BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_sequence_frames_update AFTER UPDATE ON asset_sequence_frames BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_asset_sequence_frames_delete AFTER DELETE ON asset_sequence_frames BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
`;
export const WRITE_COORDINATION_SCHEMA_CHECKSUM = createHash('sha256')
  .update(WRITE_COORDINATION_SCHEMA_SQL)
  .digest('hex');

// Migration v25: durable ownership for long-running, detached Jobs. The
// lease is separate from the library writer lease so a Job can heartbeat
// while filesystem/media work remains outside a SQLite transaction.
export const JOB_LEASE_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS library_job_leases (
    library_id TEXT NOT NULL REFERENCES library(library_id) ON DELETE CASCADE,
    job_id TEXT NOT NULL,
    owner_id TEXT NOT NULL,
    fencing_token INTEGER NOT NULL CHECK(fencing_token > 0),
    acquired_at_ms INTEGER NOT NULL CHECK(acquired_at_ms >= 0),
    expires_at_ms INTEGER NOT NULL CHECK(expires_at_ms > acquired_at_ms),
    PRIMARY KEY(library_id, job_id)
  );
`;
export const JOB_LEASE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(JOB_LEASE_SCHEMA_SQL)
  .digest('hex');

// Migration v29: 资源库同步（Serpent-xffq）。
// - assets.sync_id：跨设备稳定身份（每台设备本地 asset_id 不同），
//   同步交换格式以 sync_id 为键；NULL 表示尚未参与同步。
// - sync_manifest_cache：上次同步点的远端 manifest 缓存。
export const SYNC_SCHEMA_SQL = `
  ALTER TABLE assets ADD COLUMN sync_id TEXT;
  CREATE INDEX IF NOT EXISTS assets_sync_id ON assets(sync_id);
  CREATE TABLE IF NOT EXISTS sync_manifest_cache (
    library_id TEXT NOT NULL PRIMARY KEY,
    manifest_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`;
export const SYNC_SCHEMA_CHECKSUM = createHash('sha256')
  .update(SYNC_SCHEMA_SQL)
  .digest('hex');

// Migration v39: sync session ledger. The v38 sync migration shipped without
// the sync_sessions table that beginSyncSession/finishSyncSession write to;
// adding it as a fresh append-only migration keeps every released v38 checksum
// immutable (Serpent-xffq).
export const SYNC_SESSIONS_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS sync_sessions (
    session_id TEXT NOT NULL PRIMARY KEY,
    library_id TEXT NOT NULL,
    status TEXT NOT NULL,
    phase TEXT NOT NULL,
    progress_total INTEGER NOT NULL DEFAULT 0,
    progress_done INTEGER NOT NULL DEFAULT 0,
    started_at TEXT NOT NULL,
    finished_at TEXT,
    error_message TEXT
  );
  CREATE INDEX IF NOT EXISTS sync_sessions_library
    ON sync_sessions(library_id, started_at);
`;
export const SYNC_SESSIONS_SCHEMA_CHECKSUM = createHash('sha256')
  .update(SYNC_SESSIONS_SCHEMA_SQL)
  .digest('hex');

// Migration v40: covering partial indexes for the default name-sorted browse
// page (all assets / folder recursive CTE) so COUNT + first-page queries do
// not scan the whole assets table into a temp B-tree on every request. On
// SMB/NAS libraries each cold page read is a network round trip, which made
// the first browse after open take seconds.
//
// Serpent-4bdd26 版本收编：dev_performance_1 worktree 已用相同版本号发布过
// v40（BROWSE_HOT_PATH_INDEX_SCHEMA_SQL，checksum c6bb1f26…）且真实用户库
// （NAS 图像测试库）已按该定义迁移。此处必须原样保留那份 SQL 文本——改动一个
// 字节都会改变 checksum，让两个分支互相把对方的库判成 LIBRARY_CORRUPT 触发
// 数据抢救。Additive-only，符合数据兼容纪律（ADR-0028 / Serpent-dw9a v37/v38 先例）。
export const ASSETS_ACTIVE_NAME_INDEX_SCHEMA_SQL = `
  CREATE INDEX IF NOT EXISTS assets_active_folder_name_idx
    ON assets(managed_folder_id, relative_file_path, asset_id)
    WHERE deleted_at IS NULL;
  CREATE INDEX IF NOT EXISTS assets_active_name_idx
    ON assets(relative_file_path, asset_id)
    WHERE deleted_at IS NULL;
`;
export const ASSETS_ACTIVE_NAME_INDEX_SCHEMA_CHECKSUM = createHash('sha256')
  .update(ASSETS_ACTIVE_NAME_INDEX_SCHEMA_SQL)
  .digest('hex');

// Migration v41: covering partial index for the created-at descending sort
// ("newest first", the common large-library browsing order). Without it the
// sort builds a temp B-tree over the whole assets table on every request;
// with it SQLite reads the first LIMIT rows straight off the index and joins
// only those. Measured 60ms → <0.1ms for the bare top-50 probe on a 20k
// library; SMB cold-cache first sort previously paid a full-table scan of
// network round trips. Additive-only (new index) per ADR-0028.
export const ASSETS_ACTIVE_CREATED_DESC_INDEX_SCHEMA_SQL = `
  CREATE INDEX IF NOT EXISTS assets_active_created_desc_idx
    ON assets(created_at DESC, asset_id ASC)
    WHERE deleted_at IS NULL;
`;
export const ASSETS_ACTIVE_CREATED_DESC_INDEX_SCHEMA_CHECKSUM = createHash('sha256')
  .update(ASSETS_ACTIVE_CREATED_DESC_INDEX_SCHEMA_SQL)
  .digest('hex');

// Migration v42: partial index for the tombstone backfill that runs on every
// library open. The backfill's UPDATE only touches rows with
// deleted_at IS NOT NULL AND trashed_from_tombstone_id IS NULL — with this
// index an empty-trash library proves "no candidates" without reading the
// table at all (measured 161ms full-scan on SMB → <0.1ms), and a non-empty
// trash locates its rows directly. Additive-only per ADR-0028.
export const TOMBSTONE_BACKFILL_INDEX_SCHEMA_SQL = `
  CREATE INDEX IF NOT EXISTS assets_tombstone_backfill_idx
    ON assets(trashed_from_folder_id)
    WHERE deleted_at IS NOT NULL
      AND trashed_from_tombstone_id IS NULL;
`;
export const TOMBSTONE_BACKFILL_INDEX_SCHEMA_CHECKSUM = createHash('sha256')
  .update(TOMBSTONE_BACKFILL_INDEX_SCHEMA_SQL)
  .digest('hex');

// Migration v43: RAW viewers need a full-size decoded image, while the
// 512px thumbnail remains the card/browse derivative. Keep that viewer image
// separate so opening an ARW never makes the grid load a camera-sized PNG.
export const RAW_VIEWER_ARTIFACT_SCHEMA_SQL = `
  CREATE TABLE revision_artifacts_v43 (
    artifact_id TEXT PRIMARY KEY,
    revision_id TEXT NOT NULL REFERENCES revisions(revision_id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (
      kind IN ('thumbnail', 'viewer_image', 'video_poster', 'contact_sheet',
               'webm_proxy', 'audio_proxy', 'extracted_metadata',
               'extracted_palette', 'model_glb')
    ),
    mime_type TEXT NOT NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
    file_path TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    generator_version TEXT NOT NULL,
    status TEXT NOT NULL CHECK (
      status IN ('pending', 'generating', 'ready', 'failed')
    ),
    error_code TEXT,
    generated_at TEXT,
    invalidated_at TEXT,
    duration_ms INTEGER CHECK (duration_ms IS NULL OR duration_ms >= 0),
    dominant_hue REAL CHECK (dominant_hue IS NULL OR (dominant_hue >= 0 AND dominant_hue < 360)),
    dominant_lightness REAL CHECK (dominant_lightness IS NULL OR (dominant_lightness >= 0 AND dominant_lightness <= 1))
  );
  INSERT INTO revision_artifacts_v43
    (artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
     generator_version, status, error_code, generated_at, invalidated_at, duration_ms,
     dominant_hue, dominant_lightness)
    SELECT artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
           generator_version, status, error_code, generated_at, invalidated_at, duration_ms,
           dominant_hue, dominant_lightness
      FROM revision_artifacts;
  DROP TABLE revision_artifacts;
  ALTER TABLE revision_artifacts_v43 RENAME TO revision_artifacts;
  CREATE UNIQUE INDEX revision_artifacts_current
    ON revision_artifacts(revision_id, kind)
    WHERE invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_duration_idx
    ON revision_artifacts(duration_ms)
    WHERE kind = 'extracted_metadata' AND status = 'ready' AND invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_palette_sort_idx
    ON revision_artifacts(dominant_hue, dominant_lightness)
    WHERE kind = 'extracted_palette' AND status = 'ready' AND invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_revision_kind_status
    ON revision_artifacts(revision_id, kind, status, invalidated_at);
  CREATE TRIGGER library_change_on_revision_artifacts_insert AFTER INSERT ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_update AFTER UPDATE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_delete AFTER DELETE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
`;
export const RAW_VIEWER_ARTIFACT_SCHEMA_CHECKSUM = createHash('sha256')
  .update(RAW_VIEWER_ARTIFACT_SCHEMA_SQL)
  .digest('hex');

/**
 * Migration v44: persist the artifact identity that the media policy uses.
 *
 * Before this migration revision_artifacts was unique only by kind. That
 * forced every generator/settings change to invalidate by convention and
 * made it impossible to distinguish two valid viewer images for different
 * colour spaces or EXR planes. The identity columns are nullable for the
 * compatibility boundary: the trigger fills them for the many legacy write
 * sites that still insert the original column set, while the rebuild
 * backfills every existing row before the new current-key index is created.
 */
export const artifactRoleSql = (kindColumn: string): string => `CASE ${kindColumn}
      WHEN 'thumbnail' THEN 'card-thumbnail'
      WHEN 'viewer_image' THEN 'viewer-image'
      WHEN 'video_poster' THEN 'video-poster'
      WHEN 'contact_sheet' THEN 'contact-sheet'
      WHEN 'webm_proxy' THEN 'playback-proxy'
      WHEN 'audio_proxy' THEN 'playback-proxy'
      WHEN 'extracted_metadata' THEN 'technical-metadata'
      WHEN 'extracted_palette' THEN 'palette'
      WHEN 'model_glb' THEN 'model-viewer'
      ELSE NULL
    END`;
export const artifactGeneratorIdSql = (versionColumn: string): string => `CASE
      WHEN instr(${versionColumn}, ';') > 0
        THEN substr(${versionColumn}, 1, instr(${versionColumn}, ';') - 1)
      ELSE ${versionColumn}
    END`;
export const artifactSettingsHashSql = (versionColumn: string): string => `CASE
      WHEN instr(${versionColumn}, ';') > 0
        THEN COALESCE(NULLIF(substr(${versionColumn}, instr(${versionColumn}, ';') + 1), ''), 'default')
      ELSE 'default'
    END`;
export const artifactKeySql = (input: {
  assetColumn: string;
  revisionColumn: string;
  roleColumn: string;
  generatorIdColumn: string;
  generatorVersionColumn: string;
  settingsHashColumn: string;
}): string => `printf(
      '%d:%s|%d:%s|%d:%s|%d:%s|%d:%s|%d:%s',
      length(${input.assetColumn}), ${input.assetColumn},
      length(${input.revisionColumn}), ${input.revisionColumn},
      length(${input.roleColumn}), ${input.roleColumn},
      length(${input.generatorIdColumn}), ${input.generatorIdColumn},
      length(${input.generatorVersionColumn}), ${input.generatorVersionColumn},
      length(${input.settingsHashColumn}), ${input.settingsHashColumn}
    )`;
export const ARTIFACT_IDENTITY_SCHEMA_SQL = `
  CREATE TABLE revision_artifacts_v44 (
    artifact_id TEXT PRIMARY KEY,
    revision_id TEXT NOT NULL REFERENCES revisions(revision_id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (
      kind IN ('thumbnail', 'viewer_image', 'video_poster', 'contact_sheet',
               'webm_proxy', 'audio_proxy', 'extracted_metadata',
               'extracted_palette', 'model_glb')
    ),
    mime_type TEXT NOT NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
    file_path TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    generator_version TEXT NOT NULL,
    artifact_role TEXT,
    generator_id TEXT,
    settings_hash TEXT,
    artifact_key TEXT,
    status TEXT NOT NULL CHECK (
      status IN ('pending', 'generating', 'ready', 'failed')
    ),
    error_code TEXT,
    generated_at TEXT,
    invalidated_at TEXT,
    duration_ms INTEGER CHECK (duration_ms IS NULL OR duration_ms >= 0),
    dominant_hue REAL CHECK (dominant_hue IS NULL OR (dominant_hue >= 0 AND dominant_hue < 360)),
    dominant_lightness REAL CHECK (dominant_lightness IS NULL OR (dominant_lightness >= 0 AND dominant_lightness <= 1))
  );
  WITH identity AS (
    SELECT ra.artifact_id, ra.revision_id, ra.kind, ra.mime_type, ra.byte_size,
           ra.file_path, ra.width, ra.height, ra.generator_version, ra.status,
           ra.error_code, ra.generated_at, ra.invalidated_at, ra.duration_ms,
           ra.dominant_hue, ra.dominant_lightness, r.asset_id,
           ${artifactRoleSql('ra.kind')} AS artifact_role,
           ${artifactGeneratorIdSql('ra.generator_version')} AS generator_id,
           ${artifactSettingsHashSql('ra.generator_version')} AS settings_hash
      FROM revision_artifacts ra
      JOIN revisions r ON r.revision_id = ra.revision_id
  ), keyed AS (
    SELECT identity.*,
           ${artifactKeySql({
             assetColumn: 'asset_id',
             revisionColumn: 'revision_id',
             roleColumn: 'artifact_role',
             generatorIdColumn: 'generator_id',
             generatorVersionColumn: 'generator_version',
             settingsHashColumn: 'settings_hash',
           })} AS artifact_key
      FROM identity
  )
  INSERT INTO revision_artifacts_v44
    (artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
     generator_version, artifact_role, generator_id, settings_hash, artifact_key,
     status, error_code, generated_at, invalidated_at, duration_ms,
     dominant_hue, dominant_lightness)
  SELECT artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
         generator_version, artifact_role, generator_id, settings_hash, artifact_key,
         status, error_code, generated_at, invalidated_at, duration_ms,
         dominant_hue, dominant_lightness
    FROM keyed;
  DROP TABLE revision_artifacts;
  ALTER TABLE revision_artifacts_v44 RENAME TO revision_artifacts;
  CREATE UNIQUE INDEX revision_artifacts_current
    ON revision_artifacts(revision_id, artifact_key)
    WHERE invalidated_at IS NULL AND artifact_key IS NOT NULL;
  CREATE INDEX revision_artifacts_duration_idx
    ON revision_artifacts(duration_ms)
    WHERE kind = 'extracted_metadata' AND status = 'ready' AND invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_palette_sort_idx
    ON revision_artifacts(dominant_hue, dominant_lightness)
    WHERE kind = 'extracted_palette' AND status = 'ready' AND invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_revision_kind_status
    ON revision_artifacts(revision_id, kind, status, invalidated_at);
  CREATE INDEX revision_artifacts_identity_idx
    ON revision_artifacts(revision_id, artifact_role, generator_id, settings_hash, invalidated_at);
  CREATE TRIGGER revision_artifacts_identity_after_insert
    AFTER INSERT ON revision_artifacts
    WHEN NEW.artifact_key IS NULL
  BEGIN
    UPDATE revision_artifacts
       SET artifact_role = ${artifactRoleSql('NEW.kind')},
           generator_id = ${artifactGeneratorIdSql('NEW.generator_version')},
           settings_hash = ${artifactSettingsHashSql('NEW.generator_version')},
           artifact_key = ${artifactKeySql({
             assetColumn: '(SELECT asset_id FROM revisions WHERE revision_id = NEW.revision_id)',
             revisionColumn: 'NEW.revision_id',
             roleColumn: artifactRoleSql('NEW.kind'),
             generatorIdColumn: artifactGeneratorIdSql('NEW.generator_version'),
             generatorVersionColumn: 'NEW.generator_version',
             settingsHashColumn: artifactSettingsHashSql('NEW.generator_version'),
           })}
     WHERE artifact_id = NEW.artifact_id
       AND artifact_key IS NULL;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_insert AFTER INSERT ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_update AFTER UPDATE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_delete AFTER DELETE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
`;
export const ARTIFACT_IDENTITY_SCHEMA_CHECKSUM = createHash('sha256')
  .update(ARTIFACT_IDENTITY_SCHEMA_SQL)
  .digest('hex');

/**
 * Migration v45: separate browse invalidation from volatile job/artifact
 * writes. Thumbnail progress and artifact commits update the broad library
 * sequence, but they do not change BrowseSession membership or ordering. A
 * BrowseSession must remain usable while those background writes continue;
 * only tables that can change scope, filters, sort keys, or folder/collection
 * membership advance this narrower sequence.
 */
export const BROWSE_CHANGE_SEQUENCE_TABLES = [
  'assets',
  'revisions',
  'managed_folders',
  'linked_folders',
  'linked_ignored_assets',
  'linked_folder_rules',
  'asset_metadata',
  'asset_color_space_overrides',
  'tags',
  'human_asset_tags',
  'ai_asset_tags',
  'collections',
  'collection_assets',
  'smart_collections',
  'ai_content',
  'trashed_managed_folders',
] as const;
export const BROWSE_CHANGE_SEQUENCE_TRIGGER_SQL = BROWSE_CHANGE_SEQUENCE_TABLES
  .flatMap((table) => [
    `CREATE TRIGGER IF NOT EXISTS browse_change_on_${table}_insert AFTER INSERT ON ${table} BEGIN
       UPDATE browse_change_sequence SET sequence = sequence + 1;
     END;`,
    `CREATE TRIGGER IF NOT EXISTS browse_change_on_${table}_update AFTER UPDATE ON ${table} BEGIN
       UPDATE browse_change_sequence SET sequence = sequence + 1;
     END;`,
    `CREATE TRIGGER IF NOT EXISTS browse_change_on_${table}_delete AFTER DELETE ON ${table} BEGIN
       UPDATE browse_change_sequence SET sequence = sequence + 1;
     END;`,
  ])
  .join('\n  ');
export const BROWSE_CHANGE_SEQUENCE_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS browse_change_sequence (
    library_id TEXT PRIMARY KEY REFERENCES library(library_id) ON DELETE CASCADE,
    sequence INTEGER NOT NULL DEFAULT 0 CHECK(sequence >= 0)
  );
  INSERT OR IGNORE INTO browse_change_sequence (library_id, sequence)
    SELECT library_id, 0 FROM library;
  CREATE TRIGGER IF NOT EXISTS browse_change_sequence_seed AFTER INSERT ON library BEGIN
    INSERT OR IGNORE INTO browse_change_sequence (library_id, sequence)
      VALUES (NEW.library_id, 0);
  END;
  ${BROWSE_CHANGE_SEQUENCE_TRIGGER_SQL}
`;
export const BROWSE_CHANGE_SEQUENCE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(BROWSE_CHANGE_SEQUENCE_SCHEMA_SQL)
  .digest('hex');

// Migration v46: ignored-path materialization changes the visible browse
// result, but the two tables are intentionally separate from the v45 core
// table list so the released v45 checksum remains immutable.
export const BROWSE_IGNORE_RULE_SEQUENCE_SCHEMA_SQL = `
  CREATE TRIGGER IF NOT EXISTS browse_change_on_explicit_ignored_paths_insert
    AFTER INSERT ON explicit_ignored_paths BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER IF NOT EXISTS browse_change_on_explicit_ignored_paths_update
    AFTER UPDATE ON explicit_ignored_paths BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER IF NOT EXISTS browse_change_on_explicit_ignored_paths_delete
    AFTER DELETE ON explicit_ignored_paths BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER IF NOT EXISTS browse_change_on_gitignore_ignored_paths_insert
    AFTER INSERT ON gitignore_ignored_paths BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER IF NOT EXISTS browse_change_on_gitignore_ignored_paths_update
    AFTER UPDATE ON gitignore_ignored_paths BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER IF NOT EXISTS browse_change_on_gitignore_ignored_paths_delete
    AFTER DELETE ON gitignore_ignored_paths BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
`;
export const BROWSE_IGNORE_RULE_SEQUENCE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(BROWSE_IGNORE_RULE_SEQUENCE_SCHEMA_SQL)
  .digest('hex');

// Migration v47: sequence frame rows decide whether a source asset is a
// visible browse item. Keep those changes on the same narrow cursor so the
// catalog allowlist can safely serve the default browse query from a snapshot.
export const BROWSE_SEQUENCE_FRAME_SCHEMA_SQL = `
  CREATE TRIGGER IF NOT EXISTS browse_change_on_asset_sequence_frames_insert
    AFTER INSERT ON asset_sequence_frames BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER IF NOT EXISTS browse_change_on_asset_sequence_frames_update
    AFTER UPDATE ON asset_sequence_frames BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER IF NOT EXISTS browse_change_on_asset_sequence_frames_delete
    AFTER DELETE ON asset_sequence_frames BEGIN
      UPDATE browse_change_sequence SET sequence = sequence + 1;
    END;
`;
export const BROWSE_SEQUENCE_FRAME_SCHEMA_CHECKSUM = createHash('sha256')
  .update(BROWSE_SEQUENCE_FRAME_SCHEMA_SQL)
  .digest('hex');

// Migration v48: retain the source filesystem identity for linked assets.
// Relative paths are presentation/index keys, not source identity: an
// in-root rename keeps the same device/inode while changing the path. Keeping
// these values on the asset row lets watcher reconciliation repair that move
// without hashing every file in a large linked folder.
export const LINKED_SOURCE_IDENTITY_SCHEMA_SQL = `
  ALTER TABLE assets ADD COLUMN source_device TEXT;
  ALTER TABLE assets ADD COLUMN source_inode TEXT;
  CREATE INDEX assets_source_identity_idx
    ON assets(location_kind, linked_folder_id, source_device, source_inode)
    WHERE deleted_at IS NULL;
`;
export const LINKED_SOURCE_IDENTITY_SCHEMA_CHECKSUM = createHash('sha256')
  .update(LINKED_SOURCE_IDENTITY_SCHEMA_SQL)
  .digest('hex');

// Migration v49 (Serpent-316493): a linked root can be attached under a managed
// folder ("导入链接文件夹" from the folder context menu). Deliberately no
// REFERENCES clause: trashing a managed folder DELETEs its managed_folders row,
// and a cascading SET NULL would silently reset the nesting — the id is kept so
// a restore re-nests the link, while the renderer falls back to showing the
// link at the library root whenever the parent is not visible.
export const LINKED_FOLDER_PARENT_SCHEMA_SQL = `
  ALTER TABLE linked_folders ADD COLUMN parent_folder_id TEXT;
`;
export const LINKED_FOLDER_PARENT_SCHEMA_CHECKSUM = createHash('sha256')
  .update(LINKED_FOLDER_PARENT_SCHEMA_SQL)
  .digest('hex');

// Migration v50 (Serpent-e97c00): the recent media-job list is ordered by
// created_at/job_id for one library. The status/priority index cannot satisfy
// that order, so a task-panel refresh otherwise sorts the full history before
// applying its 500-row limit.
export const JOB_RECENT_LIST_INDEX_SCHEMA_SQL = `
  CREATE INDEX IF NOT EXISTS jobs_library_created_desc
    ON jobs(library_id, created_at DESC, job_id DESC);
`;
export const JOB_RECENT_LIST_INDEX_SCHEMA_CHECKSUM = createHash('sha256')
  .update(JOB_RECENT_LIST_INDEX_SCHEMA_SQL)
  .digest('hex');

// Migration v51 (Serpent-288cd9): persist the bounded RAW metadata admission
// cursor. The secondary pump is allowed to restart without losing the fact
// that a library was exhausted; the browse token fences the cursor against
// catalog and ignore-rule changes, while failed RAW retries use a separate
// bounded requeue path.
export const RAW_METADATA_BACKFILL_STATE_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS raw_metadata_backfill_state (
    library_id TEXT PRIMARY KEY REFERENCES library(library_id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    cursor_asset_id TEXT,
    exhausted INTEGER NOT NULL DEFAULT 0 CHECK(exhausted IN (0, 1)),
    updated_at TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS raw_metadata_backfill_state_token
    ON raw_metadata_backfill_state(library_id, token, exhausted, cursor_asset_id);
`;
export const RAW_METADATA_BACKFILL_STATE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(RAW_METADATA_BACKFILL_STATE_SCHEMA_SQL)
  .digest('hex');
export const RAW_METADATA_BACKFILL_STATE_COLUMNS = [
  'token',
  'cursor_asset_id',
  'exhausted',
  'updated_at',
] as const;

export function hasRawMetadataBackfillStateSchema(connection: DatabaseConnection): boolean {
  const columns = columnsFor(connection, 'raw_metadata_backfill_state');
  return RAW_METADATA_BACKFILL_STATE_COLUMNS.every((column) => columns.has(column));
}

// Migration v52 (Serpent-288cd9): the retry-only admission path must inspect
// only due RAW failures rather than walking the general job history.
export const RAW_METADATA_RETRY_INDEX_SCHEMA_SQL = `
  CREATE INDEX IF NOT EXISTS jobs_raw_metadata_retry
    ON jobs(library_id, updated_at, job_id)
    WHERE kind = 'extract_metadata'
      AND status = 'failed'
      AND error_code = 'RAW_METADATA_EXTRACTION_FAILED';
`;
export const RAW_METADATA_RETRY_INDEX_SCHEMA_CHECKSUM = createHash('sha256')
  .update(RAW_METADATA_RETRY_INDEX_SCHEMA_SQL)
  .digest('hex');

export const MEDIA_JOB_STATUS_COUNT_KINDS_SQL = `'generate_thumbnail', 'generate_video_poster', 'extract_metadata', 'generate_contact_sheet', 'generate_webm_proxy', 'generate_audio_proxy', 'extract_palette'`;
export const MEDIA_JOB_STATUS_COUNT_STATUSES_SQL = `'queued', 'running', 'succeeded', 'failed', 'paused', 'cancelled'`;

// Migration v53 (Serpent-e97c00): media job status counts are maintained in the
// same transaction as jobs writes. Panel/status reads then become a 6-row
// primary-key lookup instead of GROUP BY over the whole job history.
export const MEDIA_JOB_STATUS_COUNTS_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS media_job_status_counts (
    library_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})),
    count INTEGER NOT NULL CHECK(count >= 0),
    PRIMARY KEY (library_id, status)
  );
  INSERT OR IGNORE INTO media_job_status_counts (library_id, status, count)
  SELECT library_id, status, COUNT(*)
    FROM jobs
   WHERE kind IN (${MEDIA_JOB_STATUS_COUNT_KINDS_SQL})
     AND status IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})
     AND (error_code IS NULL OR error_code <> 'ASSET_IGNORED')
   GROUP BY library_id, status;
  CREATE TRIGGER IF NOT EXISTS media_job_status_counts_ai
  AFTER INSERT ON jobs
  WHEN NEW.kind IN (${MEDIA_JOB_STATUS_COUNT_KINDS_SQL})
   AND NEW.status IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})
   AND (NEW.error_code IS NULL OR NEW.error_code <> 'ASSET_IGNORED')
  BEGIN
    INSERT INTO media_job_status_counts(library_id, status, count)
    VALUES (NEW.library_id, NEW.status, 1)
    ON CONFLICT(library_id, status) DO UPDATE SET count = count + 1;
  END;
  CREATE TRIGGER IF NOT EXISTS media_job_status_counts_ad
  AFTER DELETE ON jobs
  WHEN OLD.kind IN (${MEDIA_JOB_STATUS_COUNT_KINDS_SQL})
   AND OLD.status IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})
   AND (OLD.error_code IS NULL OR OLD.error_code <> 'ASSET_IGNORED')
  BEGIN
    UPDATE media_job_status_counts
       SET count = MAX(0, count - 1)
     WHERE library_id = OLD.library_id AND status = OLD.status;
  END;
  CREATE TRIGGER IF NOT EXISTS media_job_status_counts_au
  AFTER UPDATE OF status, kind, error_code, library_id ON jobs
  BEGIN
    UPDATE media_job_status_counts
       SET count = MAX(0, count - 1)
     WHERE OLD.kind IN (${MEDIA_JOB_STATUS_COUNT_KINDS_SQL})
       AND OLD.status IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})
       AND (OLD.error_code IS NULL OR OLD.error_code <> 'ASSET_IGNORED')
       AND library_id = OLD.library_id
       AND status = OLD.status
       AND (
         NEW.kind NOT IN (${MEDIA_JOB_STATUS_COUNT_KINDS_SQL})
         OR NEW.status NOT IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})
         OR (NEW.error_code IS NOT NULL AND NEW.error_code = 'ASSET_IGNORED')
         OR NEW.library_id <> OLD.library_id
         OR NEW.status <> OLD.status
         OR NEW.kind <> OLD.kind
       );
    INSERT INTO media_job_status_counts(library_id, status, count)
    SELECT NEW.library_id, NEW.status, 1
     WHERE NEW.kind IN (${MEDIA_JOB_STATUS_COUNT_KINDS_SQL})
       AND NEW.status IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})
       AND (NEW.error_code IS NULL OR NEW.error_code <> 'ASSET_IGNORED')
       AND (
         OLD.kind NOT IN (${MEDIA_JOB_STATUS_COUNT_KINDS_SQL})
         OR OLD.status NOT IN (${MEDIA_JOB_STATUS_COUNT_STATUSES_SQL})
         OR (OLD.error_code IS NOT NULL AND OLD.error_code = 'ASSET_IGNORED')
         OR NEW.library_id <> OLD.library_id
         OR NEW.status <> OLD.status
         OR NEW.kind <> OLD.kind
       )
    ON CONFLICT(library_id, status) DO UPDATE SET count = count + 1;
  END;
`;
export const MEDIA_JOB_STATUS_COUNTS_SCHEMA_CHECKSUM = createHash('sha256')
  .update(MEDIA_JOB_STATUS_COUNTS_SCHEMA_SQL)
  .digest('hex');

// Migration v54 (Serpent-288cd9): persist a normalized filename extension so
// RAW metadata admission can use an equality/IN predicate plus a covering
// index instead of LOWER(relative_file_path) LIKE '%suffix' over the catalog.
export const ASSET_NORMALIZED_EXTENSION_EXPR = `CASE
    WHEN instr(relative_file_path, '.') = 0 THEN NULL
    ELSE lower('.' || replace(relative_file_path, rtrim(relative_file_path, replace(relative_file_path, '.', '')), ''))
  END`;
export const ASSET_NORMALIZED_EXTENSION_NEW_EXPR = `CASE
    WHEN instr(NEW.relative_file_path, '.') = 0 THEN NULL
    ELSE lower('.' || replace(NEW.relative_file_path, rtrim(NEW.relative_file_path, replace(NEW.relative_file_path, '.', '')), ''))
  END`;
export const ASSET_NORMALIZED_EXTENSION_SCHEMA_SQL = `
  ALTER TABLE assets ADD COLUMN normalized_extension TEXT;
  UPDATE assets SET normalized_extension = ${ASSET_NORMALIZED_EXTENSION_EXPR};
  CREATE INDEX IF NOT EXISTS assets_normalized_extension_asset
    ON assets(normalized_extension, asset_id)
    WHERE availability = 'available' AND current_revision_id IS NOT NULL AND deleted_at IS NULL;
  CREATE TRIGGER IF NOT EXISTS assets_normalized_extension_ai
  AFTER INSERT ON assets
  BEGIN
    UPDATE assets
       SET normalized_extension = ${ASSET_NORMALIZED_EXTENSION_NEW_EXPR}
     WHERE asset_id = NEW.asset_id;
  END;
  CREATE TRIGGER IF NOT EXISTS assets_normalized_extension_au
  AFTER UPDATE OF relative_file_path ON assets
  BEGIN
    UPDATE assets
       SET normalized_extension = ${ASSET_NORMALIZED_EXTENSION_NEW_EXPR}
     WHERE asset_id = NEW.asset_id;
  END;
`;
export const ASSET_NORMALIZED_EXTENSION_SCHEMA_CHECKSUM = createHash('sha256')
  .update(ASSET_NORMALIZED_EXTENSION_SCHEMA_SQL)
  .digest('hex');

export const ENTITY_APPEARANCE_SCHEMA_SQL = `
  ALTER TABLE managed_folders ADD COLUMN appearance_glyph_kind TEXT;
  ALTER TABLE managed_folders ADD COLUMN appearance_glyph_value TEXT;
  ALTER TABLE managed_folders ADD COLUMN appearance_color_id TEXT;
  ALTER TABLE linked_folders ADD COLUMN appearance_glyph_kind TEXT;
  ALTER TABLE linked_folders ADD COLUMN appearance_glyph_value TEXT;
  ALTER TABLE linked_folders ADD COLUMN appearance_color_id TEXT;
  ALTER TABLE collections ADD COLUMN appearance_glyph_kind TEXT;
  ALTER TABLE collections ADD COLUMN appearance_glyph_value TEXT;
  ALTER TABLE collections ADD COLUMN appearance_color_id TEXT;
  ALTER TABLE smart_collections ADD COLUMN appearance_glyph_kind TEXT;
  ALTER TABLE smart_collections ADD COLUMN appearance_glyph_value TEXT;
  ALTER TABLE smart_collections ADD COLUMN appearance_color_id TEXT;
`;
export const ENTITY_APPEARANCE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(ENTITY_APPEARANCE_SCHEMA_SQL)
  .digest('hex');

export const PALETTE_SATURATION_SCHEMA_SQL = `
  ALTER TABLE revision_artifacts ADD COLUMN dominant_saturation REAL
    CHECK (dominant_saturation IS NULL OR (dominant_saturation >= 0 AND dominant_saturation <= 1));
`;
export const PALETTE_SATURATION_SCHEMA_CHECKSUM = createHash('sha256')
  .update(PALETTE_SATURATION_SCHEMA_SQL)
  .digest('hex');

export const FOLDER_CUSTOM_COVER_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS folder_custom_covers (
    library_id TEXT NOT NULL,
    folder_key TEXT NOT NULL,
    relative_name TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (library_id, folder_key)
  );
`;
export const FOLDER_CUSTOM_COVER_SCHEMA_CHECKSUM = createHash('sha256')
  .update(FOLDER_CUSTOM_COVER_SCHEMA_SQL)
  .digest('hex');

export const FOLDER_CUSTOM_COVER_ASSET_SCHEMA_SQL = `
  ALTER TABLE folder_custom_covers ADD COLUMN cover_asset_id TEXT;
`;
export const FOLDER_CUSTOM_COVER_ASSET_SCHEMA_CHECKSUM = createHash('sha256')
  .update(FOLDER_CUSTOM_COVER_ASSET_SCHEMA_SQL)
  .digest('hex');

export const REVISION_SIZE_FINGERPRINT_INDEX_SCHEMA_SQL = `
  CREATE INDEX revisions_size_fingerprint_idx
    ON revisions(byte_size, content_fingerprint);
`;
export const REVISION_SIZE_FINGERPRINT_INDEX_SCHEMA_CHECKSUM = createHash('sha256')
  .update(REVISION_SIZE_FINGERPRINT_INDEX_SCHEMA_SQL)
  .digest('hex');

export const ENTITY_APPEARANCE_TABLES = [
  'managed_folders',
  'linked_folders',
  'collections',
  'smart_collections',
] as const;
export const ENTITY_APPEARANCE_COLUMNS = [
  'appearance_glyph_kind',
  'appearance_glyph_value',
  'appearance_color_id',
] as const;

export function ensureEntityAppearanceSchema(connection: DatabaseConnection): void {
  for (const table of ENTITY_APPEARANCE_TABLES) {
    if (!hasTable(connection, table)) continue;
    const columns = new Set(columnsFor(connection, table));
    for (const column of ENTITY_APPEARANCE_COLUMNS) {
      if (columns.has(column)) continue;
      connection.exec(`ALTER TABLE ${table} ADD COLUMN ${column} TEXT`);
    }
  }
}

export function ensureFolderCustomCoverAssetSchema(connection: DatabaseConnection): void {
  const columns = connection.pragma('table_info(folder_custom_covers)') as Array<{ name: string }>;
  if (!columns.some((column) => column.name === 'cover_asset_id')) {
    connection.exec(FOLDER_CUSTOM_COVER_ASSET_SCHEMA_SQL);
  }
}

export function ensureAssetNormalizedExtensionSchema(connection: DatabaseConnection): void {
  const columns = columnsFor(connection, 'assets');
  if (!columns.has('normalized_extension')) {
    connection.exec('ALTER TABLE assets ADD COLUMN normalized_extension TEXT');
  }
  connection.exec(`
    UPDATE assets
       SET normalized_extension = ${ASSET_NORMALIZED_EXTENSION_EXPR}
     WHERE normalized_extension IS NULL AND instr(relative_file_path, '.') > 0;
    CREATE INDEX IF NOT EXISTS assets_normalized_extension_asset
      ON assets(normalized_extension, asset_id)
      WHERE availability = 'available' AND current_revision_id IS NOT NULL AND deleted_at IS NULL;
    CREATE TRIGGER IF NOT EXISTS assets_normalized_extension_ai
    AFTER INSERT ON assets
    BEGIN
      UPDATE assets
         SET normalized_extension = ${ASSET_NORMALIZED_EXTENSION_NEW_EXPR}
       WHERE asset_id = NEW.asset_id;
    END;
    CREATE TRIGGER IF NOT EXISTS assets_normalized_extension_au
    AFTER UPDATE OF relative_file_path ON assets
    BEGIN
      UPDATE assets
         SET normalized_extension = ${ASSET_NORMALIZED_EXTENSION_NEW_EXPR}
       WHERE asset_id = NEW.asset_id;
    END;
  `);
}

export function rawImageExtensionMatchSql(
  connection: DatabaseConnection,
  alias: string,
): { sql: string; params: readonly string[] } {
  if (columnsFor(connection, 'assets').has('normalized_extension')) {
    return {
      sql: `${alias}.normalized_extension IN (${RAW_IMAGE_EXTENSIONS.map(() => '?').join(',')})`,
      params: RAW_IMAGE_EXTENSIONS,
    };
  }
  return {
    sql: `(${RAW_IMAGE_EXTENSIONS.map(() => `LOWER(${alias}.relative_file_path) LIKE ?`).join(' OR ')})`,
    params: RAW_IMAGE_EXTENSIONS.map((extension) => `%${extension}`),
  };
}

export function embeddedImageMetadataExtensionMatchSql(
  connection: DatabaseConnection,
  alias: string,
): { sql: string; params: readonly string[] } {
  if (columnsFor(connection, 'assets').has('normalized_extension')) {
    return {
      sql: `${alias}.normalized_extension IN (${EMBEDDED_IMAGE_METADATA_EXTENSIONS.map(() => '?').join(',')})`,
      params: EMBEDDED_IMAGE_METADATA_EXTENSIONS,
    };
  }
  return {
    sql: `(${EMBEDDED_IMAGE_METADATA_EXTENSIONS.map(() => `LOWER(${alias}.relative_file_path) LIKE ?`).join(' OR ')})`,
    params: EMBEDDED_IMAGE_METADATA_EXTENSIONS.map((extension) => `%${extension}`),
  };
}

export function ensureLinkedFolderParentSchema(connection: DatabaseConnection): void {
  const columns = columnsFor(connection, 'linked_folders');
  if (!columns.has('parent_folder_id')) {
    connection.exec('ALTER TABLE linked_folders ADD COLUMN parent_folder_id TEXT');
  }
}

export function ensureLinkedSourceIdentitySchema(connection: DatabaseConnection): void {
  const columns = columnsFor(connection, 'assets');
  if (!columns.has('source_device')) {
    connection.exec('ALTER TABLE assets ADD COLUMN source_device TEXT');
  }
  if (!columns.has('source_inode')) {
    connection.exec('ALTER TABLE assets ADD COLUMN source_inode TEXT');
  }
  connection.exec(`
    CREATE INDEX IF NOT EXISTS assets_source_identity_idx
      ON assets(location_kind, linked_folder_id, source_device, source_inode)
      WHERE deleted_at IS NULL;
  `);
}

// Migration v26: the thumbnail queue asks whether a job already exists for a
// revision. Without a matching index, opening a large library performs a
// quadratic NOT EXISTS scan over the jobs table before the visible batch is
// queued.
export const THUMBNAIL_QUEUE_INDEX_SCHEMA_SQL = `
  CREATE INDEX IF NOT EXISTS jobs_asset_kind_status
    ON jobs(asset_id, kind, status);
  CREATE INDEX IF NOT EXISTS revision_artifacts_revision_kind_status
    ON revision_artifacts(revision_id, kind, status, invalidated_at);
`;
export const THUMBNAIL_QUEUE_INDEX_SCHEMA_CHECKSUM = createHash('sha256')
  .update(THUMBNAIL_QUEUE_INDEX_SCHEMA_SQL)
  .digest('hex');

/**
 * Migration v27: plugin background jobs reuse the shared jobs table with a
 * dedicated kind plus owner/version/handler/payload columns for §9.4.
 */
export const PLUGIN_BACKGROUND_JOBS_SCHEMA_SQL = `
  CREATE TABLE jobs_v27 (
    job_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL,
    asset_id TEXT REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    kind TEXT NOT NULL CHECK (
      kind IN ('generate_thumbnail', 'generate_video_poster',
               'generate_contact_sheet', 'generate_webm_proxy', 'generate_audio_proxy',
               'extract_metadata', 'extract_palette',
               'ai.image.analysis', 'ai.video.analysis',
               'plugin.background')
    ),
    status TEXT NOT NULL CHECK (
      status IN ('queued', 'running', 'paused', 'succeeded', 'failed', 'cancelled')
    ),
    priority INTEGER NOT NULL DEFAULT 0,
    progress REAL DEFAULT 0.0,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    error_code TEXT,
    error_detail TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    owner_plugin_id TEXT,
    owner_package_hash TEXT,
    plugin_handler_id TEXT,
    payload_json TEXT,
    recovery_strategy TEXT CHECK (
      recovery_strategy IS NULL
      OR recovery_strategy IN ('idempotent', 'checkpoint')
    )
  );
  INSERT INTO jobs_v27 (
    job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
    attempt_count, error_code, error_detail, created_at, updated_at,
    owner_plugin_id, owner_package_hash, plugin_handler_id, payload_json, recovery_strategy
  )
  SELECT
    job_id, library_id, asset_id, revision_id, kind, status, priority, progress,
    attempt_count, error_code, error_detail, created_at, updated_at,
    NULL, NULL, NULL, NULL, NULL
  FROM jobs;
  DROP TABLE jobs;
  ALTER TABLE jobs_v27 RENAME TO jobs;
  CREATE INDEX jobs_library_status_priority
    ON jobs(library_id, status, priority DESC, created_at);
  CREATE INDEX IF NOT EXISTS jobs_asset_kind_status
    ON jobs(asset_id, kind, status);
  CREATE INDEX IF NOT EXISTS jobs_plugin_owner_status
    ON jobs(library_id, owner_plugin_id, owner_package_hash, status)
    WHERE kind = 'plugin.background';
`;
export const PLUGIN_BACKGROUND_JOBS_SCHEMA_CHECKSUM = createHash('sha256')
  .update(PLUGIN_BACKGROUND_JOBS_SCHEMA_SQL)
  .digest('hex');

/** Migration v32: interrupted plugin jobs are terminal and never auto-claimed. */
export const PLUGIN_JOB_INTERRUPTED_SCHEMA_SQL = `
  CREATE TABLE jobs_v32 (
    job_id TEXT PRIMARY KEY,
    library_id TEXT NOT NULL,
    asset_id TEXT REFERENCES assets(asset_id) ON DELETE CASCADE,
    revision_id TEXT REFERENCES revisions(revision_id) ON DELETE SET NULL,
    kind TEXT NOT NULL CHECK (
      kind IN ('generate_thumbnail', 'generate_video_poster',
               'generate_contact_sheet', 'generate_webm_proxy', 'generate_audio_proxy',
               'extract_metadata', 'extract_palette',
               'ai.image.analysis', 'ai.video.analysis',
               'plugin.background')
    ),
    status TEXT NOT NULL CHECK (
      status IN ('queued', 'running', 'paused', 'succeeded', 'failed', 'cancelled', 'interrupted')
    ),
    priority INTEGER NOT NULL DEFAULT 0,
    progress REAL DEFAULT 0.0,
    attempt_count INTEGER NOT NULL DEFAULT 0,
    error_code TEXT,
    error_detail TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    owner_plugin_id TEXT,
    owner_package_hash TEXT,
    plugin_handler_id TEXT,
    payload_json TEXT,
    recovery_strategy TEXT CHECK (
      recovery_strategy IS NULL
      OR recovery_strategy IN ('idempotent', 'checkpoint')
    )
  );
  INSERT INTO jobs_v32 SELECT * FROM jobs;
  DROP TABLE jobs;
  ALTER TABLE jobs_v32 RENAME TO jobs;
  CREATE INDEX jobs_library_status_priority
    ON jobs(library_id, status, priority DESC, created_at);
  CREATE INDEX IF NOT EXISTS jobs_asset_kind_status
    ON jobs(asset_id, kind, status);
  CREATE INDEX IF NOT EXISTS jobs_plugin_owner_status
    ON jobs(library_id, owner_plugin_id, owner_package_hash, status)
    WHERE kind = 'plugin.background';
  CREATE TRIGGER library_change_on_jobs_insert AFTER INSERT ON jobs BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_jobs_update AFTER UPDATE ON jobs BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_jobs_delete AFTER DELETE ON jobs BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
`;
export const PLUGIN_JOB_INTERRUPTED_SCHEMA_CHECKSUM = createHash('sha256')
  .update(PLUGIN_JOB_INTERRUPTED_SCHEMA_SQL)
  .digest('hex');

// Migration v33 (Serpent-5ygi, slice 0030-B): FBX conversion stores its GLB
// as a derived artifact (`kind = 'model_glb'`). The v21 rebuild of
// revision_artifacts pinned the kind CHECK to the media-artifact set, so the
// table is rebuilt again with the new kind. The rebuild must also recreate the
// change-sequence triggers (v27) and the thumbnail-queue index (v29), which
// DROP TABLE would otherwise remove.
export const MODEL_ARTIFACT_KIND_SCHEMA_SQL = `
  CREATE TABLE revision_artifacts_v33 (
    artifact_id TEXT PRIMARY KEY,
    revision_id TEXT NOT NULL REFERENCES revisions(revision_id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (
      kind IN ('thumbnail', 'video_poster', 'contact_sheet', 'webm_proxy', 'audio_proxy',
               'extracted_metadata', 'extracted_palette', 'model_glb')
    ),
    mime_type TEXT NOT NULL,
    byte_size INTEGER NOT NULL CHECK (byte_size >= 0),
    file_path TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    generator_version TEXT NOT NULL,
    status TEXT NOT NULL CHECK (
      status IN ('pending', 'generating', 'ready', 'failed')
    ),
    error_code TEXT,
    generated_at TEXT,
    invalidated_at TEXT,
    duration_ms INTEGER CHECK (duration_ms IS NULL OR duration_ms >= 0),
    dominant_hue REAL CHECK (dominant_hue IS NULL OR (dominant_hue >= 0 AND dominant_hue < 360)),
    dominant_lightness REAL CHECK (dominant_lightness IS NULL OR (dominant_lightness >= 0 AND dominant_lightness <= 1))
  );
  INSERT INTO revision_artifacts_v33
    (artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
     generator_version, status, error_code, generated_at, invalidated_at, duration_ms,
     dominant_hue, dominant_lightness)
    SELECT artifact_id, revision_id, kind, mime_type, byte_size, file_path, width, height,
           generator_version, status, error_code, generated_at, invalidated_at, duration_ms,
           dominant_hue, dominant_lightness
      FROM revision_artifacts;
  DROP TABLE revision_artifacts;
  ALTER TABLE revision_artifacts_v33 RENAME TO revision_artifacts;
  CREATE UNIQUE INDEX revision_artifacts_current
    ON revision_artifacts(revision_id, kind)
    WHERE invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_duration_idx
    ON revision_artifacts(duration_ms)
    WHERE kind = 'extracted_metadata' AND status = 'ready' AND invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_palette_sort_idx
    ON revision_artifacts(dominant_hue, dominant_lightness)
    WHERE kind = 'extracted_palette' AND status = 'ready' AND invalidated_at IS NULL;
  CREATE INDEX revision_artifacts_revision_kind_status
    ON revision_artifacts(revision_id, kind, status, invalidated_at);
  CREATE TRIGGER library_change_on_revision_artifacts_insert AFTER INSERT ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_update AFTER UPDATE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
  CREATE TRIGGER library_change_on_revision_artifacts_delete AFTER DELETE ON revision_artifacts BEGIN
    UPDATE library_change_sequence SET sequence = sequence + 1;
  END;
`;
export const MODEL_ARTIFACT_KIND_SCHEMA_CHECKSUM = createHash('sha256')
  .update(MODEL_ARTIFACT_KIND_SCHEMA_SQL)
  .digest('hex');

/**
 * Migration v34: content fingerprint for portable change detection.
 * A library copied to another platform rewrites every file mtime (zip
 * extraction), so mtime alone can no longer prove a revision unchanged.
 * `refreshManagedAssets` stores a SHA-1 of the file bytes on the current
 * revision; a NULL fingerprint means "never verified" and is backfilled on
 * the first mtime mismatch (treated as unchanged — see refreshManagedAssets).
 * Additive column only; satisfies the migrate-add-only discipline.
 */
export const CONTENT_FINGERPRINT_SCHEMA_SQL = `
  ALTER TABLE revisions ADD COLUMN content_fingerprint TEXT;
`;
export const CONTENT_FINGERPRINT_SCHEMA_CHECKSUM = createHash('sha256')
  .update(CONTENT_FINGERPRINT_SCHEMA_SQL)
  .digest('hex');

/**
 * Idempotent v34 apply: downgrade fixtures and re-run scenarios may already
 * carry the column, so the ALTER must be skipped instead of failing the
 * migration chain (same pattern as v20/v31 ensure functions).
 */
export function ensureContentFingerprintColumn(connection: DatabaseConnection): void {
  if (columnsFor(connection, 'revisions').has('content_fingerprint')) return;
  connection.exec(CONTENT_FINGERPRINT_SCHEMA_SQL);
}

/**
 * Migration v38 is additive, but a number of older downgrade/replay fixtures
 * retain the physical sync_id column while rewinding only user_version and
 * schema_migrations. Keep the canonical checksum while making the apply
 * operation idempotent for those valid legacy shapes.
 */
export function ensureSyncSchema(connection: DatabaseConnection): void {
  if (!columnsFor(connection, 'assets').has('sync_id')) {
    connection.exec('ALTER TABLE assets ADD COLUMN sync_id TEXT');
  }
  connection.exec(`
    CREATE INDEX IF NOT EXISTS assets_sync_id ON assets(sync_id);
    CREATE TABLE IF NOT EXISTS sync_manifest_cache (
      library_id TEXT NOT NULL PRIMARY KEY,
      manifest_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}

/**
 * Migration v28: namespaced, package-versioned materialized Provider fields.
 * Queries only select the active package hash supplied by Main, so upgrading
 * or deactivating a plugin cannot expose stale values.
 */
export const PLUGIN_DERIVED_FIELDS_SCHEMA_SQL = `
  CREATE TABLE plugin_derived_fields (
    library_id TEXT NOT NULL,
    asset_id TEXT NOT NULL REFERENCES assets(asset_id) ON DELETE CASCADE,
    plugin_id TEXT NOT NULL,
    package_hash TEXT NOT NULL,
    field_id TEXT NOT NULL,
    field_type TEXT NOT NULL CHECK (field_type IN ('string', 'number', 'boolean', 'date', 'json')),
    value_text TEXT,
    value_number REAL,
    value_boolean INTEGER CHECK (value_boolean IS NULL OR value_boolean IN (0, 1)),
    value_json TEXT,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (library_id, asset_id, plugin_id, package_hash, field_id)
  );
  CREATE INDEX plugin_derived_fields_lookup
    ON plugin_derived_fields(library_id, plugin_id, package_hash, field_id, asset_id);
`;
export const PLUGIN_DERIVED_FIELDS_SCHEMA_CHECKSUM = createHash('sha256')
  .update(PLUGIN_DERIVED_FIELDS_SCHEMA_SQL)
  .digest('hex');

// Migration v24 (Serpent-v6m3): explicit user ignore entries.  Paths are
// relative to the managed Assets root or a linked-folder root.  A folder entry
// hides the folder and every descendant without deleting the indexed rows, so
// unignore can restore the view when the source is still present.
export const EXPLICIT_IGNORES_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS explicit_ignored_paths (
    location_kind TEXT NOT NULL CHECK (location_kind IN ('managed', 'linked')),
    -- Empty string identifies the managed Assets root; linked folder ids are
    -- validated by the Worker before writes (the column intentionally is not
    -- a foreign key because managed rows use the empty-string sentinel).
    linked_folder_id TEXT NOT NULL DEFAULT '',
    relative_path TEXT NOT NULL,
    path_kind TEXT NOT NULL CHECK (path_kind IN ('asset', 'folder')),
    ignored_at TEXT NOT NULL,
    PRIMARY KEY(location_kind, linked_folder_id, relative_path, path_kind),
    CHECK (location_kind = 'linked' OR linked_folder_id = '')
  );
  CREATE INDEX IF NOT EXISTS explicit_ignored_paths_lookup
    ON explicit_ignored_paths(location_kind, linked_folder_id, relative_path, path_kind);
`;
export const EXPLICIT_IGNORES_SCHEMA_CHECKSUM = createHash('sha256')
  .update(EXPLICIT_IGNORES_SCHEMA_SQL)
  .digest('hex');

// Migration v25: extension ignores are library-scoped rules that hide every
// asset whose filename ends in the selected extension.  The v24 CHECK
// constraint only allowed asset/folder rows, so rebuild the small table while
// preserving existing entries.
export const EXTENSION_IGNORES_SCHEMA_SQL = `
  CREATE TABLE explicit_ignored_paths_v25 (
    location_kind TEXT NOT NULL CHECK (location_kind IN ('managed', 'linked')),
    linked_folder_id TEXT NOT NULL DEFAULT '',
    relative_path TEXT NOT NULL,
    path_kind TEXT NOT NULL CHECK (path_kind IN ('asset', 'folder', 'extension')),
    ignored_at TEXT NOT NULL,
    PRIMARY KEY(location_kind, linked_folder_id, relative_path, path_kind),
    CHECK (location_kind = 'linked' OR linked_folder_id = '')
  );
  INSERT INTO explicit_ignored_paths_v25
    (location_kind, linked_folder_id, relative_path, path_kind, ignored_at)
  SELECT location_kind, linked_folder_id, relative_path, path_kind, ignored_at
    FROM explicit_ignored_paths;
  DROP TABLE explicit_ignored_paths;
  ALTER TABLE explicit_ignored_paths_v25 RENAME TO explicit_ignored_paths;
  CREATE INDEX explicit_ignored_paths_lookup
    ON explicit_ignored_paths(location_kind, linked_folder_id, relative_path, path_kind);
`;
export const EXTENSION_IGNORES_SCHEMA_CHECKSUM = createHash('sha256')
  .update(EXTENSION_IGNORES_SCHEMA_SQL)
  .digest('hex');

// Migration v26: the editable library-level .serpentignore is materialized into
// the database so every browse/search/count query can apply the same rules
// without making SQLite call back into the filesystem. The text file remains
// the source of truth; this table is rebuilt whenever its contents change.
export const GITIGNORE_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS gitignore_ignored_paths (
    relative_path TEXT NOT NULL,
    path_kind TEXT NOT NULL CHECK (path_kind IN ('asset', 'folder')),
    PRIMARY KEY(relative_path, path_kind)
  );
  CREATE INDEX IF NOT EXISTS gitignore_ignored_paths_lookup
    ON gitignore_ignored_paths(relative_path, path_kind);
`;
export const GITIGNORE_SCHEMA_CHECKSUM = createHash('sha256')
  .update(GITIGNORE_SCHEMA_SQL)
  .digest('hex');

// Migration v35 (Serpent-5n4z.1 / ADR-0032): one durable, per-library
// operation history shared by Desktop, scripts, MCP and plugins. The payloads
// are typed recipe JSON owned by the Worker; they are never exposed through
// the renderer or automation protocol as executable recovery instructions.
export const OPERATION_HISTORY_SCHEMA_SQL = `
  CREATE TABLE operation_history (
    history_entry_id TEXT PRIMARY KEY,
    source TEXT NOT NULL CHECK (source IN ('desktop', 'script', 'mcp', 'plugin')),
    source_reference TEXT,
    label_key TEXT NOT NULL,
    label_args_json TEXT NOT NULL,
    policy TEXT NOT NULL CHECK (policy IN ('reversible', 'barrier')),
    state TEXT NOT NULL CHECK (state IN ('open', 'applied', 'undoing', 'undone', 'redoing', 'stale')),
    applied_sequence INTEGER NOT NULL UNIQUE,
    stale_code TEXT,
    affected_count INTEGER NOT NULL DEFAULT 0 CHECK (affected_count >= 0),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE operation_history_steps (
    history_step_id TEXT PRIMARY KEY,
    history_entry_id TEXT NOT NULL REFERENCES operation_history(history_entry_id) ON DELETE CASCADE,
    ordinal INTEGER NOT NULL CHECK (ordinal >= 0),
    command_id TEXT NOT NULL,
    recipe_kind TEXT NOT NULL,
    recipe_version INTEGER NOT NULL CHECK (recipe_version > 0),
    forward_payload_json TEXT NOT NULL,
    inverse_payload_json TEXT NOT NULL,
    affected_entities_json TEXT NOT NULL,
    current_direction TEXT NOT NULL CHECK (current_direction IN ('forward', 'inverse')),
    UNIQUE(history_entry_id, ordinal)
  );

  CREATE TABLE operation_history_attempts (
    attempt_id TEXT PRIMARY KEY,
    history_entry_id TEXT NOT NULL REFERENCES operation_history(history_entry_id) ON DELETE CASCADE,
    direction TEXT NOT NULL CHECK (direction IN ('undo', 'redo')),
    status TEXT NOT NULL CHECK (status IN ('preparing', 'applying', 'committed', 'rolled_back', 'failed')),
    next_step_ordinal INTEGER NOT NULL DEFAULT 0 CHECK (next_step_ordinal >= 0),
    error_code TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX operation_history_state_sequence_idx
    ON operation_history(state, applied_sequence);
  CREATE INDEX operation_history_steps_entry_idx
    ON operation_history_steps(history_entry_id, ordinal);
  CREATE INDEX operation_history_attempts_entry_idx
    ON operation_history_attempts(history_entry_id, created_at);

  -- History is a user-visible projection.  Treat its append/state changes as
  -- ordinary library mutations so another open Worker refreshes menus and
  -- automation projections even when the underlying operation was performed
  -- by a different process.
  CREATE TRIGGER library_change_on_operation_history_insert
    AFTER INSERT ON operation_history BEGIN
      UPDATE library_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER library_change_on_operation_history_update
    AFTER UPDATE ON operation_history BEGIN
      UPDATE library_change_sequence SET sequence = sequence + 1;
    END;
  CREATE TRIGGER library_change_on_operation_history_delete
    AFTER DELETE ON operation_history BEGIN
      UPDATE library_change_sequence SET sequence = sequence + 1;
    END;
`;
export const OPERATION_HISTORY_SCHEMA_CHECKSUM = createHash('sha256')
  .update(OPERATION_HISTORY_SCHEMA_SQL)
  .digest('hex');

// Migration v36: redo is a LIFO stack. The original forward commit order is
// not enough to identify the next redo after undoing several entries, so keep
// a durable sequence assigned when each undo commits.
export const OPERATION_HISTORY_REDO_STACK_SCHEMA_SQL = `
  ALTER TABLE operation_history
    ADD COLUMN redo_sequence INTEGER NOT NULL DEFAULT 0;
  UPDATE operation_history
     SET redo_sequence = applied_sequence
   WHERE state = 'undone';
  CREATE INDEX operation_history_redo_sequence_idx
    ON operation_history(state, redo_sequence);
`;
export const OPERATION_HISTORY_REDO_STACK_SCHEMA_CHECKSUM = createHash('sha256')
  .update(OPERATION_HISTORY_REDO_STACK_SCHEMA_SQL)
  .digest('hex');

// Migration v37: keep the per-asset opt-out from import-triggered automatic
// AI durable. Preview generation remains enabled, while reopening a library
// cannot turn a previous Eagle import back into an AI enqueue.
export const AUTO_ANALYSIS_SUPPRESSION_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS asset_auto_analysis_suppression (
    asset_id TEXT PRIMARY KEY REFERENCES assets(asset_id) ON DELETE CASCADE,
    reason TEXT NOT NULL CHECK (reason IN ('external-library-import')),
    created_at TEXT NOT NULL
  );
`;
export const AUTO_ANALYSIS_SUPPRESSION_SCHEMA_CHECKSUM = createHash('sha256')
  .update(AUTO_ANALYSIS_SUPPRESSION_SCHEMA_SQL)
  .digest('hex');

// Keep individual recipes bounded so a DB-only mutation cannot turn the
// library database into an unbounded snapshot store. Large-content/history
// operations remain a separate phase with explicit byte retention policy.
export const OPERATION_HISTORY_MAX_RECIPE_BYTES = 4 * 1024 * 1024;
export const OPERATION_HISTORY_MAX_AUDIT_ENTRIES = 2_000;
export const OPERATION_HISTORY_STALE_RETENTION_MS = 180 * 24 * 60 * 60 * 1000;

// Exported for schema-compatibility tests that replay migrations
// version-by-version (Serpent-verg.4/6).
export const MIGRATIONS = [
  { version: 1, sql: INITIAL_SCHEMA_SQL, checksum: INITIAL_SCHEMA_CHECKSUM },
  { version: 2, sql: ASSET_SCHEMA_SQL, checksum: ASSET_SCHEMA_CHECKSUM },
  {
    version: 3,
    sql: PORTABLE_PATH_SCHEMA_BEFORE_BACKFILL_SQL,
    checksum: PORTABLE_PATH_SCHEMA_CHECKSUM,
  },
  { version: 4, sql: LINKED_FOLDERS_SCHEMA_SQL, checksum: LINKED_FOLDERS_SCHEMA_CHECKSUM },
  { version: 5, sql: ORGANIZATION_SCHEMA_SQL, checksum: ORGANIZATION_SCHEMA_CHECKSUM },
  { version: 6, sql: SEARCH_SCHEMA_SQL, checksum: SEARCH_SCHEMA_CHECKSUM },
  { version: 7, sql: TRASH_SCHEMA_SQL, checksum: TRASH_SCHEMA_CHECKSUM },
  { version: 8, sql: AI_CONTENT_SCHEMA_SQL, checksum: AI_CONTENT_SCHEMA_CHECKSUM },
  { version: 9, sql: THUMBNAIL_SCHEMA_SQL, checksum: THUMBNAIL_SCHEMA_CHECKSUM },
  { version: 10, sql: AI_JOBS_SCHEMA_SQL, checksum: AI_JOBS_SCHEMA_CHECKSUM },
  { version: 11, sql: MEDIA_DURATION_SCHEMA_SQL, checksum: MEDIA_DURATION_SCHEMA_CHECKSUM },
  { version: 12, sql: PALETTE_SORT_SCHEMA_SQL, checksum: PALETTE_SORT_SCHEMA_CHECKSUM },
  { version: 13, sql: LINKED_FOLDER_RULES_SCHEMA_SQL, checksum: LINKED_FOLDER_RULES_SCHEMA_CHECKSUM },
  { version: 14, sql: RETIRE_ASSET_LABEL_SCHEMA_SQL, checksum: RETIRE_ASSET_LABEL_SCHEMA_CHECKSUM },
  { version: 15, sql: AUTHOR_METADATA_SCHEMA_SQL, checksum: AUTHOR_METADATA_SCHEMA_CHECKSUM },
  { version: 16, sql: AI_RATING_CONTENT_SCHEMA_SQL, checksum: AI_RATING_CONTENT_SCHEMA_CHECKSUM },
  {
    version: 17,
    sql: TRASHED_MANAGED_FOLDERS_SCHEMA_SQL,
    checksum: TRASHED_MANAGED_FOLDERS_SCHEMA_CHECKSUM,
  },
  {
    version: 18,
    sql: CONTEXTUAL_SUBSTRING_SEARCH_SCHEMA_SQL,
    checksum: CONTEXTUAL_SUBSTRING_SEARCH_SCHEMA_CHECKSUM,
  },
  {
    version: 19,
    sql: AI_DESCRIPTION_SEARCH_BACKFILL_SCHEMA_SQL,
    checksum: AI_DESCRIPTION_SEARCH_BACKFILL_SCHEMA_CHECKSUM,
  },
  {
    version: 20,
    sql: TRASH_TOMBSTONE_ASSET_BIND_SCHEMA_SQL,
    checksum: TRASH_TOMBSTONE_ASSET_BIND_SCHEMA_CHECKSUM,
  },
  { version: 21, sql: MEDIA_PROXY_SCHEMA_SQL, checksum: MEDIA_PROXY_SCHEMA_CHECKSUM },
  { version: 22, sql: COLOR_SPACE_OVERRIDE_SCHEMA_SQL, checksum: COLOR_SPACE_OVERRIDE_SCHEMA_CHECKSUM },
  { version: 23, sql: IMAGE_SEQUENCE_SCHEMA_SQL, checksum: IMAGE_SEQUENCE_SCHEMA_CHECKSUM },
  { version: 24, sql: EXPLICIT_IGNORES_SCHEMA_SQL, checksum: EXPLICIT_IGNORES_SCHEMA_CHECKSUM },
  { version: 25, sql: EXTENSION_IGNORES_SCHEMA_SQL, checksum: EXTENSION_IGNORES_SCHEMA_CHECKSUM },
  { version: 26, sql: GITIGNORE_SCHEMA_SQL, checksum: GITIGNORE_SCHEMA_CHECKSUM },
  {
    version: 27,
    sql: WRITE_COORDINATION_SCHEMA_SQL,
    checksum: WRITE_COORDINATION_SCHEMA_CHECKSUM,
  },
  { version: 28, sql: JOB_LEASE_SCHEMA_SQL, checksum: JOB_LEASE_SCHEMA_CHECKSUM },
  {
    version: 29,
    sql: THUMBNAIL_QUEUE_INDEX_SCHEMA_SQL,
    checksum: THUMBNAIL_QUEUE_INDEX_SCHEMA_CHECKSUM,
  },
  {
    version: 30,
    sql: PLUGIN_BACKGROUND_JOBS_SCHEMA_SQL,
    checksum: PLUGIN_BACKGROUND_JOBS_SCHEMA_CHECKSUM,
  },
  {
    version: 31,
    sql: PLUGIN_DERIVED_FIELDS_SCHEMA_SQL,
    checksum: PLUGIN_DERIVED_FIELDS_SCHEMA_CHECKSUM,
  },
  {
    version: 32,
    sql: PLUGIN_JOB_INTERRUPTED_SCHEMA_SQL,
    checksum: PLUGIN_JOB_INTERRUPTED_SCHEMA_CHECKSUM,
  },
  {
    version: 33,
    sql: MODEL_ARTIFACT_KIND_SCHEMA_SQL,
    checksum: MODEL_ARTIFACT_KIND_SCHEMA_CHECKSUM,
  },
  {
    version: 34,
    sql: CONTENT_FINGERPRINT_SCHEMA_SQL,
    checksum: CONTENT_FINGERPRINT_SCHEMA_CHECKSUM,
  },
  {
    version: 35,
    sql: OPERATION_HISTORY_SCHEMA_SQL,
    checksum: OPERATION_HISTORY_SCHEMA_CHECKSUM,
  },
  {
    version: 36,
    sql: OPERATION_HISTORY_REDO_STACK_SCHEMA_SQL,
    checksum: OPERATION_HISTORY_REDO_STACK_SCHEMA_CHECKSUM,
  },
  // v37 was first consumed by real user data (auto-analysis suppression) before
  // the sync work landed; the sync migration therefore takes v38 to keep every
  // existing v37 library (whose schema_migrations row carries the suppression
  // checksum) openable without touching its history. See Serpent-dw9a.
  // Libraries opened by the sync-first fork recorded the opposite assignment
  // (v37=SYNC, v38=AUTO). migrateForkedSyncAutoAnalysisMigrationHistory
  // rewrites only schema_migrations for that exact history.
  {
    version: 37,
    sql: AUTO_ANALYSIS_SUPPRESSION_SCHEMA_SQL,
    checksum: AUTO_ANALYSIS_SUPPRESSION_SCHEMA_CHECKSUM,
  },
  { version: 38, sql: SYNC_SCHEMA_SQL, checksum: SYNC_SCHEMA_CHECKSUM },
  { version: 39, sql: SYNC_SESSIONS_SCHEMA_SQL, checksum: SYNC_SESSIONS_SCHEMA_CHECKSUM },
  {
    version: 40,
    sql: ASSETS_ACTIVE_NAME_INDEX_SCHEMA_SQL,
    checksum: ASSETS_ACTIVE_NAME_INDEX_SCHEMA_CHECKSUM,
  },
  {
    version: 41,
    sql: ASSETS_ACTIVE_CREATED_DESC_INDEX_SCHEMA_SQL,
    checksum: ASSETS_ACTIVE_CREATED_DESC_INDEX_SCHEMA_CHECKSUM,
  },
  {
    version: 42,
    sql: TOMBSTONE_BACKFILL_INDEX_SCHEMA_SQL,
    checksum: TOMBSTONE_BACKFILL_INDEX_SCHEMA_CHECKSUM,
  },
  {
    version: 43,
    sql: RAW_VIEWER_ARTIFACT_SCHEMA_SQL,
    checksum: RAW_VIEWER_ARTIFACT_SCHEMA_CHECKSUM,
  },
  {
    version: 44,
    sql: ARTIFACT_IDENTITY_SCHEMA_SQL,
    checksum: ARTIFACT_IDENTITY_SCHEMA_CHECKSUM,
  },
  {
    version: 45,
    sql: BROWSE_CHANGE_SEQUENCE_SCHEMA_SQL,
    checksum: BROWSE_CHANGE_SEQUENCE_SCHEMA_CHECKSUM,
  },
  {
    version: 46,
    sql: BROWSE_IGNORE_RULE_SEQUENCE_SCHEMA_SQL,
    checksum: BROWSE_IGNORE_RULE_SEQUENCE_SCHEMA_CHECKSUM,
  },
  {
    version: 47,
    sql: BROWSE_SEQUENCE_FRAME_SCHEMA_SQL,
    checksum: BROWSE_SEQUENCE_FRAME_SCHEMA_CHECKSUM,
  },
  {
    version: 48,
    sql: LINKED_SOURCE_IDENTITY_SCHEMA_SQL,
    checksum: LINKED_SOURCE_IDENTITY_SCHEMA_CHECKSUM,
  },
  {
    version: 49,
    sql: LINKED_FOLDER_PARENT_SCHEMA_SQL,
    checksum: LINKED_FOLDER_PARENT_SCHEMA_CHECKSUM,
  },
  {
    version: 50,
    sql: JOB_RECENT_LIST_INDEX_SCHEMA_SQL,
    checksum: JOB_RECENT_LIST_INDEX_SCHEMA_CHECKSUM,
  },
  {
    version: 51,
    sql: RAW_METADATA_BACKFILL_STATE_SCHEMA_SQL,
    checksum: RAW_METADATA_BACKFILL_STATE_SCHEMA_CHECKSUM,
  },
  {
    version: 52,
    sql: RAW_METADATA_RETRY_INDEX_SCHEMA_SQL,
    checksum: RAW_METADATA_RETRY_INDEX_SCHEMA_CHECKSUM,
  },
  {
    version: 53,
    sql: MEDIA_JOB_STATUS_COUNTS_SCHEMA_SQL,
    checksum: MEDIA_JOB_STATUS_COUNTS_SCHEMA_CHECKSUM,
  },
  {
    version: 54,
    sql: ASSET_NORMALIZED_EXTENSION_SCHEMA_SQL,
    checksum: ASSET_NORMALIZED_EXTENSION_SCHEMA_CHECKSUM,
  },
  {
    version: 55,
    sql: ENTITY_APPEARANCE_SCHEMA_SQL,
    checksum: ENTITY_APPEARANCE_SCHEMA_CHECKSUM,
  },
  {
    version: 56,
    sql: PALETTE_SATURATION_SCHEMA_SQL,
    checksum: PALETTE_SATURATION_SCHEMA_CHECKSUM,
  },
  {
    version: 57,
    sql: FOLDER_CUSTOM_COVER_SCHEMA_SQL,
    checksum: FOLDER_CUSTOM_COVER_SCHEMA_CHECKSUM,
  },
  {
    version: 58,
    sql: FOLDER_CUSTOM_COVER_ASSET_SCHEMA_SQL,
    checksum: FOLDER_CUSTOM_COVER_ASSET_SCHEMA_CHECKSUM,
  },
  {
    version: 59,
    sql: REVISION_SIZE_FINGERPRINT_INDEX_SCHEMA_SQL,
    checksum: REVISION_SIZE_FINGERPRINT_INDEX_SCHEMA_CHECKSUM,
  },
] as const;
export const SUPPORTED_SCHEMA_VERSION = MIGRATIONS.at(-1)!.version;

/**
 * Serpent-verg.7 — the in-place table-rebuild migrations (CREATE replacement
 * → copy → DROP old → RENAME). The worker disables FK enforcement around
 * these; `tests/worker/migration-discipline.test.ts` asserts this set matches
 * the static gate's rebuild exceptions exactly, so a new rebuild migration
 * must be added to both places.
 */
export const TABLE_REBUILD_MIGRATION_VERSIONS: ReadonlySet<number> = new Set([
  4, 6, 7, 10, 14, 16, 18, 21, 25, 30, 32, 33, 43, 44,
]);

export interface LibraryRow {
  library_id: string;
  display_name: string;
}

export interface MigrationRow {
  checksum: string;
  version: number;
}

export interface OpenLibrary {
  connection: DatabaseConnection;
  /** The remote writable truth source; `connection` may be a NAS read-through adapter. */
  writeConnection: DatabaseConnection;
  summary: InternalLibrarySummary;
  changeSubscription: LibraryChangeSubscription;
  /** Whether this handle was opened for inspection without write access. */
  readOnly: boolean;
  /** Managed path identities whose on-disk file must not be auto-reconciled after relink recovery preserved them. */
  preservedRelinkPathIdentities: Set<string>;
  /** Last .serpentignore contents materialized into gitignore_ignored_paths. */
  gitignoreText: string;
  /** Parsed rules used while discovering files that are not in SQLite yet. */
  gitignoreMatcher: GitIgnoreMatcher;
  /** Whether the current ignore text has been materialized at least once. */
  gitignoreMaterialized: boolean;
  /**
   * Serpent-4bdd26: memo for the recursive per-collection asset counts keyed
   * by the narrow browse change sequence. The recursive CTE costs ~25-100ms
   * on a 20k library and the sidebar re-requests it after every mutation;
   * artifact/job progress is not a membership change and must not evict it.
   */
  collectionCountCache?: { browseChangeSequence: number; counts: Map<string, number> };
  /**
   * Serpent-4bdd26: memo for recursive per-folder asset counts keyed by
   * browse sequence + showIgnored. The sidebar re-requests it after every
   * mutation; the direct-count GROUP BY dominates the ~20ms otherwise.
   */
  folderCountCache?: { key: string; counts: Map<string, number> };
  /**
   * Ordered visible asset ids learned by the compact layout query. The
   * renderer already paid for this full-scope order to build the scrollbar;
   * reusing it turns a later deep page request into bounded primary-key reads
   * instead of another cold ORDER BY/OFFSET walk over the whole library. The
   * narrow browse sequence keeps thumbnail/job progress from discarding it.
   */
  browseIndexCache?: { browseChangeSequence: number; assetIds: string[] };
  /**
   * Coherent sidebar/count read model keyed by browse sequence and visibility.
   * The returned summary still carries the broad sequence for cross-process
   * fencing; artifact/job progress may therefore change that number without
   * forcing the expensive navigation queries to run again.
   */
  navigationSummaryCache?: { key: string; value: LibraryNavigationSummary };
  /**
   * Custom folder covers for the current browse + library change sequence.
   * Scoped folder-card reads reuse this map; a sequence change drops it.
   */
  folderCoverIndexCache?: {
    key: string;
    index: Map<string, {
      token: string;
      assetId?: string;
      artifactId?: string;
      revisionId?: string;
    }>;
  };
  /**
   * Remote-library metadata snapshot. The snapshot is disposable and
   * read-only; every write and ambiguous SQL statement remains on
   * `writeConnection` through the read-through adapter.
   */
  networkMetadataCache?: {
    cacheKey: string;
    databasePath: string;
    schemaVersion: number;
    readThrough: NetworkReadThroughConnection;
    writeThrough: NetworkReadThroughConnection;
    manifest?: NetworkMetadataCacheManifest;
    /** Fingerprint observed by this open generation; manifest mtime is advisory across opens. */
    observedSourceFingerprint?: NetworkMetadataSourceFingerprint;
    /** Narrow catalog cursor; volatile jobs/artifacts do not invalidate this snapshot. */
    observedSourceChangeSequence?: number;
    refreshInFlight?: Promise<void>;
  };
}

export interface NetworkMetadataSourceState {
  schemaVersion: number;
  sourceChangeSequence: number;
  sourceFingerprint: NetworkMetadataSourceFingerprint;
}

export interface NetworkMetadataSnapshotProgress {
  remainingPages: number;
  totalPages: number;
}

export const NETWORK_METADATA_SNAPSHOT_TABLES = [
  // These tables define catalog membership, ordering, folder/collection
  // navigation and the metadata shown in the browse surface. Everything not
  // explicitly listed remains on the remote primary, including future tables.
  'assets',
  'revisions',
  'managed_folders',
  'linked_folders',
  'linked_folder_rules',
  'linked_ignored_assets',
  'asset_sequence_frames',
  'asset_metadata',
  'asset_color_space_overrides',
  'tags',
  'human_asset_tags',
  'ai_asset_tags',
  'collections',
  'collection_assets',
  'smart_collections',
  'ai_content',
  'trashed_managed_folders',
  'explicit_ignored_paths',
  'gitignore_ignored_paths',
] as const;

export type DiscoveredSourceEntry = {
  assetId?: string;
  /** SHA-1 prepared during async reconciliation, before the SQLite batch. */
  contentFingerprint?: string;
  /** Stable source identity used to detect an in-root external rename. */
  sourceDevice?: string;
  sourceInode?: string;
  relativePath: string;
  byteSize: number;
  modifiedAt: string;
  originalFilename: string;
};

export interface RefreshManagedAssetsDiscovery {
  linkedEntriesByFolder: Map<string, DiscoveredSourceEntry[]>;
  managedEntries: DiscoveredSourceEntry[];
  scopedLinkedFolderIds?: ReadonlySet<string>;
  existingLinkedAssetIdsByFolder?: Map<string, Map<string, string>>;
  existingManagedAssetIdsByIdentity?: Map<string, string>;
  movedLinkedAssetsReconciled?: boolean;
}

export type OpenReconciliationTask = LibraryReconciliationTask<OpenLibrary>;

export interface ArtifactPathCacheEntry {
  absolutePath: string;
  kind: string;
  changeSequence: number;
}

export interface ArtifactDescriptor {
  artifactId: string;
  filePath: string;
  mimeType: string;
  generatorVersion: string;
  artifactRole: string | null;
  generatorId: string | null;
  settingsHash: string | null;
  artifactKey: string | null;
  status: string;
  errorCode: string | null;
  width: number | null;
  height: number | null;
  generatedAt: string | null;
}

export interface ManagedFolderRow {
  folder_id: string;
  name: string;
  parent_folder_id: string | null;
  relative_path: string;
  path_identity: string;
  /** Serpent-db1835: sidebar folder sort by creation time. */
  created_at?: string;
  appearance_glyph_kind?: string | null;
  appearance_glyph_value?: string | null;
  appearance_color_id?: string | null;
}

export interface AssetSummaryRow {
  asset_id: string;
  availability: 'available' | 'missing';
  byte_size: number;
  current_revision_id: string;
  managed_folder_id: string | null;
  linked_folder_id: string | null;
  location_kind: 'managed' | 'linked';
  modified_at: string;
  relative_file_path: string;
  rating: number;
  favorite: number;
}

export interface BatchRelinkAssetRow {
  asset_id: string;
  location_kind: 'managed' | 'linked';
  linked_folder_id: string | null;
  managed_folder_id: string | null;
  relative_file_path: string;
  current_revision_id: string | null;
  content_fingerprint: string | null;
}

export interface BatchRelinkMatch {
  matchedPath: string;
  resolvedRelativePath: string;
}

export interface ImportSourceEntry {
  byteSize: number;
  destinationRelativePath: string;
  /** Metadata projected from an Eagle item; absent for ordinary imports. */
  eagleMetadata?: EagleImportedMetadata;
  /** Thumbnail already copied during bulk staging so resolve can skip a second walk. */
  copiedThumbnail?: EagleCopiedThumbnail;
  /** Hash of the staged bytes, calculated once during preparation. */
  sha256?: string;
  /** SHA-1 content identity used to disambiguate missing-file recovery. */
  contentFingerprint?: string;
  /** Optional metadata intent committed atomically with this imported asset. */
  sourcePageUrl?: string;
  sourceSnapshot: SourceSnapshot;
  sourcePath: string;
}

export interface SourceSnapshot {
  ctimeNs: bigint;
  dev: bigint;
  ino: bigint;
  mtimeNs: bigint;
  size: bigint;
}

export interface EagleCopiedThumbnail {
  artifactAbsPath: string;
  artifactId: string;
  artifactKind: 'thumbnail' | 'video_poster';
  artifactRelPath: string;
  byteSize: number;
  generatorVersion: string;
  height: number | null;
  mimeType: string;
  width: number | null;
}

export interface EagleImportedMetadata {
  collectionIds: string[];
  description: string | null;
  rating: number;
  sourceModifiedAtMs: number;
  sourcePageUrl: string | null;
  sourceRootPath: string;
  tagIds: string[];
  thumbnailPath: string | null;
  thumbnailGeneratorVersion?: string;
  width?: number;
  height?: number;
}

export interface ManagedRelinkPlacementIdentity {
  ctimeNs: string;
  dev: string;
  ino: string;
  mtimeNs: string;
  sha256: string;
  size: string;
}

export interface ManagedRelinkPlacementManifestV3 {
  destinationRelativePath: string;
  kind: 'managed-relink-placement';
  phase: 'staged';
  stagedIdentity: ManagedRelinkPlacementIdentity;
  version: 3;
}

export interface ManagedRelinkPlacedMarkerV1 {
  kind: 'managed-relink-placement-complete';
  placedIdentity: ManagedRelinkPlacementIdentity;
  version: 1;
}

export interface PendingImport {
  directories: string[];
  entries: ImportSourceEntry[];
  createImageSequence?: boolean;
  /** Eagle imports deliberately avoid the O(existing-assets × same-size) scan. */
  skipLibraryDuplicateScan?: boolean;
  expiryHandle?: unknown;
  imageSequenceFps?: number;
  libraryId: string;
  operationPath: string;
  dedupeSameNameByContent?: boolean;
  suppressAssetChangeEvents?: boolean;
  /** External bulk conversion skips full-file hashing (Serpent-7tjg). */
  skipContentHash?: boolean;
  /**
   * Identity → on-disk destination for bulk conversion. Avoids readdir of
   * Assets for every file (O(n²) on a 20k Eagle library).
   */
  destinationIndex?: Map<string, ExistingDestination>;
  /**
   * SHA-256 of existing same-size library files hashed during prepare.
   * Resolve reuses this so a no-conflict import does not re-read the library.
   */
  contentHashCache?: Map<string, string>;
  unstagedEntries?: ImportSourceEntry[];
  skippedSources?: SkippedImportSource[];
  skipRemainingSourceFailures?: boolean;
  awaitingSourceFailureDecision?: boolean;
  stagePath?: string;
  prepareInput?: Parameters<LibraryService['prepareImport']>[0];
  preparingManifest?: OperationManifest;
}

export interface ExistingAssetRow {
  asset_id: string;
  current_revision_id: string;
}

export interface ExistingDestination {
  actualRelativePath: string;
  size: number;
  fileVersion?: {
    ctimeMs: number;
    dev: number;
    ino: number;
    mtimeMs: number;
  };
}

export function sameDestinationSnapshot(
  expected: ExistingDestination | undefined,
  current: ExistingDestination | undefined,
): boolean {
  if (expected === undefined || current === undefined) return expected === current;
  if (
    expected.actualRelativePath !== current.actualRelativePath ||
    expected.size !== current.size
  ) {
    return false;
  }
  const expectedVersion = expected.fileVersion;
  const currentVersion = current.fileVersion;
  if (expectedVersion === undefined || currentVersion === undefined) {
    return expectedVersion === currentVersion;
  }
  return expectedVersion.ctimeMs === currentVersion.ctimeMs
    && expectedVersion.dev === currentVersion.dev
    && expectedVersion.ino === currentVersion.ino
    && expectedVersion.mtimeMs === currentVersion.mtimeMs;
}

export interface PortablePathRow {
  id: string;
  relative_path: string;
}

export interface ImportAction {
  destinationRelativePath: string;
  entry: ImportSourceEntry;
  existingAsset?: ExistingAssetRow;
  expectedDestination: ExistingDestination | undefined;
  isReplacement: boolean;
}

export interface OperationManifest {
  directories: Array<{ existed: boolean; relativePath: string }>;
  files: Array<{
    backupName: string;
    destinationRelativePath: string;
    hadDestination: boolean;
    stageName: string;
  }>;
  phase?: 'prepared' | 'staging';
  version: 1;
}

export interface LinkedTrashOperationManifest {
  assetIds: string[];
  inFlightAssetId: string | null;
  kind: 'linked-trash';
  trashedAssetIds: string[];
  version: 2;
}

export interface RestoreOperationManifest {
  files: Array<{
    assetId: string;
    backupDestinationRelativePath: string | null;
    backupName: string;
    conflictingAssetId: string | null;
    destinationRelativePath: string;
    hadDestination: boolean;
    trashFilename: string;
  }>;
  kind: 'restore';
  version: 3;
}

export interface ManagedMoveConflict {
  assetId: string | null;
  backupName: string;
  kind: 'managed' | 'untracked';
  managedFolderId: string | null;
  operationId: string;
  relativePath: string;
  /** False when the DB row remains but its source file disappeared. */
  sourceExists?: boolean;
  trashFilename: string | null;
}

export interface ManagedMoveOperationManifest {
  files: Array<{
    assetId: string;
    destinationConflict: ManagedMoveConflict | null;
    destinationFolderId: string | null;
    destinationRelativePath: string;
    restoreConflict: ManagedMoveConflict | null;
    sourceFolderId: string | null;
    sourceRelativePath: string;
  }>;
  kind: 'managed-move' | 'managed-move-undo';
  originalOperationId: string | null;
  version: 4;
}

/** Durable journal for managed-folder duplicate (Option/Alt drag copy). */
export interface ManagedCopyOperationManifest {
  files: Array<{
    destinationConflict: ManagedMoveConflict | null;
    destinationFolderId: string | null;
    destinationRelativePath: string;
    newAssetId: string;
    sourceAssetId: string;
    sourceRelativePath: string;
  }>;
  kind: 'managed-copy' | 'managed-copy-undo';
  originalOperationId: string | null;
  version: 5;
}

export interface ContentReplaceBatchOperationManifest {
  files: Array<{
    assetId: string;
    backupName: string;
    destinationRelativePath: string;
    newRevisionId: string;
    originalModifiedAt: string;
    originalSha256: string;
    previousRevisionId: string;
    sha256: string;
    stageName: string;
  }>;
  kind: 'content-replace-batch';
  version: 6;
}

/**
 * Durable journal for managed-folder trash. The folder tree is first moved to
 * the operation directory, then its DB rows are removed. This keeps a failed
 * SQLite commit or a Worker restart recoverable instead of leaving a missing
 * directory with live index rows.
 */
export interface ManagedFolderTrashOperationManifest {
  assetIds: string[];
  assetOperationId: string | null;
  folder: {
    folderId: string;
    name: string;
    parentFolderId: string | null;
    pathIdentity: string;
    relativePath: string;
  };
  descendants: Array<{
    folderId: string;
    name: string;
    parentFolderId: string | null;
    pathIdentity: string;
    relativePath: string;
  }>;
  kind: 'folder-trash';
  phase: 'prepared' | 'assets-trashed' | 'tombstones-written' | 'filesystem-staged' | 'db-committed';
  trashedAt: string;
  tombstones: Array<{
    folderId: string;
    name: string;
    parentRelativePath: string | null;
    relativePath: string;
    tombstoneId: string;
    trashedAssetCount: number;
  }>;
  version: 7;
}

export type PersistedOperationManifest =
  | OperationManifest
  | LinkedTrashOperationManifest
  | RestoreOperationManifest
  | ManagedMoveOperationManifest
  | ManagedCopyOperationManifest
  | ContentReplaceBatchOperationManifest
  | ManagedFolderTrashOperationManifest;

export interface OperationRow {
  error_code: string | null;
  /** Present when selected; recoverFileOperations requires it for import lease skips. */
  kind?: string;
  manifest_json: string;
  operation_id: string;
  status: string;
}

export interface OperationHistoryRow {
  affected_count: number;
  applied_sequence: number;
  created_at: string;
  history_entry_id: string;
  label_args_json: string;
  label_key: string;
  policy: HistoryPolicy;
  source: HistorySource;
  source_reference: string | null;
  stale_code: string | null;
  state: HistoryEntryState;
  redo_sequence: number;
  updated_at: string;
}

export interface OperationHistoryStepRow {
  affected_entities_json: string;
  command_id: string;
  current_direction: 'forward' | 'inverse';
  forward_payload_json: string;
  history_entry_id: string;
  history_step_id: string;
  inverse_payload_json: string;
  ordinal: number;
  recipe_kind: string;
  recipe_version: number;
}

export interface RecordOperationHistoryInput {
  affectedCount: number;
  affectedEntities?: readonly string[];
  commandId: string;
  forwardRecipe: HistoryRecipe;
  inverseRecipe: HistoryRecipe;
  labelArgs?: Readonly<Record<string, string | number>>;
  labelKey: string;
  libraryId: string;
  policy?: HistoryPolicy;
  source?: HistorySource;
  sourceReference?: string | null;
}

export interface OperationHistoryGroupStepInput {
  affectedEntities?: readonly string[];
  commandId: string;
  forwardRecipe: HistoryRecipe;
  inverseRecipe: HistoryRecipe;
}

export interface TrashSelectionResult {
  historyEntryId: string;
  removedFolderCount: number;
  trashedAssetCount: number;
  trashedFolderCount: number;
}

export interface OperationHistoryTransitionResult {
  affectedCount: number;
  direction: HistoryDirection;
  historyEntryId: string;
  status: HistoryStatus;
}

export interface AssetMetadataHistorySnapshot {
  assetId: string;
  author: string | null;
  description: string | null;
  entityVersion: number;
  favorite: boolean;
  palette: string | null;
  rating: number;
  sourcePageUrl: string | null;
  updatedAt: string;
}

export interface ManagedFolderHistorySnapshot {
  folderId: string;
  parentFolderId: string | null;
  name: string;
  relativePath: string;
  pathIdentity: string;
}

export interface CollectionHistorySnapshot {
  collectionId: string;
  libraryId: string;
  parentId: string | null;
  name: string;
  description: string | null;
  coverAssetId: string | null;
  position: number;
}

export interface CollectionMembershipHistorySnapshot {
  collectionId: string;
  assetId: string;
  position: number;
}

export interface SmartCollectionHistorySnapshot {
  collectionId: string;
  libraryId: string;
  name: string;
  queryDefinitionJson: string;
  position: number;
}

export interface TagHistorySnapshot {
  tagId: string;
  libraryId: string;
  name: string;
  humanRelations: Array<{ assetId: string; tagId: string }>;
}

export type ImportFailurePoint =
  | 'after-stage'
  | 'after-backup'
  | 'after-first-place'
  | 'after-place'
  | 'after-import-metadata'
  | 'before-db-commit'
  | 'committed-cleanup'
  | 'committed-result-list'
  | 'crash-after-backup'
  | 'crash-after-place'
  | 'crash-during-prepare-stage'
  | 'crash-restore-before-filesystem'
  | 'crash-restore-after-backup'
  | 'crash-restore-after-filesystem'
  | 'crash-restore-before-db-commit'
  | 'crash-restore-after-db-commit'
  | 'crash-folder-trash-before-assets'
  | 'crash-folder-trash-after-assets'
  | 'crash-folder-trash-after-tombstones'
  | 'crash-folder-trash-after-filesystem'
  | 'crash-move-before-filesystem'
  | 'crash-move-after-conflict'
  | 'crash-move-after-filesystem'
  | 'crash-move-before-db-commit'
  | 'crash-move-after-db-commit'
  | 'crash-copy-before-filesystem'
  | 'crash-copy-after-conflict'
  | 'crash-copy-after-filesystem'
  | 'crash-copy-before-db-commit'
  | 'crash-copy-after-db-commit'
  | 'crash-content-replace-batch-after-backup'
  | 'crash-content-replace-batch-after-first-file'
  | 'crash-content-replace-batch-before-db-commit'
  | 'crash-content-replace-batch-after-db-commit'
  | 'crash-linked-convert-after-filesystem'
  | 'crash-relink-before-manifest-write'
  | 'crash-relink-after-manifest-before-placement'
  | 'crash-relink-after-placement-before-manifest-update'
  | 'crash-relink-after-filesystem'
  | 'crash-relink-before-db-commit'
  | 'crash-relink-after-db-commit'
  | 'crash-relink-batch-after-first-place'
  | 'recovery-restore'
  | 'rollback-restore';

/** Result of a subprocess (ffmpeg, ffprobe, oiiotool) invocation. */
export interface SpawnResult {
  stdout: Buffer;
  stderr: string;
  exitCode: number;
}

/** Injectable subprocess spawn function for testing. */
export type SpawnFunction = (
  command: string,
  args: string[],
  options?: { timeoutMs?: number; signal?: AbortSignal },
) => Promise<SpawnResult>;

export type MediaAutoRepairComponent = 'ffmpeg' | 'oiio';

export const MEDIA_COMPONENT_PROBE_TIMEOUT_MS = 2_500;
export const MEDIA_COMPONENT_PROBE_RETRY_MS = 30_000;

/**
 * Check the external media environment without starting a persistent media
 * job. This is intentionally a small capability probe: the actual generator
 * remains the source of truth for codec/filter compatibility.
 */
export function defaultMediaComponentProbe(component: MediaAutoRepairComponent): boolean {
  const canRun = (command: string, args: string[]): boolean => {
    try {
      execFileSync(command, args, {
        stdio: 'ignore',
        timeout: MEDIA_COMPONENT_PROBE_TIMEOUT_MS,
        windowsHide: true,
      });
      return true;
    } catch {
      return false;
    }
  };

  if (component === 'ffmpeg') {
    return canRun(resolveFfmpegPath(), ['-version'])
      && canRun(resolveFfprobePath(), ['-version']);
  }
  return canRun(resolveOiiotoolPath(), ['--help']);
}

export const SPAWN_STDOUT_LIMIT_BYTES = 8 * 1024 * 1024;
export const SPAWN_STDERR_LIMIT_BYTES = 512 * 1024;

export class TailBuffer {
  private chunks: Buffer[] = [];
  private length = 0;

  constructor(private readonly limitBytes: number) {}

  append(chunk: Buffer): void {
    if (chunk.length >= this.limitBytes) {
      this.chunks = [chunk.subarray(chunk.length - this.limitBytes)];
      this.length = this.limitBytes;
      return;
    }

    this.chunks.push(chunk);
    this.length += chunk.length;
    while (this.length > this.limitBytes) {
      const first = this.chunks[0]!;
      const excess = this.length - this.limitBytes;
      if (first.length <= excess) {
        this.chunks.shift();
        this.length -= first.length;
      } else {
        this.chunks[0] = first.subarray(excess);
        this.length -= excess;
      }
    }
  }

  toBuffer(): Buffer {
    return Buffer.concat(this.chunks, this.length);
  }
}

export const activeMediaProcesses = new Set<ChildProcess>();

export function killMediaProcess(processHandle: ChildProcess, signal: 'SIGTERM' | 'SIGKILL' = 'SIGTERM'): void {
  if (processHandle.exitCode !== null) return;
  try {
    processHandle.kill(signal);
  } catch {
    // The process may have exited between the exitCode check and kill().
  }
}

/**
 * Terminate every real media child owned by this Worker. The Worker can be
 * asked to shut down while a queue promise is between awaits, so aborting the
 * job controller alone is not enough to prevent an ffmpeg orphan.
 */
export async function shutdownActiveMediaProcesses(timeoutMs = 1_000): Promise<void> {
  const processes = [...activeMediaProcesses];
  if (processes.length === 0) return;

  const closed = processes.map((processHandle) => new Promise<void>((resolve) => {
    if (processHandle.exitCode !== null) {
      resolve();
      return;
    }
    processHandle.once('close', () => resolve());
  }));
  for (const processHandle of processes) killMediaProcess(processHandle);
  await Promise.race([
    Promise.all(closed),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
  for (const processHandle of [...activeMediaProcesses]) {
    killMediaProcess(processHandle, 'SIGKILL');
  }
}

/**
 * Keep Worker shutdown ordering testable: terminate external media children,
 * let the service abort/close its active jobs, then catch children that raced
 * the first pass.
 */
export async function shutdownWorkerResources(
  closeAllAsync: (timeoutMs: number) => Promise<void>,
  shutdownMediaProcesses: (timeoutMs: number) => Promise<void> = shutdownActiveMediaProcesses,
  timeoutMs = 500,
): Promise<void> {
  await shutdownMediaProcesses(timeoutMs);
  await closeAllAsync(timeoutMs);
  await shutdownMediaProcesses(timeoutMs);
}

// If the UtilityProcess is terminated without receiving the normal shutdown
// control message, Node still gives us a synchronous exit hook. This closes
// the last gap that previously left ffmpeg.exe alive after Serpent stopped.
process.once('exit', () => {
  for (const processHandle of activeMediaProcesses) killMediaProcess(processHandle);
});

/** Real subprocess spawn (child_process.spawn with defaults). */
export function defaultSpawnFn(
  command: string,
  args: string[],
  options?: { timeoutMs?: number; signal?: AbortSignal },
): Promise<SpawnResult> {
  return new Promise((resolve, reject) => {
    if (options?.signal?.aborted) {
      reject(new DOMException('Media job was cancelled before the subprocess started.', 'AbortError'));
      return;
    }
    // Local media work has no honest wall-clock deadline: decode time depends
    // on the source and the user's filesystem. Only callers with an explicit
    // lifecycle/security reason may opt into a deadline.
    const timeoutMs = options?.timeoutMs;
    let timedOut = false;
    let aborted = false;
    let settled = false;
    let killTimer: ReturnType<typeof setTimeout> | undefined;

    const proc: ChildProcess = spawn(command, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    });
    activeMediaProcesses.add(proc);

    const timer = timeoutMs === undefined
      ? undefined
      : setTimeout(() => {
        timedOut = true;
        killMediaProcess(proc);
        // Escalate to SIGKILL after 5s if still running.
        killTimer = setTimeout(() => killMediaProcess(proc, 'SIGKILL'), 5_000);
        killTimer.unref();
      }, timeoutMs);
    timer?.unref();

    const abort = (): void => {
      if (settled || aborted) return;
      aborted = true;
      killMediaProcess(proc);
      killTimer = setTimeout(() => killMediaProcess(proc, 'SIGKILL'), 5_000);
      killTimer.unref();
    };
    options?.signal?.addEventListener('abort', abort, { once: true });

    const stdoutTail = new TailBuffer(SPAWN_STDOUT_LIMIT_BYTES);
    const stderrTail = new TailBuffer(SPAWN_STDERR_LIMIT_BYTES);

    proc.stdout?.on('data', (chunk: Buffer) => stdoutTail.append(chunk));
    proc.stderr?.on('data', (chunk: Buffer) => stderrTail.append(chunk));

    proc.on('error', (err) => {
      if (timer) clearTimeout(timer);
      if (killTimer) clearTimeout(killTimer);
      options?.signal?.removeEventListener('abort', abort);
      activeMediaProcesses.delete(proc);
      settled = true;
      reject(err);
    });

    proc.on('close', (code) => {
      if (timer) clearTimeout(timer);
      if (killTimer) clearTimeout(killTimer);
      options?.signal?.removeEventListener('abort', abort);
      activeMediaProcesses.delete(proc);
      settled = true;
      if (aborted) {
        reject(new DOMException('Media job cancelled; subprocess terminated.', 'AbortError'));
        return;
      }
      resolve({
        stdout: stdoutTail.toBuffer(),
        stderr: stderrTail.toBuffer().toString('utf-8'),
        exitCode: code ?? (timedOut ? -1 : (proc.signalCode ? -1 : 0)),
      });
    });
  });
}

export class AsyncSemaphore {
  private active = 0;
  private readonly waiting: Array<{
    resolve: (release: () => void) => void;
    reject: (error: unknown) => void;
    signal?: AbortSignal;
    abort?: () => void;
  }> = [];

  constructor(private readonly limit: number) {}

  hasIdleCapacity(): boolean {
    return this.active < this.limit;
  }

  async run<T>(signal: AbortSignal | undefined, task: () => Promise<T>): Promise<T> {
    const release = await this.acquire(signal);
    try {
      if (signal?.aborted) throw new DOMException('Media job cancelled.', 'AbortError');
      return await task();
    } finally {
      release();
    }
  }

  private acquire(signal?: AbortSignal): Promise<() => void> {
    if (signal?.aborted) {
      return Promise.reject(new DOMException('Media job cancelled.', 'AbortError'));
    }
    if (this.active < this.limit) {
      this.active += 1;
      return Promise.resolve(this.releaseFactory());
    }
    return new Promise((resolve, reject) => {
      const waiter: {
        resolve: (release: () => void) => void;
        reject: (error: unknown) => void;
        signal?: AbortSignal;
        abort?: () => void;
      } = { resolve, reject, signal };
      if (signal) {
        waiter.abort = () => {
          const index = this.waiting.indexOf(waiter);
          if (index >= 0) this.waiting.splice(index, 1);
          reject(new DOMException('Media job cancelled while waiting for a decoder.', 'AbortError'));
        };
        signal.addEventListener('abort', waiter.abort, { once: true });
      }
      this.waiting.push(waiter);
    });
  }

  private releaseFactory(): () => void {
    let released = false;
    return () => {
      if (released) return;
      released = true;
      while (this.waiting.length > 0) {
        const waiter = this.waiting.shift()!;
        waiter.signal?.removeEventListener('abort', waiter.abort!);
        if (waiter.signal?.aborted) {
          waiter.reject(new DOMException('Media job cancelled while waiting for a decoder.', 'AbortError'));
          continue;
        }
        waiter.resolve(this.releaseFactory());
        return;
      }
      this.active -= 1;
    };
  }
}

// A Library Worker may own several open libraries. These module-level gates
// therefore cap decoder pressure across all LibraryService instances and all
// libraries in the process, not merely within one queue drain.
// Image decode gets a small hard-capped pool; physical CPU topology may only
// reduce it on single-core machines, never expand native memory pressure.
// FFmpeg concurrency adapts to current system memory; OIIO remains single-flight
// because its frame buffers are large.
export const MEDIA_DECODE_CONCURRENCY = workerMediaDecodeConcurrency();
export const MEDIA_INTERACTIVE_DECODE_CONCURRENCY = workerMediaInteractiveDecodeConcurrency();
// Background image work remains limited to the original two slots. Two extra
// process-wide Sharp slots are available only to the interactive image lane;
// the native gate keeps background + interactive work at most the interactive
// cap even when more than one library is open.
export const sharpNativeDecoderSemaphore = new AsyncSemaphore(MEDIA_INTERACTIVE_DECODE_CONCURRENCY);
export const sharpDecoderSemaphore = new AsyncSemaphore(MEDIA_DECODE_CONCURRENCY);
export const interactiveSharpDecoderSemaphore = new AsyncSemaphore(MEDIA_INTERACTIVE_DECODE_CONCURRENCY);
export const oiioDecoderSemaphore = new AsyncSemaphore(1);

/** True when a visible/viewer Sharp job can start without aborting a running background decode. */
export function hasIdleForegroundImageSlot(): boolean {
  return interactiveSharpDecoderSemaphore.hasIdleCapacity()
    && sharpNativeDecoderSemaphore.hasIdleCapacity();
}

export type MediaDecodeLane = 'background' | 'interactive';

export function runSharpDecoder<T>(
  signal: AbortSignal | undefined,
  lane: MediaDecodeLane | undefined,
  task: () => Promise<T>,
  memory?: Omit<MediaNativeMemoryEstimate, 'decoder'>,
): Promise<T> {
  const laneSemaphore = lane === 'interactive'
    ? interactiveSharpDecoderSemaphore
    : sharpDecoderSemaphore;
  const memoryBytes = estimateMediaNativeMemoryBytes({ decoder: 'sharp', ...memory });
  return mediaNativeMemoryBudget.run(
    signal,
    memoryBytes,
    () => sharpNativeDecoderSemaphore.run(signal, () => laneSemaphore.run(signal, task)),
  );
}
export const MEDIA_QUEUE_LOG = process.env.SERPENT_MEDIA_QUEUE_LOG === '1';
// Serpent-e97c00：摘要命中/重算必须可观测，否则「面板关闭时不再全表扫描」无法作为
// 验收证据。与其它命令级诊断共用同一个开关（benchmark 已默认打开）。
export const JOB_SUMMARY_LOG = process.env.SERPENT_WORKER_CMD_LOG === '1';
// 诊断用开关：置 0 即回到「每次读取都重算」的旧行为，用于同树 A/B 归因（生产不设即启用缓存）。
export const JOB_SUMMARY_CACHE_ENABLED = process.env.SERPENT_JOB_SUMMARY_CACHE !== '0';

export function logMediaJobSummaryEvent(context: Record<string, unknown>): void {
  if (!JOB_SUMMARY_LOG) return;
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    scope: 'media.job-summary',
    ...context,
  }));
}

export function logMediaQueueEvent(
  stage: string,
  context: Record<string, unknown>,
): void {
  if (!MEDIA_QUEUE_LOG) return;
  try {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      scope: 'worker.media-queue',
      // AppLogger keeps the structured `context` object when forwarding Worker
      // stderr and intentionally drops sibling fields. Keep the phase inside
      // that object so queue diagnostics retain their correlation point.
      context: { mediaStage: stage, ...context },
    }));
  } catch {
    // Diagnostic logging must never affect media queue correctness.
  }
}

/**
 * A media wave may claim many jobs while native decoders are completing. Keep
 * the SQLite owner responsive between claims so interactive browse/page
 * messages can enter the Worker instead of waiting behind a microtask chain.
 * The first claim remains immediate; subsequent claims pay one event-loop
 * checkpoint, which is negligible beside real decoding and bounded DB work.
 */
export function yieldBetweenMediaClaims(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

export interface MediaExecutionContext {
  signal?: AbortSignal;
  /** Queue-owned video metadata is a separate durable job. */
  includeVideoMetadata?: boolean;
  /** Queue-owned RAW metadata is a separate low-priority durable job. */
  includeRawMetadata?: boolean;
  /** Visible image cards may use the bounded interactive Sharp lane. */
  lane?: MediaDecodeLane;
  /** Source facts already read during queue admission; avoids a second probe. */
  sourceByteSize?: number | null;
  sourceWidth?: number | null;
  sourceHeight?: number | null;
}

export function throwIfMediaExecutionAborted(signal: AbortSignal | undefined): void {
  if (signal?.aborted) {
    throw signal.reason instanceof Error ? signal.reason : new Error('Media operation aborted.');
  }
}

export async function waitForSharedMediaOperation(
  entry: {
    controller: AbortController;
    promise: Promise<boolean>;
    waiters: number;
  },
  signal: AbortSignal | undefined,
): Promise<boolean> {
  entry.waiters += 1;
  try {
    if (!signal) return await entry.promise;
    if (signal.aborted) {
      throw signal.reason instanceof Error ? signal.reason : new Error('Media operation aborted.');
    }
    return await new Promise<boolean>((resolve, reject) => {
      const onAbort = (): void => {
        cleanup();
        reject(signal.reason instanceof Error ? signal.reason : new Error('Media operation aborted.'));
      };
      const cleanup = (): void => signal.removeEventListener('abort', onAbort);
      signal.addEventListener('abort', onAbort, { once: true });
      entry.promise.then(
        (value) => {
          cleanup();
          resolve(value);
        },
        (error) => {
          cleanup();
          reject(error);
        },
      );
    });
  } finally {
    entry.waiters -= 1;
    if (entry.waiters === 0 && !entry.controller.signal.aborted) {
      entry.controller.abort(new Error('All media operation waiters cancelled.'));
    }
  }
}

/**
 * Slice E (Serpent-hnmg): offscreen model-thumbnail renderer contract. The
 * Worker stays the queue/artifact owner; Main (via worker/index.ts) performs
 * the GPU render. `errorCode` may carry a MODEL_* code (render failure) or an
 * FBX_* code (conversion failure that preceded the render) — both are
 * benign-suppressed for the card (thumbnail-support.ts).
 */
export type ModelThumbnailRenderOutcome =
  | {
      status: 'ok';
      pngBytes: Uint8Array;
      width: number;
      height: number;
    }
  | {
      status: 'ok';
      frames: Array<{
        view: [number, number, number];
        pngBytes: Uint8Array;
        width: number;
        height: number;
      }>;
    }
  | {
      status: 'failed';
      errorCode: string;
      reason?: string;
    };

export interface ModelThumbnailRendererInput {
  libraryId: string;
  assetId: string;
  revisionId: string;
  relativeFilePath: string;
  byteSize: number | null;
  signal: AbortSignal;
  /** Multi-view render (AI four views) — omitted for the single thumbnail. */
  views?: ReadonlyArray<readonly [number, number, number]>;
}

export type ModelThumbnailRenderer = (
  input: ModelThumbnailRendererInput,
) => Promise<ModelThumbnailRenderOutcome>;

export interface LibraryServiceOptions {
  /** User-scoped local cache root for remote-library metadata snapshots. */
  networkMetadataCacheDirectory?: string;
  /** Test/diagnostic seam; events never contain absolute library/cache paths. */
  onNetworkMetadataCacheEvent?: (event: NetworkMetadataCacheEvent) => void;
  /** Test-only seam for proving stale-snapshot behavior when source state is unavailable. */
  networkMetadataSourceStateForTests?: (input: {
    libraryId: string;
    sourceDatabasePath: string;
  }) => NetworkMetadataSourceState | undefined;
  /** Test-only seam for injecting a concurrent writer during SQLite backup. */
  onNetworkMetadataSnapshotProgress?: (progress: NetworkMetadataSnapshotProgress) => void;
  /** Worker-owned SQLite backup for the independent semantic sidecar. */
  backupSemanticIndex?: (input: {
    libraryId: string;
    libraryPath: string;
    storageKind: LibraryStorageKind;
    destinationPath: string;
  }) => Promise<boolean>;
  afterSourceSnapshotCopy?: (sourcePath: string) => void;
  assetLstat?: (assetPath: string) => Stats;
  /** Test-only seams for classifying linked-root access failures on open. */
  linkedRootLstat?: (absoluteRootPath: string) => Stats | BigIntStats;
  linkedRootAccess?: (absoluteRootPath: string) => void;
  /** Test-only async fingerprint seam for proving file I/O stays outside DB transactions. */
  contentFingerprintAsync?: (assetPath: string, signal?: AbortSignal) => Promise<string>;
  beforeSourceSnapshotOpen?: (sourcePath: string) => void;
  debounceMs?: number;
  /**
   * Watcher-only settling window. A changed or newly-created file must report
   * the same size/mtime after this interval before it is committed. Zero is
   * useful for deterministic tests; production defaults to a short window so
   * a copy-in-progress does not become a partial revision.
   */
  watcherStableFileWindowMs?: number;
  /**
   * Low-frequency scan cadence for libraries whose root is on a network
   * filesystem. Native fs.watch is not a reliable cross-machine change
   * source there; zero disables the periodic scan for deterministic tests.
   */
  networkScanIntervalMs?: number;
  /** Test-only storage classification seam for deterministic NAS scan tests. */
  storageKindOverrideForTests?: LibraryStorageKind;
  /** DNS resolver used to reject non-public URL download targets on every hop. */
  dnsLookup?: DnsLookup;
  /** HTTP(S) transport receives an already validated, pinned address per hop. */
  pinnedHttpTransport?: PinnedHttpTransport;
  destinationLstat?: (destinationPath: string) => Stats;
  /** Test-only seam for an external destination appearing just before apply. */
  beforeImportDestinationApply?: () => void;
  failAt?: ImportFailurePoint | ImportFailurePoint[];
  /** E2E-only hard stop used to leave an operation at a real process boundary. */
  terminateProcessAt?: ImportFailurePoint;
  importClock?: ImportExpiryClock;
  importTtlMs?: number;
  onAssetsChanged?: (event: AssetsChangedEvent) => void;
  onLibraryChanged?: (event: LibraryChangedEvent) => void;
  onDiagnostic?: (diagnostic: LibraryServiceDiagnostic) => void;
  onProgress?: (event: ExportProgressEvent | ImportProgressEvent | DeleteProgressEvent) => void;
  observerFactory?: AssetObserverFactory;
  scheduler?: DebounceScheduler;
  /** Injectable Sharp-compatible decoder for deterministic concurrency tests. */
  sharpFn?: SharpModule;
  /** Injectable raw-pixel decoder used only by local palette extraction. */
  paletteSharpFn?: PaletteSharpModule;
  /** Injectable EXIF/IPTC/XMP parser for RAW Inspector metadata tests. */
  rawImageMetadataParser?: RawImageMetadataParser;
  /**
   * Injectable media capability probe. Production probes ffmpeg+ffprobe or
   * oiiotool before automatically re-queuing component-missing artifacts.
   */
  mediaComponentProbe?: (component: MediaAutoRepairComponent) => boolean;
  /** Injectable spawn for binary subprocesses (ffmpeg/ffprobe/oiiotool). */
  spawnFn?: SpawnFunction;
  /** Test-only system-memory seam for deterministic adaptive FFmpeg concurrency coverage. */
  availablePhysicalMemoryBytesForTests?: () => number | undefined;
  /**
   * 永久删除一个链接资产的源文件。可注入，用于覆盖权限/占用/磁盘错误等路径。
   * 2026-09-15 起链接资产的删除**不再使用系统回收站**。
   */
  removeLinkedSourceFile?: (sourcePath: string) => Promise<void>;
  /** Test-only seam invoked after bounded-write lease acquisition. */
  beforeBoundedWriteTransaction?: (libraryId: string) => void;
  /** Test-only seam invoked immediately before the v23+ migration transaction. */
  beforeSchemaMigrationTransaction?: () => void;
  /** Test-only seam invoked before a batch content replacement backs up a target. */
  beforeContentReplaceBatchBackup?: (input: { assetId: string; libraryId: string }) => void;
  /** Test-only seam invoked after BEGIN IMMEDIATE acquires the migration mutex. */
  afterSchemaMigrationTransactionBegin?: () => void;
  /**
   * Test-only seam invoked after a damaged primary has been quarantined and
   * before Assets rescue creates a replacement database. Used to prove a
   * failed rescue puts the original file back.
   */
  beforeLibraryRescueForTests?: () => void;
  /**
   * Serpent-8ca259: offscreen HTML document thumbnail renderer, injected by
   * the Worker (asks Main to capture the source). When absent, HTML thumbnails
   * stay a benign no-op (generic file icon, never `failed`).
   */
  documentThumbnailRenderer?: (input: {
    libraryId: string;
    assetId: string;
    revisionId: string;
    url: string;
    /** Capture viewport (px); height omitted → the document default. */
    width: number;
    height?: number;
    signal?: AbortSignal;
  }) => Promise<{ png: Uint8Array; width: number; height: number } | null>;
  /** Test-only override for deterministic SQLite writer-contention tests. */
  sqliteBusyTimeoutMsForTests?: number;  /** Test-only clock for the 24-hour database-backup throttle. */
  databaseBackupClock?: { now(): number };
  /**
   * Test-only seam (Serpent-xoaz): receives every SQL statement executed on
   * the open-library connection, used by queue-throughput benchmarks to
   * assert DB write counts (e.g. batched success UPDATEs). Never set in
   * production — it adds a callback per statement.
   */
  onDbStatement?: (sql: string) => void;
  /** Removes one Serpent trash directory; injectable for platform-error tests. */
  removeTrashPath?: (trashPath: string) => void;
  /**
   * Clock for the client-mutation watcher-notification suppression window.
   * Tests that drive the debounce scheduler manually inject a controllable
   * clock; production falls back to Date.now().
   */
  watchNotifyClock?: { now(): number };
}

export interface LibraryServiceDiagnostic {
  context?: Record<string, unknown>;
  error: unknown;
  scope: string;
}

export interface AssetsChangedEvent {
  changedCount: number;
  libraryId: string;
  missingCount: number;
  source?: 'watcher' | 'text-save' | 'content-replace' | 'client' | 'sync';
  type: 'asset.changed';
}

export interface ImportExpiryClock {
  cancel(handle: unknown): void;
  now(): number;
  schedule(callback: () => void, delayMs: number): unknown;
}

export interface AssetRefreshResult {
  /**
   * Serpent-4bdd26: the full recursive asset list is opt-in. Every internal
   * caller (open reconciliation, watcher refresh) only reads the counters,
   * and the eager `listAssets(recursive: true)` re-scan cost ~400ms per
   * refresh on a 20k library — pure waste when nobody consumes the rows.
   */
  assets?: AssetSummary[];
  changedCount: number;
  missingCount: number;
}

/**
 * Serpent-4bdd26 收编 codex/large-library-performance@15f3325c：开库对账的
 * 渐进批次选项。assetIds 限定 stat 范围（空列表 = 仅发现新文件）；
 * discoverSources=false 跳过文件系统枚举。
 */
export interface RefreshManagedAssetsOptions {
  /** Restrict the stat/revision pass; an empty list means discovery only. */
  assetIds?: readonly string[];
  /** Skip filesystem discovery when processing an existing-asset batch. */
  discoverSources?: boolean;
  /** Pre-scanned source entries; used by the cancellable background scanner. */
  discovery?: RefreshManagedAssetsDiscovery;
  /** Avoid materializing all AssetSummary objects for background maintenance. */
  includeAssets?: boolean;
}

export interface AssetObserver {
  close(): void;
}

export interface AssetObserverEvent {
  eventType: 'change' | 'rename';
  filename: string | Buffer | null;
}

export type AssetObserverFactory = (
  assetsPath: string,
  onEvent: (event?: AssetObserverEvent) => void,
  onError: (error: unknown) => void,
) => AssetObserver;

export type LinkedWatcherChanges =
  | { kind: 'files'; pathsByFolder: Map<string, Set<string>> }
  | { kind: 'scope' };

export const MAX_LINKED_WATCHER_CHANGED_FILES = 64;

export interface DebounceScheduler {
  cancel(handle: unknown): void;
  schedule(callback: () => void, delayMs: number): unknown;
}

export interface LibraryWatch {
  observer: AssetObserver;
}

export interface WatchRefreshState {
  dirty: boolean;
  reason: 'watcher' | 'network';
  triggerScope?: string;
  fullRefreshRequested?: boolean;
  linkedFolderIds?: Set<string>;
  linkedChanges?: LinkedWatcherChanges;
  timer?: unknown;
  promise?: Promise<void>;
}

export interface NetworkScanState {
  fingerprint?: string;
  timer?: unknown;
}

export interface LinkedFolderWatch extends LibraryWatch {
  folderId: string;
  libraryId: string;
  rootPath: string;
}

export const DEFAULT_DEBOUNCE_SCHEDULER: DebounceScheduler = {
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
  schedule: (callback, delayMs) => setTimeout(callback, delayMs),
};

export const DEFAULT_IMPORT_EXPIRY_CLOCK: ImportExpiryClock = {
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
  now: () => Date.now(),
  schedule: (callback, delayMs) => {
    const handle = setTimeout(callback, delayMs);
    handle.unref();
    return handle;
  },
};

export const DEFAULT_ASSET_OBSERVER_FACTORY: AssetObserverFactory = (assetsPath, onEvent, onError) => {
  const observer = watch(assetsPath, { recursive: true }, (eventType, filename) => onEvent({
    eventType,
    filename,
  }));
  observer.on('error', onError);
  return observer;
};

/**
 * 永久删除一个链接资产的源文件。
 *
 * 2026-09-15 用户决定：链接资产/文件夹的删除动作就是「强制从硬盘删除」，不再使用
 * 系统回收站。旧实现为每个文件 spawn 一次 `trash` 的本地 helper（实测 126 ms/文件，
 * 1.5 万文件约 31 分钟，并且全程独占 Worker 调度器），既慢又不可在库内恢复。
 */
export async function defaultRemoveLinkedSourceFile(sourcePath: string): Promise<void> {
  await rmAsync(sourcePath, { force: true, maxRetries: 5, retryDelay: 120 });
}

export class SimulatedCrashError extends Error {}

export class StaleMediaRevisionError extends Error {
  readonly code = 'STALE_REVISION';

  constructor(message: string) {
    super(message);
    this.name = 'StaleMediaRevisionError';
  }
}

export function isStaleMediaRevisionError(error: unknown): error is StaleMediaRevisionError {
  return error instanceof StaleMediaRevisionError;
}

export class LibraryServiceError extends Error {
  constructor(
    readonly code: PublicErrorCode,
    options?: {
      cause?: unknown;
      reason?: PublicErrorReason;
      retryable?: boolean;
      currentEntityVersion?: number;
    },
  ) {
    super(code, options);
    this.name = 'LibraryServiceError';
    this.reason = options?.reason ?? publicReasonFromError(options?.cause);
    this.retryable = options?.retryable;
    this.currentEntityVersion = options?.currentEntityVersion;
  }

  readonly reason?: PublicErrorReason;
  readonly retryable?: boolean;
  readonly currentEntityVersion?: number;
}

export function serviceError(error: unknown, fallback: PublicErrorCode): LibraryServiceError {
  if (error instanceof LibraryServiceError) return error;
  if (error instanceof LibraryInputError) return new LibraryServiceError(error.code, { cause: error });
  const classified = classifyUnknownFailure(error);
  if (classified) {
    return new LibraryServiceError(classified.code, {
      cause: error,
      reason: classified.reason,
    });
  }
  return new LibraryServiceError(fallback, { cause: error });
}

export function isMissingPathError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error.code === 'ENOENT' || error.code === 'ENOTDIR')
  );
}

export function normalizeWatcherRelativePath(filename: string | Buffer | null): string | undefined {
  if (filename === null) return undefined;
  const value = Buffer.isBuffer(filename) ? filename.toString('utf8') : filename;
  if (value.length === 0 || value.includes('\0') || value.trim() !== value) return undefined;
  try {
    return normalizeRelativeAssetPath(value);
  } catch {
    // Recursive fs.watch filenames are advisory. Any ambiguous or unsafe
    // value must fall back to the linked-root reconciliation, never widen the
    // targeted path or skip a source that may have changed.
    return undefined;
  }
}

export function sourceIdentityKey(device: string | null | undefined, inode: string | null | undefined): string | undefined {
  if (
    !device
    || !inode
    || device === '0'
    || inode === '0'
    || device === 'undefined'
    || inode === 'undefined'
    || device === 'null'
    || inode === 'null'
  ) return undefined;
  return `${device}\u0000${inode}`;
}

export const DISK_DELETE_RETRY_LIMIT = 12;
export const DISK_DELETE_RETRY_DELAY_MS = 125;

export function isRetryableDiskDeleteError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return false;
  }
  return error.code === 'EBUSY' || error.code === 'EPERM' || error.code === 'EACCES';
}

/**
 * Windows keeps delete-pending files unavailable until the last decoder or
 * Chromium stream closes.  `fs.rm`'s built-in retry is only applied to
 * recursive removals, so asset-file deletes need an asynchronous retry loop
 * of their own.  Waiting asynchronously lets abort handlers and stream close
 * events actually run between attempts.
 */
export async function removePathWithRetry(
  targetPath: string,
  recursive: boolean,
): Promise<void> {
  for (let attempt = 0; ; attempt += 1) {
    try {
      await rmAsync(targetPath, { force: true, recursive, maxRetries: 0 });
      return;
    } catch (error) {
      if (!isRetryableDiskDeleteError(error) || attempt >= DISK_DELETE_RETRY_LIMIT) {
        throw error;
      }
      await new Promise<void>((resolve) => {
        setTimeout(resolve, DISK_DELETE_RETRY_DELAY_MS * (attempt + 1));
      });
    }
  }
}

export const FS_NAME_COMPONENT_LIMIT = 255;

/**
 * NTFS caps each path component at 255 UTF-16 code units (JS string length);
 * POSIX filesystems cap it at 255 bytes. Past the limit every create/rename
 * fails — POSIX with ENAMETOOLONG, Windows with ENOENT
 * (ERROR_FILENAME_EXCED_RANGE), which would otherwise be misreported as
 * SOURCE_NOT_FOUND. Validate deterministically before placement so both
 * platforms surface the same PATH_LIMIT_EXCEEDED reason.
 */
export function assertNameWithinFsLimit(relativePath: string): void {
  for (const component of relativePath.split('/')) {
    if (
      component.length > FS_NAME_COMPONENT_LIMIT ||
      Buffer.byteLength(component, 'utf8') > FS_NAME_COMPONENT_LIMIT
    ) {
      throw new LibraryServiceError('IMPORT_APPLY_FAILED', { reason: 'PATH_LIMIT_EXCEEDED' });
    }
  }
}

/**
 * Existence probes in availability reconciliation must also accept EPERM as
 * "not there" on Windows: a tree in delete-pending state (removed while a
 * handle is still open) answers lstat/readdir with EPERM
 * (STATUS_DELETE_PENDING) until the last handle closes, whereas POSIX
 * reports ENOENT. Genuine permission/IO failures surface as EACCES/EIO and
 * must keep propagating instead of silently flipping availability, so the
 * tolerance is EPERM-only and win32-only.
 */
export function isUnreadablePathError(error: unknown): boolean {
  return (
    isMissingPathError(error) ||
    (process.platform === 'win32' &&
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'EPERM')
  );
}

export function hasErrorCode(error: unknown, code: string): boolean {
  let current = error;
  const visited = new Set<unknown>();
  while (typeof current === 'object' && current !== null && !visited.has(current)) {
    visited.add(current);
    if ('code' in current && current.code === code) return true;
    current = 'cause' in current ? current.cause : undefined;
  }
  return false;
}

export function copyNameCandidates(fileName: string, index: number): string[] {
  const extension = path.posix.extname(fileName);
  const baseName = extension.length === 0 ? fileName : fileName.slice(0, -extension.length);
  const graphemes = [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(baseName)]
    .map((part) => part.segment);
  const suffix = ` (${index})`;
  const candidates = [copyNameForIndex(fileName, index)];
  for (let length = graphemes.length - 1; length >= 0; length -= 1) {
    candidates.push(`${graphemes.slice(0, length).join('')}${suffix}${extension}`);
  }
  return [...new Set(candidates)];
}

export function directoryExists(directoryPath: string): boolean {
  try {
    return statSync(directoryPath).isDirectory();
  } catch {
    return false;
  }
}

export function realDirectoryExists(directoryPath: string): boolean {
  try {
    const entry = lstatSync(directoryPath);
    return entry.isDirectory() && !entry.isSymbolicLink();
  } catch {
    return false;
  }
}

export function realFileExists(filePath: string): boolean {
  try {
    const entry = lstatSync(filePath);
    return entry.isFile() && !entry.isSymbolicLink();
  } catch {
    return false;
  }
}

export function copyFileExclusive(sourcePath: string, destinationPath: string): void {
  // Windows CopyFile does not clone; trying COPYFILE_FICLONE first just fails
  // and retries. APFS/XFS can clone, so keep the fallback there.
  const cloneFlag = process.platform === 'win32' || typeof constants.COPYFILE_FICLONE !== 'number'
    ? 0
    : constants.COPYFILE_FICLONE;
  if (cloneFlag === 0) {
    copyFileSync(sourcePath, destinationPath, constants.COPYFILE_EXCL);
    return;
  }
  try {
    copyFileSync(sourcePath, destinationPath, constants.COPYFILE_EXCL | cloneFlag);
  } catch {
    copyFileSync(sourcePath, destinationPath, constants.COPYFILE_EXCL);
  }
}

export interface TransferCancelState {
  cancelled: boolean;
  /** abandon = roll back this import; stop = keep files already staged. */
  mode?: 'abandon' | 'stop';
  onCancel?: () => void;
  /** Keep maintenance snapshots inside the same small event-loop slice budget. */
  backupPageBatch?: number;
}

export interface ActiveImportTransfer {
  importId: string;
  sourceKey: string;
  destinationKey: string;
}

/**
 * Give the UtilityProcess message loop a chance to receive a cancellation
 * command. Transfer code uses this at file/entry boundaries, matching the
 * cancellation granularity promised by the protocol.
 *
 * Use a zero-delay timer, not setImmediate: setImmediate can keep running in
 * the same check phase and starve parentPort messages (the same reason
 * navigationCheckpoint uses setTimeout).
 *
 * On Windows the timer floor is about 15ms. Yielding once per file therefore
 * turns a 20,000-file transfer into more than ten minutes of waits. Yield
 * the timer only after a short slice of real work so Worker IPC still runs,
 * without paying that floor on every entry.
 */
export const transferYieldSliceMs = 50;
export let nextTransferYieldAt = 0;

export function transferCheckpoint(): Promise<void> {
  const now = Date.now();
  // Inside a slice, still yield one macrotask with setImmediate (no timer
  // floor) so in-process cancel requests run between files.
  if (now < nextTransferYieldAt) return new Promise((resolve) => setImmediate(resolve));
  nextTransferYieldAt = now + transferYieldSliceMs;
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export function createProgressThrottle(minIntervalMs = 250): {
  shouldEmit(force?: boolean): boolean;
} {
  let lastAt = 0;
  return {
    shouldEmit(force = false) {
      const now = Date.now();
      if (!force && now - lastAt < minIntervalMs) return false;
      lastAt = now;
      return true;
    },
  };
}

/**
 * Unlike file-transfer checkpoints, navigation hydration must let the
 * UtilityProcess message-poll phase run before starting its next synchronous
 * SQLite slice. A zero-delay timer moves the continuation to the next event
 * loop turn; setImmediate can continue in the same check phase and starve a
 * browse/page message that arrived while the sidebar pass was yielding.
 */
export function navigationCheckpoint(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * Resolves once the stream's 'close' event fires. Destroying a stream only
 * schedules the file-descriptor release; on Windows the file stays locked
 * (and undeletable) until 'close', unlike POSIX where unlinking an open file
 * is allowed. Await this before deleting a stream's target on any platform.
 */
export function waitForStreamClose(stream: {
  readonly closed: boolean;
  once(event: string, listener: () => void): unknown;
}): Promise<void> {
  if (stream.closed) return Promise.resolve();
  return new Promise((resolve) => {
    stream.once('close', () => resolve());
    stream.once('error', () => resolve());
  });
}

export function readLibraryTreeChildren(directoryPath: string): Dirent[] {
  let children;
  try {
    children = readdirSync(directoryPath, { withFileTypes: true });
  } catch (error) {
    throw new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
  }
  for (const child of children) {
    if (child.isSymbolicLink()) {
      throw new LibraryServiceError('NOT_A_LIBRARY', { reason: 'SYMBOLIC_LINK_NOT_ALLOWED' });
    }
  }
  return children;
}

export async function copyDirRecursiveCancellable(
  sourcePath: string,
  destPath: string,
  cancelState: TransferCancelState,
  onFileCopied?: (byteSize: number) => void,
): Promise<void> {
  mkdirSync(destPath, { recursive: true });
  const children = readLibraryTreeChildren(sourcePath);
  for (const child of children) {
    await transferCheckpoint();
    if (cancelState.cancelled) return;
    const childSource = path.join(sourcePath, child.name);
    const childDest = path.join(destPath, child.name);
    if (child.isDirectory()) {
      await copyDirRecursiveCancellable(childSource, childDest, cancelState, onFileCopied);
    } else if (child.isFile()) {
      copyFileSync(childSource, childDest);
      // Keep the source mtime across a library copy. The first open compares
      // this value with the revision recorded in library.db; preserving it
      // avoids treating every copied asset as externally edited while still
      // allowing a genuinely changed source file to be reconciled normally.
      const sourceStat = statSync(childSource);
      utimesSync(childDest, sourceStat.atime, sourceStat.mtime);
      onFileCopied?.(sourceStat.size);
    }
  }
}

export function measureCopyTree(sourcePath: string): { fileCount: number; totalBytes: number } {
  let fileCount = 0;
  let totalBytes = 0;
  const visit = (directoryPath: string): void => {
    for (const child of readLibraryTreeChildren(directoryPath)) {
      const childPath = path.join(directoryPath, child.name);
      if (child.isDirectory()) {
        visit(childPath);
      } else if (child.isFile()) {
        fileCount += 1;
        totalBytes += statSync(childPath).size;
      }
    }
  };
  visit(sourcePath);
  return { fileCount, totalBytes };
}

export function assertTreeContainsNoSymlinks(rootPath: string): void {
  const visit = (directoryPath: string): void => {
    let children;
    try {
      children = readdirSync(directoryPath, { withFileTypes: true });
    } catch (error) {
      throw new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
    }
    for (const child of children) {
      const childPath = path.join(directoryPath, child.name);
      let entry;
      try {
        entry = lstatSync(childPath);
      } catch (error) {
        throw new LibraryServiceError('NOT_A_LIBRARY', { cause: error });
      }
      if (entry.isSymbolicLink()) {
        throw new LibraryServiceError('NOT_A_LIBRARY', {
          reason: 'SYMBOLIC_LINK_NOT_ALLOWED',
        });
      }
      if (entry.isDirectory()) visit(childPath);
    }
  };
  visit(rootPath);
}

export function sourceSnapshot(stat: BigIntStats): SourceSnapshot {
  return {
    ctimeNs: stat.ctimeNs,
    dev: stat.dev,
    ino: stat.ino,
    mtimeNs: stat.mtimeNs,
    size: stat.size,
  };
}

/**
 * A numeric filesystem device id is only meaningful on one host. Include the
 * host and root inode identity in the persisted hint so a same-path mount on
 * another computer, or a replaced root on the same volume, cannot silently
 * pass the NAS safety check. Numeric hints from older libraries remain
 * accepted as a backwards-compatible fallback.
 */
export function sourceHostDeviceHint(device: number | bigint | string): string {
  return `v2:${createHash('sha256')
    .update(`${hostname()}\u0000${String(device)}`, 'utf8')
    .digest('hex')}`;
}

export function sourceDeviceHint(
  device: number | bigint | string,
  inode: number | bigint | string = 'unknown',
  birthNs: bigint | null = null,
): string {
  // v3 binds directory birth time as well as device/inode. On ext4 and tmpfs,
  // rm+mkdir at the same path can reuse the inode number; birth time still
  // changes, while adding or removing children does not. v2 stays the legacy
  // inode hint for libraries linked before birth time was recorded.
  if (birthNs !== null && birthNs > 0n) {
    return `v3:${createHash('sha256')
      .update(
        `${hostname()}\u0000${String(device)}\u0000${String(inode)}\u0000${birthNs.toString()}`,
        'utf8',
      )
      .digest('hex')}`;
  }
  return `v2:${createHash('sha256')
    .update(`${hostname()}\u0000${String(device)}\u0000${String(inode)}`, 'utf8')
    .digest('hex')}`;
}

export function directoryBirthNs(stat: Stats | BigIntStats): bigint | null {
  // Nanosecond birth time exists only on the bigint stat. Number stats omit it,
  // and a zero birth time (procfs, some network mounts) is not an identity.
  if (!('birthtimeNs' in stat)) return null;
  const raw = stat.birthtimeNs;
  if (typeof raw === 'bigint') return raw > 0n ? raw : null;
  if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) {
    return BigInt(Math.trunc(raw));
  }
  return null;
}

export function sameSourceSnapshot(left: SourceSnapshot, right: SourceSnapshot): boolean {
  return (
    left.dev === right.dev &&
    left.ino === right.ino &&
    left.size === right.size &&
    left.mtimeNs === right.mtimeNs &&
    left.ctimeNs === right.ctimeNs
  );
}

export function sha256DescriptorSync(descriptor: number): string {
  const hash = createHash('sha256');
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  let position = 0;
  for (;;) {
    const bytesRead = readSync(descriptor, buffer, 0, buffer.length, position);
    if (bytesRead === 0) break;
    hash.update(buffer.subarray(0, bytesRead));
    position += bytesRead;
  }
  return hash.digest('hex');
}

export function sha256FileAtPath(filePath: string): string {
  const flags = constants.O_RDONLY | (process.platform === 'win32' ? 0 : constants.O_NOFOLLOW);
  const descriptor = openSync(filePath, flags);
  try {
    return sha256DescriptorSync(descriptor);
  } finally {
    closeSync(descriptor);
  }
}

/**
 * Import staging already reads every byte once for duplicate detection. Keep
 * the recovery fingerprint in that same pass instead of adding another full
 * read per asset to large-library imports.
 */
export function sha256AndContentFingerprintFileAtPath(filePath: string): {
  sha256: string;
  contentFingerprint: string;
} {
  const flags = constants.O_RDONLY | (process.platform === 'win32' ? 0 : constants.O_NOFOLLOW);
  const descriptor = openSync(filePath, flags);
  const sha256 = createHash('sha256');
  const contentFingerprint = createHash('sha1');
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  let position = 0;
  try {
    for (;;) {
      const bytesRead = readSync(descriptor, buffer, 0, buffer.length, position);
      if (bytesRead === 0) break;
      const chunk = buffer.subarray(0, bytesRead);
      sha256.update(chunk);
      contentFingerprint.update(chunk);
      position += bytesRead;
    }
  } finally {
    closeSync(descriptor);
  }
  return {
    sha256: sha256.digest('hex'),
    contentFingerprint: contentFingerprint.digest('hex'),
  };
}

export function sourceChanged(cause?: unknown): LibraryServiceError {
  return new LibraryServiceError('INVALID_IMPORT_SOURCE', {
    cause,
    reason: 'SOURCE_CHANGED',
  });
}

export function unsupportedSourceEntry(reason: PublicErrorReason, cause?: unknown): LibraryServiceError {
  return new LibraryServiceError('INVALID_IMPORT_SOURCE', { cause, reason });
}

export function databasePath(libraryPath: string): string {
  return path.join(libraryPath, '.serpent', 'library.db');
}

export function databaseBackupPath(libraryPath: string, slot: 1 | 2): string {
  return path.join(
    libraryPath,
    '.serpent',
    DATABASE_BACKUP_DIRECTORY,
    `library.db.${slot}`,
  );
}

export function databaseBackupTemporaryPath(libraryPath: string): string {
  return path.join(
    libraryPath,
    '.serpent',
    DATABASE_BACKUP_DIRECTORY,
    `.library.db.${randomUUID()}.tmp`,
  );
}

export function gitignorePath(libraryPath: string): string {
  return path.join(libraryPath, '.serpentignore');
}

export function legacyGitignorePath(libraryPath: string): string {
  return path.join(libraryPath, '.gitignore');
}

export function existingIgnoreConfigPath(libraryPath: string): string | null {
  const currentPath = gitignorePath(libraryPath);
  if (realFileExists(currentPath)) return currentPath;
  const legacyPath = legacyGitignorePath(libraryPath);
  return realFileExists(legacyPath) ? legacyPath : null;
}

export function readGitignoreText(libraryPath: string): string {
  const currentPath = gitignorePath(libraryPath);
  try {
    return readFileSync(currentPath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: error });
    }
    try {
      return readFileSync(legacyGitignorePath(libraryPath), 'utf8');
    } catch (legacyError) {
      if ((legacyError as NodeJS.ErrnoException).code === 'ENOENT') return '';
      throw new LibraryServiceError('LIBRARY_NOT_WRITABLE', { cause: legacyError });
    }
  }
}

export function isSqliteIoError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error &&
    typeof error.code === 'string' && error.code.startsWith('SQLITE_IOERR');
}

export function openConfiguredDatabase(
  filename: string,
  busyTimeoutMs = 5_000,
  options: {
    readonly?: boolean;
    /** Test seam; production classifies the database path before opening it. */
    storageKind?: LibraryStorageKind;
    /**
     * Test-only seam (Serpent-xoaz): per-statement trace used to assert DB
     * write counts in queue-throughput benchmarks. better-sqlite3's `verbose`
     * callback receives the SQL of every executed statement on this
     * connection; production callers never pass it.
     */
    trace?: (sql: string) => void;
  } = {},
): DatabaseConnection {
  if (!Number.isSafeInteger(busyTimeoutMs) || busyTimeoutMs < 0 || busyTimeoutMs > 60_000) {
    throw new Error('SQLite busy timeout must be an integer between 0 and 60000 milliseconds.');
  }
  // Serpent-033e: schemaVersionProbe and backup validation open a SQLite
  // read-only connection so those checks cannot mutate the file. Desktop
  // never uses this flag for a user-facing library handle. journal_mode /
  // synchronous are write PRAGMAs and must be skipped here.
  const storageKind = options.readonly
    ? 'unknown'
    : (options.storageKind ?? classifyLibraryStorage(filename));
  let connection: DatabaseConnection | undefined;
  try {
    connection = options.readonly
      ? new Database(filename, { readonly: true, ...(options.trace ? { verbose: options.trace } : {}) })
      : new Database(filename, options.trace ? { verbose: options.trace } : {});
    connection.pragma('foreign_keys = ON');
    connection.pragma('trusted_schema = ON');
    // A second Serpent process may be finishing a short SQLite transaction
    // while the durable lease is being acquired. Let SQLite wait briefly for
    // that kernel-level lock instead of turning normal contention into an
    // opaque SQLITE_BUSY/INTERNAL_ERROR before our public LIBRARY_BUSY path.
    connection.pragma(`busy_timeout = ${busyTimeoutMs}`);
    if (options.readonly) {
      if (
        connection.pragma('foreign_keys', { simple: true }) !== 1 ||
        connection.pragma('busy_timeout', { simple: true }) !== busyTimeoutMs
      ) {
        throw new Error('Required SQLite safety pragmas could not be enabled.');
      }
      return connection;
    }
    // SQLite WAL relies on -wal/-shm sidecars and shared-memory locking. NAS
    // implementations vary in how faithfully SMB/NFS emulate those
    // semantics, while rollback journaling only needs ordinary file locks.
    // Keep confirmed local/removable volumes on WAL; confirmed network and
    // unknown volumes use the safer, slower rollback journal required by
    // ADR-0014/0019.
    const expectedJournalMode = storageKind === 'local' ? 'wal' : 'delete';
    const journalMode = connection.pragma(
      `journal_mode = ${storageKind === 'local' ? 'WAL' : 'DELETE'}`,
      { simple: true },
    );
    connection.pragma('synchronous = FULL');
    // Serpent-4bdd26: a 20k-asset library database is ~60MB; the SQLite
    // default page cache (~2MB) cannot hold its hot indexes, so every cold
    // browse re-reads index pages over the network (measured ~0.9s per COUNT
    // on gigabit SMB vs <10ms warm). A 64MB cache is read-only working set —
    // it does not change durability semantics, and local libraries benefit
    // the same way once their databases outgrow the default.
    connection.pragma('cache_size = -65536');
    if (
      journalMode !== expectedJournalMode ||
      connection.pragma('foreign_keys', { simple: true }) !== 1 ||
      connection.pragma('synchronous', { simple: true }) !== 2 ||
      connection.pragma('busy_timeout', { simple: true }) !== busyTimeoutMs
    ) {
      throw new Error('Required SQLite safety pragmas could not be enabled.');
    }
    return connection;
  } catch (error) {
    closeIgnoringFailure(connection);
    if (storageKind === 'network' && isSqliteIoError(error)) {
      throw new LibraryServiceError('LIBRARY_NETWORK_SHARE', { cause: error });
    }
    throw error;
  }
}

export function createDirectoryLayout(libraryPath: string): void {
  mkdirSync(path.join(libraryPath, 'Assets'));
  const serpentPath = path.join(libraryPath, '.serpent');
  mkdirSync(serpentPath);
  for (const directoryName of REGENERABLE_DIRECTORIES) {
    mkdirSync(path.join(serpentPath, directoryName));
  }
}

export function schemaVersion(connection: DatabaseConnection): number {
  const version = connection.pragma('user_version', { simple: true });
  if (typeof version !== 'number' || !Number.isSafeInteger(version) || version < 0) {
    throw new LibraryServiceError('LIBRARY_CORRUPT');
  }
  return version;
}

/**
 * Serpent-033e/verg.5: probe the library's schema version without running
 * any migration or WAL pragma. Returns the version number, or null when the
 * file cannot be probed (the normal open path reports real errors itself).
 */
export function schemaVersionProbe(filename: string): number | null {
  let connection: DatabaseConnection | undefined;
  try {
    connection = openConfiguredDatabase(filename, 5_000, { readonly: true });
    return schemaVersion(connection);
  } catch {
    return null;
  } finally {
    if (connection) closeIgnoringFailure(connection);
  }
}

export function verifyMigrationHistory(connection: DatabaseConnection, version: number): void {
  try {
    const migrations = connection
      .prepare('SELECT version, checksum FROM schema_migrations ORDER BY version')
      .all() as MigrationRow[];
    const expected = MIGRATIONS.slice(0, version);
    if (
      migrations.length !== expected.length ||
      expected.some(
        (migration, index) =>
          migrations[index]?.version !== migration.version ||
          migrations[index]?.checksum !== migration.checksum,
      )
    ) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
  } catch (error) {
    // A missing history table is structural database damage, not a transient
    // migration failure. Preserve the corruption classification so the open
    // recovery ladder can try verified backups before Assets rescue.
    if (error instanceof LibraryServiceError) throw error;
    throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
  }
}

export function hasSchemaObject(connection: DatabaseConnection, name: string): boolean {
  return connection.prepare(
    "SELECT 1 AS present FROM sqlite_master WHERE name = ? LIMIT 1",
  ).get(name) !== undefined;
}

/**
 * The scripting/plugin branch used v24-v28 for plugin runtime tables before
 * the ingestion branch claimed v24-v26 for ignore rules. Libraries created by
 * that branch are valid and contain the complete plugin schema, but their
 * history cannot be checked against the merged linear sequence. Recognize
 * that exact old history so it can be normalized once without weakening the
 * normal checksum validation for any other database.
 */
export function hasLegacyPluginMigrationHistory(
  connection: DatabaseConnection,
  version: number,
): boolean {
  if (version !== 28) return false;
  if (!hasSchemaObject(connection, 'schema_migrations')) return false;
  const history = connection
    .prepare('SELECT version, checksum FROM schema_migrations WHERE version >= 24 ORDER BY version')
    .all() as MigrationRow[];
  const legacyChecksums = [
    WRITE_COORDINATION_SCHEMA_CHECKSUM,
    JOB_LEASE_SCHEMA_CHECKSUM,
    THUMBNAIL_QUEUE_INDEX_SCHEMA_CHECKSUM,
    PLUGIN_BACKGROUND_JOBS_SCHEMA_CHECKSUM,
    PLUGIN_DERIVED_FIELDS_SCHEMA_CHECKSUM,
  ];
  return (
    history.length === legacyChecksums.length &&
    history.every((row, index) =>
      row.version === 24 + index && row.checksum === legacyChecksums[index],
    ) &&
    hasSchemaObject(connection, 'library_write_leases') &&
    hasSchemaObject(connection, 'library_job_leases') &&
    hasSchemaObject(connection, 'plugin_derived_fields') &&
    !hasSchemaObject(connection, 'explicit_ignored_paths') &&
    !hasSchemaObject(connection, 'gitignore_ignored_paths')
  );
}

/**
 * Normalize the old plugin-first history into the current canonical history.
 * The plugin tables already exist under their old migrations, so apply the
 * three ingestion schemas and the v32 Plugin Job schema before applying the
 * canonical v33-v36 schemas that the old branch never had. Only after every
 * missing object exists may the history rows be rewritten to canonical
 * checksums. The caller already owns the migration transaction for v23+
 * databases.
 */
export function migrateLegacyPluginMigrationHistory(connection: DatabaseConnection): void {
  connection.exec(EXPLICIT_IGNORES_SCHEMA_SQL);
  connection.exec(EXTENSION_IGNORES_SCHEMA_SQL);
  connection.exec(GITIGNORE_SCHEMA_SQL);
  connection.exec(PLUGIN_JOB_INTERRUPTED_SCHEMA_SQL);
  // The legacy branch stopped at its plugin-derived-fields v28. It therefore
  // has neither model artifacts, content fingerprints, operation history nor
  // the durable redo stack. Reuse the canonical migration bodies here instead
  // of only rewriting schema_migrations (which would make the DB claim
  // v36 while still physically missing these tables, columns and indexes).
  const revisionArtifactsSql = connection
    .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'revision_artifacts'")
    .get() as { sql?: string } | undefined;
  if (!revisionArtifactsSql?.sql?.includes("'model_glb'")) {
    connection.exec(MODEL_ARTIFACT_KIND_SCHEMA_SQL);
  }
  const currentRevisionArtifactsSql = connection
    .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'revision_artifacts'")
    .get() as { sql?: string } | undefined;
  if (!currentRevisionArtifactsSql?.sql?.includes("'viewer_image'")) {
    connection.exec(RAW_VIEWER_ARTIFACT_SCHEMA_SQL);
  }
  const identityRevisionArtifactsSql = connection
    .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'revision_artifacts'")
    .get() as { sql?: string } | undefined;
  if (!identityRevisionArtifactsSql?.sql?.includes('artifact_key')) {
    connection.exec(ARTIFACT_IDENTITY_SCHEMA_SQL);
  }
  ensureContentFingerprintColumn(connection);
  ensureLinkedFolderParentSchema(connection);
  const historyObjects = [
    'operation_history',
    'operation_history_steps',
    'operation_history_attempts',
    'library_change_on_operation_history_insert',
    'library_change_on_operation_history_update',
    'library_change_on_operation_history_delete',
  ];
  if (!historyObjects.every((name) => hasSchemaObject(connection, name))) {
    if (hasSchemaObject(connection, 'operation_history')
      || hasSchemaObject(connection, 'operation_history_steps')
      || hasSchemaObject(connection, 'operation_history_attempts')) {
      throw new Error('The legacy library contains an incomplete operation history schema.');
    }
    connection.exec(OPERATION_HISTORY_SCHEMA_SQL);
  }
  if (!columnsFor(connection, 'operation_history').has('redo_sequence')) {
    connection.exec(OPERATION_HISTORY_REDO_STACK_SCHEMA_SQL);
  }
  connection.prepare('DELETE FROM schema_migrations WHERE version >= 24').run();
  const insert = connection.prepare(
    'INSERT INTO schema_migrations (version, checksum, applied_at) VALUES (?, ?, ?)',
  );
  for (const migration of MIGRATIONS.slice(23)) {
    insert.run(migration.version, migration.checksum, new Date().toISOString());
  }
  connection.pragma(`user_version = ${SUPPORTED_SCHEMA_VERSION}`);
}

export function hasCanonicalMigrationHistoryThrough(
  connection: DatabaseConnection,
  throughVersion: number,
): boolean {
  if (!hasSchemaObject(connection, 'schema_migrations')) return false;
  const migrations = connection
    .prepare(
      'SELECT version, checksum FROM schema_migrations WHERE version <= ? ORDER BY version',
    )
    .all(throughVersion) as MigrationRow[];
  const expected = MIGRATIONS.slice(0, throughVersion);
  return (
    migrations.length === expected.length &&
    expected.every(
      (migration, index) =>
        migrations[index]?.version === migration.version &&
        migrations[index]?.checksum === migration.checksum,
    )
  );
}

/**
 * The WebDAV sync line registered SYNC_SCHEMA as v37 before the merge that
 * assigned AUTO_ANALYSIS_SUPPRESSION to v37 and SYNC to v38. Real libraries
 * opened on that fork (e.g. an image test library) contain both physical schemas but
 * carry swapped checksums. Recognize only that exact history so a healthy
 * database is not sent down the damage-recovery ladder as LIBRARY_CORRUPT.
 */
export function hasForkedSyncAutoAnalysisMigrationHistory(
  connection: DatabaseConnection,
  version: number,
): boolean {
  if (version !== 37 && version !== 38) return false;
  if (!hasSchemaObject(connection, 'schema_migrations')) return false;
  if (!hasCanonicalMigrationHistoryThrough(connection, 36)) return false;
  if (!columnsFor(connection, 'assets').has('sync_id')) return false;
  if (!hasSchemaObject(connection, 'sync_manifest_cache')) return false;

  const v37 = connection
    .prepare('SELECT checksum FROM schema_migrations WHERE version = 37')
    .get() as { checksum: string } | undefined;
  if (v37?.checksum !== SYNC_SCHEMA_CHECKSUM) return false;

  const v38 = connection
    .prepare('SELECT checksum FROM schema_migrations WHERE version = 38')
    .get() as { checksum: string } | undefined;

  if (version === 37) return v38 === undefined;

  return (
    v38?.checksum === AUTO_ANALYSIS_SUPPRESSION_SCHEMA_CHECKSUM &&
    hasSchemaObject(connection, 'asset_auto_analysis_suppression')
  );
}

/**
 * Canonicalize the sync-first v37/v38 fork without changing tables. Both
 * schemas are additive; once the objects exist, only schema_migrations (and
 * user_version when the fork stopped at v37) needs rewriting. The caller
 * already owns the v23+ migration transaction.
 */
export function migrateForkedSyncAutoAnalysisMigrationHistory(
  connection: DatabaseConnection,
): void {
  if (!hasSchemaObject(connection, 'asset_auto_analysis_suppression')) {
    connection.exec(AUTO_ANALYSIS_SUPPRESSION_SCHEMA_SQL);
  }
  ensureSyncSchema(connection);
  connection
    .prepare('UPDATE schema_migrations SET checksum = ? WHERE version = 37')
    .run(AUTO_ANALYSIS_SUPPRESSION_SCHEMA_CHECKSUM);
  const hasV38 = connection
    .prepare('SELECT 1 AS present FROM schema_migrations WHERE version = 38 LIMIT 1')
    .get() !== undefined;
  if (hasV38) {
    connection
      .prepare('UPDATE schema_migrations SET checksum = ? WHERE version = 38')
      .run(SYNC_SCHEMA_CHECKSUM);
  } else {
    connection
      .prepare(
        'INSERT INTO schema_migrations (version, checksum, applied_at) VALUES (?, ?, ?)',
      )
      .run(38, SYNC_SCHEMA_CHECKSUM, new Date().toISOString());
  }
  if (schemaVersion(connection) < 38) {
    connection.pragma('user_version = 38');
  }
}

/**
 * Migration v20 helper: ADD COLUMN is not idempotent under simulated
 * downgrade fixtures that leave the column in place. Apply only if missing;
 * checksum still records the canonical SQL text.
 */
export function ensureTrashTombstoneAssetBindSchema(
  connection: DatabaseConnection,
): void {
  const columns = connection.pragma('table_info(assets)') as Array<{
    name: string;
  }>;
  if (!columns.some((column) => column.name === 'trashed_from_tombstone_id')) {
    connection.exec(
      'ALTER TABLE assets ADD COLUMN trashed_from_tombstone_id TEXT',
    );
  }
  connection.exec(`
    CREATE INDEX IF NOT EXISTS assets_trashed_tombstone_idx
      ON assets(trashed_from_tombstone_id)
      WHERE deleted_at IS NOT NULL AND trashed_from_tombstone_id IS NOT NULL
  `);
}

/**
 * Bind legacy trashed assets (FK already nulled) to surviving tombstones.
 * Prefer folder_id; else unique path; else closest trashed_at among same path.
 */
export function backfillTrashedFromTombstoneIds(
  connection: DatabaseConnection,
): void {
  // Serpent-verg.2 — lenient open (0031 §1): libraries older than the
  // trash-tombstone columns/table must still open; the backfill only applies
  // when the structure it reads exists.
  const assetColumns = columnsFor(connection, 'assets');
  if (
    !hasTable(connection, 'trashed_managed_folders') ||
    !['deleted_at', 'trashed_from_folder_id', 'trashed_from_tombstone_id', 'trashed_from_relative_path']
      .every((column) => assetColumns.has(column))
  ) {
    return;
  }
  // Serpent-4bdd26: count candidates through the v42 partial index first —
  // a pure read. On SMB every UPDATE pays ~200ms of journal-file round trips
  // even when zero rows match, and the common case is an empty trash.
  const candidateCount = connection
    .prepare(
      `SELECT COUNT(*) AS count FROM assets
        WHERE deleted_at IS NOT NULL
          AND trashed_from_tombstone_id IS NULL
          AND trashed_from_folder_id IS NOT NULL`,
    )
    .get() as { count: number };
  if (candidateCount.count === 0) return;

  connection
    .prepare(
      `UPDATE assets
          SET trashed_from_tombstone_id = (
            SELECT t.tombstone_id
              FROM trashed_managed_folders t
             WHERE t.folder_id = assets.trashed_from_folder_id
             LIMIT 1
          )
        WHERE deleted_at IS NOT NULL
          AND trashed_from_tombstone_id IS NULL
          AND trashed_from_folder_id IS NOT NULL`,
    )
    .run();

  const tombstones = connection
    .prepare(
      `SELECT tombstone_id, relative_path, trashed_at
         FROM trashed_managed_folders`,
    )
    .all() as Array<{
    tombstone_id: string;
    relative_path: string;
    trashed_at: string;
  }>;
  if (tombstones.length === 0) return;

  const byPath = new Map<string, typeof tombstones>();
  for (const tombstone of tombstones) {
    const list = byPath.get(tombstone.relative_path) ?? [];
    list.push(tombstone);
    byPath.set(tombstone.relative_path, list);
  }

  const unbound = connection
    .prepare(
      `SELECT asset_id, trashed_from_relative_path, deleted_at
         FROM assets
        WHERE deleted_at IS NOT NULL
          AND trashed_from_tombstone_id IS NULL
          AND trashed_from_relative_path IS NOT NULL`,
    )
    .all() as Array<{
    asset_id: string;
    trashed_from_relative_path: string;
    deleted_at: string;
  }>;

  const update = connection.prepare(
    `UPDATE assets
        SET trashed_from_tombstone_id = ?
      WHERE asset_id = ?`,
  );

  for (const asset of unbound) {
    const parentPath = path.posix.dirname(asset.trashed_from_relative_path);
    if (!parentPath || parentPath === '.') continue;
    const candidates = byPath.get(parentPath);
    if (!candidates || candidates.length === 0) continue;
    let chosen = candidates[0]!;
    if (candidates.length > 1) {
      const deletedMs = Date.parse(asset.deleted_at);
      chosen = candidates.reduce((best, candidate) => {
        const bestDelta = Math.abs(Date.parse(best.trashed_at) - deletedMs);
        const nextDelta = Math.abs(Date.parse(candidate.trashed_at) - deletedMs);
        return nextDelta < bestDelta ? candidate : best;
      });
    }
    update.run(chosen.tombstone_id, asset.asset_id);
  }
}

export function backfillPortablePathIdentities(connection: DatabaseConnection): void {
  const folderRows = connection
    .prepare('SELECT folder_id AS id, relative_path FROM managed_folders ORDER BY folder_id')
    .all() as PortablePathRow[];
  const assetRows = connection
    .prepare('SELECT asset_id AS id, relative_file_path AS relative_path FROM assets ORDER BY asset_id')
    .all() as PortablePathRow[];
  const allIdentities = new Map<string, { kind: 'asset' | 'folder'; path: string }>();

  const backfill = (
    rows: PortablePathRow[],
    kind: 'asset' | 'folder',
    statement: Statement,
  ): void => {
    for (const row of rows) {
      const identity = portablePathIdentity(row.relative_path);
      const existing = allIdentities.get(identity);
      if (existing && (existing.kind !== kind || existing.path !== row.relative_path)) {
        throw new Error('Existing paths are not portable-identity unique.');
      }
      allIdentities.set(identity, { kind, path: row.relative_path });
      statement.run(identity, row.id);
    }
  };

  backfill(
    folderRows,
    'folder',
    connection.prepare('UPDATE managed_folders SET path_identity = ? WHERE folder_id = ?'),
  );
  backfill(
    assetRows,
    'asset',
    connection.prepare('UPDATE assets SET path_identity = ? WHERE asset_id = ?'),
  );
}

export function buildFileName(relativeFilePath: string): string {
  return path.posix.basename(relativeFilePath);
}

export function buildFolderPath(relativeFilePath: string): string {
  return path.posix.dirname(relativeFilePath) === '.' ? '' : path.posix.dirname(relativeFilePath);
}

export function byteSizeLabel(byteSize: number): string {
  if (byteSize < 1_000_000) return 'small';
  if (byteSize < 10_000_000) return 'medium';
  if (byteSize < 100_000_000) return 'large';
  return 'xlarge';
}

export const EMBEDDED_METADATA_MARKER = '__serpent_embedded_metadata__';

export function buildMetadataText(input: {
  availability: string;
  byteSize: number;
  relativeFilePath: string;
  revisionId?: string | null;
  embeddedMetadataText?: string;
}): string {
  const extension = path.posix.extname(input.relativeFilePath).toLowerCase();
  const parts: string[] = [];
  if (extension.length > 0) parts.push(extension);
  parts.push(byteSizeLabel(input.byteSize));
  parts.push(input.availability);
  const embedded = input.embeddedMetadataText?.trim();
  if (embedded && input.revisionId) {
    parts.push(`${EMBEDDED_METADATA_MARKER}=${input.revisionId}`, embedded);
  }
  return parts.join(' ');
}

export function embeddedMetadataFromSearchText(
  metadataText: string | null | undefined,
  revisionId: string | null | undefined,
): string {
  if (!metadataText || !revisionId) return '';
  const marker = `${EMBEDDED_METADATA_MARKER}=${revisionId}`;
  const markerIndex = metadataText.indexOf(marker);
  if (markerIndex < 0) return '';
  return metadataText.slice(markerIndex + marker.length).trim();
}

/** Both content layers are searchable; neither changes what the UI displays. */
export function buildSearchDescription(
  humanDescription: string | null,
  aiDescription: string | null,
): string {
  return [humanDescription, aiDescription]
    .filter((description): description is string => Boolean(description?.trim()))
    .join('\n');
}

export function backfillAssetSearchContent(connection: DatabaseConnection): void {
  const assets = connection
    .prepare(
      `SELECT a.asset_id, a.relative_file_path, a.availability,
              r.byte_size, m.label, m.description, m.source_page_url
         FROM assets a
         JOIN revisions r ON r.revision_id = a.current_revision_id
         LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
        ORDER BY a.asset_id`,
    )
    .all() as Array<{
      asset_id: string;
      relative_file_path: string;
      availability: string;
      byte_size: number;
      label: string | null;
      description: string | null;
      source_page_url: string | null;
    }>;

  const tagRows = connection
    .prepare(
      `SELECT hat.asset_id, GROUP_CONCAT(t.name, ' ') AS tags
         FROM human_asset_tags hat
         JOIN tags t ON t.tag_id = hat.tag_id
        GROUP BY hat.asset_id`,
    )
    .all() as Array<{ asset_id: string; tags: string | null }>;
  const tagsByAsset = new Map<string, string>();
  for (const row of tagRows) {
    tagsByAsset.set(row.asset_id, row.tags ?? '');
  }

  const insert = connection.prepare(
    `INSERT OR IGNORE INTO asset_search_index
       (asset_id, label, filename, tags, description, source_url, folder_path, metadata_text)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );

  for (const asset of assets) {
    insert.run(
      asset.asset_id,
      tokenizeForFts(asset.label ?? ''),
      tokenizeForFts(buildFileName(asset.relative_file_path)),
      tokenizeForFts(tagsByAsset.get(asset.asset_id) ?? ''),
      tokenizeForFts(asset.description ?? ''),
      tokenizeForFts(asset.source_page_url ?? ''),
      tokenizeForFts(buildFolderPath(asset.relative_file_path)),
      tokenizeForFts(
        buildMetadataText({
          availability: asset.availability,
          byteSize: asset.byte_size,
          relativeFilePath: asset.relative_file_path,
        }),
      ),
    );
  }
}

/** Rebuild v18's raw normalized index from the canonical asset tables. */
export function backfillContextualSearchContent(connection: DatabaseConnection): void {
  const assets = connection
    .prepare(
      `SELECT a.asset_id, a.relative_file_path, a.availability, r.byte_size,
              m.description, ai.description AS ai_description,
              m.source_page_url, m.author
         FROM assets a
         JOIN revisions r ON r.revision_id = a.current_revision_id
         LEFT JOIN asset_metadata m ON m.asset_id = a.asset_id
         LEFT JOIN (
           SELECT asset_id, GROUP_CONCAT(value, '\n') AS description
             FROM ai_content
            WHERE field_name = 'description'
            GROUP BY asset_id
         ) ai ON ai.asset_id = a.asset_id
        ORDER BY a.asset_id`,
    )
    .all() as Array<{
      asset_id: string;
      relative_file_path: string;
      availability: string;
      byte_size: number;
      description: string | null;
      ai_description: string | null;
      source_page_url: string | null;
      author: string | null;
    }>;
  const tagRows = connection
    .prepare(
      `SELECT asset_id, GROUP_CONCAT(tag_name, ' ') AS tags
         FROM (
           SELECT hat.asset_id, t.name AS tag_name
             FROM human_asset_tags hat JOIN tags t ON t.tag_id = hat.tag_id
           UNION
           SELECT aat.asset_id, t.name AS tag_name
             FROM ai_asset_tags aat JOIN tags t ON t.tag_id = aat.tag_id
         )
        GROUP BY asset_id`,
    )
    .all() as Array<{ asset_id: string; tags: string | null }>;
  const tagsByAsset = new Map(tagRows.map((row) => [row.asset_id, row.tags ?? '']));
  const insert = connection.prepare(
    `INSERT INTO asset_search_index
       (asset_id, filename, tags, description, source_url, author, folder_path, metadata_text)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  for (const asset of assets) {
    insert.run(
      asset.asset_id,
      normalizeSearchText(buildFileName(asset.relative_file_path)),
      normalizeSearchText(tagsByAsset.get(asset.asset_id) ?? ''),
      normalizeSearchText(buildSearchDescription(asset.description, asset.ai_description)),
      normalizeSearchText(asset.source_page_url ?? ''),
      normalizeSearchText(asset.author ?? ''),
      normalizeSearchText(buildFolderPath(asset.relative_file_path)),
      normalizeSearchText(
        buildMetadataText({
          availability: asset.availability,
          byteSize: asset.byte_size,
          relativeFilePath: asset.relative_file_path,
        }),
      ),
    );
  }
}

/**
 * The v31 plugin field migration predates the test downgrade fixtures and
 * intentionally keeps its historical checksum. Those fixtures can retain
 * this table while rewinding user_version, so replay the same schema with
 * IF NOT EXISTS semantics without changing the checksum recorded for v31.
 */
export function ensurePluginDerivedFieldsSchema(connection: DatabaseConnection): void {
  connection.exec(
    PLUGIN_DERIVED_FIELDS_SCHEMA_SQL
      .replace('CREATE TABLE plugin_derived_fields', 'CREATE TABLE IF NOT EXISTS plugin_derived_fields')
      .replace('CREATE INDEX plugin_derived_fields_lookup', 'CREATE INDEX IF NOT EXISTS plugin_derived_fields_lookup'),
  );
}

export function normalizedSearchGroups(query: {
  clauses: SearchClause[];
  groups?: SearchGroup[];
}): SearchGroup[] {
  return normalizedCatalogSearchGroups(query);
}

export function hasPositiveSearchClause(groups: SearchGroup[]): boolean {
  return hasPositiveCatalogSearchClause(groups);
}

export function ftsCanNarrowSearchGroups(groups: SearchGroup[]): boolean {
  return catalogFtsCanNarrowSearchGroups(groups);
}

export function buildContextualSearchWhere(
  groups: SearchGroup[],
  assetOnly = false,
): {
  sql: string;
  params: string[];
} {
  return buildCatalogContextualSearchWhere(groups, assetOnly);
}

/**
 * Schema v24 is the first migration opened routinely by two independent
 * Serpent processes: an existing library can be opened by Desktop while a
 * future MCP host connects to the same database.  Serialize the v23 -> v24
 * boundary with SQLite's writer mutex, then re-read the version *inside* the
 * transaction.  The second opener therefore observes the committed v24
 * history instead of both trying to create the coordination tables/triggers.
 *
 * Older migrations rebuild tables while temporarily changing `foreign_keys`.
 * SQLite forbids that PRAGMA inside a transaction, so they intentionally keep
 * their established per-migration transaction model below.  Every released
 * v0.1 library is v23 before this change, which is the upgrade boundary that
 * needs cross-process protection now.
 */
/**
 * Serpent-033e: migrateDatabase refuses to rewrite a newer schema. Desktop
 * still opens that library writable; create/import validation treats the
 * same signal as LIBRARY_VERSION_TOO_NEW.
 */
export interface SchemaTooNewSignal {
  readonly libraryVersion: number;
}

/**
 * Fill dominant_saturation for palettes extracted before v56. Greyscale
 * sources stored hue=0; without saturation, a red filter would match them.
 */
export function backfillDominantSaturation(
  connection: DatabaseConnection,
  artifactsDir: string,
): void {
  const columns = columnsFor(connection, 'revision_artifacts');
  if (
    !['artifact_id', 'file_path', 'kind', 'status', 'invalidated_at', 'dominant_saturation']
      .every((column) => columns.has(column))
  ) {
    return;
  }
  const rows = connection.prepare(
    `SELECT artifact_id, file_path, dominant_hue, dominant_lightness
       FROM revision_artifacts
      WHERE kind = 'extracted_palette'
        AND status = 'ready'
        AND invalidated_at IS NULL
        AND dominant_saturation IS NULL`,
  ).all() as Array<{
    artifact_id: string;
    file_path: string;
    dominant_hue: number | null;
    dominant_lightness: number | null;
  }>;
  if (rows.length === 0) return;
  const update = connection.prepare(
    `UPDATE revision_artifacts
        SET dominant_saturation = ?, dominant_hue = ?, dominant_lightness = ?
      WHERE artifact_id = ?`,
  );
  const apply = connection.transaction(() => {
    for (const row of rows) {
      let saturation = 0;
      let hue = row.dominant_hue;
      let lightness = row.dominant_lightness;
      try {
        const parsed = JSON.parse(
          readFileSync(path.join(artifactsDir, row.file_path), 'utf8'),
        ) as Array<{ hex?: string }>;
        const hex = parsed[0]?.hex;
        if (typeof hex === 'string') {
          const metrics = dominantColorMetrics(hex);
          saturation = metrics.saturation;
          hue = metrics.hue;
          lightness = metrics.lightness;
        }
      } catch {
        saturation = 0;
      }
      update.run(saturation, hue, lightness, row.artifact_id);
    }
  });
  apply();
}

export function migrateDatabase(
  connection: DatabaseConnection,
  allowFresh: boolean,
  options?: Pick<
    LibraryServiceOptions,
    'afterSchemaMigrationTransactionBegin' | 'beforeSchemaMigrationTransaction'
  >,
): SchemaTooNewSignal | null {
  const versionBeforeMigration = schemaVersion(connection);
  if (versionBeforeMigration > SUPPORTED_SCHEMA_VERSION) {
    return { libraryVersion: versionBeforeMigration };
  }
  if (versionBeforeMigration >= 23 && versionBeforeMigration <= SUPPORTED_SCHEMA_VERSION) {
    options?.beforeSchemaMigrationTransaction?.();
    try {
      connection.transaction(() => {
        options?.afterSchemaMigrationTransactionBegin?.();
        migrateDatabaseUnserialized(connection, allowFresh);
      }).immediate();
    } catch (error) {
      // Keep the public failure distinct from damaged migration history. The
      // open path records this as a retryable migration failure; only an
      // explicit LIBRARY_CORRUPT is eligible for the database recovery ladder.
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('LIBRARY_MIGRATION_FAILED', { cause: error });
    }
    return null;
  }
  migrateDatabaseUnserialized(connection, allowFresh);
  return null;
}

export function migrateDatabaseUnserialized(connection: DatabaseConnection, allowFresh: boolean): void {
  let currentVersion = schemaVersion(connection);
  if (hasLegacyPluginMigrationHistory(connection, currentVersion)) {
    migrateLegacyPluginMigrationHistory(connection);
    verifyMigrationHistory(connection, SUPPORTED_SCHEMA_VERSION);
    // Serpent-verg: the migration mutated the schema; the lenient-read
    // column cache must be rebuilt from the new structure.
    invalidateColumnProbe(connection);
    return;
  }
  if (hasForkedSyncAutoAnalysisMigrationHistory(connection, currentVersion)) {
    migrateForkedSyncAutoAnalysisMigrationHistory(connection);
    currentVersion = schemaVersion(connection);
  }
  if (currentVersion > SUPPORTED_SCHEMA_VERSION) {
    throw new LibraryServiceError('LIBRARY_VERSION_TOO_NEW');
  }
  if (currentVersion === 0 && !allowFresh) {
    throw new LibraryServiceError('LIBRARY_CORRUPT');
  }
  if (currentVersion > 0) verifyMigrationHistory(connection, currentVersion);

  for (const migration of MIGRATIONS.slice(currentVersion)) {
    // The v4 migration rebuilds the assets table: SQLite cannot relax a CHECK
    // constraint or replace a column UNIQUE without a table rebuild. DROP TABLE
    // with foreign_keys = ON performs an implicit DELETE of every row, which
    // would cascade through revisions.asset_id ON DELETE CASCADE and orphan
    // every asset. PRAGMA foreign_keys cannot change inside a transaction, so
    // toggle it around the v4 transaction and run foreign_key_check before
    // re-enabling. asset_ids are preserved across the rebuild, so the check
    // passes and revisions remain attached.
    //
    // The v6 migration rebuilds the smart_collections table. While no other
    // table references smart_collections via FK, the table itself has an
    // outgoing FK to library(library_id). Disabling FK prevents DROP TABLE
    // from blocking and guarantees the rebuild is clean.
    //
    // Serpent-verg.7 (discipline audit): the full set of in-place table
    // rebuilds — every one creates a replacement table, copies, drops the
    // old and renames. The FK guard is kept in lockstep so a future FK on
    // any rebuilt table cannot silently break the DROP phase. (v15 dropped
    // the old asset_search table without rebuilding — a historical
    // pre-discipline exception, intentionally not in this set.)
    const rebuildsTable = TABLE_REBUILD_MIGRATION_VERSIONS.has(migration.version);
    if (rebuildsTable) connection.pragma('foreign_keys = OFF');
    try {
      connection.transaction(() => {
        if (migration.version === 20) {
          // Idempotent: downgrade fixtures may already have the column.
          ensureTrashTombstoneAssetBindSchema(connection);
          backfillTrashedFromTombstoneIds(connection);
        } else if (migration.version === 31) {
          ensurePluginDerivedFieldsSchema(connection);
        } else if (migration.version === 34) {
          ensureContentFingerprintColumn(connection);
        } else if (migration.version === 38) {
          ensureSyncSchema(connection);
        } else if (migration.version === 48) {
          ensureLinkedSourceIdentitySchema(connection);
        } else if (migration.version === 49) {
          ensureLinkedFolderParentSchema(connection);
        } else if (migration.version === 54) {
          ensureAssetNormalizedExtensionSchema(connection);
        } else if (migration.version === 55) {
          ensureEntityAppearanceSchema(connection);
        } else if (migration.version === 58) {
          ensureFolderCustomCoverAssetSchema(connection);
        } else {
          connection.exec(migration.sql);
        }
        if (migration.version === 3) {
          backfillPortablePathIdentities(connection);
          connection.exec(PORTABLE_PATH_SCHEMA_AFTER_BACKFILL_SQL);
        }
        if (migration.version === 6) {
          backfillAssetSearchContent(connection);
          connection.exec("INSERT INTO asset_search(asset_search) VALUES('rebuild')");
        }
        if (migration.version === 18 || migration.version === 19) {
          backfillContextualSearchContent(connection);
        }
        if (rebuildsTable) {
          const foreignKeyViolations = connection.pragma('foreign_key_check');
          if (Array.isArray(foreignKeyViolations) && foreignKeyViolations.length > 0) {
            throw new Error(
              `Migration ${migration.version} would leave ${foreignKeyViolations.length} foreign-key violation(s).`,
            );
          }
        }
        connection
          .prepare(
            'INSERT INTO schema_migrations (version, checksum, applied_at) VALUES (?, ?, ?)',
          )
          .run(migration.version, migration.checksum, new Date().toISOString());
        connection.pragma(`user_version = ${migration.version}`);
      })();
    } catch (error) {
      if (rebuildsTable) {
        try {
          connection.pragma('foreign_keys = ON');
        } catch {
          // The primary migration failure remains more useful than a re-enable failure.
        }
      }
      // Serpent-verg.5 (0031 §2.2): a rolled-back migration failure is
      // retryable and diagnosed via .serpent/migration-failed.json; the
      // open path records it. verifyMigrationHistory failures above/below
      // keep LIBRARY_CORRUPT (damaged history is never retried).
      throw new LibraryServiceError('LIBRARY_MIGRATION_FAILED', { cause: error });
    }
    if (rebuildsTable) connection.pragma('foreign_keys = ON');
  }

  verifyMigrationHistory(connection, SUPPORTED_SCHEMA_VERSION);
  // Serpent-verg: migrations may have mutated the schema; the lenient-read
  // column cache must be rebuilt from the new structure.
  invalidateColumnProbe(connection);
}

export function readLibraryIdentity(
  connection: DatabaseConnection,
  options: { skipQuickCheck?: boolean } = {},
): LibraryRow {
  if (!options.skipQuickCheck) {
    const check = connection.pragma('quick_check(1)');
    if (
      !Array.isArray(check) ||
      check.length !== 1 ||
      typeof check[0] !== 'object' ||
      check[0] === null ||
      !('quick_check' in check[0]) ||
      check[0].quick_check !== 'ok'
    ) {
      throw new LibraryServiceError('LIBRARY_CORRUPT');
    }
  }

  const libraryRows = connection
    .prepare('SELECT library_id, display_name FROM library ORDER BY library_id LIMIT 2')
    .all() as LibraryRow[];
  const library = libraryRows[0];
  if (
    libraryRows.length !== 1 ||
    !library ||
    typeof library.library_id !== 'string' ||
    library.library_id.length === 0 ||
    typeof library.display_name !== 'string' ||
    library.display_name.length === 0
  ) {
    throw new LibraryServiceError('LIBRARY_CORRUPT');
  }

  return library;
}

export function verifyDatabase(
  connection: DatabaseConnection,
  options: { skipQuickCheck?: boolean } = {},
): LibraryRow {
  const version = schemaVersion(connection);
  if (version > SUPPORTED_SCHEMA_VERSION) {
    throw new LibraryServiceError('LIBRARY_VERSION_TOO_NEW');
  }
  if (version !== SUPPORTED_SCHEMA_VERSION) {
    throw new LibraryServiceError('LIBRARY_CORRUPT');
  }
  verifyMigrationHistory(connection, version);
  // Serpent-4bdd26: quick_check scans every B-tree (~270ms on a 60MB/20k
  // library) and dominated the synchronous open. The open hot path defers it
  // to the background reconciliation; create/recovery paths keep the full
  // check because their inputs are untrusted by construction.
  return readLibraryIdentity(connection, options);
}

/** PRAGMA quick_check gate shared by the deferred verification path. */
/**
 * Open a library that we cannot (or should not) migrate right now, but that
 * is still physically usable. Newer-than-supported schemas keep the canonical
 * prefix and extra additive rows; a stuck migration keeps the last rolled-back
 * version. Both stay writable — Serpent does not offer a read-only library.
 */
export function verifyOpenableSchema(connection: DatabaseConnection): LibraryRow {
  const version = schemaVersion(connection);
  if (version <= 0) throw new LibraryServiceError('LIBRARY_CORRUPT');
  if (version > SUPPORTED_SCHEMA_VERSION) {
    try {
      if (!hasCanonicalMigrationHistoryThrough(connection, SUPPORTED_SCHEMA_VERSION)) {
        throw new LibraryServiceError('LIBRARY_CORRUPT');
      }
    } catch (error) {
      if (error instanceof LibraryServiceError) throw error;
      throw new LibraryServiceError('LIBRARY_CORRUPT', { cause: error });
    }
  } else {
    verifyMigrationHistory(connection, version);
  }
  return readLibraryIdentity(connection);
}

export function closeIgnoringFailure(connection: DatabaseConnection | undefined): void {
  try {
    connection?.close();
  } catch {
    // The primary error remains more useful than a secondary close failure.
  }
}

// Media-type classification (moved from LibraryService statics)
export function detectMediaType(filenameOrMime: string): 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other' {
  const lower = filenameOrMime.toLowerCase();
  if (isSupportedImageExtension(lower)) {
    return 'image';
  }
  if (isSupportedVideoExtension(lower)) {
    return 'video';
  }
  if (isSupportedModelExtension(lower)) {
    return 'model';
  }
  if (isAudioFileName(lower)) {
    return 'audio';
  }
  // Serpent-8ca259: PDF and HTML are documents previewed in a browser-like
  // renderer, not plain text. Check before the text whitelist so they
  // classify as `document`.
  if (isSupportedDocumentExtension(lower)) {
    return 'document';
  }
  // Serpent-485aeb: fonts get their own media type (card sample + viewer).
  if (isSupportedFontExtension(lower)) {
    return 'font';
  }
  if (isTextFileName(lower)) {
    return 'text';
  }
  return 'other';
}

export function toSummaryMediaType(
  detected: ReturnType<typeof detectMediaType>,
): 'image' | 'video' | 'audio' | 'text' | 'model' | 'document' | 'font' | 'other' {
  return detected === 'image' ||
    detected === 'video' ||
    detected === 'audio' ||
    detected === 'text' ||
    detected === 'model' ||
    detected === 'document' ||
    detected === 'font'
    ? detected
    : 'other';
}

export function supportsThumbnail(filename: string): boolean {
  return assetSupportsThumbnail({
    mediaType: toSummaryMediaType(
      detectMediaType(filename),
    ),
    displayName: path.basename(filename),
  });
}
