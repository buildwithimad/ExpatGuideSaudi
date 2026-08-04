import type { Locale } from './i18n-config';

export type Dictionary = typeof import('../../messages/en.json');

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('../../messages/en.json').then((m) => m.default),
  ar: () => import('../../messages/ar.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries['en'];
  return loader();
}
