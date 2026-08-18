import type {
  SeoPageDTO,
  SeoPagesDTO,
} from './dto';

import type { SeoPagesDocument } from './types';

import { mapImage } from '@/shared/mappers/image';

/* -------------------------------------------------------------------------- */
/*                              Page SEO Mapper                               */
/* -------------------------------------------------------------------------- */

function mapSeoPage(
  page?: SeoPagesDocument['home'],
): SeoPageDTO {
  return {
    title: page?.title ?? null,

    description:
      page?.description ?? null,

    image: mapImage(
      page?.image,
    ),

    noIndex:
      page?.noIndex ?? false,

    noFollow:
      page?.noFollow ?? false,
  };
}

/* -------------------------------------------------------------------------- */
/*                              SEO Pages Mapper                              */
/* -------------------------------------------------------------------------- */

export function mapSeoPages(
  seoPages: SeoPagesDocument,
): SeoPagesDTO {
  return {
    home: mapSeoPage(
      seoPages.home,
    ),

    articles: mapSeoPage(
      seoPages.articles,
    ),

    categories: mapSeoPage(
      seoPages.categories,
    ),

    authors: mapSeoPage(
      seoPages.authors,
    ),

    about: mapSeoPage(
      seoPages.about,
    ),

    contact: mapSeoPage(
      seoPages.contact,
    ),

    privacy: mapSeoPage(
      seoPages.privacy,
    ),

    terms: mapSeoPage(
      seoPages.terms,
    ),

    disclaimer: mapSeoPage(
      seoPages.disclaimer,
    ),

    search: mapSeoPage(
      seoPages.search,
    ),

    error404: mapSeoPage(
      seoPages.error404,
    ),
  };
}