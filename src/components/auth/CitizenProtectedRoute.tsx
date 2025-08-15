import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { Spin } from "antd";
import { useCitizenAuth } from "./CitizenAuthContext";

interface CitizenProtectedRouteProps {
  children?: React.ReactNode;
}

const CitizenProtectedRoute: React.FC<CitizenProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useCitizenAuth();
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
        to="/citizen/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children ? children : <Outlet />;
};

export default CitizenProtectedRoute;
