import type { CollectionBeforeChangeHook } from 'payload'

export const resourceBeforeChange: CollectionBeforeChangeHook = async ({
  data,
}) => {
  return data
}