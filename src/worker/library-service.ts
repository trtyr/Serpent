export * from './library-service-internals';

import { LibraryServiceZip } from './service/LibraryServiceZip';

/**
 * Compatibility facade: the former 51k-line LibraryService monolith now lives
 * as a linear chain of domain partial classes under src/worker/service/.
 * Every member (methods, statics, exports) resolves exactly as before.
 */
export class LibraryService extends LibraryServiceZip {}
