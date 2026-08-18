import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'



// Collections
import { Articles } from './collections/Articles'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { FAQs } from './collections/FAQs'
import { GovernmentSources } from './collections/GovernmentSources'
import { Media } from './collections/Media'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { Resources } from './collections/Resources'
import { Users } from './collections/Users'

// Globals
import { SeoPages } from '@/globals/SeoPages'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'

// Module Endpoints
import { articleDetailsEndpoint, articlesEndpoint } from '@/endpoints/articles'
import { categoriesEndpoint } from '@/endpoints/categories'
import { faqsEndpoint } from '@/endpoints/faqs'
import { homeEndpoint } from '@/endpoints/home'
import { resourcesEndpoint } from '@/endpoints/resources'
import { searchEndpoint } from '@/endpoints/search'
import { seoPagesEndpoint } from '@/endpoints/seo-pages'
import { siteSettingsEndpoint } from '@/endpoints/site-settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// CORS / CSRF
const allowedOrigins = [
  process.env.NEXT_PUBLIC_SERVER_URL,
  process.env.NEXT_PUBLIC_SITE_URL,
].filter(Boolean) as string[]

export default buildConfig({
  // Admin
admin: {
  user: Users.slug,

  avatar: {
  Component: '@/components/admin/UserAvatar',
},

  meta: {
    titleSuffix: ' | URExpat',
  },

  importMap: {
    baseDir: path.resolve(dirname),
  },

  components: {
    graphics: {
      Logo: '@/components/admin/Logo',
      Icon: '@/components/admin/Icon',
    },
  },
},

  // Collections
  collections: [
    Users,
    Media,
    Authors,
    Categories,
    GovernmentSources,
    Articles,
    FAQs,
    NewsletterSubscribers,
    Resources
  ],

  // Globals
  globals: [
    SiteSettings,
    Homepage,
    SeoPages,
  ],

  // Rich Text Editor
  editor: lexicalEditor(),

  // Localization
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

  // Security
  secret: process.env.PAYLOAD_SECRET ?? '',

  // TypeScript
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? '',
      max: 5,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    },
  }),

  // API Endpoints
  endpoints: [
    homeEndpoint,
    searchEndpoint,
    articlesEndpoint,
    articleDetailsEndpoint,
    categoriesEndpoint,
    siteSettingsEndpoint,
    seoPagesEndpoint,
    faqsEndpoint,
    resourcesEndpoint
  ],

  // Image Processing
  sharp,

  // CORS / CSRF
  cors: allowedOrigins,
  csrf: allowedOrigins,

  // Storage
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