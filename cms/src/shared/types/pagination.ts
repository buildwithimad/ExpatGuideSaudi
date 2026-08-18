export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  totalPages: number;
  totalDocs: number;

  hasNextPage: boolean;
  hasPrevPage: boolean;
}