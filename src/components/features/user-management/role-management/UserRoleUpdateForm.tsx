import { Button, Checkbox, Form, Input, message } from "antd";
import { FC, useEffect, useState } from "react";
import { useSingleRole } from "../../../../hooks/useSingleRole";
import { useMutation } from "@tanstack/react-query";
import UserService from "../../../../services/user.service";
import allPermissions from "./data/allPermission";

interface UserRoleUpdateFormProps {
  roleId: string;
}

export const UserRoleUpdateForm: FC<UserRoleUpdateFormProps> = ({ roleId }) => {
  const [form] = Form.useForm();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  // hooks to get the role data
  const {
    data: roles,
    isLoading,
    isSuccess,
    refetch: refetchUserRoleData,
  } = useSingleRole(roleId);
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
   * Mutation to update user role
   * @param roleName - name of the role
   * @param permissionList - list of permissions
   */
  const mutation = useMutation({
    mutationFn: async ({
      roleName,
      permissionList,
    }: {
      roleName: string;
      permissionList: string[];
    }) => {
      await User.updateUserRole(roleId, roleName, permissionList);
      setIsUpdatingRole(true);
    },
    onSuccess: () => {
      message.success("User Role Updated Successfully!");
      refetchUserRoleData();
      setIsUpdatingRole(false);
    },
    onError: (error: any) => {
      message.error(error.message);
      setIsUpdatingRole(false);
    },
  });

  const handleUserUpdate = (values: any) => {
    const { role, permission } = values;
    mutation.mutate({ roleName: role, permissionList: permission });
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
   * get all permissions and set them to the form
   */
  useEffect(() => {
    if (isSuccess && roles.data) {
      try {
        const parsed = JSON.parse(roles.data.permission);
        if (Array.isArray(parsed)) {
          setSelectedPermissions(parsed);

          form.setFieldValue("permission", parsed);
          form.setFieldValue("role", roles.data.role);

          // Check if all permissions are selected
          const allPerms = allPermissions.reduce<string[]>(
            (acc, { perms }) => [...acc, ...perms],
            []
          );
          setIsAllSelected(parsed.length === allPerms.length);
        }
      } catch (error) {
        console.error("Error parsing permissions", error);
      }
    }
  }, [roles, isSuccess]);

  return (
    !isLoading &&
    isSuccess &&
    selectedPermissions && (
      <Form
        form={form}
        layout="vertical"
        name="update-role"
        onFinish={handleUserUpdate}
        initialValues={{
          role: roles.data.role,
          permission: roles.data.permission,
        }}
        onChange={() => {
          const values = form.getFieldValue("permission");

          // Check if all permissions are selected
          setIsAllSelected(
            values.length ===
              allPermissions.reduce<string[]>(
                (acc, { perms }) => [...acc, ...perms],
                []
              ).length
          );
        }}
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
          rules={[
            { required: true, message: "Select at least one permission" },
          ]}
        >
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={handlePermissionChange}
          >
            {allPermissions.map(({ group, perms }) => (
              <div
                key={group}
                style={{
                  marginBottom: "2rem",
                  padding: "1rem",
                  border: "1px solid #d9d9d9",
                  borderRadius: "8px",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  {group}
                </strong>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {perms.map((perm) => {
                    return (
                      <Checkbox
                        key={perm}
                        value={perm}
                        checked={selectedPermissions.includes(perm)}
                      >
                        {perm.split(":")[1]}
                      </Checkbox>
                    );
                  })}
                </div>
              </div>
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
            <Button type="primary" htmlType="submit" loading={isUpdatingRole}>
              Update Role
            </Button>
          </div>
        </Form.Item>
      </Form>
    )
  );
};
