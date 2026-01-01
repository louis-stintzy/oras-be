import { CorsOptions } from 'cors';
import { env } from './env';
import logger from '../logger/logger';

const isTest = env.NODE_ENV === 'test';
const isDev = env.NODE_ENV === 'development';

/**
 * Validate the origin of the CORS request.
 * Development and test environments allow requests without an origin.
 * @param origin - The origin of the request.
 * @param callback - The callback to indicate whether the origin is allowed.
 */
const originValidator: CorsOptions['origin'] = (
  origin: string | undefined,
  callback: (err: Error | null, allow?: boolean) => void
) => {
  if (!origin && (isDev || isTest)) {
    logger.debug(
      'CORS request without origin in development/test mode, allowing'
    );
    return callback(null, true);
  }

  if (origin && env.CORS_ORIGIN.includes(origin)) {
    logger.debug(`CORS request from allowed origin: ${origin}`);
    return callback(null, true);
  }

  logger.warn(`CORS blocked request from origin: ${origin ?? 'unknown'}`);
  callback(
    new Error(`CORS policy: origin ${origin ?? 'unknown'} is not allowed`)
  );
};

/**
 * CORS Configuration
 */
export const corsOptions: CorsOptions = {
  origin: originValidator,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
