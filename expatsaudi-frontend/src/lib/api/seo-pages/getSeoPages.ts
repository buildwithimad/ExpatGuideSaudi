import { apiClient } from '../client';

import type { SeoPages } from './types';

export async function getSeoPages(
  locale = 'en',
): Promise<SeoPages> {
  return apiClient(
    `/seo-pages?locale=${locale}`,
  );
}