import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Drawer,
  Button,
} from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UserOutlined,
  MessageOutlined,
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
      setIsMobile(window.innerWidth < 768); // breakpoint for mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">
        <NavLink to="/profile">Profile</NavLink>
      </Menu.Item>
      <Menu.Item key="logout"></Menu.Item>
    </Menu>
  );

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
      <Menu.Item key="feedback" icon={<MessageOutlined />}>
        <NavLink to="/citizen/feedback">Feedback</NavLink>
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
      {/* Left side: Logo and tagline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#000" }}>
          GovConnect
        </Text>
        <Text style={{ fontSize: "12px", color: "#555" }}>
          Government Services Simplified!
        </Text>
      </div>

      {/* Right side: Menu/Profile */}
      {isMobile ? (
        <Space>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
          />
          <Dropdown overlay={profileMenu} placement="bottomRight">
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>

          <Drawer
            title="Menu"
            placement="right"
            closable
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
          >
            {menuItems}
          </Drawer>
        </Space>
      ) : (
        <Space align="center">{menuItems}</Space>
      )}

      <Button
        type="text"
        className="ant-btn-icon-only"
        danger
        onClick={() => {
          localStorage.removeItem("citizenToken");
          localStorage.removeItem("citizenData");
          window.location.href = "/citizen/login"; // Redirect to login
        }}
      >
        Logout
      </Button>
    </Header>
  );
};

export default CommonNav;
