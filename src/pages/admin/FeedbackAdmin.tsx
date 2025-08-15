import React, { useState, useEffect } from "react";
import { Tabs, Table, Modal, Button, Typography, Card, message } from "antd";
import axios from "axios";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import {
  ServiceFeedbackService,
  ServiceFeedback,
} from "../../services/serviceFeedback.service";

const { Title, Text } = Typography;

interface WebFeedback {
  id: string | number;
  userName: string;
  userEmail?: string;
  feedback?: string;
  date?: string;
}

const AdminFeedbackPage: React.FC = () => {
  const [webFeedback, setWebFeedback] = useState<WebFeedback[]>([]);
  const [serviceFeedback, setServiceFeedback] = useState<ServiceFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<
    WebFeedback | ServiceFeedback | null
  >(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        // Fetch web feedback
        const webRes = await axios.get("/api/feedback/web");
        setWebFeedback(Array.isArray(webRes.data) ? webRes.data : []);

        // Fetch service feedback and ensure it's an array
        const serviceRes = await ServiceFeedbackService.getAllFeedbacks();
        setServiceFeedback(Array.isArray(serviceRes) ? serviceRes : []);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        message.error("Failed to fetch feedback. Check your backend server.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const columnsWeb = [
    { title: "User", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "userEmail", key: "userEmail" },
    { title: "Feedback", dataIndex: "feedback", key: "feedback" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: WebFeedback) => (
        <Button type="primary" onClick={() => setSelectedFeedback(record)}>
          View
        </Button>
      ),
    },
  ];

  const columnsService = [
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Service", dataIndex: "serviceName", key: "serviceName" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ServiceFeedback) => (
        <Button type="primary" onClick={() => setSelectedFeedback(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <DashboardContainer>
      <div style={{ padding: 24, minHeight: "100vh" }}>
        <Card
          bordered={false}
          style={{
            marginBottom: 24,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Title level={2}>Admin Feedback Dashboard</Title>
          <Text type="secondary">
            Manage and review feedback submitted via the web app and service
            system.
          </Text>
        </Card>

        <Card
          bordered={false}
          style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Web App Feedback",
                children: (
                  <Table
                    dataSource={webFeedback}
                    columns={columnsWeb}
                    rowKey={(record) => record.id.toString()}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                  />
                ),
              },
              {
                key: "2",
                label: "Service Feedback",
                children: (
                  <Table
                    dataSource={serviceFeedback}
                    columns={columnsService}
                    rowKey={(record) => record.id.toString()}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                  />
                ),
              },
            ]}
          />
        </Card>

        <Modal
          title="Feedback Details"
          open={!!selectedFeedback}
          onCancel={() => setSelectedFeedback(null)}
          footer={[
            <Button key="close" onClick={() => setSelectedFeedback(null)}>
              Close
            </Button>,
          ]}
          bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          {selectedFeedback &&
            Object.entries(selectedFeedback).map(([key, value]) => (
              <p key={key}>
                <Text strong>{key.replace(/([A-Z])/g, " $1")}: </Text>{" "}
                {String(value)}
              </p>
            ))}
        </Modal>
      </div>
    </DashboardContainer>
  );
};

export default AdminFeedbackPage;
