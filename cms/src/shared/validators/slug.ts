import type { PayloadRequest } from 'payload';

import { ValidationError } from './validation-error';

export function parseSlug(req: PayloadRequest): string {
  const slug = req.routeParams?.slug;

  if (typeof slug !== 'string' || slug.trim().length === 0) {
    throw new ValidationError(
      'INVALID_SLUG',
      'Article slug is required.',
    );
  }

  return slug;
}