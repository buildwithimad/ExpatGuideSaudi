import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { getDictionary } from '@/lib/dictionary';
import { locales, type Locale } from '@/lib/i18n-config';
import type { Metadata } from 'next';
import Link from 'next/link';
import RevealWrapper from '../../components/RevealWrapper';

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
    sizes: Record<string, string | null>;
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
      <Header locale={locale} dict={dict} />
      <main className="pt-16 md:pt-[68px] bg-background selection:bg-foreground selection:text-background">
        
        {/* BREADCRUMB */}
        <div className="border-b border-border py-4 bg-background">
          <div className="container-editorial">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Link href={`/${locale}`} className="hover:text-foreground transition-colors duration-200">
                {dict.nav.home}
              </Link>
              <Icon name="ChevronRightIcon" size={12} className="text-muted-foreground opacity-50" />
              <Link href={`/${locale}/category`} className="text-foreground pointer-events-none">
                {dict.nav.categories}
              </Link>
            </nav>
          </div>
        </div>

        {/* CATEGORIES GRID */}
        <section className="py-12 md:py-20">
          <div className="container-editorial">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-border">
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
                  {dict.nav.categories}
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                  {isAr 
                    ? 'تصفح جميع الفئات للعثور على الأدلة والمقالات التي تحتاجها بسهولة.' 
                    : 'Browse all categories to easily find the guides and articles you need.'}
                </p>
              </div>
              <p className="text-sm font-medium text-muted-foreground whitespace-nowrap bg-muted border border-border px-4 py-2">
                {isAr ? 'عرض' : 'Showing'} <strong className="text-foreground">{categories.length}</strong> {isAr ? 'تصنيف' : 'categories'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category, i) => {
                const iconSrc = category.icon?.sizes?.thumbnail ?? category.icon?.url;

                return (
                  <RevealWrapper key={category.id} delay={i * 40} type="up">
                    <Link
                      href={`/${locale}/articles?category=${category.slug}`}
                      className="group flex flex-col h-full bg-background border border-border p-6 md:p-8 transition-all duration-200"
                    >
                      <div className="w-12 h-12 bg-muted border border-border flex items-center justify-center mb-6">
                        {iconSrc ? (
                          <div className="relative w-8 h-8">
                            <AppImage
                              src={iconSrc}
                              alt={category.icon?.alt ?? category.name}
                              fill
                              className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                              sizes="32px"
                            />
                          </div>
                        ) : (
                          <Icon name="FolderIcon" size={20} className="text-foreground" />
                        )}
                      </div>

                      <h2 className="text-lg font-semibold text-foreground leading-tight mb-3 transition-colors duration-200">
                        {category.name}
                      </h2>

                      {category.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-2">
                          {category.description}
                        </p>
                      )}

                      <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-muted-foreground uppercase group-hover:text-foreground transition-colors duration-200">
                          {isAr ? 'استكشف' : 'Explore'}
                        </span>
                        <Icon 
                          name={isAr ? "ArrowLeftIcon" : "ArrowRightIcon"} 
                          size={14} 
                          className="text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:translate-x-1 rtl:group-hover:-translate-x-1" 
                        />
                      </div>
                    </Link>
                  </RevealWrapper>
                );
              })}
            </div>
            
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}