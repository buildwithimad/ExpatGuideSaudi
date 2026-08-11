import type { Payload } from 'payload'

import { mapCategory } from './mapper'
import { findCategories } from './query'
import type { GetCategoriesOptions } from './types'

export async function getCategories(
  payload: Payload,
  options: GetCategoriesOptions,
) {
  const categories = await findCategories(
    payload,
    options.locale,
  )

  const mappedCategories = await Promise.all(
    categories.map(async (category) => {
      const articleCount =
        await payload.count({
          collection: 'articles',
          locale: options.locale,
          where: {
            and: [
              {
                category: {
                  equals: category.id,
                },
              },
              {
                _status: {
                  equals: 'published',
                },
              },
            ],
          },
        })

      return mapCategory(
        category,
        articleCount.totalDocs,
      )
    }),
  )

  return mappedCategories
}