/* -------------------------------------------------------------------------- */
/*                                   Image                                    */
/* -------------------------------------------------------------------------- */

export interface StructuredDataImage {
  url: string;

  width?: number;

  height?: number;
}

/* -------------------------------------------------------------------------- */
/*                                Organization                                */
/* -------------------------------------------------------------------------- */

export interface OrganizationOptions {
  name: string;

  url: string;

  logo?: StructuredDataImage;

  description?: string;

  sameAs?: string[];
}

/* -------------------------------------------------------------------------- */
/*                                  Website                                   */
/* -------------------------------------------------------------------------- */

export interface WebsiteOptions {
  name: string;

  url: string;

  description?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Person                                    */
/* -------------------------------------------------------------------------- */

export interface PersonOptions {
  name: string;

  url?: string;

  image?: StructuredDataImage;

  description?: string;

  sameAs?: string[];
}

/* -------------------------------------------------------------------------- */
/*                                  Article                                   */
/* -------------------------------------------------------------------------- */

export interface ArticleOptions {
  headline: string;

  description?: string;

  url: string;

  image?: {
    url: string;
    width?: number;
    height?: number;
  };

  author?: {
    name: string;
    url?: string;
  };

  publisher: {
    name: string;
    url?: string;

    logo?: {
      url: string;
      width?: number;
      height?: number;
    };
  };

  datePublished: string;

  dateModified?: string;

  articleSection?: string;

  keywords?: string[];

  inLanguage?: string;

  isAccessibleForFree?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                Breadcrumb                                  */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbItem {
  name: string;

  url: string;
}

/* -------------------------------------------------------------------------- */
/*                                    FAQ                                     */
/* -------------------------------------------------------------------------- */

export interface FAQItem {
  question: string;

  answer: string;
}

/* -------------------------------------------------------------------------- */
/*                                Collection                                  */
/* -------------------------------------------------------------------------- */

export interface CollectionOptions {
  name: string;

  url: string;

  description?: string;

  inLanguage?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Search Action                                */
/* -------------------------------------------------------------------------- */

export interface SearchActionOptions {
  target: string;

  queryInput?: string;
}