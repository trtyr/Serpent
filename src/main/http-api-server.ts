import * as http from "node:http";
import { z } from "zod";

import {
  automationCommandRegistry,
  AUTOMATION_API_VERSION,
  type AutomationCommandDescriptor,
} from "../automation/command-registry";
import type { AutomationCommandGateway, AutomationExecutionContext } from "../automation/command-gateway";
import { normalizeAutomationAssetSearchInput } from "./normalize-automation-asset-search-input";
import { constantTimeTokenEquals } from "./api-token-store";

/**
 * Headless HTTP API — the machine-facing surface of Serpent.
 *
 * Every public automation command (src/automation/command-registry.ts) is
 * exposed as `POST /commands/{toolName}` behind a Bearer token. The catalog is
 * self-describing: `GET /openapi.json` serves an OpenAPI 3.1 document and
 * `GET /docs` a human-readable page, both generated from the same registry.
 *
 * The previous MCP surface was removed; this server replaces it one-to-one on
 * the execution layer (same Gateway, journal and audit trail), with a plain
 * token in place of per-client credentials and permission prompts. A token
 * holder is the operator: commands run to completion without interactive
 * approval. Dangerous commands still return the structured two-phase
 * challenge payload when the Gateway demands it.
 */

export const HTTP_API_DEFAULT_PORT = 19_880;
const MAX_BODY_BYTES = 10 * 1024 * 1024;
const MAX_PORT_PROBES = 10;

export interface HttpApiLogger {
  info(scope: string, message: string, context?: Record<string, unknown>): void;
  error(scope: string, error: unknown, context?: Record<string, unknown>): void;
}

export interface HttpApiServerOptions {
  /** Starting port; falls back to port+1.. on EADDRINUSE (extension-server convention). */
  port: number;
  host?: string;
  token: string;
  appVersion: string;
  gateway: AutomationCommandGateway;
  /** Long-lived operator execution created by Main at boot. */
  getExecutionContext: () => AutomationExecutionContext | undefined;
  getLibraryChangeSequence?: (libraryId: string) => number | undefined;
  logger?: HttpApiLogger;
  /** Optional error callback for server-level errors (e.g. bind failure). */
  onError?: (error: Error) => void;
}

export interface HttpApiServer {
  port: number;
  server: http.Server;
  close(): Promise<void>;
}

type JsonSchemaRecord = Record<string, unknown>;

let catalogCache: CatalogEntry[] | undefined;

type CatalogEntry = {
  descriptor: AutomationCommandDescriptor;
  toolName: string;
};

function catalog(): CatalogEntry[] {
  if (catalogCache === undefined) {
    catalogCache = automationCommandRegistry
      .filter((descriptor) => descriptor.api.public)
      .map((descriptor) => ({ descriptor, toolName: descriptor.api.toolName }));
  }
  return catalogCache;
}

function findCommand(toolName: string): CatalogEntry | undefined {
  return catalog().find((entry) => entry.toolName === toolName);
}

function libraryContextFor(descriptor: AutomationCommandDescriptor): "none" | "active" | "transition" {
  if (descriptor.libraryContext !== undefined) return descriptor.libraryContext;
  return descriptor.targetScope === "library"
    || descriptor.targetScope === "asset"
    || descriptor.targetScope === "asset-set"
    || descriptor.targetScope === "job-set"
    ? "active"
    : "none";
}

function writeJson(response: http.ServerResponse, status: number, payload: unknown): void {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(body);
}

function readBody(request: http.IncomingMessage, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;
    request.on("data", (chunk: Buffer) => {
      total += chunk.length;
      if (total > MAX_BODY_BYTES) {
        reject(new Error("API_REQUEST_BODY_TOO_LARGE"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
    signal.addEventListener("abort", () => {
      reject(new Error("API_REQUEST_ABORTED"));
    }, { once: true });
  });
}

function tokenFromRequest(request: http.IncomingMessage): string | null {
  const header = request.headers.authorization;
  if (typeof header === "string") {
    const match = /^Bearer\s+(.+)$/i.exec(header.trim());
    if (match) return match[1]!.trim();
  }
  const alternative = request.headers["x-serpent-token"];
  if (typeof alternative === "string" && alternative.trim().length > 0) {
    return alternative.trim();
  }
  return null;
}

function requestAuthorized(request: http.IncomingMessage, token: string): boolean {
  const presented = tokenFromRequest(request);
  return presented !== null && constantTimeTokenEquals(presented, token);
}

const RETRYABLE_GATEWAY_CODES = new Set([
  "LIBRARY_BUSY",
  "AUTOMATION_LIBRARY_CONTEXT_BUSY",
]);

function httpStatusForGatewayCode(code: string): number {
  if (RETRYABLE_GATEWAY_CODES.has(code)) return 503;
  if (code.endsWith("_NOT_FOUND") || code === "LIBRARY_NOT_FOUND" || code === "ASSET_NOT_FOUND") return 404;
  if (code.includes("INVALID") || code.endsWith("_VALIDATION")) return 422;
  if (code.includes("VERSION_CONFLICT") || code.endsWith("_CONFLICT")) return 409;
  if (code === "AUTOMATION_EXECUTION_LIMIT_REACHED") return 429;
  return 400;
}

/** Inject `libraryId` into the generated schema for library-scoped commands. */
function injectLibraryId(schema: JsonSchemaRecord, descriptor: AutomationCommandDescriptor): JsonSchemaRecord {
  if (libraryContextFor(descriptor) !== "active") return schema;
  const props = (schema.properties ?? {}) as JsonSchemaRecord;
  if (props.libraryId !== undefined) return schema;
  const required = Array.isArray(schema.required) ? [...schema.required] : undefined;
  return {
    ...schema,
    properties: {
      libraryId: {
        type: "string",
        description: "Target library ID (required for library-scoped commands). Use serpent_library_list_open to discover.",
      },
      ...props,
    },
    required: ["libraryId", ...(required ?? [])],
  };
}

function inputSchemaToJsonSchema(descriptor: AutomationCommandDescriptor): JsonSchemaRecord {
  const schema = descriptor.api.inputSchema ?? descriptor.inputSchema;
  try {
    const raw = z.toJSONSchema(schema, { io: "input" }) as JsonSchemaRecord;
    return injectLibraryId(raw, descriptor);
  } catch {
    const stub: JsonSchemaRecord = { type: "object", additionalProperties: true };
    return injectLibraryId(stub, descriptor);
  }
}

// ── OpenAPI / docs generation (needs bound host for servers URL) ─────────

function buildOpenApiDocument(host: string, port: number, appVersion: string): JsonSchemaRecord {
  const baseUrl = host === "0.0.0.0" || host === "::"
    ? `http://127.0.0.1:${port}`  // wildcard binding → use loopback in spec (client connects to their own host)
    : `http://${host}:${port}`;

  const paths: JsonSchemaRecord = {};

  // Infrastructure endpoints
  paths["/ping"] = {
    get: {
      operationId: "ping",
      summary: "Liveness probe (no auth required)",
      responses: { "200": { description: "Service is alive" } },
    },
  };
  paths["/commands"] = {
    get: {
      operationId: "list_commands",
      summary: "JSON catalog of all available commands with input schemas",
      tags: ["meta"],
      responses: { "200": { description: "Command catalog" } },
    },
  };
  paths["/openapi.json"] = {
    get: {
      operationId: "get_openapi_spec",
      summary: "OpenAPI 3.1 specification (this document)",
      tags: ["meta"],
      responses: { "200": { description: "OpenAPI 3.1 JSON" } },
    },
  };
  paths["/docs"] = {
    get: {
      operationId: "get_docs",
      summary: "Human-readable HTML documentation",
      tags: ["meta"],
      responses: { "200": { description: "HTML page" } },
    },
  };

  // Command endpoints
  for (const { descriptor, toolName } of catalog()) {
    paths[`/commands/${toolName}`] = {
      post: {
        operationId: toolName,
        summary: descriptor.summary,
        tags: [...descriptor.requiredCapabilities],
        "x-command-id": descriptor.commandId,
        "x-impact": descriptor.impact,
        "x-atomicity": descriptor.atomicity,
        "x-allowed-sources": ["http"],
        ...(descriptor.criticalOperation === true ? { "x-critical-operation": true } : {}),
        ...(descriptor.libraryContext !== undefined
          ? { "x-library-context": descriptor.libraryContext }
          : libraryContextFor(descriptor) !== "none"
            ? { "x-library-context": libraryContextFor(descriptor) }
            : {}),
        requestBody: {
          required: true,
          content: { "application/json": { schema: inputSchemaToJsonSchema(descriptor) } },
        },
        responses: {
          "200": { description: "Command executed (or returned a structured challenge)." },
          "4XX": { description: "Structured gateway error; body carries { ok: false, code, message }." },
        },
      },
    };
  }

  return {
    openapi: "3.1.0",
    info: {
      title: "Serpent HTTP API",
      version: appVersion,
      description: `Full headless API of the Serpent asset backend (automation API v${AUTOMATION_API_VERSION}). `
        + "Authenticate every request with `Authorization: Bearer <token>`; the token lives in the `api-token` file under the Serpent data directory.",
    },
    servers: [{ url: baseUrl }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer" },
      },
    },
    security: [{ bearerAuth: [] }],
    paths,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildDocsPage(host: string, port: number, appVersion: string): string {
  const rows = catalog().map(({ descriptor, toolName }) => {
    const risk = descriptor.criticalOperation === true ? "critical" : descriptor.impact;
    const libCtx = libraryContextFor(descriptor);
    const libNote = libCtx === "active" ? " (需 libraryId)" : "";
    return [
      "    <tr>",
      `      <td><code>POST /commands/${escapeHtml(toolName)}</code></td>`,
      `      <td>${escapeHtml(descriptor.summary)}${libNote}</td>`,
      `      <td>${escapeHtml([...descriptor.requiredCapabilities].join(", "))}</td>`,
      `      <td>${escapeHtml(risk)}</td>`,
      "    </tr>",
    ].join("\n");
  }).join("\n");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Serpent HTTP API 文档</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; color: #1a1c1f; }
    code { background: #f2f3f5; padding: 0.1rem 0.35rem; border-radius: 4px; }
    table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
    th, td { border: 1px solid #d9dbe0; padding: 0.45rem 0.6rem; text-align: left; vertical-align: top; }
    th { background: #f2f3f5; }
    .auth { background: #eef4ff; border: 1px solid #b9cfF7; padding: 0.8rem 1rem; border-radius: 8px; }
    .endpoint { margin-top: 0.5rem; }
  </style>
</head>
<body>
  <h1>Serpent HTTP API <small style="font-weight:normal">v${escapeHtml(appVersion)} (automation API v${AUTOMATION_API_VERSION})</small></h1>
  <div class="auth">
    <p><strong>认证</strong>：除 <code>GET /ping</code> 外，所有请求（含本页）均需携带
    <code>Authorization: Bearer &lt;token&gt;</code>（或 <code>X-Serpent-Token</code> 头），否则返回 401。
    Token 在首次启动时生成，存放于 Serpent 数据目录的 <code>api-token</code> 文件。</p>
    <p><strong>基础设施端点</strong>：</p>
    <div class="endpoint">
      <code>GET /ping</code> — 存活探针（免认证）<br/>
      <code>GET /commands</code> — JSON 命令目录（含 inputSchema）<br/>
      <code>GET /openapi.json</code> — OpenAPI 3.1 规范<br/>
      <code>GET /docs</code> — 本页
    </div>
  </div>
  <h2>命令目录（${catalog().length}）</h2>
  <p>标注 <em>(需 libraryId)</em> 的命令必须在请求体中传入 <code>libraryId</code> 字段。</p>
  <table>
    <thead><tr><th>路由</th><th>说明</th><th>能力</th><th>影响</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
</body>
</html>
`;
}

function buildCatalogJson(): JsonSchemaRecord {
  return {
    apiVersion: AUTOMATION_API_VERSION,
    count: catalog().length,
    commands: catalog().map(({ descriptor, toolName }) => ({
      toolName,
      commandId: descriptor.commandId,
      summary: descriptor.summary,
      requiredCapabilities: [...descriptor.requiredCapabilities],
      impact: descriptor.impact,
      atomicity: descriptor.atomicity,
      supportsBatch: descriptor.supportsBatch,
      supportsDryRun: descriptor.supportsDryRun,
      supportsIdempotencyKey: descriptor.supportsIdempotencyKey,
      ...(descriptor.criticalOperation === true ? { criticalOperation: true } : {}),
      ...(descriptor.libraryContext !== undefined
        ? { libraryContext: descriptor.libraryContext }
        : libraryContextFor(descriptor) !== "none"
          ? { libraryContext: libraryContextFor(descriptor) }
          : {}),
      inputSchema: inputSchemaToJsonSchema(descriptor),
    })),
  };
}

/**
 * Executes one command envelope. Mirrors the execution semantics of the
 * removed MCP call path: explicit library targeting, stateless context
 * overrides, structured challenge passthrough, output budgets and the
 * retryable-code contract.
 */
async function executeCommand(
  entry: CatalogEntry,
  rawBody: string,
  options: HttpApiServerOptions,
  signal: AbortSignal,
): Promise<{ status: number; payload: JsonSchemaRecord }> {
  const context = options.getExecutionContext();
  if (context === undefined || context.executionId.trim().length === 0) {
    return { status: 503, payload: { ok: false, code: "API_EXECUTION_UNAVAILABLE", message: "The automation execution context is not ready." } };
  }
  let parsedBody: unknown = {};
  const trimmed = rawBody.trim();
  if (trimmed.length > 0) {
    try {
      parsedBody = JSON.parse(trimmed);
    } catch {
      return { status: 400, payload: { ok: false, code: "API_INVALID_JSON", message: "The request body is not valid JSON." } };
    }
  }
  if (parsedBody === null || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
    return { status: 422, payload: { ok: false, code: "API_INVALID_INPUT", message: "The command input must be a JSON object." } };
  }
  const rawRecord = parsedBody as Record<string, unknown>;
  const { descriptor, toolName } = entry;

  let explicitLibraryId: string | undefined;
  let commandArguments: unknown = rawRecord;
  if (libraryContextFor(descriptor) === "active") {
    if (typeof rawRecord.libraryId !== "string" || rawRecord.libraryId.trim().length === 0) {
      return {
        status: 422,
        payload: {
          ok: false,
          code: "API_LIBRARY_TARGET_REQUIRED",
          message: `Command ${toolName} requires an explicit libraryId. Use serpent_library_list_open or serpent_library_create first.`,
        },
      };
    }
    explicitLibraryId = rawRecord.libraryId.trim();
    commandArguments = Object.fromEntries(Object.entries(rawRecord).filter(([key]) => key !== "libraryId"));
  }
  if (descriptor.commandId === "asset.search") {
    commandArguments = normalizeAutomationAssetSearchInput(commandArguments) ?? commandArguments;
  }

  let gatewayResult: Awaited<ReturnType<AutomationCommandGateway["execute"]>>;
  try {
    gatewayResult = await options.gateway.execute({
      apiVersion: AUTOMATION_API_VERSION,
      commandId: descriptor.commandId,
      executionId: context.executionId,
      input: commandArguments,
    }, {
      ...(signal === undefined ? {} : { signal }),
      contextOverrides: {
        ...(explicitLibraryId === undefined ? {} : { libraryId: explicitLibraryId }),
        stateless: true,
      },
    });
  } catch (error) {
    options.logger?.error("http-api.gateway-threw", error, { commandId: descriptor.commandId });
    return { status: 500, payload: { ok: false, code: "API_GATEWAY_FAILURE", message: "The command execution crashed." } };
  }

  if (!gatewayResult.ok) {
    if ("challenge" in gatewayResult && gatewayResult.challenge !== undefined) {
      return {
        status: 200,
        payload: {
          ok: true,
          executed: false,
          commandId: descriptor.commandId,
          challenge: gatewayResult.challenge,
        },
      };
    }
    const gatewayError = (gatewayResult as { error: { code: string; message?: string; currentEntityVersion?: number } }).error;
    return {
      status: httpStatusForGatewayCode(gatewayError.code),
      payload: {
        ok: false,
        code: gatewayError.code,
        message: gatewayError.message ?? gatewayError.code,
        ...(RETRYABLE_GATEWAY_CODES.has(gatewayError.code) ? { retryable: true } : {}),
        ...(gatewayError.currentEntityVersion === undefined ? {} : { currentVersion: gatewayError.currentEntityVersion }),
        ...(explicitLibraryId === undefined ? {} : { libraryId: explicitLibraryId }),
      },
    };
  }

  const serialized = JSON.stringify(gatewayResult.result) ?? "null";
  const maxOutputBytes = context.resourceBudget?.maxOutputBytes ?? 1024 * 1024;
  if (Buffer.byteLength(serialized, "utf8") > maxOutputBytes) {
    return { status: 413, payload: { ok: false, code: "API_OUTPUT_LIMIT_EXCEEDED", message: "The command result exceeds the execution output budget." } };
  }
  const libraryChangeSequence = explicitLibraryId === undefined
    || options.getLibraryChangeSequence === undefined
    ? undefined
    : options.getLibraryChangeSequence(explicitLibraryId);
  return {
    status: 200,
    payload: {
      ok: true,
      executed: true,
      commandId: descriptor.commandId,
      result: gatewayResult.result,
      ...(gatewayResult.historyEntryId === undefined ? {} : { historyEntryId: gatewayResult.historyEntryId }),
      ...(explicitLibraryId === undefined ? {} : { libraryId: explicitLibraryId }),
      ...(libraryChangeSequence === undefined ? {} : { libraryChangeSequence }),
      ...(gatewayResult.undoGroupId === undefined ? {} : { undoGroupId: gatewayResult.undoGroupId }),
    },
  };
}

export async function createHttpApiServer(options: HttpApiServerOptions): Promise<HttpApiServer> {
  const host = options.host ?? "127.0.0.1";

  const server = http.createServer((request, response) => {
    void handleRequest(request, response).catch((error: unknown) => {
      options.logger?.error("http-api.request", error);
      if (!response.headersSent) {
        writeJson(response, 500, { ok: false, code: "API_INTERNAL_ERROR", message: "Internal error." });
      } else {
        response.end();
      }
    });
  });

  async function handleRequest(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
    const method = request.method ?? "GET";
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    const pathname = url.pathname.replace(/\/+$/u, "") || "/";

    if (method === "GET" && pathname === "/ping") {
      writeJson(response, 200, { app: "Serpent", version: options.appVersion, apiVersion: AUTOMATION_API_VERSION });
      return;
    }
    if (!requestAuthorized(request, options.token)) {
      writeJson(response, 401, {
        ok: false,
        code: "API_UNAUTHORIZED",
        message: "Missing or invalid bearer token. Send Authorization: Bearer <token> (see GET /docs).",
      });
      return;
    }

    if (method === "GET" && pathname === "/openapi.json") {
      writeJson(response, 200, buildOpenApiDocument(host, options.port, options.appVersion));
      return;
    }
    if (method === "GET" && pathname === "/docs") {
      response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
      response.end(buildDocsPage(host, options.port, options.appVersion));
      return;
    }
    if (method === "GET" && pathname === "/commands") {
      writeJson(response, 200, buildCatalogJson());
      return;
    }

    const commandMatch = /^\/commands\/([^/]+)$/u.exec(pathname);
    if (commandMatch !== null) {
      if (method !== "POST") {
        response.setHeader("Allow", "POST");
        writeJson(response, 405, { ok: false, code: "API_METHOD_NOT_ALLOWED", message: "Commands are executed with POST." });
        return;
      }
      const entry = findCommand(decodeURIComponent(commandMatch[1]!));
      if (entry === undefined) {
        writeJson(response, 404, { ok: false, code: "API_COMMAND_NOT_FOUND", message: "Unknown command. See GET /commands for the catalog." });
        return;
      }
      const abortController = new AbortController();
      request.on("aborted", () => abortController.abort());
      response.on("close", () => abortController.abort());
      let body: string;
      try {
        body = await readBody(request, abortController.signal);
      } catch (error) {
        const code = error instanceof Error ? error.message : "API_REQUEST_READ_FAILED";
        if (code === "API_REQUEST_BODY_TOO_LARGE") {
          writeJson(response, 413, { ok: false, code, message: "The request body exceeds 10 MiB." });
          return;
        }
        if (!response.writableEnded) {
          writeJson(response, 400, { ok: false, code: "API_REQUEST_READ_FAILED", message: "The request body could not be read." });
        }
        return;
      }
      if (abortController.signal.aborted) return;
      const outcome = await executeCommand(entry, body, options, abortController.signal);
      if (!response.writableEnded) writeJson(response, outcome.status, outcome.payload);
      return;
    }

    writeJson(response, 404, { ok: false, code: "API_NOT_FOUND", message: "Unknown route. See GET /docs." });
  }

  await new Promise<void>((resolve, reject) => {
    let attempts = 0;
    const attemptListen = (port: number): void => {
      attempts += 1;
      server.once("error", (error: NodeJS.ErrnoException) => {
        server.removeAllListeners("error");
        if (error.code === "EADDRINUSE" && attempts <= MAX_PORT_PROBES) {
          attemptListen(port + 1);
          return;
        }
        options.onError?.(error);
        reject(error);
      });
      server.listen(port, host, () => {
        server.removeAllListeners("error");
        options.port = server.address() && typeof server.address() === "object"
          ? (server.address() as { port: number }).port
          : port;
        resolve();
      });
    };
    attemptListen(options.port);
  });

  const close = async (): Promise<void> => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  };
  return {
    get port() { return options.port; },
    server,
    close,
  };
}
