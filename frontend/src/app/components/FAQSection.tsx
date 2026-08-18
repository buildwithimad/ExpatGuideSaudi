'use client'

import Icon from '@/components/ui/AppIcon'
import type { Dictionary } from '@/lib/dictionary'
import { useState } from 'react'
import SectionTitle from './SectionTitle'

interface FAQSectionProps {
  dict?: Dictionary
  locale: string
  faqs: {
    docs: {
      id: number
      question: string
      answer: any
    }[]
  }
}

export default function FAQSection({
  dict,
  locale,
  faqs,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null)

  const t = dict?.faq

  const toggle = (i: number) => {
    setOpenIndex(
      openIndex === i ? null : i,
    )
  }

  return (
    <section className="py-16 md:py-20 border-b border-border section-bg">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Section Header */}
          <div className="lg:col-span-4">
            <SectionTitle
              label={t?.label ?? 'FAQ'}
              title={
                t?.title ??
                'Frequently Asked Questions'
              }
              description={
                t?.description ??
                'Quick answers to the most common questions from expats living in Saudi Arabia.'
              }
            />
          </div>

          {/* FAQ List */}
          <div className="lg:col-span-8">
            <div>
              {faqs.docs.map((faq, i) => (
                <div
                  key={faq.id}
                  className="faq-item"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full py-5 flex items-start justify-between gap-4 text-left group"
                    aria-expanded={
                      openIndex === i
                    }
                  >
                    <span className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>

                    <span className="flex-shrink-0 mt-0.5">
                      <Icon
                        name={
                          openIndex === i
                            ? 'ChevronUpIcon'
                            : 'ChevronDownIcon'
                        }
                        size={16}
                        className="text-muted-foreground"
                      />
                    </span>
                  </button>

                  {openIndex === i && (
                    <div className="pb-5">
                      <div className="text-sm text-muted-foreground leading-relaxed">
                        {getFAQText(faq.answer)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                         Extract FAQ Text                                   */
/* -------------------------------------------------------------------------- */

function getFAQText(answer: any): string {
  const children =
    answer?.root?.children ?? []

  return children
    .map((node: any) =>
      node?.children
        ?.map((child: any) => child?.text ?? '')
        .join('') ?? '',
    )
    .join(' ')
}