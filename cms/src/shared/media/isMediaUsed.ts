import type { Payload } from 'payload';

export async function isMediaUsed(
  payload: Payload,
  mediaId: number,
): Promise<boolean> {
  const collections = [
    {
      collection: 'articles',
      field: 'featuredImage',
    },
    {
      collection: 'authors',
      field: 'photo',
    },
    {
      collection: 'categories',
      field: 'icon',
    },
    {
      collection: 'government-sources',
      field: 'logo',
    },
  ];

  for (const item of collections) {
    const result = await payload.find({
      collection: item.collection as any,
      limit: 1,
      where: {
        [item.field]: {
          equals: mediaId,
        },
      },
    });

    if (result.totalDocs > 0) {
      return true;
    }
  }

  return false;
}