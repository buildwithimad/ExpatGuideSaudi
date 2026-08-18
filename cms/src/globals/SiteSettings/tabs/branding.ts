import type { Tab } from 'payload';

export const brandingTab: Tab = {
  label: 'Branding',

  fields: [
    /* ---------------------------------------------------------------------- */
    /*                                Identity                                */
    /* ---------------------------------------------------------------------- */

    {
      type: 'group',
      name: 'identity',
      label: 'Identity',

      fields: [
        {
          name: 'siteName',
          label: 'Site Name',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'ExpatSaudi',
        },

        {
          name: 'organizationName',
          label: 'Organization Name',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'ExpatSaudi',
        },

        {
          name: 'tagline',
          label: 'Tagline',
          type: 'text',
          localized: true,
        },

        {
          name: 'shortDescription',
          label: 'Short Description',
          type: 'textarea',
          localized: true,
          maxLength: 300,
        },
      ],
    },

    /* ---------------------------------------------------------------------- */
    /*                                  Logos                                 */
    /* ---------------------------------------------------------------------- */

    {
      type: 'group',
      name: 'logos',
      label: 'Logos',

      fields: [
        {
          name: 'primaryLogo',
          label: 'Primary Logo',
          type: 'upload',
          relationTo: 'media',
        },

        {
          name: 'whiteLogo',
          label: 'White Logo',
          type: 'upload',
          relationTo: 'media',
        },

        {
          name: 'darkLogo',
          label: 'Dark Logo',
          type: 'upload',
          relationTo: 'media',
        },

        {
          name: 'favicon',
          label: 'Favicon',
          type: 'upload',
          relationTo: 'media',
        },

        {
          name: 'appleTouchIcon',
          label: 'Apple Touch Icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
};