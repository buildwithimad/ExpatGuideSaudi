'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import AppIcon from '@/components/ui/AppIcon';

import type { getDictionary } from '@/lib/dictionary';
import {
  locales,
  type Locale,
} from '@/lib/i18n-config';

type Dictionary = Awaited<
  ReturnType<typeof getDictionary>
>;

type Props = {
  defaultLocale: Locale;
  dictionaries: Record<Locale, Dictionary>;
};

export default function NotFound({
  defaultLocale,
  dictionaries,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const pathLocale = pathname
    ?.split('/')[1];

  const locale = locales.includes(
    pathLocale as Locale,
  )
    ? (pathLocale as Locale)
    : defaultLocale;

  const dict =
    dictionaries[locale] ??
    dictionaries[defaultLocale];

  const handleGoHome = () => {
    router.push(`/${locale}`);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">
              404
            </h1>
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-medium text-foreground">
          {dict.notFound.title}
        </h2>

        <p className="mb-8 text-foreground/70">
          {dict.notFound.description}
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
          >
            <AppIcon
              name="ArrowLeftIcon"
              size={16}
            />

            {dict.notFound.goBack}
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
          >
            <AppIcon
              name="HomeIcon"
              size={16}
            />

            {dict.notFound.home}
          </button>
        </div>
      </div>
    </main>
  );
}
