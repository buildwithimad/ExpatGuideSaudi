
interface SectionTitleProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export default function SectionTitle({
  label,
  title,
  description,
  align = 'left',
  className = '',
  titleAs = 'h2',
}: SectionTitleProps) {
  const TitleTag = titleAs;

  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : 'text-left items-start';

  return (
    <div
      className={`flex flex-col gap-3 ${alignClass} ${className}`}
    >
      {label && (
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          {label}
        </span>
      )}

      <TitleTag className="text-4xl font-bold tracking-tight">
        {title}
      </TitleTag>

      {description && (
        <p className="max-w-2xl text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}