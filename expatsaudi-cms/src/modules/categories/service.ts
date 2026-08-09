import type { Locale } from '@/shared/types';
import type { Payload } from 'payload';
import type { CategoryDTO } from './dto';

import { mapCategory } from './mapper';
import { findCategories } from './query';

export async function getCategories(
  payload: Payload,
  locale: Locale,
): Promise<CategoryDTO[]> {
  const categories = await findCategories(
    payload,
    locale,
  );

  return categories.map(mapCategory);
}