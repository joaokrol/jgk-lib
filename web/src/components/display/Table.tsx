import { Table as AntdTable, TableProps as AntdTableProps } from "antd";
import "./Table.css";

export type TableProps = AntdTableProps & {};

export default function Table({ pagination, ...rest }: TableProps) {
  return (
    <AntdTable
      classNames={{
        root: "table-root",
        footer: "table-footer",
        pagination: {
          root: "table-pagination-root",
          item: "table-pagination-item",
        },
      }}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        ...pagination,
      }}
      // styles={{ root: { border: "1px solid #000" } }}
      {...rest}
    />
  );
}
