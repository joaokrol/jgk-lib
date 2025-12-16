import { Card as AntdCard, CardProps as AntdCardProps } from "antd";
import { CSSProperties, ReactNode } from "react";

export type CardProps = Omit<AntdCardProps, "title"> & {
  title?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  styleHeader?: CSSProperties;
};

export default function Card({
  title,
  // header,
  style,
  // styleHeader,
  children,
  ...rest
}: CardProps) {
  //   const { token } = theme.useToken();

  // INCLUIR - Editar o border do card

  return (
    <>
      {/* {header && (
        <AntdCard
          style={{
            border: "1px solid #e2e2e2ff",
            borderBottom: "none",
            borderRadius: "8px 8px 0px 0px",
            marginTop: 20,
            backgroundColor: token.colorBgContainer,
            width: "100%",
            ...styleHeader,
          }}
        >
          {header}
        </AntdCard>
      )} */}
      <AntdCard
        style={{
          // border: "1px solid #e2e2e2ff",
          // borderRadius: header ? "0px 0px 8px 8px" : "8px",
          //   marginTop: header ? 0 : 20,
          ...style,
        }}
        title={title}
        {...rest}
      >
        {children}
      </AntdCard>
    </>
  );
}
