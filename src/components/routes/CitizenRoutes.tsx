import { Route, Routes } from "react-router";
import { ResidentAuthProvider } from "../auth/ResidentAuthContext";
import ResidentProtectedRoute from "../auth/ResidentProtectedRoute";
import ResidentDashboard from "../../pages/citizen/ResidentDashboard";
import ResidentLoginPage from "../../pages/citizen/CitizenLoginPage";
import ResidentRegisterPage from "../../pages/citizen/CitizenRegisterPage";
import CitizenDashboard from "../../pages/citizen/CitizenDashboard";
import FeedbackForm from "../../pages/citizen/FeedbackPage";

export const ResidentRoutes = () => {
  return (
    <ResidentAuthProvider>
      <Routes>
        <Route path="/resident/login" element={<ResidentLoginPage />} />
        <Route path="/resident/register" element={<ResidentRegisterPage />} />
        <Route
          path="/resident/dashboard"
          element={
            // <ResidentProtectedRoute>
              <CitizenDashboard />
            // </ResidentProtectedRoute>
          }
        />
        <Route path="resident/feedback" element={<FeedbackForm />} />
      </Routes>
    </ResidentAuthProvider>
  );
};
