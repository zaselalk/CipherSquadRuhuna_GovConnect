import React, { useEffect, useRef, useState } from "react";
import { Typography, Card, Button, message, List, Tag, Modal, Select, Popconfirm } from "antd";
import { FileAddOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CitizenDoc, CitizenDocsService } from "../../../services/citizendocs.service";


const { Paragraph } = Typography;
const { Option } = Select;

interface Props {
  citizenId: number; // Logged-in citizen
}

const DocumentSubmissionCard: React.FC<Props> = ({ citizenId }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<CitizenDoc[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(1);
  const [editingDoc, setEditingDoc] = useState<CitizenDoc | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch documents from backend
  const fetchDocuments = async () => {
    try {
      const docs = await CitizenDocsService.getDocumentsByCitizen(citizenId);
      setUploadedDocuments(docs);
    } catch (err) {
      message.error("Failed to fetch documents.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [citizenId]);

  // File input
  const handleButtonClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setIsModalVisible(true);
      e.target.value = ""; // reset input
    }
  };

  // Upload or update document
  const handleModalOk = async () => {
    if (!selectedFile && !editingDoc) return;

    try {
      setUploading(true);
      const formData = new FormData();

      if (editingDoc) {
        // Update only document type
        await CitizenDocsService.updateDocumentById(editingDoc.id, { document_id: selectedType! });
        message.success("Document updated successfully!");
        setEditingDoc(null);
      } else {
        // Upload new document
        formData.append("documents", selectedFile!);
        formData.append("citizen_id", citizenId.toString());
        formData.append("document_id", selectedType!.toString());

        await CitizenDocsService.uploadDocuments(formData);
        message.success(`${selectedFile!.name} uploaded successfully!`);
      }

      fetchDocuments();
    } catch (err) {
      message.error("Failed to upload/update document.");
      console.error(err);
    } finally {
      setIsModalVisible(false);
      setSelectedFile(null);
      setSelectedType(1);
      setUploading(false);
    }
  };

  const handleDelete = async (doc: CitizenDoc) => {
    try {
      await CitizenDocsService.deleteDocumentById(doc.id);
      message.success(`${doc.file_name} deleted successfully!`);
      fetchDocuments();
    } catch (err) {
      message.error("Failed to delete document.");
      console.error(err);
    }
  };

  const handleEdit = (doc: CitizenDoc) => {
    setEditingDoc(doc);
    setSelectedType(doc.document_id);
    setIsModalVisible(true);
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-3 text-gray-900 font-extrabold text-xl select-none">
          <FileAddOutlined className="text-indigo-600 text-3xl" />
          Document Submission
        </div>
      }
      className="rounded-3xl shadow-2xl flex flex-col justify-between"
      bordered={false}
      bodyStyle={{ padding: "1.5rem" }}
    >
      <Paragraph className="mb-4 text-gray-700 font-medium text-lg leading-relaxed">
        Upload your documents or manage your previous uploads.
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
        {editingDoc ? "Edit Document" : "Upload New Document"}
      </Button>

      <List
        header={<b>Uploaded Documents</b>}
        bordered
        dataSource={uploadedDocuments}
        renderItem={(doc) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => handleEdit(doc)} />,
              <Popconfirm
                title="Are you sure to delete this document?"
                onConfirm={() => handleDelete(doc)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
            <Tag color="blue">{doc.document_id}</Tag> {doc.file_name}
          </List.Item>
        )}
      />

      <Modal
        title={editingDoc ? "Edit Document Type" : "Select Document Type"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingDoc ? "Update" : "Upload"}
        confirmLoading={uploading}
      >
        <Select
          value={selectedType!}
          onChange={(value) => setSelectedType(value)}
          style={{ width: "100%" }}
        >
          <Option value={1}>National Identity Card (NIC)</Option>
          <Option value={2}>Passport</Option>
          <Option value={3}>Driving License</Option>
          <Option value={4}>Birth Certificate</Option>
          <Option value={5}>Marriage Certificate</Option>
          <Option value={6}>Police Clearance Certificate</Option>
        </Select>
      </Modal>
    </Card>
  );
};

export default DocumentSubmissionCard;
