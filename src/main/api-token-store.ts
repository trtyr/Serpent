import { randomBytes, timingSafeEqual } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Bearer token for the headless HTTP API.
 *
 * The token is generated on first boot and persisted under userData. It never
 * travels over the API itself; operators read it from disk (or the boot log on
 * first generation) and send it as `Authorization: Bearer <token>`.
 */

export function apiTokenPath(userDataDirectory: string): string {
  return path.join(userDataDirectory, "api-token");
}

export function readOrCreateApiToken(userDataDirectory: string): {
  token: string;
  created: boolean;
  filePath: string;
} {
  const filePath = apiTokenPath(userDataDirectory);
  if (existsSync(filePath)) {
    const existing = readFileSync(filePath, "utf8").trim();
    if (existing.length >= 32) {
      return { token: existing, created: false, filePath };
    }
  }
  const token = randomBytes(32).toString("hex");
  writeFileSync(filePath, `${token}\n`, "utf8");
  return { token, created: true, filePath };
}

export function constantTimeTokenEquals(presented: string, expected: string): boolean {
  const a = Buffer.from(presented, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
