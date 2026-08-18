export function absoluteUrl(path: string) {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000';

  return `${base}${path}`;
}