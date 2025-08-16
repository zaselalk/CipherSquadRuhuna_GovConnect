import { Card, Col, Input, Row, Typography, Spin } from 'antd';
const { Title, Paragraph } = Typography;
const { Search } = Input;
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DepartmentService, DepartmentServicesApi } from '../../../services/service.service';


const logo = "/logo.png"; // Path to your logo in public folder

export const LandingGovServices = () => {
    const [services, setServices] = useState<DepartmentService[]>([]);
    const [filteredServices, setFilteredServices] = useState<DepartmentService[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch services from backend
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const data = await DepartmentServicesApi.getAllServices();
                setServices(data);
                setFilteredServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    // Filter services based on search term
    useEffect(() => {
        const filtered = services.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
        );
        setFilteredServices(filtered);
    }, [searchTerm, services]);

    const handleServiceClick = (serviceId: number) => {
        navigate(`/services/${serviceId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-16">
                <Spin size="large" tip="Loading services..." />
            </div>
        );
    }

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
                    </div>

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
                        <Col xs={24} sm={12} md={8} lg={6} key={service.service_id}>
                            <Card
                                hoverable
                                className="text-center h-full cursor-pointer"
                                cover={
                                    <div className="p-6 bg-blue-50">
                                        <img src={logo} alt={service.name} className="mx-auto h-16 w-16" />
                                    </div>
                                }
                                onClick={() => handleServiceClick(service.service_id)}
                            >
                                <Card.Meta
                                    title={service.name}
                                    description={service.description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>

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
    );
};
