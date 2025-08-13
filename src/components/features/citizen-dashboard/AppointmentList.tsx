import React from "react";
import { List, Typography, Tag, Button } from "antd";

const { Text } = Typography;

interface Appointment {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Rescheduled";
}

interface AppointmentListProps {
  appointments: Appointment[];
  type: "upcoming" | "past";
  onViewAppointment?: (id: string) => void;
  onGiveFeedback?: (id: string) => void;
}

const statusColor = (status: Appointment["status"]) => {
  switch (status) {
    case "Confirmed":
      return "green";
    case "Pending":
      return "gold";
    case "Rescheduled":
      return "blue";
    default:
      return "default";
  }
};

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  type,
  onViewAppointment,
  onGiveFeedback,
}) => {
  if (appointments.length === 0) {
    return (
      <Text
        type="secondary"
        style={{ fontSize: 16, color: "#6b7280", userSelect: "none" }}
      >
        {type === "upcoming" ? "No upcoming appointments." : "No past appointments."}
      </Text>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={appointments}
      renderItem={({ id, serviceName, date, time, status }) => (
        <List.Item
          key={id}
          style={{
            borderRadius: 12,
            padding: 20,
            marginBottom: 12,
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            cursor: type === "upcoming" ? "pointer" : "default",
            transition: "box-shadow 0.3s ease",
            boxShadow: "none",
          }}
          onClick={() => type === "upcoming" && onViewAppointment?.(id)}
          onMouseEnter={(e) => {
            if (type === "upcoming") {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 8px rgba(0, 0, 0, 0.12)";
            }
          }}
          onMouseLeave={(e) => {
            if (type === "upcoming") {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }
          }}
          actions={
            type === "past"
              ? [
                  <Button
                    type="primary"
                    size="middle"
                    key="feedback"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering onClick of List.Item
                      onGiveFeedback?.(id);
                    }}
                    style={{
                      fontWeight: 600,
                      borderRadius: 8,
                      boxShadow: "0 2px 6px rgba(37, 99, 235, 0.3)",
                      transition: "box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 4px 12px rgba(37, 99, 235, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 2px 6px rgba(37, 99, 235, 0.3)";
                    }}
                  >
                    Give Feedback
                  </Button>,
                ]
              : undefined
          }
        >
          <List.Item.Meta
            title={
              <Text
                strong
                style={{ fontSize: 18, color: "#111827", userSelect: "none" }}
              >
                {serviceName}
              </Text>
            }
            description={
              <Text style={{ color: "#4b5563", userSelect: "none" }}>
                {type === "upcoming" ? `${date} at ${time}` : date}
              </Text>
            }
          />
          {type === "upcoming" && (
            <Tag
              color={statusColor(status)}
              style={{ fontWeight: 600, fontSize: 14, userSelect: "none" }}
            >
              {status}
            </Tag>
          )}
        </List.Item>
      )}
    />
  );
};

export default AppointmentList;
