import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Checkbox,
  InputNumber,
  Popconfirm,
  message,
  Tag,
  Tooltip,
  Space,
  Divider,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FileOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TeamOutlined,
} from "@ant-design/icons";

interface Service {
  id: number;
  name: string;
  documents: string[];
  description: string;
  availableDays: string[];
  duration: number; // in hours
  capacity: number;
}

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

const DepartmentServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Passport Renewal",
      documents: ["National Identity Card (NIC)", "Birth Certificate"],
      description: "Renewal of passports for citizens",
      availableDays: ["Mon", "Wed", "Fri"],
      duration: 1,
      capacity: 20,
    },
    {
      id: 2,
      name: "Driving License Application",
      documents: ["National Identity Card (NIC)", "Medical Certificates"],
      description: "Apply for a new driving license",
      availableDays: ["Tue", "Thu"],
      duration: 0.5,
      capacity: 15,
    },
    {
      id: 3,
      name: "Birth Certificate Registration",
      documents: ["Birth Certificate", "Marriage Certificate"],
      description: "Register a new birth certificate",
      availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      duration: 0.75,
      capacity: 30,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  const openAddModal = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
    message.success("Service deleted successfully");
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const serviceData: Service = {
        id: editingService ? editingService.id : Date.now(),
        name: values.name,
        documents: values.documents || [],
        description: values.description,
        availableDays: values.availableDays || [],
        duration: values.duration,
        capacity: values.capacity,
      };

      if (editingService) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? serviceData : s))
        );
        message.success("Service updated successfully");
      } else {
        setServices((prev) => [...prev, serviceData]);
        message.success("Service added successfully");
      }
      setIsModalOpen(false);
    });
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[#0052cc] text-2xl font-bold">Department Services</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
          Add Service
        </Button>
      </div>

      {/* Services Grid */}
      <Row gutter={[16, 16]}>
        {services.map((service) => (
          <Col key={service.id} xs={24} sm={12} md={8}>
            <Card
              className="shadow-md hover:shadow-xl transition-all rounded-lg"
              title={<span className="font-semibold">{service.name}</span>}
              extra={
                <Space>
                  <Tooltip title="Edit Service">
                    <EditOutlined
                      style={{ color: "#0052cc" }}
                      onClick={() => openEditModal(service)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete Service">
                    <Popconfirm
                      title="Are you sure to delete this service?"
                      onConfirm={() => handleDelete(service.id)}
                    >
                      <DeleteOutlined style={{ color: "#d9534f" }} />
                    </Popconfirm>
                  </Tooltip>
                </Space>
              }
            >
              <p className="text-gray-600">{service.description}</p>
              <Divider style={{ margin: "10px 0" }} />
              <p>
                <FileOutlined /> <strong>Required Documents:</strong>
              </p>
              <Space wrap>
                {service.documents.map((doc, idx) => (
                  <Tag color="blue" key={idx}>
                    {doc}
                  </Tag>
                ))}
              </Space>
              <p className="mt-3">
                <CalendarOutlined /> <strong>Available Days:</strong>{" "}
                {service.availableDays.join(", ")}
              </p>
              <p>
                <ClockCircleOutlined /> <strong>Service Duration:</strong>{" "}
                {service.duration} hours/slot
              </p>
              <p>
                <TeamOutlined /> <strong>Capacity:</strong> {service.capacity} per slot
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Modal */}
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
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: 6,
                padding: "12px",
                maxHeight: 180,
                overflowY: "auto",
              }}
            >
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
                <InputNumber
                  min={0.1}
                  step={0.25}
                  placeholder="e.g., 0.5"
                  className="w-full"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="capacity"
                label="Service Capacity"
                rules={[{ required: true, message: "Enter service capacity" }]}
              >
                <InputNumber
                  min={1}
                  placeholder="Max per slot"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default DepartmentServicesPage;
