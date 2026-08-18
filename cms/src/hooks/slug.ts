import type { CollectionBeforeValidateHook } from 'payload';

import { slugify } from '@/shared/utils';

const localizedValue = (
  value: unknown,
): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;

    const first =
      record.en ??
      Object.values(record).find(
        (item) =>
          typeof item === 'string' &&
          item.trim().length > 0,
      );

    return typeof first === 'string'
      ? first
      : undefined;
  }

  return undefined;
};

export const generateSlug =
  (
    sourceField = 'title',
  ): CollectionBeforeValidateHook =>
  ({ data }) => {
    if (!data) {
      return data;
    }

    if (
      typeof data.slug === 'string' &&
      data.slug.trim().length > 0
    ) {
      return data;
    }

    const source = localizedValue(
      data[sourceField],
    );

    if (source) {
      data.slug = slugify(source);
    }

    return data;
  };