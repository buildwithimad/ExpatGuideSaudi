import type { ImageDTO } from '@/shared/dto';

/* -------------------------------------------------------------------------- */
/*                                 SEO Page                                   */
/* -------------------------------------------------------------------------- */

export interface SeoPageDTO {
  title: string | null;

  description: string | null;

  image: ImageDTO | null;

  noIndex: boolean;

  noFollow: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                SEO Pages                                   */
/* -------------------------------------------------------------------------- */

export interface SeoPagesDTO {
  home: SeoPageDTO;

  articles: SeoPageDTO;

  categories: SeoPageDTO;

  authors: SeoPageDTO;

  about: SeoPageDTO;

  contact: SeoPageDTO;

  privacy: SeoPageDTO;

  terms: SeoPageDTO;

  search: SeoPageDTO;

  error404: SeoPageDTO;

  disclaimer: SeoPageDTO
}