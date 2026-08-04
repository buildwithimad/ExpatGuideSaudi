import {
    generateSlug,
    updateAuditFields,
} from '@/hooks';

import {
    validateParentCategory,
} from '@/modules/categories/validators';

export const categoryBeforeValidate = [
  generateSlug('name'),
  validateParentCategory,
];

export const categoryBeforeChange = [
  updateAuditFields,
];