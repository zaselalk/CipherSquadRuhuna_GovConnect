// src/components/Charts/DiseaseColumnChart.tsx
import React from "react";
import { Column } from "@ant-design/plots";

// type DataItem = {
//   name: string;
//   count: number;
// };

// interface Props {
//   data: DataItem[];
// }

const DiseaseColumnChart: React.FC<any> = ({ data }) => {
  const config = {
    data,
    xField: "name", // ← match the backend's "name"
    yField: "count", // ← match the backend's "count"
    colorField: "name",
    label: {
      position: "middle",
      style: {
        fill: "#fff",
        fontSize: 12,
      },
    },
    meta: {
      name: { alias: "Disease" },
      count: { alias: "Patients" },
    },
    scale: {
      color: {
        range: [
          "#f4664a",
          "#faad14",
          "#a0d911",
          "#52c41a",
          "#13c2c2",
          "#1890ff",
          "#2f54eb",
          "#722ed1",
        ],
      },
    },
  };

  return <Column {...config} />;
};

export default DiseaseColumnChart;
