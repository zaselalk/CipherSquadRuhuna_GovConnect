import { Route, Routes } from "react-router";
import ProtectedRoutesGuard from "../auth/ProtectedRoute";
import LoginPage from "../../pages/admin/LoginPage";
import ProfilePage from "../../pages/admin/ProfilePage";
import UsersPage from "../../pages/admin/UsersPage";
import AnalyticsDashboard from "../../pages/admin/AnalyticalDashbordPage";
import DepartmentServicesPage from "../../pages/admin/DepartmentServicesPage";
import { CitizenListPage } from "../../pages/admin/CitizenListPage";
import DepartmentPage from "../../pages/admin/DepartmentPage";
import AdminFeedbackPage from "../../pages/admin/FeedbackAdmin";
import AdminAuthProvider from "../auth/AuthProvider";
import OfficerPage from "../../pages/admin/AppoinmentOfficerDash";

export const AdminRoutes = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* /admin/login */}
        <Route path="admin/login" element={<LoginPage />} />

        <Route
          path="admin/analytics"
          element={
            <ProtectedRoutesGuard roles={["Administrator", "Analyst"]}>
              <AnalyticsDashboard />
            </ProtectedRoutesGuard>
          }
        />
        <Route
          path="admin/AppoinmentOfficerDash"
          element={
            <ProtectedRoutesGuard roles={["Officer"]}>
              <OfficerPage />
            </ProtectedRoutesGuard>
          }
        />

        <Route
          path="admin/citizen"
          element={
            <ProtectedRoutesGuard roles={["Administrator"]}>
              <CitizenListPage />
            </ProtectedRoutesGuard>
          }
        />

        <Route
          path="admin/department"
          element={
            <ProtectedRoutesGuard roles={["Administrator", "Analyst"]}>
              <DepartmentPage />
            </ProtectedRoutesGuard>
          }
        />



        {/* /admin/profile */}
        <Route
          path="admin/profile"
          element={
            <ProtectedRoutesGuard
              roles={["Administrator", "Analyst", "Officer"]}
            >
              <ProfilePage />
            </ProtectedRoutesGuard>
          }
        />

        <Route
          path="admin/department/:dep_id"
          element={
            <ProtectedRoutesGuard roles={["Administrator", "Analyst"]}>
              <DepartmentServicesPage />
            </ProtectedRoutesGuard>
          }
        />

        

        {/* /admin/users routs */}

        <Route path="admin/users">
          <Route
            path=""
            element={
              <ProtectedRoutesGuard roles={["Administrator"]}>
                <UsersPage />
              </ProtectedRoutesGuard>
            }
          />
        </Route>
        <Route
          path="/admin/feedback"
          element={
            <ProtectedRoutesGuard
              roles={["Administrator", "Analyst", "Officer"]}
            >
              <AdminFeedbackPage />
            </ProtectedRoutesGuard>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
};
