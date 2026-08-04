import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n-config';

const pages = [
  { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/articles', changeFrequency: 'daily' as const, priority: 0.9 },
  { path: '/category', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/article-detail', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/search-results', changeFrequency: 'monthly' as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date('2026-07-29'),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}