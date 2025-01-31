
// File: src/redux/diagnosticSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const uploadDiagnosticImage = createAsyncThunk(
  'diagnostic/uploadImage',
  async (formData) => {
    // Replace with actual API call
    const response = await fetch('/api/diagnostic/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
);

const diagnosticSlice = createSlice({
  name: 'diagnostic',
  initialState: {
    currentImage: null,
    uploadProgress: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDiagnosticImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDiagnosticImage.fulfilled, (state, action) => {
        state.loading = false;
        state.currentImage = action.payload;
        state.uploadProgress = 100;
      })
      .addCase(uploadDiagnosticImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.uploadProgress = 0;
      });
  },
});

export const { setUploadProgress } = diagnosticSlice.actions;
export default diagnosticSlice.reducer;
