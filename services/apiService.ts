import { apiClient } from "./apiClient";
import { CaseModel, CaseSummary, DocumentModel, TimeEntry } from "@/types";

export const apiService = {
  getCases: async (): Promise<CaseModel[]> => {
    return apiClient.get<CaseModel[]>("/cases");
  },
  getCaseById: async (caseId: string): Promise<CaseModel> => {
    return apiClient.get<CaseModel>(`/cases/${caseId}`);
  },
  createCase: async (data: CaseModel): Promise<CaseModel> => {
    return apiClient.post<CaseModel>("/create/case", data as CaseModel);
  },

  updateCase: async (data: CaseModel): Promise<CaseModel> => {
    if (!data.id) {
      throw new Error("Cannot update case without an ID");
    }
    return apiClient.update("/update/case", data as CaseModel & { id: string });
  },
  deleteCase: async (caseId: string | number): Promise<boolean> => {
    return apiClient.delete("/delete/case", caseId);
  },
  createDocument: async (data: DocumentModel): Promise<DocumentModel> => {
    return apiClient.post<DocumentModel>(
      "/create/document",
      data as DocumentModel
    );
  },
  updateDocument: async (data: DocumentModel): Promise<DocumentModel> => {
    return apiClient.update<DocumentModel>("/update/document", data);
  },
  deleteDocument: async (documentId: string | number): Promise<boolean> => {
    return apiClient.delete("/delete/document", documentId);
  },
  getCasesSummary: async (): Promise<CaseSummary> => {
    return apiClient.get<CaseSummary>("/cases/summary");
  },
  getRecentDocuments: async (): Promise<DocumentModel[]> => {
    return apiClient.get<DocumentModel[]>("/documents/recent");
  },
  getTimeEntries: async (): Promise<TimeEntry[]> => {
    return apiClient.get<TimeEntry[]>("/time-tracking");
  },
};
