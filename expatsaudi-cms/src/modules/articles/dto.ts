import type { Article } from '@/payload-types';
import type { ImageDTO, PaginationDTO } from '@/shared/dto';
import type { ApiSuccessResponse } from '@/shared/types';

/* -------------------------------------------------------------------------- */
/*                                 Rich Text                                  */
/* -------------------------------------------------------------------------- */

export type RichText = Article['content'];

/* -------------------------------------------------------------------------- */
/*                                Shared DTOs                                 */
/* -------------------------------------------------------------------------- */

export interface SourceLinkDTO {
  label: string;
  url: string;
}

export interface ArticleCategoryDTO {
  name: string;
  slug: string;
}

export interface ArticleAuthorDTO {
  fullName: string;
  jobTitle: string | null;
  photo: ImageDTO | null;
}

export interface ArticleGovernmentSourceDTO {
  id: number;
  name: string;
  officialWebsite: string;
  logo: ImageDTO | null;
}


/* -------------------------------------------------------------------------- */
/*                          Artcile  SEO  DTO                              */
/* -------------------------------------------------------------------------- */

export interface ArticleSeoDTO {
  title: string;

  description: string | null;

  image: ImageDTO | null;

  noIndex: boolean;

  noFollow: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              Base Article DTO                              */
/* -------------------------------------------------------------------------- */

export interface BaseArticleDTO {
  id: number;

  title: string;
  slug: string;

  excerpt: string | null;

  featuredImage: ImageDTO | null;

  author: ArticleAuthorDTO | null;

  category: ArticleCategoryDTO | null;

  publishedAt: string;

  readingTime: number;
}

/* -------------------------------------------------------------------------- */
/*                              Article Card DTO                              */
/* -------------------------------------------------------------------------- */

export interface ArticleCardDTO extends BaseArticleDTO {
  featured: boolean;
}

/* -------------------------------------------------------------------------- */
/*                             Article Details DTO                            */
/* -------------------------------------------------------------------------- */

export interface ArticleDTO extends BaseArticleDTO {
  subtitle: string | null;

  content: RichText;

  seo: ArticleSeoDTO;

  governmentSources: ArticleGovernmentSourceDTO[];

  sourceLinks: SourceLinkDTO[];

  featured: boolean;

  factChecked: boolean;

  viewCount: number;

  publishedAt: string;

  updatedAt: string;

  lastVerifiedAt: string | null;

}

/* -------------------------------------------------------------------------- */
/*                            Related Articles DTO                            */
/* -------------------------------------------------------------------------- */

export interface RelatedArticleDTO {
  title: string;

  slug: string;

  category: string;

  readingTime: number;

}

/* -------------------------------------------------------------------------- */
/*                              Breadcrumb DTO                                */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbDTO {
  label: string;

  href: string;
}

/* -------------------------------------------------------------------------- */
/*                            Table of Contents DTO                           */
/* -------------------------------------------------------------------------- */

export interface TOCItemDTO {
  id: string;

  label: string;

  level: 2 | 3 | 4;
}

/* -------------------------------------------------------------------------- */
/*                             Articles List DTO                              */
/* -------------------------------------------------------------------------- */

export interface ArticlesListDTO {
  docs: ArticleCardDTO[];

  pagination: PaginationDTO;
}

/* -------------------------------------------------------------------------- */
/*                           Article Details DTO                              */
/* -------------------------------------------------------------------------- */

export interface ArticleDetailsDTO {
  article: ArticleDTO;

  relatedArticles: RelatedArticleDTO[];

  breadcrumbs: BreadcrumbDTO[];

  tableOfContents: TOCItemDTO[];
}




/* -------------------------------------------------------------------------- */
/*                              API Responses                                 */
/* -------------------------------------------------------------------------- */

export type ArticlesResponse =
  ApiSuccessResponse<ArticlesListDTO>;

export type ArticleDetailsResponse =
  ApiSuccessResponse<ArticleDetailsDTO>;