import type { Payload } from 'payload';

import { isMediaUsed } from './isMediaUsed';

export async function deleteUnusedMedia(
  payload: Payload,
  mediaId: number | null | undefined,
): Promise<void> {
  if (!mediaId) {
    return;
  }

  const inUse = await isMediaUsed(
    payload,
    mediaId,
  );

  if (inUse) {
    return;
  }

  try {
    await payload.delete({
      collection: 'media',
      id: mediaId,
    });
  } catch (error) {
    console.error(
      `Failed to delete media ${mediaId}`,
      error,
    );
  }
}