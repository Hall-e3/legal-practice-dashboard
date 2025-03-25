import { apiService } from "@/services/apiService";
import { DocumentState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: DocumentState = {
  documents: [],
  isLoading: false,
  error: null,
};

export const fetchRecentDocuments = createAsyncThunk(
  "documents/fetchRecent",
  async (_, { rejectWithValue }) => {
    try {
      return await apiService.getRecentDocuments();
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        "Failed to load recent documents. Please try again."
      );
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    clearDocumentsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentDocuments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchRecentDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDocumentsError } = documentSlice.actions;
export default documentSlice.reducer;
