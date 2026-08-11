import type { Endpoint } from 'payload'

import { getCategories } from '@/modules/categories/service'
import type { Locale } from '@/shared/types'

export const categoriesEndpoint: Endpoint = {
  path: '/v1/categories',
  method: 'get',

  handler: async (req) => {
    const locale =
      (req.routeParams?.locale ||
        req.searchParams?.get('locale') ||
        'en') as Locale

    const data = await getCategories(
      req.payload,
      {
        locale,
      },
    )

    return Response.json({
      success: true,
      data,
    })
  },
}