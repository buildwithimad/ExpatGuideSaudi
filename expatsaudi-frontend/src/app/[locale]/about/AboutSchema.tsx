import { getSeoPages } from '@/lib/api/seo-pages';
import { type Locale } from '@/lib/i18n-config';
import { getSiteSettings } from '@/lib/settings';

type Props = {
  locale: Locale;
};

export default async function AboutSchema({
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
    seoPages.about;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',

    name:
      pageSeo.title ??
      settings.seo.site.defaultMetaTitle,

    description:
      pageSeo.description ??
      undefined,

    url:
      `${siteUrl}/${locale}/about`,

    inLanguage:
      locale,

    isPartOf: {
      '@type': 'WebSite',

      name:
        settings.branding.identity.siteName,

      url:
        siteUrl,
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