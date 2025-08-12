import { FC, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { loginState } from "../../types/login";
import { Alert, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { ArrowBigLeft } from "lucide-react";
import { useResidentAuth } from "../../components/auth/ResidentAuthContext";

const ResidentLoginPage: FC = () => {
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const { login, isLoading } = useResidentAuth();

  // Get the intended destination from location state
  const from = location.state?.from || "/resident/dashboard";

  const onSubmit = async (values: loginState) => {
    try {
      setError(null);
      await login(values.email, values.password);
      // Navigate to intended destination after successful login
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#008FFB] rounded-r-3xl relative">
        {/* Logo or Illustration */}
        <div className="flex flex-col items-center">
          <img
            src="/images/resident-login.png"
            alt="Logo"
            // className="w-32 h-32 mb-6"
          />
          <h3 className="text-2xl text-blue-50">Resident Login</h3>
          <p className="text-blue-200 text-center mt-2">
            Access your profile and manage your health records.
          </p>
          <Link
            to="/"
            className="absolute top-4 left-4 text-white hover:text-blue-200"
          >
            <div className="flex items-center">
              <ArrowBigLeft className="text-2xl" />
              <span className="ml-2">Back to Home</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-8">
            <span className="text-2xl font-semibold text-[#008FFB]">
              Resident Login
            </span>
          </div>

          {error && (
            <Alert message={error} type="error" showIcon className="mb-4" />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{ email: "", password: "" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter Your Email Address"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter Your Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            Don't have an account? Meet our staff at hospital for registration.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentLoginPage;
