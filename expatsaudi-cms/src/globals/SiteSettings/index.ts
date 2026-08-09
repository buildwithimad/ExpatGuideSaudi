import type { GlobalConfig } from 'payload';

import { siteSettingsAccess } from './access';

import { analyticsTab } from './tabs/analytics';
import { brandingTab } from './tabs/branding';
import { featuresTab } from './tabs/features';
import { seoTab } from './tabs/seo';
import { socialTab } from './tabs/social';
import { themeTab } from './tabs/theme';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',

  label: 'Site Settings',

  access: siteSettingsAccess,

  fields: [
    {
      type: 'tabs',

      tabs: [
        brandingTab,
        themeTab,
        seoTab,
        socialTab,
        analyticsTab,
        featuresTab,
      ],
    },
  ],
};