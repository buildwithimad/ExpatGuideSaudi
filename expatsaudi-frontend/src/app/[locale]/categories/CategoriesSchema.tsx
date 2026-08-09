import { getSeoPages } from '@/lib/api/seo-pages';
import { getSiteSettings } from '@/lib/settings';

import { buildCollectionStructuredData } from '@/lib/seo/structured-data';

import type { Locale } from '@/lib/i18n-config';

type Props = {
  locale: Locale;
};

export default async function CategoriesSchema({
  locale,
}: Props) {
  const [settings, seoPages] =
    await Promise.all([
      getSiteSettings(locale),
      getSeoPages(locale),
    ]);

  const siteUrl =
    settings.seo.site.siteUrl.replace(
      /\/$/,
      '',
    );

  const pageSeo =
    seoPages.categories;

  const schema =
    buildCollectionStructuredData({
      name:
        pageSeo.title ??
        'Categories',

      description:
        pageSeo.description ??
        undefined,

      url:
        `${siteUrl}/${locale}/categories`,
    });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          schema,
        ),
      }}
    />
  );
}