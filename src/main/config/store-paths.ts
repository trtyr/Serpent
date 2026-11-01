import path from "node:path";

import { app } from "electron";

/** userData-relative store paths shared across domains. */

export function recentLibraryPath(): string {
  return path.join(app.getPath("userData"), "recent-library.json");
}

export function pendingLibraryCleanupPath(): string {
  return path.join(app.getPath("userData"), "pending-library-cleanup.json");
}

export function externalLibraryStagingStorePath(): string {
  return path.join(app.getPath("userData"), "external-library-staging.json");
}
