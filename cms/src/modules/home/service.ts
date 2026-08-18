import { parseLocale } from '@/shared/validators/locale';

import { mapArticle, mapCategory } from './mappers';
import { getHomeQueries } from './queries';

export async function getHome(req: any) {
  const locale = parseLocale(req);

  const {
    featuredResult,
    latestResult,
    categoriesResult,
    siteSettings,
    homepage,
  } = await getHomeQueries(
    req.payload,
    locale,
  );

  return {
    featuredArticle: mapArticle(
      featuredResult.docs[0],
    ),

    latestArticles:
      latestResult.docs.map(mapArticle),

    siteSettings: {
      siteName:
        siteSettings.siteName,

      organizationName:
        siteSettings.organizationName,

      socialLinks:
        siteSettings.socialLinks,
    },

    homepage: {
      categoryFilters:
        categoriesResult.docs.map(
          mapCategory,
        ),

      popularSearches:
        homepage.popularSearches?.map(
          (item: any) => ({
            title: item.title,
            query: item.query,
          }),
        ) ?? [],
    },
  };
}