'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import SectionTitle from './SectionTitle';
import type { Dictionary } from '@/lib/dictionary';

interface FAQSectionProps {
  dict?: Dictionary;
}

export default function FAQSection({ dict }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = dict?.faq;

  const faqs = t?.items ?? [
    { question: 'What is an Iqama and why do I need it?', answer: 'An Iqama (إقامة) is a residency permit issued to all expatriates living and working in Saudi Arabia.' },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-16 md:py-20 border-b border-border section-bg">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionTitle
              label={t?.label ?? 'FAQ'}
              title={t?.title ?? 'Frequently Asked Questions'}
              description={t?.description ?? 'Quick answers to the most common questions from expats living in Saudi Arabia.'}
            />
          </div>

          <div className="lg:col-span-8">
            <div>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    onClick={() => toggle(i)}
                    className="w-full py-5 flex items-start justify-between gap-4 text-left group"
                    aria-expanded={openIndex === i}
                  >
                    <span className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 mt-0.5">
                      <Icon
                        name={openIndex === i ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                        size={16}
                        className="text-muted-foreground"
                      />
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}