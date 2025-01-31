import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asinxron doktor ma'lumotlarini yuklash
export const fetchDoctorInfo = createAsyncThunk(
  "doctor/fetchDoctorInfo",
  async (doctorId, thunkAPI) => {
    try {
      const response = await fetch(`https://api.example.com/doctors/${doctorId}`);
      if (!response.ok) throw new Error("Doctor information not found");

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    info: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctorInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.info = action.payload;
      })
      .addCase(fetchDoctorInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
