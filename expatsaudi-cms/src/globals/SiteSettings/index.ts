import type { GlobalConfig } from 'payload'

import { globalAccess } from '@/globals/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: globalAccess,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            {
              name: 'siteName',
              label: 'Site Name',
              type: 'text',
              required: true,
              defaultValue: 'ExpatSaudi',
            },
            {
              name: 'organizationName',
              label: 'Organization Name',
              type: 'text',
              required: true,
              defaultValue: 'ExpatSaudi',
            },
            {
              name: 'tagline',
              label: 'Tagline',
              type: 'text',
              localized: true,
            },
            {
              name: 'logo',
              label: 'Logo',
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
              name: 'defaultOgImage',
              label: 'Default Open Graph Image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'email',
              label: 'Contact Email',
              type: 'email',
            },
            {
              name: 'phone',
              label: 'Contact Phone',
              type: 'text',
            },
            {
              name: 'address',
              label: 'Address',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'socialLinks',
              label: 'Social Links',
              type: 'array',
              labels: {
                singular: 'Social Link',
                plural: 'Social Links',
              },
              fields: [
                {
                  name: 'platform',
                  label: 'Platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'X (Twitter)', value: 'x' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                },
                {
                  name: 'url',
                  label: 'Profile URL',
                  type: 'text',
                  required: true,
                  validate: (value: string | null | undefined) => {
                    if (!value) return 'URL is required.'

                    try {
                      new URL(value)
                      return true
                    } catch {
                      return 'Please enter a valid URL.'
                    }
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}