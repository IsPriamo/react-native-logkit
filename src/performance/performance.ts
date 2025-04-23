import configModule from '../config/logger.config';
import { PerfLogger } from '../core/perf-logger';

const timers: Record<string, number> = {};
const config = configModule.get();

/**
 * A utility object for measuring and logging performance timings.
 */
export const Perf = {
  /**
   * Starts a performance timer with the given ID.
   * @param id - The ID of the timer.
   */
  start: (id: string) => {
    if (config.enablePerformanceLogs) {
      PerfLogger.log('PERF', `⏱️ Starting timer for ${id}`);
      timers[id] = performance.now();
    }
  },
  /**
   * Ends a performance timer with the given ID and logs the duration.
   * @param id - The ID of the timer.
   * @param tag - Optional tag for logging.
   * @returns The duration in milliseconds, or null if the timer was not started.
   */
  end: (id: string, tag = 'PERF') => {
    if (!config.enablePerformanceLogs) return;

    const endTime = performance.now();
    const startTime = timers[id];

    if (startTime !== undefined) {
      const duration = endTime - startTime;
      PerfLogger.log(tag, `✅${id} took ${duration.toFixed(2)} ms`);
      delete timers[id];
      return duration;
    } else {
      PerfLogger.log(tag, `⚠️ Timer '${id}' was not started`);
      return null;
    }
  },
};
