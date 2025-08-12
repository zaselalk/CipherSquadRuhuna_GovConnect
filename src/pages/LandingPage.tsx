import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  MapPin,
  Activity,
  UserCheck,
  Shield,
  Heart,
  Phone,
  Mail,
  CreditCard,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Button, Card, Row, Col, Statistic, Typography, Space, Avatar, Input } from "antd";
import {
  FileTextOutlined,
  CarOutlined,
  HomeOutlined,
  TeamOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Search } = Input;

interface Stats {
  citizens: number;
  services: number;
  departments: number;
  applications: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  category: string;
}

function LandingPage() {
  const [stats, setStats] = useState<Stats>({
    citizens: 0,
    services: 0,
    departments: 0,
    applications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Replace with actual API call
        setStats({
          citizens: 0,
          services: 0,
          departments: 0,
          applications: 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Set default values if API fails
        setStats({
          citizens: 125000,
          services: 45,
          departments: 12,
          applications: 8500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  GovConnect
                </h1>
                <p className="text-sm text-gray-600">
                  Your Gateway to Government Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Government Services
                <span className="block text-blue-600">Simplified!</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Access all government services from one convenient platform. Apply for documents,
                pay bills, track applications, and connect with government departments seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/resident/login"
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Citizen Portal</span>
                </Link>
                <Link
                  to="/admin/login"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>Officer Portal</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/landing-cover.svg"
                alt="Government Services Illustration"
                className="w-full h-auto max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Government Services Section */}
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
                  className="text-center h-full"
                  cover={
                    <div className={`p-6 ${service.bgColor}`}>
                      {service.icon}
                    </div>
                  }
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

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Title level={2} className="!text-gray-900 !mb-4">
              Our Impact
            </Title>
            <Paragraph className="!text-lg !text-gray-600">
              Serving citizens with comprehensive digital government services
            </Paragraph>
          </div>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <Statistic
                  title="Registered Citizens"
                  value={loading ? 0 : stats.citizens}
                  loading={loading}
                  className="!text-gray-900"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <Statistic
                  title="Available Services"
                  value={loading ? 0 : stats.services}
                  loading={loading}
                  className="!text-gray-900"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <Statistic
                  title="Government Departments"
                  value={loading ? 0 : stats.departments}
                  loading={loading}
                  className="!text-gray-900"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-orange-600" />
                </div>
                <Statistic
                  title="Applications Processed"
                  value={loading ? 0 : stats.applications}
                  loading={loading}
                  className="!text-gray-900"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} className="!text-gray-900 !mb-6">
                Get in Touch
              </Title>
              <Paragraph className="!text-lg !text-gray-600 !mb-8">
                Need help with government services? Our customer support team is
                available to assist you with your applications and queries.
              </Paragraph>
              <Space direction="vertical" size="large" className="w-full">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Citizen Helpline
                    </div>
                    <div className="text-gray-600">1919 (24/7)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Email Support
                    </div>
                    <div className="text-gray-600">support@govconnect.gov</div>
                  </div>
                </div>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-0">
                <div className="text-white">
                  <Title level={3} className="!text-white !mb-6">
                    Access Your Portal
                  </Title>
                  <Paragraph className="!text-blue-100 !mb-8">
                    Choose your portal to access government services and manage
                    your applications and documents.
                  </Paragraph>
                  <Space direction="vertical" size="middle" className="w-full">
                    <Link to="/resident/login" className="w-full">
                      <Button
                        type="primary"
                        size="large"
                        icon={<UserCheck className="w-5 h-5" />}
                        className="w-full bg-white text-blue-600 border-white hover:bg-gray-50"
                      >
                        Citizen Login
                      </Button>
                    </Link>
                    <Link to="/admin/login" className="w-full">
                      <Button
                        size="large"
                        icon={<Shield className="w-5 h-5" />}
                        className="w-full bg-blue-500/20 text-white border-blue-400 hover:bg-blue-400/30"
                      >
                        Officer Login
                      </Button>
                    </Link>
                  </Space>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Developer Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Title level={2} className="!text-gray-900 !mb-4">
              Meet Our Development Team
            </Title>
            <Paragraph className="!text-lg !text-gray-600">
              The talented developers behind this government services platform
            </Paragraph>
          </div>
          <Row gutter={[24, 24]}>
            {/* Developer 1 */}
            <Col xs={24} sm={12} md={6}>
              <Card hoverable className="text-center h-full">
                <Avatar
                  size={96}
                  className="bg-gradient-to-br from-blue-400 to-blue-600 mb-4 mx-auto"
                >
                  <span className="text-2xl font-bold">A</span>
                </Avatar>
                <Title level={4} className="!mb-2">
                  Asela Priyadarshana
                </Title>
                <Paragraph className="!text-blue-600 !font-medium !mb-3">
                  Full Stack Developer
                </Paragraph>
                <Paragraph className="!text-gray-600 !text-sm">
                  Focused on deployment, infrastructure, and system optimization
                </Paragraph>
              </Card>
            </Col>

            {/* Developer 2 */}
            <Col xs={24} sm={12} md={6}>
              <Card hoverable className="text-center h-full">
                <Avatar
                  size={96}
                  className="bg-gradient-to-br from-green-400 to-teal-600 mb-4 mx-auto"
                >
                  <span className="text-2xl font-bold">D</span>
                </Avatar>
                <Title level={4} className="!mb-2">
                  Dilukshi Nimasha
                </Title>
                <Paragraph className="!text-green-600 !font-medium !mb-3">
                  Full Stack Developer
                </Paragraph>
                <Paragraph className="!text-gray-600 !text-sm">
                  Expert in server-side development and database management
                </Paragraph>
              </Card>
            </Col>

            {/* Developer 3 */}
            <Col xs={24} sm={12} md={6}>
              <Card hoverable className="text-center h-full">
                <Avatar
                  size={96}
                  className="bg-gradient-to-br from-purple-400 to-pink-600 mb-4 mx-auto"
                >
                  <span className="text-2xl font-bold">R</span>
                </Avatar>
                <Title level={4} className="!mb-2">
                  Ravindu Harshana
                </Title>
                <Paragraph className="!text-purple-600 !font-medium !mb-3">
                  Full Stack Developer
                </Paragraph>
                <Paragraph className="!text-gray-600 !text-sm">
                  Specialized in frontend development and user experience design
                </Paragraph>
              </Card>
            </Col>

            {/* Developer 4 */}
            <Col xs={24} sm={12} md={6}>
              <Card hoverable className="text-center h-full">
                <Avatar
                  size={96}
                  className="bg-gradient-to-br from-orange-400 to-red-600 mb-4 mx-auto"
                >
                  <span className="text-2xl font-bold">N</span>
                </Avatar>
                <Title level={4} className="!mb-2">
                  Ashfa Nistar
                </Title>
                <Paragraph className="!text-orange-600 !font-medium !mb-3">
                  Full Stack Developer
                </Paragraph>
                <Paragraph className="!text-gray-600 !text-sm">
                  Creating intuitive interfaces and seamless user experiences
                </Paragraph>
              </Card>
            </Col>
          </Row>

          {/* Team Stats */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <Row gutter={[32, 32]} className="text-center">
                <Col xs={24} md={8}>
                  <Statistic
                    title="Development Team"
                    value="Team CipherSquad"
                    valueStyle={{ color: "#1f2937", fontWeight: "bold" }}
                  />
                </Col>
                <Col xs={24} md={8}>
                  <Statistic
                    title="Educational Institution"
                    value="University of Ruhuna"
                    valueStyle={{ color: "#1f2937", fontWeight: "bold" }}
                  />
                </Col>
                <Col xs={24} md={8}>
                  <Statistic
                    title="Project Year"
                    value={2025}
                    valueStyle={{ color: "#1f2937", fontWeight: "bold" }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <span className="text-xl font-bold">GovConnect</span>
              </div>
              <Paragraph className="!text-gray-400">
                Your gateway to all government services. Simplifying access to
                public services and making government more accessible to everyone.
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <Title level={4} className="!text-white !mb-4">
                Quick Links
              </Title>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#services" className="hover:text-white transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <Link
                    to="/resident/login"
                    className="hover:text-white transition"
                  >
                    Citizen Portal
                  </Link>
                </li>
              </ul>
            </Col>
            <Col xs={24} md={8}>
              <Title level={4} className="!text-white !mb-4">
                Support
              </Title>
              <ul className="space-y-2 text-gray-400">
                <li>Helpline: 1919 (24/7)</li>
                <li>Email: support@govconnect.gov</li>
                <li>Help Center</li>
                <li>FAQ</li>
              </ul>
            </Col>
          </Row>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <Paragraph className="!text-gray-400 !mb-0">
              &copy; 2025 GovConnect - Government of Sri Lanka. | Developed by{" "}
              <a
                href="https://www.ruh.ac.lk"
                className="text-gray-400 hover:text-white transition"
              >
                Team CipherSquad Ruhuna
              </a>
            </Paragraph>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
