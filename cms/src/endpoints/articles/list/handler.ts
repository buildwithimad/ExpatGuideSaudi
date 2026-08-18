import type { Endpoint } from 'payload';

import type { Locale } from '@/shared/types';

import {
  parsePagination,
  ValidationError,
} from '@/shared/validators';

import { getArticles } from '@/modules/articles/service';

export const articlesEndpoint: Endpoint = {
  path: '/v1/articles',
  method: 'get',

  handler: async (req) => {
    try {
      const locale =
        (req.query?.locale as Locale) ?? 'en';

      const { page, limit } =
        parsePagination(req);

      const category =
        req.query?.category as
          | string
          | undefined;

      const featured =
        req.query?.featured === 'true';

      const factChecked =
        req.query?.factChecked === 'true';

      const search =
        req.query?.search as
          | string
          | undefined;

      const data = await getArticles(
        req.payload,
        {
          locale,
          page,
          limit,
          filters: {
            category,
            featured,
            factChecked,
            search,
          },
        },
      );

      return Response.json({
        success: true,
        data,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
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

      console.error(error);

      return Response.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_SERVER_ERROR',
            message:
              'Something went wrong.',
          },
        },
        {
          status: 500,
        },
      );
    }
  },
};