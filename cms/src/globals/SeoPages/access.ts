import type { GlobalConfig } from 'payload';

import { globalAccess } from '@/access/roles';

/* -------------------------------------------------------------------------- */
/*                             SEO Pages Access                               */
/* -------------------------------------------------------------------------- */

export const seoPagesAccess: GlobalConfig['access'] =
  globalAccess;