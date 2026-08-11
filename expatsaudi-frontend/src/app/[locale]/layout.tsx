import React, { Suspense } from 'react';

import type { Metadata } from 'next';
import {
  DM_Sans,
  Noto_Kufi_Arabic,
} from 'next/font/google';
import { notFound } from 'next/navigation';

import OrganizationSchema from './seo/OrganizationSchema';
import WebsiteSchema from './seo/WebsiteSchema';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Theme/ThemeProvider';

import { getDictionary } from '@/lib/dictionary';
import {
  localeConfig,
  locales,
  type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/lib/settings';

/* -------------------------------------------------------------------------- */
/*                                  Fonts                                     */
/* -------------------------------------------------------------------------- */

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/*                              Static Params                                 */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

/* -------------------------------------------------------------------------- */
/*                                Metadata                                   */
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

  return generateSiteMetadata({
    locale: locale as Locale,
  });
}

/* -------------------------------------------------------------------------- */
/*                              Locale Layout                                 */
/* -------------------------------------------------------------------------- */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  /* ------------------------------------------------------------------------ */
  /* Validate Locale                                                          */
  /* ------------------------------------------------------------------------ */

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;

  /* ------------------------------------------------------------------------ */
  /* CMS Data                                                                 */
  /* ------------------------------------------------------------------------ */

  const dict = await getDictionary(currentLocale);

  const settings =
    await getSiteSettings(currentLocale);


  /* ------------------------------------------------------------------------ */
  /* Locale Configuration                                                     */
  /* ------------------------------------------------------------------------ */

  const config =
    localeConfig[currentLocale];

  const isArabic =
    currentLocale === 'ar';

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <Providers theme={settings.theme}>
      <div
        lang={config.lang}
        dir={config.dir}
        className={`${dmSans.variable} ${
          notoKufiArabic.variable
        } ${
          isArabic
            ? 'font-arabic'
            : dmSans.className
        }`}
      >
        {/* ---------------------------------------------------------------- */}
        {/* Global Structured Data                                            */}
        {/* ---------------------------------------------------------------- */}

        <OrganizationSchema
          locale={currentLocale}
        />

        <WebsiteSchema
          locale={currentLocale}
        />

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                             */}
        {/* ---------------------------------------------------------------- */}

        <Suspense
          fallback={
            <div className="h-20" />
          }
        >
          <Header
            locale={currentLocale}
            dict={dict}
            settings={settings}
          />
        </Suspense>

        {/* ---------------------------------------------------------------- */}
        {/* Page Content                                                       */}
        {/* ---------------------------------------------------------------- */}

        {children}

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                             */}
        {/* ---------------------------------------------------------------- */}

        <Footer
          locale={currentLocale}
          dict={dict}
          settings={settings}
        />
      </div>
    </Providers>
  );
}