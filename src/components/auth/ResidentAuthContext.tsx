import React, { createContext, useContext, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/state/hooks";
import {
  residentLogin,
  residentLogout,
  setResidentLoading,
} from "../../store/slices/residentAuthSlice";
import ResidentService from "../../services/resident.service";
import { ResidentAuthContextType } from "./types/ResidentAuthContextType";

const ResidentAuthContext = createContext<ResidentAuthContextType | undefined>(
  undefined
);

interface ResidentAuthProviderProps {
  children: ReactNode;
}

export const ResidentAuthProvider: React.FC<ResidentAuthProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, resident, isLoading } = useAppSelector(
    (state) => state.residentAuth
  );

  // Check for existing token on app load
  // useEffect(() => {
  //   checkAuthStatus();
  // }, []);

  // const checkAuthStatus = async () => {
  //   try {
  //     dispatch(setResidentLoading(true));

  //     // Check if there's a stored token
  //     const storedToken = localStorage.getItem("residentToken");
  //     const storedResident = localStorage.getItem("residentData");

  //     if (storedToken) {
  //       // Validate token with backend (you might need to create this endpoint)
  //       // For now, we'll trust the stored data
  //       const residentData = JSON.parse(storedResident);
  //       dispatch(residentLogin({ resident: residentData, token: storedToken }));
  //     }
  //   } catch (error) {
  //     console.error("Error checking resident auth status:", error);
  //     // Clear invalid tokens
  //     localStorage.removeItem("residentToken");
  //     localStorage.removeItem("residentData");
  //     dispatch(residentLogout());
  //   } finally {
  //     dispatch(setResidentAuthCheckComplete());
  //   }
  // };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch(setResidentLoading(true));

      const response = await ResidentService.loginResidentByEmailandPassword(
        email,
        password
      );

      // Assuming the response contains resident data and token
      const { data: residentData, token: authToken } = response;

      // Store in localStorage
      // localStorage.setItem("residentToken", authToken);
      // localStorage.setItem("residentData", JSON.stringify(residentData));

      // Update Redux state
      dispatch(residentLogin({ resident: residentData, token: authToken }));
    } catch (error) {
      dispatch(setResidentLoading(false));
      throw error;
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("residentToken");
    localStorage.removeItem("residentData");

    // Update Redux state
    dispatch(residentLogout());
  };

  const contextValue: ResidentAuthContextType = {
    isAuthenticated,
    resident,
    isLoading,
    login,
    logout,
    // checkAuthStatus,
  };

  return (
    <ResidentAuthContext.Provider value={contextValue}>
      {children}
    </ResidentAuthContext.Provider>
  );
};

// Custom hook to use resident auth context
export const useResidentAuth = (): ResidentAuthContextType => {
  const context = useContext(ResidentAuthContext);
  if (context === undefined) {
    throw new Error(
      "useResidentAuth must be used within a ResidentAuthProvider"
    );
  }
  return context;
};

export default ResidentAuthContext;
