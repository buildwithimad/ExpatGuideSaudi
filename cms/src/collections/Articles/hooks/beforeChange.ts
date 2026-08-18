import type { CollectionBeforeChangeHook } from 'payload';

/* -------------------------------------------------------------------------- */
/*                     Remember Previous Featured Image                        */
/* -------------------------------------------------------------------------- */

export const rememberPreviousFeaturedImage: CollectionBeforeChangeHook =
  async ({ originalDoc, req }) => {
    if (!originalDoc) {
      return;
    }

    const mediaId =
      typeof originalDoc.featuredImage === 'object'
        ? originalDoc.featuredImage?.id
        : originalDoc.featuredImage;

    req.context.previousFeaturedImageId =
      typeof mediaId === 'number'
        ? mediaId
        : null;
  };

/* -------------------------------------------------------------------------- */
/*                         Update Last Verified Date                           */
/* -------------------------------------------------------------------------- */

export const updateLastVerifiedAt: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
}) => {
  if (
    data.factChecked === true &&
    originalDoc?.factChecked !== true
  ) {
    data.lastVerifiedAt = new Date().toISOString();
  }

  return data;
};