import { Card, Select, Calendar, Space, Button, Alert, Row, Col, Form } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

interface Props {
  appointmentData: any;
  setAppointmentData: Function;
  serviceNames: Record<string, string>;
  timeSlots: string[];
  form: any;
}

const StepServiceDate = ({ appointmentData, setAppointmentData, serviceNames, timeSlots, form }: Props) => {
  const disabledDate = (current: dayjs.Dayjs) =>
    current && (current < dayjs().endOf('day') || current.day() === 0 || current.day() === 6);

  return (
    <Card title="Select Service & Date">
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Form.Item
            name="serviceType"
            label="Service Type"
            rules={[{ required: true, message: "Select service type" }]}
            initialValue={appointmentData.serviceType}
          >
            <Select
              placeholder="Select service type"
              value={appointmentData.serviceType}
              onChange={(value) => setAppointmentData((prev: any) => ({ ...prev, serviceType: value }))}
            >
              {Object.entries(serviceNames).map(([key, value]) => (
                <Option key={key} value={key}>{value}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Choose Date" bordered>
            <Calendar
              fullscreen={false}
              value={appointmentData.preferredDate ? dayjs(appointmentData.preferredDate) : undefined}
              disabledDate={disabledDate}
              onSelect={(date) => {
                const formatted = date.format("YYYY-MM-DD");
                setAppointmentData((prev: any) => ({ ...prev, preferredDate: formatted }));
                form.setFieldsValue({ preferredDate: formatted });
              }}
            />
          </Card>

          {/* Hidden form item for date validation */}
          <Form.Item
            name="preferredDate"
            rules={[{ required: true, message: "Please select a date for your appointment" }]}
            style={{ display: "none" }}
          >
            <input type="hidden" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Available Time Slots" bordered>
            {appointmentData.preferredDate ? (
              <Space wrap>
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    type={appointmentData.preferredTime === time ? "primary" : "default"}
                    onClick={() => {
                      setAppointmentData((prev: any) => ({ ...prev, preferredTime: time }));
                      form.setFieldsValue({ preferredTime: time });
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </Space>
            ) : (
              <Alert message="Please select a date first" type="info" showIcon />
            )}
          </Card>

          {/* Hidden form item for time validation */}
          <Form.Item
            name="preferredTime"
            rules={[{ required: true, message: "Please select a time slot" }]}
            style={{ display: "none" }}
          >
            <input type="hidden" />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default StepServiceDate;
