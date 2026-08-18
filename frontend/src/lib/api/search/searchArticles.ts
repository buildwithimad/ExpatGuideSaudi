import { apiClient } from '../client';

import type {
    SearchParams,
    SearchResponse,
} from './types';

export async function searchArticles(
  params: SearchParams,
): Promise<SearchResponse> {
  const search = new URLSearchParams();

  if (params.q) {
    search.set('q', params.q);
  }

  if (params.category) {
    search.set(
      'category',
      params.category,
    );
  }

  if (params.locale) {
    search.set(
      'locale',
      params.locale,
    );
  }

  if (params.page) {
    search.set(
      'page',
      params.page.toString(),
    );
  }

  if (params.limit) {
    search.set(
      'limit',
      params.limit.toString(),
    );
  }

  return apiClient<SearchResponse>(
    `/search?${search.toString()}`,
  );
}