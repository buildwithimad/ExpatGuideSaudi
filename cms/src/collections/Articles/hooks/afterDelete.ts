import type { CollectionAfterDeleteHook } from 'payload';

import { deleteUnusedMedia } from '@/shared/media';

export const cleanupDeletedArticleMedia: CollectionAfterDeleteHook =
  async ({ doc, req }) => {
    const mediaId =
      typeof doc.featuredImage === 'object'
        ? doc.featuredImage?.id
        : doc.featuredImage;

    await deleteUnusedMedia(
      req.payload,
      mediaId,
    );
  };