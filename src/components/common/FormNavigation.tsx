import { Button, Space } from "antd";

interface Props {
  currentStep: number;
  stepsLength: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const FormNavigation = ({ currentStep, stepsLength, handlePrev, handleNext, handleSubmit, isSubmitting }: Props) => (
  <div className="flex justify-between">
    <Button size="large" onClick={handlePrev} disabled={currentStep === 0}>Previous</Button>
    <Space>
      {currentStep < stepsLength - 1 && <Button type="primary" size="large" onClick={handleNext}>Next</Button>}
      {currentStep === stepsLength - 1 && <Button type="primary" size="large" loading={isSubmitting} onClick={handleSubmit}>{isSubmitting ? "Booking..." : "Confirm Booking"}</Button>}
    </Space>
  </div>
);

export default FormNavigation;
