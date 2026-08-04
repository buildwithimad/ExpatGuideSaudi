import type { Payload } from 'payload';

import type {
    ArticleDetailsDTO,
    ArticlesListDTO,
} from './dto';

import type {
    GetArticleDetailsOptions,
    GetArticlesOptions,
} from './types';

import {
    buildBreadcrumbs,
    buildTableOfContents,
    mapArticle,
    mapArticleCard,
    mapRelatedArticle,
} from './mappers';

import {
    resolveArticle,
    resolveArticles,
    resolveRelatedArticles,
} from './queries';

import { mapPagination } from '@/shared/mappers';

import { NotFoundError } from '@/shared/validators';


export async function getArticles(
  payload: Payload,
  options: GetArticlesOptions,
): Promise<ArticlesListDTO> {

  const result = await resolveArticles(payload, options);

 return {
  docs: result.docs.map(mapArticleCard),

  pagination: mapPagination(result),
};
}


export async function getArticleDetails(
  payload: Payload,
  options: GetArticleDetailsOptions,
): Promise<ArticleDetailsDTO> {
  const {
    locale,
    slug,
  } = options;

  const article = await resolveArticle(
    payload,
    slug,
    locale,
  );

  if (!article) {
    throw new NotFoundError(
  'ARTICLE_NOT_FOUND',
  'Article not found.',
);
  }

  const categoryId =
    typeof article.category === 'object'
      ? article.category.id
      : article.category;

  const relatedArticles = categoryId
    ? await resolveRelatedArticles(
        payload,
        categoryId,
        article.id,
        locale,
      )
    : [];

  return {
    article: mapArticle(article),

    relatedArticles:
      relatedArticles.map(mapRelatedArticle),

    breadcrumbs:
      buildBreadcrumbs(article),

    tableOfContents:
      buildTableOfContents(article.content),
  };
}