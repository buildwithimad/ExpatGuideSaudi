import type { GlobalConfig } from 'payload';

import { siteConfigurationAccess } from '@/access/roles';

export const siteSettingsAccess: GlobalConfig['access'] =
  siteConfigurationAccess;