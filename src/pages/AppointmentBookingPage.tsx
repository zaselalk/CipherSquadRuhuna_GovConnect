import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Form, Card, Steps, Button, notification, Typography } from "antd";
import { CalendarOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { LandingHeader } from "../components/features/landing-page/LandingHeader";
import StepServiceDate from "../components/features/appointment-booking/ServiceDate";
import StepPersonalInfo from "../components/features/appointment-booking/PersonalInfo";
import StepUploadDocuments from "../components/features/appointment-booking/UploadDocs";
import StepConfirmation from "../components/features/appointment-booking/Confirmation";
import FormNavigation from "../components/common/FormNavigation";
import AppointmentSuccess from "../components/features/appointment-booking/AppointmentSuccess";

const AppointmentBookingPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>({});
  const [uploadedDocs, setUploadedDocs] = useState<any>({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  const serviceNames: Record<string, string> = {
    documents: "Document Services",
    tax: "Tax & Payments",
    vehicle: "Vehicle Services",
    property: "Property Services",
    education: "Education Services",
    healthcare: "Healthcare Services",
    employment: "Employment Services",
    social: "Social Services",
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
  ];

  const steps = [
    { title: "Service & Date" },
    { title: "Personal Information" },
    { title: "Upload Documents" },
    { title: "Confirmation" },
    { title: "Success" } 
  ];

  const stepFieldMapping: Record<number, string[]> = {
    0: ["serviceType", "preferredDate", "preferredTime"],
    1: ["fullName", "nic", "email", "phone", "address"],
    2: ["birthCertificate", "nicCopy", "medicalReport"]
  };

  const handleNext = async () => {
    try {
      await form.validateFields(stepFieldMapping[currentStep]);
      const values = form.getFieldsValue();
      setAppointmentData((prev: any) => ({ ...prev, ...values }));
      setCurrentStep(currentStep + 1);
    } catch {
      notification.warning({ message: "Please complete all required fields." });
    }
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsConfirmed(true);
      setCurrentStep(4);
      notification.success({ message: "Appointment Booked Successfully!" });
    } catch {
      notification.error({ message: "Please complete all required fields." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => navigate(-1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <StepServiceDate appointmentData={appointmentData} setAppointmentData={setAppointmentData} serviceNames={serviceNames} timeSlots={timeSlots} form={form} />;
      case 1: return <StepPersonalInfo form={form} />;
      case 2: return <StepUploadDocuments uploadedDocs={uploadedDocs} setUploadedDocs={setUploadedDocs} form={form} />;
      case 3: return <StepConfirmation appointmentData={appointmentData} serviceNames={serviceNames} isSubmitting={isSubmitting} onConfirm={handleSubmit} onPrev={handlePrev}  />;
      case 4: return <AppointmentSuccess appointmentData={appointmentData} serviceNames={serviceNames} isConfirmed={isConfirmed} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingHeader />
      <div className="mx-auto px-4 py-8" style={{ maxWidth: '1000px' }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={handleGoBack} className="mb-6">Back</Button>

        <Card className="mb-8 text-center">
          <CalendarOutlined className="text-5xl text-black mb-4" />
          <Typography.Title level={1} style={{ fontWeight: 'bold', color: 'black' }}>
            Book an Appointment
          </Typography.Title>
          <Typography.Paragraph className="!text-lg !text-gray-600">
            Schedule your visit for {serviceNames[serviceId || ""] || "government services"}
          </Typography.Paragraph>
        </Card>

        <Card className="mb-8"><Steps current={currentStep} items={steps} /></Card>

        <Form form={form} layout="vertical" size="large" initialValues={{ serviceType: serviceId }}>
          {renderStepContent()}
        </Form>

        {/* Navigation only for steps before confirmation */}
        {currentStep < 3 && (
          <Card className="mt-8">
            <FormNavigation
              currentStep={currentStep}
              stepsLength={steps.length}
              handlePrev={handlePrev}
              handleNext={handleNext}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentBookingPage;
