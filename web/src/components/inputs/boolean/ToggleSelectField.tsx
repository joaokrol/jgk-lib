import { Select } from "antd";
import { BaseField } from "../base/BaseField";

export interface ToggleSelectFieldProps {
  name?: string;
  value?: boolean;
  onChange?: (v: boolean) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
}

export default function ToggleSelectField({ ...rest }: ToggleSelectFieldProps) {
  function Input(val: boolean, setVal: (v: boolean) => void) {
    return (
      <Select
        value={val}
        onChange={(v: boolean) => setVal(v)}
        options={[
          { label: "Sim", value: true },
          { label: "Não", value: false },
        ]}
      />
    );
  }
  return <BaseField<boolean> render={Input} type={"toggleselect"} {...rest} />;
}
