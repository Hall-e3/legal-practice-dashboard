import { mockCaseSummary, cases } from "@/data/caseMockData";
import { mockDocuments } from "@/data/documentsMockData";
import { mockTimeEntries } from "@/data/timeMockData";
import { CaseModel } from "@/types";

export const apiClient = {
  get: async <T>(endpoint: string, shouldFail = false): Promise<T> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 800)
    );
    if (shouldFail || Math.random() < 0.1) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
    switch (endpoint) {
      case "/cases":
        return [...cases] as unknown as T;
      case "/cases/summary":
        return mockCaseSummary as unknown as T;
      case "/documents/recent":
        return mockDocuments as unknown as T;
      case "/time-tracking":
        return mockTimeEntries as unknown as T;
      default:
        if (endpoint.startsWith("/cases/")) {
          const caseId = endpoint.split("/").pop();
          const foundCase = cases.find((c) => c.id === caseId);
          if (foundCase) {
            return { ...foundCase } as unknown as T;
          }
        }
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  },

  post: async <T>(endpoint: string, data: T): Promise<T> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 800)
    );
    if (Math.random() < 0.1) {
      throw new Error(`Failed to post data to ${endpoint}`);
    }
    switch (endpoint) {
      case "/create/case": {
        const newCase = { ...data } as CaseModel;
        cases.push(newCase);
        return newCase as unknown as T;
      }
      default:
        throw new Error(`Failed to create at endpoint: ${endpoint}`);
    }
  },

  update: async <T>(endpoint: string, data: T): Promise<T> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 800)
    );
    if (Math.random() < 0.1) {
      throw new Error(`Failed to update data at ${endpoint}`);
    }
    if (endpoint === "/update/case") {
      const index = cases.findIndex((c) => c.id === data.id);
      if (index === -1) {
        throw new Error(`Case with id ${data.id} does not exist`);
      }
      cases[index] = { ...cases[index], ...data };
      return cases[index] as unknown as T;
    } else {
      throw new Error(`Failed to update at endpoint: ${endpoint}`);
    }
  },

  delete: async <T>(endpoint: string, id: string | number): Promise<T> => {
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 800)
    );
    if (Math.random() < 0.1) {
      throw new Error(`Failed to delete data at ${endpoint}`);
    }
    if (endpoint === "/delete/case") {
      const index = cases.findIndex((c) => c.id === id);
      if (index === -1) {
        throw new Error(`Case with id ${id} not found`);
      }
      cases.splice(index, 1);
      return id as unknown as T;
    } else {
      throw new Error(`Failed to delete at endpoint: ${endpoint}`);
    }
  },
};
