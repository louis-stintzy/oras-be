import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import v1Router from './routes/v1';
import { helmetConfig } from './config/helmet';
import { httpLogger } from './logger/httpLogger';
import { apiRateLimiter, healthRateLimiter } from './config/rateLimit';
import { corsOptions } from './config/cors';

export function createApp() {
  const app = express();

  // Trust proxy settings
  app.set('trust proxy', true);

  // Disable x-powered-by header
  app.disable('x-powered-by');

  // Health check route
  app.get('/health', healthRateLimiter, (_: Request, res: Response) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'Service is healthy',
    });
  });

  // Middlewares
  app.use(httpLogger);
  app.use(helmetConfig);
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Welcome route
  app.get('/', (_: Request, res: Response) => {
    res.send('Welcome to the Oras App Backend !');
  });

  // favicon.ico route
  app.get('/favicon.ico', (_: Request, res: Response) => {
    res.status(204).end();
  });

  // API routes & rate limiting
  app.use('/api/v1', apiRateLimiter, v1Router);

  // 404 handler
  app.use((_: Request, res: Response) => {
    res.status(404).json({
      status: 'Not Found',
      timestamp: new Date().toISOString(),
      message: 'The requested resource was not found',
    });
  });

  // Error handler

  return app;
}
