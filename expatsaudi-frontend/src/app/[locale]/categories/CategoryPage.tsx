import CategoryCard from '@/components/Categories/CategoryCard'; // <--- Import the new client component
import Icon from '@/components/ui/AppIcon';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import Link from 'next/link';

// ============================================================================
// Types & Config
// ============================================================================

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: {
    url: string;
    alt: string;
    width: number;
    height: number;
    sizes: Record<string, any>;
  } | null;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const dict = await getDictionary(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://expatsaudi5308.builtwithrocket.new';

  return {
    title: dict.metadata.category.title,
    description: dict.metadata.category.description,
    alternates: {
      canonical: `/${locale}/category`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/category`])),
    },
    openGraph: { url: `${siteUrl}/${locale}/category` },
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function getOptimalImage(icon: Category['icon']) {
  if (!icon) return null;
  const cardSize = icon.sizes?.card;
  const thumbSize = icon.sizes?.thumbnail;
  
  const src = cardSize?.url || cardSize || icon.url || thumbSize?.url || thumbSize;
  return {
    src: src as string,
    alt: icon.alt || 'Category image',
  };
}

// ============================================================================
// Loading Skeletons (Exported for use in loading.tsx)
// ============================================================================

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-background border border-border animate-pulse" aria-hidden="true">
      <div className="relative w-full aspect-[16/9] sm:aspect-[3/2] border-b border-border bg-muted" />
      <div className="flex flex-col flex-grow p-4 sm:p-5 lg:p-6">
        <div className="w-3/4 h-6 bg-muted mb-4" />
        <div className="w-full h-4 bg-muted mb-2" />
        <div className="w-5/6 h-4 bg-muted mb-6" />
        <div className="mt-auto pt-4 border-t border-border flex justify-between">
          <div className="w-20 h-4 bg-muted" />
          <div className="w-4 h-4 bg-muted" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function CategoryPage({
  locale,
  dict,
  categories,
}: {
  locale: Locale;
  dict: any;
  categories: Category[];
}) {
  const isAr = locale === 'ar';

  return (
    <>
      <main className="pt-16 md:pt-[68px] bg-background selection:bg-foreground selection:text-background min-h-screen">
        
        {/* BREADCRUMB */}
        <div className="border-b border-border py-3 md:py-4 bg-background">
          <div className="container-editorial">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] md:text-xs font-medium text-muted-foreground">
              <Link 
                href={`/${locale}`} 
                className="hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground transition-colors duration-200"
              >
                {dict.nav.home}
              </Link>
              <Icon 
                name="ChevronRightIcon" 
                size={12} 
                className="text-muted-foreground opacity-50 rtl:rotate-180" 
                aria-hidden="true" 
              />
              <span className="text-foreground pointer-events-none" aria-current="page">
                {dict.nav.categories}
              </span>
            </nav>
          </div>
        </div>

        {/* CATEGORIES GRID */}
        <section className="py-10 md:py-16 lg:py-20">
          <div className="container-editorial">
            
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 md:mb-12 pb-5 md:pb-6 border-b border-border">
              <div className="max-w-2xl">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2 md:mb-3">
                  {dict.nav.categories}
                </h1>
                <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">
                  {isAr 
                    ? 'تصفح جميع الفئات للعثور على الأدلة والمقالات التي تحتاجها بسهولة.' 
                    : 'Browse all categories to easily find the guides and articles you need.'}
                </p>
              </div>
              <p className="text-[11px] md:text-xs font-medium text-muted-foreground whitespace-nowrap bg-muted border border-border px-3 py-1.5 md:px-4 md:py-2 flex-shrink-0">
                {isAr ? 'عرض' : 'Showing'} <strong className="text-foreground font-semibold">{categories.length}</strong> {isAr ? 'تصنيف' : 'categories'}
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {categories.map((category, i) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  image={getOptimalImage(category.icon)}
                  locale={locale}
                  isAr={isAr}
                  index={i}
                />
              ))}
            </div>
            
          </div>
        </section>
      </main>
    </>
  );
}