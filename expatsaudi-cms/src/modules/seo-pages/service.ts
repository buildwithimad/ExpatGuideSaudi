import type { Payload } from 'payload';

import type { Locale } from '@/shared/types';

import type { SeoPagesDTO } from './dto';

import { mapSeoPages } from './mapper';
import { findSeoPages } from './query';

/* -------------------------------------------------------------------------- */
/*                              Get SEO Pages                                 */
/* -------------------------------------------------------------------------- */

export async function getSeoPages(
  payload: Payload,
  locale: Locale,
): Promise<SeoPagesDTO> {
  const seoPages =
    await findSeoPages(
      payload,
      locale,
    );

    console.log(seoPages.home);

  return mapSeoPages(
    seoPages,
  );
}