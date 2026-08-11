import type { RichText } from '@/modules/articles/dto'

export type FAQCategoryDTO = {
  name: string
  slug: string
}

export type FAQRelatedArticleDTO = {
  title: string
  slug: string
  readingTime: number
}

export type FAQDTO = {
  id: number
  question: string
  answer: RichText
  category: FAQCategoryDTO | null
  relatedArticles: FAQRelatedArticleDTO[]
}

export type FAQsListDTO = {
  docs: FAQDTO[]
}