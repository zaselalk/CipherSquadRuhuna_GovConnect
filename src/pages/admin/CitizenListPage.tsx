import { useState } from "react";
import {
  Table,
  Card,
  Button,
  Select,
  Input,
  Space,
  Tag,
  Modal,
  Divider,
  Row,
  Col,
  Statistic,
  Popconfirm,
  message,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

interface Citizen {
  id: number;
  name: string;
  email: string;
  phone: string;
  nic: string;
  address: string;
  status: "Active" | "Inactive" | "Suspended";
  registrationDate: string;
  totalAppointments: number;
}

export const CitizenListPage = () => {
  const [citizens, setCitizens] = useState<Citizen[]>([
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@email.com",
      phone: "+94 77 123 4567",
      nic: "123456789V",
      address: "123 Main St, Colombo",
      status: "Active",
      registrationDate: "2024-01-15",
      totalAppointments: 5,
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+94 77 234 5678",
      nic: "987654321V",
      address: "456 Oak Ave, Kandy",
      status: "Active",
      registrationDate: "2024-02-20",
      totalAppointments: 3,
    },
    {
      id: 3,
      name: "Mary Johnson",
      email: "mary.johnson@email.com",
      phone: "+94 77 345 6789",
      nic: "456789123V",
      address: "789 Pine Rd, Galle",
      status: "Inactive",
      registrationDate: "2024-03-10",
      totalAppointments: 1,
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@email.com",
      phone: "+94 77 456 7890",
      nic: "789123456V",
      address: "321 Elm St, Jaffna",
      status: "Suspended",
      registrationDate: "2024-01-05",
      totalAppointments: 8,
    },
    {
      id: 5,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+94 77 567 8901",
      nic: "654321987V",
      address: "654 Maple Dr, Matara",
      status: "Active",
      registrationDate: "2024-04-12",
      totalAppointments: 2,
    },
  ]);

  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });

  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updateStatus = (id: number, newStatus: Citizen["status"]) => {
    setCitizens((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    setSelectedCitizen((prev) => (prev ? { ...prev, status: newStatus } : prev));
    message.success(`Citizen status updated to "${newStatus}".`);
  };

  const deleteCitizen = (id: number) => {
    setCitizens((prev) => prev.filter((c) => c.id !== id));
    message.success("Citizen deleted successfully.");
    if (selectedCitizen?.id === id) {
      setIsModalOpen(false);
      setSelectedCitizen(null);
    }
  };

  const filteredCitizens = citizens.filter((citizen) => {
    const matchesStatus = !filters.status || citizen.status === filters.status;
    const matchesSearch =
      !filters.search ||
      citizen.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      citizen.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      citizen.nic.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const statusColors: Record<string, string> = {
    Active: "green",
    Inactive: "orange",
    Suspended: "red",
  };

  // Calculate statistics
  const totalCitizens = citizens.length;
  const activeCitizens = citizens.filter((c) => c.status === "Active").length;
  const inactiveCitizens = citizens.filter((c) => c.status === "Inactive").length;

  const columns: ColumnsType<Citizen> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: 130,
    },
    {
      title: "NIC",
      dataIndex: "nic",
      sorter: (a, b) => a.nic.localeCompare(b.nic),
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: Object.keys(statusColors).map((s) => ({ text: s, value: s })),
      onFilter: (value, record) => record.status === value,
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
      width: 100,
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      sorter: (a, b) => a.registrationDate.localeCompare(b.registrationDate),
      width: 130,
    },
    {
      title: "Appointments",
      dataIndex: "totalAppointments",
      sorter: (a, b) => a.totalAppointments - b.totalAppointments,
      width: 120,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCitizen(record);
              setIsModalOpen(true);
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              // Handle edit
              message.info("Edit functionality to be implemented");
            }}
          />
          <Popconfirm
            title="Delete Citizen?"
            description="Are you sure you want to delete this citizen?"
            onConfirm={(e) => {
              e?.stopPropagation();
              deleteCitizen(record.id);
            }}
            onCancel={(e) => e?.stopPropagation()}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <DashboardContainer>
      <div className="max-w-[1200px] mx-auto min-h-screen">
        <h1 className="text-[#0052cc] text-2xl font-bold mb-6">
          Citizen Management
        </h1>

        {/* Info Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Citizens"
                value={totalCitizens}
                prefix={<TeamOutlined style={{ color: "#1890ff" }} />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Active Citizens"
                value={activeCitizens}
                prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Inactive Citizens"
                value={inactiveCitizens}
                prefix={<CloseCircleOutlined style={{ color: "#faad14" }} />}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card className="mb-4">
          <Space wrap size="middle">
            <Input
              placeholder="Search by name, email, or NIC"
              prefix={<SearchOutlined />}
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              style={{ width: 300 }}
            />
            <Select
              placeholder="Filter by Status"
              className="w-48"
              allowClear
              value={filters.status || undefined}
              onChange={(val) =>
                setFilters((f) => ({ ...f, status: val || "" }))
              }
              options={Object.keys(statusColors).map((status) => ({
                value: status,
                label: status,
              }))}
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={() => setFilters({ status: "", search: "" })}
            >
              Reset Filters
            </Button>
          </Space>
        </Card>

        {/* Table */}
        <Card>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredCitizens}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredCitizens.length,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} citizens`,
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size || 10);
              },
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            scroll={{ x: 1200 }}
            onRow={(record) => ({
              onClick: () => {
                setSelectedCitizen(record);
                setIsModalOpen(true);
              },
            })}
            rowClassName="cursor-pointer hover:bg-blue-50"
          />
        </Card>

        {/* Details Modal */}
        <Modal
          open={isModalOpen}
          title={
            <Space>
              <UserOutlined />
              Citizen Details
            </Space>
          }
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={700}
        >
          {selectedCitizen && (
            <div>
              <Space direction="vertical" size="middle" className="w-full">
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Name:</strong> {selectedCitizen.name}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Tag color={statusColors[selectedCitizen.status]}>
                      {selectedCitizen.status}
                    </Tag>
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCitizen.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedCitizen.phone}
                  </p>
                  <p>
                    <strong>NIC:</strong> {selectedCitizen.nic}
                  </p>
                  <p>
                    <strong>Registration Date:</strong>{" "}
                    {selectedCitizen.registrationDate}
                  </p>
                </div>
                <p>
                  <strong>Address:</strong> {selectedCitizen.address}
                </p>
                <p>
                  <strong>Total Appointments:</strong>{" "}
                  {selectedCitizen.totalAppointments}
                </p>
                <Divider />
                <Space>
                  <Popconfirm
                    title="Activate Citizen?"
                    onConfirm={() => updateStatus(selectedCitizen.id, "Active")}
                  >
                    <Button type="primary" icon={<CheckCircleOutlined />}>
                      Activate
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Deactivate Citizen?"
                    onConfirm={() => updateStatus(selectedCitizen.id, "Inactive")}
                  >
                    <Button
                      icon={<CloseCircleOutlined />}
                      style={{ backgroundColor: "#faad14", color: "white" }}
                    >
                      Deactivate
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Suspend Citizen?"
                    onConfirm={() => updateStatus(selectedCitizen.id, "Suspended")}
                  >
                    <Button danger icon={<CloseOutlined />}>
                      Suspend
                    </Button>
                  </Popconfirm>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      message.info("Edit functionality to be implemented");
                    }}
                  >
                    Edit
                  </Button>
                </Space>
              </Space>
            </div>
          )}
        </Modal>
      </div>
    </DashboardContainer>
  );
};
