'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { ArticlesList } from '@/lib/api/articles';
import type { Category } from '@/lib/api/categories';
import type { Locale } from '@/lib/i18n-config';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useState, useTransition } from 'react';
import RevealWrapper from '../../components/RevealWrapper';
import SectionTitle from '../../components/SectionTitle';

// ============================================================================
// Types
// ============================================================================

interface Props {
  locale: Locale;
  articles: ArticlesList;
  categories: Category[];
  selectedCategory?: string;
}

// ============================================================================
// Sub-Components
// ============================================================================

const Spinner = memo(({ className = '' }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
));
Spinner.displayName = 'Spinner';

const ArticleSkeleton = memo(({ viewMode = 'grid', isRTL = false }: { viewMode?: 'grid' | 'list', isRTL?: boolean }) => (
  <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row'} h-full border border-border bg-background animate-pulse`} aria-hidden="true">
    <div className={`aspect-[16/9] bg-muted border-border ${viewMode === 'grid' ? 'w-full border-b' : `w-full md:w-2/5 shrink-0 border-b md:border-b-0 ${isRTL ? 'md:border-l' : 'md:border-r'}`}`} />
    <div className="p-4 md:p-6 flex flex-col gap-4 flex-grow">
      <div className="flex items-center justify-between">
        <div className="w-16 h-6 bg-muted rounded-none" />
        <div className="w-12 h-4 bg-muted rounded-none" />
      </div>
      <div className="space-y-3 mt-1">
        <div className="w-full h-6 bg-muted rounded-none" />
        <div className="w-5/6 h-6 bg-muted rounded-none" />
      </div>
      <div className="space-y-2 mt-2">
        <div className="w-full h-4 bg-muted rounded-none" />
        <div className="w-4/5 h-4 bg-muted rounded-none" />
      </div>
      <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
        <div className="w-24 h-4 bg-muted rounded-none" />
        <div className="w-16 h-4 bg-muted rounded-none" />
      </div>
    </div>
  </div>
));
ArticleSkeleton.displayName = 'ArticleSkeleton';

// ============================================================================
// Main Component
// ============================================================================

export default function ArticlesPageContent({ locale, articles, categories, selectedCategory }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [loadingCard, setLoadingCard] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState<Record<string, boolean>>({});
  
  // View mode state (grid or list)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Reset loading states when URL transition finishes
  useEffect(() => {
    if (!isPending) {
      setLoadingCard(null);
      setLoadingAction(null);
    }
  }, [isPending, searchParams]);

  const dict = {
    latestArticles: { label: locale === 'ar' ? 'أحدث المقالات' : 'Latest Articles' },
    search: locale === 'ar' ? 'ابحث في المقالات...' : 'Search articles...',
    all: locale === 'ar' ? 'الكل' : 'All',
    sort: locale === 'ar' ? 'ترتيب:' : 'Sort by:',
    latest: locale === 'ar' ? 'الأحدث' : 'Latest',
    popular: locale === 'ar' ? 'الأكثر قراءة' : 'Popular',
    emptyTitle: locale === 'ar' ? 'لم يتم العثور على مقالات' : 'No articles found',
    emptyDesc: locale === 'ar' ? 'جرب فئة أو مصطلح بحث آخر.' : 'Try another category or search term.',
    clearFilters: locale === 'ar' ? 'مسح الفلاتر' : 'Clear Filters',
  };

  const isRTL = locale === 'ar';
  const { page = 1, totalPages = 1, hasPrevPage, hasNextPage, prevPage, nextPage } = articles.pagination || {};

  // --- Handlers ---

  const createPageUrl = useCallback((pageNumber: number | string | null) => {
    if (pageNumber == null) return '#';
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  }, [pathname, searchParams]);

  const generatePagination = useCallback(() => {
    const pages = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start < maxPagesToShow - 1) start = Math.max(1, end - maxPagesToShow + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }, [page, totalPages]);

  const handleCategoryClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0 || isPending) return;
    e.preventDefault();

    setLoadingAction(`category-${slug}`);
    
    // When "All" is selected, completely clear query strings
    if (slug === 'all') {
      startTransition(() => {
        router.push(`/${locale}/articles`, { scroll: false });
      });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('category', slug);
    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false }); // Prevent scroll jump on filter
    });
  }, [isPending, searchParams, pathname, router, locale]);

  const handleArticleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0 || isPending) return;
    setLoadingCard(slug);
  }, [isPending]);

  const handleSearch = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      const params = new URLSearchParams(searchParams.toString());
      
      if (val === searchParams.get('search')) return; // Avoid redundant fetches
      
      setLoadingAction('search');
      if (val) params.set('search', val);
      else params.delete('search');
      params.delete('page');

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }
  }, [searchParams, pathname, router]);

  const clearFilters = useCallback(() => {
    setLoadingAction('clear');
    startTransition(() => {
      router.push(`/${locale}/articles`, { scroll: false });
    });
  }, [locale, router]);

  const handlePaginationClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0 || isPending) return;
    // Don't prevent default, allow Next.js link to handle prefetching and scroll, just set pending UI
    setLoadingAction('pagination');
  }, [isPending]);

  return (
    <>
      <main className="pt-16 md:pt-[68px] bg-background selection:bg-foreground selection:text-background mt-10">
        
        {/* HERO SECTION - Reduced padding on mobile so filters are visible immediately */}
        <section className="border-b border-border py-8 md:py-20 bg-background">
          <div className="container-editorial">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-10">
              <div className="w-full lg:w-2/3 max-w-3xl">
                <SectionTitle
                titleAs="h1"
                  label={dict.latestArticles.label}
                  title={isRTL ? 'أدلة متخصصة للمغتربين في المملكة' : 'Expert Guides for Expats in Saudi Arabia'}
                  description={isRTL ? 'تصفح مكتبتنا الكاملة من الأدلة الموثّقة التي تغطي كل جانب من جوانب حياة المغتربين في المملكة. تُحدّث بانتظام وفق المصادر الرسمية.' : 'Browse our complete library of verified guides covering every aspect of expat life in the Kingdom. Updated regularly against official Saudi sources.'}
                />
              </div>
              <div className="lg:w-1/3 flex lg:justify-end shrink-0">
                <div className="inline-flex items-center justify-center gap-3 border border-border py-2.5 px-4 md:py-3 md:px-5 bg-background w-full sm:w-auto transition-opacity duration-300">
                  <Icon name="DocumentTextIcon" size={16} className="text-foreground shrink-0" />
                  <span className="text-xs md:text-sm font-medium text-muted-foreground tracking-wide whitespace-nowrap">
                    <strong className="text-foreground font-semibold">{articles.pagination.totalDocs || 0}</strong> {isRTL ? 'دليل منشور' : 'guides published'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STICKY FILTER BAR */}
        <section className="sticky top-16 md:top-[68px] z-30 bg-background border-b border-border py-3 md:py-4 supports-[backdrop-filter]:bg-background/90">
          <div className="container-editorial">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              
              {/* Search - Mobile First Width */}
              <div className="relative w-full lg:w-72 flex-shrink-0 group">
                <Icon 
                  name="MagnifyingGlassIcon" 
                  size={16} 
                  className="text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-foreground" 
                  aria-hidden="true" 
                />
                <input 
                  type="search" 
                  placeholder={dict.search} 
                  className="w-full bg-background border border-border text-foreground rounded-none ps-9 pe-3 py-2.5 md:py-2 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-200 placeholder:text-muted-foreground/70" 
                  defaultValue={searchParams.get('search') || ''}
                  onKeyDown={handleSearch}
                  disabled={isPending}
                  aria-label={dict.search}
                />
                {(loadingAction === 'search') && (
                  <Spinner className="w-4 h-4 text-foreground absolute end-3 top-1/2 -translate-y-1/2" />
                )}
              </div>

              {/* Categories - Hardware accelerated horizontal scroll, hidden scrollbars, snap behavior */}
              <nav 
                className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-2 w-full lg:flex-wrap items-center touch-pan-x" 
                aria-label="Category filters"
              >
                <a
                  href={`/${locale}/articles`}
                  onClick={(e) => handleCategoryClick(e, 'all')}
                  className={`snap-start shrink-0 text-[13px] md:text-xs font-medium px-4 h-10 md:h-9 border rounded-none transition-colors duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${
                    !selectedCategory
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                  } ${loadingAction === 'category-all' || (isPending && loadingAction !== null) ? 'opacity-50 pointer-events-none' : ''}`}
                  aria-current={!selectedCategory ? 'page' : undefined}
                >
                  {loadingAction === 'category-all' && <Spinner className="w-3 h-3" />}
                  {dict.all}
                </a>

                {categories?.map((category) => {
                  const isActive = selectedCategory === category.slug;
                  const isLoadingThis = loadingAction === `category-${category.slug}`;
                  return (
                    <a
                      key={category.id}
                      href={`/${locale}/articles?category=${category.slug}`}
                      onClick={(e) => handleCategoryClick(e, category.slug)}
                      className={`snap-start shrink-0 text-[13px] md:text-xs font-medium px-4 h-10 md:h-9 border rounded-none transition-colors duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${
                        isActive
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                      } ${isLoadingThis || (isPending && loadingAction !== null) ? 'opacity-50 pointer-events-none' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isLoadingThis && <Spinner className="w-3 h-3" />}
                      {category.name}
                    </a>
                  );
                })}
              </nav>

              
            </div>
          </div>
        </section>

        {/* ARTICLES GRID / LIST */}
        <section className="py-10 md:py-16 min-h-[60vh]">
          <div className="container-editorial">
            
            {/* Header Info & View Toggles */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <p className="text-[13px] md:text-sm font-medium text-muted-foreground transition-opacity duration-200" style={{ opacity: isPending ? 0.5 : 1 }}>
                {isRTL ? (
                  <>عرض <strong className="text-foreground">{articles.docs.length}</strong> من <strong className="text-foreground">{articles.pagination.totalDocs}</strong> دليل</>
                ) : (
                  <>Showing <strong className="text-foreground">{articles.docs.length}</strong> of <strong className="text-foreground">{articles.pagination.totalDocs}</strong> guides</>
                )}
              </p>
              
              <div className="flex items-center gap-1.5" role="group" aria-label="View toggle">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`w-8 h-8 border flex items-center justify-center outline-none transition-colors focus-visible:ring-1 focus-visible:ring-foreground ${viewMode === 'grid' ? 'border-foreground bg-foreground text-background cursor-default' : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Grid view"
                >
                  <Icon name="Squares2X2Icon" size={14} className={viewMode === 'grid' ? 'text-background' : ''} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`w-8 h-8 border flex items-center justify-center outline-none transition-colors focus-visible:ring-1 focus-visible:ring-foreground ${viewMode === 'list' ? 'border-foreground bg-foreground text-background cursor-default' : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                  aria-pressed={viewMode === 'list'}
                  aria-label="List view"
                >
                  <Icon name="ListBulletIcon" size={14} className={viewMode === 'list' ? 'text-background' : ''} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div 
              className="transition-opacity duration-300 ease-in-out relative"
              style={{ opacity: isPending ? 0.6 : 1 }}
            >
              {articles.docs.length === 0 && !isPending ? (
                // Empty State
                <div className="py-20 md:py-32 flex flex-col items-center justify-center text-center border border-border bg-background px-4">
                  <Icon name="DocumentMagnifyingGlassIcon" size={48} className="text-muted-foreground mb-5 opacity-80" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                    {dict.emptyTitle}
                  </h3>
                  <p className="text-[13px] md:text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                    {dict.emptyDesc}
                  </p>
                  <button 
                    onClick={clearFilters}
                    disabled={isPending}
                    className="text-xs md:text-sm font-medium border border-border px-6 py-2.5 hover:border-foreground hover:text-foreground text-foreground transition-colors duration-200 rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:opacity-50"
                  >
                    {dict.clearFilters}
                  </button>
                </div>
              ) : (
                // Grid / List State
                <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" : "flex flex-col gap-6 md:gap-8"}>
                  
                  {isPending && loadingAction === 'search' 
                    ? Array.from({ length: 6 }).map((_, i) => <ArticleSkeleton key={`skel-${i}`} viewMode={viewMode} isRTL={isRTL} />)
                    : articles.docs.map((article: any, i: number) => {
                    
                    const featuredImageUrl = getImageUrl(article.featuredImage, 'original') || '/images/placeholder.jpg';
                    const featuredImageAlt = article.featuredImage?.alt ?? article.title;
                    const categoryName = article.category?.name ?? "General";
                    const excerpt = article.excerpt ?? "";
                    const authorName = article.author?.fullName ?? "ExpatSaudi";
                    const formattedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }) : "";
                    const readingTime = `${article.readingTime || 5} min`;
                    const isCardLoading = loadingCard === article.slug;
                    const imgLoading = isImageLoading[article.slug] !== false;

                    return (
                      <RevealWrapper key={article.id || article.slug} delay={i * 30} type="up">
                        <article className="h-full">
                          <Link 
                            href={`/${locale}/articles/${article.slug}`} 
                            onClick={(e) => handleArticleClick(e, article.slug)}
                            className={`group flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row'} h-full border border-border bg-background transition-all duration-200 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${isCardLoading ? 'opacity-70 cursor-wait pointer-events-none' : ''}`}
                            aria-busy={isCardLoading}
                          >
                            {isCardLoading && (
                              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
                                <Spinner className="w-6 h-6 text-foreground" />
                              </div>
                            )}
                            
                            {/* Image Container */}
                            <div className={`relative aspect-[1730/910] overflow-hidden border-border bg-muted ${viewMode === 'grid' ? 'w-full border-b' : `w-full md:w-2/5 shrink-0 border-b md:border-b-0 ${isRTL ? 'md:border-l' : 'md:border-r'}`}`}>
                              {imgLoading && (
                                <div
                                  className="absolute inset-0 z-0 animate-pulse bg-muted"
                                  aria-hidden="true"
                                />
                              )}

                              <AppImage
                                src={featuredImageUrl}
                                alt={featuredImageAlt}
                                fill
                                onLoad={() =>
                                  setIsImageLoading((prev) => ({
                                    ...prev,
                                    [article.slug]: false,
                                  }))
                                }
                                className={`
                                  z-10
                                  object-contain
                                  transition-all
                                  duration-500
                                  ease-out
                                  ${
                                    imgLoading
                                      ? 'scale-[1.02] opacity-0'
                                      : 'scale-100 opacity-100 group-hover:scale-[1.02]'
                                  }
                                `}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>

                            <div className="p-4 md:p-5 flex flex-col gap-3 md:gap-4 flex-grow">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground border border-border px-2 py-1 leading-none">
                                  {categoryName}
                                </span>
                                <span className="text-[11px] md:text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                  <Icon name="ClockIcon" size={12} />
                                  {readingTime}
                                </span>
                              </div>
                              
                              <div className="mt-1">
                                <h2 className="text-base md:text-lg font-semibold text-foreground leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-muted-foreground">
                                  {article.title}
                                </h2>
                                <p className="mt-2 text-[13px] md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                                  {excerpt}
                                </p>
                              </div>
                              
                              <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                                <span className="text-[11px] md:text-xs font-semibold text-foreground tracking-wide truncate max-w-[60%]">
                                  {authorName}
                                </span>
                                <span className="text-[11px] md:text-xs font-medium text-muted-foreground shrink-0">
                                  {formattedDate}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </article>
                      </RevealWrapper>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {articles.pagination.totalDocs > 0 && totalPages > 1 && (
              <nav aria-label="Pagination" className="flex items-center justify-between mt-12 md:mt-16 pt-5 border-t border-border">
                
                <div className="flex items-center gap-2">
                  <Link 
                    href={page > 1 ? createPageUrl(1) : '#'} 
                    onClick={page > 1 ? handlePaginationClick : (e) => e.preventDefault()}
                    className={`flex items-center justify-center min-h-[36px] min-w-[36px] px-3 md:px-4 text-[13px] md:text-xs font-medium border rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${page <= 1 || isPending ? 'opacity-40 pointer-events-none border-border text-muted-foreground bg-muted/30' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground bg-background'}`}
                    aria-disabled={page <= 1 || isPending}
                  >
                    {isRTL ? 'الأول' : 'First'}
                  </Link>
                  <Link 
                    href={hasPrevPage ? createPageUrl(prevPage) : '#'} 
                    onClick={hasPrevPage ? handlePaginationClick : (e) => e.preventDefault()}
                    className={`flex items-center justify-center min-h-[36px] min-w-[36px] px-3 md:px-4 text-[13px] md:text-xs font-medium border rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${!hasPrevPage || isPending ? 'opacity-40 pointer-events-none border-border text-muted-foreground bg-muted/30' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground bg-background'}`}
                    aria-disabled={!hasPrevPage || isPending}
                  >
                    {isRTL ? 'السابق' : 'Prev'}
                  </Link>
                </div>

                <div className="flex items-center gap-1.5 hidden sm:flex">
                  {generatePagination().map((p) => (
                    <Link 
                      key={p} 
                      href={createPageUrl(p)}
                      onClick={p !== page ? handlePaginationClick : (e) => e.preventDefault()}
                      className={`w-9 h-9 flex items-center justify-center text-xs font-semibold border rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${p === page ? 'border-foreground text-background bg-foreground' : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground bg-transparent'} ${isPending && p !== page ? 'opacity-50 pointer-events-none' : ''}`}
                      aria-current={p === page ? 'page' : undefined}
                      aria-disabled={isPending}
                    >
                      {p}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Link 
                    href={hasNextPage ? createPageUrl(nextPage) : '#'}
                    onClick={hasNextPage ? handlePaginationClick : (e) => e.preventDefault()}
                    className={`flex items-center justify-center min-h-[36px] min-w-[36px] px-3 md:px-4 text-[13px] md:text-xs font-medium border rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${!hasNextPage || isPending ? 'opacity-40 pointer-events-none border-border text-muted-foreground bg-muted/30' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground bg-background'}`}
                    aria-disabled={!hasNextPage || isPending}
                  >
                    {isRTL ? 'التالي' : 'Next'}
                  </Link>
                  <Link 
                    href={page < totalPages ? createPageUrl(totalPages) : '#'} 
                    onClick={page < totalPages ? handlePaginationClick : (e) => e.preventDefault()}
                    className={`flex items-center justify-center min-h-[36px] min-w-[36px] px-3 md:px-4 text-[13px] md:text-xs font-medium border rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${page >= totalPages || isPending ? 'opacity-40 pointer-events-none border-border text-muted-foreground bg-muted/30' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground bg-background'}`}
                    aria-disabled={page >= totalPages || isPending}
                  >
                    {isRTL ? 'الأخير' : 'Last'}
                  </Link>
                </div>

              </nav>
            )}

          </div>
        </section>
      </main>
    </>
  );
}