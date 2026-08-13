'use client';

import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const quickLinks = [
  {
    label: 'Home',
    href: '/',
    icon: 'HomeIcon',
  },
  {
    label: 'Articles',
    href: '/articles',
    icon: 'DocumentTextIcon',
  },
  {
    label: 'Categories',
    href: '/categories',
    icon: 'Squares2X2Icon',
  },
  {
    label: 'Tools',
    href: '/tools',
    icon: 'WrenchScrewdriverIcon',
  },
  {
    label: 'About URExpat',
    href: '/about',
    icon: 'InformationCircleIcon',
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: 'EnvelopeIcon',
  },
];

const popularLinks = [
  {
    label: 'Iqama & Residency',
    href: '/categories/iqama-residency',
  },
  {
    label: 'Visas & Immigration',
    href: '/categories/visas-immigration',
  },
  {
    label: 'Work & Employment',
    href: '/categories/work-employment',
  },
  {
    label: 'Government Services',
    href: '/categories/government-services',
  },
];

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ------------------------------------------------------------------ */}
      {/* Main 404                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-b border-border">
        <div className="container-editorial px-4 py-20 sm:px-6 sm:py-24 md:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Label */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-primary/40" />

              <span className="label-caps text-primary">
                Error 404
              </span>

              <span className="h-px w-8 bg-primary/40" />
            </div>

            {/* 404 */}
            <div
              aria-hidden="true"
              className="select-none text-[7rem] font-bold leading-none tracking-[-0.08em] text-primary/10 sm:text-[9rem] md:text-[11rem] lg:text-[13rem]"
            >
              404
            </div>

            {/* Heading */}
            <h1 className="-mt-8 mb-4 text-2xl font-bold tracking-tight text-foreground sm:-mt-10 sm:text-3xl md:-mt-12 md:text-4xl lg:text-5xl">
              Page not found
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              The page you are looking for may have been moved,
              removed, or the address may be incorrect. Let&apos;s
              get you back to useful information.
            </p>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleGoBack}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 sm:w-auto"
              >
                <Icon
                  name="ArrowLeftIcon"
                  size={17}
                />

                Go Back
              </button>

              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground sm:w-auto"
              >
                <Icon
                  name="HomeIcon"
                  size={17}
                />

                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Quick Navigation                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-b border-border">
        <div className="container-editorial px-4 py-12 sm:px-6 md:py-16">
          <div className="mb-7">
            <span className="label-caps mb-2 block text-primary">
              Quick Navigation
            </span>

            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Where would you like to go?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-3 lg:grid-cols-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-[120px] flex-col justify-between bg-background p-4 transition-colors duration-200 hover:bg-muted/40 sm:p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon
                    name={
                      link.icon as Parameters<
                        typeof Icon
                      >[0]['name']
                    }
                    size={19}
                  />
                </div>

                <span className="mt-6 text-sm font-semibold text-foreground">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Popular Topics                                                      */}
      {/* ------------------------------------------------------------------ */}

      <section className="section-bg">
        <div className="container-editorial px-4 py-12 sm:px-6 md:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Left */}
            <div className="lg:col-span-4">
              <span className="label-caps mb-2 block text-primary">
                Popular Topics
              </span>

              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Find what you need
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Explore some of the most useful topics for
                expatriates living and working in Saudi Arabia.
              </p>
            </div>

            {/* Links */}
            <div className="lg:col-span-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {popularLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-lg border border-border bg-background px-5 py-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/30"
                  >
                    <span className="text-sm font-semibold text-foreground sm:text-base">
                      {link.label}
                    </span>

                    <Icon
                      name="ArrowRightIcon"
                      size={17}
                      className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom CTA                                                          */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-t border-border">
        <div className="container-editorial px-4 py-10 sm:px-6 md:py-12">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Still looking for something?
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Search URExpat for guides and information.
              </p>
            </div>

            <Link
              href="/search"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
            >
              <Icon
                name="MagnifyingGlassIcon"
                size={17}
              />

              Search URExpat
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}