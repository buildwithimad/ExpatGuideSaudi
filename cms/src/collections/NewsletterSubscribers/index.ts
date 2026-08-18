import type { CollectionConfig } from 'payload'

import { newsletterSubscribersAccess } from './access'
import { subscriberBeforeChange } from './hooks'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: [
      'email',
      'locale',
      'source',
      'status',
      'subscribedAt',
    ],
  },
  access: newsletterSubscribersAccess,
  hooks: {
    beforeChange: [subscriberBeforeChange],
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'locale',
      label: 'Language',
      type: 'select',
      required: true,
      defaultValue: 'en',
      index: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Arabic', value: 'ar' },
        { label: 'Urdu', value: 'ur' },
        { label: 'Hindi', value: 'hi' },
        { label: 'Bengali', value: 'bn' },
        { label: 'Tagalog', value: 'tl' },
      ],
    },
    {
      name: 'source',
      label: 'Signup Source',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Article', value: 'article' },
        { label: 'Landing Page', value: 'landing-page' },
        { label: 'Popup', value: 'popup' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'subscribed',
      index: true,
      options: [
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
    },
    {
      name: 'subscribedAt',
      label: 'Subscribed At',
      type: 'date',
      index: true,
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}