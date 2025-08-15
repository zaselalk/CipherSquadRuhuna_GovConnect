// src/pages/AdminFeedbackPage.tsx
import React, { useState, useEffect } from "react";
import { Tabs, Table, Modal, Button, Typography, Card, Rate } from "antd";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { FeedbackService } from "../../services/generalfeedback.service"; // use your service

const { Title, Text } = Typography;

interface Feedback {
  id: number;
  citizenId: number;
  citizenName?: string; // optional: map from citizen if available
  citizenEmail?: string;
  rating?: number;
  comment?: string;
  createdAt?: string;
}

const AdminFeedbackPage: React.FC = () => {
  const [webFeedback, setWebFeedback] = useState<Feedback[]>([]);
  const [serviceFeedback, setServiceFeedback] = useState<Feedback[]>([]); // placeholder for service feedback
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      try {
        // Fetch general feedback for web app
        const webData = await FeedbackService.getAllFeedbacks();
        setWebFeedback(webData);

        // Optionally fetch service feedback from your API
        // const res = await axios.get("/api/feedback/service");
        // setServiceFeedback(res.data.data || []);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const columnsWeb = [
    { title: "User ID", dataIndex: "citizenId", key: "citizenId" },
    { title: "Rating", dataIndex: "rating", key: "rating", render: (rating: number) => <Rate disabled defaultValue={rating} /> },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt", render: (date: string) => date ? new Date(date).toLocaleString() : "-" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Feedback) => (
        <Button type="primary" onClick={() => setSelectedFeedback(record)}>
          View
        </Button>
      ),
    },
  ];

  const columnsService = [
    { title: "User", dataIndex: "citizenName", key: "citizenName" },
    { title: "Rating", dataIndex: "rating", key: "rating", render: (rating: number) => <Rate disabled defaultValue={rating} /> },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt", render: (date: string) => date ? new Date(date).toLocaleString() : "-" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Feedback) => (
        <Button type="primary" onClick={() => setSelectedFeedback(record)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <DashboardContainer>
      <div style={{ padding: 24, minHeight: "100vh" }}>
        <Card bordered={false} style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Title level={2}>Admin Feedback Dashboard</Title>
          <Text type="secondary">Manage and review feedback submitted via the web app and services.</Text>
        </Card>

        <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Web App Feedback",
                children: <Table dataSource={webFeedback} columns={columnsWeb} rowKey="id" loading={loading} pagination={{ pageSize: 5 }} />,
              },
              {
                key: "2",
                label: "Service Feedback",
                children: <Table dataSource={serviceFeedback} columns={columnsService} rowKey="id" loading={loading} pagination={{ pageSize: 5 }} />,
              },
            ]}
          />
        </Card>

        <Modal
          title="Feedback Details"
          open={!!selectedFeedback}
          onCancel={() => setSelectedFeedback(null)}
          footer={[<Button key="close" onClick={() => setSelectedFeedback(null)}>Close</Button>]}
          bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
        >
          {selectedFeedback && (
            <div>
              <p><Text strong>User ID: </Text> {selectedFeedback.citizenId}</p>
              <p><Text strong>Rating: </Text> <Rate disabled defaultValue={selectedFeedback.rating} /></p>
              <p><Text strong>Comment: </Text> {selectedFeedback.comment || "-"}</p>
              <p><Text strong>Date: </Text> {selectedFeedback.createdAt ? new Date(selectedFeedback.createdAt).toLocaleString() : "-"}</p>
            </div>
          )}
        </Modal>
      </div>
    </DashboardContainer>
  );
};

export default AdminFeedbackPage;
