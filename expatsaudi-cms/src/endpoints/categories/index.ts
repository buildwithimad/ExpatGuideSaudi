import type { Endpoint } from 'payload';

import { getCategories } from '@/modules/categories/service';

export const categoriesEndpoint: Endpoint = {
  path: '/v1/categories',
  method: 'get',

  handler: async (req) => {
    const data = await getCategories(
      req.payload,
    );

    return Response.json({
      success: true,
      data,
    });
  },
};