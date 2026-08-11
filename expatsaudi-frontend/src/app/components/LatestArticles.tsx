import Link from 'next/link'

import Icon from '@/components/ui/AppIcon'
import AppImage from '@/components/ui/AppImage'
import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/i18n-config'

import RevealWrapper from './RevealWrapper'
import SectionTitle from './SectionTitle'

interface LatestArticlesProps {
  dict?: Dictionary
  locale?: Locale
  articles: any[]
}

export default function LatestArticles({
  dict,
  locale = 'en',
  articles,
}: LatestArticlesProps) {
  const t = dict?.latestArticles

  const articleCount = articles?.length ?? 0

  return (
    <section className="py-16 md:py-20 border-b border-border">
      <div className="container-editorial">

        {/* ------------------------------------------------------------------ */}
        {/* Section Header                                                      */}
        {/* ------------------------------------------------------------------ */}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionTitle
            label={t?.label ?? 'Latest Guides'}
            title={t?.title ?? 'Recently Published'}
            description={
              t?.description ??
              'Fresh, verified content covering the most important topics for expats in Saudi Arabia.'
            }
          />

          <Link
            href={`/${locale}/articles`}
            className="btn-secondary text-sm py-2 px-4 flex-shrink-0 self-start md:self-auto flex items-center gap-1.5"
          >
            {t?.viewAll ?? 'View All Articles'}

            <Icon
              name="ArrowRightIcon"
              size={14}
            />
          </Link>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Articles                                                            */}
        {/* ------------------------------------------------------------------ */}

        {articleCount > 0 ? (
          <div
            className={
              articleCount === 1
                ? 'flex items-start'
                : articleCount === 2
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-px bg-border'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border'
            }
          >
            {articles.map((article, i) => (
              <div
                key={
                  article?.id ||
                  article?.title ||
                  i
                }
                className={
                  articleCount === 1
                    ? 'w-full md:w-1/2 lg:w-1/3'
                    : 'w-full'
                }
              >
                <RevealWrapper
                  delay={i * 60}
                  type="up"
                >
                  <Link
                    href={`/${locale}/articles/${article?.slug}`}
                    className="article-card flex flex-col h-full w-full bg-background group"
                  >

                    {/* ------------------------------------------------------ */}
                    {/* Image                                                    */}
                    {/* ------------------------------------------------------ */}

                    <div className="aspect-[16/9] overflow-hidden relative">
                      {article?.featuredImage?.url ? (
                        <AppImage
                          src={
                            article.featuredImage
                              .sizes?.card ??
                            article.featuredImage.url
                          }
                          alt={
                            article.featuredImage.alt ||
                            article.title
                          }
                          fill
                          className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>

                    {/* ------------------------------------------------------ */}
                    {/* Content                                                  */}
                    {/* ------------------------------------------------------ */}

                    <div className="p-5 flex flex-col gap-3 flex-grow">

                      {/* Category + Reading Time */}

                      <div className="flex items-center gap-2">
                        {article?.category?.name && (
                          <span className="badge-blue">
                            {article.category.name}
                          </span>
                        )}

                        {article?.readingTime && (
                          <span className="text-xs text-muted-foreground">
                            {article.readingTime} min read
                          </span>
                        )}
                      </div>

                      {/* Title */}

                      <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                        {article?.title}
                      </h3>

                      {/* Excerpt */}

                      {article?.excerpt && (
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Footer */}

                      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">

                        <div className="flex items-center gap-1.5">
                          <Icon
                            name="UserCircleIcon"
                            size={14}
                            className="text-muted-foreground"
                          />

                          <span className="text-xs text-muted-foreground">
                            {article?.author?.fullName}
                          </span>
                        </div>

                        {article?.publishedAt && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              article.publishedAt,
                            ).toLocaleDateString(
                              locale,
                            )}
                          </span>
                        )}

                      </div>
                    </div>
                  </Link>
                </RevealWrapper>
              </div>
            ))}
          </div>
        ) : (

          /* ---------------------------------------------------------------- */
          /* Empty State                                                       */
          /* ---------------------------------------------------------------- */

          <div className="border border-border bg-muted/30 px-6 py-12 text-center">

            <Icon
              name="DocumentTextIcon"
              size={28}
              className="mx-auto text-muted-foreground mb-3"
            />

            <p className="text-sm font-medium text-foreground">
              {locale === 'ar'
                ? 'لا توجد مقالات منشورة بعد'
                : locale === 'ur'
                  ? 'ابھی تک کوئی مضمون شائع نہیں ہوا'
                  : 'No articles published yet'}
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              {locale === 'ar'
                ? 'سيتم نشر أدلة ومعلومات جديدة قريبًا.'
                : locale === 'ur'
                  ? 'نئی گائیڈز اور معلومات جلد شائع کی جائیں گی۔'
                  : 'New guides and useful information will be published soon.'}
            </p>

          </div>
        )}
      </div>
    </section>
  )
}