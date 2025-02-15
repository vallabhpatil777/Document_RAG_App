import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const uploadFile = createAsyncThunk("file/upload", async (file: File, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await api.post("/upload/", formData);
    return response.data.message;  // Store the message from the backend
  } catch (error : any) {
    return rejectWithValue(error.response?.data  || "Failed to upload file");
  }
});

const fileSlice = createSlice({
  name: "file",
  initialState: { status: "idle", uploadMessage: "", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.status = "loading";
      state.uploadMessage = "Uploading...";
      state.error = null;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.uploadMessage = action.payload; // Message from backend
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.status = "failed";
      state.uploadMessage = "Upload failed.";
      state.error = action.payload as any || "An error occurred.";
    });
  },
});

export default fileSlice.reducer;
