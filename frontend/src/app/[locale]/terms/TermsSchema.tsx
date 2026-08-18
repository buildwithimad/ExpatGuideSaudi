import { getSeoPages } from '@/lib/api/seo-pages';
import { getSiteSettings } from '@/lib/settings';

import type { Locale } from '@/lib/i18n-config';

type Props = {
  locale: Locale;
};

export default async function TermsSchema({
  locale,
}: Props) {
  const [settings, seoPages] = await Promise.all([
    getSiteSettings(locale),
    getSeoPages(locale),
  ]);

  const siteUrl =
    settings.seo.site.siteUrl.replace(
      /\/$/,
      '',
    );

  const pageSeo = seoPages.terms;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',

    name:
      pageSeo?.title ??
      settings.seo.site.defaultMetaTitle,

    description:
      pageSeo?.description ??
      settings.seo.site.defaultMetaDescription ??
      undefined,

    url:
      `${siteUrl}/${locale}/terms`,

    inLanguage: locale,

    isPartOf: {
      '@type': 'WebSite',

      name:
        settings.seo.site.defaultMetaTitle,

      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}