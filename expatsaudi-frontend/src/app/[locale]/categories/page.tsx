import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCategories } from '@/lib/api/categories';
import { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/seo/resolvePageSeo';

import CategoriesSchema from './CategoriesSchema';
import CategoryPage from './CategoryPage';

/* -------------------------------------------------------------------------- */
/*                           Static Params                                     */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/* -------------------------------------------------------------------------- */
/*                           Page Metadata                                    */
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

  const dict = await getDictionary(
    currentLocale,
  );

  const seo = await resolvePageSeo(
    currentLocale,
    'categories',
    dict.metadata.categories,
  );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: '/categories',
  });
}

/* -------------------------------------------------------------------------- */
/*                              Categories Page                               */
/* -------------------------------------------------------------------------- */

export default async function Page({
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

  const dict = await getDictionary(
    currentLocale,
  );

  const categories =
    await getCategories(
      currentLocale,
    );

  return (
    <>
      <CategoriesSchema
        locale={currentLocale}
      />

      <CategoryPage
        locale={currentLocale}
        dict={dict}
        categories={categories}
      />
    </>
  );
}