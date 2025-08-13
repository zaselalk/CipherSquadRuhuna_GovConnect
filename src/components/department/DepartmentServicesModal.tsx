import React from "react";
import { Modal, Form, Input, Checkbox, Row, Col, InputNumber } from "antd";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const documentOptions = [
  "National Identity Card (NIC)",
  "Passport",
  "Driving License",
  "Birth Certificate",
  "Marriage Certificate",
  "Death Certificate",
  "School Leaving Certificate (OL/AL)",
  "Degree/Diploma Certificates",
  "Academic Transcripts / Mark Sheets",
  "Land Deeds / Title Documents",
  "Court Orders / Affidavits",
  "Medical Certificates",
  "Vaccination Records",
  "Tax Clearance Certificate",
  "Police Clearance Certificate",
  "Bank Statements",
];

interface DepartmentServicesModalProps {
  isModalOpen: boolean;
  editingService: any;
  form: any;
  setIsModalOpen: (open: boolean) => void;
  handleSave: () => void;
}

const DepartmentServicesModal: React.FC<DepartmentServicesModalProps> = ({ isModalOpen, editingService, form, setIsModalOpen, handleSave }) => (
  <Modal
    title={
      <span style={{ fontWeight: 600, color: "#0052cc" }}>
        {editingService ? "Edit Service" : "Add Service"}
      </span>
    }
    open={isModalOpen}
    onCancel={() => setIsModalOpen(false)}
    onOk={handleSave}
    okText={editingService ? "Update" : "Add"}
    width={700}
  >
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Service Name"
        rules={[{ required: true, message: "Please enter service name" }]}
      >
        <Input placeholder="Enter service name" />
      </Form.Item>
      <Form.Item
        name="documents"
        label="Required Documents"
        rules={[{ required: true, message: "Select at least one document" }]}
      >
        <div style={{ border: "1px solid #d9d9d9", borderRadius: 6, padding: "12px", maxHeight: 180, overflowY: "auto" }}>
          <Checkbox.Group>
            <Row gutter={[8, 8]}>
              {documentOptions.map((doc) => (
                <Col span={12} key={doc}>
                  <Checkbox value={doc}>{doc}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} placeholder="Enter service description" />
      </Form.Item>
      <Form.Item name="availableDays" label="Available Days">
        <Checkbox.Group>
          <Row gutter={[8, 8]}>
            {daysOfWeek.map((day) => (
              <Col key={day}>
                <Checkbox value={day}>{day}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="duration"
            label="Service Duration (hours/slot)"
            rules={[{ required: true, message: "Enter service duration" }]}
          >
            <InputNumber min={0.1} step={0.25} placeholder="e.g., 0.5" className="w-full" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="capacity"
            label="Service Capacity"
            rules={[{ required: true, message: "Enter service capacity" }]}
          >
            <InputNumber min={1} placeholder="Max per slot" className="w-full" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Modal>
);

export default DepartmentServicesModal;
