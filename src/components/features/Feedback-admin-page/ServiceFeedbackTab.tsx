import React, { useEffect, useState } from "react";
import { message } from "antd";
import { ServiceFeedbackService, ServiceFeedback } from "../../../services/serviceFeedback.service";
import FeedbackTable from "./FeedbackTable";

interface ServiceFeedbackTabProps {
  onView: (feedback: ServiceFeedback) => void;
}

const ServiceFeedbackTab: React.FC<ServiceFeedbackTabProps> = ({ onView }) => {
  const [serviceFeedback, setServiceFeedback] = useState<ServiceFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceFeedback = async () => {
      setLoading(true);
      try {
        const res = await ServiceFeedbackService.getAllFeedbacks();
        setServiceFeedback(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error fetching service feedback:", error);
        message.error("Failed to fetch service feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceFeedback();
  }, []);

  const columnsService = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Service", dataIndex: "serviceName", key: "serviceName" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    { title: "Comment", dataIndex: "comment", key: "comment" },
  ];

  return (
    <FeedbackTable
      data={serviceFeedback}
      columns={columnsService}
      loading={loading}
      onView={onView}
      rowKey="id"
    />
  );
};

export default ServiceFeedbackTab;
