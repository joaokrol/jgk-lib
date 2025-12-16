import { Tabs as AntdTabs, TabsProps as AntdTabsProps } from "antd";

export type TabsProps = AntdTabsProps & {};


export default function Tabs({ ...rest }: TabsProps) {
  return <AntdTabs {...rest} />;
}
