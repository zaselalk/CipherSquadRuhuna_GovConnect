import { Card, Form, DatePicker, Input, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const LeaveForm = ({ title, type, onClose, onSubmit }: any) => {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white border rounded-lg shadow-lg p-4 z-50 w-[400px]">
      <Card
        title={title}
        className="w-full max-w-md"
        extra={<Button type="text" icon={<CloseOutlined />} onClick={onClose} />}
      >
        <Form onFinish={onSubmit}>
          {type === "annual" && (
            <Form.Item name="dateRange" label="Select date range" rules={[{ required: true }]}>
              <RangePicker className="w-full" />
            </Form.Item>
          )}
          {type === "casual" && (
            <Form.Item name="date" label="Select date" rules={[{ required: true }]}>
              <DatePicker className="w-full" />
            </Form.Item>
          )}
          <Form.Item name="notes" label="Reason/Notes">
            <Input.TextArea rows={4} />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LeaveForm;
