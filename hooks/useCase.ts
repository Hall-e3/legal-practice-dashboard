import { fetchCasesSummary } from "@/redux/features/casesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCase() {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.case);

  const getCases = useCallback(() => {
    dispatch(fetchCasesSummary());
  }, [dispatch]);

  return {
    ...state,
    getCases,
  };
}
