import {
  generateExcerpt,
  generateSlug,
  populatePublishedAt,
  setReadingTime,
  updateAuditFields,
} from '@/hooks';

import {
  updateLastVerifiedAt,
  validateArticleRelationships,
} from './hooks';

export const articleBeforeValidate = [
  generateSlug('title'),
  validateArticleRelationships,
];

export const articleBeforeChange = [
  populatePublishedAt,
  updateLastVerifiedAt,
  generateExcerpt,
  setReadingTime,
  updateAuditFields,
];