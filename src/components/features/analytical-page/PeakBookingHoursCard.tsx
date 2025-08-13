import React, { useEffect, useRef } from "react";
import { Card } from "antd";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

const PeakBookingHoursCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const data = [12, 25, 30, 20, 18, 15, 10, 8, 5, 3];
  const labels = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
  ];

  useEffect(() => {
    if (canvasRef.current) {
      // Destroy previous chart instance if exists
      const existingChart = Chart.getChart(canvasRef.current);
      if (existingChart) existingChart.destroy();

      new Chart(canvasRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Number of Bookings",
              data,
              backgroundColor: "#0052cc",
            },
          ],
        },
        options: {
          scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } } },
          plugins: { legend: { display: false } },
        },
      });
    }
  }, []);

  return (
    <Card className="shadow rounded-lg">
      <h2 className="text-[#0052cc] text-lg font-semibold mb-4">
        Peak Booking Hours
      </h2>
      <canvas ref={canvasRef} width={400} height={300}></canvas>
    </Card>
  );
};

export default PeakBookingHoursCard;
