import type { Dictionary } from '@/lib/dictionary'
import type { Locale } from '@/lib/i18n-config'

import ResourceCategoryLink from '@/components/Home/ResourceCategoryLink'
import RevealWrapper from './RevealWrapper'
import SectionTitle from './SectionTitle'

interface ResourcesSectionProps {
  dict?: Dictionary
  locale?: Locale
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

const resourceCategories = [
  'government-services',
  'useful-apps',
  'emergency-numbers',
  'public-services',
] as const

export default function ResourcesSection({
  dict,
  locale = 'en',
}: ResourcesSectionProps) {
  const t = dict?.resources

  return (
    <section className="border-b border-border py-20 md:py-24">
      <div className="container-editorial p-4">
        {/* Section heading */}
        <SectionTitle
          label={t?.label ?? 'Quick Reference'}
          title={t?.title ?? 'Saudi Resources'}
          description={
            t?.description ??
            'Essential reference guides and external links for everyday expat needs.'
          }
          className="mb-12 md:mb-14"
        />

        {/* Resource cards */}
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {resourceCategories.map((category, i) => {
            const icon = categoryIcons[category]
            const key = categoryKeys[category]
            const item = t?.items?.[key]

            return (
              <RevealWrapper
                key={category}
                delay={i * 60}
                type="up"
              >
                <ResourceCategoryLink
                  href={`/${locale}/resources/${category}`}
                  title={item?.title ?? category}
                  description={item?.description ?? ''}
                  icon={icon}
                  viewLabel={
                    t?.viewResource ?? 'View Resource'
                  }
                />
              </RevealWrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}