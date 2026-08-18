import type { Endpoint } from 'payload';

import { search } from '@/modules/search';

import {
  errorResponse,
  successResponse,
} from '@/shared/responses';

import { ValidationError } from '@/shared/validators';

export const searchEndpoint: Endpoint = {
  path: '/v1/search',

  method: 'get',

  handler: async (req) => {
    console.log('Search endpoint hit');
    try {
      const data = await search(req);
      console.log('DATA:', data);

      return Response.json(
        successResponse(data),
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        return Response.json(
          errorResponse(
            error.code,
            error.message,
          ),
          {
            status: error.status,
          },
        );
      }

      console.error(error);

      return Response.json(
        errorResponse(
          'SEARCH_FAILED',
          'Failed to search articles.',
        ),
        {
          status: 500,
        },
      );
    }
  },
};