import dayjs from "dayjs";

/**
 * Formats a given date into a specified string format.
 *
 * @param date - The date to format, either as a string or a Date object.
 * @param format - The format string to use for formatting the date. Defaults to "DD MMMM YYYY".
 * @returns The formatted date string.
 */

export const dateFormat = (
  date: string | Date,
  format = "DD MMMM YYYY"
): string => {
  return dayjs(date).format(format);
};
