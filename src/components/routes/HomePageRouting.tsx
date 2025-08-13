import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "../../pages/LandingPage";
import TermsPage from "../../pages/TermsPage";
import PrivacyPage from "../../pages/PrivacyPage";
import ServiceDetailPage from "../../pages/ServiceDetailPage";
import AppointmentBookingPage from "../../pages/AppointmentBookingPage";
import NotificationsPage from "../../pages/NotificationsPage";

export const HomePageRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
      <Route path="/services/:serviceId/book-appointment" element={<AppointmentBookingPage />} />
      
      <Route path="/notifications" element={<NotificationsPage />} />
    </Routes>
  );
};
