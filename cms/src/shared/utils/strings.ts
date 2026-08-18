export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function truncate(
  value: string,
  length: number,
) {
  if (value.length <= length) {
    return value;
  }

  return value.slice(0, length) + '...';
}
