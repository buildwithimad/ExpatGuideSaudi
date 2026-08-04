export function removeUndefined<T extends object>(
  object: T,
) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== undefined,
    ),
  ) as T;
}