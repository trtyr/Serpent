import { readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

import { app, safeStorage } from "electron";

import type { SyncBindingRecord, SyncServerRecord } from "../sync-records";

/**
 * Serpent-xffq: WebDAV 同步服务器（全局）与库绑定的 Main 侧持久化读取。
 * 写入口随桌面 UI 一并移除，配置文件为唯一管理途径。
 */

function syncServersPath(): string {
  return path.join(app.getPath("userData"), "sync-servers.json");
}

function syncBindingsPath(): string {
  return path.join(app.getPath("userData"), "sync-bindings.json");
}

export function readSyncServers(): SyncServerRecord[] {
  try {
    const parsed = JSON.parse(readFileSync(syncServersPath(), "utf-8")) as unknown;
    if (Array.isArray(parsed)) return parsed as SyncServerRecord[];
  } catch {
    // 首次运行。
  }
  return [];
}

export function readSyncBindings(): Record<string, SyncBindingRecord> {
  try {
    const parsed = JSON.parse(readFileSync(syncBindingsPath(), "utf-8")) as unknown;
    if (parsed && typeof parsed === "object") return parsed as Record<string, SyncBindingRecord>;
  } catch {
    // 首次运行。
  }
  return {};
}

export function writeSyncBindings(bindings: Record<string, SyncBindingRecord>): void {
  writeFileSync(syncBindingsPath(), JSON.stringify(bindings, null, 2), "utf-8");
}

export function resolveSyncServerCredentials(serverId: string): {
  baseUrl: string;
  username?: string;
  password?: string;
  allowInsecureTls: boolean;
} | null {
  const server = readSyncServers().find((entry) => entry.id === serverId);
  if (!server) return null;
  let password: string | undefined;
  if (server.passwordEncrypted) {
    try {
      password = safeStorage.decryptString(Buffer.from(server.passwordEncrypted, "base64"));
    } catch {
      password = undefined;
    }
  }
  return {
    baseUrl: server.baseUrl,
    username: server.username,
    password,
    allowInsecureTls: server.allowInsecureTls,
  };
}

let cachedSyncDeviceId: string | undefined;

/** Serpent-xffq：每台设备的稳定同步身份（userData 持久化，非敏感）。 */
export function syncDeviceId(): string {
  if (cachedSyncDeviceId) return cachedSyncDeviceId;
  const file = path.join(app.getPath("userData"), "sync-device.json");
  try {
    const parsed = JSON.parse(readFileSync(file, "utf-8")) as { deviceId?: string };
    if (typeof parsed.deviceId === "string" && parsed.deviceId.length > 0) {
      cachedSyncDeviceId = parsed.deviceId;
      return parsed.deviceId;
    }
  } catch {
    // 首次运行。
  }
  const deviceId = randomUUID();
  try {
    writeFileSync(file, JSON.stringify({ deviceId }), "utf-8");
  } catch {
    // 写入失败仍返回本次进程内稳定 ID。
  }
  cachedSyncDeviceId = deviceId;
  return deviceId;
}
