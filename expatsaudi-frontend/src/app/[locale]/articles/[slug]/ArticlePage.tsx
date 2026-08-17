'use client';

import SocialShare from '@/components/Features/SocialShare';
import { RichText } from '@/components/richtext';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { ArticleDetails } from '@/lib/api/articles/responses';
import type { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import React from 'react';

interface Props {
  locale: Locale;
  dict: any;
  article: ArticleDetails;
  enableTableOfContents: boolean;
  enableRelatedArticles: boolean;
}

export default function ArticlePage({ locale, dict, article, enableTableOfContents = true, enableRelatedArticles= true }: Props) {

  const t = dict?.articlePage;


  const { 
    article: articleData, 
    relatedArticles, 
    tableOfContents, 
    breadcrumbs 
  } = article;

 const {
  title,
  subtitle,
  excerpt,
  featuredImage,
  author,
  category,
  readingTime,
  publishedAt,
  updatedAt,
  sourceLinks,
} = articleData;

  // Format the date based on locale safely
  const formattedDate = publishedAt 
    ? new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt))
    : '';


    const isUpdated =
  Boolean(updatedAt) &&
  Boolean(publishedAt) &&
  new Date(updatedAt).getTime() >
    new Date(publishedAt).getTime();

  return (
    <>
      <main className="pt-12 sm:pt-16 md:pt-[68px] mt-6 sm:mt-8 md:mt-20">
        
        {/* Breadcrumbs */}
        <div className="border-b border-border py-2.5 sm:py-3 md:py-4 bg-muted/20">
          <div className="container-editorial">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-2.5 text-[11px] sm:text-xs md:text-sm text-muted-foreground">
              {breadcrumbs?.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <Icon name="ChevronRightIcon" size={14} className="flex-shrink-0 rtl:rotate-180 w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    {isLast ? (
                      <span 
                        className="text-foreground font-semibold bg-background px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-border truncate max-w-[150px] sm:max-w-[200px] md:max-w-xs " 
                        aria-current="page"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link 
                        href={crumb.href} 
                        className="hover:text-foreground hover:underline underline-offset-4 transition-all whitespace-nowrap"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="border-b border-border py-6 sm:py-8 md:py-14">
          <div className="container-editorial">
            <div className="max-w-7xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                {category?.name && (
                  <span className="badge text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">{category.name}</span>
                )}
                {isUpdated && (
  <span className="badge text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
    {t?.updated}
  </span>
)}
                {readingTime && (
                  <span className="text-[11px] sm:text-xs text-muted-foreground">{readingTime} {t?.minRead}</span>
                )}
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-5 leading-snug sm:leading-tight">
                {title}
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                {excerpt || subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 sm:pt-5 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden rounded-full border border-border bg-muted shrink-0">
                    {author?.photo?.url ? (
                      <AppImage
                        src={author.photo.sizes?.thumbnail || author.photo.url}
                        alt={author.photo.alt || author.fullName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary flex items-center justify-center">
                        <Icon
                          name="UserIcon"
                          size={16}
                          className="text-primary-foreground w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs font-semibold text-foreground">
                      {author?.fullName || 'ExpatSaudi Editorial'}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {author?.jobTitle || t?.verifiedTeam}
                    </p>
                  </div>
                </div>
                {formattedDate && (
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-muted-foreground ms-auto sm:ms-0">
                    <Icon name="CalendarIcon" size={13} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{t?.published} {formattedDate} {formattedDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="border-b border-border">
          <div className="container-editorial">
            <div className="relative w-full overflow-hidden bg-muted">
              {featuredImage?.url && (
                <AppImage
                  src={featuredImage.url}
                  alt={featuredImage.alt || title}
                  width={featuredImage.width || 1730}
                  height={featuredImage.height || 909}
                  priority
                  objectFit="contain"
                  className="block h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              )}
            </div>
          </div>
        </div>

        {/* Article Content & Sidebar */}
        <section className="py-8 sm:py-12 md:py-16">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
              
              {/* Main Content */}
              <article className="lg:col-span-8 prose-editorial">
                
                {/* Table of Contents - Mobile & Tablet Only (Displayed before article content) */}
                {enableTableOfContents && tableOfContents && tableOfContents.length > 0 && (
                  <div className="lg:hidden border border-border p-4 sm:p-5 mb-6 sm:mb-8">
                    <p className="label-caps text-[10px] sm:text-xs text-foreground mb-3 sm:mb-4">
                      {t?.tableOfContents}
                    </p>
                    <nav className="space-y-1">
                      {tableOfContents.map((item) => (
                        <a 
                          key={item.id} 
                          href={`#${item.id}`} 
                          className="block py-1 sm:py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors border-s-2 border-transparent hover:border-primary ps-2.5 sm:ps-3"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
                
                {/* Payload Lexical Renderer */}
                <RichText
                  data={articleData.content}
                  headingIds={tableOfContents}
                />

                {/* Official Source Links */}
                {sourceLinks && sourceLinks.length > 0 && (
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-5">
                      {t?.officialSourceLinks}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {sourceLinks.map((source, index) => (
                        <a 
                          key={index} 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group flex items-center justify-between gap-3 p-3 sm:p-4 border border-border hover:border-primary hover:bg-muted/30 transition-all bg-background shadow-sm hover:shadow-md"
                        >
                          <span className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {source.label}
                          </span>
                          <Icon name="ExternalLinkIcon" size={18} className="text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors rtl:rotate-180 w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <SocialShare
                  locale={locale}
                  title={title}
                />
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-5 sm:space-y-6">

                <div className="lg:sticky lg:top-24 space-y-5 sm:space-y-6">
                
                {/* Table of Contents - Desktop Only */}
                {enableTableOfContents && tableOfContents && tableOfContents.length > 0 && (
                  <div className="hidden lg:block border border-border p-4 sm:p-5">
                    <p className="label-caps text-[10px] sm:text-xs text-foreground mb-3 sm:mb-4">
                      {t?.tableOfContents}
                    </p>
                    <nav className="space-y-1">
                      {tableOfContents.map((item) => (
                        <a 
                          key={item.id} 
                          href={`#${item.id}`} 
                          className="block py-1 sm:py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors border-s-2 border-transparent hover:border-primary ps-2.5 sm:ps-3"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Related Articles */}
                {enableRelatedArticles && relatedArticles && relatedArticles.length > 0 && (
                  <div className="border border-border p-4 sm:p-5 bg-muted/10">
                    <p className="label-caps text-[10px] sm:text-xs text-foreground mb-3 sm:mb-4 border-b border-border pb-2.5 sm:pb-3">
                      {t?.relatedArticles}
                    </p>
                    <div className="space-y-4 sm:space-y-6 pt-1">
                      {relatedArticles.map((rel) => (
                        <Link 
                          key={rel.slug} 
                          href={`/${locale}/articles/${rel.slug}`} 
                          className="block group"
                        >
                          {rel.category && (
                            <span className="badge-blue mb-1.5 sm:mb-2 inline-block text-[9px] sm:text-[10px] px-1.5 py-0.5">
                              {rel.category}
                            </span>
                          )}
                          <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1 sm:mb-1.5 line-clamp-2">
                            {rel.title}
                          </p>
                          {rel.readingTime && (
                            <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                              <Icon name="ClockIcon" size={12} className="w-3 h-3" />
                              {readingTime} {t?.minRead}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                </div>
                
              </aside>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}