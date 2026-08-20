import type { Tab } from 'payload';

export const featuresTab: Tab = {
  label: 'Features',

  fields: [
    {
      type: 'group',
      name: 'website',
      label: 'Website',

      fields: [
        {
          name: 'maintenanceMode',
          label: 'Maintenance Mode',
          type: 'checkbox',
          defaultValue: false,
        },

        {
          name: 'enableSearch',
          label: 'Enable Search',
          type: 'checkbox',
          defaultValue: true,
        },

        {
          name: 'enableBackToTop',
          label: 'Enable Back to Top',
          type: 'checkbox',
          defaultValue: true,
        },

        {
          name: 'enableDarkMode',
          label: 'Enable Dark Mode',
          type: 'checkbox',
          defaultValue: true,
        },

        {
          name: 'enableSecondaryNavbar',
          label: 'Enable Secondary Navbar',
          type: 'checkbox',
          defaultValue: true,
        },

        {
          name: 'enableSocialProfile',
          label: 'Enable Social Profile',
          type: 'checkbox',
          defaultValue: true,
        },

        {
          name: 'enableLanguageSwitcher',
          label: 'Enable Language Switcher',
          type: 'checkbox',
          defaultValue: true,
        }
      ],
    },

    {
      type: 'group',
      name: 'content',
      label: 'Content',

      fields: [
        {
          name: 'enableReadingTime',
          label: 'Enable Reading Time',
          type: 'checkbox',
          defaultValue: true,
        },

        {
          name: 'enableTableOfContents',
          label: 'Enable Table of Contents',
          type: 'checkbox',
          defaultValue: true,
        },

        {
          name: 'enableRelatedArticles',
          label: 'Enable Related Articles',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },

    {
      type: 'group',
      name: 'ads',
      label: 'Ads',

      fields: [
        {
          name: 'enableAds',
          label: 'Enable Ads',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
};