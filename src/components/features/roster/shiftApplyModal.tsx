import { useState } from "react";
import { Button, Modal } from "antd";
import ConfirmPopup from "../../common/ConfirmPopup";

const ShiftApplyModal = ({ shift, onClose, onConfirm }: any) => {
  const [confirmVisible, setConfirmVisible] = useState(false);

  if (!shift) return null;

  const handleSubmit = () => {
    setConfirmVisible(true); // show confirmation popup
  };

  const handleConfirm = () => {
    onConfirm(); // call the original onConfirm
    setConfirmVisible(false);
    onClose(); // close the modal after submission
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <>
      <Modal
        title={`Apply for Shift - ${shift.day} ${shift.type}`}
        open={!!shift}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Apply Now
          </Button>,
        ]}
      >
        <br/>
        <p><strong>Date:</strong> 2025/08/{shift.id}</p>
        <p><strong>Type:</strong> {shift.type} Shift</p>
      </Modal>

      {/* Use reusable ConfirmPopup */}
      <ConfirmPopup
        visible={confirmVisible}
        title="Confirm Shift Application"
        content={`Do you want to apply for ${shift.day} ${shift.type} shift?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ShiftApplyModal;
