import { useState, useEffect } from "react";
import {
  CalendarOutlined,
  BellOutlined,
  FileAddOutlined,
  MessageOutlined,
  PlusOutlined,
} from "@ant-design/icons";

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
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
          id: "4",
          serviceName: "Property Tax Payment",
          date: "2025-07-10",
          time: "11:00 AM",
          status: "Confirmed",
        },
        {
          id: "5",
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
          message: "Please submit your documents before the Passport Renewal appointment.",
          type: "reminder",
          date: "2025-08-11",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rescheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleBookNew = () => alert("Navigate to Book New Appointment");
  const handleViewAppointment = (id: string) => alert(`View or reschedule appointment ${id}`);
  const handleFeedback = (id: string) => alert(`Give feedback for appointment ${id}`);
  const handleUploadDocs = () => alert("Navigate to Document Pre-submission page");

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <CalendarOutlined className="text-6xl text-blue-500 mb-4 animate-pulse" />
          <p className="text-lg font-semibold text-blue-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-lg p-8">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Citizen Dashboard</h1>
          <p className="text-blue-200 text-lg opacity-90">Manage your appointments and notifications</p>
        </div>
        <button
          type="button"
          className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition"
          onClick={handleBookNew}
        >
          <PlusOutlined /> Book New Appointment
        </button>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <section className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-900">
            <CalendarOutlined className="text-blue-600 text-3xl" /> Upcoming Appointments
          </h2>

          {upcomingAppointments.length === 0 ? (
            <p className="text-gray-500">No upcoming appointments.</p>
          ) : (
            <ul className="space-y-4">
              {upcomingAppointments.map(({ id, serviceName, date, time, status }) => (
                <li
                  key={id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition"
                  onClick={() => handleViewAppointment(id)}
                >
                  <div>
                    <p className="font-semibold text-gray-900">{serviceName}</p>
                    <p className="text-gray-600">{date} at {time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(status)}`}>
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Past Appointments */}
        <section className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-900">
            <MessageOutlined className="text-orange-600 text-3xl" /> Past Appointments
          </h2>

          {pastAppointments.length === 0 ? (
            <p className="text-gray-500">No past appointments.</p>
          ) : (
            <ul className="space-y-4">
              {pastAppointments.map(({ id, serviceName, date }) => (
                <li
                  key={id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{serviceName}</p>
                    <p className="text-gray-600">{date}</p>
                  </div>
                  <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-4 py-2 transition"
                    onClick={() => handleFeedback(id)}
                  >
                    Give Feedback
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Notifications & Document Pre-submission */}
        <section className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-900">
              <BellOutlined className="text-yellow-600 text-3xl" /> Notifications
            </h2>

            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications.</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.map(({ id, message, date, type }) => {
                  const iconColor =
                    type === "reminder" ? "text-green-600" :
                    type === "change" ? "text-orange-600" :
                    "text-red-600";

                  return (
                    <li
                      key={id}
                      className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <span className={`text-2xl ${iconColor}`}>
                        {type === "reminder" ? "🔔" : type === "change" ? "⚠️" : "❌"}
                      </span>
                      <div>
                        <p className="text-gray-800 font-medium">{message}</p>
                        <p className="text-gray-500 text-xs mt-1">Date: {date}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-900">
              <FileAddOutlined className="text-indigo-600 text-2xl" /> Document Pre-submission
            </h3>
            <p className="mb-4 text-gray-700">
              Upload your documents in advance to save time on appointment day.
            </p>
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl py-3 transition"
              onClick={handleUploadDocs}
            >
              Upload Documents
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CitizenDashboard;
