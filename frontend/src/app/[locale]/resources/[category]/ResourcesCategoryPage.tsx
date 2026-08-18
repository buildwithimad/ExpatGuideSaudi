'use client'

import Link from 'next/link'

import Icon from '@/components/ui/AppIcon'
import AppImage from '@/components/ui/AppImage'
import type { Resource } from '@/lib/api/resources'
import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/i18n-config'

import RevealWrapper from '@/app/components/RevealWrapper'

interface ResourcesCategoryPageProps {
  dict: Dictionary
  locale: Locale
  category:
    | 'government-services'
    | 'useful-apps'
    | 'emergency-numbers'
    | 'public-services'
  resources: Resource[]
}

const categoryIcons = {
  'government-services': 'BuildingOfficeIcon',
  'useful-apps': 'DevicePhoneMobileIcon',
  'emergency-numbers': 'PhoneIcon',
  'public-services': 'BuildingLibraryIcon',
} as const

const categoryKeys = {
  'government-services': 'government',
  'useful-apps': 'apps',
  'emergency-numbers': 'emergency',
  'public-services': 'public',
} as const

export default function ResourcesCategoryPage({
  dict,
  locale,
  category,
  resources,
}: ResourcesCategoryPageProps) {
  const t = dict.resources

  const categoryKey = categoryKeys[category]
  const categoryItem = t.items[categoryKey]
  const categoryIcon = categoryIcons[category]

  return (
    <main>
      {/* -------------------------------------------------------------------------- */}
      {/* Header                                                                     */}
      {/* -------------------------------------------------------------------------- */}

      <section className="mt-20 border-b border-border py-16 md:py-20">
        <div className="container-editorial">
          <Link
            href={`/${locale}`}
            className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon name="ArrowLeftIcon" size={14} />

            {t.backToHome}
          </Link>

          <div className="flex items-start gap-4">
            {/* Category Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-muted">
              <Icon
                name={
                  categoryIcon as Parameters<
                    typeof Icon
                  >[0]['name']
                }
                size={22}
                className="text-primary"
              />
            </div>

            {/* Category Information */}
            <div>
              <span className="label-caps text-muted-foreground">
                {t.label}
              </span>

              <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-4xl">
                {categoryItem.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {t.categoryDescriptions[category]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* Resources                                                                  */}
      {/* -------------------------------------------------------------------------- */}

      <section className="py-16 md:py-20">
        <div className="container-editorial">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, i) => (
                <RevealWrapper
                  key={resource.id}
                  delay={i * 50}
                  type="up"
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-card group flex h-full flex-col overflow-hidden bg-background p-0"
                  >
                    {/* ---------------------------------------------------------------- */}
                    {/* Resource Image                                                    */}
                    {/* ---------------------------------------------------------------- */}

                    <div className="relative aspect-[1730/909] w-full overflow-hidden bg-muted">
                      {resource.icon ? (
                        <AppImage
                          src={resource.icon.url}
                          alt={
                            resource.icon.alt ||
                            resource.title
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Icon
                            name={
                              categoryIcon as Parameters<
                                typeof Icon
                              >[0]['name']
                            }
                            size={36}
                            className="text-accent"
                          />
                        </div>
                      )}
                    </div>

                    {/* ---------------------------------------------------------------- */}
                    {/* Resource Content                                                  */}
                    {/* ---------------------------------------------------------------- */}

                    <div className="flex flex-1 flex-col p-6">
                      <div>
                        <h2 className="mb-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                          {resource.title}
                        </h2>

                        {resource.description && (
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {resource.description}
                          </p>
                        )}
                      </div>

                      {/* ---------------------------------------------------------------- */}
                      {/* Resource Link                                                     */}
                      {/* ---------------------------------------------------------------- */}

                      <div className="mt-auto flex items-center gap-1 pt-6 text-primary">
                        <span className="text-xs font-semibold">
                          {t.viewResource}
                        </span>

                        <Icon
                          name="ArrowRightIcon"
                          size={12}
                        />
                      </div>
                    </div>
                  </a>
                </RevealWrapper>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-muted-foreground">
                {t.noResources}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}