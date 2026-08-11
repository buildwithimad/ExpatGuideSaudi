import type {
    Article,
    Category,
    Faq,
} from '@/payload-types'

import type {
    FAQCategoryDTO,
    FAQDTO,
    FAQRelatedArticleDTO,
} from './dto'

/* -------------------------------------------------------------------------- */
/*                         Category Mapper                                    */
/* -------------------------------------------------------------------------- */

export function mapFAQCategory(
  category: Category | number | null | undefined,
): FAQCategoryDTO | null {
  if (!category || typeof category !== 'object') {
    return null
  }

  return {
    name: category.name,
    slug: category.slug,
  }
}

/* -------------------------------------------------------------------------- */
/*                      Related Article Mapper                                */
/* -------------------------------------------------------------------------- */

export function mapFAQRelatedArticle(
  article: Article | number,
): FAQRelatedArticleDTO | null {
  if (!article || typeof article !== 'object') {
    return null
  }

  return {
    title: article.title,
    slug: article.slug,
    readingTime: article.readingTime ?? 0,
  }
}

/* -------------------------------------------------------------------------- */
/*                             FAQ Mapper                                     */
/* -------------------------------------------------------------------------- */

export function mapFAQ(
  faq: Faq,
): FAQDTO {
  return {
    id: faq.id,

    question: faq.question,

    answer: faq.answer,

    category: mapFAQCategory(
      faq.category,
    ),

    relatedArticles:
      faq.relatedArticles
        ?.map(mapFAQRelatedArticle)
        .filter(
          (
            article,
          ): article is FAQRelatedArticleDTO =>
            article !== null,
        ) ?? [],
  }
}