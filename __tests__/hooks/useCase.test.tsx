import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import caseReducer from "@/redux/features/casesSlice";
import useCase from "@/hooks/useCase";
import { CaseModel } from "@/types";
import { cases } from "@/data/caseMockData";

jest.mock("@/services/apiService", () => ({
  apiService: {
    getCases: jest.fn(),
    createCase: jest.fn(),
    deleteCase: jest.fn(),
    getCasesSummary: jest.fn(),
  },
}));

import { apiService } from "@/services/apiService";

describe("useCase Hook", () => {
  const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        case: caseReducer,
      },
      preloadedState: {
        case: {
          cases: [],
          summary: null,
          isLoading: false,
          error: null,
          ...initialState,
        },
      },
    });
  };

  const newCase: CaseModel = {
    id: "3",
    caseNumber: "CS-2025-003",
    title: "XYZ Corp Litigation",
    client: "XYZ Corporation",
    status: "active",
    assignedTo: "Jane Doe",
    openDate: "2025-03-01",
    lastActivity: "2025-03-25",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch cases successfully", async () => {
    (apiService.getCases as jest.Mock).mockResolvedValue(cases);

    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCase(), { wrapper });

    expect(result.current.cases).toEqual([]);
    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      result.current.getCases();
    });

    expect(apiService.getCases).toHaveBeenCalledTimes(1);

    const state = store.getState().case;
    expect(state.isLoading).toBe(false);
    expect(state.cases).toEqual(cases);
  });

  it("should create a case successfully", async () => {
    (apiService.createCase as jest.Mock).mockResolvedValue(newCase);

    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCase(), { wrapper });

    await act(async () => {
      result.current.addCase(newCase);
    });

    expect(apiService.createCase).toHaveBeenCalledTimes(1);
    expect(apiService.createCase).toHaveBeenCalledWith(newCase);

    const state = store.getState().case;
    expect(state.cases).toContainEqual(newCase);
  });

  it("should delete a case successfully", async () => {
    const store = createTestStore({
      cases: [...cases, newCase],
    });
    (apiService.deleteCase as jest.Mock).mockResolvedValue(true);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useCase(), { wrapper });
    expect(result.current.cases).toContainEqual(newCase);

    await act(async () => {
      result.current.removeCase("3");
    });

    expect(apiService.deleteCase).toHaveBeenCalledTimes(1);
    expect(apiService.deleteCase).toHaveBeenCalledWith("3");

    const state = store.getState().case;
    expect(state.cases).not.toContainEqual(newCase);
    expect(state.cases.find((c) => c.id === "3")).toBeUndefined();
  });

  it("should handle API errors when fetching cases", async () => {
    const errorMessage = "Network error";
    (apiService.getCases as jest.Mock).mockRejectedValue(errorMessage);

    const store = createTestStore();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    );
    const { result } = renderHook(() => useCase(), { wrapper });

    await act(async () => {
      result.current.getCases();
    });
    expect(apiService.getCases).toHaveBeenCalledTimes(1);

    const state = store.getState().case;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
