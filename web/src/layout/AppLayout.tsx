import { Layout } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
