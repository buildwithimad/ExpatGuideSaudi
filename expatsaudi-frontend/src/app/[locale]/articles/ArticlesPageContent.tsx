'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { ArticlesList } from '@/lib/api/articles';
import type { Category } from '@/lib/api/categories';
import type { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
import RevealWrapper from '../../components/RevealWrapper';
import SectionTitle from '../../components/SectionTitle';

interface Props {
  locale: Locale;
  articles: ArticlesList;
  categories: Category[];
  selectedCategory?: string;
}

const Spinner = ({ className = "" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function ArticlesPageContent({ locale, articles, categories, selectedCategory }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [loadingCard, setLoadingCard] = useState<string | null>(null);
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending) {
      setLoadingCard(null);
      setLoadingCategory(null);
    }
  }, [isPending, searchParams]);

  const dict: any = {
    latestArticles: {
      label: locale === 'ar' ? 'أحدث المقالات' : 'Latest Articles',
    },
  };

  const { page = 1, totalPages = 1, hasPrevPage, hasNextPage, prevPage, nextPage } = articles.pagination || {};

  const createPageUrl = useCallback(
  (pageNumber: number | string | null) => {
    if (pageNumber == null) return '#';

    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(pageNumber));

    return `${pathname}?${params.toString()}`;
  },
  [pathname, searchParams],
);
  const generatePagination = useCallback(() => {
    const pages = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, totalPages]);

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (isPending) return;

    setLoadingCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (isPending) return;

    setLoadingCard(slug);
    startTransition(() => {
      router.push(`/${locale}/articles/${slug}`);
    });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const val = e.currentTarget.value;
      const params = new URLSearchParams(searchParams.toString());
      if (val) {
        params.set('search', val);
      } else {
        params.delete('search');
      }
      params.delete('page');
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }
  };

  const clearFilters = () => {
    startTransition(() => {
      router.push(`/${locale}/articles`);
    });
  };

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main className="pt-16 md:pt-[68px] bg-background selection:bg-foreground selection:text-background">
        
        {/* HERO SECTION */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="container-editorial">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="lg:w-2/3">
                <SectionTitle
                  label={dict.latestArticles.label}
                  title={locale === 'ar' ? 'أدلة متخصصة للمغتربين في المملكة' : 'Expert Guides for Expats in Saudi Arabia'}
                  description={locale === 'ar' ? 'تصفح مكتبتنا الكاملة من الأدلة الموثّقة التي تغطي كل جانب من جوانب حياة المغتربين في المملكة. تُحدّث بانتظام وفق المصادر الرسمية.' : 'Browse our complete library of verified guides covering every aspect of expat life in the Kingdom. Updated regularly against official Saudi sources.'}
                />
              </div>
              <div className="lg:w-1/3 flex lg:justify-end">
                <div className="inline-flex items-center gap-3 border border-border py-3 px-5 bg-background">
                  <Icon name="DocumentTextIcon" size={18} className="text-foreground" />
                  <span className="text-sm font-medium text-muted-foreground tracking-wide">
                    <strong className="text-foreground font-semibold">{articles.pagination.totalDocs || 0}</strong> {locale === 'ar' ? 'دليل منشور' : 'guides published'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FILTER BAR SECTION */}
        <section className="sticky top-16 md:top-[68px] z-30 bg-background border-b border-border py-4">
          <div className="container-editorial">
            <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
              
              <div className="relative w-full lg:w-72 flex-shrink-0">
                <Icon name="MagnifyingGlassIcon" size={16} className="text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder={locale === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'} 
                  className="w-full bg-background border border-border text-foreground rounded-none ps-9 py-2 text-sm outline-none focus:border-foreground transition-colors duration-200" 
                  defaultValue={searchParams.get('search') || ''}
                  onKeyDown={handleSearch}
                />
              </div>

              <nav className="flex-grow flex overflow-x-auto gap-2 w-full lg:flex-wrap scrollbar-hide pb-2 lg:pb-0" aria-label="Categories filter">
                <a
                  href={`/${locale}/articles`}
                  onClick={(e) => handleCategoryClick(e, 'all')}
                  className={`text-xs font-medium px-4 py-2 border rounded-none transition-colors duration-200 whitespace-nowrap flex items-center justify-center gap-2 ${
                    !selectedCategory
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground cursor-pointer'
                  } ${loadingCategory === 'all' || (isPending && loadingCategory !== null) ? 'opacity-70 pointer-events-none' : ''}`}
                >
                  {loadingCategory === 'all' && <Spinner className="w-3 h-3" />}
                  {locale === 'ar' ? 'الكل' : 'All'}
                </a>

                {categories?.map((category) => {
                  const isActive = selectedCategory === category.slug;
                  const isLoadingThis = loadingCategory === category.slug;
                  return (
                    <a
                      key={category.id}
                      href={`/${locale}/articles?category=${category.slug}`}
                      onClick={(e) => handleCategoryClick(e, category.slug)}
                      className={`text-xs font-medium px-4 py-2 border rounded-none transition-colors duration-200 whitespace-nowrap flex items-center justify-center gap-2 ${
                        isActive
                          ? 'bg-foreground text-background border-foreground'
                          : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground cursor-pointer'
                      } ${isLoadingThis || (isPending && loadingCategory !== null) ? 'opacity-70 pointer-events-none' : ''}`}
                    >
                      {isLoadingThis && <Spinner className="w-3 h-3" />}
                      {category.name}
                    </a>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3 flex-shrink-0 w-full lg:w-auto border-t lg:border-none pt-4 lg:pt-0 border-border">
                <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">{locale === 'ar' ? 'ترتيب:' : 'Sort by:'}</label>
                <select className="bg-background border border-border text-foreground rounded-none py-1.5 px-3 text-sm outline-none focus:border-foreground transition-colors duration-200 flex-grow lg:flex-grow-0" defaultValue="latest" aria-label="Sort articles">
                  <option value="latest">{locale === 'ar' ? 'الأحدث' : 'Latest'}</option>
                  <option value="popular">{locale === 'ar' ? 'الأكثر قراءة' : 'Popular'}</option>
                  <option value="az">A–Z</option>
                </select>
              </div>

            </div>
          </div>
        </section>

        {/* ARTICLES GRID SECTION */}
        <section className="py-12 md:py-20">
          <div className="container-editorial">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <p className="text-sm font-medium text-muted-foreground">
                {locale === 'ar' ? (
                  <>عرض <strong className="text-foreground">{articles.docs.length}</strong> من <strong className="text-foreground">{articles.pagination.totalDocs}</strong> دليل</>
                ) : (
                  <>Showing <strong className="text-foreground">{articles.docs.length}</strong> of <strong className="text-foreground">{articles.pagination.totalDocs}</strong> guides</>
                )}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border border-foreground bg-foreground flex items-center justify-center cursor-default" aria-label="Grid view">
                  <Icon name="Squares2X2Icon" size={14} className="text-background" />
                </div>
                <div className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:border-foreground transition-colors cursor-pointer" aria-label="List view">
                  <Icon name="ListBulletIcon" size={14} />
                </div>
              </div>
            </div>

            {articles.docs.length === 0 ? (
              <div className="py-24 flex flex-col items-center justify-center text-center border border-border bg-background">
                <Icon name="DocumentMagnifyingGlassIcon" size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {locale === 'ar' ? 'لم يتم العثور على مقالات' : 'No articles found'}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {locale === 'ar' ? 'جرب فئة أو مصطلح بحث آخر.' : 'Try another category or search term.'}
                </p>
                <button 
                  onClick={clearFilters}
                  className="text-sm font-medium border border-border px-6 py-2.5 hover:border-foreground hover:text-foreground text-muted-foreground transition-colors duration-200 rounded-none"
                >
                  {locale === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles.docs.map((article: any, i: number) => {
                  const featuredImageUrl = article.featuredImage?.sizes?.card ?? article.featuredImage?.url ?? "/images/placeholder.jpg";
                  const featuredImageAlt = article.featuredImage?.alt ?? article.title;
                  const categoryName = article.category?.name ?? "General";
                  const excerpt = article.excerpt ?? "";
                  const authorName = article.author?.fullName ?? "ExpatSaudi Editorial";
                  const formattedDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }) : "";
                  const readingTime = `${article.readingTime || 5} min`;
                  const isCardLoading = loadingCard === article.slug;

                  return (
                    <RevealWrapper key={article.id || article.slug} delay={i * 40} type="up">
                      <a 
                        href={`/${locale}/articles/${article.slug}`} 
                        onClick={(e) => handleArticleClick(e, article.slug)}
                        className={`group flex flex-col h-full border border-border bg-background transition-all duration-200 relative ${isCardLoading ? 'opacity-70 cursor-wait pointer-events-none' : ''}`}
                      >
                        {isCardLoading && (
                          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-none">
                            <Spinner className="w-8 h-8 text-foreground" />
                          </div>
                        )}
                        <div className="aspect-[16/9] overflow-hidden relative border-b border-border bg-muted">
                          <AppImage 
                            src={featuredImageUrl} 
                            alt={featuredImageAlt} 
                            fill 
                            className="object-cover transition-transform duration-200 group-hover:scale-[1.03]" 
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                          />
                        </div>
                        <div className="p-5 md:p-6 flex flex-col gap-4 flex-grow">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground border border-border px-2 py-1">
                              {categoryName}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                              <Icon name="ClockIcon" size={12} />
                              {readingTime}
                            </span>
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-foreground leading-tight line-clamp-2 transition-colors duration-200">
                              {article.title}
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                              {excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                            <span className="text-xs font-semibold text-foreground tracking-wide">{authorName}</span>
                            <span className="text-xs font-medium text-muted-foreground">{formattedDate}</span>
                          </div>
                        </div>
                      </a>
                    </RevealWrapper>
                  );
                })}
              </div>
            )}

            {/* PAGINATION */}
            {articles.pagination.totalDocs > 0 && totalPages > 1 && (
              <div className="flex items-center justify-between mt-16 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <Link 
                    href={page > 1 ? createPageUrl(1) : '#'} 
                    className={`text-xs font-medium px-3 py-2 border rounded-none transition-all duration-200 ${page <= 1 ? 'opacity-40 pointer-events-none border-border text-muted-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                  >
                    {locale === 'ar' ? 'الأول' : 'First'}
                  </Link>
                  <Link 
                    href={hasPrevPage ? createPageUrl(prevPage) : '#'} 
                    className={`text-xs font-medium px-3 py-2 border rounded-none transition-all duration-200 ${!hasPrevPage ? 'opacity-40 pointer-events-none border-border text-muted-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                  >
                    {locale === 'ar' ? 'السابق' : 'Prev'}
                  </Link>
                </div>

                <div className="flex items-center gap-1.5 hidden sm:flex">
                  {generatePagination().map((p) => (
                    <Link 
                      key={p} 
                      href={createPageUrl(p)} 
                      className={`w-9 h-9 flex items-center justify-center text-xs font-semibold border rounded-none transition-all duration-200 ${p === page ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'}`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Link 
                    href={hasNextPage ? createPageUrl(nextPage) : '#'} 
                    className={`text-xs font-medium px-3 py-2 border rounded-none transition-all duration-200 ${!hasNextPage ? 'opacity-40 pointer-events-none border-border text-muted-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                  >
                    {locale === 'ar' ? 'التالي' : 'Next'}
                  </Link>
                  <Link 
                    href={page < totalPages ? createPageUrl(totalPages) : '#'} 
                    className={`text-xs font-medium px-3 py-2 border rounded-none transition-all duration-200 ${page >= totalPages ? 'opacity-40 pointer-events-none border-border text-muted-foreground' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                  >
                    {locale === 'ar' ? 'الأخير' : 'Last'}
                  </Link>
                </div>
              </div>
            )}

          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}