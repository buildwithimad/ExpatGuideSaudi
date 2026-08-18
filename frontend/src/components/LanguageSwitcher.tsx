'use client';

import type { Locale } from '@/lib/i18n-config';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface LanguageSwitcherProps {
  locale: Locale;
  loadingLocale: Locale | null;
  isPending: boolean;
  switchLocale: (locale: Locale) => void;
  variant?: 'header' | 'drawer';
}

// Reused Lightweight Spinner
const Spinner = memo(({ className = '' }: { className?: string }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
));

Spinner.displayName = 'Spinner';

// Typed Language Configuration with Local SVG Assets
const languages: Array<{
  locale: Locale;
  name: string;
  nativeName: string;
  shortName: string;
  flag: string;
}> = [
  {
    locale: 'en',
    name: 'English',
    nativeName: 'English',
    shortName: 'EN',
    flag: '/flags/gb.svg',
  },
  {
    locale: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    shortName: 'AR',
    flag: '/flags/sa.svg',
  },
  {
    locale: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    shortName: 'UR',
    flag: '/flags/pk.svg',
  },
];

export default function LanguageSwitcher({
  locale,
  loadingLocale,
  isPending,
  switchLocale,
  variant = 'header',
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeader = variant === 'header';

  const activeLanguage = languages.find((lang) => lang.locale === locale) || languages[0];

  const closeDropdown = useCallback(() => setIsOpen(false), []);
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  // Safe click-outside handler
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen, closeDropdown]);

  // Close dropdown when transition begins
  useEffect(() => {
    if (isPending) closeDropdown();
  }, [isPending, closeDropdown]);

  // Keyboard Navigation
  const handleContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const items = Array.from(
      containerRef.current?.querySelectorAll('[role="menuitem"]') || []
    ) as HTMLElement[];

    if (!items.length) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        const trigger = containerRef.current?.querySelector('[aria-haspopup="menu"]') as HTMLElement;
        trigger?.focus();
        break;
      case 'Tab':
        closeDropdown();
        break;
    }
  };

  const handleSelect = (selectedLocale: Locale) => {
    if (selectedLocale !== locale && !isPending) {
      switchLocale(selectedLocale);
    }
    closeDropdown();
  };

  // Adjusted colors and responsive sizing for both variants
  const triggerClass = isHeader
    ? 'inline-flex items-center justify-center h-8 sm:h-9 px-2 sm:px-3 rounded-md bg-muted/40 text-foreground hover:bg-muted transition-colors border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
    : 'inline-flex items-center justify-between w-full h-8 sm:h-12 px-3 sm:px-4 rounded-md bg-background text-foreground border border-border hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

  // Open below (top-full) for both variants as requested for mobile responsiveness
  const dropdownPositionClasses = isHeader 
    ? 'mt-1 sm:mt-1.5 top-full end-0 min-w-[130px] sm:min-w-[150px] origin-top-right' 
    : 'mt-1.5 top-full start-0 w-full origin-top';

  return (
    <div
      ref={containerRef}
      className={`relative ${isHeader ? 'flex items-center' : 'w-full flex'}`}
      onKeyDown={handleContainerKeyDown}
    >
      <style>{`
        @keyframes dropdown-enter {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-dropdown {
          animation: dropdown-enter 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* TRIGGER BUTTON */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        aria-label="Select language"
        onClick={toggleDropdown}
        disabled={isPending}
        className={triggerClass}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isPending ? (
            <Spinner className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          ) : (
            <Image
              src={activeLanguage.flag}
              alt=""
              width={20}
              height={14}
              className="h-[12px] w-[18px] sm:h-[14px] sm:w-[20px] object-cover rounded-xs"
              priority
            />
          )}
          <span
            className={`font-semibold text-[10px] sm:text-xs md:text-sm tracking-wide ${
              isPending ? 'opacity-70' : ''
            }`}
          >
            {isHeader ? activeLanguage.shortName : activeLanguage.nativeName}
          </span>
        </div>

        <svg
          className={`ms-1 sm:ms-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          {/* Always point down when closed, up when open */}
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div
          id="language-menu"
          role="menu"
          aria-orientation="vertical"
          className={`absolute z-[100] flex flex-col bg-background border border-border rounded-md py-1 sm:py-1.5 animate-dropdown ${dropdownPositionClasses}`}
        >
          {languages.map((lang) => {
            const isActive = locale === lang.locale;
            const isItemLoading = loadingLocale === lang.locale;

            return (
              <button
                key={lang.locale}
                role="menuitem"
                aria-current={isActive}
                disabled={isPending}
                onClick={() => handleSelect(lang.locale)}
                className={`relative w-full flex items-center justify-between px-3 md:px-4 h-10 md:h-[38px] text-[13px] md:text-sm transition-colors focus-visible:outline-none focus-visible:bg-muted/80 ${
                  isActive
                    ? 'text-primary font-semibold bg-primary/5'
                    : 'text-foreground hover:bg-muted font-medium'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <Image
                    src={lang.flag}
                    alt={`${lang.name} flag`}
                    width={20}
                    height={14}
                    className="h-[12px] w-[18px] sm:h-[14px] sm:w-[20px] object-cover rounded-xs shrink-0"
                  />
                  <span className="tracking-wide">{lang.nativeName}</span>
                </div>

                <div className="flex items-center ms-3 sm:ms-4">
                  {isItemLoading ? (
                    <Spinner className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  ) : isActive ? (
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}