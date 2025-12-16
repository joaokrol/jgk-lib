import { DatePicker } from "antd";
import { BaseField } from "../base/BaseField";
import dayjs, { Dayjs } from "dayjs";
import { formatDate } from "./dateformatters";

export interface DateRangeFieldProps {
  name?: string;
  value?: string[];
  onChange?: (v: string[]) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  type: "daterange" | "datetimerange";
  needConfirm?: boolean;
  showTime?: boolean;
}

export default function DateRangeField({
  type = "daterange",
  showTime = false,
  ...rest
}: DateRangeFieldProps) {
  function Input(val: string[], setVal: (v: string[]) => void) {
    const format = formatDate[type];
    const rangeValue: [Dayjs | null, Dayjs | null] | null =
      val?.length === 2 ? [dayjs(val[0], format), dayjs(val[1], format)] : null;

    return (
      <DatePicker.RangePicker
        value={rangeValue}
        format={format}
        showTime={showTime}
        onChange={(_, dateStrings) => setVal(dateStrings as string[])}
      />
    );
  }
  return <BaseField render={Input} type={type} {...rest} />;
}
