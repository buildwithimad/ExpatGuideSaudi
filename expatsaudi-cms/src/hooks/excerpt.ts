import type { CollectionBeforeChangeHook } from 'payload';

/* -------------------------------------------------------------------------- */
/*                           Generate Excerpt                                 */
/* -------------------------------------------------------------------------- */

export const generateExcerpt: CollectionBeforeChangeHook = ({
  data,
}) => {
  if (!data || data.excerpt) {
    return data;
  }

  if (!data.content) {
    return data;
  }

  const text =
    typeof data.content === 'string'
      ? data.content
      : JSON.stringify(data.content);

  data.excerpt = text
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);

  return data;
};