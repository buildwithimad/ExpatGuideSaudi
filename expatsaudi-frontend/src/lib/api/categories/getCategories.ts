import { apiClient } from '../client';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: {
    url: string;
    alt: string;
    width: number;
    height: number;
    sizes: Record<string, string | null>;
  } | null;
}

export async function getCategories(
  locale = 'en',
): Promise<Category[]> {
  return apiClient<Category[]>(
    `/categories?locale=${locale}`,
  );
}