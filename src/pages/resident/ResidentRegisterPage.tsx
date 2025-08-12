import { FC, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Alert, Button, Form, Input, Select, DatePicker, Row, Col, Card, Divider, Checkbox } from "antd";
import { MailOutlined, LockOutlined, UserOutlined, PhoneOutlined, IdcardOutlined } from "@ant-design/icons";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";
import ResidentService from "../../services/resident.service";
import { ResidentData } from "../../types/resident";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

interface RegistrationFormData {
    firstName: string;
    lastName: string;
    nic: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: dayjs.Dayjs;
    gender: string;
    contactNumber: string;
    address: string;
}

const ResidentRegisterPage: FC = () => {
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onSubmit = async (values: RegistrationFormData) => {
        try {
            setError(null);
            setSuccess(null);
            setIsLoading(true);

            // Transform form data to match API expectations
            const residentData: Partial<ResidentData> = {
                firstName: values.firstName,
                lastName: values.lastName,
                nic: values.nic,
                email: values.email,
                password: values.password,
                birthday: values.birthday.format('YYYY-MM-DD'),
                gender: values.gender,
                contactNumber: values.contactNumber,
                address: values.address,
                heartRate: "",
                bloodPressure: "",
                glucose: 0,
                deletedAt: null
            };

            await ResidentService.addResident(residentData);

            setSuccess("Registration successful! You can now login to your account.");
            form.resetFields();

            // Redirect to login page after 3 seconds
            setTimeout(() => {
                navigate("/resident/login");
            }, 3000);

        } catch (error: any) {
            setError(error.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const validateNIC = (_: any, value: string) => {
        if (!value) {
            return Promise.reject(new Error("NIC is required"));
        }

        const nicPattern = /^\d{9}[VXvx]$|^\d{12}$/;
        if (!nicPattern.test(value)) {
            return Promise.reject(new Error("NIC must be 9 digits followed by 'V' or 'X' OR a 12-digit number"));
        }

        return Promise.resolve();
    };

    const validateConfirmPassword = ({ getFieldValue }: any) => ({
        validator(_: any, value: string) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Passwords do not match!'));
        },
    });

    return (
        <>
            <LandingHeader />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-[#008FFB] px-8 py-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-white mb-2">Citizen Registration</h1>
                                <p className="text-blue-100">Join our healthcare management system</p>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8">
                            {error && (
                                <Alert message={error} type="error" showIcon className="mb-6" />
                            )}

                            {success && (
                                <Alert message={success} type="success" showIcon className="mb-6" />
                            )}

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onSubmit}
                                requiredMark={false}
                                className="space-y-4"
                            >
                                {/* Personal Information */}
                                <Card title="Personal Information" className="mb-6">
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="First Name"
                                                name="firstName"
                                                rules={[{ required: true, message: "First name is required" }]}
                                            >
                                                <Input
                                                    prefix={<UserOutlined />}
                                                    placeholder="Enter your first name"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Last Name"
                                                name="lastName"
                                                rules={[{ required: true, message: "Last name is required" }]}
                                            >
                                                <Input
                                                    prefix={<UserOutlined />}
                                                    placeholder="Enter your last name"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="National Identity Card (NIC)"
                                                name="nic"
                                                rules={[{ validator: validateNIC }]}
                                            >
                                                <Input
                                                    prefix={<IdcardOutlined />}
                                                    placeholder="Enter your NIC number"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Birth Certificate Number"
                                                name="Birthcertificate"
                                                rules={[{ required: true, message: "Birth certificate number is required" }]}
                                            >
                                                <Input
                                                    prefix={<IdcardOutlined />}
                                                    placeholder="Enter birth certificate number"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Date of Birth"
                                                name="birthday"
                                                rules={[{ required: true, message: "Date of birth is required" }]}
                                            >
                                                <DatePicker
                                                    placeholder="Select your date of birth"
                                                    size="large"
                                                    className="w-full rounded-lg"
                                                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Gender"
                                                name="gender"
                                                rules={[{ required: true, message: "Gender is required" }]}
                                            >
                                                <Select placeholder="Select your gender" size="large" className="rounded-lg">
                                                    <Option value="male">Male</Option>
                                                    <Option value="female">Female</Option>
                                                    <Option value="other">Other</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>

                                {/* Contact Information */}
                                <Card title="Contact Information" className="mb-6">
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Email Address"
                                                name="email"
                                                rules={[
                                                    { required: true, message: "Email is required" },
                                                    { type: "email", message: "Invalid email format" },
                                                ]}
                                            >
                                                <Input
                                                    prefix={<MailOutlined />}
                                                    placeholder="Enter your email address"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Contact Number"
                                                name="contactNumber"
                                                rules={[{ required: true, message: "Contact number is required" }]}
                                            >
                                                <Input
                                                    prefix={<PhoneOutlined />}
                                                    placeholder="Enter your contact number"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        label="Address"
                                        name="address"
                                        rules={[{ required: true, message: "Address is required" }]}
                                    >
                                        <TextArea
                                            placeholder="Enter your full address"
                                            rows={3}
                                            className="rounded-lg"
                                        />
                                    </Form.Item>


                                </Card>




                                {/* Account Security */}
                                <Card title="Account Security" className="mb-6">
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[
                                                    { required: true, message: "Password is required" },
                                                    { min: 6, message: "Password must be at least 6 characters" }
                                                ]}
                                            >
                                                <Input.Password
                                                    prefix={<LockOutlined />}
                                                    placeholder="Create a strong password"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                dependencies={['password']}
                                                rules={[
                                                    { required: true, message: "Please confirm your password" },
                                                    validateConfirmPassword
                                                ]}
                                            >
                                                <Input.Password
                                                    prefix={<LockOutlined />}
                                                    placeholder="Confirm your password"
                                                    size="large"
                                                    className="rounded-lg"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Card>

                                {/* Terms and Conditions */}
                                <Form.Item
                                    name="agreedToTerms"
                                    valuePropName="checked"
                                    rules={[
                                        { required: true, message: "Please agree to the terms and conditions" }
                                    ]}
                                >
                                    <Checkbox className="text-gray-600">
                                        I agree to the{" "}
                                        <Link to="/terms" className="text-[#008FFB] hover:underline">
                                            Terms and Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link to="/privacy" className="text-[#008FFB] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </Checkbox>
                                </Form.Item>

                                <Divider />

                                {/* Submit Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={isLoading}
                                        className="flex-1 bg-[#008FFB] hover:bg-[#0066CC] border-0 rounded-lg h-12 text-lg font-medium"
                                    >
                                        {isLoading ? "Registering..." : "Register as Citizen"}
                                    </Button>

                                    <Link to="/resident/login" className="flex-1">
                                        <Button
                                            type="default"
                                            className="w-full h-12 text-lg font-medium rounded-lg"
                                        >
                                            Back to Login
                                        </Button>
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResidentRegisterPage;
