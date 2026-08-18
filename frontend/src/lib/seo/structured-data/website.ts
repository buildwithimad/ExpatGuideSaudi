import { buildSearchActionStructuredData } from './searchAction';
import type { WebsiteOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                                 Website                                    */
/* -------------------------------------------------------------------------- */

interface BuildWebsiteOptions
  extends WebsiteOptions {
  searchUrlTemplate?: string;
}

export function buildWebsiteStructuredData({
  name,
  url,
  description,
  searchUrlTemplate,
}: BuildWebsiteOptions) {
  return {
    '@context': 'https://schema.org',

    '@type': 'WebSite',

    name,

    url,

    ...(description && {
      description,
    }),

    ...(searchUrlTemplate && {
      potentialAction:
        buildSearchActionStructuredData({
          target: searchUrlTemplate,
        }),
    }),
  };
}