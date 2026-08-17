'use client';

import Icon from '@/components/ui/AppIcon';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

import RevealWrapper from '../../components/RevealWrapper';
import SectionTitle from '../../components/SectionTitle';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function AboutPageContent({ locale, dict }: Props) {
  // Use the new aboutPage key from the dictionary
  const t = dict?.aboutPage;

  const stats = [
    { value: '120+', label: t?.stats?.guides ?? 'Expert Guides' },
    { value: '24', label: t?.stats?.categories ?? 'Topic Categories' },
    { value: '2026', label: t?.stats?.founded ?? 'Year founded' },
    { value: '100%', label: t?.stats?.free ?? 'Always Free' },
  ];

  const editorialStandards = [
    {
      icon: 'DocumentCheckIcon',
      title: t?.standards?.items?.primary?.title,
      description: t?.standards?.items?.primary?.description,
    },
    {
      icon: 'ArrowPathIcon',
      title: t?.standards?.items?.updates?.title,
      description: t?.standards?.items?.updates?.description,
    },
    {
      icon: 'UserGroupIcon',
      title: t?.standards?.items?.community?.title,
      description: t?.standards?.items?.community?.description,
    },
    {
      icon: 'ShieldCheckIcon',
      title: t?.standards?.items?.policy?.title,
      description: t?.standards?.items?.policy?.description,
    },
  ];

  const whoWeHelp = [
    {
      icon: 'BriefcaseIcon',
      title: t?.audience?.items?.professionals?.title,
      description: t?.audience?.items?.professionals?.description,
    },
    {
      icon: 'HomeModernIcon',
      title: t?.audience?.items?.families?.title,
      description: t?.audience?.items?.families?.description,
    },
    {
      icon: 'AcademicCapIcon',
      title: t?.audience?.items?.arrivals?.title,
      description: t?.audience?.items?.arrivals?.description,
    },
    {
      icon: 'ClockIcon',
      title: t?.audience?.items?.residents?.title,
      description: t?.audience?.items?.residents?.description,
    },
  ];

  return (
    <>
      <main className="pt-16 md:pt-[68px] mt-20">
        
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-b border-border py-12 md:py-16 lg:py-24">
          <div className="container-editorial">
            <div className="max-w-3xl">
              <span className="label-caps mb-3 block text-primary">
                {t?.label}
              </span>
              <h1
  className={
    locale === 'ur'
      ? 'urdu-hero mb-4 md:mb-6 text-foreground'
      : 'text-2xl md:text-4xl lg:text-hero mb-4 md:mb-6 text-foreground tracking-tight font-bold'
  }
>
                {t?.heroTitle}
              </h1>
              <p
  className={
    locale === 'ur'
      ? 'urdu-hero-description text-muted-foreground'
      : 'text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground'
  }
>
  {t?.heroDescription}
</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Stats                                                            */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-bg border-b border-border py-8 md:py-12">
          <div className="container-editorial">
            <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4 rounded-xl overflow-hidden shadow-sm">
              {stats.map((stat) => (
                <RevealWrapper key={stat.label} type="fade">
                  <div className="bg-background px-4 py-6 md:px-6 md:py-8 text-center h-full">
                    <p className="mb-1 md:mb-2 text-2xl md:text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Mission                                                          */}
        {/* ---------------------------------------------------------------- */}
        <section id="mission" className="border-b border-border py-12 md:py-20 lg:py-24">
          <div className="container-editorial">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle label={t?.mission?.label} title={t?.mission?.title} />
              </div>
              <div className="space-y-4 md:space-y-5 lg:col-span-8 pt-2 lg:pt-0">
                <p className="prose-editorial text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t?.mission?.p1}
                </p>
                <p className="prose-editorial text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t?.mission?.p2}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Why We Built This                                                */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-bg border-b border-border py-12 md:py-20 lg:py-24">
          <div className="container-editorial">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle label={t?.story?.label} title={t?.story?.title} />
              </div>
              <div className="space-y-4 md:space-y-5 lg:col-span-8 pt-2 lg:pt-0">
                <p className="prose-editorial text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t?.story?.p1}
                </p>
                <p className="prose-editorial text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t?.story?.p2}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Editorial Standards                                              */}
        {/* ---------------------------------------------------------------- */}
        <section id="standards" className="border-b border-border py-12 md:py-20 lg:py-24">
          <div className="container-editorial">
            <SectionTitle
              label={t?.standards?.label}
              title={t?.standards?.title}
              description={t?.standards?.description}
              className="mb-8 md:mb-12"
            />
            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 rounded-xl overflow-hidden shadow-sm">
              {editorialStandards.map((standard, i) => (
                <RevealWrapper key={standard.title} delay={i * 80} type="up">
                  <div className="flex h-full flex-col gap-3 md:gap-4 bg-background p-6 md:p-8">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                      <Icon name={standard.icon as Parameters<typeof Icon>[0]['name']} size={22} />
                    </div>
                    <div>
                      <h3 className="mb-1.5 md:mb-2 text-base md:text-lg font-bold text-foreground">
                        {standard.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {standard.description}
                      </p>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Who We Help                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="section-bg border-b border-border py-12 md:py-20 lg:py-24">
          <div className="container-editorial">
            <SectionTitle
              label={t?.audience?.label}
              title={t?.audience?.title}
              description={t?.audience?.description}
              className="mb-8 md:mb-12"
            />
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden shadow-sm">
              {whoWeHelp.map((item, i) => (
                <RevealWrapper key={item.title} delay={i * 70} type="up">
                  <div className="flex h-full flex-col gap-3 bg-background p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-1">
                      <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} />
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Future Vision                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-b border-border py-12 md:py-20 lg:py-24">
          <div className="container-editorial">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle label={t?.vision?.label} title={t?.vision?.title} />
              </div>
              <div className="space-y-4 md:space-y-5 lg:col-span-8 pt-2 lg:pt-0">
                <p className="prose-editorial text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t?.vision?.p1}
                </p>
                <p className="prose-editorial text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {t?.vision?.p2}
                </p>
                <div className="flex flex-wrap gap-2 pt-3">
                  {(t?.vision?.tags || []).map((item: string) => (
                    <span key={item} className="badge-gray px-3 py-1.5 text-xs font-semibold">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Contact                                                          */}
        {/* ---------------------------------------------------------------- */}
        <section id="contact" className="section-bg border-b border-border py-12 md:py-20 lg:py-24">
          <div className="container-editorial">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <SectionTitle label={t?.contact?.label} title={t?.contact?.title} />
              </div>
              <div className="lg:col-span-8 pt-2 lg:pt-0">
                <div className="grid gap-px bg-border sm:grid-cols-1 rounded-xl overflow-hidden shadow-sm">
                  {[
                    { icon: 'EnvelopeIcon', label: t?.contact?.editorial ?? 'Editorial', value: 'urexpat@gmail.com' },
                    
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 bg-background p-5 md:p-6 transition-colors hover:bg-muted/30">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={20} />
                      </div>
                      <div className="pt-0.5">
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm md:text-base font-semibold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>
    </>
  );
}