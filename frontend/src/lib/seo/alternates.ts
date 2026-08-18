import type { Metadata } from 'next';

import { locales } from '@/lib/i18n-config';

/* -------------------------------------------------------------------------- */
/*                               Alternates                                   */
/* -------------------------------------------------------------------------- */

interface BuildAlternatesOptions {
  locale: string;

  siteUrl: string;

  canonical?: string;
}

export function buildAlternates({
  locale,
  siteUrl,
  canonical,
}: BuildAlternatesOptions): Metadata['alternates'] {
  const path =
    canonical ?? '';

  return {
    canonical: `${siteUrl}/${locale}${path}`,

    languages: Object.fromEntries(
      locales.map((l) => [
        l,
        `${siteUrl}/${l}${path}`,
      ]),
    ),
  };
}