import { Card, Row, Col, Divider, Space, Typography, Alert, Button } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Props {

  appointmentData: any;
  serviceNames: Record<string, string>;
  onConfirm: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

const StepConfirmation = ({ appointmentData, serviceNames, onConfirm, onPrev, isSubmitting }: Props) => (
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

    <Alert
      message="Check whether the all data you inserted is correct before confirming."
      type="warning"
      showIcon
      className="mt-4"
    />

    <div className="mt-6 flex justify-between">
      <Button onClick={onPrev}>
        Previous
      </Button>
      
      <Button type="primary" onClick={onConfirm} loading={isSubmitting}>
        Confirm Booking
      </Button>
    </div>
  </Card>
);

export default StepConfirmation;
