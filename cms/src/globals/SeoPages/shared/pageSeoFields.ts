import type { Field } from 'payload';

/* -------------------------------------------------------------------------- */
/*                             Page SEO Fields                                */
/* -------------------------------------------------------------------------- */

export const pageSeoFields: Field[] = [
  {
    name: 'title',
    label: 'SEO Title',
    type: 'text',
    localized: true,
    maxLength: 60,

    admin: {
      description:
        'Recommended: 50–60 characters.',
    },
  },

  {
    name: 'description',
    label: 'SEO Description',
    type: 'textarea',
    localized: true,
    maxLength: 160,

    admin: {
      description:
        'Recommended: 140–160 characters.',
    },
  },

  {
    name: 'image',
    label: 'Open Graph Image',
    type: 'upload',
    relationTo: 'media',

    admin: {
      description:
        'Recommended size: 1200 × 630 pixels.',
    },
  },

  {
    name: 'noIndex',
    label: 'No Index',
    type: 'checkbox',
    defaultValue: false,

    admin: {
      description:
        'Prevent search engines from indexing this page.',
    },
  },

  {
    name: 'noFollow',
    label: 'No Follow',
    type: 'checkbox',
    defaultValue: false,

    admin: {
      description:
        'Prevent search engines from following links on this page.',
    },
  },
];