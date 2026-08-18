import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-muted',
        'before:absolute before:inset-0',
        'before:-translate-x-full',
        'before:animate-shimmer',
        'before:bg-gradient-to-r',
        'before:from-transparent',
        'before:via-white/40',
        'before:to-transparent',
        className,
      )}
    />
  );
}