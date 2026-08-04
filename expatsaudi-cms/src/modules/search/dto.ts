export interface SearchMediaDto {
  id: number;
  alt: string;
  url: string;
  width: number | null;
  height: number | null;
  mimeType: string | null;
  thumbnail: string | null;
  card: string | null;
  hero: string | null;
}

export interface SearchCategoryDto {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  status: string |null;
  sortOrder: number | null;
}

export interface SearchAuthorDto {
  id: number;
  fullName: string;
  slug: string;
  verifiedAuthor: boolean;
  jobTitle: string | null;
  shortBio: string | null;
  linkedin: string | null;
  website: string | null;
  photo: SearchMediaDto | null;
}

export interface SearchGovernmentSourceDto {
  id: number;
  name: string;
  officialWebsite: string | null;
  status: string | null;
  logo: SearchMediaDto | null;
}

export interface SearchArticleDto {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string | null;
  featuredImage: SearchMediaDto | null;
  category: SearchCategoryDto | null;
  author: SearchAuthorDto | null;
  governmentSources: SearchGovernmentSourceDto[];
  readingTime: number | null;
  viewCount: number | null;
  featured: boolean;
  factChecked: boolean;
  publishedAt: string;
}

export interface SearchFiltersDto {
  q: string | null;
  category: string | null;
  locale: string;
}

export interface SearchPaginationDto {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface SearchMetaDto {
  searchTimeMs: number;
  returnedCount: number;
  totalResults: number;
}

export interface SearchResponseDto {
  filters: SearchFiltersDto;
  meta: SearchMetaDto;
  results: SearchArticleDto[];
  pagination: SearchPaginationDto;
}