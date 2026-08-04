export interface PaginationDTO {
  /**
   * Current page.
   */
  page: number;

  /**
   * Number of items per page.
   */
  limit: number;

  /**
   * Total number of documents.
   */
  totalDocs: number;

  /**
   * Total number of pages.
   */
  totalPages: number;

  /**
   * Whether a previous page exists.
   */
  hasPrevPage: boolean;

  /**
   * Whether a next page exists.
   */
  hasNextPage: boolean;

  /**
   * Previous page number.
   */
  prevPage: number | null;

  /**
   * Next page number.
   */
  nextPage: number | null;
}