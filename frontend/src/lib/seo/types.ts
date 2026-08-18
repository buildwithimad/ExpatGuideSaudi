import type { Metadata } from 'next';

/* -------------------------------------------------------------------------- */
/*                                   Images                                   */
/* -------------------------------------------------------------------------- */

export interface SeoImage {
  url: string;

  alt?: string;

  width?: number;

  height?: number;
}

/* -------------------------------------------------------------------------- */
/*                                  Authors                                   */
/* -------------------------------------------------------------------------- */

export interface SeoAuthor {
  name: string;

  url?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Robots                                   */
/* -------------------------------------------------------------------------- */

export type RobotsOptions = Metadata['robots'];

/* -------------------------------------------------------------------------- */
/*                                Open Graph                                  */
/* -------------------------------------------------------------------------- */

export type OpenGraphType =
  | 'website'
  | 'article'
  | 'profile'
  | 'book';

export interface OpenGraphOptions {
  type?: OpenGraphType;

  publishedTime?: string;

  modifiedTime?: string;

  authors?: string[];

  section?: string;

  tags?: string[];
}

/* -------------------------------------------------------------------------- */
/*                                   Twitter                                  */
/* -------------------------------------------------------------------------- */

export interface TwitterOptions {
  creator?: string;

  site?: string;

  card?:
    | 'summary'
    | 'summary_large_image'
    | 'player'
    | 'app';
}

/* -------------------------------------------------------------------------- */
/*                              Structured Data                               */
/* -------------------------------------------------------------------------- */

export interface StructuredDataOptions {
  organization?: boolean;

  website?: boolean;

  article?: boolean;

  breadcrumb?: boolean;

  faq?: boolean;

  person?: boolean;

  collection?: boolean;

  other?: Record<string, unknown>[];
}

/* -------------------------------------------------------------------------- */
/*                              Generate Metadata                             */
/* -------------------------------------------------------------------------- */

export interface GenerateMetadataOptions {
  /* ---------------------------------------------------------------------- */
  /* Required                                                               */
  /* ---------------------------------------------------------------------- */

  locale: string;

  /* ---------------------------------------------------------------------- */
  /* Basic SEO                                                              */
  /* ---------------------------------------------------------------------- */

  title?: string;

  description?: string;

  keywords?: string[];

  category?: string;

  canonical?: string;

  /* ---------------------------------------------------------------------- */
  /* Images                                                                 */
  /* ---------------------------------------------------------------------- */

  ogImages?: SeoImage[];

  /* ---------------------------------------------------------------------- */
  /* Authors & Publisher                                                    */
  /* ---------------------------------------------------------------------- */

  authors?: SeoAuthor[];

  creator?: string;

  publisher?: string;

  applicationName?: string;

  /* ---------------------------------------------------------------------- */
  /* Metadata                                                               */
  /* ---------------------------------------------------------------------- */

  robots?: RobotsOptions;

  noIndex?: boolean;

  noFollow?: boolean;

  alternates?: Metadata['alternates'];

  verification?: Metadata['verification'];

  referrer?: Metadata['referrer'];

  manifest?: string;

  archives?: string[];

  /* ---------------------------------------------------------------------- */
  /* Social                                                                 */
  /* ---------------------------------------------------------------------- */

  openGraph?: OpenGraphOptions;

  twitter?: TwitterOptions;

  /* ---------------------------------------------------------------------- */
  /* Structured Data                                                        */
  /* ---------------------------------------------------------------------- */

  structuredData?: StructuredDataOptions;
}