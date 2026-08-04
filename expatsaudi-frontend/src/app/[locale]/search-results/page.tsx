import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getHome } from '@/lib/api/home';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SearchResultsClient from '../../search-results/components/SearchResultsClient';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://expatsaudi5308.builtwithrocket.new';

  return {
    title: dict.metadata.searchResults.title,
    description: dict.metadata.searchResults.description,
    alternates: {
      canonical: `/${locale}/search-results`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/search-results`])),
    },
    openGraph: { url: `${siteUrl}/${locale}/search-results` },
  };
}



export default async function LocaleSearchResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const home = await getHome(locale as Locale);
const homepage = home.homepage;

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />

      <main className="pt-16 md:pt-[68px]">
        <Suspense
          fallback={
            <div className="container-editorial py-20 text-center">
              <p className="text-muted-foreground">
                {locale === 'ar'
                  ? 'جارٍ تحميل نتائج البحث...'
                  : 'Loading search results...'}
              </p>
            </div>
          }
        >
          <SearchResultsClient
  locale={locale as Locale}
  categoryFilters={homepage.categoryFilters}
  popularSearches={homepage.popularSearches}
/>
        </Suspense>
      </main>

      <Footer locale={locale as Locale} dict={dict} />
    </>
  );
}
