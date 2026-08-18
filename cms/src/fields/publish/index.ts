import type { Field } from 'payload'

export const publishingStatusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
] as const

export const publishingFields = (): Field[] => [
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    defaultValue: 'draft',
    index: true,
    options: [...publishingStatusOptions],
  },
  {
    name: 'publishedAt',
    label: 'Published At',
    type: 'date',
    index: true,
    admin: {
      readOnly: true,
      date: {
        pickerAppearance: 'dayAndTime',
      },
    },
  },
  {
    name: 'lastVerifiedAt',
    label: 'Last Verified',
    type: 'date',
    admin: {
      readOnly: true,
      date: {
        pickerAppearance: 'dayAndTime',
      },
      description:
        'Automatically updated whenever the content is fact checked.',
    },
  },
  {
    name: 'featured',
    label: 'Featured',
    type: 'checkbox',
    defaultValue: false,
    index: true,
  },
  {
    name: 'sortOrder',
    label: 'Sort Order',
    type: 'number',
    defaultValue: 0,
    index: true,
  },
]