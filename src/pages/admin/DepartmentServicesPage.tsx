import React, { useState, useEffect } from "react";
import { Form, message, Spin, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import DepartmentServicesHeader from "../../components/department/DepartmentServicesHeader";
import DepartmentServicesGrid from "../../components/department/DepartmentServicesGrid";
import DepartmentServicesModal from "../../components/department/DepartmentServicesModal";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";
import { DepartmentService, DepartmentServicesApi } from "../../services/service.service";

const { Paragraph } = Typography;

const DepartmentServicesPage: React.FC = () => {
  const [services, setServices] = useState<DepartmentService[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<DepartmentService | null>(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { dep_id } = useParams<{ dep_id: string }>();

  // Fetch services
  const fetchServices = async () => {
    if (!dep_id) return;
    try {
      setLoading(true);
      const data = await DepartmentServicesApi.getServicesByDepartment(Number(dep_id));

      const parsedServices = data.map((service) => ({
        ...service,
        doc_id: typeof service.doc_id === "string" ? JSON.parse(service.doc_id) : service.doc_id,
      }));

      setServices(parsedServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      message.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [dep_id]);

  // Modals
  const openAddModal = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (service: DepartmentService) => {
    setEditingService(service);
    form.setFieldsValue({
      ...service,
      doc_id: service.doc_id || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (service_id: number) => {
    try {
      await DepartmentServicesApi.deleteServiceById(service_id);
      setServices((prev) => prev.filter((s) => s.service_id !== service_id));
      message.success("Service deleted successfully");
    } catch (error) {
      console.error("Failed to delete service:", error);
      message.error("Failed to delete service");
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const serviceData: Partial<DepartmentService> = {
        dep_id: Number(dep_id),
        name: values.name,
        description: values.description || "",
        doc_id: values.doc_id || [],
      };

      if (editingService) {
        const updatedService = await DepartmentServicesApi.updateServiceById(
          editingService.service_id,
          serviceData
        );
        const parsedUpdatedService = {
          ...updatedService,
          doc_id:
            typeof updatedService.doc_id === "string"
              ? JSON.parse(updatedService.doc_id)
              : updatedService.doc_id,
        };
        setServices((prev) =>
          prev.map((s) =>
            s.service_id === parsedUpdatedService.service_id ? parsedUpdatedService : s
          )
        );
        message.success("Service updated successfully");
      } else {
        await DepartmentServicesApi.addService(serviceData);
        await fetchServices();
        message.success("Service added successfully");
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Failed to save service:", error);
      if (error?.errorFields) {
        message.error("Please fill all required fields correctly");
      } else {
        message.error("Failed to save service");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" tip={<span>Loading services...</span>} />
      </div>
    );
  }

  return (
    <DashboardContainer>
      {/* Back Button */}
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back
      </Button>

      <DepartmentServicesHeader openAddModal={openAddModal} />

      {services.length === 0 ? (
        <Paragraph className="text-center text-gray-500 mt-8">
          No services available for this department.
        </Paragraph>
      ) : (
        <DepartmentServicesGrid
          services={services}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
        />
      )}

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
