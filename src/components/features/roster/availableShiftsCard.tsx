import { Card, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import ShiftsTable from "./shiftstable";

const AvailableShiftsCard = ({ shifts, onApply, onOverlayChange }: any) => {
  return (
    <Card
      title="Apply for a Vacant Shift !"
      extra={
        <Button type="link" icon={<CalendarOutlined />} onClick={() => onOverlayChange("allShifts")}>
          View All
        </Button>
      }
    >
      <ShiftsTable shifts={shifts.slice(0, 3)} onApply={onApply} />
      
    </Card>
  );
};

export default AvailableShiftsCard;
