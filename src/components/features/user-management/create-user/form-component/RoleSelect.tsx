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
          <Option key="admin" value="Administrator">
            Department Officer
          </Option>
          <Option key="officer" value="Officer">
            Admin Officer
          </Option>
          <Option key="analytics" value="Analyst">
            Analytics Viewer
          </Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default RoleSelect;
