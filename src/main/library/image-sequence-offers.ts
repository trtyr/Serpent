import type { ImageSequenceImportOffer } from "../../shared/protocol/responses";

/**
 * Pending import sequence offers: the offer id is an opaque handle; real
 * candidate paths never leave Main (resolved only by the import-frame route
 * of the serpent:// protocol).
 */

type StoredImageSequenceOffer = ImageSequenceImportOffer;

const pendingImageSequenceOffers = new Map<
  string,
  {
    offer: StoredImageSequenceOffer;
    expiresAt: number;
    nextSequenceIndex: number;
  }
>();

export { pendingImageSequenceOffers };
