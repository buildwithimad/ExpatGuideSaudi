import type { CollectionAfterChangeHook } from 'payload';

import { deleteUnusedMedia } from '@/shared/media';

export const cleanupReplacedFeaturedImage: CollectionAfterChangeHook =
  async ({ doc, req, operation }) => {
    if (operation !== 'update') {
      return;
    }

    const previousMediaId =
      req.context
        .previousFeaturedImageId as
        | number
        | null
        | undefined;

    const currentMediaId =
      typeof doc.featuredImage === 'object'
        ? doc.featuredImage?.id
        : doc.featuredImage;

    if (
      !previousMediaId ||
      previousMediaId === currentMediaId
    ) {
      return;
    }

    await deleteUnusedMedia(
      req.payload,
      previousMediaId,
    );
  };