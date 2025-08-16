import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Col, Row, Typography, Button, Spin } from "antd";
import { FileTextOutlined, CarOutlined, CreditCardOutlined } from "@ant-design/icons";
import CommonNav from "../../components/common/CommonNav";
import { DepartmentService } from "../../services/department.service";
import { DepartmentServicesApi } from "../../services/service.service";

const { Paragraph: TextParagraph, Title } = Typography;

interface Service {
  service_id: number;
  dep_id: number;
  name: string;
  description?: string | null;
}

interface Department {
  dep_id: number;
  name: string;
  description?: string | null;
  link?: string;
}

// Icons and colors mapping for services
const iconMap: Record<string, React.ReactNode> = {
  documents: <FileTextOutlined className="text-4xl text-blue-600" />,
  tax: <CreditCardOutlined className="text-4xl text-green-600" />,
  vehicle: <CarOutlined className="text-4xl text-purple-600" />,
};

const colorMap: Record<string, { bgColor: string; iconColor: string }> = {
  documents: { bgColor: "bg-blue-50", iconColor: "text-blue-600" },
  tax: { bgColor: "bg-green-50", iconColor: "text-green-600" },
  vehicle: { bgColor: "bg-purple-50", iconColor: "text-purple-600" },
};

const DepartmentPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [deptServices, setDeptServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch all departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const data = await DepartmentService.getAllDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch services for selected department
  const fetchServicesForDept = async (dept: Department) => {
    try {
      setServicesLoading(true);
      const data = await DepartmentServicesApi.getServicesByDepartment(dept.dep_id);
      setDeptServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setDeptServices([]);
    } finally {
      setServicesLoading(false);
    }
  };

  const handleDeptClick = (dept: Department) => {
    setSelectedDept(dept);
    fetchServicesForDept(dept);
  };

  const handleServiceClick = (service: Service) => {
    if (!service?.service_id) return;
    navigate(`/citizen/service-detail/${service.service_id}`);
  };

  // Optional: background colors for department logos
  const deptBgColors = ["#e0f2ff" ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CommonNav />

      <div className="flex-1 px-6 py-8">
        <Title level={2} className="text-center mb-8">
          Government Departments
        </Title>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : !selectedDept ? (
          <Row gutter={[24, 24]}>
            {departments.map((dept, index) => {
              const bgColor = deptBgColors[index % deptBgColors.length];
              const logoSrc = "/images/logo.png"; // your logo path

              return (
                <Col xs={24} sm={12} md={8} lg={6} key={dept.dep_id}>
                  <Card
                    hoverable
                    className="text-center cursor-pointer shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 "
                    onClick={() => handleDeptClick(dept)}
                    cover={
                      <div
                        className="flex justify-center items-center rounded-t-md"
                        style={{ backgroundColor: bgColor, minHeight: 120, padding: "16px" }}
                      >
                        
                       <img
                        src={logoSrc}
                        alt={dept.name}
                        className="w-16 h-16 object-contain mx-auto"
                    />
                  </div>
                    }
                  >
                    <Card.Meta title={dept.name} />
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div>
            <Button type="default" className="mb-6" onClick={() => setSelectedDept(null)}>
              &larr; Back to Departments
            </Button>

            <Title level={3} className="mb-4">
              {selectedDept.name} - Services
            </Title>
            <TextParagraph className="mb-8">
              {selectedDept.description || "No description provided."}
            </TextParagraph>

            {servicesLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spin size="large" />
              </div>
            ) : (
              <Row gutter={[24, 24]}>
                {deptServices.length > 0 ? (
                  deptServices.map((service) => {
                    const category = service.name.toLowerCase().includes("vehicle")
                      ? "vehicle"
                      : service.name.toLowerCase().includes("tax")
                      ? "tax"
                      : "documents";

                    const colors = colorMap[category] || { bgColor: "bg-gray-100", iconColor: "text-gray-600" };
                    const icon = iconMap[category] || <FileTextOutlined className={`text-4xl ${colors.iconColor}`} />;

                    return (
                      <Col xs={24} sm={12} md={8} lg={6} key={service.service_id}>
                        <Card
                          hoverable
                          className="text-center cursor-pointer"
                          cover={<div className={`p-6 ${colors.bgColor}`}>{icon}</div>}
                          onClick={() => handleServiceClick(service)}
                        >
                          <Card.Meta
                            title={service.name}
                            description={service.description || "No description available"}
                          />
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <TextParagraph className="text-gray-500 text-center mt-8">
                    No services available in this department.
                  </TextParagraph>
                )}
              </Row>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;
