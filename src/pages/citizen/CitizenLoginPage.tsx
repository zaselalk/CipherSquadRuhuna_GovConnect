import { FC, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { loginState } from "../../types/login";
import { Alert, Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useResidentAuth } from "../../components/auth/ResidentAuthContext";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";

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
    <div>
      <LandingHeader />
      <div className="flex min-h-screen  bg-gray-100">
        {/* Left Section */}
        {/* <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#008FFB] rounded-r-3xl relative">

          <div className="flex flex-col items-center">
            <img
              src="/images/resident-login.png"
              alt="Citizen Portal"
              className="w-64 h-64 mb-6 object-contain"
            />
            <h3 className="text-3xl font-bold text-white mb-2">Citizen Portal</h3>
            <p className="text-blue-100 text-center mt-2 max-w-sm text-lg">
              Access Range of Govement Services by login
            </p>
          </div>
        </div> */}

        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
            <div className="flex justify-center mb-8">
              <span className="text-2xl font-semibold text-[#008FFB]">
                Citizen Login
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
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your registered email address"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  size="large"
                  className="rounded-lg"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="w-full bg-[#008FFB] hover:bg-[#0066CC] border-0 rounded-lg h-12 text-lg font-medium"
                  loading={isLoading}
                >
                  {isLoading ? "Login in..." : "Login as Citizen"}
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-6">
              <p className="text-gray-600 mb-3">
                Don't have an account?
              </p>
              <Link
                to="/resident/register"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-[#008FFB] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors font-medium"
              >
                Register as Citizen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ResidentLoginPage;
