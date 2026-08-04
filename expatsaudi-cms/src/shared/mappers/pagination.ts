import type { PaginationDTO } from '@/shared/dto/pagination';
import type { PaginatedDocs } from 'payload';

export function mapPagination<T>(
  result: PaginatedDocs<T>,
): PaginationDTO {
  return {
    page: result.page ?? 1,

    limit: result.limit,

    totalDocs: result.totalDocs,

    totalPages: result.totalPages ?? 1,

    hasPrevPage: result.hasPrevPage ?? false,

    hasNextPage: result.hasNextPage ?? false,

    prevPage: result.prevPage ?? null,

    nextPage: result.nextPage ?? null,
  };
}