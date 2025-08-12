import { Form, Input } from "antd";
import { FC } from "react";

/**
 * Renders password and confirm password fields with validation.
 */
const ConfirmPassword: FC = () => {
  return (
    <div className="flex justify-between gap-4">
      <Form.Item
        label="Password"
        name="password"
        className="w-full"
        rules={[{ required: true, message: "Please enter password" }]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm-password"
        className="w-full"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>
    </div>
  );
};

export default ConfirmPassword;
