import { Skeleton } from './';

export default function CategoryCardSkeleton() {
  return (
    <div
      className="flex flex-col h-full bg-background border border-border overflow-hidden animate-pulse"
      aria-hidden="true"
    >
      {/* Image Area */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[3/2] border-b border-border bg-muted flex items-center justify-center p-8 sm:p-10 lg:p-12">
    <div className="flex items-center justify-center">
        <Skeleton className="w-32 h-24 rounded-xl" />
    </div>
</div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 lg:p-6">
        {/* Title */}
        <Skeleton className="h-6 w-40 mb-4 rounded" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <Skeleton className="h-3 w-20 rounded" />

          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}