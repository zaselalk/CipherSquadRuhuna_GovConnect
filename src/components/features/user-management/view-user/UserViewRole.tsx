import { Button, message, Select } from "antd";
import {
  CloseCircleOutlined,
  EditFilled,
  SaveOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { useRoles } from "../../../../hooks/useRoles";
import UserService from "../../../../services/user.service";
import { useMutation } from "@tanstack/react-query";
import { userRole } from "../../../../services/types/user-role.types";

interface UserViewRoleProps {
  roleName: string;
  userId: number;
  refetch: () => void;
}

export const UserViewRole = ({
  roleName,
  userId,
  refetch,
}: UserViewRoleProps) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [newRole, setNewRole] = useState<string>(roleName);
  const { data: roles = [], isLoading, error } = useRoles();
  const userService = new UserService();

  const mutation = useMutation({
    mutationFn: async (data: { roleId: number }) => {
      await userService.changeUserRole(userId, data.roleId);
    },
    onSuccess: () => {
      message.success("Role updated successfully!");
      refetch(); // Refetch the user data after successful update
    },
    onError: (error) => {
      message.error("Failed to update role: " + error.message);
      console.error("Failed to update role:", error);
    },
  });

  const handleRoleChangeSave = () => {
    const roleId = roles.find((role: any) => role.role === newRole)?.id;

    // Ensure roleId is found before proceeding
    if (roleId === undefined || roleId === null) {
      console.error("Role ID not found for the selected role:", newRole);
      return;
    }

    const updatedData = {
      roleId: roleId,
    };

    mutation.mutate(updatedData);
    setIsEdit(false);
  };

  const handleNewRoleChangeCancel = () => {
    setNewRole(roleName);
    setIsEdit(false);
  };

  return (
    <div className="w-1/2 flex items-baseline gap-2">
      <p>Role</p>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!isLoading && !error && (
        <>
          {!isEdit && (
            <>
              <p className="text-gray-500">{newRole}</p>
              <Button
                type="link"
                danger
                icon={<EditFilled />}
                onClick={() => setIsEdit(!isEdit)}
              >
                Change
              </Button>
            </>
          )}

          {isEdit && (
            <>
              <Select
                placeholder="Select role"
                showSearch
                optionFilterProp="children"
                allowClear
                onChange={(value) => setNewRole(value)}
                value={newRole}
              >
                {roles.map((role: userRole) => (
                  <Option key={role.id.toString()} value={role.role}>
                    {role.role}
                  </Option>
                ))}
              </Select>

              <Button
                type="primary"
                className="ml-2"
                icon={<SaveOutlined />}
                onClick={handleRoleChangeSave}
              >
                Save
              </Button>
              <Button
                type="primary"
                danger
                className="ml-2"
                icon={<CloseCircleOutlined />}
                onClick={handleNewRoleChangeCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};
