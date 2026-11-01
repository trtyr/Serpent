import { SourcePathCache } from "../source-path-cache";

/** Main-owned cache of worker-resolved asset source paths (serpent://source). */

const sourcePathCache = new SourcePathCache();

export { sourcePathCache };
