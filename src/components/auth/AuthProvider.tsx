import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/state/hooks";
import { login, logout } from "../../store/slices/authSlices";
import AuthServices from "../../services/auth.service";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AdminAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // check token when the app loads
  useEffect(() => {
    const authServices = new AuthServices();
    (async () => {
      try {
        // Store the current path before authentication check
        const currentPath = location.pathname + location.search;
        const auth = await authServices.checkToken();
        const user = auth.data;

        // if user is authenticated, set the user in the store
        dispatch(
          login({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          })
        );

        // On initial load, stay on the current page if authenticated
        // Don't redirect to dashboard automatically
        if (
          isInitialLoad &&
          currentPath !== "/" &&
          currentPath !== "/admin/login"
        ) {
          // User is authenticated and trying to access a protected route
          // Stay on the current page
          setIsInitialLoad(false);
          return;
        }

        // If user is on login page or root, redirect to dashboard
        if (currentPath === "/admin/login" || currentPath === "/") {
          // if the user is officer, redirect to officer dashboard
          if (user.role === "Officer") {
            navigate("/admin/officerdashboard", { replace: true });
          }
          navigate("/admin/analytics", { replace: true });
        }
      } catch (error) {
        console.error("Error checking token:", error);

        //logout
        dispatch(logout());
      }

      setIsInitialLoad(false);
    })();
  }, [dispatch, location, navigate]);

  return <>{children}</>;
};

export default AdminAuthProvider;
