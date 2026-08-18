'use client';

import SectionTitle from '@/app/components/SectionTitle';
import AppIcon from '@/components/ui/AppIcon';
import type { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function ContactPageContent({ locale, dict }: Props) {
  const t = dict?.contact;

  return (
    <main>
      <section className="container-editorial py-12 md:py-16 lg:py-24 mt-16 md:mt-20">
        
        <SectionTitle
          label={t?.label ?? 'GET IN TOUCH'}
          title={t?.title ?? 'How Can We Help?'}
          description={t?.description ?? 'Have a question, suggestion, or feedback? We would love to hear from you.'}
          titleAs="h1"
        />

        {/* Asymmetric Enterprise Grid (5 cols info / 7 cols form) */}
        <div className="mt-8 md:mt-12 grid gap-6 sm:gap-8 lg:gap-16 lg:grid-cols-12 items-start">
          
          {/* ================================================================ */}
          {/* Contact Information Cards (Left)                                 */}
          {/* ================================================================ */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            
            {/* Email Card */}
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6 md:p-8 transition-colors hover:border-primary/30">
              <div className="mb-4 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <AppIcon name="EnvelopeIcon" size={22} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {t?.email?.title ?? 'Email'}
              </h2>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t?.email?.description ?? 'You can reach us by email for questions, feedback, or suggestions.'}
              </p>
            </div>

            {/* Feedback Card */}
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6 md:p-8 transition-colors hover:border-primary/30">
              <div className="mb-4 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <AppIcon name="ChatBubbleLeftRightIcon" size={22} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {t?.feedback?.title ?? 'Your Feedback Matters'}
              </h2>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t?.feedback?.description ?? 'Help us improve our guides and content by sharing your feedback.'}
              </p>
            </div>

            {/* Corrections Card */}
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6 md:p-8 transition-colors hover:border-primary/30">
              <div className="mb-4 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <AppIcon name="ShieldCheckIcon" size={22} />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {t?.corrections?.title ?? 'Content Corrections'}
              </h2>
              <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t?.corrections?.description ?? 'If you find information that needs to be updated or corrected, please let us know.'}
              </p>
            </div>
            
          </div>

          {/* ================================================================ */}
          {/* Contact Form (Right)                                             */}
          {/* ================================================================ */}
          <div className="lg:col-span-7 rounded-xl border border-border bg-card p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              {t?.form?.title ?? 'Send Us a Message'}
            </h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground">
              {t?.form?.description ?? 'Send us your message and we will review it as soon as possible.'}
            </p>

            <form className="mt-6 sm:mt-8 flex flex-col gap-5 sm:gap-6">
              
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {t?.form?.name ?? 'Name'}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full h-[44px] sm:h-[50px] rounded-lg border border-border bg-background px-3 sm:px-4 text-sm sm:text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder={t?.form?.namePlaceholder ?? 'Enter your name'}
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {t?.form?.email ?? 'Email Address'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full h-[44px] sm:h-[50px] rounded-lg border border-border bg-background px-3 sm:px-4 text-sm sm:text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder={t?.form?.emailPlaceholder ?? 'example@email.com'}
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {t?.form?.message ?? 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full resize-y min-h-[120px] sm:min-h-[140px] rounded-lg border border-border bg-background p-3 sm:p-4 text-sm sm:text-base text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder={t?.form?.messagePlaceholder ?? 'Write your message here...'}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-1 sm:pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[44px] sm:h-[50px] px-6 sm:px-8 rounded-lg bg-primary text-primary-foreground font-semibold text-sm sm:text-[15px] transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
                >
                  {t?.form?.submit ?? 'Send Message'}
                </button>
              </div>

            </form>
          </div>
          
        </div>
      </section>
    </main>
  );
}