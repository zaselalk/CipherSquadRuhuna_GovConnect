import { Modal, Button } from "antd";

const ShiftApplyModal = ({ shift, onClose, onConfirm }: any) => {
  return (
    <Modal
      title={`Apply for Shift - ${shift.day} ${shift.type}`}
      open={!!shift}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>No</Button>,
        <Button key="submit" type="primary" onClick={onConfirm}>Yes</Button>,
      ]}
    >
      <p>Are you sure you want to apply for this shift?</p>
      <p><strong>Date:</strong> 2025/08/{shift.id}</p>
      <p><strong>Type:</strong> {shift.type} Shift</p>
    </Modal>
  );
};

export default ShiftApplyModal;
