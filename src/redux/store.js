// File: src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import diagnosticReducer from './diagnosticSlice';
import caseReducer from './caseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    diagnostic: diagnosticReducer,
    cases: caseReducer,
  },
});
