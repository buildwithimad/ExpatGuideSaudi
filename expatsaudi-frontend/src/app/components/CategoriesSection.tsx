import Icon from '@/components/ui/AppIcon'
import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/i18n-config'
import Link from 'next/link'
import RevealWrapper from './RevealWrapper'
import SectionTitle from './SectionTitle'

interface CategoriesSectionProps {
  dict?: Dictionary
  locale?: Locale
  categories: any[]
}

export default function CategoriesSection({
  dict,
  locale = 'en',
  categories,
}: CategoriesSectionProps) {
  const t = dict?.categories

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 border-b border-border">
      <div className="container-editorial">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-10">
          <SectionTitle
            label={t?.label ?? 'Browse by Topic'}
            title={t?.title ?? 'Popular Categories'}
            description={
              t?.description ??
              'Find everything you need organized by topic.'
            }
          />

          {/* Desktop View All */}
          <Link
            href={`/${locale}/category`}
            className="hidden md:inline-flex btn-secondary text-sm py-2 px-5 flex-shrink-0"
          >
            {t?.viewAll ?? 'View All Categories'}
          </Link>
        </div>

        {/* Categories Grid - Adjusted for responsive mobile collapsing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
          {categories?.map((category: any, i: number) => (
            <RevealWrapper
              key={category.id ?? category.slug}
              delay={i * 40}
              type="fade"
            >
              <Link
                href={`/${locale}/category/${category.slug}`}
                className={`
                  category-card
                  flex flex-col gap-2 md:gap-3 h-full bg-background p-4 sm:p-5 lg:p-6
                  ${i >= 6 ? 'hidden md:flex' : ''}
                `}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 bg-muted flex items-center justify-center">
                    <Icon
                      name="FolderIcon"
                      size={18}
                      className="text-primary"
                    />
                  </div>

                  {/* Article Count */}
                  <span className="label-caps text-[10px] md:text-xs text-muted-foreground text-right line-clamp-1">
                    {category.articleCount ?? 0}{' '}
                    {category.articleCount === 1
                      ? t?.article ?? 'Article'
                      : t?.articles ?? 'Articles'}
                  </span>
                </div>

                <div className="mt-1 md:mt-2">
                  <h3 className="text-[13px] sm:text-sm font-semibold text-foreground mb-1 md:mb-1.5 line-clamp-1">
                    {category.name}
                  </h3>

                  <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="mt-auto pt-3 md:pt-4 flex items-center gap-1.5 text-primary">
                  <span className="text-[11px] md:text-xs font-semibold">
                    {t?.explore ?? 'Explore'}
                  </span>

                  <Icon
                    name="ArrowRightIcon"
                    size={12}
                    className="text-primary"
                  />
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-6 sm:mt-8 flex justify-center md:hidden">
          <Link
            href={`/${locale}/category`}
            className="btn-secondary text-[13px] sm:text-sm py-2 px-6"
          >
            {t?.viewAll ?? 'View All Categories'}
          </Link>
        </div>

      </div>
    </section>
  )
}