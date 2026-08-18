import type { Field } from 'payload'

type SlugFieldOptions = {
  localized?: boolean
  required?: boolean
  readOnly?: boolean
}

export const slugField = ({
  localized = false,
  required = true,
  readOnly = true,
}: SlugFieldOptions = {}): Field => ({
  name: 'slug',
  label: 'Slug',
  type: 'text',
  localized,
  required,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    readOnly,
    description:
      'Automatically generated from the title or name. Edit only if necessary.',
  },
})