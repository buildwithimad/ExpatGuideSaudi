import type { CollectionBeforeChangeHook } from 'payload';

/* -------------------------------------------------------------------------- */
/*                           Published Date                                   */
/* -------------------------------------------------------------------------- */

export const populatePublishedAt: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
}) => {
  if (
    data.status === 'published' &&
    !originalDoc?.publishedAt &&
    !data.publishedAt
  ) {
    data.publishedAt = new Date().toISOString();
  }

  return data;
};

/* -------------------------------------------------------------------------- */
/*                         Last Verified Date                                 */
/* -------------------------------------------------------------------------- */

export const updateLastVerifiedAt: CollectionBeforeChangeHook = ({
  data,
  originalDoc,
}) => {
  if (
    data.factChecked === true &&
    originalDoc?.factChecked !== true
  ) {
    data.lastVerifiedAt = new Date().toISOString();
  }

  return data;
};