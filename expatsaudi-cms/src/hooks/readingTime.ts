import type { CollectionBeforeChangeHook } from 'payload'

import { calculateReadingTime } from './content'

export const setReadingTime: CollectionBeforeChangeHook = ({
  data,
}) => {
  if (!data?.content) {
    return data
  }

  data.readingTime = calculateReadingTime(data.content)

  return data
}