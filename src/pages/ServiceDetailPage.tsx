import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
    Card,
    Button,
    Typography,
    Space,
    Divider,
    List,
    Tag,
    Alert,
    Steps,
    Row,
    Col,
    Spin
} from "antd";
import {
    ArrowLeftOutlined,
    CalendarOutlined,
    FileTextOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import { LandingHeader } from "../components/features/landing-page/LandingHeader";
import CommonNav from "../components/common/CommonNav";

const { Title, Paragraph, Text } = Typography;

// Mock service data - in real app, this would come from API
const serviceData: Record<string, ServiceDetail> = {
    documents: {
        id: "documents",
        title: "Document Services",
        shortDescription: "Apply for ID cards, passports, certificates and more",
        detailedDescription: "Our document services provide comprehensive support for all your identification and certification needs. From national identity cards to international passports, birth certificates to educational transcripts, we streamline the application process to make government document procurement simple and efficient.",
        icon: <FileTextOutlined className="text-4xl text-blue-600" />,
        bgColor: "bg-blue-50",
        category: "Identity & Documentation",
        processingTime: "5-15 business days",
        fee: "LKR 500 - 3,500",
        eligibility: [
            "Sri Lankan citizen or legal resident",
            "Age 16 or above for ID card applications",
            "Valid proof of identity for passport applications",
            "No outstanding legal issues or document disputes"
        ],
        requiredDocuments: [
            "Birth Certificate (certified copy)",
            "Proof of Address (utility bill or bank statement)",
            "Previous ID card (if renewal)",
            "Two passport-sized photographs",
            "Marriage certificate (if applicable)",
            "Proof of payment"
        ],
        applicationSteps: [
            {
                step: 1,
                title: "Document Preparation",
                description: "Gather all required documents and ensure they are in good condition"
            },
            {
                step: 2,
                title: "Online Application",
                description: "Fill out the online application form with accurate information"
            },
            {
                step: 3,
                title: "Appointment Booking",
                description: "Schedule an appointment at your nearest service center"
            },
            {
                step: 4,
                title: "Verification Visit",
                description: "Visit the service center for document verification and biometric data collection"
            },
            {
                step: 5,
                title: "Processing & Collection",
                description: "Wait for processing and collect your documents from the designated location"
            }
        ],
        officeHours: "Monday - Friday: 8:00 AM - 4:00 PM",
        contactInfo: {
            phone: "1919 (24/7 Helpline)",
            email: "documents@govconnect.gov",
            address: "Department of Registration of Persons, Colombo 07"
        }
    },
    tax: {
        id: "tax",
        title: "Tax & Payments",
        shortDescription: "Pay taxes, fines, and government fees online",
        detailedDescription: "Simplify your tax obligations and government payments through our secure online platform. Pay income tax, property tax, vehicle tax, and various government fees from the comfort of your home with instant confirmation and digital receipts.",
        icon: <FileTextOutlined className="text-4xl text-green-600" />,
        bgColor: "bg-green-50",
        category: "Finance & Revenue",
        processingTime: "Instant - 3 business days",
        fee: "No service charges for online payments",
        eligibility: [
            "Active bank account or credit card",
            "Valid taxpayer identification number",
            "Outstanding tax liabilities or fees",
            "Access to internet banking or mobile payments"
        ],
        requiredDocuments: [
            "Tax Assessment Notice",
            "Bank account details",
            "National ID card",
            "Previous payment receipts (if any)",
            "Business registration (for business taxes)"
        ],
        applicationSteps: [
            {
                step: 1,
                title: "Account Setup",
                description: "Create or log into your GovConnect tax portal account"
            },
            {
                step: 2,
                title: "Select Service",
                description: "Choose the type of tax or fee you want to pay"
            },
            {
                step: 3,
                title: "Enter Details",
                description: "Input payment amount and reference numbers"
            },
            {
                step: 4,
                title: "Payment Processing",
                description: "Complete payment using your preferred method"
            },
            {
                step: 5,
                title: "Confirmation",
                description: "Receive payment confirmation and digital receipt"
            }
        ],
        officeHours: "Online 24/7, Phone support: 8:00 AM - 8:00 PM",
        contactInfo: {
            phone: "1919 (Tax Helpline)",
            email: "tax@govconnect.gov",
            address: "Inland Revenue Department, Colombo 02"
        }
    },
    vehicle: {
        id: "vehicle",
        title: "Vehicle Services",
        shortDescription: "License renewals, registration, and permits",
        detailedDescription: "Comprehensive vehicle services including driving license renewals, vehicle registration, road permits, and insurance verification. Our streamlined process ensures you stay compliant with traffic regulations while minimizing paperwork and waiting times.",
        icon: <FileTextOutlined className="text-4xl text-purple-600" />,
        bgColor: "bg-purple-50",
        category: "Transport & Mobility",
        processingTime: "1-7 business days",
        fee: "LKR 200 - 2,000",
        eligibility: [
            "Valid driving license (for renewals)",
            "Vehicle ownership documentation",
            "Current insurance coverage",
            "No outstanding traffic violations"
        ],
        requiredDocuments: [
            "Current driving license",
            "Vehicle registration certificate",
            "Insurance certificate",
            "Medical certificate (for certain renewals)",
            "Proof of payment",
            "Passport-sized photographs"
        ],
        applicationSteps: [
            {
                step: 1,
                title: "Eligibility Check",
                description: "Verify your eligibility and clear any outstanding violations"
            },
            {
                step: 2,
                title: "Online Application",
                description: "Submit your application through the vehicle services portal"
            },
            {
                step: 3,
                title: "Document Upload",
                description: "Upload required documents and photographs"
            },
            {
                step: 4,
                title: "Appointment & Testing",
                description: "Attend appointment for testing (if required)"
            },
            {
                step: 5,
                title: "License Collection",
                description: "Collect your renewed license or registration"
            }
        ],
        officeHours: "Monday - Friday: 8:00 AM - 4:00 PM, Saturday: 8:00 AM - 12:00 PM",
        contactInfo: {
            phone: "1919 (Vehicle Services)",
            email: "vehicles@govconnect.gov",
            address: "Department of Motor Traffic, Werahera"
        }
    }
    // Add more services as needed
};

interface ServiceDetail {
    id: string;
    title: string;
    shortDescription: string;
    detailedDescription: string;
    icon: React.ReactNode;
    bgColor: string;
    category: string;
    processingTime: string;
    fee: string;
    eligibility: string[];
    requiredDocuments: string[];
    applicationSteps: {
        step: number;
        title: string;
        description: string;
    }[];
    officeHours: string;
    contactInfo: {
        phone: string;
        email: string;
        address: string;
    };
}

const ServiceDetailPage = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchServiceDetails = async () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                if (serviceId && serviceData[serviceId]) {
                    setService(serviceData[serviceId]);
                }
                setLoading(false);
            }, 1000);
        };

        fetchServiceDetails();
    }, [serviceId]);

    const handleBookAppointment = () => {
        // Navigate to appointment booking page
        navigate(`/services/${serviceId}/book-appointment`);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <LandingHeader />
                <div className="flex justify-center items-center min-h-[60vh]">
                    <Spin size="large" tip="Loading service details..." />
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-gray-50">
                <LandingHeader />
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <Alert
                        message="Service Not Found"
                        description="The requested service could not be found. Please check the URL or return to the services page."
                        type="error"
                        showIcon
                        action={
                            <Button type="primary" onClick={handleGoBack}>
                                Go Back
                            </Button>
                        }
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <CommonNav />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Back Button */}
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
                            <div className={`p-6 ${service.bgColor} rounded-lg text-center`}>
                                {service.icon}
                            </div>
                        </Col>
                        <Col xs={24} sm={14}>
                            <Space direction="vertical" size="small">
                                <Tag color="blue">{service.category}</Tag>
                                <Title level={2} className="!mb-2">{service.title}</Title>
                                <Paragraph className="!text-lg !text-gray-600 !mb-0">
                                    {service.shortDescription}
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
                    {/* Left Column */}
                    <Col xs={24} lg={16}>
                        {/* Service Description */}
                        <Card title="Service Overview" className="mb-6">
                            <Paragraph className="!text-base !leading-relaxed">
                                {service.detailedDescription}
                            </Paragraph>
                        </Card>

                        {/* Application Process */}
                        <Card title="Application Process" className="mb-6">
                            <Steps
                                direction="vertical"
                                current={-1}
                                items={service.applicationSteps.map((step) => ({
                                    title: step.title,
                                    description: step.description,
                                    icon: <CheckCircleOutlined />
                                }))}
                            />
                        </Card>

                        {/* Required Documents */}
                        <Card title="Required Documents" className="mb-6">
                            <List
                                dataSource={service.requiredDocuments}
                                renderItem={(document) => (
                                    <List.Item>
                                        <Space>
                                            <FileTextOutlined className="text-blue-600" />
                                            <Text>{document}</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>

                    {/* Right Column */}
                    <Col xs={24} lg={8}>
                        {/* Quick Info */}
                        <Card title="Quick Information" className="mb-6">
                            <Space direction="vertical" size="middle" className="w-full">
                                <div>
                                    <Text strong>Processing Time:</Text>
                                    <br />
                                    <Space>
                                        <ClockCircleOutlined className="text-orange-500" />
                                        <Text>{service.processingTime}</Text>
                                    </Space>
                                </div>

                                <Divider />

                                <div>
                                    <Text strong>Service Fee:</Text>
                                    <br />
                                    <Text type="success" className="text-lg">{service.fee}</Text>
                                </div>

                                <Divider />

                                <div>
                                    <Text strong>Office Hours:</Text>
                                    <br />
                                    <Text>{service.officeHours}</Text>
                                </div>
                            </Space>
                        </Card>

                        {/* Eligibility */}
                        <Card title="Eligibility Criteria" className="mb-6">
                            <List
                                dataSource={service.eligibility}
                                renderItem={(criteria) => (
                                    <List.Item className="!py-2">
                                        <Space>
                                            <CheckCircleOutlined className="text-green-500" />
                                            <Text className="text-sm">{criteria}</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </Card>

                        {/* Contact Information */}
                        <Card title="Contact Information">
                            <Space direction="vertical" size="small" className="w-full">
                                <div>
                                    <Text strong>Phone:</Text>
                                    <br />
                                    <Text copyable>{service.contactInfo.phone}</Text>
                                </div>

                                <Divider />

                                <div>
                                    <Text strong>Email:</Text>
                                    <br />
                                    <Text copyable>{service.contactInfo.email}</Text>
                                </div>

                                <Divider />

                                <div>
                                    <Text strong>Address:</Text>
                                    <br />
                                    <Text>{service.contactInfo.address}</Text>
                                </div>
                            </Space>
                        </Card>
                    </Col>
                </Row>

                {/* Bottom Action */}
                <Card className="mt-8">
                    <div className="text-center">
                        <Space direction="vertical" size="middle">
                            <InfoCircleOutlined className="text-4xl text-blue-500" />
                            <Title level={4}>Ready to get started?</Title>
                            <Paragraph>
                                Book an appointment now to begin your application process.
                                Our staff will guide you through each step.
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

export default ServiceDetailPage;
