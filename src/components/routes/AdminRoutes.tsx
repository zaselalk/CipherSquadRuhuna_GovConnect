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
            <ProtectedRoutesGuard>
              <AnalyticsDashboard />
            </ProtectedRoutesGuard>
          }
        />
       <Route
          path="admin/AppoinmentOfficerDash"
          element={
            <ProtectedRoutesGuard>
              <OfficerPage />
            </ProtectedRoutesGuard>
          }
        />
        {/* <Route
          path="admin/officerdashboard"
          element={
            <ProtectedRoutesGuard>
              <OfficerDashboard />
            </ProtectedRoutesGuard>
          }
        /> */}
        <Route
          path="admin/citizen"
          element={
            <ProtectedRoutesGuard>
              <CitizenListPage />
            </ProtectedRoutesGuard>
          }
        />

        <Route
          path="admin/department"
          element={
            <ProtectedRoutesGuard>
              <DepartmentPage />
            </ProtectedRoutesGuard>
          }
        />

        {/* /admin/profile */}
        <Route
          path="admin/profile"
          element={
            <ProtectedRoutesGuard>
              <ProfilePage />
            </ProtectedRoutesGuard>
          }
        />

        <Route
          path="admin/department/:id"
          element={
            <ProtectedRoutesGuard>
              <DepartmentServicesPage />
            </ProtectedRoutesGuard>
          }
        />

        {/* /admin/users routs */}

        <Route path="admin/users">
          <Route
            path=""
            element={
              <ProtectedRoutesGuard>
                <UsersPage />
              </ProtectedRoutesGuard>
            }
          />
        </Route>
        <Route
          path="/admin/feedback"
          element={
            <ProtectedRoutesGuard>
              <AdminFeedbackPage />
            </ProtectedRoutesGuard>
          }
        />
      </Routes>
    </AdminAuthProvider>
  );
};
