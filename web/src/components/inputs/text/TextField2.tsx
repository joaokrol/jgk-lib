import { Input as AntdInput } from "antd";
import { BaseField } from "../base/BaseField";
import { TextFieldTypes } from "../types";
import { runes } from "runes2";

export interface TextFieldProps {
  name?: string;
  value?: string;
  onChange?: (v: string) => void;

  max?: number;
  label?: string;
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  type?: TextFieldTypes;
}

export default function TextField({
  type = "text",
  max,
  ...rest
}: TextFieldProps) {
  function Input(val: string, setVal: (v: string) => void) {
    const commonProps = {
      value: val,
      type,
      onChange: (e: { target: { value: string } }) => setVal(e.target.value),
    };

    if (type === "password") {
      return <AntdInput.Password {...commonProps} />;
    }
    if (type === "search") {
      return <AntdInput.Search {...commonProps} />;
    }

    if (type === "cep") {
      // AJUSTAR - Colocar para mandar para um API os dados
      return <AntdInput {...commonProps} />;
    }
    if (type === "currency") {
      // AJUSTAR - ajustar esse campo
      return <AntdInput {...commonProps} prefix="R$" />;
    }
    if (type === "percent") {
      // AJUSTAR - ajustar esse campo
      return <AntdInput {...commonProps} suffix="%" />;
    }

    if (type === "username") {
      // INCLUIR - Validar com a base para evitar duplicidade
      return (
        <AntdInput
          {...commonProps}
          prefix="@"
          count={{
            show: true,
            max: max ?? 30,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) =>
              runes(txt).slice(0, max).join(""),
          }}
        />
      );
    }

    // if (type === "textarea") {}

    // Fazer depois
    // if (type === "richtexteditor") {} // WYSIWYG (Markdown / HTML)
    // if (type === "codeeditorinput") {} // JSON, SQL, código
    // if (type === "sluginput") {}
    // if (type === "usernameinput") {}
    // if (type === "url") {}

    return <AntdInput {...commonProps} />;
  }

  return <BaseField<string> render={Input} type={type} {...rest} />;
}
