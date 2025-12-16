import { TimePicker } from "antd";
import { BaseField } from "../base/BaseField";
import dayjs from "dayjs";
import { formatDate } from "./dateformatters";

export interface TimeRangeFieldProps {
  name?: string;
  value?: string[];
  onChange?: (v: string[]) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  type: "time";
  needConfirm?: boolean;
}

export default function TimeRangeField({
  type = "time",
  ...rest
}: TimeRangeFieldProps) {
  function Input(val: string[], setVal: (v: string[]) => void) {
    const format = formatDate[type];
    return (
      <TimePicker.RangePicker
        value={
          val?.length === 2
            ? [dayjs(val[0], format), dayjs(val[1], format)]
            : null
        }
        format={format}
        onChange={(_, times) => setVal(times as string[])}
      />
    );
  }
  return <BaseField render={Input} type={type} {...rest} />;
}
