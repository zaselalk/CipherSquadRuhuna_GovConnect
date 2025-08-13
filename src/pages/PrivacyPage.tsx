import { FC } from "react";
import { Card } from "antd";
import { LandingHeader } from "../components/features/landing-page/LandingHeader";

const PrivacyPage: FC = () => {
    return (
        <>
            <LandingHeader />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <Card className="rounded-3xl shadow-xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-[#008FFB] mb-4">Privacy Policy</h1>
                            <p className="text-gray-600">GovConnect Healthcare Management System</p>
                        </div>

                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                                <p>
                                    We collect personal and health information necessary to provide healthcare services, including but not limited to:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Personal identification information (name, NIC, contact details)</li>
                                    <li>Health and medical information</li>
                                    <li>Emergency contact information</li>
                                    <li>Insurance and billing information</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                                <p>
                                    Your information is used to:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Provide healthcare services and maintain medical records</li>
                                    <li>Coordinate care between healthcare providers</li>
                                    <li>Process billing and insurance claims</li>
                                    <li>Comply with legal and regulatory requirements</li>
                                    <li>Improve our services and system functionality</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
                                <p>
                                    We may share your information with:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Healthcare providers involved in your care</li>
                                    <li>Government health authorities as required by law</li>
                                    <li>Insurance providers for billing purposes</li>
                                    <li>Emergency contacts in case of medical emergencies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
                                <p>
                                    We implement appropriate technical and organizational measures to protect your personal and health information against unauthorized access, disclosure, alteration, or destruction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
                                <p>
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Access your personal and health information</li>
                                    <li>Request corrections to inaccurate information</li>
                                    <li>Understand how your information is used</li>
                                    <li>File complaints about privacy concerns</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
                                <p>
                                    For privacy-related questions or concerns, please contact the data protection officer at your local healthcare facility.
                                </p>
                            </section>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default PrivacyPage;
