import Icon from '@/components/ui/AppIcon'
import AppImage from '@/components/ui/AppImage'
import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/i18n-config'
import { getImageUrl } from '@/lib/utils/getImageUrl'
import Link from 'next/link'
import RevealWrapper from './RevealWrapper'

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
    <section className="py-12 md:py-20 border-b border-border">
      <div className="container-editorial">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <span className="label-caps text-primary">
            {t?.label ?? 'Featured Guide'}
          </span>

          <Link
            href={`/${locale}/articles`}
            className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            {t?.allGuides ?? 'All Guides'}
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        <RevealWrapper type="up">
          <Link
            href={`/${locale}/articles/${article.slug}`}
            className="group block border border-border hover:border-foreground/20 transition-colors duration-300"
          >
            <div className="grid lg:grid-cols-2">

              {/* Image */}
             <div className="relative w-full aspect-[1730/910] overflow-hidden bg-muted">
  <AppImage
    src={getImageUrl(article.featuredImage, 'original')}
    alt={article.featuredImage?.alt || article.title}
    fill
    priority
    objectFit="contain"
    className="transition-transform duration-500 group-hover:scale-[1.02]"
    sizes="(max-width: 1024px) 100vw, 50vw"
  />
</div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-between gap-6 md:gap-8 bg-muted">

                <div className="flex flex-col gap-3 md:gap-4">

                  {/* Meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {article?.category?.name && (
                      <span className="badge-blue text-[10px] md:text-xs">
                        {article.category.name}
                      </span>
                    )}

                    {article?.readingTime && (
                      <span className="text-[11px] md:text-xs text-muted-foreground">
                        {article.readingTime} min read
                      </span>
                    )}

                    {article?.publishedAt && (
                      <>
                        <span className="text-[11px] md:text-xs text-muted-foreground">
                          ·
                        </span>

                        <span className="text-[11px] md:text-xs text-muted-foreground">
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
                      text-xl
                      font-bold
                      text-foreground
                      leading-[1.2]
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
                        text-sm
                        text-muted-foreground
                        leading-relaxed
                        line-clamp-3
                      "
                    >
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border">

                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full shrink-0 bg-primary flex items-center justify-center">
                      <Icon
                        name="UserIcon"
                        size={14}
                        className="text-primary-foreground"
                      />
                    </div>

                    <span className="text-xs md:text-sm font-medium text-foreground truncate">
                      {article?.author?.fullName}
                    </span>
                  </div>

                  <span
                    className="
                      btn-primary
                      text-xs
                      py-2
                      px-3
                      md:px-5
                      shrink-0
                    "
                  >
                    {t?.continueReading ?? 'Continue Reading'}
                  </span>

                </div>
              </div>
            </div>
          </Link>
        </RevealWrapper>
      </div>
    </section>
  )
}