import { Button, Card, Col, Input, Row, Space, Typography } from 'antd';
const { Title, Paragraph } = Typography;
const { Search } = Input;
import {
    CarOutlined,
    FileTextOutlined,
    HomeOutlined,
    SearchOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useState } from 'react';
import { Briefcase, CreditCard, GraduationCap, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
    iconColor: string;
    category: string;
}

const services: Service[] = [
    {
        id: "documents",
        title: "Document Services",
        description: "Apply for ID cards, passports, certificates and more",
        icon: <FileTextOutlined className="text-4xl text-blue-600" />,
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
        category: "documents"
    },
    {
        id: "tax",
        title: "Tax & Payments",
        description: "Pay taxes, fines, and government fees online",
        icon: <CreditCard className="text-4xl text-green-600" />,
        bgColor: "bg-green-50",
        iconColor: "text-green-600",
        category: "finance"
    },
    {
        id: "vehicle",
        title: "Vehicle Services",
        description: "License renewals, registration, and permits",
        icon: <CarOutlined className="text-4xl text-purple-600" />,
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        category: "transport"
    },
    {
        id: "property",
        title: "Property Services",
        description: "Land records, property registration, and permits",
        icon: <HomeOutlined className="text-4xl text-orange-600" />,
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600",
        category: "property"
    },
    {
        id: "education",
        title: "Education Services",
        description: "School admissions, scholarships, and certificates",
        icon: <GraduationCap className="text-4xl text-red-600" />,
        bgColor: "bg-red-50",
        iconColor: "text-red-600",
        category: "education"
    },
    {
        id: "healthcare",
        title: "Healthcare Services",
        description: "Hospital registration, medical records, and appointments",
        icon: <Heart className="text-4xl text-teal-600" />,
        bgColor: "bg-teal-50",
        iconColor: "text-teal-600",
        category: "health"
    },
    {
        id: "employment",
        title: "Employment Services",
        description: "Job applications, unemployment benefits, and training",
        icon: <Briefcase className="text-4xl text-indigo-600" />,
        bgColor: "bg-indigo-50",
        iconColor: "text-indigo-600",
        category: "employment"
    },
    {
        id: "social",
        title: "Social Services",
        description: "Welfare benefits, social security, and support programs",
        icon: <TeamOutlined className="text-4xl text-cyan-600" />,
        bgColor: "bg-cyan-50",
        iconColor: "text-cyan-600",
        category: "social"
    }
];

export const LandingGovServices = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleServiceClick = (serviceId: string) => {
        navigate(`/services/${serviceId}`);
    };
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Title level={2} className="!text-gray-900 !mb-4">
                        Popular Government Services
                    </Title>
                    <Paragraph className="!text-lg !text-gray-600 !mb-8">
                        Quick access to the most frequently used government services
                    </Paragraph>

                    {/* Search Box */}
                    <div className="max-w-md mx-auto mb-8">
                        <Search
                            placeholder="Search for government services..."
                            allowClear
                            enterButton={<SearchOutlined />}
                            size="large"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onSearch={(value) => setSearchTerm(value)}
                            className="shadow-sm"
                        />

                        {/* Quick search suggestions */}
                        {!searchTerm && (
                            <div className="mt-3 text-center">
                                <Paragraph className="!text-gray-400 !text-sm !mb-2">
                                    Popular searches:
                                </Paragraph>
                                <Space wrap>
                                    {["passport", "tax", "license", "property", "education"].map((suggestion) => (
                                        <Button
                                            key={suggestion}
                                            type="text"
                                            size="small"
                                            className="text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-full px-3"
                                            onClick={() => setSearchTerm(suggestion)}
                                        >
                                            {suggestion}
                                        </Button>
                                    ))}
                                </Space>
                            </div>
                        )}
                    </div>

                    {/* Results count */}
                    {searchTerm && (
                        <Paragraph className="!text-gray-500 !mb-6">
                            {filteredServices.length === 0
                                ? "No services found"
                                : `Found ${filteredServices.length} service${filteredServices.length !== 1 ? 's' : ''}`
                            }
                        </Paragraph>
                    )}
                </div>

                <Row gutter={[24, 24]}>
                    {filteredServices.map((service) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={service.id}>
                            <Card
                                hoverable
                                className="text-center h-full cursor-pointer"
                                cover={
                                    <div className={`p-6 ${service.bgColor}`}>
                                        {service.icon}
                                    </div>
                                }
                                onClick={() => handleServiceClick(service.id)}
                            >
                                <Card.Meta
                                    title={service.title}
                                    description={service.description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* No results message */}
                {filteredServices.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <SearchOutlined className="text-4xl" />
                        </div>
                        <Title level={4} className="!text-gray-500 !mb-2">
                            No services found
                        </Title>
                        <Paragraph className="!text-gray-400">
                            Try searching with different keywords or browse all available services.
                        </Paragraph>
                    </div>
                )}
            </div>
        </section>
    )
}
