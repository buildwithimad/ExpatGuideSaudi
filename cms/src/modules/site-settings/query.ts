import type { Locale } from '@/shared/types';
import type { Payload } from 'payload';

import type { SiteSettingsDocument } from './types';

export async function findSiteSettings(
  payload: Payload,
  locale: Locale,
): Promise<SiteSettingsDocument> {
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',

    locale,

    fallbackLocale: 'en',
  });

  return siteSettings as SiteSettingsDocument;
}