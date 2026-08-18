import type { CollectionConfig } from 'payload'

import { auditFields } from '@/fields/meta'
import { slugField } from '@/fields/slug'

import { authorsAccess } from './access'
import { authorBeforeChange, authorBeforeValidate } from './hooks'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'jobTitle', 'status', 'verifiedAuthor'],
  },
  access: authorsAccess,
  hooks: {
    beforeValidate: authorBeforeValidate,
    beforeChange: authorBeforeChange,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'fullName',
              label: 'Full Name',
              type: 'text',
              required: true,
              localized: true,
              index: true,
            },
            slugField({ localized: false }),
            {
              name: 'photo',
              label: 'Photo',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'jobTitle',
              label: 'Job Title',
              type: 'text',
              localized: true,
              index: true,
            },
            {
              name: 'shortBio',
              label: 'Short Bio',
              type: 'textarea',
              localized: true,
              maxLength: 240,
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
          fields: [
            {
              name: 'verifiedAuthor',
              label: 'Verified Author',
              type: 'checkbox',
              defaultValue: false,
              index: true,
            },
            {
              name: 'credentials',
              label: 'Credentials',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  label: 'Credential',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'organization',
                  label: 'Organization',
                  type: 'text',
                },
              ],
            },
            {
              name: 'linkedin',
              label: 'LinkedIn',
              type: 'text',
            },
            {
              name: 'website',
              label: 'Website',
              type: 'text',
            },
            ...auditFields(),
          ],
        },
      ],
    },
  ],
  timestamps: true,
}