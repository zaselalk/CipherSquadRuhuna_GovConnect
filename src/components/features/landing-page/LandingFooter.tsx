import { Col, Row, Typography } from 'antd'
import { Link } from 'react-router';

const { Title, Paragraph } = Typography;

export const LandingFooter = () => {
    return (
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
    )
}
