import { Card, Row, Col, Divider, Space, Typography, Alert } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Props {
  appointmentData: any;
  serviceNames: Record<string, string>;
}

const StepConfirmation = ({ appointmentData, serviceNames }: Props) => (
  <Card title="Confirmation Details">
    <Row gutter={[24, 24]}>
      <Col xs={24} md={12}>
        <Card type="inner" title="Appointment Details">
          <Space direction="vertical" size="middle" className="w-full">
            <div><Text strong>Service:</Text><br />{serviceNames[appointmentData.serviceType || ""] || "Not selected"}</div>
            <Divider />
            <div><Text strong>Date:</Text><br /><Space><CalendarOutlined className="text-blue-500" />{appointmentData.preferredDate || "Not selected"}</Space></div>
            <Divider />
            <div><Text strong>Time:</Text><br /><Space><ClockCircleOutlined className="text-green-500" />{appointmentData.preferredTime || "Not selected"}</Space></div>
          </Space>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card type="inner" title="Personal Information">
          <Space direction="vertical" size="middle" className="w-full">
            <div><Text strong>Name:</Text><br />{appointmentData.fullName || "Not provided"}</div>
            <Divider />
            <div><Text strong>NIC:</Text><br />{appointmentData.nic || "Not provided"}</div>
            <Divider />
            <div><Text strong>Email:</Text><br />{appointmentData.email || "Not provided"}</div>
            <Divider />
            <div><Text strong>Phone:</Text><br />{appointmentData.phone || "Not provided"}</div>
          </Space>
        </Card>
      </Col>
    </Row>

    <Alert message="Review carefully. Changes require contact at 1919." type="warning" showIcon className="mt-4" />
  </Card>
);

export default StepConfirmation;
