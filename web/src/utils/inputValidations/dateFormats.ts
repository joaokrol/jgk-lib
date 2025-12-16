import { DateFieldTypes } from "@components/inputs/types";

export const DATE_FORMATS: Record<DateFieldTypes, string> = {
  date: "DD/MM/YYYY",
  month: "MM/YYYY",
  year: "YYYY",
  quarter: "[Q]Q/YYYY",
  week: "MM/DD",
  datetime: "DD/MM/YYYY HH:mm:ss",
  time: "HH:mm:ss",
  hour: "HH",
  minute: "mm",
  second: "ss",
  daterange: "DD/MM/YYYY",
  datetimerange: "DD/MM/YYYY HH:mm:ss",
  timerange: "HH:mm:ss",
};
