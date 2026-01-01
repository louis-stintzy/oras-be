import { addColors, createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'cyan',
};

addColors(customColors);

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.printf(
    ({ timestamp, level, message, stack }) =>
      `[${timestamp}] ${level}: ${message} ${stack ? '\n' + stack : ''}`
  )
);

const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.json()
);

const logger = createLogger({
  levels: customLevels,
  level: 'http',
  transports: [
    new transports.Console({
      format: consoleFormat,
    }),
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '14d',
      maxSize: '10m',
      format: fileFormat,
    }),
  ],
});

export default logger;
