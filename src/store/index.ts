import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import citizenAuthReducer from "./slices/citizenAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    citizenAuth: citizenAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
