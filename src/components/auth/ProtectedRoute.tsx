import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../hooks/state/hooks";
import { Spin } from "antd";

interface Props {
  children?: React.ReactNode;
  roles?: string[]; // Optional roles prop to check user permissions
}

export default function ProtectedRoutesGuard({ children, roles }: Props) {
  const location = useLocation();
  const auth = useAppSelector((state) => state.auth);

  if (!auth.user) return null; // or a loading spinner, or redirect to login

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

  //  check if the user has the required permissions
  if (roles && !roles.includes(auth.user.role)) {
    return <Navigate to="/admin/profile" replace />;
  }

  return children ? children : <Outlet />;
}
