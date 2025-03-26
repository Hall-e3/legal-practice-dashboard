import { apiService } from "@/services/apiService";
import { DocumentModel, DocumentState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlert } from "./notificationSlice";
import { ResponseStatus, Screens } from "@/enums";

const initialState: DocumentState = {
  documents: [],
  isLoading: false,
  error: null,
};

export const fetchRecentDocuments = createAsyncThunk(
  "documents/fetchRecent",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      return await apiService.getRecentDocuments();
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.dashboard,
        })
      );
      return rejectWithValue(
        "Failed to load recent documents. Please try again."
      );
    }
  }
);

export const createDocument = createAsyncThunk(
  "documents/create",
  async (documentData: DocumentModel, { rejectWithValue, dispatch }) => {
    try {
      dispatch(
        showAlert({
          message: "Document Created Successfully",
          type: ResponseStatus.success,
          component: Screens.document,
        })
      );
      return await apiService.createDocument(documentData as DocumentModel);
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.document,
        })
      );
      return rejectWithValue(
        error ?? "Failed to create document. Please try again."
      );
    }
  }
);

export const updateDocument = createAsyncThunk(
  "documents/update",
  async (documentData: DocumentModel, { rejectWithValue, dispatch }) => {
    try {
      dispatch(
        showAlert({
          message: "Document Updated Successfully",
          type: ResponseStatus.success,
          component: Screens.document,
        })
      );
      return await apiService.updateDocument(documentData);
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.document,
        })
      );
      return rejectWithValue(
        error ?? "Failed to update document. Please try again."
      );
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (documentId: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(
        showAlert({
          message: "Document Deleted Successfully",
          type: ResponseStatus.success,
          component: Screens.document,
        })
      );
      await apiService.deleteDocument(documentId);
      return documentId;
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.document,
        })
      );
      return rejectWithValue(
        error ?? "Failed to delete document. Please try again."
      );
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    clearDocumentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentDocuments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecentDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = action.payload;
      })
      .addCase(fetchRecentDocuments.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(createDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents.push(action.payload);
      })
      .addCase(createDocument.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.documents.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
      })
      .addCase(updateDocument.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents = state.documents.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(deleteDocument.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearDocumentError } = documentSlice.actions;
export default documentSlice.reducer;
