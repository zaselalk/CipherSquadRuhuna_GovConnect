import { Card, Typography, Row, Col, Button } from "antd";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  appointmentData: any;
  serviceNames: Record<string, string>;
}

const AppointmentSuccess = ({ appointmentData, serviceNames }: Props) => {
  const { Title, Paragraph } = Typography;

  const referenceNumber = `REF-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
  const generatedDate = new Date().toLocaleString();

  const downloadPDF = async () => {
    const element = document.getElementById("appointment-card");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // margin 10mm each side
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save(`Appointment_${referenceNumber}.pdf`);
  };

  return (
    <Card id="appointment-card" className="text-center p-8" style={{ maxWidth: "700px", margin: "0 auto" }}>
      <Title level={2}>Appointment Confirmed!</Title>
      <Paragraph>Your appointment has been successfully booked.</Paragraph>

      <Row gutter={[16, 16]} justify="center">
        <Col span={12}>
          <Paragraph><strong>Name:</strong> {appointmentData.fullName}</Paragraph>
          <Paragraph><strong>NIC:</strong> {appointmentData.n
