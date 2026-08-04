import Footer from '@/components/Footer';
import Header from '@/components/Header';

import CategoriesSection from '../components/CategoriesSection';
import FAQSection from '../components/FAQSection';
import FeaturedGuide from '../components/FeaturedGuide';
import FinalCTA from '../components/FinalCTA';
import HeroSection from '../components/HeroSection';
import LatestArticles from '../components/LatestArticles';
import NewsletterSection from '../components/NewsletterSection';
import ResourcesSection from '../components/ResourcesSection';
import SearchFilterSection from '../components/SearchFilterSection';
import ToolsSection from '../components/ToolsSection';

import { getHome } from '@/lib/api/home';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
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

  const dict = await getDictionary(
    locale as Locale,
  );

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  return {
    title: dict.metadata.home.title,
    description:
      dict.metadata.home.description,

    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`]),
      ),
    },

    openGraph: {
      title: dict.metadata.home.title,
      description:
        dict.metadata.home.description,

      url: `${siteUrl}/${locale}`,

      images: [
        {
          url: '/assets/images/app_logo.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(
    locale as Locale,
  );

  const {
    featuredArticle,
    latestArticles,
    categories,
    homepage,
  } = await getHome(locale);

  return (
    <>
      <Header
        locale={locale as Locale}
        dict={dict}
      />

      <main>
        <HeroSection dict={dict} />

        <CategoriesSection
          dict={dict}
          locale={locale as Locale}
          categories={categories}
        />

        <FeaturedGuide
          dict={dict}
          locale={locale as Locale}
          article={featuredArticle}
        />

        <LatestArticles
          dict={dict}
          locale={locale as Locale}
          articles={latestArticles}
        />

        <SearchFilterSection
          dict={dict}
          locale={locale as Locale}
          filters={
            homepage.categoryFilters
          }
          popularSearches={
            homepage.popularSearches
          }
        />

        <ToolsSection dict={dict} />

        <ResourcesSection
          dict={dict}
          locale={locale as Locale}
        />

        <NewsletterSection dict={dict} />

        <FAQSection dict={dict} />

        <FinalCTA
          dict={dict}
          locale={locale as Locale}
        />
      </main>

      <Footer
        locale={locale as Locale}
        dict={dict}
      />
    </>
  );
}