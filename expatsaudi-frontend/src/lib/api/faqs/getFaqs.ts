import { apiClient } from '../client'

export interface FAQCategory {
  name: string
  slug: string
}

export interface FAQRelatedArticle {
  title: string
  slug: string
  readingTime: number
}

export interface FAQ {
  id: number
  question: string
  answer: any
  category: FAQCategory | null
  relatedArticles: FAQRelatedArticle[]
}

export interface FAQsResponse {
  docs: FAQ[]
}

export async function getFaqs(
  locale = 'en',
): Promise<FAQsResponse> {
  return apiClient<FAQsResponse>(
    `/faqs?locale=${locale}`,
  )
}