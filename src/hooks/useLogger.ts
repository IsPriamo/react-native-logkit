import { useMemo } from 'react';
import { Logger } from '../core/logger';

/**
 * A custom hook that provides a set of logging methods (debug, info, warn, error)
 * scoped to a specific tag. The tag is used to categorize or identify log messages.
 *
 * @param tag - A string representing the tag to associate with the log messages.
 * @returns An object containing logging methods:
 * - `debug`: Logs debug-level messages.
 * - `info`: Logs informational messages.
 * - `warn`: Logs warning messages.
 * - `error`: Logs error messages.
 *
 * Each logging method accepts a variable number of arguments, which are passed
 * to the underlying logger along with the tag.
 *
 * @example
 * ```typescript
 * const logger = useLogger('MyComponent');
 * logger.debug('This is a debug message');
 * logger.info('This is an info message');
 * logger.warn('This is a warning message');
 * logger.error('This is an error message');
 * ```
 */
export const useLogger = (tag: string) => {
  return useMemo(() => {
    return {
      /**
       * Logs a debug message with the specified tag.
       * @param args - The message and additional arguments to log.
       *
       * @example
       * ```typescript
       * logger.debug('This is a debug message');
       * ```
       */
      debug: (...args: any[]) => Logger.debug(tag, ...args),
      /**
       * Logs an info message with the specified tag.
       * @param args - The message and additional arguments to log.
       *
       * @example
       * ```typescript
       * logger.info('This is an info message');
       * ```
       * */
      info: (...args: any[]) => Logger.info(tag, ...args),
      /**
       * Logs a warning message with the specified tag.
       * @param args - The message and additional arguments to log.
       *
       * @example
       * ```typescript
       * logger.warn('This is a warning message');
       * ```
       */
      warn: (...args: any[]) => Logger.warn(tag, ...args),
      /**
       * Logs an error message with the specified tag.
       * @param args - The message and additional arguments to log.
       *
       * @example
       * ```typescript
       * logger.error('This is an error message');
       * ```
       */
      error: (...args: any[]) => Logger.error(tag, ...args),
    };
  }, [tag]);
};
