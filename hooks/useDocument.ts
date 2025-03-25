import { fetchRecentDocuments } from "@/redux/features/documentsSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useDocument() {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.document);

  const getDocuments = useCallback(() => {
    dispatch(fetchRecentDocuments());
  }, [dispatch]);

  return {
    ...state,
    getDocuments,
  };
}
