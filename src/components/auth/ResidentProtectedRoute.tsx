import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { Spin } from "antd";
import { useResidentAuth } from "./ResidentAuthContext";

interface ResidentProtectedRouteProps {
  children?: React.ReactNode;
}

const ResidentProtectedRoute: React.FC<ResidentProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useResidentAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the current location to redirect back after login
    return (
      <Navigate
        to="/resident/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children ? children : <Outlet />;
};

export default ResidentProtectedRoute;
