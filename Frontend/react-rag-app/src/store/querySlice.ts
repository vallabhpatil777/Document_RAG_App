import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

// Fetch available models
export const fetchModels = createAsyncThunk("query/fetchModels", async () => {
    const response = await api.get("/models/");
    console.log(response.data); // Check the response here
    return response.data.available_models;
});

// Submit the query and handle response
export const submitQuery = createAsyncThunk(
  "query/submit",
  async ({ query, model }: { query: string; model: string }) => {
    const formData = new FormData();
    formData.append("query", query);
    formData.append("model", model);
    const response = await api.post("/query/", formData);
    return response.data.response;
  }
);

export const querySlice = createSlice({
  name: "query",
  initialState: {
    models: [],
    response: "",
    loading: false, // Add loading state
    error: "",
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.models = action.payload;
      })
      .addCase(submitQuery.pending, (state) => {
        state.loading = true; // Start loading when query is being submitted
      })
      .addCase(submitQuery.fulfilled, (state, action) => {
        state.response = action.payload;
        console.log(action.payload)
        state.loading = false; // Stop loading when query is done
      })
      .addCase(submitQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to submit query";
      });
  },
});



export default querySlice.reducer;
