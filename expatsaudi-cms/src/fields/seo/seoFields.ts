import type { Field } from 'payload';

export const seoFields = (): Field[] => [
  {
    type: 'collapsible',
    label: 'Search Engine Optimization',
    admin: {
      initCollapsed: false,
      description:
        'These settings are optional. If left empty, ExpatSaudi automatically uses the article title, excerpt, featured image, and default SEO settings.',
    },
    fields: [
      {
        type: 'group',
        label: 'Search Appearance',
        fields: [
          {
            name: 'metaTitle',
            label: 'Meta Title',
            type: 'text',
            localized: true,
            maxLength: 60,
            admin: {
              placeholder:
                'Recommended: 50–60 characters',
              description:
                'Optional. Falls back to the article title.',
            },
          },

          {
            name: 'metaDescription',
            label: 'Meta Description',
            type: 'textarea',
            localized: true,
            maxLength: 160,
            admin: {
              placeholder:
                'Recommended: 140–160 characters',
              description:
                'Optional. Falls back to the article excerpt.',
            },
          },
        ],
      },

      {
        type: 'group',
        label: 'Social Sharing',
        fields: [
          {
            name: 'ogImage',
            label: 'Open Graph Image',
            type: 'upload',
            relationTo: 'media',
            admin: {
              description:
                'Optional. Falls back to the featured image.',
            },
          },
        ],
      },

      {
        type: 'group',
        label: 'Robots',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'noIndex',
                label: 'Prevent Search Indexing',
                type: 'checkbox',
                defaultValue: false,
                admin: {
                  width: '50%',
                  description:
                    'Discourage search engines from indexing this page.',
                },
              },

              {
                name: 'noFollow',
                label: 'Prevent Link Following',
                type: 'checkbox',
                defaultValue: false,
                admin: {
                  width: '50%',
                  description:
                    'Discourage search engines from following links on this page.',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];