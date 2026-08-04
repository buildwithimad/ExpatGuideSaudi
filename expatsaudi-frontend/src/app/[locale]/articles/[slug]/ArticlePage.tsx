'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { RichText } from '@/components/richtext';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { ArticleDetailsDTO } from '@/lib/api/articles/responses';
import type { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import React from 'react';
import NewsletterSection from '../../../components/NewsletterSection';




interface Props {
  locale: Locale;
  dict: any;
  article: ArticleDetailsDTO;
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
    governmentSources,
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
      <Header locale={locale} dict={dict} />
      <main className="pt-16 md:pt-[68px]">
        
        {/* Breadcrumbs */}
        <div className="border-b border-border py-3">
          <div className="container-editorial">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground overflow-hidden">
              {breadcrumbs?.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Icon name="ChevronRightIcon" size={12} className="flex-shrink-0" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium truncate max-w-xs">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-foreground transition-colors whitespace-nowrap">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
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
                  <div className="w-8 h-8 bg-primary flex items-center justify-center">
                    <Icon name="UserIcon" size={14} className="text-primary-foreground" />
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

                {/* Government Sources */}
                {governmentSources && governmentSources.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-sm font-semibold text-foreground mb-4">
                      {isAr ? 'المصادر الحكومية المعتمدة' : 'Official Government Sources'}
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                      {governmentSources.map((source) => {
                        const content = (
                          <>
                            {source.logo?.url && (
                              <div className="w-5 h-5 relative flex-shrink-0">
                                <AppImage 
                                  src={source.logo.url} 
                                  alt={source.logo.alt || source.name} 
                                  fill 
                                  className="object-contain" 
                                />
                              </div>
                            )}
                            <span className="text-sm font-medium">{source.name}</span>
                          </>
                        );

                        const classes = "flex items-center gap-2.5 border border-border p-3 hover:border-primary transition-colors bg-background";

                        return source.officialWebsite ? (
                          <a 
                            key={source.id} 
                            href={source.officialWebsite} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={classes}
                          >
                            {content}
                          </a>
                        ) : (
                          <div key={source.id} className={classes}>
                            {content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                
                {/* Table of Contents */}
                {tableOfContents && tableOfContents.length > 0 && (
                  <div className="border border-border p-5 sticky top-24">
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
                  <div className="border border-border p-5">
                    <p className="label-caps text-foreground mb-4">
                      {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
                    </p>
                    <div className="space-y-4">
                      {relatedArticles.map((rel) => (
                        <Link 
                          key={rel.slug} 
                          href={`/${locale}/articles/${rel.slug}`} 
                          className="block group"
                        >
                          {rel.category && (
                            <span className="badge-blue mb-1.5 inline-block">{rel.category}</span>
                          )}
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                            {rel.title}
                          </p>
                          {rel.readingTime && (
                            <span className="text-xs text-muted-foreground">{rel.readingTime} {isAr ? 'دقيقة قراءة' : 'min read'}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
              </aside>
            </div>
          </div>
        </section>

        <NewsletterSection dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}