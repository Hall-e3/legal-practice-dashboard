import caseReducer, {
  fetchCases,
  fetchCasesSummary,
  createCase,
  updateCase,
  deleteCase,
  clearCaseError,
} from "@/redux/features/casesSlice";
import { CaseModel, CasesState } from "../../../types";
import { configureStore } from "@reduxjs/toolkit";
import { cases, mockCaseSummary } from "@/data/caseMockData";

jest.mock("@/services/apiService", () => ({
  apiService: {
    getCases: jest.fn(),
    getCasesSummary: jest.fn(),
    createCase: jest.fn(),
    updateCase: jest.fn(),
    deleteCase: jest.fn(),
  },
}));

import { apiService } from "@/services/apiService";

describe("Cases Slice", () => {
  const initialState: CasesState = {
    cases: [],
    summary: null,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the initial state", () => {
    expect(caseReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle clearCaseError action", () => {
    const state = {
      ...initialState,
      error: "Some error",
    };
    expect(caseReducer(state, clearCaseError())).toEqual({
      ...state,
      error: null,
    });
  });

  it("should handle fetchCases.pending", () => {
    const action = { type: fetchCases.pending.type };
    const state = caseReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
    });
  });

  it("should handle fetchCases.fulfilled", () => {
    const action = {
      type: fetchCases.fulfilled.type,
      payload: cases,
    };
    const state = caseReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      cases: cases,
    });
  });

  it("should handle fetchCases.rejected", () => {
    const errorMessage = "Failed to load cases";
    const action = {
      type: fetchCases.rejected.type,
      payload: errorMessage,
    };
    const state = caseReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: errorMessage,
    });
  });

  it("should handle fetchCasesSummary.fulfilled", () => {
    const action = {
      type: fetchCasesSummary.fulfilled.type,
      payload: mockCaseSummary,
    };
    const state = caseReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      summary: mockCaseSummary,
    });
  });

  it("should handle createCase.fulfilled", () => {
    const newCase: CaseModel = {
      id: "3",
      caseNumber: "CS-2025-003",
      title: "New Case",
      status: "active",
    };

    const action = {
      type: createCase.fulfilled.type,
      payload: newCase,
    };

    const state = caseReducer(initialState, action);
    expect(state.cases).toHaveLength(1);
    expect(state.cases[0]).toEqual(newCase);
  });

  it("should handle updateCase.fulfilled", () => {
    const stateWithCases = {
      ...initialState,
      cases: [...cases],
    };

    const updatedCase = {
      ...cases[0],
      title: "Updated Case Title",
      status: "closed",
    };

    const action = {
      type: updateCase.fulfilled.type,
      payload: updatedCase,
    };

    const state = caseReducer(stateWithCases, action);
    expect(state.cases).toHaveLength(5);
    expect(state.cases[0]).toEqual(updatedCase);
    expect(state.cases[1]).toEqual(cases[1]);
  });

  it("should handle deleteCase.fulfilled", () => {
    const stateWithCases = {
      ...initialState,
      cases: [...cases],
    };

    const action = {
      type: deleteCase.fulfilled.type,
      payload: "1",
    };

    const state = caseReducer(stateWithCases, action);
    expect(state.cases).toHaveLength(4);
    expect(state.cases[0]).toEqual(cases[1]);
  });

  it("should dispatch actions correctly", async () => {
    const store = configureStore({
      reducer: {
        case: caseReducer,
      },
    });
    (apiService.getCases as jest.Mock).mockResolvedValue(cases);
    (apiService.getCasesSummary as jest.Mock).mockResolvedValue(
      mockCaseSummary
    );

    await store.dispatch(fetchCases());

    expect(store.getState().case.cases).toEqual(cases);

    await store.dispatch(fetchCasesSummary());

    expect(store.getState().case.summary).toEqual(mockCaseSummary);
  });
});
