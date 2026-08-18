export const locales = ['en', 'ar', 'ur'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeConfig: Record<
  Locale,
  { dir: 'ltr' | 'rtl'; lang: string; label: string }
> = {
  en: {
    dir: 'ltr',
    lang: 'en',
    label: 'English',
  },

  ar: {
    dir: 'rtl',
    lang: 'ar',
    label: 'العربية',
  },

  ur: {
    dir: 'rtl',
    lang: 'ur',
    label: 'اردو',
  },
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}