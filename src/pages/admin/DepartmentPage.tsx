import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Popconfirm,
  message,
  Tooltip,
  Badge,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

interface Department {
  id: number;
  name: string;
}

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "IT" },
    { id: 2, name: "HR" },
    { id: 3, name: "Finance" },
    { id: 4, name: "Support" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [form] = Form.useForm();

  const openAddModal = () => {
    setEditingDept(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (dept: Department) => {
    setEditingDept(dept);
    form.setFieldsValue({ name: dept.name });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDepartments(departments.filter((d) => d.id !== id));
    message.success("Department deleted successfully");
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingDept) {
          // Edit
          setDepartments((prev) =>
            prev.map((d) =>
              d.id === editingDept.id ? { ...d, name: values.name } : d
            )
          );
          message.success("Department updated successfully");
        } else {
          // Add
          const newDept: Department = {
            id: Date.now(),
            name: values.name,
          };
          setDepartments((prev) => [...prev, newDept]);
          message.success("Department added successfully");
        }
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <DashboardContainer>

    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[#0052cc] text-2xl font-bold">Departments</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openAddModal}
          className="flex items-center gap-2"
        >
          Add Department
        </Button>
      </div>

      {/* Department Grid */}
      <Row gutter={[16, 16]}>
        {departments.map((dept) => (
          <Col key={dept.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className="shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
              bodyStyle={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                gap: "12px",
                padding: "24px 16px",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #e0f2ff 0%, #bae6fd 100%)",
              }}
              actions={[
                <Tooltip key="edit" title="Edit Department">
                  <EditOutlined
                    style={{ color: "#0052cc" }}
                    onClick={() => openEditModal(dept)}
                  />
                </Tooltip>,
                <Tooltip key="delete" title="Delete Department">
                  <Popconfirm
                    title="Are you sure to delete this department?"
                    onConfirm={() => handleDelete(dept.id)}
                  >
                    <DeleteOutlined style={{ color: "#d9534f" }} />
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <Badge
                count={Math.floor(Math.random() * 100)} // Example workload
                style={{ backgroundColor: "#0052cc" }}
              >
                <h3 className="text-lg font-semibold text-center mt-2">
                  {dept.name}
                </h3>
              </Badge>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Modal */}
      <Modal
        title={editingDept ? "Edit Department" : "Add Department"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText={editingDept ? "Update" : "Add"}
        okButtonProps={{ type: "primary" }}
        cancelButtonProps={{ type: "default" }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Department Name"
            rules={[{ required: true, message: "Please enter department name" }]}
          >
            <Input placeholder="Enter department name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </DashboardContainer>
  );
};

export default DepartmentPage;
