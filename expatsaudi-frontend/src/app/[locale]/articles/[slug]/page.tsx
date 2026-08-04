import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getArticle } from '@/lib/api/articles';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';

import ArticlePage from './ArticlePage';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const currentLocale = locale as Locale;

  try {
    const article = await getArticle({
      slug,
      locale: currentLocale,
    });

    return {
      title: article.article.title,

      description:
        article.article.excerpt ??
        article.article.subtitle ??
        '',
    };
  } catch {
    return {};
  }
}

export default async function Page({
  params,
}: Props) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  const [dict, article] = await Promise.all([
    getDictionary(currentLocale),
    getArticle({
      slug,
      locale: currentLocale,
    }),
  ]);

  return (
    <ArticlePage
      locale={currentLocale}
      dict={dict}
      article={article}
    />
  );
}