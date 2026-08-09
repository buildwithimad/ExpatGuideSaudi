import type { Locale } from '@/lib/i18n-config';
import { getSiteSettings } from '@/lib/settings';

type Props = {
  locale: Locale;
};

export default async function ContactSchema({
  locale,
}: Props) {
  const settings = await getSiteSettings(locale);

  const {
    branding,
    seo,
  } = settings;

  const siteUrl = seo.site.siteUrl.replace(/\/$/, '');

  const organizationName =
    branding.identity.organizationName ||
    branding.identity.siteName;

  const schema = {
    '@context': 'https://schema.org',

    '@type': 'ContactPage',

    name:
      locale === 'ar'
        ? 'تواصل معنا'
        : 'Contact Expat Guides',

    url:
      `${siteUrl}/${locale}/contact`,

    isPartOf: {
      '@type': 'WebSite',
      name:
        branding.identity.siteName,
      url: siteUrl,
    },

    about: {
      '@type': 'Organization',
      name: organizationName,
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