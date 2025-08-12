import { useAppSelector } from "./state/hooks";

export const useResidentAuthState = () => {
  return useAppSelector((state) => state.residentAuth);
};

export const useIsResidentAuthenticated = () => {
  return useAppSelector((state) => state.residentAuth.isAuthenticated);
};

export const useCurrentResident = () => {
  return useAppSelector((state) => state.residentAuth.resident);
};
