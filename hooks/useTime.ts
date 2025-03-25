import { fetchTimeTracking } from "@/redux/features/timeTrackingSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useTime() {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.time);

  const getTimeTracking = useCallback(() => {
    dispatch(fetchTimeTracking());
  }, [dispatch]);

  return {
    ...state,
    getTimeTracking,
  };
}
