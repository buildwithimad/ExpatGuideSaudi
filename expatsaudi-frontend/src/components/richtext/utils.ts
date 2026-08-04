export function hasFormat(
  format: number | undefined,
  flag: number,
) {
  if (!format) return false;

  return (format & flag) !== 0;
}