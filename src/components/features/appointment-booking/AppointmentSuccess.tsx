import { Card, Typography, Row, Col, Button } from "antd";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  appointmentData: any;
  serviceNames: Record<string, string>;
  isConfirmed: boolean;
}

const AppointmentSuccess = ({ appointmentData, serviceNames, isConfirmed }: Props) => {
  const { Title, Paragraph } = Typography;

  const referenceNumber = `REF-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
  const generatedDate = new Date().toLocaleString();

  const downloadPDF = async () => {
    const element = document.getElementById("appointment-card");
    if (!element) return;

    // Hide buttons for PDF generation
    const buttons = element.querySelectorAll(".no-pdf");
    buttons.forEach((btn) => ((btn as HTMLElement).style.display = "none"));

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // margin 10mm each side
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 20, 20, pdfWidth, pdfHeight);
    pdf.save(`Appointment_${referenceNumber}.pdf`);

    // Restore buttons
    buttons.forEach((btn) => ((btn as HTMLElement).style.display = "inline-block"));
  };

  const printAppointment = () => {
    const printContent = document.getElementById("appointment-card");
    if (!printContent) return;

    const newWindow = window.open("", "_blank");
    if (!newWindow) return;

    newWindow.document.write(`
      <html>
        <head>
          <title>Print Appointment</title>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.print();
  };

  return (
    <Card
      id="appointment-card"
      className="p-8"
      style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}
    >
      <Title level={2}>Appointment Confirmed!</Title>
      <Paragraph>Your appointment has been successfully booked.</Paragraph>

      <Row gutter={[16, 16]} justify="start" align="middle">
        <Col span={12}>
          <Paragraph><strong>Name:</strong> {appointmentData.fullName}</Paragraph>
          <Paragraph><strong>NIC:</strong> {appointmentData.nic}</Paragraph>
          <Paragraph><strong>Service:</strong> {serviceNames[appointmentData.serviceType]}</Paragraph>
          <Paragraph><strong>Generated Date:</strong> {generatedDate}</Paragraph>
          <Paragraph>
            <strong>Booked Date & Time:</strong> {appointmentData.preferredDate} at {appointmentData.preferredTime}
          </Paragraph>
          <Paragraph><strong>Reference Number:</strong> {referenceNumber}</Paragraph>
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <QRCode value={referenceNumber} size={250} />
        </Col>
      </Row>

      <div className="mt-6 flex justify-between">
        <Button type="primary" className="mr-2 no-pdf" onClick={downloadPDF}>
          Download PDF
        </Button>
        <Button type="primary" className="mr-2 no-pdf" onClick={printAppointment}>
          Print
        </Button>
      </div>
    </Card>
  );
};

export default AppointmentSuccess;
