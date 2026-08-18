import type { Payload } from 'payload'

import type { Locale } from '@/shared/types'

import type { ResourceDocument } from './types'

export async function findResources(
  payload: Payload,
  locale: Locale,
  category?: ResourceDocument['category'],
): Promise<ResourceDocument[]> {
  const { docs } = await payload.find({
    collection: 'resources',

    locale,
    fallbackLocale: 'en',

    depth: 1,
    pagination: false,

    sort: 'sortOrder',

    where: {
      and: [
        {
          status: {
            equals: 'active',
          },
        },

        ...(category
          ? [
              {
                category: {
                  equals: category,
                },
              },
            ]
          : []),
      ],
    },
  })

  return docs as ResourceDocument[]
}