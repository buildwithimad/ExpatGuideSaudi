import type { Locale } from '@/lib/i18n-config';

/* -------------------------------------------------------------------------- */
/*                             Get Article Request                            */
/* -------------------------------------------------------------------------- */

export interface GetArticleRequest {
  slug: string;

  locale?: Locale;
}

/* -------------------------------------------------------------------------- */
/*                            Get Articles Request                            */
/* -------------------------------------------------------------------------- */

export interface GetArticlesRequest {
  locale?: Locale;

  page?: number;

  limit?: number;

  category?: string;

  search?: string;
}