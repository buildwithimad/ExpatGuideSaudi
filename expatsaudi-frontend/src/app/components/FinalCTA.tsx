import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

interface FinalCTAProps {
  dict?: Dictionary;
  locale?: Locale;
}

export default function FinalCTA({ dict, locale = 'en' }: FinalCTAProps) {
  const t = dict?.finalCta;

  return (
    <section className="py-16 md:py-24 border-b border-border">
      <div className="container-editorial">
        <div className="max-w-3xl">
          <span className="label-caps text-primary mb-4 block">{t?.label ?? 'Get Started'}</span>
          <h2 className="text-display text-foreground mb-5">
            {t?.title ?? "Start Exploring Saudi Arabia's Most Comprehensive Expat Guide"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            {t?.description ?? 'Whether you just landed in the Kingdom or have been here for years, ExpatSaudi has the information you need — organized, current, and written in plain English.'}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/articles`} className="btn-primary py-3 px-6 text-base gap-2">
              {t?.exploreAll ?? 'Explore All Guides'}
              <Icon name="ArrowRightIcon" size={16} />
            </Link>
            <Link href={`/${locale}/category`} className="btn-secondary py-3 px-6 text-base">
              {t?.browseCategories ?? 'Browse Categories'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}