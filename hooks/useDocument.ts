import {
  fetchRecentDocuments,
  deleteDocument,
  createDocument,
  updateDocument,
} from "@/redux/features/documentsSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { DocumentModel } from "@/types";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useDocument() {
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.document);

  const getDocuments = useCallback(() => {
    dispatch(fetchRecentDocuments());
  }, [dispatch]);

  const addDocument = useCallback(
    (values: DocumentModel) => {
      dispatch(createDocument(values));
    },
    [dispatch]
  );
  const editDocument = useCallback(
    (values: DocumentModel) => {
      dispatch(updateDocument(values));
    },
    [dispatch]
  );

  const removeDocument = useCallback(
    (documentId: string) => {
      dispatch(deleteDocument(documentId));
    },
    [dispatch]
  );

  return {
    ...state,
    getDocuments,
    addDocument,
    editDocument,
    removeDocument,
  };
}
