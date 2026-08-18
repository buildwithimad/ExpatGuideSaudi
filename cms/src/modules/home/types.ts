import type { Config } from '@/payload-types';

export type Locale =
  NonNullable<Config['locale']>;

export interface HomeQueryResult {
  featuredResult: any;
  latestResult: any;
  categoriesResult: any;
  homepage: any;
  siteSettings: any;
}