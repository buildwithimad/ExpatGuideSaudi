'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useState, useTransition } from 'react';
import RevealWrapper from '../RevealWrapper'; // Adjust path if needed

// ============================================================================
// Types
// ============================================================================

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };
  image: { src: string; alt: string } | null;
  locale: string;
  dict: {
  explore?: string;
  loading?: string;
  exploreCategory?: string;
};
  index: number;
}

// ============================================================================
// Shared Spinner
// ============================================================================

const Spinner = memo(({ className = '' }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
));
Spinner.displayName = 'Spinner';

// ============================================================================
// Component
// ============================================================================

export default function CategoryCard({ category, image, locale, dict, index }: CategoryCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);

  const href = `/${locale}/articles?category=${category.slug}`;

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Preserve native browser behaviors (like CTRL/CMD + Click to open in new tab)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0 || isPending) return;
    
    e.preventDefault();
    setIsNavigating(true);
    
    startTransition(() => {
      router.push(href);
    });
  };

  const isLoading = isPending || isNavigating;

  return (
    <RevealWrapper delay={index * 30} type="up">
      <Link
        href={href}
        onClick={handleNavigate}
        className={`group flex flex-col h-full bg-background border border-border transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${
          isLoading 
            ? 'opacity-60 scale-[0.98] border-foreground/50 pointer-events-none cursor-wait shadow-sm' 
            : 'hover:border-foreground hover:shadow-sm'
        }`}
        aria-label={`${dict.exploreCategory} ${category.name}`}
        aria-disabled={isLoading}
      >
        {/* Centered Category Image / Illustration */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[3/2] overflow-hidden border-b border-border bg-muted flex items-center justify-center p-8 sm:p-10 lg:p-12">
          {image ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <AppImage
                src={image.src}
                alt={image.alt}
                fill
                priority={index < 6}
                className={`object-contain transition-transform duration-500 ease-out ${
                  isLoading ? 'scale-95 opacity-80' : 'group-hover:scale-[1.04]'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ) : (
            <Icon name="FolderIcon" size={32} className="text-muted-foreground/30" />
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-grow p-4 sm:p-5 lg:p-6">
          <h2 className={`text-base sm:text-lg font-semibold leading-tight mb-2 transition-colors duration-200 ${
            isLoading ? 'text-muted-foreground' : 'text-foreground group-hover:text-muted-foreground'
          }`}>
            {category.name}
          </h2>

          {category.description && (
            <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-2">
              {category.description}
            </p>
          )}

          {/* Card Footer */}
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${
              isLoading ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
            }`}>
              {isLoading ? dict.loading : dict.explore}
            </span>
            
            <div className="relative flex items-center justify-center w-4 h-4">
              {isLoading ? (
                <Spinner className="w-4 h-4 text-foreground" />
              ) : (
                <Icon 
                  name={locale === 'ar' || locale === 'ur' ? 'ArrowLeftIcon' : 'ArrowRightIcon'}
                  size={14} 
                  className="text-muted-foreground transition-all duration-300 ease-out group-hover:text-foreground group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  aria-hidden="true" 
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </RevealWrapper>
  );
}