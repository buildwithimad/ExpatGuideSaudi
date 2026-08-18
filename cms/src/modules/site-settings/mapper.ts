import type { SiteSettingsDTO } from './dto';
import type { SiteSettingsDocument } from './types';

import { mapImage } from '@/shared/mappers/image';

export function mapSiteSettings(
  settings: SiteSettingsDocument,
): SiteSettingsDTO {
  return {
    branding: {
      identity: {
        siteName: settings.identity.siteName,

        organizationName:
          settings.identity.organizationName,

        tagline:
          settings.identity.tagline ?? null,

        shortDescription:
          settings.identity.shortDescription ??
          null,
      },

      logos: {
        primaryLogo: mapImage(
          settings.logos?.primaryLogo,
        ),

        whiteLogo: mapImage(
          settings.logos?.whiteLogo,
        ),

        darkLogo: mapImage(
          settings.logos?.darkLogo,
        ),

        favicon: mapImage(
          settings.logos?.favicon,
        ),

        appleTouchIcon: mapImage(
          settings.logos?.appleTouchIcon,
        ),
      },
    },

    /* -------------------------------------------------------------------- */
    /* Theme                                                                */
    /* -------------------------------------------------------------------- */

    theme: {
      light: settings.light,

      dark: settings.dark,
    },

    /* -------------------------------------------------------------------- */
    /* SEO                                                                  */
    /* -------------------------------------------------------------------- */

    seo: {
      site: {
        siteUrl:
          settings.site.siteUrl,

        defaultMetaTitle:
          settings.site.defaultMetaTitle,

        defaultMetaDescription:
          settings.site
            .defaultMetaDescription ??
          null,
      },

      verification: {
        googleVerification:
          settings.verification
            ?.googleVerification ??
          null,

        bingVerification:
          settings.verification
            ?.bingVerification ??
          null,
      },

      structuredData:
        settings.structuredData,
    },

    /* -------------------------------------------------------------------- */
    /* Social                                                               */
    /* -------------------------------------------------------------------- */

    social: {
      socialProfiles: {
        facebook:
          settings.socialProfiles
            ?.facebook ?? null,

        instagram:
          settings.socialProfiles
            ?.instagram ?? null,

        x:
          settings.socialProfiles
            ?.x ?? null,

        linkedin:
          settings.socialProfiles
            ?.linkedin ?? null,

        youtube:
          settings.socialProfiles
            ?.youtube ?? null,

        tiktok:
          settings.socialProfiles
            ?.tiktok ?? null,

        telegram:
          settings.socialProfiles
            ?.telegram ?? null,
        
        whatsapp:
          settings.socialProfiles
            ?.whatsapp ?? null
      },
    },

    /* -------------------------------------------------------------------- */
    /* Analytics                                                            */
    /* -------------------------------------------------------------------- */

    analytics: {
      services: {
        googleAnalyticsId:
          settings.services
            ?.googleAnalyticsId ??
          null,

        googleTagManagerId:
          settings.services
            ?.googleTagManagerId ??
          null,

        microsoftClarityId:
          settings.services
            ?.microsoftClarityId ??
          null,

        googleAdsenseId:
          settings.services
            ?.googleAdsenseId ??
          null,
      },
    },

    /* -------------------------------------------------------------------- */
    /* Features                                                             */
    /* -------------------------------------------------------------------- */

    features: {
      website: {
        maintenanceMode:
          settings.website
            ?.maintenanceMode ??
          false,

        enableSearch:
          settings.website
            ?.enableSearch ??
          true,

        enableDarkMode:
          settings.website
            ?.enableDarkMode ??
          true,
        
        enableLanguageSwitcher:
          settings.website
            ?.enableLanguageSwitcher ??
          true,

        enableBackToTop:
          settings.website
            ?.enableBackToTop ??
          true,


        enableSocialProfile:
          settings.website
            ?.enableSocialProfile ??
          true,


        
      },

      content: {
        enableReadingTime:
          settings.content
            ?.enableReadingTime ??
          true,

        enableTableOfContents:
          settings.content
            ?.enableTableOfContents ??
          true,

        enableRelatedArticles:
          settings.content
            ?.enableRelatedArticles ??
          true,
      },

      ads: {
        enableAds:
          settings.ads?.enableAds ??
          true,
      },
    },
  };
}