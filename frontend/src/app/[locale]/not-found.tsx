import { getDictionary } from '@/lib/dictionary';
import {
  defaultLocale,
  locales,
} from '@/lib/i18n-config';

import NotFound from './NotFoundClient';

export default async function LocaleNotFound() {
  const dictionaries =
    await Promise.all(
      locales.map(async (locale) => [
        locale,
        await getDictionary(locale),
      ]),
    );

  return (
    <NotFound
      defaultLocale={defaultLocale}
      dictionaries={Object.fromEntries(
        dictionaries,
      )}
    />
  );
}
