import { tmpdir } from "node:os";
import path from "node:path";
import { mkdirSync } from "node:fs";

import { app, protocol } from "electron";

import { serpentProtocolSchemes } from "./serpent-protocol-privileges";
import { registerAppLifecycle } from "./runtime/app-lifecycle";

// Serpent-tluf: must run before app ready.
app.setName("Serpent");

// Headless E2E hosts may expose no hardware WebGL implementation. Opt those
// tests into Chromium's explicitly acknowledged software path; production
// keeps the platform's normal GPU selection and never silently downgrades it.
// SERPENT_SOFTWARE_GL=1 is the same explicit opt-in for users on GPU-less
// hosts (Linux VMs / remote desktops without a usable GL driver), so the
// offscreen model thumbnails can render via SwiftShader. Off by default.
if (
  (process.env.SERPENT_E2E === "1" &&
    process.env.SERPENT_E2E_ENABLE_SWIFTSHADER === "1") ||
  process.env.SERPENT_SOFTWARE_GL === "1"
) {
  app.commandLine.appendSwitch("enable-unsafe-swiftshader");
  app.commandLine.appendSwitch("use-angle", "swiftshader");
}

if (process.env.SERPENT_E2E === "1") {
  const explicitUserDataPath = process.env.SERPENT_E2E_USER_DATA_PATH;
  app.setPath(
    "userData",
    explicitUserDataPath && path.isAbsolute(explicitUserDataPath)
      ? explicitUserDataPath
      : path.join(tmpdir(), "serpent-e2e-user-data", String(process.pid)),
  );
  if (process.env.SERPENT_E2E_APP_UPDATE_FIXTURE === "1") {
    for (const [pathName, environmentName] of [
      ["downloads", "SERPENT_E2E_DOWNLOADS_PATH"],
      ["temp", "SERPENT_E2E_TEMP_PATH"],
    ] as const) {
      const configuredPath = process.env[environmentName];
      if (configuredPath && path.isAbsolute(configuredPath)) {
        mkdirSync(configuredPath, { recursive: true });
        app.setPath(pathName, configuredPath);
      }
    }
  }
}

// Dev multi-instance (Serpent-i6xg): isolate userData so SingletonLock / prefs
// do not collide. Prefer `npm run start:multi`. Do not open the same library
// for writes from two backends — SQLite write coordination is a CLI/desktop
// lease territory (ADR-0021).
const allowMultiInstance = process.env.SERPENT_ALLOW_MULTI_INSTANCE === "1";
if (allowMultiInstance && process.env.SERPENT_E2E !== "1") {
  app.setPath(
    "userData",
    path.join(app.getPath("userData"), "dev-instances", `pid-${process.pid}`),
  );
}

// Before app.ready: stream privilege is required for seekable <video>/<audio>
// over serpent:// Range responses (Serpent-jh2).
protocol.registerSchemesAsPrivileged(serpentProtocolSchemes());

// E2E（本地/CI）：虚拟化 runner 的 GPU 不可靠，白屏会让所有交互测试
// 超时。禁用硬件加速换取稳定渲染。
if (
  process.env.SERPENT_E2E === "1" &&
  process.env.SERPENT_E2E_ENABLE_SWIFTSHADER !== "1"
) {
  app.disableHardwareAcceleration();
}

app.enableSandbox();

registerAppLifecycle();
