import type { CollectionConfig } from 'payload';

import { auditFields } from '@/fields/meta';
import { publishingFields } from '@/fields/publish';
import { localizedRichText } from '@/fields/richText';
import { slugField } from '@/fields/slug';

import { articlesAccess } from './access';
import {
  articleBeforeChange,
  articleBeforeValidate,
} from './lifecycle';

import {
  cleanupReplacedFeaturedImage,
} from './hooks/afterChange';

import {
  rememberPreviousFeaturedImage,
} from './hooks/beforeChange';

import {
  cleanupDeletedArticleMedia,
} from './hooks/afterDelete';

export const Articles: CollectionConfig = {
  slug: 'articles',

  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'category',
      'author',
      'status',
      'publishedAt',
      'updatedAt',
    ],
  },

  access: articlesAccess,

  hooks: {
    beforeValidate: [
      ...articleBeforeValidate,
    ],

    beforeChange: [
      rememberPreviousFeaturedImage,
      ...articleBeforeChange,
    ],

    afterChange: [
      cleanupReplacedFeaturedImage,
    ],

    afterDelete: [
      cleanupDeletedArticleMedia,
    ],
  },

  versions: {
    drafts: true,
    maxPerDoc: 50,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
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

            slugField(),

            {
              name: 'subtitle',
              type: 'text',
              localized: true,
            },

            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              maxLength: 240,
            },

            localizedRichText(),
          ],
        },

        {
          label: 'Media',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },

        {
          label: 'Relations',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              index: true,
            },

            {
              name: 'author',
              type: 'relationship',
              relationTo: 'authors',
              required: true,
              index: true,
            },

            {
              name: 'relatedArticles',
              type: 'relationship',
              relationTo: 'articles',
              hasMany: true,
              maxDepth: 1,
            },

            {
              name: 'governmentSources',
              type: 'relationship',
              relationTo: 'government-sources',
              hasMany: true,
              index: true,
            },
          ],
        },

        {
          label: 'Publishing',
          fields: publishingFields(),
        },

        {
          label: 'Trust',
          fields: [
            {
              name: 'verifiedBy',
              type: 'relationship',
              relationTo: 'users',
            },

            {
              name: 'factChecked',
              type: 'checkbox',
              defaultValue: false,
              index: true,
            },

            {
              name: 'sourceLinks',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },

        {
          label: 'Metadata',
          fields: [
            {
              name: 'readingTime',
              type: 'number',
              defaultValue: 1,
              admin: {
                readOnly: true,
              },
            },

            {
              name: 'viewCount',
              type: 'number',
              defaultValue: 0,
              min: 0,
              index: true,
            },

            ...auditFields(),
          ],
        },
      ],
    },
  ],

  timestamps: true,
};