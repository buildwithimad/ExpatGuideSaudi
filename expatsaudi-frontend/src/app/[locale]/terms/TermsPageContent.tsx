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

export default function TermsPageContent({
  locale,
  dict,
}: Props) {
  return (
    <main className="pt-16 md:pt-[68px]">
      <section className="container-editorial py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <span className="label-caps text-primary">
              {dict.terms.label}
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {dict.terms.title}
            </h1>

            <p className="mt-4 max-w-3xl text-muted-foreground">
              {dict.terms.intro}
            </p>
          </div>

          <div className="space-y-10 text-foreground">
            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.acceptance.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.acceptance.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.content.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.content.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.accuracy.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.accuracy.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.externalLinks.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.externalLinks.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.intellectualProperty.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.intellectualProperty.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.liability.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.liability.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.changes.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.changes.content}
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold">
                {dict.terms.sections.contact.title}
              </h2>

              <p className="leading-7 text-muted-foreground">
                {dict.terms.sections.contact.content}
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}