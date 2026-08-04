import type { CollectionConfig } from 'payload';

import { auditFields } from '@/fields/meta';
import { slugField } from '@/fields/slug';

import { categoriesAccess } from './access';
import {
  categoryBeforeChange,
  categoryBeforeValidate,
} from './hooks';

export const Categories: CollectionConfig = {
  slug: 'categories',

  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'slug',
      'parentCategory',
      'status',
      'sortOrder',
    ],
  },

  access: categoriesAccess,

  hooks: {
    beforeValidate: categoryBeforeValidate,
    beforeChange: categoryBeforeChange,
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
              label: 'Name',
              type: 'text',
              required: true,
              localized: true,
              index: true,
            },

            slugField(),

            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              localized: true,
            },

            {
              name: 'parentCategory',
              label: 'Parent Category',
              type: 'relationship',
              relationTo: 'categories',
              maxDepth: 1,
              index: true,
            },
          ],
        },

        {
          label: 'Media',
          fields: [
            {
              name: 'icon',
              label: 'Category Icon',
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
                {
                  label: 'Archived',
                  value: 'archived',
                },
              ],
            },

            {
              name: 'sortOrder',
              label: 'Sort Order',
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
};