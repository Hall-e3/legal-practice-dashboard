import { apiService } from "@/services/apiService";
import { CasesState } from "@/types/case";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CasesState = {
  summary: null,
  isLoading: false,
  error: null,
};

export const fetchCasesSummary = createAsyncThunk(
  "cases/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      return await apiService.getCasesSummary();
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to load case summary. Please try again.");
    }
  }
);

const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    clearCasesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCasesSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCasesSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchCasesSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCasesError } = caseSlice.actions;
export default caseSlice.reducer;
