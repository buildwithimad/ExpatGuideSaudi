import { apiClient } from '../client';

import type { GetArticlesRequest } from './requests';
import type { ArticlesList } from './responses';

export async function getArticles({
  locale = 'en',
  page = 1,
  limit = 12,
  category,
  search,
}: GetArticlesRequest = {}): Promise<ArticlesList> {
  const params = new URLSearchParams({
    locale,
    page: String(page),
    limit: String(limit),
  });

  if (category) {
    params.append('category', category);
  }

  if (search) {
    params.append('search', search);
  }

  return apiClient<ArticlesList>(
    `/articles?${params.toString()}`,
  );
}