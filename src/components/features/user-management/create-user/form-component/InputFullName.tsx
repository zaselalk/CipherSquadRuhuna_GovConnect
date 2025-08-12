// Import necessary components from Ant Design
import { Form, Input } from "antd";

/**
 * Renders an input field for full name with validation.
 * The field is required and will show an error message if left empty.
 */
const InputFullName = () => {
  return (
    <Form.Item
      label="Full Name"
      className="w-3/5"
      name="name"
      rules={[{ required: true, message: "Please enter full name" }]}
    >
      <Input placeholder="Enter full name" />
    </Form.Item>
  );
};

export default InputFullName;
