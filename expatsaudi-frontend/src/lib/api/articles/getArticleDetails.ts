import { apiClient } from '../client';

import type { GetArticleRequest } from './requests';
import type { ArticleDetails } from './responses';

export async function getArticle({
  slug,
  locale = 'en',
}: GetArticleRequest): Promise<ArticleDetails> {
  const params = new URLSearchParams({
    locale,
  });

  return apiClient<ArticleDetails>(
    `/articles/${slug}?${params.toString()}`,
  );
}