import { Layout, Menu, Avatar, Dropdown, Space, Typography } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

const CommonNav = () => {
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile">
        <NavLink to="/profile">Profile</NavLink>
      </Menu.Item>
      <Menu.Item key="logout">
        <NavLink to="/login">Logout</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        height: "80px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left side: Product name + tagline */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Text style={{ fontSize: "22px", fontWeight: "bold", color: "#000" }}>
          GovConnect
        </Text>
        <Text style={{ fontSize: "12px", color: "#555" }}>
          Government Services Simplified!
        </Text>
      </div>

      {/* Right side: Menu + Profile */}
      <Space align="center">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["dashboard"]}
          style={{ background: "transparent", lineHeight: "80px" }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="departments" icon={<AppstoreOutlined />}>
            <NavLink to="/departments">Departments</NavLink>
          </Menu.Item>
          <Menu.Item key="appointments" icon={<CalendarOutlined />}>
            <NavLink to="/appointments">Appointments</NavLink>
          </Menu.Item>
          <Menu.Item key="documents" icon={<FileTextOutlined />}>
            <NavLink to="/documents">Documents</NavLink>
          </Menu.Item>
          <Menu.Item key="roster" icon={<ClockCircleOutlined />}>
            <NavLink to="/roster">Roster</NavLink>
          </Menu.Item>
          <Menu.Item key="about" icon={<InfoCircleOutlined />}>
            <NavLink to="/about">About Us</NavLink>
          </Menu.Item>
          <Menu.Item key="feedback" icon={<MessageOutlined />}>
            <NavLink to="/feedback">Feedback</NavLink>
          </Menu.Item>
        </Menu>

        <Dropdown overlay={profileMenu} placement="bottomRight">
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default CommonNav;
