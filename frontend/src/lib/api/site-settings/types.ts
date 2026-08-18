import { Image } from "@/lib/shared/types/image";

export interface SiteSettings {
  branding: {
    identity: {
      siteName: string;
      organizationName: string;
      tagline: string | null;
      shortDescription: string | null;
    };

    logos: {
      primaryLogo: Image | null;
      whiteLogo: Image | null;
      darkLogo: Image | null;
      favicon: Image | null;
      appleTouchIcon: Image | null;
    };
  };

  theme: {
    brandColors: {
      primary: string;
      primaryForeground: string;
      secondary: string;
      secondaryForeground: string;
      accent: string;
      accentForeground: string;
    };

    light: {
      background: string;
      foreground: string;
      card: string;
      cardForeground: string;
      muted: string;
      mutedForeground: string;
    };

    dark: {
      background: string;
      foreground: string;
      card: string;
      cardForeground: string;
      muted: string;
      mutedForeground: string;
    };
  };

  seo: {
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
  };

  social: {
    socialProfiles: {
      facebook: string | null;
      instagram: string | null;
      x: string | null;
      linkedin: string | null;
      youtube: string | null;
      tiktok: string | null;
      telegram: string | null;
      whatsapp: string | null
    };
  };

  analytics: {
    services: {
      googleAnalyticsId: string | null;
      googleTagManagerId: string | null;
      microsoftClarityId: string | null;
      googleAdsenseId: string | null;
    };
  };

  features: {
    website: {
      maintenanceMode: boolean;
      enableSearch: boolean;
      enableDarkMode: boolean;
      enableLanguageSwitcher: boolean;
      enableBackToTop: boolean;
      enableSocialProfile: boolean
    };

    content: {
      enableReadingTime: boolean;
      enableTableOfContents: boolean;
      enableRelatedArticles: boolean;
      
    };

    ads: {
      enableAds: boolean;
    };
  };
}