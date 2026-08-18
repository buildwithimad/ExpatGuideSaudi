import type { Locale } from '@/shared/types';

/* -------------------------------------------------------------------------- */
/*                               Article Filters                              */
/* -------------------------------------------------------------------------- */

export interface ArticleFilters {
  category?: string;

  featured?: boolean;

  factChecked?: boolean;

  search?: string;
}

/* -------------------------------------------------------------------------- */
/*                            Get Articles Options                            */
/* -------------------------------------------------------------------------- */

export interface GetArticlesOptions {
  locale: Locale;

  page: number;

  limit: number;

  filters?: ArticleFilters;
}

/* -------------------------------------------------------------------------- */
/*                        Get Article Details Options                         */
/* -------------------------------------------------------------------------- */

export interface GetArticleDetailsOptions {
  locale: Locale;

  slug: string;
}
