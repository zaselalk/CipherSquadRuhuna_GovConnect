import { Modal, Avatar } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { UserViewFullName } from "./view-user/UserViewFullName";
import { UserEmailViewComponent } from "./view-user/UserEmailBlock";
import { User } from "../../../services/types/user-services.types";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  initialData: User;
  refetch: () => void;
}

export const UserViewModal = ({
  isOpen,
  handleClose,
  initialData,
  refetch,
}: Props) => {
  return (
    <Modal
      title="View User"
      open={isOpen}
      onCancel={handleClose}
      maskClosable={false}
      keyboard={true}
      width={800}
      footer={null}
    >
      <section className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <Avatar size={64} icon={<UserOutlined />} />
          <h3 className="text-lg font-bold mt-3">Basic Information</h3>
        </div>

        <div className="flex flex-col items-center px-12 gap-4 mt-4 w-full">
          <div className="flex flex-col justify-between w-full">
            <UserEmailViewComponent email={initialData.email} />
            <UserViewFullName
              userFullName={initialData.name}
              userId={initialData.id}
              refetch={refetch}
            />
          </div>
        </div>
      </section>
    </Modal>
  );
};
