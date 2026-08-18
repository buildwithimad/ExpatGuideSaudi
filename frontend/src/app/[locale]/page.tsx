import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CategoriesSection from '../components/CategoriesSection';
import FAQSection from '../components/FAQSection';
import FeaturedGuide from '../components/FeaturedGuide';
import FinalCTA from '../components/FinalCTA';
import HeroSection from '../components/HeroSection';
import LatestArticles from '../components/LatestArticles';
import ResourcesSection from '../components/ResourcesSection';
import SearchFilterSection from '../components/SearchFilterSection';
import ToolsSection from '../components/ToolsSection';

import { getFaqs } from '@/lib/api/faqs';
import { getHome } from '@/lib/api/home';


import { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';


import { getCategories } from '@/lib/api/categories';
import { generateSiteMetadata } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/seo/resolvePageSeo';


/* -------------------------------------------------------------------------- */
/*                           Static Params                                     */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/* -------------------------------------------------------------------------- */
/*                           Home Metadata                                    */
/* -------------------------------------------------------------------------- */

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

  const dict = await getDictionary(
    currentLocale,
  );

  const seo = await resolvePageSeo(
    currentLocale,
    'home',
    dict.metadata.home,
  );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: '',
  });
}

/* -------------------------------------------------------------------------- */
/*                               Home Page                                    */
/* -------------------------------------------------------------------------- */

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  const dict = await getDictionary(currentLocale);

  const {
    featuredArticle,
    latestArticles,
    homepage,
  } = await getHome(currentLocale);

  const categories = await getCategories(currentLocale)


  const faqs = await getFaqs(currentLocale)


  return (
    <>
      <HeroSection
        dict={dict}
        locale={currentLocale}
        articles={latestArticles}
      />

       <SearchFilterSection
        dict={dict}
        locale={currentLocale}
        filters={homepage.categoryFilters}
        popularSearches={homepage.popularSearches}
      />

      <CategoriesSection
        dict={dict}
        locale={currentLocale}
        categories={categories}
      />

      <FeaturedGuide
        dict={dict}
        locale={currentLocale}
        article={featuredArticle}
      />

      <LatestArticles
        dict={dict}
        locale={currentLocale}
        articles={latestArticles}
      />

     

      <ToolsSection dict={dict} />

      <ResourcesSection
  dict={dict}
  locale={currentLocale}
  
/>


      <FAQSection dict={dict} locale={currentLocale} faqs={faqs}/>

      <FinalCTA dict={dict} locale={currentLocale} />
    </>
  );
}