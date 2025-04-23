import { Logger } from '../core/logger';
import configModule from '../config/logger.config';
import { DefaultAdapterType } from '../core/logger-types';

let crashlytics: ReturnType<
  //@ts-ignore
  typeof import('@react-native-firebase/crashlytics').default
> | null = null;

export const initCrashlyticsLogger = () => {
  const config = configModule.get();
  try {
    const crashlyticsModule = require('@react-native-firebase/crashlytics');
    crashlytics = crashlyticsModule.default();
  } catch (e) {
    Logger.warn(
      'CrashlyticsIntegration',
      `[@react-native-logkit] Crashlytics not installed. Skipping integration. Error: ${e}`
    );
    return;
  }

  Logger.registerAdapter({
    id: DefaultAdapterType.CRASHLYTICS,
    log: (level, tag, message) => {
      const fullMessage = `[${tag}] ${message}`;

      if (config.errorsToCapture?.includes(level)) {
        crashlytics().recordError(new Error(fullMessage));
      } else {
        crashlytics().log(fullMessage);
      }
    },
  });
};
