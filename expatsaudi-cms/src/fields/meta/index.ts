import type { Field } from 'payload'

export const auditFields = (): Field[] => [
  {
    name: 'createdBy',
    label: 'Created By',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      readOnly: true,
      position: 'sidebar',
    },
  },
  {
    name: 'lastModifiedBy',
    label: 'Last Modified By',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      readOnly: true,
      position: 'sidebar',
    },
  },
]