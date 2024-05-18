import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import AddClient from "./AddClient";
import ViewClient from "./ViewClient";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/firebase"; 


const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { logout } = useFirebase();  // Get the logout function from Firebase context
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedMenuKey) {
      case "1":
        return <AddClient></AddClient>;
      case "2":
        return <ViewClient></ViewClient>;
      case "3":
        handleLogout();  // Handle logout when menu item is selected
        return null;
      // default:
      //   return <div>Default Content</div>;
    }
  };

  return (
    <Layout style={{ minHeight: 600 }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => setSelectedMenuKey(key)}
          style={{ margin: "60px 0" }}
          items={[
            {
              key: "1",
              icon: <UploadOutlined />,
              label: "Add Client",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "View Clients",
            },
            {
              key: "3",
              icon: <LogoutOutlined />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Home;
