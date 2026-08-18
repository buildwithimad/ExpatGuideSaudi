import {
    Skeleton,
    SkeletonImage,
    SkeletonText,
} from './';

export default function FeaturedGuideSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 border border-border">

      <SkeletonImage className="aspect-[16/9] lg:h-full" />

      <div className="p-10 flex flex-col justify-between">

        <div>

          <div className="flex items-center gap-3 mb-5">
            <Skeleton className="h-5 w-24 rounded-badge" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          <SkeletonText lines={2} />

          <div className="mt-6">
            <SkeletonText lines={4} />
          </div>

        </div>

        <div className="flex items-center justify-between border-t border-border pt-6">

          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>

          <Skeleton className="h-10 w-40 rounded-btn" />

        </div>

      </div>

    </div>
  );
}