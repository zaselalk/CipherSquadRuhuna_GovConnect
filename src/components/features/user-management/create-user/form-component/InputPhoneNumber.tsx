import { Form, Input } from "antd";

export const InputPhoneNumber = () => {
  return (
    <Form.Item
      label="Phone Number"
      name="phone_number"
      rules={[
        {
          required: true,
          message:
            "Please enter a valid Sri Lankan phone number (+94XXXXXXXXX)",
          pattern: /^\+94[1-9]\d{8}$/, // Sri Lankan phone number format: +94 followed by 9 digits (first digit 1-9)
        },
      ]}
    >
      <Input placeholder="Enter Phone Number (+94XXXXXXXXX)" type="tel" />
    </Form.Item>
  );
};
