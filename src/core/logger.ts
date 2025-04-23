import configModule, { levelColors } from '../config/logger.config';
import { formatDate, formatLogMessage } from '../config/utils';
import {
  LogLevel,
  type LoggerAdapter,
  type LoggerConfig,
} from './logger-types';

const adapters = new Map<string, LoggerAdapter>();

/**
 * Logs a message with the specified log level, tag, and additional arguments.
 *
 * @param level - The log level of the message (e.g., DEBUG, INFO, WARN, ERROR).
 * @param tag - A string tag to categorize the log message.
 * @param args - Additional arguments to include in the log message.
 *
 * The function checks the current logging configuration to determine if the
 * message should be logged based on the specified log level. If console logging
 * is enabled in the configuration, the message is formatted and printed to the
 * console with optional timestamp and color coding. Additionally, the message
 * is passed to all configured log adapters for further processing.
 *
 * If an adapter encounters an error during logging, the error is caught and
 * logged using the `Logger.error` method.
 */
const log = (level: LogLevel, tag: string, ...args: any[]): void => {
  const config = configModule.get();
  if (level < config.level) return;

  const message = formatLogMessage(level, tag, args);

  if (config.enableConsoleLogs) {
    const color = levelColors[level] || '';
    const reset = '\x1b[0m';
    const timestamp = config.formatTimestamp
      ? `[${formatDate(new Date())}] `
      : '';
    const levelName = LogLevel[level].padEnd(5);

    console.log(
      `${color}${timestamp}[${levelName}] [${tag}] ${message}${reset}`
    );
  }

  adapters.forEach((adapter) => {
    try {
      adapter.log(level, tag, message);
    } catch (error) {
      Logger.error('Logger', 'Adapter error:', error);
    }
  });
};

/**
 * Logger utility for managing and customizing logging behavior.
 * Provides methods to configure, reset, and interact with logging adapters,
 * as well as log messages at various levels.
 */
export const Logger = {
  /**
   * Configure the logger with a new configuration.
   *
   * This method allows you to update the logger's configuration by merging
   * the provided partial configuration with the existing configuration.
   *
   * @param newConfig - A partial configuration object to update the logger's settings.
   *
   * @example
   * ```typescript
   * Logger.configure({
   *   level: LogLevel.DEBUG,
   *   timestamp: true,
   * });
   * ```
   */
  configure: (newConfig: Partial<LoggerConfig>): void => {
    configModule.set(newConfig);
  },

  /**
   * Reset the logger to its default configuration.
   *
   * This method clears all registered adapters and restores the logger's
   * configuration to its default state.
   *
   * @example
   * ```typescript
   * Logger.reset();
   * ```
   */
  reset: (): void => {
    configModule.reset();
    adapters.clear();
  },

  /**
   * Register a new adapter for logging.
   *
   * This method allows you to add a custom adapter that implements the
   * LoggerAdapter interface. The adapter will receive log messages
   * according to its implementation of the log method.
   *
   * @param adapter - An object implementing the LoggerAdapter interface.
   *
   * @example
   * ```typescript
   * Logger.registerAdapter({
   *   log: (level, tag, message) => {
   *     // Custom logging logic here
   *     console.log(`[${level}] [${tag}] ${message}`);
   *   },
   * });
   * ```
   */
  registerAdapter: (adapter: LoggerAdapter): void => {
    if (!adapter || typeof adapter.log !== 'function') {
      throw new Error('Invalid adapter: must implement log method');
    }
    if (adapters.has(adapter.id)) {
      console.warn(`[Logger] Adapter "${adapter.id}" is already registered.`);
      return;
    }
    adapters.set(adapter.id, adapter);
  },

  /**
   * Unregister an existing adapter.
   *
   * This method removes a previously registered adapter from the logger.
   *
   * @param adapter - The adapter to unregister.
   * @returns `true` if the adapter was successfully unregistered, `false` otherwise.
   *
   * @example
   * ```typescript
   * const myAdapter = {
   *   id: 'myAdapterId'
   *   log: (level, tag, message) => {
   *     // Custom logging logic here
   *     console.log(`[${level}] [${tag}] ${message}`);
   *   },
   * };
   *
   * Logger.registerAdapter(myAdapter);
   * Logger.unregisterAdapter(myAdapter.id);
   * ```
   */
  unregisterAdapter: (id: string): void => {
    adapters.delete(id);
  },

  /**
   * Get the current log level
   */
  getLevel: (): LogLevel => configModule.get().level,

  /**
   * Set the log level
   *
   * @param level - The new log level to set.
   * @example
   * ```typescript
   * Logger.setLevel(LogLevel.INFO);
   * ```
   */
  setLevel: (level: LogLevel): void => {
    const config = configModule.get();
    config.level = level;
    configModule.set(config);
  },

  /**
   * Log a debug message
   *
   * @param tag - The tag to associate with the log message.
   * @param args - The message and additional arguments to log.
   *
   * @example
   * ```typescript
   * Logger.debug('MyTag', 'This is a debug message');
   * ```
   */
  debug: (tag: string, ...args: any[]): void =>
    log(LogLevel.DEBUG, tag, ...args),

  /**
   * Log an info message
   *
   * @param tag - The tag to associate with the log message.
   * @param args - The message and additional arguments to log.
   * /
   * @example
   *
   * ```typescript
   * Logger.info('MyTag', 'This is an info message');
   * ```
   * */
  info: (tag: string, ...args: any[]): void => log(LogLevel.INFO, tag, ...args),

  /**
   * Log a warning message
   *
   * @param tag - The tag to associate with the log message.
   * @param args - The message and additional arguments to log.
   *
   * @example
   * ```typescript
   * Logger.warn('MyTag', 'This is a warning message');
   * ```
   */
  warn: (tag: string, ...args: any[]): void => log(LogLevel.WARN, tag, ...args),

  /**
   * Log an error message
   *
   * @param tag - The tag to associate with the log message.
   * @param args - The message and additional arguments to log.
   *
   * @example
   * ```typescript
   * Logger.error('MyTag', 'This is an error message');
   * ```
   */
  error: (tag: string, ...args: any[]): void =>
    log(LogLevel.ERROR, tag, ...args),
};
