import type { Endpoint } from 'payload';


import type { Locale } from '@/shared/types';

import { NotFoundError } from '@/shared/validators';

import { getArticleDetails } from '@/modules/articles/service';

export const articleDetailsEndpoint: Endpoint = {
  path: '/v1/articles/:slug',
  method: 'get',

  

  handler: async (req) => {
 
    try {
      const locale =
        (req.query?.locale as Locale) ?? 'en';

      const slug = String(
        req.routeParams?.slug ?? '',
      );

      const data = await getArticleDetails(
        req.payload,
        {
          locale,
          slug,
        },
      );

      return Response.json({
        success: true,
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return Response.json(
          {
            success: false,
            error: {
              code: error.code,
              message: error.message,
            },
          },
          {
            status: error.status,
          },
        );
      }

      throw error;
    }
  },
};