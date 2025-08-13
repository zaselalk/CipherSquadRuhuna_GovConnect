import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  Button,
  Typography,
  Space,
  List,
  Tag,
  Row,
  Col,
  Spin,
  Empty,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  BellOutlined,
  HistoryOutlined,
  PlusOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";

const { Title, Text } = Typography;

interface Appointment {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Rescheduled";
}

interface Notification {
  id: string;
  message: string;
  type: "reminder" | "change" | "cancellation";
  date: string;
}

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setUpcomingAppointments([
        {
          id: "1",
          serviceName: "Document Services - Passport Renewal",
          date: "2025-08-20",
          time: "10:30 AM",
          status: "Confirmed",
        },
        {
          id: "2",
          serviceName: "Vehicle Services - License Renewal",
          date: "2025-08-25",
          time: "02:00 PM",
          status: "Pending",
        },
      ]);

      setPastAppointments([
        {
          id: "3",
          serviceName: "Tax & Payments - Property Tax",
          date: "2025-07-10",
          time: "11:00 AM",
          status: "Confirmed",
        },
        {
          id: "4",
          serviceName: "Document Services - Birth Certificate",
          date: "2025-06-15",
          time: "09:30 AM",
          status: "Rescheduled",
        },
      ]);

      setNotifications([
        {
          id: "n1",
          message: "Your appointment for Passport Renewal is confirmed for Aug 20.",
          type: "reminder",
          date: "2025-08-12",
        },
        {
          id: "n2",
          message: "Your License Renewal appointment has been moved to Aug 25.",
          type: "change",
          date: "2025-08-10",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleBookNew = () => navigate("/services");
  const handleViewAppointment = (id: string) => navigate(`/appointments/${id}`);
  const handleFeedback = (id: string) => navigate(`/appointments/${id}/feedback`);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <LandingHeader />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spin size="large" tip="Loading your dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <LandingHeader />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg p-8 mb-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center flex-wrap">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-lg opacity-90">Here’s what’s happening with your appointments</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleBookNew}
            size="large"
            className="bg-white text-blue-600 hover:!bg-gray-100"
          >
            Book New Appointment
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Row gutter={[24, 24]}>
          {/* Left Column */}
          <Col xs={24} lg={16}>
            {/* Upcoming Appointments */}
            <Card
              title={<span className="font-semibold text-lg">📅 Upcoming Appointments</span>}
              bordered={false}
              className="shadow-xl rounded-xl hover:shadow-2xl transition"
            >
              {upcomingAppointments.length > 0 ? (
                <List
                  dataSource={upcomingAppointments}
                  renderItem={(appt) => (
                    <List.Item
                      className="hover:bg-blue-50 rounded-lg px-3 transition"
                      actions={[
                        <Button type="link" onClick={() => handleViewAppointment(appt.id)}>
                          View Details
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <div className="bg-blue-100 p-3 rounded-full">
                            <CalendarOutlined className="text-blue-500 text-xl" />
                          </div>
                        }
                        title={<span className="font-semibold">{appt.serviceName}</span>}
                        description={
                          <Space direction="vertical" size={0}>
                            <Text>
                              <ClockCircleOutlined /> {appt.date} at {appt.time}
                            </Text>
                            <Tag
                              className="rounded-full px-3 py-1 text-sm"
                              color={
                                appt.status === "Confirmed"
                                  ? "green"
                                  : appt.status === "Pending"
                                  ? "orange"
                                  : "blue"
                              }
                            >
                              {appt.status}
                            </Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No upcoming appointments" />
              )}
            </Card>

            {/* Past Appointments */}
            <Card
              title={<span className="font-semibold text-lg">📜 Past Appointments</span>}
              bordered={false}
              className="shadow-xl rounded-xl hover:shadow-2xl transition mt-6"
            >
              {pastAppointments.length > 0 ? (
                <List
                  dataSource={pastAppointments}
                  renderItem={(appt) => (
                    <List.Item
                      className="hover:bg-gray-50 rounded-lg px-3 transition"
                      actions={[
                        <Button
                          type="link"
                          icon={<MessageOutlined />}
                          onClick={() => handleFeedback(appt.id)}
                        >
                          Give Feedback
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <div className="bg-gray-200 p-3 rounded-full">
                            <HistoryOutlined className="text-gray-600 text-xl" />
                          </div>
                        }
                        title={<span className="font-semibold">{appt.serviceName}</span>}
                        description={
                          <Space direction="vertical" size={0}>
                            <Text>
                              <ClockCircleOutlined /> {appt.date} at {appt.time}
                            </Text>
                            <Tag
                              className="rounded-full px-3 py-1 text-sm"
                              color={
                                appt.status === "Confirmed"
                                  ? "green"
                                  : appt.status === "Pending"
                                  ? "orange"
                                  : "blue"
                              }
                            >
                              {appt.status}
                            </Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No past appointments" />
              )}
            </Card>
          </Col>

          {/* Right Column */}
          <Col xs={24} lg={8}>
            <Card
              title={<span className="font-semibold text-lg">🔔 Notifications</span>}
              bordered={false}
              className="shadow-xl rounded-xl hover:shadow-2xl transition"
            >
              {notifications.length > 0 ? (
                <List
                  dataSource={notifications}
                  renderItem={(note) => (
                    <List.Item className="hover:bg-gray-50 rounded-lg px-3 transition">
                      <List.Item.Meta
                        avatar={
                          <div
                            className={`p-3 rounded-full ${
                              note.type === "reminder"
                                ? "bg-green-100"
                                : note.type === "change"
                                ? "bg-orange-100"
                                : "bg-red-100"
                            }`}
                          >
                            {note.type === "reminder" ? (
                              <BellOutlined className="text-green-500 text-xl" />
                            ) : note.type === "change" ? (
                              <ExclamationCircleOutlined className="text-orange-500 text-xl" />
                            ) : (
                              <FileTextOutlined className="text-red-500 text-xl" />
                            )}
                          </div>
                        }
                        title={<span className="font-medium">{note.message}</span>}
                        description={<Text type="secondary">{note.date}</Text>}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="No notifications" />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CitizenDashboard;
