import { FC } from "react";
import { Card } from "antd";
import { LandingHeader } from "../components/features/landing-page/LandingHeader";

const TermsPage: FC = () => {
    return (
        <>
            <LandingHeader />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <Card className="rounded-3xl shadow-xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-[#008FFB] mb-4">Terms and Conditions</h1>
                            <p className="text-gray-600">GovConnect Healthcare Management System</p>
                        </div>

                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using the GovConnect Healthcare Management System, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use of Services</h2>
                                <p>
                                    This system is designed to provide healthcare management services to citizens. You agree to use the system only for legitimate healthcare-related purposes and to provide accurate and truthful information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Privacy and Data Protection</h2>
                                <p>
                                    We are committed to protecting your privacy and personal health information in accordance with applicable data protection laws and regulations.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Responsibilities</h2>
                                <p>
                                    Users are responsible for maintaining the confidentiality of their login credentials and for all activities that occur under their account.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. System Availability</h2>
                                <p>
                                    While we strive to maintain system availability, we do not guarantee uninterrupted access to the services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Information</h2>
                                <p>
                                    For questions about these terms, please contact the system administrator at your local healthcare facility.
                                </p>
                            </section>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default TermsPage;
