import type { Endpoint } from 'payload'

import { getFAQs } from '@/modules/faqs'

import {
    errorResponse,
    successResponse,
} from '@/shared/responses'

export const faqsEndpoint: Endpoint = {
  path: '/v1/faqs',

  method: 'get',

  handler: async (req) => {
    try {
      const data = await getFAQs(req)

      return Response.json(
        successResponse(data),
      )
    } catch (error) {
      console.error(error)

      return Response.json(
        errorResponse(
          'FAQS_FETCH_FAILED',
          'Failed to load FAQs.',
        ),
        {
          status: 500,
        },
      )
    }
  },
}