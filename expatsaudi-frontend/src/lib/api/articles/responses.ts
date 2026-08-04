import type { LexicalDocument } from '@/components/richtext/types';

/* -------------------------------------------------------------------------- */
/*                                   Shared                                   */
/* -------------------------------------------------------------------------- */

export interface Image {
  url: string;
  alt: string;
}

export interface Author {
  fullName: string;
  jobTitle: string | null;
  photo: Image | null;
}

export interface Category {
  name: string;
  slug: string;
}

export interface GovernmentSource {
  id: number;
  name: string;
  officialWebsite: string;
  logo: Image | null;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface Pagination {
  page: number;

  limit: number;

  totalDocs: number;

  totalPages: number;

  hasPrevPage: boolean;

  hasNextPage: boolean;

  prevPage: number | null;

  nextPage: number | null;
}

/* -------------------------------------------------------------------------- */
/*                                 Rich Text                                  */
/* -------------------------------------------------------------------------- */

export type RichText = LexicalDocument;

/* -------------------------------------------------------------------------- */
/*                                Article Card                                */
/* -------------------------------------------------------------------------- */

export interface ArticleCard {
  id: number;

  title: string;

  slug: string;

  excerpt: string | null;

  featuredImage: Image | null;

  author: Author | null;

  category: Category | null;

  publishedAt: string;

  readingTime: number;

  featured: boolean;
}

/* -------------------------------------------------------------------------- */
/*                               Full Article                                 */
/* -------------------------------------------------------------------------- */

export interface Article extends ArticleCard {
  subtitle: string | null;

  content: RichText;

  governmentSources: GovernmentSource[];

  sourceLinks: SourceLink[];

  factChecked: boolean;

  viewCount: number;
}

/* -------------------------------------------------------------------------- */
/*                              Related Article                               */
/* -------------------------------------------------------------------------- */

export interface RelatedArticle {
  title: string;

  slug: string;

  category: string;

  readingTime: number;

  href: string;
}

/* -------------------------------------------------------------------------- */
/*                                Breadcrumb                                  */
/* -------------------------------------------------------------------------- */

export interface Breadcrumb {
  label: string;

  href: string;
}

/* -------------------------------------------------------------------------- */
/*                           Table Of Contents                                */
/* -------------------------------------------------------------------------- */

export interface TOCItem {
  id: string;

  label: string;

  level: 2 | 3 | 4;
}

/* -------------------------------------------------------------------------- */
/*                             Articles Response                              */
/* -------------------------------------------------------------------------- */

export interface ArticlesList {
  docs: ArticleCard[];

  pagination: Pagination;
}

/* -------------------------------------------------------------------------- */
/*                          Article Details Response                          */
/* -------------------------------------------------------------------------- */

export interface ArticleDetails {
  article: Article;

  relatedArticles: RelatedArticle[];

  breadcrumbs: Breadcrumb[];

  tableOfContents: TOCItem[];
}