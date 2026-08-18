export function formatDate(
  date: string | Date,
  locale: string = 'en',
) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function toISOString(date: Date) {
  return date.toISOString();
}