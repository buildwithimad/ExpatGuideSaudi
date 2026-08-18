export class ValidationError extends Error {
  public readonly code: string;

  public readonly status: number;

  constructor(
    code: string,
    message: string,
    status = 400,
  ) {
    super(message);

    this.name = 'ValidationError';

    this.code = code;

    this.status = status;

    Error.captureStackTrace?.(this, ValidationError);
  }
}