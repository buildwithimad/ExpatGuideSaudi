import type { CategoryDTO } from './dto';
import type { CategoryDocument } from './types';

import { mapImage } from '@/shared/mappers/image';

export function mapCategory(
  category: CategoryDocument,
): CategoryDTO {
  return {
    id: category.id,

    name: category.name,

    slug: category.slug,

    description: category.description ?? null,

    icon: mapImage(category.icon),
  };
}