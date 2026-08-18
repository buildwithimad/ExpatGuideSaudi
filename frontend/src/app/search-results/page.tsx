import { defaultLocale } from '@/lib/i18n-config';
import { redirect } from 'next/navigation';

export default function SearchResultsPage() {
  redirect(`/${defaultLocale}/search-results`);
}