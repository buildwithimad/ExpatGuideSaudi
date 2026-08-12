'use client';

import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { Article } from '@/lib/api/articles';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import { getImageUrl } from '@/lib/utils/getImageUrl';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
  dict?: Dictionary;
  locale?: Locale;
  articles?: Article[];
}

export default function HeroSection({
  dict,
  locale = 'en',
  articles = [],
}: HeroSectionProps) {
  const t = dict?.hero;
  
  // Take up to 4 latest articles for the carousel without fetching again
  const carouselArticles = articles.slice(0, 4);
  const totalSlides = carouselArticles.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const isRtl = locale === 'ar' || locale === 'ur';

  // Lightweight Auto-play timer (5 seconds)
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    // Respect user's reduced motion preference for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides, isPaused]);

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    // 40px threshold to prevent accidental swipes on slight scroll
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swiped left (in LTR this means next, in RTL this means prev)
        isRtl ? handlePrev() : handleNext();
      } else {
        // Swiped right
        isRtl ? handleNext() : handlePrev();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

 

  // Type-safe category extraction
  const getCategoryTitle = (category: any): string => {
    if (!category) return '';
    if (typeof category === 'string') return category;
    return category?.title || '';
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString(locale === 'ar' ? 'ar-SA' : locale === 'ur' ? 'ur-PK' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="pt-24 md:pt-[120px] pb-16 md:pb-24 bg-background border-b border-border mt-10">
      <div className="container-editorial">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          
          {/* ================= LEFT: EDITORIAL INTRO ================= */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 lg:pt-4">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              {t?.badge ?? 'LIVE & UPDATED 2026'}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-foreground leading-[1.15] tracking-tight">
              {t?.title ?? 'Everything Expats Need to Know About Saudi Arabia'}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              {t?.description ?? 'Your authoritative guide to life in the Kingdom. From Iqama renewals and visa services to labor law, banking, and housing.'}
            </p>

            <div className="pt-4">
              <Link 
                href={`/${locale}/articles`} 
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold px-7 py-3.5 hover:bg-primary/90 transition-colors text-base"
              >
                {t?.exploreGuides ?? 'Explore Guides'}
                <Icon name="ArrowRightIcon" size={18} className="ms-2 rtl:rotate-180" />
              </Link>
            </div>

           
          </div>

          {/* ================= RIGHT: LATEST ARTICLES CAROUSEL ================= */}
          <div className="w-full lg:w-7/12 flex flex-col relative">
            {totalSlides > 0 ? (
              <div 
                className="relative overflow-hidden w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Horizontal Sliding Track */}
                <div 
                  className="flex transition-transform duration-500 ease-[0.25,1,0.5,1] w-full"
                  style={{ transform: `translate3d(${isRtl ? currentIndex * 100 : -(currentIndex * 100)}%, 0, 0)` }}
                >
                  {carouselArticles.map((article, idx) => (
                    <div key={article.slug || idx} className="w-full flex-shrink-0 relative">
                      {/* Entire Slide is a Link (SEO & Touch friendly) */}
                      <Link 
                        href={`/${locale}/articles/${article.slug}`} 
                        className="group flex flex-col w-full h-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                        aria-hidden={currentIndex !== idx}
                        tabIndex={currentIndex === idx ? 0 : -1}
                      >
                        {/* Featured Editorial Image */}
<div className="relative w-full aspect-[1730/910] bg-muted overflow-hidden border border-border">
  <AppImage
    src={getImageUrl(article.featuredImage, 'original')}
    alt={article.featuredImage?.alt || article.title}
    fill
    objectFit="cover"
    className="transition-transform duration-700 group-hover:scale-[1.02]"
    sizes="(max-width: 1024px) 100vw, 60vw"
    priority={idx === 0}
  />
</div>

                        {/* Article Content Area */}
                        <div className="pt-6 flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">
                              {getCategoryTitle(article.category)}
                            </span>
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                              {formatDate(article.publishedAt)}
                              {article.readingTime && ` · ${article.readingTime} min`}
                            </span>
                          </div>

                          <h2 className="text-2xl md:text-[28px] font-bold text-foreground leading-[1.2] group-hover:text-primary transition-colors">
                            {article.title}
                          </h2>

                          {article.excerpt && (
                            <p className="text-muted-foreground text-sm md:text-base line-clamp-2 md:line-clamp-3 leading-relaxed mt-1">
                              {article.excerpt}
                            </p>
                          )}

                          <div className="text-primary text-sm font-semibold flex items-center pt-2 group-hover:underline underline-offset-4">
                            Read Guide 
                            <Icon name="ArrowRightIcon" size={16} className="ms-1 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Minimalist Controls - Separate from link */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50">
                  {/* Indicators */}
                  <div className="flex items-center gap-3">
                    {carouselArticles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        aria-current={idx === currentIndex}
                        className={`h-2 transition-all duration-300 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                          idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Previous / Next */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous slide"
                      className="w-10 h-10 flex items-center justify-center border border-border bg-background text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Icon name="ArrowLeftIcon" size={16} className="rtl:rotate-180" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next slide"
                      className="w-10 h-10 flex items-center justify-center border border-border bg-background text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Icon name="ArrowRightIcon" size={16} className="rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty Fallback State */
              <div className="flex flex-col items-center justify-center border border-border bg-card p-12 text-center h-full min-h-[300px]">
                <Icon name="DocumentTextIcon" size={40} className="text-muted-foreground mb-4" />
                <p className="text-base font-medium text-muted-foreground">
                  Latest guides coming soon.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}