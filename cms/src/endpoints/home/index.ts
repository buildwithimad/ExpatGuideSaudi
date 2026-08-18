import type { Endpoint } from 'payload';

import { getHome } from '@/modules/home';
import {
  errorResponse,
  successResponse,
} from '@/shared/responses';

export const homeEndpoint: Endpoint = {
  path: '/v1/home',
  method: 'get',

  handler: async (req) => {
    try {
      const data = await getHome(req);

      return Response.json(
        successResponse(data),
      );
    } catch (error) {
      console.error(error);

      return Response.json(
        errorResponse(
          'HOME_FETCH_FAILED',
          'Failed to load homepage.',
        ),
        {
          status: 500,
        },
      );
    }
  },
};