'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Dictionary } from '@/lib/dictionary';

interface NewsletterSectionProps {
  dict?: Dictionary;
}

export default function NewsletterSection({ dict }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const t = dict?.newsletter;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="newsletter" className="py-16 md:py-20 border-b border-border">
      <div className="container-editorial">
        <div className="max-w-xl mx-auto text-center">
          <span className="label-caps text-primary mb-3 block">{t?.label ?? 'Newsletter'}</span>
          <h2 className="text-section-title text-foreground mb-4">
            {t?.title ?? 'Stay Updated on Saudi Regulations'}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            {t?.description ?? 'Get notified when we publish new guides, when Saudi regulations change, and when new tools go live. No spam — only relevant updates.'}
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-4 border border-border bg-muted">
              <Icon name="CheckCircleIcon" size={20} className="text-accent" />
              <p className="text-sm font-semibold text-foreground">
                {t?.success ?? 'You are subscribed. Welcome to ExpatSaudi.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t?.placeholder ?? 'your@email.com'}
                required
                className="input-field flex-grow py-3.5 sm:border-e-0"
              />
              <button type="submit" className="btn-primary py-3.5 px-6 text-sm flex-shrink-0" style={{ borderRadius: 0 }}>
                {t?.button ?? 'Subscribe'}
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            {t?.disclaimer ?? 'Free forever. Unsubscribe at any time.'}
          </p>
        </div>
      </div>
    </section>
  );
}