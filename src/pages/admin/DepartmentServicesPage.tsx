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
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, FileOutlined } from "@ant-design/icons";

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-[#0052cc] text-3xl font-bold">Department Services</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
                    Add Service
                </Button>
            </div>

            {/* Services Grid */}
            <Row gutter={[24, 24]}>
                {services.map((service) => (
                    <Col key={service.id} xs={24} sm={12} md={8}>
                        <Card
                            className="shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 rounded-lg"
                            bodyStyle={{ padding: "16px" }}
                            title={<h3 className="text-lg font-semibold">{service.name}</h3>}
                            extra={
                                <Space size="middle">
                                    <Tooltip title="Edit Service">
                                        <EditOutlined
                                            style={{ color: "#0052cc", fontSize: 16 }}
                                            onClick={() => openEditModal(service)}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Delete Service">
                                        <Popconfirm
                                            title="Are you sure to delete this service?"
                                            onConfirm={() => handleDelete(service.id)}
                                        >
                                            <DeleteOutlined style={{ color: "#d9534f", fontSize: 16 }} />
                                        </Popconfirm>
                                    </Tooltip>
                                </Space>
                            }
                        >
                            <p className="text-gray-700 mb-2">{service.description}</p>

                            <div className="mb-2">
                                <strong>Required Documents: </strong>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {service.documents.map((doc, idx) => (
                                        <Tag icon={<FileOutlined />} key={idx} color="blue">
                                            {doc}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <p className="mb-1">
                                <strong>Available Days: </strong>
                                <span className="text-gray-600">{service.availableDays.join(", ")}</span>
                            </p>
                            <p className="mb-1">
                                <strong>Duration: </strong>
                                <span className="text-gray-600">{service.duration} hours per slot</span>
                            </p>
                            <p>
                                <strong>Capacity: </strong>
                                <span className="text-gray-600">{service.capacity} per slot</span>
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal */}
            <Modal
                title={editingService ? "Edit Service" : "Add Service"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText={editingService ? "Update" : "Add"}
                width={700}
                // bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
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
                        <Checkbox.Group style={{ width: "100%" }}>
                            <Row gutter={[12, 8]}>
                                {documentOptions.map((doc) => (
                                    <Col xs={24} sm={12} md={8} key={doc}>
                                        <Checkbox value={doc}>{doc}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
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
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="duration"
                                label="Service Duration (hours per slot)"
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

                        <Col xs={24} sm={12}>
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
        </div>
    );
};

export default DepartmentServicesPage;
