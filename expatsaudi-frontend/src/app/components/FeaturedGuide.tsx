import Icon from '@/components/ui/AppIcon'
import AppImage from '@/components/ui/AppImage'
import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/i18n-config'
import { getImageUrl } from '@/lib/utils/getImageUrl'
import Link from 'next/link'

interface FeaturedGuideProps {
  dict?: Dictionary
  locale?: Locale
  article?: any
}

export default function FeaturedGuide({
  dict,
  locale = 'en',
  article,
}: FeaturedGuideProps) {
  const t = dict?.featuredGuide

  if (!article) return null

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 border-b border-border">
      <div className="container-editorial">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
          <span className="label-caps text-[10px] md:text-xs text-primary">
            {t?.label ?? 'Featured Guide'}
          </span>

          <Link
            href={`/${locale}/articles`}
            className="text-[11px] md:text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            {t?.allGuides ?? 'All Guides'}
            <Icon name="ArrowRightIcon" size={14} className="w-3 h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
          </Link>
        </div>

        
          <Link
            href={`/${locale}/articles/${article.slug}`}
            className="group flex flex-col lg:flex-row border border-border hover:border-foreground/20 transition-colors duration-300"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-2 w-full">

              {/* Image */}
              <div className="relative w-full aspect-[1730/910] overflow-hidden bg-muted border-b lg:border-b-0 lg:border-r border-border">
                <AppImage
                  src={getImageUrl(article.featuredImage, 'original')}
                  alt={article.featuredImage?.alt || article.title}
                  fill
                  objectFit="contain"
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-between gap-5 md:gap-6 lg:gap-8 bg-muted/30 lg:bg-muted">

                <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-4">

                  {/* Meta */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {article?.category?.name && (
                      <span className="badge-blue text-[9px] sm:text-[10px] md:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1">
                        {article.category.name}
                      </span>
                    )}

                    {article?.readingTime && (
                      <span className="text-[10px] sm:text-[11px] md:text-xs text-muted-foreground">
                        {article.readingTime} min read
                      </span>
                    )}

                    {article?.publishedAt && (
                      <>
                        <span className="text-[10px] sm:text-[11px] md:text-xs text-muted-foreground">
                          ·
                        </span>

                        <span className="text-[10px] sm:text-[11px] md:text-xs text-muted-foreground">
                          {new Date(
                            article.publishedAt,
                          ).toLocaleDateString(locale)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2
                    className="
                      text-[17px] sm:text-lg md:text-xl lg:text-2xl
                      font-bold
                      text-foreground
                      leading-[1.25] md:leading-[1.2]
                      group-hover:text-primary
                      transition-colors
                      duration-200
                    "
                  >
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  {article?.excerpt && (
                    <p
                      className="
                        text-[13px] sm:text-sm md:text-[15px]
                        text-muted-foreground
                        leading-relaxed
                        line-clamp-2 md:line-clamp-3
                      "
                    >
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border mt-1">

                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 bg-primary flex items-center justify-center">
                      <Icon
                        name="UserIcon"
                        size={12}
                        className="text-primary-foreground sm:w-3.5 sm:h-3.5"
                      />
                    </div>

                    <span className="text-[11px] sm:text-xs md:text-sm font-medium text-foreground truncate">
                      {article?.author?.fullName}
                    </span>
                  </div>

                  <span
                    className="
                      btn-primary
                      text-[10px] sm:text-[11px] md:text-xs
                      py-1.5 sm:py-2
                      px-2.5 sm:px-3 md:px-5
                      shrink-0
                    "
                  >
                    {t?.continueReading ?? 'Continue Reading'}
                  </span>

                </div>
              </div>
            </div>
          </Link>
        
      </div>
    </section>
  )
}