import { Card, Col, Row, Statistic, Typography } from 'antd';
import { Activity, Building2, MapPin, Users } from 'lucide-react';
import { useState } from 'react';
import { LandingPagestats } from '../../../types/landing-page';

const { Title, Paragraph } = Typography;
export const LandingStatictics = () => {
    const [stats, setStats] = useState<LandingPagestats>({
        citizens: 0,
        services: 0,
        departments: 0,
        applications: 0,
    });
    return (
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
                                value={stats.citizens}
                                // loading={loading}
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
                                value={stats.services}
                                // loading={loading}
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
                                value={stats.departments}
                                // loading={loading}
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
                                value={stats.applications}
                                // loading={loading}
                                className="!text-gray-900"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    )
}
