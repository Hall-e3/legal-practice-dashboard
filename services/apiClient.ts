import { mockCaseSummary } from "@/data/caseMockData";
import { mockDocuments } from "@/data/documentsMockData";
import { mockTimeEntries } from "@/data/timeMockData";

export const apiClient = {
  get: async <T>(endpoint: string, shouldFail = false): Promise<T> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 800)
    );
    if (shouldFail || Math.random() < 0.1) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    switch (endpoint) {
      case "/cases/summary":
        return mockCaseSummary as unknown as T;
      case "/documents/recent":
        return mockDocuments as unknown as T;
      case "/time-tracking":
        return mockTimeEntries as unknown as T;
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 800)
    );
    if (Math.random() < 0.1) {
      throw new Error(`Failed to post data to ${endpoint}`);
    }
    return { success: true, data } as unknown as T;
  },
};
