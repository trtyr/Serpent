import { randomUUID } from "node:crypto";

import type { AppLogger } from "../app-logger";
import type { LibraryWorkerClient } from "../worker-client";
import type { HttpApiServer } from "../http-api-server";

/**
 * Shared mutable main-process state.
 *
 * Before the modular split this lived as module-level `let` bindings in
 * index.ts. Domains now import `runtime` explicitly; everything is populated
 * during `startApplication` and torn down by the app lifecycle hooks.
 */
export const runtime = {
  /** Stable id for this main-process session, echoed to the worker. */
  sessionId: randomUUID(),
  logger: undefined as AppLogger | undefined,
  appLogPath: undefined as string | undefined,
  workerClient: undefined as LibraryWorkerClient | undefined,
  /** Latest worker change sequence per library, echoed on HTTP API responses. */
  libraryChangeSequences: new Map<string, number>(),
  httpApiServer: undefined as HttpApiServer | undefined,
  /** Set when the HTTP API (or any loopback listener) has been released. */
  loopbackRelease: undefined as Promise<void> | undefined,
  // Shutdown coordination.
  quitAfterShutdown: false,
  applicationQuitting: false,
  applicationShutdownPromise: null as Promise<void> | null,
};

export function getLogger(): AppLogger | undefined {
  return runtime.logger;
}

export function requireWorkerClient(): LibraryWorkerClient | undefined {
  return runtime.workerClient;
}
