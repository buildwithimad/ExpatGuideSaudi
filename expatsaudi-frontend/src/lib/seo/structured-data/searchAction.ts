import type { SearchActionOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                               Search Action                                */
/* -------------------------------------------------------------------------- */

export function buildSearchActionStructuredData({
  target,
  queryInput = 'required name=search_term_string',
}: SearchActionOptions) {
  return {
    '@type': 'SearchAction',

    target: {
      '@type': 'EntryPoint',

      urlTemplate: target,
    },

    'query-input': queryInput,
  };
}