import { UserOutlined } from "@ant-design/icons";
import { Layout, Typography, Avatar } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const DashboardHeader = () => {
  return (
    <Header className="bg-white shadow-sm px-6 flex justify-between items-center">
      <Title level={3} style={{ margin: 0 }}>Roster</Title>
      <div className="flex items-center gap-3">
        <span className="text-gray-700">Good Morning, Ranjith!</span>
        <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#e6f7ff", color: "#1890ff" }} />
      </div>
    </Header>
  );
};

export default DashboardHeader;
