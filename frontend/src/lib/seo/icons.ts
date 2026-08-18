import type { Metadata } from 'next';

import type { SeoImage } from './types';

/* -------------------------------------------------------------------------- */
/*                                   Icons                                    */
/* -------------------------------------------------------------------------- */

interface BuildIconsOptions {
  favicon?: SeoImage | null;
  appleTouchIcon?: SeoImage | null;
}

export function buildIcons({
  favicon,
  appleTouchIcon,
}: BuildIconsOptions): Metadata['icons'] {
  const faviconUrl =
    favicon?.url || '/favicon.ico';

  const appleTouchIconUrl =
    appleTouchIcon?.url ||
    '/apple-touch-icon.png';

  return {
    icon: [
      {
        url: faviconUrl,
        type: faviconUrl.endsWith('.svg')
          ? 'image/svg+xml'
          : 'image/png',
      },
    ],

    apple: [
      {
        url: appleTouchIconUrl,
      },
    ],
  };
}