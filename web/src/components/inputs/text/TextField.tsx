import { Input as AntdInput } from "antd";
import { BaseField } from "../base/BaseField";
import { TextFieldTypes } from "../types";
import { TEXT_FIELD_CONFIG } from "./textfield.config";

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
  // function Input(val: string, setVal: (v: string) => void) {
  //   const config = TEXT_FIELD_CONFIG[type];
  //   const Component = config?.component ?? AntdInput;

  //   return (
  //     <Component
  //       value={val}
  //       placeholder={rest.placeholder}
  //       {...config?.props}
  //       {...(type === "username" && max
  //         ? {
  //             count: {
  //               ...config?.props?.count,
  //               max,
  //             },
  //           }
  //         : {})}
  //       onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //         setVal(e.target.value)
  //       }
  //     />
  //   );
  // }

  // // return <BaseField<string> render={Input} type={type} {...rest} />;

  return (
    <BaseField<string>
      {...rest}
      type={type}
      render={(val, setVal) => {
        const config = TEXT_FIELD_CONFIG[type];
        const Component = config?.component ?? AntdInput;
        return (
          <Component
            value={val}
            placeholder={rest.placeholder}
            {...config?.props}
            {...(type === "username" && max
              ? {
                  count: {
                    ...config?.props?.count,
                    max,
                  },
                }
              : {})}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setVal(e.target.value)
            }
          />
        );
      }}
    />
  );
}
