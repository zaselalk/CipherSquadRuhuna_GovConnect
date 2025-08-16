import React, { useEffect, useState } from "react";
import { message } from "antd";
import FeedbackTable from "./FeedbackTable";
import { FeedbackService } from "../../../services/generalfeedback.service";

export interface WebFeedback {
  id: number;
  userName: string;
  userEmail?: string;
  feedback?: string;
  date?: string;
}

interface WebFeedbackTabProps {
  onView: (feedback: WebFeedback) => void;
}

const WebFeedbackTab: React.FC<WebFeedbackTabProps> = ({ onView }) => {
  const [webFeedback, setWebFeedback] = useState<WebFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebFeedback = async () => {
      setLoading(true);
      try {
        const feedbacks = await FeedbackService.getAllFeedbacks();
        // Map backend Feedback type to WebFeedback
        const mappedFeedbacks = feedbacks.map(f => ({
          id: f.id,
          userName: `Citizen ${f.citizenId}`,
          feedback: f.comment || "-",
          date: f.createdAt,
        }));
        setWebFeedback(mappedFeedbacks);
      } catch (error) {
        console.error("Error fetching web feedback:", error);
        message.error("Failed to fetch web feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebFeedback();
  }, []);

  const columnsWeb = [
    { title: "User", dataIndex: "userName", key: "userName" },
    { title: "Feedback", dataIndex: "feedback", key: "feedback" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <FeedbackTable
      data={webFeedback}
      columns={columnsWeb}
      loading={loading}
      onView={onView}
      rowKey="id"
    />
  );
};

export default WebFeedbackTab;
