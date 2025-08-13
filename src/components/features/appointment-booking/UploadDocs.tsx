import { Card, Row, Col, Upload, notification, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { Dragger } = Upload;

interface Props {
  uploadedDocs: any;
  setUploadedDocs: Function;
  form: any;
}

const StepUploadDocuments = ({ uploadedDocs, setUploadedDocs, form }: Props) => {
  const beforeUploadHandler = (file: File, key: string) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      notification.error({ message: "Invalid File Type", description: "Only PDF, JPG, or PNG allowed" });
      return Upload.LIST_IGNORE;
    }
    if (file.size / 1024 / 1024 > 5) {
      notification.error({ message: "File Too Large", description: "Max size 5MB" });
      return Upload.LIST_IGNORE;
    }
    setUploadedDocs((prev: any) => ({ ...prev, [key]: file }));
    form.setFieldsValue({ [key]: file });
    return false;
  };

  return (
    <Card title="Upload Required Documents">
      <Paragraph>Accepted formats: PDF, JPG, PNG — Max size 5MB.</Paragraph>
      <Row gutter={[16, 16]}>
        {["birthCertificate", "nicCopy", "medicalReport"].map((docKey) => (
          <Col xs={24} md={8} key={docKey}>
            <Card title={docKey.replace(/([A-Z])/g, ' $1')} bordered hoverable>
              <Dragger
                accept=".pdf,.jpg,.jpeg,.png"
                maxCount={1}
                beforeUpload={(file) => beforeUploadHandler(file, docKey)}
              >
                <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                <p className="ant-upload-text">Click or drag file to upload</p>
              </Dragger>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default StepUploadDocuments;
