import type { Payload } from 'payload';

import type { Locale } from '@/shared/types';

import type { SiteSettingsDTO } from './dto';

import { mapSiteSettings } from './mapper';
import { findSiteSettings } from './query';

export async function getSiteSettings(
  payload: Payload,
  locale: Locale,
): Promise<SiteSettingsDTO> {
  const settings = await findSiteSettings(
    payload,
    locale,
  );

  return mapSiteSettings(settings);
}