import type { FAQItem } from './types';

/* -------------------------------------------------------------------------- */
/*                                    FAQ                                     */
/* -------------------------------------------------------------------------- */

export function buildFAQStructuredData(
  items: FAQItem[],
) {
  return {
    '@context': 'https://schema.org',

    '@type': 'FAQPage',

    mainEntity: items.map((item) => ({
      '@type': 'Question',

      name: item.question,

      acceptedAnswer: {
        '@type': 'Answer',

        text: item.answer,
      },
    })),
  };
}