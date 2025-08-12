import { Form } from "antd";
import Input from "antd/es/input/Input";

import { FC } from "react";

/**
 * Renders an input field for email with validation.
 * The field is required and will show an error message if left empty.
 */
const InputEmail: FC = () => {
  return (
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please enter email" }]}
    >
      <Input placeholder="Enter email" type="email" />
    </Form.Item>
  );
};

export default InputEmail;
