import { useRef } from 'react';
import { PerfLogger } from '../core/perf-logger';

export const usePerformance = (tag: string) => {
  const startRef = useRef<number | null>(null);

  /**
   * Starts performance tracking by recording the current timestamp.
   * Logs a message indicating that performance tracking has started.
   *
   * @remarks
   * This function uses the `performance.now()` method to capture the
   * precise time at which tracking begins. The logged message includes
   * a tag for easier identification in logs.
   *
   */
  const start = () => {
    startRef.current = performance.now();
    PerfLogger.log(tag, '⏱️ Performance tracking started');
  };

  /**
   * Ends the performance measurement and logs the duration with the specified label.
   * If the performance measurement was never started, logs a warning instead.
   *
   * @param label - A descriptive label for the performance measurement. Defaults to 'completed'.
   */
  const end = (label = 'completed') => {
    if (startRef.current === null) {
      PerfLogger.log(
        tag,
        '⚠️ Tried to end performance but it was never started'
      );
      return;
    }

    const duration = performance.now() - startRef.current;
    PerfLogger.log(tag, `✅ ${label} in ${duration}ms`);
    startRef.current = null;
  };

  return {
    start,
    end,
  };
};
