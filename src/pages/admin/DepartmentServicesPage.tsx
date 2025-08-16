import React, { useEffect, useState } from "react";
import { Form, message, Spin } from "antd";
import { useParams } from "react-router";
import DepartmentServicesHeader from "../../components/department/DepartmentServicesHeader";
import DepartmentServicesGrid from "../../components/department/DepartmentServicesGrid";
import DepartmentServicesModal from "../../components/department/DepartmentServicesModal";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { DepartmentService, DepartmentServicesApi } from "../../services/service.service";


interface Service {
  id: number;
  name: string;
  documents: string[];
  description: string;
  availableDays: string[];
  duration: number; // in hours
  capacity: number;
}

const DepartmentServicesPage: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const depIdNumber = Number(departmentId);

  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form] = Form.useForm();

  // Fetch department-specific services
  const fetchServices = async () => {
    try {
      setIsLoading(true);
      if (!depIdNumber) throw new Error("Department ID not found");
      const data = await DepartmentServicesApi.getServicesByDepartment(depIdNumber);
      const mappedServices: Service[] = data.map((s) => ({
        id: s.service_id,
        name: s.name,
        documents: s.doc_id ? s.doc_id.split(",") : [],
        description: s.description || "",
        availableDays: [], // populate if backend provides
        duration: 1,       // default or from backend
        capacity: 10,      // default or from backend
      }));
      setServices(mappedServices);
    } catch (error) {
      console.error(error);
      message.error("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [depIdNumber]);

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

  const handleDelete = async (id: number) => {
    try {
      await DepartmentServicesApi.deleteServiceById(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      message.success("Service deleted successfully");
    } catch {
      message.error("Failed to delete service");
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const serviceData: Partial<DepartmentService> = {
        name: values.name,
        doc_id: values.documents?.join(",") || "",
        description: values.description,
        dep_id: depIdNumber,
      };

      if (editingService) {
        await DepartmentServicesApi.updateServiceById(editingService.id, serviceData);
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? { ...s, ...values } : s))
        );
        message.success("Service updated successfully");
      } else {
        await DepartmentServicesApi.addService(serviceData);
        fetchServices(); // Refresh list after adding
        message.success("Service added successfully");
      }

      setIsModalOpen(false);
    } catch {
      message.error("Failed to save service");
    }
  };

  if (isLoading)
    return <Spin size="large" style={{ margin: "50px auto", display: "block" }} />;

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
