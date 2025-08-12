export interface ResidentAuthContextType {
  isAuthenticated: boolean;
  resident: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // checkAuthStatus: () => Promise<void>;
}
