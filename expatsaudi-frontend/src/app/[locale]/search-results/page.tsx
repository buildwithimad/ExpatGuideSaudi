import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getHome } from '@/lib/api/home';
import { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/seo/resolvePageSeo';

import SearchResultsClient from '../../search-results/components/SearchResultsClient';

/* -------------------------------------------------------------------------- */
/*                              Static Params                                 */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/* -------------------------------------------------------------------------- */
/*                              Page Metadata                                 */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const currentLocale = locale as Locale;

  const dict = await getDictionary(currentLocale);

  const seo = await resolvePageSeo(
    currentLocale,
    'search',
    dict.metadata.searchResults,
  );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: '/search-results',

    // Search result pages should not be indexed.
    noIndex: true,
    noFollow: false,
  });
}

/* -------------------------------------------------------------------------- */
/*                           Search Results Page                              */
/* -------------------------------------------------------------------------- */

export default async function LocaleSearchResultsPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  const dict = await getDictionary(currentLocale);

  const home = await getHome(currentLocale);

  const homepage = home.homepage;

  return (
    <main className="pt-16 md:pt-[68px]">
      <Suspense
        fallback={
          <div className="container-editorial py-20 text-center">
            <p className="text-muted-foreground">
              {currentLocale === 'ar'
                ? 'جارٍ تحميل نتائج البحث...'
                : 'Loading search results...'}
            </p>
          </div>
        }
      >
        <SearchResultsClient
          locale={currentLocale}
          dict={dict}
          categoryFilters={homepage.categoryFilters}
          popularSearches={homepage.popularSearches}
        />
      </Suspense>
    </main>
  );
}

