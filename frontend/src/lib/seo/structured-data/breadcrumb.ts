import type { BreadcrumbItem } from './types';

/* -------------------------------------------------------------------------- */
/*                                Breadcrumb                                  */
/* -------------------------------------------------------------------------- */

export function buildBreadcrumbStructuredData(
  items: BreadcrumbItem[],
) {
  return {
    '@context': 'https://schema.org',

    '@type': 'BreadcrumbList',

    itemListElement: items.map(
      (item, index) => ({
        '@type': 'ListItem',

        position: index + 1,

        name: item.name,

        item: item.url,
      }),
    ),
  };
}