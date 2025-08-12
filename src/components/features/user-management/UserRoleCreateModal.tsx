import { FC } from "react";
import { Modal } from "antd";
import { UserRoleCreateModalProps } from "../../../services/types/user-role.types";
import { UserRoleCreateForm } from "./role-management/UserRoleCreateForm";

export const UserRoleCreateModal: FC<UserRoleCreateModalProps> = ({
  isCreateNewRole,
  setIsCreateNewRole,
  refetch,
}) => {
  return (
    <Modal
      title="Create New Role"
      open={isCreateNewRole}
      onCancel={() => setIsCreateNewRole(false)}
      footer={null}
      width={"80%"}
      style={{ top: 20 }}
      // onClose={() => refetch()}
    >
      <UserRoleCreateForm
        refetch={refetch}
        setIsCreateNewRole={setIsCreateNewRole}
      />
    </Modal>
  );
};
