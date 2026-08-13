import { buildBreadcrumbStructuredData } from '@/lib/seo/structured-data';

import type { Breadcrumb } from '@/lib/api/articles/responses';

type Props = {
  breadcrumbs: Breadcrumb[];
};

export default function ArticleBreadcrumbSchema({
  breadcrumbs,
}: Props) {
  if (!breadcrumbs.length) {
    return null;
  }

  const schema = buildBreadcrumbStructuredData(
    breadcrumbs.map((breadcrumb) => ({
      name: breadcrumb.label,
      url: breadcrumb.href,
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