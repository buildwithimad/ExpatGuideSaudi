import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import type { Dictionary } from '@/lib/dictionary';


interface HeroSectionProps {
  dict?: Dictionary;
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const t = dict?.hero;

  return (
    <section className="pt-16 md:pt-[68px] border-b border-border">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-20 lg:py-24">
          {/* Left: Content */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="badge-green">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block me-1.5"></span>
                {t?.badge ?? 'Live & Updated 2026'}
              </span>
            </div>

            <h1 className="text-hero text-foreground">
              {t?.title ?? 'Everything Expats Need to Know About Saudi Arabia'}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t?.description ?? 'Your authoritative guide to life in the Kingdom. From Iqama renewals and visa services to labor law, banking, and housing — organized, verified, and easy to understand.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/articles" className="btn-primary gap-2 py-3 px-6 text-base">
                {t?.exploreGuides ?? 'Explore Guides'}
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link href="/category" className="btn-secondary gap-2 py-3 px-6 text-base">
                {t?.browseCategories ?? 'Browse Categories'}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
              {[
                { value: '120+', label: t?.stats?.guides ?? 'Expert Guides' },
                { value: '24', label: t?.stats?.categories ?? 'Topic Categories' },
                { value: t?.stats?.free ?? 'Free', label: t?.stats?.free ?? 'Always Free' },
              ]?.map((stat) => (
                <div key={stat?.label} className="flex flex-col gap-0.5">
                  <span className="text-xl font-bold text-primary">{stat?.value}</span>
                  <span className="text-xs text-muted-foreground font-medium">{stat?.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Illustration Placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-full aspect-[4/3] bg-muted border border-border flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 bg-border flex items-center justify-center">
                <Icon name="MapIcon" size={32} className="text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-muted-foreground">{t?.illustration?.title ?? 'Professional Illustration'}</p>
                <p className="text-xs text-muted-foreground mt-1">{t?.illustration?.subtitle ?? 'Saudi Arabia Map / Landmark Visual'}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 px-8 w-full">
                {['Iqama', 'Visa', 'Labor Law', 'Banking', 'Housing', 'Health']?.map((item) => (
                  <div key={item} className="bg-background border border-border px-2 py-1.5 text-center">
                    <span className="text-2xs font-semibold text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}