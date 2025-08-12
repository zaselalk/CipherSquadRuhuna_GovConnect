import { FC } from "react";
import { Modal } from "antd";

import { UserRoleUpdateForm } from "./role-management/UserRoleUpdateForm";

interface UserRoleUpdateModalProps {
  isUpdatingRole: boolean;
  setIsUpdatingRole: (isOpen: boolean) => void;
  roleId: string;
}

export const UserRoleUpdateModal: FC<UserRoleUpdateModalProps> = ({
  isUpdatingRole,
  setIsUpdatingRole,
  roleId,
}) => {
  return (
    <Modal
      title="Update Role"
      open={isUpdatingRole}
      onCancel={() => setIsUpdatingRole(false)}
      footer={null}
      width={"80%"}
      style={{ top: 20 }}
    >
      <UserRoleUpdateForm roleId={roleId} />
    </Modal>
  );
};
