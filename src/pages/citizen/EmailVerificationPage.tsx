import { FC } from "react";
import { useLocation, Link } from "react-router";
import { Card, Typography, Space, Button } from "antd";
import { MailOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";
import { LandingFooter } from "../../components/features/landing-page/LandingFooter";

const { Title, Paragraph } = Typography;
const EmailVerificationPage: FC = () => {
  const location = useLocation();

  // Get email passed from previous page
  const email = location.state?.email || "";

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
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: "#52c41a" }} />
            <Title level={3}>Verify Your Email</Title>
            <Paragraph>
              <MailOutlined /> We sent a verification link to <b>{email}</b>.{" "}
              <br />
              Please check your inbox and click the link to activate your
              account.
            </Paragraph>
            <Paragraph>
              Didn't receive the email? Check your spam folder or{" "}
              <Link to="/resend-verification">
                <Button type="link" style={{ padding: 0 }}>
                  click here to resend
                </Button>
              </Link>
            </Paragraph>
          </Space>
        </Card>
      </div>
      <LandingFooter />
    </>
  );
};

export default EmailVerificationPage;
