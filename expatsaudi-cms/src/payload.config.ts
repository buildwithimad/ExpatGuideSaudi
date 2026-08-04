import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { homeEndpoint } from './endpoints/home/index'
import { searchEndpoint } from './endpoints/search/index'

import { Articles } from './collections/Articles'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { FAQs } from './collections/FAQs'
import { GovernmentSources } from './collections/GovernmentSources'
import { Media } from './collections/Media'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { Users } from './collections/Users'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'

import {
  articlesEndpoint
} from '@/endpoints/articles'
import {
  categoriesEndpoint,
} from '@/endpoints/categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL

  const allowedOrigins = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean) as string[];

export default buildConfig({
  
  admin: {
  user: Users.slug,

  importMap: {
    baseDir: path.resolve(dirname),
  },


  dashboard: {
  widgets: [
    {
      slug: 'overview',
      Component:
        './components/admin/dashboard/widgets/OverviewWidget.tsx#default',
      minWidth: 'full',
      maxWidth: 'full',
    },
  ],

  defaultLayout: () => [
    {
      widgetSlug: 'overview',
      width: 'full',
    },
    {
      widgetSlug: 'collections',
      width: 'full',
    },
  ],
},

  components: {
    graphics: {
      Logo: '@/components/admin/Logo',
      Icon: '@/components/admin/Icon',
    },
  },
},

  collections: [
    Users,
    Media,
    Authors,
    Categories,
    GovernmentSources,
    Articles,
    FAQs,
    NewsletterSubscribers,
  ],

  globals: [SiteSettings, Homepage],

  editor: lexicalEditor(),

  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Arabic',
        code: 'ar',
        rtl: true,
      },
      {
        label: 'Urdu',
        code: 'ur',
        rtl: true,
      },
      {
        label: 'Hindi',
        code: 'hi',
      },
      {
        label: 'Bengali',
        code: 'bn',
      },
      {
        label: 'Tagalog',
        code: 'tl',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  secret: process.env.PAYLOAD_SECRET ?? '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? '',
    },
  }),


  endpoints: [
  homeEndpoint,
  searchEndpoint,
  articlesEndpoint,
  categoriesEndpoint

],

  sharp,





cors: allowedOrigins,

csrf: allowedOrigins,

 plugins: [
  s3Storage({
    enabled: Boolean(
      process.env.SUPABASE_S3_ENDPOINT &&
      process.env.SUPABASE_S3_REGION &&
      process.env.SUPABASE_S3_ACCESS_KEY &&
      process.env.SUPABASE_S3_SECRET_KEY &&
      process.env.SUPABASE_S3_BUCKET,
    ),
    collections: {
      media: true,
    },
    bucket: process.env.SUPABASE_S3_BUCKET!,
    config: {
      endpoint: process.env.SUPABASE_S3_ENDPOINT!,
      region: process.env.SUPABASE_S3_REGION!,
      credentials: {
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY!,
        secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY!,
      },
      forcePathStyle: true,
    },
  }),
],
})