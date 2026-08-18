'use client';

import type { Locale } from '@/lib/i18n-config';

type DisclaimerSection = {
  title: string;
  paragraphs: string[];
};

type DisclaimerContent = {
  title: string;
  intro: string;
  sections: DisclaimerSection[];
  finalNote: string;
  lastUpdated: string;
};

type Props = {
  locale: Locale;
  dict: {
    disclaimer: DisclaimerContent;
  };
};

export default function DisclaimerPageContent({
  locale,
  dict,
}: Props) {
  const page = dict.disclaimer;

  const isRTL =
    locale === 'ur' ||
    locale === 'ar';

  return (
    <main
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-background mt-24"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}

      <section className="border-b border-border bg-muted/30">
        <div className="container-editorial px-6 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl">
            

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {page.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              {page.intro}
            </p>

            <p className="mt-5 text-sm font-medium text-muted-foreground">
              {page.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Disclaimer Content                                               */}
      {/* ---------------------------------------------------------------- */}

      <section className="container-editorial px-6 py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <article className="space-y-10">
            {page.sections.map(
              (section) => (
                <section
                  key={section.title}
                  className="border-b border-border pb-10 last:border-b-0"
                >
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {section.title}
                  </h2>

                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map(
                      (paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-8 text-muted-foreground sm:text-[17px]"
                        >
                          {paragraph}
                        </p>
                      ),
                    )}
                  </div>
                </section>
              ),
            )}

            {/* ---------------------------------------------------------- */}
            {/* Final Notice                                                */}
            {/* ---------------------------------------------------------- */}

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
              <p className="text-base font-medium leading-8 text-foreground">
                {page.finalNote}
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}