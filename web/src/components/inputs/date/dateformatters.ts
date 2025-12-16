import { DatePickerProps } from "antd";
import dayjs from "dayjs";

const weekFormat = "MM/DD";

const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;

export const formatDate = {
  date: "DD/MM/YYYY",
  month: "MM/YYYY",
  year: "YYYY",
  quarter: "[Q]Q/YYYY",
  week: weekFormat,
  datetime: "DD/MM/YYYY HH:mm:ss",
  time: "HH:mm:ss",
  hour: "HH",
  minute: "mm",
  second: "ss",
  daterange: "DD/MM/YYYY",
  datetimerange: "DD/MM/YYYY HH:mm:ss",
  timerange: "HH:mm:ss",
};

export const formatterDate = {
  ...formatDate,
  week: customWeekStartEndFormat,
};
