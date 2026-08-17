import type { ImageDTO } from '@/shared/dto';

/* -------------------------------------------------------------------------- */
/*                                 Branding                                   */
/* -------------------------------------------------------------------------- */

export interface BrandingDTO {
  identity: {
    siteName: string;
    organizationName: string;
    tagline: string | null;
    shortDescription: string | null;
  };

  logos: {
    primaryLogo: ImageDTO | null;
    whiteLogo: ImageDTO | null;
    darkLogo: ImageDTO | null;
    favicon: ImageDTO | null;
    appleTouchIcon: ImageDTO | null;
    
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Theme                                    */
/* -------------------------------------------------------------------------- */

export interface ThemeColorDTO {
  primary: string;
  primaryForeground: string;

  secondary: string;
  secondaryForeground: string;

  accent: string;
  accentForeground: string;

  background: string;
  foreground: string;

  card: string;
  cardForeground: string;

  muted: string;
  mutedForeground: string;
}

export interface ThemeDTO {
  light: ThemeColorDTO;
  dark: ThemeColorDTO;
}

/* -------------------------------------------------------------------------- */
/*                                    SEO                                     */
/* -------------------------------------------------------------------------- */

export interface SeoDTO {
  site: {
    siteUrl: string;
    defaultMetaTitle: string;
    defaultMetaDescription: string | null;
  };

  verification: {
    googleVerification: string | null;
    bingVerification: string | null;
  };

  structuredData: {
    organizationType: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                              Social Media                                  */
/* -------------------------------------------------------------------------- */

export interface SocialDTO {
  socialProfiles: {
    facebook: string | null;
    instagram: string | null;
    x: string | null;
    linkedin: string | null;
    youtube: string | null;
    tiktok: string | null;
    telegram: string | null;
    whatsapp: string | null;
  };
}

/* -------------------------------------------------------------------------- */
/*                                Analytics                                   */
/* -------------------------------------------------------------------------- */

export interface AnalyticsDTO {
  services: {
    googleAnalyticsId: string | null;
    googleTagManagerId: string | null;
    microsoftClarityId: string | null;
    googleAdsenseId: string | null;
  };
}

/* -------------------------------------------------------------------------- */
/*                                 Features                                   */
/* -------------------------------------------------------------------------- */

export interface FeaturesDTO {
  website: {
    maintenanceMode: boolean;
    enableSearch: boolean;
    enableDarkMode: boolean;
    enableLanguageSwitcher: boolean;
    enableBackToTop: boolean;
    enableSocialProfile: boolean;
  };

  content: {
    enableReadingTime: boolean;
    enableTableOfContents: boolean;
    enableRelatedArticles: boolean;
  };

  ads: {
    enableAds: boolean;
  };
}

/* -------------------------------------------------------------------------- */
/*                              Site Settings                                 */
/* -------------------------------------------------------------------------- */

export interface SiteSettingsDTO {
  branding: BrandingDTO;
  theme: ThemeDTO;
  seo: SeoDTO;
  social: SocialDTO;
  analytics: AnalyticsDTO;
  features: FeaturesDTO;
}