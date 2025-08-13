import React from "react";
import { Typography } from "antd";
import { Card, Button } from "antd";
const { Paragraph} = Typography;
import { FileAddOutlined } from "@ant-design/icons";

interface DocumentSubmissionCardProps {
  onUpload: () => void;
}

const DocumentSubmissionCard: React.FC<DocumentSubmissionCardProps> = ({ onUpload }) => {
  return (
    <Card
      title={
        <div className="flex items-center gap-3 text-gray-900 font-extrabold text-xl select-none">
          <FileAddOutlined className="text-indigo-600 text-3xl" />
          Document Pre-submission
        </div>
      }
      className="rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 flex flex-col justify-between"
      bordered={false}
      bodyStyle={{ padding: "1.5rem" }}
    >
      <Paragraph className="mb-8 text-gray-700 font-medium text-lg leading-relaxed">
        Upload your documents in advance to save time on appointment day.
      </Paragraph>
      <Button
        type="primary"
        block
        size="large"
        onClick={onUpload}
        className="font-semibold shadow-lg hover:shadow-xl transition rounded-xl"
      >
        Upload Documents
      </Button>
    </Card>
  );
};

export default DocumentSubmissionCard;
