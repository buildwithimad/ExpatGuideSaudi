import type { Payload } from 'payload';

import type { Locale } from '@/shared/types';

import type { SeoPagesDocument } from './types';

/* -------------------------------------------------------------------------- */
/*                              Find SEO Pages                                */
/* -------------------------------------------------------------------------- */

export async function findSeoPages(
  payload: Payload,
  locale: Locale,
): Promise<SeoPagesDocument> {
  const seoPages =
    await payload.findGlobal({
      slug: 'seo-pages',

      locale,

      fallbackLocale: 'en',
    });

  return seoPages as SeoPagesDocument;
}