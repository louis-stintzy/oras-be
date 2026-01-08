import type { StatusCode, ErrorCode, PublicErrorMessage } from './constants';

export type ErrorPayload = {
  publicMessage: PublicErrorMessage;
  internalMessage?: string;
  details?: unknown;
};

export class AppError extends Error {
  public readonly statusCode: StatusCode;
  public readonly errorCode: ErrorCode;
  public readonly payload: ErrorPayload;
  public readonly isOperational: boolean;

  constructor(
    statusCode: StatusCode,
    errorCode: ErrorCode,
    payload: ErrorPayload,
    isOperational = true
  ) {
    super(payload.internalMessage ?? payload.publicMessage);

    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.payload = payload;

    Error.captureStackTrace(this, this.constructor);
  }
}
