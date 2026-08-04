import type { CollectionBeforeChangeHook } from 'payload'

export const subscriberBeforeChange: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' && !data.subscribedAt) {
    data.subscribedAt = new Date().toISOString()
  }

  return data
}
