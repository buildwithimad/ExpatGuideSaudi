import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/seo/resolvePageSeo';
import AboutPageContent from './AboutPageContent';

import AboutSchema from './AboutSchema';

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
    'about',
    dict.metadata.about,
  );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: '/about',
  });
}

/* -------------------------------------------------------------------------- */
/*                              About Page                                    */
/* -------------------------------------------------------------------------- */

export default async function LocaleAboutPage({
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

  return (
    <>
      <AboutSchema
        locale={currentLocale}
      />

       <AboutPageContent
  locale={currentLocale}
  dict={dict}
/>
    </>
  );
}