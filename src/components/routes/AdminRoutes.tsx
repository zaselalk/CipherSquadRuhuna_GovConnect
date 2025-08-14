import { Route, Routes } from "react-router";
import ProtectedRoutesGuard from "../auth/ProtectedRoute";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/admin/ProfilePage";
import UsersPage from "../../pages/admin/UsersPage";
import AdminDashboard from "../../pages/admin/AdminDashboardPage";
import AuthProvider from "../auth/AuthProvider";
// import { useAppSelector } from "../../hooks/state/hooks";
import AnalyticsDashboard from "../../pages/admin/AnalyticalDashbordPage";
import OfficerDashboard from "../../pages/admin/Officerdashbord";
import DepartmentServicesPage from "../../pages/admin/DepartmentServicesPage";
import { CitizenListPage } from "../../pages/admin/CitizenListPage";
import DepartmentPage from "../../pages/admin/DepartmentPage";
import AdminFeedbackPage from "../../pages/admin/FeedbackAdmin";

export const AdminRoutes = () => {
  // const user = useAppSelector((state) => state.auth.user);

  return (
    <AuthProvider>
      <Routes>
        {/* /admin/login */}
        <Route path="admin/login" element={<LoginPage />} />

        {/* /admin/dashboard */}
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoutesGuard>
              <AdminDashboard />
            </ProtectedRoutesGuard>
          }
        />
        <Route
          path="admin/analytics"
          element={
            // <ProtectedRoutesGuard>
            <AnalyticsDashboard />
            // </ProtectedRoutesGuard>
          }
        />

        <Route
          path="admin/officerdashboard"
          element={
            // <ProtectedRoutesGuard>
            <OfficerDashboard />
            // </ProtectedRoutesGuard>
          }
        />
        <Route
          path="admin/citizen"
          element={
            // <ProtectedRoutesGuard>
            <CitizenListPage />
            // </ProtectedRoutesGuard>
          }
        />

        <Route
          path="admin/department"
          element={
            // <ProtectedRoutesGuard>
              <DepartmentPage />
            // </ProtectedRoutesGuard>
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
        {/* /admin/department/:id */}

        <Route
          path="admin/department/:id"
          element={
            <ProtectedRoutesGuard>
              <DepartmentServicesPage />
            </ProtectedRoutesGuard>
          }
        />

        {/* /admin/users routs */}
        {/* // if the user is super_admin */}
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
            // <ProtectedRoutesGuard>
            <AdminFeedbackPage/>
            // </ProtectedRoutesGuard>
          }
        />
      </Routes>
    </AuthProvider>
  );
};
