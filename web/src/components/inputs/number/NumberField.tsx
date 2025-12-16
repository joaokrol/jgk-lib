import { InputNumber } from "antd";
import { NumberFieldTypes } from "../types";
import { BaseField } from "../base/BaseField";

export interface NumberFieldProps {
  name?: string;
  value?: number;
  onChange?: (v: number) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  type?: NumberFieldTypes;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberField({
  type = "number",
  ...rest
}: NumberFieldProps) {
  function Input(val: number, setVal: (v: number) => void) {
    const commonProps = {
      value: val,
      type,
      onChange: (value: number | null) => setVal(value ?? 0),
    };

    if (type === "stepper") {
      return <InputNumber mode={"spinner" as const} {...commonProps} />;
    }

    if (type === "num_currency") {
      return <InputNumber prefix={"R$"} {...commonProps} />;
    }

    if (type === "num_percent") {
      return <InputNumber suffix={"%"} {...commonProps} />;
    }
    return <InputNumber {...commonProps} />;
  }
  return <BaseField<number> render={Input} type={type} {...rest} />;
}
