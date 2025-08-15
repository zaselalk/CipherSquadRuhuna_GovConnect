import { useAppSelector } from "./state/hooks";

export const useCitizenAuthState = () => {
  return useAppSelector((state) => state.citizenAuth);
};

export const useIsCitizenAuthenticated = () => {
  return useAppSelector((state) => state.citizenAuth.isAuthenticated);
};

export const useCurrentCitizen = () => {
  return useAppSelector((state) => state.citizenAuth.citizen);
};
