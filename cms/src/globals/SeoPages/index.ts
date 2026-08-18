import type { GlobalConfig } from 'payload';

import { seoPagesAccess } from './access';
import { seoPageTabs } from './fields';
import { seoPagesBeforeChange } from './hooks';

export const SeoPages: GlobalConfig = {
  slug: 'seo-pages',

  label: 'SEO Pages',

  admin: {
    group: 'Settings',
  },

  access: seoPagesAccess,

  hooks: {
    beforeChange: seoPagesBeforeChange,
  },

  fields: [
    {
      type: 'tabs',

      tabs: seoPageTabs,
    },
  ],
};