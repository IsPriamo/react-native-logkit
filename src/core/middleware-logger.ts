import configModule, { levelColors } from '../config/logger.config';
import { formatDate, formatLogMessage } from '../config/utils';
import { LogLevel } from './logger-types';

const config = configModule.get();

const log = (level: LogLevel, tag: string, ...args: any[]) => {
  if (config.enableMiddlewareLogs) {
    const message = formatLogMessage(LogLevel.MID, tag, args);
    const color = levelColors[level]; // PERF color
    const timestamp = config.formatTimestamp
      ? `[${formatDate(new Date())}] `
      : '';
    const levelName = LogLevel[level];

    console.log(`${color}${timestamp}[${levelName}] ${message}`);
  }
};

/**
 * A performance logger utility for logging messages with a specific tag and arguments.
 * This logger is designed to log messages at the performance (`PERF`) log level.
 *
 * @example
 * ```typescript
 * MiddlewareLogger.log('ComponentRender', 'Rendering started', { component: 'MyComponent' });
 * ```
 *
 * @param tag - A string representing the tag associated with the log message.
 * @param args - Additional arguments to include in the log message.
 */
export const MiddlewareLogger = {
  log: (tag: string, ...args: any[]) => log(LogLevel.MID, tag, ...args),
};
