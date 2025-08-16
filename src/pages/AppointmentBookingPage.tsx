import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Form, Card, Steps, Button, notification, Typography } from "antd";
import { CalendarOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import StepServiceDate from "../components/features/appointment-booking/ServiceDate";
import StepPersonalInfo from "../components/features/appointment-booking/PersonalInfo";
import StepUploadDocuments from "../components/features/appointment-booking/UploadDocs";
import StepConfirmation from "../components/features/appointment-booking/Confirmation";
import FormNavigation from "../components/common/FormNavigation";
import AppointmentSuccess from "../components/features/appointment-booking/AppointmentSuccess";
import CommonNav from "../components/common/CommonNav";
import { CitizenService } from "../services/citizen.service";
import { useAppSelector } from "../hooks/state/hooks";
import { AppointmentService } from "../services/appoinment";

const AppointmentBookingPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>({});
  interface UploadedDocFile {
    originFileObj?: File;
    [key: string]: any;
  }
  const [uploadedDocs, setUploadedDocs] = useState<
    Record<string, UploadedDocFile>
  >({});
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
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
  ];

  const steps = [
    { title: "Service & Date" },
    { title: "Personal Information" },
    { title: "Upload Documents" },
    { title: "Confirmation" },
    { title: "Success" },
  ];

  const stepFieldMapping: Record<number, string[]> = {
    0: ["serviceType", "preferredDate", "preferredTime"],
    1: ["fullName", "nic", "email", "phone", "address"],
    2: ["birthCertificate", "nicCopy", "medicalReport"],
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

  // ✅ Map your document_types IDs
  const DOC_TYPE_MAP: Record<string, number> = {
    nicCopy: 1, // National Identity Card (NIC)
    passport: 2, // Passport
    drivingLicense: 3, // Driving License
    birthCertificate: 4, // Birth Certificate
    marriageCertificate: 5, // Marriage Certificate
    deathCertificate: 6, // Death Certificate
    schoolLeaving: 7, // School Leaving Certificate (OL/AL)
    degreeDiploma: 8, // Degree/Diploma Certificates
    transcripts: 9, // Academic Transcripts / Mark Sheets
    landDeeds: 10, // Land Deeds / Title Documents
    courtOrders: 11, // Court Orders / Affidavits
    medicalReport: 12, // Medical Certificates
    vaccination: 13, // Vaccination Records
    taxClearance: 14, // Tax Clearance Certificate
    policeClearance: 15, // Police Clearance Certificate
    bankStatements: 16, // Bank Statements
  };

  function to24h(time12h: string) {
    // "01:00 PM" -> "13:00:00"
    const [time, mer] = time12h.trim().split(" ");
    let [hh, mm] = time.split(":").map(Number);
    if (mer.toUpperCase() === "PM" && hh !== 12) hh += 12;
    if (mer.toUpperCase() === "AM" && hh === 12) hh = 0;
    return `${String(hh).padStart(2, "0")}:${mm
      .toString()
      .padStart(2, "0")}:00`;
  }
  async function handleSubmit() {
    try {
      await form.validateFields();
      setIsSubmitting(true);

      const values = form.getFieldsValue(); // includes personal info step
      const finalData = { ...appointmentData, ...values, uploadedDocs }; // for debugging if needed

      // 1) Convert your serviceType (string) to serviceId (number)
      const serviceId = 1;
      // const serviceId = SERVICE_MAP[finalData.serviceType];
      if (!serviceId)
        throw new Error("Unknown serviceType → serviceId mapping");

      // 2) Normalize date/time to what backend expects
      const appointmentDate = finalData.preferredDate; // "YYYY-MM-DD"
      const appointmentTime = to24h(finalData.preferredTime); // "HH:mm:ss"

      // 3) Build FormData
      const fd = new FormData();
      fd.append("citizenId", String(1)); // logged-in citizen id
      fd.append("serviceId", String(2));
      fd.append("appointmentDate", appointmentDate);
      fd.append("appointmentTime", appointmentTime);

      // 4) Append files + matching documentId array
      //    IMPORTANT: Order matters. The i-th documentId pairs with the i-th file.
      //    Only append when a file actually exists (originFileObj).
      const docEntries: [string, UploadedDocFile][] = Object.entries(
        finalData.uploadedDocs || {}
      );
      for (const [docType, fileObj] of docEntries) {
        const file = (fileObj as UploadedDocFile)?.originFileObj; // AntD Upload file
        if (file) {
          fd.append("documents", file); // matches upload.array("documents")
          fd.append("documentId", String(DOC_TYPE_MAP[docType])); // results in req.body.documentId as an array
        }
      }

      // 5) Send to backend
      const res = await AppointmentService.createAppointment(fd);

      console.log("Appointment created:", res);

      setIsConfirmed(true);
      setCurrentStep(4);
      notification.success({ message: "Appointment Booked Successfully!" });
    } catch (e: any) {
      console.error("Submit error:", e);
      // notification.error({ message: e?.message || "Please complete all required fields." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const citizenId = useAppSelector((state) => state.citizenAuth.citizen);

  useEffect(() => {
    const fetchCitizen = async () => {
      try {
        // const citizenId = 21; // get logged-in citizen ID
        // const citizenId = localStorage.getItem("citizenId"); // get logged-in citizen ID
        if (!citizenId) return;

        // Call your service dynamically
        const data = await CitizenService.getCitizenById(Number(citizenId));

        // Pre-fill form fields
        form.setFieldsValue({
          fullName: data.fullName,
          nic: data.NICNumber,
          email: data.email,
          phone: data.contactNumber,
          address: data.address,
        });

        setAppointmentData((prev: any) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Error fetching citizen data:", err);
      }
    };

    fetchCitizen();
  }, [form]);

  const handleGoBack = () => navigate(-1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepServiceDate
            appointmentData={appointmentData}
            setAppointmentData={setAppointmentData}
            serviceNames={serviceNames}
            timeSlots={timeSlots}
            form={form}
          />
        );
      case 1:
        return <StepPersonalInfo form={form} />;
      case 2:
        return (
          <StepUploadDocuments
            uploadedDocs={uploadedDocs}
            setUploadedDocs={setUploadedDocs}
            form={form}
          />
        );
      case 3:
        return (
          <StepConfirmation
            appointmentData={appointmentData}
            serviceNames={serviceNames}
            isSubmitting={isSubmitting}
            onConfirm={handleSubmit}
            onPrev={handlePrev}
          />
        );
      case 4:
        return (
          <AppointmentSuccess
            appointmentData={appointmentData}
            serviceNames={serviceNames}
            isConfirmed={isConfirmed}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonNav />
      <div className="mx-auto px-4 py-8" style={{ maxWidth: "1000px" }}>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleGoBack}
          className="mb-6"
        >
          Back
        </Button>

        <Card className="mb-8 text-center">
          <CalendarOutlined className="text-5xl text-black mb-4" />
          <Typography.Title
            level={1}
            style={{ fontWeight: "bold", color: "black" }}
          >
            Book an Appointment
          </Typography.Title>
          <Typography.Paragraph className="!text-lg !text-gray-600">
            Schedule your visit for{" "}
            {serviceNames[serviceId || ""] || "government services"}
          </Typography.Paragraph>
        </Card>

        <Card className="mb-8">
          <Steps current={currentStep} items={steps} />
        </Card>

        <Form
          form={form}
          layout="vertical"
          size="large"
          initialValues={{ serviceType: serviceId }}
        >
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
