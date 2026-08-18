import type { Where } from 'payload';

export function buildSearchConditions(
  query: string,
): Where[] {
  return [
    {
      title: {
        like: query,
      },
    },
    {
      subtitle: {
        like: query,
      },
    },
    {
      excerpt: {
        like: query,
      },
    },
    {
      slug: {
        like: query,
      },
    },
  ];
}