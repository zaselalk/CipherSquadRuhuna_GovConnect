import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { UserRoleCreateModal } from "./UserRoleCreateModal";
import { useRoles } from "../../../hooks/useRoles";
import { UserRoleUpdateModal } from "./UserRoleUpdateModal";
import { Button, message, Modal, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useUserContext } from "../../../pages/admin/UsersPage";
import UserService from "../../../services/user.service";
import { useMutation } from "@tanstack/react-query";
import { userRole } from "../../../services/types/user-role.types";

export const UserRoleset = () => {
  const { setUserRoleCount } = useUserContext();

  const [isCreateNewRole, setIsCreateNewRole] = useState(false);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [roleId, setRoleId] = useState<string>("");
  const { data: roles = [], isLoading, error, refetch } = useRoles();

  const userService = new UserService();

  useEffect(() => {
    const totalRoles = roles.length;
    setUserRoleCount(totalRoles);
  }, [roles]);

  const handleRoleEdit = (roleId: string) => {
    setRoleId(roleId);
    setIsUpdatingRole(true);
  };

  // user role delete mutation
  const deleteUserRoleMutation = useMutation({
    mutationFn: (role: userRole) => userService.deleteUserRole(role.id),
    onSuccess: () => {
      message.success("Role deleted successfully");
      refetch();
    },
    onError: (error: any) => {
      message.error(`Error deleting user: ${error.message}`);
    },
  });

  const handleRoleDelete = (role: userRole) => {
    Modal.confirm({
      title: "Are you sure you want to delete this role?",
      content: `Role: ${role.role}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deleteUserRoleMutation.mutate(role);
      },
      onCancel: () => {
        message.info("Deletion cancelled");
      },
    });
  };

  const columns = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (role: any) => (
        <div className="flex">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleRoleEdit(role.id)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRoleDelete(role)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="col-span-4">
      <UserRoleCreateModal
        isCreateNewRole={isCreateNewRole}
        setIsCreateNewRole={setIsCreateNewRole}
        refetch={refetch}
      />
      {roleId && (
        <UserRoleUpdateModal
          isUpdatingRole={isUpdatingRole}
          setIsUpdatingRole={setIsUpdatingRole}
          roleId={roleId}
        />
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <Title level={4} className="!mb-0">
            User Roles
          </Title>
          <Button
            onClick={() => setIsCreateNewRole(true)}
            type="primary"
            icon={<UsergroupAddOutlined />}
          >
            New Role
          </Button>
        </div>
        {isLoading ? (
          <p className="mt-4 text-sm text-gray-600">Loading roles...</p>
        ) : error ? (
          <p className="mt-4 text-sm text-red-500">Failed to fetch roles.</p>
        ) : (
          <Table
            dataSource={roles}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 10 }}
          />
        )}
      </div>
    </div>
  );
};
