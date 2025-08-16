import React, { useState, useEffect } from "react";
import {
  List,
  Typography,
  Tag,
  Button,
  Modal,
  Input,
  Rate,
  message,
} from "antd";
import {
  ServiceFeedbackService,
  ServiceFeedback,
} from "../../../services/serviceFeedback.service";

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
  userId?: string;
  onViewAppointment?: (id: string) => void;
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
  userId,
  onViewAppointment,
}) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState<ServiceFeedback[]>([]);

  // Fetch existing feedbacks for past appointments
  useEffect(() => {
    if (type === "past" && userId) {
      const fetchFeedbacks = async () => {
        try {
          console.log("Fetching feedbacks for userId:", userId);
          const data = await ServiceFeedbackService.getFeedbacksByUserId(
            userId
          );
          console.log("Fetched feedbacks:", data);
          setFeedbacks(data);
        } catch (error: any) {
          console.error("Error fetching feedbacks:", error);
        }
      };
      fetchFeedbacks();
    }
  }, [type, userId, appointments]);

  const handleFeedbackClick = (appointment: Appointment) => {
    console.log("Opening feedback modal for appointment:", appointment);
    setSelectedAppointment(appointment);
    const existing = feedbacks.find((f) => f.appointmentId === appointment.id);
    setRating(existing?.rating || 0);
    setComment(existing?.comment || "");
    setFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = async () => {
    console.log("Submitting feedback for appointment:", selectedAppointment);
    if (rating === 0) {
      message.warning("Please provide a rating before submitting.");
      return;
    }
    if (!selectedAppointment || !userId) return;

    const typeFeedback: ServiceFeedback["type"] =
      rating >= 4 ? "positive" : rating === 3 ? "neutral" : "negative";

    try {
      await ServiceFeedbackService.addFeedback({
        appointmentId: selectedAppointment.id,
        serviceName: selectedAppointment.serviceName,
        userId,
        rating,
        comment,
        type: typeFeedback,
      });
      message.success("Feedback submitted successfully!");
      // Refresh feedbacks
      const updated = await ServiceFeedbackService.getFeedbacksByUserId(userId);
      setFeedbacks(updated);
      setFeedbackModalOpen(false);
    } catch (error: any) {
      message.error(error.message || "Failed to submit feedback");
    }
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
                  if (type === "upcoming")
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  if (type === "upcoming")
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                actions={
                  type === "past"
                    ? [
                        <Button
                          type="primary"
                          key="feedback"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFeedbackClick(appointment);
                          }}
                          style={{ fontWeight: 600, borderRadius: 8 }}
                        >
                          {feedbacks &&
                          feedbacks.find(
                            (f) => f.appointmentId === appointment.id
                          )
                            ? "Edit Feedback"
                            : "Give Feedback"}
                        </Button>,
                      ]
                    : undefined
                }
              >
                <List.Item.Meta
                  title={
                    <Text strong style={{ fontSize: 18, color: "#111827" }}>
                      {serviceName}
                    </Text>
                  }
                  description={
                    <Text style={{ color: "#4b5563" }}>
                      {type === "upcoming" ? `${date} at ${time}` : date}
                    </Text>
                  }
                />
                {type === "upcoming" && (
                  <Tag
                    color={statusColor(status)}
                    style={{ fontWeight: 600, fontSize: 14 }}
                  >
                    {status}
                  </Tag>
                )}
              </List.Item>
            );
          }}
        />
      </div>

      <Modal
        title={`Give Feedback - ${selectedAppointment?.serviceName || ""}`}
        open={feedbackModalOpen}
        onCancel={() => setFeedbackModalOpen(false)}
        onOk={handleSubmitFeedback}
        okText="Submit"
        cancelText="Cancel"
      >
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="feedbackRating">
            <Text strong>Rating:</Text>
          </label>
          <div style={{ marginTop: 8 }}>
            <Rate id="feedbackRating" value={rating} onChange={setRating} />
          </div>
        </div>
        <div>
          <label htmlFor="feedbackComment">
            <Text strong>Comment:</Text>
          </label>
          <TextArea
            id="feedbackComment"
            name="comment"
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
