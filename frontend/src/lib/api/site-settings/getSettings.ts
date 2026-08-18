import { apiClient } from '../client';

import type { SiteSettings } from './types';

export async function getSettings(
  locale = 'en',
): Promise<SiteSettings> {
  return apiClient<SiteSettings>(
    `/site-settings?locale=${locale}`,
  );
}