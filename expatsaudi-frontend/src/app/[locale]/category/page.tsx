import { getCategories } from '@/lib/api/categories';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';
import { notFound } from 'next/navigation';

import CategoryPage from './CategoryPage';

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

  const dict = await getDictionary(locale as Locale);

  const categories = await getCategories(locale);

  return (
    <CategoryPage
      locale={locale as Locale}
      dict={dict}
      categories={categories}
    />
  );
}