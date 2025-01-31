import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asinxron diagnostika rasm yuklash
export const uploadDiagnosticImage = createAsyncThunk(
  "diagnostic/uploadImage",
  async (imageFile, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("https://api.example.com/diagnostic/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const diagnosticSlice = createSlice({
  name: "diagnostic",
  initialState: {
    diagnosticData: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearDiagnosticData: (state) => {
      state.diagnosticData = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDiagnosticImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadDiagnosticImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.diagnosticData = action.payload;
      })
      .addCase(uploadDiagnosticImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearDiagnosticData } = diagnosticSlice.actions;
export default diagnosticSlice.reducer;
