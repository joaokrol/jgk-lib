import { Tooltip } from "@components/display";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";
import { FC, ReactNode } from "react";

export type ButtonProps = AntdButtonProps & {
  blockOnMobile?: boolean;
  tooltipText?: string;
};

type ButtonProviderProps = {
  tooltipText?: string;
  children: ReactNode;
};

const ButtonProvider: FC<ButtonProviderProps> = ({ tooltipText, children }) => {
  if (tooltipText) {
    return (
      <Tooltip placement="top" title={tooltipText}>
        {children}
      </Tooltip>
    );
  }
  return children;
};

export default function Button({
  // blockOnMobile,
  tooltipText,
  children,
  htmlType,
  ...rest
}: ButtonProps) {
  // INCLUIR - fazer funcionar o blockOnMobile
  return (
    <ButtonProvider tooltipText={tooltipText}>
      <AntdButton htmlType={htmlType} {...rest}>
        {children}
      </AntdButton>
    </ButtonProvider>
  );
}
