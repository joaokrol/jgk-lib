import { Alert as AntdAlert, AlertProps as AntdAlertProps } from "antd";

export type AlertProps = AntdAlertProps & {};

export default function Alert({ ...rest }: AlertProps) {
  return <AntdAlert {...rest} />;
}
