import React, { Suspense } from 'react';

import type { Metadata } from 'next';
import {
  DM_Sans,
  Noto_Kufi_Arabic,
  Noto_Nastaliq_Urdu,
} from 'next/font/google';
import { notFound, redirect } from 'next/navigation';

import BackToTop from '@/components/Features/BacktoTop';
import SocialLinks from '@/components/Features/SocialProfiles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LocaleDocument from '@/components/LocaleDocument';
import Providers from '@/components/Theme/ThemeProvider';

import GoogleTagManager from '@/components/Analytics/GoogleTagManager';

import MaintenancePage from '@/components/Maintenance/MaintenancePage';


import { getCategories } from '@/lib/api/categories';
import { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';
import { generateSiteMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/lib/settings';

import OrganizationSchema from './seo/OrganizationSchema';
import WebsiteSchema from './seo/WebsiteSchema';

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

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-urdu',
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

 

  const maintenanceMode =
  settings?.features?.website?.maintenanceMode ?? false;

  const enableSearch =
  settings?.features?.website?.enableSearch ?? true;

  const enableDarkMode =
  settings?.features?.website?.enableDarkMode ?? true;

  const enableSecondaryNavbar =
  settings?.features?.website?.enableSecondaryNavbar ?? true;


  const enableLanguageSwitcher =
  settings?.features?.website?.enableLanguageSwitcher ?? true;


   if (!enableLanguageSwitcher && currentLocale !== 'en') {
  redirect('/en');
}

  const enableBackToTop =
  settings?.features?.website?.enableBackToTop ?? true;

  const enableSocialProfile =
  settings?.features?.website?.enableSocialProfile ?? true;





 

  
  const categories= (await getCategories(currentLocale)).slice(0,6)

  const googleTagManagerID = settings.analytics.services.googleTagManagerId


  /* ------------------------------------------------------------------------ */
  /* Locale Configuration                                                     */
  /* ------------------------------------------------------------------------ */

  const isArabic =
  currentLocale === 'ar';

const isUrdu =
  currentLocale === 'ur';

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */


  if (maintenanceMode) {
  return (
    <MaintenancePage
      locale={currentLocale}
      settings={settings}
    />
  );
}

  return (

    
    <Providers theme={settings.theme}>

      <GoogleTagManager
      gtmId={googleTagManagerID}
    />

      <LocaleDocument
        locale={currentLocale}
      />

     <div
  className={`${dmSans.variable} ${
    notoKufiArabic.variable
  } ${
    notoNastaliqUrdu.variable
  } ${
    isUrdu
      ? 'font-urdu'
      : isArabic
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
            enableSearch={enableSearch}
            enableDarkMode={enableDarkMode}
            enableLanguageSwitcher={enableLanguageSwitcher}
            enableSecondaryNavbar={enableSecondaryNavbar}
          />
        </Suspense>

        {/* ---------------------------------------------------------------- */}
        {/* Page Content                                                       */}
        {/* ---------------------------------------------------------------- */}

        {children}

        {/* ---------------------------------------------------------------- */}
        {/* Social Links                                                       */}
        {/* ---------------------------------------------------------------- */}

        {enableSocialProfile && 
        <SocialLinks
          socialProfiles={settings.social?.socialProfiles}
        />
        }
        

        {enableBackToTop && <BackToTop />}

        {/* ---------------------------------------------------------------- */}
        {/* Footer                                                             */}
        {/* ---------------------------------------------------------------- */}

        <Footer
          locale={currentLocale}
          dict={dict}
          settings={settings}
          categories={categories}
        />
      </div>
    </Providers>
  );
}