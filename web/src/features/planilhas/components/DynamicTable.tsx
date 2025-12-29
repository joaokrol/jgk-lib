/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Spin, Table, TableColumnProps, Typography } from "antd";
import "./Table.css";
import {
  OptionsSourceTypes,
  OptionsType,
  SheetColumnTypes,
  SheetDataTypes,
  SheetDefTypes,
  SheetValueType,
} from "../types";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useCatalog } from "../hooks/useCatalog";

interface DynamicTableProps {
  sheetDef: SheetDefTypes;
  data: SheetDataTypes[];
  isLoading?: boolean;
  size: "tiny" | "large" | "middle" | "small";
  onSaveROw?: (row: any) => Promise<void>;
}

const AsyncSelectCell = ({
  value,
  optionsSource,
}: {
  value: any;
  optionsSource: OptionsSourceTypes;
}) => {
  const { data: options, isLoading } = useCatalog(optionsSource.document);

  if (isLoading) return <Spin size="small" />;
  if (!options) return value; // Fallback para o ID se falhar

  const selected = options.find(
    (opt: any) => opt[optionsSource.valueField] === value
  );

  return (
    <Typography.Text>
      {selected
        ? selected[optionsSource.labelField as keyof OptionsType]
        : value}
    </Typography.Text>
  );
};

const renderCellContent = (
  text: any,
  record: SheetDataTypes,
  col: SheetColumnTypes
) => {
  if (!text) return "-";

  if (col.renderColumn === "date") {
    return (
      <Typography>{dayjs(new Date(text)).format("DD/MM/YYYY")}</Typography>
    );
  }

  if (col.options && col.options.length > 0) {
    const option = col.options.find((opt) => opt.value === text);
    if (option) {
      return option.label;
    }
  }

  return text;
};

const alignCell = (valueType: SheetValueType) => {
  if (valueType === "date") return "center";
  if (valueType === "text") return "left";
  if (valueType === "number") return "right";

  console.log(valueType);
  return "center";
};

const createColumns = (data: SheetColumnTypes[]) => {
  const visibleColumns = data.filter(
    (col) => col.columnsOptions?.defaultVisible !== false
  );
  return visibleColumns.map((col: SheetColumnTypes) => {
    const antCol: any = {
      key: col.key,
      dataIndex: col.key,
      title: col.title,
      // width: col.columnsOptions?.defaultWidth,
      fixed: col.columnsOptions?.fixed,
      align: alignCell(col.valueType ?? "text"),
      onCell: (record: any) => ({
        record,
        columnDef: col,
        dataIndex: col.key,
        title: col.title,
      }),
      render: (text: any, record: any) => {
        if (col.children && col.children.length > 0) return null;
        if (col.optionsSource) {
          return (
            <AsyncSelectCell value={text} optionsSource={col.optionsSource} />
          );
        }
        return renderCellContent(text, record, col);
      },
    };
    if (col.children && col.children.length > 0) {
      antCol.children = createColumns(col.children);
      delete antCol.dataIndex;
    }
    return antCol;
  });
};

export const DynamicTable: React.FC<DynamicTableProps> = ({
  sheetDef,
  data: initialData,
  size = "small",
  isLoading,
}: DynamicTableProps) => {
  const { key: sheetId, columnsSchema } = sheetDef;

  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState<TableColumnProps[]>(
    createColumns(columnsSchema ?? [])
  );

  useEffect(() => {
    setColumns(createColumns(columnsSchema ?? []));
  }, [columnsSchema]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const getTableClass = () => {
    // AJUSTAR - melhor o size tiny - criar configuração nos temas para os tamanhos e só para o objeto
    if (size === "tiny") return "table-tiny";
    return "";
  };

  return (
    <Form form={form} component={false} key={sheetId}>
      <Table
        className={getTableClass()}
        bordered
        size={size === "tiny" ? "small" : size}
        dataSource={data}
        columns={columns}
        rowClassName={"editable-row"}
        loading={isLoading}
        pagination={{ pageSize: 50 }}
      />
    </Form>
  );
};
