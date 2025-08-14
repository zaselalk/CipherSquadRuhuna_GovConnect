import { Card, Form, DatePicker, Input, Button, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import ConfirmPopup from "../../common/ConfirmPopup";


const { RangePicker } = DatePicker;

const LeaveForm = ({ title, type, onClose, onSubmit }: any) => {
  const [form] = Form.useForm();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleFinish = (values: any) => {
    setConfirmVisible(true); // show confirmation popup
  };

  const handleConfirm = () => {
    const values = form.getFieldsValue();
    onSubmit(values);
    message.success(`${title} submitted successfully!`);
    setConfirmVisible(false);
    onClose(); // close form after submission
  };

  const handleCancel = () => {
    setConfirmVisible(false);
  };

  return (
    <>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white border rounded-lg shadow-lg p-4 z-50 w-[400px]">
        <Card
          title={title}
          className="w-full max-w-md"
          extra={<Button type="text" icon={<CloseOutlined />} onClick={onClose} />}
        >
          <Form form={form} onFinish={handleFinish}>
            {type === "annual" && (
              <Form.Item
                name="dateRange"
                label="Select date range"
                rules={[{ required: true }]}
              >
                <RangePicker className="w-full" />
              </Form.Item>
            )}
            {type === "casual" && (
              <Form.Item
                name="date"
                label="Select date"
                rules={[{ required: true }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            )}
            <Form.Item name="notes" label="Reason/Notes">
              <Input.TextArea rows={4} />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </div>

      {/* Reuse ConfirmPopup */}
      <ConfirmPopup
        visible={confirmVisible}
        title="Confirm Submission"
        content={`Are you sure you want to submit this ${title}?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default LeaveForm;
