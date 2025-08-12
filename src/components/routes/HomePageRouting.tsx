import React from "react";
import { Route, Routes } from "react-router";
import LandingPage from "../../pages/LandingPage";
import TermsPage from "../../pages/TermsPage";
import PrivacyPage from "../../pages/PrivacyPage";

export const HomePageRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
};
