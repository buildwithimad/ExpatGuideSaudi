'use client';

import { memo, useMemo } from 'react';

import AppImage from './AppImage';

interface AppLogoProps {
  /**
   * CMS Primary Logo.
   * Used as a fallback when theme-specific logos are unavailable.
   */
  primaryLogo?: string | null;

  /**
   * CMS Dark Logo.
   * Used on light backgrounds.
   */
  darkLogo?: string | null;

  /**
   * CMS White Logo.
   * Used on dark backgrounds.
   */
  whiteLogo?: string | null;

  /**
   * Existing local logo fallback.
   */
  fallbackSrc?: string;

  size?: number;
  className?: string;
  onClick?: () => void;
  alt?: string;
}

const AppLogo = memo(function AppLogo({
  primaryLogo,
  darkLogo,
  whiteLogo,
  fallbackSrc = '/assets/images/app_logo.png',
  size = 64,
  className = '',
  onClick,
  alt = 'Expat Guides',
}: AppLogoProps) {
  /* ---------------------------------------------------------------------- */
  /* Light Mode                                                             */
  /* ---------------------------------------------------------------------- */

  const lightModeLogo =
    darkLogo ||
    primaryLogo ||
    fallbackSrc;

  /* ---------------------------------------------------------------------- */
  /* Dark Mode                                                              */
  /* ---------------------------------------------------------------------- */

  const darkModeLogo =
    whiteLogo ||
    primaryLogo ||
    fallbackSrc;

  /* ---------------------------------------------------------------------- */
  /* Container                                                              */
  /* ---------------------------------------------------------------------- */

  const containerClassName = useMemo(() => {
    const classes = ['flex items-center'];

    if (onClick) {
      classes.push(
        'cursor-pointer',
        'hover:opacity-80',
        'transition-opacity',
      );
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }, [onClick, className]);

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <div
      className={containerClassName}
      onClick={onClick}
    >
      {/* Light Mode */}
      <div className="block dark:hidden">
        <AppImage
          src={lightModeLogo}
          alt={alt}
          width={size}
          height={size}
          className="flex-shrink-0"
          priority
          unoptimized={lightModeLogo.endsWith('.svg')}
        />
      </div>

      {/* Dark Mode */}
      <div className="hidden dark:block">
        <AppImage
          src={darkModeLogo}
          alt={alt}
          width={size}
          height={size}
          className="flex-shrink-0"
          priority
          unoptimized={darkModeLogo.endsWith('.svg')}
        />
      </div>
    </div>
  );
});

export default AppLogo;