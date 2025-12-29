import React from "react";
import { Resizable } from "react-resizable";
import type { ResizeCallbackData } from "react-resizable";

interface ResizableTitleProps {
  onResize: (e: React.SyntheticEvent, data: ResizeCallbackData) => void;
  width: number;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const ResizableTitle: React.FC<ResizableTitleProps> = (props) => {
  const { onResize, width, children, ...restProps } = props;

  if (!width) {
    return <th {...restProps}>{children}</th>;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => e.stopPropagation()}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps}>{children}</th>
    </Resizable>
  );
};
