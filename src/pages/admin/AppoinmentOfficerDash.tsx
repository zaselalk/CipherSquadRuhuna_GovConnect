import React, { useState } from "react";
import { Card, List, Button } from "antd";
import OfficerDashboard from "./Officerdashbord";
import { DashboardContainer } from "../../components/layouts/overlays/DashboardContainer";

const OfficerPage: React.FC = () => {
  // Hardcoded services for Immigration & Emigration Department
  const departmentServices = [
    "Passport Renewal",
    "New Passport Application",
    "Lost/Damaged Passport Replacement",
    "Emergency Passport Issuance",
  ];

  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (selectedService) {
    return (
      <OfficerDashboard
        service={selectedService}
        onBack={() => setSelectedService(null)}
      />
    );
  }

  return (
    <DashboardContainer>
      <div className="max-w-[900px] mx-auto min-h-screen">
        <h1 className="text-[#0052cc] text-2xl font-bold mb-6">
          Department of Immigration & Emigration - Services
        </h1>

        <Card className="shadow-md rounded-2xl p-6">
          <List
            dataSource={departmentServices}
            renderItem={(service) => (
              <List.Item className="mb-4">
                <Button
                  type="primary"
                  block
                  size="large"
                  className="!bg-gradient-to-r !from-[#0052cc] !to-[#007bff] !text-white !font-semibold !py-4 !text-lg rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                  onClick={() => setSelectedService(service)}
                >
                  {service}
                </Button>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </DashboardContainer>
  );
};

export default OfficerPage;
