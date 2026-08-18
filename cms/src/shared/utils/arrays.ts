export function uniqueBy<T>(
  array: T[],
  key: keyof T,
) {
  return [...new Map(array.map(item => [item[key], item])).values()];
}