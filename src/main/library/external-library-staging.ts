import { tmpdir } from "node:os";

import {
  sweepOrphanExternalLibraryStaging,
} from "../external-library-archive";
import {
  readExternalLibraryStagingRoots,
  writeExternalLibraryStagingRoots,
} from "../external-library-staging-store";
import { externalLibraryStagingStorePath } from "../config/store-paths";
import { runtime } from "../runtime/app-runtime";

/**
 * Archive-backed external libraries are extracted into Main-owned temporary
 * directories. The Worker only receives the extracted root; these callbacks
 * ensure the archive contents do not remain on disk after the operation.
 */

// Archive-backed external libraries are extracted into Main-owned temporary
// directories. The Worker only receives the extracted root; these callbacks
// ensure the archive contents do not remain on disk after the operation.
const externalSourceCleanups = new Map<string, () => Promise<void>>();
const liveExternalLibraryStagingRoots = new Set<string>();

async function cleanupExternalSource(sourceRootPath: string | undefined): Promise<void> {
  if (!sourceRootPath) return;
  const cleanup = externalSourceCleanups.get(sourceRootPath);
  if (!cleanup) return;
  try {
    await cleanup();
    externalSourceCleanups.delete(sourceRootPath);
  } catch (error) {
    runtime.logger?.error("external-library.archive-cleanup", error);
  }
}

async function cleanupAllExternalSources(): Promise<void> {
  const sourceRoots = [...externalSourceCleanups.keys()];
  await Promise.all(sourceRoots.map((sourceRootPath) => cleanupExternalSource(sourceRootPath)));
}

async function sweepOrphanExternalLibraryStagingOnStartup(): Promise<void> {
  const storePath = externalLibraryStagingStorePath();
  const registered = readExternalLibraryStagingRoots(storePath, (error) => {
    runtime.logger?.error("external-library.staging-store.read", error);
  });
  try {
    const result = await sweepOrphanExternalLibraryStaging({
      registeredRoots: registered,
      searchParents: [tmpdir()],
      liveRoots: liveExternalLibraryStagingRoots,
    });
    writeExternalLibraryStagingRoots(storePath, result.remaining, (error) => {
      runtime.logger?.error("external-library.staging-store.write", error);
    });
    if (result.removed.length > 0) {
      runtime.logger?.info("external-library.staging-sweep", "Removed leftover extract directories.", {
        removedCount: result.removed.length,
      });
    }
    if (result.failed.length > 0) {
      runtime.logger?.error(
        "external-library.staging-sweep",
        new Error("Could not remove leftover extract directories."),
        { failedCount: result.failed.length },
      );
    }
  } catch (error) {
    runtime.logger?.error("external-library.staging-sweep", error);
  }
}

export { cleanupExternalSource, cleanupAllExternalSources, sweepOrphanExternalLibraryStagingOnStartup };
