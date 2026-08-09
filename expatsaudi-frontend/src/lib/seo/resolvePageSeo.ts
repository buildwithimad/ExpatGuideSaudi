// lib/seo/resolvePageSeo.ts

import { getSeoPages } from '@/lib/api/seo-pages';
import type { Locale } from '@/lib/i18n-config';
import type { Image } from '@/lib/shared/types/image';

type Fallback = {
  title: string;
  description: string;
};

export async function resolvePageSeo(
  locale: Locale,
  page: keyof Awaited<
    ReturnType<typeof getSeoPages>
  >,
  fallback: Fallback,
): Promise<{
  title: string;
  description: string;
  ogImages?: Image[];
  noIndex: boolean;
  noFollow: boolean;
}> {
  const seoPages = await getSeoPages(locale);

  const cmsSeo = seoPages[page];

  return {
    title:
      cmsSeo?.title ??
      fallback.title,

    description:
      cmsSeo?.description ??
      fallback.description,

    ogImages:
      cmsSeo?.image
        ? [cmsSeo.image]
        : undefined,

    noIndex:
      cmsSeo?.noIndex ?? false,

    noFollow:
      cmsSeo?.noFollow ?? false,
  };
}