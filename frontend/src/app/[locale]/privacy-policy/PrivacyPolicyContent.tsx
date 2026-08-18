'use client';

import type { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/lib/i18n-config';

type Dictionary = Awaited<
  ReturnType<typeof getDictionary>
>;

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function PrivacyPolicyContent({
  locale,
  dict,
}: Props) {
  const isArabic = locale === 'ar';

  return (
    <main className="pt-16 md:pt-[68px]">
      <section className="container-editorial py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <span className="label-caps text-primary">
              {dict.privacy.label}
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {dict.privacy.title}
            </h1>

            <p className="mt-4 max-w-3xl text-muted-foreground">
              {dict.privacy.intro}
            </p>
          </div>

          <div className="space-y-10 text-foreground">
            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.privacy.sections.information.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.privacy.sections.information.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.privacy.sections.usage.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.privacy.sections.usage.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.privacy.sections.cookies.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.privacy.sections.cookies.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.privacy.sections.thirdParty.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.privacy.sections.thirdParty.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.privacy.sections.security.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.privacy.sections.security.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.privacy.sections.contact.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.privacy.sections.contact.content}
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}