import type { Endpoint } from 'payload';

import { getSiteSettings } from '@/modules/site-settings';
import type { Locale } from '@/shared/types';

export const siteSettingsEndpoint: Endpoint = {
  path: '/v1/site-settings',
  method: 'get',

  handler: async (req) => {
    const locale =
      (req.routeParams?.locale ||
        req.searchParams?.get('locale') ||
        'en') as Locale;

    const data = await getSiteSettings(
      req.payload,
      locale,
    );

    return Response.json({
      success: true,
      data,
    });
  },
};