import { useParams } from "react-router-dom";
import { useSheetData, useSheetDefinition } from "../hooks/useSheetDefinition";
import { Typography } from "antd";
import { DynamicTable } from "../components/DynamicTable";
const { Title } = Typography;

function NotFoundSheet() {
  return <Title level={2}>Planilha não localizada.</Title>;
}

export default function PlanilhasWorkspace() {
  const { id } = useParams<{ id: string }>();
  const { data: sheetDef } = useSheetDefinition(id);
  const { data: sheetData } = useSheetData(id);

  if (!sheetDef) return NotFoundSheet();

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DynamicTable size="small" sheetDef={sheetDef} data={sheetData ?? []} />
    </div>
  );
}
