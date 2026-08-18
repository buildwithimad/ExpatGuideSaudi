import type { CollectionConfig } from 'payload'

import { roleFieldOptions } from '@/access/roles'

import { usersAccess } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'roles'],
  },
  access: usersAccess,
  auth: true,
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      index: true,
    },
    {
  name: 'avatar',
  label: 'Profile Image',
  type: 'upload',
  relationTo: 'media',
  admin: {
    description: 'Profile image displayed in the Payload admin.',
  },
},
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      hasMany: true,
      required: true,
      saveToJWT: true,
      defaultValue: ['super-admin'],
      options: roleFieldOptions,
    },
    {
      name: 'preferredLocale',
      label: 'Preferred Language',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
        { label: 'Urdu', value: 'ur' },
        { label: 'Hindi', value: 'hi' },
        { label: 'Bengali', value: 'bn' },
        { label: 'Tagalog', value: 'tl' },
      ],
    },
  ],
  timestamps: true,
}