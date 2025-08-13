import React, { useRef, useState } from "react";
import { Typography, Card, Button, message, List, Tag, Modal, Select, Popconfirm } from "antd";
import { FileAddOutlined, DeleteOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { Option } = Select;

interface DocumentSubmissionCardProps {
  onUpload?: (file: File, type: string) => void; // optional parent handler
  onDelete?: (file: File, type: string) => void; // optional parent handler for deletion
}

interface UploadedDocument {
  type: string;
  file: File;
}

const DocumentSubmissionCard: React.FC<DocumentSubmissionCardProps> = ({ onUpload, onDelete }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<string>("ID Card");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsModalVisible(true);
      e.target.value = ""; // reset input
    }
  };

  const handleModalOk = () => {
    if (!selectedFile) return;

    const newDoc: UploadedDocument = {
      type: selectedType,
      file: selectedFile,
    };

    setUploadedDocuments((prev) => [...prev, newDoc]);
    message.success(`${selectedFile.name} (${selectedType}) uploaded successfully!`);

    if (onUpload) onUpload(selectedFile, selectedType);

    setSelectedFile(null);
    setSelectedType("ID Card");
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setSelectedFile(null);
    setSelectedType("ID Card");
    setIsModalVisible(false);
  };

  const handleDelete = (index: number) => {
    const removedDoc = uploadedDocuments[index];
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index));
    message.info(`${removedDoc.file.name} removed.`);

    if (onDelete) onDelete(removedDoc.file, removedDoc.type);
  };

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
      <Paragraph className="mb-4 text-gray-700 font-medium text-lg leading-relaxed">
        Upload your documents in advance to save time on appointment day.
      </Paragraph>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Button
        type="primary"
        block
        size="large"
        onClick={handleButtonClick}
        className="font-semibold shadow-lg hover:shadow-xl transition rounded-xl mb-6"
      >
        Upload Documents
      </Button>

      {uploadedDocuments.length > 0 && (
        <List
          header={<b>Uploaded Documents</b>}
          bordered
          dataSource={uploadedDocuments}
          renderItem={(doc, index) => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure to delete this document?"
                  onConfirm={() => handleDelete(index)}
                  okText="Yes"
                  cancelText="No"
                  key="delete"
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <Tag color="blue">{doc.type}</Tag> {doc.file.name}
            </List.Item>
          )}
        />
      )}

      <Modal
        title="Select Document Type"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Upload"
      >
        <Select
          value={selectedType}
          onChange={(value) => setSelectedType(value)}
          style={{ width: "100%" }}
        >
          <Option value="ID Card">ID Card</Option>
          <Option value="Birth Certificate">Birth Certificate</Option>
          <Option value="Passport">Passport</Option>
        </Select>
      </Modal>
    </Card>
  );
};

export default DocumentSubmissionCard;
