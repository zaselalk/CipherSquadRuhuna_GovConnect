import "leaflet/dist/leaflet.css";
import React from "react";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

const AdminDashboard: React.FC = () => {

  // Fetch resident count from the server

  return (
    <DashboardContainer>
      <div>
        <h2 className="text-2xl font-semibold text-[#008FFB] mb-6">
          Gov Connect Portal
        </h2>
      </div>
    </DashboardContainer>
  );
};

export default AdminDashboard;
