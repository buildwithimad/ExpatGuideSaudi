import type { GlobalConfig } from 'payload'

import { globalAccess } from '@/globals/access'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',

  access: globalAccess,

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Search',

          fields: [
            {
              name: 'categoryFilters',
              label: 'Category Filters',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              localized: true,
            },

            {
              name: 'popularSearches',
              label: 'Popular Searches',
              type: 'array',

              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },

                {
                  name: 'query',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}