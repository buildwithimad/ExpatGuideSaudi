import type { Metadata } from 'next';

import { getSiteSettings } from '@/lib/settings';

import { buildAlternates } from './alternates';
import { buildIcons } from './icons';
import { buildOpenGraph } from './openGraph';
import { buildRobots } from './robots';
import { buildTwitter } from './twitter';
import { buildVerification } from './verification';

import type { GenerateMetadataOptions } from './types';

/* -------------------------------------------------------------------------- */
/*                           Generate Site Metadata                           */
/* -------------------------------------------------------------------------- */

export async function generateSiteMetadata({
  locale,

  title,

  description,

  keywords,

  category,

  canonical,

  ogImages,

  authors,

  creator,

  publisher,

  applicationName,

  robots,

  noIndex,

  noFollow,

  alternates,

  verification,

  referrer,

  manifest,

  archives,

  openGraph,

  twitter,
}: GenerateMetadataOptions): Promise<Metadata> {
  /* ---------------------------------------------------------------------- */
  /* Site Settings                                                          */
  /* ---------------------------------------------------------------------- */

  const settings =
    await getSiteSettings(locale);

  const {
    branding,
    seo,
  } = settings;

  const {
    identity,
    logos,
  } = branding;

  const siteName =
    identity.siteName;

  const siteUrl =
    seo.site.siteUrl;

  /* ---------------------------------------------------------------------- */
  /* Defaults                                                               */
  /* ---------------------------------------------------------------------- */

  const metaTitle =
    title ??
    seo.site.defaultMetaTitle;

  const metaDescription =
    description ??
    seo.site.defaultMetaDescription ??
    undefined;

  const images = ogImages?.length ? ogImages : [];

  /* ---------------------------------------------------------------------- */
  /* Helpers                                                                */
  /* ---------------------------------------------------------------------- */

  const metadataIcons =
    buildIcons({
      favicon: logos.favicon,

      appleTouchIcon:
        logos.appleTouchIcon,
    });

  const metadataAlternates =
    buildAlternates({
      locale,

      siteUrl,

      canonical,
    });

  const metadataOpenGraph =
    buildOpenGraph({
      locale,

      siteUrl,

      siteName,

      title: metaTitle,

      description:
        metaDescription,

      canonical,

      images,

      openGraph,
    });

  const metadataTwitter =
    buildTwitter({
      title: metaTitle,

      description:
        metaDescription,

      images,

      twitter,
    });

  const metadataRobots =
    buildRobots({
      robots,

      noIndex,

      noFollow,
    });

  const metadataVerification =
    buildVerification({
      googleVerification:
        seo.verification
          .googleVerification,

      bingVerification:
        seo.verification
          .bingVerification,
    });

  /* ---------------------------------------------------------------------- */
  /* Metadata                                                               */
  /* ---------------------------------------------------------------------- */

  return {
    metadataBase: new URL(
      siteUrl,
    ),

    title: metaTitle,

    description:
      metaDescription,

    applicationName:
      applicationName ??
      siteName,

    keywords,

    category,

    authors,

    creator,

    publisher,

    archives,

    manifest,

    referrer,

    icons: metadataIcons,

    alternates:
      alternates ??
      metadataAlternates,

    openGraph:
      metadataOpenGraph,

    twitter:
      metadataTwitter,

    robots:
      metadataRobots,

    verification:
      verification ??
      metadataVerification,
  };
}