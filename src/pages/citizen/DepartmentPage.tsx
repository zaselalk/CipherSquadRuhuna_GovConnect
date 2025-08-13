import { useState } from "react";
import { Card, Col, Row, Typography, Button } from "antd";
import {
  FileTextOutlined,
  CarOutlined,
  HomeOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import CommonNav from "../../components/common/CommonNav";

const { Title, Paragraph } = Typography;

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  category: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const departments: Department[] = [
  {
    id: "documents",
    name: "Document Services Department",
    description: "Handles ID cards, passports, and certificates",
    icon: <FileTextOutlined className="text-4xl text-blue-600" />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "tax",
    name: "Tax & Finance Department",
    description: "Handles taxes, fines, and government fees",
    icon: <CreditCardOutlined className="text-4xl text-green-600" />,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "vehicle",
    name: "Transport Department",
    description: "Vehicle registration, licenses, and permits",
    icon: <CarOutlined className="text-4xl text-purple-600" />,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const services: Service[] = [
  {
    id: "passport",
    title: "Passport Application",
    description: "Apply for a new passport or renew existing one",
    icon: <FileTextOutlined className="text-4xl text-blue-600" />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    category: "documents",
  },
  {
    id: "idcard",
    title: "National ID Card",
    description: "Apply for or replace your national ID card",
    icon: <FileTextOutlined className="text-4xl text-blue-600" />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    category: "documents",
  },
  {
    id: "vehicle-license",
    title: "Vehicle License",
    description: "Renew or register vehicle licenses",
    icon: <CarOutlined className="text-4xl text-purple-600" />,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    category: "vehicle",
  },
  {
    id: "tax-payment",
    title: "Pay Taxes",
    description: "Pay income tax, property tax, and fines",
    icon: <CreditCardOutlined className="text-4xl text-green-600" />,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    category: "tax",
  },
];

export const DepartmentPage = () => {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const deptServices = selectedDept
    ? services.filter((s) => s.category === selectedDept.id)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <CommonNav />

      {/* Page Content */}
      <div className="flex-1 px-6 py-8">
        <Title level={2} className="text-center mb-8">
          Government Departments
        </Title>

        {/* Department List */}
        {!selectedDept && (
          <Row gutter={[24, 24]}>
            {departments.map((dept) => (
              <Col xs={24} sm={12} md={8} lg={6} key={dept.id}>
                <Card
                  hoverable
                  className="text-center cursor-pointer"
                  cover={<div className={`p-6 ${dept.bgColor}`}>{dept.icon}</div>}
                  onClick={() => setSelectedDept(dept)}
                >
                  <Card.Meta title={dept.name} description={dept.description} />
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Department Services */}
        {selectedDept && (
          <div>
            <Button
              type="default"
              className="mb-6"
              onClick={() => setSelectedDept(null)}
            >
              &larr; Back to Departments
            </Button>

            <Title level={3} className="mb-4">
              {selectedDept.name} - Services
            </Title>
            <Paragraph className="mb-8">{selectedDept.description}</Paragraph>

            <Row gutter={[24, 24]}>
              {deptServices.length > 0 ? (
                deptServices.map((service) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
                    <Card
                      hoverable
                      className="text-center cursor-pointer"
                      cover={<div className={`p-6 ${service.bgColor}`}>{service.icon}</div>}
                    >
                      <Card.Meta
                        title={service.title}
                        description={service.description}
                      />
                    </Card>
                  </Col>
                ))
              ) : (
                <Paragraph className="text-gray-500 text-center mt-8">
                  No services available in this department.
                </Paragraph>
              )}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;
