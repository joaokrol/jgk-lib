import { Switch } from "antd";
import { BaseField } from "../base/BaseField";

export interface CheckboxFieldProps {
  name?: string;
  value?: boolean;
  onChange?: (v: boolean) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
}

export default function CheckboxField({ ...rest }: CheckboxFieldProps) {
  function Input(val: boolean, setVal: (v: boolean) => void) {
    return (
      <Switch checked={val} onChange={(checked: boolean) => setVal(checked)} />
    );
  }
  return <BaseField<boolean> render={Input} type={"checkbox"} {...rest} />;
}
