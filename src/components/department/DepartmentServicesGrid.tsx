import React from "react";
import { Card, Row, Col, Tooltip, Popconfirm, Tag, Space, Divider } from "antd";
import { EditOutlined, DeleteOutlined, FileOutlined, CalendarOutlined, ClockCircleOutlined, TeamOutlined } from "@ant-design/icons";
import { DepartmentService } from "../../services/service.service";

interface DepartmentServicesGridProps {
  services: DepartmentService[];
  openEditModal: (service: DepartmentService) => void;
  handleDelete: (service_id: number) => void;
}

const DepartmentServicesGrid: React.FC<DepartmentServicesGridProps> = ({ services, openEditModal, handleDelete }) => (
  <Row gutter={[16, 16]}>
    {services.map((service) => {
      // Parse doc_id to array safely
      let documents: any[] = [];
      try {
        if (typeof service.doc_id === "string") {
          documents = JSON.parse(service.doc_id);
        } else if (Array.isArray(service.doc_id)) {
          documents = service.doc_id;
        }
      } catch (err) {
        console.error("Failed to parse doc_id:", err);
      }

      return (
        <Col key={service.service_id} xs={24} sm={12} md={8}>
          <Card
            className="shadow-md hover:shadow-xl transition-all rounded-lg"
            title={<span className="font-semibold">{service.name}</span>}
            extra={
              <Space>
                <Tooltip title="Edit Service">
                  <EditOutlined style={{ color: "#0052cc" }} onClick={() => openEditModal(service)} />
                </Tooltip>
                <Tooltip title="Delete Service">
                  <Popconfirm title="Are you sure to delete this service?" onConfirm={() => handleDelete(service.service_id)}>
                    <DeleteOutlined style={{ color: "#d9534f" }} />
                  </Popconfirm>
                </Tooltip>
              </Space>
            }
          >
            <p className="text-gray-600">{service.description || "No description available"}</p>
            <Divider style={{ margin: "10px 0" }} />
            <p>
              <FileOutlined /> <strong>Required Documents:</strong>
            </p>
            <Space wrap>
              {documents.map((doc, idx) => (
                <Tag color="blue" key={idx}>{doc}</Tag>
              ))}
            </Space>
            <p className="mt-3">
              <CalendarOutlined /> <strong>Available Days:</strong> N/A
            </p>
            <p>
              <ClockCircleOutlined /> <strong>Service Duration:</strong> N/A
            </p>
            <p>
              <TeamOutlined /> <strong>Capacity:</strong> N/A
            </p>
          </Card>
        </Col>
      );
    })}
  </Row>
);

export default DepartmentServicesGrid;
