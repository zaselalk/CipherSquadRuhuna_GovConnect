import React from "react";
import { Card, Progress } from "antd";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement
);

interface DepartmentLoad {
  name: string;
  load: "low" | "medium" | "high";
}

const AnalyticsDashboard: React.FC = () => {
  const departmentLoads: DepartmentLoad[] = [
    { name: "Motor Traffic", load: "high" },
    { name: "Immigration", load: "medium" },
    { name: "Health", load: "medium" },
    { name: "Tax Dept", load: "low" },
    { name: "Social Welfare", load: "low" },
  ];

  const noShowRate = 12;

  const loadColorClass = {
    low: "bg-[#d0e1ff] text-[#004080]",
    medium: "bg-[#7aa7ff] text-white",
    high: "bg-[#0052cc] text-white",
  };

  // Chart data
  const peakHoursData = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Number of Bookings",
        data: [12, 25, 30, 20, 18, 15, 10, 8, 5, 3],
        backgroundColor: "#0052cc",
      },
    ],
  };

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

  // Draw charts immediately (no hooks)
  if (typeof window !== "undefined") {
    const peakCanvas = document.getElementById(
      "peakHoursChart"
    ) as HTMLCanvasElement;
    if (peakCanvas && !Chart.getChart(peakCanvas)) {
      new Chart(peakCanvas, {
        type: "bar",
        data: peakHoursData,
        options: {
          scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } } },
          plugins: { legend: { display: false } },
        },
      });
    }

    const processCanvas = document.getElementById(
      "processingTimesChart"
    ) as HTMLCanvasElement;
    if (processCanvas && !Chart.getChart(processCanvas)) {
      new Chart(processCanvas, {
        type: "line",
        data: processingTimesData,
        options: {
          scales: { y: { beginAtZero: true, suggestedMax: 40 } },
          plugins: { legend: { display: false } },
        },
      });
    }
  }

  return (
    <DashboardContainer>
        <div className="max-w-[1000px] mx-auto bg-[#f7f9fc] p-6 min-h-screen">
      <h1 className="text-[#0052cc] text-center text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Peak Booking Hours */}
        <Card className="shadow rounded-lg">
          <h2 className="text-[#0052cc] text-lg font-semibold mb-4">
            Peak Booking Hours
          </h2>
          <canvas id="peakHoursChart" width={400} height={300}></canvas>
        </Card>

        {/* Departmental Load Heatmap */}
        <Card className="shadow rounded-lg">
          <h2 className="text-[#0052cc] text-lg font-semibold mb-4">
            Departmental Load Heatmap
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {departmentLoads.map((dept, idx) => (
              <div
                key={idx}
                className={`${loadColorClass[dept.load]} p-4 rounded text-center font-bold`}
              >
                {dept.name}
              </div>
            ))}
          </div>
        </Card>

        {/* No-Show Rate */}
        <Card className="shadow rounded-lg">
          <h2 className="text-[#0052cc] text-lg font-semibold mb-4">
            No-Show Rate
          </h2>
          <p>
            Current No-Show Rate: <strong>{noShowRate}%</strong>
          </p>
          <Progress
            percent={noShowRate}
            strokeColor="#d9534f"
            showInfo={false}
            className="mt-2"
          />
        </Card>

        {/* Average Processing Times */}
        <Card className="shadow rounded-lg">
          <h2 className="text-[#0052cc] text-lg font-semibold mb-4">
            Average Processing Times (minutes)
          </h2>
          <canvas id="processingTimesChart" width={400} height={300}></canvas>
        </Card>
      </div>
    </div>
    </DashboardContainer>
  );
};

export default AnalyticsDashboard;
