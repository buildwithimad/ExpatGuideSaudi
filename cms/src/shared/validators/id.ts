import { ValidationError } from './validation-error';

export function parseId(value: unknown): number {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ValidationError(
      'INVALID_ID',
      'Invalid identifier.',
    );
  }

  return id;
}