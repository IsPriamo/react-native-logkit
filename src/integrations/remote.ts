import { Logger } from '../core/logger';
import { LogLevel } from '../core/logger-types';

type RemoteLoggerOptions = {
  id: string;
  endpoint: string;
  headers?: Record<string, string>;
  minLevel?: LogLevel;
};

export const initRemoteLogger = (options: RemoteLoggerOptions) => {
  Logger.registerAdapter({
    id: options.id,
    log: async (level, tag, message) => {
      if (options.minLevel !== undefined && level < options.minLevel) return;

      const payload = {
        level: LogLevel[level],
        tag,
        message,
        timestamp: new Date().toISOString(),
      };

      try {
        await fetch(options.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('[RemoteLogger] Failed to send log', err);
      }
    },
  });
};
