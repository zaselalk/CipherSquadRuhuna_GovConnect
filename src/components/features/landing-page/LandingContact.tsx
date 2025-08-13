import { Button, Card, Col, Row, Space, Typography } from "antd"
import { Mail, Phone, Shield, UserCheck } from "lucide-react"
import { Link } from "react-router";

const { Title, Paragraph } = Typography;


export const LandingContact = () => {
    return (
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
                                <Title level={3} className="text-white !mb-6">
                                    Access Your Portal
                                </Title>
                                <Paragraph className="text-blue-100 !mb-8">
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
    )
}
