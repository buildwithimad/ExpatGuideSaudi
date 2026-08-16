import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';

import { getCategories } from '@/lib/api/categories';
import type { SiteSettings } from '@/lib/api/site-settings';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

import Link from 'next/link';

interface FooterProps {
  locale?: Locale;
  dict?: Dictionary;
  settings: SiteSettings;
  categories: Awaited<ReturnType<typeof getCategories>>;
}

export default function Footer({
  locale = 'en',
  dict,
  settings,
  categories,
}: FooterProps) {
  /* ---------------------------------------------------------------------- */
  /* Current Year                                                           */
  /* ---------------------------------------------------------------------- */

  const currentYear = new Date().getFullYear();

  /* ---------------------------------------------------------------------- */
  /* Social Profiles                                                        */
  /* ---------------------------------------------------------------------- */

  const socialProfiles =
    settings.social?.socialProfiles ?? {};

  const socialLinks = [
    {
      label: 'Facebook',
      icon: 'Facebook',
      href: socialProfiles.facebook,
    },
    {
      label: 'Instagram',
      icon: 'Instagram',
      href: socialProfiles.instagram,
    },
    {
      label: 'X',
      icon: 'X',
      href: socialProfiles.x,
    },
    {
      label: 'LinkedIn',
      icon: 'LinkedIn',
      href: socialProfiles.linkedin,
    },
    {
      label: 'YouTube',
      icon: 'YouTube',
      href: socialProfiles.youtube,
    },
    {
      label: 'TikTok',
      icon: 'TikTok',
      href: socialProfiles.tiktok,
    },
    {
      label: 'Telegram',
      icon: 'Telegram',
      href: socialProfiles.telegram,
    },
    {
      label: 'Whatsapp',
      icon: 'Whatsapp',
      href: socialProfiles.whatsapp,
    },
  ].filter(
    (
      item,
    ): item is {
      label: string;
      icon: string;
      href: string;
    } => Boolean(item.href),
  );

  /* ---------------------------------------------------------------------- */
  /* Dictionary                                                             */
  /* ---------------------------------------------------------------------- */

  const t = dict?.footer;

  /* ---------------------------------------------------------------------- */
  /* Company Links                                                          */
  /* ---------------------------------------------------------------------- */

  const companyLinks = [
    {
      label:
        t?.groups?.Company?.links?.find(
          (link) => link.label === 'About',
        )?.label ?? 'About',

      href: `/${locale}/about`,
    },

    {
      label:
        t?.groups?.Company?.links?.find(
          (link) => link.label === 'Contact',
        )?.label ?? 'Contact',

      href: `/${locale}/contact`,
    },
  ];

  /* ---------------------------------------------------------------------- */
  /* Resource Links                                                         */
  /* ---------------------------------------------------------------------- */

  const resourcesLinks = [
    {
      label:
        t?.groups?.Resources?.links?.find(
          (link) => link.label === 'All Articles',
        )?.label ?? 'All Articles',

      href: `/${locale}/articles`,
    },

    {
      label:
        t?.groups?.Resources?.links?.find(
          (link) => link.label === 'Saudi Tools',
        )?.label ?? 'Saudi Tools',

      href: `/${locale}#tools`,
    },

    {
      label:
        t?.groups?.Resources?.links?.find(
          (link) => link.label === 'Emergency Numbers',
        )?.label ?? 'Emergency Numbers',

      href: `/${locale}/resources/emergency-numbers`,
    },

    {
      label:
        t?.groups?.Resources?.links?.find(
          (link) => link.label === 'Useful Apps',
        )?.label ?? 'Useful Apps',

      href: `/${locale}/resources/useful-apps`,
    },
  ];

  /* ---------------------------------------------------------------------- */
  /* Legal Links                                                            */
  /* ---------------------------------------------------------------------- */

  const legalLinks = [
    {
      label:
        t?.groups?.Legal?.links?.find(
          (link) => link.label === 'Privacy Policy',
        )?.label ?? 'Privacy Policy',

      href: `/${locale}/privacy-policy`,
    },

    {
      label:
        t?.groups?.Legal?.links?.find(
          (link) => link.label === 'Terms of Use',
        )?.label ?? 'Terms of Use',

      href: `/${locale}/terms`,
    },

    {
      label:
        t?.groups?.Legal?.links?.find(
          (link) => link.label === 'Disclaimer',
        )?.label ?? 'Disclaimer',

      href: `/${locale}/privacy-policy`,
    },
  ];

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-editorial py-12 md:py-16">

        {/* ================================================================ */}
        {/* Top Row                                                           */}
        {/* ================================================================ */}

        <div className="grid grid-cols-2 gap-8 border-b border-border pb-10 md:grid-cols-4 lg:grid-cols-5">

          {/* ============================================================ */}
          {/* Brand                                                          */}
          {/* ============================================================ */}

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="mb-4 inline-flex items-center"
              aria-label={
                settings.branding.identity.siteName ||
                'Expat Guides'
              }
            >
              <AppLogo
                primaryLogo={
                  settings.branding.logos.primaryLogo?.url
                }
                darkLogo={
                  settings.branding.logos.darkLogo?.url
                }
                whiteLogo={
                  settings.branding.logos.whiteLogo?.url
                }
                alt={
                  settings.branding.identity.siteName ||
                  'Expat Guides'
                }
                className="
                  h-[42px] w-[150px]
                  sm:h-[46px] sm:w-[165px]
                  md:h-[50px] md:w-[180px]
                "
              />
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t?.tagline ??
                'Trusted information for expatriates living and working in Saudi Arabia.'}
            </p>
          </div>

          {/* ============================================================ */}
          {/* Company                                                        */}
          {/* ============================================================ */}

          <div>
            <p className="label-caps mb-4 text-foreground">
              {t?.groups?.Company?.label ?? 'Company'}
            </p>

            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================================ */}
          {/* Categories                                                     */}
          {/* ============================================================ */}

          <div>
            <p className="label-caps mb-4 text-foreground">
              {t?.groups?.Categories?.label ?? 'Categories'}
            </p>

            <ul className="space-y-2.5">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/${locale}/articles?category=${encodeURIComponent(
                      category.slug,
                    )}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================================ */}
          {/* Resources                                                      */}
          {/* ============================================================ */}

          <div>
            <p className="label-caps mb-4 text-foreground">
              {t?.groups?.Resources?.label ?? 'Resources'}
            </p>

            <ul className="space-y-2.5">
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================================ */}
          {/* Legal                                                          */}
          {/* ============================================================ */}

          <div>
            <p className="label-caps mb-4 text-foreground">
              {t?.groups?.Legal?.label ?? 'Legal'}
            </p>

            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================================================================ */}
        {/* Bottom Row                                                        */}
        {/* ================================================================ */}

        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">

          <p className="order-2 text-sm text-muted-foreground md:order-1">
  {`© ${currentYear} URExpat. ${
    t?.copyright || 'All rights reserved.'
  }`}
</p>

          {/* Social */}
          <div className="order-1 flex items-center gap-5 md:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon
                  name={
                    social.icon as Parameters<
                      typeof Icon
                    >[0]['name']
                  }
                  size={18}
                />
              </a>
            ))}
          </div>

          {/* Privacy / Terms */}
          <p className="order-3 text-sm text-muted-foreground">
            <Link
              href={`/${locale}/privacy-policy`}
              className="transition-colors hover:text-foreground"
            >
              {t?.privacy ?? 'Privacy'}
            </Link>

            <span className="mx-2 text-border">
              ·
            </span>

            <Link
              href={`/${locale}/terms`}
              className="transition-colors hover:text-foreground"
            >
              {t?.terms ?? 'Terms'}
            </Link>
          </p>

        </div>
      </div>
    </footer>
  );
}