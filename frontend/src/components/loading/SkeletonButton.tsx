import Skeleton from './Skeleton';

interface SkeletonButtonProps {
  className?: string;
}

export default function SkeletonButton({
  className,
}: SkeletonButtonProps) {
  return (
    <Skeleton
      className={`h-10 w-32 rounded-btn ${className ?? ''}`}
    />
  );
}