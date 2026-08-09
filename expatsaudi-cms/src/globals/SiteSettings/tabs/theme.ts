import type { Tab } from 'payload';

import { colorField } from '@/fields/branding/color';

export const themeTab: Tab = {
  label: 'Theme',

  fields: [
    /* ---------------------------------------------------------------------- */
    /*                              Light Theme                               */
    /* ---------------------------------------------------------------------- */

    {
      type: 'group',
      name: 'light',
      label: '☀️ Light Theme',

      admin: {
        description:
          'Colors used when the website is in light mode.',
      },

      fields: [
        colorField({
          name: 'primary',
          label: 'Primary',
          defaultValue: '#006C35',
        }),

        colorField({
          name: 'primaryForeground',
          label: 'Primary Foreground',
          defaultValue: '#FFFFFF',
        }),

        colorField({
          name: 'secondary',
          label: 'Secondary',
          defaultValue: '#F8FAFC',
        }),

        colorField({
          name: 'secondaryForeground',
          label: 'Secondary Foreground',
          defaultValue: '#1F2937',
        }),

        colorField({
          name: 'accent',
          label: 'Accent',
          defaultValue: '#15803D',
        }),

        colorField({
          name: 'accentForeground',
          label: 'Accent Foreground',
          defaultValue: '#FFFFFF',
        }),

        colorField({
          name: 'background',
          label: 'Background',
          defaultValue: '#FFFFFF',
        }),

        colorField({
          name: 'foreground',
          label: 'Foreground',
          defaultValue: '#1F2937',
        }),

        colorField({
          name: 'card',
          label: 'Card',
          defaultValue: '#FFFFFF',
        }),

        colorField({
          name: 'cardForeground',
          label: 'Card Foreground',
          defaultValue: '#1F2937',
        }),

        colorField({
          name: 'muted',
          label: 'Muted',
          defaultValue: '#F3F4F6',
        }),

        colorField({
          name: 'mutedForeground',
          label: 'Muted Foreground',
          defaultValue: '#6B7280',
        }),
      ],
    },

    /* ---------------------------------------------------------------------- */
    /*                               Dark Theme                               */
    /* ---------------------------------------------------------------------- */

    {
      type: 'group',
      name: 'dark',
      label: '🌙 Dark Theme',

      admin: {
        description:
          'Colors used when the website is in dark mode.',
      },

      fields: [
        colorField({
          name: 'primary',
          label: 'Primary',
          defaultValue: '#16A34A',
        }),

        colorField({
          name: 'primaryForeground',
          label: 'Primary Foreground',
          defaultValue: '#FFFFFF',
        }),

        colorField({
          name: 'secondary',
          label: 'Secondary',
          defaultValue: '#111827',
        }),

        colorField({
          name: 'secondaryForeground',
          label: 'Secondary Foreground',
          defaultValue: '#F8FAFC',
        }),

        colorField({
          name: 'accent',
          label: 'Accent',
          defaultValue: '#22C55E',
        }),

        colorField({
          name: 'accentForeground',
          label: 'Accent Foreground',
          defaultValue: '#FFFFFF',
        }),

        colorField({
          name: 'background',
          label: 'Background',
          defaultValue: '#0B1220',
        }),

        colorField({
          name: 'foreground',
          label: 'Foreground',
          defaultValue: '#F8FAFC',
        }),

        colorField({
          name: 'card',
          label: 'Card',
          defaultValue: '#111827',
        }),

        colorField({
          name: 'cardForeground',
          label: 'Card Foreground',
          defaultValue: '#F8FAFC',
        }),

        colorField({
          name: 'muted',
          label: 'Muted',
          defaultValue: '#1F2937',
        }),

        colorField({
          name: 'mutedForeground',
          label: 'Muted Foreground',
          defaultValue: '#94A3B8',
        }),
      ],
    },
  ],
};