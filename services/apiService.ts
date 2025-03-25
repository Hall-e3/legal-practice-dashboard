import { apiClient } from "./apiClient";
import { CaseModel, CaseSummary, Document, TimeEntry } from "@/types";



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
    return apiClient.update<CaseModel>("/update/case", data);
  },
  deleteCase: async (caseId: string | number): Promise<boolean> => {
    return apiClient.delete("/delete/case", caseId);
  },
  getCasesSummary: async (): Promise<CaseSummary> => {
    return apiClient.get<CaseSummary>("/cases/summary");
  },
  getRecentDocuments: async (): Promise<Document[]> => {
    return apiClient.get<Document[]>("/documents/recent");
  },
  getTimeEntries: async (): Promise<TimeEntry[]> => {
    return apiClient.get<TimeEntry[]>("/time-tracking");
  },
};
