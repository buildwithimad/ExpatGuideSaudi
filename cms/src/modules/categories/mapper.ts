import type { Category } from '@/payload-types'
import type { CategoryDTO } from './dto'

import { mapImage } from '@/shared/mappers/image'

export function mapCategory(
  category: Category,
  articleCount = 0,
): CategoryDTO {
  return {
    id: category.id,

    name: category.name,

    slug: category.slug,

    description:
      category.description ?? null,

    icon: mapImage(category.icon),

    articleCount,
  }
}