import type { PayloadRequest } from 'payload';

import {
    DEFAULT_LIMIT,
    DEFAULT_PAGE,
    MAX_LIMIT,
} from '@/shared/constants';

import { ValidationError } from './validation-error';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export function parsePagination(
  req: PayloadRequest,
): PaginationOptions {
  const page = Number(req.query?.page ?? DEFAULT_PAGE);

  const limit = Number(req.query?.limit ?? DEFAULT_LIMIT);

  if (!Number.isInteger(page) || page < 1) {
    throw new ValidationError(
      'INVALID_PAGE',
      'Page must be greater than or equal to 1.',
    );
  }

  if (!Number.isInteger(limit)) {
    throw new ValidationError(
      'INVALID_LIMIT',
      'Limit must be a valid integer.',
    );
  }

  if (limit < 1 || limit > MAX_LIMIT) {
    throw new ValidationError(
      'INVALID_LIMIT',
      `Limit must be between 1 and ${MAX_LIMIT}.`,
    );
  }

  return {
    page,
    limit,
  };
}