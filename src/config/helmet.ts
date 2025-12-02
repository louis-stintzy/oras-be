import helmet from 'helmet';
import { env } from './env';

const isDev = env.NODE_ENV === 'development';
const isProd = env.NODE_ENV === 'production';

export const helmetConfig = helmet({
  contentSecurityPolicy: isDev
    ? false
    : {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", ...env.CORS_ORIGIN],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },

  crossOriginEmbedderPolicy: isProd,
  crossOriginOpenerPolicy: { policy: 'same-origin' },
  crossOriginResourcePolicy: { policy: 'same-origin' },

  frameguard: { action: 'deny' },

  hidePoweredBy: true,

  hsts: isDev
    ? false
    : {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },

  noSniff: true,

  referrerPolicy: { policy: 'same-origin' },
});
