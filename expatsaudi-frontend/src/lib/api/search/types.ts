import type { Locale } from '@/lib/i18n-config';

export interface SearchParams {
  q?: string;
  category?: string;
  locale: Locale;
  page?: number;
  limit?: number;
}

export interface SearchMedia {
  id: number;
  alt: string;
  url: string;
  width: number | null;
  height: number | null;
  mimeType: string | null;
  thumbnail: string | null;
  card: string | null;
  hero: string | null;
}

export interface SearchCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: string | null;
  sortOrder: number | null;
}

export interface SearchAuthor {
  id: number;
  fullName: string;
  slug: string;
  verifiedAuthor: boolean;
  jobTitle: string | null;
  shortBio: string | null;
  linkedin: string | null;
  website: string | null;
  photo: SearchMedia | null;
}

export interface GovernmentSource {
  id: number;
  name: string;
  officialWebsite: string | null;
  status: string | null;
  logo: SearchMedia | null;
}

export interface SearchArticle {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string | null;
  featuredImage: SearchMedia | null;
  category: SearchCategory | null;
  author: SearchAuthor | null;
  governmentSources: GovernmentSource[];
  readingTime: number | null;
  viewCount: number | null;
  featured: boolean;
  factChecked: boolean;
  publishedAt: string;
}

export interface SearchFilters {
  q: string | null;
  category: string | null;
  locale: Locale;
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

export interface SearchResponse {
  filters: SearchFilters;
  meta: SearchMeta;
  results: SearchArticle[];
  pagination: SearchPagination;
}