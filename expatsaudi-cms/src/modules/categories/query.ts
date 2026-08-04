import type { Payload } from 'payload';

import type { CategoryDocument } from './types';

export async function findCategories(
  payload: Payload,
): Promise<CategoryDocument[]> {
  const { docs } = await payload.find({
    collection: 'categories',

    depth: 1,

    pagination: false,

    sort: 'sortOrder',

    where: {
      status: {
        equals: 'active',
      },
    },
  });

  return docs as CategoryDocument[];
}