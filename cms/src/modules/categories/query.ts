import type { Locale } from '@/shared/types';
import type { Payload } from 'payload';

import type { CategoryDocument } from './types';

export async function findCategories(
  payload: Payload,
  locale: Locale,
): Promise<CategoryDocument[]> {
  const { docs } = await payload.find({
    collection: 'categories',

    locale,
    fallbackLocale: 'en',

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