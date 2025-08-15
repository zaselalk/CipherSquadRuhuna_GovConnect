export interface CitizenAuthContextType {
  isAuthenticated: boolean;
  citizen: any;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // checkAuthStatus: () => Promise<void>;
}
