import { Controller, useFormContext } from "react-hook-form";
import { ReactNode } from "react";
import { Form as AntdForm } from "antd";
import { BaseFieldTypes } from "../types";
import { hasMask, masks } from "@utils/index";

export type BaseFieldProps<T> = {
  name?: string;
  label?: ReactNode;
  required?: boolean;
  type: BaseFieldTypes;
  value?: T;
  onChange?: (value: T) => void;
  render: (value: T, onChange: (v: T) => void) => ReactNode;
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
            <>
              {render(field.value, (next: T) => {
                if (hasMask(type)) {
                  field.onChange(masks[type](next as string));
                } else {
                  field.onChange(next);
                }
                field.onBlur();
              })}
            </>
          )}
        />
      ) : (
        render(value as T, (next: T) => {
          if (hasMask(type)) {
            onChange?.(masks[type](next as string) as T);
          } else {
            onChange?.(next);
          }
        })
      )}
    </AntdForm.Item>
  );
}
