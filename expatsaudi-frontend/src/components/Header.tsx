'use client';

import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import { localeConfig, locales } from '@/lib/i18n-config';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HeaderProps {
  locale?: Locale;
  dict?: Dictionary;
}

export default function Header({ locale = 'en', dict }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict?.nav;

  const navLinks = [
    { label: t?.home ?? 'Home', href: `/${locale}` },
    { label: t?.about ?? 'About', href: `/${locale}/about` },
    { label: t?.categories ?? 'Categories', href: `/${locale}/category` },
    { label: t?.articles ?? 'Articles', href: `/${locale}/articles` },
    { label: t?.tools ?? 'Tools', href: `/${locale}#tools` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const switchLocale = (newLocale: Locale) => {
    // Replace the current locale segment in the pathname
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || `/${newLocale}`);
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${
          scrolled ? 'border-b border-border' : ''
        }`}
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2.5 flex-shrink-0">
              <AppLogo size={28} />
              <span className="font-bold text-base tracking-tight text-foreground hidden sm:block">
                ExpatSaudi
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className={`nav-link ${isActive(link?.href) ? 'active' : ''}`}
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="hidden md:flex items-center gap-1 border border-border" style={{ borderRadius: '4px' }}>
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`px-2.5 py-1 text-xs font-semibold transition-colors duration-200 ${
                      locale === loc
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    style={{ borderRadius: '3px' }}
                    aria-label={localeConfig[loc].label}
                  >
                    {loc === 'en' ? 'EN' : 'ع'}
                  </button>
                ))}
              </div>

              <Link
                href={`/${locale}/search-results`}
                className="hidden md:flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={t?.search ?? 'Search'}
              >
                <Icon name="MagnifyingGlassIcon" size={18} />
              </Link>
             
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 text-foreground"
                aria-label={menuOpen ? (t?.closeMenu ?? 'Close menu') : (t?.openMenu ?? 'Open menu')}
              >
                <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background lg:hidden"
          style={{ top: '68px' }}
        >
          <div className="container-editorial py-8">
            <nav className="flex flex-col gap-1">
              {navLinks?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-4 text-lg font-medium border-b border-border transition-colors ${
                    isActive(link?.href) ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Language Switcher */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                {dict?.languageSwitcher?.label ?? 'Language'}:
              </span>
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { switchLocale(loc); setMenuOpen(false); }}
                  className={`px-3 py-1.5 text-sm font-semibold border transition-colors duration-200 ${
                    locale === loc
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                  }`}
                  style={{ borderRadius: '4px' }}
                >
                  {localeConfig[loc].label}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={`/${locale}/search-results`}
                onClick={() => setMenuOpen(false)}
                className="btn-secondary w-full justify-center py-3 text-base"
              >
                <Icon name="MagnifyingGlassIcon" size={16} className="me-2" />
                {t?.searchGuides ?? 'Search'}
              </Link>
           
            </div>
          </div>
        </div>
      )}
    </>
  );
}