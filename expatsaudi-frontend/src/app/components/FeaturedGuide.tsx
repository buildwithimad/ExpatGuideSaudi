import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import RevealWrapper from './RevealWrapper';

interface FeaturedGuideProps {
  dict?: Dictionary;
  locale?: Locale;
  article?: any;
}

export default function FeaturedGuide({ dict, locale = 'en', article }: FeaturedGuideProps) {
  const t = dict?.featuredGuide;

  if (!article) return null;

  return (
    <section className="py-16 md:py-20 border-b border-border">
      <div className="container-editorial">
        <div className="flex items-center justify-between mb-8">
          <span className="label-caps text-primary">{t?.label ?? 'Featured Guide'}</span>
          <Link href={`/${locale}/articles`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            {t?.allGuides ?? 'All Guides'} <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        <RevealWrapper type="up">
          <Link href={`/${locale}/articles/${article?.slug}`} className="group block border border-border hover:border-foreground/20 transition-colors duration-300">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-[16/9] lg:aspect-auto overflow-hidden relative">
                <AppImage
  src={
    article.featuredImage?.sizes?.hero ??
    article.featuredImage?.url ??
    ''
  }
  alt={
    article.featuredImage?.alt ||
    article.title
  }
  fill
  priority
  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
  sizes="(max-width: 1024px) 100vw, 50vw"
/>
              </div>
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between gap-8 bg-muted">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="badge-blue">{article?.category?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {article?.readingTime ? `${article.readingTime} min read` : null}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString(locale) : null}
                    </span>
                  </div>
                  <h2 className="text-display text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
                    {article?.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {article?.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary flex items-center justify-center">
                      <Icon name="UserIcon" size={14} className="text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{article?.author?.fullName}</span>
                  </div>
                  <span className="btn-primary text-sm py-2 px-5">
                    {t?.continueReading ?? 'Continue Reading'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </RevealWrapper>
      </div>
    </section>
  );
}