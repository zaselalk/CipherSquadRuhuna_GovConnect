import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CitizenUserState {
  id: number;
  fullName: string;
  email: string;
  NICNumber?: string;
  gender?: string;
  address?: string;
  contactNumber?: string;
  dateOfBirth?: string;
}

interface CitizenAuthState {
  isAuthenticated: boolean;
  citizen: CitizenUserState | null;
  isLoading: boolean;
  token: string | null;
}

const initialState: CitizenAuthState = {
  isAuthenticated: false,
  citizen: null,
  isLoading: false,
  token: null,
};

const citizenAuthSlice = createSlice({
  name: "citizenAuth",
  initialState,
  reducers: {
    citizenLogin: (
      state,
      action: PayloadAction<{ citizen: CitizenUserState; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.citizen = action.payload.citizen;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    citizenLogout: (state) => {
      state.isAuthenticated = false;
      state.citizen = null;
      state.token = null;
      state.isLoading = false;
    },

    setCitizenLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCitizenAuthCheckComplete: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  citizenLogin,
  citizenLogout,
  setCitizenLoading,
  setCitizenAuthCheckComplete,
} = citizenAuthSlice.actions;

export default citizenAuthSlice.reducer;
