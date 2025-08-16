// src/pages/citizen/ServiceDetailPage.tsx
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  Space,
  Divider,
  List,
  Tag,
  Steps,
  Row,
  Col,
  Spin,
} from "antd";
import {
  ArrowLeftOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import CommonNav from "../../components/common/CommonNav";
import { DepartmentService, DepartmentServicesApi } from "../../services/service.service";
import { DocumentTypeApi, DocumentType } from "../../services/documenttype.service";

const { Title, Paragraph, Text } = Typography;

// Static mock data for services (used only for application process, quick info, eligibility)
const mockServiceData = {
  applicationSteps: [
    { step: 1, title: "Eligibility Check", description: "Verify your eligibility and clear any outstanding violations" },
    { step: 2, title: "Online Application", description: "Submit your application through the vehicle services portal" },
    { step: 3, title: "Document Upload", description: "Upload required documents and photographs" },
    { step: 4, title: "Appointment & Testing", description: "Attend appointment for testing (if required)" },
    { step: 5, title: "License Collection", description: "Collect your renewed license or registration" },
  ],
  processingTime: "1-7 business days",
  fee: "LKR 200 - 2,000",
  eligibility: [
    "Valid driving license (for renewals)",
    "Vehicle ownership documentation",
    "Current insurance coverage",
    "No outstanding traffic violations",
  ],
  officeHours: "Monday - Friday: 8:00 AM - 4:00 PM, Saturday: 8:00 AM - 12:00 PM",
  contactInfo: {
            phone: "1919 - 24/7",
            Email: "support@govconnect.gov",
            payments: "www.govpay.gov.lk",
        }
}

const SingleServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<DepartmentService | null>(null);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGoBack = () => navigate(-1);
  
  const handleBookAppointment = () => {
  if (service) {
    navigate(`/services/${service.service_id}/book-appointment`, {
      state: {
        serviceId: service.service_id,
        serviceName: service.name,
      },
    });
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch service details dynamically
        const serviceData = await DepartmentServicesApi.getServiceById(Number(serviceId));
        setService(serviceData);

        // Fetch all document types dynamically
        const allDocs = await DocumentTypeApi.getAllDocumentTypes();

        // Parse doc_id string into an array of numbers
        let requiredIds: number[] = [];
        if (serviceData.doc_id) {
            try {
            requiredIds = JSON.parse(serviceData.doc_id); // "[1,2,3]" -> [1,2,3]
            } catch (err) {
            console.error("Failed to parse required documents:", err);
            }
        }

            // Map to full document objects
        const mappedDocs = allDocs.filter(doc => requiredIds.includes(doc.doc_id!));
        setDocuments(mappedDocs);
        } catch (error) {
        console.error("Error fetching service details:", error);
        } finally {
        setLoading(false);
        }
    };

    //     // Map required documents safely
    //     const rawDocs = (serviceData as any).requiredDocuments;
    //     let requiredIds: number[] = [];

    //     if (rawDocs) {
    //       if (Array.isArray(rawDocs)) {
    //         if (typeof rawDocs[0] === "number") {
    //           requiredIds = rawDocs as number[];
    //         } else if (typeof rawDocs[0] === "object" && "doc_id" in rawDocs[0]) {
    //           requiredIds = (rawDocs as { doc_id: number }[]).map(doc => doc.doc_id);
    //         } else if (typeof rawDocs[0] === "string") {
    //           requiredIds = (rawDocs as string[]).map(id => Number(id));
    //         }
    //       } else if (typeof rawDocs === "string") {
    //         requiredIds = rawDocs.split(",").map(id => Number(id.trim()));
    //       }
    //     }

    //     const mappedDocs = allDocs.filter(doc => requiredIds.includes(doc.doc_id!));
    //     setDocuments(mappedDocs);
    //   } catch (error) {
    //     console.error("Error fetching service details:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    if (serviceId) fetchData();
  }, [serviceId]);

  if (loading || !service) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonNav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className="mb-6 hover:bg-blue-50"
        >
          Back to Services
        </Button>

        {/* Service Header */}
        <Card className="mb-8">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} sm={4}>
              <div className="p-6 bg-blue-50 rounded-lg text-center">
                <FileTextOutlined className="text-4xl text-blue-600" />
              </div>
            </Col>
            <Col xs={24} sm={14}>
              <Space direction="vertical" size="small">
                <Tag color="blue">{service.name}</Tag>
                <Title level={2} className="!mb-2">{service.name}</Title>
                <Paragraph className="!text-m !text-gray-600 !mb-0 italic">
                Our services are designed to make your life easier, providing fast, reliable, and transparent support. Join thousands of satisfied users who trust us to handle their requests efficiently and securely.
                </Paragraph>
              </Space>
            </Col>
            <Col xs={24} sm={6}>
              <Button
                type="primary"
                size="large"
                icon={<CalendarOutlined />}
                onClick={handleBookAppointment}
                className="w-full"
              >
                Book Appointment
              </Button>
            </Col>
          </Row>
        </Card>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {/* Service Overview */}
            <Card title="Service Overview" className="mb-6">
              <Paragraph className="!text-base !leading-relaxed">
                {service.description || "No detailed description available."}
              </Paragraph>
            </Card>

            {/* Application Process (mock data) */}
            <Card title="Application Process" className="mb-6">
              <Steps
                direction="vertical"
                current={-1}
                items={mockServiceData.applicationSteps.map((step) => ({
                  title: step.title,
                  description: step.description,
                  icon: <CheckCircleOutlined />,
                }))}
              />
            </Card>

            {/* Required Documents (dynamic) */}
            <Card title="Required Documents" className="mb-6">
              <List
                dataSource={documents}
                renderItem={(document) => (
                  <List.Item key={document.doc_id}>
                    <Space>
                      <FileTextOutlined className="text-blue-600" />
                      <Text>{document.name}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            {/* Quick Information (mock data) */}
            <Card title="Quick Information" className="mb-6">
              <Space direction="vertical" size="middle" className="w-full">
                <div>
                  <Text strong>Processing Time:</Text>
                  <br />
                  <Space>
                    <ClockCircleOutlined className="text-orange-500" />
                    <Text>{mockServiceData.processingTime}</Text>
                  </Space>
                </div>

                <Divider />

                <div>
                  <Text strong>Service Fee:</Text>
                  <br />
                  <Text type="success" className="text-lg">
                    {mockServiceData.fee}
                  </Text>
                </div>

                <Divider />

                <div>
                  <Text strong>Office Hours:</Text>
                  <br />
                  <Text>{mockServiceData.officeHours}</Text>
                </div>
              </Space>
            </Card>

            {/* Eligibility Criteria (mock data) */}
            <Card title="Eligibility Criteria" className="mb-6">
              <List
                dataSource={mockServiceData.eligibility}
                renderItem={(criteria, index) => (
                  <List.Item key={index} className="!py-2">
                    <Space>
                      <CheckCircleOutlined className="text-green-500" />
                      <Text className="text-sm">{criteria}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>

            {/* Contact Information (mock data) */}
            <Card title="Contact Information">
            <Space direction="vertical" size="small" className="w-full">
                <div>
                <Text strong>Phone:</Text>
                <br />
                <Text copyable>{mockServiceData.contactInfo?.phone || "-"}</Text>
                </div>
                <Divider />
                <div>
                <Text strong>Email:</Text>
                <br />
                <Text copyable>{mockServiceData.contactInfo?.Email || "-"}</Text>
                </div>
                <Divider />
                <div>
                <Text strong>Payments:</Text>
                <br />
                <Text copyable>{mockServiceData.contactInfo?.payments || "-"}</Text>
                </div>
            </Space>
            </Card>
          </Col>
        </Row>

        <Card className="mt-8">
          <div className="text-center">
            <Space direction="vertical" size="middle">
              <InfoCircleOutlined className="text-4xl text-blue-500" />
              <Title level={4}>Ready to get started?</Title>
              <Paragraph>
                Book an appointment now to begin your application process.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                icon={<CalendarOutlined />}
                onClick={handleBookAppointment}
              >
                Book Your Appointment
              </Button>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SingleServiceDetailPage;
