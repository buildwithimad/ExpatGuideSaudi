import type { CollectionConfig } from 'payload'

import { auditFields } from '@/fields/meta'

import { resourcesAccess } from './access'
import { resourceBeforeChange } from './hooks'

export const Resources: CollectionConfig = {
  slug: 'resources',

  admin: {
    useAsTitle: 'title',

    defaultColumns: [
      'title',
      'category',
      'sortOrder',
      'status',
    ],
  },

  access: resourcesAccess,

  hooks: {
  beforeChange: [resourceBeforeChange],
},

  fields: [
    {
      type: 'tabs',

      tabs: [
        /* -------------------------------------------------------------------------- */
        /*                               Content                                      */
        /* -------------------------------------------------------------------------- */

        {
          label: 'Content',

          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              index: true,
            },

            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },

            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },

            {
              name: 'category',
              type: 'select',
              required: true,
              index: true,

              options: [
                {
                  label: 'Government Services',
                  value: 'government-services',
                },
                {
                  label: 'Useful Apps',
                  value: 'useful-apps',
                },
                {
                  label: 'Emergency Numbers',
                  value: 'emergency-numbers',
                },
                {
                  label: 'Public Services',
                  value: 'public-services',
                },
              ],
            },

            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },

        /* -------------------------------------------------------------------------- */
        /*                              Publishing                                     */
        /* -------------------------------------------------------------------------- */

        {
          label: 'Publishing',

          fields: [
            {
              name: 'sortOrder',
              type: 'number',
              defaultValue: 0,
              index: true,
            },

            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'active',
              index: true,

              options: [
                {
                  label: 'Active',
                  value: 'active',
                },
                {
                  label: 'Inactive',
                  value: 'inactive',
                },
              ],
            },
          ],
        },

        /* -------------------------------------------------------------------------- */
        /*                               Metadata                                      */
        /* -------------------------------------------------------------------------- */

        {
          label: 'Metadata',

          fields: auditFields(),
        },
      ],
    },
  ],

  timestamps: true,
}