import { getArticles } from '@/lib/api/articles';
import { getCategories } from '@/lib/api/categories';
import { getResources, type Resource } from '@/lib/api/resources';

const SITE_URL = 'https://www.urexpat.com';

const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'ar',
    name: 'Arabic',
  },
  {
    code: 'ur',
    name: 'Urdu',
  },
] as const;

const RESOURCE_CATEGORY_LABELS: Record<
  Resource['category'],
  string
> = {
  'government-services': 'Government Services',
  'useful-apps': 'Useful Apps',
  'emergency-numbers': 'Emergency Numbers',
  'public-services': 'Public Services',
};

export async function GET() {
  try {
    /*
     * Fetch independent CMS data in parallel.
     */
    const [categories, articles, resources] = await Promise.all([
      getCategories('en'),
      getAllArticles(),
      getResources('en'),
    ]);

    const lines: string[] = [
      '# URExpat',
      '',
      '> URExpat is a trusted information website for expatriates living and working in Saudi Arabia, providing practical guides on Iqama, visas, government services, jobs, banking, driving, and daily life in Saudi Arabia.',
      '',
      '## About',
      '',
      'URExpat provides practical, easy-to-understand information for expatriates living and working in Saudi Arabia.',
      '',
      'The website covers Saudi residency and Iqama matters, visas, Absher, Nafath, government services, employment, banking, driving, and everyday life.',
      '',
      '## Languages',
      '',
    ];

    /* ---------------------------------------------------------------------- */
    /* Languages                                                              */
    /* ---------------------------------------------------------------------- */

    for (const language of LANGUAGES) {
      lines.push(
        `- [${language.name}](${SITE_URL}/${language.code})`,
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Main Topics                                                            */
    /* ---------------------------------------------------------------------- */

    lines.push(
      '',
      '## Main Topics',
      '',
    );

    for (const category of categories) {
      if (!category.name) {
        continue;
      }

      const categoryUrl =
        `${SITE_URL}/en/categories/${category.slug}`;

      const description = category.description
        ? ` — ${cleanText(category.description)}`
        : '';

      lines.push(
        `- [${escapeMarkdown(category.name)}](${categoryUrl})${description}`,
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Useful Resources                                                       */
    /* ---------------------------------------------------------------------- */

    lines.push(
      '',
      '## Useful Resources',
      '',
    );

    const resourceCategories: Resource['category'][] = [
      'government-services',
      'useful-apps',
      'emergency-numbers',
      'public-services',
    ];

    for (const resourceCategory of resourceCategories) {
      const categoryResources = resources
        .filter(
          (resource) =>
            resource.category === resourceCategory &&
            resource.title &&
            resource.url,
        )
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder,
        );

      if (categoryResources.length === 0) {
        continue;
      }

      lines.push(
        `### ${RESOURCE_CATEGORY_LABELS[resourceCategory]}`,
        '',
      );

      for (const resource of categoryResources) {
        const description = resource.description
          ? ` — ${cleanText(resource.description)}`
          : '';

        lines.push(
          `- [${escapeMarkdown(resource.title)}](${resource.url})${description}`,
        );
      }

      lines.push('');
    }

    /* ---------------------------------------------------------------------- */
    /* Articles                                                               */
    /* ---------------------------------------------------------------------- */

    lines.push(
      '## Articles',
      '',
    );

    for (const article of articles) {
      /*
       * Never expose noIndex articles through llms.txt.
       */
      if (article.noIndex) {
        continue;
      }

      const articleUrl =
        `${SITE_URL}/en/articles/${article.slug}`;

      const metadata: string[] = [];

      if (article.excerpt) {
        metadata.push(
          cleanText(article.excerpt),
        );
      }

      if (article.category?.name) {
        metadata.push(
          `Category: ${cleanText(article.category.name)}`,
        );
      }

      if (article.updatedAt) {
        metadata.push(
          `Updated: ${formatDate(article.updatedAt)}`,
        );
      }

      const articleMetadata =
        metadata.length > 0
          ? ` — ${metadata.join(' | ')}`
          : '';

      lines.push(
        `- [${escapeMarkdown(article.title)}](${articleUrl})${articleMetadata}`,
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Official Website                                                       */
    /* ---------------------------------------------------------------------- */

    lines.push(
      '',
      '## Official Website',
      '',
      `- [URExpat](${SITE_URL})`,
      '',
      '## Content Policy',
      '',
      'URExpat provides practical informational guidance for expatriates in Saudi Arabia. Government-related information should be verified against the relevant Saudi government source before taking action.',
      '',
      '## Source Guidance',
      '',
      'Where government services, regulations, visas, residency, employment, or other official procedures are discussed, readers should verify important details with the relevant Saudi government authority.',
      '',
    );

    return new Response(
      lines.join('\n'),
      {
        status: 200,
        headers: {
          'Content-Type':
            'text/plain; charset=utf-8',
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    );
  } catch (error) {
    console.error(
      'Failed to generate llms.txt:',
      error,
    );

    /*
     * Return a minimal valid llms.txt instead
     * of exposing an API error to crawlers.
     */
    return new Response(
      [
        '# URExpat',
        '',
        '> URExpat is a trusted information website for expatriates living and working in Saudi Arabia.',
        '',
        '## Official Website',
        '',
        `- [URExpat](${SITE_URL})`,
        '',
      ].join('\n'),
      {
        status: 200,
        headers: {
          'Content-Type':
            'text/plain; charset=utf-8',
          'Cache-Control':
            'public, s-maxage=300, stale-while-revalidate=3600',
        },
      },
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                              Get All Articles                              */
/* -------------------------------------------------------------------------- */

async function getAllArticles() {
  const allArticles = [];

  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await getArticles({
      locale: 'en',
      page,
      limit: 100,
    });

    allArticles.push(...response.docs);

    hasNextPage =
      response.pagination.hasNextPage;

    page += 1;
  }

  return allArticles;
}

/* -------------------------------------------------------------------------- */
/*                                Text Helpers                                */
/* -------------------------------------------------------------------------- */

function cleanText(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/\r?\n|\r/g, ' ')
    .trim();
}

function escapeMarkdown(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .trim();
}

/* -------------------------------------------------------------------------- */
/*                                  Date                                      */
/* -------------------------------------------------------------------------- */

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toISOString().split('T')[0];
}