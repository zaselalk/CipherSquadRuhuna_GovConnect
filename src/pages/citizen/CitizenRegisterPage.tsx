import { FC, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Alert,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  Checkbox,
  Steps,
  Typography,
  message,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { LandingHeader } from "../../components/features/landing-page/LandingHeader";
import dayjs from "dayjs";
import { CitizenData } from "../../types/citizen";
import { CitizenService } from "../../services/citizen.service";
import { LandingFooter } from "../../components/features/landing-page/LandingFooter";

const { Option } = Select;
const { Step } = Steps;
const { TextArea } = Input;
const { Title } = Typography;

const ResidentRegisterPage: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Initial values ensure fields are never truly undefined
  const initialValues = {
    firstName: "",
    lastName: "",
    NICNumber: "",
    birthday: null as any, // dayjs | null
    gender: undefined as string | undefined,
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  };

  // Validate only the visible step
  const stepFieldNames: string[][] = [
    ["firstName", "lastName", "NICNumber", "birthday", "gender"],
    ["email", "contactNumber", "address"],
    ["password", "confirmPassword", "agreedToTerms"],
  ];

  // Reusable cards (we’ll keep all of them mounted and hide with CSS)
  const PersonalInfo = (
    <Card
      bordered={false}
      style={{ borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
    >
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
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="NIC"
            name="NICNumber"
            rules={[
              { required: true, message: "NIC is required" },
              {
                pattern: /^(?:\d{9}[VvXx]|\d{12})$/,
                message: "Enter valid NIC (old 9 digits + V/X or 12 digits)",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined />}
              placeholder="e.g., 912345678V or 200123456789"
              onBlur={(e) => {
                // nic UX: auto-uppercase last char if v/x
                const val = e.target.value;
                if (!val) return;
                const last = val.slice(-1).toUpperCase();
                if (/[VX]/.test(last)) {
                  form.setFieldsValue({ NICNumber: val.slice(0, -1) + last });
                }
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Date of Birth"
            name="birthday"
            rules={[{ required: true, message: "Date of birth is required" }]}
          >
            <DatePicker
              className="w-full"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Gender is required" }]}
          >
            <Select placeholder="Select gender" allowClear>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );

  const ContactInfo = (
    <Card
      bordered={false}
      style={{ borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter email" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: "Mobile number is required" },
              {
                pattern: /^(?:0|\+94)?7\d{8}$/,
                message:
                  "Enter valid Sri Lankan mobile (07XXXXXXXX or +947XXXXXXXX)",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="07XXXXXXXX" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Address is required" }]}
      >
        <TextArea placeholder="Enter full address" rows={3} />
      </Form.Item>
    </Card>
  );

  const SecurityTerms = (
    <Card
      bordered={false}
      style={{ borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "At least 6 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("password") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm password"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="agreedToTerms"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("You must agree before continuing")),
          },
        ]}
      >
        <Checkbox>
          I agree to the <Link to="/terms">Terms</Link> and{" "}
          <Link to="/privacy">Privacy Policy</Link>
        </Checkbox>
      </Form.Item>
    </Card>
  );

  // 👉 Keep all steps mounted; hide inactive ones to preserve registration reliably
  const StepPanels = [
    <div key="step0" style={{ display: current === 0 ? "block" : "none" }}>
      {PersonalInfo}
    </div>,
    <div key="step1" style={{ display: current === 1 ? "block" : "none" }}>
      {ContactInfo}
    </div>,
    <div key="step2" style={{ display: current === 2 ? "block" : "none" }}>
      {SecurityTerms}
    </div>,
  ];

  const next = async () => {
    try {
      await form.validateFields(stepFieldNames[current]);
      setCurrent((prev) => prev + 1);
    } catch {
      message.error("Please fix the highlighted fields.");
      form.scrollToField(stepFieldNames[current][0], {
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const prev = () => setCurrent((prev) => prev - 1);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    setError(null);

    try {
      // Defensive date handling
      const bday =
        values.birthday && dayjs.isDayjs(values.birthday)
          ? values.birthday.format("YYYY-MM-DD")
          : null;

      const residentData: Partial<CitizenData> = {
        fullName: `${values.firstName || ""} ${values.lastName || ""}`.trim(),
        NICNumber: values.NICNumber || undefined,
        email: values.email || undefined,
        password: values.password || undefined,
        dateOfBirth: bday,
        gender: values.gender || undefined,
        contactNumber: values.contactNumber || undefined,
        address: values.address || undefined,
      };

      console.log("Submitting resident data:", residentData);
      await CitizenService.addCitizen(residentData);

      setSuccess("Registration successful!");
      form.resetFields();
      setTimeout(() => navigate("/resident/verifyemail"), 1500);
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LandingHeader />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Resident Registration
        </Title>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}
        {success && (
          <Alert message={success} type="success" showIcon className="mb-4" />
        )}

        <Steps current={current} className="mb-6">
          <Step title="Personal Info" />
          <Step title="Contact Info" />
          <Step title="Security & Terms" />
        </Steps>

        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
          scrollToFirstError
        >
          {/* ✅ All steps are mounted; only the active one is visible */}
          {StepPanels}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            {current > 0 ? (
              <Button onClick={prev} className="rounded-lg">
                Previous
              </Button>
            ) : (
              <div />
            )}

            {current < 2 && (
              <Button type="primary" onClick={next} className="rounded-lg">
                Next
              </Button>
            )}

            {current === 2 && (
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="rounded-lg"
              >
                Register
              </Button>
            )}
          </div>
        </Form>
      </div>
   <LandingFooter />
    </>
  );
};

export default ResidentRegisterPage;
