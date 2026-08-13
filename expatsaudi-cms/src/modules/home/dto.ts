export interface MediaSizesDTO {
  thumbnail?: string;
  card?: string;
  hero?: string;
  articleAuthor?: string;
}

export interface MediaDTO {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: MediaSizesDTO;
}

export interface AuthorDTO {
  fullName: string;
}

export interface CategoryDTO {
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
}

export interface ArticleDTO {
  title: string;
  slug: string;
  excerpt: string;
  readingTime: number;
  publishedAt: string;
  featuredImage: MediaDTO | null;
  author: AuthorDTO | null;
  category: CategoryDTO | null;
}

export interface HomeResponseDTO {
  featuredArticle: ArticleDTO | null;

  latestArticles: ArticleDTO[];


  siteSettings: {
    siteName: string;
    organizationName: string;
    socialLinks: any[];
  };

  homepage: {
    categoryFilters: CategoryDTO[];

    popularSearches: {
      title: string;
      query: string;
    }[];
  };
}