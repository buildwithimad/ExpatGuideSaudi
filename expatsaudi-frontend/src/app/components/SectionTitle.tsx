import React from 'react';

interface SectionTitleProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionTitle({
  label,
  title,
  description,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {label && (
        <span className="label-caps text-primary">{label}</span>
      )}
      <h2 className="text-section-title text-foreground">{title}</h2>
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}