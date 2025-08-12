import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import residentAuthReducer from "./slices/residentAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    residentAuth: residentAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
