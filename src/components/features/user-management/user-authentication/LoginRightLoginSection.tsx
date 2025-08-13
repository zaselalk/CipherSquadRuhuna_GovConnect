import { useMutation } from "@tanstack/react-query";
import { Typography, Alert, Form } from "antd";
import { FC, useState } from "react";
import { Building2 } from "lucide-react";
import { loginState } from "../../../../types/login";
import { useAppDispatch } from "../../../../hooks/state/hooks";
import AuthServices from "../../../../services/auth.service";
import { login } from "../../../../store/slices/authSlices";
import { UserLoginForm } from "./UserLoginForm";

const { Title } = Typography;

interface UserLoginSectionProps {
  handleSuccessLogin: () => void;
}

export const LoginRightLoginSection: FC<UserLoginSectionProps> = ({
  handleSuccessLogin,
}) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const Auth = new AuthServices();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const onFinish = (values: loginState) => {
    setError(null); // clear previous errors
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: async ({ email, password }: loginState) => {
      setIsLoggingIn(true);

      const user = await Auth.login(email, password);
      dispatch(
        login({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.role,
          permissions: JSON.parse(user.role.permission),
        })
      );
    },
    onSuccess: () => {
      setIsLoggingIn(false);
      handleSuccessLogin();
    },
    onError: (error: any) => {
      setIsLoggingIn(false);
      setError(error.message);
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <Title level={3} className="text-gray-900 mb-2">
              Officer Login Portal
            </Title>
            <p className="text-gray-600">
              Sign in to view bookings, manage requests, and access your
              dashboard.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              className="mb-6 rounded-lg"
            />
          )}

          {/* Login Form */}
          <UserLoginForm
            form={form}
            onFinish={onFinish}
            isLoading={isLoggingIn}
          />
        </div>
      </div>
    </div>
  );
};
