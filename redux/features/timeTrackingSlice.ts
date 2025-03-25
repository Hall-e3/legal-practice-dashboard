import { apiService } from "@/services/apiService";
import { TimeTrackingState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: TimeTrackingState = {
  timeEntries: [],
  isLoading: false,
  error: null,
};

export const fetchTimeTracking = createAsyncThunk(
  "timeTracking/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await apiService.getTimeEntries();
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        "Failed to load time tracking data. Please try again."
      );
    }
  }
);

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    clearTimeTrackingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeTracking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTimeTracking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeEntries = action.payload;
      })
      .addCase(fetchTimeTracking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTimeTrackingError } = timeSlice.actions;
export default timeSlice.reducer;
