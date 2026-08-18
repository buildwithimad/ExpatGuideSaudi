import type { PayloadRequest } from 'payload';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/shared/constants';
import type { Locale } from '@/shared/types';

import { ValidationError } from './validation-error';

export function parseLocale(
  req: PayloadRequest,
): Locale {
  const locale =
    (req.query?.locale as string | undefined) ??
    DEFAULT_LOCALE;

  if (
    !SUPPORTED_LOCALES.includes(
      locale as Locale,
    )
  ) {
    throw new ValidationError(
      'INVALID_LOCALE',
      `Unsupported locale '${locale}'.`,
    );
  }

  return locale as Locale;
}