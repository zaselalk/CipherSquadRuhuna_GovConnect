import React from "react";
import { Modal } from "antd";

interface ConfirmPopupProps {
  visible: boolean;
  title?: string;
  content?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  visible,
  title = "Are you sure?",
  content = "Do you really want to proceed?",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
      centered
    >
      {content}
    </Modal>
  );
};

export default ConfirmPopup;
