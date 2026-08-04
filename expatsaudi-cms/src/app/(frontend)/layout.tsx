import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './styles.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://expatsaudi.com'),

  title: {
    default: 'ExpatSaudi',
    template: '%s | ExpatSaudi',
  },

  description:
    'Trusted guides, visas, iqama, jobs, banking, driving, healthcare and everyday life information for expatriates living in Saudi Arabia.',

  keywords: [
    'Saudi Arabia',
    'Expat Saudi',
    'Saudi Visa',
    'Iqama',
    'Saudi Jobs',
    'Saudi Living',
    'Saudi Guides',
  ],

  authors: [
    {
      name: 'ExpatSaudi',
    },
  ],

  creator: 'ExpatSaudi',

  applicationName: 'ExpatSaudi',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://expatsaudi.com',
    siteName: 'ExpatSaudi',
    title: 'ExpatSaudi',
    description:
      'Trusted information and practical guides for expatriates living in Saudi Arabia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ExpatSaudi',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ExpatSaudi',
    description:
      'Trusted information and practical guides for expatriates living in Saudi Arabia.',
    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}