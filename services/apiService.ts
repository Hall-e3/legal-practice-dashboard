import { apiClient } from "./apiClient";
import { CaseSummary, Document, TimeEntry } from "@/types";

export const apiService = {
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
