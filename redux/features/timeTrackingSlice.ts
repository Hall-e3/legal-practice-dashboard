import { apiService } from "@/services/apiService";
import { TimeTrackingState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./notificationSlice";
import { ResponseStatus, Screens } from "@/enums";

const initialState: TimeTrackingState = {
  timeEntries: [],
  isLoading: false,
};

export const fetchTimeTracking = createAsyncThunk(
  "timeTracking/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await apiService.getTimeEntries();
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.dashboard,
        })
      );
      return rejectWithValue(
        "Failed to load time tracking data. Please try again."
      );
    }
  }
);

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimeTracking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTimeTracking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.timeEntries = action.payload;
      })
      .addCase(fetchTimeTracking.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {} = timeSlice.actions;
export default timeSlice.reducer;
