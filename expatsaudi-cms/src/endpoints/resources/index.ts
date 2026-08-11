import type { Endpoint } from 'payload'

import { getResources } from '@/modules/resources'

import {
    errorResponse,
    successResponse,
} from '@/shared/responses'

export const resourcesEndpoint: Endpoint = {
  path: '/v1/resources',
  method: 'get',

  handler: async (req) => {
    try {
      const locale =
        req.query.locale as any

      const category =
        req.query.category as any

      const data = await getResources(
        req.payload,
        locale,
        category,
      )

      return Response.json(
        successResponse(data),
      )
    } catch (error) {
      console.error(error)

      return Response.json(
        errorResponse(
          'RESOURCES_FETCH_FAILED',
          'Failed to load resources.',
        ),
        {
          status: 500,
        },
      )
    }
  },
}