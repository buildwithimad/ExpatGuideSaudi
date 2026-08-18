import type { Endpoint } from 'payload';

import { getSeoPages } from '@/modules/seo-pages';
import type { Locale } from '@/shared/types';

/* -------------------------------------------------------------------------- */
/*                               SEO Pages API                                */
/* -------------------------------------------------------------------------- */

export const seoPagesEndpoint: Endpoint = {
  path: '/v1/seo-pages',

  method: 'get',

  handler: async (req) => {
    const locale =
      (
        req.routeParams?.locale ||
        req.searchParams?.get('locale') ||
        'en'
      ) as Locale;

    const data =
      await getSeoPages(
        req.payload,
        locale,
      );

    return Response.json({
      success: true,

      data,
    });
  },
};