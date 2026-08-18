import { apiClient } from '../client';

export interface HomeResponse {
  featuredArticle: any;
  latestArticles: any[];
  categories: any[];
  siteSettings: any;
  homepage: any;
}

export async function getHome(
  locale = 'en',
): Promise<HomeResponse> {
  return apiClient<HomeResponse>(
    `/home?locale=${locale}`,
  );
}