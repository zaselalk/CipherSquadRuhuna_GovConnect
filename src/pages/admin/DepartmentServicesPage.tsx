import React, { useState } from "react";
import { Form, message } from "antd";
import DepartmentServicesHeader from "../../components/department/DepartmentServicesHeader";
import DepartmentServicesGrid from "../../components/department/DepartmentServicesGrid";
import DepartmentServicesModal from "../../components/department/DepartmentServicesModal";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

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
    <DashboardContainer>
      <DepartmentServicesHeader openAddModal={openAddModal} />
      <DepartmentServicesGrid
        services={services}
        openEditModal={openEditModal}
        handleDelete={handleDelete}
      />
      <DepartmentServicesModal
        isModalOpen={isModalOpen}
        editingService={editingService}
        form={form}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
      />

    </DashboardContainer>
  );
};

export default DepartmentServicesPage;
