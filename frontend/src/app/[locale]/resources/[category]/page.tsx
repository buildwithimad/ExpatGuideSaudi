import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getResources } from '@/lib/api/resources'
import { getDictionary } from '@/lib/dictionary'
import {
  locales,
  type Locale,
} from '@/lib/i18n-config'
import { generateSiteMetadata } from '@/lib/seo'

import ResourcesCategoryPage from './ResourcesCategoryPage'

/* -------------------------------------------------------------------------- */
/*                         Resource Categories                                */
/* -------------------------------------------------------------------------- */

const resourceCategories = [
  'government-services',
  'useful-apps',
  'emergency-numbers',
  'public-services',
] as const

type ResourceCategory =
  (typeof resourceCategories)[number]

/* -------------------------------------------------------------------------- */
/*                              OG Images                                     */
/* -------------------------------------------------------------------------- */

const resourceOgImages: Record<
  ResourceCategory,
  string
> = {
  'government-services':
    'https://zgabdzztlcfbxnvziocu.supabase.co/storage/v1/object/public/media/Government%20Sources-400x300.webp',

  'useful-apps':
    'https://zgabdzztlcfbxnvziocu.supabase.co/storage/v1/object/public/media/Useful%20mobile%20apps-400x300.webp',

  'emergency-numbers':
    'https://zgabdzztlcfbxnvziocu.supabase.co/storage/v1/object/public/media/Emergency%20Numbers-400x300.webp',

  'public-services':
    'https://zgabdzztlcfbxnvziocu.supabase.co/storage/v1/object/public/media/Public%20Services-400x300.webp',
}

/* -------------------------------------------------------------------------- */
/*                              Static Params                                 */
/* -------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    resourceCategories.map((category) => ({
      locale,
      category,
    })),
  )
}

/* -------------------------------------------------------------------------- */
/*                              Page Metadata                                 */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string
    category: string
  }>
}): Promise<Metadata> {
  const { locale, category } = await params

  /* ------------------------------------------------------------------------ */
  /* Validate locale                                                         */
  /* ------------------------------------------------------------------------ */

  if (
    !locales.includes(
      locale as Locale,
    )
  ) {
    return {}
  }

  /* ------------------------------------------------------------------------ */
  /* Validate category                                                       */
  /* ------------------------------------------------------------------------ */

  if (
    !resourceCategories.includes(
      category as ResourceCategory,
    )
  ) {
    return {}
  }

  const currentLocale =
    locale as Locale

  const currentCategory =
    category as ResourceCategory

  /* ------------------------------------------------------------------------ */
  /* Get localized dictionary                                                */
  /* ------------------------------------------------------------------------ */

  const dict =
    await getDictionary(
      currentLocale,
    )

  /* ------------------------------------------------------------------------ */
  /* Get localized SEO data                                                  */
  /* ------------------------------------------------------------------------ */

  const seo =
    dict.resources.seo[
      currentCategory
    ]

  /* ------------------------------------------------------------------------ */
  /* Get category OG image                                                   */
  /* ------------------------------------------------------------------------ */

  const ogImage =
    resourceOgImages[
      currentCategory
    ]

  /* ------------------------------------------------------------------------ */
  /* Generate metadata using existing SEO framework                          */
  /* ------------------------------------------------------------------------ */

  return generateSiteMetadata({
    locale: currentLocale,

    title: seo.title,

    description:
      seo.description,

    canonical:
      `/resources/${currentCategory}`,

    ogImages: [
      {
        url: ogImage,
        width: 400,
        height: 300,
        alt: seo.title,
      },
    ],
  })
}

/* -------------------------------------------------------------------------- */
/*                            Resource Page                                   */
/* -------------------------------------------------------------------------- */

export default async function ResourceCategoryPage({
  params,
}: {
  params: Promise<{
    locale: string
    category: string
  }>
}) {
  const {
    locale,
    category,
  } = await params

  /* ------------------------------------------------------------------------ */
  /* Validate locale                                                         */
  /* ------------------------------------------------------------------------ */

  if (
    !locales.includes(
      locale as Locale,
    )
  ) {
    notFound()
  }

  /* ------------------------------------------------------------------------ */
  /* Validate category                                                       */
  /* ------------------------------------------------------------------------ */

  if (
    !resourceCategories.includes(
      category as ResourceCategory,
    )
  ) {
    notFound()
  }

  const currentLocale =
    locale as Locale

  const currentCategory =
    category as ResourceCategory

  /* ------------------------------------------------------------------------ */
  /* Fetch page data                                                         */
  /* ------------------------------------------------------------------------ */

  const [
    dict,
    resources,
  ] = await Promise.all([
    getDictionary(
      currentLocale,
    ),

    getResources(
      currentLocale,
      currentCategory,
    ),
  ])



  /* ------------------------------------------------------------------------ */
  /* Render                                                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <ResourcesCategoryPage
      dict={dict}
      locale={currentLocale}
      category={currentCategory}
      resources={resources}
    />
  )
}