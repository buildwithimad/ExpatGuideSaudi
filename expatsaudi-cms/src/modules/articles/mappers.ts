import type {
  Article,
  Author,
  Category,
  GovernmentSource,
  Media,
} from '@/payload-types';

import type { ImageDTO } from '@/shared/dto';

import type {
  ArticleAuthorDTO,
  ArticleCardDTO,
  ArticleCategoryDTO,
  ArticleDTO,
  ArticleGovernmentSourceDTO,
  BaseArticleDTO,
  BreadcrumbDTO,
  RelatedArticleDTO,
  RichText,
  SourceLinkDTO,
  TOCItemDTO,
} from './dto';

import { slugify } from '@/shared/utils';


/* -------------------------------------------------------------------------- */
/*                               Type Guards                                  */
/* -------------------------------------------------------------------------- */

function isGovernmentSourceDTO(
  source: ArticleGovernmentSourceDTO | null,
): source is ArticleGovernmentSourceDTO {
  return source !== null;
}

/* -------------------------------------------------------------------------- */
/*                                Image Mapper                                */
/* -------------------------------------------------------------------------- */

export function mapImage(
  media: Media | number | null | undefined,
): ImageDTO | null {
  if (!media || typeof media !== 'object') {
    return null;
  }

  const sizes: Record<string, string | null> = {};

  if (media.sizes) {
    Object.entries(media.sizes).forEach(
      ([name, size]) => {
        sizes[name] =
          size?.url ?? null;
      },
    );
  }

  return {
    url: media.url ?? '',
    alt: media.alt ?? '',

    width: media.width ?? null,
    height: media.height ?? null,

    sizes,
  };
}

/* -------------------------------------------------------------------------- */
/*                               Author Mapper                                */
/* -------------------------------------------------------------------------- */

export function mapArticleAuthor(
  author: Author | number | null | undefined,
): ArticleAuthorDTO | null {
  if (!author || typeof author !== 'object') {
    return null;
  }

  return {
    fullName: author.fullName,
    jobTitle: author.jobTitle ?? null,
    photo: mapImage(author.photo),
  };
}

/* -------------------------------------------------------------------------- */
/*                              Category Mapper                               */
/* -------------------------------------------------------------------------- */

export function mapArticleCategory(
  category: Category | number | null | undefined,
): ArticleCategoryDTO | null {
  if (!category || typeof category !== 'object') {
    return null;
  }

  return {
    name: category.name,
    slug: category.slug,
  };
}

/* -------------------------------------------------------------------------- */
/*                         Government Source Mapper                           */
/* -------------------------------------------------------------------------- */

export function mapGovernmentSource(
  source: GovernmentSource | number | null | undefined,
): ArticleGovernmentSourceDTO | null {
  if (!source || typeof source !== 'object') {
    return null;
  }

  return {
    id: source.id,
    name: source.name,
    officialWebsite: source.officialWebsite ?? '',
    logo: mapImage(source.logo),
  };
}

/* -------------------------------------------------------------------------- */
/*                            Source Link Mapper                              */
/* -------------------------------------------------------------------------- */

export function mapSourceLink(
  source: NonNullable<Article['sourceLinks']>[number],
): SourceLinkDTO {
  return {
    label: source.label,
    url: source.url,
  };
}

/* -------------------------------------------------------------------------- */
/*                           Base Article Mapper                              */
/* -------------------------------------------------------------------------- */

export function mapBaseArticle(
  article: Article,
): BaseArticleDTO {
  return {
    id: article.id,

    title: article.title,

    slug: article.slug,

    excerpt: article.excerpt ?? null,

    featuredImage: mapImage(article.featuredImage),

    author: mapArticleAuthor(article.author),

    category: mapArticleCategory(article.category),

    publishedAt: article.publishedAt ?? article.createdAt,

    readingTime: article.readingTime ?? 0,
  };
}

/* -------------------------------------------------------------------------- */
/*                           Article Card Mapper                              */
/* -------------------------------------------------------------------------- */

export function mapArticleCard(
  article: Article,
): ArticleCardDTO {
  return {
    ...mapBaseArticle(article),

    featured: article.featured ?? false,
  };
}

/* -------------------------------------------------------------------------- */
/*                            Full Article Mapper                             */
/* -------------------------------------------------------------------------- */

export function mapArticle(
  article: Article,
): ArticleDTO {
  return {
    ...mapBaseArticle(article),

    subtitle: article.subtitle ?? null,

    content: article.content,

    governmentSources:
      article.governmentSources
        ?.map(mapGovernmentSource)
        .filter(isGovernmentSourceDTO) ?? [],

    sourceLinks:
      article.sourceLinks?.map(mapSourceLink) ?? [],

    featured: article.featured ?? false,

    factChecked: article.factChecked ?? false,

    viewCount: article.viewCount ?? 0,
  };
}

/* -------------------------------------------------------------------------- */
/*                         Related Article Mapper                             */
/* -------------------------------------------------------------------------- */

export function mapRelatedArticle(
  article: Article,
): RelatedArticleDTO {
  const category = mapArticleCategory(article.category);

  return {
    title: article.title,

    slug: article.slug,

    category: category?.name ?? '',

    readingTime: article.readingTime ?? 0,

    href: `/articles/${article.slug}`,
  };
}


/* -------------------------------------------------------------------------- */
/*                           Breadcrumb Builder                               */
/* -------------------------------------------------------------------------- */

export function buildBreadcrumbs(
  article: Article,
): BreadcrumbDTO[] {
  const breadcrumbs: BreadcrumbDTO[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Articles',
      href: '/articles',
    },
  ];

  const category = mapArticleCategory(article.category);

  if (category) {
    breadcrumbs.push({
      label: category.name,
      href: `/articles/category/${category.slug}`,
    });
  }

  breadcrumbs.push({
    label: article.title,
    href: `/articles/${article.slug}`,
  });

  return breadcrumbs;
}




/* -------------------------------------------------------------------------- */
/*                       Table Of Contents Builder                            */
/* -------------------------------------------------------------------------- */


export function buildTableOfContents(
  content: RichText,
): TOCItemDTO[] {
  const toc: TOCItemDTO[] = [];

  const children =
    (content as {
      root?: {
        children?: unknown[];
      };
    }).root?.children ?? [];

  for (const node of children) {
    if (
      typeof node !== 'object' ||
      node === null
    ) {
      continue;
    }

    const heading = node as {
      type?: string;
      tag?: string;
      children?: {
        text?: string;
      }[];
    };

    if (
      heading.type !== 'heading' ||
      !['h2', 'h3', 'h4'].includes(
        heading.tag ?? '',
      )
    ) {
      continue;
    }

    const label =
      heading.children
        ?.map(
          (child) => child.text ?? '',
        )
        .join('') ?? '';

    if (!label) {
      continue;
    }

    toc.push({
      id: slugify(label),

      label,

      level: Number(
        heading.tag?.replace('h', ''),
      ) as 2 | 3 | 4,
    });
  }

  return toc;
}


