import dayjs from "dayjs";
import { DATE_FORMATS } from "./dateFormats";
import { DateFieldTypes } from "@components/inputs/types";

export function isValidDate(
  value: string,
  type: DateFieldTypes
) {
  return dayjs(value, DATE_FORMATS[type], true).isValid();
}

export function isValidDateRange(
  value: string[],
  type: DateFieldTypes
) {
  if (value.length !== 2) return false;

  const [start, end] = value;
  const startDate = dayjs(start, DATE_FORMATS[type], true);
  const endDate = dayjs(end, DATE_FORMATS[type], true);

  return (
    startDate.isValid() &&
    endDate.isValid() &&
    !startDate.isAfter(endDate)
  );
}

