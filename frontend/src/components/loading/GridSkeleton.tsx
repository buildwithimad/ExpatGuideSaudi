import type { ComponentType } from 'react';

interface GridSkeletonProps {
  count?: number;
  columns?: string;
  renderItem: ComponentType;
}

export default function GridSkeleton({
  count = 6,
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  renderItem: Item,
}: GridSkeletonProps) {
  return (
    <div className={`grid ${columns} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <Item key={index} />
      ))}
    </div>
  );
}