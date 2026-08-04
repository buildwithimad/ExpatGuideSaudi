import {
    ArticleCardSkeleton,
    CategoryCardSkeleton,
    FeaturedGuideSkeleton,
    GridSkeleton,
    HeroSkeleton,
    SectionHeaderSkeleton,
} from '@/components/loading';

export default function Loading() {
  return (
    <main className="pt-16 md:pt-[68px]">

      {/* Hero */}
      <HeroSkeleton />

      {/* Featured Guide */}
      <section className="py-16 border-b border-border">
        <div className="container-editorial">
          <SectionHeaderSkeleton />
          <FeaturedGuideSkeleton />
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 border-b border-border">
        <div className="container-editorial">
          <SectionHeaderSkeleton />

          <GridSkeleton
            count={6}
            renderItem={ArticleCardSkeleton}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container-editorial">
          <SectionHeaderSkeleton />

          <GridSkeleton
            count={8}
            renderItem={CategoryCardSkeleton}
          />
        </div>
      </section>

    </main>
  );
}