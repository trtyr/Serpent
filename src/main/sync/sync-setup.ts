import { SyncAutoScheduler, type SyncBindingLike } from "../sync-auto-scheduler";
import type { SyncBindingRecord } from "../sync-records";
import {
  readSyncBindings,
  resolveSyncServerCredentials,
  syncDeviceId,
  writeSyncBindings,
} from "../config/sync-config-store";
import type { AppLogger } from "../app-logger";
import type { LibraryWorkerClient } from "../worker-client";

/**
 * Serpent-bfsb 后续：自动同步调度器。本地资产变更 5 秒防抖后自动同步；
 * 轮询间隔只用于检查云端。
 */

let syncAutoScheduler: SyncAutoScheduler | undefined;

export function setupSyncAutoScheduler(workerClient: LibraryWorkerClient, logger: AppLogger): void {
  syncAutoScheduler = new SyncAutoScheduler({
    workerClient,
    deviceId: () => syncDeviceId(),
    readBindings: () => readSyncBindings() as unknown as Record<string, SyncBindingLike>,
    writeBindings: (bindings) => writeSyncBindings(bindings as unknown as Record<string, SyncBindingRecord>),
    resolveCredentials: (serverId) => resolveSyncServerCredentials(serverId),
    logger,
  });
  syncAutoScheduler.start();
}

export function stopSyncAutoScheduler(): void {
  syncAutoScheduler?.stop();
  syncAutoScheduler = undefined;
}
