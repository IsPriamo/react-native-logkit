import type { LogLevel } from '../core/logger-types';

/**
 * Formats a given `Date` object into a string with the format `YYYY-MM-DD HH:mm:ss`.
 *
 * @param date - The `Date` object to format.
 * @returns A formatted date string in the format `YYYY-MM-DD HH:mm:ss`.
 */
export const formatDate = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Formats a log message by combining the provided arguments into a single string.
 * Non-string arguments are converted to JSON format with indentation for readability.
 *
 * @param _level - The log level of the message (e.g., debug, info, error).
 * @param _tag - A tag or label associated with the log message.
 * @param args - An array of arguments to be included in the log message.
 * @returns A formatted string representing the log message.
 */
export const formatLogMessage = (
  _level: LogLevel,
  _tag: string,
  args: any[]
): string => {
  return args
    .map((arg) =>
      typeof arg === 'string' ? arg : JSON.stringify(arg, null, 2)
    )
    .join(' ');
};
