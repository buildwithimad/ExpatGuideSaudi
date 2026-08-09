'use client';

import SectionTitle from '@/app/components/SectionTitle';
import AppIcon from '@/components/ui/AppIcon';

import type { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

type Dictionary = Awaited<
  ReturnType<typeof getDictionary>
>;

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function ContactPageContent({
  locale,
  dict,
}: Props) {
  const isArabic = locale === 'ar';

  return (
    <main>
      <section className="container-editorial py-16 md:py-24">
        <SectionTitle
          label={
            isArabic
              ? 'تواصل معنا'
              : 'GET IN TOUCH'
          }
          title={
            isArabic
              ? 'كيف يمكننا مساعدتك؟'
              : 'How Can We Help?'
          }
          description={
            isArabic
              ? 'لديك سؤال أو ملاحظة أو اقتراح؟ يسعدنا أن نسمع منك.'
              : 'Have a question, suggestion, or feedback? We would love to hear from you.'
          }
          titleAs="h1"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* ---------------------------------------------------------------- */}
          {/* Contact Information                                             */}
          {/* ---------------------------------------------------------------- */}

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-primary">
                <AppIcon
                  name="EnvelopeIcon"
                  size={22}
                />
              </div>

              <h2 className="text-xl font-semibold">
                {isArabic
                  ? 'البريد الإلكتروني'
                  : 'Email'}
              </h2>

              <p className="mt-2 text-muted-foreground">
                {isArabic
                  ? 'يمكنك التواصل معنا عبر البريد الإلكتروني.'
                  : 'You can reach us by email for questions, feedback, or suggestions.'}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-primary">
                <AppIcon
                  name="ChatBubbleLeftRightIcon"
                  size={22}
                />
              </div>

              <h2 className="text-xl font-semibold">
                {isArabic
                  ? 'ملاحظاتك مهمة'
                  : 'Your Feedback Matters'}
              </h2>

              <p className="mt-2 text-muted-foreground">
                {isArabic
                  ? 'ساعدنا على تحسين الأدلة والمحتوى من خلال مشاركة ملاحظاتك.'
                  : 'Help us improve our guides and content by sharing your feedback.'}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-primary">
                <AppIcon
                  name="ShieldCheckIcon"
                  size={22}
                />
              </div>

              <h2 className="text-xl font-semibold">
                {isArabic
                  ? 'تصحيحات المحتوى'
                  : 'Content Corrections'}
              </h2>

              <p className="mt-2 text-muted-foreground">
                {isArabic
                  ? 'إذا وجدت معلومات تحتاج إلى تحديث أو تصحيح، أخبرنا بذلك.'
                  : 'If you find information that needs to be updated or corrected, please let us know.'}
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Contact Form                                                    */}
          {/* ---------------------------------------------------------------- */}

          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-2xl font-semibold">
              {isArabic
                ? 'أرسل لنا رسالة'
                : 'Send Us a Message'}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {isArabic
                ? 'اكتب رسالتك وسنراجعها في أقرب وقت ممكن.'
                : 'Send us your message and we will review it as soon as possible.'}
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  {isArabic
                    ? 'الاسم'
                    : 'Name'}
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={
                    isArabic
                      ? 'اكتب اسمك'
                      : 'Enter your name'
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  {isArabic
                    ? 'البريد الإلكتروني'
                    : 'Email'}
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={
                    isArabic
                      ? 'example@email.com'
                      : 'example@email.com'
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  {isArabic
                    ? 'الرسالة'
                    : 'Message'}
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder={
                    isArabic
                      ? 'اكتب رسالتك هنا...'
                      : 'Write your message here...'
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
              >
                {isArabic
                  ? 'إرسال الرسالة'
                  : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}