import { buildBreadcrumbStructuredData } from '@/lib/seo/structured-data';
import { getSiteSettings } from '@/lib/settings';

import type { Breadcrumb } from '@/lib/api/articles/responses';
import type { Locale } from '@/lib/i18n-config';

type Props = {
  breadcrumbs: Breadcrumb[];
  locale: Locale;
};

export default async function ArticleBreadcrumbSchema({
  breadcrumbs,
  locale,
}: Props) {
  if (!breadcrumbs.length) {
    return null;
  }

  const settings = await getSiteSettings(locale);

  const siteUrl =
    settings.seo.site.siteUrl.replace(/\/$/, '');

  const schema =
    buildBreadcrumbStructuredData(
      breadcrumbs.map((breadcrumb) => ({
        name: breadcrumb.label,

        url:
          breadcrumb.href.startsWith('http')
            ? breadcrumb.href
            : `${siteUrl}${breadcrumb.href}`,
      })),
    );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}