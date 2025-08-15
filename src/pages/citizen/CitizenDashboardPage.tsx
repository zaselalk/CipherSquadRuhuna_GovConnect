import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Layout, Spin, Typography, Badge, Button, Popover } from "antd";
import {
  ClockCircleOutlined,
  HistoryOutlined,
  FileTextOutlined,
  SmileOutlined,
  BellOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import NotificationList from "../../components/features/citizen-dashboard/NotificationList";
import AppointmentList from "../../components/features/citizen-dashboard/AppointmentList";
import Footer from "../../components/common/Footer";
import CommonNav from "../../components/common/CommonNav";
import DocumentSubmissionCard from "../../components/features/citizen-dashboard/DocumentSubmissionCard";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const loggedInCitizenId = 1; // hardcoded for testing purposes


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

const sectionCardStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: 12,
  padding: "24px 32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  marginBottom: 24,
  display: "flex",
  flexDirection: "column",
};

const welcomeStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: 12,
  padding: "20px 32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  marginBottom: 32,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
};

const CitizenDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setUpcomingAppointments([
        {
          id: "1",
          serviceName: "Passport Renewal",
          date: "2025-08-20",
          time: "10:30 AM",
          status: "Confirmed",
        },
        {
          id: "2",
          serviceName: "Driver's License Test",
          date: "2025-08-25",
          time: "02:00 PM",
          status: "Pending",
        },
        {
          id: "3",
          serviceName: "Birth Certificate Update",
          date: "2025-09-01",
          time: "09:00 AM",
          status: "Rescheduled",
        },
      ]);

      setPastAppointments([
        {
          id: "7",
          serviceName: "Property Tax Payment",
          date: "2025-07-10",
          time: "11:00 AM",
          status: "Confirmed",
        },
        {
          id: "8",
          serviceName: "Marriage Certificate Issuance",
          date: "2025-06-15",
          time: "09:30 AM",
          status: "Confirmed",
        },
      ]);

      setNotifications([
        {
          id: "n1",
          message: "Your Passport Renewal appointment is confirmed for Aug 20.",
          type: "reminder",
          date: "2025-08-12",
        },
        {
          id: "n2",
          message: "Driver's License Test rescheduled to Aug 25.",
          type: "change",
          date: "2025-08-10",
        },
        {
          id: "n3",
          message:
            "Please submit your documents before the Passport Renewal appointment.",
          type: "reminder",
          date: "2025-08-11",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Handle notifications popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  // Scroll to document section if URL hash matches
  useEffect(() => {
    if (location.hash === "#document-submission-section") {
      const section = document.getElementById("document-submission-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleBookNew = () => navigate("/resident/dashboard/service-selection");
  const handleViewAppointment = (id: string) =>
    alert(`View or reschedule appointment ${id}`);
  const handleFeedback = (id: string) =>
    alert(`Give feedback for appointment ${id}`);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br ">
        <Spin size="large" tip="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-600 ">
      <CommonNav /> {/* Nav bar will handle hash-based navigation */}
      <Content
        className="px-32 sm:px-8 py-12 overflow-auto"
        aria-label="Citizen Dashboard Content"
      >
        {/* Welcome Message with Notifications + Book Appointment */}
        <div style={welcomeStyle} role="region" aria-label="Welcome message">
          <div className="flex items-center gap-3">
            <SmileOutlined style={{ fontSize: 32, color: "#2563eb" }} />
            <div>
              <Title level={4} style={{ margin: 0, color: "#1e293b" }}>
                Welcome Back!
              </Title>
              <Paragraph style={{ margin: 0, color: "#4b5563" }}>
                We're glad to see you. Manage your appointments and
                notifications below.
              </Paragraph>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <Popover
              content={<NotificationList notifications={notifications} />}
              title="Notifications"
              trigger="click"
              open={notifOpen}
              onOpenChange={setNotifOpen}
              placement="bottomRight"
            >
              <Badge
                count={notifications.length}
                overflowCount={99}
                style={{ backgroundColor: "#2563eb", cursor: "pointer" }}
              >
                <Button
                  shape="circle"
                  type="text"
                  icon={
                    <BellOutlined style={{ color: "#2563eb", fontSize: 20 }} />
                  }
                  aria-label="Toggle notifications"
                />
              </Badge>
            </Popover>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleBookNew}
              className="font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow"
              style={{ padding: "8px 20px", minHeight: 40 }}
            >
              Book New Appointment
            </Button>
          </div>
        </div>

        {/* Appointments Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <section
            style={sectionCardStyle}
            aria-labelledby="upcoming-appointments-title"
          >
            <Title
              level={3}
              id="upcoming-appointments-title"
              className="mb-6 flex items-center gap-2"
              style={{ color: "#1e293b" }}
            >
              <ClockCircleOutlined style={{ color: "#2563eb", fontSize: 26 }} />
              Upcoming Appointments
            </Title>
            <AppointmentList
              appointments={upcomingAppointments}
              type="upcoming"
              onViewAppointment={handleViewAppointment}
            />
            {upcomingAppointments.length === 0 && (
              <Text className="text-gray-500 italic">
                You have no upcoming appointments.
              </Text>
            )}
          </section>

          {/* Past Appointments */}
          <section
            style={sectionCardStyle}
            aria-labelledby="past-appointments-title"
          >
            <Title
              level={3}
              id="past-appointments-title"
              className="mb-6 flex items-center gap-2"
              style={{ color: "#1e293b" }}
            >
              <HistoryOutlined style={{ color: "#2563eb", fontSize: 26 }} />
              Past Appointments
            </Title>
            <div style={{ maxHeight: 400, overflowY: "auto", paddingRight: 8 }}>
              <AppointmentList
                appointments={pastAppointments}
                type="past"
                onGiveFeedback={handleFeedback}
              />
            </div>
            {pastAppointments.length === 0 && (
              <Text className="text-gray-500 italic">
                No past appointments available.
              </Text>
            )}
          </section>
        </div>

        {/* Document Submission */}
        <section
          id="document-submission-section"
          style={sectionCardStyle}
          aria-labelledby="document-submission-title"
          className="mt-8 lg:col-span-3"
        >
          <Title
            level={3}
            id="document-submission-title"
            className="mb-6 flex items-center gap-2"
            style={{ color: "#1e293b" }}
          >
            <FileTextOutlined style={{ color: "#2563eb", fontSize: 26 }} />
            Document Submission
          </Title>
          <DocumentSubmissionCard  citizenId={loggedInCitizenId}/>
          
        </section>
      </Content>
      <Footer />
    </Layout>
  );
};

export default CitizenDashboardPage;
