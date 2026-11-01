import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, type Dirent } from "node:fs";
import path from "node:path";

import { app, safeStorage } from "electron";

import {
  DEFAULT_AI_ANALYSIS_SETTINGS,
  type AiAnalysisSettings,
} from "../../shared/ai-analysis-settings";
import {
  AI_ANALYSIS_QUEUE_BATCH_SIZE,
  DEFAULT_AI_ANALYSIS_CONCURRENCY,
} from "../../shared/ai-concurrency";
import { DEFAULT_AI_ANALYSIS_IMAGE_EDGE_PX } from "../../shared/ai-analysis-image";
import {
  DEFAULT_AI_RELIABILITY_SETTINGS,
  type AiReliabilitySettings,
} from "../../shared/ai-reliability";
import {
  DEFAULT_AI_API_FORMAT,
  DEFAULT_AI_MODELS,
  type AiApiFormat,
} from "../../shared/ai-endpoints";
import {
  normalizeAiAnalysisPreferences,
  type AiAnalysisPreferences,
} from "../ai-analysis-preferences";
import {
  recoverAiProfileTransaction,
  type AiProfileTransactionIo,
} from "../ai-profile-transaction";
import { runAiProfileMigrationStartup } from "../ai-profile-legacy-config";
import {
  AiProfileStorageError,
  emptyAiProfileCatalog,
  isAiProfileId,
  legacyAiConnectionProfile,
  migrateAiProfileStorage,
  parseAiProfileCatalog,
  resolveAiCredential,
  summarizeAiProfiles,
  type AiProfileCatalog,
} from "../ai-profile-store";
import { readAtomicJsonFile, writeAtomicJsonFile } from "../atomic-json-file";
import { runtime } from "../runtime/app-runtime";

/**
 * AI configuration domain: persisted profile catalog, secure per-profile
 * credentials (safeStorage), analysis preferences, the legacy-config
 * migration and the merged `loadAiConfig` view consumed by the AI queue.
 */

export interface AiConfig {
  apiFormat: AiApiFormat;
  model: string;
  /** Empty = official default for the selected API format. */
  baseUrl: string;
  descriptionEnabled: boolean;
  tagEnabled: boolean;
  ratingEnabled: boolean;
  analysisSettings: AiAnalysisSettings;
  concurrencyLimit: number;
  /** Longest edge for images uploaded to analysis (default 2048 / 2K). */
  maxAnalysisImageEdgePx: number;
  reliabilitySettings: AiReliabilitySettings;
  languages: Array<"zh-CN" | "en" | "ja" | "ko">;
  autoAnalyzeEnabled: boolean;
  disclaimerAccepted: boolean;
}

type LegacyAiConfig = Partial<AiConfig> & {
  provider?: string;
  language?: string;
  apiFormat?: string;
  languages?: unknown;
};

const DEFAULT_AI_CONFIG: AiConfig = {
  apiFormat: DEFAULT_AI_API_FORMAT,
  model: DEFAULT_AI_MODELS[DEFAULT_AI_API_FORMAT],
  baseUrl: "",
  descriptionEnabled: true,
  tagEnabled: true,
  ratingEnabled: true,
  analysisSettings: { ...DEFAULT_AI_ANALYSIS_SETTINGS },
  concurrencyLimit: DEFAULT_AI_ANALYSIS_CONCURRENCY,
  maxAnalysisImageEdgePx: DEFAULT_AI_ANALYSIS_IMAGE_EDGE_PX,
  reliabilitySettings: { ...DEFAULT_AI_RELIABILITY_SETTINGS },
  languages: ["zh-CN", "en"],
  autoAnalyzeEnabled: false,
  disclaimerAccepted: false,
};

// Re-exported queue constants keep the AI tuning surface in one place.
export { AI_ANALYSIS_QUEUE_BATCH_SIZE };

function aiConfigPath(): string {
  return path.join(app.getPath("userData"), "ai-config.json");
}

function aiProfilesPath(): string {
  return path.join(app.getPath("userData"), "ai-profiles.json");
}

function aiAnalysisSettingsPath(): string {
  return path.join(app.getPath("userData"), "ai-analysis-settings.json");
}

function aiProfileMigrationPath(): string {
  return path.join(app.getPath("userData"), "ai-profile-migration.json");
}

function aiProfileTransactionPath(): string {
  return path.join(app.getPath("userData"), "ai-profile-transaction.json");
}

function aiKeyPath(): string {
  return path.join(app.getPath("userData"), "ai-key.enc");
}

function aiProfileKeyPath(id: string): string {
  return path.join(app.getPath("userData"), "ai-profile-keys", `${id}.bin`);
}

function normalizeLegacyAiAnalysisPreferences(
  parsed: LegacyAiConfig | null,
): AiAnalysisPreferences {
  return normalizeAiAnalysisPreferences(parsed);
}

export function readAiProfileCatalog(required = false): AiProfileCatalog {
  recoverAiProfileTransactionIfPresent();
  const raw = readAtomicJsonFile(aiProfilesPath());
  if (raw === undefined) {
    if (required) throw new Error("AI profile catalog is missing after migration.");
    return emptyAiProfileCatalog();
  }
  return parseAiProfileCatalog(JSON.parse(raw) as unknown);
}

function aiProfileTransactionIo(): AiProfileTransactionIo {
  return {
    readJournal: () => readAtomicJsonFile(aiProfileTransactionPath()) ?? null,
    writeJournal: (contents) => writeAtomicJsonFile(aiProfileTransactionPath(), contents),
    writeCredential: (profileId, encryptedCredentialBase64) => {
      const filename = aiProfileKeyPath(profileId);
      mkdirSync(path.dirname(filename), { recursive: true });
      writeFileSync(filename, Buffer.from(encryptedCredentialBase64, "base64"), {
        mode: 0o600,
        flush: true,
      });
    },
    deleteCredential: (profileId) => deleteAiProfileCredential(profileId),
    writeCatalog: (catalog) => {
      writeAtomicJsonFile(aiProfilesPath(), JSON.stringify(catalog, null, 2));
    },
    deleteJournal: () => rmSync(aiProfileTransactionPath(), { force: true }),
  };
}

function recoverAiProfileTransactionIfPresent(): void {
  recoverAiProfileTransaction(aiProfileTransactionIo());
}

export function readAiAnalysisPreferences(): AiAnalysisPreferences {
  const raw = readAtomicJsonFile(aiAnalysisSettingsPath());
  if (raw === undefined) return normalizeLegacyAiAnalysisPreferences(null);
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("AI analysis preferences have an invalid structure.");
  }
  return normalizeAiAnalysisPreferences(parsed);
}

function hasAiProfileCredential(profileId: string): boolean {
  return existsSync(aiProfileKeyPath(profileId));
}

function readAiProfileCredential(profileId: string): string {
  try {
    return safeStorage.decryptString(readFileSync(aiProfileKeyPath(profileId)));
  } catch {
    throw new Error("AI API key not configured or could not be decrypted.");
  }
}

function writeAiProfileCredential(profileId: string, apiKey: string): void {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("Secure credential storage is unavailable.");
  }
  const filename = aiProfileKeyPath(profileId);
  mkdirSync(path.dirname(filename), { recursive: true });
  writeFileSync(filename, safeStorage.encryptString(apiKey), { mode: 0o600, flush: true });
}

function deleteAiProfileCredential(profileId: string): void {
  rmSync(aiProfileKeyPath(profileId), { force: true });
}

function cleanupOrphanAiProfileCredentials(catalog: AiProfileCatalog): void {
  const directory = path.join(app.getPath("userData"), "ai-profile-keys");
  if (!existsSync(directory)) return;

  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    runtime.logger?.error("ai.profile-keys.orphan-cleanup", error);
    return;
  }

  const knownProfileIds = new Set(catalog.profiles.map((profile) => profile.id));
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".bin")) continue;
    const profileId = entry.name.slice(0, -".bin".length);
    if (!isAiProfileId(profileId) || knownProfileIds.has(profileId)) continue;
    try {
      rmSync(path.join(directory, entry.name), { force: true });
    } catch (error) {
      // Migration is still usable; this runs on every load so failed removals retry.
      runtime.logger?.error("ai.profile-keys.orphan-cleanup", error);
    }
  }
}

function ensureAiProfileMigration(): void {
  recoverAiProfileTransactionIfPresent();
  const markerPath = aiProfileMigrationPath();
  const markerContents = readAtomicJsonFile(markerPath);
  let markerVersion: number | null = null;
  if (markerContents !== undefined) {
    const marker: unknown = JSON.parse(markerContents);
    if (!marker || typeof marker !== "object" || Array.isArray(marker)) {
      throw new Error("AI profile migration marker has an invalid structure.");
    }
    const version = (marker as { version?: unknown }).version;
    if (version !== 1) throw new Error("AI profile migration marker has an unsupported version.");
    markerVersion = version;
  }

  runAiProfileMigrationStartup<LegacyAiConfig, void>({
    markerVersion,
    readLegacyConfig: () => readFileSync(aiConfigPath()),
    recoverCompletedMigration: () => {
      const catalog = readAiProfileCatalog(true);
      cleanupOrphanAiProfileCredentials(catalog);
      cleanupLegacyAiConfig();
    },
    migrate: (legacy) => {
      const legacyKeyExists = existsSync(aiKeyPath());
      migrateAiProfileStorage({
        markerExists: () => false,
        readCatalog: () => existsSync(aiProfilesPath()) ? readAiProfileCatalog() : null,
        cleanupOrphanCredentials: cleanupOrphanAiProfileCredentials,
        readPreferences: () => {
          if (!existsSync(aiAnalysisSettingsPath())) return null;
          return JSON.parse(readFileSync(aiAnalysisSettingsPath(), "utf-8")) as unknown;
        },
        legacyProfile: legacy !== null || legacyKeyExists
          ? legacyAiConnectionProfile({
              apiFormat: legacy?.apiFormat,
              provider: legacy?.provider,
              model: legacy?.model,
              baseUrl: legacy?.baseUrl,
            })
          : null,
        readLegacyCredential: () => legacyKeyExists
          ? safeStorage.decryptString(readFileSync(aiKeyPath()))
          : null,
        writeCredential: writeAiProfileCredential,
        verifyCredential: (profileId) => { readAiProfileCredential(profileId); },
        defaultPreferences: normalizeLegacyAiAnalysisPreferences(null),
        normalizeLegacyPreferences: () => legacy
          ? normalizeLegacyAiAnalysisPreferences(legacy)
          : null,
        writeCatalog: (catalog) => {
          writeAtomicJsonFile(aiProfilesPath(), JSON.stringify(catalog, null, 2));
        },
        writePreferences: (preferences) => {
          writeAtomicJsonFile(aiAnalysisSettingsPath(), JSON.stringify(preferences, null, 2));
        },
        writeMarker: () => {
          writeAtomicJsonFile(markerPath, JSON.stringify({ version: 1 }, null, 2));
        },
        cleanupLegacy: cleanupLegacyAiConfig,
      });
    },
  });
}

function cleanupLegacyAiConfig(): void {
  try {
    rmSync(aiConfigPath(), { force: true });
    rmSync(aiKeyPath(), { force: true });
  } catch (error) {
    runtime.logger?.error("ai.profile-migration.cleanup", error);
  }
}

export function loadAiConfig(): AiConfig & {
  hasKey: boolean;
  activeProfileId: string | null;
  profiles: ReturnType<typeof summarizeAiProfiles>;
} {
  try {
    ensureAiProfileMigration();
    const catalog = readAiProfileCatalog();
    const profile = catalog.profiles.find((item) => item.id === catalog.activeProfileId);
    const preferences = readAiAnalysisPreferences();
    return {
      ...(profile ?? {
        apiFormat: DEFAULT_AI_CONFIG.apiFormat,
        model: DEFAULT_AI_CONFIG.model,
        baseUrl: DEFAULT_AI_CONFIG.baseUrl,
      }),
      ...preferences,
      activeProfileId: profile?.id ?? null,
      profiles: summarizeAiProfiles(catalog, hasAiProfileCredential),
      hasKey: profile ? hasAiProfileCredential(profile.id) : false,
    };
  } catch (error) {
    if (error instanceof AiProfileStorageError) throw error;
    throw new AiProfileStorageError(error);
  }
}

export function getDecryptedApiKey(): string {
  const activeProfileId = loadAiConfig().activeProfileId;
  return resolveAiCredential(
    activeProfileId,
    hasCompletedAiProfileMigration(),
    readAiProfileCredential,
    () => {
      // Keep the previous installation usable if migration cannot finish
      // because the new profile files or secure storage are temporarily unavailable.
      try {
        return safeStorage.decryptString(readFileSync(aiKeyPath()));
      } catch {
        throw new Error("AI API key not configured.");
      }
    },
  );
}

export function hasCompletedAiProfileMigration(): boolean {
  try {
    const marker = JSON.parse(readFileSync(aiProfileMigrationPath(), "utf-8")) as {
      version?: unknown;
    };
    return marker.version === 1;
  } catch {
    return false;
  }
}

export function getDecryptedProfileApiKey(profileId: string): string {
  try {
    if (!readAiProfileCatalog().profiles.some((profile) => profile.id === profileId)) {
      throw new Error("AI profile does not exist.");
    }
    return readAiProfileCredential(profileId);
  } catch (error) {
    if (error instanceof AiProfileStorageError) throw error;
    throw new AiProfileStorageError(error);
  }
}
