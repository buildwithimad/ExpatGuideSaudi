import { getSiteSettings } from '@/lib/settings';

import { buildOrganizationStructuredData } from '@/lib/seo/structured-data';

import type { Locale } from '@/lib/i18n-config';

type Props = {
  locale: Locale;
};

export default async function OrganizationSchema({
  locale,
}: Props) {
  const settings =
    await getSiteSettings(locale);

  const {
    branding,
    seo,
    social,
  } = settings;

  const schema =
    buildOrganizationStructuredData({
      name:
        branding.identity.siteName,

      url:
        seo.site.siteUrl,

      description:
        seo.site.defaultMetaDescription ??
        undefined,

      logo:
        branding.logos.primaryLogo ??
        branding.logos.defaultOgImage ??
        undefined,

      sameAs: [
        social.socialProfiles.facebook,
        social.socialProfiles.instagram,
        social.socialProfiles.linkedin,
        social.socialProfiles.x,
        social.socialProfiles.youtube,
        social.socialProfiles.tiktok,
        social.socialProfiles.telegram,
      ].filter(
        (url): url is string => Boolean(url),
      ),
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