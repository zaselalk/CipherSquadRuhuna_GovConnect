import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Row, Col, Alert, message } from "antd";
import ProfileService from "../../../services/profile.service";
import { useAppSelector } from "../../../hooks/state/hooks";
import { useState } from "react";

export const UserChangeChangePassword = () => {
  const [form] = Form.useForm();
  const profileService = new ProfileService();
  const user = useAppSelector((state) => state.auth.user);
  const [error, setError] = useState("");

  const onFinish = (values: any) => {
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const { currentPassword, newPassword } = values;

      const userId = user?.id;

      // Check if userId is available - Temporary solution
      if (!userId) {
        throw new Error("User ID is not available");
      }
      // Assuming you have the user ID available in your state

      return await profileService.updateUserPassword(
        userId,
        currentPassword,
        newPassword
      );
    },
    onSuccess: (data) => {
      console.log(data);
      form.resetFields();
      setError("");
      message.success("Password changed successfully!");
    },
    onError: (error) => {
      console.error(error);
      setError(error.message);
    },
  });

  return (
    <div className="bg-white shadow-md p-5 rounded-2xl mt-5">
      <div>
        {error && (
          <Alert
            description={error}
            type="error"
            closable
            onClose={() => setError("")}
            className="my-5"
          />
        )}
        <h3 className="h3 mb-5 mt-5">Change Password</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
          >
            <Input.Password
              className="rounded-lg"
              placeholder="Enter Current Password"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
              >
                <Input.Password
                  className="rounded-lg"
                  placeholder="Enter New Password"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="rounded-lg"
                  placeholder="Confirm New Password"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
