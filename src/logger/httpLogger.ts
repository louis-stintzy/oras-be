import morgan from 'morgan';
import logger from './logger';

morgan.token('real-ip', (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (Array.isArray(forwarded)) return forwarded.join(', ');
  return forwarded ?? req.socket.remoteAddress ?? '';
});

export const httpLogger = morgan(
  ':real-ip - :method :url :status :res[content-length] :response-time ms',
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  }
);
