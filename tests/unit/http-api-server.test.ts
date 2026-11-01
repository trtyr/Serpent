import { afterEach, describe, expect, it, vi } from "vitest";
import * as http from "node:http";

import {
  createHttpApiServer,
  HTTP_API_DEFAULT_PORT,
  type HttpApiServer,
} from "../../src/main/http-api-server";
import type { AutomationCommandGateway } from "../../src/automation/command-gateway";

type ServerFixture = { server: HttpApiServer; port: number; token: string };

const created: HttpApiServer[] = [];
let nextPort = HTTP_API_DEFAULT_PORT;

afterEach(async () => {
  while (created.length > 0) {
    await created.pop()!.close();
  }
});

async function startServer(gatewayOverrides: Partial<AutomationCommandGateway> = {}): Promise<ServerFixture> {
  const gateway = {
    execute: vi.fn(async () => ({ ok: true as const, result: { echoed: true }, historyEntryId: "history-1" })),
    ...gatewayOverrides,
  } as unknown as AutomationCommandGateway;
  const server = await createHttpApiServer({
    port: nextPort,
    token: "test-token-0123456789abcdef0123456789abcdef",
    appVersion: "0.0.0-test",
    gateway,
    getExecutionContext: () => ({ executionId: "exec-1" }) as never,
  });
  created.push(server);
  nextPort += 10;
  return { server, port: server.port, token: "test-token-0123456789abcdef0123456789abcdef" };
}

function request(port: number, method: string, path: string, token?: string, body?: unknown): Promise<{
  status: number;
  body: string;
}> {
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: "127.0.0.1",
      port,
      method,
      path,
      agent: new http.Agent({ keepAlive: false }),
      headers: {
        ...(token === undefined ? {} : { authorization: `Bearer ${token}` }),
        ...(body === undefined ? {} : { "content-type": "application/json" }),
      },
    }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks).toString("utf8") }));
    });
    req.on("error", reject);
    if (body !== undefined) req.write(JSON.stringify(body));
    req.end();
  });
}

describe("headless HTTP API server", () => {
  it("answers /ping without a token", async () => {
    const { port } = await startServer();
    const response = await request(port, "GET", "/ping");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.body)).toMatchObject({ app: "Serpent" });
  });

  it("rejects catalog and command requests without a bearer token", async () => {
    const { port } = await startServer();
    expect((await request(port, "GET", "/commands")).status).toBe(401);
    expect((await request(port, "POST", "/commands/asset.rating.set", undefined, {})).status).toBe(401);
    expect((await request(port, "GET", "/commands", "wrong-token")).status).toBe(401);
  });

  it("serves the command catalog, OpenAPI document and docs page with a valid token", async () => {
    const { port, token } = await startServer();
    const catalog = JSON.parse((await request(port, "GET", "/commands", token)).body);
    expect(catalog.apiVersion).toBe(1);
    expect(catalog.count).toBeGreaterThan(0);
    const first = catalog.commands[0];
    expect(first.toolName).toBeTruthy();
    expect(first.inputSchema).toBeTruthy();

    const openapi = JSON.parse((await request(port, "GET", "/openapi.json", token)).body);
    expect(openapi.openapi).toBe("3.1.0");
    expect(openapi.components.securitySchemes.bearerAuth.scheme).toBe("bearer");
    expect(Object.keys(openapi.paths).length).toBe(catalog.count);

    const docs = await request(port, "GET", "/docs", token);
    expect(docs.status).toBe(200);
    expect(docs.body).toContain("Serpent HTTP API");
  });

  it("executes a command through the gateway and reports a structured error for unknown commands", async () => {
    const execute: AutomationCommandGateway["execute"] = async () =>
      ({ ok: true as const, result: { echoed: true }, historyEntryId: "history-1" }) as unknown as Awaited<ReturnType<AutomationCommandGateway["execute"]>>;
    const executeSpy = vi.fn(execute);
    const { port, token } = await startServer({ execute: executeSpy });
    const ok = await request(port, "POST", "/commands/serpent_asset_metadata_set_many", token, {
      libraryId: "library-1",
      items: [{ assetId: "asset-1", expectedVersion: 0, rating: 5 }],
    });
    expect(ok.status).toBe(200);
    const payload = JSON.parse(ok.body);
    expect(payload).toMatchObject({ ok: true, executed: true, historyEntryId: "history-1" });
    expect(executeSpy).toHaveBeenCalledOnce();
    const envelope = (executeSpy.mock.calls[0] as unknown as [{ commandId: string; input: Record<string, unknown> }])[0];
    // The explicit libraryId is context targeting, not part of the command input.
    expect(envelope.commandId).toBe("asset.metadata.set-many");
    expect(envelope.input).not.toHaveProperty("libraryId");

    const missing = await request(port, "POST", "/commands/definitely_not_a_command", token, {});
    expect(missing.status).toBe(404);
    expect(JSON.parse(missing.body).code).toBe("API_COMMAND_NOT_FOUND");
  });

  it("surfaces gateway failures as structured HTTP errors", async () => {
    const { port, token } = await startServer({
      execute: async () => ({ ok: false as const, error: { code: "ASSET_NOT_FOUND", message: "gone" } }),
    } as Partial<AutomationCommandGateway>);
    const response = await request(port, "POST", "/commands/serpent_asset_metadata_set_many", token, {
      libraryId: "library-1",
      items: [{ assetId: "missing", expectedVersion: 0, rating: 3 }],
    });
    expect(response.status).toBe(404);
    expect(JSON.parse(response.body)).toMatchObject({ ok: false, code: "ASSET_NOT_FOUND" });
  });
});
