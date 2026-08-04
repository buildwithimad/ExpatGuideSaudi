'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { Locale } from '@/lib/i18n-config';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import RevealWrapper from '../../components/RevealWrapper';
import type { Category } from './CategoryPage';

export default function CategoryCardGrid({
  locale,
  categories,
}: {
  locale: Locale;
  categories: Category[];
}) {
  const isAr = locale === 'ar';
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
    href: string,
  ) => {
    // Prevent re-triggering navigation on a card that is already loading.
    if (loadingSlug) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    setLoadingSlug(slug);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {categories.map((category, i) => {
        const image = category.icon?.sizes?.card ?? category.icon?.url;
        const isCardLoading = isPending && loadingSlug === category.slug;
        const href = `/${locale}/articles?category=${category.slug}`;

        return (
          <RevealWrapper key={category.id} delay={i * 50} type="up">
            <a
              href={href}
              aria-label={`${isAr ? 'استكشف تصنيف' : 'Explore category'} ${category.name}`}
              aria-busy={isCardLoading}
              onClick={(e) => handleNavigate(e, category.slug, href)}
              className={`group relative flex h-full flex-col overflow-hidden border border-border bg-background transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/60   focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isCardLoading ? 'pointer-events-none opacity-75 cursor-progress' : 'cursor-pointer'
              }`}
            >
              <div className="relative h-[210px] sm:h-[230px] w-full overflow-hidden rounded-t-xl bg-muted">
                {image ? (
                  <AppImage
                    src={image}
                    alt={category.icon?.alt ?? category.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Icon name="FolderIcon" size={32} className="text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h2 className="text-lg md:text-xl font-semibold text-foreground leading-snug mb-2.5 transition-colors duration-300 group-hover:text-primary">
                  {category.name}
                </h2>

                {category.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
                    {category.description}
                  </p>
                )}

                <div className="mt-6 pt-5 border-t border-border">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {isAr ? 'استكشف' : 'Explore'}
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>

              {isCardLoading && (
                <div className="absolute bottom-4 right-4">
                  <span
                    role="status"
                    aria-label={isAr ? 'جارٍ التحميل' : 'Loading'}
                    className="block h-5 w-5 animate-spin rounded-full border-2 border-border border-t-primary"
                  />
                </div>
              )}
            </a>
          </RevealWrapper>
        );
      })}
    </div>
  );
}