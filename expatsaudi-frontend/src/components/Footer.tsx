import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import type { Locale } from '@/lib/i18n-config';
import type { Dictionary } from '@/lib/dictionary';

interface FooterProps {
  locale?: Locale;
  dict?: Dictionary;
}

const socialLinks = [
  { label: 'Twitter', icon: 'GlobeAltIcon', href: '#' },
  { label: 'LinkedIn', icon: 'BriefcaseIcon', href: '#' },
  { label: 'YouTube', icon: 'PlayCircleIcon', href: '#' },
];

export default function Footer({ locale = 'en', dict }: FooterProps) {
  const t = dict?.footer;
  const groups = t?.groups ?? {
    Company: { label: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Editorial Standards', href: '/about#standards' }, { label: 'Contact', href: '/about#contact' }] },
    Categories: { label: 'Categories', links: [{ label: 'Iqama & Residency', href: '/category' }, { label: 'Visa Services', href: '/category' }, { label: 'Labor Law', href: '/category' }, { label: 'Government Services', href: '/category' }, { label: 'Banking & Finance', href: '/category' }] },
    Resources: { label: 'Resources', links: [{ label: 'All Articles', href: '/articles' }, { label: 'Saudi Tools', href: '/#tools' }, { label: 'Emergency Numbers', href: '/articles' }, { label: 'Useful Apps', href: '/articles' }] },
    Legal: { label: 'Legal', links: [{ label: 'Privacy Policy', href: '/about' }, { label: 'Terms of Use', href: '/about' }, { label: 'Disclaimer', href: '/about' }] },
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-editorial py-12 md:py-16">
        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10 border-b border-border">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-4">
              <AppLogo size={28} />
              <span className="font-bold text-base tracking-tight text-foreground">ExpatSaudi</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t?.tagline ?? 'Trusted information for expatriates living and working in Saudi Arabia.'}
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(groups).map(([key, group]) => (
            <div key={key}>
              <p className="label-caps text-foreground mb-4">{group.label}</p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href.startsWith('/#') ? `/${locale}${link.href.slice(1)}` : `/${locale}${link.href}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-sm text-muted-foreground order-2 md:order-1">
            {t?.copyright ?? '© 2026 ExpatSaudi. All rights reserved.'}
          </p>
          <div className="flex items-center gap-5 order-1 md:order-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={18} />
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground order-3">
            <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">{t?.privacy ?? 'Privacy'}</Link>
            <span className="mx-2 text-border">·</span>
            <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">{t?.terms ?? 'Terms'}</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}