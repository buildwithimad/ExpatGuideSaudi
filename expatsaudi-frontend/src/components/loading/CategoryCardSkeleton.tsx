import {
    Skeleton,
    SkeletonText,
} from './';

export default function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col h-full border border-border bg-background p-6">

      <div className="mb-5">
        <Skeleton className="w-12 h-12 rounded-md" />
      </div>

      <Skeleton className="h-5 w-36 mb-3" />

      <SkeletonText lines={2} />

      <div className="mt-auto pt-5">
        <Skeleton className="h-4 w-20" />
      </div>

    </div>
  );
}