import { apiService } from "@/services/apiService";
import { DocumentState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./notificationSlice";
import { ResponseStatus, Screens } from "@/enums";

const initialState: DocumentState = {
  documents: [],
  isLoading: false,
};

export const fetchRecentDocuments = createAsyncThunk(
  "documents/fetchRecent",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await apiService.getRecentDocuments();
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.dashboard,
        })
      );
      return rejectWithValue(
        "Failed to load recent documents. Please try again."
      );
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecentDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchRecentDocuments.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = documentSlice.actions;
export default documentSlice.reducer;
