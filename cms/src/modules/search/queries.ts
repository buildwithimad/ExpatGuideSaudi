import type {
  Payload,
  Where,
} from 'payload';

import { buildSearchConditions } from '@/shared/search/conditions';

import type { Locale } from './types';

export async function resolveCategory(
  payload: Payload,
  slug: string,
  locale: Locale,
): Promise<number | null> {
  const result = await payload.find({
    collection: 'categories',
    locale,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs[0]?.id ?? null;
}

export function buildWhere(
  q: string | null,
  categoryId: number | null,
): Where {
  const where: Where = {
    _status: {
      equals: 'published',
    },
  };

  if (categoryId && q) {
    return {
      and: [
        where,
        {
          category: {
            equals: categoryId,
          },
        },
        {
          or: buildSearchConditions(q),
        },
      ],
    };
  }

  if (categoryId) {
    return {
      and: [
        where,
        {
          category: {
            equals: categoryId,
          },
        },
      ],
    };
  }

  if (q) {
    return {
      and: [
        where,
        {
          or: buildSearchConditions(q),
        },
      ],
    };
  }

  return where;
}

export async function searchArticles(
  payload: Payload,
  locale: Locale,
  page: number,
  limit: number,
  where: Where,
) {
  return payload.find({
    collection: 'articles',

    locale,

    depth: 2,

    page,

    limit,

    sort: '-publishedAt',

    where,
  });
}