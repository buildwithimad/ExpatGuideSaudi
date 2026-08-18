import type { PersonOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                                  Person                                    */
/* -------------------------------------------------------------------------- */

export function buildPersonStructuredData({
  name,
  url,
  image,
  description,
  sameAs = [],
}: PersonOptions) {
  return {
    '@context': 'https://schema.org',

    '@type': 'Person',

    name,

    ...(url && {
      url,
    }),

    ...(description && {
      description,
    }),

    ...(image && {
      image: {
        '@type': 'ImageObject',

        url: image.url,

        ...(image.width && {
          width: image.width,
        }),

        ...(image.height && {
          height: image.height,
        }),
      },
    }),

    ...(sameAs.length > 0 && {
      sameAs,
    }),
  };
}