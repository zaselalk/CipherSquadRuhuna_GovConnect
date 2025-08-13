import React, { useEffect, useRef } from "react";
import { Card } from "antd";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

const processingTimesData = {
  labels: [
    "Department of Motor Traffic",
    "Department of Immigration",
    "Ministry of Health",
  ],
  datasets: [
    {
      label: "Avg Processing Time",
      data: [15, 25, 18],
      fill: false,
      borderColor: "#0052cc",
      tension: 0.2,
      pointBackgroundColor: "#0052cc",
      pointRadius: 6,
    },
  ],
};

const AverageProcessingTimesCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const existingChart = Chart.getChart(canvasRef.current);
      if (existingChart) existingChart.destroy();
      new Chart(canvasRef.current, {
        type: "line",
        data: processingTimesData,
        options: {
          scales: { y: { beginAtZero: true, suggestedMax: 40 } },
          plugins: { legend: { display: false } },
        },
      });
    }
  }, []);

  return (
    <Card className="shadow rounded-lg">
      <h2 className="text-[#0052cc] text-lg font-semibold mb-4">
        Average Processing Times (minutes)
      </h2>
      <canvas ref={canvasRef} width={400} height={300}></canvas>
    </Card>
  );
};

export default AverageProcessingTimesCard;
