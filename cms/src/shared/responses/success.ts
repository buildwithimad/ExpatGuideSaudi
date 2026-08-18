import type { ApiSuccessResponse } from '@/shared/types';

export function successResponse<T>(data: T): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
  };
}