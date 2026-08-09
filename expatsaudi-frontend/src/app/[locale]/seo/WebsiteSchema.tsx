import { getSiteSettings } from '@/lib/settings';

import { buildWebsiteStructuredData } from '@/lib/seo/structured-data';

import type { Locale } from '@/lib/i18n-config';

type Props = {
  locale: Locale;
};

export default async function WebsiteSchema({
  locale,
}: Props) {
  const settings =
    await getSiteSettings(locale);

  const {
    branding,
    seo,
  } = settings;

  const siteUrl =
    seo.site.siteUrl.replace(/\/$/, '');

  const schema =
    buildWebsiteStructuredData({
      name:
        branding.identity.siteName,

      url:
        siteUrl,

      description:
        seo.site.defaultMetaDescription ??
        undefined,

      searchUrlTemplate:
        `${siteUrl}/${locale}/search?q={search_term_string}`,
    });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}