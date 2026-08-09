import type { CollectionOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                                Collection                                  */
/* -------------------------------------------------------------------------- */

export function buildCollectionStructuredData({
  name,
  description,
  url,
  inLanguage,
}: CollectionOptions) {
  return {
    '@context': 'https://schema.org',

    '@type': 'CollectionPage',

    name,

    url,

    ...(description && {
      description,
    }),

    ...(inLanguage && {
      inLanguage,
    }),
  };
}