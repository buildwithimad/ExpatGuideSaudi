import type { Article } from '@/payload-types';
import type { Locale } from '@/shared/types';
import type { PaginatedDocs, Payload, Where } from 'payload';

import {
  ARTICLE_DEPTH,
  DEFAULT_ARTICLE_SORT,
  RELATED_ARTICLES_LIMIT,
} from './constants';

import type { GetArticlesOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                              Resolve Article                               */
/* -------------------------------------------------------------------------- */

export async function resolveArticle(
  payload: Payload,
  slug: string,
  locale: Locale,
): Promise<Article | null> {
  const result = await payload.find({
    collection: 'articles',
    locale,
    fallbackLocale: 'en',
    depth: ARTICLE_DEPTH,
    limit: 1,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  });

  return (result.docs[0] as Article) ?? null;
}

/* -------------------------------------------------------------------------- */
/*                              Resolve Articles                              */
/* -------------------------------------------------------------------------- */


export async function resolveArticles(
  payload: Payload,
  options: GetArticlesOptions,
): Promise<PaginatedDocs<Article>> {
  const {
    locale,
    page,
    limit,
    filters,
  } = options;

  const where: Where = {
    and: [
      {
        _status: {
          equals: 'published',
        },
      },
    ],
  };

  if (filters?.featured) {
    where.and?.push({
      featured: {
        equals: true,
      },
    });
  }

  if (filters?.factChecked) {
    where.and?.push({
      factChecked: {
        equals: true,
      },
    });
  }

 if (filters?.category) {
  const categoryResult =
    await payload.find({
      collection: 'categories',
      fallbackLocale: 'en',
      limit: 1,
      where: {
        slug: {
          equals: filters.category,
        },
      },
    });

  const categoryId =
    categoryResult.docs[0]?.id;

  if (!categoryId) {
    return {
      docs: [],
      totalDocs: 0,
      page,
      limit,
      totalPages: 0,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }

  where.and?.push({
    category: {
      equals: categoryId,
    },
  });
}

  const search = filters?.search?.trim();

  if (search) {
    where.and?.push({
      or: [
        {
          title: {
            like: search,
          },
        },
        {
          subtitle: {
            like: search,
          },
        },
        {
          excerpt: {
            like: search,
          },
        },
      ],
    });
  }

  return payload.find({
    collection: 'articles',
    locale,
    fallbackLocale: 'en',
    depth: ARTICLE_DEPTH,
    page,
    limit,
    sort: DEFAULT_ARTICLE_SORT,
    where,
  });
}

/* -------------------------------------------------------------------------- */
/*                         Resolve Related Articles                           */
/* -------------------------------------------------------------------------- */

export async function resolveRelatedArticles(
  payload: Payload,
  categoryId: number,
  excludeArticleId: number,
  locale: Locale,
): Promise<Article[]> {
  const result = await payload.find({
    collection: 'articles',
    locale,
    fallbackLocale: 'en',
    depth: ARTICLE_DEPTH,
    limit: RELATED_ARTICLES_LIMIT,
    sort: DEFAULT_ARTICLE_SORT,
    where: {
      and: [
        {
          category: {
            equals: categoryId,
          },
        },
        {
          id: {
            not_equals: excludeArticleId,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
  });

  return result.docs as Article[];
}