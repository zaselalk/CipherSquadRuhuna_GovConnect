import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResidentUserState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nic: string;
  bloodGroup?: string;
  gender: string;
  address: string;
  contactNumber: string;
  birthday: string;
  division?: {
    id: number;
    name: string;
  };
  maritalState?: string;
  religion?: string;
  jobState?: string;
  educationLevel?: string;
  height?: string;
  weight?: string;
}

interface ResidentAuthState {
  isAuthenticated: boolean;
  resident: ResidentUserState | null;
  isLoading: boolean;
  token: string | null;
}

const initialState: ResidentAuthState = {
  isAuthenticated: false,
  resident: null,
  isLoading: false,
  token: null,
};

const residentAuthSlice = createSlice({
  name: "residentAuth",
  initialState,
  reducers: {
    residentLogin: (
      state,
      action: PayloadAction<{ resident: ResidentUserState; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.resident = action.payload.resident;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    residentLogout: (state) => {
      state.isAuthenticated = false;
      state.resident = null;
      state.token = null;
      state.isLoading = false;
    },

    setResidentLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setResidentAuthCheckComplete: (state) => {
      state.isLoading = false;
    },
  },
});

// Export actions
export const {
  residentLogin,
  residentLogout,
  setResidentLoading,
  setResidentAuthCheckComplete,
} = residentAuthSlice.actions;

// Export reducer
export default residentAuthSlice.reducer;
