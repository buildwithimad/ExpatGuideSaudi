import type { Image } from '@/lib/shared/types/image';

export interface SeoPage {
  title: string | null;

  description: string | null;

  image: Image | null;

  noIndex: boolean;

  noFollow: boolean;
}

export interface SeoPages {
  home: SeoPage;

  articles: SeoPage;

  categories: SeoPage;

  authors: SeoPage;

  about: SeoPage;

  contact: SeoPage;

  privacy: SeoPage;

  terms: SeoPage;

  search: SeoPage;

  error404: SeoPage;

  searchResults: SeoPage;
}