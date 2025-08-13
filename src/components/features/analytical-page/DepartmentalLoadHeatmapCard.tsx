import React from "react";
import { Card, Tooltip } from "antd";

type LoadLevel = "high" | "medium" | "low";

interface DepartmentLoad {
    name: string;
    load: LoadLevel;
}

const DepartmentalLoadHeatmap: React.FC = () => {
    const departmentLoads: DepartmentLoad[] = [
        { name: "IT", load: "high" },
        { name: "HR", load: "medium" },
        { name: "Finance", load: "low" },
        { name: "Support", load: "high" },
        { name: "Admin", load: "medium" },
        { name: "Logistics", load: "low" },
        { name: "Operations", load: "medium" },
        { name: "Marketing", load: "high" },
        { name: "Security", load: "low" },
        { name: "Research", load: "medium" },
    ];

    // Red gradient intensity for load levels
    const loadColorClass: Record<LoadLevel, string> = {
        // high: "bg-red-600 text-white",   // Dark red
        // medium: "bg-red-400 text-white", // Medium red
        // low: "bg-red-200 text-red-900",  // Light red

        high: "bg-blue-700 text-white",   // Dark blue
        medium: "bg-blue-400 text-white", // Medium blue
        low: "bg-blue-200 text-blue-900", // Light blue
    };

    // Sort from high → medium → low
    const sortedDepartments = [...departmentLoads].sort((a, b) => {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.load] - order[a.load];
    });

    return (
        <Card className="shadow rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#0052cc] text-lg font-semibold">
                    Departmental Load Heatmap
                </h2>
                {/* Red gradient legend */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">High</span>
                    <div
                        className="w-24 h-3 rounded"
                        style={{
                            background: "linear-gradient(to right, #1e40af, #60a5fa, #bfdbfe)",
                        }}
                    ></div>
                    <span className="text-xs text-gray-600">Low</span>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
                {sortedDepartments.map((dept, idx) => (
                    <Tooltip key={idx} title={`Load: ${dept.load.toUpperCase()}`}>
                        <div
                            className={`${loadColorClass[dept.load]} py-4 rounded text-center font-semibold transition-all hover:scale-105`}
                        >
                            {dept.name}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </Card>
    );
};

export default DepartmentalLoadHeatmap;
