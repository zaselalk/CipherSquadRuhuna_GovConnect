import React, { useState } from "react";
import { List, Typography, Tag, Button, Modal, Input, Rate, message } from "antd";

const { Text } = Typography;
const { TextArea } = Input;

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
  onGiveFeedback?: (id: string, feedback: { rating: number; comment: string }) => void;
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
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleFeedbackClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setRating(0);
    setComment("");
    setFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      message.warning("Please provide a rating before submitting.");
      return;
    }
    if (selectedAppointment) {
      console.log("Appointment ID:", selectedAppointment.id);
      console.log("Rating:", rating);
      console.log("Comment:", comment);
    }
    if (onGiveFeedback && selectedAppointment) {
      onGiveFeedback(selectedAppointment.id, { rating, comment });
    }
    message.success("Thank you for your feedback!");
    setFeedbackModalOpen(false);
  };



  if (!appointments.length) {
    return (
      <Text
        type="secondary"
        style={{ fontSize: 16, color: "#6b7280", userSelect: "none" }}
      >
        {type === "upcoming"
          ? "No upcoming appointments."
          : "No past appointments."}
      </Text>
    );
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          maxHeight: 400,
          overflowY: "auto",
          paddingRight: 8,
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={appointments}
          renderItem={(appointment) => {
            const { id, serviceName, date, time, status } = appointment;
            return (
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
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
                        key="feedback"
                        size="middle"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFeedbackClick(appointment);
                        }}
                        style={{
                          fontWeight: 600,
                          borderRadius: 8,
                          boxShadow: "0 2px 6px rgba(37, 99, 235, 0.3)",
                          transition: "box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.boxShadow =
                          "0 4px 12px rgba(37, 99, 235, 0.5)")
                        }
                        onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.boxShadow =
                          "0 2px 6px rgba(37, 99, 235, 0.3)")
                        }
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
            );
          }}
        />
      </div>

      {/* Feedback Modal */}
      <Modal
        title={`Give Feedback - ${selectedAppointment?.serviceName || ""}`}
        open={feedbackModalOpen}
        onCancel={() => setFeedbackModalOpen(false)}
        onOk={handleSubmitFeedback}
        okText="Submit"
        cancelText="Cancel"
      >
        <div style={{ marginBottom: 16 }}>
          <Text strong>Rating:</Text>
          <div style={{ marginTop: 8 }}>
            <Rate value={rating} onChange={setRating} />
          </div>
        </div>
        <div>
          <Text strong>Comment:</Text>
          <TextArea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here..."
          />
        </div>
      </Modal>
    </>
  );
};

export default AppointmentList;
