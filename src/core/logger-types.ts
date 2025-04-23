import { Platform } from 'react-native';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
  PERF = 5,
  MID = 6,
}

export enum DefaultAdapterType {
  CRASHLYTICS = 'crashlytics',
  SENTRY = 'sentry',
}

export const Env = {
  isDev: __DEV__,
  isProd: !__DEV__,
  platform: Platform.OS,
};

export interface LoggerAdapter {
  id: string;
  log: (level: LogLevel, tag: string, message: string) => void;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsoleLogs: boolean;
  enablePerformanceLogs: boolean;
  enableMiddlewareLogs: boolean;
  formatTimestamp: boolean;
  errorsToCapture?: number[];
}
