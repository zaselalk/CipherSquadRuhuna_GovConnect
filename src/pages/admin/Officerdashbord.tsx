import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  DatePicker,
  Select,
  message,
  Modal,
  Tag,
  Input,
  Space,
  Divider,
  Popconfirm,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileOutlined,
  ReloadOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

interface Document {
  name: string;
  url: string;
}

interface Appointment {
  id: number;
  citizenName: string;
  date: string;
  time: string;
  service: string;
  status: "Pending" | "Approved" | "Cancelled";
  documents: Document[];
  notes: string;
}

interface OfficerDashboardProps {
  service: string;
  onBack: () => void;
}

const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ service, onBack }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      citizenName: "Kasun Udayanga",
      date: "2025-09-01",
      time: "10:30 AM",
      service: "ID Card Renewal",
      status: "Pending",
      documents: [
        { name: "National ID.pdf", url: "#" },
        { name: "Proof of Address.jpg", url: "#" },
      ],
      notes: "Requested urgent processing.",
    },
    {
      id: 2,
      citizenName: "Kasuni Perera",
      date: "2025-09-02",
      time: "11:00 AM",
      service: "Passport Renewal",
      status: "Approved",
      documents: [{ name: "Passport Scan.pdf", url: "#" }],
      notes: "",
    },
    {
      id: 3,
      citizenName: "Anura Silva",
      date: "2025-09-03",
      time: "09:15 AM",
      service: "ID Card Renewal",
      status: "Approved",
      documents: [{ name: "Medical Report.pdf", url: "#" }],
      notes: "Missing signature on report.",
    },
  ]);

  const [filters, setFilters] = useState({
    date: null as string | null,
    status: "",
    name: "",
  });

  const [selected, setSelected] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateStatus = (id: number, newStatus: Appointment["status"]) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    setSelected((prev) => (prev ? { ...prev, status: newStatus } : prev));
    message.success(`Appointment status updated to "${newStatus}".`);
  };

  const filteredAppointments = appointments.filter(
    (a) =>
      a.service === service &&
      (!filters.date || a.date === filters.date) &&
      (!filters.status || a.status === filters.status) &&
      (!filters.name ||
        a.citizenName.toLowerCase().includes(filters.name.toLowerCase()))
  );

  const statusColors: Record<string, string> = {
    Pending: "orange",
    Approved: "green",
    Cancelled: "red",
  };

  const columns: ColumnsType<Appointment> = [
    {
      title: "Citizen Name",
      dataIndex: "citizenName",
      sorter: (a, b) => a.citizenName.localeCompare(b.citizenName),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    { title: "Time", dataIndex: "time" },
    {
      title: "Status",
      dataIndex: "status",
      filters: Object.keys(statusColors).map((s) => ({ text: s, value: s })),
      onFilter: (value, record) => record.status === value,
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
  ];

  return (
    <DashboardContainer>
      <div className="max-w-[1100px] mx-auto min-h-screen">
        <div className="flex items-center gap-3 mb-4">
          <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
            Back
          </Button>
          <h1 className="text-[#0052cc] text-2xl font-bold">
            {service} - Appoinments
          </h1>
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <Space wrap size="middle">
            <DatePicker
              placeholder="Select Date"
              onChange={(date) =>
                setFilters((f) => ({
                  ...f,
                  date: date ? dayjs(date).format("YYYY-MM-DD") : null,
                }))
              }
            />
            <Select
              placeholder="Status"
              className="w-48"
              allowClear
              onChange={(val) =>
                setFilters((f) => ({ ...f, status: val || "" }))
              }
              options={Object.keys(statusColors).map((status) => ({
                value: status,
                label: status,
              }))}
            />
            <Input
              placeholder="Search by name"
              prefix={<SearchOutlined />}
              onChange={(e) =>
                setFilters((f) => ({ ...f, name: e.target.value }))
              }
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={() => setFilters({ date: null, status: "", name: "" })}
            >
              Reset
            </Button>
          </Space>
        </Card>

        {/* Table */}
        <Table
          rowKey="id"
          className="mt-4"
          columns={columns}
          dataSource={filteredAppointments}
          pagination={false}
          onRow={(record) => ({
            onClick: () => {
              setSelected(record);
              setIsModalOpen(true);
            },
          })}
          rowClassName="cursor-pointer hover:bg-blue-50"
        />

        {/* Details Modal */}
        <Modal
          open={isModalOpen}
          title="Appointment Details"
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={650}
        >
          {selected && (
            <div>
              <Space direction="vertical" size="middle" className="w-full">
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Citizen Name:</strong> {selected.citizenName}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Tag color={statusColors[selected.status]}>
                      {selected.status}
                    </Tag>
                  </p>
                  <p>
                    <strong>Date & Time:</strong> {selected.date} at{" "}
                    {selected.time}
                  </p>
                  <p>
                    <strong>Service:</strong> {selected.service}
                  </p>
                </div>
                <Divider />
                <p>
                  <strong>Notes:</strong> {selected.notes || "None"}
                </p>
                <Divider />
                <div>
                  <strong>Documents:</strong>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {selected.documents.map((doc, idx) => (
                      <Button
                        key={idx}
                        type="link"
                        icon={<FileOutlined />}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <Divider />
                <Space>
                  <Popconfirm
                    title="Approve Appointment?"
                    onConfirm={() => updateStatus(selected.id, "Approved")}
                  >
                    <Button type="primary" icon={<CheckOutlined />}>
                      Approve
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Request pending?"
                    onConfirm={() => updateStatus(selected.id, "Pending")}
                  >
                    <Button
                      icon={<EditOutlined />}
                      style={{ backgroundColor: "#f0ad4e", color: "white" }}
                    >
                      Pending
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Cancel Appointment?"
                    onConfirm={() => updateStatus(selected.id, "Cancelled")}
                  >
                    <Button danger icon={<CloseOutlined />}>
                      Cancel
                    </Button>
                  </Popconfirm>
                </Space>
              </Space>
            </div>
          )}
        </Modal>
      </div>
    </DashboardContainer>
  );
};

export default OfficerDashboard;
