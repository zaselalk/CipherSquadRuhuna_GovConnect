import { Card } from "antd";

interface OffDaysProps {
  offDays: { date: string; day: string }[];
}

const OffDaysCard = ({ offDays }: OffDaysProps) => {
  return (
    <Card title="Your Off Days This Month">
      <div className="flex justify-around">
        {offDays.map((day) => (
          <div key={day.date} className="text-center">
            <div className="text-xl font-bold">{day.date}</div>
            <div className="text-gray-500">{day.day}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OffDaysCard;
