import Skeleton from './Skeleton';

interface SkeletonImageProps {
  className?: string;
}

export default function SkeletonImage({
  className,
}: SkeletonImageProps) {
  return (
    <Skeleton
      className={`aspect-[16/9] w-full ${className ?? ''}`}
    />
  );
}