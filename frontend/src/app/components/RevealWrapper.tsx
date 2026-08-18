'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface RevealWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: 'up' | 'fade';
}

export default function RevealWrapper({
  children,
  className = '',
  delay = 0,
  type = 'up',
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${type === 'up' ? 'reveal-up' : 'reveal-fade'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}