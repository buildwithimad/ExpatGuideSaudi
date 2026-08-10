import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/seo/resolvePageSeo';

import TermsPageContent from './TermsPageContent';
import TermsSchema from './TermsSchema';

/* -------------------------------------------------------------------------- */
/*                           Static Params                                    */
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

  const dict = await getDictionary(currentLocale);

  const seo = await resolvePageSeo(
    currentLocale,
    'terms',
    dict.metadata.terms,
  );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: '/terms',
  });
}

/* -------------------------------------------------------------------------- */
/*                              Terms Page                                    */
/* -------------------------------------------------------------------------- */

export default async function LocaleTermsPage({
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

return (
  <>
    <TermsSchema
      locale={currentLocale}
    />

    <TermsPageContent
      locale={currentLocale}
      dict={dict}
    />
  </>
);
}