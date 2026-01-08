export const HTTP_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type StatusCode =
  (typeof HTTP_STATUS_CODES)[keyof typeof HTTP_STATUS_CODES];

export const ERROR_CODES = {
  BAD_REQUEST: 'ERR_BAD_REQUEST',
  VALIDATION_FAILED: 'ERR_VALIDATION_FAILED',
  AUTHENTICATION_FAILED: 'ERR_AUTHENTICATION_FAILED',
  TOKEN_EXPIRED: 'ERR_TOKEN_EXPIRED',
  TOKEN_INVALID: 'ERR_TOKEN_INVALID',
  PERMISSION_DENIED: 'ERR_PERMISSION_DENIED',
  NOT_FOUND: 'ERR_NOT_FOUND',
  CONFLICT: 'ERR_CONFLICT',
  RATE_LIMIT: 'ERR_RATE_LIMIT',
  INTERNAL_ERROR: 'ERR_INTERNAL_ERROR',
  DATABASE: 'ERR_DATABASE',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const ERROR_MESSAGES = {
  BAD_REQUEST: 'Bad request.',
  VALIDATION_FAILED: 'Invalid data provided.',
  AUTHENTICATION_FAILED: 'Authentication failed.',
  TOKEN_EXPIRED: 'The provided token has expired.',
  TOKEN_INVALID: 'The provided token is invalid.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  CONFLICT: 'A conflict occurred with the current state of the resource.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  INTERNAL_ERROR: 'An unexpected error occurred.',
  DATABASE: 'A database error occurred.',
} as const;

export type PublicErrorMessage =
  (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
