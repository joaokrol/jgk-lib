import { Checkbox } from "antd";
import { BaseField } from "../base/BaseField";

export interface SwitchFieldProps {
  name?: string;
  value?: boolean;
  onChange?: (v: boolean) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
}

export default function SwitchField({ ...rest }: SwitchFieldProps) {
  function Input(val: boolean, setVal: (v: boolean) => void) {
    return (
      <Checkbox checked={val} onChange={(e) => setVal(e.target.checked)} />
    );
  }
  return <BaseField<boolean> render={Input} type={"switch"} {...rest} />;
}
