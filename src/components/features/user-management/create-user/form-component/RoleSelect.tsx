import { Form, Select } from "antd";

const { Option } = Select;

const RoleSelect = () => {
  return (
    <>
      <Form.Item
        label="Role"
        name="role"
        className="w-2/5"
        rules={[{ required: true, message: "Please select a role" }]}
      >
        <Select
          placeholder="Select role"
          showSearch
          optionFilterProp="children"
          allowClear
        >
          <Option key="admin" value="admin">
            Department Officer
          </Option>
          <Option key="officer" value="officer">
            Admin Officer
          </Option>
          <Option key="analytics" value="ana">
            Analytics Viewer
          </Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default RoleSelect;
