import React from "react";
import { Card, Progress } from "antd";

const NoShowRateCard: React.FC = () => {
  // Example data
  const totalAppointments = 100;
  const missedCount = 35;
  const successCount = 50;
  const pendingCount = totalAppointments - missedCount - successCount;

  const getPercent = (count: number) => Math.round((count / totalAppointments) * 100);

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12 }}
      className="shadow-lg"
      bodyStyle={{ padding: "16px 20px 12px 20px" }} // reduced bottom padding
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[#0052cc] text-lg font-semibold m-0">
          Breakdown of Appointment Status
        </h2>
        <span className="text-sm text-gray-500">
          Total: <strong>{totalAppointments}</strong>
        </span>
      </div>

      {/* Missed */}
      <div className="mb-3">
        <p className="text-base mb-1">
          Missed: <strong className="text-[#d9534f]">{missedCount}</strong>
        </p>
        <Progress
          percent={getPercent(missedCount)}
          strokeColor="#d9534f"
          trailColor="#f5f5f5"
          strokeWidth={12}
          showInfo={false}
        />
      </div>

      {/* Success */}
      <div className="mb-3">
        <p className="text-base mb-1">
          Success: <strong className="text-[#28a745]">{successCount}</strong>
        </p>
        <Progress
          percent={getPercent(successCount)}
          strokeColor="#28a745"
          trailColor="#f5f5f5"
          strokeWidth={12}
          showInfo={false}
        />
      </div>

      {/* Pending */}
      <div>
        <p className="text-base mb-1">
          Pending: <strong className="text-[#f0ad4e]">{pendingCount}</strong>
        </p>
        <Progress
          percent={getPercent(pendingCount)}
          strokeColor="#f0ad4e"
          trailColor="#f5f5f5"
          strokeWidth={12}
          showInfo={false}
        />
      </div>
    </Card>
  );
};

export default NoShowRateCard;
