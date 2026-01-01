import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { env } from './env';
import type { Request, Response } from 'express';
import logger from '../logger/logger';

const isTest = env.NODE_ENV === 'test';
const isDev = env.NODE_ENV === 'development';

/**
 * Get the client IP address from the request.
 * @param req - The request object.
 * @returns The IP address of the client.
 */
const keyGenerator = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded && typeof forwarded === 'string') {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return ipKeyGenerator(first);
  }
  return req.ip
    ? ipKeyGenerator(req.ip)
    : req.socket.remoteAddress
      ? ipKeyGenerator(req.socket.remoteAddress)
      : ipKeyGenerator('unknown');
};

/**
 * Action to perform when rate limit is exceeded.
 * @param req - The request object.
 */
const onLimitReached = (req: Request) => {
  logger.warn(`Rate limit exceeded for IP: ${keyGenerator(req)}`);
};

/**
 * API Rate Limiter Configuration
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 300 : 100, // limit each IP to 300 requests per windowMs in development, 100 in production
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: () => isTest, // Skip rate limiting in test environment
  keyGenerator,
  handler: (req: Request, res: Response) => {
    onLimitReached(req);
    res.status(429).json({
      error: 'TOO_MANY_REQUESTS',
      message: 'Too many requests, please try again later.',
    });
  },
});

/**
 * Health Check Rate Limiter Configuration
 */
export const healthRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: () => isTest, // Skip rate limiting in test environment
  keyGenerator,
  handler: (req: Request, res: Response) => {
    onLimitReached(req);
    res.status(429).json({
      error: 'TOO_MANY_HEALTH_CHECKS',
      message: 'Too many health check requests.',
    });
  },
});
