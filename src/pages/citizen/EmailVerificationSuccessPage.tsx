import { FC, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Card, Typography, Space, Button, Result, Spin } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";
import { LandingFooter } from "../../components/features/landing-page/LandingFooter";
import { CitizenService } from "../../services/citizen.service";

const { Title, Paragraph } = Typography;

interface VerificationState {
  loading: boolean;
  success: boolean;
  message: string;
  error?: string;
}

const EmailVerificationSuccessPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      loading: true,
      success: false,
      message: "",
    }
  );

  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationState({
          loading: false,
          success: false,
          message: "No verification token found",
          error: "Invalid verification link",
        });
        return;
      }

      try {
        await CitizenService.verifyEmail(token);
        setVerificationState({
          loading: false,
          success: true,
          message: "Email verified successfully! You can now log in.",
        });
      } catch (error) {
        setVerificationState({
          loading: false,
          success: false,
          message: "Failed to verify email",
          error: "Network error occurred",
        });
      }
    };

    verifyEmail();
  }, [token]);

  const handleGoToLogin = () => {
    navigate("/auth/login");
  };

  const handleResendEmail = async () => {
    // You can implement resend functionality here if needed
    console.log("Resend email functionality");
  };

  if (verificationState.loading) {
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
              <Spin size="large" />
              <Title level={3}>Verifying Your Email</Title>
              <Paragraph>
                Please wait while we verify your email address...
              </Paragraph>
            </Space>
          </Card>
        </div>
        <LandingFooter />
      </>
    );
  }

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
          {verificationState.success ? (
            <Result
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              title="Email Verified Successfully!"
              subTitle={verificationState.message}
              extra={[
                <Button type="primary" key="login" onClick={handleGoToLogin}>
                  Go to Login
                </Button>,
              ]}
            />
          ) : (
            <Result
              icon={<ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />}
              title="Email Verification Failed"
              subTitle={verificationState.message}
              extra={[
                <Button type="primary" key="login" onClick={handleGoToLogin}>
                  Go to Login
                </Button>,
                <Button key="resend" onClick={handleResendEmail}>
                  Resend Verification Email
                </Button>,
              ]}
            />
          )}
        </Card>
      </div>
      <LandingFooter />
    </>
  );
};

export default EmailVerificationSuccessPage;
