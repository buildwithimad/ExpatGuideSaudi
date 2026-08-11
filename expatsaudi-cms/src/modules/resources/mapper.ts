import type { ResourceDTO } from './dto'
import type { ResourceDocument } from './types'

import { mapImage } from '@/shared/mappers/image'

export function mapResource(
  resource: ResourceDocument,
): ResourceDTO {
  return {
    id: resource.id,

    title: resource.title,

    description:
      resource.description ?? null,

    icon: mapImage(resource.icon),

    category: resource.category,

    url: resource.url,

    sortOrder: resource.sortOrder ?? 0,
  }
}