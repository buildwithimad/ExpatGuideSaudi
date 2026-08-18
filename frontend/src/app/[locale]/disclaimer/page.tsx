import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getDictionary } from '@/lib/dictionary';
import {
    locales,
    type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { resolvePageSeo } from '@/lib/seo/resolvePageSeo';

import DisclaimerPageContent from './DisclaimerPageContent';
import DisclaimerSchema from './DisclaimerSchema';

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

  const currentLocale =
    locale as Locale;

  const dict =
    await getDictionary(
      currentLocale,
    );

  const seo =
    await resolvePageSeo(
      currentLocale,
      'disclaimer',
      dict.metadata.disclaimer,
    );

  return generateSiteMetadata({
    locale: currentLocale,

    ...seo,

    canonical: `/disclaimer`,
  });
}

export default async function LocaleDisclaimerPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } =
    await params;

  if (
    !locales.includes(locale as Locale)
  ) {
    notFound();
  }

  const currentLocale =
    locale as Locale;

  const dict =
    await getDictionary(
      currentLocale,
    );

  return (
    <>
      <DisclaimerSchema
        locale={currentLocale}
      />

      <DisclaimerPageContent
        locale={currentLocale}
        dict={dict}
      />
    </>
  );
}