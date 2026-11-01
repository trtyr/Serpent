import { app, protocol } from "electron";

import { APP_ASSET_HOST, createAppAssetResponse } from "../app-assets";
import { createArtifactResponse } from "../artifact-response";
import {
  bindLibraryMediaReadSignal,
  isLibraryMediaReadBlocked,
} from "../library-media-reads";
import { resolvePendingImportFrame } from "../pending-import-frame";
import { resolveFontSampleRequest, createFontSamplePage } from "../font-sample-page";
import { resolveModelThumbnailSourceAuthorization } from "../model-thumbnail-source-cache";
import path from "node:path";
import { artifactProtocolMimeForExtension } from "../../shared/media-formats";
import { invalidateArtifactPath, resolveArtifactPathBatched } from "../media/artifact-path-service";
import { getPreviewCache } from "../media/preview-cache-service";
import { SourcePathCache, type SourcePathResolution } from "../source-path-cache";

const sourcePathCache = new SourcePathCache();
import { pendingImageSequenceOffers } from "../library/image-sequence-offers";
import { runtime } from "../runtime/app-runtime";

const VIEWER_TIMING_LOG = process.env.SERPENT_VIEWER_TIMING_LOG === "1";

/**
 * The serpent:// custom protocol: serves thumbnail/preview artifacts, asset
 * sources, folder covers, import-frame previews and bundled app assets
 * (HDRI environments for the offscreen thumbnail renderer) to any local
 * consumer of the backend.
 */

export function registerSerpentProtocol(): void {
protocol.handle("serpent", async (request) => {
  try {
    const url = new URL(request.url);
    if (url.hostname === APP_ASSET_HOST) {
      // Bundled app assets (e.g. .hdr environment maps) that the packaged
      // renderer cannot fetch via file:// (three r185 loaders use fetch).
      // Whitelist + receipt verification live in src/main/app-assets.ts.
      const response = createAppAssetResponse({
        route: url.pathname,
        appPath: app.getAppPath(),
        isPackaged: app.isPackaged,
      });
      if (!response) {
        runtime.logger?.info(
          "serpent-protocol.app-asset-missing",
          "Rejected unknown or unverified app-asset route.",
          { route: url.pathname },
        );
        return new Response("App asset not found", { status: 404 });
      }
      return response;
    }
    if (url.hostname === "folder-cover") {
      const folderLibraryId = decodeURIComponent(url.pathname.replace(/^\/+/, "").split("/")[0] ?? "");
      const folderId = url.searchParams.get("folder") ?? "";
      if (
        !folderLibraryId
        || !folderId
        || folderId.length > 4096
        || folderLibraryId.includes("..")
        || folderId.includes("\0")
      ) {
        return new Response("Invalid folder cover", { status: 400 });
      }
      if (isLibraryMediaReadBlocked(folderLibraryId)) {
        return new Response("Library unavailable", { status: 410 });
      }
      if (!runtime.workerClient) return new Response("Worker unavailable", { status: 503 });
      try {
        const resolved = await runtime.workerClient!.request({
          type: "folder.cover.resolve",
          libraryId: folderLibraryId,
          folderId,
        });
        if (!resolved.ok || resolved.type !== "folder.cover.resolved") {
          return new Response("Folder cover not found", { status: 404 });
        }
        return await createArtifactResponse(
          resolved.absolutePath,
          resolved.mimeType,
          {
            rangeHeader: request.headers.get("range"),
            signal: bindLibraryMediaReadSignal(folderLibraryId, request.signal),
            onStreamError: (error) =>
              runtime.logger?.error("serpent-protocol.folder-cover-stream", error, {
                libraryId: folderLibraryId,
              }),
          },
        );
      } catch (error) {
        runtime.logger?.error("serpent-protocol.folder-cover-read", error, {
          libraryId: folderLibraryId,
        });
        return new Response("Folder cover unreadable", { status: 404 });
      }
    }
    if (
      url.hostname !== "preview" &&
      url.hostname !== "proxy" &&
      url.hostname !== "source" &&
      url.hostname !== "import-frame"
    ) {
      runtime.logger?.info(
        "serpent-protocol.invalid-host",
        "Rejected unsupported artifact protocol host.",
      );
      return new Response("Invalid serpent:// path", { status: 400 });
    }
    // Serpent-866c20：序列帧确认面板要在导入前预览候选帧。Renderer 只拿到
    // Main 自己发出的不透明 offerId 与帧号，真实路径由这里从候选清单解析——
    // 请求里永远不出现磁盘路径。
    if (url.hostname === "import-frame") {
      const frameParts = url.pathname.replace(/^\/+/, "").split("/");
      if (frameParts.length !== 3) {
        return new Response("Invalid frame path", { status: 400 });
      }
      const [rawOfferId, rawSequenceIndex, rawFrameNumber] = frameParts as [
        string,
        string,
        string,
      ];
      const sequenceIndex = Number(rawSequenceIndex);
      const frameNumber = Number(rawFrameNumber);
      if (
        !/^[A-Za-z0-9-]{1,64}$/.test(rawOfferId) ||
        !Number.isInteger(sequenceIndex) ||
        sequenceIndex < 0 ||
        !Number.isInteger(frameNumber) ||
        frameNumber < 0
      ) {
        return new Response("Invalid frame request", { status: 400 });
      }
      const pending = pendingImageSequenceOffers.get(rawOfferId);
      if (!pending || pending.expiresAt <= Date.now()) {
        return new Response("Import offer expired", { status: 404 });
      }
      const pendingFrame = resolvePendingImportFrame({
        sequences: pending.offer.sequences,
        sequenceIndex,
        frameNumber,
      });
      if (!pendingFrame) {
        return new Response("Frame not found", { status: 404 });
      }
      if (isLibraryMediaReadBlocked(pending.offer.libraryId)) {
        return new Response("Library unavailable", { status: 410 });
      }
      try {
        return await createArtifactResponse(
          pendingFrame.absolutePath,
          pendingFrame.mimeType,
          {
            rangeHeader: request.headers.get("range"),
            signal: request.signal,
            onStreamError: (error) =>
              runtime.logger?.error("serpent-protocol.import-frame-stream", error, {
                sequenceIndex,
                frameNumber,
              }),
          },
        );
      } catch (error) {
        runtime.logger?.error("serpent-protocol.import-frame-read", error, {
          sequenceIndex,
          frameNumber,
        });
        return new Response("Frame unreadable", { status: 404 });
      }
    }
    const parts = url.pathname.replace(/^\/+/, "").split("/");
    if (parts.length !== 2) {
      runtime.logger?.info(
        "serpent-protocol.invalid-path",
        "Rejected malformed artifact protocol URL.",
      );
      return new Response("Invalid URL format", { status: 400 });
    }
    const libraryId = parts[0]!;
    const artifactId = parts[1]!;
    if (
      !libraryId ||
      !artifactId ||
      libraryId.includes("..") ||
      artifactId.includes("..")
    ) {
      runtime.logger?.info(
        "serpent-protocol.invalid-identifiers",
        "Rejected malformed artifact identifiers.",
      );
      return new Response("Invalid identifiers", { status: 400 });
    }
    if (isLibraryMediaReadBlocked(libraryId)) {
      return new Response("Library unavailable", { status: 410 });
    }

    if (!runtime.workerClient) {
      runtime.logger?.error(
        "serpent-protocol.worker-unavailable",
        new Error("Library Worker is unavailable."),
      );
      return new Response("Worker unavailable", { status: 503 });
    }

    if (url.hostname === "source") {
      const sourceWorkerClient = runtime.workerClient;
      if (!sourceWorkerClient) {
        return new Response("Worker unavailable", { status: 503 });
      }
      runtime.logger?.info(
        "serpent-protocol.source-request",
        "Resolving a source asset request.",
        { libraryId, assetId: artifactId },
      );
      // Serpent-485aeb：字体卡片样张页。字体卡片的封面由 Main 的离屏捕获
      // 渲染成 512px 缩略图，因此这里按同一个 source URL + `sample=font`
      // 返回一张生成的 HTML 样张页；页面里的 @font-face 指向去掉该参数的
      // 原始 URL，与页面同源（同 scheme + 同 host），不需要给字体请求放开
      // CORS。样张文字随字体语言切换（`lang`/`family` 由 Worker 解析字体
      // 文件后带上），避免给纯拉丁字体套中文标签渲染成豆腐块。
      if (url.searchParams.get("sample") === "font") {
        const sample = resolveFontSampleRequest(url);
        return new Response(
          createFontSamplePage({
            fontUrl: sample.fontUrl,
            family: sample.family,
            language: sample.language,
          }),
          {
            headers: {
              "cache-control": "no-store",
              "content-type": "text/html; charset=utf-8",
              "x-content-type-options": "nosniff",
            },
          },
        );
      }
      const revisionId = url.searchParams.get("revision");
      if (!revisionId || !/^[A-Za-z0-9_-]{1,255}$/.test(revisionId)) {
        runtime.logger?.info(
          "serpent-protocol.invalid-revision",
          "Rejected malformed source revision token.",
        );
        return new Response("Invalid revision", { status: 400 });
      }
      const authorizedSource = resolveModelThumbnailSourceAuthorization({
        libraryId,
        assetId: artifactId,
        revisionId,
      });
      if (authorizedSource) {
        try {
          if (isLibraryMediaReadBlocked(libraryId)) {
            return new Response("Library unavailable", { status: 410 });
          }
          return await createArtifactResponse(
            authorizedSource.absolutePath,
            authorizedSource.mimeType,
            {
              rangeHeader: request.headers.get("range"),
              signal: bindLibraryMediaReadSignal(libraryId, request.signal),
              onStreamError: (error) =>
                runtime.logger?.error("serpent-protocol.model-source-stream", error, {
                  libraryId,
                  assetId: artifactId,
                }),
            },
          );
        } catch (error) {
          runtime.logger?.error("serpent-protocol.model-source-read", error, {
            libraryId,
            assetId: artifactId,
          });
          return new Response("Source file missing", { status: 404 });
        }
      }
      const sourceStartedAt = performance.now();
      const sourceKey: SourcePathResolution = {
        libraryId,
        assetId: artifactId,
        revisionId,
        absolutePath: "",
        mimeType: "",
      };
      const sourceCacheHit = sourcePathCache.has(libraryId, artifactId, revisionId);
      let sourceResult: SourcePathResolution;
      try {
        sourceResult = await sourcePathCache.getOrResolve(sourceKey, async () => {
          const result = await sourceWorkerClient.request({
            type: "media.get-source-path",
            libraryId,
            assetId: artifactId,
            revisionId,
          });
          if (!result.ok || result.type !== "media.source-path") {
            throw new Error("Source not found");
          }
          return {
            libraryId,
            assetId: artifactId,
            revisionId,
            absolutePath: result.absolutePath,
            mimeType: result.mimeType,
          };
        });
      } catch (error) {
        sourcePathCache.delete(libraryId, artifactId, revisionId);
        runtime.logger?.info(
          "serpent-protocol.source-stale",
          "Rejected missing or stale source token.",
          { libraryId, assetId: artifactId },
        );
        if (VIEWER_TIMING_LOG) {
          runtime.logger?.info("viewer.source-timing", "Source lookup failed.", {
            libraryId,
            assetId: artifactId,
            revisionId,
            cacheHit: sourceCacheHit,
            workerMs: Math.round(performance.now() - sourceStartedAt),
            error: error instanceof Error ? error.message : String(error),
          });
        }
        return new Response("Source not found", { status: 404 });
      }
      if (isLibraryMediaReadBlocked(libraryId)) {
        return new Response("Library unavailable", { status: 410 });
      }
      try {
        const response = await createArtifactResponse(
          sourceResult.absolutePath,
          sourceResult.mimeType,
          {
            rangeHeader: request.headers.get("range"),
            signal: bindLibraryMediaReadSignal(libraryId, request.signal),
            onStreamError: (error) =>
              runtime.logger?.error("serpent-protocol.source-stream", error, {
                libraryId,
                assetId: artifactId,
              }),
          },
        );
        if (VIEWER_TIMING_LOG) {
          runtime.logger?.info("viewer.source-timing", "Source response ready.", {
            libraryId,
            assetId: artifactId,
            revisionId,
            cacheHit: sourceCacheHit,
            workerMs: Math.round(performance.now() - sourceStartedAt),
            status: response.status,
            range: request.headers.get("range") ?? undefined,
          });
        }
        return response;
      } catch (error) {
        sourcePathCache.delete(libraryId, artifactId, revisionId);
        runtime.logger?.error("serpent-protocol.source-read", error, {
          libraryId,
          assetId: artifactId,
        });
        return new Response("Source file missing", { status: 404 });
      }
    }

    const absoluteArtifactPath = await resolveArtifactPathBatched(
      libraryId,
      artifactId,
      url.hostname,
    );
    const ext = path.extname(absoluteArtifactPath).toLowerCase();
    const mimeType = artifactProtocolMimeForExtension(ext);

    if (isLibraryMediaReadBlocked(libraryId)) {
      return new Response("Library unavailable", { status: 410 });
    }

    // Serpent-1e3d4f: image previews are mirrored into userData on first
    // serve; later sessions stream from the local mirror instead of the
    // (possibly remote) origin. Video proxies/posters stay uncached — they
    // are large and Range-streamed.
    const isCacheableImageMime = mimeType.startsWith("image/");
    const cachedMirror = isCacheableImageMime
      ? getPreviewCache()?.locateSync(libraryId, artifactId, ext)
      : null;
    if (cachedMirror) {
      try {
        return await createArtifactResponse(
          cachedMirror,
          mimeType,
          {
            rangeHeader: request.headers.get("range"),
            signal: bindLibraryMediaReadSignal(libraryId, request.signal),
            onStreamError: (error) =>
              runtime.logger?.error("preview-cache.stream", error, {
                libraryId,
                artifactId,
              }),
          },
        );
      } catch {
        // Mirror unreadable (evicted mid-stream, permissions): fall through
        // to the origin and let store() refresh the mirror.
      }
    }

    try {
      const response = await createArtifactResponse(
        absoluteArtifactPath,
        mimeType,
        {
          rangeHeader: request.headers.get("range"),
          signal: bindLibraryMediaReadSignal(libraryId, request.signal),
          onStreamError: (error) =>
            runtime.logger?.error("serpent-protocol.stream", error, {
              libraryId,
              artifactId,
            }),
        },
      );
      if (isCacheableImageMime && !request.headers.get("range")) {
        void getPreviewCache()?.store(libraryId, artifactId, absoluteArtifactPath, ext);
      }
      return response;
    } catch (error) {
      runtime.logger?.error("serpent-protocol.read", error, {
        libraryId,
        artifactId,
      });
      // A watcher/library-change event may have invalidated the path after
      // the batch returned. Do not keep serving a stale artifact location
      // after the first failed read; the next request will ask the Worker
      // for the current path.
      invalidateArtifactPath(libraryId, artifactId, url.hostname);
      return new Response("Artifact file missing", { status: 404 });
    }
  } catch (error) {
    runtime.logger?.error("serpent-protocol", error, { url: request.url });
    return new Response("Internal error", { status: 500 });
  }
});
}
