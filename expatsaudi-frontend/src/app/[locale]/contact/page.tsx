import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/seo/resolvePageSeo';

import ContactPageContent from './ContactPageContent';
import ContactSchema from './ContactSchema';

/* -------------------------------------------------------------------------- */
/*                              Static Params                                  */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/* -------------------------------------------------------------------------- */
/*                              Page Metadata                                  */
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
    'contact',
    dict.metadata.contact,
  );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: '/contact',
  });
}

/* -------------------------------------------------------------------------- */
/*                              Contact Page                                   */
/* -------------------------------------------------------------------------- */

export default async function LocaleContactPage({
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
    <ContactSchema locale={currentLocale} />

    <Suspense
      fallback={
        <div className="min-h-[500px]" />
      }
    >
      <ContactPageContent
        locale={currentLocale}
        dict={dict}
      />
    </Suspense>
  </>
);
}