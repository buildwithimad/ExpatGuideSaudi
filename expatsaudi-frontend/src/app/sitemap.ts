import type { MetadataRoute } from 'next'

import { getArticles } from '@/lib/api/articles'
import { getCategories } from '@/lib/api/categories'
import {
  locales,
  type Locale,
} from '@/lib/i18n-config'

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://urexpat.com'

const resourceCategories = [
  'government-services',
  'useful-apps',
  'emergency-numbers',
  'public-services',
] as const

const staticPages = [
  {
    path: '',
    priority: 1,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/articles',
    priority: 0.9,
    changeFrequency: 'daily' as const,
  },
  {
    path: '/categories',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/about',
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/contact',
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/privacy-policy',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
  {
    path: '/terms',
    priority: 0.3,
    changeFrequency: 'yearly' as const,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // ---------------------------------------------------------------------------
  // Static pages
  // ---------------------------------------------------------------------------

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    }
  }

  // ---------------------------------------------------------------------------
  // Resource pages
  // ---------------------------------------------------------------------------

  for (const locale of locales) {
    for (const category of resourceCategories) {
      entries.push({
        url: `${baseUrl}/${locale}/resources/${category}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------

  for (const locale of locales) {
    const categories = await getCategories(
      locale as Locale,
    )

    for (const category of categories) {
      if (!category.slug) continue

      entries.push({
        url: `${baseUrl}/${locale}/categories/${category.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  // ---------------------------------------------------------------------------
  // Articles - automatically paginate through all articles
  // ---------------------------------------------------------------------------

  for (const locale of locales) {
    let page = 1
    let totalPages = 1

    do {
      const articles = await getArticles({
        locale: locale as Locale,
        page,
        limit: 100,
      })

      for (const article of articles.docs ?? []) {
        if (!article.slug) continue

        entries.push({
          url: `${baseUrl}/${locale}/articles/${article.slug}`,
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      }

      totalPages =
        articles.pagination?.totalPages ?? 1

      page += 1
    } while (page <= totalPages)
  }

  return entries
}