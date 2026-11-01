import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

/**
 * Headless Serpent has no application UI; the only browser page left is the
 * hidden offscreen model-thumbnail renderer (src/media-render/). This config
 * builds it into `.vite/renderer/main_window/` — the location Main resolves
 * via `packagedRendererOutDir()` — and keeps the Forge renderer entry name
 * `main_window` so the injected `MAIN_WINDOW_*` dev-server globals keep
 * working for the dev-mode page URL.
 */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  assetsInclude: ["**/*.hdr"],
  build: {
    rollupOptions: {
      input: {
        main_window: path.resolve(projectRoot, "offscreen-thumbnail.html"),
      },
    },
    outDir: path.resolve(projectRoot, ".vite/renderer/main_window"),
    emptyOutDir: true,
  },
});
