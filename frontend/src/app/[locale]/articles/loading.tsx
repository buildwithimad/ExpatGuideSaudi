import {
    ArticleCardSkeleton,
    GridSkeleton,
    HeroSkeleton,
} from '@/components/loading';

export default function Loading() {
  return (
    <main className="pt-16 md:pt-[68px]">
      <HeroSkeleton />

      <section className="py-12 md:py-16">
        <div className="container-editorial">
          <GridSkeleton
            count={9}
            renderItem={ArticleCardSkeleton}
          />
        </div>
      </section>
    </main>
  );
}