import { getSiteSettings } from '@/lib/settings';

import { buildArticleStructuredData } from '@/lib/seo/structured-data';

import type { Article } from '@/lib/api/articles/responses';
import type { Locale } from '@/lib/i18n-config';

type Props = {
  article: Article;
  locale: Locale;
};

export default async function ArticleSchema({
  article,
  locale,
}: Props) {
  const settings =
    await getSiteSettings(locale);

  const {
    branding,
    seo,
  } = settings;

  const siteUrl =
    seo.site.siteUrl.replace(/\/$/, '');

  const schema =
    buildArticleStructuredData({
      headline:
        article.seo.title,

      description:
        article.seo.description ?? undefined,

      url:
        `${siteUrl}/${locale}/articles/${article.slug}`,

      image:
        article.seo.image ??
        article.featuredImage ??
        undefined,

      author:
        article.author
          ? {
              name:
                article.author.fullName,
            }
          : undefined,

      publisher: {
        name:
          branding.identity.siteName,

        url:
          siteUrl,

        logo:
  branding.logos.primaryLogo ??
  undefined,
      },

      datePublished:
        article.publishedAt,

      dateModified:
        article.updatedAt,

      articleSection:
        article.category?.name,

      inLanguage:
        locale,

      isAccessibleForFree:
        true,
    });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}