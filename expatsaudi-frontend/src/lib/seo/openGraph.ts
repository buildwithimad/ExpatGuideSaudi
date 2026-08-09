import type { Metadata } from 'next';

import {
    DEFAULT_OPEN_GRAPH_TYPE,
    LOCALE_MAP,
} from './constants';

import type {
    OpenGraphOptions,
    SeoImage,
} from './types';

/* -------------------------------------------------------------------------- */
/*                              Open Graph                                    */
/* -------------------------------------------------------------------------- */

interface BuildOpenGraphOptions {
  locale: string;

  siteUrl: string;

  siteName: string;

  title: string;

  description?: string;

  canonical?: string;

  images?: SeoImage[];

  openGraph?: OpenGraphOptions;
}

export function buildOpenGraph({
  locale,
  siteUrl,
  siteName,
  title,
  description,
  canonical,
  images = [],
  openGraph,
}: BuildOpenGraphOptions): Metadata['openGraph'] {
  const url =
    `${siteUrl}${canonical ?? `/${locale}`}`;

  return {
    type:
      openGraph?.type ??
      DEFAULT_OPEN_GRAPH_TYPE,

    locale:
      LOCALE_MAP[
        locale as keyof typeof LOCALE_MAP
      ] ?? LOCALE_MAP.en,

    url,

    siteName,

    title,

    description,

    images: images.map((image) => ({
      url: image.url,

      width: image.width,

      height: image.height,

      alt: image.alt,
    })),

    publishedTime:
      openGraph?.publishedTime,

    modifiedTime:
      openGraph?.modifiedTime,

    authors:
      openGraph?.authors,

    section:
      openGraph?.section,

    tags:
      openGraph?.tags,
  };
}