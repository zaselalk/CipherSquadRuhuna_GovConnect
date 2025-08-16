import React, { useEffect, useState } from "react";
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
  Select,
  
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { Link } from "react-router";
import { DepartmentService } from "../../services/department.service";
import { DepartmentData } from "../../types/department";
import officersService from "../../services/officers.service";

interface Department {
  dep_id: number;
  name: string;
  link?: string;
  serviceCount?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Officer modal & selection
  const [isOfficerModalOpen, setIsOfficerModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [officerLoading, setOfficerLoading] = useState(false);

  const [form] = Form.useForm();

  // Load departments
  const loadDepartments = async () => {
    try {
      setLoading(true);
      const data = await DepartmentService.getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // --- Department CRUD ---
  const openAddModal = () => {
    setEditingDept(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (dept: Department) => {
    setEditingDept(dept);
    form.setFieldsValue({ name: dept.name, link: dept.link });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await DepartmentService.deleteDepartmentById(id);
      setDepartments((prev) => prev.filter((d) => d.dep_id !== id));
      message.success("Department deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete department");
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingDept) {
        const updated = await DepartmentService.updateDepartmentById(editingDept.dep_id, values);
        setDepartments((prev) =>
          prev.map((d) => (d.dep_id === editingDept.dep_id ? updated : d))
        );
        message.success("Department updated successfully");
      } else {
        await DepartmentService.addDepartment(values as DepartmentData);
        await loadDepartments();
        message.success("Department added successfully");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err);
      message.error(err.message || "Operation failed");
    }
  };

  // --- Officer modal ---
  const openAddOfficerModal = async (dept: Department) => {
    setSelectedDept(dept);
    setIsOfficerModalOpen(true);
    setSelectedUserId(null);

    try {
      setOfficerLoading(true);
      const usersData = await officersService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      console.error(err);
      message.error("Failed to load users");
    } finally {
      setOfficerLoading(false);
    }
  };

  const handleAddOfficer = async () => {
    if (!selectedUserId || !selectedDept) {
      message.warning("Please select a user");
      return;
    }

    try {
      await officersService.addOfficer({
        officer_id: selectedUserId,
        department_id: selectedDept.dep_id,
      });
      message.success("Officer added to department successfully");
      setIsOfficerModalOpen(false);
    } catch (err: any) {
      console.error(err);
      message.error(err.message || "Failed to add officer");
    }
  };

  return (
    <DashboardContainer>
      <div className="p-6 max-w-[1400px] mx-auto">
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

        <Row gutter={[16, 16]}>
          {departments.map((dept) => (
            <Col key={dept.dep_id} xs={24} sm={12} md={12} lg={8}>
              <Card
                loading={loading}
                className="shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                bodyStyle={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "12px",
                  padding: "24px 16px",
                  borderRadius: "12px",
                  minHeight: "250px",
                  background: "linear-gradient(135deg, #e0f2ff 0%, #bae6fd 100%)",
                }}
                actions={[
                  <Tooltip key="edit" title="Edit Department">
                    <EditOutlined style={{ color: "#0052cc" }} onClick={() => openEditModal(dept)} />
                  </Tooltip>,
                  <Tooltip key="add-officer" title="Add Officer">
                    <UserAddOutlined
                      style={{ color: "#28a745" }}
                      onClick={() => openAddOfficerModal(dept)}
                    />
                  </Tooltip>,
                  <Tooltip key="delete" title="Delete Department">
                    <Popconfirm
                      title="Are you sure to delete this department?"
                      onConfirm={() => handleDelete(dept.dep_id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined style={{ color: "#d9534f" }} />
                    </Popconfirm>
                  </Tooltip>,
                ]}
              >
                <Link
                  to={`/admin/department/${dept.dep_id}`}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img
                    src="/images/logo.png"
                    alt="Department Logo"
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <Badge>
                    <h3 className="text-lg font-semibold text-center mt-2">{dept.name}</h3>
                    <p className="text-gray-500 text-sm text-center">
                      Available Services: {dept.serviceCount || 0}
                    </p>
                  </Badge>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Department Add/Edit Modal */}
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
            <Form.Item name="link" label="Department Link (Optional)">
              <Input placeholder="Enter department link" />
            </Form.Item>
          </Form>
        </Modal>

        {/* Add Officer Modal */}
        <Modal
          title={`Add Officer to ${selectedDept?.name}`}
          open={isOfficerModalOpen}
          onCancel={() => setIsOfficerModalOpen(false)}
          onOk={handleAddOfficer}
          okText="Add Officer"
          okButtonProps={{ type: "primary" }}
        >
          <Form layout="vertical">
            <Form.Item label="Select User">
              <Select
                showSearch
                placeholder="Select a user"
                optionFilterProp="children"
                loading={officerLoading}
                onChange={(value) => setSelectedUserId(value)}
              >
                {users.map((user) => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardContainer>
  );
};

export default DepartmentPage;
