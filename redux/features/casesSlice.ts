import { apiService } from "@/services/apiService";
import { CaseModel, CasesState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./notificationSlice";
import { ResponseStatus, Screens } from "@/enums";

const initialState: CasesState = {
  cases: [],
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
      return rejectWithValue(
        error ?? "Failed to load case summary. Please try again."
      );
    }
  }
);

export const fetchCases = createAsyncThunk(
  "cases/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await apiService.getCases();
    } catch (error) {
      return rejectWithValue(
        error ?? "Failed to load cases. Please try again."
      );
    }
  }
);

export const createCase = createAsyncThunk(
  "cases/create",
  async (caseData: CaseModel, { rejectWithValue, dispatch }) => {
    try {
      dispatch(
        showAlert({
          message: "Case Created Successfully",
          type: ResponseStatus.success,
          component: Screens.case,
        })
      );
      return await apiService.createCase(caseData as CaseModel);
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.case,
        })
      );
      return rejectWithValue(
        error ?? "Failed to create case. Please try again."
      );
    }
  }
);

export const updateCase = createAsyncThunk(
  "cases/update",
  async (caseData: CaseModel, { rejectWithValue, dispatch }) => {
    try {
      dispatch(
        showAlert({
          message: "Case Updated Successfully",
          type: ResponseStatus.success,
          component: Screens.case,
        })
      );
      return await apiService.updateCase(caseData);
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.case,
        })
      );
      return rejectWithValue(
        error ?? "Failed to update case. Please try again."
      );
    }
  }
);

export const deleteCase = createAsyncThunk(
  "cases/delete",
  async (caseId: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(
        showAlert({
          message: "Case Deleted Successfully",
          type: ResponseStatus.success,
          component: Screens.case,
        })
      );
      await apiService.deleteCase(caseId);
      return caseId;
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.case,
        })
      );
      return rejectWithValue(
        error ?? "Failed to delete case. Please try again."
      );
    }
  }
);

const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    clearCaseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCasesSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCasesSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(fetchCasesSummary.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchCases.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cases = action.payload;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cases.push(action.payload);
      })
      .addCase(createCase.rejected, (state) => {
        state.isLoading = false;
      })

      // Update Case
      .addCase(updateCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.cases.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.cases[index] = action.payload;
        }
      })
      .addCase(updateCase.rejected, (state) => {
        state.isLoading = false;
      })

      // Delete Case
      .addCase(deleteCase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cases = state.cases.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCase.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCaseError } = caseSlice.actions;
export default caseSlice.reducer;
