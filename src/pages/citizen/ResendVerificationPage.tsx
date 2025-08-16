import { FC, useState } from "react";
import { Card, Typography, Form, Input, Button, message, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";
import { LandingFooter } from "../../components/features/landing-page/LandingFooter";

const { Title, Paragraph } = Typography;

interface ResendFormData {
  email: string;
}

const ResendVerificationPage: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ResendFormData) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        message.success(
          data.message || "Verification email sent successfully!"
        );
        form.resetFields();
      } else {
        message.error(data.message || "Failed to send verification email");
      }
    } catch (error) {
      message.error("Network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-4">
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            textAlign: "center",
            maxWidth: 500,
            width: "100%",
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <MailOutlined style={{ fontSize: 64, color: "#1890ff" }} />
            <Title level={3}>Resend Verification Email</Title>
            <Paragraph>
              Didn't receive the verification email? Enter your email address
              below and we'll send you a new verification link.
            </Paragraph>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ width: "100%", textAlign: "left" }}
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input
                  placeholder="Enter your email address"
                  size="large"
                  prefix={<MailOutlined />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                >
                  Resend Verification Email
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Card>
      </div>
      <LandingFooter />
    </>
  );
};

export default ResendVerificationPage;
