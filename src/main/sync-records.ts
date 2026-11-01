/**
 * Sync configuration record shapes shared by the Main-owned sync stores
 * (index.ts) and the auto-sync scheduler. Previously re-exported from the
 * renderer-request dispatch layer, which was removed in the headless split.
 */

export type SyncServerRecord = {
  id: string;
  baseUrl: string;
  username?: string;
  /** safeStorage 加密后的密码（base64）。 */
  passwordEncrypted?: string;
  allowInsecureTls: boolean;
};

export type SyncBindingRecord = {
  serverId: string;
  /** 同步文件夹名称（远端目录名，默认库名）。 */
  directoryName?: string;
  /** 旧格式字段：subPath 曾是同步文件夹名（Serpent-xffq 早期）；读取时兼容。 */
  subPath?: string;
  /** 上次成功同步时间（ISO 字符串）。 */
  lastSyncedAt?: string;
  /** 自动同步开关（用户决定：在资源库设置里开启/关闭）。 */
  enabled?: boolean;
  /** 云端变化轮询间隔（毫秒，用户可设置；缺省 5000）。 */
  pollIntervalMs?: number;
  /** 卡片右下角同步状态；缺省 true（Serpent-871f34）。 */
  showCardSyncStatus?: boolean;
};
