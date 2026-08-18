import type { Tab } from 'payload';

import { SEO_PAGES } from './constants';
import { pageSeoFields } from './shared/pageSeoFields';

/* -------------------------------------------------------------------------- */
/*                               SEO Page Tabs                                */
/* -------------------------------------------------------------------------- */

export const seoPageTabs: Tab[] =
  SEO_PAGES.map((page) => ({
    label: page.label,

    fields: [
      {
        name: page.name,

        type: 'group',

        fields: pageSeoFields,
      },
    ],
  }));