import { DatePicker, DatePickerProps, TimePicker } from "antd";
import { BaseField } from "../base/BaseField";
import { DateFieldTypes } from "../types";
import dayjs, { Dayjs } from "dayjs";

interface DateFieldProps {
  name?: string;
  value?: string;
  onChange?: (v: string) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  type: DateFieldTypes;
  needConfirm?: boolean;
  multiple?: boolean;
}

// const rangePresets: TimeRangePickerProps["presets"] = [
//   { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
//   { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
//   { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
//   { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
// ];

const weekFormat = "MM/DD";

const customWeekStartEndFormat: DatePickerProps["format"] = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;

const format = {
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

const formatter = {
  ...format,
  week: customWeekStartEndFormat,
};

// daterange
// limitedaterange

export function DateField({ type, ...rest }: DateFieldProps) {
  function Input(val: string | string[], setVal: (v: string) => void) {
    let dateValue: Dayjs | null | Dayjs[];

    if (Array.isArray(val)) {
      dateValue = val ? val.map((d) => dayjs(d, format[type])) : null;
    } else {
      dateValue = val ? dayjs(val as string, format[type]) : null;
    }

    const commumProps = {
      value: dateValue,
      onChange: (date: Dayjs | null, dateString: string | null) => {
        setVal(dateString || "");
      },
      format:
        typeof formatter[type] === "function"
          ? formatter[type]
          : { format: formatter[type], type: "mask" as const },
      ...rest,
    };

    if (type === "year") {
      if (commumProps.value)
        return <DatePicker {...commumProps} picker="year" />;
    }

    if (type === "month") {
      return <DatePicker {...commumProps} picker="month" />;
    }

    if (type === "quarter") {
      return <DatePicker {...commumProps} picker="quarter" />;
    }

    if (type === "week") {
      return <DatePicker {...commumProps} picker="week" />;
    }

    if (type === "datetime") {
      return <DatePicker showTime {...commumProps} />;
    }

    if (type === "time") {
      return <TimePicker {...commumProps} />;
    }

    if (type === "hour") {
      return <TimePicker {...commumProps} />;
    }

    if (type === "minute") {
      return <TimePicker {...commumProps} />;
    }

    if (type === "second") {
      return <TimePicker {...commumProps} />;
    }

    if (type === "daterange") {
      return <DatePicker.RangePicker {...commumProps} />;
    }

    if (type === "datetimerange") {
      return <DatePicker.RangePicker showTime {...commumProps} />;
    }

    if (type === "timerange") {
      return <TimePicker.RangePicker {...commumProps} />;
    }

    return (
      <DatePicker
        {...commumProps}
        // format="DD/MM/YYYY"
      />
    );
  }
  return <BaseField render={Input} type={type || "date"} {...rest} />;
}
