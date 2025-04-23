import { LogLevel, type LoggerConfig } from '../core/logger-types';

/**
 * ANSI color codes for different log levels
 */
export const levelColors = {
  [LogLevel.DEBUG]: '\x1b[36m', // cyan
  [LogLevel.INFO]: '\x1b[32m', // green
  [LogLevel.WARN]: '\x1b[33m', // yellow
  [LogLevel.ERROR]: '\x1b[31m', // red
  [LogLevel.SILENT]: '', // no color for silent
  [LogLevel.PERF]: '\x1b[93m', // yellowBright
  [LogLevel.MID]: '\x1b[97m', // whiteBright
};

/**
 * Default logger configuration
 */
export const DEFAULT_CONFIG: LoggerConfig = {
  level: LogLevel.DEBUG,
  enableConsoleLogs: true,
  enablePerformanceLogs: true,
  enableMiddlewareLogs: true,
  formatTimestamp: true,
  errorsToCapture: [LogLevel.ERROR],
};

/**
 * Configuration module with private state
 */
const configModule = (() => {
  let _config = { ...DEFAULT_CONFIG };

  return {
    /**
     * Get a copy of the current configuration
     */
    get: (): LoggerConfig => ({ ..._config }),

    /**
     * Update configuration by merging with existing values
     */
    set: (newConfig: Partial<LoggerConfig>): void => {
      _config = { ..._config, ...newConfig };
    },

    /**
     * Reset configuration to defaults
     */
    reset: (): void => {
      _config = { ...DEFAULT_CONFIG };
    },
  };
})();

export default configModule;
