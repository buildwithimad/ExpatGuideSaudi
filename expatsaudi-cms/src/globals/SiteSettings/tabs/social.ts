import type { Tab } from 'payload';

import { urlField } from '@/fields/url/url';

export const socialTab: Tab = {
  label: 'Social Media',

  fields: [
    {
      type: 'group',
      name: 'socialProfiles',
      label: 'Profiles',

      fields: [
        urlField({
          name: 'facebook',
          label: 'Facebook',
        }),

        urlField({
          name: 'instagram',
          label: 'Instagram',
        }),

        urlField({
          name: 'x',
          label: 'X (Twitter)',
        }),

        urlField({
          name: 'linkedin',
          label: 'LinkedIn',
        }),

        urlField({
          name: 'youtube',
          label: 'YouTube',
        }),

        urlField({
          name: 'tiktok',
          label: 'TikTok',
        }),

        urlField({
          name: 'telegram',
          label: 'Telegram',
        }),
      ],
    },
  ],
};