import { Card, Input, Row, Col, Form } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, FileTextOutlined } from "@ant-design/icons";

const { TextArea } = Input;


const StepPersonalInfo = () => (
  <Card title="Personal Information">
    <Row gutter={[24, 24]}>
      <Col xs={24} md={12}>
        <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: "Enter full name" }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Enter your full name" />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item name="nic" label="NIC" rules={[{ required: true, message: "Enter NIC" }]}>
          <Input size="large" prefix={<FileTextOutlined />} placeholder="Enter NIC number" />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Enter email" }, { type: "email" }]}>
          <Input size="large" prefix={<MailOutlined />} placeholder="Enter email address" />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Enter phone number" }]}>
          <Input size="large" prefix={<PhoneOutlined />} placeholder="Enter phone number" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="address" label="Address" rules={[{ required: true, message: "Enter address" }]}>
          <TextArea rows={3} placeholder="Enter complete address" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="additionalNotes" label="Additional Notes (Optional)">
          <TextArea rows={3} placeholder="Any additional information" />
        </Form.Item>
      </Col>
    </Row>
  </Card>
);

export default StepPersonalInfo;
