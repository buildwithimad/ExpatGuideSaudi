import {
    Skeleton,
    SkeletonImage,
    SkeletonText,
} from './';

export default function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-background border border-border">
      {/* Image */}
      <SkeletonImage />

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-grow">

        {/* Category + Reading Time */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-badge" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title */}
        <SkeletonText lines={2} />

        {/* Excerpt */}
        <SkeletonText lines={3} />

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <Skeleton className="h-4 w-16" />

        </div>
      </div>
    </div>
  );
}