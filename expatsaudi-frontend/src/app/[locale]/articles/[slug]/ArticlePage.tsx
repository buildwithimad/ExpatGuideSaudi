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
}

export default function ArticlePage({ locale, dict, article }: Props) {
  const isAr = locale === 'ar';
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

  return (
    <>
      <main className="pt-16 md:pt-[68px]">
        
        {/* Breadcrumbs */}
        <div className="border-b border-border py-3 md:py-4 bg-muted/20">
          <div className="container-editorial">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 md:gap-2.5 text-xs sm:text-sm text-muted-foreground">
              {breadcrumbs?.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <Icon name="ChevronRightIcon" size={14} className="flex-shrink-0 rtl:rotate-180" />}
                    {isLast ? (
                      <span 
                        className="text-foreground font-semibold bg-background px-2.5 py-1 rounded-md border border-border truncate max-w-[200px] sm:max-w-xs shadow-sm" 
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
        <section className="border-b border-border py-10 md:py-14">
          <div className="container-editorial">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {category?.name && (
                  <span className="badge-blue">{category.name}</span>
                )}
                <span className="badge-green">{isAr ? 'محدّث' : 'Updated'}</span>
                {readingTime && (
                  <span className="text-xs text-muted-foreground">{readingTime} {isAr ? 'دقيقة قراءة' : 'min read'}</span>
                )}
              </div>
              
              <h1 className="text-display text-foreground mb-5 leading-tight">
                {title}
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {excerpt || subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 overflow-hidden rounded-full border border-border bg-muted">
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
        className="text-primary-foreground"
      />
    </div>
  )}
</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {author?.fullName || 'ExpatSaudi Editorial'}
                    </p>
                    <p className="text-2xs text-muted-foreground">
                      {author?.jobTitle || (isAr ? 'موثّق من الفريق' : 'Verified Team')}
                    </p>
                  </div>
                </div>
                {formattedDate && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="CalendarIcon" size={13} />
                    <span>{isAr ? 'نُشر' : 'Published'} {formattedDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="border-b border-border">
          <div className="container-editorial py-0">
            <div className="aspect-[21/9] overflow-hidden relative bg-muted">
              {featuredImage?.url && (
                <AppImage 
                  src={featuredImage.url} 
                  alt={featuredImage.alt || title} 
                  fill 
                  className="object-cover" 
                  priority 
                />
              )}
            </div>
          </div>
        </div>

        {/* Article Content & Sidebar */}
        <section className="py-12 md:py-16">
          <div className="container-editorial">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Main Content */}
              <article className="lg:col-span-8 prose-editorial">
                
                {/* TODO: Payload Lexical Renderer */}
                <RichText data={articleData.content} />

                {/* Official Source Links */}
                {sourceLinks && sourceLinks.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-5">
                      {isAr ? 'روابط المصادر الرسمية' : 'Official Source Links'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {sourceLinks.map((source, index) => (
                        <a 
                          key={index} 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group flex items-center justify-between gap-3 p-4 border border-border hover:border-primary hover:bg-muted/30 transition-all bg-background shadow-sm hover:shadow-md"
                        >
                          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {source.label}
                          </span>
                          <Icon name="ExternalLinkIcon" size={18} className="text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors rtl:rotate-180" />
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
              <aside className="lg:col-span-4 space-y-6">

                <div className="sticky top-24 space-y-6">
                
                {/* Table of Contents */}
                {tableOfContents && tableOfContents.length > 0 && (
                  <div className="border border-border p-5 ">
                    <p className="label-caps text-foreground mb-4">
                      {isAr ? 'محتويات المقال' : 'Table of Contents'}
                    </p>
                    <nav className="space-y-1">
                      {tableOfContents.map((item) => (
                        <a 
                          key={item.id} 
                          href={`#${item.id}`} 
                          className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors border-s-2 border-transparent hover:border-primary ps-3"
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Related Articles */}
                {relatedArticles && relatedArticles.length > 0 && (
                  <div className="border border-border p-5 bg-muted/10">
                    <p className="label-caps text-foreground mb-4 border-b border-border pb-3">
                      {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                    </p>
                    <div className="space-y-6 pt-1">
                      {relatedArticles.map((rel) => (
                        <Link 
                          key={rel.slug} 
                          href={`/${locale}/articles/${rel.slug}`} 
                          className="block group"
                        >
                          {rel.category && (
  <span className="badge-blue mb-2 inline-block">
    {rel.category}
  </span>
)}
                          <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1.5 line-clamp-2">
                            {rel.title}
                          </p>
                          {rel.readingTime && (
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Icon name="ClockIcon" size={12} />
                              {rel.readingTime} {isAr ? 'دقيقة قراءة' : 'min read'}
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