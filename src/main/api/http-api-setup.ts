import { app } from "electron";

import {
  createHttpApiServer,
  HTTP_API_DEFAULT_PORT,
  type HttpApiServer,
} from "../http-api-server";
import { readOrCreateApiToken } from "../api-token-store";
import { runtime } from "../runtime/app-runtime";
import {
  getAutomationCommandGateway,
  resolveOperatorExecutionContext,
} from "../automation/automation-setup";

/**
 * HTTP API startup: bearer-token provisioning and server bind. The token
 * holder is the operator; the server renews its operator execution
 * transparently when the wall-clock budget expires.
 */

let httpApiServer: HttpApiServer | undefined;

export function getHttpApiServer(): HttpApiServer | undefined {
  return httpApiServer;
}

export async function startHttpApiServer(): Promise<void> {
// Start the HTTP API server (the machine-facing surface).
try {
  const { token, created, filePath } = readOrCreateApiToken(app.getPath("userData"));
  if (created) {
    // First boot: surface the token in the log once so operators can grab it.
    runtime.logger?.info("http-api.token", "Generated a new API bearer token.", { filePath, token });
  } else {
    runtime.logger?.info("http-api.token", "API bearer token available.", { filePath });
  }
  const httpHost = process.env.SERPENT_HTTP_HOST === "0.0.0.0" ? "0.0.0.0" : "127.0.0.1";
  const configuredPort = Number(process.env.SERPENT_HTTP_PORT ?? "");
  httpApiServer = await createHttpApiServer({
    port: Number.isSafeInteger(configuredPort) && configuredPort > 0 ? configuredPort : HTTP_API_DEFAULT_PORT,
    host: httpHost,
    token,
    appVersion: app.getVersion(),
    gateway: getAutomationCommandGateway()!,
    getExecutionContext: () => resolveOperatorExecutionContext(),
    getLibraryChangeSequence: (libraryId) => runtime.libraryChangeSequences.get(libraryId),
    logger: {
      info: (scope, message, context) => runtime.logger?.info(scope, message, context),
      error: (scope, error, context) => runtime.logger?.error(scope, error, context),
    },
    onError: (err) => runtime.logger?.error("http-api", err),
  });
  runtime.logger?.info(
    "http-api",
    `HTTP API server started on ${httpHost}:${httpApiServer.port} (docs at /docs).`,
  );
} catch (error) {
  // API failure is non-fatal for boot, but the backend loses its primary
  // surface — log loudly.
  runtime.logger?.error("http-api", error);
}

}

export async function stopHttpApiServer(): Promise<void> {
  const close = httpApiServer?.close() ?? Promise.resolve();
  httpApiServer = undefined;
  await close.catch((error: unknown) => {
    runtime.logger?.error("http-api.close", error);
  });
}
