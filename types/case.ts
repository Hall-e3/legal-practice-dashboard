export interface CaseModel {
  id?: string;
  caseNumber?: string;
  title?: string;
  client?: string;
  status?: "active" | "pending" | "closed" | "";
  assignedTo?: string;
  openDate?: string;
  lastActivity?: string;
}
export interface CaseSummary {
  active: number;
  pending: number;
  closed: number;
  trend: number;
}

export interface CasesState {
  summary: CaseSummary | null;
  isLoading: boolean;
  cases: CaseModel[];
  error: string | null;
}
