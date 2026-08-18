import { parseLocale } from '@/shared/validators/locale'

import type { FAQsListDTO } from './dto'

import { mapFAQ } from './mappers'

import { resolveFAQs } from './queries'

export async function getFAQs(
  req: any,
): Promise<FAQsListDTO> {
  const locale = parseLocale(req)

  const result = await resolveFAQs(
    req.payload,
    locale,
  )

  return {
    docs: result.docs.map(mapFAQ),
  }
}