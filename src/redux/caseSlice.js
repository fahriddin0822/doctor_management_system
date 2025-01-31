
// File: src/redux/caseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCaseDetails = createAsyncThunk(
  'cases/fetchDetails',
  async (caseId) => {
    // Replace with actual API call
    const response = await fetch(`/api/cases/${caseId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
);

const caseSlice = createSlice({
  name: 'cases',
  initialState: {
    currentCase: null,
    recentCases: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCaseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCase = action.payload;
      })
      .addCase(fetchCaseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default caseSlice.reducer;