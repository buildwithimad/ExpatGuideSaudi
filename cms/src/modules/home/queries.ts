import {
  HOME_ARTICLES_LIMIT,
  HOME_CATEGORIES_LIMIT,
} from './constants';

export async function getHomeQueries(
  payload: any,
  locale: any,
) {
  const [
    featuredResult,
    latestResult,
    categoriesResult,
    siteSettings,
    homepage,
  ] = await Promise.all([
    payload.find({
      collection: 'articles',
      locale,
      depth: 2,
      limit: 1,
      where: {
        featured: {
          equals: true,
        },
      },
    }),

    payload.find({
      collection: 'articles',
      locale,
      depth: 2,
      limit: HOME_ARTICLES_LIMIT,
      sort: '-publishedAt',
    }),

    payload.find({
      collection: 'categories',
      locale,
      limit: HOME_CATEGORIES_LIMIT,
    }),

    payload.findGlobal({
      slug: 'site-settings',
      locale,
    }),

    payload.findGlobal({
      slug: 'homepage',
      locale,
      depth: 2,
    }),
  ]);

  return {
    featuredResult,
    latestResult,
    categoriesResult,
    siteSettings,
    homepage,
  };
}