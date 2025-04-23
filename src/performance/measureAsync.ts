import { PerfLogger } from '../core/perf-logger';

/**
 * Measures the execution time of an asynchronous function and logs the result.
 *
 * @template T - The return type of the asynchronous function.
 * @param tag - A string used to categorize or identify the log entry.
 * @param label - A descriptive label for the operation being measured.
 * @param fn - The asynchronous function to be executed and measured.
 * @returns A promise that resolves to the result of the asynchronous function.
 * @throws Re-throws any error encountered during the execution of the asynchronous function.
 *
 * @example
 * ```typescript
 * await measureAsync('API', 'Fetching data', async () => {
 *   const res = await fetch('...');
 *   return res.json();
 * });
 * ```
 */
export async function measureAsync<T>(
  tag: string,
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();

  try {
    const result = await fn();
    const duration = Date.now() - start;
    PerfLogger.log(tag, `✅ ${label} completed in ${duration}ms`);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    PerfLogger.log(tag, `❌ ${label} failed after ${duration}ms`, error);
    throw error;
  }
}
