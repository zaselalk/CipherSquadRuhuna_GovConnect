import React, { useState } from "react";
import { Tabs, Card, Typography } from "antd";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { WebFeedback } from "../../components/features/Feedback-admin-page/WebFeedbackTab";
import { ServiceFeedback } from "../../services/serviceFeedback.service";
import WebFeedbackTab from "../../components/features/Feedback-admin-page/WebFeedbackTab";
import ServiceFeedbackTab from "../../components/features/Feedback-admin-page/ServiceFeedbackTab";
import FeedbackModal from "../../components/features/Feedback-admin-page/FeedbackModal";

const { Title, Text } = Typography;

const AdminFeedbackPage: React.FC = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<WebFeedback | ServiceFeedback | null>(null);

  return (
    <DashboardContainer>
      <div style={{ padding: 24, minHeight: "100vh" }}>
        <Card
          bordered={false}
          style={{ marginBottom: 24, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Title level={2}>Admin Feedback Dashboard</Title>
          <Text type="secondary">
            Manage and review feedback submitted via the web app and service system.
          </Text>
        </Card>

        <Card bordered={false} style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: "Web App Feedback",
                children: <WebFeedbackTab onView={setSelectedFeedback} />,
              },
              {
                key: "2",
                label: "Service Feedback",
                children: <ServiceFeedbackTab onView={setSelectedFeedback} />,
              },
            ]}
          />
        </Card>

        <FeedbackModal feedback={selectedFeedback} onClose={() => setSelectedFeedback(null)} />
      </div>
    </DashboardContainer>
  );
};

export default AdminFeedbackPage;
