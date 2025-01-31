import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice";
import authReducer from "./authSlice";
import doctorReducer from "./doctorSlice";
import diagnosticReducer from "./diagnosticSlice";

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    auth: authReducer,
    doctor: doctorReducer,
    diagnostic: diagnosticReducer,
  },
});

export default store;
