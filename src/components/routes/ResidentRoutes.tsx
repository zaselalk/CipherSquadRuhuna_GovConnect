import { Route, Routes } from "react-router";
import { ResidentAuthProvider } from "../auth/ResidentAuthContext";
import ResidentProtectedRoute from "../auth/ResidentProtectedRoute";
import ResidentDashboard from "../../pages/resident/ResidentDashboard";
import ResidentLoginPage from "../../pages/resident/ResidentLoginPage";
import ResidentRegisterPage from "../../pages/resident/ResidentRegisterPage";

export const ResidentRoutes = () => {
  return (
    <ResidentAuthProvider>
      <Routes>
        <Route path="/resident/login" element={<ResidentLoginPage />} />
        <Route path="/resident/register" element={<ResidentRegisterPage />} />
        <Route
          path="/resident/dashboard"
          element={
            <ResidentProtectedRoute>
              <ResidentDashboard />
            </ResidentProtectedRoute>
          }
        />
      </Routes>
    </ResidentAuthProvider>
  );
};
