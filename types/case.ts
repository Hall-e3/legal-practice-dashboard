export interface CaseSummary {
  active: number;
  pending: number;
  closed: number;
  trend: number;
}

export interface CasesState {
  summary: CaseSummary | null;
  isLoading: boolean;
  error: string | null;
}
