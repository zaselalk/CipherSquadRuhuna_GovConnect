import { Card, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import ShiftsTable from "./shiftstable";

const AvailableShiftsCard = ({ shifts, onApply, onOverlayChange }: any) => {
  return (
    <Card
      title="Schedule Off Days"
      extra={
        <Button type="link" icon={<CalendarOutlined />} onClick={() => onOverlayChange("allShifts")}>
          View All
        </Button>
      }
    >
      <ShiftsTable shifts={shifts.slice(0, 3)} onApply={onApply} />
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="primary" onClick={() => onOverlayChange("annualLeave")}>Apply Annual Leave</Button>
        <Button onClick={() => onOverlayChange("casualLeave")}>Apply Casual Leave</Button>
        <Button onClick={() => onOverlayChange("dayOff")}>Apply Day Off</Button>
      </div>
    </Card>
  );
};

export default AvailableShiftsCard;
