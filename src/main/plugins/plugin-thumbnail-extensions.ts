import type { PluginActivationCoordinator } from "../plugin-activation-coordinator";
import { runtime } from "../runtime/app-runtime";

/**
 * Thumbnail-provider extension sync: after plugin contributions change, tell
 * the Worker which file extensions have a live thumbnail provider per library.
 */

let pluginActivationCoordinatorRef: PluginActivationCoordinator | undefined;
export function setPluginActivationCoordinatorRef(ref: PluginActivationCoordinator | undefined): void {
  pluginActivationCoordinatorRef = ref;
}
function getPluginActivationCoordinator(): PluginActivationCoordinator | undefined {
  return pluginActivationCoordinatorRef;
}

/** Shared post-open hook for dialog opens and startup recent-library restore. */
function pluginThumbnailExtensionsFor(libraryId: string): string[] {
  const extensions = new Set<string>();
  for (const provider of getPluginActivationCoordinator()?.listActiveProviders(libraryId) ?? []) {
    if (provider.kind !== 'thumbnail') continue;
    for (const raw of provider.extensions ?? []) {
      const extension = raw.replace(/^\./u, '').toLowerCase();
      if (/^[a-z0-9][a-z0-9+_-]*$/u.test(extension)) extensions.add(extension);
    }
  }
  return [...extensions];
}

async function syncPluginThumbnailExtensions(): Promise<void> {
  const client = runtime.workerClient;
  if (!client) return;
  const listed = await client.request({ type: 'library.list' });
  if (!listed.ok || listed.type !== 'library.list') return;
  for (const library of listed.libraries) {
    client.publishPluginThumbnailExtensions(
      library.libraryId,
      pluginThumbnailExtensionsFor(library.libraryId),
    );
  }
}

export { syncPluginThumbnailExtensions };
