import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import residentAuthReducer from "./slices/residentAuthSlice";
import citizenAuthReducer from "./slices/citizenAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    residentAuth: residentAuthReducer,
    citizenAuth: citizenAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
