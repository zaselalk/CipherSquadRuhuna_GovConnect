import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
    Card,
    Button,
    Typography,
    Form,
    Input,
    Calendar,
    Select,
    Space,
    Steps,
    Row,
    Col,
    Alert,
    Divider,
    notification
} from "antd";
import {
    ArrowLeftOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    FileTextOutlined
} from "@ant-design/icons";
import { LandingHeader } from "../components/features/landing-page/LandingHeader";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface AppointmentData {
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    fullName: string;
    email: string;
    phone: string;
    nic: string;
    address: string;
    additionalNotes: string;
}

const AppointmentBookingPage = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [appointmentData, setAppointmentData] = useState<Partial<AppointmentData>>({});

    // Service titles mapping
    const serviceNames: Record<string, string> = {
        documents: "Document Services",
        tax: "Tax & Payments",
        vehicle: "Vehicle Services",
        property: "Property Services",
        education: "Education Services",
        healthcare: "Healthcare Services",
        employment: "Employment Services",
        social: "Social Services"
    };

    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
    ];

    const steps = [
        {
            title: "Service & Date",
            description: "Choose service type and preferred date"
        },
        {
            title: "Personal Information",
            description: "Provide your contact details"
        },
        {
            title: "Confirmation",
            description: "Review and confirm your appointment"
        }
    ];

    const handleNext = async () => {
        try {
            const values = await form.validateFields();
            setAppointmentData({ ...appointmentData, ...values });
            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            notification.success({
                message: "Appointment Booked Successfully!",
                description: "You will receive a confirmation email shortly with your appointment details.",
                duration: 5
            });

            // Navigate to confirmation page or back to services
            navigate("/", {
                state: {
                    message: "Your appointment has been successfully booked. Check your email for confirmation details."
                }
            });

        } catch (error) {
            notification.error({
                message: "Booking Failed",
                description: "There was an error booking your appointment. Please try again."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const disabledDate = (current: dayjs.Dayjs) => {
        // Disable past dates and weekends
        return current && (current < dayjs().endOf('day') || current.day() === 0 || current.day() === 6);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
        <Card title="Select Service & Date">
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Form.Item
                        name="serviceType"
                        label="Service Type"
                        rules={[{ required: true, message: "Please select a service type" }]}
                        initialValue={serviceId}
                    >
                        <Select size="large" placeholder="Select service type">
                            {Object.entries(serviceNames).map(([key, value]) => (
                                <Option key={key} value={key}>{value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                {/* Calendar & Time Slots Side by Side */}
                <Col xs={24} md={12}>
                    <Card title="Choose Date" bordered>
                        <Calendar
                            fullscreen={false} // works here for Calendar
                            disabledDate={disabledDate}
                            value={
                                appointmentData.preferredDate
                                    ? dayjs(appointmentData.preferredDate)
                                    : undefined
                            }
                            onSelect={(date) => {
                                const formatted = date.format("YYYY-MM-DD");
                                setAppointmentData(prev => ({
                                    ...prev,
                                    preferredDate: formatted
                                }));
                                form.setFieldsValue({ preferredDate: formatted });
                            }}
                        />
                    </Card>
                </Col>

                {/* Time slots */}

                <Col xs={24} md={12}>
                    <Card title="Available Time Slots" bordered>
                        {appointmentData.preferredDate ? (
                        <Space wrap>
                            {timeSlots.map(time => (
                                <Button
                                    key={time}
                                    type={appointmentData.preferredTime === time ? "primary" : "default"}
                                    onClick={() => {
                                        setAppointmentData(prev => ({
                                            ...prev,
                                            preferredTime: time
                                        }));
                                        form.setFieldsValue({ preferredTime: time });
                                    }}
                                >
                                    {time}
                                </Button>
                            ))}
                        </Space>
                        ) : (
                            <Alert
                                message="Please select a date first to see available time slots."
                                type="info"
                                showIcon
                            />
                        )}
                    </Card>
                </Col>
            </Row>

            <Alert
                message="Appointment Guidelines"
                description="Please arrive 15 minutes before your scheduled time. Bring all required documents mentioned in the service details."
                type="info"
                showIcon
                className="mt-4"
            />
        </Card>
    );

            case 1:
                return (
                    <Card title="Personal Information">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="fullName"
                                    label="Full Name"
                                    rules={[{ required: true, message: "Please enter your full name" }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Enter your full name"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="nic"
                                    label="National ID Number"
                                    rules={[{ required: true, message: "Please enter your NIC number" }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<FileTextOutlined />}
                                        placeholder="Enter your NIC number"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="email"
                                    label="Email Address"
                                    rules={[
                                        { required: true, message: "Please enter your email" },
                                        { type: "email", message: "Please enter a valid email" }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<MailOutlined />}
                                        placeholder="Enter your email address"
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: "Please enter your phone number" }]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<PhoneOutlined />}
                                        placeholder="Enter your phone number"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="address"
                                    label="Address"
                                    rules={[{ required: true, message: "Please enter your address" }]}
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Enter your complete address"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="additionalNotes"
                                    label="Additional Notes (Optional)"
                                >
                                    <TextArea
                                        rows={3}
                                        placeholder="Any additional information or special requirements"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                );

            case 2:
                return (
                    <Card title="Confirmation Details">
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12}>
                                <Card type="inner" title="Appointment Details">
                                    <Space direction="vertical" size="middle" className="w-full">
                                        <div>
                                            <Text strong>Service:</Text>
                                            <br />
                                            <Text>{serviceNames[appointmentData.serviceType || ""] || "Not selected"}</Text>
                                        </div>

                                        <Divider />

                                        <div>
                                            <Text strong>Date:</Text>
                                            <br />
                                            <Space>
                                                <CalendarOutlined className="text-blue-500" />
                                                <Text>{appointmentData.preferredDate || "Not selected"}</Text>
                                            </Space>
                                        </div>

                                        <Divider />

                                        <div>
                                            <Text strong>Time:</Text>
                                            <br />
                                            <Space>
                                                <ClockCircleOutlined className="text-green-500" />
                                                <Text>{appointmentData.preferredTime || "Not selected"}</Text>
                                            </Space>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>

                            <Col xs={24} md={12}>
                                <Card type="inner" title="Personal Information">
                                    <Space direction="vertical" size="middle" className="w-full">
                                        <div>
                                            <Text strong>Name:</Text>
                                            <br />
                                            <Text>{appointmentData.fullName || "Not provided"}</Text>
                                        </div>

                                        <Divider />

                                        <div>
                                            <Text strong>NIC:</Text>
                                            <br />
                                            <Text>{appointmentData.nic || "Not provided"}</Text>
                                        </div>

                                        <Divider />

                                        <div>
                                            <Text strong>Email:</Text>
                                            <br />
                                            <Text>{appointmentData.email || "Not provided"}</Text>
                                        </div>

                                        <Divider />

                                        <div>
                                            <Text strong>Phone:</Text>
                                            <br />
                                            <Text>{appointmentData.phone || "Not provided"}</Text>
                                        </div>
                                    </Space>
                                </Card>
                            </Col>
                        </Row>

                        <Alert
                            message="Important Notice"
                            description="Please review all details carefully. You will receive a confirmation email after booking. If you need to make changes, contact us at 1919."
                            type="warning"
                            showIcon
                            className="mt-4"
                        />
                    </Card>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <LandingHeader />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={handleGoBack}
                    className="mb-6 hover:bg-blue-50"
                >
                    Back to Service Details
                </Button>

                {/* Page Header */}
                <Card className="mb-8">
                    <div className="text-center">
                        <CalendarOutlined className="text-4xl text-blue-500 mb-4" />
                        <Title level={2}>Book an Appointment</Title>
                        <Paragraph className="!text-lg !text-gray-600">
                            Schedule your visit for {serviceNames[serviceId || ""] || "government services"}
                        </Paragraph>
                    </div>
                </Card>

                {/* Steps */}
                <Card className="mb-8">
                    <Steps current={currentStep} items={steps} />
                </Card>

                {/* Form Content */}
                <Form
                    form={form}
                    layout="vertical"
                    size="large"
                    initialValues={{ serviceType: serviceId }}
                >
                    {renderStepContent()}
                </Form>

                {/* Navigation Buttons */}
                <Card className="mt-8">
                    <div className="flex justify-between">
                        <Button
                            size="large"
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                        >
                            Previous
                        </Button>

                        <Space>
                            {currentStep < steps.length - 1 && (
                                <Button type="primary" size="large" onClick={handleNext}>
                                    Next
                                </Button>
                            )}

                            {currentStep === steps.length - 1 && (
                                <Button
                                    type="primary"
                                    size="large"
                                    loading={isSubmitting}
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                                </Button>
                            )}
                        </Space>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AppointmentBookingPage;
