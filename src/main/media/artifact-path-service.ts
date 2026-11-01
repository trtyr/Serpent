import { ArtifactPathCache } from "../artifact-path-cache";
import { runtime } from "../runtime/app-runtime";

/**
 * Main-owned LRU + request coalescing for worker-authorized artifact paths.
 * The serpent:// protocol resolves every preview/proxy through here.
 */

type ArtifactPathBatchWaiter = {
  artifactId: string;
  generation: number;
  resolve: (absolutePath: string) => void;
  reject: (error: Error) => void;
};
const artifactPathBatches = new Map<string, ArtifactPathBatchWaiter[]>();
const artifactPathCache = new ArtifactPathCache(4_096);

export function invalidateArtifactPath(libraryId: string, artifactId: string, usage: "preview" | "proxy"): void {
  artifactPathCache.invalidateArtifact(libraryId, artifactId, usage);
}

export function evictArtifactPathCache(libraryId: string): void {
  artifactPathCache.evictLibrary(libraryId);
}

export function resolveArtifactPathBatched(
  libraryId: string,
  artifactId: string,
  usage: "preview" | "proxy",
): Promise<string> {
  const generation = artifactPathCache.generation(libraryId);
  const cached = artifactPathCache.get(libraryId, artifactId, usage, generation);
  if (cached !== undefined) {
    // A lookup hit is also a use: keep hot viewport artifacts at the MRU end
    // of the bounded cache instead of evicting them after unrelated pages.
    return Promise.resolve(cached);
  }
  // Keep requests from different library generations in separate batches. A
  // reopen can happen while the 2ms coalescing window is still pending.
  const key = `${libraryId}\u0000${usage}\u0000${generation}`;
  return new Promise<string>((resolve, reject) => {
    const batch = artifactPathBatches.get(key) ?? [];
    batch.push({ artifactId, generation, resolve, reject });
    artifactPathBatches.set(key, batch);
    if (batch.length > 1) return;
    setTimeout(() => {
      const pending = artifactPathBatches.get(key) ?? [];
      artifactPathBatches.delete(key);
      const client = runtime.workerClient;
      if (!client) {
        const error = new Error("Library Worker is unavailable.");
        for (const waiter of pending) waiter.reject(error);
        return;
      }
      void (async () => {
        for (let index = 0; index < pending.length; index += 500) {
          const chunk = pending.slice(index, index + 500);
          const requestGeneration = chunk[0]?.generation ?? generation;
          try {
            const result = await client.request({
              type: "media.get-artifact-paths",
              libraryId,
              artifactIds: chunk.map((waiter) => waiter.artifactId),
              usage,
            });
            if (!result.ok || result.type !== "media.artifact-paths") {
              throw new Error("Artifact path batch lookup failed.");
            }
            const paths = new Map(
              result.entries.map((entry) => [entry.artifactId, entry.absolutePath]),
            );
            for (const waiter of chunk) {
              const absolutePath = paths.get(waiter.artifactId);
              if (
                absolutePath &&
                artifactPathCache.generation(libraryId) === requestGeneration
              ) {
                artifactPathCache.set(
                  libraryId,
                  waiter.artifactId,
                  usage,
                  absolutePath,
                  requestGeneration,
                );
                waiter.resolve(absolutePath);
              } else if (absolutePath) {
                waiter.reject(new Error("Artifact path resolution became stale."));
              } else {
                artifactPathCache.invalidateArtifact(libraryId, waiter.artifactId, usage);
                waiter.reject(new Error("Artifact was absent from path batch."));
              }
            }
          } catch (error) {
            const failure = error instanceof Error ? error : new Error(String(error));
            for (const waiter of chunk) waiter.reject(failure);
          }
        }
      })();
    }, 2);
  });
}
