import type { Metadata } from 'next';

import { DEFAULT_TWITTER_CARD } from './constants';

import type {
    SeoImage,
    TwitterOptions,
} from './types';

/* -------------------------------------------------------------------------- */
/*                                  Twitter                                   */
/* -------------------------------------------------------------------------- */

interface BuildTwitterOptions {
  title: string;

  description?: string;

  images?: SeoImage[];

  twitter?: TwitterOptions;
}

export function buildTwitter({
  title,
  description,
  images = [],
  twitter,
}: BuildTwitterOptions): Metadata['twitter'] {
  return {
    card:
      twitter?.card ??
      DEFAULT_TWITTER_CARD,

    creator:
      twitter?.creator,

    site:
      twitter?.site,

    title,

    description,

    images: images.map(
      (image) => image.url,
    ),
  };
}