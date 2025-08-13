import { FC, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppSelector } from "../hooks/state/hooks";
import { LoginLeftImageSection } from "../components/features/user-management/user-authentication/LoginLeftImageSection";
import { LoginRightLoginSection } from "../components/features/user-management/user-authentication/LoginRightLoginSection";
import { LandingHeader } from "../components/features/landing-page/LandingHeader";

const LoginPage: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Check if there's a redirect path from the location state
      const from = location.state?.from || "/admin/dashboard";
      navigate(from, { replace: true });
    }
  }, [auth.isAuthenticated, navigate, location.state]);

  const handleSuccessLogin = () => {
    // Check if there's a redirect path from the location state
    const from = location.state?.from || "/admin/dashboard";
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col">
      {/* Header */}
      <LandingHeader />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Image Section */}
            <LoginLeftImageSection />

            {/* Right Login Form Section */}
            <LoginRightLoginSection handleSuccessLogin={handleSuccessLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
