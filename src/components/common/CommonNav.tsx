import { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer, Space, Typography } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router";

const { Header } = Layout;
const { Text } = Typography;

const CommonNav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = (
    <Menu
      mode={isMobile ? "vertical" : "horizontal"}
      defaultSelectedKeys={["dashboard"]}
      style={{
        background: "transparent",
        borderRight: isMobile ? "none" : undefined,
      }}
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <NavLink to="/citizen/dashboard">Dashboard</NavLink>
      </Menu.Item>
      <Menu.Item key="departments" icon={<AppstoreOutlined />}>
        <NavLink to="/citizen/departments">Departments</NavLink>
      </Menu.Item>
      <Menu.Item key="roster" icon={<ClockCircleOutlined />}>
        <NavLink to="/citizen/roster">Roster</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "80px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left side: Logo */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#000" }}>
          GovConnect
        </Text>
        <Text style={{ fontSize: "12px", color: "#555" }}>
          Government Services Simplified!
        </Text>
      </div>

      {/* Center: Menu */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        {isMobile ? (
          <>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
            />
            <Drawer
              title="Menu"
              placement="left"
              closable
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
            >
              {menuItems}
            </Drawer>
          </>
        ) : (
          menuItems
        )}
      </div>

      {/* Right side: Feedback + Logout */}
      <Space>
        <Button type="link">
          <NavLink to="/citizen/feedback">Feedback</NavLink>
        </Button>
        <Button
          type="text"
          danger
          onClick={() => {
            localStorage.removeItem("citizenToken");
            localStorage.removeItem("citizenData");
            window.location.href = "/citizen/login";
          }}
        >
          Logout
        </Button>
      </Space>
    </Header>
  );
};

export default CommonNav;
