import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import SectionTitle from './SectionTitle';
import RevealWrapper from './RevealWrapper';
import type { Dictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

const resourceKeys = ['government', 'apps', 'emergency', 'public', 'legal', 'embassies'] as const;
const resourceIcons = ['BuildingOfficeIcon', 'DevicePhoneMobileIcon', 'PhoneIcon', 'BuildingLibraryIcon', 'ScaleIcon', 'GlobeAltIcon'];

interface ResourcesSectionProps {
  dict?: Dictionary;
  locale?: Locale;
}

export default function ResourcesSection({ dict, locale = 'en' }: ResourcesSectionProps) {
  const t = dict?.resources;

  const resources = resourceKeys.map((key, i) => ({
    icon: resourceIcons[i],
    title: t?.items?.[key]?.title ?? key,
    description: t?.items?.[key]?.description ?? '',
    href: `/${locale}/articles`,
  }));

  return (
    <section className="py-16 md:py-20 border-b border-border section-bg">
      <div className="container-editorial">
        <SectionTitle
          label={t?.label ?? 'Quick Reference'}
          title={t?.title ?? 'Saudi Resources'}
          description={t?.description ?? 'Essential reference guides and external links for everyday expat needs.'}
          className="mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {resources.map((resource, i) => (
            <RevealWrapper key={resource.title} delay={i * 60} type="up">
              <Link href={resource.href} className="resource-card flex flex-col gap-3 h-full bg-background group">
                <div className="w-9 h-9 bg-muted flex items-center justify-center">
                  <Icon name={resource.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{resource.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
                </div>
                <div className="mt-auto pt-2 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold">{t?.viewResource ?? 'View Resource'}</span>
                  <Icon name="ArrowRightIcon" size={12} />
                </div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}