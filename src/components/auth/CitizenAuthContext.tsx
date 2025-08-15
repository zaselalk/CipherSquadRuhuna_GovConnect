import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/state/hooks";
import {
  citizenLogin,
  citizenLogout,
  setCitizenLoading,
  setCitizenAuthCheckComplete,
} from "../../store/slices/citizenAuthSlice";
import { CitizenService } from "../../services/citizen.service";
import { CitizenAuthContextType } from "./types/CitizenAuthContextType";

const CitizenAuthContext = createContext<CitizenAuthContextType | undefined>(
  undefined
);

interface CitizenAuthProviderProps {
  children: ReactNode;
}

export const CitizenAuthProvider: React.FC<CitizenAuthProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { isAuthenticated, citizen, isLoading } = useAppSelector(
    (state) => state.citizenAuth
  );

  // Check token when the app loads - similar to admin AuthProvider
  useEffect(() => {
    const citizenService = CitizenService;
    (async () => {
      try {
        // Store the current path before authentication check
        const currentPath = location.pathname + location.search;

        const auth = await citizenService.checkToken();
        const citizenData = auth.data;

        // If user is authenticated, set the user in the store
        dispatch(
          citizenLogin({
            citizen: {
              id: citizenData.id,
              fullName: citizenData.fullName,
              email: citizenData.email,
              NICNumber: citizenData.NICNumber,
              address: citizenData.address,
              contactNumber: citizenData.contactNumber,
              dateOfBirth: citizenData.dateOfBirth,
            },
            token: localStorage.getItem("citizenToken") || "",
          })
        );

        // On initial load, stay on the current page if authenticated
        // Don't redirect to dashboard automatically
        if (
          isInitialLoad &&
          currentPath !== "/" &&
          currentPath !== "/citizen/login"
        ) {
          // User is authenticated and trying to access a protected route
          // Stay on the current page
          setIsInitialLoad(false);
          return;
        }

        // If user is on login page or root, redirect to dashboard
        if (currentPath === "/citizen/login" || currentPath === "/") {
          navigate("/citizen/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Error checking citizen token:", error);

        // Clear localStorage on token validation failure
        localStorage.removeItem("citizenToken");
        localStorage.removeItem("citizenData");

        // Logout
        dispatch(citizenLogout());
      }

      dispatch(setCitizenAuthCheckComplete());
      setIsInitialLoad(false);
    })();
  }, [dispatch, location, navigate, isInitialLoad]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch(setCitizenLoading(true));

      const response = await CitizenService.login(email, password);

      // Assuming the response contains citizen data and token
      const { Citizen: citizenData, token: authToken } = response;

      // Store in localStorage
      localStorage.setItem("citizenToken", authToken);
      localStorage.setItem("citizenData", JSON.stringify(citizenData));

      // Update Redux state
      dispatch(citizenLogin({ citizen: citizenData, token: authToken }));
    } catch (error) {
      dispatch(setCitizenLoading(false));
      throw error;
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("citizenToken");
    localStorage.removeItem("citizenData");

    // Update Redux state
    dispatch(citizenLogout());
  };

  const contextValue: CitizenAuthContextType = {
    isAuthenticated,
    citizen,
    isLoading,
    login,
    logout,
  };

  return (
    <CitizenAuthContext.Provider value={contextValue}>
      {children}
    </CitizenAuthContext.Provider>
  );
};

// Custom hook to use citizen auth context
export const useCitizenAuth = (): CitizenAuthContextType => {
  const context = useContext(CitizenAuthContext);
  if (context === undefined) {
    throw new Error("useCitizenAuth must be used within a CitizenAuthProvider");
  }
  return context;
};

export default CitizenAuthContext;
