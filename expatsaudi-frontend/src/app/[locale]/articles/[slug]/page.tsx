import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getArticle } from '@/lib/api/articles';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';


import { generateSiteMetadata } from '@/lib/seo';
import ArticleSchema from './ArticleSchema';

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
    const { article } = await getArticle({
      slug,
      locale: currentLocale,
    });

    return generateSiteMetadata({
      locale: currentLocale,

      title: article.seo.title,

      description:
        article.seo.description ?? undefined,

      canonical:
        `/${currentLocale}/articles/${article.slug}`,

      ogImages:
        article.seo.image
          ? [article.seo.image]
          : article.featuredImage
            ? [article.featuredImage]
            : undefined,

      noIndex:
        article.seo.noIndex,

      noFollow:
        article.seo.noFollow,

      openGraph: {
        type: 'article',

        publishedTime:
          article.publishedAt,

        modifiedTime:
          article.updatedAt,

        authors:
          article.author
            ? [article.author.fullName]
            : undefined,

        section:
          article.category?.name,
      },
    });
  } catch (error) {
    console.error(
      'Article metadata generation failed:',
      error,
    );

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


console.log("Artcile Details: ", article)


  return (
    <>

     <ArticleSchema
      article={article.article}
      locale={currentLocale}
    />
    <ArticlePage
      locale={currentLocale}
      dict={dict}
      article={article}
    />
    </>
  );
}