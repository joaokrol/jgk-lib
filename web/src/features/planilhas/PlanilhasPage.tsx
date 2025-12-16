import Tabs from "@components/display/Tabs";
import { useEffect, useState } from "react";
import PanelPlanilhas from "./PanelPlanilhas";

const defaultPane = {
  key: "1",
  label: "Planilhas",
  type: "home",
  closable: false,
};

const examplesPanes = [
  { key: "2", label: "REG01", type: "planilha", closable: true },
  { key: "3", label: "REG02", type: "planilha", closable: true },
  { key: "4", label: "REG03", type: "planilha", closable: true },
];

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type TabType = "home" | "planilha" | string;

type TabItem = {
  key: string;
  label: string;
  type: TabType;
  closable?: boolean;
};

export default function PlanilhasPage() {
  const [activeKey, setActiveKey] = useState(defaultPane.key);
  const [items, setItems] = useState([defaultPane, ...examplesPanes]);

  useEffect(() => {
    const saved = localStorage.getItem("tabs");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const handleChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  //   const addTab = () => {};

  const removeTab = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
    localStorage.setItem("tabs", JSON.stringify(newPanes));
  };

  const onEdit = (targetkey: TargetKey, action: "add" | "remove") => {
    if (action === "remove") {
      removeTab(targetkey);
    }
  };

  const renderTabContent = (tab: TabItem) => {
    switch (tab.type) {
      case "home":
        return <PanelPlanilhas />;
      case "planilha":
        return <h2>Planilha {tab.key}</h2>;
      default:
        return null;
    }
  };

  return (
    <Tabs
      size={"small"}
      hideAdd
      type={"editable-card"}
      items={items.map((tab) => ({
        key: tab.key,
        label: tab.label,
        type: tab.type,
        closable: tab.closable ?? true,
        children: renderTabContent(tab),
      }))}
      activeKey={activeKey}
      onChange={handleChange}
      onEdit={onEdit}
    />
  );
}
