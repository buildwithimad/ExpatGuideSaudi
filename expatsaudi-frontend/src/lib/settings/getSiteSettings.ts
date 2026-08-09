import { cache } from 'react';

import { getSettings } from '@/lib/api/site-settings';

export const getSiteSettings = cache(getSettings);