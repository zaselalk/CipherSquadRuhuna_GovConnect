import React, { useState, useEffect } from "react";
import { Table, Typography, Button, Modal, Space, Tabs } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Feedback {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  serviceName?: string; // For service feedback
}

const AdminFeedbackPage: React.FC = () => {
  const [webFeedback, setWebFeedback] = useState<Feedback[]>([]);
  const [serviceFeedback, setServiceFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const [webRes, serviceRes] = await Promise.all([
          axios.get("/api/feedback/web"),
          axios.get("/api/feedback/service"),
        ]);
        setWebFeedback(webRes.data);
        setServiceFeedback(serviceRes.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);

  const columnsWeb = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Feedback) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            type="primary"
            onClick={() => {
              setSelectedFeedback(record);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  const columnsService = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Service", dataIndex: "serviceName", key: "serviceName" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Feedback) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            type="primary"
            onClick={() => {
              setSelectedFeedback(record);
              setIsModalVisible(true);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded shadow">
      <Title level={3}>Feedback Management</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Web App Feedback" key="1">
          <Table
            dataSource={webFeedback}
            columns={columnsWeb}
            rowKey="id"
            loading={loading}
          />
        </TabPane>

        <TabPane tab="Service Feedback" key="2">
          <Table
            dataSource={serviceFeedback}
            columns={columnsService}
            rowKey="id"
            loading={loading}
          />
        </TabPane>
      </Tabs>

      {/* Modal for feedback details */}
      <Modal
        title="Feedback Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedFeedback && (
          <div>
            <p><Text strong>Name: </Text> {selectedFeedback.name}</p>
            <p><Text strong>Email: </Text> {selectedFeedback.email}</p>
            {selectedFeedback.serviceName && (
              <p><Text strong>Service: </Text> {selectedFeedback.serviceName}</p>
            )}
            <p><Text strong>Date: </Text> {selectedFeedback.date}</p>
            <p><Text strong>Message: </Text></p>
            <p>{selectedFeedback.message}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminFeedbackPage;
