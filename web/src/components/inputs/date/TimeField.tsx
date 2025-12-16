import { TimePicker } from "antd";
import { BaseField } from "../base/BaseField";
import dayjs from "dayjs";
import { formatDate } from "./dateformatters";

export interface TimeFieldProps {
  name?: string;
  value?: string;
  onChange?: (v: string) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  type: "time" | "hour" | "minute" | "second";
  needConfirm?: boolean;
}

export default function TimeField({ type = "time", ...rest }: TimeFieldProps) {
  function Input(val: string, setVal: (v: string) => void) {
    const format = formatDate[type];
    return (
      <TimePicker
        value={val ? dayjs(val, format) : null}
        format={format}
        onChange={(_, timeString) => setVal(timeString || "")}
      />
    );
  }
  return <BaseField render={Input} type={type} {...rest} />;
}
