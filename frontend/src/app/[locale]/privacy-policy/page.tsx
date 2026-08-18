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

import PrivacyPolicyContent from './PrivacyPolicyContent';
import PrivacyPolicySchema from './PrivacyPolicySchema';

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
    'privacy',
    dict.metadata.privacy,
  );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: '/privacy-policy',
  });
}

/* -------------------------------------------------------------------------- */
/*                         Privacy Policy Page                                */
/* -------------------------------------------------------------------------- */

export default async function LocalePrivacyPolicyPage({
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
      <PrivacyPolicySchema
        locale={currentLocale}
      />

      <Suspense
        fallback={
          <div className="min-h-[500px]" />
        }
      >
        <PrivacyPolicyContent
          locale={currentLocale}
          dict={dict}
        />
      </Suspense>
    </>
  );
}