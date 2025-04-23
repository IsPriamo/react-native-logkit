import configModule from '../config/logger.config';
import { Logger } from '../core/logger';
import { DefaultAdapterType, LogLevel } from '../core/logger-types';

//@ts-ignore
let Sentry: typeof import('@sentry/react-native') | null = null;

/**
 * Registers a Sentry adapter for the Logger to handle log messages and errors.
 *
 * This function integrates Sentry with the Logger by registering an adapter
 * that processes log messages based on their severity level. If the log level
 * is `ERROR` or higher, the message is sent to Sentry as an error. For lower
 * severity levels, the message is added as a breadcrumb in Sentry.
 * @example
 * ```typescript
 * import { initSentryLogger } from 'react-native-logkit';
 *
 * // Initialize Sentry
 * Sentry.init({
 *  dsn: 'https://your-sentry-dsn',
 *  // other Sentry options...
 * });
 *
 * // Initialize the Sentry logger integration
 * initSentryLogger();
 *
 *
 * ```
 */
export const initSentryLogger = () => {
  const config = configModule.get();

  try {
    Sentry = require('@sentry/react-native');
  } catch (e) {
    Logger.warn(
      'SentryIntegration',
      `[@react-native-logkit] Sentry not installed. Skipping integration. Error: ${e}`
    );
    return;
  }

  Logger.registerAdapter({
    id: DefaultAdapterType.SENTRY,
    log: (level, tag, message) => {
      if (config.errorsToCapture?.includes(level)) {
        Sentry.captureMessage(`[${tag}] ${message}`, 'error');
      } else {
        Sentry.addBreadcrumb({
          category: tag,
          message,
          level: mapLogLevelToSentry(level),
        });
      }
    },
  });
};

/**
 * Maps internal logger levels to Sentry severity levels
 * @param level - The internal LogLevel to convert
 * @returns The corresponding Sentry.Severity level
 */
//@ts-ignore
const mapLogLevelToSentry = (level: LogLevel): Sentry.Severity => {
  //@ts-ignore
  const levelMap: Partial<Record<LogLevel, Sentry.Severity>> = {
    [LogLevel.DEBUG]: 'debug',
    [LogLevel.INFO]: 'info',
    [LogLevel.WARN]: 'warning',
    [LogLevel.ERROR]: 'error',
  };

  return levelMap[level] ?? 'info';
};
