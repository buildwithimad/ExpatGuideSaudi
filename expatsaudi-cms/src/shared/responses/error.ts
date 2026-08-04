import type { ApiErrorResponse } from '@/shared/types';

export function errorResponse(
  code: string,
  message: string,
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}