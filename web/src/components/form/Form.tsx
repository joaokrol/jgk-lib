import { Alert } from "@components/feedback";
import { Form as AntdForm, FormProps as AntdFormProps } from "antd";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";

type FormProps<T extends FieldValues> = AntdFormProps & {
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  showErrorSummary?: boolean;
  errorTitle?: string;
  children: React.ReactNode;
};

export function Form<T extends FieldValues>({
  methods,
  onSubmit,
  layout = "vertical",
  showErrorSummary = true,
  errorTitle = "Por favor, corrija os campos destacados.",
  children,
  ...rest
}: FormProps<T>) {
  const { handleSubmit, formState } = methods;
  const hasErrors = Object.keys(formState.errors ?? {}).length > 0;

  return (
    <FormProvider {...methods}>
      <AntdForm onFinish={handleSubmit(onSubmit)} layout={layout} {...rest}>
        {showErrorSummary && hasErrors && (
          <Alert
            title={errorTitle}
            type="error"
            style={{ marginBottom: "20px" }}
          />
        )}
        {children}
      </AntdForm>
    </FormProvider>
  );
}
