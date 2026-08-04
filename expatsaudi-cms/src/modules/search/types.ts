import type { Config } from '@/payload-types';

export type Locale = NonNullable<Config['locale']>;

export interface SearchParams {
  q: string | null;
  category: string | null;
  locale: Locale;
  page: number;
  limit: number;
}

export interface SearchMeta {
  searchTimeMs: number;
  returnedCount: number;
  totalResults: number;
}

export interface SearchPagination {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}