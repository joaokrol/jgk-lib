import { Col, Flex, Layout, Menu, Row } from "antd";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const { Header: AntdHeader } = Layout;

const menuItems = [
  { key: "/", label: "Home" },
  {
    key: "/example",
    label: "Exemplo",
  },
  { key: "/planilhas", label: "Planilhas" },
];

export default function Header() {
  const navigate = useNavigate();
  return (
    <AntdHeader className="app-header">
      <Flex
        className="header-inner"
        justify="space-between"
        align="center"
        gap={20}
      >
        <span>Logo | Nome</span>
        <Menu
          className="header-menu"
          style={{ flex: 1, justifyContent: "center" }} // ALTERAR - achar uma maneira de remover daqui
          mode="horizontal"
          items={menuItems}
          onClick={(item) => {
            navigate(item.key);
          }}
        />
        <span>Config | Usuario</span>
      </Flex>
    </AntdHeader>
  );
}
