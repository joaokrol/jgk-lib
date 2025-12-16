import { Input as AntdInput } from "antd";
import { BaseField } from "../base/BaseField";
import { TextFieldTypes } from "../types";
import { runes } from "runes2";

interface TextFieldProps {
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

export function TextField({ type, max, ...rest }: TextFieldProps) {
  function Input(val: string, setVal: (v: string) => void) {
    const commumProps = {
      value: val,
      type,
      onChange: (e: { target: { value: string } }) => setVal(e.target.value),
    };

    //     const commumProps = {
    // -      val,
    // +      value: val,
    //        type,
    //        onChange: (e: { target: { value: string } }) => setVal(e.target.value),
    //      };

    if (type === "password") {
      return <AntdInput.Password {...commumProps} />;
    }
    if (type === "search") {
      return <AntdInput.Search {...commumProps} />;
    }

    if (type === "cep") {
      // AJUSTAR - Colocar para mandar para um API os dados
      return <AntdInput {...commumProps} />;
    }
    if (type === "currency") {
      return <AntdInput {...commumProps} prefix="R$" />;
    }
    if (type === "percent") {
      return <AntdInput {...commumProps} suffix="%" />;
    }

    if (type === "username") {
      // INCLUIR - Validar com a base para evitar duplicidade
      return (
        <AntdInput
          {...commumProps}
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

    return <AntdInput {...commumProps} />;
  }

  // type === "password" ? (
  //   <AntdInput.Password value={val} onChange={(e) => setVal(e.target.value)} />
  // ) : (
  //   <AntdInput value={val} onChange={(e) => setVal(e.target.value)} />
  // );

  return <BaseField render={Input} type={type || "text"} {...rest} />;
}
