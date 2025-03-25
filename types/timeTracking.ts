export interface TimeEntry {
  id: string;
  attorney: string;
  case: string;
  description: string;
  date: string;
  hours: number;
  billable: boolean;
}

export interface TimeTrackingState {
  timeEntries: TimeEntry[];
  isLoading: boolean;
  error: string | null;
}
