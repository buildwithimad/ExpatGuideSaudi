import type { Payload } from 'payload'

import type { Locale } from '@/shared/types'

import { mapResource } from './mapper'
import { findResources } from './query'
import type { ResourceDocument } from './types'

export async function getResources(
  payload: Payload,
  locale: Locale,
  category?: ResourceDocument['category'],
) {
  const resources = await findResources(
    payload,
    locale,
    category,
  )

  return resources.map(mapResource)
}