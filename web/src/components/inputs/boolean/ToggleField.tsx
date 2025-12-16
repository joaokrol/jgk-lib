import { Button, Space } from "antd";
import { BaseField } from "../base/BaseField";

export interface ToggleFieldProps {
  name?: string;
  value?: boolean;
  onChange?: (v: boolean) => void;

  label?: string;
  required?: boolean;
  helpText?: string;
}

export default function ToggleField({ ...rest }: ToggleFieldProps) {
  function Input(val: boolean, setVal: (v: boolean) => void) {
    return (
      <Space>
        <Button type={val ? "primary" : "default"} onClick={() => setVal(true)}>
          Sim
        </Button>

        <Button
          type={!val ? "primary" : "default"}
          onClick={() => setVal(false)}
        >
          Não
        </Button>
      </Space>
    );
  }
  return <BaseField<boolean> render={Input} type={"toggle"} {...rest} />;
}
