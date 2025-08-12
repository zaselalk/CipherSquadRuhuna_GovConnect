import { Form, Select } from "antd";
import { userRole } from "../../../../../services/types/user-role.types";
import { useRoles } from "../../../../../hooks/useRoles";
const { Option } = Select;

const RoleSelect = () => {
  const { data: roles = [], isLoading, error } = useRoles();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
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
          {roles.map((role: userRole) => (
            <Option key={role.id} value={role.id}>
              {role.role}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default RoleSelect;
