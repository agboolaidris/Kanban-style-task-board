import dayjs from "dayjs";

export const dateFormat = (
  date: string | Date,
  format = "DD MMMM YYYY"
): string => {
  return dayjs(date).format(format);
};
