import type { Tab } from 'payload';

export const seoTab: Tab = {
  label: 'SEO',

  fields: [
    /* ---------------------------------------------------------------------- */
    /*                              Site Settings                             */
    /* ---------------------------------------------------------------------- */

    {
      type: 'group',
      name: 'site',
      label: 'Site',

      fields: [
        {
          name: 'siteUrl',
          label: 'Site URL',
          type: 'text',
          required: true,
          defaultValue: 'https://expatsaudi.com',
          admin: {
            description:
              'The canonical base URL of your website.',
          },
        },

        {
          name: 'defaultMetaTitle',
          label: 'Default Meta Title',
          type: 'text',
          localized: true,
          required: true,
        },

        {
          name: 'defaultMetaDescription',
          label: 'Default Meta Description',
          type: 'textarea',
          localized: true,
          maxLength: 160,
        },
      ],
    },

    /* ---------------------------------------------------------------------- */
    /*                          Search Engine Verification                    */
    /* ---------------------------------------------------------------------- */

    {
      type: 'group',
      name: 'verification',
      label: 'Search Engine Verification',

      fields: [
        {
          name: 'googleVerification',
          label: 'Google Search Console',
          type: 'text',
          admin: {
            description:
              'Paste the Google Search Console verification token.',
          },
        },

        {
          name: 'bingVerification',
          label: 'Bing Webmaster',
          type: 'text',
          admin: {
            description:
              'Paste the Bing Webmaster verification token.',
          },
        },
      ],
    },

    /* ---------------------------------------------------------------------- */
    /*                           Structured Data                              */
    /* ---------------------------------------------------------------------- */

    {
      type: 'group',
      name: 'structuredData',
      label: 'Structured Data',

      fields: [
        {
          name: 'organizationType',
          label: 'Organization Type',
          type: 'select',
          required: true,
          defaultValue: 'Organization',

          options: [
            {
              label: 'Organization',
              value: 'Organization',
            },
            {
              label: 'Corporation',
              value: 'Corporation',
            },
            {
              label: 'News Media Organization',
              value: 'NewsMediaOrganization',
            },
            {
              label: 'Educational Organization',
              value: 'EducationalOrganization',
            },
          ],
        },
      ],
    },
  ],
};