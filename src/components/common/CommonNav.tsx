import { Layout, Menu, Avatar, Dropdown, Space, Typography } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
  InfoCircleOutlined,
  MessageOutlined,

} from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Header } = Layout;
const { Text } = Typography;

const CommonNav = () => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "departments":
        navigate("/departments");
        break;
      case "appointments":
        navigate("/appointments");
        break;
      case "documents":
        navigate("/documents");
        break;
      case "about":
        navigate("/about");
        break;
      case "feedback":
        navigate("/feedback");
        break;
      case "logout":
        navigate("/login");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  const profileMenu = (
    <Menu onClick={(e) => handleMenuClick(e.key)}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
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
          onClick={(e) => handleMenuClick(e.key)}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="departments" icon={<AppstoreOutlined />}>
            Departments
          </Menu.Item>
          <Menu.Item key="appointments" icon={<CalendarOutlined />}>
            Appointments
          </Menu.Item>
          <Menu.Item key="documents" icon={<FileTextOutlined />}>
            Documents
          </Menu.Item>
          <Menu.Item key="about" icon={<InfoCircleOutlined />}>
            About Us
          </Menu.Item>
          <Menu.Item key="feedback" icon={<MessageOutlined />}>
            Feedback
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
