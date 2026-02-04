import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Routes, Route, useNavigate, useLocation, Outlet } from "react-router-dom";


import AdminNav from "../../components/common/AdminNav";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* ===== Sidebar ===== */}
      <Sider
      theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >

        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#001529", 
            borderBottom: "1px solid #f0f0f0",
            margin: "0 10px 10px 10px", 
            overflow: "hidden", 
            whiteSpace: "nowrap"
          }}
        >
          {collapsed ? "Logo" : "My Shop Admin"}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={(e) => navigate(e.key)}
          items={[
            {
              key: "/admin/create-item",
              icon: <PlusCircleOutlined />,
              label: "Insert Product",
            },
          ]}
        />
      </Sider>

      {/* ===== Right Layout ===== */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-between">
            <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />

          <AdminNav />
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* ===== ROUTES ===== */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;