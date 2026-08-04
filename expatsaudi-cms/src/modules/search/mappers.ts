import type {
  Article,
  Author,
  Category,
  GovernmentSource,
  Media,
} from '@/payload-types';

import type {
  SearchArticleDto,
  SearchAuthorDto,
  SearchCategoryDto,
  SearchGovernmentSourceDto,
  SearchMediaDto,
} from './dto';

export function mapMedia(
  media?: Media | number | null,
): SearchMediaDto | null {
  if (!media || typeof media === 'number') {
    return null;
  }

  return {
    id: media.id,
    alt: media.alt ?? '',
    url: media.url ?? '',
    width: media.width ?? null,
    height: media.height ?? null,
    mimeType: media.mimeType ?? null,
    thumbnail:
      media.sizes?.thumbnail?.url ?? null,
    card: media.sizes?.card?.url ?? null,
    hero: media.sizes?.hero?.url ?? null,
  };
}

export function mapCategory(
  category?: Category | number | null,
): SearchCategoryDto | null {
  if (
    !category ||
    typeof category === 'number'
  ) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description:
      category.description ?? null,
    status:
      (category as any).status ?? null,
    sortOrder:
      (category as any).sortOrder ??
      null,
  };
}

export function mapAuthor(
  author?: Author | number | null,
): SearchAuthorDto | null {
  if (
    !author ||
    typeof author === 'number'
  ) {
    return null;
  }

  return {
    id: author.id,
    fullName: author.fullName,
    slug: author.slug,
    verifiedAuthor: Boolean(
      author.verifiedAuthor,
    ),
    jobTitle: author.jobTitle ?? null,
    shortBio:
      (author as any).shortBio ?? null,
    linkedin:
      (author as any).linkedin ?? null,
    website:
      (author as any).website ?? null,
    photo: mapMedia(author.photo),
  };
}

export function mapGovernmentSource(
  source?: GovernmentSource | number | null,
): SearchGovernmentSourceDto | null {
  if (
    !source ||
    typeof source === 'number'
  ) {
    return null;
  }

  return {
    id: source.id,
    name: source.name,
    officialWebsite:
      source.officialWebsite ?? null,
    status:
      (source as any).status ?? null,
    logo: mapMedia(source.logo),
  };
}

export function mapArticle(
  article: Article,
): SearchArticleDto {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    subtitle: article.subtitle ?? null,
    excerpt: article.excerpt ?? null,

    featuredImage: mapMedia(
      article.featuredImage,
    ),

    category: mapCategory(
      article.category,
    ),

    author: mapAuthor(article.author),

    governmentSources: (
      article.governmentSources ?? []
    )
      .map(mapGovernmentSource)
      .filter(
        (
          item,
        ): item is SearchGovernmentSourceDto =>
          item !== null,
      ),

    readingTime:
      article.readingTime ?? null,

    viewCount:
      article.viewCount ?? null,

    featured: Boolean(
      article.featured,
    ),

    factChecked: Boolean(
      article.factChecked,
    ),

    publishedAt:
      article.publishedAt ?? '',
  };
}