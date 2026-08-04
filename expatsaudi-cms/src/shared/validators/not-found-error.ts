export class NotFoundError extends Error {
  public readonly code: string;

  public readonly status: number;

  constructor(
    code: string,
    message: string,
  ) {
    super(message);

    this.name = 'NotFoundError';

    this.code = code;

    this.status = 404;

    Error.captureStackTrace?.(this, NotFoundError);
  }
}