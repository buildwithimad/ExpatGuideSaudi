'use client';

import { useEffect } from 'react';

import type { Locale } from '@/lib/i18n-config';

type Props = {
  locale: Locale;
};

export default function LocaleDocument({
  locale,
}: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;

    document.documentElement.dir =
      locale === 'ar' || locale === 'ur'
        ? 'rtl'
        : 'ltr';
  }, [locale]);

  return null;
}