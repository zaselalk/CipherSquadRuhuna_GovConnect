import { Route, Routes } from "react-router";
import { CitizenAuthProvider } from "../auth/CitizenAuthContext";
import CitizenProtectedRoute from "../auth/CitizenProtectedRoute";
import CitizenLoginPage from "../../pages/citizen/CitizenLoginPage";
import FeedbackForm from "../../pages/citizen/FeedbackPage";
import ServiceSelectionPage from "../../pages/citizen/ServiceSelection";
import AboutPage from "../../pages/About";
import DepartmentPage from "../../pages/citizen/DepartmentPage";
import EmailVerificationPage from "../../pages/citizen/EmailVerificationPage";
import CitizenRegisterPage from "../../pages/citizen/CitizenRegisterPage";
import CitizenDashboardPage from "../../pages/citizen/CitizenDashboardPage";
import CitizenRosterDashboard from "../../pages/citizen/roster/dashboard";
import SingleServiceDetailPage from "../../pages/citizen/SingleServicePage";
import StaticLoginPage from "../../pages/citizen/roster/roster-login";

export const CitizenRoutes = () => {
  return (
    <CitizenAuthProvider>
      <Routes>
        <Route path="/citizen/login" element={<CitizenLoginPage />} />
        <Route path="/citizen/register" element={<CitizenRegisterPage />} />

        {/* protected citizen routes */}
        <Route
          path="/citizen/dashboard"
          element={
            <CitizenProtectedRoute>
              <CitizenDashboardPage />
            </CitizenProtectedRoute>
          }
        />
        <Route
          path="/citizen/dashboard/service-selection"
          element={
            <CitizenProtectedRoute>
              <ServiceSelectionPage />
            </CitizenProtectedRoute>
          }
        />
        <Route
          path="/citizen/dashboard/about-govconnect"
          element={
            <CitizenProtectedRoute>
              <AboutPage />
            </CitizenProtectedRoute>
          }
        />
        <Route
          path="/citizen/feedback"
          element={
            <CitizenProtectedRoute>
              <FeedbackForm />
            </CitizenProtectedRoute>
          }
        />
        <Route
          path="/citizen/departments"
          element={
            <CitizenProtectedRoute>
              <DepartmentPage />
            </CitizenProtectedRoute>
          }
        />

        <Route
          path="/citizen/service-detail/:serviceId"
          element={
            <CitizenProtectedRoute>
              <SingleServiceDetailPage />
            </CitizenProtectedRoute>
          }
        />

        <Route
          path="/citizen/verifyemail"
          element={<EmailVerificationPage />}
        />
        <Route
          path="/citizen/roster-login"
          element={
            <StaticLoginPage
              onLoginSuccess={() => {
                // Navigate to the dashboard after login
                window.location.href = "/citizen/roster";
              }}
            />
          }
        />

        <Route path="/citizen/roster" element={<CitizenRosterDashboard />} />
      </Routes>
    </CitizenAuthProvider>
  );
};
