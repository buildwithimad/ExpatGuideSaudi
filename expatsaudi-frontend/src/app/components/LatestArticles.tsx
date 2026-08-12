import Link from 'next/link'

import Icon from '@/components/ui/AppIcon'
import AppImage from '@/components/ui/AppImage'
import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/i18n-config'

import { getImageUrl } from '@/lib/utils/getImageUrl'
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

  // Use the number of available articles to determine the layout.
  // 1 article  → 1 column
  // 2 articles → 2 columns
  // 3 articles → 3 columns
  // 4+ articles → 4 columns
  const gridColumns =
    articleCount === 1
      ? 'grid-cols-1'
      : articleCount === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : articleCount === 3
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'

  return (
    <section className="border-b border-border py-12 md:py-16 lg:py-20">
      <div className="container-editorial">

        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
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
            className="
              btn-secondary
              flex
              w-fit
              shrink-0
              items-center
              gap-1.5
              px-4
              py-2
              text-xs
              md:text-sm
            "
          >
            {t?.viewAll ?? 'View All Articles'}

            <Icon
              name="ArrowRightIcon"
              size={14}
            />
          </Link>
        </div>

        {/* Articles */}
        {articleCount > 0 ? (
          <div
            className={`
              grid
              ${gridColumns}
              gap-px
              bg-border
            `}
          >
            {articles.map((article, i) => (
              <RevealWrapper
                key={
                  article?.id ??
                  article?.slug ??
                  article?.title ??
                  i
                }
                delay={i * 60}
                type="up"
              >
                <Link
                  href={`/${locale}/articles/${article?.slug}`}
                  className="
                    article-card
                    group
                    flex
                    h-full
                    w-full
                    flex-col
                    bg-background
                    transition-colors
                  "
                >

                {/* Image */}
<div
  className="
    relative
    aspect-[1730/909]
    w-full
    overflow-hidden
    bg-muted
  "
>
  {article?.featuredImage ? (
    <AppImage
      src={getImageUrl(article.featuredImage, 'original')}
      alt={
        article.featuredImage.alt ||
        article.title
      }
      fill
      objectFit="contain"
      className="
        transition-transform
        duration-500
        group-hover:scale-[1.02]
      "
      sizes="
        (max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        25vw
      "
    />
  ) : (
    <div className="h-full w-full bg-muted" />
  )}
</div>
                  {/* Content */}
                  <div
                    className="
                      flex
                      flex-grow
                      flex-col
                      gap-3
                      p-4
                      sm:p-5
                    "
                  >

                    {/* Category + Reading Time */}
                    <div className="flex min-h-[22px] flex-wrap items-center gap-2">
                      {article?.category?.name && (
                        <span className="badge-blue text-[10px] sm:text-xs">
                          {article.category.name}
                        </span>
                      )}

                      {article?.readingTime && (
                        <span className="text-[11px] text-muted-foreground sm:text-xs">
                          {article.readingTime} min read
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className="
                        line-clamp-3
                        text-sm
                        font-semibold
                        leading-snug
                        text-foreground
                        transition-colors
                        duration-200
                        group-hover:text-primary
                        sm:text-base
                      "
                    >
                      {article?.title}
                    </h3>

                    {/* Excerpt */}
                    {article?.excerpt && (
                      <p
                        className="
                          line-clamp-3
                          flex-grow
                          text-xs
                          leading-relaxed
                          text-muted-foreground
                          sm:text-sm
                        "
                      >
                        {article.excerpt}
                      </p>
                    )}

                    {/* Footer */}
                    <div
                      className="
                        mt-auto
                        flex
                        min-w-0
                        items-center
                        justify-between
                        gap-2
                        border-t
                        border-border
                        pt-3
                      "
                    >

                      {/* Author */}
                      <div className="flex min-w-0 items-center gap-1.5">
                        <Icon
                          name="UserCircleIcon"
                          size={14}
                          className="shrink-0 text-muted-foreground"
                        />

                        <span
                          className="
                            truncate
                            text-[11px]
                            text-muted-foreground
                            sm:text-xs
                          "
                        >
                          {article?.author?.fullName}
                        </span>
                      </div>

                      {/* Date */}
                      {article?.publishedAt && (
                        <span
                          className="
                            shrink-0
                            text-[10px]
                            text-muted-foreground
                            sm:text-xs
                          "
                        >
                          {new Date(
                            article.publishedAt,
                          ).toLocaleDateString(locale)}
                        </span>
                      )}

                    </div>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        ) : (

          /* Empty State */
          <div className="border border-border bg-muted/30 px-6 py-12 text-center">

            <Icon
              name="DocumentTextIcon"
              size={28}
              className="mx-auto mb-3 text-muted-foreground"
            />

            <p className="text-sm font-medium text-foreground">
              {locale === 'ar'
                ? 'لا توجد مقالات منشورة بعد'
                : locale === 'ur'
                  ? 'ابھی تک کوئی مضمون شائع نہیں ہوا'
                  : 'No articles published yet'}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
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