"use client";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "@/redux/store";
import {
  clearAppState,
  setDropDown,
  setOpenModal,
  setSideBarOpen,
} from "@/redux/features/appSlice";
import { usePathname } from "next/navigation";

export default function useApp() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.app);

  const toggleSideBar = useCallback(
    (toggle: boolean) => {
      dispatch(setSideBarOpen(toggle));
    },
    [dispatch]
  );
  const toggleOpenModal = useCallback(
    (toggle: boolean) => {
      dispatch(setOpenModal(toggle));
    },
    [dispatch]
  );
  const toggleDropDown = useCallback(
    (toggle: boolean) => {
      dispatch(setDropDown(toggle));
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch(clearAppState());
  }, [dispatch]);

  return {
    ...state,
    reset,
    dispatch,
    navigate: { pathname },
    toggleSideBar,
    toggleDropDown,
    toggleOpenModal,
  };
}
