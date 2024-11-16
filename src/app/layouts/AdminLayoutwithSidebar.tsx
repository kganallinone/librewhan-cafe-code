import { Layout, Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NAVIGATION_ADMIN } from "../config/navigationConfig";
import { BiBox, BiStore } from "react-icons/bi";

const { Sider, Content } = Layout;

const AdminLayoutWithSidebar = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible style={{ overflow: "hidden" }}>
        <div
          className="logo"
          style={{
            color: "white",
            padding: "16px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {NAVIGATION_ADMIN.DEFAULT.map((item, index) => (
            <Menu.Item key={index} icon={getIcon(item.iconName)}>
              <Link to={item.path}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "dashboard":
      return <DashboardOutlined />;
    case "user":
      return <UserOutlined />;
    case "orders":
      return <ShoppingCartOutlined />;
    case "settings":
      return <SettingOutlined />;
    case "products":
      return <BiBox />;
    case "franchises":
      return <BiStore />;
    case "users":
    default:
      return null;
  }
};

export default AdminLayoutWithSidebar;
