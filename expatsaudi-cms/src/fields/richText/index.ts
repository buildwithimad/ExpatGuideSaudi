import type { Field } from 'payload'

export const localizedRichText = (
  name = 'content',
  label = 'Content',
): Field => ({
  name,
  label,
  type: 'richText',
  localized: true,
  required: true,
  admin: {
    description: 'Supports multilingual rich content.',
  },
})