import {
    Skeleton,
    SkeletonText,
} from './';

export default function HeroSkeleton() {
  return (
    <section className="py-20 border-b border-border">
      <div className="container-editorial">

        <Skeleton className="h-5 w-32 mb-6" />

        <Skeleton className="h-14 w-3/4 mb-6" />

        <SkeletonText lines={3} />

        <div className="flex gap-4 mt-10">
          <Skeleton className="h-11 w-44 rounded-btn" />
          <Skeleton className="h-11 w-36 rounded-btn" />
        </div>

      </div>
    </section>
  );
}