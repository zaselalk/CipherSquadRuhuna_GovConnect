import React from "react";
import { Card, Progress, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const NoShowRateCard: React.FC = () => {
  const noShowRate = 35; // Example value

  return (
    <Card
      bordered={false}
      style={{ borderRadius: 12 }}
      className="shadow-lg"
      bodyStyle={{ padding: "16px 20px" }}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[#0052cc] text-lg font-semibold m-0">
          No-Show Rate
        </h2>
        <Tooltip title="Percentage of missed appointments">
          <InfoCircleOutlined className="text-gray-400" />
        </Tooltip>
      </div>

      <p className="text-base mb-2">
        Current No-Show Rate:{" "}
        <strong className="text-[#d9534f]">{noShowRate}%</strong>
      </p>

      <Progress
        percent={noShowRate}
        strokeColor={{
          from: "#ff7f7f",
          to: "#d9534f",
        }}
        trailColor="#f5f5f5"
        strokeWidth={12}
        showInfo={false}
      />
    </Card>
  );
};

export default NoShowRateCard;
