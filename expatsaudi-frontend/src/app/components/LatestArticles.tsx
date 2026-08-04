import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import RevealWrapper from './RevealWrapper';
import SectionTitle from './SectionTitle';

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
  const t = dict?.latestArticles;

  return (
    <section className="py-16 md:py-20 border-b border-border">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionTitle
            label={t?.label ?? 'Latest Guides'}
            title={t?.title ?? 'Recently Published'}
            description={t?.description ?? 'Fresh, verified content covering the most important topics for expats in Saudi Arabia.'}
          />
          <Link href={`/${locale}/articles`} className="btn-secondary text-sm py-2 px-4 flex-shrink-0 self-start md:self-auto flex items-center gap-1.5">
            {t?.viewAll ?? 'View All Articles'} <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {articles?.map((article, i) => (
            <RevealWrapper key={article?.id || article?.title} delay={i * 60} type="up">
              <Link href={`/${locale}/articles/${article?.slug}`} className="article-card flex flex-col h-full bg-background group">
                <div className="aspect-[16/9] overflow-hidden relative">
                  {article?.featuredImage?.url ? (
<AppImage
  src={
    article.featuredImage.sizes?.card ??
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
                <div className="p-5 flex flex-col gap-3 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="badge-blue">{article?.category?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {article?.readingTime ? `${article.readingTime} min read` : null}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                    {article?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {article?.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Icon name="UserCircleIcon" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{article?.author?.fullName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString(locale) : null}
                    </span>
                  </div>
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}