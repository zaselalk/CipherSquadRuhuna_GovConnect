import React from "react";
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
import PeakBookingHoursCard from "../../components/features/analytical-page/PeakBookingHoursCard";
import DepartmentalLoadHeatmap from "../../components/features/analytical-page/DepartmentalLoadHeatmapCard";
import NoShowRateCard from "../../components/features/analytical-page/NoShowCard";
import AverageProcessingTimesCard from "../../components/features/analytical-page/AverageProcessingTimesCard";

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement
);


const AnalyticsDashboard: React.FC = () => {
    return (
        <DashboardContainer>
            <div className="max-w-[1000px] mx-auto  p-6 min-h-screen">
                <h1 className="text-[#0052cc] text-3xl font-bold mb-8">
                    Analytics Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Peak Booking Hours */}
                    <PeakBookingHoursCard />

                    {/* Departmental Load Heatmap */}
                    <DepartmentalLoadHeatmap />



                </div>
                <div className="grid grid-cols-1 md:grid gap-8 mt-8">

                    <NoShowRateCard />
                    <AverageProcessingTimesCard />
                </div>


            </div>
        </DashboardContainer>
    );
};

export default AnalyticsDashboard;
