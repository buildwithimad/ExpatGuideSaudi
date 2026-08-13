'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

import { searchArticles } from '@/lib/api/search';
import type {
  SearchArticle,
  SearchPagination,
} from '@/lib/api/search/types';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

interface SearchResultsClientProps {
  locale: Locale;
  dict: Dictionary;

  categoryFilters: {
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
  }[];

  popularSearches: {
    title: string;
    query: string;
  }[];
}

export default function SearchResultsClient({
  locale,
  dict,
  categoryFilters,
  popularSearches,
}: SearchResultsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ---------------------------------------------------------------------------
  // URL as Single Source of Truth
  // ---------------------------------------------------------------------------
  const currentQ = searchParams.get('q') || '';
  const currentCatSlug = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'relevant';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Prepend "All" option to backend categories
  const allCategories = useMemo(
    () => [{ name: locale === 'ar' ? 'الكل' : 'All', slug: 'all' }, ...categoryFilters],
    [categoryFilters, locale]
  );

  const currentCategory = useMemo(
    () => allCategories.find((c) => c.slug === currentCatSlug) || allCategories[0],
    [allCategories, currentCatSlug]
  );

  // ---------------------------------------------------------------------------
  // Local State
  // ---------------------------------------------------------------------------
  // Only input value needs local state for controlled input without lag
  const [inputValue, setInputValue] = useState(currentQ);
  
  const [results, setResults] = useState<SearchArticle[]>([]);
  const [pagination, setPagination] = useState<SearchPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync input value with URL if user navigates back/forward
  useEffect(() => {
    setInputValue(currentQ);
  }, [currentQ]);


const defaultCategories = ['all', 'الكل', 'تمام'];


  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
const createSearchURL = useCallback(
  (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === '' ||
        (key === 'page' && value === 1) ||
        (key === 'category' &&
          defaultCategories.includes(String(value))) ||
        (key === 'sort' && value === 'relevant')
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [pathname, searchParams]
  );

  const updateSearchURL = useCallback(
    (updates: Record<string, string | number | null>) => {
      router.push(createSearchURL(updates), { scroll: false });
    },
    [createSearchURL, router]
  );

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchURL({ q: inputValue, page: 1 });
  };

  const handlePopularSearch = (term: string) => {
    setInputValue(term);
    updateSearchURL({ q: term, page: 1 });
  };

  const handleCategoryChange = (slug: string) => {
    updateSearchURL({ category: slug, page: 1 });
  };

  const handleSortChange = (sortValue: string) => {
    updateSearchURL({ sort: sortValue, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchURL({ page: newPage });
  };

  const clearFilters = useCallback(() => {
    setInputValue('');
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  // ---------------------------------------------------------------------------
  // Data Fetching
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    async function loadResults() {
      try {
        setLoading(true);
        setError(null);

        const response = await searchArticles({
          q: currentQ || undefined,
          category: currentCatSlug !== 'all' ? currentCatSlug : undefined,
          locale,
          page: currentPage,
          limit: 12,
          // sort is passed in URL Architecture but payload logic handles default for now
        });

        if (isMounted) {
          setResults(response.results);
          setPagination(response.pagination);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(locale === 'ar' ? 'فشل تحميل نتائج البحث.' : 'Failed to load search results.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadResults();

    return () => {
      isMounted = false;
    };
  }, [currentQ, currentCatSlug, currentSort, currentPage, locale]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <>
      {/* Search Header */}
      <section className="border-b border-border py-10 md:py-12 mt-20">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <span className="label-caps text-primary mb-3 block">{dict.search.label}</span>
            <h1 className="text-display text-foreground mb-6">
              {currentQ ? (
                <>
                  {dict.search.resultsFor}{' '}
                  <span className="text-primary">&ldquo;{currentQ}&rdquo;</span>
                </>
              ) : (
                dict.search.title
              )}
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex border border-border bg-background mb-5">
              <div className="flex items-center pl-4 pr-3">
                <Icon name="MagnifyingGlassIcon" size={18} className="text-muted-foreground" />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={dict.search.placeholder}
                className="flex-grow py-3.5 pr-4 text-base text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
                style={{ borderRadius: 0 }}
                autoFocus
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    updateSearchURL({ q: null, page: 1 });
                  }}
                  className="flex items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="XMarkIcon" size={16} />
                </button>
              )}
              <button
                type="submit"
                className="btn-primary text-sm px-6 py-3.5 flex-shrink-0"
                style={{ borderRadius: 0 }}
              >
                {dict.search.submit}
              </button>
            </form>

            {/* Popular Searches */}
            {!currentQ && popularSearches.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="label-caps text-muted-foreground mr-1">{dict.search.popular}</span>
                {popularSearches.map((term, index) => (
                  <button
                    key={`${term.query}-${index}`}
                    onClick={() => handlePopularSearch(term.query)}
                    className="text-xs font-medium text-muted-foreground border border-border px-3 py-1 hover:border-primary hover:text-primary transition-colors duration-200"
                    style={{ borderRadius: '4px' }}
                  >
                    {term.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Area */}
      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Sidebar Filters */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Category Filter */}
                <div className="border border-border p-5">
                  <p className="label-caps text-foreground mb-4">{dict.search.filterByCategory}</p>
                  <div className="space-y-1">
                    {allCategories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategoryChange(cat.slug)}
                        className={`w-full text-left py-2.5 px-3 text-sm transition-colors flex items-center justify-between ${
                          currentCatSlug === cat.slug
                            ? 'bg-primary text-primary-foreground font-semibold'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        style={{ borderRadius: '4px' }}
                      >
                        <div className="flex items-center gap-2">
                          {cat.icon && <Icon name={cat.icon as any} size={16} />}
                          <span>{cat.name}</span>
                        </div>
                        {currentCatSlug === cat.slug && (
                          <Icon name="CheckIcon" size={14} className="text-primary-foreground" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="border border-border p-5">
                  <p className="label-caps text-foreground mb-4">{dict.search.sortResults}</p>
                  <div className="space-y-1">
                    {[
                      { value: 'relevant', label: dict.search.mostRelevant },
                      { value: 'latest', label: dict.search.latestFirst },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full text-left py-2.5 px-3 text-sm transition-colors flex items-center justify-between ${
                          currentSort === option.value
                            ? 'text-primary font-semibold' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        style={{ borderRadius: '4px' }}
                      >
                        <span>{option.label}</span>
                        {currentSort === option.value && (
                          <Icon name="CheckIcon" size={14} className="text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(currentQ || currentCatSlug !== 'all') && (
                  <button
                    onClick={clearFilters}
                    className="w-full btn-secondary text-sm py-2.5 flex items-center justify-center gap-2"
                  >
                    <Icon name="XMarkIcon" size={14} />
                    {dict.search.clearAllFilters}
                  </button>
                )}
              </div>
            </aside>

            {/* Results */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              
              {/* Results Count Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">
                  {loading ? (
                    dict.search.searching
                  ) : results.length > 0 ? (
                    <>
                      <strong className="text-foreground">{pagination?.totalDocs || results.length}</strong>{' '}
                      {pagination?.totalDocs === 1 ? dict.search.result : dict.search.results}
                      {currentQ && (
                        <> {locale === 'ar' ? 'لـ' : 'for'} <strong className="text-foreground">&ldquo;{currentQ}&rdquo;</strong></>
                      )}
                      {currentCatSlug !== 'all' && (
                        <> {dict.search.in} <strong className="text-foreground">{currentCategory.name}</strong></>
                      )}
                    </>
                  ) : (
                    dict.search.noResults
                  )}
                </p>
                {(currentQ || currentCatSlug !== 'all') && !loading && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <Icon name="XMarkIcon" size={12} />
                    {dict.search.clear}
                  </button>
                )}
              </div>

              {/* Results List */}
              {loading ? (
                <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-muted-foreground">{dict.search.loading}</p>
                </div>
              ) : error ? (
                <div className="py-16 text-center border border-border text-red-500">
                  <p>{error}</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-px bg-border">
                  {results.map((article) => (
                    <Link
                      key={article.id}
                      href={`/${locale}/articles/${article.slug}`}
                      className="article-card flex flex-col sm:flex-row gap-0 bg-background group"
                    >
                      {/* Thumbnail */}
                      <div className="sm:w-48 sm:flex-shrink-0 aspect-[16/9] sm:aspect-auto overflow-hidden relative bg-muted">
                        {article.featuredImage?.url && (
                          <AppImage
                            src={article.featuredImage.url}
                            alt={article.featuredImage.alt || article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 192px"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-grow p-5 flex flex-col gap-2.5">
                        <div className="flex items-center gap-2">
                          <span className="badge-blue">
                            {article.category?.name || (locale === 'ar' ? 'مقال' : 'Article')}
                          </span>
                          {article.readingTime && (
                            <span className="text-xs text-muted-foreground">
                              {article.readingTime} {locale === 'ar' ? 'دقيقة قراءة' : 'min read'}
                            </span>
                          )}
                        </div>

                        <h2 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {article.title}
                        </h2>

                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {article.excerpt || article.subtitle}
                        </p>

                        <div className="flex items-center gap-4 mt-auto pt-2.5 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <Icon name="UserCircleIcon" size={13} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {article.author?.fullName || 'ExpatSaudi'}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Intl.DateTimeFormat(locale, { 
                              year: 'numeric', month: 'short', day: 'numeric' 
                            }).format(new Date(article.publishedAt))}
                          </span>
                          
                          {/* Map Gov sources as tags */}
                          {article.governmentSources && article.governmentSources.length > 0 && (
                            <div className="ml-auto flex flex-wrap gap-1.5 hidden sm:flex">
                              {article.governmentSources.slice(0, 2).map((source) => (
                                <span key={source.id} className="badge-gray">{source.name}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* No Results State */
                <div className="py-16 text-center border border-border">
                  <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center mx-auto mb-5">
                    <Icon name="MagnifyingGlassIcon" size={24} className="text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    {currentQ ? (
                      <>
                        {dict.search.noResultsFor} &ldquo;<span className="text-primary">{currentQ}</span>&rdquo;
                      </>
                    ) : (
                      dict.search.noResults
                    )}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                    {dict.search.noResultsDescription}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={clearFilters}
                      className="btn-secondary text-sm py-2 px-4"
                    >
                      {dict.search.clearSearch}
                    </button>
                    <Link href={`/${locale}/articles`} className="btn-primary text-sm py-2 px-4">
                      {dict.search.browseAllGuides}
                    </Link>
                  </div>

                  {popularSearches.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <p className="label-caps text-muted-foreground mb-4">{dict.search.tryPopularTopics}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {popularSearches.map((term, index) => (
                          <button
                            key={`${term.query}-${index}`}
                            onClick={() => handlePopularSearch(term.query)}
                            className="text-xs font-medium text-muted-foreground border border-border px-3 py-1.5 hover:border-primary hover:text-primary transition-colors"
                            style={{ borderRadius: '4px' }}
                          >
                            {term.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              {!loading && pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={!pagination.hasPrevPage}
                    className={`btn-secondary text-sm py-2 px-4 ${!pagination.hasPrevPage ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {locale === 'ar' ? '→' : '←'} {dict.search.previous}
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground border border-border'
                        }`}
                        style={{ borderRadius: '4px' }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => handlePageChange(Math.min(pagination.totalPages, currentPage + 1))}
                    disabled={!pagination.hasNextPage}
                    className={`btn-secondary text-sm py-2 px-4 flex items-center gap-1.5 ${!pagination.hasNextPage ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {dict.search.next} <Icon name="ArrowRightIcon" size={14} className={locale === 'ar' ? 'rotate-180' : ''} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}