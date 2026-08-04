import React from 'react';
import type { Metadata } from 'next';
import { DM_Sans, Noto_Kufi_Arabic } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, localeConfig, type Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionary';
import '../../styles/tailwind.css';

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

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://expatsaudi5308.builtwithrocket.new';

  return {
    metadataBase: new URL(siteUrl),
    title: dict.metadata.home.title,
    description: dict.metadata.home.description,
    icons: { icon: [{ url: '/favicon.ico', type: 'image/x-icon' }] },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const config = localeConfig[locale as Locale];
  const isArabic = locale === 'ar';

  return (
    <html
      lang={config.lang}
      dir={config.dir}
      className={`${dmSans.variable} ${notoKufiArabic.variable}`}
    >
      <body className={isArabic ? `font-arabic` : dmSans.className}>
        {children}
        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fexpatsaudi5308back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.19"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}
