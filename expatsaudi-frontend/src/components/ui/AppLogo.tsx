'use client';

import { memo, useMemo } from 'react';

import AppImage from './AppImage';

interface AppLogoProps {
  primaryLogo?: string | null;
  darkLogo?: string | null;
  whiteLogo?: string | null;
  fallbackSrc?: string;

  className?: string;
  onClick?: () => void;
  alt?: string;
}

const AppLogo = memo(function AppLogo({
  primaryLogo,
  darkLogo,
  whiteLogo,
  fallbackSrc = '/assets/images/app_logo.png',
  className = '',
  onClick,
  alt = 'Expat Guides',
}: AppLogoProps) {
  /*
   * ============================================================
   * LIGHT THEME LOGO
   * ============================================================
   *
   * Used when the website has a light background.
   *
   * Priority:
   * 1. Dark Logo from CMS
   * 2. Primary Logo from CMS
   * 3. Local fallback
   */
  const lightModeLogo =
    darkLogo ||
    primaryLogo ||
    fallbackSrc;

  /*
   * ============================================================
   * DARK THEME LOGO
   * ============================================================
   *
   * Used when the website has a dark background.
   *
   * Priority:
   * 1. White Logo from CMS
   * 2. Primary Logo from CMS
   * 3. Local fallback
   */
  const darkModeLogo =
    whiteLogo ||
    primaryLogo ||
    fallbackSrc;

  /*
   * ============================================================
   * RESPONSIVE LOGO SIZE
   * ============================================================
   *
   * Matches the actual header logo widths:
   *
   * Mobile:   100px
   * Small:    120px
   * Medium:   135px
   * Desktop:  190px
   *
   * This prevents Next/Image from assuming the logo
   * could occupy the full viewport width.
   */
  const logoSizes =
    '(max-width: 639px) 100px, ' +
    '(max-width: 767px) 120px, ' +
    '(max-width: 1023px) 135px, ' +
    '190px';

  /*
   * ============================================================
   * CONTAINER
   * ============================================================
   */
  const containerClassName = useMemo(() => {
    const classes = [
      'relative',
      'flex',
      'items-center',
      'shrink-0',
      'leading-none',
    ];

    if (onClick) {
      classes.push(
        'cursor-pointer',
        'hover:opacity-80',
        'transition-opacity',
        'duration-200',
      );
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [onClick, className]);

  return (
    <div className={containerClassName}>
      {/* ======================================================
          LIGHT MODE
          ====================================================== */}

      <div className="relative flex h-full w-full items-center dark:hidden">
        <AppImage
          src={lightModeLogo}
          alt={alt}
          fill
          priority
          sizes={logoSizes}
          unoptimized={lightModeLogo.endsWith('.svg')}
          className="object-contain object-left"
        />
      </div>

      {/* ======================================================
          DARK MODE
          ====================================================== */}

      <div className="relative hidden h-full w-full items-center dark:flex">
        <AppImage
          src={darkModeLogo}
          alt={alt}
          fill
          priority
          sizes={logoSizes}
          unoptimized={darkModeLogo.endsWith('.svg')}
          className="object-contain object-left"
        />
      </div>
    </div>
  );
});

export default AppLogo;