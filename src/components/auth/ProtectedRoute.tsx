import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/state/hooks";
import { Spin } from "antd";

interface Props {
  children?: React.ReactNode;
}

export default function ProtectedRoutesGuard({ children }: Props) {
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);

  // Show loading spinner while checking authentication
  if (auth.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    // Store the current location to redirect back after login
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return children ? children : <Outlet />;
}
