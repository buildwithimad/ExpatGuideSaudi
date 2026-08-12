export function mapMedia(media: any) {
  if (!media) return null

  return {
    url: media.url,
    alt: media.alt ?? '',
    width: media.width ?? undefined,
    height: media.height ?? undefined,

    sizes: media.sizes
      ? {
          thumbnail: media.sizes.thumbnail?.url ?? media.sizes.thumbnail ?? undefined,
          card: media.sizes.card?.url ?? media.sizes.card ?? undefined,
          hero: media.sizes.hero?.url ?? media.sizes.hero ?? undefined,
          articleAuthor:
            media.sizes.articleAuthor?.url ??
            media.sizes.articleAuthor ??
            undefined,
        }
      : undefined,
  }
}

export function mapArticle(article: any) {
  if (!article) return null

  return {
    id: article.id,

    title: article.title,

    slug: article.slug,

    excerpt: article.excerpt,

    readingTime: article.readingTime,

    publishedAt: article.publishedAt,

    featuredImage: mapMedia(article.featuredImage),

    author: article.author
      ? {
          fullName: article.author.fullName,
        }
      : null,

    category: article.category
      ? {
          name: article.category.name,
          slug: article.category.slug,
        }
      : null,
  }
}

export function mapCategory(category: any) {
  return {
    id: category.id,

    name: category.name,

    slug: category.slug,

    description: category.description,

    icon: category.icon ?? null,
  }
}