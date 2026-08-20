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
import LanguageSwitcher from './LanguageSwitcher';

// ============================================================================
// Types
// ============================================================================

interface HeaderProps {
  locale?: Locale;
  dict?: Dictionary;
  settings: SiteSettings;
  enableSearch?: boolean;
  enableDarkMode?: boolean;
  enableLanguageSwitcher?: boolean
  enableSecondaryNavbar?: boolean
}

interface NavLink {
  label: string;
  href: string;
}

// ============================================================================
// Hooks
// ============================================================================

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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

function useMobileMenu(isPending: boolean, pathname: string) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

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
  onNavigate,
  variant = 'primary'
}: { 
  links: NavLink[]; 
  currentPath: string; 
  locale: Locale;
  loadingPath: string | null;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  variant?: 'primary' | 'secondary';
}) {
  const isActive = (href: string) => {
    if (href === `/${locale}`) return currentPath === `/${locale}` || currentPath === `/${locale}/`;
    return currentPath.startsWith(href);
  };

  const isPrimary = variant === 'primary';

  return (
    <nav aria-label={isPrimary ? "Main Navigation" : "Utility Navigation"} className={`hidden lg:flex items-center h-full ${isPrimary ? 'gap-8 xl:gap-10' : 'gap-8'}`}>
      {links.map((link) => {
        const active = isActive(link.href);
        const isItemLoading = loadingPath === link.href;

        const primaryText = active ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground';
        const secondaryText = active
  ? 'text-primary-foreground font-semibold'
  : 'text-primary-foreground/85 hover:text-primary-foreground';
        const textClass = isPrimary ? primaryText : secondaryText;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => onNavigate(e, link.href)}
            aria-current={active ? 'page' : undefined}
            aria-disabled={isItemLoading}
            className={`relative flex items-center h-full text-[15px] transition-all duration-200 group ${
              isItemLoading ? 'opacity-60 pointer-events-none cursor-wait' : ''
            }`}
          >
            <span className={`flex items-center gap-1.5 transition-colors ${textClass}`}>
              {isItemLoading && <Spinner className="w-3.5 h-3.5" />}
              {link.label}
            </span>
            {/* Active indicator */}
            {active && (
  <span 
    className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-sm ${
      isPrimary ? 'bg-primary' : 'bg-primary-foreground'
    }`} 
    aria-hidden="true" 
  />
)}
          </Link>
        );
      })}
    </nav>
  );
}

// ============================================================================
// Main Header Component
// ============================================================================

export default function Header({ locale = 'en', dict, settings, enableSearch = true, enableDarkMode = true, enableLanguageSwitcher = true, enableSecondaryNavbar = true }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const scrolled = useScroll(16);
  
  const [isPending, startTransition] = useTransition();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);
  const [loadingLocale, setLoadingLocale] = useState<Locale | null>(null);

  const { isOpen, close, toggle, triggerRef } = useMobileMenu(isPending, pathname);
  const t = dict?.nav;


  

  useEffect(() => {
    if (!isPending) {
      setLoadingPath(null);
      setLoadingLocale(null);
    }
  }, [isPending, pathname, searchParams]);

  // Primary Navigation Links
  const primaryLinks: NavLink[] = [
    { label: t?.home ?? 'Home', href: `/${locale}` },
    { label: t?.about ?? 'About', href: `/${locale}/about` },
    { label: t?.categories ?? 'Categories', href: `/${locale}/categories` },
    { label: t?.articles ?? 'Articles', href: `/${locale}/articles` },
    { label: t?.tools ?? 'Tools', href: `/${locale}#tools` },
  ];

  // Level 2 Secondary Navigation (Utilities) - Green Bar
  const utilityLinks: NavLink[] = [
    { label: t?.goldRates ?? 'Gold Rates', href: `/${locale}/gold-rates` },
    { label: t?.hijriToday ?? 'Hijri Today', href: `/${locale}/hijri-today` },
    { label: t?.silverRates ?? 'Silver Rates', href: `/${locale}/silver-rates` },
    { label: t?.overtimeCalculator ?? 'Overtime Calculator', href: `/${locale}/overtime-calculator` },
    { label: t?.iqamaFees ?? 'Iqama Fees', href: `/${locale}/iqama-fees` },
  ];

  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      
      if (pathname === href) {
        if (isOpen) close();
        return;
      }

      e.preventDefault();
      setLoadingPath(href);
      startTransition(() => {
        router.push(href);
      });
    },
    [pathname, isOpen, close, router]
  );

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale || isPending) return;
      
      setLoadingLocale(newLocale);
      const segments = pathname.split('/');
      const knownLocales = ['en', 'ar', 'ur']; 
      
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
      <header className="fixed top-0 inset-x-0 z-50 flex flex-col transform-gpu transition-all duration-300">
        
        {/* ================= LEVEL 1: Primary Brand Header (White) ================= */}
        <div className={`bg-background text-foreground relative z-20 transition-all duration-300 border-b ${scrolled ? 'shadow-sm border-border' : 'border-border/60'}`}>
          <div className="container-editorial">
            <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-[60px] sm:h-[64px] md:h-[72px]' : 'h-[64px] sm:h-[80px] md:h-[96px]'}`}>
              
              {/* Left: Big Prominent Logo */}
              <Link 
                href={`/${locale}`} 
                onClick={(e) => handleNavigate(e, `/${locale}`)}
                className={`flex items-center flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-opacity duration-200 ${
                  loadingPath === `/${locale}` ? 'opacity-60 cursor-wait' : ''
                }`}
                aria-label="ExpatSaudi Home"
              >
                {loadingPath === `/${locale}` ? (
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
                     <Spinner className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                ) : (
                  <AppLogo
                    primaryLogo={settings.branding.logos.primaryLogo?.url}
                    darkLogo={settings.branding.logos.darkLogo?.url}
                    whiteLogo={settings.branding.logos.whiteLogo?.url}
                    alt={settings.branding.identity.siteName || 'Expat Guides'}
                    className={`
                      w-[100px] h-[32px]

                      sm:w-[120px] sm:h-[48px]

                      md:w-[135px] md:h-[42px]

                      lg:w-[190px] lg:h-[92px]

                      transition-transform
                      duration-300
                      ease-out

                      ${scrolled ? 'scale-[0.92]' : 'scale-100'}
                    `}
                  />
                )}
              </Link>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 ms-auto lg:ms-0">
                
                {/* Language Switcher */}

                {enableLanguageSwitcher && (
<div className="hidden lg:flex items-center">
  <LanguageSwitcher 
    locale={locale} 
    loadingLocale={loadingLocale}
    isPending={isPending}
    switchLocale={switchLocale} 
    variant="header"
  />
</div>
                )}
                

                {(enableDarkMode || enableSearch) && (
  <div
    className="w-[1px] h-3.5 sm:h-4 md:h-5 bg-border mx-0.5"
    aria-hidden="true"
  />
)}

                {/* Theme Toggle */}
                {enableDarkMode && (
  <div className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
    <ThemeToggle />
  </div>
)}

               {/* Search Icon */}
{enableSearch && (
  <Link
    href={searchHref}
    onClick={(e) => handleNavigate(e, searchHref)}
    aria-disabled={isPending}
    className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
      loadingPath === searchHref
        ? 'opacity-70 pointer-events-none cursor-wait bg-muted'
        : ''
    }`}
    aria-label={t?.search ?? 'Search'}
  >
    {loadingPath === searchHref ? (
      <Spinner className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary" />
    ) : (
      <Icon
        name="MagnifyingGlassIcon"
        size={18}
        className="sm:w-5 sm:h-5"
      />
    )}
  </Link>
)}
                
                {/* Clean, Large Hamburger Button */}
                <button
                  ref={triggerRef}
                  onClick={toggle}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  aria-label={isOpen ? (t?.closeMenu ?? 'Close menu') : (t?.openMenu ?? 'Open menu')}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 text-foreground bg-transparent border-none outline-none focus:outline-none focus-visible:ring-0 p-0 hover:scale-110 active:scale-90 transition-transform duration-300 ease-out cursor-pointer ms-0.5 sm:ms-1"
                >
                  <Icon name="Bars3Icon" size={28} className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LEVEL 2: Utility Navigation (Saudi Green Bar) ================= */}
        {enableSecondaryNavbar && (
<div className={`hidden lg:block bg-primary text-primary-foreground border-b border-primary/20 shadow-sm transition-all duration-300 origin-top ${scrolled ? 'h-0 opacity-0 overflow-hidden border-transparent' : 'h-[46px] opacity-100'}`}>
          <div className="container-editorial h-full flex items-center justify-center">
            <DesktopNav 
              links={utilityLinks} 
              currentPath={pathname} 
              locale={locale} 
              loadingPath={loadingPath}
              onNavigate={handleNavigate}
              variant="secondary"
            />
          </div>
        </div>
        )}
        
      </header>

      {/* ================= SIDE DRAWER OVERLAY (Clean White Design) ================= */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
        aria-hidden={!isOpen}
      >
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`} 
          onClick={close}
          aria-hidden="true" 
        />
        
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`absolute top-0 bottom-0 end-0 w-[85vw] max-w-[380px] bg-background text-foreground shadow-2xl transform-gpu transition-transform duration-300 ease-[0.22,1,0.36,1] flex flex-col border-s border-border ${
            isOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'
          }`}
        >
          {/* Drawer Top Bar */}
          <div className="flex items-center justify-between h-[64px] sm:h-[80px] px-5 sm:px-8 border-b border-border shrink-0">
           
            {/* Language Switcher */}
               <div className="flex lg:hidden items-center w-[150px] sm:w-[170px]">
  <LanguageSwitcher
    locale={locale}
    loadingLocale={loadingLocale}
    isPending={isPending}
    switchLocale={switchLocale}
    variant="drawer"
  />
</div>
            <button
              onClick={close}
              aria-label={t?.closeMenu ?? 'Close menu'}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 -me-2 sm:-me-3 text-muted-foreground hover:text-foreground rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Icon name="XMarkIcon" size={24} className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Centered Drawer Links Area */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-8 flex flex-col justify-center pb-12">
            <nav aria-label="Main Navigation" className="flex flex-col">
              {primaryLinks.map((link) => {
                const active = pathname.startsWith(link.href) && 
                              (link.href === `/${locale}` ? pathname === `/${locale}` || pathname === `/${locale}/` : true);
                const isItemLoading = loadingPath === link.href;
                
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavigate(e, link.href)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 py-4 sm:py-5 border-b border-border/60 group transition-all duration-200 ${
                      isItemLoading ? 'opacity-60 pointer-events-none cursor-wait' : ''
                    }`}
                  >
                    {isItemLoading && <Spinner className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-primary" />}
                    <span className={`text-[20px] sm:text-[24px] font-bold leading-tight transition-all duration-300 ease-out ${
                      active ? 'text-primary translate-x-1.5 rtl:-translate-x-1.5' : 'text-foreground/90 group-hover:text-primary group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5'
                    }`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}