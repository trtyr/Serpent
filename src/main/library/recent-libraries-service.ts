import {
  clearActiveRecentLibrary,
  readActiveLibraryPath,
  readRecentLibraryEntries,
  recentLibraryAutoOpenEnabled,
  rememberRecentLibrary,
  removeRecentLibrary,
} from "../recent-libraries";
import { recentLibraryPath } from "../config/store-paths";
import { runtime } from "../runtime/app-runtime";

/** Recent-library store access + the headless startup auto-open flow. */

export function readRecentLibrariesForAutoOpen(): { path: string; name: string; libraryId?: string }[] {
  return readRecentLibraryEntries(recentLibraryPath(), (error) => {
    runtime.logger?.error("recent-library.read", error);
  }).map((entry) => ({ path: entry.path, name: entry.name }));
}

export function rememberOpenedLibrary(libraryPath: string, displayName: string, libraryId?: string): void {
  rememberRecentLibrary(
    recentLibraryPath(),
    { path: libraryPath, name: displayName, ...(libraryId === undefined ? {} : { libraryId }) },
    {
      onError: (error) => {
        runtime.logger?.error("recent-library.write", error);
      },
    },
  );
}

export function forgetRecentLibrary(libraryPath: string): void {
  removeRecentLibrary(recentLibraryPath(), libraryPath, (error) => {
    runtime.logger?.error('recent-library.remove', error);
  });
}

export function clearActiveRecentLibraryPath(): void {
  clearActiveRecentLibrary(recentLibraryPath(), (error) => {
    runtime.logger?.error('recent-library.clear', error);
  });
}

export function readRecentLibraryById(libraryId: string): { path: string; name: string; libraryId?: string } | undefined {
  return readRecentLibraryEntries(recentLibraryPath(), (error) => {
    runtime.logger?.error('recent-library.read', error);
  }).find((entry) => entry.libraryId === libraryId);
}

export function readActiveRecentLibraryPath(): string | null {
  return readActiveLibraryPath(recentLibraryPath(), (error) => {
    runtime.logger?.error("recent-library.read", error);
  });
}

export { recentLibraryAutoOpenEnabled };
