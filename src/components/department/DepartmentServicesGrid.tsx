import React from "react";
import { Card, Row, Col, Tooltip, Popconfirm, Tag, Space, Divider } from "antd";
import { EditOutlined, DeleteOutlined, FileOutlined, CalendarOutlined, ClockCircleOutlined, TeamOutlined } from "@ant-design/icons";

interface Service {
  id: number;
  name: string;
  documents: string[];
  description: string;
  availableDays: string[];
  duration: number;
  capacity: number;
}

interface DepartmentServicesGridProps {
  services: Service[];
  openEditModal: (service: Service) => void;
  handleDelete: (id: number) => void;
}

const DepartmentServicesGrid: React.FC<DepartmentServicesGridProps> = ({ services, openEditModal, handleDelete }) => (
  <Row gutter={[16, 16]}>
    {services.map((service) => (
      <Col key={service.id} xs={24} sm={12} md={8}>
        <Card
          className="shadow-md hover:shadow-xl transition-all rounded-lg"
          title={<span className="font-semibold">{service.name}</span>}
          extra={
            <Space>
              <Tooltip title="Edit Service">
                <EditOutlined style={{ color: "#0052cc" }} onClick={() => openEditModal(service)} />
              </Tooltip>
              <Tooltip title="Delete Service">
                <Popconfirm title="Are you sure to delete this service?" onConfirm={() => handleDelete(service.id)}>
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
              <Tag color="blue" key={idx}>{doc}</Tag>
            ))}
          </Space>
          <p className="mt-3">
            <CalendarOutlined /> <strong>Available Days:</strong> {service.availableDays.join(", ")}
          </p>
          <p>
            <ClockCircleOutlined /> <strong>Service Duration:</strong> {service.duration} hours/slot
          </p>
          <p>
            <TeamOutlined /> <strong>Capacity:</strong> {service.capacity} per slot
          </p>
        </Card>
      </Col>
    ))}
  </Row>
);

export default DepartmentServicesGrid;
