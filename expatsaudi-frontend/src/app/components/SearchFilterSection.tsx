'use client';

import Icon from '@/components/ui/AppIcon';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';

interface SearchFilterSectionProps {
  dict?: Dictionary;
  locale?: Locale;

  filters: {
    name: string;
    slug: string;
    description?: string;
    icon?: string | null;
  }[];

  popularSearches: {
    title: string;
    query: string;
  }[];
}

export default function SearchFilterSection({
  dict,
  locale = 'en',
  filters,
  popularSearches,
}: SearchFilterSectionProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const t = dict?.search;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    router.push(
      `/${locale}/search-results?q=${encodeURIComponent(query)}`
    );
  };

  const handleClear = () => {
    setQuery('');
    setActiveFilter('all');
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 border-b border-border section-bg">
      <div className="container-editorial">
        <SectionTitle
          label={t?.label ?? 'Search'}
          title={t?.title ?? 'Find What You Need'}
          description={
            t?.description ??
            'Search across all guides, categories, and topics.'
          }
          className="mb-5 md:mb-8"
        />

        <form onSubmit={handleSearch} className="relative mb-5 md:mb-6">
          <div className="flex border border-border bg-background">
            <div className="flex items-center ps-3 md:ps-4 pe-2 md:pe-3">
              <Icon
                name="MagnifyingGlassIcon"
                size={18}
                className="text-muted-foreground w-4 h-4 md:w-[18px] md:h-[18px]"
              />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                t?.placeholder ??
                'Search guides, topics, services...'
              }
              className="flex-grow py-3 md:py-3.5 pe-3 md:pe-4 text-[13px] md:text-base text-foreground bg-transparent outline-none placeholder:text-muted-foreground min-w-0"
              style={{ borderRadius: 0 }}
            />

            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center px-2 md:px-3 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label="Clear search"
              >
                <Icon name="XMarkIcon" size={16} className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              className="btn-primary text-xs md:text-sm px-5 md:px-6 py-3 md:py-3.5 flex-shrink-0"
              style={{ borderRadius: 0 }}
            >
              {t?.button ?? 'Search'}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-2 mb-5 md:mb-6">
          {[
            {
              name: t?.all ?? 'All',
              slug: 'all',
            },
            ...filters,
          ].map((filter) => (
            <button
              key={filter.slug}
              onClick={() => {
                setActiveFilter(filter.slug);

                if (filter.slug === 'all') {
                  router.push(`/${locale}/search-results`);
                  return;
                }

                router.push(
                  `/${locale}/search-results?category=${encodeURIComponent(filter.slug)}`
                );
              }}
              className={`text-[11px] md:text-xs font-semibold px-3 md:px-3.5 py-1.5 border transition-colors duration-200 ${
                activeFilter === filter.slug
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground'
              }`}
              style={{ borderRadius: '4px' }}
            >
              {filter.name}
            </button>
          ))}

          {activeFilter !== 'all' && (
            <button
              onClick={handleClear}
              className="text-[11px] md:text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 ms-1 md:ms-2 mt-1 sm:mt-0"
            >
              <Icon name="XMarkIcon" size={12} className="w-3 h-3" />
              {t?.clearFilters ?? 'Clear filters'}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="label-caps text-[10px] md:text-xs text-muted-foreground me-1 shrink-0">
            {t?.popular ?? 'Popular:'}
          </span>

          {popularSearches.map((tag) => (
            <button
              key={tag.query}
              onClick={() => {
                setQuery(tag.query);

                router.push(
                  `/${locale}/search-results?q=${encodeURIComponent(
                    tag.query
                  )}`
                );
              }}
              className="text-[11px] md:text-xs font-medium text-muted-foreground border border-border px-2.5 md:px-3 py-1 hover:border-primary hover:text-primary transition-colors duration-200"
              style={{ borderRadius: '4px' }}
            >
              {tag.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}