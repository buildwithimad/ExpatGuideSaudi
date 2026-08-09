'use client';

import ThemeToggle from '@/components/Theme/ToggleTheme';
import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';
import type { SiteSettings } from '@/lib/api/site-settings';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState, useTransition } from 'react';

// ============================================================================
// Types
// ============================================================================

interface HeaderProps {
  locale?: Locale;
  dict?: Dictionary;
  settings: SiteSettings;
}

interface NavLink {
  label: string;
  href: string;
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * Enterprise-grade scroll listener with throttling via requestAnimationFrame
 * Prevents layout thrashing and unnecessary React re-renders.
 */
function useScroll(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Accessible mobile menu hook handling scroll locks, escape keys, and focus retention
 */
function useMobileMenu(isPending: boolean, pathname: string) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Auto-close menu smoothly ONLY after the page transition finishes
  useEffect(() => {
    if (!isPending) close();
  }, [pathname, isPending, close]);

  useEffect(() => {
    if (!isOpen) {
      triggerRef.current?.focus();
      return;
    }

    const originalOverflow = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  return { isOpen, close, toggle, triggerRef };
}

// ============================================================================
// Sub-Components
// ============================================================================

const Spinner = memo(({ className = '' }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
));
Spinner.displayName = 'Spinner';

function DesktopNav({ 
  links, 
  currentPath, 
  locale, 
  loadingPath, 
  onNavigate 
}: { 
  links: NavLink[]; 
  currentPath: string; 
  locale: Locale;
  loadingPath: string | null;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const isActive = (href: string) => {
    if (href === `/${locale}`) return currentPath === `/${locale}` || currentPath === `/${locale}/`;
    return currentPath.startsWith(href);
  };

  return (
    <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-10 h-full">
      {links.map((link) => {
        const active = isActive(link.href);
        const isItemLoading = loadingPath === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => onNavigate(e, link.href)}
            aria-current={active ? 'page' : undefined}
            aria-disabled={isItemLoading}
            className={`relative flex items-center h-full text-[15px] font-medium transition-all duration-200 group ${
              isItemLoading ? 'opacity-60 pointer-events-none cursor-wait' : ''
            }`}
          >
            <span className={`flex items-center gap-1.5 transition-colors ${active ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'}`}>
              {isItemLoading && <Spinner className="w-3.5 h-3.5" />}
              {link.label}
            </span>
            {/* Minimal active indicator - Linear/Vercel style */}
            {active && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-t-sm" aria-hidden="true" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function LanguageSwitcher({ 
  locale, 
  loadingLocale,
  isPending,
  switchLocale 
}: { 
  locale: Locale; 
  loadingLocale: string | null;
  isPending: boolean;
  switchLocale: (l: Locale) => void; 
}) {
  const availableLocales = ['en', 'ar'] as Locale[]; 

  return (
    <div 
      className="hidden md:flex items-center p-[3px] rounded-lg bg-muted/40" 
      role="group" 
      aria-label="Language Switcher"
    >
      {availableLocales.map((loc) => {
        const active = locale === loc;
        const isItemLoading = loadingLocale === loc;
        
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            aria-pressed={active}
            disabled={isPending}
            className={`relative flex items-center justify-center min-w-[46px] h-[28px] px-3 text-[13px] rounded-md transition-all duration-200 ease-[0.22,1,0.36,1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active 
                ? 'bg-background text-foreground font-semibold shadow-[0_1px_3px_0_rgb(0,0,0,0.05)]' 
                : 'text-muted-foreground font-medium hover:text-foreground'
            } ${isItemLoading ? 'opacity-70 cursor-wait' : 'active:scale-95'}`}
          >
            {isItemLoading && (
              <Spinner className="w-3.5 h-3.5 absolute" />
            )}
            <span className={`transition-opacity duration-200 ${isItemLoading ? 'opacity-0' : 'opacity-100'}`}>
              {loc === 'en' ? 'EN' : 'ع'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Main Header Component
// ============================================================================

export default function Header({ locale = 'en', dict, settings }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const scrolled = useScroll(16);
  
  // Transition logic for loading states
  const [isPending, startTransition] = useTransition();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);
  const [loadingLocale, setLoadingLocale] = useState<Locale | null>(null);

  const { isOpen, close, toggle, triggerRef } = useMobileMenu(isPending, pathname);
  const t = dict?.nav;

  // Clear loading states when URL correctly changes
  useEffect(() => {
    if (!isPending) {
      setLoadingPath(null);
      setLoadingLocale(null);
    }
  }, [isPending, pathname, searchParams]);

  const navLinks: NavLink[] = [
    { label: t?.home ?? 'Home', href: `/${locale}` },
    { label: t?.about ?? 'About', href: `/${locale}/about` },
    { label: t?.categories ?? 'Categories', href: `/${locale}/categories` },
    { label: t?.articles ?? 'Articles', href: `/${locale}/articles` },
    { label: t?.tools ?? 'Tools', href: `/${locale}#tools` },
  ];

  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Prevent running if user is opening in a new tab or already navigating
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0 || isPending) return;
      
      // If same page, do nothing
      if (pathname === href) return;

      e.preventDefault();
      setLoadingPath(href);
      startTransition(() => {
        router.push(href);
      });
    },
    [pathname, isPending, router]
  );

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale || isPending) return;
      
      setLoadingLocale(newLocale);
      const segments = pathname.split('/');
      const knownLocales = ['en', 'ar']; 
      
      if (knownLocales.includes(segments[1])) {
        segments[1] = newLocale;
      } else {
        segments.splice(1, 0, newLocale);
      }

      startTransition(() => {
        router.push(segments.join('/') || `/${newLocale}`);
      });
    },
    [pathname, router, locale, isPending]
  );

  const searchHref = `/${locale}/search-results`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background transform-gpu transition-all duration-200 ${
          scrolled ? 'border-b border-border shadow-[0_1px_3px_0_rgb(0,0,0,0.02)]' : 'border-b border-transparent'
        }`}
      >
        <div className="container-editorial">
          {/* Main Top Bar */}
          <div className="flex items-center justify-between h-[64px] md:h-[92px]">
            
            {/* Left: Logo */}
            <Link 
              href={`/${locale}`} 
              onClick={(e) => handleNavigate(e, `/${locale}`)}
              className={`flex items-center flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-opacity duration-200 ${
                loadingPath === `/${locale}` ? 'opacity-60 cursor-wait' : ''
              }`}
              aria-label="ExpatSaudi Home"
            >
              {loadingPath === `/${locale}` ? (
                <div className="flex items-center justify-center w-8 h-8">
                   <Spinner className="w-5 h-5 text-foreground" />
                </div>
              ) : (
                <AppLogo
                  primaryLogo={settings.branding.logos.primaryLogo?.url}
                  darkLogo={settings.branding.logos.darkLogo?.url}
                  whiteLogo={settings.branding.logos.whiteLogo?.url}
                  size={72}
                  alt={settings.branding.identity.siteName || 'Expat Guides'}
                  className="transition-transform duration-200 group-hover:scale-[1.03]"
                />
              )}
              <span className="font-bold text-xs tracking-tight text-foreground hidden sm:block">
                {settings.branding.identity.siteName}
              </span>
            </Link>

            {/* Center: Desktop Navigation */}
            <div className="flex-1 flex justify-center h-full mx-8">
              <DesktopNav 
                links={navLinks} 
                currentPath={pathname} 
                locale={locale} 
                loadingPath={loadingPath}
                onNavigate={handleNavigate}
              />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3.5 md:gap-5 flex-shrink-0">
              <LanguageSwitcher 
                locale={locale} 
                loadingLocale={loadingLocale}
                isPending={isPending}
                switchLocale={switchLocale} 
              />

              <div className="hidden md:block w-[1px] h-5 bg-border mx-1" aria-hidden="true" />

              <ThemeToggle />

              <Link
                href={searchHref}
                onClick={(e) => handleNavigate(e, searchHref)}
                aria-disabled={isPending}
                className={`hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  loadingPath === searchHref ? 'opacity-70 pointer-events-none cursor-wait bg-muted/50' : ''
                }`}
                aria-label={t?.search ?? 'Search'}
              >
                {loadingPath === searchHref ? <Spinner className="w-4.5 h-4.5" /> : <Icon name="MagnifyingGlassIcon" size={19} />}
              </Link>
              
              {/* Mobile Menu Toggle */}
              <button
                ref={triggerRef}
                onClick={toggle}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? (t?.closeMenu ?? 'Close menu') : (t?.openMenu ?? 'Open menu')}
                className="lg:hidden flex items-center justify-center w-12 h-12 -mr-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg active:scale-95 transition-transform"
              >
                <Icon name={isOpen ? 'XMarkIcon' : 'Bars3Icon'} size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer Wrapper */}
      <div 
        className={`fixed inset-x-0 bottom-0 top-[64px] z-40 lg:hidden overflow-hidden pointer-events-none`}
        aria-hidden={!isOpen}
      >
        {/* Backdrop (kept as requested, though fully covered by the drawer) */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`} 
          onClick={close}
          aria-hidden="true" 
        />
        
        {/* Full-Width Horizontal Drawer Panel */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`absolute inset-0 bg-background border-t border-border shadow-md transform-gpu transition-transform duration-300 ease-[0.22,1,0.36,1] pointer-events-auto overflow-y-auto ${
            isOpen 
              ? 'translate-x-0' 
              : (locale === 'ar' ? 'translate-x-full' : '-translate-x-full')
          }`}
        >
          <div className="container-editorial py-8 flex flex-col min-h-full">
            
            {/* Mobile Nav Links */}
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-2 mb-10">
              {navLinks.map((link) => {
                const active = pathname.startsWith(link.href) && 
                               (link.href === `/${locale}` ? pathname === `/${locale}` || pathname === `/${locale}/` : true);
                const isItemLoading = loadingPath === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavigate(e, link.href)}
                    aria-current={active ? 'page' : undefined}
                    aria-disabled={isItemLoading}
                    className={`flex items-center gap-4 h-[52px] px-4 text-[17px] font-medium rounded-xl transition-all duration-200 ${
                      active 
                        ? 'bg-muted/80 text-foreground font-semibold' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    } ${isItemLoading ? 'opacity-60 pointer-events-none cursor-wait' : ''}`}
                  >
                    {isItemLoading && <Spinner className="w-5 h-5 shrink-0" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Bottom Actions */}
            <div className="mt-auto pt-8 border-t border-border flex flex-col gap-8">
              
              {/* Language Selection */}
              <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold tracking-wide uppercase text-muted-foreground px-1">
                  {dict?.languageSwitcher?.label ?? 'Select Language'}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {['en', 'ar'].map((loc) => {
                    const isItemLoading = loadingLocale === loc;
                    const isActive = locale === loc;
                    
                    return (
                      <button
                        key={loc}
                        disabled={isPending}
                        onClick={() => switchLocale(loc as Locale)}
                        className={`relative flex items-center justify-center h-12 px-4 text-[15px] font-medium rounded-xl border transition-all duration-200 ${
                          isActive
                            ? 'bg-foreground text-background border-foreground shadow-sm'
                            : 'bg-transparent text-foreground border-border hover:border-foreground/30 hover:bg-muted/30'
                        } ${isItemLoading ? 'opacity-70 cursor-wait' : ''}`}
                      >
                         {isItemLoading ? <Spinner className="w-5 h-5 absolute" /> : <span className={isItemLoading ? 'opacity-0' : 'opacity-100'}>{loc === 'en' ? 'English' : 'العربية'}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Global Search Button */}
              <Link
                href={searchHref}
                onClick={(e) => handleNavigate(e, searchHref)}
                aria-disabled={isPending}
                className={`flex items-center justify-center gap-3 h-[52px] w-full px-4 rounded-xl border border-border bg-muted/30 text-[16px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  loadingPath === searchHref 
                    ? 'opacity-70 pointer-events-none cursor-wait text-foreground' 
                    : 'text-foreground hover:bg-muted/70 hover:border-foreground/20'
                }`}
              >
                {loadingPath === searchHref ? <Spinner className="w-5 h-5" /> : <Icon name="MagnifyingGlassIcon" size={20} />}
                {t?.searchGuides ?? 'Search Expat Guides'}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}