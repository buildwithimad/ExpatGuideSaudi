import type {
    PaginatedDocs,
    Payload,
} from 'payload'

import type { Faq } from '@/payload-types'

import type { Locale } from '@/shared/types'

/* -------------------------------------------------------------------------- */
/*                              Constants                                     */
/* -------------------------------------------------------------------------- */

const FAQ_DEPTH = 1

const DEFAULT_FAQ_SORT = 'sortOrder'

/* -------------------------------------------------------------------------- */
/*                              Resolve FAQs                                  */
/* -------------------------------------------------------------------------- */

export async function resolveFAQs(
  payload: Payload,
  locale: Locale,
): Promise<PaginatedDocs<Faq>> {
  return payload.find({
    collection: 'faqs',

    locale,

    fallbackLocale: 'en',

    depth: FAQ_DEPTH,

    limit: 100,

    sort: DEFAULT_FAQ_SORT,
  })
}