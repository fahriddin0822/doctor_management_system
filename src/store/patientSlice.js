import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asinxron ma'lumot olish (API dan)
export const fetchCaseDetails = createAsyncThunk(
  "patient/fetchCaseDetails",
  async (patientId, thunkAPI) => {
    try {
      const response = await fetch(`https://api.example.com/patients/${patientId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patientData: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearPatientData: (state) => {
      state.patientData = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCaseDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.patientData = action.payload;
      })
      .addCase(fetchCaseDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Reducer va actionlarni eksport qilish
export const { clearPatientData } = patientSlice.actions;
export default patientSlice.reducer;
