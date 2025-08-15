import React, { createContext, useContext, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/state/hooks";
import {
  citizenLogin,
  citizenLogout,
  setCitizenLoading,
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
  const { isAuthenticated, citizen, isLoading } = useAppSelector(
    (state) => state.citizenAuth
  );

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
    // checkAuthStatus,
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
