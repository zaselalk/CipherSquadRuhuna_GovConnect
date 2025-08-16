interface authUserState {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface authState {
  isAuthenticated: boolean;
  user: authUserState | null;
  isLoading: boolean;
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: authState = {
  isAuthenticated: false,
  user: null,
  isLoading: true, // Start with loading true to prevent flickering
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<authUserState>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
    changeName: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthCheckComplete: (state) => {
      state.isLoading = false;
    },
  },
});

// export actions
export const { login, logout, changeName, setLoading, setAuthCheckComplete } =
  authSlice.actions;
// export reducer
export default authSlice.reducer;
