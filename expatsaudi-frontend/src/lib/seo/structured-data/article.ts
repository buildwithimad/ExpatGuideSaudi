import type { ArticleOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                                  Article                                   */
/* -------------------------------------------------------------------------- */

export function buildArticleStructuredData({
  headline,
  description,
  url,
  image,
  author,
  publisher,
  datePublished,
  dateModified,
  articleSection,
  keywords = [],
  inLanguage,
  isAccessibleForFree = true,
}: ArticleOptions) {
  return {
    '@context': 'https://schema.org',

    '@type': 'Article',

    headline,

    ...(description && {
      description,
    }),

    ...(inLanguage && {
      inLanguage,
    }),

    isAccessibleForFree,

    mainEntityOfPage: {
      '@type': 'WebPage',

      '@id': url,
    },

    ...(image && {
      image: [
        {
          '@type': 'ImageObject',

          url: image.url,

          ...(image.width && {
            width: image.width,
          }),

          ...(image.height && {
            height: image.height,
          }),
        },
      ],
    }),

    ...(author && {
      author: {
        '@type': 'Person',

        name: author.name,

        ...(author.url && {
          url: author.url,
        }),
      },
    }),

    publisher: {
      '@type': 'Organization',

      name: publisher.name,

      ...(publisher.url && {
        url: publisher.url,
      }),

      ...(publisher.logo && {
        logo: {
          '@type': 'ImageObject',

          url: publisher.logo.url,

          ...(publisher.logo.width && {
            width: publisher.logo.width,
          }),

          ...(publisher.logo.height && {
            height: publisher.logo.height,
          }),
        },
      }),
    },

    datePublished,

    dateModified:
      dateModified ??
      datePublished,

    ...(articleSection && {
      articleSection,
    }),

    ...(keywords.length > 0 && {
      keywords,
    }),
  };
}