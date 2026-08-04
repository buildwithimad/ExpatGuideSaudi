import type { CollectionConfig } from 'payload'

import { auditFields } from '@/fields/meta'

import { governmentSourcesAccess } from './access'
import { governmentSourceBeforeChange } from './hooks'

export const GovernmentSources: CollectionConfig = {
  slug: 'government-sources',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'officialWebsite', 'status'],
  },
  access: governmentSourcesAccess,
  hooks: {
    beforeChange: governmentSourceBeforeChange,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'name',
              label: 'Organization Name',
              type: 'text',
              required: true,
              index: true,
            },
            {
              name: 'officialWebsite',
              label: 'Official Website',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Official government website (e.g. https://hrsd.gov.sa)',
              },
              validate: (value: string | null |undefined) => {
                if (!value) return 'Official website is required.'

                try {
                  new URL(value)
                  return true
                } catch {
                  return 'Please enter a valid URL.'
                }
              },
            },
            {
              name: 'logo',
              label: 'Organization Logo',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Publishing',
          fields: [
            {
              name: 'status',
              label: 'Status',
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
        {
          label: 'Metadata',
          fields: auditFields(),
        },
      ],
    },
  ],
  timestamps: true,
}