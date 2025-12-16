import { Controller, useFormContext } from "react-hook-form";
import { ReactNode } from "react";
import { Form as AntdForm } from "antd";
import { masks } from "@utils/inputMasks";
import { BaseFieldTypes } from "../types";

type BaseFieldProps<T> = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  type: BaseFieldTypes;
  value?: T | T[];
  onChange?: (value: T | T[]) => void;
  render: (value: T | T[], onChange: (v: T | T[]) => void) => ReactNode;
};
export function BaseField<T>({
  name,
  value,
  type,
  onChange,
  render,
  ...rest
}: BaseFieldProps<T>) {
  const form = useFormContext();
  const isRHF = Boolean(name && form?.control);
  const error =
    (name &&
      form?.formState?.errors?.[name as keyof typeof form.formState.errors]) ||
    null;
  const hasError = Boolean(error);

  // function handleChange(raw: T) {
  //   const masked = type in masks ? masks[type](raw) : raw;

  //   if (isRHF && name) {
  //     form.setValue(name, masked);
  //   } else {
  //     onChange?.(masked);
  //   }
  // }

  return (
    <AntdForm.Item
      validateStatus={hasError ? "error" : undefined}
      help={hasError ? (error?.message as string) || "" : ""}
      name={name}
      {...rest}
    >
      {isRHF ? (
        <Controller
          control={form.control}
          name={name as string}
          render={({ field }) => (
            // <>{render(field.value, (next: T) => field.onChange(next))}</>
            // <>{render(field.value, (next: T) => {handleChange(next)})}</>
            <>
              {render(field.value, (next: T | T[]) => {
                field.onChange(type in masks ? masks[type](next) : next);
                field.onBlur();
              })}
            </>
          )}
        />
      ) : (
        // render(value as T, (next: T) => onChange?.(next))
        // render(value as T, (next: T) => handleChange(next))
        render(value as T | T[], (next: T | T[]) =>
          onChange?.(type in masks ? masks[type](next) : next)
        )
      )}
    </AntdForm.Item>
  );
}
