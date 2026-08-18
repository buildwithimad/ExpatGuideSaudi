import type { PayloadRequest } from 'payload';

import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
} from '@/shared/constants';

import {
  parseLocale,
} from '@/shared/validators/locale';

import {
  ValidationError,
} from '@/shared/validators/validation-error';

import {
  MAX_QUERY_LENGTH,
  MAX_SLUG_LENGTH,
} from './constants';

import type {
  SearchResponseDto,
} from './dto';

import {
  mapArticle,
} from './mappers';

import {
  buildWhere,
  resolveCategory,
  searchArticles,
} from './queries';

export async function search(
  req: PayloadRequest,
): Promise<SearchResponseDto> {
  const locale = parseLocale(req);

  const url = new URL(
    req.url ?? '',
    'http://localhost',
  );

  const searchParams = url.searchParams;

  const q =
    searchParams.get('q')?.trim() ?? null;

  const category =
    searchParams
      .get('category')
      ?.trim() ?? null;

  if (
    q &&
    q.length > MAX_QUERY_LENGTH
  ) {
    throw new ValidationError(
      'INVALID_QUERY',
      `Query cannot exceed ${MAX_QUERY_LENGTH} characters.`,
    );
  }

  if (
    category &&
    category.length >
      MAX_SLUG_LENGTH
  ) {
    throw new ValidationError(
      'INVALID_QUERY',
      `Category slug cannot exceed ${MAX_SLUG_LENGTH} characters.`,
    );
  }

  const page = Number(
    searchParams.get('page') ??
      DEFAULT_PAGE,
  );

  const limit = Number(
    searchParams.get('limit') ??
      DEFAULT_LIMIT,
  );

  const start = performance.now();

  let categoryId: number | null =
    null;

  if (category) {
    categoryId =
      await resolveCategory(
        req.payload,
        category,
        locale,
      );

    if (!categoryId) {
      throw new ValidationError(
        'CATEGORY_NOT_FOUND',
        'Category not found.',
      );
    }
  }

  const where = buildWhere(
    q,
    categoryId,
  );

  const result =
    await searchArticles(
      req.payload,
      locale,
      page,
      limit,
      where,
    );

  return {
    filters: {
      q,
      category,
      locale,
    },

    meta: {
  searchTimeMs: Math.round(
    performance.now() - start,
  ),

  returnedCount: result.docs.length,

  totalResults: result.totalDocs ?? 0,
},

    results:
      result.docs.map(mapArticle),

   pagination: {
  page: result.page ?? page,
  limit: result.limit ?? limit,
  totalDocs: result.totalDocs ?? 0,
  totalPages: result.totalPages ?? 0,
  hasPrevPage: result.hasPrevPage ?? false,
  hasNextPage: result.hasNextPage ?? false,
  prevPage: result.prevPage ?? null,
  nextPage: result.nextPage ?? null,
},
  };
}