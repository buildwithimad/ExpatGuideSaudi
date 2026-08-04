import type { CollectionConfig } from 'payload'

import { auditFields } from '@/fields/meta'

import { faqsAccess } from './access'
import { faqBeforeChange } from './hooks'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: [
      'question',
      'category',
      'sortOrder',
    ],
  },
  access: faqsAccess,
  hooks: {
    beforeChange: faqBeforeChange,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              localized: true,
              index: true,
            },
            {
              name: 'answer',
              type: 'richText',
              required: true,
              localized: true,
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              index: true,
            },
            {
              name: 'relatedArticles',
              label: 'Related Articles',
              type: 'relationship',
              relationTo: 'articles',
              hasMany: true,
            },
          ],
        },
        {
          label: 'Publishing',
          fields: [
            {
              name: 'sortOrder',
              type: 'number',
              defaultValue: 0,
              index: true,
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