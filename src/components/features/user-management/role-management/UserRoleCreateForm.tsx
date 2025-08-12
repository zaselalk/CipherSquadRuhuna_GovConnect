import { Button, Checkbox, Form, Input, message } from "antd";
import { FC, useState } from "react";
import allPermissions from "./data/allPermission";
import { NewUserRole } from "../../../../services/types/user-role.types";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../../../services/user.service";
import { PermissionCard } from "./PermissionCard";

interface UserRoleCreateFormProps {
  refetch: () => void;
  setIsCreateNewRole: (isOpen: boolean) => void;
}

export const UserRoleCreateForm: FC<UserRoleCreateFormProps> = ({
  refetch,
  setIsCreateNewRole,
}) => {
  const [form] = Form.useForm();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isCreatingRole, setIsCreatingRole] = useState(false);

  // initialize user service
  const User = new UserService();

  /**
   *  Handles the selection of all permissions.
   * @param checked - boolean value to check if all permissions are selected
   */
  const handleSelectAll = (checked: boolean) => {
    setIsAllSelected(checked);
    if (checked) {
      const allPerms = allPermissions.reduce<string[]>(
        (acc, { perms }) => [...acc, ...perms],
        []
      );
      form.setFieldsValue({ permission: allPerms });
    } else {
      form.setFieldsValue({ permission: [] });
    }
  };

  /**
   * Handles permission selection logic to ensure 'view' is checked if 'edit' or 'delete' is selected.
   */
  const handlePermissionChange = (checkedValues: string[]) => {
    // Ensure if edit or delete is selected, view is also selected for that module
    let updated = [...checkedValues];
    checkedValues.forEach((perm) => {
      const [module, action] = perm.split(":");
      if (
        (action === "edit" || action === "delete" || action === "create") &&
        !checkedValues.includes(`${module}:view`)
      ) {
        updated.push(`${module}:view`);

        // display a message to the user
        message.info(
          `Selecting "${perm}" automatically includes "${module}:view" permission.`
        );
      }
    });

    // Remove duplicates
    updated = Array.from(new Set(updated));
    form.setFieldsValue({ permission: updated });
  };

  /**
   * user role create mutation
   */
  const mutation = useMutation({
    mutationFn: async ({ role, permission }: NewUserRole) => {
      setIsCreatingRole(true);
      await User.crateUserRole(role, permission);
    },
    onSuccess: () => {
      setIsCreatingRole(false);
      message.success("New User Role Created!");
      form.resetFields();
      refetch();
      setIsCreateNewRole(false);
    },
    onError: (error: any) => {
      setIsCreatingRole(false);
      message.error(error.message);
    },
  });

  /**
   * Send a http request to create a new user role.
   * @param values - The values from the form
   */
  const handleSubmit = (values: NewUserRole) => {
    mutation.mutate(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ roleName: "", permissionList: [] }}
    >
      <Form.Item
        label="Role Name"
        name="role"
        rules={[{ required: true, message: "Role name is required" }]}
      >
        <Input placeholder="Enter role name" />
      </Form.Item>

      <Form.Item
        label="Permissions"
        name="permission"
        rules={[{ required: true, message: "Select at least one permission" }]}
      >
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={handlePermissionChange}
        >
          {allPermissions.map(({ group, perms }) => (
            <PermissionCard key={group} title={group} permissions={perms} />
          ))}
        </Checkbox.Group>
      </Form.Item>

      <Form.Item>
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={isAllSelected}
        >
          {isAllSelected ? "Unselect All" : "Select All"}
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button onClick={() => form.resetFields()} danger>
            Clear
          </Button>
          <Button type="primary" htmlType="submit" loading={isCreatingRole}>
            Create Role
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
