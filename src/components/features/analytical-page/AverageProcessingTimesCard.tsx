import React, { useEffect, useRef } from "react";
import { Card } from "antd";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Title as ChartTitle,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  ChartTitle
);

const processingTimesData = {
  labels: [
    "Motor Traffic",
    "Immigration",
    "Ministry of Health",
    "Education",
    "Social Services",
    "Finance",
    "Agriculture",
    "Transport",
    "Defence",
    "Environment",
  ],
  datasets: [
    {
      label: "Avg Processing Time (Hours)",
      data: [15, 25, 18, 12, 20, 22, 17, 14, 19, 16],
      fill: false,
      borderColor: "#0052cc",
      backgroundColor: "#0052cc",
      tension: 0.3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBorderColor: "#0052cc",
      pointHoverBackgroundColor: "#fff",
      pointBorderWidth: 2,
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
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              backgroundColor: "#0052cc",
              titleColor: "#fff",
              bodyColor: "#fff",
              titleFont: { weight: "bold" },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { maxRotation: 45, minRotation: 45, autoSkip: false },
            },
            y: {
              beginAtZero: true,
              suggestedMax: 40,
              grid: { color: "#f0f0f0" },
            },
          },
        },
      });
    }
  }, []);

  return (
    <Card className="shadow-lg rounded-lg p-4 h-[400px]">
      <h2 className="text-[#0052cc] text-lg font-semibold mb-6">
        Average Processing Times (Hours)
      </h2>
      <div className="h-[300px]">
        <canvas ref={canvasRef}></canvas>
      </div>
    </Card>
  );
};

export default AverageProcessingTimesCard;
