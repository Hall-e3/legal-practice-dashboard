import { AppState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
  sideBarOpen: false,
  openModal: false,
  dropDown: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOpenModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openModal = payload;
    },
    setSideBarOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.sideBarOpen = payload;
    },
    setDropDown: (state, { payload }: PayloadAction<boolean>) => {
      state.dropDown = payload;
    },
    clearAppState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setOpenModal, setSideBarOpen, setDropDown, clearAppState } =
  appSlice.actions;

export default appSlice.reducer;
