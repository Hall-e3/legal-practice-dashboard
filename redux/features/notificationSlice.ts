import { ResponseStatus } from "@/enums";
import { createSlice } from "@reduxjs/toolkit";
import { ALERT_SLICE } from "@/config";
import { AlertState } from "@/types";

const initialState: AlertState = {
  message: "",
  type: ResponseStatus.error,
  isVisible: false,
  error: "",
  component: "",
};

const alertSlice = createSlice({
  name: ALERT_SLICE,
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.error = action.payload.error;
      state.type = action.payload.type;
      state.isVisible = true;
      state.component = action.payload.component;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.message = "";
      state.error = "";
      state.component = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
