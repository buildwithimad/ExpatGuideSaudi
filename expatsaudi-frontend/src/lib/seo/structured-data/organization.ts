import type { OrganizationOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                              Organization                                  */
/* -------------------------------------------------------------------------- */

export function buildOrganizationStructuredData({
  name,
  url,
  logo,
  description,
  sameAs = [],
}: OrganizationOptions) {
  return {
    '@context': 'https://schema.org',

    '@type': 'Organization',

    name,

    url,

    ...(description && {
      description,
    }),

    ...(logo && {
      logo: {
        '@type': 'ImageObject',

        url: logo.url,

        ...(logo.width && {
          width: logo.width,
        }),

        ...(logo.height && {
          height: logo.height,
        }),
      },
    }),

    ...(sameAs.length > 0 && {
      sameAs,
    }),
  };
}