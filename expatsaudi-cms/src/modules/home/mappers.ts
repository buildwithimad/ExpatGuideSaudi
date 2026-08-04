export function mapArticle(article: any) {
  if (!article) return null;

  return {
    id: article.id,

    title: article.title,

    slug: article.slug,

    excerpt: article.excerpt,

    readingTime: article.readingTime,

    publishedAt: article.publishedAt,

    featuredImage: article.featuredImage
      ? {
          url: article.featuredImage.url,
          alt: article.featuredImage.alt,
        }
      : null,

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
  };
}

export function mapCategory(category: any) {
  return {
    id: category.id,

    name: category.name,

    slug: category.slug,

    description: category.description,

    icon: category.icon ?? null,
  };
}