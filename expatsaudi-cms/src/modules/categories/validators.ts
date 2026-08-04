import type { CollectionBeforeValidateHook } from 'payload';

/* -------------------------------------------------------------------------- */
/*                     Validate Parent Category                               */
/* -------------------------------------------------------------------------- */

export const validateParentCategory: CollectionBeforeValidateHook = ({
  data,
}) => {
  if (!data || !data.id) {
    return data;
  }

  const parent = data.parentCategory;

  const parentId =
    typeof parent === 'number'
      ? parent
      : parent &&
        typeof parent === 'object' &&
        'id' in parent
      ? parent.id
      : null;

  if (parentId === data.id) {
    throw new Error(
      'A category cannot be its own parent.',
    );
  }

  return data;
};