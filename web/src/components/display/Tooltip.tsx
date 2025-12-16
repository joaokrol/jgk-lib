import { Tooltip as AntdTooltip, TooltipProps as AntdTooltipProps } from "antd";

export type TooltipProps = AntdTooltipProps & {};

export default function Tooltip({ children, ...rest }: TooltipProps) {
  return <AntdTooltip {...rest}>{children}</AntdTooltip>;
}
