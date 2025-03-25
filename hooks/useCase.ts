import {
  createCase,
  deleteCase,
  fetchCases,
  fetchCasesSummary,
  updateCase,
} from "@/redux/features/casesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { CaseModel } from "@/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCase() {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.case);

  const getCaseSummary = useCallback(() => {
    dispatch(fetchCasesSummary());
  }, [dispatch]);

  const getCases = useCallback(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const addCase = useCallback(
    (values: CaseModel) => {
      dispatch(createCase(values));
    },
    [dispatch]
  );
  const editCase = useCallback(
    (values: CaseModel) => {
      dispatch(updateCase(values));
    },
    [dispatch]
  );

  const removeCase = useCallback(
    (caseId: string) => {
      dispatch(deleteCase(caseId));
    },
    [dispatch]
  );

  return {
    ...state,
    getCases,
    addCase,
    editCase,
    removeCase,
    getCaseSummary,
  };
}
