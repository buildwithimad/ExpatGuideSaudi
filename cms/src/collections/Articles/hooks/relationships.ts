import type { CollectionBeforeValidateHook } from 'payload';

/* -------------------------------------------------------------------------- */
/*                        Relationship Validation                             */
/* -------------------------------------------------------------------------- */

export const validateArticleRelationships: CollectionBeforeValidateHook = ({
  data,
}) => {
  if (!data || !data.id) {
    return data;
  }

  const relatedArticles = Array.isArray(
    data.relatedArticles,
  )
    ? data.relatedArticles
    : [];

  const selfRelated =
    relatedArticles.some((item) => {
      if (typeof item === 'string') {
        return item === data.id;
      }

      if (
        item &&
        typeof item === 'object'
      ) {
        return (
          item as {
            id?: string;
          }
        ).id === data.id;
      }

      return false;
    });

  if (selfRelated) {
    throw new Error(
      'An article cannot be related to itself.',
    );
  }

  return data;
};