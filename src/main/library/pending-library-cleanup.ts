import {
  readPendingCleanupAsidePaths,
  writePendingCleanupAsidePaths,
} from "../pending-cleanup-store";
import { pendingLibraryCleanupPath } from "../config/store-paths";
import { runtime } from "../runtime/app-runtime";

/**
 * Serpent-65d837: deferred removal of `.del-*` aside roots left behind by
 * library disk deletions, with a bounded retry backoff.
 */

// Serpent-65d837: backoff schedule for asking the Worker to remove `.del-*`
// aside roots left behind by a disk deletion. Windows handles (Defender scan,
// Explorer, lingering `serpent://` streams) usually close within seconds, so a
// few short retries resolve it without user action; anything still remaining
// stays persisted and is retried on the next app launch.
const PENDING_CLEANUP_RETRY_DELAYS_MS = [1_000, 2_000, 4_000, 8_000, 16_000, 30_000];

let pendingCleanupRetry = 0;
let pendingCleanupRetryTimer: NodeJS.Timeout | undefined;

/**
 * Fire-and-forget: tells the Worker to remove every persisted `.del-*` aside
 * root, drops the paths that succeeded from the store, and keeps retrying the
 * remaining ones with a bounded backoff. Callers: after a deletion reported a
 * pending aside, and after the Worker becomes ready at startup.
 */
function retryPendingLibraryCleanups(): void {
  if (pendingCleanupRetryTimer) return;
  void runPendingLibraryCleanups(0);
}

async function runPendingLibraryCleanups(round: number): Promise<void> {
  const pendingPath = pendingLibraryCleanupPath();
  const asidePaths = readPendingCleanupAsidePaths(pendingPath, (error) => {
    runtime.logger?.error("pending-library-cleanup.read", error);
  });
  if (asidePaths.length === 0) return;
  const workerClient = runtime.workerClient;
  if (!workerClient) return;
  let cleanedPaths: string[];
  let remainingPaths: string[];
  try {
    const outcome = await workerClient.request({
      type: "system.cleanup-pending-deletions",
      asidePaths,
    });
    if (outcome.ok && outcome.type === "system.cleanup-pending-deletions") {
      cleanedPaths = outcome.cleanedPaths;
      remainingPaths = outcome.remainingPaths;
    } else {
      cleanedPaths = [];
      remainingPaths = asidePaths;
    }
  } catch (error) {
    cleanedPaths = [];
    remainingPaths = asidePaths;
    runtime.logger?.error(
      "pending-library-cleanup.run",
      error instanceof Error ? error : new Error(String(error)),
    );
  }
  const stillPersisted = readPendingCleanupAsidePaths(pendingPath, (error) => {
    runtime.logger?.error("pending-library-cleanup.read", error);
  });
  const remainingSet = new Set(remainingPaths);
  const next = stillPersisted.filter((sidePath) => remainingSet.has(sidePath));
  if (next.length === 0) {
    writePendingCleanupAsidePaths(pendingPath, [], (error) => {
      runtime.logger?.error("pending-library-cleanup.write", error);
    });
    return;
  }
  writePendingCleanupAsidePaths(pendingPath, next, (error) => {
    runtime.logger?.error("pending-library-cleanup.write", error);
  });
  if (cleanedPaths.length > 0) {
    runtime.logger?.info("pending-library-cleanup.deferred", "Removed leftover library roots.", {
      cleanedCount: cleanedPaths.length,
    });
  }
  const delay = PENDING_CLEANUP_RETRY_DELAYS_MS[round];
  if (delay === undefined) {
    runtime.logger?.info("pending-library-cleanup.still-pending", "Pending cleanup will retry on next launch.", {
      remaining: next.length,
    });
    return;
  }
  pendingCleanupRetry = round + 1;
  pendingCleanupRetryTimer = setTimeout(() => {
    pendingCleanupRetryTimer = undefined;
    void runPendingLibraryCleanups(pendingCleanupRetry);
  }, delay);
}

export { retryPendingLibraryCleanups };
