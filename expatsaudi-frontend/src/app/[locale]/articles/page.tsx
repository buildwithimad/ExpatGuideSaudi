  import { getArticles } from '@/lib/api/articles';
import { getCategories } from '@/lib/api/categories';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

  import ArticlesPageContent from './ArticlesPageContent';

  export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
  }

  export async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;

    if (!locales.includes(locale as Locale)) {
      return {};
    }

    const currentLocale = locale as Locale;

    const dict = await getDictionary(currentLocale);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

    return {
      title: dict.metadata.articles.title,

      description: dict.metadata.articles.description,

      alternates: {
        canonical: `/${currentLocale}/articles`,

        languages: Object.fromEntries(
          locales.map((l) => [l, `/${l}/articles`]),
        ),
      },

      openGraph: {
        url: `${siteUrl}/${currentLocale}/articles`,
      },
    };
  }

  export default async function LocaleArticlesPage({
    params,
    searchParams,
  }: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
      category?: string;
      page?: string;
      search?: string;
    }>;
  }) {
    const { locale } = await params;

    const {
      category,
      page,
      search,
    } = await searchParams;

    if (!locales.includes(locale as Locale)) {
      notFound();
    }

    const currentLocale = locale as Locale;

    const articles = await getArticles({
      locale: currentLocale,
      page: Number(page ?? 1),
      limit: 12,
      category,
      search,
    });

      const categories = await getCategories(locale);


    return (
      <ArticlesPageContent
  locale={currentLocale}
  articles={articles}
  categories={categories}
  selectedCategory={category}
/>
    );
  }