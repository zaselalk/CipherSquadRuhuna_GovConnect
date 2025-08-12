import { Button, Form, FormInstance, Input } from "antd";
import { FC } from "react";
import { Link } from "react-router";
import { Mail, Lock, User } from "lucide-react";

interface UserLoginFormProps {
  form: FormInstance;
  onFinish: (values: any) => void;
  isLoading?: boolean;
}

export const UserLoginForm: FC<UserLoginFormProps> = ({
  form,
  onFinish,
  isLoading,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ email: "", password: "" }}
      className="space-y-2"
    >
      {/* Email Input */}
      <Form.Item
        label={<span className="text-gray-700 font-medium">Email Address</span>}
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Invalid email format" },
        ]}
      >
        <Input
          placeholder="Enter your email address"
          size="large"
          className="rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
          prefix={<Mail className="w-4 h-4 text-gray-400" />}
        />
      </Form.Item>

      {/* Password Input */}
      <Form.Item
        label={<span className="text-gray-700 font-medium">Password</span>}
        name="password"
        rules={[{ required: true, message: "Password is required" }]}
      >
        <Input.Password
          placeholder="Enter your password"
          size="large"
          className="rounded-lg border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
          prefix={<Lock className="w-4 h-4 text-gray-400" />}
        />
      </Form.Item>

      {/* Login Button */}
      <Form.Item className="mb-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
          size="large"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Form.Item>

      {/* Resident Login Link */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Are you a resident?</p>
        <Link
          to="/resident/login"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
        >
          <User className="w-4 h-4 mr-2" />
          Resident Login Portal
        </Link>
      </div>
    </Form>
  );
};
