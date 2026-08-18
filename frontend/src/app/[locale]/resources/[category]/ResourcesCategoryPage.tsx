'use client'

import Link from 'next/link'

import Icon from '@/components/ui/AppIcon'
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

      <section className="py-16 md:py-20 border-b border-border mt-20">
        <div className="container-editorial">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <Icon
              name="ArrowLeftIcon"
              size={14}
            />

            {t.backToHome}
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-muted flex items-center justify-center flex-shrink-0">
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

            <div>
              <span className="label-caps text-muted-foreground">
                {t.label}
              </span>

              <h1 className="text-3xl md:text-4xl font-semibold text-foreground mt-2">
                {categoryItem.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
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
                    className="resource-card flex flex-col gap-4 h-full bg-background group"
                  >
                    <div className="w-10 h-10 bg-muted flex items-center justify-center">
                      <Icon
                        name={
                          categoryIcon as Parameters<
                            typeof Icon
                          >[0]['name']
                        }
                        size={19}
                        className="text-accent"
                      />
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h2>

                      {resource.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {resource.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-2 flex items-center gap-1 text-primary">
                      <span className="text-xs font-semibold">
                        {t.viewResource}
                      </span>

                      <Icon
                        name="ArrowRightIcon"
                        size={12}
                      />
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