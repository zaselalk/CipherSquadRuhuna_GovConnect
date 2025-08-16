import React from "react";
import { Modal, Button, Typography } from "antd";

const { Text } = Typography;

interface FeedbackModalProps {
  feedback: any | null;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ feedback, onClose }) => {
  return (
    <Modal
      title="Feedback Details"
      open={!!feedback}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
    >
      {feedback &&
        Object.entries(feedback).map(([key, value]) => (
          <p key={key}>
            <Text strong>{key.replace(/([A-Z])/g, " $1")}: </Text> {String(value)}
          </p>
        ))}
    </Modal>
  );
};

export default FeedbackModal;
