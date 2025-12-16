import { InputNumber } from "antd";
import { NumberFieldTypes } from "../types";
import { BaseField } from "../base/BaseField";

interface NumberFieldProps {
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

export function NumberField({ type, ...rest }: NumberFieldProps) {
  function Input(val: number, setVal: (v: number) => void) {
    const commumProps = {
      value: val,
      type,
      onChange: (value: number | null) => setVal(value ?? 0),
    };

    if (type === "stepper") {
      return <InputNumber mode={"spinner" as const} {...commumProps} />;
    }

    if (type === "num_currency") {
      return <InputNumber prefix={"R$"} {...commumProps} />;
    }

    if (type === "num_percent") {
      return <InputNumber suffix={"%"} {...commumProps} />;
    }
    return <InputNumber {...commumProps} />;
  }
  return <BaseField render={Input} type={type || "number"} {...rest} />;
}
