import type { Tab } from 'payload';

export const analyticsTab: Tab = {
  label: 'Analytics',

  fields: [
    {
      type: 'group',
      name: 'services',
      label: 'Services',

      fields: [
        {
          name: 'googleAnalyticsId',
          label: 'Google Analytics ID',
          type: 'text',
          admin: {
            description:
              'Example: G-XXXXXXXXXX',
          },
        },

        {
          name: 'googleTagManagerId',
          label: 'Google Tag Manager ID',
          type: 'text',
          admin: {
            description:
              'Example: GTM-XXXXXXX',
          },
        },

        {
          name: 'microsoftClarityId',
          label: 'Microsoft Clarity ID',
          type: 'text',
        },

        {
          name: 'googleAdsenseId',
          label: 'Google AdSense Publisher ID',
          type: 'text',
          admin: {
            description:
              'Example: ca-pub-1234567890123456',
          },
        },
      ],
    },
  ],
};