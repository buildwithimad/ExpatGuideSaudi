import type { Payload } from 'payload';

import type { CategoryDTO } from './dto';

import { mapCategory } from './mapper';
import { findCategories } from './query';

export async function getCategories(
  payload: Payload,
): Promise<CategoryDTO[]> {
  const categories =
    await findCategories(payload);

  return categories.map(mapCategory);
}