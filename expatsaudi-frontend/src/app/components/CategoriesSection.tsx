import Icon from '@/components/ui/AppIcon';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import RevealWrapper from './RevealWrapper';
import SectionTitle from './SectionTitle';

interface CategoriesSectionProps {
  dict?: Dictionary;
  locale?: Locale;
  categories: any[];
}

export default function CategoriesSection({
  dict,
  locale = 'en',
  categories,
}: CategoriesSectionProps) {
  const t = dict?.categories;

  return (
    <section className="py-16 md:py-20 border-b border-border">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionTitle
            label={t?.label ?? 'Browse by Topic'}
            title={t?.title ?? 'Popular Categories'}
            description={
              t?.description ??
              'Find everything you need organized by topic.'
            }
          />

          <Link
            href={`/${locale}/category`}
            className="btn-secondary text-sm py-2 px-4 flex-shrink-0 self-start md:self-auto"
          >
            {t?.viewAll ?? 'View All Categories'}
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
          {categories?.map((category: any, i: number) => (
            <RevealWrapper
              key={category.id ?? category.slug}
              delay={i * 40}
              type="fade"
            >
              <Link
                href={`/${locale}/category/${category.slug}`}
                className="category-card flex flex-col gap-3 h-full bg-background"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 bg-muted flex items-center justify-center">
                    <Icon
                      name="FolderIcon"
                      size={18}
                      className="text-primary"
                    />
                  </div>

                  <span className="label-caps text-muted-foreground">
                    {t?.guides ?? 'Guides'}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {category.name}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-auto pt-2 flex items-center gap-1 text-primary">
                  <span className="text-xs font-semibold">
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
      </div>
    </section>
  );
}